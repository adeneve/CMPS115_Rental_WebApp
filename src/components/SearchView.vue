<template>
<div class="root">
    <b-container>
        <b-row>
            <h1 class="m-4 search-header"> Search Results for "{{this.query}}"</h1>
        </b-row>
        <b-row>
            <b-col cols="6" class="mb-4">
                <search-bar :searchQuery="query" :searchCategory="categoryOption"> </search-bar>
            </b-col>
            <b-col cols="4" class="mb-4">
              <b-form-select v-model="categoryOption" :options="options" class="mb-3" />

            </b-col cols="4" class="mb-4">
            <b-col cols="4" class="mb-4">
              <img :src='algolia' style="max-width:80%; max-height:80%"></img>

            </b-col cols="4" class="mb-4">

        </b-row>
        <b-row>
            <list-view :itemKeys="itemKeys">
            </list-view>
        </b-row>
    </b-container>
</div>
</template>

<script>

import ListView from './listView/ListView'
import SearchBar from './SearchBar'
import dbTools from '@/firebase/databaseTools'

let testKeys = [

    '-L5zkr8eZ5VKbwCS--5I',
]

export default {
    name: 'SearchView',
    components: {ListView, SearchBar},
    props: ['query', 'category'],
    data () {
        return {
            algolia: require('./algolia.png'),
            itemKeys: testKeys,
            categoryOption: this.category,
            condition: 'all',
            orderBy: 'none',
            options: [
            { value: 'all', text: 'Any Category' },
            { value: 'Video Games', text: 'Video Games' },
            { value: 'Board Games', text: 'Board Games' },
            { value: 'Sports Equipment', text: 'Sports Equipment' },
            { value: 'Clothes', text: 'Clothes' },
            { value: 'Textbooks', text: 'Textbooks'},
            { value: 'Furniture', text: 'Furniture'}
          ]

        }
    },
    created: function(){
      let spacesCategory = this.categoryOption
      if(this.categoryOption == 'Video Games') spacesCategory = "\"" + this.categoryOption + "\""
      if(this.categoryOption == 'Board Games') spacesCategory =  "\"" + this.categoryOption + "\""
      if(this.categoryOption == 'Sports Equipment') spacesCategory =  "\"" + this.categoryOption + "\""

      dbTools.queryItems(this.query, spacesCategory, this.condition).then(results => {this.itemKeys = results})

    },
    watch: {
      query: function(val){
        this.query = val
        let spacesCategory = this.categoryOption
        if(this.categoryOption == 'Video Games') spacesCategory = "\"" + this.categoryOption + "\""
        if(this.categoryOption == 'Board Games') spacesCategory =  "\"" + this.categoryOption + "\""
        if(this.categoryOption == 'Sports Equipment') spacesCategory =  "\"" + this.categoryOption + "\""
        dbTools.queryItems(this.query, spacesCategory, this.condition).then(results => {this.itemKeys = results})

      },
      category: function(val){
        this.categoryOption = val
        dbTools.queryItems(this.query, this.categoryOption, this.condition).then(results => {this.itemKeys = results})

      },
      categoryOption: function(val){
        let spacesCategory = this.categoryOption
        this.categoryOption = val
        if(this.categoryOption == 'Video Games') spacesCategory = "\"" + this.categoryOption + "\""
        if(this.categoryOption == 'Board Games') spacesCategory =  "\"" + this.categoryOption + "\""
        if(this.categoryOption == 'Sports Equipment') spacesCategory =  "\"" + this.categoryOption + "\""
        dbTools.queryItems(this.query, spacesCategory, this.condition).then(results => {this.itemKeys = results})

      }
    }
}
</script>

<style>
.search-header {
    border-bottom: 2px solid #aaaaaa;
}
</style>
