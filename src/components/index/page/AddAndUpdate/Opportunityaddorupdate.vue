<template>
    <!-- 商机新增修改 -->
    <div class="content">
        <el-form :model="myForm" ref="myForm" class="myForm" :rules="rules">
            <!-- <h3>{{oppaddOrUpdateData.title}}</h3> -->
            <el-form-item
                label-width="110px"
                v-for="item in oppaddOrUpdateData.createForm"
                :label="item.label"
                :key="item.inputModel"
                :prop="item.inputModel">

                <el-input 
                    v-if="!item.type || item.type == 'input'"
                    :value="myForm[item.inputModel]"
                    @input="handleInput($event, item.inputModel)"
                    style="width:90%;" 
                    :disabled="item.disabled"
                    auto-complete="off">
                </el-input>
                <el-input 
                    v-if="item.type == 'textarea'"
                    type="textarea"
                    rows="5"
                    :value="myForm[item.inputModel]"
                    @input="handleInput($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off">
                </el-input>
                <el-input 
                    v-else-if="item.type && item.type == 'number'"
                    type="number"
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
                    v-else-if="item.type && item.type == 'select' && item.inputModel == 'contacts_id'"
                    :multiple="item.multiple"
                    :collapse-tags="item.multiple"
                    v-model="myForm[item.inputModel]"
                    @change="handleInput($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    style="width:90%;">
                    <el-option
                        v-for="o in contactslist"
                        :key="o.id"
                        :label="o.name"
                        :value="o.id">
                    </el-option>
                </el-select>
                <el-select 
                    v-else-if="item.type && item.type == 'select'"
                    :multiple="item.multiple"
                    :collapse-tags="item.multiple"
                    v-model="myForm[item.inputModel]"
                    @change="handleInput($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    style="width:90%;">
                    <el-option
                        v-for="o in item.options"
                        :key="o[item.okey]"
                        :label="o[item.olabel]"
                        :value="o[item.ovalue]">
                    </el-option>
                </el-select>
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
                <div v-else-if="item.type && item.type == 'radio'">
                    <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="是">是</el-radio>
                    <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="否">否</el-radio>
                </div>
            </el-form-item>
            <div style="margin-left:60px;">
                <el-button type="primary" @click="submit">立即提交</el-button>
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
    h3 {
        margin: 20px 60px;
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
        name:'Opportunityaddorupdate',
        store,
        data(){
            return {
                contactslist:null,
                oppaddOrUpdateData: {},
                myForm: {
                    customerpool_id:null
                },
                subData: {},
                page: 1,//默认第一页
                limit: 15,//默认10条
                rules: {
                    opportunity_number : [{ required: true, message: '商机编号不能为空', trigger: 'blur' },],
                    opportunity_name : [{ required: true, message: '商机名称不能为空', trigger: 'blur' },],
                    customerpool_id : [{ required: true, message: '关联客户不能为空', trigger: 'blur' },],
                    contacts_id : [{ required: true, message: '决策人不能为空', trigger: 'blur' },],
                    opportunity_achievement : [{ required: true, message: '预计成绩金额不能为空', trigger: 'blur' },],
                    opportunity_deal : [{ required: true, message: '预计成交时间不能为空', trigger: 'blur' },],
                },

                tableData:null,

                formid:null,
                searchvalue:null,
            }
        },
        // mounted(){
        //     this.loadData();
        //     this.loadcustomer();
        // },
        activated() {
            this.loadData();
            this.loadTable()
            this.loadcustomer()
        },
        methods:{
            //获取客户下拉框数据
            loadcustomer(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.customerpool_id = this.formid

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getPoolContactsName.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.contactslist = res.data.map.success
                }).catch(function(err){
                    console.log(err);
                });
                
            },
            //加载或重载页面
            loadData() {
                this.oppaddOrUpdateData = this.$store.state.oppaddOrUpdateData;

                // 设置默认值
                let createForm = this.oppaddOrUpdateData.createForm;
                let setForm = this.oppaddOrUpdateData.setForm;
                if(setForm) {
                    createForm.forEach((item, index) => {
                        if(item.type && item.type == 'select') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                            // let selectList = item.selectList;
                            // this.oppaddOrUpdateData.createForm[index].options = selectList;
                        } else if(item.type && item.type == 'radio') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else if(item.type && item.type == "date") {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else {
                            this.myForm[item.inputModel] = setForm[item.inputModel];
                        }
                    });
                    this.myForm.customerpool_id = this.oppaddOrUpdateData.setForm.customerpool_name
                    this.formid = this.oppaddOrUpdateData.setForm.customerpool_id
                    this.myForm.contacts_id = this.oppaddOrUpdateData.setForm.contacts_name
                    this.$emit('input', this.myForm);
                }
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
                    console.log(err);
                });
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
                        this.myForm.customerpool_id = el.name
                        this.loadcustomer()
                    }
                });
            },
            getRow(index,row){
                this.formid = row.id
                this.myForm.customerpool_id = row.name
                this.loadcustomer()
            },
            handleInput(val, key) {
                this.myForm[key] = val;
            },
            //提交或修改
            submit() {
                const _this = this;
                let qs =require('querystring')
                let subData = {};
                if(_this.oppaddOrUpdateData.submitData) {
                    subData.opportunity_id = this.oppaddOrUpdateData.submitData.id
                }
                let createForm = _this.oppaddOrUpdateData.createForm;
                let flag = false;
                createForm.forEach(item => {
                    subData[item.inputModel] = _this.myForm[item.inputModel];
                    subData.customerpool_id = this.formid
                    if(item.inputModel == "opportunity_number" && !subData[item.inputModel]) {//商机编号不能为空
                        _this.$message({
                            message: "商机编号不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "opportunity_name" && !subData[item.inputModel]) {//商机名称不能为空
                        _this.$message({
                            message: "商机名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "customerpool_id" && !subData[item.inputModel]) {//关联客户不能为空
                        _this.$message({
                            message: "关联客户不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "contacts_id" && !subData[item.inputModel]) {//决策人不能为空
                        _this.$message({
                            message: "决策人不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "opportunity_achievement" && !subData[item.inputModel]) {//预计成绩金额不能为空
                        _this.$message({
                            message: "预计成绩金额不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "opportunity_deal" && !subData[item.inputModel]) {//预计成交时间不能为空
                        _this.$message({
                            message: "预计成交时间不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return;
                subData.secondid = this.$store.state.deptid
                subData.deptid = this.$store.state.insid
                subData.user_id = this.$store.state.ispId

                axios({
                    method: 'post',
                    url: _this.oppaddOrUpdateData.submitURL,
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
                            message: res.data,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    console.log(err);
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
                    delItem.path === this.$route.fullPath && this.$router.push('/businessOpportunity');
                }else{
                    this.$router.push('/welcome');
                }
            },
        }
        
    }
</script>
