<template>
    <div class="orderadd_c">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="bold_span">订单收款单<span class="bold_span">：{{myform.backNo}}</span></span>
                <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()">审核</el-button>
            </div>
            <div class="orderHead">
                <el-form :inline="true" ref="myform" :model="myform" :rules="rules">
                    <el-form-item prop="customerpool_id" class="first_input" label="公司名称" label-width="90px">
                        <el-select v-model="myform.customerpool_id" :disabled="myform.checkStatus !== 0" placeholder="请选择公司名称" class="inputbox" filterable @change="selectCustomer">
                            <el-option v-for="item in customerList" :key="item.id" :label="item.pName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="createTime" class="first_input" label="收款日期" label-width="90px">
                        <el-date-picker v-model="myform.createTime" :disabled="myform.checkStatus !== 0" type="date" placeholder="选择收款日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="inputbox"></el-date-picker>
                    </el-form-item>
                    <el-form-item prop="pay_type_id" class="first_input" label="结算账户" label-width="90px">
                        <el-select v-model="myform.pay_type_id" :disabled="myform.checkStatus !== 0" placeholder="请选择结算账户" class="inputbox">
                            <el-option v-for="item in payTypeMethod" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="first_input" label="收款总金额" label-width="90px">
                        <el-input v-model="myform.money" :disabled="myform.checkStatus !== 0" disabled class="inputbox"></el-input>
                    </el-form-item>
                    <el-form-item prop="discountAfter" class="first_input" label="折后金额" label-width="90px">
                        <el-input v-model="myform.discountAfter" :disabled="myform.checkStatus !== 0" class="inputbox" @input="inputDiscountAfter"></el-input>
                    </el-form-item>
                    <el-form-item class="first_input" label="折扣额" label-width="90px">
                        <el-input v-model="myform.discountAmount" :disabled="myform.checkStatus !== 0" disabled class="inputbox"></el-input>
                    </el-form-item>
                    <el-form-item class="first_input" label="折扣率" label-width="90px">
                        <el-input v-model="myform.discount" :disabled="myform.checkStatus !== 0" disabled class="inputbox">
                            <span slot="suffix" style="margin-right:5px;line-height:34px;">%</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="first_input" label="备注" label-width="90px">
                        <el-input v-model="myform.remarks" :disabled="myform.checkStatus !== 0" class="inputbox"></el-input>
                    </el-form-item>
                    
                    <el-form-item v-for="item in previewData" :key="item.id" :label="item.name" :prop="item.field_name" label-width="90px" class="first_input" style="margin-right:15px">
                        <el-input v-if="item.formType == 'text' || item.formType == 'email'" :disabled="myform.checkStatus !== 0" v-model="item.default_value" :placeholder="item.input_tips" class="inputbox"></el-input>

                        <el-input v-else-if="item.formType == 'textarea'" :disabled="myform.checkStatus !== 0" type="textarea" :maxlength="item.max_length" v-model="item.default_value" :placeholder="item.input_tips" class="inputbox"></el-input>

                        <el-input v-else-if="item.formType == 'number'" :disabled="myform.checkStatus !== 0" onkeyup= "value=value.replace(/[^\d]/g,'')" v-model="item.default_value" :placeholder="item.input_tips" class="inputbox"></el-input>

                        <el-input v-else-if="item.formType == 'floatnumber'" :disabled="myform.checkStatus !== 0" onkeyup= "value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" v-model="item.default_value" :placeholder="item.input_tips" class="inputbox"></el-input>

                        <el-input v-else-if="item.formType == 'mobile'" :disabled="myform.checkStatus !== 0" onkeyup= "value=value.replace(/[^\d]/g,'')" :maxlength="11" v-model="item.default_value" :placeholder="item.input_tips" class="inputbox"></el-input>

                        <el-select v-else-if="item.formType == 'select'" :disabled="myform.checkStatus !== 0" v-model="item.default_value" :placeholder="item.input_tips" class="inputbox">
                            <el-option v-for="o in item.setting" :key="o" :label="o" :value="o"></el-option>
                        </el-select>

                        <el-select v-else-if="item.formType == 'checkbox'" :disabled="myform.checkStatus !== 0" multiple v-model="item.default_value" :placeholder="item.input_tips" class="inputbox">
                            <el-option v-for="o in item.setting" :key="o" :label="o" :value="o"></el-option>
                        </el-select>

                        <el-select v-else-if="item.formType == 'user'" :disabled="myform.checkStatus !== 0" v-model="item.default_value" :placeholder="item.input_tips" class="inputbox">
                            <el-option v-for="o in userData" :key="o.private_id" :label="o.private_employee" :value="o.private_id"></el-option>
                        </el-select>

                        <el-select v-else-if="item.formType == 'structure'" :disabled="myform.checkStatus !== 0" v-model="item.displayVal" :placeholder="item.input_tips" class="noPadding_select inputbox">
                            <el-option class="droplist nopadding_option" :value="item.displayVal">
                                <el-tree 
                                    node-key="deptid" 
                                    highlight-current default-expand-all
                                    ref="tree"
                                    :expand-on-click-node="false"
                                    :data="deptData"
                                    :props="defaultProps"
                                    @node-click="handlecheck($event,item)">
                                </el-tree>
                            </el-option>
                        </el-select>

                        <el-date-picker v-else-if="item.formType == 'date'" :disabled="myform.checkStatus !== 0" v-model="item.default_value" type="date" :placeholder="item.input_tips" class="inputbox"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                        </el-date-picker>

                        <el-date-picker v-else-if="item.formType == 'datetime'" :disabled="myform.checkStatus !== 0" v-model="item.default_value" type="datetime" :placeholder="item.input_tips" class="inputbox"
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                        
                        <el-upload v-else-if="item.formType == 'file'" :disabled="myform.checkStatus !== 0" class="upload-demo" :action="doUpload" :on-success="uploadSuccess" :before-upload="beforeUpload">
                            <el-button size="mini" class="info-btn">上传</el-button>
                            <div slot="tip" class="el-upload__tip" style="margin-top: -20px">{{item.input_tips}}</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
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
            <el-button class="btn info-btn" size="mini" icon="el-icon-circle-plus-outline" v-if="myform.checkStatus == 0" @click="handleAdd"></el-button>
        </div>
        <el-table v-loading="listLoading" :data="itemData" border fit highlight-current-row show-summary :summary-method="getSummary" @cell-click="cellClick" style="width: 100%">
            <el-table-column header-align="center" align="center" fixed type="index" min-width="45"></el-table-column>

            <el-table-column label="销售单号" prop="orderNo" min-width="200">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-select v-model="scope.row.orderNo" placeholder="请选择" filterable @focus="handleFoces(scope.$index,scope.row)" @change="selectOrder">
                            <el-option class="droplist" v-for="(o,j) in selectData" :key="j" :label="o.orderNo" :value="o.orderNo"></el-option>
                        </el-select>
                    </template>
                    <span v-else>{{ scope.row.orderNo }}</span>
                </template>
            </el-table-column>

            <el-table-column label="订单日期" prop="orderTime" width="100"></el-table-column>

            <el-table-column label="订单金额" prop="order_money" width="120"></el-table-column>

            <el-table-column label="已收金额" prop="accepted_money" width="120"></el-table-column>

            <el-table-column label="未收款金额" prop="uncollected_money" width="120"></el-table-column>

            <el-table-column label="本次回款金额" prop="this_money" min-width="130">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.this_money" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)"></el-input>
                    </template>
                    <span v-else>{{ scope.row.this_money}}</span>
                </template>
            </el-table-column>

            <el-table-column label="备注" prop="remarks" min-width="180">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.remarks" class="edit-input" size="small"/>
                    </template>
                    <span v-else>{{ scope.row.remarks }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="90" fixed="right" v-if="myform.checkStatus == 0">
                <template slot-scope="scope">
                    <el-button type="success" plain style="width:30px;height:30px;padding:0" :disabled="!scope.row.edit" icon="el-icon-circle-check-outline" @click="rowEdit(scope.row)"></el-button>
                    <el-button type="danger" plain style="width:30px;height:30px;padding:0" icon="el-icon-delete" @click="rowDelete(scope.$index,scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- <el-form :inline="true" ref="myform" :model="myform" class="uploadForm">
            <el-form-item label="上传附件" label-width="90px">
                <el-upload class="upload-demo" :disabled="myform.checkStatus !== 0" :file-list="filesData" :action="doUpload" :multiple="true" :limit="3" :on-success="fileUploadSuccess" :before-upload="beforeUpload" :on-exceed="uploadExceed">
                    <el-button size="mini" type="info-btn">上传</el-button>
                    <div slot="tip" class="el-upload__tip" style="margin-top: -20px">附件大小不能超过5M，最多可上传3个</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="上传图片" label-width="90px">
                <el-upload class="upload-demo" :disabled="myform.checkStatus !== 0" :file-list="imagesData" :action="doUpload" :multiple="true" :limit="3" :on-success="imageUploadSuccess" :before-upload="beforeUpload" :on-exceed="uploadExceed">
                    <el-button size="mini" type="info-btn">上传</el-button>
                    <div slot="tip" class="el-upload__tip" style="margin-top: -20px">图片大小不能超过5M，最多可上传3个</div>
                </el-upload>
            </el-form-item>
        </el-form> -->
                
        <div class="submit_btn" v-if="myform.checkStatus == 0">
            <el-button type="primary" :disabled="isDisable" @click="onSubmit" style="margin-right:100px;">立即提交</el-button>
            <el-button @click="closeTag">取消</el-button>
        </div>

        <el-form :inline="true" class="disabledForm">
            <el-form-item label="制单人" label-width="110px">
                <el-input v-model="myform.private_employee" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="负责人" label-width="110px">
                <el-input v-model="myform.ascription" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="部门" label-width="110px">
                <el-input v-model="myform.deptname" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="机构" label-width="110px">
                <el-input v-model="myform.parentname" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="制单时间" label-width="110px">
                <el-input v-model="myform.makingTime" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="审核完成时间" label-width="110px">
                <el-input v-model="myform.checkTime" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="耗时" label-width="110px">
                <el-input v-model="myform.takeupTime" :disabled="true"></el-input>
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
        name: 'name',
        data() {
            return {
                orderReceiveDetailData:{},
                
                list: null,
                orderList: [],
                listLoading: false,
                selectData:[],
                itemData:[
                    {orderNo:null, orderTime:null, order_money:null, accepted_money:null, uncollected_money:null, this_money:null, remarks:null, edit:false},
                    {orderNo:null, orderTime:null, order_money:null, accepted_money:null, uncollected_money:null, this_money:null, remarks:null, edit:false},
                ],
                scopeIndex:null,

                myform:{
                    id:null,
                    customerpool_id:null,
                    createTime:null,
                    pay_type_id:null,
                    money:null,
                    discountAfter:null,
                    discountAmount:null,
                    discount:null,
                    remarks:null,
                    images:null,
                    files:null,
                    private_employee:this.$store.state.user,
                    ascriptionId:null,
                    ascription:null,
                    deptname:null,
                    parentname:null,
                },
                rules:{
                    customerpool_id : [{ required: true, message: '公司名称不能为空', trigger: 'blur' },],
                    createTime : [{ required: true, message: '日期不能为空', trigger: 'blur' },],
                    pay_type_id : [{ required: true, message: '结算账户不能为空', trigger: 'blur' },],
                    discountAfter : [{ required: true, message: '折后金额不能为空', trigger: 'blur' },],
                    remarks:[{ required: true, message: '审核意见不能为空', trigger: 'blur' }]
                },

                imagesData:[],
                imagesList:[],
                filesData:[],
                filesList:[],
                
                customerList:[],
                payTypeMethod:[],

                isDisable:false,

                OKdisabled:true,

                isDisable:false,

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
                
                auditing: this.$store.state.systemHttp + '/upload/staticImg/inaudit.png',
                audited: this.$store.state.systemHttp + '/upload/staticImg/examine.png',
                noaudit: this.$store.state.systemHttp + '/upload/staticImg/refuse.png',

                fieldsform:{},
                previewData:[],

                deptData: [],
                
                defaultProps:{
                    label:'deptname',
                    children:'next',
                },

                userData: [],

                doUpload:this.$store.state.defaultHttp + 'workOrder/upload.do?cId=' + this.$store.state.iscId,
            }
        },
        mounted() {
            this.loadOther()
            this.loadfield()
            this.loadUserandDept()
        },
        methods: {
            loadOther(){
                const _this = this
                let qs = require('querystring')
                
                let orderReceiveDetailData = this.$store.state.orderReceiveDetailData
                this.orderReceiveDetailData = orderReceiveDetailData

                let searchList = {}
                searchList.page = 1
                searchList.limit = 10000000

                let typeData = {
                    type:'结算账户'
                }

                
                let myDate = new Date()
                let y = myDate.getFullYear() //获取完整的年份(4位,1970-????)
                let m = myDate.getMonth() + 1 //获取当前月份(0-11,0代表1月)
                let d = myDate.getDate() //获取当前日(1-31)
                m = (m < 10 ? "0" + m : m)
                d = (d < 10 ? "0" + d : d)
                this.myform.createTime = y + '-' + m + '-' + d

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerpool/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.customerList = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(typeData)
                }).then(function(res){
                    _this.payTypeMethod = res.data
                }).catch(function(err){
                    // console.log(err);
                });

                _this.$options.methods.loadData.bind(_this)()
            },
            loadData(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.orderReceiveDetailData.id

                this.listLoading = true
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'orderBack/selectById.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let info = res.data

                    _this.itemData = info.orderBackDetailList.map(v => {
                        _this.$set(v, 'edit', false)
                        return v
                    })
                    if(info.checkStatus == 0){
                         _this.itemData.push(
                            {orderNo:null, orderTime:null, order_money:null, accepted_money:null, uncollected_money:null, this_money:null, remarks:null, edit:false},
                            {orderNo:null, orderTime:null, order_money:null, accepted_money:null, uncollected_money:null, this_money:null, remarks:null, edit:false}
                        )
                    }
                    let a = info.timeConsuming
                    let b = parseInt(a / 24)
                    let c = parseInt(a % 24)
                    // console.log(b,c)
                    info.takeupTime = b + '天' + c + '小时'
                    
                    _this.myform = info
                    
                    _this.$options.methods.getList.bind(_this)()
                    _this.$options.methods.getFiles.bind(_this)()
                    _this.$options.methods.loadExamine.bind(_this)()
                    _this.listLoading = false
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //加载审核详情和审核历史
            loadExamine(){
                const _this = this
                let qs = require('querystring')
                
                let examine = {
                    checkStatus: this.myform.checkStatus,
                    recordId: this.myform.examineRecordId,
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
                    url:_this.$store.state.defaultHttp+'examineLog/queryExamineLogList.do?cId='+_this.$store.state.iscId+'&recordId='+_this.myform.examineRecordId,
                }).then(function(res){
                    _this.examineLog = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            getFiles(){
                if(this.myform.files){
                    this.filesData = []
                    let aaa = JSON.parse(this.myform.files)
                    aaa.forEach(a => {
                        this.filesData.push({name:a.name, response:a.response, url:this.$store.state.systemHttp + 'upload/'+this.$store.state.iscId+'/'+ a.response})
                    });
                }
                if(this.myform.images){
                    this.imagesData = []
                    let bbb = JSON.parse(this.myform.images)
                    bbb.forEach(b => {
                        this.imagesData.push({name:b.name, response:b.response, url:this.$store.state.systemHttp + 'upload/'+this.$store.state.iscId+'/'+ b.response})
                    });
                }
            },
            getList() {
                const _this = this
                let qs = require('querystring')
                let data = {
                    customerpoolId: this.myform.customerpool_id
                }
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'orderBackDetail/selectByCustomerpoolId.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let items = res.data
                    _this.list = items.map(v => {
                        _this.$set(v, 'edit', false)
                        return v
                    })
                    _this.orderList = items
                    _this.$options.methods.getSelect.bind(_this)()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadfield(){
                const _this = this
                let qs =require('querystring')
                let aval = this.orderReceiveDetailData.id
                let bval = this.orderReceiveDetailData.batch_id
                let data = {
                    label: 12,
                    id: aval,
                    batch_id: bval,
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'field/queryField.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data),
                }).then(function(res){
                    let info = res.data

                    info.forEach((el,i) => {
                        el.displayVal = ''
                        el.default_value = el.value
                        if(el.formType == 'user' || el.formType == 'structure'){
                            el.displayVal = el.deptOrUserName
                            el.default_value = parseInt(el.value)
                        }
                        if(el.is_null == 1){
                            _this.rules[el.field_name] = [{required: true , message: ' ', trigger:'blur'}]
                        }
                    })
                    
                    _this.previewData = info
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadUserandDept(){
                const _this = this
                let qs = require('querystring')
                let pageInfo = {}
                pageInfo.page = 1
                pageInfo.limit = '9999'

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getPrivateUserAll.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    _this.userData = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'dept/getDeptNodeTree.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.deptData = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
            },
            selectOrder(val){
                let info = {}
                this.selectData.forEach((el,i) => {
                    if(el.orderNo == val){
                        this.itemData[this.scopeIndex] = el
                        this.itemData[this.scopeIndex].edit = true
                        this.itemData[this.scopeIndex].this_money = 0
                    }
                });

                this.$options.methods.getList.bind(this)()
            },
            getSelect(){
                let listData = this.list
                this.selectData = []
                this.itemData.forEach((a,j) => {
                    listData.forEach((el,i) => {
                        if(a.order_id && el.order_id == a.order_id){
                            listData.splice(i,1)
                        }
                    });
                });
                this.selectData = listData
            },
            selectCustomer(e){
                this.customerList.forEach(el => {
                    if(el.id == e){
                        this.myform.ascriptionId = el.privateUser[0].private_id
                        this.myform.ascription = el.privateUser[0].private_employee
                        this.myform.deptname = el.deptname
                        this.myform.parentname = el.parentname
                    }
                });

                this.$options.methods.getList.bind(this)()
            },
            handleAdd(){
                this.itemData.push({orderNo:null, orderTime:null, order_money:null, accepted_money:null, uncollected_money:null, this_money:null, remarks:null, edit:false})
            },
            cellClick(row, column, cell, event){
                row.edit = false
                if(column.label !== '操作' && this.myform.checkStatus == 0){
                    if(this.myform.customerpool_id){
                        row.edit = true
                        this.itemData.forEach((el,i) => {
                            if(el.order_id == row.order_id){
                                this.scopeIndex = i
                            }
                        });
                    }else{
                        this.$message({
                            message:'请先选择客户',
                            type:'error'
                        })
                    }
                }
            },
            rowDelete(index,row){
                this.itemData.forEach((el,i) => {
                    if(i == index){
                        this.itemData.splice(i,1)
                    }
                });
                this.$options.methods.getList.bind(this)()
            },
            rowEdit(row) {
                row.edit = false

                this.$message({
                    message: '本地保存成功',
                    type: 'success'
                })
            },
            handleFoces(index,row){
                this.scopeIndex = index
            },
            inputDiscountAfter(e){
                if(this.myform.money){
                    let a = parseFloat(this.myform.money) - parseFloat(e)
                    let b = parseFloat(e) / parseFloat(this.myform.money) * 100

                    this.myform.discountAmount = a.toFixed(2)
                    this.myform.discount = b.toFixed(2)
                }
            },
            handleinput(e,index,row){
                this.orderList.forEach(a => {
                    if(a.order_id == row.order_id){
                        let x = parseFloat(row.this_money) + parseFloat(a.accepted_money)
                        let y = parseFloat(row.order_money) - x
                        row.uncollected_money = y.toFixed(2)
                        row.accepted_money = x.toFixed(2)
                    }
                });

                let z = 0
                this.itemData.forEach(el => {
                    if(el.order_id){
                        z += parseFloat(el.this_money)
                    }
                });

                let val = z.toFixed(2)
                if(!this.myform.discountAfter || this.myform.discountAfter == this.myform.money){
                    this.myform.discountAfter = val
                }
                this.myform.money = val
                this.inputDiscountAfter(this.myform.discountAfter)
                
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
            
            handlecheck(data,val){
                this.previewData.forEach(b => {
                    if(b.id == val.id){
                        b.displayVal = data.deptname
                        b.default_value = data.deptid
                    }
                })
            },
            beforeUpload(file){
                const isLt5M = file.size / 1024 / 1024 < 1
                if (!isLt5M) {
                    this.$message.warning('文件大小不能超过 5MB!')
                    return false
                }
            },
            uploadExceed(files,fileList){
                if(files.length > 3){
                    this.$message.warning('文件不能超过3个!')
                    return false
                }
            },
            uploadSuccess(res,file,fileList){
                this.previewData.forEach(el => {
                    if(el.formType == 'file'){
                        el.default_value = res
                    }
                });
            },
            fileUploadSuccess(res,file,fileList){
                let info = fileList
                let newArr = new Array()
                info.forEach(el => {
                    newArr.push({name:el.name,response:el.response})
                });

                this.myform.files = JSON.stringify(newArr)
            },
            imageUploadSuccess(res,file,fileList){
                let info = fileList
                let newArr = new Array()

                console.log(info)
                info.forEach(el => {
                    newArr.push({name:el.name,response:el.response})
                });

                this.myform.images = JSON.stringify(newArr)
            },
            onSubmit(){
                const _this = this
                let fieldData = _this.previewData
                let totalSum = 0
                let orderBackDetailList = new Array()
                this.itemData.forEach((el,i) => {
                    if(el.order_id){
                        orderBackDetailList.push({"order_id":el.order_id,"order_money":parseFloat(el.order_money),"this_money":parseFloat(el.this_money),"accepted_money":parseFloat(el.accepted_money),"uncollected_money":parseFloat(el.uncollected_money) ,"remarks":el.remarks})
                    }
                });
                let aval = this.orderReceiveDetailData.id
                let bval = this.orderReceiveDetailData.batch_id
                let data = {
                    "id": aval,
                    "batch_id": bval,
                    "customerpool_id": this.myform.customerpool_id,
                    "createTime": this.myform.createTime,
                    "money": parseFloat(this.myform.money),
                    "pay_type_id": this.myform.pay_type_id,
                    "discount": parseFloat(this.myform.discount),
                    "discountAmount": parseFloat(this.myform.discountAmount),
                    "discountAfter": parseFloat(this.myform.discountAfter),
                    "remarks": this.myform.remarks,
                    "images": this.myform.images,
                    "files": this.myform.files,
                    "pId": parseInt(this.$store.state.ispId),
                    "ascriptionId":this.myform.ascriptionId,
                }

                let flag = false
                if(!orderBackDetailList.length) {
                    _this.$message({
                        message: "订单不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.discountAfter) {
                    _this.$message({
                        message: "折后金额不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.pay_type_id) {
                    _this.$message({
                        message: "结算账户不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                fieldData.forEach(item => {
                    if(item.formType == 'checkbox'){
                        item.value = item.default_value.join(',')
                    }else if(item.formType == 'user' || item.formType == 'structure'){
                        if(item.default_value){
                            item.value = item.default_value.toString()
                        }
                    }else{
                        item.value = item.default_value
                    }

                    if(item.is_null == 1 && !item.value){
                        _this.$message({
                            message: item.name + '不能为空',
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return

                let subData = {
                    orderBack: data,
                    orderBackDetailList: orderBackDetailList,
                    field: fieldData
                }
                console.log(subData)

                this.isDisable = true

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'orderBack/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data: subData,
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message: '成功',
                            type:'success'
                        })
                        _this.closeTag();
                    }else{
                        _this.$message({
                            message: res.data.msg,
                            type:'error'
                        })
                    }
                    _this.isDisable = false
                }).catch(function(err){
                    _this.isDisable = false
                });
            },
            closeTag(){
                let tagsList = this.$store.state.tagsList;
                let index;
                tagsList.forEach((element, i) => {
                    if(element.name == this.$options.name) {
                        index = i;
                    }
                });
                const delItem = this.$store.state.tagsList.splice(index, 1)[0];
                const item = this.$store.state.tagsList[index] ? this.$store.state.tagsList[index] : this.$store.state.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push('/orderReceive');
                }else{
                    this.$router.push('/index');
                }
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
                data.id = this.myform.id
                data.recordId = this.myform.examineRecordId
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
        }
    }
</script>

<style>
    .orderadd_c{
        padding-bottom: 60px;
        box-sizing: border-box;
    }
    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 10px;
    }
    
    .orderaudit{
        position: absolute;
        right: 30%;
        top: 120px;
    }
    .orderaudit .audit_img{
        width: 150px;
        height: 75px;
        transform: rotate(-10deg)
    }
</style>