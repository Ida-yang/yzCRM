<template>
    <el-row class="eb_detail_c" :gutter="10">
        <el-col :span="18">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="bold_span">{{eBdetail.title}}</span>
                </div>
                <div class="block eb_block">
                    <div v-html="eBdetail.describe" class="eb_ue"></div>
                </div>
            </el-card>
        </el-col>

        <el-col :span="6" style="padding:10px;min-height: 500px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input v-model="searchList.searchName" placeholder="请输入标题" style="width:calc(95% - 45px);" @keyup.enter.native="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="公司名称">
                    <template slot-scope="scope">
                    <div @click="getRow(scope.$index, scope.row)">
                        {{scope.row.title}}
                    </div>
                </template>
                </el-table-column>
            </el-table>
            <div class="block numberPage number">
                <el-pagination
                    small
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[20, 30, 50, 100]"
                    :page-size="20"
                    layout="total, sizes, prev, next"
                    :total="tableNumber">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    import UE from '../../ue.vue'

    export default {
        name:'experienceBasedetail',
        store,
        data(){
            return{
                msg:'experienceBasedetail',
                eBdetail:{},
                tableData:[],
                tableNumber:0,

                page:1,
                limit:20,
                searchList:{
                    searchName:null,
                }
            }
        },
        activated(){
            this.loadData()
        },
        methods:{
            loadData(){
                this.eBdetail = this.$store.state.expBasedetailData
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.page = this.page
                data.limit = this.limit
                data.searchName = this.searchList.searchName
                data.type = this.eBdetail.service_type_id

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'knowledgeBase/queryForList.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data),
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                })
            },
            getRow(index,row){
                this.$store.state.expBasedetailData = row
                this.eBdetail.service_type_id = null
                this.$options.methods.loadData.bind(this)();
            },
            handleSizeChange(val){
                this.limit = val
                this.$options.methods.loadData.bind(this)()
            },
            handleCurrentChange(val){
                this.page = val
                this.$options.methods.loadData.bind(this)()
            }
        },
    }
</script>

<style>
    .eb_detail_c{
        background-color: #f7f7f7;
        height: auto;
        min-height: 100%;
    }
    .eb_ue{
        min-height: 400px;
    }
    .eb_block{
        padding: 20px;
        box-sizing: border-box;
    }
</style>
