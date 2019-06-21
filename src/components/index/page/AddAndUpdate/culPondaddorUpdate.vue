<template>
    <div>
        {{msg}}
    </div>
</template>

<script>
    import store from '../../../../store/store';
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'culPondaddorUpdate',
        store,
        data(){
            return{
                msg:'culPondaddorUpdate.vue'
            }
        },
        mounted(){
            this.loadData()
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                console.log(this.$store.state.culPondaddorUpdateData)
            },
        },
    }
</script>
