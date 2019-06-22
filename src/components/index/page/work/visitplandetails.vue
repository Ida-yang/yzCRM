<template>
    <el-row class="visitdetcontent" :gutter="10">
        <!-- <p>拜访计划详情页</p> -->
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="bold_span">{{visitdetails.customerName}}</span>
                        <span style="margin-left:50px;">{{visitdetails.contactsName}}</span>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="retracts">收起</el-button>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="!retracts">显示</el-button>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="toexamine($event)" v-if="isexa" v-show="examines">审核</el-button>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="toexamine($event)" v-if="isexa" v-show="!examines">反审核</el-button>
                    </div>
                    <div class="text item">
                        <ul>
                            <li>拜访对象：<span>{{visitdetails.contactsName}}</span></li>
                            <li style="flex:0 0 50%;">联系电话：<span>{{visitdetails.phone}}</span></li>
                        </ul>
                        <div class="item_body">拜访主题：<span>{{visitdetails.visitTheme}}</span></div>
                        <div class="item_body">拜访目的：<span>{{visitdetails.visitObjective}}</span></div>
                        <p>&nbsp;</p>
                        <div class="verify" v-if="showverify">
                            <img class="verify_img" :src="auditing" alt="已审核">
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="top" v-if="thisshow">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>基本信息</span>
                    </div>
                    <div class="text item">
                        <ul>
                            <li>拜访时间：<span>{{visitdetails.visitTime}}</span></li>
                            <li>结束时间：<span>{{visitdetails.endTime}}</span></li>
                            <li></li>
                            <li>协助人员：<span v-for="(item,index) in visitdetails.assistants" :key="index">{{item}} , </span></li>
                            <li>审核人：<span>{{visitdetails.approver}}</span></li>
                            <li>审核状态：<span>{{visitdetails.approver}}</span></li>
                            <li>负责人：<span>{{visitdetails.private_employee}}</span></li>
                            <li>部门：<span>{{visitdetails.deptname}}</span></li>
                            <li>机构：<span>{{visitdetails.parentname}}</span></li>
                        </ul>
                    </div>
                </el-card>
            </div>
            <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>执行结果</span>
                    </div>
                    <div class="text item">
                        <ul>
                            <li>执行状况：<span>{{visitdetails.state}}</span></li>
                            <li>完成时间：<span>{{visitdetails.endTime}}</span></li>
                            <li></li>
                            <li>签到时间：<span>{{visitdetails.visitTime}}</span></li>
                            <li>签到地址：<span>{{visitdetails.customerName}}</span></li>
                            <li></li>
                            <li>图片：
                                <div class="imgbox">
                                    <img src="/upload/staticImg/test.png" @click="showImg">
                                </div>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" src="/upload/staticImg/test.png" alt="">
                                </el-dialog>
                            </li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                </el-card>
            </div>
            <div class="top">
                <el-card class="box-card">
                    <div class="block">
                        <span class="rate_text">打分</span>
                        <el-rate class="rate_star" show-text :texts="ratetexts" v-model="visitdetails.score" @change="clickRates"></el-rate>
                    </div>
                </el-card>
            </div>
        </el-col>
        
        <el-col :span="6" style="padding:10px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchName" placeholder="请输入公司名称" style="width:80%;" @keyup.enter.native="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="customerName" label="公司名称">
                    <template slot-scope="scope">
                    <div @click="getRow(scope.$index, scope.row)">
                        {{scope.row.customerName}}
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
    import store from '../../../../store/store'
    import axios from 'axios'
    import bus from '../../bus'
    import qs from 'qs'

