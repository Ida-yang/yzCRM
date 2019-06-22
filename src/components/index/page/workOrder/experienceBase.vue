<template>
    <!-- 经验库 -->
    <div class="contentall">
        <div class="otherleftcontent">
            <el-tree
                node-key="id" highlight-current default-expand-all
                :data="classData"
                :props="defaultProps"
                :expand-on-click-node="false"
                @node-click="handleNodeClick">
            </el-tree>
        </div>
        <div class="otherightcontent">
            <div class="entry">
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>

                <div class="totalnum_head">共 <span class="bold_span">{{tableNumber}}</span> 条</div>
            </div>

            <div class="eb_content">
                <ul v-for="item in experienceBaseList" :key="item.id" class="ed_ul">
                    <li class="ed_li_1" @click="opendetials(item)">
                        <img :src="item.portrait" width="50" height="50" style="border-radius:25px" />
                    </li>
                    <li class="ed_li_2">
                        <p class="ed_p_1" @click="opendetials(item)">{{item.title}}<span class="ed_p_span">{{item.createTime}}</span></p>
                        <div class="ed_p_2">
                            <span class="ed_span_1" @click="opendetials(item)">创建人：{{item.private_employee}}</span>
                            <el-dropdown trigger="click" @command="delOrEdit($event,item)" class="ed_drop">
                                <span class="el-dropdown-link">更多<i class="el-icon-caret-bottom"></i></span>
                                <el-dropdown-menu slot="dropdown" class="drop_item">
                                    <el-dropdown-item command="edit">编辑</el-dropdown-item>
                                    <el-dropdown-item command="del">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </li>
                </ul>
            </div>
            
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

            <el-dialog title="新增/编辑" :visible.sync="addDialog" :close-on-click-modal="false" width="60%">
                <el-form ref="myform" :model="myform" label-width="80px" :rules="rules" style="padding-right:30px">
                    <el-form-item label="工单分类">
                        <el-input v-model="myform.service_type_name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item prop="title" label="标题">
                        <el-input v-model="myform.title"></el-input>
                    </el-form-item>
                    <el-form-item prop="describe" label="描述">
                        <div class="editor-container">
                            <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
                        </div>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialog = false">取 消</el-button>
                    <el-button type="primary" @click="addSubmit">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    import UE from '../../ue.vue'

    export default {
        name:'experienceBase',
        store,
        components: {UE},
        computed:{
            experienceBaseList(){
                return store.state.experienceBaseList
            },
            tableNumber(){
                return store.state.experienceBaseListnumber
            },
        },
        data(){
            return{
                msg:'经验库',
                
                classData:[],
                defaultProps:{
                    label:'name',
                    children:'next',
                },
                defaultkeys:[1],

                page:1,
                limit:20,
                searchList:{
                    searchName:null,
                    type:null,
                    typeName:null,
                },

                addDialog:false,
                editDialog:false,
                myform:{
                    id:null,
                    title:null,
                    describe:null,
                    service_type_id:null,
                    service_type_name:null,
                },
                rules:{},
                defaultMsg:'填写描述前请把这句话删掉',
                config: {
                    initialFrameWidth: '',
                    initialFrameHeight: 500,
                    toolbars:[[
                        'undo', 'redo', '|',
                        'bold', 'italic', 'underline', 'strikethrough', 'forecolor', 'backcolor', '|',
                        'formatmatch', 'autotypeset', 'insertorderedlist', 'insertunorderedlist', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                        'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                        'insertimage', 'attachment', 'spechars', 'snapscreen', '|',
                        'imagenone', 'imageleft', 'imageright', 'imagecenter',
                    ]]
                },
            }
        },
        mounted(){
            this.loadTree()
            this.loadData()
        },
        activated(){
            this.loadData()
        },
        methods:{
            loadTree(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'serviceType/getServiceTypeNodeTree.do?cId='+_this.$store.state.iscId
                }).then(function(res){
                    _this.classData = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadData(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.page = this.page
                data.limit = this.limit
                data.searchName = this.searchList.searchName
                data.type = this.searchList.type

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'knowledgeBase/queryForList.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let data = res.data.map.success
                    data.forEach(el => {
                        if(el.img){
                            el.portrait = _this.$store.state.systemHttp + 'upload/' + _this.$store.state.iscId + '/' + el.img
                        }else{
                            el.portrait = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                        }
                    });
                    _this.$store.state.experienceBaseList = data
                    _this.$store.state.experienceBaseListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleNodeClick(data){
                if(data.next.length){
                    this.$message({
                        message:"该分类下该有明细分类，不可添加",
                        type:'error'
                    })
                }else{
                    this.searchList.type = data.id
                    this.searchList.typeName = data.name
                    this.$options.methods.loadData.bind(this)()
                }
            },
            opendetials(val){
                this.$store.state.expBasedetailData = val
                this.$router.push({ path: '/experienceBasedetail' });
            },
            handleAdd(){
                this.addDialog = true
                this.myform = {
                    id:null,
                    title:null,
                    describe:null,
                    service_type_id:this.searchList.type,
                    service_type_name:this.searchList.typeName,
                    pId:this.$store.state.ispId
                }
            },
            delOrEdit(e,val){
                const _this = this
                let qs = require('querystring')
                if(e == 'edit'){
                    this.addDialog = true
                    this.myform = {
                        id:val.id,
                        title:val.title,
                        describe:val.describe,
                        service_type_id:val.service_type_id,
                        service_type_name:val.service_type_name,
                        pId:val.pId
                    }
                }else if(e == 'del'){
                    let data = {}
                    data.id = val.id
                    _this.$confirm('是否确认删除[' + val.title + ']？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        axios({
                            method: 'post',
                            url: _this.$store.state.defaultHttp+'knowledgeBase/delete.do?cId='+_this.$store.state.iscId,
                            data:qs.stringify(data),
                        }).then(function(res){
                            if(res.data.code && res.data.code == '200') {
                                _this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                _this.$options.methods.loadData.bind(_this)();
                            }else if(res.data.msg && res.data.msg == 'error'){//删除经验库
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
                            _this.$message.error("删除失败,请重新删除");
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消删除【' + row.name + '】'
                        });       
                    });
                }
            },
            addSubmit(){
                const _this = this
                let content = this.$refs.ue.getUEContent()
                let qs = require('querystring')
                let data = {}
                data.id = this.myform.id
                data.service_type_id = this.myform.service_type_id
                data.title = this.myform.title
                data.describe = content
                data.pId = this.myform.pId

                let flag = false
                if(!data.title){
                    _this.$message({
                        message:'标题不能为空',
                        type:'error'
                    })
                    flag = true
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'knowledgeBase/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'操作成功',
                            type:'success'
                        })
                        _this.addDialog = false
                        _this.$options.methods.loadData.bind(_this)();
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleSizeChange(val){
                this.limit = val
                this.$options.methods.loadData.bind(this)()
            },
            handleCurrentChange(val){
                this.page = val
                this.$options.methods.loadData.bind(this)()
            }
        },
    }
</script>


<style>
    .eb_content{
        margin-bottom: 20px;
    }
    .ed_ul{
        width: 100%;
        height: 80px;
        border-bottom: 1px dashed #919191;
        list-style-type: none;
        padding: 0 10px;
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
    }
    .ed_ul .ed_li_1{
        width: 50px;
        height: 50px;
        border-radius: 25px;
        line-height: 50px;
        text-align: center;
    }
    .ed_ul .ed_li_2{
        width: calc(100% - 50px);
        padding: 0 20px;
        box-sizing: border-box;
    }
    .ed_ul .ed_p_1{
        height: 32px;
    }
    .ed_ul .ed_p_2{
        font-size: 12px;
        color: #919191;
    }
    .ed_ul .ed_p_span{
        position: absolute;
        right: 30px;
        font-size: 12px;
        color: #919191;
    }
    .ed_ul .ed_span_1{
        display: inline-block;
        width: calc(100% - 100px);
    }
    .ed_ul .ed_drop{
        position: absolute;
        right: 30px;
        font-size: 12px;
        color: #919191;
        cursor: pointer;
    }
</style>
