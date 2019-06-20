<template>
    <!-- 社会营销活动 -->
    <div class="htmlbody">
        <div class="entryform">{{title}}</div>
        <el-form class="formcontent" ref="newform" :model="newform" :rules="rules">
            <el-form-item prop="poolName">
                <span class="itemlabel">公司名称:</span>
                <el-input class="forminput" v-model="newform.poolName"></el-input>
            </el-form-item>
            <el-form-item prop="contactsName">
                <span class="itemlabel">姓名:</span>
                <el-input class="forminput" v-model="newform.contactsName"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <span class="itemlabel">手机:</span>
                <el-input onkeyup="value=value.replace(/[^\d]/g,'')" class="forminput" v-model="newform.phone"></el-input>
            </el-form-item>
            <el-form-item prop="qq">
                <span class="itemlabel">qq:</span>
                <el-input onkeyup="value=value.replace(/[^\d]/g,'')" class="forminput" v-model="newform.qq"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="activitybtn" type="primary" @click="addactivity()">提 交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import store from '../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'activity',
        store,
        data(){
            return{
                newform:{
                    poolName:null,
                    contactsName:null,
                    phone:null,
                    qq:null,
                },
                rules:{
                    poolName:[{require:true,message: '请填写公司名称', trigger: 'blur'}],
                    contactsName:[{require:true,message: '请填写姓名', trigger: 'blur'}],
                    phone:[{require:true,message: '请填写手机号码', trigger: 'blur'}],
                },
                title:null,
                p:null,
            }
        },
        mounted(){
            this.getSearchString()
        },
        methods:{
            getSearchString() {
                // 获取URL中?之后的字符
                var str = window.location.hash;
                let strs = str.substring(11,str.length);
                this.p = strs
                let _this = this
                let qs = require('querystring')
                
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'customerTwo/deCryptAndDecode.do?'+_this.p
                }).then(function(res){
                    _this.title = res.data.name
                }).catch(function(err){
                });
            },
            addactivity(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.poolName = this.newform.poolName
                data.contactsName = this.newform.contactsName
                data.phone = this.newform.phone
                data.qq = this.newform.qq

                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    const myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
                    if(!item.poolName){
                        _this.$message({
                            message: "请填写公司名称",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.contactsName){
                        _this.$message({
                            message: "请填写姓名",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!myreg.test(item.phone)){
                        _this.$message({
                            message: "请输入11位手机号码",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.phone){
                        _this.$message({
                            message: "请填写手机号码",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerTwo/addActivityClue.do?'+_this.p,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'已提交',
                            type:'success'
                        })
                        _this.newform = {
                            poolName:null,
                            contactsName:null,
                            phone:null,
                            qq:null,
                        }
                        setTimeout(() => {
                            window.close()
                        }, 1500);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("提交失败，请重新提交");
                });
            },
        }
    }
</script>

<style>
    @media screen and (max-width: 500px) {
        .formcontent{
            width: 100%;
            padding: 20px 5%;
            /* background-color: rgb(131, 114, 114); */
        }
        .forminput{
            width: 90% !important;
        }
        .activitybtn{
            width: 90%;
            margin-top: 20px;
        }
    }
    @media screen and (min-width: 500px) {
        .formcontent{
            width: 50%;
            padding: 20px 25%;
        }
        .forminput{
            width: 100%;
        }
        .activitybtn{
            width: 100%;
            margin-top: 20px;
        }
    }
    .htmlbody{
        width: 100%;
        height: 100%;
        padding-top: 20px;
    }
    .entryform{
        text-align: center;
        color: #ff6333;
        font-weight: bold;
        font-size: 24px;
        padding-top: 10px;
    }
    .formcontent .el-form-item{
        margin-bottom: 10px;
    }
    .itemlabel{
        display: block;
        line-height: 30px;
        color: rgb(63, 63, 63);
    }
</style>


