<template>
    <!-- 合同页面 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">合同分类：</span>
                <el-radio v-for="item in agreementData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList" style="width:100%;">
            <span class="nameList">公司名称：</span>
            <el-input v-model="searchList.searchName" placeholder="公司名称" style="width:300px;"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <el-button class="btn" size="mini" @click="handleDeletes()">删除</el-button>
            <el-button class="btn info-btn" size="mini" @click="Receivables()">收款</el-button>
            <el-popover
            placement="bottom"
            width="100"
            trigger="click">
            <el-checkbox-group class="checklist" v-model="checklist">
                <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
            </el-checkbox-group>
            <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table
            :data="tableData"
            :default-sort = "{prop:'contract_id',order: 'descending'}"
            ref="multipleTable"
            border
            stripe
            style="width:100%;text-align:center"
            @selection-change="selectInfo"
            >
            <el-table-column
                fixed
                header-align="center"
                align="center"
                type="selection"
                width="45"
                scope.row.contract_id
                prop="contract_id"
                @selection-change="selectInfo">
            </el-table-column>
            <div v-for="(item,index) in filterList" :key="index" >
                <el-table-column
                    prop="contract_number"
                    fixed
                    v-if="item.prop == 'contract_number' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="合同编号"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contract_name"
                    fixed
                    v-else-if="item.prop == 'contract_name' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="150"
                    label="合同名称"
                    sortable>
                    <template slot-scope="scope">
                        <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                            {{scope.row.contract_name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="contract_type"
                    v-else-if="item.prop == 'contract_type' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="合同类型"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="poolName"
                    v-else-if="item.prop == 'poolName' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="180"
                    label="公司名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="opportunity_id"
                    v-else-if="item.prop == 'opportunity_id' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="商机名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="amount"
                    v-else-if="item.prop == 'amount' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="合同金额"
                    sortable>
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.amount | rounding}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="start_date"
                    v-else-if="item.prop == 'start_date' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="合同开始日期"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="end_date"
                    show-overflow-tooltip
                    v-else-if="item.prop == 'end_date' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="合同到期日期"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="signatories"
                    v-else-if="item.prop == 'signatories' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="客户签约人"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="our_signatories"
                    v-else-if="item.prop == 'our_signatories' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="我方签约人"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="deptname"
                    v-else-if="item.prop == 'deptname' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="100"
                    label="部门"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="parentname"
                    v-else-if="item.prop == 'parentname' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="机构"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    v-else-if="item.prop == 'createTime' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="140"
                    label="创建时间"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="remarks"
                    v-else-if="item.prop == 'remarks' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="备注"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="already"
                    v-else-if="item.prop == 'already' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="已回款金额"
                    sortable>
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.already | rounding}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="surplus"
                    v-else-if="item.prop == 'surplus' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="剩余款项金额"
                    sortable>
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.surplus | rounding}}
                        </div>
                    </template>
                </el-table-column>
            </div>
            <el-table-column label="操作"
                fixed="right"
                width="150"
                header-align="left"
                align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block numberPage">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[20, 50, 100, 500]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableNumber">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'agreement',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.agreementList;
            },
            tableNumber(){
               return store.state.agreementListnumber;     
            },
        },
        filters: {
            rounding (value) {
                return value.toFixed(2)
            }
        },
        data(){
            return {
                searchList:{
                    searchName:null,
                    label:'1'
                },
                searchListNew:{
                    searchName:null,
                    label:'1'
                },

                agreementData:[
                    {label:'0',value:'全部合同'},
                    {label:'1',value:'我的合同'},
                    {label:'2',value:'本组'},
                    {label:'3',value:'本机构'}
                ],

                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    ids:null,
                },

                filterList:null,
                checklist:null,
                
                formLabelWidth: '130px',

                authorityInterface: null,
            }
        },
        mounted(){
            this.reloadTable()
            this.reloadData()
        },
        activated(){
            this.reloadTable()
            this.reloadData()
        },

        methods: {
            //加载所有合同
            reloadTable() {
                let _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.searchName = this.searchList.searchName
                // searchList.pId = this.$store.state.ispId
                searchList.page = this.page
                searchList.limit = this.limit
                // console.log(searchList)
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getContractAll.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.$store.state.agreementList = res.data.map.success
                    _this.$store.state.agreementListnumber = res.data.count;
                }).catch(function(err){
                    console.log(err);
                });
            },
            reloadData() {
                let _this = this;
                let qs =require('querystring')
                
                let filterList = {}
                filterList.type = '合同'
                let data = {}
                data.type = '合同'
                data.state = 1
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getAllUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(filterList)
                }).then(function(res){
                    // console.log(res.data)
                    _this.filterList = res.data
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(data)
                }).then(function(res){
                    // console.log(res.data)
                    _this.checklist = res.data
                }).catch(function(err){
                    console.log(err);
                });
            },
            //获取列表id
            selectInfo(val){
                this.multipleSelection = val;
                // console.log(val)
                let arr = val;
                let newArr = [new Array()];
                arr.forEach((item) => {
                    if(item.contract_id != 0){
                        // console.log(item.contract_id)
                        newArr.push(item.contract_id)
                    }
                });
                this.idArr.ids = newArr;
                
            },
            openDetails(index,row){
                let detailsData = {};
                detailsData.submitData = {"id": row.contract_id};
                this.$store.state.detailsData = detailsData;
                this.$router.push({ path: '/agreementDetails' });
            },
            handleDeletes(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.ids = this.idArr.ids
                _this.$confirm('是否确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'delContract.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        // console.log(res)
                        if(res.data && res.data == 'success') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){//删除合同
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        } else {
                            _this.$message({
                                message: res.data,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        console.log(err);
                    });
                })
            },
            handleAdd(){
                let addOrUpdateData = {};
                const _this = this
                // addOrUpdateData.title = "添加线索";
                addOrUpdateData.createForm = [
                    {"label":"合同类型","inputModel":"contract_type","type":"select","options":[
                        {"okey":'0',"olabel":"销售合同","ovalue":"销售合同"},
                        {"okey":'2',"olabel":"服务合同","ovalue":"服务合同"},
                        {"okey":'3',"olabel":"代理合同","ovalue":"代理合同"},
                        {"okey":'4',"olabel":"其他","ovalue":"其他"},
                    ]},
                    {"label":"合同编号","inputModel":"contract_number",},
                    {"label":"合同名称","inputModel":"contract_name",},
                    {"label":"客户","inputModel":"customerpool_id","type":"select"},
                    {"label":"对应商机","inputModel":"opportunity_id","type":"select"},
                    {"label":"合同金额","inputModel":"amount","type":"number"},
                    {"label":"开始时间","inputModel":"start_date","type":"date"},
                    {"label":"结束时间","inputModel":"end_date","type":"date"},
                    {"label":"客户签约人","inputModel":"signatories","type":"select"},
                    {"label":"我方签约人","inputModel":"our_signatories","disabled":true},
                    {"label":"备注","inputModel":"remarks"}];
                addOrUpdateData.setForm = {
                    "contract_type": '',
                    "contract_number": '',
                    "contract_name": '',
                    "customerpool_id": '',
                    "opportunity_id": '',
                    "amount": '',
                    "start_date": '',
                    "end_date": '',
                    "signatories": '',
                    "our_signatories": this.$store.state.user,
                    "remarks": ''};
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'insertContract.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                this.$store.state.addOrUpdateData = addOrUpdateData;
                // this.$router.push({ path: '/agreementaddorupdate' });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'contractJurisdiction/insert.do',//新增合同
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$router.push({ path: '/agreementaddorupdate' });
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            handleEdit(index,row){
                // console.log(row)
                const _this = this
                let addOrUpdateData = {};
                // addOrUpdateData.title = "修改线索";
                addOrUpdateData.createForm = [
                    {"label":"合同类型","inputModel":"contract_type","type":"select","options":[
                        {"okey":'0',"olabel":"销售合同","ovalue":"销售合同"},
                        {"okey":'2',"olabel":"服务合同","ovalue":"服务合同"},
                        {"okey":'3',"olabel":"代理合同","ovalue":"代理合同"},
                        {"okey":'4',"olabel":"其他","ovalue":"其他"},
                    ]},
                    {"label":"合同编号","inputModel":"contract_number","prop":"contract_number",},
                    {"label":"合同名称","inputModel":"contract_name",},
                    {"label":"客户","inputModel":"customerpool_id","type":"select"},
                    {"label":"对应商机","inputModel":"opportunity_id","type":"select"},
                    {"label":"合同金额","inputModel":"amount","type":"number"},
                    {"label":"开始时间","inputModel":"start_date","type":"date"},
                    {"label":"结束时间","inputModel":"end_date","type":"date"},
                    {"label":"客户签约人","inputModel":"signatories","type":"select"},
                    {"label":"我方签约人","inputModel":"our_signatories","disabled":true},
                    {"label":"备注","inputModel":"remarks"}];
                addOrUpdateData.setForm = {
                    "contract_type": row.contract_type,
                    "contract_number": row.contract_number,
                    "contract_name": row.contract_name,
                    "customerpool_id": row.poolName,
                    "poolName": row.customerpool_id,
                    "opportunity_id": row.opportunity_name,
                    "opportunity_name":row.opportunity_id,
                    "amount": row.amount,
                    "start_date": row.start_date,
                    "end_date": row.end_date,
                    "signatories": row.signatories,
                    "our_signatories": row.our_signatories,
                    "remarks": row.remarks};
                addOrUpdateData.submitData = {"id": row.contract_id};
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'updateContract.do?cId='+this.$store.state.iscId,
                this.$store.state.addOrUpdateData = addOrUpdateData;
                // console.log(addOrUpdateData)
                // this.$router.push({ path: '/agreementaddorupdate' });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'contractJurisdiction/update.do',//编辑合同
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$router.push({ path: '/agreementaddorupdate' });
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            handleDelete(index,row){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.ids = row.contract_id
                _this.$confirm('是否确认删除[' + row.contract_name + ']？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'delContract.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        // console.log(res)
                        if(res.data && res.data == 'success') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){//删除合同
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        }  else {
                            _this.$message({
                                message: res.data,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        console.log(err);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除[' + row.contract_name + ']'
                    });       
                });
            },
            hangleChange(e,val){
                // console.log(e)
                let _this = this
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
                    // console.log(res)
                    if(res.data && res.data =="success"){
                        _this.$options.methods.reloadData.bind(_this)(true);
                    }else{
                        console.log(err)
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            search() {
                const _this = this
                const qs = require('querystring')
                if(this.searchList.label == 0 ){
                    this.authorityInterface = 'contractJurisdiction/all.do'//全部合同
                }else if(this.searchList.label == 1 ){
                    this.authorityInterface = 'contractJurisdiction/my.do'//我的合同
                }else if(this.searchList.label == 2){
                    this.authorityInterface = 'contractJurisdiction/second.do'//本组合同
                }else if(this.searchList.label == 3){
                    this.authorityInterface = 'contractJurisdiction/dept.do'//本机构合同
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+_this.authorityInterface,
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }
                }).catch(function(err){
                    console.log(err);
                });
                // this.$options.methods.reloadTable.bind(this)(true);
            },
            reset(){
                this.searchList = Object.assign({}, this.searchListNew);
                this.$options.methods.reloadTable.bind(this)(true);
            },

            handleSizeChange(val) {
                let _this = this;
                _this.limit = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
            },
            handleCurrentChange(val) {
                let _this = this;
                _this.page = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
            },
        },
    }
</script>

<style>
    .el-row{
        margin-bottom: 10px;
    }
</style>
