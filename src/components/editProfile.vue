<template>
  <div class='root'>
    <body>
    <h3 style="color: #5bc0de; font-family:Georgia;"><center> Edit your Profile </center></h3>

    <br>
    <div class = "container">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="InputGroup1"
                    label="Email address:"
                    label-for="Input1"
                    description="We'll never share your email with anyone else.">
        <b-form-input id="Input1"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="InputGroup2"
                    label="Your Name:"
                    label-for="Input2">
        <b-form-input id="Input2"
                      type="text"
                      v-model="form.username"
                      required
                      placeholder="Enter Username">
        </b-form-input>
      </b-form-group>
      <b-form-group id="InputGroup3"
                    label="Bio:"
                    label-for="Input3">
        <b-form-textarea id="Input3"
                      v-model="form.bio"
                      :rows="3"
                      :max-rows="6"
                      required
                      placeholder="Enter Bio">
        </b-form-textarea>
      </b-form-group>

    </b-form>
    </div>

    

    <button v-on:click="postChanges" class = "w3-button w3-round" name="postbutton"> Done </button>
    </body>
  </div>
</template>

<script>
import './placeholder.jpg'
import dbTools from '@/firebase/databaseTools'
export default {
  name: 'Edit Profile',
  props: ['userID'],
  data () {
    return {
      form: {
        email: '',
        username: '',
        bio: ''
      },
      userData: {},
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.name = '';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    },
    getuserData: function () {
      DBTools.getItemById(this.userID).then((userData) => {
          return userData;
      });
    },
    postChanges: function(){
      this.userData.username = this.form.username;
      this.userData.email = this.form.email;
      this.userData.bio = this.form.bio;
      dbTools.updateDatumByCollectionAndId('users', this.userID, this.userData).then(
      success => {alert('update success'); this.$router.push('/')}
      )
      .catch( error => console.log(error))
    }
  },

  created: function(){
    // console.log(this.userID);
    dbTools.getDatumByCollectionAndId('users', this.userID).then((userData) => {
            //if (userData) {
          var self = this;
          this.userData = userData;
          this.form.username = userData.username;
          this.form.bio = userData.bio;
          this.form.email = userData.email;
        }).catch(error => console.log(error))
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
