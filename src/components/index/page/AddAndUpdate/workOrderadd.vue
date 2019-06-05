<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="font-weight:bold">服务工单</span>
            </div>
            <div class="orderHead">
                <el-form :inline="true" ref="myform" :model="myform" :rules="rules">
                    <el-form-item prop="customerpoolId" class="first_input" label="公司名称" label-width="90px">
                        <el-select v-model="myform.customerpoolId" placeholder="请选择公司名称" class="inputbox" filterable @change="selectCustomer">
                            <el-option v-for="item in customerList" :key="item.id" :label="item.pName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="first_input" label="联系人" label-width="90px">
                        <el-select v-model="myform.contactId" placeholder="请选择联系人" class="inputbox">
                            <el-option v-for="item in contactsList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="first_input" label="电话" label-width="90px">
                        <el-input v-model="myform.phone" class="inputbox" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                    </el-form-item>
                    <el-form-item prop="feedbackTime" class="first_input" label="反馈时间" label-width="90px">
                        <el-date-picker v-model="myform.feedbackTime" type="datetime" placeholder="选择反馈时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" default-time="12:00:00" class="inputbox"></el-date-picker>
                    </el-form-item>
                    <el-form-item class="first_input" label="反馈方式" label-width="90px">
                        <el-select v-model="myform.feedbackMode" placeholder="请选择反馈方式" class="inputbox">
                            <el-option v-for="item in feedbackModeList" :key="item.index" :label="item.name" :value="item.index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="first_input" label="受理人" label-width="90px">
                        <el-select v-model="myform.resTaxOfficer" placeholder="请选择受理人" class="inputbox">
                            <el-option v-for="item in resTaxOfficerList" :key="item.private_id" :label="item.private_employee" :value="item.private_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="first_input" label="工单类型" label-width="90px">
                        <el-input v-model="myform.workOrderType" class="inputbox" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item class="first_input" label="销售单号" label-width="90px">
                        <el-input v-model="myform.salenNo" class="inputbox"></el-input>
                    </el-form-item>
                    <el-form-item class="first_input" label="问题名称" label-width="90px">
                        <el-input v-model="myform.problem" class="inputbox"></el-input>
                    </el-form-item>
                    <el-form-item class="first_input" label="备注" label-width="90px">
                        <el-input type="textarea" rows="5" v-model="myform.remarks" class="inputbox"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        
        <div class="jobclass_enclosure">
            <!-- <span class="nameList">上传附件</span> -->
            <el-upload class="upload-demo" :action="doUpload" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                <el-button size="small">上传附件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传3个大小不超过5M的附件，支持格式JPG，JPEG，PNG，TXT，DOC，DOCX，XLS，XLSX，PDF</div>
            </el-upload>
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

    export default {
        store,
        data(){
            return{
                msg:'新增工单',
                workOrderaddData:null,

                myform:{
                    customerpoolId:null,
                    contactId:null,
                    phone:null,
                    feedbackTime:null,
                    feedbackMode:null,//反馈方式
                    resTaxOfficer:null,//受理人
                    workOrderType:null,//工单类型
                    salenNo:null,
                    problem:null,
                    remarks:null,
                    user:this.$store.state.user,
                    ascription:null,
                    department:null,
                    mechanism:null,
                    enclosures:[],
                },
                rules:{},
                customerId:null,

                customerList:[],
                contactsList:[],
                feedbackModeList:[
                    {index:1,name:'电话'},
                    {index:2,name:'QQ'},
                    {index:3,name:'微信'},
                    {index:4,name:'邮箱'},
                    {index:5,name:'上门'},
                ],
                resTaxOfficerList:[],

                fileList:[],
                doUpload:this.$store.state.defaultHttp + 'goods/masterGraph.do?cId=' + this.$store.state.iscId,

                isDisable:false
            }
        },
        mounted(){
            this.loadData()
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                this.workOrderaddData = this.$store.state.workOrderaddData
                this.myform.workOrderType = this.$store.state.workOrderaddData.name
                
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
                    url: _this.$store.state.defaultHttp+'getNameAndId.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.resTaxOfficerList = res.data
                }).catch(function(err){
                    // console.log(err);
                });
                
            },
            loadContact(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.customerpool_id = this.customerId

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getPoolContactsName.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.contactsList = res.data.map.success
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
                        this.myform.department = el.deptname
                        this.myform.mechanism = el.parentname
                    }
                });
                this.$options.methods.loadContact.bind(this)()
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            onSubmit(){
                console.log(this.myform)
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
    .jobclass_enclosure{
        width: 100%;
        min-height: 80px;
        /* height: 150px; */
        /* background-color: #f0f0f0; */
        padding: 20px 40px;
    }
</style>


