<template>
    <div>
        <el-form :inline="true" ref="myform" :model="myform" :rules="rules">
            <el-form-item label="审批流名称" label-width="90px">
                <el-input v-model="myform.name" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="关联对象" label-width="90px">
                <el-select v-model="myform.categoryType" placeholder="请选择关联对象" size="mini">
                    <el-option v-for="item in AssociatedList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="应用部门" label-width="90px">
                <el-select v-model="myform.deptNames" multiple placeholder="请选择应用部门" size="mini" @remove-tag="removeTag">
                    <el-option class="droplist" :value="myform.deptIds">
                        <el-tree
                            node-key="deptid"
                            highlight-current
                            default-expand-all
                            show-checkbox
                            :data="datalist"
                            :props="defaultProps"
                            :expand-on-click-node="false"
                            @check="handlecheck"
                            class="drop_tree">
                        </el-tree>
                    </el-option>
                </el-select>
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
                    name:null,
                    categoryType:null,
                    deptNames:[],
                    deptIds:[]
                },
                AssociatedList:[
                    {id:1,name:'合同'},
                    {id:2,name:'订单'},
                ],
                rules:{},

                isDisable:false
            }
        },
        mounted(){
            this.loadData()
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
            },
            handlecheck(data,val){
                console.log(data,val)
                this.myform.deptNames = []
                val.checkedNodes.forEach((el,i) => {
                    this.myform.deptNames.push(el.deptname)
                });
                this.myform.deptIds = val.checkedKeys
            },
            removeTag(val){
                // console.log(val)
                return false
            },
            onSubmit(){
                console.log(this.myform)
            },
            closeTag(){},
        },
    }
</script>

<style>
    .droplist{
        padding: 0;
        height: auto
    }
    .drop_tree{
        margin: 0
    }
</style>

