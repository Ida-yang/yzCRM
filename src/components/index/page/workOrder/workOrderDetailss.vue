<template>
    <div class="wo_content">
        <!-- {{msg}} -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="font-weight:bold">服务工单</span>
            </div>
            <div class="wo_c">
                <ul class="wo_ul">
                    <li class="wo_li">
                        <span class="wo_span_1">公司名称</span>
                        <span class="wo_span_2">{{workorderDetails.customerpool}}</span>
                    </li>
                    <li class="wo_li">
                        <span class="wo_span_1">联系人</span>
                        <span class="wo_span_2">{{workorderDetails.contacts}}</span>
                    </li>
                    <li class="wo_li">
                        <span class="wo_span_1">电话</span>
                        <span class="wo_span_2">{{workorderDetails.phone}}</span>
                    </li>
                    <li class="wo_li">
                        <span class="wo_span_1">反馈方式</span>
                        <span class="wo_span_2">{{workorderDetails.feedbackType}}</span>
                    </li>
                    <li class="wo_li">
                        <span class="wo_span_1">受理人</span>
                        <span class="wo_span_2">{{workorderDetails.ascription}}</span>
                    </li>
                    <li class="wo_li">
                        <span class="wo_span_1">工单类型</span>
                        <span class="wo_span_2">{{workorderDetails.serviceTypeName}}</span>
                    </li>
                    <li class="wo_li">
                        <span class="wo_span_1">销售单号</span>
                        <span class="wo_span_2">{{workorderDetails.orderNo}}</span>
                    </li>
                    <li class="wo_li"></li>
                    <li class="wo_li"></li>
                    <li class="wo_li_1">
                        <span class="wo_span_1">问题名称</span>
                        <span class="wo_span_2">{{workorderDetails.problem}}</span>
                    </li>
                    <li class="wo_li_2">
                        <span class="wo_span_1">问题描述</span>
                        <span class="wo_span_2" v-html="workorderDetails.describe"></span>
                    </li>
                </ul>
            </div>
        </el-card>
        <div class="bottom">
            <div class="uploadBOX" v-if="imgList.length">
                <div class="imgbox" v-for="(item,i) in imgList" :key="i">
                    <img :src="item.url" class="wo_imgbox" :alt="item.name" @click="showImg($event,item)">
                </div>
            </div>
            <div class="wo_enclo" v-if="fileList.length">
                <ul>
                    <li v-for="(item,i) in fileList" :key="i"><a :href="item.url" download>{{item.name}}</a></li>
                </ul>
            </div>
        </div>

        <div class="wo_c_1" >
            <ul class="wo_ul">
                <li class="wo_li_3">
                    <span class="wo_span_1">制单人</span>
                    <span class="wo_span_3">{{workorderDetails.private_employee}}</span>
                </li>
                <li class="wo_li_3">
                    <span class="wo_span_1">负责人</span>
                    <span class="wo_span_3">{{workorderDetails.ascription}}</span>
                </li>
                <li class="wo_li_3">
                    <span class="wo_span_1">部门</span>
                    <span class="wo_span_3">{{workorderDetails.deptname}}</span>
                </li>
                <li class="wo_li_3">
                    <span class="wo_span_1">机构</span>
                    <span class="wo_span_3">{{workorderDetails.parentname}}</span>
                </li>
            </ul>
        </div>

        <hr style="height:20px;background-color:#f0f0f0;border:0">

        <div class="orderHead">
            <el-form :inline="true" ref="myform" :model="myform" :rules="rules">
                <el-form-item class="first_input" label="解决人" label-width="90px">
                    <el-input v-model="myform.solutionMan" class="inputbox" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="time" class="first_input" label="解决时间" label-width="90px">
                    <el-date-picker v-model="myform.time" type="datetime" placeholder="选择解决时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" class="inputbox" @change="loadTime"></el-date-picker>
                </el-form-item>
                <el-form-item prop="solveType" class="first_input" label="解决方式" label-width="90px">
                    <el-select v-model="myform.solveType" placeholder="请选择解决方式" class="inputbox">
                        <el-option v-for="item in solveTypeList" :key="item.index" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="timeConsuming" class="first_input" label="耗时" label-width="90px">
                    <el-input v-model="myform.timeConsuming" class="inputbox"></el-input>
                </el-form-item>
                <el-form-item prop="baseInput" class="first_input" label="经验库引入" label-width="90px">
                    <el-select v-model="myform.baseInput" placeholder="" class="inputbox" filterable @change="selectBase">
                        <el-option v-for="item in knowledgeBase" :key="item.id" :label="item.pName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>

        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="说明" name="first" style="min-height:150px;">
                <div v-show="!showUE" style="padding:0 30px;box-sizing:border-box;">
                    <el-button class="btn info-btn wo_show" size="mini" @click="doShowUE">编辑</el-button>
                    <div v-html="defaultMsg"></div>
                </div>
                <div v-show="showUE">
                    <div class="editor-container">
                        <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="配件详情" name="second">
                <div class="entry">
                    <el-button class="btn info-btn" size="mini" icon="el-icon-circle-plus-outline" @click="handleAdd"></el-button>
                </div>
                <el-table :data="itemData" border fit highlight-current-row show-summary :summary-method="getSummary" @cell-click="cellClick">
                    <el-table-column header-align="center" fixed align="center" type="index" width="45"></el-table-column>

                    <el-table-column label="产品名称" prop="tbGoods.goodsName" width="280" fixed>
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-select v-model="scope.row.tbGoods.goodsName" placeholder="请选择" filterable :filter-method="handleFilter" @focus="handleFoces(scope.$index,scope.row)">
                                    <el-option class="droplist" :value="scope.row.tbGoods.goodsName">
                                        <el-table :data="selectData" border @current-change="currentChange" style="width: 100%">
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

                    <el-table-column label="描述" prop="tbGoods.describe" width="120" />
                    
                    <el-table-column label="规格属性" prop="goodspec" width="100">
                        <template slot-scope="scope">
                            <span v-for="(item,i) in scope.row.goodspec" :key="i">{{item.value +'/'}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="单位" prop="unit" width="50" />

                    <el-table-column prop="num" min-width="100" label="数量">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.num" onkeyup="value=value.replace(/[^\d]/g,'')" class="edit-input" size="small" @input="handleinput($event,scope.$index,scope.row)"/>
                            </template>
                            <span v-else>{{ scope.row.num }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="price" min-width="120" label="单价">
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

                    <el-table-column prop="brand" width="80" label="产品品牌"></el-table-column>

                    <el-table-column align="center" label="操作" width="90">
                        <template slot-scope="scope">
                            <el-button type="success" plain style="width:30px;height:30px;padding:0" :disabled="!scope.row.edit" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)"></el-button>
                            <el-button type="danger" plain style="width:30px;height:30px;padding:0" icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <el-dialog title="选择产品" :visible.sync="dialogVisible1" :close-on-click-modal="false" width="80%" class="orderDialog" center>
            <div class="otherleftcontent">
                <el-tree
                    node-key="id"
                    highlight-current accordion expand-on-click-node
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
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit()">确 定</el-button>
            </span>
        </el-dialog>
        
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
    import UE from '../../ue.vue'

    export default {
        name:'workOrderDetail',
        store,
        components: {UE},
        data(){
            return{
                msg:'工单详情页',
                detailData:null,
                workorderDetails:{},
                imgList:[],
                fileList:[],
                dialogImageUrl:null,
                dialogVisible:false,

                myform:{
                    id:null,
                    pId:this.$store.state.ispId,
                    solutionMan:this.$store.state.user,
                    solveType:null,
                    time:null,
                    timeConsuming:null,
                },
                rules:{},
                solveTypeList:[
                    {index:1,name:'电话'},
                    {index:2,name:'QQ'},
                    {index:3,name:'微信'},
                    {index:4,name:'邮箱'},
                    {index:5,name:'上门'},
                ],
                knowledgeBase:[],

                activeName:'first',
                defaultMsg: '填写说明前请把这句话删掉',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 500
                },

                itemData:[
                    {id:10,amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false,},
                    {id:11,amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false,},
                    {id:12,amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false,},
                ],
                list:null,
                selectData:[],
                scopeIndex:'',
                cusdiscount:null,
                custaxRate:null,
                OKdisabled:true,
                classification_id:null,
                goodsName:null,

                dialogVisible1:false,
                tableData:[],
                itemList:[],
                multipleSelection:[],
                idArr:[],

                datalist:[],
                defaultProps:{
                    label:'name',
                    children:'next',
                },
                defaultkeys:[1],

                nodeChange:false,
                updateData:[],

                showUE:true,
                woRemarks:null,

                isDisable:false
            }
        },
        mounted(){
            this.loadData()
            this.getList()
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                this.detailData = this.$store.state.workOrderdetaildsData
                let data = {}
                data.id = this.detailData.id

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'workOrder/queryById.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.workorderDetails = res.data
                    if(res.data.solution){
                        _this.showUE = false
                        _this.myform = res.data.solution
                        _this.defaultMsg = res.data.solution.remarks
                        _this.updateData = res.data.solution.partsDetails
                        _this.$options.methods.getItem.bind(_this)()
                    }
                    _this.$options.methods.loadList.bind(_this)()
                    if(res.data.discount){
                        _this.cusdiscount = res.data.discount
                    }else{
                        _this.cusdiscount = '100'
                    }
                    if(res.data.taxRate){
                        _this.custaxRate = res.data.taxRate
                    }else{
                        _this.custaxRate = '0'
                    }
                    _this.$store.commit('getNowTime')
                    _this.myform.time = _this.$store.state.nowtime
                    _this.$options.methods.loadTime.bind(_this)(true)
                }).catch(function(err){
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
            loadList(){
                this.imgList = []
                this.fileList = []
                let arr = this.workorderDetails.enclosures
                let arr2 = this.workorderDetails.enclosureOldNames
                arr2.forEach((b,j) => {
                    arr.forEach((a,i) => {
                        if(j == i){
                            let aaa = a.split('.')
                            if(aaa[1] == 'png' || aaa[1] == 'jpg' || aaa[1] == 'jpeg'){
                                this.imgList.push({url:this.$store.state.systemHttp + 'upload/' + this.$store.state.iscId + '/' + a,name:b})
                            }else{
                                this.fileList.push({url:this.$store.state.systemHttp + 'upload/' + this.$store.state.iscId + '/' + a,name:b})
                            }
                        }
                    });
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
                        this.itemData.push({ amountOfMoney: el.amountOfMoney, brand: el.brand, discount: el.discount, discountAfter: el.discountAfter, discountAmount: el.discountAmount, goodsId: el.goodsId, tbGoods:{ goodsName:el.goodsName, describe:el.describe, }, id: el.itemId, itemId: el.itemId, num: el.num, price: el.price, taxAfter: el.taxAfter, taxAmount: el.taxAmount, taxRate: el.taxRate, goodspec: el.goodspec, unit: el.unit, edit:false,})
                    });
                }
            },
            showImg(e,val){
                this.dialogImageUrl = val.url
                this.dialogVisible = true
            },
            doShowUE(){
                this.showUE = true
            },
            selectBase(val){
                console.log(val)
            },
            loadTime(){
                let begintime = new Date(this.workorderDetails.feedbackTime.replace(/-/g, "/"))
                let endtime = new Date(this.myform.time.replace(/-/g, "/"))
                let dateDiff = endtime.getTime() - begintime.getTime()
                let times = Math.floor(dateDiff / (3600 * 1000))
                let days = Math.floor(times / 24)
                let hours = times % 24
                this.myform.timeConsuming = days + ' 天 ' + hours + ' 小时'
            },

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
            handleAdd(){
                this.itemData.push({amountOfMoney:null, commitTime:null, brand:null, discount:null, discountAfter:null, discountAmount:null, tbGoods:{ goodsName:'', describe:'', }, num: null, price: null, taxAfter:null, taxAmount:null, taxRate:null, unit:null, edit:false})
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
            cellClick(row, column, cell, event){
                row.edit = false
                if(column.label !== '操作'){
                    row.edit = true
                    this.itemData.forEach((el,i) => {
                        if(row.id == el.id){
                            this.scopeIndex = i
                        }
                    });
                }
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
                this.dialogVisible1 = true
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

                this.dialogVisible1 = false
            },
            confirmEdit(row) {
                row.edit = false
                this.$message({
                    message: '本地保存成功',
                    type: 'success'
                })
            },
            handleDelete(index,row){
                this.itemData.forEach((el,i) => {
                    if(i == index){
                        this.itemData.splice(i,1)
                    }
                });
                this.$options.methods.getList.bind(this)()
            },

            onSubmit(){
                const _this = this
                let content = this.$refs.ue.getUEContent()
                let partsDetails = new Array()
                this.itemData.forEach(el => {
                    if(el.goodsId || el.itemId){
                        partsDetails.push({
                            "price":el.price,
                            "num":el.num,
                            "itemId":el.id,
                            "amountOfMoney":el.amountOfMoney,
                            "discount":el.discount,
                            "discountAmount":el.discountAmount,
                            "discountAfter":el.discountAfter,
                            "taxRate":el.taxRate,
                            "taxAmount":el.taxAmount,
                            "taxAfter":el.taxAfter,
                        })
                    }
                });
                let data = {
                    "id":this.myform.id,
                    "pId":this.myform.pId,
                    "solveType":this.myform.solveType,
                    "timeConsuming":this.myform.timeConsuming,
                    "workOrderId":this.workorderDetails.id,
                    "remarks":content,
                    "partsDetails":partsDetails,
                }
                console.log(data)
                let flag = false
                if(!this.myform.time){
                    _this.$message({
                        message:'解决时间不能为空',
                        type:'error'
                    })
                    flag = true
                }
                if(flag) return

                this.isDisable = true

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'solution/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data: data,
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message: '操作成功',
                            type:'success'
                        })
                        _this.itemData.forEach(o => {
                            o.edit = false
                        });
                        _this.$options.methods.loadData.bind(_this)()
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
                    delItem.path === this.$route.fullPath && this.$router.push('/workOrder');
                }else{
                    this.$router.push('/index');
                }
            },
        },
    }
