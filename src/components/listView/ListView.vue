<template>
    <b-container fluid>
        <b-row class="mb-4">
            <b-col v-for="itemKey in visibleItems"
                  :sm="sizes.sm"
                  :md="sizes.md"
                  :lg="sizes.lg"
                  :xl="sizes.xl"
                  :key="itemKey">
                <list-view-item :itemKey="itemKey"
                                v-on:undefinedKey="handleUndefinedKey">
                </list-view-item>
            </b-col>
        </b-row>
        <b-row>
            <b-pagination size="md"
                          :total-rows="localItemKeys.length"
                          v-model="currentPage"
                          :per-page="itemsPerPage"
                          class="mx-auto"
                          @input="setVisibleItems">
            </b-pagination>
        </b-row>
        <b-row align-h="end">
            <b-col cols="2">
                <b-dropdown :text="'Items Per Page: ' + String(itemsPerPage)">
                    <b-dropdown-item v-for="option in visibleItemOptions"
                                    :key="option"
                                    @click="handleVisibleItemUpdate(option)">
                        {{option}}
                    </b-dropdown-item>
                </b-dropdown>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import ListViewItem from './ListViewItem'

export default {
  name: 'ListView',
  props: ['itemKeys'],
  components: {ListViewItem},
  methods: {
      setVisibleItems: function () {
          let end = this.itemsPerPage * this.currentPage,
              start = end - this.itemsPerPage,
              visibleItems = [];
          if (end > this.localItemKeys.length) {
              end = this.localItemKeys.length;
          }
          visibleItems = this.localItemKeys.slice(start, end);
          this.visibleItems = visibleItems;
      },
      handleVisibleItemUpdate: function (value) {
          this.itemsPerPage = value;
          this.setVisibleItems();
      },
      handleUndefinedKey: function (key) {
          let newItemIds = this.localItemKeys.filter( (itemKey) => {
              return itemKey !== key;
          });
          this.localItemKeys = newItemIds;
          this.setVisibleItems()
      }
  },
  created: function () {
      this.localItemKeys = this.itemKeys
      this.setVisibleItems()
  },
  watch: {
      'itemKeys': function () {
          this.localItemKeys = this.itemKeys
          this.setVisibleItems()
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
      visibleItems: [],
      visibleItemOptions: [6, 12, 24, 48, 96],
      itemsPerPage: 6,
      currentPage: 1,
      localItemKeys: [],
    }
  }
}
</script>
