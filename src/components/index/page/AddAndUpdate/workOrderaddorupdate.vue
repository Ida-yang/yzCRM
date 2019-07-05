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
                <el-form-item label="制单人" label-width="90px">
                    <el-input v-model="myform.user" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="负责人" label-width="90px">
                    <el-input v-model="myform.ascription" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="部门" label-width="90px">
                    <el-input v-model="myform.department" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="机构" label-width="90px">
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

                submitURL:null,
            }
        },
        mounted(){
            this.loadData()
            this.loadContactandOrder()
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                this.workOrderaddorUpdateData = this.$store.state.workOrderaddorUpdateData.setform
                this.submitURL = this.$store.state.workOrderaddorUpdateData.submitUrl
                if(this.workOrderaddorUpdateData.customerpoolId){
                    this.customerId = this.workOrderaddorUpdateData.customerpoolId
                    this.customerName = this.workOrderaddorUpdateData.customerpool
                    this.myform.id = this.workOrderaddorUpdateData.id
                    this.myform.customerpoolId = this.workOrderaddorUpdateData.customerpoolId
                    this.myform.contactId = this.workOrderaddorUpdateData.contactsId
                    this.myform.phone = this.workOrderaddorUpdateData.phone
                    this.myform.feedbackType = this.workOrderaddorUpdateData.feedbackType
                    this.myform.acceptance = this.workOrderaddorUpdateData.acceptance
                    this.myform.serviceType = this.workOrderaddorUpdateData.serviceType
                    this.myform.serviceTypeName = this.workOrderaddorUpdateData.serviceTypeName
                    this.myform.orderId = this.workOrderaddorUpdateData.orderNo
                    this.myform.problem = this.workOrderaddorUpdateData.problem
                    this.myform.describe = this.workOrderaddorUpdateData.describe
                    this.myform.user = this.workOrderaddorUpdateData.private_employee
                    this.myform.ascriptionId = this.workOrderaddorUpdateData.ascriptionId
                    this.myform.ascription = this.workOrderaddorUpdateData.ascription
                    this.myform.secondid = this.workOrderaddorUpdateData.secondid
                    this.myform.department = this.workOrderaddorUpdateData.deptname
                    this.myform.deptid = this.workOrderaddorUpdateData.deptid
                    this.myform.mechanism = this.workOrderaddorUpdateData.parentname
                    this.myform.enclosures = this.workOrderaddorUpdateData.enclosures
                    this.myform.enclosureOldNames = this.workOrderaddorUpdateData.enclosureOldNames
                    this.defaultMsg = this.workOrderaddorUpdateData.describe
                    // this.$options.methods.loadList.bind(this)()
                }else{
                    this.myform.serviceTypeName = this.$store.state.workOrderaddorUpdateData.setform.name
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
            onSubmit(){
                const _this = this
                let content = this.$refs.ue.getUEContent()
                let qs = require('querystring')
                let data = {
                    "id":this.myform.id,
                    "customerpoolId" : this.customerId,
                    "contactsId" : this.myform.contactId,
                    "phone" : this.myform.phone,
                    "feedbackType" : this.myform.feedbackType,
                    "acceptance" : this.myform.acceptance,
                    "serviceType" : this.workOrderaddorUpdateData.id,
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
                if(flag) return
                
                this.isDisable = true

                axios({
                    method: 'post',
                    url: this.submitURL,
                    data: data
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


