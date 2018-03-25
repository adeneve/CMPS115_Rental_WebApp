import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import SearchView from '@/components/SearchView'
import Profile from '@/components/Profile'
import Post from '@/components/Post'
import ItemView from '@/components/itemView/ItemView'
import EditItem from '@/components/EditItem'
import editProfile from '@/components/editProfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/search/:category/:query',
      name: 'SearchView',
      component: SearchView,
      props: true
    },
    {
      path: '/profile/:userID',
      name: 'Profile',
      component: Profile,
      props: true
    },
    {
      path: '/editprofile/:userID',
      name: 'editProfile',
      component: editProfile,
      props: true
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/view/:itemKey',
      name: 'ItemView',
      component: ItemView,
      props: true
    },
    {
      path: '/editItem/:itemKey',
      name: 'EditItem',
      component: EditItem,
      props: true
    }
  ]
})
