<template>
    <el-row class="culponcontent" :gutter="10">
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="bold_span">{{culPondetailData.contacts}}</span>
                    </div>
                    <div class="text item">
                        <ul>
                            <li>公司名称：<span>{{culPondetailData.name}}</span></li>
                            <li>手机：<span>{{culPondetailData.phone}}</span></li>
                            <li>电话：<span>{{culPondetailData.telephone}}</span></li>
                            <li>邮箱：<span>{{culPondetailData.email}}</span></li>
                            <li>QQ：<span>{{culPondetailData.qq}}</span></li>
                            <li>微信：<span>{{culPondetailData.wechat}}</span></li>
                            <li>职务：<span>{{culPondetailData.identity}}</span></li>
                            <li>性别：<span>{{culPondetailData.sex}}</span></li>
                            <li>地址：<span>{{culPondetailData.address}}</span></li>
                        </ul>
                    </div>
                </el-card>
            </div>
            <div class="bottom">
                <el-tabs v-model="activeName2" type="card">
                    <el-tab-pane label="客户画像" name="first">
                        <div class="cus_portrait">
                            <img class="cusport_img" src="../../../../../static/img/cusPortrait.png" width="250" height="250" />
                            <div class="cusport_div1">
                                <span class="cusport_span" @click="openDialog(1)"><img style="margin-left:11px;" src="../../../../../static/img/persona.png" width="35" height="35" /><br>个人画像</span>
                                <img class="cusport_line" src="../../../../../static/img/line1.png" />
                                <div class="cusport_c">
                                    <div class="cusport_bg">
                                        <p>1111111</p>
                                        <p>2222222</p>
                                        <p>3333333</p>
                                        <p>2222222</p>
                                        <p>3333333</p>
                                    </div>
                                </div>
                            </div>
                            <div class="cusport_div2">
                                <span class="cusport_span" @click="openDialog(2)"><img style="margin-left:11px;" src="../../../../../static/img/family.png" width="35" height="35" /><br>家庭画像</span>
                                <img class="cusport_line" src="../../../../../static/img/line2.png" />
                                <div class="cusport_c">
                                    <div class="cusport_bg">
                                        <p>1111111</p>
                                        <p>4444444</p>
                                        <p>1111111</p>
                                        <p>4444444</p>
                                        <p>1111111</p>
                                    </div>
                                </div>
                            </div>
                            <div class="cusport_div3">
                                <span class="cusport_span" @click="openDialog(3)"><img style="margin-left:11px;" src="../../../../../static/img/consumption.png" width="35" height="35" /><br>消费画像</span>
                                <img class="cusport_line" src="../../../../../static/img/line3.png" />
                                <div class="cusport_c">
                                    <div class="cusport_bg">
                                        <p>1111111</p>
                                        <p>2222222</p>
                                        <p>3333333</p>
                                        <p>4444444</p>
                                        <p>4444444</p>
                                    </div>
                                </div>
                            </div>
                            <div class="cusport_div4">
                                <span class="cusport_span"><img style="margin-left:11px;" src="../../../../../static/img/marketing.png" width="35" height="35" /><br>营销画像</span>
                                <img class="cusport_line" src="../../../../../static/img/line4.png" />
                                <div class="cusport_c">
                                    <div class="cusport_bg">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            <div class="cusport_div5">
                                <span class="cusport_span" @click="openDialog(5)"><img style="margin-left:11px;" src="../../../../../static/img/interest.png" width="35" height="35" /><br>兴趣画像</span>
                                <img class="cusport_line" src="../../../../../static/img/line5.png" />
                                <div class="cusport_c">
                                    <div class="cusport_bg">
                                        <p>3333333</p>
                                        <p>4444444</p>
                                        <p>3333333</p>
                                        <p>4444444</p>
                                        <p>1111111</p>
                                        <p>2222222</p>
                                        <p>3333333</p>
                                    </div>
                                </div>
                            </div>
                            <div class="cusport_div6">
                                <span class="cusport_span" @click="openDialog(6)"><img style="margin-left:11px;" src="../../../../../static/img/other.png" width="35" height="35" /><br>其他画像</span>
                                <img class="cusport_line" src="../../../../../static/img/line6.png" />
                                <div class="cusport_c">
                                    <div class="cusport_bg">
                                        <p>1111111</p>
                                        <p>1111111</p>
                                        <p>1111111</p>
                                        <p>1111111</p>
                                        <p>1111111</p>
                                        <p>1111111</p>
                                        <p>1111111</p>
                                        <p>1111111</p>
                                        <p>1111111</p>
                                        <p>1111111</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="个人画像" name="second">
                        <ul class="cul_checkBox">
                            <li class="cil_li">
                                <span class="cul_li_span">性别</span>
                                <el-radio-group v-model="personForm.sex" class="cul_li_rg">
                                    <el-radio label="男" value="男"></el-radio>
                                    <el-radio label="女" value="女"></el-radio>
                                </el-radio-group>
                            </li>
                            <li class="cil_li">
                                <span class="cul_li_span">年龄</span>
                                <el-radio-group v-model="personForm.age" class="cul_li_rg">
                                    <el-radio v-for="item in ageData" :key="item.index" :label="item.name">{{item.name}}</el-radio>
                                </el-radio-group>
                                <span></span>
                            </li>
                            <li class="cil_li">
                                <span class="cul_li_span">城市</span>
                                <el-radio-group v-model="personForm.city" class="cul_li_rg">
                                    <el-radio v-for="item in cityData" :key="item.index" :label="item.name">{{item.name}}</el-radio>
                                </el-radio-group>
                                <span></span>
                            </li>
                            <li class="cil_li">
                                <span class="cul_li_span">职业</span>
                                <el-radio-group v-model="personForm.occupation" class="cul_li_rg">
                                    <el-radio v-for="item in occupationData" :key="item.index" :label="item.name">{{item.name}}</el-radio>
                                </el-radio-group>
                                <span></span>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="家庭画像" name="third">
                        <span style="text-align:center;">暂无数据</span>
                    </el-tab-pane>
                    <el-tab-pane label="需求画像" name="fourth">
                        <span style="text-align:center;">暂无数据</span>
                    </el-tab-pane>
                    <el-tab-pane label="营销画像" name="fifth">
                        <span style="text-align:center;">暂无数据</span>
                    </el-tab-pane>
                    <el-tab-pane label="其他画像" name="sixth">
                        <span style="text-align:center;">暂无数据</span>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
        <el-col :span="6" style="padding:10px;min-height:560px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.keyword" placeholder="请输入公司名称" style="width:80%;" @keyup.enter.native="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="公司名称" prop="contacts">
                    <template slot-scope="scope">
                        <div @click="getRow(scope.$index, scope.row)">
                            {{scope.row.contacts}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block numberPage number">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[15, 30, 50, 100]"
                    :page-size="15"
                    layout="total, sizes, prev, next"
                    :total="tableNumber">
                </el-pagination>
            </div>
        </el-col>

        <el-dialog :title="newform.title" :visible.sync="dialogVisible" :close-on-click-modal="false" width="600px">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules" style="padding-right:30px">
                <el-form-item v-for="item in labelList" :key="item.prop" :prop="item.prop" :label="item.label">
                    <!-- <el-select v-if="item.type == 'select'" v-model="newform[item.prop]" :multiple="item.multiple" :placeholder="item.placeholder" class="mul_select">
                        <el-option v-for="o in item.options" :key="o.id" :label="o.typeName" :value="o.id"></el-option>
                    </el-select> -->
                    <el-checkbox-group v-if="item.type == 'select'" v-model="newform[item.prop]" class="cul_checkbox">
                        <el-checkbox v-for="o in item.options" :key="o.id" :label="o.id">{{o.typeName}}</el-checkbox>
                    </el-checkbox-group>
                    <el-radio-group v-if="item.type == 'radio'" v-model="newform[item.prop]" class="cul_radio">
                        <el-radio v-for="o in item.options" :key="o.id" :label="o.id">{{o.typeName}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit()">确 定</el-button>
            </span>
        </el-dialog>
    </el-row>
</template>

<script>
    import store from '../../../../store/store';
    import axios from 'axios'
    import qs from 'qs'
    
    export default {
        name:'culturePondetail',
        store,
        data(){
            return{
                msg:'culturePondetail.vue',

                culPondetailData:{},

                tableData:[],
                tableNumber:0,
                searchList:{
                    keyword:null,
                },
                page:1,
                limit:15,

                activeName2:'first',

                personForm:{
                    sex:null,
                    age:null,
                    city:null,
                    occupation:null,
                },

                ageData:[
                    {index:1,name:'20-25'},
                    {index:2,name:'26-30'},
                    {index:3,name:'30-40'},
                    {index:4,name:'40-50'},
                    {index:5,name:'50-60'},
                ],
                cityData:[
                    {index:1,name:'广州'},
                    {index:2,name:'深圳'},
                    {index:3,name:'东莞'},
                    {index:4,name:'佛山'},
                ],
                occupationData:[],

                cusportraitList:{},
                personalList:[], //个人
                familyList:[], //家庭
                interestList:[], //兴趣
                consumptionList:[], //消费
                otherList:[], //其他

                otherLabelList:[],

                dialogVisible:false,
                newform:{
                    title:null,
                },
                labelList:[],
                rules:{},
            }
        },
        activated(){
            this.loadData()
            this.loadTable()
        },
        methods:{
            loadData(){
                this.msg = this.$store.state.culturePondetailData
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.msg.id

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp + 'cultivationPool/selectById.do?cId=' + _this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.culPondetailData = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadTable(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.page = this.page
                data.limit = this.limit

                this.personalList = [], //个人
                this.familyList = [], //家庭
                this.interestList = [], //兴趣
                this.consumptionList = [], //消费
                this.otherList = [], //其他

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp + 'cultivationPool/queryForList.do?cId=' + _this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp + 'portraitType/getPortraitTypeByType.do?cId=' + _this.$store.state.iscId
                }).then(function(res){
                    let datas = res.data
                    _this.cusportraitList = res.data
                    _this.personalList.push(datas.name1001,datas.name2001,datas.name3001,datas.name4001,datas.name5001)            //个人
                    _this.familyList.push(datas.name6001,datas.name7001,datas.name8001,datas.name9001,datas.name10001)            //家庭
                    _this.interestList.push(datas.name11001,datas.name12001,datas.name13001,datas.name14001,datas.name19001,datas.name20001,datas.name21001)            //兴趣
                    _this.consumptionList.push(datas.name15001,datas.name16001,datas.name17001,datas.name18001,datas.name22001)            //消费
                    _this.otherList.push(datas.name31001,datas.name31002,datas.name31003,datas.name31004,datas.name31005,datas.name31006,datas.name31007,datas.name31008,datas.name31009,datas.name31010)            //其他
                }).catch(function(err){
                    // console.log(err);
                });
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'portraitType/getOthersPortraitType.do?cId='+_this.$store.state.iscId
                }).then(function(res){
                    _this.otherLabelList = res.data.portraitTypes
                }).catch(function(err){
                });
            },
            openDialog(val){
                if(val == 1){
                    this.labelList = [
                        {"label":"性别","prop":"sex","type":"radio","options":this.cusportraitList.name5001},
                        {"label":"年龄","prop":"age","type":"radio","options":this.cusportraitList.name4001},
                        {"label":"职业","prop":"zhiye","type":"radio","options":this.cusportraitList.name1001,"multiple":true},
                        {"label":"岗位","prop":"gangwei","type":"radio","options":this.cusportraitList.name2001,"multiple":true},
                        {"label":"学历","prop":"xueli","type":"radio","options":this.cusportraitList.name3001},
                    ]
                    this.newform = {
                        "title":'个人画像',
                        "sex":'',
                        "age":'',
                        "zhiye":'',
                        "gangwei":'',
                        "xueli":'',
                    }
                }
                if(val == 2){
                    this.labelList = [
                        {"label":"婚姻状况","prop":"hunyin","type":"radio","options":this.cusportraitList.name6001},
                        {"label":"家庭人数","prop":"jiaren","type":"radio","options":this.cusportraitList.name7001},
                        {"label":"子女人数","prop":"zinv","type":"radio","options":this.cusportraitList.name8001},
                        {"label":"父母人数","prop":"fumu","type":"radio","options":this.cusportraitList.name9001},
                        {"label":"年收入","prop":"shouru","type":"radio","options":this.cusportraitList.name10001},
                    ]
                    this.newform = {
                        "title":'家庭画像',
                        "hunyin":'',
                        "jiaren":'',
                        "zinv":'',
                        "fumu":'',
                        "shouru":'',
                    }
                }
                if(val == 3){
                    this.labelList = [
                        {"label":"手机兴趣","prop":"shouji","type":"select","options":this.cusportraitList.name15001,"multiple":true},
                        {"label":"品牌兴趣","prop":"pinpai","type":"select","options":this.cusportraitList.name16001,"multiple":true},
                        {"label":"车辆兴趣","prop":"cheliang","type":"select","options":this.cusportraitList.name17001,"multiple":true},
                        {"label":"品茶兴趣","prop":"pincha","type":"select","options":this.cusportraitList.name18001,"multiple":true},
                        {"label":"服饰兴趣","prop":"fushi","type":"select","options":this.cusportraitList.name22001,"multiple":true},
                    ]
                    this.newform = {
                        "title":'消费画像',
                        "shouji":[],
                        "pinpai":[],
                        "cheliang":[],
                        "pincha":[],
                        "fushi":[],
                    }
                }
                if(val == 5){
                    this.labelList = [
                        {"label":"行为爱好","prop":"xingqu","type":"select","options":this.cusportraitList.name11001,"multiple":true},
                        {"label":"阅读兴趣","prop":"yuedu","type":"select","options":this.cusportraitList.name12001,"multiple":true},
                        {"label":"社交兴趣","prop":"shejiao","type":"select","options":this.cusportraitList.name13001,"multiple":true},
                        {"label":"运动兴趣","prop":"yundong","type":"select","options":this.cusportraitList.name14001,"multiple":true},
                        {"label":"影视兴趣","prop":"yingshi","type":"select","options":this.cusportraitList.name19001,"multiple":true},
                        {"label":"音乐兴趣","prop":"yinyue","type":"select","options":this.cusportraitList.name20001,"multiple":true},
                        {"label":"饮食兴趣","prop":"yinshi","type":"select","options":this.cusportraitList.name21001,"multiple":true},
                    ]
                    this.newform = {
                        "title":'兴趣画像',
                        "xingqu":[],
                        "yuedu":[],
                        "shejiao":[],
                        "yundong":[],
                        "yingshi":[],
                        "yinyue":[],
                        "yinshi":[],
                    }
                }
                if(val == 6){
                    this.labelList = []
                    this.otherLabelList.forEach(el => {
                        this.labelList.push({"label":el.name,"prop":el.index,"type":"select","options":[],"multiple":true})
                    });
                    this.otherList.forEach((a,i) => {
                        this.labelList[i].options = a
                    });
                    this.newform = {
                        "title":'其他画像',
                        "31001":[],
                        "31002":[],
                        "31003":[],
                        "31004":[],
                        "31005":[],
                        "31006":[],
                        "31007":[],
                        "31008":[],
                        "31009":[],
                        "31010":[],
                    }
                }
                this.dialogVisible = true
            },
            onSubmit(){
                console.log(this.newform)
            },



            getRow(index,row){
                this.$store.state.culturePondetailData = {"id":row.id}
                this.$options.methods.loadData.bind(this)(true);
            },
            search(){
                this.$options.methods.loadTable.bind(this)()
            },
            handleSizeChange(val){
                this.limit = val
                this.$options.methods.loadTable.bind(this)()
            },
            handleCurrentChange(val){
                this.page = val
                this.$options.methods.loadTable.bind(this)()
            }
        },
    }
</script>

<style>
    .culponcontent{
        background-color: #f7f7f7;
        height: auto;
        min-height: 100%;
    }
    .cul_checkBox{
        width: 100%;
        height: auto;
        list-style: none;
    }
    .cul_checkBox .cil_li{
        width: 100%;
        height: 80px;
        border-bottom: 1px solid #e3e3e3;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .cul_checkBox .cil_li:last-child{
        border-bottom: none
    }
    .cul_li_span{
        flex: 0 0 100px;
        display: inline-block;
        /* width: 100px; */
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        color: #606266;
        border-right: 1px solid #919191;
        box-sizing: border-box;
    }
    .cul_li_rg{
        flex: 0 0 calc(100% - 100px);
        padding-left: 30px;
        box-sizing: border-box;
    }
    .mul_select{
        width: 100%;
    }
    .mul_select .el-input__inner{
        height: 30px !important;
    }

    .label_tag{
        background-color: #ffffff;
    }
    .cul_checkbox .el-checkbox{
        margin-left: 20px;
    }
    .cul_radio .el-radio{
        margin-left: 20px;
        line-height: 40px
    }
</style>
