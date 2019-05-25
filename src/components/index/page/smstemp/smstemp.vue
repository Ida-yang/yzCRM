<template>
    <!-- 短信模板页面 -->
    <div class="contentall">
        <div class="setleftcontent">
            <ul class="namecontent">
                <li v-for="item in nameList" :key="item.index" :value="item.name" :class="{actived:item.isActive}" @click="showTableval(item)">{{item.name}}</li>
            </ul>
        </div>
        <div class="centercontent"></div>
        <div class="setrightcontent">
            <div class="radioList">
            <el-radio-group v-model="searchList.status">
                <span class="nameList">审核状态：</span>
                <el-radio v-for="item in statusData" :key="item.id" :label="item.id" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.genre">
                <span class="nameList">短信类型：</span>
                <el-radio v-for="item in genreData" :key="item.id" :label="item.id" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
        </div>
            <div class="entry">
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            </div>
            <div class="sms_c">
                <ul>
                    <li v-for="(item,index) in smsData" :key="index">
                        <div class="sms_h">
                            <span>{{item.genre}}:{{item.title}}</span>
                        </div>
                        <hr style='background-color:#cccccc;height:1px;border:none;'/>
                        <div class="sms_b">
                            <p>短信/彩信</p>
                            <p>2019-03-29 15:31:21</p>
                            <div class="sms_b_c"> {{item.content}} </div>
                            <div class="approve" v-show="item.status == 2">
                                <img class="approve_img" src="/upload/staticImg/examine.png" alt="已审核">
                            </div>
                            <div class="approve" v-show="item.status == 3">
                                <img class="approve_img" src="/upload/staticImg/approve.png" alt="审核未通过">
                            </div>
                        </div>
                        <div class="sms_f">
                            <span @click="handleEdit($event,item)"><i class="el-icon-edit i_edit"></i></span>
                            <el-tooltip :content="item.state" placement="right">
                                <el-switch v-model="item.state" active-value="启用" inactive-value="禁用" active-color="#13ce66" inactive-color="#bbbbbb" class="i_send" @change="changeState(item)"></el-switch>
                            </el-tooltip>
                            <span @click="handledelete($event,item)"><i class="el-icon-delete i_del"></i></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <el-dialog
            title="添加短信模板"
            :visible.sync="dialogVisible"
            width="40%">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules" style="padding-right:30px">
                <el-form-item prop="type" label="应用模块">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="title" label="短信标题">
                    <el-input v-model="newform.title" placeholder="请输入短信标题"></el-input>
                </el-form-item>
                <el-form-item prop="signature" label="短信签名">
                    <el-input v-model="newform.signature" placeholder="请输入短信签名"></el-input>
                </el-form-item>
                <el-form-item prop="genre" label="短信类型">
                    <el-select v-model="newform.genre" placeholder="请选择短信类型" style="width:100%">
                        <el-option value="通知类">通知类</el-option>
                        <el-option value="营销类">营销类</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="url" label="原网址">
                    <el-input v-model="newform.url" placeholder="请输入原网址"></el-input>
                </el-form-item>
                <el-form-item prop="dayNum" label="提前提醒天数" v-if="newform.type == '合同'">
                    <el-input v-model="newform.dayNum" placeholder="请输入提前提醒天数"></el-input>
                </el-form-item>
                <el-form-item prop="content" label="短信内容">
                    <el-input ref="elInput" type="textarea" rows="5" v-model="newform.content" placeholder="请输入短信内容"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <div v-for="item in btnList" :key="item.id" style="width:100%;">
                        <el-button plain size="mini" :value="item.value" @click="checkTag(item)">{{item.name}}</el-button>
                        <span>变量值为： {{item.value}}</span>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addbasicset()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改短信模板"
            :visible.sync="dialogVisible2"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="110px" style="padding-right:30px">
                <el-form-item prop="type" label="应用模块">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="title" label="短信标题">
                    <el-input v-model="newform.title" placeholder="请输入短信标题"></el-input>
                </el-form-item>
                <el-form-item prop="signature" label="短信签名">
                    <el-input v-model="newform.signature" placeholder="请输入短信签名"></el-input>
                </el-form-item>
                <el-form-item prop="genre" label="短信类型">
                    <el-select v-model="newform.genre" placeholder="请选择短信类型" style="width:100%">
                        <el-option value="通知类">通知类</el-option>
                        <el-option value="营销类">营销类</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="url" label="原网址">
                    <el-input v-model="newform.url" placeholder="请输入原网址"></el-input>
                </el-form-item>
                <el-form-item prop="dayNum" label="提前提醒天数" v-if="newform.type == '合同'">
                    <el-input v-model="newform.dayNum" placeholder="请输入提前提醒天数"></el-input>
                </el-form-item>
                <el-form-item prop="content" label="短信内容">
                    <el-input ref="elInput" type="textarea" rows="5" v-model="newform.content" placeholder="请输入短信内容"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <div v-for="item in btnList" :key="item.id" style="width:100%;">
                        <el-button plain size="mini" :value="item.value" @click="checkTag(item)">{{item.name}}</el-button>
                        <span>变量值为： {{item.value}}</span>
                    </div>
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
                    {index:1,name:'线索',isActive:true},
                    {index:2,name:'客户',isActive:false},
                    {index:3,name:'联系人',isActive:false},
                    {index:4,name:'商机',isActive:false},
                    {index:5,name:'合同',isActive:false},
                    {index:6,name:'营销',isActive:false},
                ],
                newform:{
                    type:'线索',
                    index:'1',
                    id:null,
                    title:null,
                    genre:null,
                    content:null,
                    signature:null,
                    varCount:0,
                    dayNum:null,
                    url:null,
                },

                searchList:{
                    type:null,
                    genre:'',
                    status:'',
                },
                statusData:[
                    {id:'',name:'全部'},
                    {id:'1',name:'正在审核'},
                    {id:'2',name:'审核通过'},
                    {id:'3',name:'未通过审核'},
                ],
                genreData:[
                    {id:'',name:'全部'},
                    {id:'通知类',name:'通知类'},
                    {id:'营销类',name:'营销类'},
                ],

                btnList:[
                    {id:'001',name:'公司名称',value:'@var(name2)'},
                    {id:'002',name:'联系人名称',value:'@var(name1)'},
                    {id:'003',name:'合同到期时间',value:'@var(name3)'},
                ],

                dialogVisible:false,
                dialogVisible2:false,

                rules: {
                    title : [{ required: true, message: '短信标题不能为空', trigger: 'blur' },],
                    content : [{ required: true, message: '短信内容不能为空', trigger: 'blur' },],
                    signature : [{ required: true, message: '模板签名不能为空', trigger: 'blur' },],
                    genre : [{ required: true, message: '短信类型不能为空', trigger: 'blur' },],
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
                data.genre = this.searchList.genre
                data.status = this.searchList.status

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'template/selectTemplate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.$store.state.smstempList = res.data.map.templates
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //显示对应短信模板数表格数据
            showTableval(val){
                const _this = this
                this.newform.type = val.name
                this.nameList.forEach(function(obj){
                    obj.isActive = false;
                });
                val.isActive = !val.isActive;
                _this.$options.methods.reloadTable.bind(_this)(true)
            },
            //短信模板添加
            handleAdd(){
                const _this = this
                let i = this.newform.index
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'templateJurisdiction/insert.do',//新增短信模板
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.title = null
                        _this.newform.genre = null
                        _this.newform.content = null
                        _this.newform.signature = null
                        _this.newform.status = null
                        _this.newform.dayNum = null
                        _this.newform.url = null
                        _this.dialogVisible = true
                    }
                }).catch(function(err){
                    // console.log(err);
                });
                
            },
            //短信模板添加提交按钮
            addbasicset(){
                const _this = this;
                let qs = require('querystring')
                // let i = this.newform.index
                this.newform.varCount = 0
                let contents = this.newform.content
                if(contents){
                    if(contents.indexOf('@var(name2)') != -1){
                        this.newform.varCount += 1
                    }
                    if(contents.indexOf('@var(name1)') != -1){
                        this.newform.varCount += 1
                    }
                    if(contents.indexOf('@var(name3)') != -1){
                        this.newform.varCount += 1
                    }
                }
                
                let data = {}
                data.type = this.newform.type
                data.title = this.newform.title
                data.genre = this.newform.genre
                data.content = contents
                data.signature = this.newform.signature
                data.varCount = this.newform.varCount
                data.status = 1
                data.dayNum = this.newform.dayNum
                data.url = this.newform.url
                
                let flag = false;
                if(!data.content){
                    _this.$message({
                        message: "短信内容不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.genre){
                    _this.$message({
                        message: "短信类型不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.signature){
                    _this.$message({
                        message: "短信签名不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.title){
                    _this.$message({
                        message: "短信标题不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'template/insertTemplate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                        _this.dialogVisible = false
                        _this.$options.methods.reloadTable.bind(_this)(true)
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
            //短信模板修改
            handleEdit(e,val){
                const _this = this
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'templateJurisdiction/update.do',//编辑短信模板
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.templateId = val.templateId
                        _this.newform.title = val.title
                        _this.newform.genre = val.genre
                        _this.newform.content = val.content
                        _this.newform.signature = val.signature
                        _this.newform.status = val.status
                        _this.newform.dayNum = val.dayNum
                        _this.newform.url = val.url
                        _this.dialogVisible2 = true
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //短信模板修改提交按钮
            updatebasicset(){
                const _this = this;
                let i = this.newform.index
                let qs = require('querystring')

                this.newform.varCount = 0
                let contents = this.newform.content
                if(contents){
                    if(contents.indexOf('@var(name2)') != -1){
                        this.newform.varCount += 1
                    }
                    if(contents.indexOf('@var(name1)') != -1){
                        this.newform.varCount += 1
                    }
                    if(contents.indexOf('@var(name3)') != -1){
                        this.newform.varCount += 1
                    }
                }

                let data = {}
                data.templateId = this.newform.templateId
                data.type = this.newform.type
                data.title = this.newform.title
                data.genre = this.newform.genre
                data.content = contents
                data.signature = this.newform.signature
                data.varCount = this.newform.varCount
                data.status = this.newform.status
                data.dayNum = this.newform.dayNum
                data.url = this.newform.url
                
                let flag = false;
                if(!data.content){
                    _this.$message({
                        message: "短信内容不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.genre){
                    _this.$message({
                        message: "短信类型不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.signature){
                    _this.$message({
                        message: "短信签名不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.title){
                    _this.$message({
                        message: "短信标题不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'template/updateTemplate.do?cId='+_this.$store.state.iscId,
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
                    _this.$message.error("修改失败,请重新修改");
                });
            },
            handledelete(e,val){
                const _this = this;
                let qs =require('querystring')
                let data = {}
                data.templateId = val.templateId

                _this.$confirm('是否确认删除【'+ val.title +'】？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'template/deleteTemplate.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(data)
                    }).then(function(res){
                        if(res.data.code && res.data.code == 200){
                            _this.$message({
                                message:'删除成功',
                                type:'success'
                            })
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        } else{
                            _this.$message({
                                message:res.data.msg,
                                type:'error'
                            })
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新删除");
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除【' + val.title + '】'
                    });       
                });
            },
            handleSend(e,val){
                const _this = this;
                let qs =require('querystring')
            },
            checkTag(e){
                let elInput = this.$refs.elInput
                let startPos = elInput.$refs.textarea.selectionStart
                let endPos = elInput.$refs.textarea.selectionEnd
                let txt = elInput.value
                if (startPos === 0 || endPos === 0) return
                this.newform.content = txt.substring(0, startPos) + e.value + txt.substring(endPos)
                elInput.focus()
            },
            changeState(val){
                const _this = this;
                let qs = require('querystring')

                let data = {}
                data.templateId = val.templateId
                data.type = val.type
                data.status = val.status
                data.state = val.state
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'template/updateTemplateState.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message: '对不起，您没有该权限，请联系管理员开通',
                            type: 'error'
                        })
                    } else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("修改失败,请重新修改");
                });
            },
            search(){
                const _this = this;
                _this.$options.methods.reloadTable.bind(_this)()
            },
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
        /* background-color: aquamarine; */
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
    .sms_b > p{
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
        word-wrap: break-word;
        overflow: hidden;
    }
    .sms_f{
        width: 100%;
        height: 50px;
        padding-left: 5px;
        background-color: rgb(222, 222, 222);
        box-sizing: border-box;
    }
    .i_edit,.i_del{
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
    .i_edit:hover,.i_del:hover{
        color: #ff6333;
        border: 1px solid #ff6333;
    }
    .i_edit,.i_send{
        float: left;
    }
    .i_send{
        width:45px;
        height:25px;
        line-height:25px;
        margin-top: 13px;
        margin-left: 5px;
        color: #bbbbbb
        /* transform: rotate(-30deg) */
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
