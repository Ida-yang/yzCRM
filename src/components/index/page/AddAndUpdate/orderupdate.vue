<template>
    <div class="orderadd_c">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="bold_span">销售订单<span class="bold_span">：{{myform.orderNo}}</span></span>
                        <!-- <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="retracts">收起</el-button> -->
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()">审核</el-button>
            </div>
            <div class="orderHead">
                <el-form :inline="true" ref="myform" :model="myform" :rules="rules">
                    <el-form-item prop="customerpoolId" class="first_input" label="公司名称" label-width="90px">
                        <el-select v-model="myform.customerpoolId" placeholder="请选择公司名称" class="inputbox" filterable @change="selectCustomer">
                            <el-option v-for="item in customerList" :key="item.id" :label="item.pName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="first_input" label="联系人" label-width="90px">
                        <el-select v-model="myform.contactId" placeholder="请选择联系人" class="inputbox">
                            <el-option v-for="item in contactsList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="orderTime" class="first_input" label="订单时间" label-width="90px">
                        <el-date-picker v-model="myform.orderTime" type="date" placeholder="选择订单时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="inputbox"></el-date-picker>
                    </el-form-item>
                    <el-form-item prop="settlement" class="first_input" label="结算方式" label-width="90px">
                        <el-select v-model="myform.settlement" placeholder="请选择结算方式" class="inputbox">
                            <el-option v-for="item in settlementMethod" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="first_input" label="交货方式" label-width="90px">
                        <el-select v-model="myform.deliveryMode" placeholder="请选择交货方式" class="inputbox">
                            <el-option v-for="item in deliveryMethod" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="first_input" label="交货地址" label-width="90px">
                        <el-input v-model="myform.deliveryAddress" class="inputbox"></el-input>
                    </el-form-item>
                    <el-form-item class="first_input" label="备注" label-width="90px">
                        <el-input v-model="myform.remarks" class="inputbox"></el-input>
                    </el-form-item>
                </el-form>
                <div class="audit" v-if="myform.checkStatus == 1">
                    <img class="audit_img" :src="auditing" alt="审核中">
                </div>
                <div class="audit" v-if="myform.checkStatus == 2">
                    <img class="audit_img" :src="audited" alt="已审核">
                </div>
                <div class="audit" v-if="myform.checkStatus == 3">
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
                    <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(1)" v-show="hasCheck">通过</el-button>
                    <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(2)" v-show="hasCheck">拒绝</el-button>
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
            <el-button class="btn info-btn" size="mini" icon="el-icon-circle-plus-outline" v-if="myform.checkStatus !== 2" @click="handleAdd"></el-button>

            <el-popover placement="bottom" width="100" trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist" style="max-height:600px;overflow-y:overlay;overflow-x:hidden">
                    <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                </el-checkbox-group>
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table v-loading="listLoading" :data="itemData" border fit highlight-current-row show-summary :summary-method="getSummary" @cell-click="cellClick" style="width: 100%">
            <el-table-column header-align="center" align="center" fixed type="index" min-width="45"></el-table-column>

            <div v-for="(item,index) in filterList" :key="index" >
                <el-table-column label="产品名称" prop="tbGoods.goodsName" width="280px" v-if="item.prop == 'goodsName' && item.state == 1" class="table_required" fixed>
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-select v-model="scope.row.tbGoods.goodsName" placeholder="请选择" filterable :filter-method="handleFilter" @focus="handleFoces(scope.$index,scope.row)">
                                <el-option class="droplist" :value="scope.row.tbGoods.goodsName">
                                    <el-table :data="selectData" border fit @current-change="currentChange" style="width: 100%">
                                        <el-table-column header-align="center" align="center" type="index" min-width="45"></el-table-column>
                                        <el-table-column prop="tbGoods.goodsName" label="产品名称" width="130"></el-table-column>
                                        <el-table-column prop="tbGoods.describe" show-overflow-tooltip label="描述" width="150"></el-table-column>
                                        <el-table-column prop="goodspec" label="规格属性" min-width="150">
                                            <template slot-scope="scope">
                                                <span v-for="(item,i) in scope.row.goodspec" :key="i">{{item.label + '：' + item.value}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="unit" label="单位" width="90">
                                        </el-table-column>
                                    </el-table>
                                </el-option>
                            </el-select>
                            <el-button class="btn info-btn" size="mini" icon="el-icon-more" style="width:30px;height:28px;padding:0" @click="showDialog()"></el-button>
                        </template>
                        <span v-else>{{ scope.row.tbGoods.goodsName }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="描述" prop="tbGoods.describe" width="120" v-if="item.prop == 'describe' && item.state == 1"></el-table-column>

                <el-table-column label="规格属性" prop="goodspec" min-width="100" v-if="item.prop == 'spec' && item.state == 1">
                    <template slot-scope="scope">
                        <span v-for="(item,i) in scope.row.goodspec" :key="i">{{'/' + item.value}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="单位" prop="unit" width="50" v-if="item.prop == 'unit' && item.state == 1"></el-table-column>

                <el-table-column label="数量" prop="num" min-width="120" class-name="table_required" v-if="item.prop == 'num' && item.state == 1">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input v-model="scope.row.num" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)"/>
                        </template>
                        <span v-else>{{ scope.row.num }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="单价" prop="price" min-width="120" class-name="table_required" v-if="item.prop == 'price' && item.state == 1">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input v-model="scope.row.price" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)"/>
                        </template>
                        <span v-else>{{ scope.row.price }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="金额" prop="amountOfMoney" min-width="120" v-if="item.prop == 'amountOfMoney' && item.state == 1">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input v-model="scope.row.amountOfMoney" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)"/>
                        </template>
                        <span v-else>{{ scope.row.amountOfMoney }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="折扣" prop="discount" width="90" v-if="item.prop == 'discount' && item.state == 1">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input v-model="scope.row.discount" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)">
                                <span slot="suffix" style="margin-right:5px;line-height:34px;">%</span>
                            </el-input>
                        </template>
                        <span v-else-if="scope.row.discount">{{ scope.row.discount + ' %' }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="折扣额" prop="discountAmount" min-width="120" v-if="item.prop == 'discountAmount' && item.state == 1">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input v-model="scope.row.discountAmount" class="edit-input" size="small"/>
                        </template>
                        <span v-else>{{ scope.row.discountAmount }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="折后金额" prop="discountAfter" min-width="120" v-if="item.prop == 'discountAfter' && item.state == 1">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input v-model="scope.row.discountAfter" class="edit-input" size="small"/>
                        </template>
                        <span v-else>{{ scope.row.discountAfter }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="税率" prop="taxRate" width="90" v-if="item.prop == 'taxRate' && item.state == 1">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input v-model="scope.row.taxRate" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)">
                                <span slot="suffix" style="margin-right:5px;line-height:34px;">%</span>
                            </el-input>
                        </template>
                        <span v-else-if="scope.row.taxRate">{{ scope.row.taxRate + ' %' }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="税额" prop="taxAmount" min-width="120" v-if="item.prop == 'taxAmount' && item.state == 1">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input v-model="scope.row.taxAmount" class="edit-input" size="small"/>
                        </template>
                        <span v-else>{{ scope.row.taxAmount }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="税后金额" prop="taxAfter" min-width="120" v-if="item.prop == 'taxAfter' && item.state == 1">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input v-model="scope.row.taxAfter" class="edit-input" size="small"/>
                        </template>
                        <span v-else>{{ scope.row.taxAfter }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="交货日期" prop="commitTime" width="170" v-if="item.prop == 'commitTime' && item.state == 1">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-date-picker v-model="scope.row.commitTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" class="table_date"></el-date-picker>
                        </template>
                        <span v-else>{{ scope.row.commitTime }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="产品品牌" prop="brand" width="80" v-if="item.prop == 'brand' && item.state == 1"></el-table-column>
            </div>

            <el-table-column align="center" label="操作" width="90" fixed="right" v-if="myform.checkStatus !== 2">
                <template slot-scope="scope">
                    <el-button type="success" plain style="width:30px;height:30px;padding:0" :disabled="!scope.row.edit" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)"></el-button>
                    <el-button type="danger" plain style="width:30px;height:30px;padding:0" icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-form :inline="true" ref="myform" :model="myform" class="disabledForm">
            <el-form-item label="制单人" label-width="90px">
                <el-input v-model="myform.private_employee" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="负责人" label-width="90px">
                <el-input v-model="myform.ascription" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="部门" label-width="90px">
                <el-input v-model="myform.deptname" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="机构" label-width="90px">
                <el-input v-model="myform.parentname" :disabled="true"></el-input>
            </el-form-item>
        </el-form>
                
        <div class="submit_btn">
            <el-button type="primary" :disabled="isDisable" @click="onSubmit" style="margin-right:100px;">立即提交</el-button>
            <el-button @click="closeTag">取消</el-button>
        </div>
        
        <el-dialog title="选择产品" :visible.sync="dialogVisible" :close-on-click-modal="false" width="80%" class="orderDialog">
            <div class="otherleftcontent">
                <el-tree
                    node-key="id" highlight-current accordion expand-on-click-node
                    :data="datalist"
                    :props="defaultProps"
                    :default-expanded-keys="defaultkeys"
                    @node-click="handleNodeClick">
                </el-tree>
            </div>
            <div class="otherightcontent">
                <span>产品名称：</span><el-input v-model="goodsName" style="width:200px;" @input="addInput"></el-input>
                <br><br>
                <el-table :data="tableData" border fit @selection-change="selectInfo" style="width: 100%">
                    <el-table-column header-align="center" align="center" type="selection" min-width="45" @selection-change="selectInfo"></el-table-column>
                    <el-table-column prop="tbGoods.goodsName" label="产品名称" width="130"></el-table-column>
                    <el-table-column prop="tbGoods.describe" show-overflow-tooltip label="描述" width="150"></el-table-column>
                    <el-table-column prop="goodspec" label="规格属性" min-width="150">
                        <template slot-scope="scope">
                            <span v-for="(item,i) in scope.row.goodspec" :key="i">{{item.label + '：' + item.value}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="unit" label="单位" width="90"></el-table-column>
                    <el-table-column prop="brand" label="品牌" width="90"></el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer order_foot">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit()">确 定</el-button>
            </span>
        </el-dialog>
        
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
                datalist:[],
                defaultProps:{
                    label:'name',
                    children:'next',
                },
                defaultkeys:[1],

                updateData:null,
                list: null,
                listLoading: true,
                selectData:[],
                options:[],
                itemData:[
                    {id:10,amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false,},
                    {id:11,amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false,},
                ],
                itemList:[],
                tableData:[],
                scopeIndex:null,

                myform:{
                    id:null,
                    customerpoolId:null,
                    contactId:null,
                    orderTime:null,
                    settlement:null,
                    deliveryMode:null,
                    deliveryAddress:null,
                    private_employee:null,
                    ascriptionId:null,
                    ascription:null,
                    deptname:null,
                    parentname:null,
                    remarks:null,
                },
                rules:{
                    customerpoolId : [{ required: true, message: '公司名称不能为空', trigger: 'blur' },],
                    orderTime : [{ required: true, message: '订单时间不能为空', trigger: 'blur' },],
                    settlement : [{ required: true, message: '结算方式不能为空', trigger: 'blur' },],
                },

                
                deliveryMethod:[],
                customerList:[],
                contactsList:[],
                brandList:[],
                settlementMethod:[
                    {id:101,name:'一次性付款'},
                    {id:102,name:'分次付款'},
                    {id:103,name:'月结付款'},
                ],

                customerId:null,
                cusdiscount:null,
                custaxRate:null,

                isDisable:false,

                goodsName:'',
                dialogVisible:false,
                classification_id:null,
                idArr:[],
                multipleSelection:null,

                OKdisabled:true,
                
                thisshow:false,
                retracts:false,
                hasCheck:null,
                recordId:null,
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

                filterList:null,
                checklist:null
            }
        },
        mounted() {
            this.loadData()
            this.getList()
            this.loadOther()
            this.reloadData()
        },
        methods: {
            loadData(){
                const _this = this
                let orderupdateData = this.$store.state.orderupdateData
                let qs = require('querystring')
                let data = {}
                data.id = orderupdateData.setForm.id
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'order/selectById.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.myform = res.data
                    _this.updateData = res.data.orderDetails
                    _this.customerId = res.data.customerpoolId
                    _this.cusdiscount = res.data.orderDetails[0].discount
                    _this.custaxRate = res.data.orderDetails[0].taxRate
                    _this.recordId = res.data.examineRecordId
                    _this.$options.methods.loadContact.bind(_this)()
                    _this.$options.methods.getItem.bind(_this)()
                    _this.$options.methods.loadExamine.bind(_this)()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            
            reloadData() {
                const _this = this;
                let qs =require('querystring')
                
                let filterList = {}
                filterList.type = '销售订单详情'
                let data = {}
                data.type = '销售订单详情'
                data.state = 1
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getAllUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(filterList)
                }).then(function(res){
                    _this.filterList = res.data
                }).catch(function(err){
                    // console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.checklist = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            getList() {
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.page = 1
                data.limit = 1000000
                this.listLoading = true
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'goods/search.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let items = res.data.map.goods
                    _this.list = items.map(v => {
                    _this.$set(v, 'edit', false)
                    return v
                    })
                    items.forEach(element => {
                        element.aaa = JSON.parse(element.spec)
                        element.goodspec = []
                        for(var key in element.aaa){
                            if(key !== "null" && key !== "undefined"){
                                element.goodspec.push({label:key,value:element.aaa[key]})
                            }
                        }
                    });
                    _this.$options.methods.getSelect.bind(_this)()
                    _this.listLoading = false
                }).catch(function(err){
                    // console.log(err);
                });
            },
            getData(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.page = 1
                data.limit = 1000000
                data.classification_id = this.classification_id
                data.searchName = this.goodsName
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'goods/search.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let items = res.data.map.goods
                    items.map(v => {
                        _this.$set(v, 'edit', false)
                        return v
                    })
                    items.forEach(element => {
                        element.aaa = JSON.parse(element.spec)
                        element.goodspec = []
                        for(var key in element.aaa){
                            if(key !== "null" && key !== "undefined"){
                                element.goodspec.push({label:key,value:element.aaa[key]})
                            }
                        }
                    });
                    _this.tableData = items
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadOther(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.type = '交货方式'
                let searchList = {}
                searchList.page = 1
                searchList.limit = 10000000

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.deliveryMethod = res.data
                }).catch(function(err){
                    // console.log(err);
                });

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
                    url: _this.$store.state.defaultHttp+'brand/selectBrandList.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(searchList)
                }).then(function(res){
                    _this.brandList = res.data.map.brands
                }).catch(function(err){
                    // console.log(err);
                });
                
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'classification/getClassificationNodeTree.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.datalist = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadContact(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.customerpool_id = this.customerId

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getPoolContactsName.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.contactsList = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
            },
            getItem(){
                this.itemData = []
                if(this.updateData.length !== 0){
                    this.updateData.forEach((el,i) => {
                        el.aaa = JSON.parse(el.spec)
                        el.goodspec = []
                        for(var key in el.aaa){
                            if(key !== "null" && key !== "undefined"){
                                el.goodspec.push({label:key,value:el.aaa[key]})
                            }
                        }
                        this.itemData.push({ amountOfMoney: el.amountOfMoney, commitTime:el.commitTime, brand: el.brand, discount: el.discount, discountAfter: el.discountAfter, discountAmount: el.discountAmount, goodsId: el.goodsId, tbGoods:{ goodsName:el.goodsName, describe:el.describe, }, id: el.itemId, itemId: el.itemId, num: el.num, orderId: el.orderId, price: el.price, taxAfter: el.taxAfter, taxAmount: el.taxAmount, taxRate: el.taxRate, goodspec: el.goodspec, unit: el.unit, edit:false,})
                    });
                }
                
            },
            getSelect(){
                this.itemData.forEach((a,j) => {
                    this.list.forEach((el,i) => {
                        if(el.id == a.id){
                            this.list.splice(i,1)
                        }
                    });
                });
                this.selectData = this.list
            },
            //加载审核详情和审核历史
            loadExamine(){
                const _this = this
                
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'examineRecord/queryExamineRecordList.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId+'&recordId='+_this.recordId
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
                    url:_this.$store.state.defaultHttp+'examineLog/queryExamineLogList.do?cId='+_this.$store.state.iscId+'&recordId='+_this.recordId,
                }).then(function(res){
                    _this.examineLog = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            selectCustomer(e){
                this.customerId = e
                this.customerList.forEach(el => {
                    if(el.id == e){
                        this.myform.ascriptionId = el.privateUser[0].private_id
                        this.myform.ascription = el.privateUser[0].private_employee
                        this.myform.deptname = el.deptname
                        this.myform.parentname = el.parentname
                    }
                    if(el.discount){
                        this.cusdiscount = el.discount
                    }
                    if(el.taxRate){
                        this.custaxRate = el.taxRate
                    }
                });
                this.$options.methods.loadContact.bind(this)()
            },
            handleAdd(){
                this.itemData.push({amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false})
            },
            cellClick(row, column, cell, event){
                row.edit = false
                if(column.label !== '操作' && this.myform.checkStatus !== 2){
                    row.edit = true
                    this.itemData.forEach((el,i) => {
                        if(row.id == el.id){
                            this.scopeIndex = i
                        }
                    });
                }
            },
            handleDelete(index,row){
                this.itemData.forEach((el,i) => {
                    if(i == index){
                        this.itemData.splice(i,1)
                    }
                });
                this.$options.methods.getList.bind(this)()
            },
            confirmEdit(row) {
                row.edit = false
                this.$message({
                    message: '本地保存成功',
                    type: 'success'
                })
            },
            handleFoces(index,row){
                this.scopeIndex = index
            },
            handleFilter(val){
                this.selectData = []
                this.list.forEach(el => {
                    if(el.tbGoods.goodsName.indexOf(val) != -1){
                    this.selectData.push(el)
                    }
                });
            },
            currentChange(e){
                this.itemData.forEach((el,i) => {
                    if(i == this.scopeIndex){
                        if(e){
                            e.edit = true
                            e.price = e.tbGoods.price
                            e.discount = this.cusdiscount
                            e.taxRate = this.custaxRate
                            e.num = 1
                            this.itemData.splice(i,1,e)
                            this.OKdisabled = false
                            this.$options.methods.handleinput(1,i,e)
                        }
                    }
                });
                this.list.forEach((item,j) => {
                    if(e && e.id == item.id){
                        this.list.splice(j,1)
                    }
                });
                this.selectData = this.list
            },
            handleinput(e,index,row){
                if(row.num && row.price){
                    let z = parseInt(row.num) * parseFloat(row.price)
                    row.amountOfMoney = z.toFixed(2)
                }
                if(row.amountOfMoney && row.discount){
                    let a = parseFloat(row.amountOfMoney) * parseFloat(row.discount) / 100
                    let b = parseFloat(row.amountOfMoney) - a
                    row.discountAmount = b.toFixed(2)
                    row.discountAfter = a.toFixed(2)
                }else{
                    row.discountAmount = 0
                    row.discountAfter = 0
                }
                if(row.amountOfMoney && row.taxRate){
                    if(row.discountAfter){
                        let x = parseFloat(row.discountAfter) * parseFloat(row.taxRate) / 100
                        let y = parseFloat(row.discountAfter) + x
                        row.taxAmount = x.toFixed(2)
                        row.taxAfter = y.toFixed(2)
                    }else{
                        let c = parseFloat(row.amountOfMoney) * parseFloat(row.taxRate) / 100
                        let d = parseFloat(row.amountOfMoney) + c
                        row.taxAmount = c.toFixed(2)
                        row.taxAfter = d.toFixed(2)
                    }
                }else{
                    row.taxAmount = 0
                    row.taxAfter = 0
                }
            },
            showDialog(){
                this.dialogVisible = true
                this.$options.methods.getData.bind(this)()
            },
            handleNodeClick(data){
                this.classification_id = data.id
                if(data.next.length == 0){
                    this.$options.methods.getData.bind(this)()
                }
            },
            addInput(val){
                this.goodsName = val
                this.$options.methods.getData.bind(this)()
            },
            selectInfo(val){
                this.itemList = []
                this.multipleSelection = val;
                let arr = val;
                let newArr = new Array();
                arr.forEach((item) => {
                    if(item.id != 0){
                        newArr.push(item.id)
                    }
                });
                this.idArr = newArr
                this.itemList = val
            },
            handleSubmit(){
                let arrs = []
                this.itemData.forEach((el,i) => {
                    if(el.goodsId){
                        arrs.push(el)
                    }
                    if(this.itemList.length){
                        this.itemList.forEach((a,j) => {
                            a.edit = true
                            if(el.id == a.id){
                                this.itemList.splice(j,1)
                            }
                        });
                    }
                });
                this.itemData = arrs.concat(this.itemList)

                this.itemData.forEach((param,y) => {
                    this.list.forEach((item,x) => {
                        if(item.id == param.id){
                            param.price = item.tbGoods.price
                            param.discount = this.cusdiscount
                            param.taxRate = this.custaxRate
                            param.num = 1
                            this.list.splice(x,1)
                            this.$options.methods.handleinput(1,y,param)
                        }
                    });
                });
                this.selectData = this.list

                this.dialogVisible = false
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
                    if(column.property == 'amountOfMoney' || column.property == 'discountAmount' || column.property == 'discountAfter' || column.property == 'taxAmount' || column.property == 'taxAfter'){
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
                data.id = this.myform.id
                data.recordId = this.recordId
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
            
            onSubmit(){
                const _this = this
                let qs = require('querystring')
                let totalSum = 0
                let orderDetails = new Array()
                this.itemData.forEach((el,i) => {
                    if(el.goodsId){
                        totalSum += parseFloat(el.taxAfter)
                        orderDetails.push({"itemId":el.id,"num":parseInt(el.num),"price":parseFloat(el.price),"commitTime":el.commitTime,"amountOfMoney":el.amountOfMoney ,"discount":el.discount ,"discountAmount":el.discountAmount ,"discountAfter":el.discountAfter ,"taxRate":el.taxRate,"taxAmount":el.taxAmount,"taxAfter":el.taxAfter})
                    }
                });
                let data = {
                    "id":this.myform.id,
                    "customerpoolId":this.myform.customerpoolId,
                    "contactId":this.myform.contactId,
                    "orderTime":this.myform.orderTime,
                    "settlement":this.myform.settlement,
                    "deliveryMode":this.myform.deliveryMode,
                    "deliveryAddress":this.myform.deliveryAddress,
                    "pId": parseInt(this.$store.state.ispId),
                    "ascriptionId":this.myform.ascriptionId,
                    "remarks":this.myform.remarks,
                    "totalSum":totalSum,
                    "orderDetails":orderDetails
                }                

                let flag = false
                if(!data.orderDetails.length) {
                    _this.$message({
                        message: "产品不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.settlement) {
                    _this.$message({
                        message: "结算方式不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.orderTime) {
                    _this.$message({
                        message: "订单时间不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.customerpoolId) {
                    _this.$message({
                        message: "客户名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return
                this.isDisable = true

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'order/update.do?cId='+_this.$store.state.iscId,
                    data: data,
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message: '修改成功',
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
                    delItem.path === this.$route.fullPath && this.$router.push('/order');
                }else{
                    this.$router.push('/index');
                }
            },
            hangleChange(e,val){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.pageInfoId = val.pageInfoId
                if(e == true){
                    data.state = 1
                }else{
                    data.state = 0
                }

                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'userPageInfo/updateUserPageByid.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data),
                }).then(function(res){
                    if(res.data && res.data =="success"){
                        _this.$options.methods.reloadData.bind(_this)(true);
                    }
                }).catch(function(err){
                    _this.$message.error("提交失败，请重新提交");
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
    .droplist{
        height: auto
    }
    .orderDialog .el-dialog{
        min-height: 750px;
        margin-top:10vh;
    }
    .table_date.el-date-editor.el-input{
        width: 150px;
    }
    th.table_required .cell::before{
        content: '*';
        margin-right: 4px;
        color: #f56c6c;
    }
    
    .audit{
        position: absolute;
        right: 30%;
        top: 120px;
    }
    .audit .audit_img{
        width: 150px;
        height: 75px;
        transform: rotate(-10deg)
    }
</style>


