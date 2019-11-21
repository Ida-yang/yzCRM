<template>
    <!-- 审核单新增修改 -->
    <div class="addorupdatecontent">
        <span class="marginSpan">新增{{myForm.category_name}}审核</span>
        <el-form :model="myForm" ref="myForm" class="field_form_input" :inline="true" :rules="rules" label-width="130px">
            <!-- <el-form-item label="审核类型">
                <el-input v-model="myForm.category_name" disabled style="width:30vw"></el-input>
            </el-form-item> -->
            <el-form-item v-for="item in previewData" :key="item.id" :label="item.name" :prop="item.field_name" label-width="130px">
                <el-input v-if="item.formType == 'text' || item.formType == 'email'" v-model="item.default_value" :placeholder="item.input_tips" style="width:30vw"></el-input>

                <el-input v-else-if="item.formType == 'textarea'" type="textarea" :maxlength="item.max_length" v-model="item.default_value" :placeholder="item.input_tips" style="width:30vw"></el-input>

                <el-input v-else-if="item.formType == 'number'" onkeyup= "value=value.replace(/[^\d]/g,'')" v-model="item.default_value" :placeholder="item.input_tips" style="width:30vw"></el-input>

                <el-input v-else-if="item.formType == 'floatnumber' || item.formType == 'budget' || item.formType == 'amount'" onkeyup= "value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" v-model="item.default_value" :placeholder="item.input_tips" style="width:30vw"></el-input>

                <el-input v-else-if="item.formType == 'mobile'" onkeyup= "value=value.replace(/[^\d]/g,'')" :maxlength="11" v-model="item.default_value" :placeholder="item.input_tips" style="width:30vw"></el-input>

                <el-select v-else-if="item.formType == 'select'" v-model="item.default_value" :placeholder="item.input_tips" style="width:30vw">
                    <el-option v-for="o in item.setting" :key="o" :label="o" :value="o"></el-option>
                </el-select>

                <el-select v-else-if="item.formType == 'checkbox'" multiple v-model="item.default_value" :placeholder="item.input_tips" style="width:30vw">
                    <el-option v-for="o in item.setting" :key="o" :label="o" :value="o"></el-option>
                </el-select>

                <el-select v-else-if="item.formType == 'user'" v-model="item.default_value" :placeholder="item.input_tips" style="width:30vw">
                    <el-option v-for="o in userData" :key="o.private_id" :label="o.private_employee" :value="o.private_id"></el-option>
                </el-select>

                <el-select v-else-if="item.formType == 'customer'" filterable v-model="item.default_value" :placeholder="item.input_tips" @change="handleChange($event,item)" style="width:30vw">
                    <el-option v-for="o in customerList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                </el-select>

                <el-select v-else-if="item.formType == 'structure'" v-model="item.displayVal" :placeholder="item.input_tips" style="width:30vw" class="noPadding_select">
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
                    format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:30vw">
                </el-date-picker>

                <el-date-picker v-else-if="item.formType == 'datetime'" v-model="item.default_value" type="datetime" :placeholder="item.input_tips" 
                    format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width:30vw">
                </el-date-picker>
                
                <el-upload v-else-if="item.formType == 'file'" class="upload-demo" :action="doUpload" :on-success="uploadSuccess" :before-upload="beforeUpload">
                    <el-button size="mini" type="info-btn">上传</el-button>
                    <div slot="tip" class="el-upload__tip" style="margin-top: -20px">{{item.input_tips}}</div>
                </el-upload>
            </el-form-item>
            <br>
            <el-form-item prop="image" label="图片">
                <el-upload
                    class="image-uploader"
                    :action="doUpload"
                    :show-file-list="false"
                    :on-success="imageuploadSuccess"
                    :before-upload="beforeUpload">
                    <img v-if="myForm.image" :src="imageUrl" class="image_avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <br>
            <el-form-item prop="file" label="附件">
                <el-upload class="upload-demo" :file-list="fileList" :action="doUpload" :on-success="fileuploadSuccess" :before-upload="beforeUpload">
                    <el-button size="mini" type="info-btn">上传</el-button>
                    <div slot="tip" class="el-upload__tip" style="margin-top: -20px">文件大小不超过5Mb</div>
                </el-upload>
            </el-form-item>
            <br>
            
            <el-form-item label="制单人">
                <el-input v-model="myForm.private_employee" disabled style="width:30vw"></el-input>
            </el-form-item>
            <el-form-item label="部门">
                <el-input v-model="myForm.deptname" disabled style="width:30vw"></el-input>
            </el-form-item>
            <el-form-item label="机构" disabled>
                <el-input v-model="myForm.parentname" style="width:30vw"></el-input>
            </el-form-item>
        </el-form>
        
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
                examineaddOrUpdateData: {},
                myForm: {
                    categoryId:null,
                    category_name:null,
                    private_employee:null,
                    deptname:null,
                    parentname:null,
                    image:null,
                    file:null,
                },
                imageUrl:null,
                fileList:[],

                page: 1,//默认第一页
                limit: 15,//默认15条

                rules: {
                    our_signatories : [{ required: true, message: '我方签约人不能为空', trigger: 'blur' },],
                },

                customerList:null,
                searchvalue:null,

                isDisable:false,
                
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
        },
        methods:{
            //加载或重载页面
            loadData() {
                let info = this.$store.state.examineaddOrUpdateData
                this.examineaddOrUpdateData = info
                
                if(info.batch_id){
                    this.myForm = {
                        categoryId: info.category_id,
                        category_name: info.category,
                        private_employee: info.private_employee,
                        deptname: info.deptname,
                        parentname: info.parentname,
                        image: info.image,
                        file: null,
                    }
                    if(info.file){
                        let val = JSON.parse(info.file)
                        this.myForm.file = val.response
                        this.fileList = [{url:this.$store.state.systemHttp + 'upload/' + this.$store.state.iscId + '/' + val.response,name:val.name,response:val.response}]
                    }
                    this.imageUrl = this.$store.state.systemHttp + 'upload/' + this.$store.state.iscId + '/' + info.image
                }else{
                    this.myForm = {
                        categoryId: info.id,
                        category_name: info.title,
                        private_employee: this.$store.state.user,
                        deptname: this.$store.state.deptname,
                        parentname: this.$store.state.parentname,
                        image: null,
                        file: null,
                    }
                }

                
                this.loadfield()
                this.loadUserandDept()
                this.loadCustomer()
            },
            loadfield(){
                const _this = this
                let qs =require('querystring')
                let aval = null
                let bval = null
                let cval = null
                if(this.examineaddOrUpdateData.batch_id) {
                    aval = this.examineaddOrUpdateData.id;
                    bval = this.examineaddOrUpdateData.batch_id;
                    cval = this.examineaddOrUpdateData.category_id
                }else{
                    cval = this.examineaddOrUpdateData.id
                }
                let data = {
                    label: 10,
                    // id: aval,
                    batch_id: bval,
                    categoryId: cval,
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'field/queryField.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data),
                }).then(function(res){
                    let info = res.data

                    info.forEach((el,i) => {
                        el.displayVal = ''
                        if(_this.examineaddOrUpdateData.batch_id){
                            el.default_value = el.value
                            if(el.formType == 'user' || el.formType == 'structure'){
                                el.displayVal = el.deptOrUserName
                                el.default_value = parseInt(el.value)
                            }else if(el.formType == 'customer'){
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
            loadCustomer(){
                const _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = 1;
                pageInfo.limit = 20;
                pageInfo.pId = this.$store.state.ispId;
                pageInfo.searchName = this.searchvalue
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'rightPoolName.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    _this.customerList = res.data.map.success.customerpools
                }).catch(function(err){
                    // console.log(err);
                });
            },
            
            handleChange(e,val){
                this.customerList.forEach(el => {
                    if(el.id == e){
                        this.previewData.forEach(b => {
                            if(b.id == val.id){
                                b.displayVal = el.name
                                b.default_value = e
                            }
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
                    this.$message.warning('大小不能超过 5MB!')
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
            imageuploadSuccess(res,file,fileList){
                console.log(res,file,fileList)
                this.myForm.image = res
                this.imageUrl = URL.createObjectURL(file.raw)
            },
            fileuploadSuccess(res,file,fileList){
                console.log(res,file,fileList)
                let val = {
                    name: file.name,
                    response: file.response
                }
                this.myForm.file = JSON.stringify(val)
                console.log({name:this.myForm.file})
            },
            //提交或修改
            submit() {
                const _this = this;
                let qs =require('querystring')
                let entity = {
                    categoryId: this.myForm.categoryId,
                    pid: parseInt(this.$store.state.ispId),
                    secondid: parseInt(this.$store.state.deptid),
                    deptid: parseInt(this.$store.state.insid),
                    image: this.myForm.image,
                    file: this.myForm.file,
                    id: null,
                    batch_id: null,
                };
                if(_this.examineaddOrUpdateData.batch_id) {
                    entity.id = _this.examineaddOrUpdateData.id;
                    entity.batch_id = _this.examineaddOrUpdateData.batch_id;
                }
                let fieldData = _this.previewData
                let fieldArr = new Array()

                let flag = false;
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

                let subData = {
                    oaExamine: entity,
                    field: fieldData
                }

                console.log(subData)

                this.isDisable = true

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'oaExamine/saveOrUpdate.do?cId='+_this.$store.state.iscId,
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
                    delItem.path === this.$route.fullPath && this.$router.push('/examine');
                }else{
                    this.$router.push('/index');
                }
            },
        }
        
    }
</script>

<style>
    .marginSpan{
        margin: 0 0 20px 40px;
        display: block
    }
    .image-uploader .el-upload--text{
        width: 180px
    }
    .image-uploader .el-upload--text .el-icon-plus{
        line-height: 173px
    }
    .image_avatar{
        width: 180px;
        height: 180px
    }
    
    .field_form_input .el-input.is-disabled .el-input__inner, .field_form_input .el-textarea.is-disabled .el-textarea__inner{
        background-color: #fff;
        color: #606266;
        border-color: #dcdfe6;
        cursor: initial
    }
</style>
