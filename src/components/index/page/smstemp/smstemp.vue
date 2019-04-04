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
                    <li v-for="(item,index) in smsData" :key="index">
                        <div class="sms_h">
                            <span>{{item.type}}:{{item.title}}</span>
                        </div>
                        <hr style='background-color:#cccccc;height:1px;border:none;'/>
                        <div class="sms_b">
                            <p>短信/彩信</p>
                            <p>2019-03-29 15:31:21</p>
                            <div class="sms_b_c">{{item.content}}</div>
                            <div class="approve" v-show="item.status == 2">
                                <img class="approve_img" src="/upload/staticImg/examine.png" alt="已审核">
                            </div>
                            <div class="approve" v-show="item.status == 3">
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
                <el-form-item prop="type" label="应用模块">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="title" label="短信标题">
                    <el-input v-model="newform.title" placeholder="请输入短信标题"></el-input>
                </el-form-item>
                <el-form-item prop="signature" label="短信签名">
                    <el-input v-model="newform.signature" placeholder="请输入短信签名"></el-input>
                </el-form-item>
                <el-form-item prop="labellllls" label="短信类型">
                    <el-select v-model="newform.labellllls" placeholder="请选择短信类型" style="width:100%">
                        <el-option value="通知类">通知类</el-option>
                        <el-option value="营销类">营销类</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="content" label="短信内容">
                    <el-input ref="elInput" type="textarea" rows="5" v-model="newform.content" placeholder="请输入短信内容"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-button plain size="mini" v-for="item in btnList" :key="item.id" :value="item.value" @click="checkTag(item)">{{item.name}}</el-button>
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
                <el-form-item prop="type" label="应用模块">
                    <el-input v-model="newform.type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="title" label="短信标题">
                    <el-input v-model="newform.title" placeholder="请输入短信标题"></el-input>
                </el-form-item>
                <el-form-item prop="signature" label="短信签名">
                    <el-input v-model="newform.signature" placeholder="请输入短信签名"></el-input>
                </el-form-item>
                <el-form-item prop="labellllls" label="短信类型">
                    <el-select v-model="newform.labellllls" placeholder="请选择短信类型" style="width:100%">
                        <el-option value="通知类">通知类</el-option>
                        <el-option value="营销类">营销类</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="content" label="短信内容">
                    <el-input ref="elInput" type="textarea" rows="5" v-model="newform.content" placeholder="请输入短信内容"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-button plain size="mini" v-for="item in btnList" :key="item.id" :value="item.value" @click="checkTag(item)">{{item.name}}</el-button>
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
                    labellllls:null,
                    content:null,
                    signature:null,
                    varCount:0,
                },

                btnList:[
                    {id:'001',name:'公司名称',value:'@var(name1)'},
                    {id:'002',name:'联系人名称',value:'@var(name2)'},
                    {id:'003',name:'合同到期时间',value:'@var(name3)'},
                ],

                dialogVisible:false,
                dialogVisible2:false,

                rules: {
                    title : [{ required: true, message: '短信标题不能为空', trigger: 'blur' },],
                    content : [{ required: true, message: '短信内容不能为空', trigger: 'blur' },],
                    signature : [{ required: true, message: '模板签名不能为空', trigger: 'blur' },],
                    labellllls : [{ required: true, message: '短信类型不能为空', trigger: 'blur' },],
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
                    url: _this.$store.state.defaultHttp+'template/selectTemplate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.$store.state.smstempList = res.data.map.templates
                }).catch(function(err){
                    // console.log(err);
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
                _this.newform.title = null
                _this.newform.labellllls = null
                _this.newform.content = null
                _this.newform.signature = null
                _this.dialogVisible = true
            },
            //状态添加提交按钮
            addbasicset(){
                const _this = this;
                let qs = require('querystring')
                // let i = this.newform.index
                this.newform.varCount = 0
                let contents = this.newform.content
                if(contents){
                    if(contents.indexOf('@公司名称') != -1){
                        this.newform.varCount += 1
                        contents = contents.replace(/@公司名称/g, "@var(name1)")
                        console.log(contents)
                    }
                    if(contents.indexOf('@联系人名称') != -1){
                        this.newform.varCount += 1
                        contents = contents.replace(/@联系人名称/g, "@var(name2)")
                    }
                    if(contents.indexOf('@合同到期时间') != -1){
                        this.newform.varCount += 1
                        contents = contents.replace(/@合同到期时间/g, "@var(name3)")
                    }
                }
                
                let data = {}
                data.type = this.newform.type
                data.title = this.newform.title
                data.labellllls = this.newform.labellllls
                data.content = contents
                data.signature = '【' + this.newform.signature + '】'
                data.varCount = this.newform.varCount
                data.status = 1
                console.log(data)
                
                let flag = false;
                if(!data.content){
                    _this.$message({
                        message: "短信内容不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.labellllls){
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
            //状态修改
            handleEdit(e,val){
                const _this = this

                _this.newform.templateId = val.templateId
                _this.newform.title = val.title
                _this.newform.labellllls = val.labellllls
                // _this.newform.content = val.content
                let contents = val.content
                if(contents){
                    if(contents.indexOf('@var(name1)') != -1){
                        console.log('111')
                        contents = contents.replace(/@var(name1)/g, "@公司名称")
                    }
                    if(contents.indexOf('@var(name2)') != -1){
                        console.log('222')
                        contents = contents.replace(/@var(name2)/g, "@联系人名称")
                    }
                    if(contents.indexOf('@var(name3)') != -1){
                        console.log('333')
                        contents = contents.replace(/@var(name3)/g, "@合同到期时间")
                    }
                    // console.log(contents)
                }
                // _this.newform.content = contents
                _this.newform.signature = val.signature
                _this.dialogVisible2 = true
            },
            //状态修改提交按钮
            updatebasicset(){
                const _this = this;
                let i = this.newform.index
                let qs = require('querystring')

                this.newform.varCount = 0
                let contents = this.newform.content
                if(contents){
                    if(contents.indexOf('@公司名称') != -1){
                        this.newform.varCount += 1
                        contents = contents.replace(/@公司名称/g, "@var(name1)")
                        console.log(contents)
                    }
                    if(contents.indexOf('@联系人名称') != -1){
                        this.newform.varCount += 1
                        contents = contents.replace(/@联系人名称/g, "@var(name2)")
                    }
                    if(contents.indexOf('@合同到期时间') != -1){
                        this.newform.varCount += 1
                        contents = contents.replace(/@合同到期时间/g, "@var(name3)")
                    }
                }

                let data = {}
                data.templateId = this.newform.templateId
                data.type = this.newform.type
                data.title = this.newform.title
                data.labellllls = this.newform.labellllls
                data.content = contents
                data.signature = '【' + this.newform.signature + '】'
                data.varCount = this.newform.varCount
                
                let flag = false;
                if(!data.content){
                    _this.$message({
                        message: "短信内容不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!data.labellllls){
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
                    _this.$message.error("修改失败,请重新修改");
                });
            },
            handledelete(e,val){
                const _this = this;
                let qs =require('querystring')
                // console.log(val)
                let data = {}
                data.templateId = val.templateId

                _this.$confirm('是否确认删除【'+ val.title +'】？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    // axios({
                    //     method: 'post',
                    //     url: _this.$store.state.defaultHttp+'template/deleteTemplate.do?cId='+_this.$store.state.iscId,
                    //     data:qs.stringify(data)
                    // }).then(function(res){
                    //     if(res.data.code && res.data.code == 200){
                    //         _this.$message({
                    //             message:'删除成功',
                    //             type:'success'
                    //         })
                    //         _this.$options.methods.reloadTable.bind(_this)(true);
                    //     }else{
                    //         _this.$message({
                    //             message:res.data.msg,
                    //             type:'error'
                    //         })
                    //     }
                    // }).catch(function(err){
                    //     _this.$message.error("删除失败,请重新删除");
                    // });
                })
            },
            handleSend(e,val){
                const _this = this;
                let qs =require('querystring')
                console.log(val)
            },
            checkTag(e){
                console.log(this.$refs.elInput)
                let elInput = this.$refs.elInput
                let startPos = elInput.$refs.textarea.selectionStart
                let endPos = elInput.$refs.textarea.selectionEnd
                // console.log(startPos,endPos)
                let txt = elInput.value
                if (startPos === 0 || endPos === 0) return
                this.newform.content = txt.substring(0, startPos) + '@' + e.name + txt.substring(endPos)
                elInput.focus()
                elInput.selectionStart = startPos + e.name.length + 1
                elInput.selectionEnd = startPos + e.name.length + 1
                
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
