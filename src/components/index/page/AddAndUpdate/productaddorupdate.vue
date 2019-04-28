<template>
    <div class="add_c">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="基本资料" name="first" class="first_c">
                <div class="first_top">
                    <div class="first_left">
                        <el-form :inline="true" ref="myform" :model="myform" :rules="rules">
                            <el-form-item class="first_input" label="产品名称" label-width="90px">
                                <el-input v-model="myform.chanpinmingcheng" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="单位" label-width="90px">
                                <el-select v-model="myform.unit" placeholder="请选择单位" class="inputbox">
                                    <el-option v-for="item in unitsData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="first_input" label="品牌" label-width="90px">
                                <el-select v-model="myform.pinpai" placeholder="请选择品牌" class="inputbox">
                                    <el-option v-for="item in brandsData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="first_input" label="产品分类" label-width="90px">
                                <el-input v-model="myform.chanpinfenlei" :disabled="true" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="产品属性" label-width="90px">
                                <el-select v-model="myform.chanpinshuxing" placeholder="请选择产品属性" class="inputbox">
                                    <el-option v-for="item in attributeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="first_input" label="销售价格" label-width="90px">
                                <el-input v-model="myform.xiaoshoujiage" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="标准成品价" label-width="90px">
                                <el-input v-model="myform.chengpinjia" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="描述" label-width="90px">
                                <el-input v-model="myform.miaoshu" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="产品标签" label-width="90px">
                                <el-input v-model="myform.chanpinbiaoqian" class="inputbox"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="first_right">
                        <img src="../../../../../static/img/timg.jpg" width="200" height="200">
                    </div>
                </div>
                <div class="first_bottom">
                    <div class="uploadBOX">
                            <div class="imgbox" v-for="item in fileList" :key="item.id" @mouseenter="mouseenterdiv(item)" @mouseleave="mouseleavediv(item)">
                                <img :src="item.imgURL" alt="图片" @click="showImg($event,item)">
                                <div class="imgdel">
                                    <i class="el-icon-delete" v-if="imgshow" @click="delImg($event,item)"></i>
                                </div>
                            </div>
                            <div class="filebox">
                                <span class="upload">
                                    <input type="file" name="file" @change="tirggerFile($event)"/>
                                </span>
                            </div>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                                <!-- <img src="/upload/staticImg/bg.jpg" width="100%" alt="图片"> -->
                            </el-dialog>
                        </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="价格资料" name="second">价格资料</el-tab-pane>
            <el-tab-pane label="商品详情描述" name="third">商品详情描述</el-tab-pane>
        </el-tabs>
        <div class="submit_btn">
            <el-button type="primary" :disabled="isDisable" @click="onSubmit">立即提交</el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button @click="closeTag">取消</el-button>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import bus from '../../bus'

    export default {
        name:'productaddorupdate',
        store,
        data(){
            return{
                activeName:'first',
                myform:{
                    chanpinmingcheng:null,
                    unit:null,
                    pinpai:null,
                    chanpinfenleiID:null,
                    chanpinfenlei:null,
                    chanpinshuxing:null,
                    xiaoshoujiage:null,
                    chengpinjia:null,
                    miaoshu:null,
                    chanpinbiaoqian:null,
                },
                rules:{
                    chanpinmingcheng : [{ required: true, message: '产品名称不能为空', trigger: 'blur' },],
                    unit : [{ required: true, message: '单位不能为空', trigger: 'blur' },],
                    chanpinshuxing : [{ required: true, message: '产品属性不能为空', trigger: 'blur' },],
                },
                isDisable:false,

                page:1,//默认为第一页
                limit:20,//默认为20行

                attributeList:[
                    {id:1,name:'成品'},
                    {id:2,name:'原材料'},
                    {id:3,name:'辅材'},
                    {id:4,name:'办公用品'},
                ],
                unitsData:null,
                brandsData:null,

                fileList:[
                    {id:1,imgURL:'../../../../../static/img/index.jpg'},
                    {id:2,imgURL:'../../../../../static/img/1.jpg'},
                    {id:3,imgURL:'../../../../../static/img/2.jpg'},
                    {id:4,imgURL:'../../../../../static/img/3.jpg'},
                ],
                imgshow:false,

                dialogVisible:false,
                dialogImageUrl:''
            }
        },
        mounted(){
            this.loadData()
            this.loadother()
        },
        // JSON.parse(JSON.stringify(data))
        methods:{
            loadData(){
                let productaddOrUpdateData = this.$store.state.productaddOrUpdateData
                console.log(productaddOrUpdateData.setForm)
                this.myform = productaddOrUpdateData.setForm
            },
            loadother(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.page = this.page
                data.limit = this.limit

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'unit/selectUnitList.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.unitsData = res.data.map.units
                }).catch(function(err){
                    // console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'brand/selectBrandList.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.brandsData = res.data.map.brands
                }).catch(function(err){
                    // console.log(err);
                });
            },
            mouseenterdiv(val){
                this.imgshow = true
            },
            mouseleavediv(val){
                this.imgshow = false
            },
            showImg(){},
            delImg(){},
            tirggerFile(){},
            onSubmit(){
                console.log(this.myform)
            },
            closeTag(){},
        },
    }
</script>

<style>
    .add_c{
        width: 100%;
        padding-bottom: 60px;
        box-sizing: border-box
    }
    .first_c{
        width: 100%;
    }
    .first_top{
        width: 100%;
        display: flex
    }
    .first_left{
        width: calc(100% - 300px);
        padding: 20px;
        /* background-color: #c5b3b3; */
    }
    .first_left .first_input{
        width: calc(50% - 20px);
    }
    .first_left .el-form-item__content{
        width: calc(100% - 100px);
    }
    .first_input .inputbox{
        width: calc(100% - 20px);
    }
    .first_right{
        width: 350px;
        /* background-color: #b3c5bb; */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .submit_btn{
        width: 100%;
        height: 60px;
        position: fixed;
        bottom: 0;
        background-color: #fff;
        border-top: 1px solid #e4e7ed;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

