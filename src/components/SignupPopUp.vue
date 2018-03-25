<template>

<div class="root">

  <b-modal id="signUpModal" hide-footer title="Sign Up">
    <b-form >
      <b-form-group  label="username:"> <div id="signUpError" v-if="badSignup" class="alert alert-danger" variant="danger">{{error}}</div>
        <b-form-input  type='text' id='username' placeholder='username' v-model="username"></b-form-input>
      </b-form-group>
      <b-form-group  label="email:">
        <b-form-input  type='text' id='emailSignUp' placeholder='email' v-model="email"></b-form-input>
      </b-form-group>
      <b-form-group label="password:">
        <b-form-input type='password' id='pass1' placeholder='password' v-model="password"></b-form-input>
      </b-form-group>
      <b-form-group label="confirm password:">
        <b-form-input type='password' id='pass2' placeholder='confirm password' v-model="password2"></b-form-input>
      </b-form-group>
      <b-button id='signUpConfirm' v-on:click="saveUser">Sign up</b-button>
    </b-form>
  </b-modal>

  <!-- modal format taken from BootstrapVue modal documentation -->
  <b-modal ref="emailVerify" hide-footer title="Email Verification">
    <div class="d-block text-center">
      <h3>Thanks for signing up! We have sent a verification to your email</h3>
    </div>
    <b-btn class="mt-3" variant="outline-primary" block @click="hideModal">Ok</b-btn>
  </b-modal>

</div>
</template>

<script>
import dbTools from '@/firebase/databaseTools'

export default {
  name: 'SignupPopUp',
  data () {
    return {
		username : '',
		email : '',
		password : '',
		password2 : '',
    badSignup : false,
    error : ''
    }
  },
  methods: {

	  saveUser() {
      if ( this.username.length <= 0) { this.error = 'your username must be at least one character'; this.badSignup = true; return }
      if ( this.password != this.password2 ) { this.error = "passwords don't match" ; this.badSignup = true; return }

      var statusPromise = dbTools.signUp(this.username, this.email, this.password)
      const EmailVerifyModal = this.$refs.emailVerify
      var component = this

      statusPromise.then(
        function(success){
          EmailVerifyModal.show()
          component.badSignup = false
        },
        function(error){
          component.error = error.message
          component.badSignup = true
        }
      )

	  },
	  hideModal () {
      this.$refs.emailVerify.hide()
    }

  }
}
</script>
