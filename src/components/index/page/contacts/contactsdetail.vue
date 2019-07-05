<template>
    <el-row class="contactcontent" :gutter="10">
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="bold_span">{{contactdetailsData.name}}</span>
                    </div>
                    <div class="text item">
                        <ul>
                            <li>公司名称：<span>{{contactdetailsData.poolname}}</span></li>
                            <li>手机：<span>{{contactdetailsData.phone}}</span></li>
                            <li>电话：<span>{{contactdetailsData.telephone}}</span></li>
                            <li>邮箱：<span>{{contactdetailsData.email}}</span></li>
                            <li>QQ：<span>{{contactdetailsData.qq}}</span></li>
                            <li>微信：<span>{{contactdetailsData.wechat}}</span></li>
                            <li>职务：<span>{{contactdetailsData.identity}}</span></li>
                            <li>性别：<span>{{contactdetailsData.sex}}</span></li>
                            <li>地址：<span>{{contactdetailsData.address}}</span></li>
                        </ul>
                    </div>
                </el-card>
            </div>
            <div class="bottom">
                <el-tabs v-model="activeName2" type="card">
                    <el-tab-pane label="跟进记录" name="first">
                        <ul class="followrecord" v-for="item in record" :key="item.followId" style="min-height:200px;">
                            <li class="recordicon">
                                <img :src="item.imgUrl" class="detail_portrait" :alt="item.private_employee" :title="item.private_employee" />
                            </li>
                            <li class="verticalline"></li>
                            <li class="recordcontent">
                                <div class="left_more">
                                    <p>
                                        <span class="de_span_2">{{item.contacts[0].name}}</span>
                                        <span class="de_span_1">&nbsp;|&nbsp;</span>
                                        <span class="de_span_1">{{item.createTime}}</span>
                                        <span v-if="item.contactTime" class="de_span_1">&nbsp;&nbsp;--&nbsp;&nbsp;</span>
                                        <span class="de_span_1">{{item.contactTime}}</span>
                                        &nbsp;&nbsp;
                                        <span class="de_span_2">{{item.state}}</span>
                                        &nbsp;&nbsp;
                                        <span class="de_span_3">&nbsp;&nbsp;{{item.followType}}&nbsp;&nbsp;</span>
                                    </p>
                                    <p style="margin-top:15px;margin-bottom:15px;">{{item.followContent}}</p>
                                    <div class="imgbox_two" v-if="item.imgName">
                                        <img :src="item.picture_detail" alt="图片" width="80" height="80" @click="showImg($event,item)">
                                    </div>
                                    <div v-if="item.enclosureName">
                                        <a :href="item.enclosureUrl" download>{{item.enclosureOldName}}</a>
                                    </div>
                                    
                                    <p class="de_span_1">{{item.inputType}}</p>

                                    <el-dialog :visible.sync="dialogVisible2">
                                        <img width="100%" :src="dialogImageUrl2" alt="">
                                    </el-dialog>
                                </div>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="商机" name="second">
                        <el-table :data="oppDetails" border stripe style="width: 100%">
                            <el-table-column header-align="center" fixed align="center" type="index" width="45" />
                            <el-table-column label="商机名称" prop="opportunity_name" min-width="150" />
                            <el-table-column label="商机金额" prop="opportunity_achievement" min-width="110">
                                <template slot-scope="scope">
                                    {{parseInt(scope.row.opportunity_achievement) | rounding}}
                                </template>
                            </el-table-column>
                            <el-table-column label="预计签单时间" prop="opportunity_deal" min-width="150" />
                            <el-table-column label="商机阶段" prop="opportunityProgress[0].progress_name" min-width="110" />
                            <el-table-column label="预计成功率" prop="opportunityProgress[0].progress_probability" min-width="120" />
                            <el-table-column label="商机创建时间" prop="opportunity_time" min-width="150" />
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="合同" name="third">
                        <div class="entry">
                            <el-button class="btn info-btn" size="mini" @click="addagree()">新增合同</el-button>
                        </div>
                        <el-table :data="agreeDetails" border stripe style="width: 100%">
                            <el-table-column header-align="center" fixed align="center" type="index" width="45" />
                            <el-table-column label="合同编号" prop="contract_number" min-width="150" />
                            <el-table-column label="合同名称" prop="contract_name" min-width="150" />
                            <el-table-column label="合同类型" prop="contract_type" min-width="110" />
                            <el-table-column label="合同金额" prop="amount" min-width="110">
                                <template slot-scope="scope">
                                    {{scope.row.amount | rounding}}
                                </template>
                            </el-table-column>
                            <el-table-column label="签约人" prop="signatories" min-width="110" />
                            <el-table-column label="合同开始时间" prop="start_date" min-width="130" />
                            <el-table-column label="合同到期时间" prop="end_date" min-width="130" />
                            <el-table-column label="剩余天数" prop="due_time" min-width="110" />
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="个人画像" name="fourth">
                        <span style="text-align:center;">暂无数据</span>
                    </el-tab-pane>
                    <el-tab-pane label="家庭画像" name="fifth">
                        <span style="text-align:center;">暂无数据</span>
                    </el-tab-pane>
                    <el-tab-pane label="需求画像" name="sixth">
                        <span style="text-align:center;">暂无数据</span>
                    </el-tab-pane>
                    <el-tab-pane label="营销画像" name="seventh">
                        <span style="text-align:center;">暂无数据</span>
                    </el-tab-pane>
                    <el-tab-pane label="其他画像" name="eighth">
                        <span style="text-align:center;">暂无数据</span>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
        <el-col :span="6" style="padding:10px;min-height:560px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.searchName" placeholder="请输入公司名称" style="width:80%;" @keyup.enter.native="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="联系人名称" prop="name">
                    <template slot-scope="scope">
                        <div @click="getRow(scope.$index, scope.row)">
                            {{scope.row.name}}
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
        name:'contactsdetail',
        store,
        filters: {
            rounding (value) {
                if(value){
                    let intPart = Math.trunc(value) //获取整数部分
                    let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                    let floatPart = '.00' // 预定义小数部分
                    let valArray = value.toString().split('.')
                    if(valArray.length === 2) {
                        floatPart = valArray[1].toString() // 拿到小数部分
                        if(floatPart.length === 1) { // 补0,实际上用不着
                            return intPartFormat + '.' + floatPart + '0'
                        }else{
                            return intPartFormat + '.' + floatPart
                        }
                    } else {
                        return intPartFormat + floatPart
                    }
                }
            }
        },
        data(){
            return{
                msg:'contactsdetail.vue',

                contactdetailsData:{},

                activeName2:'first',
                customerpoolId:null,
                
                record:[],
                dialogVisible2:false,
                dialogImageUrl2:null,

                oppDetails:[],
                agreeDetails:[],

                page:1,
                limit:15,
                searchList:{
                    searchName:null,
                },
                tableData:[],
                tableNumber:0,
            }
        },
        activated(){
            this.loadData()
            this.loadTable()
        },
        methods:{
            loadData(){
                const _this = this
                this.msg = this.$store.state.contdetailsData
                let qs = require('querystring')
                let data = {}
                data.id = this.msg.id
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'contacts/selectById.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.contactdetailsData = res.data
                    if(res.data.customerpool_id){
                        _this.customerpoolId = res.data.customerpool_id
                    }
                    _this.$options.methods.loadFollow.bind(_this)()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadFollow(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = _this.contactdetailsData.csId
                let pageInfo2 = {}
                pageInfo2.contacts_id = _this.contactdetailsData.csId
                pageInfo2.page = 1
                pageInfo2.limit = 100000

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'selectFollowByContactsId.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.record = res.data
                    _this.record.forEach(el => {
                        if(el.userImagName){
                            el.imgUrl = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.userImagName
                        }
                        if(!el.userImagName || el.userImagName == null){
                            el.imgUrl = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                        }
                        if(el.imgName && el.imgName !== null){
                            el.picture_detail = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.imgName
                        }
                        if(el.enclosureName && el.enclosureName !== null){
                            el.enclosureUrl = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.enclosureName
                        }
                    });
                }).catch(function(err){
                    // console.log(err);
                });
                //详情页合同
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getContractByPool.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo2)
                }).then(function(res){
                    _this.agreeDetails = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
                //详情页商机
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/queryForPoolList.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo2)
                }).then(function(res){
                    _this.oppDetails = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
            },
            showImg(e,val){
                this.dialogImageUrl2 = _this.$store.state.systemHttp + '/upload/'+this.$store.state.iscId+'/'+val.imgName
                this.dialogVisible2 = true
            },
            loadTable() {
                const _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.searchName = this.searchList.searchName;
                searchList.pId = _this.$store.state.ispId
                searchList.page = this.page;
                searchList.limit = this.limit;
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getContactsAll.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            getRow(index,row){
                this.$store.state.contdetailsData = {"id":row.csId}
                this.customerpoolId = null
                this.$options.methods.loadData.bind(this)(true);
            },
            search(){
                this.$options.methods.loadTable.bind(this)(true);
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
    .contactcontent{
        background-color: #f7f7f7;
        height: auto;
        min-height: 100%;
    }
</style>
