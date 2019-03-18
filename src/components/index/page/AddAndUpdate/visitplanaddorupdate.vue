<template>
    <!-- 拜访计划新增修改 -->
    <div class="content">
        <el-form :model="myForm" ref="myForm" class="myForm" :rules="rules">
            <el-form-item
                class="formitemcont"
                label-width="100px"
                v-for="item in visitaddOrUpdateData.createForm"
                :label="item.label"
                :key="item.inputModel"
                :prop="item.inputModel">

                <el-input 
                    v-if="!item.type || item.type == 'input'"
                    :value="myForm[item.inputModel]"
                    @input="handleInput($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off"
                    @keyup.enter.native="submit">
                </el-input>
                <el-input 
                    v-else-if="item.type && item.type == 'textarea'"
                    type="textarea"
                    rows="5"
                    :value="myForm[item.inputModel]"
                    @input="handleInput($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off">
                </el-input>
                <el-input 
                    v-else-if="item.type && item.type == 'require' && item.inputModel == 'customerpoolid'"
                    :value="myForm[item.inputModel]"
                    @input="handleoninput($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off">
                </el-input>
                <el-select 
                    v-else-if="item.type && item.type == 'select' && item.inputModel == 'contactsid'"
                    :multiple="item.multiple"
                    :collapse-tags="item.multiple"
                    v-model="myForm[item.inputModel]"
                    @change="handleInput($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    style="width:90%;">
                    <el-option v-for="o in contactsList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                </el-select>
                <el-select 
                    v-else-if="item.type && item.type == 'select'"
                    :multiple="item.multiple"
                    :collapse-tags="item.multiple"
                    v-model="myForm[item.inputModel]"
                    @change="handleInput($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    style="width:90%;">
                    <el-option v-for="item in assistAudit" :key="item.private_id" :label="item.private_employee" :value="item.private_id"></el-option>
                </el-select>
                <el-date-picker
                    v-else-if="item.type && item.type == 'date'"
                    v-model="myForm[item.inputModel]"
                    type="datetime"
                    @change="handleInput($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                    style="width:90%;" 
                    auto-complete="off">
                </el-date-picker>
            </el-form-item>
            <div style="margin-left:60px;">
                <el-button class="searchbutton" @click="submit">立即提交</el-button>
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

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import bus from '../../bus';

export default {
    name:'visitplanaddorupdate',
    data(){
        return{
            visitaddOrUpdateData:{},

            myForm:{
                customerpoolid:null,
            },

            rules:{},

            tableData:null,
            assistAudit:null,
            contactsList:null,

            searchvalue:null,
            formid:null,
            conid:null,
            assisid:null,
            apprid:null,
        }
    },
    activated(){
        this.loadData()
        this.loadTable()
        this.loadpId()
        this.loadContacts()
    },
    methods:{
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
        //加载或重载页面
        loadData() {
            this.visitaddOrUpdateData = this.$store.state.visitaddOrUpdateData;

            // 设置默认值
            let createForm = this.visitaddOrUpdateData.createForm;
            let setForm = this.visitaddOrUpdateData.setForm;
            if(setForm) {
                createForm.forEach((item, index) => {
                    if(item.type && item.type == 'select') {
                        this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                    } else if(item.type && item.type == "date") {
                        this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                    } else {
                        this.myForm[item.inputModel] = setForm[item.inputModel];
                    }
                });
                this.formid = setForm.customerpoolid
                this.conid = setForm.contactsid
                this.assisid = setForm.assistantsid
                this.apprid = setForm.approverid
                this.myForm.customerpoolid = setForm.customerName
                this.myForm.contactsid = setForm.contactsid
                this.myForm.assistantsid = setForm.assistantsid
                this.myForm.approverid = setForm.approverid
                this.$emit('input', this.myForm);
            }
        },
        //加载已选择客户下的联系人（拜访对象）
        loadContacts(){
            const _this = this
            let qs = require('querystring')
            let data = {}
            data.customerpool_id = this.formid

            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'getPoolContactsName.do?cId='+_this.$store.state.iscId,
                data: qs.stringify(data)
            }).then(function(res){
                _this.contactsList = res.data.map.success
            }).catch(function(err){
                console.log(err);
            });
        },
        loadpId(){
            const _this = this;
            let qs =require('querystring')
            axios({
                method: 'get',
                url: _this.$store.state.defaultHttp+'getNameAndId.do?cId='+_this.$store.state.iscId,
            }).then(function(res){
                _this.assistAudit = res.data
            }).catch(function(err){
                console.log(err);
            });
        },
        getRow(index,row){
            this.myForm.customerpoolid = row.name
            this.formid = row.id
            this.loadContacts()
        },
        handleInput(val, key) {
            this.myForm[key] = val;
        },
        handleoninput(val,key){
            this.myForm[key] = val
            this.searchvalue = val
            this.$options.methods.loadTable.bind(this)(true);
        },
        submit(){
            const _this = this;
            let qs =require('querystring')
            let subData = {};
            if(_this.visitaddOrUpdateData.submitData) {
                subData.id = this.visitaddOrUpdateData.submitData.id;
            }
            subData.secondid = this.$store.state.deptid
            subData.deptid = this.$store.state.insid
            let createForm = _this.visitaddOrUpdateData.createForm;
            let flag = false;
            createForm.forEach(item => {
                subData[item.inputModel] = _this.myForm[item.inputModel];
                if(item.inputModel == "customerpoolid" && !subData[item.inputModel]) {//拜访客户不能为空
                    _this.$message({
                        message: "拜访客户不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(item.inputModel == "visitTime" && !subData[item.inputModel]) {//拜访时间不能为空
                    _this.$message({
                        message: "拜访时间不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(item.inputModel == "endTime" && !subData[item.inputModel]) {
                    _this.$message({
                        message: "结束时间不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(item.inputModel == "contactsid" && !subData[item.inputModel]) {
                    _this.$message({
                        message: "拜访对象不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(item.inputModel == "visitTheme" && !subData[item.inputModel]) {
                    _this.$message({
                        message: "拜访主题不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(item.inputModel == "visitObjective" && !subData[item.inputModel]) {
                    _this.$message({
                        message: "拜访目的不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
            });
            if(flag) return;
            subData.customerpoolid = this.formid
            subData.contactsid = this.myForm.contactsid
            subData.approverid = this.myForm.approverid
            subData.assistantsid = this.myForm.assistantsid

            axios({
                method: 'post',
                url: _this.visitaddOrUpdateData.submitURL,
                data: qs.stringify(subData)
            }).then(function(res){
                if(res.data.code && res.data.code == 200) {
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
            }).catch(function(err){
                console.log(err);
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
                delItem.path === this.$route.fullPath && this.$router.push('/visitplan');
            }else{
                this.$router.push('/welcome');
            }
        },
    },
}
</script>

<style>
    .content {
        width: 98%;
    }
    .myForm {
        width: 41%;
        float: left;
    }
</style>


