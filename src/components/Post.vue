
<template>
  <div class='root'>
    <body>
    <h3 style="color: #5bc0de; font-family:Georgia;"><center> Item Post Page </center></h3>

    <label v-for="(pic, index) in pics" :for="getInputId(index)">
      <input @change="previewThumbnail($event, index)" :id="getInputId(index)" type="file" style="display:none">
      <img :src="pic"/>
    </label>

    <b-alert variant="success"
             dismissible
             :show="onComplete"
             @dismissed="onComplete=false">
      You have successfully posted your item!
    </b-alert>

    <br>

    <input type="text" v-model="info.title" placeholder="Title">
    <input type="number" v-model="info.price" placeholder="Enter price">
    <input type="text" v-model="info.condition" placeholder="Condition (Describe)">
     <select v-model="info.condition">
       <option disabled value=""> Select a condition </option>
      <option> new </option>
      <option> somewhat new </option>
      <option> used </option>
    </select>
    <input type="text" placeholder="Categories" v-model="info.category">
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
    <form>
      <textarea cols="80" rows="5" id="descp" type="text" v-model="info.description" name="textbox" placeholder="Describe the item to rent">
      </textarea>
    </form>
    <input type="text" placeholder="Zip Code" v-model="info.zipCode" name="zipCode">
    <button v-on:click="postItem" class = "w3-button w3-round">Click to post item</button>
    </body>
  </div>
</template>

<script>
import './placeholder.jpg'
import dbTools from '@/firebase/databaseTools'
export default {

  name: 'Post',
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
      pics: [
          require('./placeholder.jpg'),
          require('./placeholder.jpg'),
          require('./placeholder.jpg'),
      ],
      images: [
          undefined,
          undefined,
          undefined
      ],
      onComplete: false
    }
  },
  methods: {
        previewThumbnail: function(event, imageIndex) {
            var input = event.target
            var picNum = input.id
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                var data = this
                reader.onload = function(e) {
                    data.pics.splice(imageIndex, 1, e.target.result)
                }
                reader.readAsDataURL(input.files[0])
                data.images[imageIndex] = input.files[0]
            }
        },
        postItem: function(){
          var myComponent = this
          this.images = this.images.filter( image => image !== undefined);
          dbTools.getUserID().then(
            function(userID)
            {
              if(userID != null)
              {
               dbTools.addItem(myComponent.info, myComponent.images, userID).then(
                 function(success){
                 console.log("all good")
                 //Give feedback to user
                 myComponent.onComplete = true
                 },
                 function(error){
                 Error(error.message)
                 }
               )
             }
          },
          function(error)
          {
            alert("you need an account to post items")
          }
          )
        },
        getInputId: function(index) {
            return "upload" + index;
        }
    }
}
</script>

<style scoped>
 h3 {
   padding-top: 10px;
   margin-bottom: 50px;
 }
 input[type=text] {
   width: 45%;
   padding: 12px 12px;
   margin: 12px 0;
   font-size: 14px;
   line-height: 18px;
   margin-left: 130px;
   border-color:rgba(192,192,192, 0.8);
   position: relative;
   font-family: 'Georgia';
 }

input[name="zipCode"] {
  width: 130px;
  padding: 12px 12px;
  font-size: 14px;
  line-height: 18px;
  border-color: rgba(192,192,192, 0.8);
}

 input[type=number] {
   width: 150px;
   padding: 12px 12px;
   font-size: 14px;
   margin-left: 130px;
   line-height: 18px;
   border-color: rgba(192,192,192, 0.8);
   font-family: 'Georgia';
 }
 select {
   margin-left: 150px;
   border-color: rgba(192,192,192, 0.8);
   font-family: 'Georgia';
   font-size: 14px
 }
 textarea {
   padding: 12px 12px;
   margin-left: 130px;
   font-size: 14px;
   margin-top: 20px;
   border-color: rgba(192,192,192, 0.8);
 }
 button {
   font-family: 'Georgia';
   background-color:darkcyan;
   color: white;
   border-radius: 10px;
   width: 30%;
   margin-left: 35%;
   margin-right: 20%;
   font-size: 14px;
   margin-top: 30px;
   text-align: center;
 }
 img {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 50px;
    margin-left: 130px;
    height: 300px;
    width: 300px;
 }
 body {
   background-color: rgba(192,192,192, 0.1);
   font-family: 'Georgia'
 }
</style>
