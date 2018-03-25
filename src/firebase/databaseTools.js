import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyDSpChqy0stbpEf6v4ikpoKYFYVRqkXThw",
    authDomain: "rentalapp-dba39.firebaseapp.com",
    databaseURL: "https://rentalapp-dba39.firebaseio.com",
    projectId: "rentalapp-dba39",
    storageBucket: "rentalapp-dba39.appspot.com",
    messagingSenderId: "703006762951"
}
const firebaseApp = firebase.initializeApp(config)

const algoliasearch = require('algoliasearch');
const algolia = algoliasearch(
  'P92Y1BVLZG',
  '185988e4542b81b36c36c5219043282a'
);
const index = algolia.initIndex('items');
index.setSettings({
  'attributesForFaceting': ['category', 'condition'],
  ranking: [
    "desc(rating)",
  ]
})

var db = firebaseApp.database()
var storage = firebaseApp.storage()
var users = db.ref('users')
var items = db.ref('items')
var itemPictures = storage.ref('items')
var userPictures = storage.ref('users')
var defaultPictures = storage.ref('defaults')
const auth = firebase.auth()
var placeholderURL = "https://firebasestorage.googleapis.com/v0/b/rentalapp-dba39.appspot.com/o/defaults%2Fplaceholder.jpg?alt=media&token=be181e32-9073-4176-893f-4cb67c93642f"

