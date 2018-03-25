<template>
  <div class="root">
    <div class="card hovercard">
      <div class="card-background">
        <img class="card-bkimg" alt="" src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Steve_Wozniak_by_Gage_Skidmore_2.jpg">
      </div>
      <div class="useravatar">
        <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Steve_Wozniak_by_Gage_Skidmore_2.jpg">
      </div>
      <div class="card-info">
        <span class="card-title">{{username && userData.username}}</span>
      </div>
    </div>

    <b-tabs>
      <b-tab class="Items" title="Items" active>
        <b-row>
            <list-view :itemKeys="itemIDs">
            </list-view>
        </b-row>

      </b-tab>

      <b-tab class="Bio" title="Bio" >
        <p>{{userData && userData.bio}}</p>
      </b-tab>

      <b-tab class="Contact" title="Contact" >
        <p>{{userData && userData.email}}</p>
      </b-tab>

      <b-tab class="Reviews" title="Reviews" >
        <p>Rating: {{userData && userData.rating}}</p>
      </b-tab>

      
      <b-tab title="My Reservations" v-if="isMyProfile">
        <b-row>
            <list-view :itemKeys="reservationIDs">
            </list-view>
            <!-- this works, needs reformatting -->
            <ul>
              <li v-for="res in reservationTime">
                from: {{res.start}} to: {{res.end}}
              </li>
            </ul>

        </b-row>
      </b-tab>
    </b-tabs>

  </div>

</template>

<script>
import dbTools from '@/firebase/databaseTools'
import ListView from './listView/ListView'
export default {
  name: 'Profile',
  props: ['userID'],
  components: {ListView},
  methods: {
    handleChange: function (event) {
      let newName = event.target.value;
      this.localUsername = newName;
      this.$emit('usernameUpdate', newName)
    },
    getuserData: function () {
            DBTools.getItemById(this.userID).then((userData) => {
                return userData;
            });
        },
    reservationrequest: function() {
      dbTools.getUserID().then((userID) => {
       
       
    })
  },
  },
  data() {
    return {
      localUsername: this.username,
      userObj : {},
      userData : {},
      username : '',
      name : '',
      bio : '',
      email : '',
      rating : '',
      itemIDs : [],
      reservationIDs : [],
      reservationTime : [],
      isMyProfile: false
    }
  },

  created : function() 
  {
    console.log(this.userID)
    var myReservations = [];
    var self = this;

    dbTools.getDatumByCollectionAndId('users', this.userID).then((userData) => {
          this.userData = userData;
          this.username = userData.username;
          this.bio = userData.bio;
          this.email = userData.email;
          this.rating = userData.rating;
          
          if(userData.hasOwnProperty('itemIDs')){
            this.itemIDs = Object.values(userData.itemIDs);
          }

          if(userData.hasOwnProperty('myReservations')){
            myReservations = Object.values(userData.myReservations);
            myReservations.forEach(function(res){
                let reservationObj = {}; //times
                let resItemID = {}; //individual itemID
                resItemID = res.itemID; 
                console.log(resItemID);
                reservationObj.start = res.times.start.substring(0,10);
                reservationObj.end = res.times.end.substring(0,10);
                self.reservationTime.push(reservationObj);
                self.reservationIDs.push(resItemID);
            })
          }

      dbTools.getUserID().then(
        function(user){
          if(user == self.userData.uid)
          {
            self.isMyProfile = true;
          }
        }
      )
      


        }).catch(error => console.log(error))
      
      this.reservationrequest();
  }
}
</script>

<style scoped>
.card {
  margin-top: 20px;
  padding: 30px;
  background-color: rgba(214, 224, 226, 0.2);
  -webkit-border-top-left-radius:5px;
  -moz-border-top-left-radius:5px;
  border-top-left-radius:5px;
  -webkit-border-top-right-radius:5px;
  -moz-border-top-right-radius:5px;
  border-top-right-radius:5px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.card.hovercard {
  position: relative;
  padding-top: 0;
  overflow: hidden;
  text-align: center;
  background-color: #fff;
  background-color: rgba(255, 255, 255, 1);
}
.card.hovercard .card-background {
  height: 250px;
}
.card-background img {
  -webkit-filter: blur(25px);
  -moz-filter: blur(25px);
  -o-filter: blur(25px);
  -ms-filter: blur(25px);
  filter: blur(25px);
  margin-left: -100px;
  margin-top: -200px;
  min-width: 130%;
}
.card.hovercard .useravatar {
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
}
.card.hovercard .useravatar img {
  width: 200px;
  height: 200px;
  max-width: 200px;
  max-height: 200px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  border: 5px solid rgba(255, 255, 255, 0.5);
}
.card.hovercard .card-info {
  position: absolute;
  bottom: 14px;
  left: 0;
  right: 0;
}
.card.hovercard .card-info .card-title {
  padding:0 5px;
  font-size: 20px;
  line-height: 1;
  color: #262626;
  background-color: rgba(255, 255, 255, 0.1);
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
.card.hovercard .card-info {
  overflow: hidden;
  font-size: 12px;
  line-height: 20px;
  color: #737373;
  text-overflow: ellipsis;
}
.card.hovercard .bottom {
  padding: 0 20px;
  margin-bottom: 17px;
}
</style>
