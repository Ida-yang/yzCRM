<template>
    <div class="engine_c">{{msg}}</div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import XLSX from 'xlsx';
    import bus from '../../bus';
    import qs from 'qs'

    export default {
        name:'searchDetails',
        store,
        data(){
            return{
                msg:'大数据详情页',
                showdetails:false,
                searchdetailsData:null,
            }
        },
        created(){
            // bus.$on('showdetails', msg => {
            //     // console.log('showdetails:'+ msg)
            //     this.showdetails = msg
            // })
        },
        // activated(){
        //     this.loadData()
        // },
        mounted(){
            this.loadData()
        },
        watch:{
            $route(newValue, oldValue){
                console.log(newValue,oldValue)
                this.loadData()
            }
        },
        methods:{
            loadData(){
                this.searchdetailsData = this.$store.state.searchdetailsData
                const _this = this
                let qs =require('querystring')
                console.log(this.$store.state.searchdetailsData)
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'customerOne/selectById.do?id=' + this.searchdetailsData.id,
                }).then(function(res){
                }).catch(function(err){
                    // console.log(err);
                });
            },
        },
    }
</script>

<style>
    .engine_c{
        width: 70%;
        height: 100%;
        background-color: rgb(202, 169, 169);
        position: fixed;
        top: 90px;
        right: 33px;
    }
</style>


