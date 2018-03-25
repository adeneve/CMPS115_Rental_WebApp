<template>
<div class="item-view">
    <b-container>
        <b-row class="item-info mt-4">

            <b-col cols="6">
                <item-image-viewer :imageURLs="imageURLs"> </item-image-viewer>
            </b-col>
            <b-col cols="6">
                <h2 class="item-header"> {{itemData.title}} </h2>
                <span>
                    <item-star-rating class="w-50"
                                      :rating="rating"
                                      ratingIndex="0">
                    </item-star-rating>
                    <p> with {{itemData.reviews && itemData.reviews.length || '0'}} Customer Reviews </p>
                </span>

                <p> Condition: {{itemData.condition}} </p>
                <p> Price: ${{itemData.price}}/day </p>
                <p> Owner: <router-link :to="'/profile/' + itemData.uid" class="item-owner-link"> {{ownerData.username}} </router-link> </p>
                <item-rental-calendar v-bind:itemObj="itemKey"> </item-rental-calendar>
            </b-col>
        </b-row>

        <b-row class="item-description mt-2">
            <b-col>
                <h2 class="item-header"> Item Description </h2>
            </b-col>
        </b-row>
        <b-row class="item-description">
            <b-col>
                <p> {{itemData.description}} </p>
            </b-col>
        </b-row>

        <b-row class="item-reviews">
            <b-col>
                <h2 class="item-header"> Reviews </h2>
            </b-col>
        </b-row>


        <b-row class="mb-2">
            <b-col>
                <form>
                    <div class="post-review-form">
                        <textarea class="form-control"
                                  placeholder="Write review ..."
                                  rows="3"
                                  v-model:value="reviewText">
                        </textarea>
                    </div>
                </form>
            </b-col>
        </b-row>

        <b-row class="post-review mb-4">
            <b-col>
                <b-dropdown :text="'Rating: ' + String(reviewRating)">
                    <b-dropdown-item v-for="option in ratingOptions"
                                    :key="option"
                                    @click="handleReviewRatingUpdate(option)">
                        {{option}}
                    </b-dropdown-item>
                </b-dropdown>
                <button class="btn btn-primary btn-md"
                        type="button"
                        @click="handlePostReview">
                    Post Review
                </button>
            </b-col>
        </b-row>

        <b-row v-if="!itemData.reviews || (itemData.reviews && itemData.reviews.length === 0)">
            <b-col>
                <p> No reviews yet </p>
            </b-col>
        </b-row>
        <b-row v-else v-for="(review, index) in itemData.reviews" :key = "review.userID" class="mb-2">
            <b-col cols="3">
                <strong> {{review.username}} </strong>
                <div class="w-50">
                    <item-star-rating
                        :rating="review.rating"
                        :ratingIndex="index + 1">
                    </item-star-rating>
                </div>
            </b-col>
            <b-col cols="9">
                {{review.body}}
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>

import ItemStarRating from './ItemStarRating'
import ItemRentalCalendar from './ItemRentalCalendar'
import ItemImageViewer from './ItemImageViewer'
import DBTools from '@/firebase/databaseTools'

export default {
    name: 'ItemView',
    props: ['itemKey'],
    components: {
        ItemStarRating,
        ItemRentalCalendar,
        ItemImageViewer
    },

    methods: {
        handleRentalRequest: function () {
            alert('Attempting to rent ' + this.itemData.title)
        },
        getItemRating: function () {
            if (this.itemData.reviews && this.itemData.reviews.length > 0) {
                let total = 0,
                    len = this.itemData.reviews.length;
                this.itemData.reviews.forEach((review) => {
                    total += review.rating
                });
                return total/len;
            } else {
                return 0;
            }
        },
        getRatingIndex: function () {
            this.ratingCounter = this.ratingCounter + 1;
            return this.ratingCounter;
        },
        getItemData: function () {
            DBTools.getItemById(this.itemKey).then((itemData) => {
                return itemData;
            });
        },
        handlePostReview: function () {
            let previousUsers = this.itemData.reviews.map( (review) => {
                return review.userID;
            });

            if (!this.userID) {
                alert('Please log in to post a review')
                return;
            }

            if (previousUsers.includes(this.userID)) {
                alert('You have already posted a review on this item')
                return;
            }

            let newReview = {
                username: this.userData.username,
                userID: this.userID,
                rating: this.reviewRating,
                body: this.reviewText
            }

            this.itemData.reviews.push(newReview);
            this.rating = this.getItemRating();
            DBTools.updateDatumByCollectionAndId('items', this.itemKey, this.itemData);
        },
        handleReviewRatingUpdate: function (option) {
            this.reviewRating = option;
        }
    },
    created: function () {
        DBTools.getDatumByCollectionAndId('items', this.itemKey).then((itemData) => {
            if (itemData) {
                this.itemData = itemData;
                this.imageURLs = itemData.imageURLs;
                this.itemData.reviews = this.itemData.reviews || []
                this.rating = this.getItemRating();
                return DBTools.getDatumByCollectionAndId("users", itemData.uid)
            }
        }).then((userData) => {
            if (userData) {
                this.ownerData = userData;
            }
        })
        .catch((error) => {
            console.log(error)
        });

        DBTools.getUserID().then(
          (userID) =>
          {
            this.userID = userID
            return DBTools.getDatumByCollectionAndId("users", userID);
          })
          .then(
            (userData) => {
              this.userData = userData;
            }).catch(error => console.log(error))
    },
    data() {
        return {
            ratingCounter: 0,
            itemData: {},
            ownerData: {},
            hasReviews: false,
            rating: 0,
            imageURLs: [],
            reviewText: '',
            reviewRating: 1,
            userData: {},
            userID: '',
            ratingOptions: {
                1: 1,
                2: 2,
                3: 3,
                4: 4,
                5: 5
            }
        }
    }
}
</script>

<style>
.item-header {
    border-bottom: 2px solid #aaaaaa;
}

.item-image-primary-container {
    height: 25vw;
}

.item-image-primary {
    max-height: 23vw;
}

.item-image-tray-container {
    width: 90%;
    max-height: 6vw;
}

.item-image-tray {
    max-height: 5vw;
}

.item-image-button:hover {
    background-color: rgba(112,128,144,.3)
}

</style>
