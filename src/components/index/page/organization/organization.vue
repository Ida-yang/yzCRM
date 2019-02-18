<template>
    <!-- 机构部门及角色 -->
    <div class="contentall">
        <div class="leftcontent">
            <el-tree
                node-key="deptid"
                highlight-current
                default-expand-all
                :data="datalist"
                :props="defaultProps"
                :expand-on-click-node="false"
                @node-click="handleNodeClick">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span><i class="el-icon-info">&nbsp;</i>{{ node.label }}</span>
                    <span class="showhover">
                        <el-button type="text" size="mini" style="font-size:12px;" @click="handleappend(data)">添加/
                        <!-- <el-button type="text" size="mini" icon="el-icon-circle-plus-outline" @click="handleappend(data)"> -->
                        </el-button>
                        <el-button type="text" size="mini" style="font-size:12px;" @click="handleUpdate(data)">修改/
                        <!-- <el-button type="text" size="mini" icon="el-icon-edit" @click="handleUpdate(data)"> -->
                        </el-button>
                        <el-button type="text" size="mini" style="font-size:12px;" @click="deletedept(node,data)">删除
                        <!-- <el-button type="text" size="mini" icon="el-icon-remove-outline" @click="deletedept(node,data)"> -->
                        </el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <div class="rightcontent">
            <div style="margin:0 0 15px 15px;">
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            </div>
            <ul class="rolerecord" v-for="item in roleList" :key="item.id">
                <li class="rolecontent">
                    ----<span>&nbsp;<i class="el-icon-bell">&nbsp;</i>{{item.name}} - 【{{item.deptname}}】</span>
                    <el-button type="text" size="mini" @click="handleEdit($event,item)">修改</el-button>
                    <el-button type="text" size="mini" @click="handledelete(item.id)">删除</el-button>
                </li>
            </ul>
        </div>
        <el-dialog
            title="添加"
            :visible.sync="dialogVisible"
            width="50%">
            <el-form ref="newform" :model="newform" label-width="80px">
                <el-form-item label="上级部门">
                    <el-input v-model="newform.parentname" :disabled="true" style="200px;"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="newform.deptname" style="200px;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="appenddept()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改"
            :visible.sync="dialogVisible2"
            width="50%">
            <el-form ref="newform" :model="newform" label-width="80px">
                <el-form-item label="上级部门">
                    <el-input v-model="newform.parentname" :disabled="true" style="200px;"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="newform.deptname" style="200px;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="updatedept()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="添加角色"
            :visible.sync="dialogVisible3"
            width="50%">
            <el-form ref="roleform" :model="roleform" label-width="80px">
                <el-form-item label="所属部门">
                    <el-input v-model="roleform.deptname" :disabled="true" style="200px;"></el-input>
                </el-form-item>
                <el-form-item label="角色名称">
                    <el-input v-model="roleform.name" style="200px;"></el-input>
                </el-form-item>
            </el-form>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="线索" name="first">
                    <el-checkbox :indeterminate="checksomeclue" v-model="checkAllclue" @change="CheckAllclues">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroleclues" @change="handleCheckedroleclue">
                        <el-checkbox class="checkboxclass" v-for="item in cluerole" :key="item.id" :label="item.id" @change="changevalue($event,item.id)">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="客户" name="second">
                    <el-checkbox :indeterminate="checksomecustomer" v-model="checkAllcustomer" @change="CheckAllcustomers">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedrolecustomers" @change="handleCheckedrolecustomer">
                        <el-checkbox class="checkboxclass" v-for="item in customerole" :key="item.id" :label="item.id" @change="changevalue($event,item.id)">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="联系人" name="third">
                    <el-checkbox :indeterminate="checksomecontact" v-model="checkAllcontact" @change="CheckAllcontacts">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedrolecontacts" @change="handleCheckedrolecontact">
                        <el-checkbox class="checkboxclass" v-for="item in contactrole" :key="item.id" :label="item.id" @change="changevalue($event,item.id)">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="商机" name="fourth">
                    <el-checkbox :indeterminate="checksomeopportunity" v-model="checkAllopportunity" @change="CheckAllopportunitys">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroleopportunitys" @change="handleCheckedroleopportunity">
                        <el-checkbox class="checkboxclass" v-for="item in opportunityrole" :key="item.id" :label="item.id" @change="changevalue($event,item.id)">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="合同" name="fifth">
                    <el-checkbox :indeterminate="checksomeagreement" v-model="checkAllagreement" @change="CheckAllagreements">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroleagreements" @change="handleCheckedroleagreement">
                        <el-checkbox class="checkboxclass" v-for="item in agreementrole" :key="item.id" :label="item.id" @change="changevalue($event,item.id)">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="社交营销" name="sixth">
                    <el-checkbox :indeterminate="checksomeactivity" v-model="checkAllactivity" @change="CheckAllactivitys">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroleactivitys" @change="handleCheckedroleactivity">
                        <el-checkbox class="checkboxclass" v-for="item in activityrole" :key="item.id" :label="item.id" @change="changevalue($event,item.id)">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="系统设置" name="seventh">
                    <el-checkbox :indeterminate="checksomeset" v-model="checkAllset" @change="CheckAllsets">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedrolesets" @change="handleCheckedroleset">
                        <el-checkbox class="checkboxclass" v-for="item in setrole" :key="item.id" :label="item.id" @change="changevalue($event,item.id)">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="addrole()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改角色"
            :visible.sync="dialogVisible4"
            width="50%">
            <el-form ref="roleform" :model="roleform" label-width="80px">
                <el-form-item label="所属部门">
                    <el-input v-model="roleform.deptname" :disabled="true" style="200px;"></el-input>
                </el-form-item>
                <el-form-item label="角色名称">
                    <el-input v-model="roleform.name" style="200px;"></el-input>
                </el-form-item>
            </el-form>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="线索" name="first">
                    <el-checkbox :indeterminate="checksomeclue" v-model="checkAllclue" @change="CheckAllclues">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroleclues" @change="handleCheckedroleclue">
                        <el-checkbox class="checkboxclass" v-for="item in cluerole" :key="item.id" :label="item.id" @change="changevalue($event,item.id)">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="客户" name="second">
                    <el-checkbox :indeterminate="checksomecustomer" v-model="checkAllcustomer" @change="CheckAllcustomers">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedrolecustomers" @change="handleCheckedrolecustomer">
                        <el-checkbox class="checkboxclass" v-for="item in customerole" :key="item.id" :label="item.id" @change="changevalue($event,item.id)">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="联系人" name="third">
                    <el-checkbox :indeterminate="checksomecontact" v-model="checkAllcontact" @change="CheckAllcontacts">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedrolecontacts" @change="handleCheckedrolecontact">
                        <el-checkbox class="checkboxclass" v-for="item in contactrole" :key="item.id" :label="item.id" @change="changevalue($event,item.id)">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="商机" name="fourth">
                    <el-checkbox :indeterminate="checksomeopportunity" v-model="checkAllopportunity" @change="CheckAllopportunitys">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroleopportunitys" @change="handleCheckedroleopportunity">
                        <el-checkbox class="checkboxclass" v-for="item in opportunityrole" :key="item.id" :label="item.id" @change="changevalue($event,item.id)">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="合同" name="fifth">
                    <el-checkbox :indeterminate="checksomeagreement" v-model="checkAllagreement" @change="CheckAllagreements">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroleagreements" @change="handleCheckedroleagreement">
                        <el-checkbox class="checkboxclass" v-for="item in agreementrole" :key="item.id" :label="item.id" @change="changevalue($event,item.id)">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="社交营销" name="sixth">
                    <el-checkbox :indeterminate="checksomeactivity" v-model="checkAllactivity" @change="CheckAllactivitys">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedroleactivitys" @change="handleCheckedroleactivity">
                        <el-checkbox class="checkboxclass" v-for="item in activityrole" :key="item.id" :label="item.id" @change="changevalue($event,item.id)">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane label="系统设置" name="seventh">
                    <el-checkbox :indeterminate="checksomeset" v-model="checkAllset" @change="CheckAllsets">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedrolesets" @change="handleCheckedroleset">
                        <el-checkbox class="checkboxclass" v-for="item in setrole" :key="item.id" :label="item.id" @change="changevalue($event,item.id)">{{item.resourcename}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="updaterole()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    const roleOptions = [];

    export default {
        name:'organization',
        store,
        data(){
            return {
                datalist:[],
                defaultProps:{
                    label:'deptname',
                    children:'next',
                },
                newform:{
                    parentid:null,
                    parentname:null,
                    deptid:null,
                    deptname:null,
                },
                roleform:{
                    deptid:null,
                    deptname:null,
                    name:null,
                    ids:[],
                },
                searchList:{
                    deptid:null,
                    parentid:null,
                },
                roleList:[],
                clickdata:null,
                dialogVisible:false,
                dialogVisible2:false,
                dialogVisible3:false,
                dialogVisible4:false,
                
                activeName: 'first',
                
                checkAllclue: false,
                checkAllcustomer: false,
                checkAllcontact: false,
                checkAllopportunity: false,
                checkAllagreement: false,
                checkAllactivity: false,
                checkAllset: false,
                
                checksomeclue: false,
                checksomecustomer:false,
                checksomecontact:false,
                checksomeopportunity:false,
                checksomeagreement:false,
                checksomeactivity:false,
                checksomeset:false,

                checkedroleclues: [],
                checkedrolecustomers: [],
                checkedrolecontacts: [],
                checkedroleopportunitys: [],
                checkedroleagreements: [],             
                checkedroleactivitys: [],             
                checkedrolesets: [],             

                cluerole: null,
                customerole:null,
                contactrole:null,
                opportunityrole:null,
                agreementrole:null,
                activityrole:null,
                setrole:null,
            }
        },
        mounted(){
            this.loadData()
            this.reloadData()
            this.getresource()
        },
        activated(){
            this.loadData()
            this.reloadData()
            this.getresource()
        },
        methods:{
            //加载机构部门树结构
            loadData(){
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
            reloadData(){
                let _this = this
                let qs = require('querystring')
                let searchInfo = {}
                searchInfo.deptid = this.searchList.deptid
                searchInfo.parentid = this.searchList.parentid
                // console.log(searchInfo)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'role/selectRole.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(searchInfo)
                }).then(function(res){
                    // console.log(res.data)
                    _this.roleList = res.data
                }).catch(function(err){
                    console.log(err);
                });
            },
            getresource(){
                let _this = this
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'resource/getResources.do',
                }).then(function(res){
                    console.log(res.data)
                    _this.cluerole = res.data.name1
                    _this.customerole = res.data.name2
                    _this.contactrole = res.data.name3
                    _this.opportunityrole = res.data.name4
                    _this.agreementrole = res.data.name5
                    _this.activityrole = res.data.name6
                    _this.setrole = res.data.name7
                }).catch(function(err){
                    console.log(err);
                });
            },
            handleNodeClick(data){
                this.searchList.deptid = data.deptid
                this.searchList.parentid = data.parentid
                this.clickdata = data
                this.roleform.deptid = data.deptid
                // console.log(data.deptid)
                this.$options.methods.reloadData.bind(this)(true);
            },
            //上级部门添加
            handleappend(data){
                let _this = this
                // console.log(data)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'deptJurisdiction/insert.do',
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.parentname = data.deptname
                        _this.newform.parentid = data.deptid
                        _this.dialogVisible = true
                    }
                }).catch(function(err){
                    console.log(err);
                });
                
            },
            //上级部门添加提交按钮
            appenddept(){
                let _this = this;
                let qs = require('querystring')
                let data = {}
                data.parentid = this.newform.parentid
                data.parentname = this.newform.parentname
                data.deptname = this.newform.deptname
                // console.log(data)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'dept/insertDept.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'success'){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                    _this.dialogVisible = false
                    _this.searchList = []
                    _this.$options.methods.loadData.bind(_this)(true);
                    _this.$options.methods.reloadData.bind(_this)(true);
                }).catch(function(err){
                    console.log(err);
                });
            },
            //上级部门修改
            handleUpdate(data){
                // console.log(data)
                let _this = this;
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'deptJurisdiction/update.do',
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.parentname = data.parentname
                        _this.newform.deptid = data.deptid
                        _this.newform.deptname = data.deptname
                        _this.dialogVisible2 = true
                    }
                }).catch(function(err){
                    console.log(err);
                });
                
            },
            //上级部门修改提交按钮
            updatedept(){
                let _this = this;
                let qs = require('querystring')
                let data = {}
                data.deptid = this.newform.deptid
                data.deptname = this.newform.deptname
                // console.log(data)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'dept/updateDeptById.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'success'){
                        _this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                    _this.dialogVisible2 = false
                    _this.searchList = []
                    _this.$options.methods.loadData.bind(_this)(true);
                    _this.$options.methods.reloadData.bind(_this)(true);
                }).catch(function(err){
                    console.log(err);
                });
            },
            //上级部门删除提交按钮
            deletedept(node,data){
                let _this = this;
                let qs =require('querystring')
                let idData = {}
                idData.deptid = data.deptid
                // console.log(idData)
                _this.$confirm('是否确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'dept/deleteDeptById.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idData),
                    }).then(function(res){
                        // console.log(res)
                        if(res.data.msg && res.data.msg == 'success') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
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
                        _this.searchList = []
                        _this.$options.methods.loadData.bind(_this)(true);
                        _this.$options.methods.reloadData.bind(_this)(true);
                    }).catch(function(err){
                        console.log(err);
                    });
                });
            },
            handleClick(tab, event){
                // console.log(tab, event);
            },
            handleAdd(){
                let _this = this
                this.roleform.name = ''
                this.roleform.ids = []
                if(!this.clickdata){
                    _this.$message({
                        message:'请先选择部门，再添加角色',
                        type:'info'
                    })
                }else{
                    this.roleform.deptname = this.clickdata.deptname
                    this.dialogVisible3 = true
                }
                // console.log(this.roleform)
            },
            addrole(){
                let _this = this
                let qs = require('querystring')
                let data = {}
                data.deptid = this.roleform.deptid
                data.name = this.roleform.name
                data.ids = this.roleform.ids
                // console.log(data)
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'role/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'success'){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                        _this.dialogVisible3 = false
                        _this.$options.methods.reloadData.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    console.log(err)
                })
            },
            handleEdit(e,val){
                this.roleform.ids = []
                this.checkedroleclues = []
                this.checkedrolecustomers = []
                this.checkedrolecontacts = []
                this.checkedroleopportunitys = []
                this.checkedroleagreements = []
                this.checkedroleactivitys = []
                this.checkedrolesets = []
                let ids = val.resources
                ids.forEach(el => {
                    if(el.id){
                        // console.log(el.id)
                        this.roleform.ids.push(el.id)
                        this.checkedroleclues.push(el.id)
                        this.checkedrolecustomers.push(el.id)
                        this.checkedrolecontacts.push(el.id)
                        this.checkedroleopportunitys.push(el.id)
                        this.checkedroleagreements.push(el.id)
                        this.checkedroleactivitys.push(el.id)
                        this.checkedrolesets.push(el.id)
                    }
                });
                // console.log(this.roleform.ids)
                this.roleform.id = val.id
                this.roleform.name = val.name
                this.roleform.deptid = val.deptid
                this.roleform.deptname = val.deptname
                this.dialogVisible4 = true
            },
            updaterole(){
                let _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.roleform.id
                data.name = this.roleform.name
                data.deptid = this.roleform.deptid
                data.ids = this.roleform.ids
                // console.log(data.ids)
                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'role/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data),
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'success') {
                        _this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        _this.dialogVisible4 = false
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                    _this.$options.methods.reloadData.bind(_this)(true);
                }).catch(function(err){
                    console.log(err);
                });
            },
            handledelete(val){
                // console.log(val)
                let _this = this
                let data = {}
                let qs = require('querystring')
                data.id = val
                _this.$confirm('是否确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'role/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(data),
                    }).then(function(res){
                        // console.log(res)
                        if(res.data.msg && res.data.msg == 'success') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadData.bind(_this)(true);
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                        
                    }).catch(function(err){
                        console.log(err);
                    });
                })
            },
            CheckAllclues(val) {
                // console.log(val)
                let data = this.cluerole
                data.forEach(el => {
                    if(val == true){
                        this.checkedroleclues.push(el.id)
                        this.roleform.ids.push(el.id)
                    }else{
                        this.checkedroleclues.pop(el.id)
                        this.roleform.ids.pop(el.id)
                    }
                });
                // console.log(this.roleform.ids)
            },
            CheckAllcustomers(val) {
                let data = this.customerole
                data.forEach(el => {
                    if(val == true){
                        this.checkedrolecustomers.push(el.id)
                        this.roleform.ids.push(el.id)
                    }else{
                        this.checkedrolecustomers.pop(el.id)
                        this.roleform.ids.pop(el.id)
                    }
                });
            },
            CheckAllcontacts(val) {
                let data = this.contactrole
                data.forEach(el => {
                    if(val == true){
                        this.checkedrolecontacts.push(el.id)
                        this.roleform.ids.push(el.id)
                    }else{
                        this.checkedrolecontacts.pop(el.id)
                        this.roleform.ids.pop(el.id)
                    }
                });
            },
            CheckAllopportunitys(val) {
                let data = this.opportunityrole
                data.forEach(el => {
                    if(val == true){
                        this.checkedroleopportunitys.push(el.id)
                        this.roleform.ids.push(el.id)
                    }else{
                        this.checkedroleopportunitys.pop(el.id)
                        this.roleform.ids.pop(el.id)
                    }
                });
            },
            CheckAllagreements(val) {
                let data = this.agreementrole
                data.forEach(el => {
                    if(val == true){
                        this.checkedroleagreements.push(el.id)
                        this.roleform.ids.push(el.id)
                    }else{
                        this.checkedroleagreements.pop(el.id)
                        this.roleform.ids.pop(el.id)
                    }
                });
            },
            CheckAllactivitys(val) {
                let data = this.activityrole
                data.forEach(el => {
                    if(val == true){
                        this.checkedroleactivitys.push(el.id)
                        this.roleform.ids.push(el.id)
                    }else{
                        this.checkedroleactivitys.pop(el.id)
                        this.roleform.ids.pop(el.id)
                    }
                });
            },
            CheckAllsets(val) {
                let data = this.setrole
                data.forEach(el => {
                    if(val == true){
                        this.checkedrolesets.push(el.id)
                        this.roleform.ids.push(el.id)
                    }else{
                        this.checkedrolesets.pop(el.id)
                        this.roleform.ids.pop(el.id)
                    }
                });
            },
            handleCheckedroleclue(e) {
                // console.log(e)
                let checkedCount = e.length;
                this.checkAllclue = checkedCount === this.cluerole.length;
                this.checksomeclue = checkedCount > 0 && checkedCount < this.cluerole.length;
            },
            handleCheckedrolecustomer(e) {
                // console.log(e)
                let checkedCount = e.length;
                this.checkAllcustomer = checkedCount === this.customerole.length;
                this.checksomecustomer = checkedCount > 0 && checkedCount < this.customerole.length;
            },
            handleCheckedrolecontact(e) {
                // console.log(e)
                let checkedCount = e.length;
                this.checkAllcontact = checkedCount === this.contactrole.length;
                this.checksomecontact = checkedCount > 0 && checkedCount < this.contactrole.length;
            },
            handleCheckedroleopportunity(e) {
                // console.log(e)
                let checkedCount = e.length;
                this.checkAllopportunity = checkedCount === this.opportunityrole.length;
                this.checksomeopportunity = checkedCount > 0 && checkedCount < this.opportunityrole.length;
            },
            handleCheckedroleagreement(e) {
                // console.log(e)
                let checkedCount = e.length;
                this.checkAllagreement = checkedCount === this.agreementrole.length;
                this.checksomeagreement = checkedCount > 0 && checkedCount < this.agreementrole.length;
            },
            handleCheckedroleactivity(e) {
                // console.log(e)
                let checkedCount = e.length;
                this.checkAllactivity = checkedCount === this.activityrole.length;
                this.checksomeactivity = checkedCount > 0 && checkedCount < this.activityrole.length;
            },
            handleCheckedroleset(e) {
                // console.log(e)
                let checkedCount = e.length;
                this.checkAllset = checkedCount === this.setrole.length;
                this.checksomeset = checkedCount > 0 && checkedCount < this.setrole.length;
            },
            changevalue(e,val){
                let arr = this.roleform.ids
                if(e == false){
                    arr.forEach((el,i) => {
                        if(arr[i] == val){
                            this.roleform.ids.splice(i,1)
                        }
                    });
                }else{
                    this.roleform.ids.push(val)
                }
            },
        }
    }
</script>

<style>
    .contentall{
        background-color: #ffffff;
        height: 100%;
    }
    .leftcontent{
        width: 35%;
        height: auto;
        float: left;
        box-sizing: border-box;
        overflow-y: scroll;
    }
    .el-tree{
        margin: 20px 0;
    }
    .rightcontent{
        width: 64%;
        height: 100%;
        float: left;
        box-sizing: border-box;
    }
    .rolerecord{
        clear: both;
        width: 100%;
        list-style: none;
        position: relative;
    }
    .rolerecord li{
        float: left;
        font-size: 12px;
        box-sizing:border-box; 
        -moz-box-sizing:border-box; /* Firefox */ 
        -webkit-box-sizing:border-box;
    }
    .rolecontent{
        width:94%;
        line-height:20px;
        height: auto;
        color: #000000;
        padding-top: 5px;
        padding-left: 10px;
        border-radius: 5px;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .showhover{
        visibility: visible;
    }
    /* .showhover:focus,.showhover:hover{
        visibility: hidden;
    } */
    .checkboxclass{
        width: 100px;
    }
    .checkboxclass:first-child{
        margin-left: 30px;
    }
    .el-icon-info{
        font-size: 12px;
    }
</style>
