<template>
    <div class="contentall">
        <div class="setleftcontent">
            <el-menu :default-active="defaultIndex" class="el-menu-vertical-demo base_menu">
                <el-submenu index="1">
                    <span slot="title">
                        便签
                        <i class="el-icon-plus" style="margin-left:112px;line-height:40px;font-size:12px;color:#606266" @click="addMenu"></i>
                    </span>
                    <el-menu-item v-for="(item,i) in noteMenu" :key="i" :index="item.index" style="position: relative;" @click="showTableval(item)">
                        {{item.name}}
                        <span class="menu_btn">
                            <i class="el-icon-edit" style="font-size:12px;margin:0" @click="updateMenu(item)"></i>
                            <i class="el-icon-delete" style="font-size:12px;margin:0" @click="handleDelete(0,item)"></i>
                        </span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="setrightcontent">
            <ul class="note_ul" v-show="noteData.length == 0 && newform.parentid">
                <li class="note_li" v-for="a in noneData" :key="a.index">
                    <div class="note_set">
                        <i class="el-icon-plus" @click="noteDialog = true"></i>
                        <span></span>
                        <i></i>
                    </div>
                    <div class="note_c"></div>
                </li>
            </ul>
            <ul class="note_ul" v-show="noteData.length !== 0">
                <li class="note_li" v-for="a in noteData" :key="a.index">
                    <div class="note_set">
                        <i class="el-icon-plus" @click="noteDialog = true"></i>
                        <span>2019-06-28 18:12:26</span>
                        <i class="el-icon-delete" @click="handleDelete(1,a)"></i>
                    </div>
                    <div class="note_c" v-html="a.name"></div>
                </li>
            </ul>
        </div>

        <el-dialog title="便签分类" :visible.sync="menuDialog" :close-on-click-modal="false" width="500px">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules">
                <el-form-item prop="name" label="便签类别">
                    <el-input v-model="newform.name" style="width:90%;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="menuDialog = false">取 消</el-button>
                <el-button type="primary" @click="menuSubmit()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="便签信息" :visible.sync="noteDialog" :close-on-click-modal="false" width="500px">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules">
                <el-form-item label="便签类别">
                    <el-input v-model="newform.parentname" :disabled="true" style="width:90%;"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="name" label="便签信息"> -->
                    <!-- <el-input v-model="newform.name" style="width:90%;"></el-input> -->
                    <div class="editor-container">
                        <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
                    </div>
                <!-- </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="noteDialog = false">取 消</el-button>
                <el-button type="primary" @click="noteSubmit()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    import UE from '../../ue.vue'

    export default {
        name:'note',
        store,
        components:{UE},
        data(){
            return{
                msg:'note.vue',

                defaultIndex:null,

                noteMenu:[],
                noteData:[],
                noneData:[
                    {index:'1',name:''}
                ],

                menuDialog:false,
                noteDialog:false,

                newform:{
                    parentid:null,
                    parentname:null,
                    name:null,
                },
                rules:{},
                defaultMsg:'',
                config: {
                    initialFrameWidth: '',
                    initialFrameHeight: 300,
                    toolbars:[[
                        'bold', 'italic', 'underline', 'forecolor', '|', 
                        'insertorderedlist', 'insertunorderedlist', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                    ]],
                    elementPathEnabled:false,
                    wordCount:false,
                },

                loadStart:true,
            }
        },
        mounted(){
            this.loadMenu()
        },
        activated(){
            this.loadMenu()
            this.loadNote()
        },
        methods:{
            loadMenu(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'noteType/getNote.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                }).then(function(res){
                    _this.noteMenu = res.data
                    res.data.forEach((el,i) => {
                        if(i == 0){
                            _this.newform.parentid = el.id
                            _this.newform.parentname = el.name
                            _this.defaultIndex = el.index
                        }
                        if(_this.loadStart){
                            _this.$options.methods.loadNote.bind(_this)()
                        }
                    });
                }).catch(function(err){
                });
            },
            loadNote(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.parentid = this.newform.parentid

                if(data.parentid){
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'noteType/getNoteTypeByParentId.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                        data: qs.stringify(data)
                    }).then(function(res){
                        _this.noteData = res.data
                    }).catch(function(err){
                    });
                }
            },
            showTableval(val){
                this.newform.parentid = val.id
                this.newform.parentname = val.name
                this.$options.methods.loadNote.bind(this)()
            },
            addMenu(){
                this.menuDialog = true
                this.newform.name = null
                this.newform.parentid = null
            },
            updateMenu(val){
                this.menuDialog = true
                this.newform.name = val.name
            },
            menuSubmit(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.name = this.newform.name
                let submitURL = null
                if(this.newform.parentid){
                    data.id = this.newform.parentid
                    submitURL = _this.$store.state.defaultHttp+'noteType/updateNoteTypeById.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId
                }else{
                    submitURL = _this.$store.state.defaultHttp+'noteType/insertNoteType.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId
                }

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
                        _this.menuDialog = false
                        _this.loadStart = false
                        _this.$options.methods.loadMenu.bind(_this)()
                        _this.$options.methods.loadNote.bind(_this)()
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                });
            },
            // addNote(){
            //     this.noteDialog = true
            // },
            noteSubmit(){
                const _this = this
                let qs = require('querystring')
                let content = this.$refs.ue.getUEContent()
                let data = {}
                data.name = content
                data.parentid = this.newform.parentid

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'noteType/insertNote.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'操作成功',
                            type:'success'
                        })
                        _this.noteDialog = false
                        _this.$options.methods.loadNote.bind(_this)()
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                });
            },
            handleDelete(index,val){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = val.id

                _this.$confirm('确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'noteType/deleteNoteTypeById.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                        data: qs.stringify(data)
                    }).then(function(res){
                        if(res.data.code && res.data.code == '200'){
                            _this.$message({
                                message:'操作成功',
                                type:'success'
                            })
                            if(index == 0){
                                _this.loadStart = true
                                _this.$options.methods.loadMenu.bind(_this)()
                            }else if(index == 1){
                                _this.loadStart = false
                                _this.$options.methods.loadMenu.bind(_this)()
                                _this.$options.methods.loadNote.bind(_this)()
                            }
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
                        message: '取消删除'
                    });       
                });
            },
        },
    }
</script>

<style>
    .menu_btn{
        position: absolute;
        right: 15px;
        font-size: 12px;
        line-height:40px;
        color:#606266
    }
    .note_ul{
        width: 100%;
        height: 360px;
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
    }
    .note_li{
        flex: 0 0 calc(25% - 25px);
        height: 200px;
        background-color: #fcfbdd;
        color: #20222a;
        margin-left: 20px;
        margin-top: 20px;
    }
    .note_set{
        width: 100%;
        height: 30px;
        background-color: #f8f7d5;
        font-size: 12px;
        text-align: center;
        color: #919191;
        display: flex;
        justify-content: center;
    }
    .note_set i{
        flex: 0 0 30px;
        line-height: 30px;
        cursor: pointer;
    }
    .note_set i:hover{
        font-weight: bold
    }
    .note_set span{
        flex: 0 0 calc(100% - 70px);
        line-height: 30px;
    }
    .note_c{
        padding: 5px 15px;
        box-sizing: border-box;
        font-size: 14px;
    }
</style>
