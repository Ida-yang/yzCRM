<template>
    <!-- 合同详情页 -->
    <el-row class="agrdetcontent" :gutter="10">
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card" v-model="agreementdetail">
                    <div slot="header" class="clearfix">
                        <span>{{agreementdetail.poolName}}</span>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="retracts">收起</el-button>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="!retracts">显示</el-button>
                    </div>
                    <div class="text item" v-show="thisshow">
                        <ul>
                            <li>合同代码：<span>{{agreementdetail.contract_number}}</span></li>
                            <li>合同名称：<span>{{agreementdetail.contract_name}}</span></li>
                            <li>商机名称：<span>{{agreementdetail.opportunity_name}}</span></li>
                            <li>合同金额：<span class="bold_span">{{agreementdetail.amount | commaing}} 元</span></li>
                            <li>合同类型：<span>{{agreementdetail.contract_type}}</span></li>
                            <li>客户签约人：<span>{{agreementdetail.signatories}}</span></li>
                            <li>我方签约人：<span>{{agreementdetail.our_signatories}}</span></li>
                            <li>签约时间：<span>{{agreementdetail.start_date}}</span></li>
                            <li>到期时间：<span>{{agreementdetail.end_date}}</span></li>
                            <li>剩余天数：<span>{{agreementdetail.due_time}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                        <div class="audited" v-if="agreementdetail.checkStatus == 1">
                            <img class="audited_img" :src="auditing" alt="审核中">
                        </div>
                        <div class="audited" v-if="agreementdetail.checkStatus == 2">
                            <img class="audited_img" :src="audited" alt="已审核">
                        </div>
                        <div class="audited" v-if="agreementdetail.checkStatus == 3">
                            <img class="audited_img" :src="noaudit" alt="未通过">
                        </div>
                    </div>
                    <div v-show="!thisshow"></div>
                </el-card>
            </div>
            <div class="top">
                <el-card class="box-card" v-model="agreementdetail">
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
            <div class="top">
                <el-tabs v-model="activeName2" type="card">
                    <el-tab-pane label="合同详情" name="first">
                        <div class="uploadBOX">
                            <div class="imgbox" v-for="item in fileList" :key="item.id" @mouseenter="mouseenterdiv(item)" @mouseleave="mouseleavediv(item)">
                                <img :src="item.imgURL" alt="图片" @click="showImg($event,item)">
                                <i class="el-icon-circle-close-outline imgdel" v-if="imgshow" @click="delImg($event,item)"></i>
                            </div>
                            <div class="filebox">
                                <span class="upload">
                                    <input type="file" name="file" @change="tirggerFile($event)"/>
                                </span>
                            </div>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                        <div class="text" style="height:150px;">
                            <ul>
                                <li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li>
                                <li>创建人：<span>{{agreementdetail.private_employee}}</span></li>
                                <li>创建人部门：<span>{{agreementdetail.deptname}}</span></li>
                                <li>创建人机构：<span>{{agreementdetail.parentname}}</span></li>
                                <li>创建时间：<span>{{agreementdetail.create_time}}</span></li>
                                <li>修改时间：<span>{{agreementdetail.update_time}}</span></li>
                            </ul>
                            <p>&nbsp;</p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="回款计划" name="second">
                        <div class="entry">
                            <el-button class="btn info-btn" size="mini" @click="addplan()">新增计划</el-button>
                        </div>
                        <el-table :data="moneyPlanList" border stripe :summary-method="getSummaries" show-summary style="width: 100%">
                            <el-table-column label="期数" fixed header-align="center" align="center" type="index" width="60" />
                            <el-table-column label="公司名称" prop="customerName" min-width="200" />
                            <el-table-column label="合同编号" prop="contract_number" min-width="150" />
                            <el-table-column label="回款阶段" prop="stage" min-width="110" />
                            <el-table-column label="预计回款金额" prop="price" min-width="120">
                                <template slot-scope="scope">
                                    {{scope.row.price | commaing}}
                                </template>
                            </el-table-column>
                            <el-table-column label="预计日期" prop="date" min-width="110" />
                            <el-table-column label="提醒时间" prop="remind_date" min-width="150" />
                            <el-table-column label="备注" prop="remarks" min-width="180" />
                            <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center" v-if="!moneyBackList.length">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="editplan(scope.$index, scope.row)">编辑</el-button>
                                    <el-button size="mini" type="danger" @click="delplan(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <br><br>
                        <div class="entry">
                            <el-button class="btn info-btn" size="mini" @click="addback()">新增回款</el-button>
                        </div>
                        <el-table :data="moneyBackList" border stripe :summary-method="getSummaries" show-summary style="width: 100%">
                            <el-table-column label="期数" fixed header-align="center" align="center" type="index" width="60" />
                            <el-table-column label="公司名称" prop="customerName" min-width="200" />
                            <el-table-column label="合同编号" prop="contract_number" min-width="150" />
                            <el-table-column label="回款阶段" prop="back_plan" min-width="110" />
                            <el-table-column label="回款金额" prop="price" min-width="110">
                                <template slot-scope="scope">
                                    {{scope.row.price | commaing}}
                                </template>
                            </el-table-column>
                            <el-table-column label="回款日期" prop="createTime" min-width="110" />
                            <el-table-column label="备注" prop="remarks" min-width="180" />
                            <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="editback(scope.$index, scope.row)">编辑</el-button>
                                    <el-button size="mini" type="danger" @click="delback(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="产品" name="third">
                        <span style="text-align:center;">暂无计划</span>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
        
        <el-col :span="6" style="padding:10px;min-height:635px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.keyword" placeholder="请输入公司名称" style="width:80%;" @keyup.enter.native="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="公司名称" prop="poolName">
                    <template slot-scope="scope">
                    <div @click="getRow(scope.$index, scope.row)">
                        {{scope.row.poolName}}
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
        <el-dialog title="回款计划" :visible.sync="dialogVisible3" :close-on-click-modal="false" width="50%">
            <el-form ref="moneyPlan" :model="moneyPlan" :rules="rules" label-width="130px">
                <el-form-item label="总金额">
                    <el-input v-model="moneyPlan.amount" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="剩余预计回款金额">
                    <el-input v-model="moneyPlan.restamount" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="stage" label="回款阶段" v-show="!moneyPlan.id">
                    <el-select v-model="moneyPlan.stage" placeholder="请选择回款阶段" style="width:100%;">
                        <el-option v-show="moneyPlanList.length < 1" value="首笔款">首笔款</el-option>
                        <el-option value="阶段款">阶段款</el-option>
                        <el-option value="尾笔款">尾笔款</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="price" label="预计回款金额">
                    <el-input v-model="moneyPlan.price" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item prop="date" label="预计回款时间">
                    <el-date-picker v-model="moneyPlan.date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" style="width:100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="提醒时间">
                    <el-date-picker v-model="moneyPlan.remind_date" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" default-time="12:00:00" size="small" style="width:100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="moneyPlan.remarks" type="textarea" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="planSubmit()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="回款信息" :visible.sync="dialogVisible4" :close-on-click-modal="false" width="50%">
            <el-form ref="moneyBack" :model="moneyBack" :rules="rules" label-width="130px">
                <el-form-item label="预计回款金额">
                    <el-input v-model="moneyBack.amount" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="剩余预计回款金额">
                    <el-input v-model="moneyBack.restamount" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="back_plan_id" label="回款阶段">
                    <el-select v-model="moneyBack.back_plan_id" placeholder="请选择回款阶段" style="width:100%;">
                        <el-option v-for="a in moneyPlanList" :key="a.id" :label="a.stage" :value="a.id">{{a.stage}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="prices" label="回款金额">
                    <el-input v-model="moneyBack.price" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item prop="createTime" label="回款时间">
                    <el-date-picker v-model="moneyBack.createTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" style="width:100%;"></el-date-picker>
                </el-form-item>
                <el-form-item prop="pay_type_id" label="支付方式">
                    <el-select v-model="moneyBack.pay_type_id" placeholder="请选择支付方式" style="width:100%;">
                        <el-option v-for="item in payList" :key="item.id" :label="item.typeName" :value="item.id">{{item.typeName}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="moneyBack.remarks" type="textarea" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="backSubmit()">确 定</el-button>
            </span>
        </el-dialog>
    </el-row>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'agreementDetails',
        store,
        filters:{
            commaing(value){
                let intPart = Math.trunc(value) //获取整数部分
                let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                return intPartFormat
            },
        },
        data(){
            return {
                detailData:null,
                searchList:{
                    keyword:null,
                },
                agreementdetail:{},
                record:null,
                fastcontactList:null,
                contactList:null,
                activeName2: 'first',
                tableData: null,
                tableNumber:null,
                page:1,
                limit:20,
                thisshow:true,
                idArr:{
                    id:null,
                },
                dataList:null,
                fileList:null,
                imgid:null,
                imgurl:null,
                dialogImageUrl:null,
                dialogVisible:false,
                imgshow:false,

                retracts:true,

                examineList:[],
                hasCheck:null,   //是否有审核权
                hasRecheck:null,   //是否有撤回权

                examineLog:[],

                dialogVisible2:false,
                exaform:{
                    status:null,
                    remarks:null,
                },

                moneyPlanList:[],

                dialogVisible3:false,
                moneyPlan:{
                    id:null,
                    amount:null,
                    restamount:null,
                    date:null,
                    price:null,
                    // stage:null,
                    back_plan_id:null,
                    contract_id:null,
                    customerpool_id:null,
                    remarks:null,
                    remind_date:null,
                },

                moneyBackList:[],
                dialogVisible4:false,
                moneyBack:{
                    id:null,
                    amount:null,
                    restamount:null,
                    createTime:null,
                    price:null,
                    stage:null,
                    contract_id:null,
                    customerpool_id:null,
                    remarks:null,
                    pay_type_id:null,
                    backNo:null,
                },
                payList:[],
                backamount:0,
                backrestamount:0,
                rules:{
                    remarks:[{ required: true, message: '审核意见不能为空', trigger: 'blur' }],
                    stage:[{ required: true, message: '回款阶段不能为空', trigger: 'blur' }],
                    price:[{ required: true, message: '预计回款金额不能为空', trigger: 'blur' }],
                    date:[{ required: true, message: '预计回款时间不能为空', trigger: 'blur' }],
                    prices:[{ required: true, message: '回款金额不能为空', trigger: 'blur' }],
                    createTime:[{ required: true, message: '回款时间不能为空', trigger: 'blur' }],
                    pay_type_id:[{ required: true, message: '支付方式不能为空', trigger: 'blur' }],
                    back_plan_id:[{ required: true, message: '回款阶段不能为空', trigger: 'blur' }],
                },

                auditing: this.$store.state.systemHttp + '/upload/staticImg/inaudit.png',
                audited: this.$store.state.systemHttp + '/upload/staticImg/examine.png',
                noaudit: this.$store.state.systemHttp + '/upload/staticImg/refuse.png'
            }
        },
        activated(){
            this.loadData();
            this.loadIMG()
        },
        methods: {
            loadData() {
                const _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                pageInfo.searchName = this.searchList.keyword
                let data = {}
                data.type = '支付方式'
                //加载详情页右侧表格
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'getContractAll.do?cId='+_this.$store.state.iscId + '&pId=' +_this.$store.state.ispId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
                //加载支付方式
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.payList = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadIMG(){
                const _this = this
                this.detailData = this.$store.state.agreedetailsData.submitData;
                this.idArr.id = this.$store.state.agreedetailsData.submitData.id
                _this.fileList = []
                let qs = require('querystring')
                let data = {}
                data.typetid = this.detailData.id
                data.type = '合同'
                data.pId = this.$store.state.ispId
                data.cId = this.$store.state.iscId

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'imgInfo/getImgInfoByTypeid.do',
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.dataList = res.data
                    let arr = _this.dataList
                    arr.forEach(el => {
                        _this.imgid = el.id
                        _this.imgurl = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.name
                        _this.fileList.push({id:_this.imgid,imgURL:_this.imgurl})
                    });
                }).catch(function(err){
                    _this.$message.error("图片加载失败");
                });
                //加载合同详情
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'getContractById.do?cId='+_this.$store.state.iscId+'&contractId='+this.detailData.id,
                }).then(function(res){
                    _this.agreementdetail = res.data
                    //加载审核流程
                    axios({
                        method:'get',
                        url:_this.$store.state.defaultHttp+'examineRecord/queryExamineRecordList.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId + '&recordId='+_this.agreementdetail.examineRecordId,
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
                        url:_this.$store.state.defaultHttp+'examineLog/queryExamineLogList.do?cId='+_this.$store.state.iscId+'&recordId='+_this.agreementdetail.examineRecordId,
                    }).then(function(res){
                        _this.examineLog = res.data
                    }).catch(function(err){
                        // console.log(err);
                    });
                }).catch(function(err){
                    // console.log(err);
                });

                //加载回款计划
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'backPlan/selectBackPlanByContractId.do?cId='+_this.$store.state.iscId+'&contract_id='+_this.detailData.id,
                }).then(function(res){
                    _this.moneyPlanList = res.data
                }).catch(function(err){
                    // console.log(err);
                });
                //加载回款信息
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'back/selectBackByContactId.do?cId='+_this.$store.state.iscId+'&contract_id='+_this.detailData.id,
                }).then(function(res){
                    _this.moneyBackList = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            tirggerFile (event) {
                const _this = this;
                let file = event.target.files[0]
                let param = new FormData() // 创建form对象
                param.append('file', file, file.name) // 通过append向form对象添加数据
                // console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
                // 添加请求头
                axios.post(this.$store.state.defaultHttp+'contractUpload.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId+'&contractid='+this.detailData.id, param, config)
                .then(res => {
                    if (res.data == 'success') {
                        _this.$message({
                            message:'上传成功',
                            type:'success'
                        })
                        _this.$options.methods.loadIMG.bind(_this)(true);
                    }else{
                        _this.$message({
                            message: res.data,
                            type: 'error'
                        })
                    }
                })
            },
            getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if(column.property == 'price'){
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
                    }else{
                        sums[index] = '';
                    }
                });

                return sums;
            },
            showImg(e,val){
                this.dialogImageUrl = val.imgURL
                this.dialogVisible = true
            },
            delImg(e,val){
                const _this = this;
                let qs = require('querystring')
                let idArr = [];
                idArr.id = val.id
                _this.$confirm('是否确认删除该图片？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'imgInfo/delImgInfoById.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == '200') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.loadIMG.bind(_this)(true);
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新操作");
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });       
                });
            },
            mouseenterdiv(val){
                this.imgshow = true
            },
            mouseleavediv(val){
                this.imgshow = false
            },
            retract(){
                this.thisshow = !this.thisshow
                this.retracts = !this.retracts
            },
            showexamine(e){
                this.exaform.status = e
                this.dialogVisible2 = true
            },
            addplan(){
                let aa = 0
                let bb = this.agreementdetail.amount
                this.moneyPlanList.forEach(el => {
                    if(el.price){
                        aa += el.price
                    }
                });
                let cc = bb - aa
                this.dialogVisible3 = true
                this.moneyPlan = { 
                    id:null, amount:bb, restamount:cc, date:null, price:null, stage:null, remarks:null, remind_date:null,
                    contract_id:this.agreementdetail.contract_id, customerpool_id:this.agreementdetail.customerpool_id,
                }
            },
            editplan(index,row){
                let aa = 0
                let bb = this.agreementdetail.amount
                this.moneyPlanList.forEach(el => {
                    if(el.price){
                        aa += el.price
                    }
                });
                let cc = bb - aa
                this.dialogVisible3 = true
                this.moneyPlan = { 
                    id:row.id, amount:bb, restamount:cc, date:row.date, price:row.price, stage:row.stage, remarks:row.remarks, remind_date:row.remind_date,
                    contract_id:this.agreementdetail.contract_id, customerpool_id:this.agreementdetail.customerpool_id,
                }
            },
            planSubmit(){
                const _this = this
                let qs = require('querystring')
                let data = {
                    id:this.moneyPlan.id,
                    date:this.moneyPlan.date,
                    price:this.moneyPlan.price,
                    stage:this.moneyPlan.stage,
                    contract_id:this.moneyPlan.contract_id,
                    customerpool_id:this.moneyPlan.customerpool_id,
                    remarks:this.moneyPlan.remarks,
                    remind_date:this.moneyPlan.remind_date,
                    pId:this.$store.state.ispId,
                }

                let flag = false
                if(!data.date){
                    _this.$message({
                        message: '预计回款时间不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.stage){
                    _this.$message({
                        message: '回款阶段不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.price){
                    _this.$message({
                        message: '预计回款金额不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(data.price > this.moneyPlan.restamount){
                    _this.$message({
                        message: '预计回款金额不能超过' + this.moneyPlan.restamount + '元',
                        type: 'error'
                    });
                    flag = true
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'backPlan/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data),
                }).then(function(res){
                    if(res.data.code && res.data.code == '200') {
                        _this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        _this.dialogVisible3 = false
                        _this.$options.methods.loadIMG.bind(_this)(true);
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    _this.$message.error("操作失败,请重新操作");
                })
            },
            delplan(index,row){
                const _this = this;
                let qs = require('querystring')
                let idArr = [];
                idArr.id = row.id
                _this.$confirm('是否确认删除该回款计划？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'backPlan/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == '200') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.loadIMG.bind(_this)(true);
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新操作");
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });       
                });
            },
            addback(){
                let aa = 0
                let bb = this.agreementdetail.amount
                this.moneyBackList.forEach(el => {
                    if(el.price){
                        aa += el.price
                    }
                });
                let cc = bb - aa
                this.dialogVisible4 = true
                this.$store.commit('getNowDate')
                this.moneyBack = { 
                    id:null, price:null, back_plan_id:null, remarks:null, pay_type_id:null, amount:bb, restamount:cc, backNo:null,
                    createTime:this.$store.state.nowdate, contract_id:this.agreementdetail.contract_id, customerpool_id:this.agreementdetail.customerpool_id,
                }
            },
            editback(index,row){
                let aa = 0
                let bb = this.agreementdetail.amount
                this.moneyBackList.forEach(el => {
                    if(el.price){
                        aa += el.price
                    }
                });
                let cc = bb - aa
                this.dialogVisible4 = true
                this.moneyBack = { 
                    id:row.id, backNo:row.backNo, price:row.price, back_plan_id:row.back_plan_id, remarks:row.remarks, pay_type_id:row.pay_type_id, amount:bb, restamount:cc, 
                    createTime:row.createTime, contract_id:this.agreementdetail.contract_id, customerpool_id:this.agreementdetail.customerpool_id,
                }
            },
            backSubmit(){
                const _this = this
                let qs = require('querystring')
                let data = {
                    id:this.moneyBack.id,
                    createTime:this.moneyBack.createTime,
                    price:this.moneyBack.price,
                    backNo:this.moneyBack.backNo,
                    back_plan_id:this.moneyBack.back_plan_id,
                    contract_id:this.moneyBack.contract_id,
                    customerpool_id:this.moneyBack.customerpool_id,
                    remarks:this.moneyBack.remarks,
                    pay_type_id:this.moneyBack.pay_type_id,
                    pId:this.$store.state.ispId,
                    secondid:this.$store.state.deptid,
                    deptid:this.$store.state.insid,
                    type:'合同'
                }

                let flag = false
                if(!data.createTime){
                    _this.$message({
                        message: '回款时间不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.price){
                    _this.$message({
                        message: '回款金额不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.pay_type_id){
                    _this.$message({
                        message: '支付方式不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.back_plan_id){
                    _this.$message({
                        message: '回款阶段不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(data.price > this.moneyBack.restamount){
                    _this.$message({
                        message: '回款金额不能超过' + this.moneyBack.restamount + '元',
                        type: 'error'
                    });
                    flag = true
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'back/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data),
                }).then(function(res){
                    if(res.data.code && res.data.code == '200') {
                        _this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        _this.dialogVisible4 = false
                        _this.$options.methods.loadIMG.bind(_this)(true);
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    _this.$message.error("操作失败,请重新操作");
                })
            },
            delback(index,row){
                const _this = this;
                let qs = require('querystring')
                let idArr = [];
                idArr.id = row.id
                _this.$confirm('是否确认删除该回款信息？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'back/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == '200') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.loadIMG.bind(_this)(true);
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新操作");
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });       
                });
            },
            toexamine(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.detailData.id
                data.recordId = this.agreementdetail.examineRecordId
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
                        _this.$options.methods.loadIMG.bind(_this)()
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
            getRow(index,row){
                this.$store.state.agreedetailsData.submitData = {"id":row.contract_id}
                this.idArr.contractId = row.contract_id
                this.$options.methods.loadIMG.bind(this)(true);
            },
            search(){
                const _this = this;
                _this.$options.methods.loadData.bind(_this)();
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
    .agrdetcontent{
        background-color: #f7f7f7;
        height: auto;
        min-height: 100%;
    }
    .fileinput{
        width: 100px;
        height: 100px;
        background-color: #ffffff;
        border: 1px dashed #409EFF;
    }
    /* .fileinputnone{
        background-color: transparent;
    }
    .fileinputnone input{
        height: 100px;
        right: 0;
        top:30px;
        opacity: 0;
        cursor: pointer;
    }
    .fileinputnone .el-input__inner{
        background-color: transparent;
        padding: 0;
        height: 100px !important;
        color: transparent;
    } */
    .audited{
        position: absolute;
        right: 45%;
        top: 90px;
    }
    .audited .audited_img{
        width: 150px;
        height: 75px;
        transform: rotate(-10deg)
    }
    .qingxi{
        opacity: 1;
    }
    .mohu{
        opacity: 0.3;
    }
</style>
