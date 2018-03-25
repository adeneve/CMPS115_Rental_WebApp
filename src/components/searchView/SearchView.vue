<template>
    <b-container fluid>
      <b-row>
        <h1 class="m-4"> Search For Items </h1>
      </b-row>
      <b-row>
        <b-col v-for="datum in getSampleData()" :key = "datum"
               :sm="sizes.sm"
               :md="sizes.md"
               :lg="sizes.lg"
               :xl="sizes.xl">
          <b-card v-bind:title="datum.name"
                  v-bind:sub-title="datum.type"
                  class="mb-3"
                  to="/">
            <p class="card-text"> {{datum.price}}/day </p>
            <b-img fluid thumbnail :src="testImage"></b-img>
          </b-card>
        </b-col>
      </b-row>
      <b-row >
        <b-pagination size="md"
                      :total-rows="sampleData.length"
                      v-model="currentPage"
                      :per-page="itemsPerPage"
                      class="mx-auto">
        </b-pagination>
      </b-row>
    </b-container>
</template>

<script>

import testImage from '../../assets/logo.png'

export default {
  name: 'SearchView',
  methods: {
    getSampleData: function () {
      let end = this.itemsPerPage * this.currentPage,
          start = end - this.itemsPerPage;
      if (end > this.sampleData.length) {
          end = this.sampleData.length
      }
      return this.sampleData.slice(start, end)
    }
  },
  data () {
    return {
      sizes: {
        sm: 6,
        md: 4,
        lg: 3,
        xl: 2
      },
      itemsPerPage: 6,
      currentPage: 1,
      testImage: testImage,
      sampleData: [
        {
          name: 'Scrabble',
          key: 'scrabble',
          description: 'I am an item',
          type: 'Board Game',
          price: '$5.00'
        },
        {
          name: 'Tent',
          key: 'tent',
          description: 'I am another item',
          type: 'Camping Equipment',
          price: '$10.00'
        },
        {
          name: 'Burrito',
          description: 'I am a third item with a slightly longer description',
          type: 'Food',
          price: '$1000.00'
        },
        {
          name: 'Some Garbage',
          description: 'Dont look at me',
          type: 'Trash',
          price: '$0.03'
        },
        {
          name: 'Chicken Strips',
          description: 'I am a third item with a slightly longer description',
          type: 'Food',
          price: '$9.00'
        },
        {
          name: 'Some Garbage Item',
          description: 'Dont look at me',
          type: 'Trash',
          price: '$0.01'
        },
        {
          name: 'Scrabble2',
          description: 'I am an item',
          type: 'Board Game',
          price: '$6.00'
        },
        {
          name: 'Pants',
          description: 'I am another item',
          type: 'Clothes',
          price: '$15.00'
        },
        {
          name: 'Steak',
          description: 'I am a third item with a slightly longer description',
          type: 'Food',
          price: '$2000.00'
        },
        {
          name: 'Some Garbage',
          description: 'Dont look at me',
          type: 'Trash',
          price: '$0.03'
        },
        {
          name: 'Chicken Strips',
          description: 'I am a third item with a slightly longer description',
          type: 'Food',
          price: '$9.00'
        },
        {
          name: 'Some Garbage Item',
          description: 'Dont look at me',
          type: 'Trash',
          price: '$0.01'
        }
      ]
    }
  }
}
</script>
