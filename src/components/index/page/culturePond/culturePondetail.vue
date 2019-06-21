<template>
    <el-row class="culponcontent" :gutter="10">
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{culPondetailData.contacts}}</span>
                    </div>
                    <div class="text item">
                        <ul>
                            <li>公司名称：<span>{{culPondetailData.name}}</span></li>
                            <li>手机：<span>{{culPondetailData.phone}}</span></li>
                            <li>电话：<span>{{culPondetailData.telephone}}</span></li>
                            <li>邮箱：<span>{{culPondetailData.email}}</span></li>
                            <li>QQ：<span>{{culPondetailData.qq}}</span></li>
                            <li>微信：<span>{{culPondetailData.wechat}}</span></li>
                            <li>职务：<span>{{culPondetailData.identity}}</span></li>
                            <li>性别：<span>{{culPondetailData.sex}}</span></li>
                            <li>地址：<span>{{culPondetailData.address}}</span></li>
                        </ul>
                    </div>
                </el-card>
            </div>
        </el-col>
        <el-col :span="6" style="padding:10px;min-height:560px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.keyword" placeholder="请输入公司名称" style="width:80%;" @keyup.enter.native="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="公司名称" prop="contacts">
                    <template slot-scope="scope">
                        <div @click="getRow(scope.$index, scope.row)">
                            {{scope.row.contacts}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block numberPage number">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[20, 30, 50, 100]"
                    :page-size="20"
                    layout="total, sizes, prev, pager, next"
                    :total="tableNumber">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
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

                culPondetailData:{},

                tableData:[],
                tableNumber:0,
                searchList:{
                    keyword:null,
                },
                page:1,
                limit:20
            }
        },
        activated(){
            this.loadData()
            this.loadTable()
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
            loadTable(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.page = this.page
                data.limit = this.limit

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp + 'cultivationPool/queryForList.do?cId=' + _this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            getRow(index,row){
                this.$store.state.culturePondetailData = {"id":row.id}
                this.$options.methods.loadData.bind(this)(true);
            },
            search(){
                this.$options.methods.loadTable.bind(this)()
            },
            handleSizeChange(val){
                this.limit = val
                this.$options.methods.loadTable.bind(this)()
            },
            handleCurrentChange(val){
                this.page = val
                this.$options.methods.loadTable.bind(this)()
            }
        },
    }
</script>

<style>
    .culponcontent{
        background-color: #f7f7f7;
        height: auto;
        min-height: 100%;
    }
</style>
