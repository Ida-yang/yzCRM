<template>
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in pIdData" :key="item.index" :label="item.index" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList" style="width:100%;">
            <span class="nameList">公司名称：</span>
            <el-input placeholder="请输入公司名称" v-model="searchList.searchName" style="margin-left:20px;width:400px;" @keyup.enter.native="search"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'competitor',
        store,
        computed:{
            tableData(){
                return store.state.competitorList
            },
            tableNumber(){
                return store.state.competitorListnumber
            },
        },
        data(){
            return{
                msg:'competitor.vue',

                page:1,
                limit:20,
                searchList:{
                    searchName:null,
                    label:1
                },
                pIdData:[
                    {index:0,name:'全部'},
                    {index:1,name:'我的'},
                    {index:2,name:'本组'},
                    {index:3,name:'本机构'},
                ],
            }
        },
        mounted(){
            this.loadData()
        },
        activated(){
            this.loadData()
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                if(this.searchList.label == 0 ){
                    data.pId = null
                }else if(this.searchList.label == 1){
                    data.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    data.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    data.deptid = _this.$store.state.insid
                }
                data.searchName = this.searchList.searchName
                data.page = this.page
                data.limit = this.limit

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp + 'competitor/queryForList.do?cId=' + _this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.$store.state.competitorList = res.data.map.success
                    _this.$store.state.competitorListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            search(){
                this.$options.methods.loadData.bind(this)()
            },
            handleSizeChange(val){
                this.limit = val
                this.$options.methods.loadData.bind(this)()
            },
            handleCurrentChange(val){
                this.page = val
                this.$options.methods.loadData.bind(this)()
            },
        },
    }
</script>

<style>

</style>
