<template>
    <!-- 社会营销 -->
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
            <div class="searchList" style="width:100%;">
                <el-input v-model="searchList.searchName" placeholder="活动名称" style="width:300px;"></el-input>
                &nbsp;&nbsp;
                <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()">查询</el-button>
            </div>
            <div class="entry">
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
                :default-sort = "{prop:'id',order: 'descending'}"
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
                        prop="name"
                        fixed
                        v-if="item.prop == 'name' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="150"
                        label="活动名称"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="private_employee"
                        v-else-if="item.prop == 'private_employee' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="90"
                        label="负责人"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="clueNum"
                        v-else-if="item.prop == 'clueNum' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="120"
                        label="线索量"
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
                        prop="codeURL"
                        v-else-if="item.prop == 'codeURL' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="160"
                        label="网址"
                        sortable>
                        <template slot-scope="scope">
                            <a :href="scope.row.codeURL">
                                {{scope.row.codeURL}}
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="typeName"
                        v-else-if="item.prop == 'typeName' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="130"
                        label="来源"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="remarks"
                        v-else-if="item.prop == 'remarks' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="130"
                        label="备注"
                        sortable>
                    </el-table-column>
                </div>
                <el-table-column 
                    label="二维码"
                    fixed="right"
                    width="120"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
                        <el-popover
                            placement="right"
                            width="200"
                            trigger="hover">
                            <img :src="scope.row.qrcode" alt="图片" width="200" height="200">
                            <img slot="reference" :src="scope.row.qrcode" alt="图片" width="50" height="50">
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="操作"
                    width="80"
                    fixed="right"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
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
            title="添加活动"
            :visible.sync="dialogVisible"
            width="40%">
            <el-form ref="newform" :model="newform" label-width="80px" :rules="rules">
                <el-form-item prop="resourceid" label="来源">
                    <el-select v-model="newform.resourceid" placeholder="请选择来源" style="width:80%;">
                        <el-option v-for="item in typeData" :key="item.id" :label="item.typeName" :value="item.id">{{item.typeName}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="name" label="活动名称">
                    <el-input v-model="newform.name" placeholder="请输入活动名称" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item prop="remarks" label="备注">
                    <el-input v-model="newform.remarks" placeholder="请输入活动备注" style="width:80%;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="adduser()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改活动"
            :visible.sync="dialogVisible2"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="80px">
                <el-form-item prop="resourceid" label="来源">
                    <el-select v-model="newform.resourceid" placeholder="请选择来源" style="width:80%;">
                        <el-option v-for="item in typeData" :key="item.id" :label="item.typeName" :value="item.id">{{item.typeName}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="name" label="活动名称">
                    <el-input v-model="newform.name" placeholder="请输入活动名称" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item prop="remarks" label="备注">
                    <el-input v-model="newform.remarks" placeholder="请输入活动备注" style="width:80%;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="updateuser()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'socialMarketing',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.activityList;
            },
            tableNumber(){
               return store.state.activityListnumber;     
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
                    resourceid:null,
                    name:null,
                    remarks:null,
                    secondid:null,
                },
                searchList:{
                    searchName:null,
                    secondid:null,
                    resourceid:null,
                },
                
                filterList:null,
                checklist:null,
                // checklist:['活动名称','负责人','线索量','创建时间','网址','来源','备注'],
                idArr:{
                    id:null,
                },
                typeData:null,
                roleList:null,
                clickdata:null,

                qrcode:null,
                codeURL:null,

                page:1,
                limit:20,
                dialogVisible:false,
                dialogVisible2:false,
                rules: {
                    name : [{ required: true, message: '活动名称不能为空', trigger: 'blur' },],
                    resourceid : [{ required: true, message: '来源不能为空', trigger: 'blur' },],
                },
            }
        },
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
            this.loadcues()
        },
        mounted(){
            this.reloadTable()
            this.loadcues()
        },
        methods:{
            reloadTable(){
                let _this = this
                let qs = require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                pageInfo.searchName = this.searchList.searchName
                pageInfo.secondid = this.searchList.secondid
                pageInfo.cuesid = this.searchList.cuesid
                let filterList = {}
                filterList.type = '活动'
                let data = {}
                data.type = '活动'
                data.state = 1

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'activity/getActivity.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.$store.state.activityList = res.data.map.success
                    _this.$store.state.activityListnumber = res.data.count
                    let arr = _this.$store.state.activityList
                    arr.forEach(el => {
                        // console.log(el)
                        el.qrcode = '/weChat/'+_this.$store.state.iscId+'/'+el.url
                        el.codeURL = 'http://crm.yunzoe.com/#/activity?c='+_this.$store.state.iscId+'&p='+_this.$store.state.ispId+'&n='+el.name
                    });
                    // console.log(arr)
                    // console.log(_this.codeURL)
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
            loadcues(){
                let _this = this
                let qs = require('querystring')
                let data = {}
                data.type = '客户来源'
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data),
                }).then(function(res){
                    // console.log(res.data.rows)
                    _this.typeData = res.data
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
                this.newform.secondid = data.deptid
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
            handleshow(row){
                // console.log(row)
            },
            handleURL(row){
                // console.log(row)
            },
            handledelete(index,row){
                let _this = this;
                let qs =require('querystring')
                let idArr = {};
                idArr.id = row.id
                // console.log(idArr)
                _this.$confirm('是否确认删除'+row.name+'吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'activity/delActivity.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        // console.log(res)
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        } else {
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
            //活动添加
            handleAdd(){
                let _this = this
                this.newform.resourceid = null
                this.newform.name = null
                this.newform.remarks = null
                // console.log(this.newform)

                if(!this.clickdata){
                    _this.$message({
                        message:'请先选择部门，再添加活动',
                        type:'info'
                    })
                }else{
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'activityJurisdiction/insert.do',
                    }).then(function(res){
                        // console.log(res)
                        if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message:'对不起，您没有该权限，请联系管理员开通',
                                type:'error'
                            })
                        }else{
                            _this.dialogVisible = true
                        }
                    }).catch(function(err){
                        console.log(err);
                    });
                    
                }
            },
            //活动添加提交按钮
            adduser(){
                let _this = this;
                let qs = require('querystring')
                let data = {}
                data.resourceid = this.newform.resourceid
                data.name = this.newform.name
                data.remarks = this.newform.remarks
                data.secondid = this.newform.secondid
                // console.log(data)
                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    if(!item.name){
                        _this.$message({
                            message: "活动名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.resourceid){
                        _this.$message({
                            message: "来源不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'activity/insertActivity.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res)
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加活动成功',
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
</style>
