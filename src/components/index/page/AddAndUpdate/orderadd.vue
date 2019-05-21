<template>
    <div class="orderadd_c">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="font-weight:bold">销售订单<span v-if="orderNo" style="font-weight:bold">：{{orderNo}}</span></span>
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
            </div>
        </el-card>
        
        <div class="entry">
            <el-button class="btn info-btn" size="mini" icon="el-icon-circle-plus-outline" @click="handleAdd"></el-button>
        </div>
        <el-table :data="itemData" border fit highlight-current-row show-summary :summary-method="getSummary" @cell-click="cellClick" style="width: 100%">
            <el-table-column header-align="center" fixed align="center" type="index" min-width="45"></el-table-column>
            <el-table-column prop="tbGoods.goodsName" width="280px" class-name="table_required" fixed label="产品名称">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-select v-model="scope.row.tbGoods.goodsName" placeholder="请选择" filterable :filter-method="handleFilter" @focus="handleFoces(scope.$index,scope.row)">
                            <el-option class="droplist" :value="scope.row.tbGoods.goodsName">
                                <el-table :data="selectData" border fit @current-change="currentChange" style="width: 100%">
                                    <el-table-column header-align="center" type="index" min-width="45"></el-table-column>
                                    <el-table-column prop="tbGoods.goodsName" label="产品名称" width="130"></el-table-column>
                                    <el-table-column prop="tbGoods.describe" show-overflow-tooltip label="描述" width="150"></el-table-column>
                                    <el-table-column prop="goodspec" label="规格属性" min-width="150">
                                        <template slot-scope="scope">
                                            <span v-for="(item,i) in scope.row.goodspec" :key="i">{{item.label + '：' + item.value}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="unit" label="单位" width="90"></el-table-column>
                                </el-table>
                            </el-option>
                        </el-select>
                        <el-button class="btn info-btn" size="mini" icon="el-icon-more" style="width:30px;height:28px;padding:0" @click="showDialog()"></el-button>
                    </template>
                    <span v-else>{{ scope.row.tbGoods.goodsName }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="tbGoods.describe" width="120" label="描述"></el-table-column>

            <el-table-column prop="goodspec" min-width="100" label="规格属性">
                <template slot-scope="scope">
                    <!-- <span v-for="(item,i) in scope.row.goodspec" :key="i">{{item.label + ':' + item.value +','}}</span> -->
                    <span v-for="(item,i) in scope.row.goodspec" :key="i">{{item.value +'/'}}</span>
                </template>
            </el-table-column>

            <el-table-column prop="unit" width="50" label="单位"></el-table-column>

            <el-table-column prop="num" min-width="100" class-name="table_required" label="数量">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.num" onkeyup="value=value.replace(/[^\d]/g,'')" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)"/>
                    </template>
                    <span v-else>{{ scope.row.num }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="price" min-width="120" class-name="table_required" label="单价">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.price" onkeyup="value=value.replace(/[^\d]/g,'')" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)"/>
                    </template>
                    <span v-else>{{ scope.row.price }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="amountOfMoney" min-width="120" label="金额">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.amountOfMoney" onkeyup="value=value.replace(/[^\d]/g,'')" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)"/>
                    </template>
                    <span v-else>{{ scope.row.amountOfMoney }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="discount" width="90" label="折扣">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.discount" onkeyup="value=value.replace(/[^\d]/g,'')" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)">
                            <span slot="suffix" style="margin-right:5px;line-height:34px;">%</span>
                        </el-input>
                    </template>
                    <span v-else-if="scope.row.discount">{{ scope.row.discount + ' %' }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="discountAmount" min-width="120" label="折扣额">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.discountAmount" onkeyup="value=value.replace(/[^\d]/g,'')" class="edit-input" size="small"/>
                    </template>
                    <span v-else>{{ scope.row.discountAmount }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="discountAfter" min-width="120" label="折后金额">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.discountAfter" onkeyup="value=value.replace(/[^\d]/g,'')" class="edit-input" size="small"/>
                    </template>
                    <span v-else>{{ scope.row.discountAfter }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="taxRate" width="90" label="税率">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.taxRate" onkeyup="value=value.replace(/[^\d]/g,'')" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)">
                            <span slot="suffix" style="margin-right:5px;line-height:34px;">%</span>
                        </el-input>
                    </template>
                    <span v-else>{{ scope.row.taxRate }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="taxAmount" min-width="120" label="税额">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.taxAmount" onkeyup="value=value.replace(/[^\d]/g,'')" class="edit-input" size="small"/>
                    </template>
                    <span v-else>{{ scope.row.taxAmount }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="taxAfter" min-width="120" label="税后金额">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.taxAfter" onkeyup="value=value.replace(/[^\d]/g,'')" class="edit-input" size="small"/>
                    </template>
                    <span v-else>{{ scope.row.taxAfter }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="commitTime" width="170" label="交货日期">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-date-picker v-model="scope.row.commitTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" class="table_date"></el-date-picker>
                    </template>
                    <span v-else>{{ scope.row.commitTime }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="brand" width="80" label="产品品牌"></el-table-column>

            <el-table-column align="center" label="操作" width="90" fixed="right">
                <template slot-scope="scope">
                    <el-button type="success" plain style="width:30px;height:30px;padding:0" :disabled="!scope.row.edit" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)"></el-button>
                    <el-button type="danger" plain style="width:30px;height:30px;padding:0" icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-form :inline="true" class="disabledForm">
            <el-form-item label="制单人" label-width="90px">
                <el-input v-model="myform.user" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="负责人" label-width="90px">
                <el-input v-model="myform.ascription" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="部门" label-width="90px">
                <el-input v-model="myform.department" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="机构" label-width="90px">
                <el-input v-model="myform.mechanism" :disabled="true"></el-input>
            </el-form-item>
        </el-form>

        <div class="submit_btn">
            <el-button type="primary" v-show="submitAdd" :disabled="isDisable" @click="onSubmit" style="margin-right:50px !important;">立即提交</el-button>
            <el-button type="primary" v-show="!submitAdd" :disabled="isDisable" @click="updateSubmit" style="margin-right:50px !important;">立即编辑</el-button>
            <el-button type="primary" :disabled="isDisable" @click="submitOrClose" style="margin-right:50px !important;">保存并关闭</el-button>
            <el-button @click="closeTag">取消</el-button>
        </div>

        <el-dialog
            title="选择产品"
            :visible.sync="dialogVisible"
            width="80%"
            class="orderDialog"
            center>
            <div class="otherleftcontent">
                <el-tree
                    node-key="id"
                    highlight-current
                    accordion
                    :data="datalist"
                    :props="defaultProps"
                    :default-expanded-keys="defaultkeys"
                    expand-on-click-node
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
                orderNo:null,

                datalist:[],
                defaultProps:{
                    label:'name',
                    children:'next',
                },
                defaultkeys:[1],

                list: null,
                selectData:[],
                options:[],
                itemData:[
                    {id:10,amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false,},
                    {id:11,amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false,},
                    {id:12,amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false,},
                    {id:13,amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false,},
                    {id:14,amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false,},
                ],
                selectList:[],
                itemList:[],
                tableData:[],
                scopeIndex:null,
                nodeChange:false,

                myform:{
                    customerpoolId:null,
                    contactId:null,
                    orderTime:null,
                    settlement:null,
                    deliveryMode:null,
                    deliveryAddress:null,
                    user:this.$store.state.user,
                    ascriptionId:null,
                    ascription:null,
                    department:null,
                    mechanism:null,
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
                submitAdd:true,

                goodsName:'',
                dialogVisible:false,
                classification_id:null,
                idArr:[],
                multipleSelection:null,

                OKdisabled:true
            }
        },
        mounted() {
            this.getList()
            this.loadOther()
            this.getData()
        },
        methods: {
            getList() {
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.page = 1
                data.limit = 1000000
                
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
                let myDate = new Date()
                let y = myDate.getFullYear() //获取完整的年份(4位,1970-????)
                let m = myDate.getMonth() + 1 //获取当前月份(0-11,0代表1月)
                let d = myDate.getDate() //获取当前日(1-31)
                m = (m < 10 ? "0" + m : m)
                d = (d < 10 ? "0" + d : d)
                this.myform.orderTime = y + '-' + m + '-' + d

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
            selectCustomer(e){
                this.customerId = e
                this.customerList.forEach(el => {
                    if(el.id == e){
                        this.myform.ascriptionId = el.privateUser[0].private_id
                        this.myform.ascription = el.privateUser[0].private_employee
                        this.myform.department = el.deptname
                        this.myform.mechanism = el.parentname
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
                if(column.label !== '操作'){
                    if(this.myform.customerpoolId){
                        row.edit = true
                        this.itemData.forEach((el,i) => {
                            if(row.id == el.id){
                                this.scopeIndex = i
                                console.log(i)
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
                // console.log(val)
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
                    this.nodeChange = true
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
                // this.$options.methods.selectItem.bind(this)()
            },
            selectItem(){
                // console.log(this.selectList)
                if(this.selectList.length){
                    this.selectList.forEach((el,i) => {
                        this.itemList.push(el)
                        this.itemList.forEach((item,j) => {
                            if(el.id == item.id){
                                console.log(item)
                                this.itemList.splice(j,1)
                            }
                        });
                    });
                }
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
                    url: _this.$store.state.defaultHttp+'order/insert.do?cId='+_this.$store.state.iscId,
                    data: data,
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message: '添加成功',
                            type:'success'
                        })
                        if(res.data.map.order){
                            _this.submitAdd = false
                            _this.myform.id = res.data.map.order.id
                            _this.orderNo = res.data.map.order.orderNo
                        }
                        _this.itemData.forEach(o => {
                            o.edit = false
                        });
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
            updateSubmit(){
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
                
                this.isDisable = true

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'order/update.do?cId='+_this.$store.state.iscId,
                    data: data,
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message: '编辑成功',
                            type:'success'
                        })
                    }else{
                        _this.$message({
                            message: res.data.msg,
                            type:'error'
                        })
                    }
                    _this.isDisable = false
                }).catch(function(err){
                    // console.log(err);
                    _this.isDisable = false
                });
            },
            submitOrClose(){
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
                    url: _this.$store.state.defaultHttp+'order/insert.do?cId='+_this.$store.state.iscId,
                    data: data,
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message: '添加成功',
                            type:'success'
                        })
                        _this.closeTag()
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
</style>


