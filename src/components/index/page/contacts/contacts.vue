<template>
    <!-- 联系人列表 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in contactData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.time">
                <span class="nameList">新增时间：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in timeData" :key="item.id" :label="item.id" @change="search()">{{item.typeName}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList">
            <el-input placeholder="请输入联系人或公司名称" v-model="searchList.searchName" style="margin-left:20px;width:400px;" @keyup.enter.native="search">
                <el-select v-model="searchList.keyType" slot="prepend" placeholder="请选择" style="width:125px"> 
                <el-option label="联系人名称" value="1"></el-option>
                <el-option label="公司名称" value="2"></el-option>
                </el-select>
            </el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <el-button class="btn info-btn" size="mini" @click="handleDeletes()">删除</el-button>

            <div class="totalnum_head">共 <span class="bold_span">{{tableNumber}}</span> 条</div>

            <el-popover placement="bottom" width="100" trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist" style="max-height:600px;overflow-y:overlay;overflow-x:hidden">
                    <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                </el-checkbox-group>
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table :data="tableData" ref="multipleTable" border stripe style="width:100%;" @selection-change="selectInfo">
            <el-table-column fixed header-align="center" align="center" type="selection" width="45" scope.row.csId prop="csId" @selection-change="selectInfo" />
            <div v-for="(item,index) in filterList" :key="index" >
                <el-table-column label="联系人" prop="name" fixed v-if="item.prop == 'name' && item.state == 1" min-width="100" sortable>
                    <template slot-scope="scope">
                        <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                            {{scope.row.name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="公司名称" prop="poolname" fixed v-if="item.prop == 'poolname' && item.state == 1" min-width="200" sortable />
                <el-table-column label="电话" prop="telephone" v-if="item.prop == 'telephone' && item.state == 1" min-width="110" sortable />
                <el-table-column label="手机" prop="phone" v-if="item.prop == 'phone' && item.state == 1" min-width="110" sortable />
                <el-table-column label="QQ" prop="qq" v-if="item.prop == 'qq' && item.state == 1" min-width="110" sortable />
                <el-table-column label="邮箱" prop="email" show-overflow-tooltip v-if="item.prop == 'email' && item.state == 1" min-width="130" sortable />
                <el-table-column label="微信" prop="wechat" v-if="item.prop == 'wechat' && item.state == 1" min-width="110" sortable />
                <el-table-column label="性别" prop="sex" v-if="item.prop == 'sex' && item.state == 1" min-width="90" sortable />
                <el-table-column label="备注" prop="remark" v-if="item.prop == 'remarks' && item.state == 1" min-width="180" sortable />
                <el-table-column label="最新跟进时间" prop="follow[0].createTime" v-if="item.prop == 'follow[0].createTime' && item.state == 1" min-width="150" sortable />
                <el-table-column label="最新跟进记录" prop="follow[0].followContent" show-overflow-tooltip v-if="item.prop == 'follow[0].followContent' && item.state == 1" min-width="180" sortable />
                <el-table-column label="下次联系时间" prop="follow[0].contactTime" v-if="item.prop == 'follow[0].contactTime' && item.state == 1" min-width="150" sortable />
                <el-table-column label="负责人" prop="private_employee" v-if="item.prop == 'private_employee' && item.state == 1" min-width="110" sortable />
                <el-table-column label="部门" prop="deptname" v-if="item.prop == 'deptname' && item.state == 1" min-width="110" sortable />
                <el-table-column label="机构" prop="parentname" show-overflow-tooltip v-if="item.prop == 'parentname' && item.state == 1" min-width="110" sortable />
                <el-table-column label="省-市-区" prop="countryid" v-if="item.prop == 'countryid' && item.state == 1" min-width="150" sortable>
                    <template slot-scope="scope">
                        {{scope.row.country}}-{{scope.row.city}}-{{scope.row.area}}
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" v-if="item.prop == 'createTime' && item.state == 1" min-width="150" sortable />
                <el-table-column v-for="a in fieldHeadData" :label="a.name" :key="a.field_name" :prop="a.field_name" v-if="item.prop == a.field_name && item.state == 1" min-width="130" sortable />
            </div>
            <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        name:'contacts',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.contactsList;
            },
            tableNumber(){
               return store.state.contactsListnumber;     
            },
        },
        data(){
            return {
                fieldHeadData:[],
                searchList:{
                    keyType:'1',
                    searchName:null,
                    time:null,
                    label:'1'
                },
                searchListNew:{
                    keyType:'1',
                    searchName:null,
                    time:null,
                    label:'1'
                },
                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    id:null,
                },
                contactData:[
                    {label:'0',value:'全部'},
                    {label:'1',value:'我的'},
                    {label:'2',value:'本组'},
                    {label:'3',value:'本机构'}
                ],
                timeData:[
                    {id:'1',typeName:'今天'},
                    {id:'2',typeName:'昨天'},
                    {id:'3',typeName:'本周'},
                    {id:'4',typeName:'本月'},
                    {id:'5',typeName:'上月'}
                ],

                nullvalue:null,

                filterList:null,
                checklist:null,
                
                dialogFormVisible:false,
                dialogFormVisible1:false,
                formLabelWidth: '130px',
            }
        },
        activated(){
            this.loadFieldHead()
            this.reloadTable()
        },
        mounted(){
            this.loadFieldHead()
            this.reloadTable()
            this.reloadData()
        },

        methods: {
            reloadTable() {
                const _this = this;
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
                }
                searchList.example = this.searchList.time
                searchList.keyType = this.searchList.keyType
                searchList.page = this.page;
                searchList.limit = this.limit;
                searchList.label = 3
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'pageInfo/queryPageList.do?cId='+_this.$store.state.iscId,
                    // url: _this.$store.state.defaultHttp+'getContactsAll.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.$store.state.contactsList = res.data.map.success
                    _this.$store.state.contactsListnumber = res.data.count;
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadFieldHead(){
                const _this = this
                let qs =require('querystring')
                let data = {
                    label: 3,
                    pId: this.$store.state.ispId
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'field/queryListHead.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data),
                }).then(function(res){
                    _this.fieldHeadData = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            reloadData() {
                const _this = this;
                let qs =require('querystring')
                let filterList = {}
                filterList.type = '联系人'
                let data = {}
                data.type = '联系人'
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
            selectInfo(val){
                this.multipleSelection = val;
                let arr = val;
                let newArr = [new Array()];
                arr.forEach((item) => {
                    if(item.csId != 0){
                        newArr.push(item.csId)
                    }
                });
                this.idArr.id = newArr;
                
            },
            openDetails(index,row){
                this.$store.state.contdetailsData = {id: row.csId}
                this.$router.push({ path: '/contactsdetail' });
            },
            handleAdd(){
                const _this = this
                let contaddOrUpdateData = {};
                contaddOrUpdateData.createForm = [
                    {"label":"联系人","inputModel":"name"},
                    {"label":"公司名称","inputModel":"poolName","type":"require"},
                    {"label":"手机","inputModel":"phone","type":"number"},
                    {"label":"电话","inputModel":"telephone","type":"number"},
                    {"label":"QQ","inputModel":"qq","type":"number"},
                    {"label":"邮箱","inputModel":"email"},
                    {"label":"微信","inputModel":"wechat"},
                    {"label":"性别","inputModel":"sex","type":"radio"},
                    {"label":"生日","inputModel":"birthday","type":"date"},
                    {"label":"职务","inputModel":"identity"},
                    {"label":"省/市/区","inputModel":"countryid","type":"select","placeholder":"请选择省"},
                    {"label":"","inputModel":"cityid","type":"select","placeholder":"请选择市"},
                    {"label":"","inputModel":"areaid","type":"select","placeholder":"请选择区"},
                    {"label":"地址","inputModel":"address"},
                    {"label":"备注","inputModel":"remark","type":'textarea'}];
                contaddOrUpdateData.setForm = {
                    "name": '',
                    "poolName": '',
                    "telephone": '',
                    "phone": '',
                    "countryid":'',
                    "cityid":'',
                    "areaid":'',
                    "qq": '',
                    "email": '',
                    "wechat": '',
                    "sex": '',
                    "birthday":'',
                    "identity": '',
                    "address": '',
                    "remark": ''};
                contaddOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'insertContacts.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                this.$store.state.contaddOrUpdateData = contaddOrUpdateData;

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'contactsJurisdiction/insert.do',//新增联系人
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$router.push({ path: '/contactsaddorupdate' });
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleEdit(index,row){
                const _this = this
                let contaddOrUpdateData = {};
                contaddOrUpdateData.createForm = [
                    {"label":"联系人","inputModel":"name"},
                    {"label":"客户名称","inputModel":"poolName","type":"require"},
                    {"label":"手机","inputModel":"phone","type":"number"},
                    {"label":"电话","inputModel":"telephone","type":"number"},
                    {"label":"QQ","inputModel":"qq","type":"number"},
                    {"label":"邮箱","inputModel":"email"},
                    {"label":"微信","inputModel":"wechat"},
                    {"label":"性别","inputModel":"sex","type":"radio"},
                    {"label":"生日","inputModel":"birthday","type":"date"},
                    {"label":"职务","inputModel":"identity"},
                    {"label":"省/市/区","inputModel":"countryid","type":"select"},
                    {"label":"","inputModel":"cityid","type":"select",},
                    {"label":"","inputModel":"areaid","type":"select"},
                    {"label":"地址","inputModel":"address"},
                    {"label":"备注","inputModel":"remark","type":'textarea'}];
                contaddOrUpdateData.setForm = {
                    "name": row.name,
                    "poolName": row.poolname,
                    "telephone": row.telephone,
                    "phone": row.phone,
                    "countryid":row.country,
                    "country":row.countryid,
                    "cityid":row.city,
                    "city":row.cityid,
                    "areaid":row.area,
                    "area":row.areaid,
                    "qq": row.qq,
                    "email": row.email,
                    "wechat": row.wechat,
                    "sex": row.sex,
                    "birthday":row.birthday,
                    "identity": row.identity,
                    "address": row.address,
                    "remark": row.remark};
                contaddOrUpdateData.submitData = {"id": row.csId, 'batch_id': row.batch_id};
                contaddOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'updateContacts.do?cId='+this.$store.state.iscId,
                this.$store.state.contaddOrUpdateData = contaddOrUpdateData;

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'contactsJurisdiction/update.do',//编辑联系人
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$router.push({ path: '/contactsaddorupdate' });
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleDeletes(){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id

                if(idArr.id){
                    _this.$confirm('是否确认删除？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        axios({
                            method: 'post',
                            url:  _this.$store.state.defaultHttp+ 'deleteContacts.do?cId='+_this.$store.state.iscId,
                            data:qs.stringify(idArr),
                        }).then(function(res){
                            if(res.data.success && res.data.success == true) {
                                _this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                _this.$options.methods.reloadTable.bind(_this)(true);
                            }else if(res.data.msg && res.data.msg == 'error'){//删除联系人
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
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消删除'
                            });       
                        });
                    });
                }else{
                    _this.$message({
                        type: 'error',
                        message: '请先选择要删除的联系人'
                    }); 
                }
                
            },
            handleDelete(index,row){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = row.csId

                _this.$confirm('是否确认删除[' + row.name + ']？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'deleteContacts.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.success && res.data.success == true) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){//删除联系人
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
                        _this.$message.error("删除失败,请重新删除");
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除[' + row.name + ']'
                    });       
                });
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
                    // console.log(err);
                });
            },
            search() {
                const _this = this
                let authorityInterface = ''
                let i = 1
                if(this.searchList.label == 0 ){
                    authorityInterface = 'contactsJurisdiction/all.do'//全部联系人
                    i = 0
                }else if(this.searchList.label == 2){
                    authorityInterface = 'contactsJurisdiction/second.do'//本组联系人
                    i = 0
                }else if(this.searchList.label == 3){
                    authorityInterface = 'contactsJurisdiction/dept.do'//本机构联系人
                    i = 0
                }

                if(i == 0){
                    axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+authorityInterface,
                    }).then(function(res){
                        if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message:'对不起，您没有该权限，请联系管理员开通',
                                type:'error'
                            })
                        }else{
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        }
                    }).catch(function(err){
                        // console.log(err);
                    });
                }else{
                    _this.$options.methods.reloadTable.bind(_this)(true);
                }
            },
            reset(){
                this.searchList = Object.assign({}, this.searchListNew);
                this.$options.methods.reloadTable.bind(this)(true);
            },

            handleSizeChange(val) {
                const _this = this;
                _this.limit = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
            },
            handleCurrentChange(val) {
                const _this = this;
                _this.page = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
            },
        },
    }
</script>

<style>
    
</style>
