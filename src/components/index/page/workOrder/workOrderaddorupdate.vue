<template>
    <div class="wo_aou">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="bold_span">服务工单</span>
            </div>
            <div class="orderHead">
                <el-form :inline="true" ref="myform" :model="myform" :rules="rules">
                    <el-form-item prop="customerpoolId" class="first_input" label="客户名称" label-width="90px">
                        <el-select v-model="myform.customerpoolId" placeholder="请选择客户名称" class="inputbox" filterable @change="selectCustomer">
                            <el-option v-for="item in customerList" :key="item.id" :label="item.pName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="contactId" class="first_input" label="联系人" label-width="90px">
                        <el-select v-model="myform.contactId" placeholder="请选择联系人" class="inputbox" @change="selectContact">
                            <el-option v-for="item in contactsList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone" class="first_input" label="电话" label-width="90px">
                        <el-input v-model="myform.phone" class="inputbox" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                    </el-form-item>
                    <el-form-item prop="feedbackType" class="first_input" label="反馈方式" label-width="90px">
                        <el-select v-model="myform.feedbackType" placeholder="请选择反馈方式" class="inputbox">
                            <el-option v-for="item in feedbackTypeList" :key="item.index" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="first_input" label="受理人" label-width="90px">
                        <el-select v-model="myform.acceptance" placeholder="请选择受理人" class="inputbox">
                            <el-option v-for="item in acceptanceList" :key="item.private_id" :label="item.private_employee" :value="item.private_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="first_input" label="工单类型" label-width="90px">
                        <el-input v-model="myform.serviceTypeName" class="inputbox" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item class="first_input" label="销售单号" label-width="90px">
                        <el-select v-model="myform.orderId" placeholder="请选择销售单号" class="inputbox">
                            <el-option v-for="item in orderList" :key="item.id" :label="item.orderNo" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item v-for="item in previewData" :key="item.id" :label="item.name" :prop="item.field_name" label-width="90px" class="first_input" style="margin-right:15px">
                        <el-input v-if="item.formType == 'text' || item.formType == 'email'" v-model="item.default_value" :placeholder="item.input_tips" class="inputbox"></el-input>

                        <el-input v-else-if="item.formType == 'textarea'" type="textarea" :maxlength="item.max_length" v-model="item.default_value" :placeholder="item.input_tips" class="inputbox"></el-input>

                        <el-input v-else-if="item.formType == 'number'" onkeyup= "value=value.replace(/[^\d]/g,'')" v-model="item.default_value" :placeholder="item.input_tips" class="inputbox"></el-input>

                        <el-input v-else-if="item.formType == 'floatnumber'" onkeyup= "value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" v-model="item.default_value" :placeholder="item.input_tips" class="inputbox"></el-input>

                        <el-input v-else-if="item.formType == 'mobile'" onkeyup= "value=value.replace(/[^\d]/g,'')" :maxlength="11" v-model="item.default_value" :placeholder="item.input_tips" class="inputbox"></el-input>

                        <el-select v-else-if="item.formType == 'select'" v-model="item.default_value" :placeholder="item.input_tips" class="inputbox">
                            <el-option v-for="o in item.setting" :key="o" :label="o" :value="o"></el-option>
                        </el-select>

                        <el-select v-else-if="item.formType == 'checkbox'" multiple v-model="item.default_value" :placeholder="item.input_tips" class="inputbox">
                            <el-option v-for="o in item.setting" :key="o" :label="o" :value="o"></el-option>
                        </el-select>

                        <el-select v-else-if="item.formType == 'user'" v-model="item.default_value" :placeholder="item.input_tips" class="inputbox">
                            <el-option v-for="o in userData" :key="o.private_id" :label="o.private_employee" :value="o.private_id"></el-option>
                        </el-select>

                        <el-select v-else-if="item.formType == 'structure'" v-model="item.displayVal" :placeholder="item.input_tips" class="noPadding_select inputbox">
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

                        <el-date-picker v-else-if="item.formType == 'date'" v-model="item.default_value" type="date" :placeholder="item.input_tips" class="inputbox"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                        </el-date-picker>

                        <el-date-picker v-else-if="item.formType == 'datetime'" v-model="item.default_value" type="datetime" :placeholder="item.input_tips" class="inputbox"
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                        
                        <el-upload v-else-if="item.formType == 'file'" class="upload-demo" :action="doUpload" :on-success="uploadSuccess" :before-upload="beforeUpload">
                            <el-button size="mini" type="info-btn">上传</el-button>
                            <div slot="tip" class="el-upload__tip" style="margin-top: -20px">{{item.input_tips}}</div>
                        </el-upload>
                    </el-form-item>


                    <br>
                    <el-form-item prop="problem" class="first_input" label="问题名称" label-width="90px">
                        <el-input v-model="myform.problem" style="width:610px;"></el-input>
                    </el-form-item>
                    <br>
                    <el-form-item prop="describe" class="first_input" label="问题描述" label-width="90px">
                        <div class="editor-container editor_head">
                            <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <el-form :inline="true" class="disabledForm">
                <el-form-item label="制单人" label-width="110px">
                    <el-input v-model="myform.user" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="负责人" label-width="110px">
                    <el-input v-model="myform.ascription" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="部门" label-width="110px">
                    <el-input v-model="myform.department" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="机构" label-width="110px">
                    <el-input v-model="myform.mechanism" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
        </el-card>

        
        
        <div class="submit_btn">
            <el-button type="primary" :disabled="isDisable" @click="onSubmit" style="margin-right:100px;">立即提交</el-button>
            <el-button @click="closeTag">取消</el-button>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    import UE from '../../ue.vue'

    export default {
        store,
        components: {UE},
        data(){
            return{
                msg:'新增工单',
                workOrderaddorUpdateData:null,

                myform:{
                    id:null,
                    batch_id:null,
                    customerpoolId:null,
                    contactId:null,
                    phone:null,
                    feedbackTime:null,
                    feedbackType:null,//反馈方式
                    acceptance:null,//受理人
                    serviceType:null,//工单类型ID
                    serviceTypeName:null,//工单类型
                    orderId:null,
                    problem:null,
                    describe:null,
                    user:this.$store.state.user,
                    ascriptionId:null,
                    ascription:null,
                    secondid:null,
                    department:null,
                    deptid:null,
                    mechanism:null,
                    enclosures:[],
                    enclosureOldNames:[],
                },
                rules:{
                    customerpoolId : [{ required: true, message: '客户名称不能为空', trigger: 'blur' },],
                    contactId : [{ required: true, message: '联系人名称不能为空', trigger: 'blur' },],
                    phone : [{ required: true, message: '电话不能为空', trigger: 'blur' },],
                    feedbackType : [{ required: true, message: '反馈方式不能为空', trigger: 'blur' },],
                    problem : [{ required: true, message: '问题名称不能为空', trigger: 'blur' },],
                    describe : [{ required: true, message: '问题描述不能为空', trigger: 'blur' },],
                },
                customerId:null,
                customerName:null,

                customerList:[],
                contactsList:[],
                feedbackTypeList:[
                    {index:1,name:'电话'},
                    {index:2,name:'QQ'},
                    {index:3,name:'微信'},
                    {index:4,name:'邮箱'},
                    {index:5,name:'上门'},
                ],
                acceptanceList:[],
                orderList:[],

                fileList:[],
                doUpload:this.$store.state.defaultHttp + 'workOrder/upload.do?cId=' + this.$store.state.iscId,

                isDisable:false,

                activeName:'first',
                defaultMsg: '',
                config: {
                    initialFrameWidth: 610,
                    initialFrameHeight: 500,
                    toolbars:[[
                        'undo', 'redo', '|', 'fontsize',
                        'bold', 'italic', 'underline', 'forecolor', '|',
                        'insertorderedlist', 'insertunorderedlist', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                        'insertimage', 'attachment', '|',
                        'imagenone', 'imageleft', 'imageright', 'imagecenter',
                    ]],
                    elementPathEnabled:false,
                    wordCount:false,
                },

                fieldsform:{},
                previewData:[],

                deptData: [],
                
                defaultProps:{
                    label:'deptname',
                    children:'next',
                },

                userData: [],
            }
        },
        mounted(){
            this.loadData()
            this.loadContactandOrder()
            this.loadfield()
            this.loadUserandDept()
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                let info = this.$store.state.workOrderaddorUpdateData
                this.workOrderaddorUpdateData = info
                console.log(info)
                
                if(info.customerpoolId){
                    this.customerId = info.customerpoolId
                    this.customerName = info.customerpool
                    this.myform.id = info.id
                    this.myform.batch_id = info.batch_id
                    this.myform.customerpoolId = info.customerpoolId
                    this.myform.contactId = info.contactsId
                    this.myform.phone = info.phone
                    this.myform.feedbackType = info.feedbackType
                    this.myform.acceptance = info.acceptance
                    this.myform.serviceType = info.serviceType
                    this.myform.serviceTypeName = info.serviceTypeName
                    this.myform.orderId = info.orderNo
                    this.myform.problem = info.problem
                    this.myform.describe = info.describe
                    this.myform.user = info.private_employee
                    this.myform.ascriptionId = info.ascriptionId
                    this.myform.ascription = info.ascription
                    this.myform.secondid = info.secondid
                    this.myform.department = info.deptname
                    this.myform.deptid = info.deptid
                    this.myform.mechanism = info.parentname
                    this.myform.enclosures = info.enclosures
                    this.myform.enclosureOldNames = info.enclosureOldNames
                    this.defaultMsg = info.describe
                    // this.$options.methods.loadList.bind(this)()
                }else{
                    this.myform.serviceTypeName = this.$store.state.workOrderaddorUpdateData.name
                    this.myform.serviceType = this.$store.state.workOrderaddorUpdateData.id
                }
                
                let data = {}
                data.page = 1
                data.limit = 1000000

                //获取所有客户
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerpool/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data),
                }).then(function(res){
                    _this.customerList = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });

                //获取所有受理人
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'customerTwo/getNameAndId.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.acceptanceList = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
                
            },
            loadContactandOrder(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.customerpool_id = this.customerId
                let data2 = {}
                data2.searchName = this.customerName
                data2.page = 1
                data2.limit = 100000

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getPoolContactsName.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.contactsList = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'order/selectOrderList.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data2)
                }).then(function(res){
                    _this.orderList = res.data.map.orders
                }).catch(function(err){
                    // console.log(err);
                });
            },
            
            loadfield(){
                const _this = this
                let qs =require('querystring')
                let aval = null
                let bval = null
                if(this.workOrderaddorUpdateData.customerpoolId) {
                    aval = this.workOrderaddorUpdateData.id;
                    bval = this.workOrderaddorUpdateData.batch_id;
                }
                let data = {
                    label: 11,
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
                        if(_this.workOrderaddorUpdateData.customerpoolId){
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

            selectCustomer(e){
                this.customerId = e
                this.customerList.forEach(el => {
                    if(el.id == e){
                        this.myform.ascriptionId = el.privateUser[0].private_id
                        this.myform.ascription = el.privateUser[0].private_employee
                        this.myform.secondid = el.secondid
                        this.myform.department = el.deptname
                        this.myform.deptid = el.deptid
                        this.myform.mechanism = el.parentname
                        this.customerName = el.pName
                    }
                });
                this.$options.methods.loadContactandOrder.bind(this)()
            },
            selectContact(val){
                this.contactsList.forEach(el => {
                    if(el.id == val){
                        this.myform.phone = el.phone
                    }
                });
            },
            loadList(){
                this.fileList = []
                let arr = this.myform.enclosures
                let arr2 = this.myform.enclosureOldNames
                arr.forEach((a,i) => {
                    this.fileList.push({url:this.$store.state.systemHttp + 'upload/' + this.$store.state.iscId + '/' + a,name:'',response:a})
                });
                arr2.forEach((b,j) => {
                    this.fileList.forEach((c,k) => {
                        if(j == k){
                            c.name = b
                        }
                    });
                });
            },
            handleAvatarSuccess(res, file, fileList) {
                this.myform.enclosures = []
                this.myform.enclosureOldNames = []
                fileList.forEach(el => {
                    this.myform.enclosures.push(el.response)
                    this.myform.enclosureOldNames.push(el.name)
                });
            },
            handleRemove(file, fileList) {
                this.myform.enclosures = []
                this.myform.enclosureOldNames = []
                fileList.forEach(el => {
                    this.myform.enclosures.push(el.response)
                    this.myform.enclosureOldNames.push(el.name)
                });
                
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
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
            onSubmit(){
                const _this = this
                let content = this.$refs.ue.getUEContent()
                let qs = require('querystring')
                let fieldData = _this.previewData
                let data = {
                    "id":this.myform.id,
                    "batch_id":this.myform.batch_id,
                    "customerpoolId" : this.customerId,
                    "contactsId" : this.myform.contactId,
                    "phone" : this.myform.phone,
                    "feedbackType" : this.myform.feedbackType,
                    "acceptance" : this.myform.acceptance,
                    "serviceType" : this.myform.serviceType,
                    "orderId" : this.myform.orderId,
                    "problem" : this.myform.problem,
                    "describe" : content,
                    "enclosures" : this.myform.enclosures,
                    "enclosureOldNames" : this.myform.enclosureOldNames,
                    "pId" : this.$store.state.ispId,
                    "ascriptionId" : this.myform.ascriptionId,
                    "secondid" : this.myform.secondid,
                    "deptid" : this.myform.deptid,
                }

                let flag = false
                if(!data.customerpoolId) {
                    _this.$message({
                        message: "客户名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.contactsId) {
                    _this.$message({
                        message: "联系人不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.phone) {
                    _this.$message({
                        message: "电话不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.feedbackType) {
                    _this.$message({
                        message: "反馈方式不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.problem) {
                    _this.$message({
                        message: "问题名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.describe) {
                    _this.$message({
                        message: "问题描述不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                
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
                if(flag) return

                let subData = {
                    entity: data,
                    field: fieldData
                }
                
                this.isDisable = true

                axios({
                    method: 'post',
                    url: this.$store.state.defaultHttp + 'workOrder/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data: subData
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'操作成功',
                            type:'success'
                        })
                        _this.closeTag()
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                        _this.isDisable = false
                    }
                }).catch(function(err){
                    _this.isDisable = false
                });
            },
            closeTag(){
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
                    delItem.path === this.$route.fullPath && this.$router.push('/workOrder');
                }else{
                    this.$router.push('/index');
                }
            },
        },
    }
</script>

<style>
    .wo_aou{
        margin-bottom: 60px;
    }
    .jobclass_enclosure{
        width: 100%;
        min-height: 80px;
        padding: 20px 40px;
    }
    /* .jobclass_upload .el-upload-list__item-status-label,
    .jobclass_upload .el-upload-list__item .el-icon-close,
    .jobclass_upload .el-upload-list__item .el-icon-close-tip{
        left: 500px;
        right: auto;
    } */
    .jobclass_upload .el-upload-list__item{
        width: 60%;
    }
</style>


