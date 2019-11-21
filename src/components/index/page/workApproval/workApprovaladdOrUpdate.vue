<template>
    <div class="work_approval_wrap">
        <el-form :inline="true" ref="myform" :model="myform" :rules="rules" label-width="100px">
            <el-form-item label="审核流名称" prop="title">
                <el-input v-model="myform.title" size="mini" style="width:200px;"></el-input>
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
            <el-form-item label="审核分类">
                <el-select v-model="myform.examineTypeId" placeholder="请选择审核分类" size="mini">
                    <el-option v-for="item in labelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="myform.remarks" type="textarea" rows="5" size="mini" style="width:38vw"></el-input>
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
        data(){
            return{
                datalist:[],
                defaultProps:{
                    label:'deptname',
                    children:'next',
                },

                myform:{
                    title:null,
                    examineTypeId:null,
                    deptNames:[],
                    deptIds:[],
                    remarks:null,
                    id:null,
                },
                labelList:[],
                
                rules:{
                    deptNames: [{ required: true, message: '可见部门不能为空', trigger: 'blur' },],
                    title: [{ required: true, message: '审核类型不能为空', trigger: 'blur' },],
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
                    url: _this.$store.state.defaultHttp+'oaExamineCategoryType/selectList.do?cId='+_this.$store.state.iscId
                }).then(function(res){
                    let info = res.data
                    _this.labelList = info
                }).catch(function(err){
                    // console.log(err);
                });
            },
            setMyForm(){
                const _this = this
                let objs = _this.$store.state.workApprovalData

                _this.myform.deptIds = []
                _this.myform.deptNames = []
                _this.myform.examineTypeId = objs.examineTypeId
                if(objs.id){
                    _this.myform.id = objs.id
                    _this.myform.title = objs.title
                    _this.myform.remarks = objs.remarks
                    objs.deptIdLs.forEach(el => {
                        _this.myform.deptIds.push(el.id)
                        _this.myform.deptNames.push(el.name)
                    });
                    _this.$refs.tree.setCheckedKeys(_this.myform.deptIds)
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
            },
            onSubmit(){
                const _this = this
                let qs = require('querystring')
                let data = {
                    "id": this.myform.id,
                    "examineTypeId":this.myform.examineTypeId,
                    "deptIds":this.myform.deptIds,
                    "title":this.myform.title,
                    "remarks":this.myform.remarks,
                    "createUserId":this.$store.state.ispId
                }
                
                this.isDisable = true
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'oaExamineCategory/saveOrUpdate.do?cId='+_this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                    data: qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'成功',
                            type:'success'
                        })
                        if(_this.myform.id){
                            _this.closeTag()
                        }else{
                            _this.$store.state.associatedFormsData = res.data.map.oaExamineCategory
                            _this.closeTag()
                            _this.$router.push({ path: '/associatedFormsaddOrUpdate' })
                        }
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
                    delItem.path === this.$route.fullPath && this.$router.push('/associatedForms');
                }else{
                    this.$router.push('/index');
                }
            },
        },
    }
</script>

<style>
    .work_approval_wrap{
        margin-top: 30px;
    }
    .droplist{
        padding: 0;
        height: auto
    }
    .dept_select{
        width: 38vw;
    }
    .dept_select .el-select__tags{
        max-width: 38vw;
    }
    .dept_select .el-tag__close{
        display: none
    }
</style>

