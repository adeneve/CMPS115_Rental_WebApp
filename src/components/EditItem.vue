<template>
  <div class='edit-view'>
    <body>
    <h3 style="color: #5bc0de; font-family:Georgia;"><center> Edit your item </center></h3>
    <div class="Image">
    <label v-for="(pic, index) in imageURLs" :for="getInputId(index)" style="padding-right:10px">
      <div style="background-color:#dcede8" onmouseover="this.style = 'background-color:#b9e8da'" onmouseout="this.style = 'background-color:#dcede8'">
        <b-button id="delete" @click="removePic(index)" style="position:absolute;" variant="danger">X</b-button>
        <input @change="previewThumbnail($event, index)" :id="getInputId(index)" type="file" style="display:none">
        <b-img :src="pic" />
      </div>
    </label>

    <b-button id="add" variant="success" @click="addPic()">+</b-button>
    </div>

    <br>

    <input id='title' type="text" v-model="info.title" placeholder="">
    <input type="number" v-model="info.price" placeholder="">
    <input type="text" v-model="info.condition" placeholder="">
     <select v-model="info.condition">
       <option disabled value=""> Select a condition </option>
      <option> new </option>
      <option> somewhat new </option>
      <option> used </option>
    </select>
    <input type="text" placeholder="" v-model="info.category">
    <select v-model="info.category">
      <option disabled value=""> Select a cateogry </option>
      <option> Misc </option>
      <option> Video Games </option>
      <option> Board Games </option>
      <option> Textbooks </option>
      <option> Sports Equipment </option>
      <option> Clothes </option>
      <option> Furniture </option>
    </select>
    <p class="formfield">
      <textarea cols="80" rows="5" id="descp" type="text" v-model="info.description" name="textbox" placeholder="">
      </textarea>
      <input type="text" placeholder="" v-model="info.zipCode" name="zipCode">
    </p>
    <br>

    <h4 style="color: #5bc0de; font-family:Georgia;"> Reservations </h4>
    <ul id="example-1">
      <li v-for="res in reservations">
        from: {{ res.start }} to: {{res.end}}  <b-button @click="reject(res.uid, res.itemResID, res.userResID)"
                                                style="margin-left:130px" variant="danger"> reject </b-button>
        <p style="font-size:20px;"> requested by <router-link :to="'/profile/' + res.uid">{{res.username}}</router-link> </p>
      </li>
    </ul>

    <button v-on:click="postChanges" class = "w3-button w3-round" name="postbutton"> Done </button>
    </body>
  </div>
</template>

<script>
import './placeholder.jpg'
import dbTools from '@/firebase/databaseTools'
export default {

  name: 'EditItem',
  props: ['itemKey'],
  data () {
    return {
      info: {
        title: '',
        condition: '',
        price: '',
        description: '',
        zipCode: '',
        category: ''
      },
      images: [],
      imageURLs: [],
      oldURLs: [],
      onComplete: false,
      reservations: []
    }
  },
  // TODO : Check that this item really belongs to this user
  methods: {
        previewThumbnail: function(event, imageIndex) {
          console.log(this.images)
            var input = event.target
            var picNum = input.id
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                var data = this
                reader.onload = function(e) {
                    data.imageURLs.splice(imageIndex, 1, e.target.result)
                }
                reader.readAsDataURL(input.files[0])
                data.images[imageIndex] = input.files[0]
            }
        },
        postChanges: function(){
          dbTools.updateItemInfo(this.itemKey, this.info, this.imageURLs, this.oldURLs, this.images).then(
            success => {alert('update success'); this.$router.push('/')}
          )
          .catch( error => console.log(error))
        },
        getInputId: function(index) {
            return "upload" + index;
        },
        addPic: function(){
          if(this.imageURLs.length >= 3) { alert("max 3 images"); return}
          this.imageURLs.push(require('./placeholder.jpg'))
        },
        removePic: function(index){
          if (this.imageURLs.length == 1) { alert("must have 1 image"); return}
          this.imageURLs.splice(index, 1);
        },
        reject: function(uid, itemResID, userResID){
          dbTools.cancelReservation(uid, itemResID, userResID, this.itemKey).then(success =>
           {alert("cancelation success");
           let self = this;
           this.reservations.forEach(function(res, i){
             if (res.itemResID = itemResID) self.reservations.splice(i, 1);
           })
           })
           .catch( err => console.log(err))

        }
    },
    created: function () {
        dbTools.getDatumByCollectionAndId('items', this.itemKey).then((itemData) => {
            var self = this
            if (itemData) {
                this.info = itemData;
                this.oldURLs = itemData.imageURLs;
                this.imageURLs = itemData.imageURLs.slice(); //need this to avoid 2 references to same array
                if(itemData.hasOwnProperty('reservations')){
                  let reservations = Object.values(itemData.reservations)
                  reservations.forEach(function(res){
                    let reservationObj = {};
                    reservationObj.start = res.times.start.substring(0,10);
                    reservationObj.end = res.times.end.substring(0,10);
                    reservationObj.userResID = res.userResID;
                    reservationObj.itemResID = res.id;
                    reservationObj.uid = res.uid;
                    reservationObj.username = res.username;
                    self.reservations.push(reservationObj);
                  })
                }
            }
            dbTools.getUserID().then( uid => {if(uid != itemData.uid) {console.log("not your item!")}})
            .catch( nouser => {console.log("can't edit when logged out")})
        })
        .catch((error) => {
            console.log(error)
        });



    }
}
</script>

<style scoped>

.formfield * {
  vertical-align: middle;;
}

.subscript * {
  font-size: 3px;
}

img {
   border: 1px solid #ddd;
   border-radius: 2px;
   padding: 5px;
   font-size: 14px;
   margin-top: 20px;
   margin-bottom: 5px;
   margin-left: 40px;
   height: 300px;
   width: 300px;
}

 h3 {
   padding-top: 10px;
   margin-bottom: 50px;
 }

 div {
   margin-left: 10px;
 }

 li {
   font-size:25px;
 }

  input[type=text] {
   width: 45%;
   padding: 12px 12px;
   margin: 12px 0;
   font-size: 14px;
   line-height: 18px;
   margin-left: 20px;
   border-color:rgba(192,192,192, 0.8);
   position: relative;
   font-family: 'Georgia';
 }

  input[type=number] {
   width: 150px;
   padding: 12px 12px;
   font-size: 14px;
   margin-left: 140px;
   line-height: 18px;
   border-color: rgba(192,192,192, 1.0);
   font-family: 'Georgia';
 }

  select {
   margin-left: 140px;
   border-color: rgba(192,192,192, 0.8);
   font-family: 'Georgia';
   font-size: 14px
 }
 textarea {
   padding: 12px 12px;
   margin-left: 20px;
   font-size: 14px;
   margin-top: 50px;
   border-color: rgba(192,192,192, 0.8);
 }

 input[name="zipCode"] {
   width: 100px;
   margin-left: 40px;
 }


 button[name="postbutton"] {
   font-family: 'Georgia';
   background-color:darkcyan;
   color: white;
   border-radius: 10px;
   width: 30%;
   margin-left: 30%;
   margin-right: 40%;
   font-size: 14px;
   margin-top: 30px;
   text-align: center;
 }


</style>
