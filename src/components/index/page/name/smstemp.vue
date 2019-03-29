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
            <div class="sms_c">
                <ul>
                    <li v-for="item in smsData" :key="item.id">
                        <div class="sms_h">
                            <span>{{item.type}}:{{item.typeName}}</span>
                        </div>
                        <hr style='background-color:#cccccc;height:1px;border:none;'/>
                        <div class="sms_b">
                            <p>短信/彩信</p>
                            <p>2019-03-29 15:31:21</p>
                            <div class="sms_b_c">这是一个短信模板，这是一个短信模板，这是一个短信模板，这是一个短信模板，这是一个短信模板，这是一个短信模板，这是一个短信</div>
                            <div class="approve" v-show="item.showapprove">
                                <img class="approve_img" src="/upload/staticImg/examine.png" alt="已审核">
                            </div>
                            <div class="approve" v-show="!item.showapprove">
                                <img class="approve_img" src="/upload/staticImg/approve.png" alt="审核未通过">
                            </div>
                        </div>
                        <div class="sms_f">
                            <span @click="handleEdit($event,item)"><i class="el-icon-edit i_edit"></i></span>
                            <span @click="handleSend($event,item)"><i class="mdi mdi-send i_send"></i></span>
                            <span @click="handledelete($event,item)"><i class="el-icon-delete i_del"></i></span>
                        </div>
                    </li>
                </ul>
            </div>
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
    </div>
</template>
<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'smstemp',
        store,
        computed: {
            smsData(){
                return store.state.smstempList;
            },
        },
        data(){
            return {
                dataList:null,
                nameList:[
                    {index:1,name:'线索状态',isActive:true},
                    {index:2,name:'客户状态',isActive:false},
                    {index:3,name:'客户来源',isActive:false},
                    {index:4,name:'客户级别',isActive:false},
                    {index:5,name:'快捷方式',isActive:false},
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

                dialogVisible:false,
                dialogVisible2:false,

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
                    _this.$store.state.smstempList = res.data
                    res.data.forEach(element => {
                        if(element.sort == 3 || element.sort == 5){
                            element.showapprove = false
                        }else{
                            element.showapprove = true
                        }
                    });
                }).catch(function(err){
                    console.log(err);
                });
            },
            //显示对应状态数表格数据
            showTableval(val){
                const _this = this
                this.newform.type = val.name
                this.nameList.forEach(function(obj){
                    obj.isActive = false;
                });
                val.isActive = !val.isActive;
                _this.$options.methods.reloadTable.bind(_this)(true)
            },
            //状态添加
            handleAdd(){
                const _this = this
                let i = this.newform.index

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'typeInfoJurisdiction/insert.do',//新增状态
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.sort = null
                        _this.newform.notes = null
                        _this.newform.typeName = null
                        _this.dialogVisible = true
                    }
                }).catch(function(err){
                    console.log(err);
                });
                
            },
            //状态添加提交按钮
            addbasicset(){
                const _this = this;
                let qs = require('querystring')
                let i = this.newform.index
                let data = {}
                data.type = this.newform.type
                data.sort = this.newform.sort
                data.notes = this.newform.notes
                data.typeName = this.newform.typeName
                
                let flag = false;
                if(!data.sort){
                    _this.$message({
                        message: "排序编号不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.typeName){
                    _this.$message({
                        message: "状态名称不能为空",
                        type: 'error'
                    });
                    flag = true;
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
            //状态修改
            handleEdit(e,val){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'typeInfoJurisdiction/update.do',//编辑状态
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.sort = val.sort
                        _this.newform.notes = val.notes
                        _this.newform.id = val.id
                        _this.newform.typeName = val.typeName
                        _this.dialogVisible2 = true
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            //状态修改提交按钮
            updatebasicset(){
                const _this = this;
                let i = this.newform.index
                let qs = require('querystring')
                let data = {}
                data.id = this.newform.id
                data.type = this.newform.type
                data.sort = this.newform.sort
                data.notes = this.newform.notes
                data.typeName = this.newform.typeName
                
                let flag = false;
                if(!data.sort){
                    _this.$message({
                        message: "排序编号不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.typeName){
                    _this.$message({
                        message: "状态名称不能为空",
                        type: 'error'
                    });
                    flag = true;
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
            handledelete(e,val){
                const _this = this;
                let qs =require('querystring')
                console.log(val)
            },
            handleSend(e,val){
                const _this = this;
                let qs =require('querystring')
                console.log(val)
            }
        }
    }
</script>
<style>
    .sms_c{
        width: 100%;
        height: auto;
        padding: 10px;
    }
    .sms_c ul{
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        font-size: 14px;
    }
    .sms_c ul li{
        flex: 0 0 24%;
        height: 380px;
        margin-right: 0.5%;
        margin-bottom: 0.5%;
        background-color: aquamarine;
        border: 1px solid #cccccc;
    }
    .sms_h{
        width: 100%;
        height: 49px;
        line-height: 49px;
        padding-left: 5px;
        background-color: #e9ffe8;
        box-sizing: border-box
    }
    .sms_b{
        width: 100%;
        height: 280px;
        background-color: #e9ffe8;
        position: relative;
        padding-top: 12px;
        box-sizing: border-box;
    }
    .sms_b p{
        font-size: 12px;
        line-height: 16px;
        color: #888888;
        text-align: center;
    }
    .sms_b_c{
        width: 70%;
        background-image: url('/upload/staticImg/popo.png');
        background-repeat: no-repeat;
        background-size: 100% 100%; 
        position: absolute;
        top: 50px;
        right: 10px;
        padding: 10px;
        box-sizing: border-box;
    }
    .sms_f{
        width: 100%;
        height: 50px;
        padding-left: 5px;
        background-color: rgb(222, 222, 222);
        box-sizing: border-box;
    }
    .i_edit,.i_send,.i_del{
        width:25px;
        height:25px;
        line-height:25px;
        text-align:center;
        color: #9eea6a;
        background-color: #ffffff;
        border: 1px solid #9eea6a;
        border-radius:50%;
        margin-top: 13px;
        cursor: pointer;
    }
    .i_edit:hover,.i_send:hover,.i_del:hover{
        color: #ff6333;
        border: 1px solid #ff6333;
    }
    .i_edit,.i_send{
        float: left;
    }
    .i_send{
        margin-left: 5px;
        transform: rotate(-30deg)
    }
    .i_del{
        float: right;
        margin-right: 5px;
    }
    .approve{
        position: absolute;
        right: 13%;
        bottom: 20px;
    }
    .approve_img{
        width: 100px;
        height: 50px;
        transform: rotate(-10deg)
    }
</style>