//----- Database functions ----------
export default{

    getUserID : function() {
      return new Promise(function(resolve, reject) {
        auth.onAuthStateChanged( user => {
          if(user){
            users.orderByChild('email').equalTo(user.email).once('value',
              function(data){
                let val = data.val()
                resolve((Object.keys(val))[0])
              },
              function (error){
                reject(error)
              })
            }
            else{
              reject("no user logged in")
            }
          })
        })
    },

    signUp : function(username, email, password) {
        return new Promise(function(resolve, reject) {
           var newUser = null;
           auth.createUserWithEmailAndPassword(email, password).then(
              function(user){
                newUser = user;
                auth.signOut(); //temporary fix for browser rendering too fast
                return user.updateProfile({displayName : username})
              })
              .then( function(updateSuccess) {
                return users.push({email : email, username : username, rating : -1, bio : "no bio yet"})
              })
              .then( function(pushSuccess){
                return newUser.sendEmailVerification()
              })
              .then( function(done){
                resolve("signup success");
              })
              .catch( error => reject(error));
        });
    },

    logIn: function (email, password){
        return new Promise(function(resolve, reject){
          auth.signInWithEmailAndPassword(email, password).then(
            function(user) {
            resolve("login success")
            })
            .catch( error => reject(error))
        })
    },

    logOut: function(){
      return auth.signOut();

    },

    passwordReset: function(email){
      return new Promise(function(resolve, reject){
        auth.sendPasswordResetEmail(email).then(
          function(success){
            resolve("success")
        })
        .catch( error => reject(error))
      });
    },

    addItem: function( props, images, userID ){
      props.uid = userID;
      var imageURLs = [];
      var id = null;
      var userItems = [];
      return new Promise(function(resolve, reject){
        items.push(props).then(
          function(data){
            id = data.path.pieces_[1]
            return items.child(id).update({ id : id}) // This is the user ID addition
          })
          .then(function(updateSuccess){
            let imagePromises = []
            images.forEach( function(image, index){
              var pathReference = itemPictures.child(id + '/' + image.name);
              var imagePromise = pathReference.put(image);
              imagePromises.push(imagePromise);
            })
            return Promise.all(imagePromises)
          })
          .then( function(imagesUploadSuccess){
            let imageURLPromises = [];
            images.forEach( function(image) {
              let pathReference = itemPictures.child(id + '/' + image.name);
              let imageURLPromise = pathReference.getDownloadURL();
              imageURLPromises.push(imageURLPromise);
              imageURLPromise.then( url => imageURLs.push(url))
            })
            return Promise.all(imageURLPromises)
          })
          .then( function(urlsDownloaded){
            return defaultPictures.child('placeholder.jpg').getDownloadURL();
          })
          .then( function(placeholder){
            var itemImages = db.ref("items/" + id + "/imageURLs");
            if(images.length == 0) return itemImages.set({ 0 : placeholder})
            else return items.child(id).update({imageURLs : imageURLs})
          })
          .then( function (updateFinished){
            var itemsRef = db.ref("users/" + userID + "/itemIDs");
            return itemsRef.push(id)
          })
          .then( function(itemsUpdated){
            resolve("item added successfully")
          })
          .catch( error => reject(error))
      })
    },

    //test
    reserveItem: function(itemID, timeInterval, currentUID, username)
    {
      return new Promise(function(resolve, reject){
        var itemReservations = db.ref("items/" + itemID + "/reservations");
        var userReservations = db.ref("users/" + currentUID + "/myReservations");
        var userResID = null;
        var itemResID = null;
        var reservation = {
          uid : currentUID,
          times : timeInterval,
          username: username
        }
        itemReservations.push(reservation).then( data =>
          {itemResID = data.path.pieces_[3];return userReservations.push({itemID : itemID, reservationID: itemResID, times:timeInterval})
          })
          .then( data => { userResID = data.path.pieces_[3]; return userReservations.child(userResID).update({id : userResID})})
          .then( good => {return itemReservations.child(itemResID).update({userResID : userResID})})
          .then( good => {return itemReservations.child(itemResID).update({id : itemResID})})
          .then( finished => resolve('reservation complete'))
          .catch(error => reject(error))
      })
    },
    extractDates: function(reservations)
    {
      return new Promise(function(resolve, reject){
        let reservedDates = [];
        reservations.forEach(function(reservation){
          reservedDates.push(reservation.times)
        })
        resolve(reservedDates)
      })
    },
    cancelReservation: function(userID,reservationIDonItem, reservationIDonUser, itemID)
    {
      var item = db.ref('items/' + itemID + '/reservations')
      var user = db.ref('users/' + userID + '/myReservations')
      return new Promise(function(resolve, reject){
        item.child(reservationIDonItem).remove()
        .then( success => {return user.child(reservationIDonUser).remove()})
        .then( success => resolve('cancel complete'))
        .catch(err => reject(err))
      })


    },

    queryItems: function(keyword, category, condition){
      let itemIDs = []
      return new Promise(function(resolve, reject){
        if(category == 'all' && condition == 'all'){
        index.search( { query: keyword })
        .then( content => {for(var h in content.hits){
          itemIDs.push(content.hits[h].objectID);
        }
        resolve(itemIDs)
        })
        .catch(err => reject(err))
      } if(category != 'all' && condition == 'all') {
        index.search( {query: keyword, filters: 'category: '+ category })
        .then( content => {for(var h in content.hits){
          itemIDs.push(content.hits[h].objectID);
        }
        resolve(itemIDs)
        })
        .catch(err => reject(err))
      } if( category == 'all' && condition != 'all'){
        index.search( {query: keyword, filters: 'condition:'+condition })
        .then( content => {for(var h in content.hits){
          itemIDs.push(content.hits[h].objectID);
        }
        resolve(itemIDs)
        })
        .catch(err => reject(err))
      }
      if( category != 'all' && condition != 'all'){
        index.search( {query: keyword, filters: 'condition:'+condition+' AND category:'+category })
        .then( content => {for(var h in content.hits){
          itemIDs.push(content.hits[h].objectID);
        }
        resolve(itemIDs)
        })
        .catch(err => reject(err))
      }

      })
    },

    addFilters: function(priceFilter, ratingsFilter)
    {

    },

    updateItemInfo: function(itemID, newInfo, newURLs, oldURLs, newImages)
    {
      var deletedImageURLs = [];
      var remainingURLs = oldURLs.slice();
      oldURLs.forEach(function(oldURL, indexOld){
        var deleted = true
        newURLs.forEach(function(newURL, index){
          if(newURL == oldURL) deleted = false;
        })
        if (deleted == true)
        {
          let finalIndex = remainingURLs.indexOf(oldURL)
          deletedImageURLs.push(oldURL); remainingURLs.splice(finalIndex, 1)
        };
      })

      return new Promise(function(resolve, reject){
        items.child(itemID).update(newInfo).then(function(success){
          var deletionPromises = []
          deletedImageURLs.forEach( (url) => {
            var index = 0;
            for(var i = 0; i < oldURLs.length; i++){ if(oldURLs[i] == url){index = i}}
            var deletePromise = removeItemPic(itemID, url, index)
            deletionPromises.push(deletePromise)
          })
          return Promise.all(deletionPromises)
        })
        .then(function(deletionSuccess){
          let imagePromises = []
          newImages.forEach( function(image, index){
            var pathReference = itemPictures.child(itemID + '/' + image.name);
            var imagePromise = pathReference.put(image);
            imagePromises.push(imagePromise);
          })
          return Promise.all(imagePromises)
        })
        .then(function(storageSuccess){
          let imageURLPromises = [];
          newImages.forEach( function(image) {
            let pathReference = itemPictures.child(itemID + '/' + image.name);
            let imageURLPromise = pathReference.getDownloadURL();
            imageURLPromises.push(imageURLPromise);
            imageURLPromise.then( url => remainingURLs.push(url))
          })
          return Promise.all(imageURLPromises)
        })
        .then( function(urlsDownloaded){
          return defaultPictures.child('placeholder.jpg').getDownloadURL();
        })
        .then(function(placeholder){
          var itemImages = db.ref("items/" + itemID + "/imageURLs");
          if (remainingURLs.length == 0) return itemImages.set({ 0 : placeholder})
          else return items.child(itemID).update({imageURLs : remainingURLs})
        })
        .then(function(success){
          resolve("edit complete")
        })
        .catch(error => reject(error))
      })
    },

    updateUserProfile: function(userID, newInfo)
    {

    },

    getDatumByCollectionAndId: function (collectionKey, datumKey) {
        let datumReference = db.ref(collectionKey + '/' + datumKey);
        return new Promise(function (resolve, reject) {
          datumReference.once('value').then( (snapshot) => {
              let val = snapshot.val()
              if (val) {
                  resolve(val);
              } else {
                  reject(new Error('No matching key in database'))
              }
          }).catch( (error) => {
              reject(error)
          });
        });
    },

    updateDatumByCollectionAndId: function (collectionKey, datumKey, newValue) {
        let datumReference = db.ref(collectionKey + '/' + datumKey);
        return datumReference.set(newValue);
    }

}

