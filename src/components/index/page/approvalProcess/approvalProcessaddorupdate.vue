<template>
    <div>
        <div class="ap_top">
            <el-form :inline="true" ref="myform" :model="myform" :rules="rules" label-width="100px">
                <el-form-item label="审核流名称" prop="name">
                    <el-input v-model="myform.name" size="mini" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="关联对象">
                    <el-select v-model="myform.categoryType" placeholder="请选择关联对象" size="mini">
                        <el-option v-for="item in AssociatedList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="myform.remarks" size="mini" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="应用部门" prop="deptNames">
                    <el-select v-model="myform.deptNames" multiple placeholder="请选择应用部门" size="mini" class="dept_select">
                        <el-option class="droplist" :value="myform.deptNames">  
                            <el-tree 
                                node-key="deptid" 
                                highlight-current default-expand-all show-checkbox
                                ref="tree"
                                :expand-on-click-node="false"
                                :data="datalist"
                                :props="defaultProps"
                                @check="handlecheck"
                                class="drop_tree">
                            </el-tree>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="ap_bottom">
            <div class="ap_level" v-for="item in levelList" :key="item.index" @mouseover="onmouseover(item)" @mouseleave="onmouseleave(item)">
                <span class="nameList"><span style="color:#f56c6c;margin-right:4px">*</span>{{item.name}}</span>
                <el-select v-model="item.stepType" size="mini">
                    <el-option v-for="item in stepTypeList" :key="item.id" :label="item.stepName" :value="item.id"></el-option>
                </el-select>
                <el-select v-model="item.checkUserId" multiple placeholder="请选择审核人员" :multiple-limit="5" filterable size="mini" class="ap_check">
                    <el-option v-for="item in userList" :key="item.private_id" :label="item.private_employee" :value="item.private_id"></el-option>
                </el-select>
                <el-input v-model="item.remarks" size="mini" style="width:200px;margin-left: 20px;" placeholder="备注信息"></el-input>
                <span v-show="item.del" class="ap_del" @click="delStep(item)"><i class="el-icon-delete"></i></span>
            </div>
            <el-button v-show="showaddStep" type="text" size="mini" @click="addStepType" style="margin-left:45px;">+ 新增审核层级</el-button>
        </div>
        <div class="ap_remark">
            <p>* 多人或签：表示指定用户中任意一人审核即可。 </p>
            <p>* 多人会签：指定用户中所有人都要审核才算通过。</p>
        </div>
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
        data(){
            return{
                datalist:[],
                defaultProps:{
                    label:'deptname',
                    children:'next',
                },

                myform:{
                    name:null,
                    categoryType:1,
                    deptNames:[],
                    deptIds:[],
                    remarks:null,
                    id:null,
                    category_id:null,
                },
                AssociatedList:[
                    {id:1,name:'合同'},
                    {id:2,name:'销售订单'},
                    {id:3,name:'合同回款'},
                    {id:4,name:'办公'},
                    {id:5,name:'外勤'},
                    {id:6,name:'订单收款'},
                ],
                levelList:[
                    {index:1, name:'第 1 级', stepType:2, checkUserId:[], remarks:null, del:false},
                ],
                stepTypeList:[
                    {id:2,stepName:'多人或签'},
                    {id:3,stepName:'多人会签'},
                ],
                userList:[],
                rules:{
                    deptNames: [{ required: true, message: '应用部门不能为空', trigger: 'blur' },],
                    name: [{ required: true, message: '审核流名称不能为空', trigger: 'blur' },],
                },

                isDisable:false,
                showaddStep:true,
            }
        },
        mounted(){
            this.loadData()
            this.setMyForm()
        },
        methods:{
            loadData(){
                const _this = this
                
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'dept/getDeptNodeTree.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.datalist = res.data.map.success
                }).catch(function(err){
                });
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'customerTwo/getNameAndId.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.userList = res.data.map.success
                }).catch(function(err){
                });
            },
            setMyForm(){
                const _this = this
                let objs = _this.$store.state.approvaladdOrUpdateData

                _this.myform.deptIds = []
                _this.myform.deptNames = []
                _this.myform.categoryType = objs.categoryType
                if(objs.id){
                    _this.myform.id = objs.id
                    _this.myform.name = objs.name
                    _this.myform.remarks = objs.remarks
                    _this.levelList = objs.levelList
                    objs.deptIdLs.forEach(el => {
                        _this.myform.deptIds.push(el.id)
                        _this.myform.deptNames.push(el.name)
                    });
                    _this.$refs.tree.setCheckedKeys(_this.myform.deptIds)
                }
                if(objs.category_id){
                    _this.myform.category_id = objs.category_id
                }else{
                    _this.myform.category_id = null
                }
            },
            handlecheck(data,val){
                const _this = this
                let qs = require('querystring')
                this.myform.deptNames = []
                val.checkedNodes.forEach((el,i) => {
                    this.myform.deptNames.push(el.deptname)
                });
                this.myform.deptIds = val.checkedKeys
                
                let datas = {}
                datas.id = this.myform.id
                datas.categoryType = this.myform.categoryType
                if(this.myform.deptIds.length){
                    datas.secondid = this.myform.deptIds
                }else{
                    datas.secondid = null
                }
                if(this.myform.category_id){
                    datas.category_id = this.myform.category_id
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'examine/queryExaminByDeptId.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(datas)
                }).then(function(res){
                    if(res.data.code && res.data.code == '20001'){
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                });
            },
            addStepType(){
                this.levelList.forEach((el,i) => {
                    if(i == this.levelList.length - 1){
                        let a = el.index + 1
                        this.levelList.push({index:a, name:'第 ' + a + ' 级', stepType:2, checkUserId:[], remarks:null, del:false})
                    }
                });
                if(this.levelList.length < 6){
                    this.showaddStep = true
                }else{
                    this.showaddStep = false
                }
            },
            onmouseover(val){
                val.del = true
            },
            onmouseleave(val){
                val.del = false
            },
            delStep(val){
                const _this = this
                let valId = val.index
                
                if(this.levelList.length == 1){
                    _this.$message({
                        message:'至少保留一层',
                        type:'error'
                    })
                }else{
                    this.levelList.forEach((el,i) => {
                        if(val.index == el.index){
                            this.levelList.splice(i,1)
                        }
                    });
                }
                this.rescheduling(valId)
            },
            rescheduling(val){
                this.levelList.forEach((el,i) => {
                    if(el.index > val){
                        let a = el.index - 1
                        el.index = a
                        el.name = '第 ' + a + ' 级'
                    }
                });
                
                if(this.levelList.length < 6){
                    this.showaddStep = true
                }else{
                    this.showaddStep = false
                }
            },
            onSubmit(){
                const _this = this
                let qs = require('querystring')
                let arr = []
                this.levelList.forEach((el,i) => {
                    arr.push({stepType:el.stepType,checkUserId:el.checkUserId,remarks:el.remarks})
                });
                let data = {
                    "id": this.myform.id,
                    "categoryType":this.myform.categoryType,
                    "deptIds":this.myform.deptIds,
                    "name":this.myform.name,
                    "remarks":this.myform.remarks,
                    "category_id":this.myform.category_id,
                    "step":arr,
                }

                console.log(data)
                this.isDisable = true
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'examine/saveExamine.do?cId='+_this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                    data: data
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'成功',
                            type:'success'
                        })
                        _this.closeTag()
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                    _this.isDisable = false
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
                    delItem.path === this.$route.fullPath && this.$router.push('/approvalProcess');
                }else{
                    this.$router.push('/index');
                }
            },
        },
    }
</script>

<style>
    .droplist{
        padding: 0;
        height: auto
    }
    .dept_select{
        width: 502px;
    }
    .dept_select .el-select__tags{
        max-width: 502px;
    }
    .dept_select .el-tag__close{
        display: none
    }
    .ap_check .el-select__tags{
        max-width: 402px;
    }
    .ap_check{
        margin-left: 20px;
        width: 402px;
    }
</style>

