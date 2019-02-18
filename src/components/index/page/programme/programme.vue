<template>
    <!-- 方案 -->
    <div class="contentall">
        <div class="roleleftcontent">
            <el-tree
                node-key="deptid"
                highlight-current
                default-expand-all
                :data="datalist"
                :props="defaultProps"
                :expand-on-click-node="false"
                @node-click="handleNodeClick">
            </el-tree>
        </div>
        <div class="centercontent"></div>
        <div class="rolerightcontent">
            <br>
            <div class="radioList">
                <el-radio-group v-model="searchList.state">
                    <span class="nameList">方案状态：</span>
                    <el-radio :label="nullvalue" @change="search()">全部状态</el-radio>
                    <el-radio label="启用" @change="search()">启用</el-radio>
                    <el-radio label="禁止" @change="search()">禁用</el-radio>
                </el-radio-group>
            </div>
            <br>
            <div class="entry">
                <el-button class="btn" size="mini" @click="handledeletes()">删除</el-button>
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
                <el-popover
                placement="bottom"
                width="100"
                trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist">
                    <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                </el-checkbox-group>
                <!-- <el-button slot="reference" icon="el-icon-more-outline" type="mini">筛选列表</el-button> -->
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
                </el-popover>
            </div>
            <el-table
                :data="tableData"
                :default-sort = "{prop:'createTime',order: 'descending'}"
                ref="multipleTable"
                border
                stripe
                style="width:100%;text-align:center"
                @selection-change="selectInfo"
                >
                <el-table-column
                    fixed
                    header-align="center"
                    align="center"
                    type="selection"
                    width="45"
                    scope.row.id
                    prop="id"
                    @selection-change="selectInfo"
                    sortable>
                </el-table-column>
                <div v-for="(item,index) in filterList" :key="index" >
                    <el-table-column
                        prop="projectName"
                        fixed
                        v-if="item.prop == 'projectName' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="150"
                        label="方案名称"
                        sortable>
                        <template slot-scope="scope">
                            <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                                {{scope.row.projectName}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        v-else-if="item.prop == 'time' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="90"
                        label="年份"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="private_employee"
                        v-else-if="item.prop == 'private_employee' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="100"
                        label="负责人"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="deptname"
                        v-else-if="item.prop == 'deptname' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="120"
                        label="部门"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="parentname"
                        v-else-if="item.prop == 'parentname' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="130"
                        label="机构"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        v-else-if="item.prop == 'createTime' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="140"
                        label="创建时间"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        v-else-if="item.prop == 'state' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="80"
                        label="状态"
                        sortable>
                    </el-table-column>
                </div>
                <el-table-column label="操作"
                    fixed="right"
                    width="140"
                    header-align="left"
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
            <div class="block numberPage">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20, 50, 100, 500]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableNumber">
                </el-pagination>
            </div>
        </div>
        <el-dialog
            title="添加方案"
            :visible.sync="dialogVisible"
            width="40%"
            class="dialogform">
            <el-form ref="newform" :model="newform" label-width="80px" :rules="rules">
                <el-form-item prop="second_id" label="所属部门">
                    <el-input v-model="newform.secondname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="projectName" label="方案名称">
                    <el-input v-model="newform.projectName" placeholder="请输入方案名称"></el-input>
                </el-form-item>
                <el-form-item prop="time" label="年份">
                    <el-date-picker format="yyyy" value-format="yyyy" v-model="newform.time" type="year" placeholder="选择年份">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="private_employee" label="负责人">
                    <el-input v-model="newform.private_employee" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="state" label="方案状态">
                    <el-radio v-model="newform.state" label="启用">启用</el-radio>
                    <el-radio v-model="newform.state" label="禁用">禁用</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addprogramme()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改方案"
            :visible.sync="dialogVisible2"
            width="40%"
            class="dialogform">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="80px">
                <el-form-item prop="second_id" label="所属部门">
                    <el-input v-model="newform.secondname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="projectName" label="方案名称">
                    <el-input v-model="newform.projectName" placeholder="请输入方案名称"></el-input>
                </el-form-item>
                <el-form-item prop="time" label="年份">
                    <el-date-picker format="yyyy" value-format="yyyy" v-model="newform.time" type="year" placeholder="选择年份" style="width:100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="private_employee" label="负责人">
                    <el-input v-model="newform.private_employee" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="state" label="方案状态">
                    <el-radio v-model="newform.state" label="启用">启用</el-radio>
                    <el-radio v-model="newform.state" label="禁用">禁用</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="updateprogramme()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'programme',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.programmeList;
            },
            tableNumber(){
               return store.state.programmeListnumber;     
            },
        },
        data(){
            return {
                datalist:[],
                defaultProps:{
                    label:'deptname',
                    children:'next',
                },
                newform:{
                    second_id:null,
                    secondname:null,
                    id:null,
                    projectName:null,
                    time:null,
                    state:'启用',
                    private_employee:null,
                    createTime:null,
                },
                searchList:{
                    state:null,
                    secondid:null,
                },
                
                filterList:null,
                checklist:null,
                // checklist:['方案名称','年份','负责人','部门','机构','创建时间','状态'],
                idArr:{
                    id:null,
                },
                roleList:null,
                clickdata:null,
                
                page:1,
                limit:20,
                dialogVisible:false,
                dialogVisible2:false,
                rules: {
                    projectName : [{ required: true, message: '方案名称不能为空', trigger: 'blur' },],
                    time : [{ required: true, message: '请选择年份', trigger: 'blur' }],
                },
                nullvalue:null,
            }
        },
        //获取机构部门树型结构
        beforeCreate(){
            let _this = this
            axios({
                method: 'get',
                url: _this.$store.state.defaultHttp+'dept/getDeptNodeTree.do?cId='+_this.$store.state.iscId,
            }).then(function(res){
                // console.log(res.data.map.success)
                _this.datalist = res.data.map.success
            }).catch(function(err){
                console.log(err);
            });
        },
        activated(){
            this.reloadTable()
        },
        mounted(){
            this.reloadTable()
        },
        methods:{
            reloadTable(){
                let _this = this
                let qs = require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                pageInfo.state = this.searchList.state
                pageInfo.secondid = this.searchList.secondid
                // console.log(pageInfo)
                let filterList = {}
                filterList.type = '方案'
                let data = {}
                data.type = '方案'
                data.state = 1

                //获取所有方案
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'project/getProject.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    console.log(res.data.map.success)
                    _this.$store.state.programmeList = res.data.map.success
                    _this.$store.state.programmeListnumber = res.data.count
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getAllUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(filterList)
                }).then(function(res){
                    // console.log(res.data)
                    _this.filterList = res.data
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(data)
                }).then(function(res){
                    // console.log(res.data)
                    _this.checklist = res.data
                }).catch(function(err){
                    console.log(err);
                });
            },
            handleNodeClick(data){
                // console.log(data)
                this.searchList.secondid = data.deptid
                // console.log(this.searchList)
                this.clickdata = data
                // console.log(this.clickdata)
                this.newform.second_id = data.deptid
                this.newform.secondname = data.deptname
                // this.newform.deptid = data.parentid
                this.$options.methods.reloadTable.bind(this)(true);
            },
            selectInfo(val){
                this.multipleSelection = val;
                let arr = val;
                let newArr = [new Array()];
                arr.forEach((item) => {
                    if(item.id != 0){
                        newArr.push(item.id)
                    }
                });
                this.idArr.id = newArr;
                // console.log(this.idArr.id)
                
            },
            //方案添加
            handleAdd(){
                let _this = this
                // console.log(this.clickdata.next)

                if(!this.clickdata){
                    _this.$message({
                        message:'请先选择部门，再添加方案',
                        type:'info'
                    })
                }else if(this.clickdata.next == ''){
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'projectJurisdiction/insert.do',
                    }).then(function(res){
                        // console.log(res)
                        if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message:'对不起，您没有该权限，请联系管理员开通',
                                type:'error'
                            })
                        }else{  
                            _this.newform.projectName = null
                            _this.newform.time = null
                            _this.newform.private_employee = _this.$store.state.user
                            // _this.newform.state = '启用'
                            _this.dialogVisible = true
                        }
                    }).catch(function(err){
                        console.log(err);
                    });
                }else{
                    _this.$message({
                        message:'该部门下还有子部门，请选择子部门',
                        type:'error'
                    })
                }
            },
            //方案添加提交按钮
            addprogramme(){
                let _this = this;
                let qs = require('querystring')
                let data = {}
                // data.deptid = this.newform.deptid
                data.secondid = this.newform.second_id
                data.projectName = this.newform.projectName
                data.time = this.newform.time+'-01-01'
                data.state = this.newform.state
                // console.log(data)
                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    if(!item.projectName){
                        _this.$message({
                            message: "方案名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.time){
                        _this.$message({
                            message: "年份不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'project/insertProject.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res)
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加方案成功',
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
            //方案修改
            handleEdit(index,row){
                let _this = this
                // console.log(row)
                let data = {}

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'projectJurisdiction/update.do',
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.id = row.id
                        _this.newform.secondid = row.second_id
                        _this.newform.secondname = row.deptname
                        _this.newform.deptid = row.deptid
                        _this.newform.projectName = row.projectName
                        _this.newform.time = row.time+'-01-01'
                        _this.newform.state = row.state
                        _this.newform.private_employee = row.private_employee
                        _this.newform.createTime = row.createTime
                        _this.dialogVisible2 = true
                    }
                }).catch(function(err){
                    console.log(err);
                });
                
            },
            //方案修改提交按钮
            updateprogramme(){
                let _this = this;
                let qs = require('querystring')
                let data = {}
                data.id = this.newform.id
                data.deptid = this.newform.deptid
                data.second_id = this.newform.second_id
                data.projectName = this.newform.projectName
                data.time = this.newform.time
                data.state = this.newform.state
                data.createTime = this.newform.createTime
                // console.log(data)
                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    if(!item.projectName){
                        _this.$message({
                            message: "方案名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.time){
                        _this.$message({
                            message: "年份不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'project/updateProject.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res)
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改方案成功',
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
            openDetails(index,row){
                let detailsData = {};
                detailsData.submitData = {"id": row.id};
                // console.log(detailsData)
                this.$store.state.detailsData = detailsData;
                this.$router.push({ path: '/programmeDetails' });
            },
            handledeletes(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                idArr.shift(0)
                // console.log(idArr)
                _this.$confirm('确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'project/deleteProject.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        // console.log(res.data)
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        } else if(res.data.msg && res.data.msg == 'error'){
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
            handledelete(index,row){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = row.id
                // console.log(idArr)
                _this.$confirm('确认删除 ['+ row.projectName +'] 吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'project/deleteProject.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        // console.log(res)
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        } else if(res.data.msg && res.data.msg == 'error'){
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
            hangleChange(e,val){
                // console.log(e)
                let _this = this
                let qs = require('querystring')
                let data = {}
                data.pageInfoId = val.pageInfoId
                if(e == true){
                    data.state = 1
                }else{
                    data.state = 0
                }

                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'userPageInfo/updateUserPageByid.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data),
                }).then(function(res){
                    // console.log(res)
                    if(res.data && res.data =="success"){
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else{
                        console.log(err)
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            search() {
                this.$options.methods.reloadTable.bind(this)(true);
            },
            handleSizeChange(val) {
                let _this = this;
                _this.limit = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
            },
            handleCurrentChange(val) {
                let _this = this;
                _this.page = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
            },
        }
    }
</script>
<style>
    .contentall{
        background-color: #ffffff;
        height: 100%;
    }
    .roleleftcontent{
        width: 20%;
        height: auto;
        float: left;
        box-sizing: border-box;
    }
    .el-tree{
        margin: 20px 0;
    }
    .centercontent{
        display: block;
        width: 1%;
        height: 100%;
        float: left;
        background-color: #f0f0f0;
    }
    .rolerightcontent{
        width: 79%;
        height: 100%;
        float: left;
        box-sizing: border-box;
    }
    .dialogform .el-form-item{
        width: 90%;
    }
    .dialogform .el-form-item .el-input{
        width: 100%;
    }
</style>
