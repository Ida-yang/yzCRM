<template>
    <!-- 商机新增修改 -->
    <div class="content">
        <el-form :model="myForm" ref="myForm" class="myForm" :rules="rules">
            <!-- <h3>{{addOrUpdateData.title}}</h3> -->
            <el-form-item
                label-width="110px"
                v-for="item in addOrUpdateData.createForm"
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
                    v-else-if="item.type && item.type == 'number'"
                    type="number"
                    :value="myForm[item.inputModel]"
                    @input="handleInput($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off">
                </el-input>
                <el-select 
                    v-else-if="item.type && item.type == 'select' && item.inputModel == 'customerpool_id'"
                    :multiple="item.multiple"
                    :collapse-tags="item.multiple"
                    v-model="myForm[item.inputModel]"
                    @change="handleSelect($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    style="width:90%;">
                    <el-option
                        v-for="o in customerlist"
                        :key="o.id"
                        :label="o.name"
                        :value="o.id">
                    </el-option>
                </el-select>
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
                <el-button class="searchbutton" @click="submit">立即提交</el-button>
                &nbsp;&nbsp;
                <el-button @click="closeTag">取消</el-button>
            </div>
        </el-form>
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
    .line{
        float: left;
        height: 95%;
        border-left: 1px solid #000;
        margin-right: 5px;
    }
    .formlist{
        width: 57%;
        height: auto;
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
                customerlist:null,
                contactslist:null,
                addOrUpdateData: {},
                myForm: {},
                subData: {},
                page: 1,//默认第一页
                limit: 15,//默认10条
                selectData: null,
                rules: {
                    opportunity_number : [{ required: true, message: '商机编号不能为空', trigger: 'blur' },],
                    opportunity_name : [{ required: true, message: '商机名称不能为空', trigger: 'blur' },],
                    customerpool_id : [{ required: true, message: '关联客户不能为空', trigger: 'blur' },],
                    contacts_id : [{ required: true, message: '决策人不能为空', trigger: 'blur' },],
                    opportunity_achievement : [{ required: true, message: '预计成绩金额不能为空', trigger: 'blur' },],
                    opportunity_deal : [{ required: true, message: '预计成交时间不能为空', trigger: 'blur' },],
                },

                customerpoolId:null,
            }
        },
        // mounted(){
        //     this.loadData();
        //     this.loadTable();
        // },
        activated() {
            this.loadData();
            this.loadTable();
        },
        methods:{
            //获取客户下拉框数据
            loadTable(){
                let _this = this
                let qs = require('querystring')
                let pageInfo = {}
                pageInfo.page = 1
                pageInfo.limit = 100000000
                // console.log(data)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerpool/getPoolRight.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(pageInfo)
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.customerlist = res.data.map.success
                }).catch(function(err){
                    console.log(err);
                });
                if(this.customerpoolId){
                    let data = {}
                    data.customerpool_id = this.customerpoolId
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'getPoolContactsName.do?cId='+_this.$store.state.iscId,
                        data: qs.stringify(data)
                    }).then(function(res){
                        // console.log(res.data.map.success)
                        _this.contactslist = res.data.map.success
                    }).catch(function(err){
                        console.log(err);
                    });
                }
                
            },
            handleSelect(item) {
                // console.log(item);
                let _this = this
                let qs = require('querystring')
                let data = {}
                data.customerpool_id = item
                // console.log(data)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getPoolContactsName.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.contactslist = res.data.map.success
                }).catch(function(err){
                    console.log(err);
                });
            },
            //加载或重载页面
            loadData() {
                this.addOrUpdateData = this.$store.state.addOrUpdateData;
                this.customerpoolId = this.addOrUpdateData.setForm.customerpool_name
                // console.log(this.addOrUpdateData)

                // 设置默认值
                let createForm = this.addOrUpdateData.createForm;
                let setForm = this.addOrUpdateData.setForm;
                if(setForm) {
                    createForm.forEach((item, index) => {
                        if(item.type && item.type == 'select') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                            // let selectList = item.selectList;
                            // this.addOrUpdateData.createForm[index].options = selectList;
                        } else if(item.type && item.type == 'radio') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else if(item.type && item.type == "date") {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else {
                            this.myForm[item.inputModel] = setForm[item.inputModel];
                        }
                    });
                    // console.log(this.myForm);
                    this.myForm.customerpool_id = this.addOrUpdateData.setForm.customerpool_name
                    this.myForm.contacts_id = this.addOrUpdateData.setForm.contacts_name
                    this.$emit('input', this.myForm);
                }
            },
            handleInput(val, key) {
                this.myForm[key] = val;
                // console.log(val)
            },
            //提交或修改
            submit() {
                let _this = this;
                let qs =require('querystring')
                let subData = {};
                if(_this.addOrUpdateData.submitData) {
                    subData.opportunity_id = this.addOrUpdateData.submitData.id
                }
                let createForm = _this.addOrUpdateData.createForm;
                let flag = false;
                createForm.forEach(item => {
                    subData[item.inputModel] = _this.myForm[item.inputModel];
                    // console.log(_this.myForm)
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
                // console.log(_this.myForm)
                subData.secondid = this.$store.state.deptid
                subData.deptid = this.$store.state.insid
                subData.user_id = _this.$store.state.ispId
                // console.log(subData)

                axios({
                    method: 'post',
                    url: _this.addOrUpdateData.submitURL,
                    data: qs.stringify(subData)
                }).then(function(res){
                    // console.log(res)
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
