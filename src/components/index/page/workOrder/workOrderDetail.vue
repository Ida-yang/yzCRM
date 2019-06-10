<template>
    <div class="wo_content">
        <!-- {{msg}} -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="font-weight:bold">服务工单</span>
            </div>
            <div class="wo_c">
                <ul class="wo_ul">
                    <li class="wo_li">
                        <span class="wo_span_1">公司名称</span>
                        <span class="wo_span_2">{{workorderDetails.customerpool}}</span>
                    </li>
                    <li class="wo_li">
                        <span class="wo_span_1">联系人</span>
                        <span class="wo_span_2">{{workorderDetails.contacts}}</span>
                    </li>
                    <li class="wo_li">
                        <span class="wo_span_1">电话</span>
                        <span class="wo_span_2">{{workorderDetails.phone}}</span>
                    </li>
                    <li class="wo_li">
                        <span class="wo_span_1">反馈方式</span>
                        <span class="wo_span_2">{{workorderDetails.feedbackType}}</span>
                    </li>
                    <li class="wo_li">
                        <span class="wo_span_1">受理人</span>
                        <span class="wo_span_2">{{workorderDetails.ascription}}</span>
                    </li>
                    <li class="wo_li">
                        <span class="wo_span_1">工单类型</span>
                        <span class="wo_span_2">{{workorderDetails.serviceTypeName}}</span>
                    </li>
                    <li class="wo_li">
                        <span class="wo_span_1">销售单号</span>
                        <span class="wo_span_2">{{workorderDetails.orderNo}}</span>
                    </li>
                    <li class="wo_li"></li>
                    <li class="wo_li"></li>
                    <li class="wo_li_1">
                        <span class="wo_span_1">问题名称</span>
                        <span class="wo_span_2">{{workorderDetails.problem}}</span>
                    </li>
                    <li class="wo_li_2">
                        <span class="wo_span_1">问题描述</span>
                        <span class="wo_span_2">{{workorderDetails.describe}}</span>
                    </li>
                </ul>
            </div>
        </el-card>
        <div class="bottom">
            <div class="uploadBOX" v-if="imgList.length">
                <div class="imgbox" v-for="(item,i) in imgList" :key="i">
                    <img :src="item.url" class="wo_imgbox" :alt="item.name" @click="showImg($event,item)">
                </div>
            </div>
            <div class="wo_enclo" v-if="fileList.length">
                <ul>
                    <li v-for="(item,i) in fileList" :key="i">{{item.name}}</li>
                </ul>
            </div>
        </div>

        <div class="wo_c_1" >
            <ul class="wo_ul">
                <li class="wo_li_3">
                    <span class="wo_span_1">制单人</span>
                    <span class="wo_span_3">{{workorderDetails.private_employee}}</span>
                </li>
                <li class="wo_li_3">
                    <span class="wo_span_1">负责人</span>
                    <span class="wo_span_3">{{workorderDetails.ascription}}</span>
                </li>
                <li class="wo_li_3">
                    <span class="wo_span_1">部门</span>
                    <span class="wo_span_3">{{workorderDetails.deptname}}</span>
                </li>
                <li class="wo_li_3">
                    <span class="wo_span_1">机构</span>
                    <span class="wo_span_3">{{workorderDetails.parentname}}</span>
                </li>
            </ul>
        </div>

        <hr style="height:20px;background-color:#f0f0f0;border:0">

        <div class="orderHead">
                <el-form :inline="true" ref="myform" :model="myform" :rules="rules">
                    <el-form-item class="first_input" label="解决人" label-width="90px">
                        <el-input v-model="myform.solver" class="inputbox" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item prop="feedbackTime" class="first_input" label="解决时间" label-width="90px">
                        <el-date-picker v-model="myform.feedbackTime" type="datetime" placeholder="选择解决时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" default-time="12:00:00" class="inputbox"></el-date-picker>
                    </el-form-item>
                    <el-form-item prop="feedbackType" class="first_input" label="解决方式" label-width="90px">
                        <el-select v-model="myform.feedbackType" placeholder="请选择解决方式" class="inputbox">
                            <el-option v-for="item in feedbackTypeList" :key="item.index" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone" class="first_input" label="耗时" label-width="90px">
                        <el-input v-model="myform.phone" class="inputbox"></el-input>
                    </el-form-item>
                    <el-form-item prop="customerpoolId" class="first_input" label="知识库引入" label-width="90px">
                        <el-select v-model="myform.customerpoolId" placeholder="" class="inputbox" filterable @change="selectCustomer">
                            <el-option v-for="item in customerList" :key="item.id" :label="item.pName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        
        <div class="submit_btn">
            <el-button type="primary" :disabled="isDisable" @click="onSubmit" style="margin-right:100px;">立即提交</el-button>
            <el-button @click="closeTag">取消</el-button>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'workOrderDetail',
        store,
        data(){
            return{
                msg:'工单详情页',
                detailData:null,
                workorderDetails:{},
                imgList:[],
                fileList:[],
                dialogImageUrl:null,
                dialogVisible:false,

                myform:{
                    solver:this.$store.state.user
                },
                rules:{},
                acceptanceList:[],
                feedbackTypeList:[],
                customerList:[],

                isDisable:false
            }
        },
        mounted(){
            this.loadData()
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                this.detailData = this.$store.state.workOrderdetaildsData
                let data = {}
                data.id = this.detailData.id

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'workOrder/queryById.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.workorderDetails = res.data
                    _this.$options.methods.loadList.bind(_this)()
                }).catch(function(err){
                });
            },
            loadList(){
                this.imgList = []
                this.fileList = []
                let arr = this.workorderDetails.enclosures
                let arr2 = this.workorderDetails.enclosureOldNames
                arr2.forEach((b,j) => {
                    arr.forEach((a,i) => {
                        if(j == i){
                            let aaa = a.split('.')
                            if(aaa[1] == 'png' || aaa[1] == 'jpg' || aaa[1] == 'jpeg'){
                                this.imgList.push({url:this.$store.state.systemHttp + 'upload/' + this.$store.state.iscId + '/' + a,name:b})
                            }else{
                                this.fileList.push({url:this.$store.state.systemHttp + 'upload/' + this.$store.state.iscId + '/' + a,name:b})
                            }
                        }
                    });
                });
            },
            showImg(e,val){
                this.dialogImageUrl = val.url
                this.dialogVisible = true
            },
            selectCustomer(val){
                console.log(val)
            },
            onSubmit(){
                const _this = this
                let qs = require('querystring')
                let data = {}
            },
            closeTag(){
                let tagsList = this.$store.state.tagsList;
                let index;
                tagsList.forEach((element, i) => {
                    if(element.name == this.$options.name) {
                        index = i;
                    }
                });
                const delItem = this.$store.state.tagsList.splice(index, 1)[0];
                const item = this.$store.state.tagsList[index] ? this.$store.state.tagsList[index] : this.$store.state.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push('/workOrder');
                }else{
                    this.$router.push('/index');
                }
            },
        },
    }
