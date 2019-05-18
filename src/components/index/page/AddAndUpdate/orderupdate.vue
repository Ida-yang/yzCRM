<template>
    <div class="orderadd_c">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="font-weight:bold">销售订单</span>
            </div>
            <div class="orderHead">
                <el-form :inline="true" ref="myform" :model="myform" :rules="rules">
                    <el-form-item class="first_input" label="公司名称" label-width="90px">
                        <el-select v-model="myform.customerpoolId" placeholder="请选择公司名称" class="inputbox" filterable @change="selectCustomer">
                            <el-option v-for="item in customerList" :key="item.id" :label="item.pName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="first_input" label="联系人" label-width="90px">
                        <el-select v-model="myform.contactId" placeholder="请选择联系人" class="inputbox">
                            <el-option v-for="item in contactsList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="first_input" label="订单时间" label-width="90px">
                        <el-date-picker v-model="myform.orderTime" type="date" placeholder="选择订单时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="inputbox"></el-date-picker>
                    </el-form-item>
                    <el-form-item class="first_input" label="结算方式" label-width="90px">
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
                    <el-form-item class="first_input" label="制单人" label-width="90px">
                        <el-input v-model="myform.private_employee" class="inputbox" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item class="first_input" label="负责人" label-width="90px">
                        <el-input v-model="myform.ascription" class="inputbox" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item class="first_input" label="部门" label-width="90px">
                        <el-input v-model="myform.deptname" class="inputbox" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item class="first_input" label="机构" label-width="90px">
                        <el-input v-model="myform.parentname" class="inputbox" :disabled="true"></el-input>
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
        <el-table v-loading="listLoading" :data="itemData" border fit highlight-current-row show-summary :summary-method="getSummary" style="width: 100%">
            <el-table-column header-align="center" align="center" fixed type="index" min-width="45"></el-table-column>
            <el-table-column prop="tbGoods.goodsName" width="180px" fixed align="center" label="产品名称">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-select v-model="scope.row.tbGoods.goodsName" placeholder="请选择" filterable :filter-method="handleFilter">
                            <el-option class="droplist" :value="scope.row.tbGoods.goodsName">
                                <el-table :data="selectData" border fit @current-change="handleChange" style="width: 100%">
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
                            <el-button slot="append">%</el-button>
                        </el-select>
                    </template>
                    <span v-else>{{ scope.row.tbGoods.goodsName }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="tbGoods.describe" width="120" align="center" label="描述"></el-table-column>

            <el-table-column prop="goodspec" min-width="150" label="规格属性">
                <template slot-scope="scope">
                    <span v-for="(item,i) in scope.row.goodspec" :key="i">{{item.label + '：' + item.value}}</span>
                </template>
            </el-table-column>

            <el-table-column prop="unit" min-width="120" label="单位"></el-table-column>

            <el-table-column prop="num" min-width="120" label="数量">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.num" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)"/>
                    </template>
                    <span v-else>{{ scope.row.num }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="price" min-width="120" label="单价">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.price" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)"/>
                    </template>
                    <span v-else>{{ scope.row.price }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="amountOfMoney" min-width="120" label="金额">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.amountOfMoney" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)"/>
                    </template>
                    <span v-else>{{ scope.row.amountOfMoney }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="discount" min-width="150" label="折扣">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.discount" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)">
                            <el-button slot="append">%</el-button>
                        </el-input>
                    </template>
                    <span v-else-if="scope.row.discount">{{ scope.row.discount + ' %' }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="discountAmount" min-width="120" label="折扣额">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.discountAmount" class="edit-input" size="small"/>
                    </template>
                    <span v-else>{{ scope.row.discountAmount }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="discountAfter" min-width="120" label="折后金额">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.discountAfter" class="edit-input" size="small"/>
                    </template>
                    <span v-else>{{ scope.row.discountAfter }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="taxRate" min-width="150" label="税率">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.taxRate" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)">
                            <el-button slot="append">%</el-button>
                        </el-input>
                    </template>
                    <span v-else-if="scope.row.taxRate">{{ scope.row.taxRate + ' %' }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="taxAmount" min-width="120" label="税额">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.taxAmount" class="edit-input" size="small"/>
                    </template>
                    <span v-else>{{ scope.row.taxAmount }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="taxAfter" min-width="120" label="税后金额">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input v-model="scope.row.taxAfter" class="edit-input" size="small"/>
                    </template>
                    <span v-else>{{ scope.row.taxAfter }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="commitTime" width="240" label="交货日期">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-date-picker v-model="scope.row.commitTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small"></el-date-picker>
                    </template>
                    <span v-else>{{ scope.row.commitTime }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="brand" min-width="120" label="产品品牌"></el-table-column>

            <el-table-column align="center" label="操作" width="120" fixed="right">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.edit" type="success" plain size="mini" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)"></el-button>
                    <el-button v-else type="warning" plain size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index,scope.row)"></el-button>
                    <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="submit_btn">
            <el-button type="primary" :disabled="isDisable" @click="onSubmit" style="margin-right:100px;">立即提交</el-button>
            <el-button @click="closeTag">取消</el-button>
        </div>
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
                updateData:null,
                list: null,
                listLoading: true,
                selectData:[],
                options:[],
                itemData:[
                    {id:10,goodspec:{},category:'',tbGoods:{  goodsName:'',  describe:'',},edit:false},
                    {id:11,goodspec:{},category:'',tbGoods:{  goodsName:'',  describe:'',},edit:false},
                ],
                scopeIndex:null,

                myform:{
                    customerpoolId:null,
                    contactId:null,
                    orderTime:null,
                    settlement:null,
                    deliveryMode:null,
                    deliveryAddress:null,
                    private_employee:this.$store.state.user,
                    ascriptionId:null,
                    ascription:null,
                    deptname:null,
                    parentname:null,
                    remarks:null,
                },
                rules:{
                    approverid : [{ required: true, message: '审核人不能为空', trigger: 'blur' },],
                    our_signatories : [{ required: true, message: '我方签约人不能为空', trigger: 'blur' },],
                    signatories : [{ required: true, message: '客户签约人不能为空', trigger: 'blur' },],
                },

                
                deliveryMethod:[],
                customerList:[],
                contactsList:[],
                brandList:[],
                settlementMethod:[
                    {id:101,name:'现金'},
                    {id:102,name:'发票'},
                    {id:103,name:'银行卡'},
                ],

                customerId:null,

                isDisable:false,
            }
        },
        mounted() {
            this.loadData()
            this.getList()
            this.loadOther()
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
                    _this.$options.methods.loadContact.bind(_this)()
                    _this.$options.methods.getData.bind(_this)()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            getData(){
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
                    _this.listLoading = false
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
            selectCustomer(e){
                this.customerId = e
                this.customerList.forEach(el => {
                    if(el.id == e){
                        this.myform.ascriptionId = el.privateUser[0].private_id
                        this.myform.ascription = el.privateUser[0].private_employee
                        this.myform.deptname = el.deptname
                        this.myform.parentname = el.parentname
                    }
                });
                this.$options.methods.loadContact.bind(this)()
            },
            handleAdd(){
                this.itemData.push({id:10,goodspec:{},unit:'',category:'',tbGoods:{  goodsName:'',  describe:'',},edit:false})
            },
            handleEdit(index,row){
                row.edit = !row.edit
                this.scopeIndex = index
            },
            handleDelete(index,row){
                this.itemData.forEach((el,i) => {
                    if(i == index){
                        this.itemData.splice(i,1)
                    }
                });
            },
            confirmEdit(row) {
                row.edit = false
                this.$message({
                    message: '本地保存成功',
                    type: 'success'
                })
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
            handleChange(e){
                this.itemData.forEach((el,i) => {
                    if(i == this.scopeIndex){
                        if(e){
                            e.edit = true
                            this.itemData.splice(i,1,e)
                        }
                    }
                });
            },
            handleinput(e,index,row){
                if(row.num && row.price){
                    let z = parseFloat(row.num) * parseFloat(row.price)
                    row.amountOfMoney = z.toString()
                }
                if(row.amountOfMoney && row.discount){
                    let a = parseFloat(row.amountOfMoney) * parseFloat(row.discount) / 100
                    let b = parseFloat(row.amountOfMoney) - a
                    row.discountAmount = b.toString()
                    row.discountAfter = a.toString()
                }
                if(row.amountOfMoney && row.taxRate){
                    if(row.discountAfter){
                        let x = parseFloat(row.discountAfter) * parseFloat(row.taxRate) / 100
                        let y = parseFloat(row.discountAfter) + x
                        row.taxAmount = x.toString()
                        row.taxAfter = y.toString()
                    }else{
                        let c = parseFloat(row.amountOfMoney) * parseFloat(row.taxRate) / 100
                        let d = parseFloat(row.amountOfMoney) + c
                        row.taxAmount = c.toString()
                        row.taxAfter = d.toString()
                    }
                }
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
                    if(column.property == 'num' || column.property == 'price' || column.property == 'amountOfMoney' || column.property == 'discountAmount' || column.property == 'discountAfter' || column.property == 'taxAmount' || column.property == 'taxAfter'){
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
            onSubmit(){
                // console.log(this.myform)
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
                    // console.log(err);
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
</style>


