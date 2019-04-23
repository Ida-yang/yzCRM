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
            </div>
            <el-table
                :data="tableData"
                border
                stripe
                style="width:100%;text-align:left"
                v-show="showtopfour">
                <el-table-column
                    header-align="left"
                    align=""
                    type="selection"
                    width="45"
                    scope.row.id
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="sort"
                    header-align="left"
                    align="left"
                    label="顺序"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="id"
                    header-align="left"
                    align="left"
                    width="100"
                    label="ID"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="typeName"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="notes"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="备注"
                    sortable>
                </el-table-column>
                <el-table-column label="操作"
                    width="140"
                    header-align="center"
                    align="left">
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
            <el-table
                :data="tableData2"
                border
                stripe
                style="width:100%;text-align:left"
                v-show="showfive">
                <el-table-column
                    header-align="left"
                    align=""
                    type="selection"
                    width="45"
                    scope.row.id
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="sort"
                    header-align="left"
                    align="left"
                    label="顺序"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="typeName"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="方式名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="content"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="跟进内容"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="notes"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="备注"
                    sortable>
                </el-table-column>
                <el-table-column label="操作"
                    width="140"
                    header-align="center"
                    align="left">
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
            <el-table
                :data="tableData3"
                border
                stripe
                style="width:100%;text-align:left"
                v-show="showsix">
                <el-table-column
                    header-align="left"
                    align=""
                    type="selection"
                    width="45"
                    scope.row.id
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="sort"
                    header-align="left"
                    align="left"
                    label="顺序"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="step_name"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="状态名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="step_probability"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="成功几率"
                    sortable>
                    <template slot-scope="scope">
                        <div>{{scope.row.step_probability}} %</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="notes"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="备注"
                    sortable>
                </el-table-column>
                <el-table-column label="操作"
                    width="140"
                    header-align="center"
                    align="left">
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
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
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
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
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
        <el-dialog
            title="添加快捷方式"
            :visible.sync="dialogVisible3"
            width="40%">
            <el-form ref="newform" :model="newform" label-width="80px" :rules="rules">
                <el-form-item prop="type" label="状态类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="quickname" label="快捷方式">
                    <el-input v-model="newform.quickname" placeholder="请输入快捷方式"></el-input>
                </el-form-item>
                <el-form-item prop="quickcontent" label="跟进内容">
                    <el-input v-model="newform.quickcontent" placeholder="请输入跟进内容"></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序编号">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
                </el-form-item>
                <el-form-item prop="notes" label="备注">
                    <el-input v-model="newform.notes" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="addbasicset()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改快捷方式"
            :visible.sync="dialogVisible4"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="80px">
                <el-form-item prop="type" label="状态类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="quickname" label="快捷方式">
                    <el-input v-model="newform.quickname" placeholder="请输入快捷方式"></el-input>
                </el-form-item>
                <el-form-item prop="quickcontent" label="跟进内容">
                    <el-input v-model="newform.quickcontent" placeholder="请输入跟进内容"></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序编号">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="notes" label="备注">
                    <el-input v-model="newform.notes" placeholder="请输入备注"></el-input>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="updatebasicset()">确 定</el-button>
            </span>
        </el-dialog>
        
        <el-dialog
            title="添加商机进度"
            :visible.sync="dialogVisible5"
            width="40%">
            <el-form ref="newform" :model="newform" label-width="80px" :rules="rules">
                <el-form-item prop="type" label="状态类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="typeName" label="进度名称">
                    <el-input v-model="newform.typeName" placeholder="请输入进度名称"></el-input>
                </el-form-item>
                <el-form-item prop="probability" label="成功几率">
                    <el-input type="number" min="0" max="100" v-model="newform.probability" placeholder="请输入成功几率"><span slot="suffix" style="margin-right:20px">%</span></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序编号">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="notes" label="备注">
                    <el-input v-model="newform.notes" placeholder="请输入备注"></el-input>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible5 = false">取 消</el-button>
                <el-button type="primary" @click="addoppstep()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改商机进度"
            :visible.sync="dialogVisible6"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="80px">
                <el-form-item prop="type" label="状态类别">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="typeName" label="状态名称">
                    <el-input v-model="newform.typeName" placeholder="请输入状态名称"></el-input>
                </el-form-item>
                <el-form-item prop="probability" label="成功几率">
                    <el-input type="number" min="0" max="100" v-model="newform.probability" placeholder="请输入成功几率"><span slot="suffix" style="margin-right:20px">%</span></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序编号">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.sort" placeholder="请输入排序编号"></el-input>
                </el-form-item>
                <el-form-item prop="notes" label="备注">
                    <el-input v-model="newform.notes" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible6 = false">取 消</el-button>
                <el-button type="primary" @click="updateoppstep()">确 定</el-button>
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
                tableData2:[],
                tableData3:[],

                dataList:null,
                nameList:[
                    {index:1,name:'线索状态',isActive:true},
                    {index:2,name:'客户状态',isActive:false},
                    {index:3,name:'客户来源',isActive:false},
                    {index:4,name:'客户级别',isActive:false},
                    {index:5,name:'快捷方式',isActive:false},
                    {index:6,name:'商机进度',isActive:false}
                ],
                newform:{
                    type:'线索状态',
                    index:'1',
                    id:null,
                    sort:null,
                    typeName:null,
                    notes:null,
                    quickname:null,
                    quickcontent:null,
                    probability:null,
                },

                checklist:['顺序','名称','备注'],
                idArr:{
                    id:null,
                },

                showtopfour:true,
                showfive:false,
                showsix:false,

                dialogVisible:false,
                dialogVisible2:false,
                dialogVisible3:false,
                dialogVisible4:false,
                dialogVisible5:false,
                dialogVisible6:false,

                rules: {
                    typeName : [{ required: true, message: '名称不能为空', trigger: 'blur' },],
                    sort : [{ required: true, message: '排序编号不能为空', trigger: 'blur' },],
                    quickname : [{ required: true, message: '快捷方式不能为空', trigger: 'blur' },],
                    quickcontent : [{ required: true, message: '跟进内容不能为空', trigger: 'blur' },],
                    probability : [{ required: true, message: '成功几率不能为空', trigger: 'blur' },],
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
                const _this = this
                let qs = require('querystring')
                let i = this.newform.index
                let data = {}
                data.type = this.newform.type
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoGroupByType.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(i == 1 || i == 2 || i == 3 || i == 4){
                        _this.$store.state.stateList = res.data
                    }else if(i == 5){
                        _this.tableData2 = res.data
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadOppStep(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'addstep/selectAddstep.do?cId='+_this.$store.state.iscId
                }).then(function(res){
                    _this.tableData3 = res.data.map.addsteps
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //显示左边对应表格数据
            showTableval(val){
                const _this = this
                let i = val.index
                this.newform.type = val.name
                this.newform.index = val.index
                this.nameList.forEach(function(obj){
                    obj.isActive = false;
                });
                val.isActive = !val.isActive;
                if(i == 1 || i == 2 || i == 3 || i == 4){
                    _this.showtopfour = true
                    _this.showfive = false
                    _this.showsix = false
                    _this.$options.methods.reloadTable.bind(_this)(true)
                }else if(i == 5){
                    _this.showtopfour = false
                    _this.showfive = true
                    _this.showsix = false
                    _this.$options.methods.reloadTable.bind(_this)(true)
                }else if(i == 6){
                    _this.showtopfour = false
                    _this.showfive = false
                    _this.showsix = true
                    _this.$options.methods.loadOppStep.bind(_this)(true)
                }
            },
            //添加
            handleAdd(){
                const _this = this
                let i = this.newform.index

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'typeInfoJurisdiction/insert.do',//新增
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.sort = null
                        _this.newform.notes = null
                        if(i == 1 || i == 2 || i == 3 || i == 4){
                            _this.newform.typeName = null
                            _this.dialogVisible = true
                        }else if(i == 5){
                            _this.newform.quickname = null
                            _this.newform.quickcontent = null
                            _this.dialogVisible3 = true
                        }else if(i == 6){
                            _this.newform.typeName = null
                            _this.newform.probability = null
                            _this.dialogVisible5 = true
                        }
                    }
                }).catch(function(err){
                    // console.log(err);
                });
                
            },
            //添加提交按钮
            addbasicset(){
                const _this = this;
                let qs = require('querystring')
                let i = this.newform.index
                let data = {}
                data.type = this.newform.type
                data.sort = this.newform.sort
                data.notes = this.newform.notes
                if(i == 1 || i == 2 || i == 3 || i == 4){
                    data.typeName = this.newform.typeName
                }else if(i == 5){
                    data.typeName = this.newform.quickname
                    data.content = this.newform.quickcontent
                }
                
                let flag = false;
                if(!data.sort){
                    _this.$message({
                        message: "排序编号不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(i == 1 || i == 2 || i == 3 || i == 4){
                    if(!data.typeName){
                        _this.$message({
                            message: "状态名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                }else if(i == 5){
                    if(!data.content){
                        _this.$message({
                            message: "跟进内容不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!data.typeName){
                        _this.$message({
                            message: "快捷方式不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                        _this.dialogVisible = false
                        _this.dialogVisible3 = false
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("添加失败,请重新添加");
                });
            },
            addoppstep(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.type = this.newform.type
                data.sort = this.newform.sort
                // data.notes = this.newform.notes
                data.step_name = this.newform.typeName
                data.step_probability = this.newform.probability
                
                let flag = false;
                if(!data.sort){
                    _this.$message({
                        message: "排序编号不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.step_name){
                    _this.$message({
                        message: "商机进度不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.step_probability){
                    _this.$message({
                        message: "成功几率不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'addstep/insertAddstep.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                        _this.dialogVisible5 = false
                        _this.$options.methods.loadOppStep.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("添加失败,请重新添加");
                });
            },
            //修改
            handleEdit(index,row){
                const _this = this
                let i = this.newform.index

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'typeInfoJurisdiction/update.do',//编辑
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.sort = row.sort
                        _this.newform.notes = row.notes
                        if(i == 1 || i == 2 || i == 3 || i == 4){
                            _this.newform.id = row.id
                            _this.newform.typeName = row.typeName
                            _this.dialogVisible2 = true
                        }else if(i == 5){
                            _this.newform.id = row.id
                            _this.newform.quickname = row.typeName
                            _this.newform.quickcontent = row.content
                            _this.dialogVisible4 = true
                        }else if(i == 6){
                            _this.newform.id = row.step_id
                            _this.newform.typeName = row.step_name
                            _this.newform.probability = row.step_probability
                            _this.dialogVisible6 = true
                        }
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //修改提交按钮
            updatebasicset(){
                const _this = this;
                let i = this.newform.index
                let qs = require('querystring')
                let data = {}
                data.id = this.newform.id
                data.type = this.newform.type
                data.sort = this.newform.sort
                data.notes = this.newform.notes
                if(i == 1 || i == 2 || i == 3 || i == 4){
                    data.typeName = this.newform.typeName
                }else if(i == 5){
                    data.typeName = this.newform.quickname
                    data.content = this.newform.quickcontent
                }else if(i == 6){
                    data.typeName = this.newform.typeName
                    data.probability = this.newform.probability
                }
                
                let flag = false;
                if(!data.sort){
                    _this.$message({
                        message: "排序编号不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(i == 1 || i == 2 || i == 3 || i == 4){
                    if(!data.typeName){
                        _this.$message({
                            message: "状态名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                }else if(i == 5){
                    if(!data.content){
                        _this.$message({
                            message: "跟进内容不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!data.typeName){
                        _this.$message({
                            message: "快捷方式不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                }
                if(flag) return
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'typeInfo/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                        _this.dialogVisible2 = false
                        _this.dialogVisible4 = false
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("修改失败,请重新修改");
                });
            },
            updateoppstep(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.step_id = this.newform.id
                data.type = this.newform.type
                data.sort = this.newform.sort
                // data.notes = this.newform.notes
                data.step_name = this.newform.typeName
                data.step_probability = this.newform.probability
                
                let flag = false;
                if(!data.sort){
                    _this.$message({
                        message: "排序编号不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.step_name){
                    _this.$message({
                        message: "商机进度不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.step_probability){
                    _this.$message({
                        message: "成功几率不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'addstep/updateAddstep.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                        _this.dialogVisible6 = false
                        _this.$options.methods.loadOppStep.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("修改失败,请重新修改");
                });
            },
            handledelete(index,row){
                const _this = this;
                let i = this.newform.index
                let qs =require('querystring')
                let idArr = [];
                let urls = null
                let val = null
                if(i == 1 || i == 2 || i == 3 || i == 4 || i == 5){
                    idArr.id = row.id
                    urls = _this.$store.state.defaultHttp+ 'typeInfo/deleteTypeInfoById.do?cId='+_this.$store.state.iscId // 删除辅助资料
                    val = row.typeName
                }else if(i == 6){
                    idArr.step_id = row.step_id
                    urls = _this.$store.state.defaultHttp+ 'addstep/deleteByPrimaryKey.do?cId='+_this.$store.state.iscId  // 删除商机进度
                    val = row.step_name
                }
                

                _this.$confirm('确认删除 ['+ val +'] 吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: urls,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            if(i == 1 || i == 2 || i == 3 || i == 4 || i == 5){
                                _this.$options.methods.reloadTable.bind(_this)(true);
                            }else if(i == 6){
                                _this.$options.methods.loadOppStep.bind(_this)(true);
                            }
                            
                        } else if(res.data.msg && res.data.msg == 'error'){//删除
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
                        _this.$message.error("删除失败,请重新删除");
                    });
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '取消删除'
                    });       
                });
            },
        }
    }
</script>
<style>
</style>
