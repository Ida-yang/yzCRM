<template>
    <!-- 工作计划新增修改 -->
    <div class="content">
        <el-form :model="myForm" ref="myForm" class="myForm" :rules="rules">
            <el-form-item
                class="formitemcont"
                label-width="100px"
                v-for="item in missionaddOrUpdateData.createForm"
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
                    v-else-if="item.type && item.type == 'textarea'"
                    type="textarea"
                    rows="5"
                    :value="myForm[item.inputModel]"
                    @input="handleInput($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off">
                </el-input>
                <el-input 
                    v-else-if="item.type && item.type == 'require' && item.inputModel == 'customerName'"
                    :value="myForm[item.inputModel]"
                    @input="handleoninput($event, item.inputModel)"
                    @blur="handleblur($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off">
                </el-input>
                <el-date-picker
                    v-else-if="item.type && item.type == 'date'"
                    v-model="myForm[item.inputModel]"
                    type="datetime"
                    @change="handleInput($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="12:00:00"
                    style="width:90%;" 
                    auto-complete="off">
                </el-date-picker>
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

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import bus from '../../bus';

export default {
    name:'visitplanaddorupdate',
    data(){
        return{
            missionaddOrUpdateData:{},

            myForm:{
                customerName:null,
            },

            rules:{
                customerName : [{ required: true, message: '关联对象不能为空', trigger: 'blur' }],
                planningTheme : [{ required: true, message: '计划主题不能为空', trigger: 'blur' }],
                describe : [{ required: true, message: '描述不能为空', trigger: 'blur' }],
                startTime : [{ required: true, message: '开始时间不能为空', trigger: 'blur' }],
                endTime : [{ required: true, message: '结束时间不能为空', trigger: 'blur' }]
            },

            tableData:null,

            searchvalue:null,
            formid:null,
        }
    },
    mounted(){
        this.loadData()
        this.loadTable()
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
            this.missionaddOrUpdateData = this.$store.state.missionaddOrUpdateData;

            // 设置默认值
            let createForm = this.missionaddOrUpdateData.createForm;
            let setForm = this.missionaddOrUpdateData.setForm;
            if(setForm) {
                createForm.forEach((item, index) => {
                    if(item.type && item.type == 'select') {
                        this.$set(this.myForm, item.inputModel, setForm[item.inputModel])
                    } else if(item.type && item.type == "date") {
                        this.$set(this.myForm, item.inputModel, setForm[item.inputModel])
                    } else {
                        this.myForm[item.inputModel] = setForm[item.inputModel]
                    }
                });
                this.formid = setForm.customerId
                this.myForm.customerName = setForm.customerName
                this.$emit('input', this.myForm);
            }
        },
        getRow(index,row){
            this.myForm.customerName = row.name
            this.formid = row.id
        },
        handleInput(val, key) {
            this.myForm[key] = val;
        },
        handleoninput(val,key){
            this.myForm[key] = val
            this.searchvalue = val
            this.$options.methods.loadTable.bind(this)(true);
        },
        handleblur(e,key){
            let val = e.target.value
            this.tableData.forEach(el => {
                if(val == el.name){
                    this.formid = el.id
                    this.myForm.customerName = el.name
                }
            });
        },
        submit(){
            const _this = this;
            let qs =require('querystring')
            let subData = {};
            if(_this.missionaddOrUpdateData.submitData) {
                subData.id = this.missionaddOrUpdateData.submitData.id;
            }
            subData.secondid = this.$store.state.deptid
            subData.deptid = this.$store.state.insid
            let createForm = _this.missionaddOrUpdateData.createForm;
            let flag = false;
            createForm.forEach(item => {
                subData[item.inputModel] = _this.myForm[item.inputModel];
                if(item.inputModel == "planningTheme" && !subData[item.inputModel]) {
                    _this.$message({
                        message: "计划主题不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(item.inputModel == "customerName" && !subData[item.inputModel]) {//拜访时间不能为空
                    _this.$message({
                        message: "关联对象不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(item.inputModel == "startTime" && !subData[item.inputModel]) {
                    _this.$message({
                        message: "开始时间不能为空",
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
                if(item.inputModel == "describe" && !subData[item.inputModel]) {
                    _this.$message({
                        message: "描述不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
            });
            if(flag) return;
            subData.customerId = this.formid

            axios({
                method: 'post',
                url: _this.missionaddOrUpdateData.submitURL,
                data: qs.stringify(subData)
            }).then(function(res){
                if(res.data.code && res.data.code == 200) {
                    _this.$message({
                        message: '成功',
                        type: 'success'
                    });
                    _this.closeTag();
                }else {
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
                delItem.path === this.$route.fullPath && this.$router.push('/missionplan');
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


