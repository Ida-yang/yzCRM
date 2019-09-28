<template>
    <!-- 合同新增修改 -->
    <div class="addorupdatecontent">
        <el-tabs class="formtabs" v-model="activeName" type="card">
            <el-tab-pane label="主要数据" name="first">
                <el-form :model="myForm" ref="myForm" class="cusForm" :rules="rules">
                    <el-form-item
                        label-width="100px"
                        v-for="item in agreeaddOrUpdateData.createForm"
                        :label="item.label"
                        :key="item.inputModel"
                        :prop="item.inputModel">

                        <el-input 
                            v-if="!item.type || item.type == 'input'"
                            :value="myForm[item.inputModel]"
                            @input="handleInput($event, item.inputModel)"
                            style="width:90%;" 
                            auto-complete="off"
                            :disabled="item.disabled">
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
                            onkeyup = "value=value.replace(/[^\d]/g,'.')"
                            :value="myForm[item.inputModel]"
                            @input="handleInput($event, item.inputModel)"
                            style="width:90%;" 
                            auto-complete="off">
                        </el-input>
                        <el-input 
                            v-else-if="item.type && item.type == 'require' && item.inputModel == 'customerpool_id'"
                            :value="myForm[item.inputModel]"
                            @input="handleoninput($event, item.inputModel)"
                            @blur="handleblur($event, item.inputModel)"
                            style="width:90%;" 
                            auto-complete="off">
                        </el-input>
                        <el-select 
                            v-else-if="item.inputModel == 'opportunity_id'"
                            filterable
                            :multiple="item.multiple"
                            :collapse-tags="item.multiple"
                            v-model="myForm[item.inputModel]"
                            @change="handleopp($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in oppoptions" :key="o.opportunity_id" :label="o.opportunity_name" :value="o.opportunity_id"></el-option>
                        </el-select>
                        <el-select 
                            v-else-if="item.inputModel == 'signatories'"
                            filterable
                            :multiple="item.multiple"
                            :collapse-tags="item.multiple"
                            v-model="myForm[item.inputModel]"
                            @change="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="p in contactslist" :key="p.id" :label="p.name" :value="p.id"></el-option>
                        </el-select>
                        <el-select 
                            v-else-if="item.type && item.type == 'select'"
                            :multiple="item.multiple"
                            :collapse-tags="item.multiple"
                            v-model="myForm[item.inputModel]"
                            @change="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in item.options" :key="o.okey" :label="o.olabel" :value="o.ovalue"></el-option>
                        </el-select>
                        <el-date-picker
                            v-else-if="item.type && item.type == 'date' && item.inputModel == 'start_date'"
                            v-model="myForm[item.inputModel]"
                            type="date"
                            @change="handlechange($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            style="width:90%;" 
                            auto-complete="off">
                        </el-date-picker>
                        <el-date-picker
                            v-else-if="item.type && item.type == 'date' && item.inputModel == 'end_date'"
                            v-model="myForm[item.inputModel]"
                            type="date"
                            @change="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            style="width:90%;" 
                            auto-complete="off">
                        </el-date-picker>
                        <div v-else-if="item.type && item.type == 'radio'">
                            <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="是">是</el-radio>
                            <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="否">否</el-radio>
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
                        
                        <el-upload v-else-if="item.formType == 'file'" class="upload-demo" :action="doUpload" :multiple="false" :limit="1" :on-success="uploadSuccess" :before-upload="beforeUpload">
                            <el-button size="small" type="primary">上传</el-button>
                            <div slot="tip" class="el-upload__tip" style="margin-top: -20px">{{item.input_tips}}</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <div class="line" style="height:640px;"></div>
        <div class="formlist">
            <el-table :data="tableData" border stripe :default-sort = "{order: 'ascending'}" max-height="630">
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

<style>
</style>

