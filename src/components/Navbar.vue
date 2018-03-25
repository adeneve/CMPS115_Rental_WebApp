<template>
  <b-navbar class="" toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand to="/">RentIt</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item id="signIn" v-b-modal.signInModal v-show="isLoggedOut">Sign in</b-nav-item>
        <b-nav-item id="signUp" v-b-modal.signUpModal v-show="isLoggedOut">Sign up</b-nav-item>
        <b-nav-item-dropdown  v-show="isLoggedIn" right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            {{username}}
          </template>
          <b-dropdown-item><router-link :to="'/profile/' + this.uid">Profile</router-link></b-dropdown-item>
           <b-dropdown-item><router-link :to="'/editProfile/' + this.uid">Edit Profile</router-link></b-dropdown-item>
          <b-dropdown-item to="/post">Post</b-dropdown-item>
          <b-dropdown-item v-on:click="logOut">Sign out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
	<LoginPopUp></LoginPopUp>
	<SignupPopUp></SignupPopUp>

  </b-navbar>
</template>


<script>
import LoginPopUp from './LoginPopUp'
import SignupPopUp from './SignupPopUp'
import dbTools from '@/firebase/databaseTools'
export default {
  name: 'Navbar',
  components: {LoginPopUp, SignupPopUp},
  props: ['username', 'isLoggedOut', 'isLoggedIn', 'uid'],
  methods: {
    logOut() {
      dbTools.logOut().then(
        success => {alert('logout success'); this.$router.push('/')}
        )
        .catch( error => console.log(error))

    }
  }
}
</script>
