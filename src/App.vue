<template>
  <div id="app">
    <!--BootstrapVue navbar with routing via vue-router-->
    <navbar  v-bind:username="currentUser"
             v-bind:isLoggedOut="loggedOut" v-bind:isLoggedIn="loggedIn" 
             v-bind:uid="uid">
    </navbar>

    <!--This is where the current page is rendered-->
    <router-view v-bind:username="currentUser"
                 v-on:usernameUpdate="handleUsernameUpdate">
    </router-view>
  </div>
</template>

<script>

import Navbar from './components/Navbar'
import firebase from 'firebase'
import dbTools from './firebase/databaseTools.js'


export default {
  name: 'App',
  components: {Navbar},
  methods:{
    handleUsernameUpdate: function (newUser) {
      this.currentUser = newUser;
    }
  },
  data() {
    return {
      currentUser: 'New User',
      loggedIn: false,
      loggedOut: true,
      uid: null
    }
  },
  mounted : function() {
    firebase.auth().onAuthStateChanged( firebaseuser => {
      if(firebaseuser){
        console.log('user logged in')
        let self = this
        this.currentUser = firebaseuser.displayName
        this.loggedIn = true
        this.loggedOut = false
        dbTools.getUserID().then( id => self.uid = id)

      }else{
        this.currentUser = 'New User'
        this.loggedIn = false
        this.loggedOut = true
        console.log('not logged in')
      }
    })
  }

}

</script>
