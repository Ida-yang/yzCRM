<template>
    <el-row class="visitdetcontent" :gutter="10">
        <!-- <p>拜访计划详情页</p> -->
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{visitdetails.customerName}}</span>
                        <span style="margin-left:50px;">{{visitdetails.contactsName}}</span>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="retracts">收起</el-button>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="!retracts">显示</el-button>
                    </div>
                    <div class="card_item">
                        <div class="item_head">拜访主题：<span>{{visitdetails.visitTheme}}</span></div>
                        <div class="item_body">拜访目的：<span>{{visitdetails.visitObjective}}</span></div>
                    </div>
                </el-card>
            </div>
            <div class="bottom1" v-if="thisshow">
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
                            <li>审批人：<span>{{visitdetails.approver}}</span></li>
                            <li>审批状态：<span>{{visitdetails.approver}}</span></li>
                            <li>负责人：<span>{{visitdetails.private_employee}}</span></li>
                            <li>部门：<span>{{visitdetails.deptname}}</span></li>
                            <li>机构：<span>{{visitdetails.parentname}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                </el-card>
            </div>
            <div class="bottom1">
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
                                    <!-- <img src="/upload/staticImg/bg.jpg" width="100%" alt="图片"> -->
                                </el-dialog>
                            </li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                </el-card>
            </div>
            <div class="bottom1">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <div class="block">
                            <span class="rate_text">打分</span>
                            <el-rate class="rate_star" v-model="ratevalue" @change="clickRates"></el-rate>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-col>
        
        <el-col :span="6" style="padding:10px;" class="right">
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                prop="customerName"
                label="公司名称">
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

            tableData:null,
            tableNumber:0,
            page:1,
            limit:20,

            thisshow:true,
            retracts:true,

            ratevalue: null,

            dialogVisible:false
        }
    },
    activated(){
        this.loadData()
        this.loadTable()
    },
    methods:{
        loadData(){
            const _this = this
            this.detailData = this.$store.state.visitdetailsData
            this.visitId = this.detailData.submitData.id

            axios({
                method: 'get',
                url: _this.$store.state.defaultHttp+'visit/selectVisitById.do?cId='+_this.$store.state.iscId + '&id=' + this.visitId,
            }).then(function(res){
                // console.log(res)
                _this.visitdetails = res.data.map.visit
                _this.visitdetails.assistants = []
                _this.visitdetails.assistantsid = []
                if(_this.visitdetails.privateUser !== []){
                    _this.visitdetails.privateUser.forEach(item => {
                        _this.visitdetails.assistants.push(item.private_name)
                        _this.visitdetails.assistantsid.push(item.private_id)
                    });
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        loadTable(){
            const _this = this
            let qs = require('querystring')
            let searchList = {}
            searchList.page = this.page
            searchList.limit = this.limit

            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'visit/selectVisit.do?cId='+_this.$store.state.iscId + '&pId=' + this.$store.state.ispId,
                data: qs.stringify(searchList),
            }).then(function(res){
                let data = res.data.map.success
                // console.log(data)
                _this.tableData = data
                _this.tableNumber = res.data.count
            }).catch(function(err){
                console.log(err);
            });
        },
        getRow(index,row){
            console.log(row.id)
            this.$store.state.visitdetailsData.submitData = {"id":row.id}
            this.$options.methods.loadData.bind(this)(true);
        },
        retract(){
            this.retracts = !this.retracts
            this.thisshow = !this.thisshow
        },
        clickRates(val){
            console.log(val)
        },
        showImg(){
            this.dialogVisible = true
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
    }
    .right{
        height: auto;
        background-color: #fff;
        padding-bottom: 5px;
    }
    .top{
        height: auto;
        background-color: #fff;
    }
    .bottom1{
        height: auto;
        background-color: #fff;
        margin-top: 20px;
        /* padding: 5px 20px; */
    }
    .card_item,.item_body{
        padding: 20px;
        font-size: 14px;
        line-height: 1.5;
    }
    .item_body span{
        word-break: break-all;
        white-space: normal; 
    }
    .block{
        height: 20px;
    }
    .rate_text,.rate_star{
        float: left;
    }
    .rate_star{
        margin-left: 50px;
    }

</style>


