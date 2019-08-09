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
                    </div>
                    <div class="text item">
                        <ul>
                            <li>拜访对象：<span>{{visitdetails.contactsName}}</span></li>
                            <li style="flex:0 0 50%;">联系电话：<span>{{visitdetails.phone}}</span></li>
                        </ul>
                        <div class="item_body">拜访主题：<span>{{visitdetails.visitTheme}}</span></div>
                        <div class="item_body">拜访目的：<span>{{visitdetails.visitObjective}}</span></div>
                        <p>&nbsp;</p>
                        
                        <div class="visitaudited" v-if="visitdetails.checkStatus == 1">
                            <img class="audited_img" :src="auditing" alt="审核中">
                        </div>
                        <div class="visitaudited" v-if="visitdetails.checkStatus == 2">
                            <img class="audited_img" :src="audited" alt="已审核">
                        </div>
                        <div class="visitaudited" v-if="visitdetails.checkStatus == 3">
                            <img class="audited_img" :src="noaudit" alt="未通过">
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="top">
                <el-card class="box-card" v-model="visitdetails">
                    <div slot="header" class="clearfix">
                        <el-popover placement="right-start" width="220" trigger="click">
                            <div style="max-height:400px;overflow-y:overlay">
                                <div class="examine_popover" v-for="(b,j) in examineLog" :key="j">
                                    <span class="examine_ico">
                                        <i v-if="b.examineStatus == 0" class="el-icon-time" style="font-size:20px"></i>
                                        <i v-if="b.examineStatus == 1" class="el-icon-circle-check-outline" style="color:#67c23a;font-size:20px"></i>
                                        <i v-if="b.examineStatus == 2" class="el-icon-circle-close-outline" style="color:#f56c6c;font-size:20px"></i>
                                        <i v-if="b.examineStatus == 3" class="el-icon-time" style="color:#e6a23c;font-size:20px"></i>
                                        <i v-if="b.examineStatus == 5" class="el-icon-circle-plus-outline" style="color:#67c23a;font-size:20px"></i>
                                    </span>
                                    <div class="examint_msg">
                                        <p style="font-size:13px;color:#aaaaaa">{{b.examineTime}}</p>
                                        <p v-if="b.examineStatus == 1">{{b.realname + ' 已审核'}}</p>
                                        <p v-if="b.examineStatus == 2">{{b.realname + ' 已拒绝'}}</p>
                                        <div class="examint_remark"><p>{{b.remarks}}</p></div>
                                    </div>
                                </div>
                            </div>
                            <span slot="reference" style="font-size:14px;;text-decoration:underline">查看审核历史</span>
                        </el-popover>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(1)" v-show="hasCheck && visitdetails.checkStatus !== 2">通过</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(2)" v-show="hasCheck && visitdetails.checkStatus !== 2">拒绝</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(4)" v-show="hasCheck">驳回</el-button>
                    </div>
                    <div class="text item">
                        <div class="examine_c">
                            <div v-for="(item,index) in examineList" :key="index" class="examine_item">
                                <el-popover placement="bottom" width="220" trigger="hover" class="examine_cont">
                                    <div class="examine_popover" v-for="(b,j) in item.userList" :key="j">
                                        <span class="examine_ico">
                                            <i v-if="b.examineStatus == 0" class="el-icon-time" style="font-size:20px"></i>
                                            <i v-if="b.examineStatus == 1" class="el-icon-success" style="color:#67c23a;font-size:18px"></i>
                                            <i v-if="b.examineStatus == 2" class="el-icon-circle-close" style="color:#f56c6c;font-size:20px"></i>
                                            <i v-if="b.examineStatus == 3" class="el-icon-time" style="color:#e6a23c;font-size:20px"></i>
                                            <i v-if="b.examineStatus == 5" class="el-icon-circle-plus" style="color:#67c23a;font-size:20px"></i>
                                        </span>
                                        <div class="examint_msg">
                                            <p style="font-size:13px;color:#aaaaaa">{{b.examineTime}}</p>
                                            <span>{{b.realname + '(' + b.phone + ')'}}</span>
                                            <p v-if="b.examineStatus == 0">未审核此申请</p>
                                            <p v-if="b.examineStatus == 1">通过此申请</p>
                                            <p v-if="b.examineStatus == 2">拒绝此申请</p>
                                            <p v-if="b.examineStatus == 5">创建此申请</p>
                                        </div>
                                    </div>
                                    <div slot="reference" style="width:100%;">
                                        <span class="examine_po" v-if="item.examineStatus == 5 || item.examineStatus == 4">
                                            <img class="examine_img" :src="item.headPortrait" width="50" height="50" />
                                        </span>
                                        <span class="examine_po1" v-if="item.stepType == 2">
                                            <img class="examine_img" :class="{'mohu':item.examineStatus !== 1}" :src="item.headPortrait" width="50" height="50" />
                                        </span>
                                        <div v-if="item.stepType == 3" style="display:inline-block;margin:0 15px;" :style="item.type_style">
                                            <span class="examine_po2" v-for="(a,i) in item.userList" :key="i">
                                                <img class="examine_img" :class="{'mohu':a.examineStatus == 0}" :src="a.headPortrait" width="50" height="50" />
                                            </span>
                                        </div>
                                        <br>
                                        <span v-if="item.examineUserName" class="examine_type">{{item.examineUserName}}</span>
                                        <span v-if="item.stepType == 2" class="examine_type">{{item.userLength + '人或签'}}</span>
                                        <span v-if="item.stepType == 3" class="examine_type">{{item.userLength + '人会签'}}</span>
                                        <br>
                                        <span v-if="item.examineStatus == 0 && index == 1" class="examine_status">一级审核</span>
                                        <span v-if="item.examineStatus == 0 && index == 2" class="examine_status">二级审核</span>
                                        <span v-if="item.examineStatus == 0 && index == 3" class="examine_status">三级审核</span>
                                        <span v-if="item.examineStatus == 0 && index == 4" class="examine_status">四级审核</span>
                                        <span v-if="item.examineStatus == 0 && index == 5" class="examine_status">五级审核</span>
                                        <span v-if="item.examineStatus == 0 && index == 6" class="examine_status">六级审核</span>
                                        <span v-if="item.examineStatus == 1" class="examine_status"><i class="el-icon-success" style="color:#67c23a;font-size:15px"></i> 已审核</span>
                                        <span v-if="item.examineStatus == 2" class="examine_status"><i class="el-icon-circle-close" style="color:#f56c6c;font-size:18px"></i> 未通过</span>
                                        <span v-if="item.examineStatus == 3" class="examine_status"><i class="el-icon-time" style="color:#e6a23c;font-size:18px"></i> 审核中</span>
                                        <span v-if="item.examineStatus == 5" class="examine_status"><i class="el-icon-circle-plus" style="color:#67c23a;font-size:18px"></i> 发起</span>
                                    </div>
                                </el-popover>
                                <span v-if="index !== examineList.length - 1" class="examine_next"><i class="el-icon-arrow-right"></i></span>
                            </div>
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
                            <li style="flex:0 0 66%">完成时间：<span>{{visitdetails.endTime}}</span></li>
                            <li>签到时间：<span>{{visitdetails.timeCheck}}</span></li>
                            <li style="flex:0 0 66%">签到地址：<span>{{visitdetails.addressCheck}}</span></li>
                            <li>图片：
                                <div class="imgbox" v-if="visitdetails.photoCheck">
                                    <img :src="visitdetails.photoName" @click="showImg">
                                </div>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="visitdetails.photoName" alt="">
                                </el-dialog>
                            </li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                </el-card>
            </div>
            <div class="top">
                <el-card class="box-card">
                    <div class="rate_box">
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
                    layout="total, sizes, prev, next"
                    :total="tableNumber">
                </el-pagination>
            </div>
        </el-col>

        
        <el-dialog title="审核意见" :visible.sync="dialogVisibleexa" :close-on-click-modal="false" width="40%">
            <el-form ref="exaform" :model="exaform" :rules="rules">
                <el-form-item prop="remarks">
                    <el-input v-model="exaform.remarks" type="textarea" rows="5" placeholder="请输入审核意见（必填）"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleexa = false">取 消</el-button>
                <el-button type="primary" @click="toexamine()">确 定</el-button>
            </span>
        </el-dialog>
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

                tableData:null,
                tableNumber:0,
                searchName:null,
                page:1,
                limit:20,

                thisshow:true,
                retracts:true,

                examineList:[],
                hasCheck:null,   //是否有审核权
                hasRecheck:null,   //是否有撤回权

                examineLog:[],

                dialogVisibleexa:false,
                exaform:{
                    status:null,
                    remarks:null,
                },
                rules:{
                    remarks:[{ required: true, message: '审核意见不能为空', trigger: 'blur' }]
                },

                // ratevalue: null,
                ratetexts: [ 2 , 4 , 6 , 8 , 10 ],

                dialogVisible:false,

                auditing: this.$store.state.systemHttp + '/upload/staticImg/inaudit.png',
                audited: this.$store.state.systemHttp + '/upload/staticImg/examine.png',
                noaudit: this.$store.state.systemHttp + '/upload/staticImg/refuse.png',
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
                    if(_this.visitdetails.photoCheck){
                        _this.visitdetails.photoName = _this.$store.state.systemHttp + '/upload/' + _this.$store.state.iscId + '/' + _this.visitdetails.photoCheck
                    }
                    let examine = {
                        checkStatus: res.data.map.visit.checkStatus,
                        recordId: res.data.map.visit.examineRecordId,
                        pId: _this.$store.state.ispId
                    }
                    //加载审核流程
                    axios({
                        method:'post',
                        url:_this.$store.state.defaultHttp+'examineRecord/queryExamineRecordList.do?cId='+_this.$store.state.iscId,
                        data: qs.stringify(examine)
                    }).then(function(res){
                        _this.examineList = res.data.steps
                        _this.examineList.forEach((el,index) => {
                            el.userLength = el.userList.length
                            if(el.userLength == 1){
                                el.type_style = 'width:50px;'
                            }else if(el.userLength == 2){
                                el.type_style = 'width:75px;'
                            }else if(el.userLength == 3){
                                el.type_style = 'width:100px;'
                            }else if(el.userLength == 4){
                                el.type_style = 'width:125px;'
                            }else if(el.userLength == 5){
                                el.type_style = 'width:150px;'
                            }
                            
                            if(index == 0){
                                if(el.userList[0].img){
                                    el.headPortrait = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.userList[0].img
                                }else{
                                    el.headPortrait = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                                }
                            }
                            if(el.stepType ==2){
                                for(let i = 0; i < el.userList.length; i ++){
                                    if(el.userList[i].img && el.userList[i].examineStatus !== 0){
                                        el.headPortrait = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.userList[i].img
                                        break
                                    }else if(!el.userList[i].img && el.userList[i].examineStatus !== 0){
                                        el.headPortrait = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                                        break
                                    }else if(el.userList[i].img && el.userList[i].examineStatus == 0){
                                        el.headPortrait = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.userList[i].img
                                        break
                                    }else if(!el.userList[i].img && el.userList[i].examineStatus == 0){
                                        el.headPortrait = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                                        break
                                    }
                                }
                            }
                            if(el.stepType == 3){
                                el.userList.forEach((a,i) => {
                                    if(a.img){
                                        a.headPortrait = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+a.img
                                    }else{
                                        a.headPortrait = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                                    }
                                })
                            }
                        });
                        _this.hasCheck = res.data.isCheck  //是否有审核权
                        _this.hasRecheck = res.data.isRecheck  //是否有撤回权
                    }).catch(function(err){
                        // console.log(err);
                    });
                    //加载审核历史
                    axios({
                        method:'get',
                        url:_this.$store.state.defaultHttp+'examineLog/queryExamineLogList.do?cId='+_this.$store.state.iscId+'&recordId='+_this.visitdetails.examineRecordId,
                    }).then(function(res){
                        _this.examineLog = res.data
                    }).catch(function(err){
                        // console.log(err);
                    });

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
            getRow(index,row){
                this.$store.state.visitdetailsData.submitData = {"id":row.id}
                this.$options.methods.loadData.bind(this)(true)
            },
            retract(){
                this.retracts = !this.retracts
                this.thisshow = !this.thisshow
            },
            showexamine(e){
                this.exaform.status = e
                this.dialogVisibleexa = true
            },
            toexamine(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.visitId
                data.recordId = this.visitdetails.examineRecordId
                data.pId = this.$store.state.ispId
                data.status = this.exaform.status
                data.remarks = this.exaform.remarks

                let flag = false
                if(!data.remarks){
                    _this.$message({
                        message:'审核意见不能为空',
                        type:'error'
                    })
                    flag = true
                }
                if(flag) return

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'examineRecord/auditExamine.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'操作成功',
                            type:'success'
                        })
                        _this.dialogVisibleexa = false
                        _this.exaform.status = null
                        _this.exaform.remarks = null
                        _this.$options.methods.loadData.bind(_this)()
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("审核失败，请稍后再试");
                });
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
                    _this.visitdetails.score = 0
                }else{
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'visit/updateVisitState.do?cId='+_this.$store.state.iscId,
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

    
    .visitaudited{
        position: absolute;
        right: 45%;
        top: 90px;
    }
    .visitaudited .audited_img{
        width: 150px;
        height: 75px;
        transform: rotate(-10deg)
    }

    .rate_box{
        /* line-height: 37px */
        height: 58px;
        padding: 18px;
        box-sizing: border-box
    }

</style>


