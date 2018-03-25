<template>
  <div style = "height: 100px" class="item-rental-calendar">
    <p>Day(s):
      <v-date-picker
        mode='range'
        :disabled-dates='disabledDates'
        v-model='selectedDate'
        show-caps>
      </v-date-picker>
    </p>

    <!--test dates-->
    <!-- <p> {{selectedDate}} </p> -->
    <!-- <p> {{disabledDates}} </p> -->

    <b-button v-if="notRequested"
          size="lg"
          variant="primary"
          @click="handleRentalRequest">
          Rent It!
    </b-button>
    <b-button v-else
              variant="danger"
              @click="cancelRequest">

              cancel Request
    </b-button>
  </div>
</template>

<script>
import Vue from 'vue';
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';
import DBTools from '@/firebase/databaseTools';

Vue.use(VCalendar);

export default {
  name: 'ItemRentalCalendar',
  props: ['itemObj'],
  data() {
    return {
        selectedDate: {
          start: null,
          end: null
      },
        //Static data for now, needs a way to implement data back and forth through firebase
        disabledDates: [],
        notRequested: true,
        itemData : 0,
        ownerEmail: '',
        ownerID: null,
        username: null

    };

  },

  methods : {
        handleRentalRequest: function () {
        var self = this;
        let dates = JSON.parse(JSON.stringify(this.selectedDate));
        if(dates.start == null || dates.end == null){alert('pick a date');return}
        DBTools.getUserID().then(userID => {
          if(userID == self.ownerID){return new Promise(function(res, rej){rej('this is your item!')})}
          self.disabledDates.push(this.selectedDate);
          return DBTools.reserveItem(this.itemObj, dates, userID, self.username)
      })
      //Work on sending email here
      .then( success => {
        alert('reserved!');
        self.notRequested = false
        var linkToOwner = self.ownerEmail
        console.log(self.ownerEmail)
        var link = "mailto:"+linkToOwner
        window.location.href = link;
        })
      .catch(error => alert(error))
    },

  cancelRequest: function() {
    var self = this
    var reserveIDonItem = null;
    var reserveIDonUser = null;
    var thisUser = null
    DBTools.getUserID().then(userID =>
      {thisUser=userID;return DBTools.getDatumByCollectionAndId('users', userID)}
    )
    .then( user => {
      let reservations = Object.values(user.myReservations)
      reservations.forEach(function(reservation, index){
        if(reservation.itemID == self.itemData.id) {
          reserveIDonItem = reservation.reservationID;
          reserveIDonUser = reservation.id;
          let timeInterval = reservation.times;
          self.disabledDates.forEach(function(times, index){
            let dates = JSON.parse(JSON.stringify(times));
            if(dates.start == timeInterval.start && dates.end == timeInterval.end){
              self.disabledDates.splice(index, 1);
            }
          })
        }
      })
      return DBTools.cancelReservation(thisUser,reserveIDonItem, reserveIDonUser,self.itemData.id)
    })
    .then( cancelComplete => {alert('cancel complete');self.notRequested= true;})
    .catch(err => alert(err))

  }
},


  created : function () {
        let itemID = this.itemObj
        var self = this
        let ownerID = null;
        DBTools.getDatumByCollectionAndId('items', this.itemObj).then((itemData) => {
          if (itemData) {
            self.itemData = itemData
            ownerID = itemData.uid
            self.ownerID = itemData.uid
            if(itemData.hasOwnProperty('reservations'))
            {
              //this.disabledDates = itemData.reservations; //call new db function for constructing array of just dates
              DBTools.extractDates(Object.values(itemData.reservations)).then( dates =>
              this.disabledDates = dates)
            }
          }
        })
        .then( success => {
        //Retreive Owner's email address
         return DBTools.getDatumByCollectionAndId('users', ownerID)
       })
       .then( owner => {
           self.ownerEmail = owner.email;
       })
        .catch( err => console.log(err))



        DBTools.getUserID().then(uid => {
          return DBTools.getDatumByCollectionAndId('users', uid)
        })
        .then( user => {
          self.username = user.username;
          if(user.hasOwnProperty('myReservations'))
          {
            let myReservedItems = Object.values(user.myReservations);
            myReservedItems.forEach(function(reservedItem){
              if(reservedItem.itemID == itemID) self.notRequested = false;
            })
          }
        })
        .catch( err => console.log(err))
  }
};

</script>
