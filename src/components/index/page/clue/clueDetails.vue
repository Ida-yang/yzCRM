<template>
    <!-- 线索详情页 -->
    <el-row class="cluedetcontent" :gutter="10">
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card" v-model="cluedetail">
                    <div slot="header" class="clearfix">
                        <span>{{cluedetail.name}}</span>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="retract()" v-show="retracts">显示</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="retract()" v-show="!retracts">收起</el-button>
                        <el-popover placement="bottom" width="100" trigger="click">
                            <el-select v-model="SMSform.templateId" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in templateList" :key="item.templateId" :label="item.title" :value="item.templateId"></el-option>
                            </el-select>
                            <br><br><br>
                            <div style="text-align: right; margin: 0">
                                <el-button type="primary" size="mini" @click="sendSMS()">确定</el-button>
                            </div>
                            <el-button style="float:right;" class="info-btn" slot="reference" type="mini">发送短信</el-button>
                        </el-popover>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="cluePool()">转移至线索池</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="customerSwitching()">转移至客户</el-button>
                    </div>
                    <div class="text item">
                        <ul>
                            <li>姓名：<span>{{contacts.coName}}</span></li>
                            <li>手机：<span>{{contacts.phone}}</span></li>
                            <li>电话：<span>{{contacts.telephone}}</span></li>
                            <li>邮箱：<span>{{contacts.email}}</span></li>
                            <li>QQ：<span>{{contacts.qq}}</span></li>
                            <li>微信：<span>{{contacts.wechat}}</span></li>
                            <li>地址：<span>{{cluedetail.address}}</span></li>
                            <li>职务：<span>{{contacts.identity}}</span></li>
                            <li>性别：<span>{{contacts.sex}}</span></li>
                            <li>网址：<span>{{contacts.url}}</span></li>
                            <li>备注：<span>{{cluedetail.remark}}</span></li>
                        </ul>
                    </div>
                    <!-- <div v-show="!thisshow"></div> -->
                </el-card>
            </div>
            <div class="top">
                <el-card class="box-card" v-model="cluedetail" v-show="!thisshow">
                    <div slot="header" class="clearfix">
                        <span>辅助信息</span>
                        <el-popover placement="left" width="350" trigger="click">
                            <div style="padding:5px;color:red;">智能补全必须选择客户所在省份</div>
                            <el-select v-model="countryId" @change="searchBusiness" style="width:90%">
                                <el-option v-for="item in Provinces" :key="item.id" :label="item.name" :value="item.id" placeholder="请选择省份"></el-option>
                            </el-select>
                            <div class="load_icon" v-if="showloading">
                                <span><i class="el-icon-loading"></i>加载中，请稍候...</span>
                            </div>
                            <ul class="ul_business" v-if="showbusiness">
                                <li><span>匹配公司：</span>{{businessList.screenName || '无'}}</li>
                                <li><span>公司地址：</span>{{businessList.address || '无'}}</li>
                                <li><span>法人代表：</span>{{businessList.legalRepresentative || '无'}}</li>
                                <li><span>营业状态：</span>{{businessList.businessStatus || '无'}}</li>
                                <li><span>登记机关：</span>{{businessList.aicBureau || '无'}}</li>
                                <li><span>社会信用代码：</span>{{businessList.creditCode || '无'}}</li>
                                <li><span>注册号：</span>{{businessList.licenseNo || '无'}}</li>
                                <li><span>组织机构代码：</span>{{businessList.orgCode || '无'}}</li>
                                <li><span>成立时间：</span>{{businessList.startupDate || '无'}}</li>
                            </ul>
                            <el-button type="primary" style="margin-left:10px;" size="mini" v-if="showbusiness" @click="clickRefresh">确定</el-button>
                            <el-button class="btn_refresh" slot="reference" size="mini">智能补全</el-button>
                        </el-popover>
                    </div>
                    <div class="text item">
                        <ul>
                            <br>
                            <li>法人代表：<span>{{cluedetail.representative}}</span></li>
                            <li>行业：<span>{{cluedetail.industryType}}</span></li>
                            <li>社会信用代码：<span>{{cluedetail.creditCode}}</span></li>
                            <li>公司类型：<span>{{cluedetail.companyType}}</span></li>
                            <li>企业规模：<span>{{cluedetail.enterpriseScale}}</span></li>
                            <li>注册号：<span>{{cluedetail.registrationNumber}}</span></li>
                            <li>融资状态：<span>{{cluedetail.financingState}}</span></li>
                            <li>营业状态：<span>{{cluedetail.operatingState}}</span></li>
                            <li>组织机构代码：<span>{{cluedetail.organizationCode}}</span></li>
                            <li>注册资金：<span>{{cluedetail.capital}}</span></li>
                            <li>登记机关：<span>{{cluedetail.registrationAuthority}}</span></li>
                            <li>成立时间：<span>{{cluedetail.date}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                </el-card>
            </div>
            <div class="bottom">
                <el-tabs v-model="activeName2" type="card" @tab-click="tabClick">
                    <el-tab-pane label="跟进记录" name="first">
                        <el-form class="followform" :rules="rules" ref="followform" :model="followform">
                            <el-form-item prop="followContent">
                                <el-input type="textarea" placeholder="添加跟进内容" v-model="followform.followContent"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式" style="width:300px;" prop="followType">
                                <el-select v-model="followform.followType" placeholder="请选择" style="width:200px;">
                                    <el-option v-for="item in followTypes" :key="item.value" :value="item.label" :label="item.label"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="联系人" style="width:290px;" prop="contactsId">
                                <el-select v-model="followform.contactsId" placeholder="请选择" style="width:200px;">
                                    <el-option v-for="item in contactList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="状态" style="width:275px;" prop="state">
                                <el-select v-model="followform.state" placeholder="请选择" style="width:200px;">
                                    <el-option v-for="item in stateList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="下次联系时间" style="width:300px;">
                                <el-date-picker
                                v-model="followform.contactTime"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                default-time="12:00:00"
                                :picker-options="pickerOptions"
                                placeholder="选择日期时间" style="width:200px;">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="快捷沟通" style="width:100%;">
                                <el-radio v-model="followform.followContent" v-for="item in fastcontactList" :key="item.id" :label="item.content">{{item.typeName}}</el-radio>
                            </el-form-item>
                            <el-form-item label="上传图片" style="width:300px;">
                                <el-upload class="upload-demo" ref="upload" :file-list="imgList" :multiple="true" action="doUpload" :limit="1" :before-upload="beforeUploadimg">
                                    <el-button slot="trigger" size="mini" class="info-btn">上传图片</el-button>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="上传附件" style="width:300px;">
                                <el-upload class="upload-demo" ref="upload" :file-list="fileList" :multiple="true" action="doUpload" :limit="1" :before-upload="beforeUploadfile">
                                    <el-button slot="trigger" size="mini" class="info-btn">上传附件</el-button>
                                </el-upload>
                            </el-form-item>
                            <el-form-item style="float:right;">
                                <el-button style="margin-top:6px;" type="primary" size="mini" @click="Submitfollowform">立即提交</el-button>
                            </el-form-item>
                        </el-form>
                        <div style="width:100%;height:10px;"></div>
                        <ul class="followrecord" v-for="(item,index) in record" :key="item.followId">
                            <li class="recordicon">
                                <img :src="item.imgUrl" class="detail_portrait" alt="头像" />
                            </li>
                            <li class="verticalline"></li>
                            <li class="recordcontent">
                                <div class="left_more">
                                    <p>{{item.private_employee}}&nbsp;于&nbsp;{{item.createTime}}&nbsp;&nbsp;&nbsp;通过&nbsp;{{item.followType}}&nbsp;联系了：&nbsp;{{item.contacts[0].name}}
                                        <span v-if="item.contactTime">&nbsp;&nbsp;&nbsp;并约定下次联系时间：{{item.contactTime}}</span>
                                        &nbsp;&nbsp;&nbsp;<span>状态为：{{item.state}} &nbsp;&nbsp;&nbsp;{{item.inputType}}</span> 
                                    </p>
                                    <p style="margin-top:15px;margin-bottom:15px;">{{item.followContent}}</p>
                                    <div class="imgbox_two" v-if="item.imgName">
                                        <img :src="item.picture_detail" alt="图片" width="80" height="80" @click="showImg($event,item)">
                                    </div>
                                    <div v-if="item.enclosureName">
                                        <a :href="item.enclosureUrl" download>{{item.enclosureOldName}}</a>
                                    </div>
                                </div>
                                <div class="right_more" v-if="item.showdelico">
                                    <el-dropdown trigger="click" @command="deletefollow(index)">
                                        <span class="el-dropdown-link">更多<i class="el-icon-caret-bottom"></i></span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item command="del">删除</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="联系人" name="second">
                        <div class="pricon">
                            <span>首要联系人</span>
                            <el-select class="pricon_sel" v-model="contacts_id" placeholder="请选择" @change="choosePri">
                                <el-option
                                    v-for="item in priconList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <el-table
                            :data="clueDetails"
                            border
                            stripe
                            style="width: 100%">
                            <el-table-column
                                prop="name"
                                label="名称">
                            </el-table-column>
                            <el-table-column
                                prop="phone"
                                label="手机">
                            </el-table-column>
                            <el-table-column
                                prop="telephone"
                                label="固话">
                            </el-table-column>
                            <el-table-column
                                prop="email"
                                label="邮箱">
                            </el-table-column>
                            <el-table-column
                                prop="qq"
                                label="QQ">
                            </el-table-column>
                            <el-table-column
                                prop="wechat"
                                label="微信">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                show-overflow-tooltip
                                label="地址">
                            </el-table-column>
                            <el-table-column
                                prop="identity"
                                label="职务">
                            </el-table-column>
                            <el-table-column
                                prop="sex"
                                label="性别">
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="是否在职">
                                <template slot-scope="scope">
                                    <el-tooltip :content="scope.row.status" placement="right">
                                        <el-switch v-model="scope.row.status" active-value="在职" inactive-value="离职" active-color="#13ce66" inactive-color="#bbbbbb" @change="changeState(scope.row)"></el-switch>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="isCrux"
                                min-width="110"
                                label="是否为关键人">
                                <template slot-scope="scope">
                                    <el-tooltip :content="scope.row.isCrux" placement="right">
                                        <el-switch v-model="scope.row.isCrux" active-value="是" inactive-value="否" active-color="#13ce66" inactive-color="#bbbbbb" @change="changePrimary(scope.row)"></el-switch>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="remark"
                                label="备注">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="官网" name="third">
                        <iframe class="tab_iframe" :src="website"/>
                    </el-tab-pane>
                    <el-tab-pane label="附件" name="fourth">
                        <el-table
                            :data="Enclosureclue"
                            border
                            stripe
                            style="width: 100%">
                            <el-table-column
                                prop="name"
                                min-width="150"
                                label="附件名称">
                                <template slot-scope="scope">
                                    <a :href="scope.row.src" download>{{scope.row.name}}</a>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="uploads"
                                label="上传者">
                            </el-table-column>
                            <el-table-column
                                prop="uploadTime"
                                label="上传时间">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
        
        <el-col :span="6" style="padding:10px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.keyword" placeholder="请输入公司名称" style="width:80%;" @keyup.enter.native="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
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
                small
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
    import bus from '../../bus'
    import qs from 'qs'

    export default {
        name:'clueDetails',
        store,
        computed: {
            clueDetails(){
                return store.state.clueDetailsList;
            },
        },
        data(){
            return {
                detailData:null,

                pickerOptions:{
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    },
                },

                SMSform:{
                    templateId:null,
                },
                templateList:null,

                followform:{
                    followType:'电话',
                    contactTime:'',
                    contactsId:'',
                    followContent:'',
                    state:'',
                    imgName:null,
                    enclosureName: null,
                },
                rules: {
                    followContent : [{ required: true, message: '请输入跟进内容', trigger: 'blur' },],
                    contactsId : [{ required: true, message: '请选择联系人', trigger: 'blur' },],
                    followType : [{ required: true, message: '请选择联系方式', trigger: 'blur' },],
                    state : [{ required: true, message: '请选择状态', trigger: 'blur' },],
                },
                followTypes:[
                    {label:'电话',value:'1'},
                    {label:'微信',value:'2'},
                    {label:'QQ',value:'3'},
                    {label:'邮箱',value:'4'},
                    {label:'拜访',value:'5'},
                ],
                
                stateList:null,
                searchList:{
                    keyword:null,
                },
                cluedetail:{
                    // name:'',
                },
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

                priconList:null,
                contacts_id:null,

                countryId:null,
                Provinces:null,
                businessList:null,
                showbusiness:false,
                showloading:false,

                files:null,
                filesName:null,
                imgfile:null,
                imgName:null,
                fileList:[],
                imgList:[],

                website:'',

                Enclosureclue:[]
            }
        },
        beforeRouteLeave(to, from , next){
            bus.$off('clue')
            next()
        },
        activated(){
            this.loadData();
            this.loadCountry();
            this.reload()
            this.loadTemplate()
        },
        // mounted(){
        //     this.loadData()
        //     this.loadCountry()
        // },
        methods: {
            reload(){
                const _this = this
                bus.$on('clue', function (msg) {
                    if(msg){
                        _this.$options.methods.loadData.bind(_this)()
                        _this.$options.methods.loadCountry.bind(_this)()
                    }
                })
            },
            loadData() {
                this.detailData = this.$store.state.cluedetailsData.submitData;
                this.idArr.id = this.$store.state.cluedetailsData.submitData.id
                const _this = this
                let qs = require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                let data = {}
                data.type = '快捷方式'
                //详情页联系人
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerTwo/getClueContacts.do?cId='+_this.$store.state.iscId+'&customeroneId='+this.detailData.id,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    _this.$store.state.clueDetailsList = res.data.map.success
                    _this.contactList = res.data.map.success
                    _this.priconList = res.data.map.success
                    _this.followform.contactsId = res.data.map.success[0].id
                }).catch(function(err){
                    // console.log(err);
                });
                //加载快捷方式
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.fastcontactList = res.data
                }).catch(function(err){
                    // console.log(err);
                });
                //加载详情页右侧表格
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerTwo/getUserByClue.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
                //加载跟进记录
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'getFollowStaff.do?cId='+_this.$store.state.iscId+'&customertwoId='+this.detailData.id,
                }).then(function(res){
                    _this.record = res.data.map.success
                    _this.record.forEach(el => {
                        el.showdelico = false
                        let startTime = Date.parse(el.createTime); // 开始时间
                        let endTime = new Date().getTime(); // 结束时间
                        let usedTime = endTime - startTime; // 相差的毫秒数
                        if(usedTime < 7200000){
                            el.showdelico = true
                        }
                        if(usedTime > 7200000){
                            el.showdelico = false
                        }
                        if(el.userImagName){
                            el.imgUrl = '/upload/'+_this.$store.state.iscId+'/'+el.userImagName
                        }
                        if(!el.userImagName || el.userImagName == null){
                            el.imgUrl = '/upload/staticImg/avatar.jpg'
                        }
                        if(el.imgName && el.imgName !== null){
                            el.picture_detail = '/upload/'+_this.$store.state.iscId+'/'+el.imgName
                        }
                        if(el.enclosureName && el.enclosureName !== null){
                            el.enclosureUrl = '/upload/'+_this.$store.state.iscId+'/'+el.enclosureName
                        }
                    });
                    if(!_this.record[0]){
                        _this.loadState()
                    }else{
                        _this.followform.state = _this.record[0].state
                        _this.loadState()
                    }
                }).catch(function(err){
                    // console.log(err);
                });
                //加载线索详情
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'customerTwo/selectByPrimaryKey.do?cId='+_this.$store.state.iscId+'&id='+this.detailData.id,
                }).then(function(res){
                    _this.cluedetail = res.data
                    _this.contacts = res.data.contacts[0]
                    _this.showbusiness = false
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadState(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.type = '线索状态'

                //加载线索状态
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.stateList = res.data.slice(1)
                    _this.stateList.forEach(el => {
                        if(_this.followform.state == el.typeName){
                            _this.followform.state = el.id
                        }
                    });
                }).catch(function(err){
                    // console.log(err)
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

            loadCountry(){
                const _this = this

                //省/市/区
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'address/getAddress.do?id=',
                }).then(function(res){
                    _this.Provinces=res.data;
                }).catch(function(err){
                    // console.log(err);
                });
                
            },
            choosePri(val){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.contacts_id = val

                //详情页联系人
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'contacts/updateFirst.do?cId='+_this.$store.state.iscId+'&customeroneId='+this.detailData.id,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'success'){
                        _this.$options.methods.loadData.bind(_this)();
                    }else{
                        _this.$message({
                            message: '可能出了点什么问题，再看看',
                            type: 'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            retract(){
                this.thisshow = !this.thisshow
                this.retracts = !this.retracts
            },
            getRow(index,row){
                this.$store.state.cluedetailsData.submitData = {"id":row.id}
                this.idArr.id = row.id
                this.countryId = null
                this.$options.methods.loadData.bind(this)(true);
            },
            cluePool(){
                const _this = this;
                let qs = require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id

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
                        _this.closeTag();
                    } else if(res.data.msg && res.data.msg == 'error'){//转移至线索池
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
            },
            customerSwitching(){
                const _this = this;
                let qs = require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                idArr.shift()
                idArr.secondid = this.$store.state.deptid

                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'customerTwo/insert.do?cId='+_this.$store.state.iscId+"&pId="+_this.$store.state.ispId,
                    data:qs.stringify(idArr),
                }).then(function(res){
                    if(res.data.code && res.data.code == 200) {
                        _this.$message({
                            message: '转换成功',
                            type: 'success'
                        });
                    _this.closeTag();
                    } else if(res.data.msg && res.data.msg == 'error'){//转移至客户
                        _this.$message({
                            message: '对不起，您没有该权限，请联系管理员开通',
                            type: 'error'
                        })
                    }else {
                        _this.$message({
                            message: res.data,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    _this.$message.error("转移失败,请重新转移");
                });
            },
            deletefollow(index){
                const _this = this
                let qs = require('querystring')
                let followData = {}
                followData.followId = this.record[index].followId

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'delFollow.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(followData)
                }).then(function(res){
                    if(res.data && res.data == '1' ) {
                        _this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        _this.$store.state.cluedetailsData.submitData = {"id":_this.detailData.id}
                        _this.$options.methods.loadData.bind(_this)(true);
                        
                    } else {
                        _this.$message({
                            message: res.data,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    _this.$message.error("删除失败,请重新删除");
                });
            },
            searchBusiness(val){
                this.showloading = true
                const _this = this
                let qs = require('querystring')
                let freshList = {}
                freshList.name = this.cluedetail.name
                freshList.countryId = this.countryId

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'businessData/getBusinessData.do',
                    data: qs.stringify(freshList),
                }).then(function(res){
                    if(res.data.code && res.data.code == '200' && res.data.map.businessDatas){
                        _this.businessList = res.data.map.businessDatas[0]
                        _this.showloading = false
                        _this.showbusiness = true
                        axios({
                            method: 'post',
                            url: _this.$store.state.defaultHttp+'businessData/insertBusinessData.do',
                            data: qs.stringify(freshList),
                        }).then(function(res){
                        }).catch(function(err){
                        });
                    }else{
                        _this.$message({
                            message:'没有匹配的信息',
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("服务器开小差了,请稍候重试");
                });
            },
            clickRefresh(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.businessList.id
                data.customeroneId = this.detailData.id
                data.countryId = this.countryId

                if(this.cluedetail.name == this.businessList.screenName){
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'customerTwo/updateBusinessData.do?cId='+_this.$store.state.iscId,
                        data: qs.stringify(data),
                    }).then(function(res){
                        if(res.data.code && res.data.code == '200'){
                            _this.$message({
                                message:'更新成功',
                                type:'success'
                            })
                            _this.$options.methods.loadData.bind(_this)(true);
                        }else{
                            _this.$message({
                                message:res.data.msg,
                                type:'error'
                            })
                        }
                    }).catch(function(err){
                        _this.$message.error("更新失败,请重新更新");
                    });
                }else{
                    _this.$message({
                        message:'该公司与匹配的公司名称不一致，无法更新',
                        type:'error'
                    })
                }
            },
            search(){
                const _this = this;
                let qs = require('querystring')
                let searchList = {}
                searchList.searchName = this.searchList.keyword;
                searchList.page = this.page;
                searchList.limit = this.limit;

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerTwo/getUserByClue.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            showImg(e,val){
                // console.log(val)
                this.dialogImageUrl2 = '/upload/'+this.$store.state.iscId+'/'+val.imgName
                this.dialogVisible2 = true
            },
            changeState(row){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = row.id
                data.status = row.status

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'contacts/updateStatus.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$options.methods.loadData.bind(_this)();
                    }else{
                        _this.$message({
                            message: '可能出了点什么问题，再看看',
                            type: 'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            changePrimary(row){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = row.id
                data.isCrux = row.isCrux

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'contacts/updateIsCrux.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$options.methods.loadData.bind(_this)();
                    }else{
                        _this.$message({
                            message: '可能出了点什么问题，再看看',
                            type: 'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },

            tabClick(val){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.company = this.cluedetail.name
                if(val.index == 2){
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'website/selectWebsiteByCompany.do',
                        data: qs.stringify(data)
                    }).then(function(res){
                        _this.website = 'http://' + res.data.map.websites[0].url
                    }).catch(function(err){
                        // console.log(err);
                    });
                }
                if(val.index == 3){
                    this.Enclosureclue = []
                    this.record.forEach(el => {
                        if(el.enclosureName){
                            this.Enclosureclue.push({
                                name:el.enclosureOldName,
                                src:this.$store.state.systemHttp+'upload/'+this.$store.state.iscId+'/'+el.enclosureName,
                                uploads:el.private_employee,
                                uploadTime:el.createTime
                            })
                        }
                    });
                }
            },

            beforeUploadimg(val,imgList){
                this.imgfile = val;
                const extension = val.name.split('.')[1] === 'jpg'
                const extension2 = val.name.split('.')[1] === 'png'
                const extension3 = val.name.split('.')[1] === 'jpeg'
                const isLt500k = val.size / 1024 / 1024 < 0.5
                if (!extension && !extension2 && !extension3) {
                    this.$message.warning('图片只能是 jpg、png、jpeg格式!')
                    return
                }
                if (!isLt500k) {
                    this.$message.warning('图片大小不能超过 500KB!')
                    return
                }
                this.imgName = val.name
                this.imgList.push({name:val.name})
                return false;
            },
            beforeUploadfile(file,fileList){
                this.files = file;
                const extension = file.name.split('.')[1] === 'xls'
                const extension2 = file.name.split('.')[1] === 'xlsx'
                const extension3 = file.name.split('.')[1] === 'doc'
                const extension4 = file.name.split('.')[1] === 'docx'
                const isLt5M = file.size / 1024 / 1024 < 5
                if (!extension && !extension2 && !extension3 && !extension4) {
                    this.$message.warning('附件只能是 xls、xlsx、doc、docx格式!')
                    return
                }
                if (!isLt5M) {
                    this.$message.warning('附件大小不能超过 5MB!')
                    return
                }
                this.filesName = file.name
                this.fileList.push({name:file.name})
                return false; // 返回false不会自动上传
            },  

            Submitfollowform(){
                const _this = this
                let qs = require('querystring')
                let data = new FormData()
                data.append("followType", this.followform.followType);
                data.append("contactTime", this.followform.contactTime);
                data.append("followContent", this.followform.followContent);
                data.append("contactsId", this.followform.contactsId);
                data.append("follow_state", this.followform.state);
                data.append("customertwo_id", this.detailData.id);
                data.append("deptid", this.$store.state.insid);
                data.append("secondid", this.$store.state.deptid);
                data.append("imgNames", this.imgfile, this.imgName);
                data.append("enclosureNames", this.files, this.filesName);

                if(!this.followform.followContent){
                    _this.$message({
                        message: '跟进内容不能为空',
                        type: 'error'
                    });
                }else if(!this.followform.state){
                    _this.$message({
                        message: '跟进状态不能为空',
                        type: 'error'
                    });
                }else{
                    axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+'clueJurisdiction/follow.do',//新增跟进记录
                    }).then(function(res){
                        if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message:'对不起，您没有该权限，请联系管理员开通',
                                type:'error'
                            })
                        }else{
                            axios({
                                method: 'post',
                                url:  _this.$store.state.defaultHttp+ 'addFollow.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                },
                                data:data,
                            }).then(function(res){
                                if(res.data.msg && res.data.msg == 'success' ) {
                                    _this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                } else {
                                    _this.$message({
                                        message: res.data.msg,
                                        type: 'error'
                                    });
                                }
                                _this.followform.contactTime = ''
                                _this.followform.followContent = ''
                                _this.followform.imgName = ''
                                _this.followform.enclosureName = ''
                                _this.$store.state.cluedetailsData.submitData = {"id":_this.detailData.id}
                                _this.$options.methods.loadData.bind(_this)(true);
                            }).catch(function(err){
                                _this.$message.error("提交失败,请重新提交");
                            });
                        }
                        
                    }).catch(function(err){
                        // console.log(err);
                    });
                }
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
                    delItem.path === this.$route.fullPath && this.$router.push('/clue');
                }else{
                    this.$router.push('/welcome');
                }
            },
            handleSizeChange(val) {
                const _this = this;
                _this.limit = val;
                _this.$options.methods.loadData.bind(_this)();
            },
            handleCurrentChange(val) {
                const _this = this;
                _this.page = val;
                _this.$options.methods.loadData.bind(_this)();
            },

            sendSMS(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.names = [this.cluedetail.name]
                data.phones = [this.contacts.phone]
                data.contacts = [this.contacts.coName]
                data.templateId = this.SMSform.templateId

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
                            }else{
                                _this.$message({
                                    message:res.data.msg,
                                    type:'error'
                                })
                            }
                        }).catch(function(err){
                            // console.log(err);
                        });
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
                data2.ids = [this.cluedetail.id]
                data2.names = [this.cluedetail.name]
                data2.phones = [this.contacts.phone]
                data2.contacts = [this.contacts.coName]
                data2.templateId = this.SMSform.templateId
                data2.pId = this.$store.state.ispId
                data2.secondid = this.$store.state.deptid
                data2.deptid = this.$store.state.insid

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'sendRecord/insertSendRecord.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data2)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'发送成功',
                            type:'success'
                        })
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                });
            }
        },
    }
</script>

<style>
    .cluedetcontent{
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
    .middle{
        height: auto;
        background-color: #fff;
        margin-top: 20px;
    }
    .el-card__body{
        padding: 0;
    }
</style>
