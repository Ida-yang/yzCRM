<template>
    <!-- 客户新增修改 -->
    <div class="addorupdatecontent">
        <el-tabs class="formtabs" v-model="activeName" type="card">
            <el-tab-pane label="主要数据" name="first">
                <el-form :model="myForm" ref="myForm" class="cusForm" :rules="rules">
                    <el-form-item
                        class="formitemcus"
                        label-width="100px"
                        v-for="item in cusaddOrUpdateData.createForm"
                        :label="item.label"
                        :key="item.inputModel"
                        :prop="item.inputModel">

                        <el-input 
                            v-if="!item.type || item.type == 'input'"
                            :value="myForm[item.inputModel]"
                            @input="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;" 
                            auto-complete="off">
                        </el-input>
                        <el-input 
                            v-if="item.type && item.type == 'url' && item.inputModel == 'url'"
                            :value="myForm[item.inputModel]"
                            @input="handleInput($event, item.inputModel)"
                            style="width:90%;" 
                            auto-complete="off"
                            :disabled="item.disabled">
                            <template slot="prepend">http://</template>
                        </el-input>
                        <el-input 
                            v-if="item.type == 'textarea'"
                            type="textarea"
                            rows="5"
                            :value="myForm[item.inputModel]"
                            @input="handleInput($event, item.inputModel)"
                            style="width:90%;" 
                            auto-complete="off"
                            :disabled="item.disabled">
                        </el-input>
                        <el-input 
                            v-else-if="item.type && item.type == 'number'"
                            onkeyup = "value=value.replace(/[^\d]/g,'')"
                            :value="myForm[item.inputModel]"
                            @input="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;" 
                            auto-complete="off">
                        </el-input>
                        <el-input 
                            v-else-if="item.type && item.type == 'require' && item.inputModel == 'poolName'"
                            :value="myForm[item.inputModel]"
                            @input="handleoninput($event, item.inputModel)"
                            @blur="handleblur($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;" 
                            auto-complete="off">
                        </el-input>
                        <el-select 
                            v-else-if="item.inputModel == 'customerStateid'"
                            v-model="myForm[item.inputModel]"
                            @change="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in cuesList" :key="o.id" :label="o.typeName" :value="o.id"></el-option>
                        </el-select>
                        <el-select 
                            v-else-if="item.inputModel == 'levelsid'"
                            v-model="myForm[item.inputModel]"
                            @change="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in levelList" :key="o.id" :label="o.typeName" :value="o.id"></el-option>
                        </el-select>
                        <el-select 
                            v-else-if="item.inputModel == 'countryid'"
                            v-model="myForm[item.inputModel]"
                            @change="choseProvince"
                            :placeholder="item.placeholder"
                            style="width:28%;">
                            <el-option v-for="o in Provinces" :key="o.id" :label="o.name" :value="o.id"></el-option>
                        </el-select>
                        <el-select
                            class="cityseat"
                            v-else-if="item.inputModel == 'cityid'"
                            v-model="myForm[item.inputModel]"
                            @change="choseCity"
                            :placeholder="item.placeholder"
                            style="width:28%;">
                            <el-option  v-for="o in cityList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                        </el-select>
                        <el-select
                            class="areaseat"
                            v-else-if="item.inputModel == 'areaid'"
                            v-model="myForm[item.inputModel]"
                            @change="choseBlock"
                            :placeholder="item.placeholder"
                            style="width:28%;">
                            <el-option v-for="o in areaList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                        </el-select>
                        <div v-else-if="item.type && item.type == 'radio' && item.inputModel == 'sex'">
                            <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="男">男</el-radio>
                            <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="女">女</el-radio>
                        </div>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="辅助资料" name="second">
                <el-form :model="myForm" ref="myForm" class="cusForm" :rules="rules">
                    <!-- <h3>{{cusaddOrUpdateData.title}}</h3> -->
                    <el-form-item
                        label-width="130px"
                        v-for="item in cusaddOrUpdateData.assistForm"
                        :label="item.label"
                        :key="item.inputModel"
                        :prop="item.inputModel">

                        <el-input 
                            v-if="!item.type || item.type == 'input'"
                            :value="myForm[item.inputModel]"
                            @input="handleInput($event, item.inputModel)"
                            style="width:90%;" 
                            auto-complete="off">
                        </el-input>
                        <!-- 注册资金 -->
                        <el-input 
                            v-else-if="item.inputModel == 'capital'"
                            onkeyup = "value=value.replace(/[^\d]/g,'.')"
                            :value="myForm[item.inputModel]"
                            @input="handleinput($event, item.inputModel)"
                            style="width:90%;" 
                            auto-complete="off">
                            <span slot="suffix" style="margin-right:20px">万元</span>
                        </el-input>
                        <!-- 注册时间 -->
                        <el-date-picker
                            v-else-if="item.type && item.type == 'date'"
                            v-model="myForm[item.inputModel]"
                            type="date"
                            @change="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            style="width:90%;" 
                            auto-complete="off">
                        </el-date-picker>
                        <!-- 企业规模 -->
                        <el-select 
                            v-else-if="item.type && item.type == 'select' && item.inputModel == 'enterpriseScaleId'"
                            :multiple="item.multiple"
                            :collapse-tags="item.multiple"
                            v-model="myForm[item.inputModel]"
                            @select="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in enterpriseScaleList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                        </el-select>
                        <!-- 融资状态 -->
                        <el-select 
                            v-else-if="item.type && item.type == 'select' && item.inputModel == 'financingStateId'"
                            :multiple="item.multiple"
                            :collapse-tags="item.multiple"
                            v-model="myForm[item.inputModel]"
                            @select="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in financingStateList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                        </el-select>
                        <!-- 行业 -->
                        <el-select 
                            v-else-if="item.type && item.type == 'select' && item.inputModel == 'industryId'"
                            :multiple="item.multiple"
                            :collapse-tags="item.multiple"
                            v-model="myForm[item.inputModel]"
                            @select="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in industryTypeList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                        </el-select>
                        <!-- 公司类型 -->
                        <el-select 
                            v-else-if="item.type && item.type == 'select' && item.inputModel == 'companyId'"
                            :multiple="item.multiple"
                            :collapse-tags="item.multiple"
                            v-model="myForm[item.inputModel]"
                            @select="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in companyTypeList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                        </el-select>
                        <!-- 经营状态 -->
                        <el-select 
                            v-else-if="item.type && item.type == 'select' && item.inputModel == 'operatingStateId'"
                            :multiple="item.multiple"
                            :collapse-tags="item.multiple"
                            v-model="myForm[item.inputModel]"
                            @select="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in operatingStateList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="订货资料" name="third">
                <el-form :model="myForm" ref="myForm" class="cusForm" :rules="rules">
                    <el-form-item
                        label-width="130px"
                        v-for="item in cusaddOrUpdateData.orderForm"
                        :label="item.label"
                        :key="item.inputModel"
                        :prop="item.inputModel">

                        <el-input 
                            v-if="!item.type || item.type == 'input'"
                            :value="myForm[item.inputModel]"
                            @input="handleInput($event, item.inputModel)"
                            style="width:90%;" 
                            auto-complete="off">
                        </el-input>
                        <!-- 税率 -->
                        <el-input 
                            v-else-if="item.inputModel == 'taxRate'"
                            onkeyup = "value=value.replace(/[^\d]/g,'.')"
                            :value="myForm[item.inputModel]"
                            @input="handleinput($event, item.inputModel)"
                            style="width:90%;" 
                            auto-complete="off">
                            <span slot="suffix" style="margin-right:20px">%</span>
                        </el-input>
                        <!-- 经销商级别 -->
                        <el-select
                            v-else-if="item.type && item.type == 'select' && item.inputModel == 'distributorId'"
                            v-model="myForm[item.inputModel]"
                            @change="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in distributorList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="自定义字段" name="fourth">
                 <el-form ref="attributeform" :model="fieldsform" :rules="rules">
                    <el-form-item v-for="item in previewData" :key="item.id" :label="item.name" :prop="item.field_name" label-width="130px">
                        <el-input v-if="item.formType == 'text' || item.formType == 'email'" v-model="item.default_value" :placeholder="item.input_tips" style="width:90%"></el-input>

                        <el-input v-else-if="item.formType == 'textarea'" type="textarea" :maxlength="item.max_length" v-model="item.default_value" :placeholder="item.input_tips" style="width:90%"></el-input>

                        <el-input v-else-if="item.formType == 'number'" onkeyup= "value=value.replace(/[^\d]/g,'')" v-model="item.default_value" :placeholder="item.input_tips" style="width:90%"></el-input>

                        <el-input v-else-if="item.formType == 'floatnumber'" onkeyup= "value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" v-model="item.default_value" :placeholder="item.input_tips" style="width:90%"></el-input>

                        <el-input v-else-if="item.formType == 'mobile'" onkeyup= "value=value.replace(/[^\d]/g,'')" :maxlength="11" v-model="item.default_value" :placeholder="item.input_tips" style="width:90%"></el-input>

                        <el-select v-else-if="item.formType == 'select'" v-model="item.default_value" :placeholder="item.input_tips" style="width:90%">
                            <el-option v-for="o in item.setting" :key="o" :label="o" :value="o"></el-option>
                        </el-select>

                        <el-select v-else-if="item.formType == 'checkbox'" multiple v-model="item.default_value" :placeholder="item.input_tips" style="width:90%">
                            <el-option v-for="o in item.setting" :key="o" :label="o" :value="o"></el-option>
                        </el-select>

                        <el-select v-else-if="item.formType == 'user'" v-model="item.default_value" :placeholder="item.input_tips" style="width:90%">
                            <el-option v-for="o in userData" :key="o.private_id" :label="o.private_employee" :value="o.private_id"></el-option>
                        </el-select>

                        <el-select v-else-if="item.formType == 'structure'" v-model="item.displayVal" :placeholder="item.input_tips" style="width:90%" class="noPadding_select">
                            <el-option class="droplist nopadding_option" :value="item.displayVal">
                                <el-tree 
                                    node-key="deptid" 
                                    highlight-current default-expand-all
                                    ref="tree"
                                    :expand-on-click-node="false"
                                    :data="deptData"
                                    :props="defaultProps"
                                    @node-click="handlecheck($event,item)">
                                </el-tree>
                            </el-option>
                        </el-select>

                        <el-date-picker v-else-if="item.formType == 'date'" v-model="item.default_value" type="date" :placeholder="item.input_tips" 
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:90%">
                        </el-date-picker>

                        <el-date-picker v-else-if="item.formType == 'datetime'" v-model="item.default_value" type="datetime" :placeholder="item.input_tips" 
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width:90%">
                        </el-date-picker>
                        
                        <el-upload v-else-if="item.formType == 'file'" class="upload-demo" :action="doUpload" :on-success="uploadSuccess" :before-upload="beforeUpload">
                            <el-button size="mini" type="info-btn">上传</el-button>
                            <div slot="tip" class="el-upload__tip" style="margin-top: -20px">{{item.input_tips}}</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <div class="line" style="height:690px;"></div>
        <div class="formlist">
            <el-table :data="tableData" border stripe :default-sort = "{order: 'ascending'}" max-height="680">
                <el-table-column header-align="center" align="center" width="35">
                    <template slot-scope="scope">
                        <el-button style="width:15px;height:15px;padding:0;border-radius:50%;" @click="getRow(scope.$index,scope.row)">&nbsp;</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="name" min-width="200" label="公司名称" sortable />
                <el-table-column prop="address" show-overflow-tooltip min-width="200" label="公司地址" sortable />
                <el-table-column prop="representative" min-width="90" label="法人" sortable />
            </el-table>
        </div>
        
        <div class="submit_btn">
            <el-button type="primary" :disabled="isDisable" @click="submit" style="margin-right:50px !important;">立即提交</el-button>
            <el-button @click="closeTag">取消</el-button>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import bus from '../../bus';
    
    export default {
        name:'customeraddorupdate',
        data(){
            return {
                activeName: 'first',
                tableData:null,
                tableData2:null,
                cusaddOrUpdateData: {},
                myForm: {
                    poolName:null,
                    address:null,
                },
                
                industryTypeList:null, //行业
                enterpriseScaleList:null, // 企业规模
                companyTypeList:null, //企业类型
                operatingStateList:null, //经营状态
                financingStateList:null, //融资状态
                listedList:null, //上市信息
                distributorList:null,//经销商级别

                cuesList:null,
                levelList:null,
                subData: {},
                industryId:null,
                companyId:null,
                operatingStateId:null,
                enterpriseScaleId:null,
                financingStateId:null,
                mapJson:'../../../../dist/static/map.json',
                Provinces:[],
                Citys:[],
                block:[],
                cityList: [],
                areaList: [],
                countryid:null,
                cityid:null,
                areaid:null,

                page: 1,//默认第一页
                limit: 15,//默认15条
                selectData: null,
                tableNumber: null,
                rules: {
                    poolName : [{ required: true, message: '公司名称不能为空', trigger: 'blur' },],
                    contactsName : [{ required: true, message: '联系人名称不能为空', trigger: 'blur' },],
                    phone : [{ required: true, message: '电话不能为空', trigger: 'blur' },],
                    levelsid : [{ required: true, message: '请选择客户分类', trigger: 'blur' },],
                    customerStateid : [{ required: true, message: '请选择客户来源', trigger: 'blur' },],
                },

                isDisable:false,

                fieldsform:{},
                previewData:[],

                deptData: [],
                
                defaultProps:{
                    label:'deptname',
                    children:'next',
                },

                userData: [],

                doUpload:this.$store.state.defaultHttp + 'workOrder/upload.do?cId=' + this.$store.state.iscId,
            }
        },
        mounted() {
            this.loadData();
            this.loadTable();
            this.loadCountry()
            this.loadinfo()
            this.loadTable2()
            this.loadfield()
            this.loadUserandDept()
        },
        methods:{
            loadCountry(){
                const _this = this
                let qs =require('querystring')
                let country = {}
                if(this.cityid){
                    country.id = this.cityid
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'address/getAddress.do',
                        data: qs.stringify(country),
                    }).then(function(res){
    
                        _this.areaList=res.data;
                    }).catch(function(err){
                    });
                }
                if(this.countryid){
                    country.id = this.countryid
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'address/getAddress.do',
                        data: qs.stringify(country),
                    }).then(function(res){
    
                        _this.cityList=res.data;
                    }).catch(function(err){
                    });
                }
                country.id = ''

                //省/市/区
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'address/getAddress.do',
                    data: qs.stringify(country),
                }).then(function(res){

                    _this.Provinces=res.data;
                }).catch(function(err){
                });
                
            },
            //获取右边表格、客户来源和客户分类
            loadTable(){
                const _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page;
                pageInfo.limit = this.limit;
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerOne/query.do',
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    _this.tableData = res.data.rows
                    _this.tableNumber = res.data.total;
                }).catch(function(err){
                });
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoByType.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.cuesList = res.data.name3001
                    _this.levelList = res.data.name4001
                }).catch(function(err){
                });
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'distributor/selectDistributor.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.distributorList = res.data.map.distributors
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //加载或重载页面
            loadData() {
                this.cusaddOrUpdateData = this.$store.state.cusaddOrUpdateData;
                this.countryid = this.cusaddOrUpdateData.setForm.country
                this.cityid = this.cusaddOrUpdateData.setForm.city
                this.areaid = this.cusaddOrUpdateData.setForm.area
                this.industryId = this.cusaddOrUpdateData.setForm.industryId
                this.companyId = this.cusaddOrUpdateData.setForm.companyId
                this.operatingStateId = this.cusaddOrUpdateData.setForm.operatingStateId
                this.enterpriseScaleId = this.cusaddOrUpdateData.setForm.enterpriseScaleId
                this.financingStateId = this.cusaddOrUpdateData.setForm.financingStateId

                // 设置默认值
                let createForm = this.cusaddOrUpdateData.createForm;
                let assistForm = this.cusaddOrUpdateData.assistForm;
                let orderForm = this.cusaddOrUpdateData.orderForm;
                let setForm = this.cusaddOrUpdateData.setForm;
                if(setForm) {
                    createForm.forEach((item, index) => {
                        if(item.type && item.type == 'select') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else if(item.type && item.type == 'radio') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else {
                            this.myForm[item.inputModel] = setForm[item.inputModel];
                        }
                    });
                    assistForm.forEach((item, index) => {
                        if(item.type && item.type == 'select') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else if(item.type && item.type == 'radio') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else if(item.type && item.type == 'date'){
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else {
                            this.myForm[item.inputModel] = setForm[item.inputModel];
                        }
                    });
                    orderForm.forEach((item, index) => {
                        if(item.type && item.type == 'select') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        }else {
                            this.myForm[item.inputModel] = setForm[item.inputModel];
                        }
                    });
                    this.myForm.levelsid = setForm.levels
                    this.myForm.countryid = setForm.country
                    this.myForm.cityid = setForm.city
                    this.myForm.areaid = setForm.area
                    this.myForm.industryId = setForm.industryType
                    this.myForm.companyId = setForm.companyType
                    this.myForm.operatingStateId = setForm.operatingState
                    this.myForm.enterpriseScaleId = setForm.enterpriseScale
                    this.myForm.financingStateId = setForm.financingState
                    this.$emit('input', this.myForm);
                }
            },
            loadfield(){
                const _this = this
                let qs =require('querystring')
                let aval = null
                let bval = null
                if(this.cusaddOrUpdateData.submitData) {
                    aval = this.cusaddOrUpdateData.submitData.id;
                    bval = this.cusaddOrUpdateData.submitData.batch_id;
                }
                let data = {
                    label: 2,
                    id: aval,
                    batch_id: bval,
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'field/queryField.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data),
                }).then(function(res){
                    let info = res.data

                    info.forEach((el,i) => {
                        el.displayVal = ''
                        if(_this.cusaddOrUpdateData.submitData){
                            el.default_value = el.value
                            if(el.formType == 'user' || el.formType == 'structure'){
                                el.displayVal = el.deptOrUserName
                                el.default_value = parseInt(el.value)
                            }
                        }else{
                            if(el.formType !== 'checkbox'){
                                if(el.value !== null){
                                    el.default_value = el.value
                                }
                            }
                        }
                        if(el.is_null == 1){
                            _this.rules[el.field_name] = [{required: true , message: ' ', trigger:'blur'}]
                        }
                    })
                    
                    _this.previewData = info
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadUserandDept(){
                const _this = this
                let qs = require('querystring')
                let pageInfo = {}
                pageInfo.page = 1
                pageInfo.limit = '9999'

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getPrivateUserAll.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    _this.userData = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'dept/getDeptNodeTree.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.deptData = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadTable2(){
                const _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page;
                pageInfo.limit = 99999999;

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'rightPoolName.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    let clueList = res.data.map.success.customerTwos
                    let customerList = res.data.map.success.customerpools
                    _this.tableData2 = clueList.concat(customerList)
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleInput(val, key) {
                this.myForm[key] = val;
            },
            handleoninput(val,key){
                const _this = this
                this.myForm[key] = val
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page;
                pageInfo.limit = this.limit;
                pageInfo.keyword = val;
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerOne/query.do',
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    _this.tableData = res.data.rows
                    _this.tableNumber = res.data.total;
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleblur(e,key){
                let val = e.target.value
                this.tableData2.forEach(el => {
                    if(val == el.name){
                        this.$message({
                            message:'该公司已存在于线索或客户中',
                            type:'error'
                        })
                    }
                });
            },
            handlecheck(data,val){
                this.previewData.forEach(b => {
                    if(b.id == val.id){
                        b.displayVal = data.deptname
                        b.default_value = data.deptid
                    }
                })
            },
            beforeUpload(file){
                const isLt5M = file.size / 1024 / 1024 < 5
                if (!isLt5M) {
                    this.$message.warning('文件大小不能超过 5MB!')
                    return false
                }
            },
            uploadSuccess(res,file,fileList){
                this.previewData.forEach(el => {
                    if(el.formType == 'file'){
                        el.default_value = res
                    }
                });

            },
            //提交或修改
            submit() {
                const _this = this;
                let qs =require('querystring')
                let entity = {};
                if(_this.cusaddOrUpdateData.submitData) {
                    entity.id = _this.cusaddOrUpdateData.submitData.id;
                    entity.csId = _this.cusaddOrUpdateData.submitData.csId;
                    entity.batch_id = _this.cusaddOrUpdateData.submitData.batch_id;
                }
                let createForm = _this.cusaddOrUpdateData.createForm;
                let assistForm = _this.cusaddOrUpdateData.assistForm;
                let orderForm = _this.cusaddOrUpdateData.orderForm
                let fieldData = _this.previewData
                let fieldArr = new Array()

                let flag = false;
                createForm.forEach(item => {
                    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
                    // var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
                    entity[item.inputModel] = _this.myForm[item.inputModel];
                    if(item.inputModel == "contactsName" && !entity[item.inputModel]) {
                        _this.$message({
                            message: "联系人名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "poolName" && !entity[item.inputModel]) {
                        _this.$message({
                            message: "公司名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "phone" && !entity[item.inputModel]) {
                        _this.$message({
                            message: "手机号码不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "levelsid" && !entity[item.inputModel]) {
                        _this.$message({
                            message: "客户分类不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "customerStateid" && !entity[item.inputModel]) {
                        _this.$message({
                            message: "客户来源不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                assistForm.forEach(item => {
                    entity[item.inputModel] = _this.myForm[item.inputModel];
                });
                orderForm.forEach(item => {
                    entity[item.inputModel] = _this.myForm[item.inputModel]
                });
                fieldData.forEach(item => {
                    if(item.formType == 'checkbox'){
                        item.value = item.default_value.join(',')
                    }else if(item.formType == 'user' || item.formType == 'structure'){
                        if(item.default_value){
                            item.value = item.default_value.toString()
                        }
                    }else{
                        item.value = item.default_value
                    }

                    if(item.is_null == 1 && !item.value){
                        _this.$message({
                            message: item.name + '不能为空',
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return;
                entity.pId = this.$store.state.ispId
                entity.secondid = this.$store.state.deptid
                entity.deptid = this.$store.state.insid

                let subData = {
                    entity: entity,
                    field: fieldData
                }

                this.isDisable = true

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerpool/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data: subData
                }).then(function(res){
                    if(res.data.code && res.data.code == "200") {
                        _this.$message({
                            message: '成功',
                            type: 'success'
                        });
                        _this.closeTag();
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                    _this.isDisable = false
                }).catch(function(err){
                    _this.$message.error("提交失败，请重新提交");
                    
                }); 
            },
            handleSubmit() {
                const _this = this;
                let qs =require('querystring')
                let subData = {};
                if(_this.cusaddOrUpdateData.submitData) {
                    subData.id = _this.cusaddOrUpdateData.submitData.id;
                    subData.csId = _this.cusaddOrUpdateData.submitData.csId;
                }
                let createForm = _this.cusaddOrUpdateData.createForm;
                let assistForm = _this.cusaddOrUpdateData.assistForm;
                let orderForm = _this.cusaddOrUpdateData.orderForm
                let flag = false;
                assistForm.forEach(item => {
                    subData[item.inputModel] = _this.myForm[item.inputModel]
                });
                orderForm.forEach(item => {
                    subData[item.inputModel] = _this.myForm[item.inputModel]
                });
                createForm.forEach(item => {
                    subData[item.inputModel] = _this.myForm[item.inputModel];
                    if(item.inputModel == "contactsName" && !subData[item.inputModel]) {
                        _this.$message({
                            message: "联系人名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "poolName" && !subData[item.inputModel]) {
                        _this.$message({
                            message: "公司名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "phone" && !subData[item.inputModel]) {
                        _this.$message({
                            message: "手机号码不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "levelsid" && !subData[item.inputModel]) {
                        _this.$message({
                            message: "客户分类不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "customerStateid" && !subData[item.inputModel]) {
                        _this.$message({
                            message: "客户来源不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return;
                subData.secondid = this.$store.state.deptid
                subData.deptid = this.$store.state.insid

                this.isDisable = true

                axios({
                    method: 'post',
                    url: _this.cusaddOrUpdateData.submitURL,
                    data: qs.stringify(subData)
                }).then(function(res){
                    if(res.data.code && res.data.code == "200") {
                        _this.$message({
                            message: '成功',
                            type: 'success'
                        });
                        _this.closeTag();
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                    _this.isDisable = false
                }).catch(function(err){
                    _this.$message.error("提交失败，请重新提交");
                }); 
            },
            //取消时返回上一个页面，若只有一个页面，则返回首页
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
                    this.$router.push('/index');
                }
            },
            //获取table的索引和行数据，当该行被点击时，将公司名称地址填充到表单
            getRow(index,row){
                this.myForm.poolName = row.name
                this.myForm.address = row.address
                this.myForm.url = row.url
                this.myForm.representative = row.representative  //法人代表  
                this.myForm.registrationAuthority = row.registrationAuthority  //登记机关
                this.myForm.registrationNumber = row.registrationNumber  //注册号
                this.myForm.organizationCode = row.organizationCode  //组织机构代码
                this.myForm.date = row.date  //注册时间
                this.myForm.industryId = row.industryName  //行业
                this.industryId = row.industryId
                this.myForm.companyId = row.company  //公司类型
                this.companyId = row.companyId
                this.myForm.operatingStateId = row.ostate  // 经营状态
                this.operatingStateId = row.operatingStateId
                this.myForm.capital = row.capital  //注册资金
                this.myForm.financingState = row.financing  //是否融资
                this.financingStateId = row.financingId
                this.myForm.enterpriseScale = row.enterpriseScaleName  //企业规模
                this.myForm.enterpriseScaleId = row.enterpriseScaleId
                this.myForm.creditCode = row.creditCode  //统一社会信用代码
                this.loadinfo()
            },
            
            // 选省
            choseProvince(e) {
                const _this = this
                this.myForm.cityid = ''
                this.myForm.areaid = ''
                this.countryid = e
                _this.$options.methods.loadCountry.bind(_this)(true);
            },
            // 选市
            choseCity(e) {
                const _this = this
                this.myForm.areaid = ''
                this.cityid = e
                _this.$options.methods.loadCountry.bind(_this)(true);
            },
            // 选区
            choseBlock(e) {
                this.E=e;
                this.areaid = e
            },
            loadinfo(){
                const _this = this
                let qs = require('querystring')

                let industryTypeList = {} 
                industryTypeList.comboType = 'IndustryType'
                let enterpriseScaleList = {}   
                enterpriseScaleList.comboType = 'EnterpriseScale'
                let companyTypeList = {} 
                companyTypeList.comboType = 'CompanyType'
                let operatingStateList = {} 
                operatingStateList.comboType = 'OperatingState'
                let financingStateList = {} 
                financingStateList.comboType = 'FinancingState'
                let listedList = {} 
                listedList.comboType = 'Listed'

                //行业
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(industryTypeList,),
                }).then(function(res){
                    _this.industryTypeList=res.data;
                    _this.industryTypeList.forEach(el => {
                        if(_this.industryId == el.id){
                            _this.myForm.industryId = el.id
                        }
                    });
                }).catch(function(err){
                });
                //企业规模
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(enterpriseScaleList),
                }).then(function(res){
                    _this.enterpriseScaleList=res.data;
                    _this.enterpriseScaleList.forEach(el => {
                        if(_this.enterpriseScaleId == el.id){
                            _this.myForm.enterpriseScaleId = el.id
                        }
                    });
                }).catch(function(err){
                    // console.log(err);
                });
                //企业类型
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(companyTypeList),
                }).then(function(res){
                    _this.companyTypeList=res.data;
                    _this.companyTypeList.forEach(el => {
                        if(_this.companyId == el.id){
                            _this.myForm.companyId = el.id
                        }
                    });
                }).catch(function(err){
                    // console.log(err);
                });
                //经营状态
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(operatingStateList),
                }).then(function(res){
                    _this.operatingStateList=res.data;
                    _this.operatingStateList.forEach(el => {
                        if(_this.operatingStateId == el.id){
                            _this.myForm.operatingStateId = el.id
                        }
                    });
                }).catch(function(err){
                    // console.log(err);
                });
                //融资状态
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(financingStateList),
                }).then(function(res){
                    _this.financingStateList=res.data;
                    _this.financingStateList.forEach(el => {
                        if(_this.financingStateId == el.id){
                            _this.myForm.financingStateId = el.id
                        }
                    });
                }).catch(function(err){
                    // console.log(err);
                });
                //上市信息
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(listedList),
                }).then(function(res){
                    _this.listedList=res.data;
                }).catch(function(err){
                    // console.log(err);
                });
            },
        }
        
    }
</script>

<style>
    .formtabs{
        width: 41%;
        float: left;
    }
    .cusForm {
        width: 100%;
    }
    .formitemcus:nth-child(11),.formitemcus:nth-child(12){
        margin: 0;
    }
    .formitemcus .cityseat{
        position: absolute;
        top:-52px;
        left:30%;
    }
    .formitemcus .areaseat{
        position: absolute;
        top:-52px;
        left:60%;
    }
</style>
