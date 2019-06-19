<template>
    <el-row class="rec_detail" :gutter="10">
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card" v-model="receivdetailData">
                    <div slot="header" class="clearfix">
                        <span class="bold_span">回款单：{{receivdetailData.backNo}}</span>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="retracts">收起</el-button>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="!retracts">显示</el-button>
                    </div>
                    <div class="text item" v-show="thisshow">
                        <ul>
                            <li>公司名称：<span>{{receivdetailData.customerName}}</span></li>
                            <li>日期：<span>{{receivdetailData.createTime}}</span></li>
                            <li>支付方式：<span>{{receivdetailData.pay_type}}</span></li>
                            <li>总金额：<span class="bold_span">{{receivdetailData.totalAmount | commaing}} 元</span></li>
                            <li>已回款金额：<span>{{receivdetailData.amount_of_repayment | commaing}}</span></li>
                            <li>本次回款金额：<span>{{receivdetailData.price | commaing}}</span></li>
                            <li>剩余金额：<span>{{receivdetailData.residual_amount | commaing}}</span></li>
                            <li>原单号：<span>{{receivdetailData.contract_number}}</span></li>
                            <li>原单类型：<span>{{receivdetailData.type}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                        <div class="audited" v-if="receivdetailData.checkStatus == 1">
                            <img class="audited_img" :src="auditing" alt="审核中">
                        </div>
                        <div class="audited" v-if="receivdetailData.checkStatus == 2">
                            <img class="audited_img" :src="audited" alt="已审核">
                        </div>
                        <div class="audited" v-if="receivdetailData.checkStatus == 3">
                            <img class="audited_img" :src="noaudit" alt="未通过">
                        </div>
                    </div>
                    <div v-show="!thisshow"></div>
                </el-card>
            </div>

        <div class="top">
                <el-card class="box-card" v-model="receivdetailData">
                    <div slot="header" class="clearfix">
                        <el-popover placement="right-start" width="200" trigger="click">
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
                        <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(1)" v-show="hasCheck">通过</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(2)" v-show="hasCheck">拒绝</el-button>
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
                                        <span v-if="item.examineStatus == 1" class="examine_status"><i class="el-icon-success" style="color:#67c23a;font-size:15px"></i> 已通过</span>
                                        <span v-if="item.examineStatus == 2" class="examine_status"><i class="el-icon-circle-close" style="color:#f56c6c;font-size:18px"></i> 已拒绝</span>
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
            
            <div class="bottom">
                <el-tabs v-model="activeName2" type="card">
                    <el-tab-pane label="回款信息" name="first">
                        <el-table :data="moneyBackList" border stripe style="width: 100%">
                            <el-table-column label="期数" header-align="center" fixed align="center" type="index" width="90" />
                            <el-table-column label="客户名称" min-width="180" prop="customerName" />
                            <el-table-column label="合同编号" min-width="150" prop="contract_number" />
                            <el-table-column label="回款阶段" min-width="110" prop="back_plan" />
                            <el-table-column label="回款金额" min-width="110" prop="price" />
                            <el-table-column label="回款日期" min-width="110" prop="createTime" />
                            <el-table-column label="备注" min-width="110" prop="remarks" />
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="回款详情" name="second">
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>

        <el-col :span="6" style="padding:10px;min-height:635px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.keyword" placeholder="请输入回款单号" style="width:80%;" @input="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="回款单号" prop="backNo">
                    <template slot-scope="scope">
                    <div @click="getRow(scope.$index, scope.row)">
                        {{scope.row.backNo}}
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

        <el-dialog title="审核意见" :visible.sync="dialogVisible2" :close-on-click-modal="false" width="40%">
            <el-form ref="exaform" :model="exaform" :rules="rules">
                <el-form-item prop="remarks">
                    <el-input v-model="exaform.remarks" type="textarea" rows="5" placeholder="请输入审核意见（必填）"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="toexamine()">确 定</el-button>
            </span>
        </el-dialog>
    </el-row>
</template>

<script>
    import store from '../../../../store/store';
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'receivedetail',
        store,
        filters:{
            commaing(value){
                let intPart = Math.trunc(value) //获取整数部分
                let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                return intPartFormat
            },
        },
        data(){
            return{
                msg:'receivedetail.vue',

                receivdetailData:[],
                examineList:[],
                examineLog:[],

                hasCheck:null,//是否有审批权
                hasRecheck:null,//是否有撤回权

                retracts:true,
                thisshow:true,

                activeName2:'first',

                moneyBackList:[],

                tableData:[],
                tableNumber:0,
                page:1,
                limit:20,
                searchList:{
                    keyWord:null,
                },

                dialogVisible2:false,
                exaform:{
                    status:null,
                    remarks:null,
                },
                rules:{},
            }
        },
        activated(){
            this.loadData()
            this.loadTable()
        },
        methods:{
            loadData(){
                const _this = this
                let detailData = this.$store.state.receivdetailData
                let qs = require('querystring')
                let data = {}
                data.id = detailData.id

                //加载回款详情
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'back/selectById.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.receivdetailData = res.data
                    _this.receivdetailData.residual_amount = res.data.totalAmount - res.data.amount_of_repayment
                    //加载审核流程
                    axios({
                        method:'get',
                        url:_this.$store.state.defaultHttp+'examineRecord/queryExamineRecordList.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId + '&recordId='+_this.receivdetailData.examineRecordId,
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
                        url:_this.$store.state.defaultHttp+'examineLog/queryExamineLogList.do?cId='+_this.$store.state.iscId+'&recordId='+_this.receivdetailData.examineRecordId,
                    }).then(function(res){
                        _this.examineLog = res.data
                    }).catch(function(err){
                        // console.log(err);
                    });
                    //加载回款信息
                    axios({
                        method:'get',
                        url:_this.$store.state.defaultHttp+'back/selectBackByContactId.do?cId='+_this.$store.state.iscId+'&contract_id='+_this.receivdetailData.contract_id,
                    }).then(function(res){
                        _this.moneyBackList = res.data
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
                let data = {}
                data.page = this.page
                data.limit = this.limit
                data.stateid = 0
                data.keyWord = this.searchList.keyWord

                //加载回款列表
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'back/queryForList.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            toexamine(){},
            retract(){
                this.thisshow = !this.thisshow
                this.retracts = !this.retracts
            },
            showexamine(e){
                this.exaform.status = e
                this.dialogVisible2 = true
            },
            getRow(index,row){
                this.$store.state.receivdetailData = {"id":row.id}
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
    .rec_detail{
        background-color: #f7f7f7;
        min-height: 100%;
        height: auto;
    }
</style>
