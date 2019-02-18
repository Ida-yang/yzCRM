<template>
    <!-- 商机 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">商机：</span>
                <el-radio v-for="item in businessData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList" style="width:100%;">
            <span class="nameList">商机名称：</span>
            <el-input v-model="searchList.searchName" placeholder="公司名称" style="width:300px;"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <el-button class="btn" size="mini" @click="handleDeletes()">删除</el-button>
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
            ref="multipleTable"
            border
            stripe
            :default-sort = "{prop:'opportunity_id',order: 'descending'}"
            style="width:100%;text-align:center"
            @selection-change="selectInfo"
            >
            <el-table-column
            fixed
            header-align="center"
            align="center"
            type="selection"
            width="45"
            scope.row.opportunity_id
            prop="opportunity_id"
            @selection-change="selectInfo">
            </el-table-column>
            <div v-for="(item,index) in filterList" :key="index" >
                <el-table-column
                    prop="opportunity_number"
                    fixed
                    v-if="item.prop == 'opportunity_number' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="商机编号"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="opportunity_name"
                    fixed
                    v-else-if="item.prop == 'opportunity_name' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="商机名称"
                    sortable>
                    <template slot-scope="scope">
                        <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                            {{scope.row.opportunity_name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="opportunity_time"
                    v-else-if="item.prop == 'opportunity_time' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="日期"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="customerpool[0].name"
                    v-else-if="item.prop == 'customerpool[0].name' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="180"
                    label="公司名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].coName"
                    v-else-if="item.prop == 'contacts[0].coName' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="115"
                    label="客户决策人"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="opportunityProgress[0].progress_name"
                    v-else-if="item.prop == 'opportunityProgress[0].progress_name' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="商机进度"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="opportunityProgress[0].progress_probability"
                    show-overflow-tooltip
                    v-else-if="item.prop == 'opportunityProgress[0].progress_probability' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="成功几率"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="opportunity_achievement"
                    v-else-if="item.prop == 'opportunity_achievement' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="140"
                    label="预计成绩金额"
                    sortable>
                    <template slot-scope="scope">
                        {{scope.row.opportunity_achievement | rounding}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="opportunity_deal"
                    v-else-if="item.prop == 'opportunity_deal' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="140"
                    label="预计成交时间"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_employee"
                    v-else-if="item.prop == 'private_employee' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="90"
                    label="负责人"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="deptname"
                    v-else-if="item.prop == 'deptname' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="80"
                    label="部门"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="parentname"
                    v-else-if="item.prop == 'parentname' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="200"
                    label="机构"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="opportunity_remarks"
                    v-else-if="item.prop == 'opportunity_remarks' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="80"
                    label="备注"
                    sortable>
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
        name:'businessOpportunity',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.businessOpportunityList;
            },
            tableNumber(){
               return store.state.businessOpportunityListnumber;     
            },
        },
        filters: {
            rounding (value) {
                // console.log(value)
                return value
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

                businessData:[
                    {label:'0',value:'全部商机'},
                    {label:'1',value:'我的商机'},
                    {label:'2',value:'本组'},
                    {label:'3',value:'本机构'}
                ],
                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    id:null,
                },
                
                filterList:null,
                checklist:null,
                
                dialogFormVisible:false,
                dialogFormVisible1:false,
                formLabelWidth: '130px',

                authorityInterface: null,
            }
        },
        activated(){
            this.reloadTable()
            this.reloadData()
        },
        mounted(){
            this.reloadTable()
            this.reloadData()
        },

        methods: {
            reloadTable() {
                let _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.searchName = this.searchList.searchName;
                if(this.searchList.label == 0 ){
                    searchList.pId = _this.nullvalue
                }else if(this.searchList.label == 1){
                    searchList.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    searchList.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    searchList.deptid = _this.$store.state.insid
                }else{
                    searchList.pId = _this.$store.state.ispId
                }
                searchList.page = this.page;
                searchList.limit = this.limit;
                // console.log(searchList)
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.$store.state.businessOpportunityList = res.data.map.success
                    _this.$store.state.businessOpportunityListnumber = res.data.count;
                }).catch(function(err){
                    console.log(err);
                });
            },
            reloadData() {
                let _this = this;
                let qs =require('querystring')
                
                let filterList = {}
                filterList.type = '商机'
                let data = {}
                data.type = '商机'
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
            selectInfo(val){
                this.multipleSelection = val;
                // console.log(val)
                let arr = val;
                let newArr = [new Array()];
                // console.log(arr)
                arr.forEach((item) => {
                    if(item.opportunity_id != 0){
                        // console.log(item.id)
                        newArr.push(item.opportunity_id)
                        // console.log(newArr)
                    }
                });
                // console.log(newArr)
                this.idArr.id = newArr;
                
            },
            openDetails(index,row){
                let detailsData = {};
                detailsData.submitData = {"id": row.opportunity_id};
                // console.log(detailsData)
                this.$store.state.detailsData = detailsData;
                this.$router.push({ path: '/businessOpportunityDetails' });
            },
            handleAdd(){
                let addOrUpdateData = {};
                const _this = this
                // addOrUpdateData.title = "添加商机";
                addOrUpdateData.createForm = [
                    {"label":"商机编号","inputModel":"opportunity_number",},
                    {"label":"商机名称","inputModel":"opportunity_name"},
                    {"label":"公司名称","inputModel":"customerpool_id","type":"select"},
                    {"label":"客户决策人","inputModel":"contacts_id","type":"select"},
                    {"label":"预计成绩金额","inputModel":"opportunity_achievement","type":"number"},
                    {"label":"预计成交时间","inputModel":"opportunity_deal","type":"date"},
                    {"label":"负责人","inputModel":"user_id","disabled":true},
                    {"label":"备注","inputModel":"opportunity_remarks"}];
                addOrUpdateData.setForm = {
                    "opportunity_number": '',
                    "opportunity_name": '',
                    "customerpool_id": '',
                    "customerpool_name": '',
                    "contacts_id": '',
                    "contacts_name": '',
                    "opportunity_achievement":'',
                    "opportunity_deal":'',
                    "user_id":this.$store.state.user,
                    "opportunity_remarks": ''};
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'opportunity/saveOrUpdate.do?cId='+this.$store.state.iscId,
                this.$store.state.addOrUpdateData = addOrUpdateData;
                // this.$router.push({ path: '/Opportunityaddorupdate' });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunityJurisdiction/insert.do',
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$router.push({ path: '/Opportunityaddorupdate' });
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            handleEdit(index,row){
                // console.log(row)
                const _this = this
                let addOrUpdateData = {};
                // addOrUpdateData.title = "修改商机";
                addOrUpdateData.createForm = [
                    {"label":"商机编号","inputModel":"opportunity_number",},
                    {"label":"商机名称","inputModel":"opportunity_name"},
                    {"label":"公司名称","inputModel":"customerpool_id","type":"select"},
                    {"label":"客户决策人","inputModel":"contacts_id","type":"select"},
                    {"label":"预计成绩金额","inputModel":"opportunity_achievement","type":"number"},
                    {"label":"预计成交时间","inputModel":"opportunity_deal","type":"date"},
                    {"label":"负责人","inputModel":"user_id","disabled":true},
                    {"label":"备注","inputModel":"opportunity_remarks"}];
                addOrUpdateData.setForm = {
                    "opportunity_number": row.opportunity_number,
                    "opportunity_name": row.opportunity_name,
                    "customerpool_id": row.customerpool[0].name,
                    "customerpool_name": row.customerpool[0].id,
                    "contacts_id": row.contacts[0].coName,
                    "contacts_name": row.contacts[0].csId,
                    "opportunity_achievement":row.opportunity_achievement,
                    "opportunity_deal":row.opportunity_deal,
                    "user_id":row.private_employee,
                    "opportunity_remarks": row.opportunity_remarks};
                addOrUpdateData.submitData = {"id":row.opportunity_id};
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'opportunity/saveOrUpdate.do?cId='+this.$store.state.iscId,
                // console.log(addOrUpdateData)
                this.$store.state.addOrUpdateData = addOrUpdateData;
                // this.$router.push({ path: '/Opportunityaddorupdate' });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunityJurisdiction/update.do',
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$router.push({ path: '/Opportunityaddorupdate' });
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            handleDeletes(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                // console.log(idArr.id)
                _this.$confirm('是否确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'opportunity/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        // console.log(res)
                        if(res.status && res.status == 200) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        console.log(err);
                    });
                });
            },
            handleDelete(index,row){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = row.opportunity_id
                // console.log(idArr)
                _this.$confirm('是否确认删除[' + row.opportunity_name + ']？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'opportunity/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        // console.log(res)
                        if(res.status && res.status == 200) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        console.log(err);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除[' + row.opportunity_name + ']'
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
                    this.authorityInterface = 'contactsJurisdiction/all.do'
                }else if(this.searchList.label == 1 ){
                    this.authorityInterface = 'contactsJurisdiction/my.do'
                }else if(this.searchList.label == 2){
                    this.authorityInterface = 'contactsJurisdiction/second.do'
                }else if(this.searchList.label == 3){
                    this.authorityInterface = 'contactsJurisdiction/dept.do'
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
    .el-table td, .el-table th {
        padding: 6px 0 !important;
        line-height: 30px;
    }
    .el-row{
        margin-bottom: 10px;
    }
</style>
