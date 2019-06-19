<template>
    <!-- 商机详情页 -->
    <el-row class="oppdetcontent" :gutter="10">
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{customerpool.name}}</span>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="retracts">收起</el-button>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="!retracts">显示</el-button>
                    </div>
                    <div class="text item" v-show="thisshow">
                        <ul>
                            <li>姓名：<span>{{contacts.coName}}</span></li>
                            <li>手机：<span>{{contacts.phone}}</span></li>
                            <li>电话：<span>{{contacts.telephone}}</span></li>
                            <li>邮箱：<span>{{contacts.email}}</span></li>
                            <li>QQ：<span>{{contacts.qq}}</span></li>
                            <li>微信：<span>{{contacts.wechat}}</span></li>
                            <li>地址：<span>{{customerpool.address}}</span></li>
                            <li>性别：<span>{{contacts.sex}}</span></li>
                            <li>职务：<span>{{contacts.identity}}</span></li>
                            <li>备注：<span>{{customerpool.remark}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                    <div v-show="!thisshow"></div>
                </el-card>
            </div>
            
            <div class="bottom" v-show="auxcontent">
                <div class="aux_c">
                    <div class="aux_ul">
                        <div class="aux_li">
                            <p>
                                <span style="font-size:20px;line-height:50px;font-weight:bold">{{auxList.timeConsuming}}天</span><br>
                                <span style="font-size:12px;color:#666666;line-height:25px">跟踪时间</span><br>
                                <span style="font-size:14px;color:#333333;line-height:20px">{{auxList.trackProportion}}%</span>
                            </p>
                            <el-progress type="circle" :percentage="aaa" :width="34" :stroke-width="5" :show-text="false"></el-progress>
                        </div>
                    </div>
                    <div class="aux_ul">
                        <div class="aux_li">
                            <p>
                                <span style="font-size:20px;line-height:50px;font-weight:bold">{{auxList.surplusTime}}天</span><br>
                                <span style="font-size:12px;color:#666666;line-height:25px">剩余天数</span><br>
                                <span style="font-size:14px;color:#333333;line-height:20px">{{auxList.surplusProportion}}%</span>
                            </p>
                            <el-progress type="circle" :percentage="bbb" :width="34" :stroke-width="5" :show-text="false"></el-progress>
                        </div>
                    </div>
                    <div class="aux_ul">
                        <div class="aux_li">
                            <p>
                                <span style="font-size:20px;line-height:50px;font-weight:bold">{{auxList.step_probability}}%</span><br>
                                <span style="font-size:12px;color:#666666;line-height:25px">成功率</span><br>
                                <span style="font-size:14px;color:#333333;line-height:20px">{{auxList.step_probability}}%</span>
                            </p>
                            <el-progress type="circle" :percentage="ccc" :width="34" :stroke-width="5" :show-text="false"></el-progress>
                        </div>
                    </div>
                    <div class="aux_ul">
                        <div class="aux_li">
                            <p>
                                <span style="font-size:20px;line-height:50px;font-weight:bold">{{auxList.competitor}}人</span><br>
                                <span style="font-size:12px;color:#666666;line-height:25px">竞争对手</span><br>
                                <span style="font-size:14px;color:#333333;line-height:20px">{{auxList.competitorProportion}}%</span>
                            </p>
                            <el-progress type="circle" :percentage="ddd" :width="34" :stroke-width="5" :show-text="false"></el-progress>
                        </div>
                    </div>
                    <div class="aux_ul">
                        <div class="aux_li">
                            <p>
                                <span style="font-size:20px;line-height:50px;font-weight:bold">{{auxList.num}}次</span><br>
                                <span style="font-size:12px;color:#666666;line-height:25px">联系次数</span><br>
                                <span style="font-size:14px;color:#333333;line-height:20px">{{auxList.numProportion}}%</span>
                            </p>
                            <el-progress type="circle" :percentage="fff" :width="34" :stroke-width="5" :show-text="false"></el-progress>
                        </div>
                    </div>
                    <div class="aux_ul">
                        <div class="aux_li">
                            <p>
                                <span style="font-size:20px;line-height:50px;font-weight:bold">{{auxList.contacts}}人</span><br>
                                <span style="font-size:12px;color:#666666;line-height:25px">关键联系人</span><br>
                                <span style="font-size:14px;color:#333333;line-height:20px">{{auxList.contactsProportion}}%</span>
                            </p>
                            <el-progress type="circle" :percentage="ggg" :width="34" :stroke-width="5" :show-text="false"></el-progress>
                        </div>
                    </div>
                </div>
            </div>
            <div class="top">
                <el-card class="box-card step_process">
                    <div slot="header" class="clearfix">
                        <span>{{opportunitydetail.opportunity_name}}</span>
                        <el-button class="info-btn" size="mini" style="float:right;" @click="showNextDialog()" v-if="shownext">下一步</el-button>
                        <el-button class="info-btn" size="mini" style="float:right;" @click="endStep()" v-if="shownext">失败关闭</el-button>
                        <span style="line-height:20px;float:right;font-size:14px;" v-if="showfail">该商机已关闭</span>
                        <span style="line-height:20px;float:right;font-size:14px;" v-if="showsuccess">签约成功！</span>
                        <el-button class="info-btn" size="mini" style="float:right;margin-right:10px;" @click="auxAnalys()">辅助分析</el-button>
                    </div>
                    <el-steps :active="active" finish-status="success" :process-status="isprocess" align-center style="padding:10px;">
                        <el-step v-for="item in stepList" :key="item.step_id" :title="item.step_name" :description="item.step_probability">
                            <template slot="description">
                                <p>成功几率：{{item.step_probability}}%</p>
                                <p v-if="showcreate">{{item.createTime}}</p>
                                <p v-if="showdurate">{{item.duration}}</p>
                            </template>
                        </el-step>
                    </el-steps>
                </el-card>
            </div>
            <div class="top" v-show="auxcontent">
                <el-tabs v-model="auxindex" type="card">
                    <el-tab-pane label="跟进记录" name="first">
                        <ul class="followrecord" v-for="item in record" :key="item.followId">
                            <li class="recordicon">
                                <img :src="item.imgUrl" class="detail_portrait" alt="头像" />
                            </li>
                            <li class="verticalline"></li>
                            <li class="recordcontent">
                                <div class="left_more">
                                    <p>{{item.private_employee}}&nbsp;&nbsp;于{{item.createTime}}&nbsp;&nbsp;通过{{item.followType}}更新了一条记录<span v-if="item.contacts[0]">&nbsp;&nbsp;&nbsp;客户联系人为：&nbsp;{{item.contacts[0].name}}</span>
                                        <span v-if="item.contactTime">&nbsp;&nbsp;&nbsp;并约定下次联系时间：{{item.contactTime}}</span>
                                        <span>&nbsp;&nbsp;&nbsp;状态为：{{item.state}} &nbsp;&nbsp;&nbsp;{{item.inputType}}</span>
                                    </p>
                                    <p style="margin-top:15px;margin-bottom:15px;">{{item.followContent}}</p>
                                    <div class="imgbox_two" v-if="item.imgName">
                                        <img :src="item.picture_detail" alt="图片" width="80" height="80" @click="showImg($event,item)">
                                    </div>
                                    <div v-if="item.enclosureName">
                                        <a :href="item.enclosureUrl" download>{{item.enclosureOldName}}</a>
                                    </div>
                                    <el-dialog :visible.sync="dialogVisible2">
                                        <img width="100%" :src="dialogImageUrl2" alt="">
                                    </el-dialog>
                                </div>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="竞争对手" name="second">
                        <el-table :data="competitorData" border stripe style="width: 100%">
                            <el-table-column label="公司名称" prop="name" min-width="90">
                            </el-table-column>
                            <el-table-column label="联系人" prop="phone" min-width="110">
                            </el-table-column>
                            <el-table-column label="优势" prop="telephone" min-width="110">
                            </el-table-column>
                            <el-table-column label="劣势" prop="email" min-width="110">
                            </el-table-column>
                            <el-table-column label="常用战术" prop="qq" min-width="110">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="联系人" name="third">
                        <el-table :data="contactData" border stripe style="width: 100%">
                            <el-table-column prop="name" label="名称" min-width="90">
                            </el-table-column>
                            <el-table-column prop="phone" label="手机" min-width="110">
                            </el-table-column>
                            <el-table-column label="固话" prop="telephone" min-width="110">
                            </el-table-column>
                            <el-table-column label="邮箱" prop="email" min-width="110">
                            </el-table-column>
                            <el-table-column label="QQ" prop="qq" min-width="110">
                            </el-table-column>
                            <el-table-column label="微信" prop="wechat" min-width="110">
                            </el-table-column>
                            <el-table-column label="地址" prop="address" min-width="140">
                            </el-table-column>
                            <el-table-column label="职务" prop="identity" show-overflow-tooltip min-width="90">
                            </el-table-column>
                            <el-table-column label="性别" prop="sex" min-width="90">
                            </el-table-column>
                            <el-table-column label="是否在职" prop="status" min-width="90">
                                <template slot-scope="scope">
                                    <el-tooltip :content="scope.row.status" placement="right">
                                        <el-switch v-model="scope.row.status" active-value="在职" inactive-value="离职" active-color="#13ce66" inactive-color="#bbbbbb" @change="changeState(scope.row)"></el-switch>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column label="是否为关键人" prop="isCrux" min-width="110">
                                <template slot-scope="scope">
                                    <el-tooltip :content="scope.row.isCrux" placement="right">
                                        <el-switch v-model="scope.row.isCrux" active-value="是" inactive-value="否" active-color="#13ce66" inactive-color="#bbbbbb" @change="changePrimary(scope.row)"></el-switch>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注" prop="remark" min-width="100">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
            
            <div class="top">
                <el-tabs v-model="baseindex" type="card">
                    <el-tab-pane label="基本信息" name="first">
                        <div class="text">
                            <ul>
                            <li>客户决策人：<span>{{contacts.coName}}</span></li>
                            <li>创建时间：<span>{{opportunitydetail.opportunity_time}}</span></li>
                            <li>签约时间：<span>{{contractTime}}</span></li>
                            <li>失败时间：<span>{{failTime}}</span></li>
                            <li>预计成交金额：<span class="bold_span">{{opportunitydetail.opportunity_achievement}}</span></li>
                            <li>预计成交时间：<span>{{opportunitydetail.opportunity_deal}}</span></li>
                            <li>负责人：<span>{{privateUser.private_employee}}</span></li>
                            <li>部门：<span>{{opportunitydetail.deptname}}</span></li>
                            <li>机构：<span>{{opportunitydetail.parentname}}</span></li>
                            <li>备注：<span>{{opportunitydetail.opportunity_remarks}}</span></li>
                        </ul>
                            <p>&nbsp;</p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="产品" name="second">
                        <el-table :data="productData" border stripe style="width: 100%">
                            <el-table-column prop="name" min-width="90" label="公司名称">
                            </el-table-column>
                            <el-table-column prop="phone" min-width="110" label="联系人">
                            </el-table-column>
                            <el-table-column prop="telephone" min-width="110" label="优势">
                            </el-table-column>
                            <el-table-column prop="email" min-width="110" label="劣势">
                            </el-table-column>
                            <el-table-column prop="qq" min-width="110" label="常用战术">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!-- <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>基本信息</span>
                    </div>
                    <div class="text item" style="min-height:150px;">
                        <ul>
                            <li>负责人：<span>{{privateUser.private_employee}}</span></li>
                            <li>负责人部门：<span>{{opportunitydetail.deptname}}</span></li>
                            <li>负责人机构：<span>{{opportunitydetail.parentname}}</span></li>
                            <li>客户决策人：<span>{{contacts.coName}}</span></li>
                            <li>创建时间：<span>{{opportunitydetail.opportunity_time}}</span></li>
                            <li>签约时间：<span>{{contractTime}}</span></li>
                            <li>失败时间：<span>{{failTime}}</span></li>
                            <li>预计成交金额：<span>{{opportunitydetail.opportunity_achievement}}</span></li>
                            <li>预计成交时间：<span>{{opportunitydetail.opportunity_deal}}</span></li>
                            <li>备注：<span>{{opportunitydetail.opportunity_remarks}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                </el-card>
            </div> -->
        </el-col>
        <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" width="400px">
            <span>确认修改商机进度吗？一旦确定将不可撤回</span>
            <br><br>
            <span style="margin-right:10px;font-size:14px;">预计成交时间:</span>
            <el-date-picker v-model="opportunityDeal" align="right" type="date" :picker-options="pickerOptions" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog()">取 消</el-button>
                <el-button type="primary" @click="nextStep()">确 定</el-button>
            </span>
        </el-dialog>
        
        <el-col :span="6" style="padding:10px;min-height:600px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.keyword" placeholder="请输入公司名称" style="width:80%;" @keyup.enter.native="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="customerpool[0].name" label="公司名称">
                    <template slot-scope="scope">
                        <div @click="getRow(scope.$index, scope.row)">
                            {{scope.row.customerpool[0].name}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block numberPage number">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20, 30, 50, 100]"
                :page-size="20"
                layout="total, sizes, prev, pager, next"
                :total="tableNumber">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'businessOpportunityDetails',
        store,
        data(){
            return {
                pickerOptions:{
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    },
                },
                searchList:{
                    keyword:null,
                },
                opportunitydetail:{},
                contacts:{},
                customerpool:{},
                customerId:null,
                privateUser:{},
                contractTime:null,
                failTime:null,

                tableData: null,
                tableNumber:null,
                page:1,
                limit:20,

                thisshow:true,
                idArr:{
                    opportunity_id:null,
                },

                active: 0,
                stepList:null,

                steptime:null,

                addstep:null,
                shownext:true,
                showfail:false,
                showsuccess:false,
                showcreate:false,
                showdurate:false,
                isprocess:'process',

                retracts:true,

                auxindex:'first',
                auxList:{},
                auxcontent:false,

                record:[],
                dialogVisible2:false,
                dialogImageUrl2:null,

                contactData:[],
                competitorData:[],
                
                aaa:0,
                bbb:0,
                ccc:0,
                ddd:0,
                fff:0,
                ggg:0,

                dialogVisible:false,
                opportunityDeal:null,

                baseindex:'first',
                productData:[],
            }
        },
        // mounted(){
        //     this.loadTable()
        //     this.loadData();
        // },
        activated(){
            this.loadTable()
            this.loadData();
        },
        methods: {
            loadTable(){
                this.idArr.opportunity_id = this.$store.state.oppdetailsData.submitData.id
                const _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                let pageInfo2 = {}
                pageInfo2.page = '1'
                pageInfo2.limit = '100000'

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/query.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadData() {
                const _this = this
                //详情页
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'opportunity/getopportunityById.do?cId='+_this.$store.state.iscId+'&opportunity_id='+_this.idArr.opportunity_id,
                }).then(function(res){
                    _this.opportunitydetail = res.data.map.success[0]
                    _this.contacts = res.data.map.success[0].contacts[0]
                    _this.privateUser = res.data.map.success[0].privateUser[0]
                    _this.customerpool = res.data.map.success[0].customerpool[0]
                    _this.opportunityDeal = res.data.map.success[0].opportunity_deal
                    _this.customerId = _this.customerpool.id
                    _this.stepList = _this.opportunitydetail.addstep
                    _this.stepList.length = _this.opportunitydetail.addstep.length - 1
                    _this.addstep = _this.opportunitydetail.opportunityProgress
                    let addStep = _this.addstep
                    if(addStep){
                        for(var i = 0,length = addStep.length;i < length;i++){
                            _this.stepList[i].createTime = addStep[i].createTime
                            _this.steptime = addStep[i].createTime
                            if(addStep[i].progress_probability == '0'){
                                _this.active = i
                                _this.shownext = false
                                _this.showfail = true
                                _this.showsuccess = false
                                _this.isprocess = 'error'
                                _this.failTime = addStep[i].createTime
                            }else if(addStep[i].progress_probability == '100'){
                                _this.active = i+1
                                _this.shownext = false
                                _this.showfail = false
                                _this.showsuccess = true
                                _this.isprocess = 'wait'
                                _this.contractTime = addStep[i].createTime
                            }else{
                                _this.active = i+1
                                _this.shownext = true
                                _this.showfail = false
                                _this.showsuccess = false
                                _this.isprocess = 'process'
                            }
                            if(i !== 0){
                                if(addStep[i].previousTime){
                                    let arr = addStep[i].previousTime.split(" ");
                                    let arr2 = addStep[i].createTime.split(" ");
                                    let begintime = new Date(arr[0].replace(/-/g, "/"))
                                    let endtime = new Date(arr2[0].replace(/-/g, "/"))
                                    _this.showcreate = true
                                    _this.showdurate = true
                                    let dateDiff = endtime.getTime() - begintime.getTime();
                                    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
                                    _this.stepList[i].duration = '历时：' + dayDiff + '天'
                                }
                            }else{
                                _this.showdurate = false
                                _this.showcreate = true
                            }
                        }
                    }
                    _this.$options.methods.loadfollow.bind(_this)()
                }).catch(function(err){
                    _this.$message.error("商机详情加载失败,请重新进入页面");
                });
                //商机辅助分析
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'opportunity/opportunityAnalysis.do?cId='+_this.$store.state.iscId+'&opportunity_id='+_this.idArr.opportunity_id,
                }).then(function(res){
                    _this.auxList = res.data.map.opportunity
                    _this.aaa = parseFloat(_this.auxList.trackProportion)
                    _this.bbb = parseFloat(_this.auxList.surplusProportion)
                    _this.ccc = parseFloat(_this.auxList.step_probability)
                    _this.ddd = parseFloat(_this.auxList.competitorProportion)
                    _this.fff = parseFloat(_this.auxList.numProportion)
                    _this.ggg = parseFloat(_this.auxList.contactsProportion)
                }).catch(function(err){
                    // console.log(err);
                });
                
            },
            loadfollow(){
                const _this = this
                let qs =require('querystring')
                let pageInfo2 = {}
                pageInfo2.page = '1'
                pageInfo2.limit = '100000'

                //加载跟进记录
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'customerpool/getFollowStaffAndpool.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId+'&customerpool_id='+_this.customerId,
                }).then(function(res){
                    _this.record = res.data.map.success
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
                //详情页联系人
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/getPoolContacts.do?cId='+_this.$store.state.iscId+'&customerpool_id='+_this.customerId,
                    data:qs.stringify(pageInfo2)
                }).then(function(res){
                    _this.contactData = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
            },
            showImg(e,val){
                this.dialogImageUrl2 = this.$store.state.systemHttp + '/upload/'+this.$store.state.iscId+'/'+val.imgName
                this.dialogVisible2 = true
            },
            showNextDialog(){
                this.dialogVisible = true
            },
            closeDialog(){
                this.dialogVisible = false
                this.shownext = true
            },
            nextStep(){
                const _this = this
                let qs =require('querystring')
                for(var i = 0,length = this.stepList.length;i < length;i++){
                    let data = {}
                    data.previousTime = this.steptime + ':00'
                    data.deptid = this.$store.state.insid
                    data.secondid = this.$store.state.deptid
                    data.oy_id = this.idArr.opportunity_id
                    data.opportunityDeal = this.opportunityDeal
                    if(_this.active == i){
                        data.stepId = this.stepList[i].step_id
                        data.progress_probability = this.stepList[i].step_probability
                        if(data.progress_probability == '100'){
                            _this.shownext = false
                        }
                        axios({
                            method:'post',
                            url:_this.$store.state.defaultHttp+ 'saveOpportunityProgress.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                            data:qs.stringify(data),
                        }).then(function(res){
                            if(res.data.code && res.data.code == 200) {
                                _this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                _this.active += 1
                                _this.dialogVisible = false
                                _this.$options.methods.loadData.bind(_this)(true);
                            } else {
                                _this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(function(err){
                            _this.$message.error("修改失败,请重新修改");
                        })
                    }
                }
            },
            endStep(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.previousTime = this.steptime + ':00'
                data.deptid = this.$store.state.insid
                data.secondid = this.$store.state.deptid
                data.oy_id = this.idArr.opportunity_id
                data.stepId = 100
                _this.$confirm('确认关闭商机进度吗？一旦确定将不可撤回','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                }).then(({value}) =>{
                    axios({
                        method:'post',
                        url:_this.$store.state.defaultHttp+ 'saveOpportunityProgress.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                        data:qs.stringify(data),
                    }).then(function(res){
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '关闭成功',
                                type: 'success'
                            });
                            _this.isprocess = 'error'
                            _this.shownext = false
                            _this.showfail = true
                            _this.$options.methods.loadData.bind(_this)(true);
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("关闭失败,请重新关闭");
                    })
                })
            },
            auxAnalys(){
                this.auxcontent = !this.auxcontent
            },
            
            changeState(row){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = row.id
                data.status = row.status

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'contacts/updateStatus.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$options.methods.loadData.bind(_this)();
                    }else{
                        _this.$message({
                            message: '可能出了点什么问题，再看看',
                            type: 'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            changePrimary(row){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = row.id
                data.isCrux = row.isCrux

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'contacts/updateIsCrux.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$options.methods.loadData.bind(_this)();
                    }else{
                        _this.$message({
                            message: '可能出了点什么问题，再看看',
                            type: 'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            retract(){
                this.thisshow = !this.thisshow
                this.retracts = !this.retracts
            },
            getRow(index,row){
                this.$store.state.oppdetailsData.submitData = {"id":row.opportunity_id}
                this.idArr.opportunity_id = row.opportunity_id
                this.$options.methods.loadData.bind(this)(true);
            },
            search(){
                const _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.searchName = this.searchList.keyword;
                searchList.page = this.page;
                searchList.limit = this.limit;
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleSizeChange(val) {
                const _this = this;
                _this.limit = val;
                _this.$options.methods.loadData.bind(_this)();
            },
            handleCurrentChange(val) {
                const _this = this;
                _this.page = val;
                _this.$options.methods.loadData.bind(_this)();
            },
        },
    }
</script>

<style>
    .oppdetcontent{
        background-color: #f7f7f7;
        height: auto;
        min-height: 100%;
    }
    .aux_c{
        height: 150px;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }
    .aux_ul{
        flex: 1
    }
    .aux_li{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .aux_li p{
        width: 60px
    }
    .aux_li .el-progress{
        margin-left: 5%;
        margin-top: 40px;
    }
</style>
