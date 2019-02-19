<template>
    <div class="header">
        <div class="header-in" :class="{'content-collapse':collapse}">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <!-- <div class="logo">
            <span style="font-size:16px">云纵CRM信息平台</span>
        </div> -->
        </div>
        <!-- <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="bre-item" to="{ path: '/' }"><span>首页</span></el-breadcrumb-item>
                <el-breadcrumb-item class="bre-item" v-model="breadsList.title">
                    <router-link :to="breadsList.path">
                        {{breadsList.title}}
                    </router-link>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link" id="public_username" style="position: relative;top: -30px;left: 20px;">
                        {{public_username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="">
                        <el-dropdown-item divided  command="resPassWord">修改密码</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </div>
        </div>
        
        <el-dialog :modal="false" center title="修改密码" :visible.sync="dialogFormVisible" width="40%" :close-on-click-modal="false">
            <el-form :model="reSetForm" :rules="rules" ref="reSetForm"  label-width="100px" label-position="left">
                <el-form-item prop="oldpass" label="旧密码">
                    <el-input v-model="reSetForm.oldpass" type="text" class="handle-input mr10" style="width:240px;" clearable></el-input>
                </el-form-item>
                <el-form-item prop="newpass" label="新密码">
                    <el-input v-model="reSetForm.newpass" type="text" class="handle-input mr10"  style="width:240px;" clearable></el-input>
                </el-form-item>
                <el-form-item prop="respass" label="确认密码">
                    <el-input type="text" v-model="reSetForm.respass" style="width:240px;" clearable></el-input>
                </el-form-item>    
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button class="searchbutton"  @click="submitFormUser('reSetForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>
<script>
    import store from '../../store/store'
    import axios from 'axios'
    import bus from './bus';
    import $ from 'jquery'
    import qs from 'qs'

    export default {
        data() {
            var validateoldpass = (rule, value, callback) => {
               if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(!/^[a-z0-9_-]{0,18}$/.test(value)){
                    callback(new Error('用户名由数字、字母、下划线组成'));    
                }else {
                    callback();
                }
            };
            var validaterespass = (rule, value, callback) => {
                if(value==""){
                     callback(new Error('请输入确认密码')); 
                }else if(this.reSetForm.newpass!==value){
                    callback(new Error('两次输入不同，请重新输入'));    
                }else {
                    callback();
                }
            };
            return {
                public_username:this.$store.state.user,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                collapse: false,
                fullscreen: false,
                name: '',
                message: 2,
                breadsList:{
                    path:'',
                    title:'',
                },
                reSetForm:{
                    oldpass:'',
                    newpass:'',
                    respass:''
                },
                rules: {
                    oldpass: [
                        {require:true, validator: validateoldpass, trigger: 'blur' }
                    ],
                    newpass: [
                        {require:true, validator: validateoldpass, trigger: 'blur'}
                    ],
                    respass: [
                        {require:true, validator: validaterespass, trigger: 'blur'}
                    ]
                }
            }
        },
        inject:["reload"], 
        mounted(){
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.getBread();
            }
        },
        created(){
            this.getBread();
        },
        methods:{
            getBread(){
                this.breadsList.path=this.$route.path
                this.breadsList.title=this.$route.meta.title
                // console.log(this.breadsList)
            },
            //修改密码
             submitFormUser(formName){
                const _this = this;
                const qs = require('querystring')
                let dataForm = {};
                dataForm.oldPassword = _this.reSetForm.oldpass;
                dataForm.private_password = _this.reSetForm.newpass;
                dataForm.private_id = _this.$store.state.ispId;
                dataForm.cId =  _this.$store.state.iscId;
                let idArr = {}
                idArr.privateId = _this.$store.state.ispId
                idArr.cId = _this.$store.state.iscId
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios({
                            method: 'post',
                            url: _this.$store.state.defaultHttp+"updatePrivatePassword.do",
                            data:qs.stringify(dataForm),
                        }).then(function(res){
                            // console.log(res)
                            if(res.data.code ==200){
                                axios({
                                    method: 'post',
                                    url:  _this.$store.state.defaultHttp+ 'tbPrivateToPublicUser.do',
                                    data:qs.stringify(idArr),
                                }).then(function(res){
                                    // console.log(res)
                                    if(res.data.code && res.data.code == 200) {
                                        _this.$message({
                                            message: '密码修改成功',
                                            type: 'success'
                                        });
                                        _this.$router.push('/login')
                                    } else {
                                        _this.$message({
                                            message: res.data.msg,
                                            type: 'error'
                                        });
                                    }
                                }).catch(function(err){
                                    console.log(err);
                                });
                            }else{
                                _this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                })
                            }
                        }).catch(function(err){
                            // console.log(err);
                        });
                    } else {
                        _this.$message.error('提交错误，请检查您的网络');
                        return false;
                    }
                })
            },
            // 用户名下拉菜单选择事件
            handleCommand(e) {
                if(e == 'loginout'){
                    // axios({
                    //     method: 'get',
                    //     url: this.$store.state.defaultHttp+this.$store.state.userUrl+'logout',
                    // }).then(function(res){}).catch(function(err){});
                    localStorage.removeItem('iscId');
                    localStorage.removeItem('ispId');
                    localStorage.removeItem('user');
                    localStorage.removeItem('deptid');
                    localStorage.removeItem('roleid');
                    localStorage.removeItem('insid');
                    this.$router.push('/login');
                }
                if(e == 'resPassWord'){
                    this.dialogFormVisible = true
                }
            },
            // 侧边栏折叠
            collapseChage(){
                
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
                // if(this.collapse){
                // }else{
                // }
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        }
    }
</script>
<style scoped>
    /* .el-select .el-input__inner {
        height: 25px !important;
        line-height: 25px !important;
        color: #fff !important;
        background: rgb(46, 98, 135) !important;
    } */
    
    .header {
        position: absolute;
        top: 0;
        left: 0px;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        font-size: 14px;
        color: #000105;
        background: #fdfeff;
        /* background: rgb(90, 100, 248); */
        
    }
    .collapse-btn{
        float: left;
        padding: 0 20px 0 25px;
        cursor: pointer;
        line-height: 50px;
    }
    .header-in{
        position: absolute;
        left: 150px;
        height: 50px;
        transition: left .3s ease-in-out;
    }
    .content-collapse{
        left: 65px !important;
    }
    /* .header .logo{
        float: left;
        width:150px;
        line-height: 50px;
        font-family: "楷体";
    } */
    .breadcrumb{
        height: 50px;
    }
    .bre-item{
        font-size: 16px;
        line-height: 50px;
        color: #20222a;
    }
    .header-right{
        float: right;
        /* padding-right: 150px; */
        /* width: 150px; */
        margin: 12px 60px 0px 10px;
        height: 50px!important;
        line-height: 25px !important;
    }
    .header-user-con{
        display: inline-block;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #20222a;
    }
    .btn-bell .el-icon-bell{
        color: #20222a;
    }
    .user-name{
        margin-left: 30px;
        height:0px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #20222a;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
