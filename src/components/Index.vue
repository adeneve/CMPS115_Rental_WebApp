<template>
  <div class='root'>
    <section id = "begin">
      <header class = "bg-primary text-black">
        <div class = "container text-center">
          <h1 id = "title">RentIt</h1>
          <hr class = "line">
          <search-bar> </search-bar>
        </div><!-- end of container text-center-->
      </header>
    </section>

    <div class = "container text-center">
      <section id = "featured">
        <h1 class = "title1">Featured Items</h1>
        <hr class = "line">

        <!--https://github.com/wlada/vue-carousel-3d#usage-->
          <carousel-3d>
            <slide :index="0">
             <b-img src="https://i.ytimg.com/vi/a3o_ZKWi-OU/maxresdefault.jpg" width = "270" height = "360"/>
            </slide>
            <slide :index="1">
             <b-img thumbnail fluid src="https://cf.geekdo-images.com/iTZcvNfBptXqWcMFkLPwvOjeRxA=/fit-in/1200x630/pic2419375.jpg" width = "270" height = "360"/>
            </slide>
            <slide :index="2">
             <b-img src="https://compass-ssl.xbox.com/assets/d3/d8/d3d83d26-d0df-49b8-9ad2-f213425a091d.jpg?n=X1-Wireless-Controller-Black_Gallery_1056x594_02.jpg" width = "270" height = "360" />
            </slide>
            <slide :index="3">
             <b-img thumbnail fluid src="https://images.evo.com/imgp/zoom/121461/491132/clone.jpg" width = "270" height = "360"/>
            </slide>
            <slide :index = "4">
             <b-img thumbnail fluid src="https://s7d2.scene7.com/is/image/dkscdn/16WILUNFLGMBLLFFCFTB_is/" width = "270" height = "360"/>
            </slide>
          </carousel-3d>

          <div class = "featured-labels">
            <h3>-Fetch Item Name-</h3>
          </div>

      </section>
    </div>

    <div class = "container text-center">
      <section id = "categories">
        <h1 class = "title1">Categories</h1>
        <hr class = "line">

        <b-row>
          <b-col>
            <router-link :to="{ name: 'SearchView', params: { category: this.video, query: 'Video'} }" class="cat">
            <b-img thumbnail fluid src="http://www.rochester.edu/newscenter/wp-content/uploads/2014/11/fea-video-gam-controller.jpg" alt="Thumbnail" class="catImg"/>
            <h2>Video Games</h2>
            </router-link>
          </b-col>

          <b-col>
            <router-link :to="{ name: 'SearchView', params: { category: this.boards, query: 'Board'} }" class="cat">
            <b-img thumbnail fluid src="http://gazettereview.com/wp-content/uploads/2017/11/1-9.jpg" alt="Thumbnail" class="catImg"/>
            <h2>Board Games</h2>
            </router-link>
          </b-col>

          <b-col>
            <router-link :to="{ name: 'SearchView', params: { category: 'Textbooks', query: 'Textbooks'} }" class="cat">
            <b-img thumbnail fluid src="http://www.gijobs.com/wp-content/uploads/2014/08/textbooks.resized-1.jpg" alt="Thumbnail" class="catImg" />
            <h2>Textbooks</h2>
            </router-link>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <router-link :to="{ name: 'SearchView', params: { category: this.sports, query: 'Sports'} }" class="cat">
            <b-img thumbnail fluid src="https://www.mykapuskasingnow.com/wp-content/uploads/2016/11/sports-balls.jpg" alt="Thumbnail" class="catImg"/>
            <h2>Sports Equipment</h2>
            </router-link>
          </b-col>

          <b-col>
            <router-link :to="{ name: 'SearchView', params: { category: 'Clothes', query: 'Clothes'} }" class="cat">
            <b-img thumbnail fluid src="https://userscontent2.emaze.com/images/5a4a705d-6de4-4695-a634-9b5929c9504e/234d49a24bbdc13034146843c546ae26.jpg" alt="Thumbnail" class="catImg"/>
            <h2>Clothes</h2>
            </router-link>
          </b-col>

          <b-col>
            <router-link :to="{ name: 'SearchView', params: { category: 'Furniture', query: 'Furniture'} }" class="cat">
            <b-img thumbnail fluid src="https://www.worldmarket.com/images/gateway/2017/furniture/wk20_small_spaces_guide_insp_M_desktop.jpg" alt="Thumbnail" class="catImg"/>
            <h2>Furniture</h2>
            </router-link>
          </b-col>
        </b-row>

      </section>
    </div> <!-- end of container-->
  </div> <!-- end of root-->
</template>

<script>

import { Carousel3d, Slide } from 'vue-carousel-3d';
import SearchBar from './SearchBar'

export default {
  components:
  {
    Carousel3d,
    Slide,
    SearchBar
  },
  name: 'Index',
  data () {
    return {
      slide: 0,
      sliding: null,
      searchQuery: '',
      sports: "Sports Equipment",
      boards: "Board Games",
      video: "Video Games"
    }
  }

}
</script>

<style scoped>

header
{
  padding: 300px 0 100px;
  background-image: url(background.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 800px;
}

.btn-default
{
  width: 50px;
  padding: 10px;
}

.form-control
{
  font-size: 20px;
}


#carousel1
{
  margin-top: 50px;
  margin-bottom: 50px;

}


.title1
{
  margin-top: 50px;
}



.line
{
  border: 1px solid black;
  width: 300px;
  margin-bottom: 30px;
}

#begin
{
  margin-bottom: 250px;
}

#featured
{
  margin-bottom: 350px;
}

#categories
{
  margin-bottom: 250px;
}

h2
{
  margin-top: 10px;
  margin-bottom: 35px;
}

.carousel-3d-container figure 
{
  margin: 0;
}

.carousel-3d-container figcaption 
{
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  bottom: 0;
  position: absolute;
  bottom: 0;
  padding: 15px;
  font-size: 12px;
  min-width: 100%;
  box-sizing: border-box;
}

.cat
{
  color:#2b2c2d;
}

.catImg
{
  border: 1px;
}








</style>
