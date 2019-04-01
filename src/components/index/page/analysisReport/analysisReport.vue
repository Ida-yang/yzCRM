<template>
    <!-- 基础设置页面 -->
    <div class="contentall">
        <div class="setleftcontent">
            <ul class="namecontent">
                <li v-for="item in nameList" :key="item.index" :value="item.name" :class="{actived:item.isActive}" @click="showTableval(item)">{{item.name}}</li>
            </ul>
        </div>
        <div class="centercontent"></div>
        <div class="setrightcontent">
            <!-- <div class="entry">
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            </div> -->
            <div class="checkform">
                <!-- <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button> -->
            </div>
        </div>
    </div>
</template>
<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'analysisReport',
        store,
        data(){
            return {
                nameList:[
                    {index:1,name:'合同报表',isActive:true},
                    {index:2,name:'商机报表',isActive:false},
                    {index:3,name:'部门业绩排行榜',isActive:false},
                    {index:4,name:'个人业绩排行榜',isActive:false},
                ],
                index:'1',

                year:null,
                yearMonth:null,
                secondid:null,

            }
        },
        mounted(){
            // this.loaddeptrank()
        },
        activated(){
            // this.loaddeptrank()
        },
        methods:{
            loaddeptrank(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.year = this.year
                data.yearMonth = this.yearMonth
                data.secondid = this.secondid

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getContractByDept.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    console.log(res.data)
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadpersonrank(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.year = this.year
                data.yearMonth = this.yearMonth
                data.secondid = this.secondid

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getContractByPersonal.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    console.log(res.data)
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //显示对应状态数表格数据
            showTableval(val){
                const _this = this
                let i = val.index
                // this.index = val.index
                this.nameList.forEach(function(obj){
                    obj.isActive = false;
                });
                val.isActive = !val.isActive;
                if(i == 1){
                    console.log('11111111')
                }else if(i == 2){
                    console.log('22222222')
                }else if(i == 3){
                    console.log('33333333')
                    _this.$options.methods.loaddeptrank.bind(_this)()
                }else if(i == 4){
                    console.log('55555555')
                    _this.$options.methods.loadpersonrank.bind(_this)()
                }
            },
        }
    }
</script>
<style>
</style>