</script>

<style>
    .wo_content{
        margin-bottom: 65px;
    }
    .wo_c_1{
        margin-bottom: 20px;
    }
    .wo_ul{
        width: 100%;
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
    }
    .wo_li,.wo_li_1{
        height: 30px;
        margin-bottom: 22px;
        display: flex;
        align-items: center;
    }
    .wo_ul .wo_li{
        flex: 0 0 33%;
    }
    .wo_ul .wo_li_1,.wo_ul .wo_li_2{
        flex: 0 0 66%;
    }
    .wo_ul .wo_li_3{
        flex: 0 0 24%;
    }
    .wo_span_1{
        display: inline-block;
        width: 90px;
        text-align: right;
        font-size: 14px;
        color: #606266;
        padding-right: 8px;
        box-sizing: border-box;
        margin-right: 5px;
    }
    .wo_span_2{
        display: inline-block;
        width: calc(100% - 142px);
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        padding: 0 8px;
        box-sizing: border-box;
    }
    .wo_span_3{
        display: inline-block;
        width: calc(100% - 100px);
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        padding: 0 8px;
        box-sizing: border-box;
    }
    .wo_ul .wo_li_2 .wo_span_1{
        margin-right:0;
    }
    .wo_ul .wo_li_2 .wo_span_2{
        height: 117px;
    }
    .wo_imgbox{
        border: 1px dashed #dcdfe6
    }
    .wo_enclo ul{
        padding-left: 20px;
        list-style-type: none;
        color: blue;
        text-decoration: underline;
        line-height: 24px;
        font-size: 14px;
    }
    
    .droplist{
        height: auto
    }
    .wo_show{
        /* float: right;
        margin-right: 20px; */
        margin-left: calc(100% - 60px)
    }
</style>
