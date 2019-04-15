<template>
    <!-- 合同新增修改 -->
    <div class="content">
        <el-form :model="myForm" ref="myForm" class="myForm" :rules="rules">
            <!-- <h3>{{agreeaddOrUpdateData.title}}</h3> -->
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
                    onkeyup = "value=value.replace(/[^\d]/g,'')"
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
                    <el-option v-for="item in oppoptions" :key="item.opportunity_id" :label="item.opportunity_name" :value="item.opportunity_id"></el-option>
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
                    <el-option v-for="item in contactslist" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-select 
                    v-else-if="item.inputModel == 'approverid'"
                    filterable
                    :multiple="item.multiple"
                    :collapse-tags="item.multiple"
                    v-model="myForm[item.inputModel]"
                    @change="handleInput($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    style="width:90%;">
                    <el-option v-for="item in pIdlist" :key="item.private_id" :label="item.private_employee" :value="item.private_id"></el-option>
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
            <div style="float:right;margin:20px 60px;">
                <el-button type="primary" :disabled="isDisable" @click="submit">立即提交</el-button>
                &nbsp;&nbsp;
                <el-button @click="closeTag">取消</el-button>
            </div>
        </el-form>
        <div class="line"></div>
        <div class="formlist">
            <el-table
                :data="tableData"
                border
                stripe
                :default-sort = "{order: 'ascending'}"
                max-height="580"
                style="text-align:center">
                <el-table-column
                    header-align="center"
                    align="center"
                    width="35">
                    <template slot-scope="scope">
                        <el-button style="width:15px;height:15px;padding:0;border-radius:50%;" @click="getRow(scope.$index,scope.row)">&nbsp;</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    header-align="left"
                    align="left"
                    min-width="80"
                    label="公司名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="address"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="公司地址"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="representative"
                    header-align="left"
                    align="left"
                    min-width="40"
                    label="法人"
                    sortable>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style>
    .content {
        width: 98%;
    }
    .myForm {
        width: 41%;;
        float: left;
    }
</style>

<script>
    import store from '../../../../store/store'
    import {mapState} from 'vuex'
    import axios from 'axios'
    import bus from '../../bus';
    export default {
        name:'agreementaddOrUpdate',
        data(){
            return {
                agreeaddOrUpdateData: {},
                myForm: {
                    start_date:null,
                    end_date:null,
                    customerpool_id:null,
                    signatories:null,
                },
                subData: {},
                oppoptions:null,
                contactslist:null,
                our_signatoriesId:null,

                page: 1,//默认第一页
                limit: 15,//默认10条

                rules: {
                    approverid : [{ required: true, message: '审核人不能为空', trigger: 'blur' },],
                    our_signatories : [{ required: true, message: '我方签约人不能为空', trigger: 'blur' },],
                    signatories : [{ required: true, message: '客户签约人不能为空', trigger: 'blur' },],
                    end_date : [{ required: true, message: '合同结束时间不能为空', trigger: 'blur' },],
                    start_date : [{ required: true, message: '合同开始时间不能为空', trigger: 'blur' },],
                    amount : [{ required: true, message: '合同金额不能为空', trigger: 'blur' },],
                    customerpool_id : [{ required: true, message: '客户不能为空', trigger: 'blur' },],
                    contract_type : [{ required: true, message: '合同类型不能为空', trigger: 'blur' },],
                    contract_name : [{ required: true, message: '合同名称不能为空', trigger: 'blur' },],
                    contract_number : [{ required: true, message: '合同编号不能为空', trigger: 'blur' },],
                },

                tableData:null,
                pIdlist:[],

                formid:null,
                searchvalue:null,

                isDisable:false
            }
        },
        // mounted() {
        //     this.loadData();
        //     this.loadOpp()
        // },
        activated() {
            this.loadData();
            this.loadTable()
            this.loadpId()
            this.loadOpp()
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
                    console.log(this.myForm)
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
                        // console.log(el.id,el.name)
                        if(_this.myForm.signatories == el.name){
                            // console.log('01010101')
                            _this.myForm.signatories = el.id
                        }
                    });
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
            loadpId(){
                const _this = this
                
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'getNameAndId.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.pIdlist = res.data
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
            //获取table的索引和行数据，当该行被点击时，将公司名称地址填充到表单（会刷新当前页面，之前填写的信息会被覆盖）
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
                    }
                });
            },
            //提交或修改
            submit() {
                const _this = this;
                let qs =require('querystring')
                let subData = {};
                if(_this.agreeaddOrUpdateData.submitData) {
                    subData.contract_id = _this.agreeaddOrUpdateData.submitData.id;
                    subData.csId = _this.agreeaddOrUpdateData.submitData.csId;
                }
                subData.secondid = this.$store.state.deptid
                subData.deptid = this.$store.state.insid

                let createForm = _this.agreeaddOrUpdateData.createForm;
                let flag = false;
                createForm.forEach(item => {
                    subData[item.inputModel] = _this.myForm[item.inputModel];
                    if(item.inputModel == "approverid" && !subData[item.inputModel]) {
                        _this.$message({
                            message: "审核人不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
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
                    if(item.inputModel == "contract_number" && !subData[item.inputModel]) {
                        _this.$message({
                            message: "合同编号不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "contract_type" && !subData[item.inputModel]) {//联系人名称不能为空
                        _this.$message({
                            message: "合同类型不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "contract_name" && !subData[item.inputModel]) {//公司名称不能为空
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
                    if(res.data && res.data == "success") {
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
                    this.isDisable = false
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
