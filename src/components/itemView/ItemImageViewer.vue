<template>
<div class="item-image-viewer">
  <div class="item-image-primary-container mb-2 px-4 d-flex border rounded">
      <b-img center fluid
          class="item-image-primary align-self-center rounded"
          :src="imageURLs[activeIndex]">
      </b-img>
  </div>
  <div class="p-2">
      <b-container class="item-image-tray-container">
          <b-row>
              <b-col cols="4" class="d-flex" v-for="(imageURL, index) in imageURLs" :key = "imageURL">
                  <b-button class="align-self-center py-2 border-0 item-image-button"
                            variant="outline-secondary"
                            style="height:100%"
                            @click="setActiveIndex(index)">
                      <b-img fluid
                             :src="imageURL"
                             class="item-image-tray rounded">
                      </b-img>
                  </b-button>
              </b-col>
          </b-row>
      </b-container>
  </div>
</div>
</template>

<script>

export default {
    name: 'ItemImageViewer',
    props: ['imageURLs'],
    methods: {
        setActiveIndex: function (index) {
            this.activeIndex = index;
        }
    },
    data () {
        return {
            activeIndex: 0
        }
    }
}
</script>
