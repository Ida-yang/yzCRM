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
                <el-input class="forminput" v-model="newform.phone"></el-input>
            </el-form-item>
            <el-form-item prop="qq">
                <span class="itemlabel">qq:</span>
                <el-input class="forminput" v-model="newform.qq"></el-input>
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
        contactsName:'activity',
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
                url:null,
                title:null,
                cId:null,
                pId:null,
            }
        },
        mounted(){
            // console.log(window.location.hash)
            this.url = window.location.hash
            this.getSearchString()
        },
        methods:{
            //key(需要检错的键） url（传入的需要分割的url地址）
            getSearchString() {
            // 获取URL中?之后的字符
                var str = this.url;
                str = str.substring(11,str.length);
                // console.log(str)
                // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
                var arr = str.split("&");
                // console.log(arr)
                var obj = new Object();

                // 将每一个数组元素以=分隔并赋给obj对象 
                for(var i = 0; i < arr.length; i++) {
                    var tmp_arr = arr[i].split("=");
                    obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
                }
                // console.log(obj)
                this.title = obj.n
                this.cId = obj.c
                this.pId = obj.p
                // console.log(this.title)
                // console.log(this.cId)
                // console.log(this.pId)
            },
            addactivity(){
                // console.log(this.newform)
                let _this = this;
                let qs = require('querystring')
                let data = {}
                data.poolName = this.newform.poolName
                data.contactsName = this.newform.contactsName
                data.phone = this.newform.phone
                data.qq = this.newform.qq
                data.remark = this.title
                // console.log(data)
                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
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
                    url: _this.$store.state.defaultHttp+'customerTwo/addActivityClue.do?cId='+_this.cId+'&pId='+_this.pId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res)
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
        color: #ff5722;
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