<script>
    import store from '../../../../store/store'
    import {mapState} from 'vuex'
    import axios from 'axios'
    import bus from '../../bus';
    export default {
        name:'agreementaddorupdate',
        data(){
            return {
                activeName:'first',
                agreeaddOrUpdateData: {},
                myForm: {
                    start_date:null,
                    end_date:null,
                    customerpool_id:null,
                    signatories:null,
                    orderId:null,
                },
                subData: {},
                oppoptions:null,
                contactslist:null,
                our_signatoriesId:null,

                page: 1,//默认第一页
                limit: 15,//默认15条

                rules: {
                    our_signatories : [{ required: true, message: '我方签约人不能为空', trigger: 'blur' },],
                    signatories : [{ required: true, message: '客户签约人不能为空', trigger: 'blur' },],
                    end_date : [{ required: true, message: '合同结束时间不能为空', trigger: 'blur' },],
                    start_date : [{ required: true, message: '合同开始时间不能为空', trigger: 'blur' },],
                    amount : [{ required: true, message: '合同金额不能为空', trigger: 'blur' },],
                    customerpool_id : [{ required: true, message: '客户不能为空', trigger: 'blur' },],
                    contract_type : [{ required: true, message: '合同类型不能为空', trigger: 'blur' },],
                    contract_name : [{ required: true, message: '合同名称不能为空', trigger: 'blur' },],
                },

                tableData:null,

                formid:null,
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
            this.loadTable()
            this.loadOpp()
            this.loadfield()
            this.loadUserandDept()
        },
        methods:{
            //加载或重载页面
            loadData() {
                this.agreeaddOrUpdateData = this.$store.state.agreeaddOrUpdateData;
                this.oppoptions = this.$store.state.agreeaddOrUpdateData.customerpool_id
                this.our_signatoriesId = this.agreeaddOrUpdateData.setForm.our_signatoriesId

                // 设置默认值
                let createForm = this.agreeaddOrUpdateData.createForm;
                let setForm = this.agreeaddOrUpdateData.setForm;
                if(setForm) {
                    createForm.forEach((item, index) => {
                        if(item.type && item.type == 'select') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                            // let selectList = item.selectList;
                            // this.agreeaddOrUpdateData.createForm[index].options = selectList;
                        } else if(item.type && item.type == 'radio') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else {
                            this.myForm[item.inputModel] = setForm[item.inputModel];
                        }
                    });
                    this.myForm.customerpool_id = this.agreeaddOrUpdateData.setForm.poolName
                    this.formid = this.agreeaddOrUpdateData.setForm.customerpool_id
                    this.myForm.opportunity_id = this.agreeaddOrUpdateData.setForm.opportunity_name
                    this.$emit('input', this.myForm);
                }
            },
            //加载已选择客户下的商机和联系人（客户决策人）
            loadOpp(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.customerpool_id = this.formid

                axios({
                    method:'post',
                    url: _this.$store.state.defaultHttp+'opportunity/getOpportunityAll.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.oppoptions = res.data
                }).catch(function(err){
                    // console.log(err)
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getPoolContactsName.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.contactslist = res.data.map.success
                    _this.contactslist.forEach(el => {
                        if(_this.myForm.signatories == el.name){
                            _this.myForm.signatories = el.id
                        }
                    });
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadfield(){
                const _this = this
                let qs =require('querystring')
                let aval = null
                let bval = null
                if(this.agreeaddOrUpdateData.submitData) {
                    aval = this.agreeaddOrUpdateData.submitData.id;
                    bval = this.agreeaddOrUpdateData.submitData.batch_id;
                }
                let data = {
                    label: 6,
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
                        if(_this.agreeaddOrUpdateData.submitData){
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
                    _this.tableData = res.data.map.success.customerpools
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleInput(val, key) {
                this.myForm[key] = val;
            },
            handlechange(val,key){
                this.myForm[key] = val
                let arr = val.split('-')
                let year = parseInt(arr[0]) + 1
                let month = arr[1]
                let day = arr[2]
                this.myForm.end_date = year + '-' + month + '-' + day
            },
            //获取table的索引和行数据，当该行被点击时，将公司名称地址填充到表单
            getRow(index,row){
                this.formid = row.id
                this.myForm.customerpool_id = row.name
                this.loadOpp()
            },
            handleoninput(val,key){
                const _this = this
                this.myForm[key] = val
                this.searchvalue = val
                this.loadTable()
            },
            handleblur(e,key){
                let val = e.target.value
                this.tableData.forEach(el => {
                    if(val == el.name){
                        this.formid = el.id
                        this.loadOpp()
                    }
                });
            },
            handleopp(val,key){
                this.oppoptions.forEach(el => {
                    if(val == el.opportunity_id){
                        this.myForm.amount = el.opportunity_achievement
                        this.myForm.orderId = el.orderId
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
                    return
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
                if(_this.agreeaddOrUpdateData.submitData) {
                    entity.contract_id = _this.agreeaddOrUpdateData.submitData.id;
                    entity.batch_id = _this.agreeaddOrUpdateData.submitData.batch_id;
                }else{
                    entity.orderId = this.myForm.orderId
                }
                let createForm = _this.agreeaddOrUpdateData.createForm;
                let fieldData = _this.previewData
                let fieldArr = new Array()

                let flag = false;
                createForm.forEach(item => {
                    entity[item.inputModel] = _this.myForm[item.inputModel];
                    if(item.inputModel == "our_signatories" && !entity[item.inputModel]) {
                        _this.$message({
                            message: "我方签约人不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "signatories" && !entity[item.inputModel]) {
                        _this.$message({
                            message: "客户签约人不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "end_date" && !entity[item.inputModel]) {
                        _this.$message({
                            message: "合同结束日期不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "start_date" && !entity[item.inputModel]) {
                        _this.$message({
                            message: "合同开始日期不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "amount" && !entity[item.inputModel]) {
                        _this.$message({
                            message: "合同金额不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "customerpool_id" && !entity[item.inputModel]) {
                        _this.$message({
                            message: "客户不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "contract_type" && !entity[item.inputModel]) {
                        _this.$message({
                            message: "合同类型不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "contract_name" && !entity[item.inputModel]) {
                        _this.$message({
                            message: "合同名称不能为空",
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
                entity.customerpool_id = this.formid
                if(entity.our_signatories == this.$store.state.user){
                    entity.our_signatories = this.$store.state.ispId
                }else{
                    entity.our_signatories = this.our_signatoriesId
                }

                let subData = {
                    entity: entity,
                    field: fieldData
                }

                this.isDisable = true

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'contract/saveOrUpdate.do?cId='+_this.$store.state.iscId,
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
                if(_this.agreeaddOrUpdateData.submitData) {
                    subData.contract_id = _this.agreeaddOrUpdateData.submitData.id;
                    subData.csId = _this.agreeaddOrUpdateData.submitData.csId;
                }else{
                    subData.orderId = this.myForm.orderId
                }
                subData.secondid = this.$store.state.deptid
                subData.deptid = this.$store.state.insid

                let createForm = _this.agreeaddOrUpdateData.createForm;
                let flag = false;
                createForm.forEach(item => {
                    subData[item.inputModel] = _this.myForm[item.inputModel];
                    if(item.inputModel == "our_signatories" && !subData[item.inputModel]) {
                        _this.$message({
                            message: "我方签约人不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "signatories" && !subData[item.inputModel]) {
                        _this.$message({
                            message: "客户签约人不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "end_date" && !subData[item.inputModel]) {
                        _this.$message({
                            message: "合同结束日期不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "start_date" && !subData[item.inputModel]) {
                        _this.$message({
                            message: "合同开始日期不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "amount" && !subData[item.inputModel]) {
                        _this.$message({
                            message: "合同金额不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "customerpool_id" && !subData[item.inputModel]) {
                        _this.$message({
                            message: "客户不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "contract_type" && !subData[item.inputModel]) {
                        _this.$message({
                            message: "合同类型不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "contract_name" && !subData[item.inputModel]) {
                        _this.$message({
                            message: "合同名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return;
                subData.customerpool_id = this.formid
                if(subData.our_signatories == this.$store.state.user){
                    subData.our_signatories = this.$store.state.ispId
                }else{
                    subData.our_signatories = this.our_signatoriesId
                }

                this.isDisable = true

                axios({
                    method: 'post',
                    url: _this.agreeaddOrUpdateData.submitURL,
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
                    // _this.$message.error("提交失败，请重新提交");
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
                    delItem.path === this.$route.fullPath && this.$router.push('/agreement');
                }else{
                    this.$router.push('/index');
                }
            },
        }
        
    }
</script>