</script>

<style>
    .wo_content{
        margin-bottom: 65px;
    }
    .wo_c_1{
        margin-bottom: 20px;
    }
    .wo_ul{
        width: 100%;
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
    }
    .wo_li,.wo_li_1{
        height: 30px;
        margin-bottom: 22px;
        display: flex;
        align-items: center;
    }
    .wo_ul .wo_li{
        flex: 0 0 33%;
    }
    .wo_ul .wo_li_1,.wo_ul .wo_li_2{
        flex: 0 0 66%;
    }
    .wo_ul .wo_li_3{
        flex: 0 0 24%;
    }
    .wo_span_1{
        display: inline-block;
        width: 90px;
        text-align: right;
        font-size: 14px;
        color: #606266;
        padding-right: 8px;
        box-sizing: border-box;
        margin-right: 5px;
    }
    .wo_span_2{
        display: inline-block;
        width: calc(100% - 142px);
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        padding: 0 8px;
        box-sizing: border-box;
    }
    .wo_span_3{
        display: inline-block;
        width: calc(100% - 100px);
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        padding: 0 8px;
        box-sizing: border-box;
    }
    .wo_ul .wo_li_2 .wo_span_1{
        margin-right:0;
    }
    .wo_ul .wo_li_2 .wo_span_2{
        height: 117px;
    }
    .wo_imgbox{
        border: 1px dashed #dcdfe6
    }
    .wo_enclo ul{
        padding-left: 20px;
        list-style-type: none;
        color: blue;
        text-decoration: underline;
        line-height: 24px;
        font-size: 14px;
    }
</style>
