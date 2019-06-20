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
        name:'culturePondetail',
        store,
        data(){
            return{
                msg:'culturePondetail.vue',

                culPondetailData:null,
            }
        },
        mounted(){
            this.loadData()
        },
        methods:{
            loadData(){
                this.msg = this.$store.state.culturePondetailData
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.msg.id

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp + 'cultivationPool/selectById.do?cId=' + _this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.culPondetailData = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
        },
    }
</script>