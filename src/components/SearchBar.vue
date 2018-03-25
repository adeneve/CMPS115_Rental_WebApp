<template>
    <form>
        <div class = "input-group search-bar">
            <input type = "text"
                   class = "form-control"
                   id = "inputText" 
                   placeholder="Search item ..."
                   v-model:value="query"
                   @keypress="routeToSearch">
            <div class = "input-group-btn">
                <button class = "btn btn-default" @click="routeToSearch">
                    <i class="material-icons">search</i>
                </button>
            </div> <!--end of input-group-btn-->
        </div> <!--end of input-group-->
    </form>
</template>

<script>
    export default {
        name: 'SearchBar',
        props: ['searchQuery', 'searchCategory'],
        created: function () {
            this.query = this.searchQuery;
            this.category = this.searchCategory || 'all';
        },
        methods: {
            routeToSearch: function (event) {
                if (event.key === 'Enter' || event.type === 'click') {
                    event.preventDefault()
                    this.$router.push('/search/' + this.category + '/' + this.query || '')
                }
            }
        },
        data () {
            return {
                query: ''
            }
        }
    }
</script>
