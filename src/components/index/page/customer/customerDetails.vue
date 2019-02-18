<template>
    <!-- 客户详情页 -->
    <el-row class="content1" :gutter="10">
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{customerdetail.pName}}</span>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="retract()" v-show="!retracts">收起</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="retract()" v-show="retracts">显示</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="TocustomerPool()">转移至客户池</el-button>
                    </div>
                    <div class="text item">
                        <ul>
                            <li>姓名：<span>{{contacts.coName}}</span></li>
                            <li>手机：<span>{{contacts.phone}}</span></li>
                            <li>电话：<span>{{contacts.telephone}}</span></li>
                            <li>邮箱：<span>{{contacts.email}}</span></li>
                            <li>QQ：<span>{{contacts.qq}}</span></li>
                            <li>微信：<span>{{contacts.wechat}}</span></li>
                            <li>地址：<span>{{customerdetail.address}}</span></li>
                            <li>职务：<span>{{contacts.identity}}</span></li>
                            <li>性别：<span>{{contacts.sex}}</span></li>
                            <li>备注：<span>{{customerdetail.remark}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                </el-card>
            </div>
            <div class="middle">
                <el-card class="box-card" v-model="customerdetail" v-show="!thisshow">
                    <div slot="header" class="clearfix">
                        <span>辅助信息</span>
                    </div>
                    <div class="text item">
                        <ul>
                            <br>
                            <li>法人代表：<span>{{customerdetail.representative}}</span></li>
                            <li>行业：<span>{{customerdetail.industryType}}</span></li>
                            <li>社会信用代码：<span>{{customerdetail.creditCode}}</span></li>
                            <li>公司类型：<span>{{customerdetail.companyType}}</span></li>
                            <li>企业规模：<span>{{customerdetail.enterpriseScale}}</span></li>
                            <li>注册号：<span>{{customerdetail.registrationNumber}}</span></li>
                            <li>融资状态：<span>{{customerdetail.financingState}}</span></li>
                            <li>营业状态：<span>{{customerdetail.operatingState}}</span></li>
                            <li>组织机构代码：<span>{{customerdetail.organizationCode}}</span></li>
                            <li>注册资金：<span>{{customerdetail.capital}}</span></li>
                            <li>登记机关：<span>{{customerdetail.registrationAuthority}}</span></li>
                            <li>成立时间：<span>{{customerdetail.date}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                </el-card>
            </div>
            <div class="bottom">
                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane label="跟进记录" name="first">
                        <el-form class="followform" :rules="rules" ref="followform" :model="followform">
                            <el-form-item prop="followContent">
                                <el-input type="textarea" placeholder="添加跟进内容" v-model="followform.followContent"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式" style="width:310px;" prop="followType">
                                <el-select v-model="followform.followType" placeholder="请选择" style="width:200px;">
                                    <el-option v-for="item in followTypes" :key="item.value" :value="item.label" :label="item.label"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="联系人" style="width:310px;" prop="contactsId">
                                <el-select v-model="followform.contactsId" placeholder="请选择" style="width:200px;">
                                    <el-option v-for="item in contactList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="下次联系时间" style="width:310px;">
                                <el-date-picker
                                v-model="followform.contactTime"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                default-time="12:00:00"
                                placeholder="选择日期时间" style="width:200px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="状态" style="width:310px;" prop="state">
                                <el-select v-model="followform.state" placeholder="请选择" style="width:200px;">
                                    <el-option v-for="item in stateList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            
                            <el-form-item label="快捷沟通" style="width:80%;">
                                <el-radio v-model="followform.followContent" v-for="item in fastcontactList" :key="item.communicationId" :label="item.content">{{item.name}}</el-radio>
                            </el-form-item>
                            <el-form-item>
                                <el-button style="float:right;" class="searchbutton" size="mini" @click="Submitfollowform">立即提交</el-button>
                            </el-form-item>
                        </el-form>
                        <ul class="followrecord" v-for="(item,index) in record" :key="item.followId">
                            <li class="recordicon">
                                <i class="el-icon-delete delico" @click="deletefollow(index)"></i>
                            </li>
                            <li class="verticalline"></li>
                            <li class="recordcontent">
                                <div>
                                    <p>{{item.private_employee}}&nbsp;&nbsp;于{{item.createTime}}&nbsp;&nbsp;通过{{item.followType}}更新了一条记录&nbsp;&nbsp;&nbsp;客户联系人为：&nbsp;{{item.contacts[0].name}}
                                        &nbsp;&nbsp;&nbsp;<span>并约定下次联系时间：{{item.contactTime}}</span>
                                        &nbsp;&nbsp;&nbsp;<span>状态为：{{item.state}} &nbsp;&nbsp;&nbsp;{{item.inputType}}</span>
                                    </p>
                                    <p style="margin-top:15px;margin-bottom:15px;">{{item.followContent}}</p>
                                </div>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="联系人" name="second">
                        <!-- <div class="entry">
                            <el-button class="btn info-btn" size="mini" @click="Addcontact()">新增</el-button>
                        </div> -->
                        <el-table
                            :data="customerDetails"
                            border
                            stripe
                            style="width: 100%">
                            <el-table-column
                                prop="name"
                                header-align="left"
                                label="名称">
                            </el-table-column>
                            <el-table-column
                                prop="phone"
                                header-align="left"
                                label="手机">
                            </el-table-column>
                            <el-table-column
                                prop="telephone"
                                header-align="left"
                                label="固话">
                            </el-table-column>
                            <el-table-column
                                prop="email"
                                header-align="left"
                                label="邮箱">
                            </el-table-column>
                            <el-table-column
                                prop="qq"
                                header-align="left"
                                label="QQ">
                            </el-table-column>
                            <el-table-column
                                prop="wechat"
                                header-align="left"
                                label="微信">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                header-align="left"
                                label="地址">
                            </el-table-column>
                            <el-table-column
                                prop="identity"
                                header-align="left"
                                label="职务">
                            </el-table-column>
                            <el-table-column
                                prop="sex"
                                header-align="left"
                                label="性别">
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                header-align="left"
                                label="是否在职">
                            </el-table-column>
                            <el-table-column
                                prop="remark"
                                header-align="left"
                                label="备注">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="商机管理" name="third">
                        <!-- <div class="entry">
                            <el-button class="btn info-btn" size="mini" @click="Addopportunity()">新增</el-button>
                        </div> -->
                        <el-table
                            :data="opportunityDetails"
                            border
                            stripe
                            style="width: 100%">
                            <el-table-column
                            prop="opportunity_name"
                            header-align="left"
                            label="商机名称">
                            </el-table-column>
                            <el-table-column
                            prop="opportunity_achievement"
                            header-align="left"
                            label="商机金额">
                            <template slot-scope="scope">
                                <div>
                                    {{scope.row.opportunity_achievement}}
                                </div>
                            </template>
                            </el-table-column>
                            <el-table-column
                                prop="opportunity_deal"
                                header-align="left"
                                label="预计签单时间">
                            </el-table-column>
                            <el-table-column
                                prop="opportunityProgress[0].progress_name"
                                header-align="left"
                                label="商机阶段">
                            </el-table-column>
                            <el-table-column
                                prop="opportunityProgress[0].progress_probability"
                                header-align="left"
                                label="预计成功率">
                            </el-table-column>
                            <el-table-column
                                prop="opportunity_time"
                                header-align="left"
                                label="商机新建时间">
                            </el-table-column>
                            <!-- <el-table-column
                                prop="address"
                                header-align="left"
                                label="耗时天数">
                                </el-table-column> -->
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="合同管理" name="fouth">
                        <!-- <div class="entry">
                            <el-button class="btn info-btn" size="mini" @click="Addagreement()">新增</el-button>
                        </div> -->
                        <el-table
                            :data="agreementDetails"
                            border
                            stripe
                            style="width: 100%">
                            <el-table-column
                                prop="contract_number"
                                header-align="left"
                                label="合同代码">
                            </el-table-column>
                            <el-table-column
                                prop="contract_name"
                                header-align="left"
                                label="合同名称">
                            </el-table-column>
                            <el-table-column
                                prop="contract_type"
                                header-align="left"
                                label="合同类型">
                            </el-table-column>
                            <el-table-column
                                prop="amount"
                                header-align="left"
                                label="合同金额">
                                <template slot-scope="scope">
                                    <div>
                                        {{scope.row.amount | rounding}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="signatories"
                                header-align="left"
                                label="签约人">
                            </el-table-column>
                            <el-table-column
                                prop="start_date"
                                header-align="left"
                                label="合同开始时间">
                            </el-table-column>
                            <el-table-column
                                prop="end_date"
                                header-align="left"
                                label="合同到期时间">
                            </el-table-column>
                            <el-table-column
                                prop="due_time"
                                header-align="left"
                                label="剩余天数">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="开票资料" name="fifth">
                        <el-table
                            :data="InvoiceDetails"
                            border
                            stripe
                            style="width: 100%">
                            <el-table-column
                                prop="name"
                                header-align="left"
                                label="公司名称">
                            </el-table-column>
                            <el-table-column
                                prop="creditCode"
                                header-align="left"
                                label="税务登记号">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                header-align="left"
                                label="税务地址">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
        
        <el-col :span="6" style="padding:10px;" class="right">
            <div class="searchList" style="width:100%;">
                <!-- <el-input v-model="searchList.searchName" placeholder="公司名称" style="width:200px;"></el-input> -->
                <el-input  v-model="searchList.keyword" placeholder="请输入标题" style="width:80%;"></el-input>
                <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()"></el-button>
            </div>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                prop="name"
                label="公司名称">
                    <template slot-scope="scope">
                    <div @click="getRow(scope.$index, scope.row)">
                        {{scope.row.name}}
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
    </el-row>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'customerDetails',
        store,
        computed: {
            customerDetails(){
                return store.state.customerDetailsList;
            },
            opportunityDetails(){
                return store.state.opportunityDetailsList;
            },
            agreementDetails(){
                return store.state.agreementDetailsList;
            },
            InvoiceDetails(){
                return store.state.InvoiceDetailsList;
            }
        },
        filters: {
            rounding (value) {
                return value.toFixed(2)
            }
        },
        data(){
            return {
                detailData:null,
                followform:{
                    followType:'电话',
                    contactTime:'',
                    contactsId:'',
                    followContent:'',
                    state:'',
                },
                rules: {
                    followContent : [{ required: true, message: '请输入跟进内容', trigger: 'blur' },],
                    contactsId : [{ required: true, message: '请选择联系人', trigger: 'blur' },],
                    followType : [{ required: true, message: '请选择联系方式', trigger: 'blur' },],
                    // contactTime : [{ required: true, message: '请选择下次联系时间', trigger: 'blur' },],
                    
                },
                followTypes:[
                    {label:'电话',value:'1'},
                    {label:'微信',value:'2'},
                    {label:'QQ',value:'3'},
                    {label:'邮箱',value:'4'}
                ],
                stateList:null,
                searchList:{
                    keyword:null,
                },
                customerdetail:{},
                contacts:{},
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

                retracts:true,
            }
        },
        activated(){
            this.loadData();
        },
        // mounted(){
        //     this.loadData();
        // },
        methods: {
            loadData() {
                this.detailData = this.$store.state.detailsData.submitData;
                this.idArr.id = this.$store.state.detailsData.submitData.id
                // console.log(this.detailData)
                let _this = this
                let data = {}
                data.type = '客户状态'
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                // console.log(pageInfo);

                //加载客户状态
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res.data)
                    _this.stateList = res.data
                }).catch(function(err){
                    console.log(err);
                });
                //加载快捷方式
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'getNameSelected.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    // console.log(res.data)
                    _this.fastcontactList = res.data
                }).catch(function(err){
                    console.log(err);
                });
                //加载详情页右侧表格
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getPoolRight.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    console.log(err);
                });
                //加载跟进记录
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getFollowStaffAndpool.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId+'&customerpool_id='+_this.detailData.id,
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.record = res.data.map.success
                    // if(_this.record !== ''){
                    //     _this.followform.state = _this.record[0].state
                    // }
                }).catch(function(err){
                    console.log(err);
                });
                //加载客户详情
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getPoolById.do?cId='+_this.$store.state.iscId+'&id='+this.detailData.id,
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.customerdetail = res.data.map.success[0]
                    _this.contacts = res.data.map.success[0].contacts[0]
                    // console.log(_this.customerdetail)
                }).catch(function(err){
                    console.log(err);
                });
                //详情页联系人
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getPoolContacts.do?cId='+_this.$store.state.iscId+'&customeroneId='+this.detailData.id,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.$store.state.customerDetailsList = res.data.map.success
                    _this.contactList = res.data.map.success
                    _this.followform.contactsId = res.data.map.success[0].id
                }).catch(function(err){
                    console.log(err);
                });
                //详情页商机
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/queryForPoolList.do?cId='+_this.$store.state.iscId+'&customerpool_id='+this.detailData.id,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.$store.state.opportunityDetailsList = res.data.map.success
                }).catch(function(err){
                    console.log(err);
                });
                //详情页合同
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getContractByPool.do?cId='+_this.$store.state.iscId+'&customerpool_id='+this.detailData.id,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.$store.state.agreementDetailsList = res.data.map.success
                }).catch(function(err){
                    console.log(err);
                });
                //详情页开票
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getPoolNameAndNumber.do?cId='+_this.$store.state.iscId+'&customerpool_id='+this.detailData.id,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.$store.state.InvoiceDetailsList = res.data.map.success
                }).catch(function(err){
                    console.log(err);
                });
            },
            retract(){
                this.thisshow = !this.thisshow
                this.retracts = !this.retracts
            },
            getRow(index,row){
                // console.log(row.id)
                this.$store.state.detailsData.submitData = {"id":row.id}
                this.idArr.id = row.id
                
                // this.detailData.id = row.id
                this.$options.methods.loadData.bind(this)(true);
            },
            Addcontact(){
                // console.log(this.customerdetail.pName)
                let addOrUpdateData = {};
                addOrUpdateData.createForm = [
                    {"label":"联系人","inputModel":"name"},
                    {"label":"公司名称","inputModel":"poolName","type":"require"},
                    {"label":"电话","inputModel":"telephone","type":"number"},
                    {"label":"手机","inputModel":"phone","type":"number"},
                    {"label":"QQ","inputModel":"qq","type":"number"},
                    {"label":"性别","inputModel":"sex","type":"radio"},
                    {"label":"生日","inputModel":"birthday","type":"date"},
                    {"label":"职务","inputModel":"identity"},
                    {"label":"省/市/区","inputModel":"country","type":"select","placeholder":"请选择省"},
                    {"label":"","inputModel":"city","type":"select","placeholder":"请选择市"},
                    {"label":"","inputModel":"area","type":"select","placeholder":"请选择区"},
                    {"label":"地址","inputModel":"address"},
                    {"label":"备注","inputModel":"remark"}];
                addOrUpdateData.setForm = {
                    "name": '',
                    "poolName": this.customerdetail.pName,
                    "telephone": '',
                    "phone": '',
                    "country":'',
                    "city":'',
                    "area":'',
                    "qq": '',
                    "sex": '',
                    "birthday":'',
                    "identity": '',
                    "address": this.customerdetail.address,
                    "remark": ''};
                addOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'insertContacts.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                this.$store.state.addOrUpdateData = addOrUpdateData;
                this.$router.push({ path: '/contactsaddorupdate' });
            },
            Addopportunity(){},
            Addagreement(){},
            TocustomerPool(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                // console.log(idArr)
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
                        _this.closeTag();
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
            deletefollow(index){
                let _this = this
                let followData = {}
                followData.followId = this.record[index].followId
                // console.log(this.record[index].followId)
                let qs =require('querystring')
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'delFollow.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(followData)
                }).then(function(res){
                    // console.log(res)
                    if(res.data && res.data == '1' ) {
                        _this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        _this.$store.state.detailsData.submitData = {"id":_this.detailData.id}
                        _this.$options.methods.loadData.bind(_this)(true);
                        
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
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            search(){
                let _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.searchName = this.searchList.keyword;
                searchList.page = this.page;
                searchList.limit = this.limit;
                // console.log(searchList)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerpool/getPoolRight.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    // console.log(res)
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    console.log(err);
                });
            },
            Submitfollowform(){
                let _this = this
                let data = {}
                data.followType = this.followform.followType
                data.contactTime = this.followform.contactTime
                data.followContent = this.followform.followContent;
                data.contactsId = this.followform.contactsId;
                data.follow_state = this.followform.state;
                data.customerpool_id = this.detailData.id;
                // console.log(data)

                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'addFollow.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data,this),
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'success' ) {
                        _this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        _this.followform.contactTime = ''
                        _this.followform.followContent = ''
                        _this.$store.state.detailsData.submitData = {"id":_this.detailData.id}
                        _this.$options.methods.loadData.bind(_this)(true);
                        // _this.closeTag()
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            closeTag() {
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
                    delItem.path === this.$route.fullPath && this.$router.push('/customer');
                }else{
                    this.$router.push('/welcome');
                }
            },
            handleSizeChange(val) {
                let _this = this;
                _this.limit = val;
                _this.$options.methods.loadData.bind(_this)();
            },
            handleCurrentChange(val) {
                let _this = this;
                _this.page = val;
                _this.$options.methods.loadData.bind(_this)();
            },
        },
    }
</script>

<style>
    .content1{
        background-color: #f7f7f7;
        height: auto;
    }
    .number{
        padding: 0;
    }
    .right{
        height: auto;
        background-color: #fff;
        padding-bottom: 5px;
    }
    .top{
        height: auto;
        background-color: #fff;
    }
    .middle{
        height: auto;
        background-color: #fff;
        margin-top: 20px;
    }
    .bottom{
        height: 100%;
        background-color: #fff;
        margin-top: 20px;
        padding: 5px 20px;
    }
    .el-card__body{
        padding: 0;
    }
</style>
