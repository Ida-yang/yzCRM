<template>
<!-- 数据中心详情页 -->
    <div class="engine_c" v-if="showdetails">
        <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="bold_span">{{customername}}</span>
                        <span class="engine_icon" @click="closeDetail"><i class="el-icon-circle-close-outline"></i></span>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="retract()" v-show="retracts">显示</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="retract()" v-show="!retracts">收起</el-button>
                    </div>
                    <div class="text item" v-show="showinfo">
                        <ul>
                            <li>法人代表：<span>{{searchdetailsList.representative || '无'}}</span></li>
                            <li>行业：<span>{{searchdetailsList.industryName || '无'}}</span></li>
                            <li>社会信用代码：<span>{{searchdetailsList.creditCode || '无'}}</span></li>
                            <li>公司类型：<span>{{searchdetailsList.company || '无'}}</span></li>
                            <li>企业规模：<span>{{searchdetailsList.enterpriseScaleName || '无'}}</span></li>
                            <li>注册号：<span>{{searchdetailsList.registrationNumber || '无'}}</span></li>
                            <li>融资状态：<span>{{searchdetailsList.financing || '无'}}</span></li>
                            <li>营业状态：<span>{{searchdetailsList.ostate || '无'}}</span></li>
                            <li>组织机构代码：<span>{{searchdetailsList.organizationCode || '无'}}</span></li>
                            <li>注册资金：<span>{{searchdetailsList.capitalName || '无'}}</span></li>
                            <li>登记机关：<span>{{searchdetailsList.registrationAuthority || '无'}}</span></li>
                            <li>成立时间：<span>{{searchdetailsList.date || '无'}}</span></li>
                            <li>网址：<span>{{searchdetailsList.url || '无'}}</span></li>
                        </ul>
                    </div>
                    <div v-show="!showinfo"></div>
                </el-card>
            </div>
            <div class="bottom engine_bottom">
                <el-tabs v-model="activeName2" type="card" @tab-click="tabClick">
                    <el-tab-pane label="联系人" name="first">
                        <el-table :data="contacts" border stripe style="width: 100%">
                            <el-table-column label="联系人名称" prop="name" min-width="120" />
                            <el-table-column label="手机" prop="phone" min-width="110" />
                            <el-table-column label="邮箱" prop="email" min-width="130" />
                            <el-table-column label="QQ" prop="qq" min-width="110" />
                            <el-table-column label="职务" prop="contactsAddress" min-width="110" />
                            <el-table-column label="来源" prop="source" min-width="110" />
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="官网" name="second">
                        <iframe class="engine_iframe" :src="website"/>
                    </el-tab-pane>
                </el-tabs>
            </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import XLSX from 'xlsx';
    import bus from '../../bus';
    import qs from 'qs'

    export default {
        name:'searchDetails',
        store,
        computed: {
            searchID(){
                return store.state.searchdetailsData;
            },
        },
        data(){
            return{
                showdetails:false,
                retracts:false,
                showinfo:true,

                activeName2:'first',

                searchdetailsList:{
                    name:null,
                    representative:null,
                    industryName:null,
                    creditCode:null,
                    company:null,
                    enterpriseScaleName:null,
                    registrationNumber:null,
                    financing:null,
                    ostate:null,
                    organizationCode:null,
                    capitalName:null,
                    registrationAuthority:null,
                    date:null,
                },
                customername:null,
                contacts:null,
                website:''
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信
            bus.$on('showdetails', msg => {
                this.showdetails = msg;
            })
        },
        watch:{
            searchID(nv,ov){
                this.loadData()
            }
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.$store.state.searchdetailsData

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerOne/selectById.do',
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.searchdetailsList = res.data
                    _this.customername = _this.searchdetailsList.name
                    _this.$options.methods.loadContacts.bind(_this)()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadContacts(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.name = this.customername
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'contacts/selectContactsByName.do',
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.contacts = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            retract(){
                this.showinfo = !this.showinfo
                this.retracts = !this.retracts
            },
            closeDetail(){
                this.showdetails = false
            },
            tabClick(val){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.company = this.customername
                if(val.index == 1){
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'website/selectWebsiteByCompany.do',
                        data: qs.stringify(data)
                    }).then(function(res){
                        _this.website = 'http://' + res.data.map.websites[0].url
                    }).catch(function(err){
                        // console.log(err);
                    });
                }
            }
        },
    }
</script>

<style>
    .engine_c{
        width: 66.5%;
        height: 100%;
        background-color: rgb(255, 255, 255);
        border: 1px solid #dddddd;
        position: fixed;
        top: 90px;
        right: 33px;
        padding:20px;
        box-sizing: border-box
    }
    .engine_top{
        width: 100%;
        text-align: right;
        cursor: pointer;
        color: #969696
    }
    .engine_icon{
        float:right;
        margin-left:5px;
        line-height:27px;
        color: #969696;
        cursor: pointer;
    }
    .engine_bottom{
        margin-top: 20px;
    }
    .engine_iframe{
        width: 100%;
        height: 450px;
    }
</style>


