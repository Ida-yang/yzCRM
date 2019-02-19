<template>
    <!-- 基础设置页面 -->
    <div class="contentall">
        <div class="setleftcontent">
            <ul class="namecontent">
                <li v-for="item in nameList" :key="item.index" :value="item.name" :class="{actived:item.isActive}" @click="showTableval(item)">{{item.name}}</li>
            </ul>
        </div>
        <div class="centercontent"></div>
        <div class="setrightcontent">
            <div class="entry">
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
                <el-popover
                placement="bottom"
                width="100"
                trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist">
                    <el-checkbox class="checkone" @change="showsort()" label="顺序"></el-checkbox>
                    <el-checkbox class="checkone" @change="showname()" label="名称"></el-checkbox>
                    <el-checkbox class="checkone" @change="showremark()" label="备注"></el-checkbox>
                </el-checkbox-group>
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
                </el-popover>
            </div>
            <el-table
                :data="tableData"
                :default-sort = "{order: 'descending'}"
                border
                stripe
                style="width:100%;text-align:center"
                >
                <el-table-column
                    header-align="center"
                    align=""
                    type="selection"
                    width="45"
                    scope.row.id
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="sort"
                    v-if="showshunxu"
                    header-align="center"
                    align="center"
                    label="顺序"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="typeName"
                    v-if="showmingcheng"
                    header-align="center"
                    align="center"
                    min-width="120"
                    label="名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="notes"
                    v-if="showbeizhu"
                    header-align="center"
                    align="center"
                    min-width="120"
                    label="备注"
                    sortable>
                </el-table-column>
                <el-table-column label="操作"
                    width="140"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handledelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="添加状态"
            :visible.sync="dialogVisible"
            width="40%">
            <el-form ref="newform" :model="newform" label-width="80px" :rules="rules">
                <el-form-item prop="type" label="状态类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="typeName" label="状态名称">
                    <el-input v-model="newform.typeName" placeholder="请输入状态名称"></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序编号">
                    <el-input type="number" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
                </el-form-item>
                <el-form-item prop="notes" label="备注">
                    <el-input v-model="newform.notes" placeholder="请输入状态备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addbasicset()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改状态"
            :visible.sync="dialogVisible2"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="80px">
                <el-form-item prop="type" label="状态类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="typeName" label="状态名称">
                    <el-input v-model="newform.typeName" placeholder="请输入状态名称"></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序编号">
                    <el-input type="number" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
                </el-form-item>
                <el-form-item prop="notes" label="备注">
                    <el-input v-model="newform.notes" placeholder="请输入状态备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="updatebasicset()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'basicset',
        store,
        computed: {
            tableData(){
                return store.state.stateList;
            },
        },
        data(){
            return {
                dataList:null,
                nameList:[
                    {index:1,name:'线索状态',isActive:true},
                    {index:2,name:'客户状态',isActive:false},
                    {index:3,name:'客户来源',isActive:false},
                    {index:4,name:'客户级别',isActive:false}
                ],
                newform:{
                    type:'线索状态',
                    id:null,
                    sort:null,
                    typrName:null,
                    notes:null,
                },
                checklist:['顺序','名称','备注'],
                idArr:{
                    id:null,
                },
                showshunxu:true,
                showmingcheng:true,
                showbeizhu:true,
                dialogVisible:false,
                dialogVisible2:false,
                rules: {
                    typeName : [{ required: true, message: '状态名称不能为空', trigger: 'blur' },],
                    sort : [{ required: true, message: '排序编号不能为空', trigger: 'blur' },],
                },
            }
        },
        mounted(){
            this.reloadTable()
        },
        activated(){
            this.reloadTable()
        },
        methods:{
            reloadTable(){
                let _this = this
                let qs = require('querystring')
                let data = {}
                data.type = this.newform.type
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res.data)
                    _this.$store.state.stateList = res.data
                }).catch(function(err){
                    console.log(err);
                });
            },
            //显示对应状态数表格数据
            showTableval(val){
                let _this = this
                this.newform.type = val.name
                this.nameList.forEach(function(obj){
                    obj.isActive = false;
                });
                val.isActive = !val.isActive;
                _this.$options.methods.reloadTable.bind(_this)(true);
            },
            //状态添加
            handleAdd(){
                let _this = this

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfoJurisdiction/insert.do',//新增状态
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.typeName = null
                        _this.newform.sort = null
                        _this.newform.notes = null
                        _this.dialogVisible = true
                    }
                }).catch(function(err){
                    console.log(err);
                });
                
            },
            //状态添加提交按钮
            addbasicset(){
                let _this = this;
                let qs = require('querystring')
                let data = {}
                data.type = this.newform.type
                data.sort = this.newform.sort
                data.typeName = this.newform.typeName
                data.notes = this.newform.notes
                // console.log(data)
                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    if(!item.typeName){
                        _this.$message({
                            message: "状态姓名不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.sort){
                        _this.$message({
                            message: "排序编号不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res)
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加状态成功',
                            type:'success'
                        })
                        _this.dialogVisible = false
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    console.log(err);
                });
                // alert('添加成功')
            },
            //状态修改
            handleEdit(index,row){
                let _this = this
                // console.log(row.sort)

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfoJurisdiction/update.do',//编辑状态
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.id = row.id
                        _this.newform.sort = row.sort
                        _this.newform.typeName = row.typeName
                        _this.newform.notes = row.notes
                        _this.dialogVisible2 = true
                    }
                }).catch(function(err){
                    console.log(err);
                });
                
                // console.log(this.newform)
            },
            //状态修改提交按钮
            updatebasicset(){
                let _this = this;
                let qs = require('querystring')
                let data = {}
                data.id = this.newform.id
                data.type = this.newform.type
                data.sort = this.newform.sort
                data.typeName = this.newform.typeName
                data.notes = this.newform.notes
                console.log(data)
                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    if(!item.typeName){
                        _this.$message({
                            message: "状态姓名不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.sort){
                        _this.$message({
                            message: "排序编号不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res)
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改状态成功',
                            type:'success'
                        })
                        _this.dialogVisible2 = false
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            handledelete(index,row){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = row.id
                // console.log(idArr)
                _this.$confirm('确认删除 ['+ row.typeName +'] 吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'typeInfo/deleteTypeInfoById.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        // console.log(res)
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        } else if(res.data.msg && res.data.msg == 'error'){//删除状态
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        }else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        console.log(err);
                    });
                });
            },
            showsort(){
                this.showshunxu = !this.showshunxu
            },
            showname(){
                this.showmingcheng = !this.showmingcheng
            },
            showremark(){
                this.showbeizhu = !this.showbeizhu
            },
        }
    }
</script>
<style>
    .contentall{
        background-color: #ffffff;
        height: 100%;
    }
    .setleftcontent{
        width: 30%;
        height: auto;
        padding-top:30px;
        float: left;
        box-sizing: border-box;
    }
    .namecontent{
        width: 90%;
        list-style: none;
        font-size: 14px; 
    }
    .namecontent li{
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-left: 40px;
        /* text-align: center; */
    }
    .namecontent li.actived{
        background-color: #f0f0f0;
        color: #409EFF
    }
    .centercontent{
        display: block;
        width: 1%;
        height: 100%;
        float: left;
        background-color: #f0f0f0;
    }
    .setrightcontent{
        width: 69%;
        height: 100%;
        float: left;
        box-sizing: border-box;
    }
</style>
