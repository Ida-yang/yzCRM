<template>
    <div class="orderadd_c">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="bold_span">订单收款单<span class="bold_span">：{{orderReceiveDetailData.backNo}}</span></span>
                <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()">审核</el-button>
            </div>
            <div  class="text item">
                <ul>
                    <li>公司名称：<span>{{orderReceiveDetailData.customerName}}</span></li>
                    <li>收款日期：<span>{{orderReceiveDetailData.createTime}}</span></li>
                    <li>收款方式：<span>{{orderReceiveDetailData.pay_type}}</span></li>
                    <li>收款总金额：<span class="bold_span">{{orderReceiveDetailData.money | commaing}} 元</span></li>
                    <li>折后金额：<span>{{orderReceiveDetailData.discountAfter | commaing}} 元</span></li>
                    <li>折扣额：<span>{{orderReceiveDetailData.discountAmount | commaing}} 元</span></li>
                    <li>折扣率：<span>{{orderReceiveDetailData.discount}} %</span></li>
                    <li>备注：<span>{{orderReceiveDetailData.remarks}}</span></li>
                    <li v-for="(item,index) in fieldData" :key="index">
                        {{item.name}}：<span>{{item.value}}</span>
                    </li>
                </ul>
                <div class="orderaudit" v-if="orderReceiveDetailData.checkStatus == 1">
                    <img class="audit_img" :src="auditing" alt="审核中">
                </div>
                <div class="orderaudit" v-if="orderReceiveDetailData.checkStatus == 2">
                    <img class="audit_img" :src="audited" alt="已审核">
                </div>
                <div class="orderaudit" v-if="orderReceiveDetailData.checkStatus == 3">
                    <img class="audit_img" :src="noaudit" alt="未通过">
                </div>
            </div>
        </el-card>

        <div class="jobclass_line" v-show="thisshow"></div>
        <div v-show="thisshow">
            <el-card class="box-card">
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
                        <span slot="reference" style="font-size:14px;text-decoration:underline">查看审核历史</span>
                    </el-popover>
                    <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(1)" v-show="hasCheck && orderReceiveDetailData.checkStatus !== 2">通过</el-button>
                    <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(2)" v-show="hasCheck && orderReceiveDetailData.checkStatus !== 2">拒绝</el-button>
                    <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(4)" v-show="hasCheck">驳回</el-button>
                </div>
                <div class="text item">
                    <div class="examine_c">
                        <div v-for="(item,index) in examineList" :key="index" class="examine_item">
                            <el-popover placement="bottom" width="200" trigger="hover" class="examine_cont">
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
                                        <p>{{b.realname + '(' + b.phone + ')'}}</p>
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
        <div v-show="!thisshow"></div>

        <div class="entry">
        </div>
         <el-table :data="itemData" border fit highlight-current-row show-summary :summary-method="getSummary" style="width: 100%">
            <el-table-column header-align="center" align="center" fixed type="index" min-width="45"></el-table-column>

            <el-table-column label="销售单号" prop="orderNo" min-width="200"></el-table-column>

            <el-table-column label="订单日期" prop="orderTime" width="100"></el-table-column>

            <el-table-column label="订单金额" prop="order_money" width="120">
                <template slot-scope="scope">
                    {{ scope.row.order_money | commaing}}
                </template>
            </el-table-column>

            <el-table-column label="已收金额" prop="accepted_money" width="120">
                <template slot-scope="scope">
                    {{ scope.row.accepted_money | commaing}}
                </template>
            </el-table-column>

            <el-table-column label="未收款金额" prop="uncollected_money" width="120">
                <template slot-scope="scope">
                    {{ scope.row.uncollected_money | commaing}}
                </template>
            </el-table-column>

            <el-table-column label="本次回款金额" prop="this_money" min-width="130">
                <template slot-scope="scope">
                    {{ scope.row.this_money | commaing}}
                </template>
            </el-table-column>

            <el-table-column label="备注" prop="remarks" width="180"></el-table-column>
        </el-table>

        <el-form :inline="true" class="uploadForm">
            <el-form-item label="附件" label-width="90px">
                <ul class="fileUl">
                    <li v-for="(item,index) in filesData" :key="index">
                        <a download :href="item.url">{{index + 1}}. {{item.name}}</a>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="图片" label-width="90px">
                <ul class="fileUl">
                    <li v-for="(item,index) in imagesData" :key="index">
                        <a download :href="item.url">{{index + 1}}. {{item.name}}</a>
                    </li>
                </ul>
            </el-form-item>
        </el-form>

        <el-dialog title="审核意见" :close-on-click-modal="false" :visible.sync="dialogVisible2" width="40%">
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
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'orderReceiveDetail',
        store,
        filters:{
            commaing(value){
                if(value){
                    let intPart = Math.trunc(value) //获取整数部分
                    let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                    let floatPart = '.00' // 预定义小数部分
                    let valArray = value.toString().split('.')
                    if(valArray.length === 2) {
                        floatPart = valArray[1].toString() // 拿到小数部分
                        if(floatPart.length === 1) { // 补0,实际上用不着
                            return intPartFormat + '.' + floatPart + '0'
                        }else{
                            return intPartFormat + '.' + floatPart
                        }
                    } else {
                        return intPartFormat + floatPart
                    }
                }
                
            },
        },
        data(){
            return{
                detailData:{},

                orderReceiveDetailData:{},
                fieldData:[],
                itemData:[],
                filesData:[],
                imagesData:[],

                thisshow:false,
                retracts:false,
                hasCheck:null,
                examineLog:[],
                examineList:[],

                dialogVisible2:false,
                exaform:{
                    status:null,
                    remarks:null,
                },
                rules:{
                    remarks:[{ required: true, message: '审核意见不能为空', trigger: 'blur' }]
                },

                auditing: this.$store.state.systemHttp + '/upload/staticImg/inaudit.png',
                audited: this.$store.state.systemHttp + '/upload/staticImg/examine.png',
                noaudit: this.$store.state.systemHttp + '/upload/staticImg/refuse.png',
            }
        },

        activated(){
            this.loadData()
        },

        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')

                this.detailData = this.$store.state.orderReceiveDetailData

                let data = {
                    id: this.detailData.id
                }

                let info = {
                    label: 12,
                    id: this.detailData.id
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'orderBack/selectById.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.orderReceiveDetailData = res.data

                    _this.itemData = res.data.orderBackDetailList

                    _this.$options.methods.loadExamine.bind(_this)()
                    _this.$options.methods.getFiles.bind(_this)()
                }).catch(function(err){
                    // console.log(err);
                });

                //加载自定义字段详情
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'field/information.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(info)
                }).then(function(res){
                    _this.fieldData = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },

            getFiles(){
                this.filesData = []
                this.imagesData = []
                if(this.orderReceiveDetailData.files){
                    let aaa = JSON.parse(this.orderReceiveDetailData.files)
                    aaa.forEach(a => {
                        this.filesData.push({name:a.name,url:this.$store.state.systemHttp + 'upload/'+ this.$store.state.iscId + '/' + a.response})
                    });
                }
                if(this.orderReceiveDetailData.images){
                    let bbb = JSON.parse(this.orderReceiveDetailData.images)
                    bbb.forEach(b => {
                        this.imagesData.push({name:b.name,url:this.$store.state.systemHttp + 'upload/'+ this.$store.state.iscId + '/' + b.response})
                    });
                }

                console.log(this.filesData,this.imagesData)
            },
            
            //加载审核详情和审核历史
            loadExamine(){
                const _this = this
                let qs = require('querystring')
                
                let examine = {
                    checkStatus: this.orderReceiveDetailData.checkStatus,
                    recordId: this.orderReceiveDetailData.examineRecordId,
                    pId: this.$store.state.ispId
                }
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'examineRecord/queryExamineRecordList.do?cId='+_this.$store.state.iscId,
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
                    url:_this.$store.state.defaultHttp+'examineLog/queryExamineLogList.do?cId='+_this.$store.state.iscId+'&recordId='+_this.orderReceiveDetailData.examineRecordId,
                }).then(function(res){
                    _this.examineLog = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },

            getSummary(param){
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if(column.property == 'this_money' || column.property == 'accepted_money' || column.property == 'uncollected_money' || column.property == 'order_money'){
                        sums[index] = values.reduce((acc, cur) => (cur + acc), 0)
                        sums[index] = sums[index].toFixed(2)
                        let intPart = Math.trunc(sums[index])
                        let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                        let floatPart = '.00' // 预定义小数部分
                        let valArray = sums[index].split('.')
                        if(valArray.length === 2) {
                            floatPart = valArray[1].toString() // 拿到小数部分
                            if(floatPart.length === 1) { // 补0,实际上用不着
                                sums[index] = intPartFormat + '.' + floatPart + '0'
                            }else{
                                sums[index] = intPartFormat + '.' + floatPart
                            }
                        } else {
                            sums[index] = intPartFormat + floatPart
                        }
                        sums[index] += ' 元';
                    }else if(column.property == 'num'){
                        sums[index] = values.reduce((acc, cur) => (cur + acc), 0)
                        sums[index]
                    }else{
                        sums[index] = '';
                    }
                });

                return sums;
            },

            retract(){
                this.thisshow = !this.thisshow
                this.retracts = !this.retracts
            },
            showexamine(e){
                this.exaform.status = e
                this.dialogVisible2 = true
            },
            toexamine(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.orderReceiveDetailData.id
                data.recordId = this.orderReceiveDetailData.examineRecordId
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
                        _this.dialogVisible2 = false
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
        },
    }
</script>

<style>
    .fileUl{
        list-style-type: none;
        font-size: 13px;
    }
    .fileUl a{
        color: #606266
    }
</style>