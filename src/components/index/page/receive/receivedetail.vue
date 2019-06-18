<template>
    <div>{{msg}}</div>
</template>

<script>
    import store from '../../../../store/store';
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'receivedetail',
        store,
        data(){
            return{
                msg:'receivedetail.vue'
            }
        },
        mounted(){
            this.loadData()
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.$store.state.receivdetailData.id

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp + 'back/selectById.do?cId=' + _this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.receivdetailData = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
        },
    }
</script>
