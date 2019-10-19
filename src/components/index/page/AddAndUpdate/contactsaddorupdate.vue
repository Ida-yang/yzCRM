<template>
    <!-- 联系人新增修改 -->
    <div class="addorupdatecontent">
        <el-tabs class="formtabs" v-model="activeName" type="card">
            <el-tab-pane label="主要数据" name="first">
                <el-form :model="myForm" ref="myForm" class="cusForm" :rules="rules">
                    <el-form-item
                        class="formitemcont"
                        label-width="100px"
                        v-for="item in contaddOrUpdateData.createForm"
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
                            style="width:90%;" 
                            auto-complete="off">
                        </el-input>
                        <el-input 
                            v-else-if="item.type && item.type == 'require' && item.inputModel == 'poolName'"
                            :value="myForm[item.inputModel]"
                            @input="handleoninput($event, item.inputModel)"
                            style="width:90%;" 
                            auto-complete="off">
                        </el-input>
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
                            <el-option v-for="o in cityList" :key="o.id" :label="o.name" :value="o.id"></el-option>
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
                        <el-select 
                            v-else-if="item.type && item.type == 'select'"
                            :multiple="item.multiple"
                            :collapse-tags="item.multiple"
                            v-model="myForm[item.inputModel]"
                            @select="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:30px;">
                            <el-option v-for="o in item.options" :key="o[item.okey]" :label="o[item.olabel]" :value="o[item.ovalue]"></el-option>
                        </el-select>
                        <el-date-picker
                            v-else-if="item.type && item.type == 'date'"
                            v-model="myForm[item.inputModel]"
                            type="date"
                            @change="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            default-value="1985-06-15"
                            style="width:90%;" 
                            auto-complete="off">
                        </el-date-picker>
                        <div v-else-if="item.type && item.type == 'radio' && item.inputModel == 'sex'">
                            <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="男">男</el-radio>
                            <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="女">女</el-radio>
                        </div>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="自定义字段" name="second">
                 <el-form ref="attributeform" :model="fieldsform" class="cusForm" :rules="rules">
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
        <div class="line" style="height:740px;"></div>
        <div class="formlist">
            <el-table :data="tableData" border stripe :default-sort = "{order: 'ascending'}" max-height="730">
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
        name:'contactsaddorupdate',
        data(){
            return {
                activeName:'first',
                clueList:[],
                customerList:[],
                tableData:null,
                contaddOrUpdateData: {},
                myForm: {
                    poolName:null,
                    address:null,
                },
                formid:null,

                subData: {},
                mapJson:'../../../../dist/static/map.json',
                Provinces:[],
                cityList: [],
                areaList: [],
                Citys:[],
                block:[],
                countryid:null,
                cityid:null,
                areaid:null,

                page: 1,//默认第一页
                limit: 15,//默认15条
                selectData: null,
                
                rules: {
                    poolName : [{ required: true, message: '公司名称不能为空', trigger: 'blur' },],
                    name : [{ required: true, message: '联系人名称不能为空', trigger: 'blur' },],
                    phone : [{ required: true, message: '电话不能为空', trigger: 'blur' },],
                },

                searchvalue:null,

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
            this.loadCountry();
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
                        // console.log(err);
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
                        // console.log(err);
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
                    // console.log(err);
                });
                
            },
            //获取右边表格
            loadTable(){
                const _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page;
                pageInfo.limit = this.limit;
                pageInfo.pId = this.$store.state.ispId;
                pageInfo.searchName = this.searchvalue

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'rightPoolName.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    _this.clueList = res.data.map.success.customerTwos
                    _this.customerList = res.data.map.success.customerpools
                    _this.tableData = _this.clueList.concat(_this.customerList)
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //加载或重载页面
            loadData() {
                this.contaddOrUpdateData = this.$store.state.contaddOrUpdateData;
                this.countryid = this.contaddOrUpdateData.setForm.country
                this.cityid = this.contaddOrUpdateData.setForm.city
                this.areaid = this.contaddOrUpdateData.setForm.area

                // 设置默认值
                let createForm = this.contaddOrUpdateData.createForm;
                let setForm = this.contaddOrUpdateData.setForm;
                if(setForm) {
                    createForm.forEach((item, index) => {
                        if(item.type && item.type == 'select') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else if(item.type && item.type == 'radio') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else if(item.type && item.type == "date") {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else {
                            this.myForm[item.inputModel] = setForm[item.inputModel];
                        }
                    });
                    this.myForm.countryid = this.contaddOrUpdateData.setForm.country
                    this.myForm.cityid = this.contaddOrUpdateData.setForm.city
                    this.myForm.areaid = this.contaddOrUpdateData.setForm.area
                    this.$emit('input', this.myForm);
                }
            },
            loadfield(){
                const _this = this
                let qs =require('querystring')
                let aval = null
                let bval = null
                if(this.contaddOrUpdateData.submitData) {
                    aval = this.contaddOrUpdateData.submitData.id;
                    bval = this.contaddOrUpdateData.submitData.batch_id;
                }
                let data = {
                    label: 3,
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
                        if(_this.contaddOrUpdateData.submitData){
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
            handleInput(val, key) {
                this.myForm[key] = val;
            },
            handleoninput(val,key){
                this.myForm[key] = val
                this.searchvalue = val
                this.$options.methods.loadTable.bind(this)(true);
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
                if(_this.contaddOrUpdateData.submitData) {
                    entity.id = _this.contaddOrUpdateData.submitData.id;
                    entity.batch_id = _this.contaddOrUpdateData.submitData.batch_id;
                }
                let createForm = _this.contaddOrUpdateData.createForm;
                let fieldData = _this.previewData
                let fieldArr = new Array()

                let flag = false;
                createForm.forEach(item => {
                    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
                    entity[item.inputModel] = _this.myForm[item.inputModel];
                    if(item.inputModel == "email" && entity[item.inputModel] && !reg.test(entity.email)) {
                        _this.$message({
                            message: "邮箱格式不正确",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "name" && !entity[item.inputModel]) {
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
                entity.customeroneId = this.myForm.customeroneId
                entity.customerpool_id = this.myForm.customerpool_id

                let subData = {
                    entity: entity,
                    field: fieldData
                }

                this.isDisable = true

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'contacts/saveOrUpdate.do?cId='+_this.$store.state.iscId,
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
                if(_this.contaddOrUpdateData.submitData) {
                    subData.id = _this.contaddOrUpdateData.submitData.id;
                }
                let createForm = _this.contaddOrUpdateData.createForm;
                let flag = false;
                createForm.forEach(item => {
                    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
                    subData[item.inputModel] = _this.myForm[item.inputModel]
                    if(item.inputModel == "email" && subData[item.inputModel] && !reg.test(subData.email)) {
                        _this.$message({
                            message: "邮箱格式不正确",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "name" && !subData[item.inputModel]) {
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
                });
                if(flag) return;
                subData.secondid = this.$store.state.deptid
                subData.deptid = this.$store.state.insid
                subData.customeroneId = this.myForm.customeroneId
                subData.customerpool_id = this.myForm.customerpool_id

                this.isDisable = true

                axios({
                    method: 'post',
                    url: _this.contaddOrUpdateData.submitURL,
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
                    delItem.path === this.$route.fullPath && this.$router.push('/contacts');
                }else{
                    this.$router.push('/index');
                }
            },
            //获取table的索引和行数据，当该行被点击时，将公司名称地址填充到表单
            getRow(index,row){
                this.myForm.poolName = row.name
                this.myForm.address = row.address
                this.formid = row.id
                this.clueList.forEach(el => {
                    if(this.formid == el.id){
                        this.myForm.customeroneId = el.id
                        this.myForm.customerpool_id = null
                    }
                });
                this.customerList.forEach(item => {
                    if(this.formid == item.id){
                        this.myForm.customerpool_id = item.id
                        this.myForm.customeroneId = null
                    }
                });
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
            }
        }
        
    }
</script>

<style>
    h3 {
        /* text-align: center; */
        margin: 20px 60px;
    }
    .formitemcont:nth-child(12),.formitemcont:nth-child(11){
        margin: 0;
    }
    .formitemcont .cityseat{
        position: absolute;
        top:-40px;
        left:30%;
    }
    .formitemcont .areaseat{
        position: absolute;
        top:-40px;
        left:60%;
    }
</style>
