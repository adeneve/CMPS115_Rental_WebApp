<template>

<div class="root">
  <b-modal ref="login" id="signInModal" hide-footer title="Login">
    <b-form >
      <b-form-group  label="email:"> <div v-if="badLogin" class="alert alert-danger" variant="danger">{{error}}</div>
        <b-form-input  type='text' id='email' placeholder='email' v-model="email"></b-form-input>
      </b-form-group>
      <b-form-group label="password:">
        <b-form-input type='password' id='pass' placeholder='password' v-model="password"></b-form-input>
      </b-form-group>
      <b-button id='LogIn' v-on:click="logIn" >Log in</b-button>
    </b-form>
    <a id="PRButton" @click="passReset" href="#"> Don't remember your password? Click Here </a>
  </b-modal>

  <b-modal ref="passReset" id='PR' hide-footer title="Reset your password">
    <b-form-group  label="enter your email:">
      <b-form-input  type='text' id='emailreset' placeholder='email' v-model="emailReset"></b-form-input>
    </b-form-group>
    <b-btn class="mt-3" variant="outline-primary" block @click="sendPassEmail">Send password reset email</b-btn>
  </b-modal>
</div>

</template>


<script>
import dbTools from '@/firebase/databaseTools'

export default {
  name: 'LoginPopUp',

  data () {
    return {
		email : '',
		password : '',
		badLogin : false,
    emailReset : '',
    error : ''
    }
  },

  methods: {
	  logIn() {
      var component = this
      const logModal = this.$refs.login

      var statusPromise = dbTools.logIn(this.email, this.password)
      statusPromise.then(
        function(success){
          component.badLogin = false
          logModal.hide()
          location.reload()
        },
        function(error){
          component.error = error.message
          component.badLogin = true
        }
      )

	  },
    passReset() {
      this.$refs.passReset.show()
    },

    sendPassEmail() {
      const resetModal = this.$refs.passReset

      var statusPromise = dbTools.passwordReset(this.emailReset)
      statusPromise.then(
        function(success){
          resetModal.hide()
        },
        function(error){
          console.log(error.message)
        }
      )
    }

  }

}

</script>
