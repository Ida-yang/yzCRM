<template>
    <!-- 商机详情页 -->
    <el-row class="oppdetcontent" :gutter="10">
        <!-- <p>商机详情页</p> -->
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{customerpool.name}}</span>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="retracts">收起</el-button>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="!retracts">显示</el-button>
                    </div>
                    <div class="text item" v-show="thisshow">
                        <ul>
                            <li>姓名：<span>{{contacts.coName}}</span></li>
                            <li>手机：<span>{{contacts.phone}}</span></li>
                            <li>电话：<span>{{contacts.telephone}}</span></li>
                            <li>邮箱：<span>{{contacts.email}}</span></li>
                            <li>QQ：<span>{{contacts.qq}}</span></li>
                            <li>微信：<span>{{contacts.wechat}}</span></li>
                            <li>地址：<span>{{customerpool.address}}</span></li>
                            <li>性别：<span>{{contacts.sex}}</span></li>
                            <li>职务：<span>{{contacts.identity}}</span></li>
                            <li>备注：<span>{{customerpool.remark}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                    <div v-show="!thisshow"></div>
                </el-card>
            </div>
            <div class="bottom1">
                <el-card class="box-card step_process">
                    <div slot="header" class="clearfix">
                        <span>{{opportunitydetail.opportunity_name}}</span>
                        <el-button class="info-btn" size="mini" style="float:right;margin-left:10px;" @click="nextStep()" v-if="shownext">下一步</el-button>
                        <el-button class="info-btn" size="mini" style="float:right;margin-left:100px;" @click="endStep()" v-if="shownext">失败关闭</el-button>
                        <span style="line-height:20px;float:right;margin-right:10px;font-size:14px;" v-if="showfail">该商机已关闭</span>
                        <span style="line-height:20px;float:right;margin-right:10px;font-size:14px;" v-if="showsuccess">签约成功！</span>
                    </div>
                    <el-steps :active="active" finish-status="success" :process-status="isprocess" align-center style="padding:10px;">
                        <el-step v-for="item in stepList" :key="item.step_id" :title="item.step_name" :description="item.step_probability">
                            <template slot="description">
                                <p>成功几率：{{item.step_probability}}%</p>
                                <p v-if="showcreate">{{item.createTime}}</p>
                                <p v-if="showdurate">{{item.duration}}</p>
                            </template>
                        </el-step>
                    </el-steps>
                </el-card>
            </div>
            <div class="bottom2">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>基本信息</span>
                    </div>
                    <div class="text item" style="min-height:150px;">
                        <ul>
                            <li>负责人：<span>{{privateUser.private_employee}}</span></li>
                            <li>负责人部门：<span>{{opportunitydetail.deptname}}</span></li>
                            <li>负责人机构：<span>{{opportunitydetail.parentname}}</span></li>
                            <li>客户决策人：<span>{{contacts.coName}}</span></li>
                            <li>创建时间：<span>{{opportunitydetail.opportunity_time}}</span></li>
                            <li>签约时间：<span>{{contractTime}}</span></li>
                            <li>失败时间：<span>{{failTime}}</span></li>
                            <li>预计成交金额：<span>{{opportunitydetail.opportunity_achievement}}</span></li>
                            <li>预计成交时间：<span>{{opportunitydetail.opportunity_deal}}</span></li>
                            <!-- <li>预计成交几率：<span>{{opportunitydetail.opportunityProgress.progress_probability}} %</span></li> -->
                            <li>备注：<span>{{opportunitydetail.opportunity_remarks}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                </el-card>
            </div>
        </el-col>
        
        <el-col :span="6" style="padding:10px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.keyword" placeholder="请输入公司名称" style="width:80%;" @keyup.enter.native="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
            </div>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                prop="customerpool[0].name"
                label="公司名称">
                    <template slot-scope="scope">
                    <div @click="getRow(scope.$index, scope.row)">
                        {{scope.row.customerpool[0].name}}
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
        name:'businessOpportunityDetails',
        store,
        data(){
            return {
                detailData:null,
                searchList:{
                    keyword:null,
                },
                opportunitydetail:{},
                contacts:{},
                customerpool:{},
                privateUser:{},
                contractTime:null,
                failTime:null,

                tableData: null,
                tableNumber:null,
                page:1,
                limit:20,

                thisshow:true,
                idArr:{
                    opportunity_id:null,
                },

                active: 0,
                stepList:null,

                steptime:null,

                addstep:null,
                shownext:true,
                showfail:false,
                showsuccess:false,
                showcreate:false,
                showdurate:false,
                isprocess:'process',

                retracts:true,
            }
        },
        // mounted(){
        //     this.loadTable()
        //     this.loadData();
        // },
        activated(){
            this.loadTable()
            this.loadData();
        },
        methods: {
            loadTable(){
                this.detailData = this.$store.state.oppdetailsData.submitData;
                this.idArr.opportunity_id = this.$store.state.oppdetailsData.submitData.id
                const _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadData() {
                const _this = this
                //详情页
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'opportunity/getopportunityById.do?cId='+_this.$store.state.iscId+'&opportunity_id='+_this.detailData.id,
                }).then(function(res){
                    _this.opportunitydetail = res.data.map.success[0]
                    _this.contacts = res.data.map.success[0].contacts[0]
                    _this.privateUser = res.data.map.success[0].privateUser[0]
                    _this.customerpool = res.data.map.success[0].customerpool[0]
                    _this.stepList = _this.opportunitydetail.addstep
                    _this.stepList.length = _this.opportunitydetail.addstep.length - 1
                    _this.addstep = _this.opportunitydetail.opportunityProgress
                    let addStep = _this.addstep
                    if(addStep){
                        for(var i = 0,length = addStep.length;i < length;i++){
                            _this.stepList[i].createTime = addStep[i].createTime
                            _this.steptime = addStep[i].createTime
                            if(addStep[i].step_probability == '0'){
                                _this.active = i
                                _this.shownext = false
                                _this.showfail = true
                                _this.showsuccess = false
                                _this.isprocess = 'error'
                                _this.failTime = addStep[i].createTime
                            }else if(addStep[i].progress_probability == '100'){
                                _this.active = i+1
                                _this.shownext = false
                                _this.showfail = false
                                _this.showsuccess = true
                                _this.isprocess = 'wait'
                                _this.contractTime = addStep[i].createTime
                            }else{
                                _this.active = i+1
                                _this.shownext = true
                                _this.showfail = false
                                _this.showsuccess = false
                                _this.isprocess = 'process'
                            }
                            if(i !== 0){
                                let begintime = new Date(addStep[i].previousTime.replace(/-/g, "/"))
                                let endtime = new Date(addStep[i].createTime.replace(/-/g, "/"))
                                _this.showcreate = true
                                _this.showdurate = true
                                let dateDiff = endtime.getTime() - begintime.getTime();
                                let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
                                _this.stepList[i].duration = '历时：' + dayDiff + '天'
                            }else{
                                _this.showdurate = false
                                _this.showcreate = true
                            }
                        }
                    }
                }).catch(function(err){
                    _this.$message.error("商机详情加载失败,请重新进入页面");
                });
            },
            nextStep(){
                for(var i = 0,length = this.stepList.length;i < length;i++){
                    const _this = this;
                    let qs =require('querystring')
                    let data = {}
                    data.previousTime = this.steptime + ':00'
                    data.deptid = this.$store.state.insid
                    data.secondid = this.$store.state.deptid
                    data.oy_id = this.detailData.id
                    if(_this.active == i){
                        data.stepId = this.stepList[i].step_id
                        data.progress_probability = this.stepList[i].step_probability
                        if(data.progress_probability == '100'){
                            _this.shownext = false
                        }
                        _this.$confirm('确认修改商机进度吗？一旦确定将不可撤回','提示',{
                            confirmButtonText:'确定',
                            cancelButtonText:'取消',
                        }).then(({value}) =>{
                            axios({
                                method:'post',
                                url:_this.$store.state.defaultHttp+ 'saveOpportunityProgress.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                                data:qs.stringify(data),
                            }).then(function(res){
                                if(res.data.code && res.data.code == 200) {
                                    _this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    _this.active += 1
                                    _this.$options.methods.loadData.bind(_this)(true);
                                } else {
                                    _this.$message({
                                        message: res.data.msg,
                                        type: 'error'
                                    });
                                }
                            }).catch(function(err){
                                _this.$message.error("修改失败,请重新修改");
                            })
                        }).catch(() => {
                            _this.shownext = true      
                        });
                    }
                }
            },
            endStep(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.previousTime = this.steptime + ':00'
                data.deptid = this.$store.state.insid
                data.secondid = this.$store.state.deptid
                data.oy_id = this.detailData.id
                data.stepId = 100
                _this.$confirm('确认关闭商机进度吗？一旦确定将不可撤回','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                }).then(({value}) =>{
                    axios({
                        method:'post',
                        url:_this.$store.state.defaultHttp+ 'saveOpportunityProgress.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                        data:qs.stringify(data),
                    }).then(function(res){
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '关闭成功',
                                type: 'success'
                            });
                            _this.isprocess = 'error'
                            _this.shownext = false
                            _this.showfail = true
                            _this.$options.methods.loadData.bind(_this)(true);
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("关闭失败,请重新关闭");
                    })
                })
            },
            retract(){
                this.thisshow = !this.thisshow
                this.retracts = !this.retracts
            },
            getRow(index,row){
                this.$store.state.oppdetailsData.submitData = {"id":row.opportunity_id}
                this.idArr.opportunity_id = row.opportunity_id
                this.$options.methods.loadData.bind(this)(true);
            },
            search(){
                const _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.searchName = this.searchList.keyword;
                searchList.page = this.page;
                searchList.limit = this.limit;
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleSizeChange(val) {
                const _this = this;
                _this.limit = val;
                _this.$options.methods.loadData.bind(_this)();
            },
            handleCurrentChange(val) {
                const _this = this;
                _this.page = val;
                _this.$options.methods.loadData.bind(_this)();
            },
        },
    }
</script>

<style>
    .oppdetcontent{
        background-color: #f7f7f7;
        height: auto;
    }
    .number{
        padding: 0;
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
    .bottom2{
        height: 100%;
        background-color: #fff;
        margin-top: 20px;
        /* padding: 5px 20px; */
    }
    .el-card__body{
        padding: 0;
    }
</style>
