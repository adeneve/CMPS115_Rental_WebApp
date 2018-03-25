<template>
<div class="root list-view-item-content mb-3">
    <router-link v-if="myItem" :to="'/editItem/' + itemKey">
        <b-card :title="itemData.title"
                :sub-title="itemData.type"
                class="mb-3 card-content"
                >
          <p class="card-content"> ${{itemData.price}}/day </p>
              <b-img fluid thumbnail :src="imageURLs[0]"></b-img>
        </b-card>
    </router-link>
    <router-link v-else :to="'/view/' + itemKey">
        <b-card :title="itemData.title"
                :sub-title="itemData.type"
                class="mb-3 card-content"
                >
          <p class="card-content"> ${{itemData.price}}/day </p>
              <b-img fluid thumbnail :src="imageURLs[0]"></b-img>
        </b-card>
    </router-link>
</div>

</template>

<script>

import DBTools from '@/firebase/databaseTools'

export default {
    name: 'ListViewItem',
    props: ['itemKey'],
    created: function () {
      let self = this;
        DBTools.getDatumByCollectionAndId('items', this.itemKey).then((itemData) => {
            if (itemData) {
                this.itemData = itemData;
                this.imageURLs = itemData.imageURLs;
                DBTools.getUserID().then( uid => {
                  if(itemData.uid == uid){
                    self.myItem = true;
                  }else{
                    self.myItem = false;
                  }
                })
            }
        }).catch((error) => {
            console.log(error);
            this.$emit('undefinedKey', this.itemKey);
        });


    },
    data () {
        return {
            itemData: {},
            imageURLs: '',
            keyDefined: true,
            myItem: false
        }
    }
}
</script>

<style>
.list-view-item-content {
    height: 100%;
}

.card-content {
    color: black;
}
</style>