export default {
    name:'visitplandetails',
    store,
    data(){
        return{
            msg:'拜访计划详情页',

            detailData:null,
            visitId:null,

            visitdetails:{},
            isexa:false,

            tableData:null,
            tableNumber:0,
            searchName:null,
            page:1,
            limit:20,

            thisshow:true,
            retracts:true,
            examines:true,

            // ratevalue: null,
            ratetexts: ['2','4','6','8','10'],

            dialogVisible:false,

            showverify:false,

            auditing: this.$store.state.systemHttp + '/upload/staticImg/examine.png'
        }
    },
    activated(){
        this.loadData()
        this.loadTable()
        this.reload()

    },
    beforeRouteLeave(to, from , next){
        bus.$off('id')
        next()
    },
    methods:{
        reload(){
            const _this = this
            bus.$on('id', function (msg) {
                if(msg){
                    _this.loadData()
                    _this.loadTable()
                }
            })
        },
        loadData(){
            const _this = this
            this.detailData = this.$store.state.visitdetailsData
            this.visitId = this.detailData.submitData.id

            axios({
                method: 'get',
                url: _this.$store.state.defaultHttp+'visit/selectVisitById.do?cId='+_this.$store.state.iscId + '&id=' + this.visitId,
            }).then(function(res){
                _this.visitdetails = res.data.map.visit
                _this.visitdetails.assistants = []
                _this.visitdetails.assistantsid = []
                if(_this.visitdetails.privateUser !== []){
                    _this.visitdetails.privateUser.forEach(item => {
                        _this.visitdetails.assistants.push(item.private_name)
                        _this.visitdetails.assistantsid.push(item.private_id)
                    });
                }
                if(_this.$store.state.ispId == _this.visitdetails.approverid){
                    _this.isexa = true
                }else{
                    _this.isexa = false
                }
                if(_this.visitdetails.approverState == '已审核'){
                    _this.examines = false
                    _this.showverify = true
                }else{
                    _this.examines = true
                    _this.showverify = false
                }
            }).catch(function(err){
                // console.log(err);
            });
        },
        loadTable(){
            const _this = this
            let qs = require('querystring')
            let searchList = {}
            searchList.searchName = this.searchName
            searchList.page = this.page
            searchList.limit = this.limit

            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'visit/selectVisit.do?cId='+_this.$store.state.iscId + '&pId=' + this.$store.state.ispId,
                data: qs.stringify(searchList),
            }).then(function(res){
                let data = res.data.map.success
                _this.tableData = data
                _this.tableNumber = res.data.count
            }).catch(function(err){
                // console.log(err);
            });
        },
        getTime(){
            this.$store.commit('getNowTime')
        },
        toexamine(e){
            this.getTime()
            const _this = this
            let qs = require('querystring')
            let val = e.target.innerText
            let data = {}
            data.id = this.visitId
            if(val == '审核'){
                data.approverState = '已审核'
            }else{
                data.approverState = '待审核'
            }
            data.approverTime = this.$store.state.nowtime

            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'visit/updateVisitState.do?cId='+_this.$store.state.iscId,
                data: qs.stringify(data),
            }).then(function(res){
                if(res.data.code && res.data.code == 200) {
                    _this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    _this.examines = !_this.examines
                    _this.showverify = !_this.showverify
                    _this.$options.methods.loadData.bind(_this)(true)
                } else {
                    _this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(function(err){
                _this.$message.error("操作失败,请重新操作");
            });
        },
        getRow(index,row){
            this.$store.state.visitdetailsData.submitData = {"id":row.id}
            this.$options.methods.loadData.bind(this)(true)
        },
        retract(){
            this.retracts = !this.retracts
            this.thisshow = !this.thisshow
        },
        clickRates(val){
            const _this = this
            let qs = require('querystring')
            let data = {}
            data.id = this.visitId
            data.customerpoolid = this.visitdetails.customerpoolid
            data.customerName = this.visitdetails.customerName
            data.score = val
            if(this.visitdetails.state !== '已完成'){
                _this.$message({
                    message: '该拜访计划非完成状态，暂不可评分',
                    type: 'error'
                })
            }else{
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'visit/updateVisit.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data),
                }).then(function(res){
                    if(res.data.code && res.data.code == 200) {
                        _this.$message({
                            message: '评分成功',
                            type: 'success'
                        });
                        _this.$options.methods.loadData.bind(_this)(true)
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    _this.$message.error("评分失败,请重新评分");
                });
            }
        },
        showImg(){
            this.dialogVisible = true
        },
        search(){
            this.$options.methods.loadTable.bind(this)(true);
        },
        handleSizeChange(val) {
            const _this = this;
            _this.limit = val;
            _this.$options.methods.loadTable.bind(_this)(false);
        },
        handleCurrentChange(val) {
            const _this = this;
            _this.page = val;
            _this.$options.methods.loadTable.bind(_this)(false);
        },
    },
}
</script>

<style>
    .visitdetcontent{
        background-color: #f7f7f7;
        height: auto;
        min-height: 100%;
    }
    .item_body{
        padding: 2px 20px;
        font-size: 14px;
        line-height: 1.5;
    }
    .item_body span{
        word-break: break-all;
        white-space: normal; 
    }
    .card_block{
        height: 20px;
        padding: 20px;
    }
    .rate_text,.rate_star{
        float: left;
    }
    .rate_star{
        margin-left: 50px;
    }
    
    .verify{
        position: absolute;
        right: 45%;
        top: 80px;
    }
    .verify .verify_img{
        width: 150px;
        height: 75px;
        transform: rotate(-10deg)
    }

</style>


