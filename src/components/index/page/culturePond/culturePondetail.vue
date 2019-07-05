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
                                <span class="cusport_span"><img style="margin-left:11px;" src="../../../../../static/img/persona.png" width="35" height="35" /><br>个人画像</span>
                                <img class="cusport_line" src="../../../../../static/img/line1.png" />
                                <div class="cusport_c">
                                    <div class="cusport_bg">
                                        <p><el-tag size="mini" style="margin-right:5px;">赛车</el-tag><el-tag size="mini">有用健身</el-tag></p>
                                        <p>2222222</p>
                                        <p>3333333</p>
                                        <p>2222222</p>
                                        <p>3333333</p>
                                    </div>
                                </div>
                            </div>
                            <div class="cusport_div2">
                                <span class="cusport_span"><img style="margin-left:11px;" src="../../../../../static/img/family.png" width="35" height="35" /><br>家庭画像</span>
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
                                <span class="cusport_span"><img style="margin-left:11px;" src="../../../../../static/img/consumption.png" width="35" height="35" /><br>消费画像</span>
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
                                <span class="cusport_span"><img style="margin-left:11px;" src="../../../../../static/img/interest.png" width="35" height="35" /><br>兴趣画像</span>
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
                                <span class="cusport_span"><img style="margin-left:11px;" src="../../../../../static/img/other.png" width="35" height="35" /><br>其他画像</span>
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
