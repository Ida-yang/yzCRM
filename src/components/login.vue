<template>
    <!-- 登录页 -->
    <el-row class="logincontent">
        <!-- <el-col :span="14" class="content-l">
            <div>
                <img src="/upload/staticImg/test.png" height="50%" width="60%" alt="元旦快乐" title="元旦快乐" style="margin:25% 20%;">
            </div>
        </el-col> -->
        <el-col class="content-r">
            <div class="login">
                <div style="color:#292929;font-size:28px;margin-top:15%;text-align:center">账号密码登录</div>
                <div class="grid-content bg-purple-dark">
                    <el-form  :model="loginFrom" status-icon :rules="rules" ref="loginFrom" 
                    class="demo-ruleForm"
                    style="color:#fff" >
                        <el-form-item prop="public_username" style="width:100%;margin-top:70px;">
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
    data () {
        return {
            loginFrom:{
                public_username :'',
                public_password :''
            },
            remember:false,
            rules: {
                public_username : [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                public_password : [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            },
        }
    },
    mounted() {
        this.getlocalStorage()
        // var backgroundImage = $("body").css("background-image");
        // $("body").css("background-image", "none");
        // $("body").css("background", "#fff");
        // $("body").css("opacity", "0");
        // // setTimeout(function(){
        //     $("body").animate({opacity: "1"}, 300, "linear",function(){
        //         $("body").css("background", "");
        //         $("body").css("background-image", backgroundImage);
        //         $(".systemTitle").show(500);
        //         $(".systemLogin").show(500);
        //     });
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
                _this.clearlocalStorage()
            }

            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'tologin.do',
                data:qs.stringify(loginInfo),
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(res){
                // console.log(res)
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
                    _this.$router.push({path:'/index'})
                }else {
                    _this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(function(err){
                console.log(err)
            })
        },
        setlocalStorage(n, p) {
            // console.log(n,p)
            localStorage.setItem('siteName',n)
            localStorage.setItem('sitePassword',p)
        },
        getlocalStorage() {
            let name = localStorage.getItem('siteName') //保存到保存数据的地方
            let pwd = localStorage.getItem('sitePassword')
            this.loginFrom.public_username = name
            this.loginFrom.public_password = pwd
            if(pwd){
                this.remember = true
            }
        },
        clearlocalStorage(){
            this.setlocalStorage('', '')
        },
    }
}
</script>

<style>
    .logincontent{
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
       /* background-image: url('../../static/img/index.jpg'); */
       background-image: url('/upload/staticImg/index.jpg');
       background-repeat: no-repeat;
       background-size: 100% 100%;
    }
   .content-l{
       height: 100%;
       /* background-image: url(../assets/img/index.png);
       background-repeat: no-repeat;
       background-size: 70% 50%; */
   }
   .content-r{
       height: 100%;
       padding: 20px;
       position: relative;
   }
   .login{
       width: 320px;
       height: 60%;
       background-color: rgb(255, 255, 255);
       padding: 20px 30px;
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
</style>
