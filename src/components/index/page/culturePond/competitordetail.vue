<template>
    <div>{{msg}}</div>
</template>

<script>
    import store from '../../../../store/store';
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'competitordetail',
        store,
        data(){
            return{
                msg:'competitordetail.vue'
            }
        },
        activated(){
            this.loadData()
        },
        methods:{
            loadData(){
                console.log(this.$store.state.competitordetailData)
            },
        },
    }
</script>
