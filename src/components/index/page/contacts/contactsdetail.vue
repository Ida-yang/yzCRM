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
                            <li v-for="(item,index) in fieldData" :key="index">
                                {{item.name}}：<span>{{item.value}}</span>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </div>
            <div class="bottom">
                <el-tabs v-model="activeName2" type="card">
                    <el-tab-pane label="跟进记录" name="first" style="min-height:200px;">
                        <ul class="followrecord" v-for="item in record" :key="item.followId">
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
                                    <div style="margin-top:15px;margin-bottom:15px;" v-html="item.followContent"></div>
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
                    <el-tab-pane label="客户画像" name="fourth">
                        <div class="cus_portrait">
                            <img class="cusport_img" src="../../../../../static/img/cusPortrait.png" width="250" height="250" />
                            <div class="cusport_div1">
                                <span class="cusport_span"><img style="margin-left:11px;" src="../../../../../static/img/marketing.png" width="35" height="35" /><br>营销画像</span>
                                <img class="cusport_line" src="../../../../../static/img/line1.png" />
                                <div class="cusport_c">
                                    <div class="cusport_bg">
                                        <p>邮件访问次数：<el-tag size="mini">{{PortraitData.email_visit_num + ' 次'}}</el-tag></p>
                                        <p>短信访问次数：<el-tag size="mini">{{PortraitData.message_visit_num + ' 次'}}</el-tag></p>
                                    </div>
                                </div>
                            </div>
                            <div class="cusport_div2">
                                <span class="cusport_span" @click="openDialog(2)" style="cursor: pointer;"><img style="margin-left:11px;" src="../../../../../static/img/persona.png" width="35" height="35" /><br>个人画像</span>
                                <img class="cusport_line" src="../../../../../static/img/line2.png" />
                                <div class="cusport_c">
                                    <div class="cusport_bg">
                                        <p v-if="PortraitData.sex"><el-tag size="mini">{{PortraitData.sex_name}}</el-tag></p>
                                        <p v-if="PortraitData.age"><el-tag size="mini">{{PortraitData.age_name}}</el-tag></p>
                                        <p v-if="PortraitData.occupation"><el-tag size="mini">{{PortraitData.occupation_name}}</el-tag></p>
                                        <p v-if="PortraitData.post"><el-tag size="mini">{{PortraitData.post_name}}</el-tag></p>
                                        <p v-if="PortraitData.education"><el-tag size="mini">{{PortraitData.education_name}}</el-tag></p>
                                    </div>
                                </div>
                            </div>
                            <div class="cusport_div3">
                                <span class="cusport_span" @click="openDialog(3)" style="cursor: pointer;"><img style="margin-left:11px;" src="../../../../../static/img/interest.png" width="35" height="35" /><br>兴趣画像</span>
                                <img class="cusport_line" src="../../../../../static/img/line3.png" />
                                <div class="cusport_c">
                                    <div class="cusport_bg">
                                        <p v-if="PortraitData.behavioral_hobbies"><el-tag size="mini" v-for="item in PortraitData.behavioral_hobbiess_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.interest_in_reading"><el-tag size="mini" v-for="item in PortraitData.interest_in_readings_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.social_interest"><el-tag size="mini" v-for="item in PortraitData.social_interests_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.sports_interest"><el-tag size="mini" v-for="item in PortraitData.sports_interests_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.film_and_tv_interest"><el-tag size="mini" v-for="item in PortraitData.film_and_tv_interests_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.interest_in_music"><el-tag size="mini" v-for="item in PortraitData.interest_in_musics_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.dietary_interest"><el-tag size="mini" v-for="item in PortraitData.dietary_interests_name" :key="item">{{item}}</el-tag></p>
                                    </div>
                                </div>
                            </div>
                            <div class="cusport_div4">
                                <span class="cusport_span" @click="openDialog(4)" style="cursor: pointer;"><img style="margin-left:11px;" src="../../../../../static/img/consumption.png" width="35" height="35" /><br>消费画像</span>
                                <img class="cusport_line" src="../../../../../static/img/line4.png" />
                                <div class="cusport_c">
                                    <div class="cusport_bg">
                                        <p v-if="PortraitData.mobile_interest"><el-tag size="mini" v-for="item in PortraitData.mobile_interests_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.brand_interest"><el-tag size="mini" v-for="item in PortraitData.brand_interests_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.vehicle_interest"><el-tag size="mini" v-for="item in PortraitData.vehicle_interests_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.interest_in_tea_tasting"><el-tag size="mini" v-for="item in PortraitData.interest_in_tea_tastings_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.costume_interest"><el-tag size="mini" v-for="item in PortraitData.costume_interests_name" :key="item">{{item}}</el-tag></p>
                                    </div>
                                </div>
                            </div>
                            <div class="cusport_div5">
                                <span class="cusport_span" @click="openDialog(5)" style="cursor: pointer;"><img style="margin-left:11px;" src="../../../../../static/img/family.png" width="35" height="35" /><br>家庭画像</span>
                                <img class="cusport_line" src="../../../../../static/img/line5.png" />
                                <div class="cusport_c">
                                    <div class="cusport_bg">
                                        <p v-if="PortraitData.marriage_status">婚姻：<el-tag size="mini">{{PortraitData.marriage_status_name}}</el-tag></p>
                                        <p v-if="PortraitData.number_of_families">家人：<el-tag size="mini">{{PortraitData.number_of_families_name}}</el-tag></p>
                                        <p v-if="PortraitData.number_of_offspring">子女：<el-tag size="mini">{{PortraitData.number_of_offspring_name}}</el-tag></p>
                                        <p v-if="PortraitData.number_of_parents">父母：<el-tag size="mini">{{PortraitData.number_of_parents_name}}</el-tag></p>
                                        <p v-if="PortraitData.annual_income">年收入：<el-tag size="mini">{{PortraitData.annual_income_name}}</el-tag></p>
                                    </div>
                                </div>
                            </div>
                            <div class="cusport_div6">
                                <span class="cusport_span" @click="openDialog(6)" style="cursor: pointer;"><img style="margin-left:11px;" src="../../../../../static/img/other.png" width="35" height="35" /><br>其他画像</span>
                                <img class="cusport_line" src="../../../../../static/img/line6.png" />
                                <div class="cusport_c">
                                    <div class="cusport_bg">
                                        <p v-if="PortraitData.other_one"><el-tag size="mini" v-for="item in PortraitData.other_ones_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.other_two"><el-tag size="mini" v-for="item in PortraitData.other_twos_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.other_three"><el-tag size="mini" v-for="item in PortraitData.other_threes_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.other_four"><el-tag size="mini" v-for="item in PortraitData.other_fours_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.other_five"><el-tag size="mini" v-for="item in PortraitData.other_fives_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.other_six"><el-tag size="mini" v-for="item in PortraitData.other_sixs_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.other_seven"><el-tag size="mini" v-for="item in PortraitData.other_sevens_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.other_eight"><el-tag size="mini" v-for="item in PortraitData.other_eights_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.other_nine"><el-tag size="mini" v-for="item in PortraitData.other_nines_name" :key="item">{{item}}</el-tag></p>
                                        <p v-if="PortraitData.other_ten"><el-tag size="mini" v-for="item in PortraitData.other_tens_name" :key="item">{{item}}</el-tag></p>
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

        <el-dialog :title="newform.title" :visible.sync="dialogVisible" :close-on-click-modal="false" width="600px">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules" style="padding-right:30px">
                <el-form-item v-for="item in labelList" :key="item.prop" :prop="item.prop" :label="item.label">
                    <!-- <el-select v-if="item.type == 'select'" v-model="newform[item.prop]" :multiple="item.multiple" :placeholder="item.placeholder" class="mul_select">
                        <el-option v-for="o in item.options" :key="o.id" :label="o.typeName" :value="o.id"></el-option>
                    </el-select> -->
                    <el-checkbox-group v-if="item.type == 'checkbox'" v-model="newform[item.prop]" :max="3" class="cul_checkbox">
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
                fieldData:[],

                activeName2:'first',
                customerpoolId:null,
                
                record:[],
                dialogVisible2:false,
                dialogImageUrl2:null,

                oppDetails:[],
                agreeDetails:[],
                PortraitData:[],

                cusportraitList:{},
                otherList:[],
                otherLabelList:[],

                dialogVisible:false,
                newform:{},
                labelList:[],
                rules:{},

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
                let data = {
                    id: this.msg.id
                }
                let info = {
                    label: 3,
                    id: this.msg.id
                }
                
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
                    _this.$options.methods.loadPortrait.bind(_this)()
                }).catch(function(err){
                    // console.log(err);
                });
                //加载自定义字段详情
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'field/information.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(info)
                }).then(function(res){
                    _this.fieldData = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadFollow(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.msg.id
                let pageInfo2 = {}
                pageInfo2.contacts_id = this.msg.id
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

                        el.followContent = el.followContent.replace(/\n/g,'<br/>')
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
                this.dialogImageUrl2 = this.$store.state.systemHttp + '/upload/'+this.$store.state.iscId+'/'+val.imgName
                this.dialogVisible2 = true
            },


            loadPortrait(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.contacts_id = this.msg.id
                
                //联系人画像
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'contactsPortrait/selectByContactId.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // if(res.data.id){
                        _this.PortraitData = res.data
                    // }else{
                    //     // console.log('没有画像')
                    //     _this.PortraitData = {
                    //         email_visit_num:0,message_visit_num:0,
                    //         id:null, sex:'', age:'', occupation:'', post:'', education:'', 
                    //         behavioral_hobbiess:[], interest_in_readings:[], social_interests:[], sports_interests:[], film_and_tv_interests:[], interest_in_musics:[], dietary_interests:[],
                    //         mobile_interests:[], brand_interests:[], vehicle_interests:[], interest_in_tea_tastings:[], costume_interests:[], 
                    //         marriage_status:'', number_of_families:'', number_of_offspring:'', number_of_parents:'', annual_income:'', 
                    //         other_ones:[], other_twos:[], other_threes:[], other_fours:[], other_fives:[], other_sixs:[], other_sevens:[], other_eights:[], other_nines:[], other_tens:[], 
                    //     }
                    // }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            openDialog(val){
                if(val == 2){
                    this.labelList = [
                        {"label":"性别","prop":"sex","type":"radio","options":this.cusportraitList.name5001},
                        {"label":"年龄","prop":"age","type":"radio","options":this.cusportraitList.name4001},
                        {"label":"职业","prop":"occupation","type":"radio","options":this.cusportraitList.name1001},
                        {"label":"岗位","prop":"post","type":"radio","options":this.cusportraitList.name2001},
                        {"label":"学历","prop":"education","type":"radio","options":this.cusportraitList.name3001},
                    ]
                    this.newform = {
                        "title":'个人画像',
                        "sex":this.PortraitData.sex,
                        "age":this.PortraitData.age,
                        "occupation":this.PortraitData.occupation,
                        "post":this.PortraitData.post,
                        "education":this.PortraitData.education,
                    }
                }
                if(val == 3){
                    this.labelList = [
                        {"label":"行为爱好","prop":"behavioral_hobbiess","type":"checkbox","options":this.cusportraitList.name11001,"multiple":true},
                        {"label":"阅读兴趣","prop":"interest_in_readings","type":"checkbox","options":this.cusportraitList.name12001,"multiple":true},
                        {"label":"社交兴趣","prop":"social_interests","type":"checkbox","options":this.cusportraitList.name13001,"multiple":true},
                        {"label":"运动兴趣","prop":"sports_interests","type":"checkbox","options":this.cusportraitList.name14001,"multiple":true},
                        {"label":"影视兴趣","prop":"film_and_tv_interests","type":"checkbox","options":this.cusportraitList.name19001,"multiple":true},
                        {"label":"音乐兴趣","prop":"interest_in_musics","type":"checkbox","options":this.cusportraitList.name20001,"multiple":true},
                        {"label":"饮食兴趣","prop":"dietary_interests","type":"checkbox","options":this.cusportraitList.name21001,"multiple":true},
                    ]
                    this.newform = {
                        "title":'兴趣画像',
                        "behavioral_hobbiess":this.PortraitData.behavioral_hobbiess,
                        "interest_in_readings":this.PortraitData.interest_in_readings,
                        "social_interests":this.PortraitData.social_interests,
                        "sports_interests":this.PortraitData.sports_interests,
                        "film_and_tv_interests":this.PortraitData.film_and_tv_interests,
                        "interest_in_musics":this.PortraitData.interest_in_musics,
                        "dietary_interests":this.PortraitData.dietary_interests,
                    }
                }
                if(val == 4){
                    this.labelList = [
                        {"label":"手机兴趣","prop":"mobile_interests","type":"checkbox","options":this.cusportraitList.name15001,"multiple":true},
                        {"label":"品牌兴趣","prop":"brand_interests","type":"checkbox","options":this.cusportraitList.name16001,"multiple":true},
                        {"label":"车辆兴趣","prop":"vehicle_interests","type":"checkbox","options":this.cusportraitList.name17001,"multiple":true},
                        {"label":"品茶兴趣","prop":"interest_in_tea_tastings","type":"checkbox","options":this.cusportraitList.name18001,"multiple":true},
                        {"label":"服饰兴趣","prop":"costume_interests","type":"checkbox","options":this.cusportraitList.name22001,"multiple":true},
                    ]
                    this.newform = {
                        "title":'消费画像',
                        "mobile_interests":this.PortraitData.mobile_interests,
                        "brand_interests":this.PortraitData.brand_interests,
                        "vehicle_interests":this.PortraitData.vehicle_interests,
                        "interest_in_tea_tastings":this.PortraitData.interest_in_tea_tastings,
                        "costume_interests":this.PortraitData.costume_interests,
                    }
                }
                if(val == 5){
                    this.labelList = [
                        {"label":"婚姻状况","prop":"marriage_status","type":"radio","options":this.cusportraitList.name6001},
                        {"label":"家庭人数","prop":"number_of_families","type":"radio","options":this.cusportraitList.name7001},
                        {"label":"子女人数","prop":"number_of_offspring","type":"radio","options":this.cusportraitList.name8001},
                        {"label":"父母人数","prop":"number_of_parents","type":"radio","options":this.cusportraitList.name9001},
                        {"label":"年收入","prop":"annual_income","type":"radio","options":this.cusportraitList.name10001},
                    ]
                    this.newform = {
                        "title":'家庭画像',
                        "marriage_status":this.PortraitData.marriage_status,
                        "number_of_families":this.PortraitData.number_of_families,
                        "number_of_offspring":this.PortraitData.number_of_offspring,
                        "number_of_parents":this.PortraitData.number_of_parents,
                        "annual_income":this.PortraitData.annual_income,
                    }
                }
                if(val == 6){
                    this.labelList = []
                    this.otherLabelList.forEach(el => {
                        this.labelList.push({"label":el.name,"prop":el.title,"type":"checkbox","options":'',"multiple":true})
                    });
                    this.otherList.forEach((a,i) => {
                        this.labelList[i].options = a
                    });
                    this.newform = {
                        "title":'其他画像',
                        "other_ones":this.PortraitData.other_ones,
                        "other_twos":this.PortraitData.other_twos,
                        "other_threes":this.PortraitData.other_threes,
                        "other_fours":this.PortraitData.other_fours,
                        "other_fives":this.PortraitData.other_fives,
                        "other_sixs":this.PortraitData.other_sixs,
                        "other_sevens":this.PortraitData.other_sevens,
                        "other_eights":this.PortraitData.other_eights,
                        "other_nines":this.PortraitData.other_nines,
                        "other_tens":this.PortraitData.other_tens,
                    }
                }
                this.dialogVisible = true
            },
            onSubmit(){
                const _this = this
                let qs =require('querystring')
                let data = this.newform
                data.contacts_id = this.contactdetailsData.csId
                data.id = this.PortraitData.id

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'contactsPortrait/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data),
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'操作成功',
                            type:'success',
                        })
                        _this.dialogVisible = false
                        _this.$options.methods.loadPortrait.bind(_this)()
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'type',
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });

            },


            
            loadTable() {
                const _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.searchName = this.searchList.searchName;
                searchList.pId = _this.$store.state.ispId
                searchList.page = this.page;
                searchList.limit = this.limit;

                this.otherList = []
                
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
                
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp + 'portraitType/getPortraitTypeByType.do?cId=' + _this.$store.state.iscId
                }).then(function(res){
                    let datas = res.data
                    _this.cusportraitList = res.data
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
