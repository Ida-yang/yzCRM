<template>
    <!-- 登录页 -->
    <el-row class="logincontent">
        <el-col class="content-l" v-if="isShowChromeTip">
            <p style="color:red;font-size:20px;margin-top:300px;text-align:center">
                请务必使用Chrome浏览器打开【
                <a target="_blank" href="https://www.google.cn/intl/zh-CN/chrome/">
                    点击下载
                </a>
                】
            </p>
        </el-col>
        <el-col class="content-r" v-if="!isShowChromeTip">
            <div class="login">
                <p class="login_head">云纵CRM系统管理平台 </p>
                <p class="login_wel">欢迎您登录</p>
                <!-- <p class="login_wel"><span>欢迎登录</span></p> -->
                <div class="grid-content bg-purple-dark">
                    <el-form  :model="loginFrom" status-icon :rules="rules" ref="loginFrom" 
                    class="demo-ruleForm"
                    style="color:#fff" >
                        <el-form-item prop="public_username" style="width:100%;margin-top:60px;">
                            <el-input 
                            type="text"
                            prefix-icon="mdi-account"
                            v-model="loginFrom.public_username"
                            auto-complete="off"
                            placeholder="请输入登录账号" >
                            </el-input>
                        </el-form-item>
                        <el-form-item  prop="public_password" style="width:100%;margin-top:25px;margin-bottom:5px">
                            <el-input 
                            type="password" 
                            prefix-icon="mdi-lock"
                            v-model="loginFrom.public_password"
                            placeholder="请输入登录密码" 
                            @keyup.enter.native="submitForm('loginFrom')"
                            auto-complete="off">
                            </el-input>
                        </el-form-item>
                        <el-form-item  prop="rememberme" style="width:100%;margin-top:1px;">
                            <el-checkbox v-model="remember">记住我</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm" style="width:100%;margin-top:10px;">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
    </el-row> 
</template>

<script>
import store from '../store/store'
import '../assets/iconfont/icons.css'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/display.css'
import $ from 'jquery'
import qs from 'qs'

export default { 
    name: 'login',
    store,
    computed:{
        isShowChromeTip() {
            const USER_AGENT = navigator.userAgent.toLowerCase()
            const isChrome = /.*(chrome)\/([\w.]+).*/
            // console.log(USER_AGENT,isChrome)
            return !isChrome.test(USER_AGENT)
        }
    },
    data () {
        return {
            loginFrom:{
                public_username :'',
                public_password :''
            },
            loginname: null,
            remember:false,
            rules: {
                public_username : [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                public_password : [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            },
            // isShowChromeTip:false
        }
    },
    mounted() {
        this.getlocalStorage()
    },
    methods: {
        submitForm(){
            const _this = this;
            let loginInfo={};
            loginInfo.public_username = this.loginFrom.public_username;
            loginInfo.public_password = this.loginFrom.public_password;
            let data = [loginInfo,this]
            let qs =require('querystring')
            if(this.remember == true){
                _this.setlocalStorage(_this.loginFrom.public_username, _this.loginFrom.public_password)
            }else{
                if(loginInfo.public_username == _this.loginname){
                    _this.clearlocalStorage()
                }
            }

            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'tologin.do',
                data:qs.stringify(loginInfo),
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(res){
                if(res.data.msg && res.data.code == 200) {
                    _this.$message({
                      message: '登录成功',
                      type: 'success'
                    })
                    let userData = res.data.map.success
                    _this.$store.commit('iscId',userData.cId)
                    _this.$store.commit('ispId',userData.pId)
                    _this.$store.commit('user',userData.name)
                    _this.$store.commit('deptid',userData.second_id)
                    _this.$store.commit('roleid',userData.roleid)
                    _this.$store.commit('insid',userData.private_deptid)
                    _this.$store.commit('portrait',userData.imgUrl)
                    _this.$router.push({path:'/index'})
                    _this.getData()
                }else {
                    _this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(function(err){
                // console.log(err)
            })
        },
        setlocalStorage(n, p) {
            localStorage.setItem('siteName',n)
            localStorage.setItem('sitePassword',p)
        },
        getlocalStorage() {
            this.loginname = localStorage.getItem('siteName') //保存到保存数据的地方
            let pwd = localStorage.getItem('sitePassword')
            this.loginFrom.public_username = this.loginname
            this.loginFrom.public_password = pwd
            if(pwd){
                this.remember = true
            }
        },
        clearlocalStorage(){
            this.setlocalStorage('', '')
        },
        getData(){
            const _this = this
            let qs = require('querystring')
            let data = {}
            data.cId = this.$store.state.iscId
            data.secondid = this.$store.state.deptid

            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'customerTwo/updateBytime.do',
                data:qs.stringify(data)
            }).then(function(res){
            }).catch(function(err){
            });
            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'customerpool/updateBytime.do',
                data:qs.stringify(data)
            }).then(function(res){
            }).catch(function(err){
            });
        }
    }
}
</script>

<style>
    .logincontent{
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }
   .content-l{
       width: 100%;
       height: 100%;
   }
   .content-r{
       width: 100%;
       height: 100%;
       padding: 20px;
       position: relative;
       /* background-image: url('/upload/staticImg/index.jpg'); */
       background-image: url('../../static/img/index.jpg');
       background-repeat: no-repeat;
       background-size: 100% 100%;
   }
   .login{
       width: 320px;
       background-color: rgb(255, 255, 255);
       padding: 20px 50px 120px 50px;
       border-radius: 5px;
       position: absolute;
       left: 50%;
       top: 50%;
       transform: translate(-50%,-50%);
   }
   .iconSet{
       color: #292929;
   }
    /* .el-form-item__error{
        left: 20% !important;
    } */
    .login_head{
        color:#292929;
        font-weight:bold;
        font-size:28px;
        margin-top:15%;
        text-align:center
    }
    .login_wel{
        color:#292929;
        font-size:16px;
        margin-top:15%;
        text-align:center;
    }
    .login_wel span{
        border-bottom: 2px solid #82a79f;
        padding-bottom: 2px;
    }
</style>
