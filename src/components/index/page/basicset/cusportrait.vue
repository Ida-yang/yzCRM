<template>
    <div class="contentall">
        <div class="setleftcontent">
            <el-menu default-active="1" class="el-menu-vertical-demo base_menu">
                <el-submenu index="1">
                    <span slot="title">个人画像</span>
                    <el-menu-item v-for="item in personalList" :key="item.index" :index="item.index" @click="showTableval(item)">{{item.name}}</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <span slot="title">家庭画像</span>
                    <el-menu-item v-for="item in familyList" :key="item.index" :index="item.index" @click="showTableval(item)">{{item.name}}</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <span slot="title">兴趣画像</span>
                    <el-menu-item v-for="item in interestList" :key="item.index" :index="item.index" @click="showTableval(item)">{{item.name}}</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <span slot="title">消费画像</span>
                    <el-menu-item v-for="item in consumptionList" :key="item.index" :index="item.index" @click="showTableval(item)">{{item.name}}</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <span slot="title">企业画像</span>
                    <el-menu-item v-for="item in enterpriseList" :key="item.index" :index="item.index" @click="showTableval(item)">{{item.name}}</el-menu-item>
                </el-submenu>
                <el-submenu index="6">
                    <span slot="title">其他</span>
                    <el-menu-item v-for="item in otherList" :key="item.index" :index="item.index" @click="showTableval(item)">{{item.name}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="setrightcontent">
            <div class="entry">
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            </div>
            <el-table :data="cusportraitData" border stripe style="width:100%">
                <el-table-column header-align="center" align="center" type="index" width="45" />
                <el-table-column label="名称" prop="typeName" min-width="120" sortable />
                <el-table-column label="备注" prop="notes" min-width="180" sortable />
                <el-table-column label="操作" width="150" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handledelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog title="添加画像" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules">
                <el-form-item prop="type" label="客户画像类别">
                    <el-input v-model="newform.type" :disabled="disabledBtn"></el-input>
                </el-form-item>
                <el-form-item prop="typeName" label="画像值">
                    <el-input v-model="newform.typeName" placeholder="请输入画像值"></el-input>
                </el-form-item>
                <el-form-item prop="notes" label="备注">
                    <el-input v-model="newform.notes" type="textarea" rows="5" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    
    export default {
        name:'cusportrait',
        store,
        data(){
            return{
                msg:'cusportrait.vue',

                cusportraitData:[],
                personalList:[
                    {index:'1',name:'性别',isActive:true},
                    {index:'2',name:'年龄',isActive:false},
                    {index:'3',name:'职业',isActive:false},
                    {index:'4',name:'岗位',isActive:false},
                    {index:'5',name:'学历',isActive:false},
                ],
                familyList:[
                    {index:'6',name:'婚姻状况',isActive:false},
                    {index:'7',name:'家庭人数',isActive:false},
                    {index:'8',name:'子女人数',isActive:false},
                    {index:'9',name:'父母人数',isActive:false},
                    {index:'10',name:'年收入',isActive:false},
                ],
                interestList:[
                    {index:'11',name:'行为爱好',isActive:false},
                    {index:'12',name:'阅读兴趣',isActive:false},
                    {index:'13',name:'社交兴趣',isActive:false},
                    {index:'14',name:'运动兴趣',isActive:false},
                    {index:'19',name:'影视兴趣',isActive:false},
                    {index:'20',name:'音乐兴趣',isActive:false},
                    {index:'21',name:'饮食兴趣',isActive:false},
                ],
                consumptionList:[
                    {index:'15',name:'手机兴趣',isActive:false},
                    {index:'16',name:'品牌兴趣',isActive:false},
                    {index:'17',name:'车辆兴趣',isActive:false},
                    {index:'18',name:'品茶兴趣',isActive:false},
                    {index:'22',name:'服饰兴趣',isActive:false},
                ],
                enterpriseList:[
                    {index:'23',name:'大行业',isActive:false},
                    {index:'24',name:'小行业',isActive:false},
                    {index:'25',name:'企业规模',isActive:false},
                    {index:'26',name:'成立年限',isActive:false},
                    {index:'27',name:'是否上市',isActive:false},
                    {index:'28',name:'是否融资',isActive:false},
                    {index:'29',name:'经营状态',isActive:false},
                    {index:'30',name:'企业类型',isActive:false},
                ],
                otherList:[],

                valIndex:'1',
                newform:{
                    type:'性别',
                    id:null,
                    parentid:null,
                    typeName:null,
                    note:null,
                },
                rules:{
                    type: [{ required: true, message: '画像类别名称不能为空', trigger: 'blur' },],
                    typeName: [{ required: true, message: '画像值不能为空', trigger: 'blur' },],
                },
                dialogVisible:false,
                disabledBtn:true,
            }
        },
        mounted(){
            this.loadOtherType()
            this.loadData()
        },
        activated(){
            this.loadData()
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.type = this.newform.type

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'portraitType/getPortraitTypeGroupByType.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.cusportraitData = res.data
                }).catch(function(err){
                });
            },
            loadOtherType(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'portraitType/getOthersPortraitType.do?cId='+_this.$store.state.iscId
                }).then(function(res){
                    _this.otherList = res.data.portraitTypes
                }).catch(function(err){
                });
            },
            //显示左边对应表格和数据
            showTableval(val){
                const _this = this
                this.valIndex = val.index
                this.newform.type = val.name
                val.isActive = !val.isActive;
                if(val.id){
                    this.newform.parentid = val.id
                    this.disabledBtn = false
                }else{
                    this.newform.parentid = null
                    this.disabledBtn = true
                }
                _this.$options.methods.loadData.bind(_this)(true)
            },
            handleAdd(){
                const _this = this
                this.newform.id = null
                this.newform.typeName = null
                this.newform.notes = null
                this.dialogVisible = true
            },
            handleEdit(index,row){
                const _this = this
                this.newform.id = row.id
                this.newform.typeName = row.typeName
                this.newform.notes = row.notes
                this.dialogVisible = true
            },
            handledelete(index,row){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = row.id

                _this.$confirm('确认删除 ['+ row.typeName +'] 吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'portraitType/deletePortraitTypeById.do?cId='+_this.$store.state.iscId,
                        data: qs.stringify(data)
                    }).then(function(res){
                        if(res.data.code && res.data.code == '200'){
                            _this.$message({
                                message:'操作成功',
                                type:'success'
                            })
                            _this.$options.methods.loadData.bind(_this)()
                        }else{
                            _this.$message({
                                message:res.data.msg,
                                type:'error'
                            })
                        }
                    }).catch(function(err){
                    });
                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '取消删除【' + row.typeName + '】'
                    });       
                });
            },
            submit(){
                const _this = this
                let qs = require('querystring')
                let showload = false
                let submitURL = ''
                let data = {}
                if(this.newform.parentid){
                    data = {
                        id:this.newform.id,
                        parentid:this.newform.parentid,
                        parentname:this.newform.type,
                        typeName:this.newform.typeName,
                        notes:this.newform.notes,
                    }
                    showload = true
                    submitURL = _this.$store.state.defaultHttp+'portraitType/saveOrUpdateOthersPortrait.do?cId='+_this.$store.state.iscId
                }else{
                    data = {
                        id:this.newform.id,
                        type:this.newform.type,
                        typeName:this.newform.typeName,
                        notes:this.newform.notes,
                    }
                    showload = false
                    submitURL = _this.$store.state.defaultHttp+'portraitType/saveOrUpdate.do?cId='+_this.$store.state.iscId
                }

                let flag = false
                if(!data.typeName){
                    _this.$message({
                        message:'画像值不能为空',
                        type:'error'
                    })
                    flag = true
                }
                if(data.parentid && !data.parentname){
                    _this.$message({
                        message:'画像类别名称不能为空',
                        type:'error'
                    })
                    flag = true
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: submitURL,
                    data: qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'操作成功',
                            type:'success'
                        })
                        _this.dialogVisible = false
                        if(showload){
                            _this.$options.methods.loadOtherType.bind(_this)()
                        }
                        _this.$options.methods.loadData.bind(_this)()
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                });
            },
        },
    }
</script>