//code taken from algolia tutorial

items.on('child_added', addOrUpdateIndexRecord);
items.on('child_changed', addOrUpdateIndexRecord);
items.on('child_removed', deleteIndexRecord);

function addOrUpdateIndexRecord(item) {
  // Get Firebase object
  const record = item.val();
  // Specify Algolia's objectID using the Firebase object key
  record.objectID = item.key;
  // Add or update object
  index
    .saveObject(record)
    .then(() => {
      //console.log('Firebase object indexed in Algolia', record.objectID);
    })
    .catch(error => {
      console.error('Error when indexing contact into Algolia', error);
      process.exit(1);
    });
}

function deleteIndexRecord(contact) {
  // Get Algolia's objectID from the Firebase object key
  const objectID = contact.key;
  console.log(contact);
  // Remove the object from Algolia
  index
    .deleteObject(objectID)
    .then(() => {
      //console.log('Firebase object deleted from Algolia', objectID);
    })
    .catch(error => {
      console.error('Error when deleting contact from Algolia', error);
    });
}

function removeItemPic(itemID, imageURL, imageKey)
{
  return new Promise(function(resolve, reject){
    if(imageURL == placeholderURL)
    {
      var picRef = items.child(itemID).child('imageURLs').child(imageKey)
      picRef.remove().then( removed => resolve("just the ref removed")).catch(error => reject(error))
    }
    else
    {
      var imageRef = storage.refFromURL(imageURL);
      imageRef.delete().then( function(success){
        var picRef = items.child(itemID).child('imageURLs').child(imageKey)
        return picRef.remove()
      })
      .then( function(success){
        resolve("pic removed from storage and url removed from db")
      })
      .catch(error => reject(error))
    }
  })


}
