<template>
    <!-- 线索 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in pIdData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.state">
                <span class="nameList">线索状态：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in stateData" :key="item.id" :label="item.id" @change="search()">{{item.typeName}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.type">
                <span class="nameList">线索来源：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in typeData" :key="item.id" :label="item.id" @change="search()">{{item.typeName}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.time">
                <span class="nameList">新增时间：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in timeData" :key="item.id" :label="item.id" @change="search()">{{item.typeName}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList">
            <span class="nameList">公司名称：</span>
            <el-input v-model="searchList.searchName" placeholder="请输入公司名称" style="width:300px;" @keyup.enter.native="search"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="generCharts" @click="generateCharts">
            <i class="mdi-chart-pie chart_icon"></i>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <el-button class="btn info-btn" size="mini" @click="cluePool()">转移至线索池</el-button>
            <el-button class="btn info-btn" size="mini" @click="customerSwitching()">转移至客户</el-button>
            <el-button class="btn info-btn" size="mini" @click="showsend()">发送短信</el-button>

            <div class="totalnum_head">共 <span style="font-weight:bold">{{tableNumber}}</span> 条</div>

            <el-popover placement="left" width="150" trigger="click">
                <div class="download_c">
                    <p class="download_h">首次导入请下载模板</p>
                    <div class="download_down">
                        <el-button class="info-btn" type="mini"><a :href="downloadUrl" download>下载模板</a></el-button>
                    </div>
                    <el-upload class="upload-demo" ref="upload" :multiple="true" action="doUpload" :limit="1" :before-upload="beforeUpload">
                        <el-button slot="trigger" size="mini" class="info-btn">导入excel</el-button>
                    </el-upload>
                </div>
                <el-button slot="reference" class="info-btn screen_upload" type="mini">导入</el-button>
            </el-popover>

            <el-popover placement="bottom" width="100" trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist" style="max-height:600px;overflow-y:overlay;overflow-x:hidden">
                    <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                </el-checkbox-group>
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table :data="tableData" ref="multipleTable" border stripe style="width:100%;" @selection-change="selectInfo">
            <el-table-column fixed header-align="center" align="center" type="selection" width="45" prop="id" @selection-change="selectInfo" sortable />
            <div v-for="(item,index) in filterList" :key="index">
                <el-table-column label="联系人" prop="contacts[0].coName" fixed v-if="item.prop == 'contacts[0].coName' && item.state == 1" min-width="100" sortable />
                <el-table-column label="公司名称" prop="name" fixed v-if="item.prop == 'name' && item.state == 1" min-width="200" sortable>
                    <template slot-scope="scope">
                        <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                            {{scope.row.name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="地址" prop="address" show-overflow-tooltip v-if="item.prop == 'address' && item.state == 1" min-width="200" sortable />
                <el-table-column label="电话" prop="contacts[0].telephone" v-if="item.prop == 'contacts[0].telephone' && item.state == 1" min-width="110" sortable />
                <el-table-column label="手机" prop="contacts[0].phone" v-if="item.prop == 'contacts[0].phone' && item.state == 1" min-width="110" sortable />
                <el-table-column label="QQ" prop="contacts[0].qq" v-if="item.prop == 'contacts[0].qq' && item.state == 1" min-width="110" sortable />
                <el-table-column label="邮箱" prop="contacts[0].email" show-overflow-tooltip v-if="item.prop == 'email' && item.state == 1" min-width="130" sortable />
                <el-table-column label="微信" prop="contacts[0].wechat" v-if="item.prop == 'wechat' && item.state == 1" min-width="110" sortable />
                <el-table-column label="性别" prop="contacts[0].sex" v-if="item.prop == 'sex' && item.state == 1" min-width="90" sortable />
                <el-table-column label="备注" prop="remark" v-if="item.prop == 'remarks' && item.state == 1" min-width="180" sortable />
                <el-table-column label="最新跟进时间" prop="follow[0].createTime" v-if="item.prop == 'follow[0].createTime' && item.state == 1" min-width="150" sortable />
                <el-table-column label="最新跟进记录" prop="follow[0].followContent" show-overflow-tooltip v-if="item.prop == 'follow[0].followContent' && item.state == 1" min-width="180" sortable />
                <el-table-column label="下次联系时间" prop="follow[0].contactTime" v-if="item.prop == 'follow[0].contactTime' && item.state == 1" min-width="150" sortable />
                <el-table-column label="负责人" prop="privateUser[0].private_employee" v-if="item.prop == 'privateUser[0].private_employee' && item.state == 1" min-width="90" sortable />
                <el-table-column label="部门" prop="deptname" v-if="item.prop == 'deptname' && item.state == 1" min-width="90" sortable />
                <el-table-column label="机构" prop="parentname" v-if="item.prop == 'parentname' && item.state == 1" min-width="110" show-overflow-tooltip sortable />
                <el-table-column label="省-市-区" prop="countryid" v-if="item.prop == 'countryid' && item.state == 1" min-width="150" sortable>
                    <template slot-scope="scope">
                        {{scope.row.country}}-{{scope.row.city}}-{{scope.row.area}}
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" v-if="item.prop == 'createTime' && item.state == 1" min-width="150" sortable />
                <el-table-column label="状态" prop="state" v-if="item.prop == 'state' && item.state == 1" min-width="90" sortable />
                <el-table-column label="线索来源" prop="cues" v-if="item.prop == 'cues' && item.state == 1" min-width="110" sortable />
                <el-table-column label="法人代表" prop="representative" v-if="item.prop == 'representative' && item.state == 1" min-width="110" sortable />
                <el-table-column label="登记机关" prop="registrationAuthority" show-overflow-tooltip v-if="item.prop == 'registrationAuthority' && item.state == 1" min-width="110" sortable />
                <el-table-column label="社会信用代码" prop="creditCode" v-if="item.prop == 'creditCode' && item.state == 1" min-width="150" sortable />
                <el-table-column label="注册号" prop="registrationNumber" v-if="item.prop == 'registrationNumber' && item.state == 1" min-width="140" sortable />
                <el-table-column label="组织机构代码" prop="organizationCode" v-if="item.prop == 'organizationCode' && item.state == 1" min-width="140" sortable />
                <el-table-column label="注册资金" prop="capital" v-if="item.prop == 'capital' && item.state == 1" min-width="110" sortable>
                    <template slot-scope="scope">{{scope.row.capital}} 万元</template>
                </el-table-column>
                <el-table-column label="成立时间" prop="date" v-if="item.prop == 'date' && item.state == 1" min-width="110" sortable />
                <el-table-column label="企业规模" prop="enterpriseScale" v-if="item.prop == 'enterpriseScale' && item.state == 1" min-width="110" sortable />
                <el-table-column label="融资状态" prop="financingState" v-if="item.prop == 'financingState' && item.state == 1" min-width="110" sortable />
                <el-table-column label="行业" prop="industryType" show-overflow-tooltip v-if="item.prop == 'industryType' && item.state == 1" min-width="110" sortable />
                <el-table-column label="公司类型" prop="companyType" v-if="item.prop == 'companyType' && item.state == 1" min-width="110" sortable />
                <el-table-column label="营业状态" prop="operatingState" v-if="item.prop == 'operatingState' && item.state == 1" min-width="110" sortable />
            </div>
            <el-table-column label="操作" fixed="right" width="90" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        <el-dialog title="发送短信" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules" style="padding-right:30px">
                <el-form-item prop="cluenum" label="线索选择量">
                    <el-input v-model="newform.cluenum" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="templateId" label="短信模板">
                    <el-select v-model="newform.templateId" placeholder="请选择" style="width:100%" @change="changetemplate">
                        <el-option v-for="item in templateList" :key="item.templateId" :label="item.title" :value="item.templateId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="smscontent" label="短信内容">
                    <el-input type="textarea" rows="5" v-model="newform.smscontent"  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="explain" label="说明">
                    <el-input type="textarea" rows="5" v-model="newform.explain" placeholder="请输入短信说明"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendSMS()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import XLSX from 'xlsx';
    import bus from '../../bus';
    import qs from 'qs'

    export default {
        name:'clue',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.clueList;
            },
            tableNumber(){
               return store.state.clueListnumber;     
            },
        },
        data(){
            return {
                searchList:{
                    searchName:null,
                    label:'1',
                    state:null,
                    type:null,
                    time:null,
                },
                searchListNew:{
                    searchName:null,
                    label:'1',
                    state:null,
                    type:null,
                    time:null,
                },
                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    id:null,
                },
                SMSId:[],
                SMSnames:[],
                SMSphones:[],
                SMScontacts:[],
                pIdData:[
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

                stateData:null,
                typeData:null,
                nullvalue:null,

                filterList:null,
                checklist:null,

                dialogFormVisible:false,
                dialogFormVisible1:false,
                formLabelWidth: '130px',

                downloadUrl: this.$store.state.systemHttp+'upload/import_template.xls',
                fileName:null,

                dialogVisible:false,
                templateList:null,
                newform:{
                    templateId:null,
                    cluenum:null,
                    explain:null,
                    smscontent:null,
                },
                rules: {
                    templateId : [{ required: true, message: '短信模板不能为空', trigger: 'blur' },],
                },

                
                collapse3: false,
            }
        },
        beforeRouteLeave(to, from , next){
            this.collapse3 = false;
            bus.$emit('collapse3', this.collapse3);
            next()
        },
        beforeCreate(){
            const _this = this
            axios({
                method: 'get',
                url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoByType.do?cId='+_this.$store.state.iscId,
            }).then(function(res){
                _this.stateData = res.data.name1001
                _this.typeData = res.data.name3001
            }).catch(function(err){
            });
        },
        activated(){
            this.reloadTable()
        },
        mounted(){
            this.reloadTable()
            this.reloadData()
        },

        methods: {
            //获取/查询线索列表
            loadTable() {
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
                searchList.stateid = this.searchList.state
                searchList.cuesid = this.searchList.type
                searchList.example = this.searchList.time
                searchList.page = this.page;
                searchList.limit = this.limit;
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerTwo/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.$store.state.clueList = res.data.map.success
                    _this.$store.state.clueListnumber = res.data.count
                    if(_this.page > 1 && res.data.count <= _this.limit){
                        _this.page = 1
                        _this.reloadTable()
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            reloadTable(){
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
                searchList.stateid = this.searchList.state
                searchList.cuesid = this.searchList.type
                searchList.example = this.searchList.time
                searchList.page = this.page;
                searchList.limit = this.limit;
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerTwo/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.$store.state.clueList = res.data.map.success
                    _this.$store.state.clueListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            
            //获取筛选列表
            reloadData() {
                const _this = this;
                let qs =require('querystring')
                let filterList = {}
                filterList.type = '线索'
                let data = {}
                data.type = '线索'
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
            loadTemplate(){
                const _this = this;
                let qs =require('querystring')
                let data = {}
                data.type = '线索'
                data.genre = '营销类'
                data.status = '2'
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'template/selectTemplate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.templateList = res.data.map.templates
                }).catch(function(err){
                    // console.log(err);
                });
            },
            selectInfo(val){
                const _this = this
                let arr = val;
                let newArr = [new Array()];
                this.SMSId = []
                this.SMSnames = []
                this.SMSphones = []
                this.SMScontacts = []
                arr.forEach((item) => {
                    if(item.id != 0){
                        newArr.push(item.id)
                        _this.SMSId.push(item.id)
                        _this.SMSnames.push(item.name)
                        _this.SMSphones.push(item.contacts[0].phone)
                        _this.SMScontacts.push(item.contacts[0].coName)
                    }
                });
                this.idArr.id = newArr;
            },
            openDetails(index,row){
                // let cluedetailsData = {};
                // cluedetailsData.submitData = {"id": row.id};
                // this.$store.state.cluedetailsData = cluedetailsData;
                this.$store.state.cluedetailsData = {submitData:{"id": row.id}};
                this.$router.push({ path: '/clueDetails' });
            },
            handleAdd(){
                const _this = this
                let clueaddOrUpdateData = {};
                clueaddOrUpdateData.createForm = [
                    {"label":"线索来源","inputModel":"cuesid","type":"select"},
                    {"label":"公司名称","inputModel":"poolName","type":"require"},
                    {"label":"联系人","inputModel":"contactsName",},
                    {"label":"手机","inputModel":"phone","type":"number"},
                    {"label":"电话","inputModel":"telphone","type":"number"},
                    {"label":"QQ","inputModel":"qq","type":"number"},
                    {"label":"性别","inputModel":"sex","type":"radio"},
                    {"label":"职务","inputModel":"identity"},
                    {"label":"省/市/区","inputModel":"countryid","type":"select","placeholder":"请选择省"},
                    {"label":"","inputModel":"cityid","type":"select","placeholder":"请选择市"},
                    {"label":"","inputModel":"areaid","type":"select","placeholder":"请选择区"},
                    {"label":"地址","inputModel":"address"},
                    {"label":"网址","inputModel":"url","type":"url"},
                    {"label":"备注","inputModel":"remark","type":'textarea'}];
                clueaddOrUpdateData.assistForm = [
                    {"label":"法人代表","inputModel":"representative"},
                    {"label":"登记机关","inputModel":"registrationAuthority"},
                    {"label":"统一社会信用代码","inputModel":"creditCode"},
                    {"label":"注册号","inputModel":"registrationNumber"},
                    {"label":"组织机构代码","inputModel":"organizationCode"},
                    {"label":"注册资金","inputModel":"capital","type":"number"},
                    {"label":"注册时间","inputModel":"registerTime","type":"date"},
                    {"label":"企业规模","inputModel":"enterpriseScaleId","type":"select"},
                    {"label":"融资状态","inputModel":"financingStateId","type":"select"},
                    {"label":"行业","inputModel":"industryId","type":"select"},
                    {"label":"公司类型","inputModel":"companyId","type":"select"},
                    {"label":"经营状态","inputModel":"operatingStateId","type":"select"},]
                clueaddOrUpdateData.setForm = {
                    "cuesid": '',
                    "poolName": '',
                    "contactsName": '',
                    "telphone": '',
                    "phone": '',
                    "countryid":'',
                    "cityid":'',
                    "areaid":'',
                    "qq": '',
                    "email": '',
                    "sex": '',
                    "identity": '',
                    "address": '',
                    "url": '',
                    "remark":'',
                    "representative": '',
                    "registrationAuthority": '',
                    "creditCode": '',
                    "registrationNumber": '',
                    "organizationCode": '',
                    "capital": '',
                    "registerTime": '',
                    "enterpriseScaleId": '',
                    "financingStateId": '',
                    "industryId": '',
                    "companyId": '',
                    "operatingStateId": ''};
                clueaddOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'customerTwo/saveClue.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                this.$store.state.clueaddOrUpdateData = clueaddOrUpdateData;
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'clueJurisdiction/insert.do',//新增线索
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$router.push({ path: '/clueaddorupdate' });
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleEdit(index,row){
                const _this = this
                let clueaddOrUpdateData = {};
                clueaddOrUpdateData.createForm = [
                    {"label":"线索来源","inputModel":"cuesid","type":"select"},
                    {"label":"客户名称","inputModel":"poolName","type":"require"},
                    {"label":"联系人","inputModel":"contactsName",},
                    {"label":"手机","inputModel":"phone","type":"number"},
                    {"label":"电话","inputModel":"telphone","type":"number"},
                    {"label":"QQ","inputModel":"qq","type":"number"},
                    {"label":"性别","inputModel":"sex","type":"radio"},
                    {"label":"职务","inputModel":"identity"},
                    {"label":"省/市/区","inputModel":"countryid","type":"select","placeholder":"请选择省"},
                    {"label":"","inputModel":"cityid","type":"select","placeholder":"请选择市"},
                    {"label":"","inputModel":"areaid","type":"select","placeholder":"请选择区"},
                    {"label":"地址","inputModel":"address"},
                    {"label":"网址","inputModel":"url","type":"url"},
                    {"label":"备注","inputModel":"remark","type":'textarea'}];
                clueaddOrUpdateData.assistForm = [
                    {"label":"法人代表","inputModel":"representative"},
                    {"label":"登记机关","inputModel":"registrationAuthority"},
                    {"label":"统一社会信用代码","inputModel":"creditCode"},
                    {"label":"注册号","inputModel":"registrationNumber"},
                    {"label":"组织机构代码","inputModel":"organizationCode"},
                    {"label":"注册资金","inputModel":"capital","type":"number"},
                    {"label":"注册时间","inputModel":"registerTime","type":"date"},
                    {"label":"企业规模","inputModel":"enterpriseScaleId","type":"select"},
                    {"label":"融资状态","inputModel":"financingStateId","type":"select"},
                    {"label":"行业","inputModel":"industryId","type":"select"},
                    {"label":"公司类型","inputModel":"companyId","type":"select"},
                    {"label":"经营状态","inputModel":"operatingStateId","type":"select"},]
                clueaddOrUpdateData.setForm = {
                    "cuesid": row.cuesid,
                    "poolName": row.name,
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
                    "email": row.contacts[0].email,
                    "sex": row.contacts[0].sex,
                    "identity": row.contacts[0].identity,
                    "address": row.address,
                    "url": row.url,
                    "remark": row.remark,
                    "representative": row.representative,
                    "registrationAuthority": row.registrationAuthority,
                    "creditCode": row.creditCode,
                    "registrationNumber": row.registrationNumber,
                    "organizationCode": row.organizationCode,
                    "capital": row.capital,
                    "registerTime": row.date,
                    "enterpriseScaleId": row.enterpriseScaleId,
                    "enterpriseScale": row.enterpriseScale,
                    "financingStateId": row.financingStateId,
                    "financingState": row.financingState,
                    "industryType": row.industryType,
                    "industryId": row.industryId,
                    "companyType": row.companyType,
                    "companyId": row.companyId,
                    "operatingState": row.operatingState,
                    "operatingStateId": row.operatingStateId};
                clueaddOrUpdateData.submitData = {"id": row.id,'csId':row.contacts[0].csId};
                clueaddOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'customerTwo/updateClue.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                this.$store.state.clueaddOrUpdateData = clueaddOrUpdateData;
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'clueJurisdiction/update.do',//修改线索
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$router.push({ path: '/clueaddorupdate' });
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            cluePool(){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                
                if(idArr.id){
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'customerTwo/updateState.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data && res.data == 'success') {
                            _this.$message({
                                message: '转移成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){//转移至线索池
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
                        _this.$message.error("转移失败,请重新转移");
                    });
                }else{
                    _this.$message({
                        type: 'error',
                        message: '请先选择要转移的线索'
                    }); 
                }
                
            },
            customerSwitching(){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                idArr.id.shift()
                idArr.secondid = this.$store.state.deptid

                if(idArr.id){
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'customerTwo/insert.do?cId='+_this.$store.state.iscId+"&pId="+_this.$store.state.ispId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '转移成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){//转移至客户
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
                        _this.$message.error("转移失败,请重新转移");
                    });
                }else{
                    _this.$message({
                        type: 'error',
                        message: '请先选择要转移的线索'
                    }); 
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
                    // console.log(err);
                });
            },
            search() {
                const _this = this
                const qs = require('querystring')
                let authorityInterface = ''
                let i = 1
                if(this.searchList.label == 0 ){
                    authorityInterface = 'clueJurisdiction/all.do'//全部线索
                    i = 0
                }else if(this.searchList.label == 2){
                    authorityInterface = 'clueJurisdiction/second.do'//本组线索
                    i = 0
                }else if(this.searchList.label == 3){
                    authorityInterface = 'clueJurisdiction/dept.do'//本机构线索
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
                            _this.$options.methods.loadTable.bind(_this)(true);
                        }
                    }).catch(function(err){
                        // console.log(err);
                    });
                }else{
                    _this.$options.methods.loadTable.bind(_this)(true);
                }
                
            },
            reset(){
                this.searchList = Object.assign({}, this.searchListNew);
                this.$options.methods.loadTable.bind(this)(true);
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
            beforeUpload(file){
                this.files = file;
                const extension = file.name.split('.')[1] === 'xls'
                const extension2 = file.name.split('.')[1] === 'xlsx'
                const isLt5M = file.size / 1024 / 1024 < 5
                if (!extension && !extension2) {
                    this.$message.warning('上传模板只能是 xls、xlsx格式!')
                    return
                }
                if (!isLt5M) {
                    this.$message.warning('上传模板大小不能超过 5MB!')
                    return
                }
                this.fileName = file.name;
                setTimeout(() => {
                    this.submitUpload();
                },500);
                return false; // 返回false不会自动上传
            },
         
            // 上传excel
            submitUpload() {
                const _this = this
                if(this.fileName == ""){
                    this.$message.warning('请选择要上传的文件！')
                    return false
                }
                let fileFormData = new FormData();
                // fileFormData.append("code", "t_pathology_info_excel");
                // fileFormData.append("description", "excel上传测试");
                fileFormData.append("pId", this.$store.state.ispId);
                fileFormData.append("secondid", this.$store.state.deptid);
                fileFormData.append("deptid", this.$store.state.insid);
                //fileName是键，files是值，就是要传的文件，files是要传的文件名
                fileFormData.append('files', this.files, this.fileName);
                let requestConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }
                // 执行上传excel
                axios.post(this.$store.state.defaultHttp+'customerTwo/upload.do?cId='+this.$store.state.iscId,fileFormData, requestConfig)
                .then(res => {
                    _this.$message({
                        message: '上传成功',
                        type: 'success'
                    })
                    _this.$options.methods.reloadTable.bind(_this)(true);
                }).catch((e) => {
                    _this.$message.error("excel上传失败，请重新上传");
                })
            },
            showsend(){
                const _this = this
                if(this.SMSId[0]){
                    axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+'clueJurisdiction/send.do',//线索发送短信
                    }).then(function(res){
                        if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message:'对不起，您没有该权限，请联系管理员开通',
                                type:'error'
                            })
                        }else{
                            _this.$options.methods.loadTemplate.bind(_this)()
                            _this.newform.cluenum = _this.SMSId.length
                            _this.newform.templateId = ''
                            _this.newform.explain = ''
                            _this.newform.smscontent = ''
                            _this.dialogVisible = true
                        }
                    }).catch(function(err){
                        // console.log(err);
                    });
                    
                }else{
                    this.$message({
                        type: 'error',
                        message: '请先选择要发送短信的线索'
                    }); 
                }
            },
            changetemplate(val){
                this.templateList.forEach(el => {
                    if(el.templateId == val){
                        this.newform.smscontent = el.content
                    }
                });
            },
            sendSMS(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.names = this.SMSnames
                data.phones = this.SMSphones
                data.contacts = this.SMScontacts
                data.templateId = this.newform.templateId

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'message/sendMarketingMsg.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'发送成功',
                            type:'success'
                        })
                        _this.$options.methods.addSMSsended.bind(_this)()
                        _this.dialogVisible = false
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            addSMSsended(){
                const _this = this
                let qs = require('querystring')
                let data2 = {}
                data2.type = '线索'
                data2.ids = this.SMSId
                data2.names = this.SMSnames
                data2.phones = this.SMSphones
                data2.contacts = this.SMScontacts
                data2.templateId = this.newform.templateId
                // data2.customernum = this.newform.customernum     
                data2.explain = this.newform.explain
                data2.pId = this.$store.state.ispId
                data2.secondid = this.$store.state.deptid
                data2.deptid = this.$store.state.insid

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'sendRecord/insertSendRecord.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data2)
                }).then(function(res){
                }).catch(function(err){
                });
            },
            generateCharts(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                if(this.searchList.label == 1){
                    data.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    data.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    data.deptid = _this.$store.state.insid
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerTwo/selectByStateAndSource.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$store.state.clueChartsData = res.data.map.map
                        _this.collapse3 = !_this.collapse3
                        bus.$emit('collapse3', _this.collapse3)
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                });
            },
        },
    }
</script>

<style>
    .el-table td, .el-table th {
        padding: 6px 0 !important;
        line-height: 30px;
    }
    
</style>
