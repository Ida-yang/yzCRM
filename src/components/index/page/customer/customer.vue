<template>
    <!-- 客户 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">客户分类：</span>
                <el-radio v-for="item in pIdData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.keyType">
                <span class="nameList">客户级别：</span>
                <el-radio :label="nullvalue" @change="search()">全部级别</el-radio>
                <el-radio v-for="item in labelData" :key="item.id" :label="item.id" @change="search()">{{item.typeName}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.keyWord">
                <span class="nameList">客户来源：</span>
                <el-radio :label="nullvalue" @change="search()">全部来源</el-radio>
                <el-radio v-for="item in typeData" :key="item.id" :label="item.id" @change="search()">{{item.typeName}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.state">
                <span class="nameList">客户状态：</span>
                <el-radio :label="nullvalue" @change="search()">全部状态</el-radio>
                <el-radio v-for="item in stateData" :key="item.id" :label="item.id" @change="search()">{{item.typeName}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList">
            <span class="nameList">公司名称：</span>
            <el-input v-model="searchList.searchName" placeholder="公司名称" style="width:300px;"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <el-button class="btn info-btn" size="mini" @click="TocustomerPool()">转移至客户池</el-button>
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
            :default-sort = "{prop:'id',order: 'descending'}"
            style="width:100%;"
            @selection-change="selectInfo">
            <el-table-column
                fixed
                header-align="center"
                align="center"
                type="selection"
                width="45"
                scope.row.id
                prop="id"
                @selection-change="selectInfo">
            </el-table-column>
            <div v-for="(item,index) in filterList" :key="index" >
                <el-table-column
                    prop="pName"
                    fixed
                    v-if="item.prop == 'pName' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="150"
                    label="公司名称"
                    sortable>
                    <template slot-scope="scope">
                        <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                            {{scope.row.pName}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    show-overflow-tooltip
                    v-else-if="item.prop == 'address' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="地址"
                    min-width="160"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].coName"
                    v-else-if="item.prop == 'contacts[0].coName' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="100"
                    label="联系人"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].telephone"
                    v-else-if="item.prop == 'contacts[0].telephone' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="100"
                    label="电话"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].phone"
                    v-else-if="item.prop == 'contacts[0].phone' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="100"
                    label="手机"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].qq"
                    v-else-if="item.prop == 'contacts[0].qq' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="90"
                    label="QQ"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].email"
                    v-else-if="item.prop == 'email' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="邮箱"
                    min-width="95"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].wechat"
                    v-else-if="item.prop == 'wechat' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="微信"
                    min-width="95"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].sex"
                    v-else-if="item.prop == 'sex' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="性别"
                    min-width="95"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].remark"
                    v-else-if="item.prop == 'remarks' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="备注"
                    min-width="95"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="follow[0].createTime"
                    v-else-if="item.prop == 'follow[0].createTime' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="最新跟进时间"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="follow[0].followContent"
                    show-overflow-tooltip
                    v-else-if="item.prop == 'follow[0].followContent' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="最新跟进记录"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="follow[0].contactTime"
                    v-else-if="item.prop == 'follow[0].contactTime' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="140"
                    label="下次联系时间"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="privateUser[0].private_employee"
                    v-else-if="item.prop == 'privateUser[0].private_employee' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="100"
                    label="负责人"
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
                    min-width="100"
                    label="机构"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="countryid"
                    v-else-if="item.prop == 'countryid' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="140"
                    label="省-市-区"
                    sortable>
                    <template slot-scope="scope">{{scope.row.country}}-{{scope.row.city}}-{{scope.row.area}}</template>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    v-else-if="item.prop == 'createTime' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="140"
                    label="创建时间"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="status"
                    v-else-if="item.prop == 'status' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="100"
                    label="状态"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="levels"
                    v-else-if="item.prop == 'levels' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="客户级别"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="source"
                    v-else-if="item.prop == 'source' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="客户来源"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="representative"
                    v-else-if="item.prop == 'representative' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="法人代表"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="registrationAuthority"
                    v-else-if="item.prop == 'registrationAuthority' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="150"
                    label="登记机关"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="creditCode"
                    v-else-if="item.prop == 'creditCode' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="160"
                    label="社会信用代码"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="registrationNumber"
                    v-else-if="item.prop == 'registrationNumber' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="注册号"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="organizationCode"
                    v-else-if="item.prop == 'organizationCode' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="组织机构代码"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="capital"
                    v-else-if="item.prop == 'capital' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="注册资金"
                    sortable>
                    <template slot-scope="scope">{{scope.row.capital}} 万元</template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    v-else-if="item.prop == 'date' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="成立时间"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="enterpriseScale"
                    v-else-if="item.prop == 'enterpriseScale' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="企业规模"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="financingState"
                    v-else-if="item.prop == 'financingState' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="融资状态"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="industryType"
                    v-else-if="item.prop == 'industryType' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="行业"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="companyType"
                    v-else-if="item.prop == 'companyType' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="公司类型"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="operatingState"
                    v-else-if="item.prop == 'operatingState' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="营业状态"
                    sortable>
                </el-table-column>
            </div>
            <el-table-column label="操作"
                fixed="right"
                width="80"
                header-align="left"
                align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <!-- <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
        name:'customer',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.customerList;
            },
            tableNumber(){
               return store.state.customerListnumber;     
            },
        },
        data(){
            return {
                searchList:{
                    searchName:null,
                    label:'1',
                    keyType:null,
                    state:null,
                    keyWord:null,
                },
                searchListNew:{
                    searchName:null,
                    label:'1',
                    keyType:null,
                    state:null,
                    keyWord:null,
                },
                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    id:null,
                },
                pIdData:[
                    {label:'0',value:'全部客户'},
                    {label:'1',value:'我的客户'},
                    {label:'2',value:'本组'},
                    {label:'3',value:'本机构'},],
                stateData:null,
                labelData:null,
                typeData:null,
                nullvalue:null,
                
                filterList:null,
                checklist:null,

                dialogFormVisible:false,
                dialogFormVisible1:false,
                formLabelWidth: '130px',

                authorityInterface: null,
            }
        },
        beforeCreate(){
            let _this = this
            axios({
                method: 'get',
                url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoByType.do?cId='+_this.$store.state.iscId,
            }).then(function(res){
                // console.log(res.data)
                _this.stateData = res.data.name2001
                _this.typeData = res.data.name3001
                _this.labelData = res.data.name4001
            }).catch(function(err){
                console.log(err);
            });
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
                }else if(this.searchList.label == 1 ){
                    searchList.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    searchList.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    searchList.deptid = _this.$store.state.insid
                }else{
                    searchList.pId = _this.$store.state.ispId
                }
                searchList.stateid = this.searchList.state //客户状态
                searchList.levelsid = this.searchList.keyType //客户级别
                searchList.customerStateid = this.searchList.keyWord //客户来源
                searchList.page = this.page;
                searchList.limit = this.limit;
                // console.log(searchList)

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerpool/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.$store.state.customerList = res.data.map.success
                    _this.$store.state.customerListnumber = res.data.count;
                }).catch(function(err){
                    console.log(err);
                });
            },
            reloadData(){
                let _this = this;
                let qs =require('querystring')
                let filterList = {}
                filterList.type = '客户'
                let data = {}
                data.type = '客户'
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
                arr.forEach((item) => {
                    if(item.id != 0){
                        newArr.push(item.id)
                    }
                });
                this.idArr.id = newArr;
                
            },
            openDetails(index,row){
                let detailsData = {};
                detailsData.submitData = {"id": row.id};
                this.$store.state.detailsData = detailsData;
                this.$router.push({ path: '/customerDetails' });
            },
            handleAdd(){
                const _this = this
                let addOrUpdateData = {};
                // addOrUpdateData.title = "添加客户";
                addOrUpdateData.createForm = [
                    {"label":"客户来源","inputModel":"customerStateid","type":"select"},
                    {"label":"客户名称","inputModel":"poolName","type":"require"},
                    {"label":"客户级别","inputModel":"levelsid","type":"select"},
                    {"label":"联系人","inputModel":"contactsName"},
                    {"label":"电话","inputModel":"telphone","type":"number"},
                    {"label":"手机","inputModel":"phone","type":"number"},
                    {"label":"QQ","inputModel":"qq","type":"number"},
                    {"label":"性别","inputModel":"sex","type":"radio"},
                    {"label":"职务","inputModel":"identity"},
                    {"label":"省/市/区","inputModel":"countryid","type":"select","placeholder":"请选择省"},
                    {"label":"","inputModel":"cityid","type":"select","placeholder":"请选择市"},
                    {"label":"","inputModel":"areaid","type":"select","placeholder":"请选择区"},
                    {"label":"地址","inputModel":"address"},
                    {"label":"备注","inputModel":"remark"}];
                addOrUpdateData.assistForm = [
                    {"label":"法人代表","inputModel":"representative"},
                    {"label":"登记机关","inputModel":"registrationAuthority"},
                    {"label":"统一社会信用代码","inputModel":"creditCode"},
                    {"label":"注册号","inputModel":"registrationNumber"},
                    {"label":"组织机构代码","inputModel":"organizationCode"},
                    {"label":"注册资金","inputModel":"capital","type":"number"},
                    {"label":"注册时间","inputModel":"registerTime","type":"date"},
                    {"label":"企业规模","inputModel":"enterpriseScale","type":"select"},
                    {"label":"融资状态","inputModel":"financingState","type":"select"},
                    {"label":"行业","inputModel":"industryType","type":"select"},
                    {"label":"公司类型","inputModel":"companyType","type":"select"},
                    {"label":"经营状态","inputModel":"operatingState","type":"select"},]
                addOrUpdateData.setForm = {
                    "customerStateid": '',
                    "poolName": '',
                    "levelsid": '',
                    "contactsName": '',
                    "telphone": '',
                    "phone": '',
                    "countryid":'',
                    "cityid":'',
                    "areaid":'',
                    "qq": '',
                    "sex": '',
                    "identity": '',
                    "address": '',
                    "remark": '',
                    "representative": '',
                    "registrationAuthority": '',
                    "creditCode": '',
                    "registrationNumber": '',
                    "organizationCode": '',
                    "capital": '',
                    "registerTime": '',
                    "enterpriseScale": '',
                    "financingState": '',
                    "industryType": '',
                    "companyType": '',
                    "operatingState": ''};
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'customerpool/savePool.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                this.$store.state.addOrUpdateData = addOrUpdateData;
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerJurisdiction/insert.do',
                }).then(function(res){
                    // console.log(res.data.msg)
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$router.push({ path: '/customeraddorupdate' });
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            handleEdit(index,row){
                // console.log(row)
                const _this = this
                let addOrUpdateData = {};
                // addOrUpdateData.title = "修改客户";
                addOrUpdateData.createForm = [
                    {"label":"客户来源","inputModel":"customerStateid","type":"select"},
                    {"label":"客户名称","inputModel":"poolName","type":"require"},
                    {"label":"客户级别","inputModel":"levelsid","type":"select"},
                    {"label":"联系人","inputModel":"contactsName"},
                    {"label":"电话","inputModel":"telphone","type":"number"},
                    {"label":"手机","inputModel":"phone","type":"number"},
                    {"label":"QQ","inputModel":"qq","type":"number"},
                    {"label":"性别","inputModel":"sex","type":"radio"},
                    {"label":"职务","inputModel":"identity"},
                    {"label":"省/市/区","inputModel":"countryid","type":"select","placeholder":"请选择省"},
                    {"label":"","inputModel":"cityid","type":"select","placeholder":"请选择市"},
                    {"label":"","inputModel":"areaid","type":"select","placeholder":"请选择区"},
                    {"label":"地址","inputModel":"address"},
                    {"label":"备注","inputModel":"remark"}];
                addOrUpdateData.assistForm = [
                    {"label":"法人代表","inputModel":"representative"},
                    {"label":"登记机关","inputModel":"registrationAuthority"},
                    {"label":"统一社会信用代码","inputModel":"creditCode"},
                    {"label":"注册号","inputModel":"registrationNumber"},
                    {"label":"组织机构代码","inputModel":"organizationCode"},
                    {"label":"注册资金","inputModel":"capital","type":"number"},
                    {"label":"注册时间","inputModel":"registerTime","type":"date"},
                    {"label":"企业规模","inputModel":"enterpriseScale","type":"select"},
                    {"label":"融资状态","inputModel":"financingState","type":"select"},
                    {"label":"行业","inputModel":"industryType","type":"select"},
                    {"label":"公司类型","inputModel":"companyType","type":"select"},
                    {"label":"经营状态","inputModel":"operatingState","type":"select"},]
                addOrUpdateData.setForm = {
                    "customerStateid": row.sourceid,
                    // "customerState":row.sourceid,
                    "poolName": row.pName,
                    "levelsid": row.levels,
                    "levels": row.levelsid,
                    "contactsName": row.contacts[0].coName,
                    "telphone": row.contacts[0].telephone,
                    "phone": row.contacts[0].phone,
                    "countryid":row.country,
                    "country":row.countryid,
                    "cityid":row.city,
                    "city":row.cityid,
                    "areaid":row.area,
                    "area":row.areaid,
                    "qq": row.contacts[0].qq,
                    "sex": row.contacts[0].sex,
                    "identity": row.contacts[0].identity,
                    "address": row.address,
                    "remark": row.remark,
                    "representative": row.representative,
                    "registrationAuthority": row.registrationAuthority,
                    "creditCode": row.creditCode,
                    "registrationNumber": row.registrationNumber,
                    "organizationCode": row.organizationCode,
                    "capital": row.capital,
                    "registerTime": row.date,
                    "enterpriseScale": row.enterpriseScale,
                    "financingState": row.financingState,
                    "industryType": row.industryType,
                    "companyType": row.companyType,
                    "operatingState": row.operatingState};
                addOrUpdateData.submitData = {"id": row.id,'csId':row.contacts[0].csId};
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'customerpool/updatepool.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                // console.log(addOrUpdateData)
                this.$store.state.addOrUpdateData = addOrUpdateData;
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerJurisdiction/update.do',
                }).then(function(res){
                    // console.log(res.data.msg)
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$router.push({ path: '/customeraddorupdate' });
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            TocustomerPool(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'customerpool/updateTo.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(idArr),
                }).then(function(res){
                    // console.log(res)
                    if(res.status && res.status == 200) {
                        _this.$message({
                            message: '转移成功',
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
                            message: res.data,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            customerSwitching(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'customerTwo/insert.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(idArr),
                }).then(function(res){
                    // console.log(res)
                    if(res.status && res.status == 200) {
                        _this.$message({
                            message: '转换成功',
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
                            message: res.data,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    console.log(err);
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
                    this.authorityInterface = 'customerJurisdiction/all.do'
                }else if(this.searchList.label == 1 ){
                    this.authorityInterface = 'customerJurisdiction/my.do'
                }else if(this.searchList.label == 2){
                    this.authorityInterface = 'customerJurisdiction/second.do'
                }else if(this.searchList.label == 3){
                    this.authorityInterface = 'customerJurisdiction/dept.do'
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
