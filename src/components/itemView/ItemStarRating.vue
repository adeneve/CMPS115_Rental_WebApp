<template>
<div class="item-star-rating">
  <span>
    <svg width="20%"
         height="20%"
         viewBox="0 0 31 31"
         v-for="(percentage, index) in computeFillPercentages()" :key = "index">
      <defs>
        <linearGradient :id="getId(index)" :x1="percentage" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#ffff00; stop-opacity:1" />
          <stop offset="0%" style="stop-color:#aaaaaa; stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="15" cy="15" r="10"
              :fill="getId(index, true)"
              stroke="#000000"
              stroke-width="1"/>
    </svg>
  </span>
</div>
</template>

<script>
export default {
  name: 'ItemStarRating',
  props: ['rating', 'ratingIndex', 'totalRatings'],
  methods: {
    computeFillPercentages: function () {
      let fillPercentages = [],
          rating = this.rating,
          percentage;
      for (let i = 0; i < 5; i += 1) {
        if (rating >= 1) {
          fillPercentages.push('99%');
          rating = rating - 1;
        } else {
          fillPercentages.push(rating * 100 + '%');
          rating = 0;
        }
      }
      return fillPercentages;
    },
    getId: function (index, addUrl) {
      return (addUrl ? 'url(#' : '')
             + this.$route.fullPath + this.ratingIndex + 'fill' + index +
             (addUrl ? ')' : '')
    }
  }
}
</script>
