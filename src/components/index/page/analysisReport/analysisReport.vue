<template>
    <!-- 报表与分析（报表）页面 -->
    <div class="contentall">
        <div class="setleftcontent">
            <ul class="namecontent">
                <li v-for="item in nameList" :key="item.index" :value="item.name" :class="{actived:item.isActive}" @click="showTableval(item)">{{item.name}}</li>
            </ul>
        </div>
        <div class="centercontent"></div>
        <div class="setrightcontent" v-show="item.isActive" v-for="item in nameList" :key="item.index">
            <!-- <div class="checkform" v-if="item.index == 1 || item.index == 3 || item.index == 4"> -->
                <div class="searchList" style="width:100%;">
                    <span class="nameList">年份：</span>
                    <el-date-picker v-model="searchList.year" :disabled="yeardisabled" type="year" format="yyyy" value-format="yyyy" placeholder="选择年份" @change="search"></el-date-picker>
                    <span class="nameList" v-if="item.index !== 2 && item.index !== 8 && item.index !== 9 && item.index !== 10">时间段：</span>
                    <el-date-picker v-model="searchList.yearrange" :disabled="rangedisabled" type="daterange" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" @change="datepick"
                        v-if="item.index !== 2 && item.index !== 8 && item.index !== 9 && item.index !== 10"></el-date-picker>
                </div>
                <div class="radioList report_radio" v-if="item.index !== 8 && item.index !== 9 && item.index !== 10">
                    <el-radio-group v-model="searchList.yearMonth">
                        <el-radio v-for="item in monthList" :key="item.id" :label="item.id" @change="search">{{item.label}}</el-radio>
                    </el-radio-group>
                </div>
            <!-- </div> -->
            <div class="searchList" style="width:100%;">
                <span class="nameList">机构：</span>
                <el-select v-model="searchList.mechanism" placeholder="请选择"  @change="search">
                    <el-option v-for="item in mechanismData" :key="item.deptid" :label="item.deptname" :value="item.deptid"></el-option>
                </el-select>
                <el-button icon="el-icon-circle-close-outline" class="clear_btn" size="mini" @click="reset()">清空</el-button>
            </div>
            <div class="radioList report_radio">
                <el-radio-group v-model="searchList.department">
                    <el-radio v-for="item in deptnameData" :key="item.deptid" :label="item.deptid" @change="search">{{item.deptname}}</el-radio>
                </el-radio-group>
                <div style="width:100%;height:20px"></div>
            </div>
            <div class="report_c">
                <div :id="item.id" :style="bar_style"></div>
            </div>
            <div class="report_b">
                <el-table :data="tableData" border stripe style="width:100%">
                    <template v-for="item in colList">
                        <el-table-column :label="item.name" :prop="item.col" :key="item.index" show-overflow-tooltip :min-width="item.width"></el-table-column>
                    </template>
                </el-table>
            </div>
            <!-- report_b -->
        </div>
        <!-- setrightcontent -->
        <div class="null_c" v-if="showTitle"><span>请点击左边菜单栏查看报表</span></div>
    </div>
</template>
<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    let echarts = require('echarts/lib/echarts')
    require('echarts/lib/chart/bar')
    require('echarts/lib/chart/funnel')
    require('echarts/lib/chart/line')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')

    export default {
        name:'analysisReport',
        store,
        data(){
            return {
                showTitle:true,

                nameList:[
                    {index:1,name:'客户统计分析',id:'chart401',isActive:false},
                    {index:2,name:'商机预测分析',id:'chart402',isActive:false},
                    {index:3,name:'商机阶段分析',id:'chart403',isActive:false},
                    {index:4,name:'商机丢单分析',id:'chart404',isActive:false},
                    {index:5,name:'商机数量分析',id:'chart405',isActive:false},
                    {index:6,name:'合同报表',id:'chart406',isActive:false},
                    {index:7,name:'合同回款预测分析',id:'chart407',isActive:false},
                    {index:8,name:'合同周期对比',id:'chart408',isActive:false},
                    {index:9,name:'业务增长分析',id:'chart409',isActive:false},
                    {index:10,name:'目标完成度分析',id:'chart410',isActive:false},
                    {index:11,name:'业务员统计分析',id:'chart411',isActive:false},
                    {index:12,name:'部门业绩排行榜',id:'chart412',isActive:false},
                    {index:13,name:'个人业绩排行榜',id:'chart413',isActive:false},
                ],
                index:'',

                bar_style:{
                    width:'',
                    height:''
                },

                searchList:{
                    mechanism:null,
                    department:null,
                    year:null,
                    yearMonth:null,
                    startTime:null,
                    endTime:null,
                    yearrange:''
                },
                mechanismData:[],
                deptnameData:[],
                monthList:[],

                cusStatisticsList:[],
                cusStatistics:[
                    {index:1,name:'客户名称',col:'name',width:'180'},
                    {index:2,name:'新增档案时间',col:'createTime',width:'150'},
                    {index:3,name:'最近交易时间',col:'latestTransactionTime',width:'150'},
                    {index:4,name:'最近跟进时间',col:'latestFollowTime',width:'150'},
                    {index:5,name:'最近服务工单时间',col:'latestWorkOrderTime',width:'150'},
                    {index:6,name:'交易总金额',col:'totalSum',width:'130'},
                    {index:7,name:'回款总金额',col:'backTotalSum',width:'130'},
                    {index:8,name:'差额',col:'difference',width:'90'},
                    {index:9,name:'交易次数',col:'totalCount',width:'110'},
                    {index:10,name:'距离最近交易天数',col:'recentTransactionDays',width:'200'},
                    {index:11,name:'业务员',col:'private_employee',width:'100'},
                    {index:12,name:'部门',col:'deptname',width:'90'},
                    {index:13,name:'机构',col:'parentname',width:'90'},
                ],

                oppForecastList:[],
                oppForecast:[
                    {index:1,name:'职员',col:'private_employee',width:'90'},
                    {index:2,name:'部门',col:'deptname',width:'90'},
                    {index:3,name:'机构',col:'parentname',width:'90'},
                    {index:4,name:'目标',col:'deal',width:'90'},
                    {index:5,name:'商机总金额',col:'opportunity_achievement',width:'130'},
                    {index:6,name:'已签约金额',col:'difference',width:'130'},
                    {index:7,name:'目标差额',col:'target',width:'110'},
                    {index:8,name:'商机库金额',col:'opportunityLibraryAmount',width:'130'},
                    {index:9,name:'完成比例',col:'achievementProportion',width:'110'},
                    {index:10,name:'预计完成比例',col:'dealProportion',width:'145'},
                ],

                oppStageList:[],
                oppStage:[
                    {index:1,name:'商机名称',col:'opportunity_name',width:'180'},
                    {index:2,name:'金额',col:'opportunity_achievement',width:'90'},
                    {index:3,name:'客户',col:'customerpoolName',width:'90'},
                    {index:4,name:'创建时间',col:'opportunity_time',width:'150'},
                    {index:5,name:'预计成交时间',col:'opportunity_deal',width:'150'},
                    {index:6,name:'阶段',col:'step_name',width:'90'},
                    {index:7,name:'更新时间',col:'createTimeProgress',width:'150'},
                    {index:8,name:'停留时间',col:'stopCount',width:'150'},
                    {index:9,name:'耗时',col:'lastStopCount',width:'90'},
                    {index:10,name:'最长停留阶段',col:'stop_step_name',width:'145'},
                    {index:11,name:'最长停留时间',col:'stop_step_count',width:'145'},
                    {index:12,name:'竞争对手数量',col:'competitorCount',width:'145'},
                    {index:13,name:'业务员',col:'private_employee',width:'100'},
                    {index:14,name:'部门',col:'deptname',width:'90'},
                    {index:15,name:'机构',col:'parentname',width:'90'},
                ],

                oppLostList:[],
                oppLost:[
                    {index:1,name:'商机名称',col:'opportunity_name',width:'180'},
                    {index:2,name:'金额',col:'opportunity_achievement',width:'90'},
                    {index:3,name:'客户',col:'customerpoolName',width:'90'},
                    {index:4,name:'创建时间',col:'opportunity_time',width:'150'},
                    {index:5,name:'失败阶段',col:'step_name',width:'110'},
                    {index:6,name:'耗时',col:'lastStopCount',width:'110'},
                    {index:7,name:'失败原因',col:'reasonsForFailure',width:'110'},
                    {index:8,name:'业务员',col:'private_employee',width:'100'},
                    {index:9,name:'部门',col:'deptname',width:'90'},
                    {index:10,name:'机构',col:'parentname',width:'90'},
                ],

                oppReportList:[],
                oppData:[],
                oppcolList:[],

                agreeReportList:[],
                agreeData:['10200','15021','13201','18452'],
                agreeData2:['10000','15000','12000','15000'],
                agreeList:['财务部','市场部','销售一部','销售二部'],
                agreecolList:[
                    {index:2,name:'目标合同份数',col:'parentname',width:'150'},
                    {index:3,name:'目标合同金额',col:'deptname',width:'150'},
                    {index:4,name:'完成合同数量',col:'contractNum',width:'150'},
                    {index:5,name:'完成合同金额',col:'amount',width:'150'},
                    {index:6,name:'增差数量',col:'amount',width:'100'},
                    {index:7,name:'增差金额',col:'amount',width:'100'},
                    {index:8,name:'数量达成率',col:'amount',width:'130'},
                    {index:9,name:'金额达成率',col:'amount',width:'130'},
                    {index:10,name:'上月合同数量增长率',col:'amount',width:'200'},
                    {index:11,name:'上月合同金额增长率',col:'amount',width:'200'},
                    {index:12,name:'平均客单价',col:'amount',width:'130'},
                ],

                agreepaymentForecastList:[],
                agreepaymentForecast:[
                    {index:1,name:'合同名称',col:'contract_name',width:'180'},
                    // {index:2,name:'客户',col:'deptname',width:'180'},
                    {index:3,name:'合同金额',col:'amount',width:'110'},
                    // {index:4,name:'总金额',col:'contractNum',width:'100'},
                    {index:5,name:'已回款金额',col:'already',width:'130'},
                    {index:6,name:'剩余金额',col:'surplus',width:'110'},
                    {index:7,name:'30天',col:'thirtyDay',width:'90'},
                    {index:8,name:'60天',col:'sixtyDay',width:'90'},
                    {index:9,name:'90天',col:'ninetyDay',width:'90'},
                    {index:10,name:'120天',col:'oneHundredAndTwentyDay',width:'90'},
                    {index:11,name:'120天以上',col:'oneHundredAndTwentyDayUp',width:'110'},
                    {index:12,name:'业务员',col:'private_employee',width:'100'},
                    {index:13,name:'部门',col:'deptname',width:'90'},
                    {index:14,name:'机构',col:'parentname',width:'90'},
                ],

                agreeCycleList:[],
                agreeCycle:[
                    {index:1,name:' ',col:'sort',width:'130'},
                    {index:2,name:'一月',col:'sort',width:'90'},
                    {index:3,name:'二月',col:'deptname',width:'90'},
                    {index:4,name:'三月',col:'parentname',width:'90'},
                    {index:5,name:'四月',col:'contractNum',width:'90'},
                    {index:6,name:'五月',col:'amount',width:'90'},
                    {index:7,name:'六月',col:'avg',width:'90'},
                    {index:8,name:'七月',col:'avg',width:'90'},
                    {index:9,name:'八月',col:'avg',width:'90'},
                    {index:10,name:'九月',col:'avg',width:'90'},
                    {index:11,name:'十月',col:'avg',width:'90'},
                    {index:12,name:'十一月',col:'avg',width:'100'},
                    {index:13,name:'十二月',col:'avg',width:'100'},
                ],

                businessGrowthList:[],
                businessGrowth:[
                    {index:1,name:' ',col:'sort',width:'130'},
                    {index:2,name:'一月',col:'sort',width:'90'},
                    {index:3,name:'二月',col:'deptname',width:'90'},
                    {index:4,name:'三月',col:'parentname',width:'90'},
                    {index:5,name:'四月',col:'contractNum',width:'90'},
                    {index:6,name:'五月',col:'amount',width:'90'},
                    {index:7,name:'六月',col:'avg',width:'90'},
                    {index:8,name:'七月',col:'avg',width:'90'},
                    {index:9,name:'八月',col:'avg',width:'90'},
                    {index:10,name:'九月',col:'avg',width:'90'},
                    {index:11,name:'十月',col:'avg',width:'90'},
                    {index:12,name:'十一月',col:'avg',width:'100'},
                    {index:13,name:'十二月',col:'avg',width:'100'},
                ],

                targetCompletionList:[],
                targetCompletion:[
                    {index:1,name:'职员',col:'private_employee',width:'90'},
                    {index:2,name:'部门',col:'deptname',width:'90'},
                    {index:3,name:'机构',col:'parentname',width:'90'},
                    {index:4,name:'一月',col:'month1',width:'90'},
                    {index:5,name:'二月',col:'month2',width:'90'},
                    {index:6,name:'三月',col:'month3',width:'90'},
                    {index:7,name:'四月',col:'month4',width:'90'},
                    {index:8,name:'五月',col:'month5',width:'90'},
                    {index:9,name:'六月',col:'month6',width:'90'},
                    {index:10,name:'七月',col:'month7',width:'90'},
                    {index:11,name:'八月',col:'month8',width:'90'},
                    {index:12,name:'九月',col:'month9',width:'90'},
                    {index:13,name:'十月',col:'month10',width:'90'},
                    {index:14,name:'十一月',col:'month11',width:'100'},
                    {index:15,name:'十二月',col:'month12',width:'100'},
                ],

                salesmanStatisticsList:[],
                salesmanStatistics:[
                    {index:1,name:'职员',col:'private_employee',width:'90'},
                    {index:2,name:'部门',col:'deptname',width:'90'},
                    {index:3,name:'机构',col:'parentname',width:'90'},
                    {index:4,name:'线索数量',col:'customertwoNum',width:'110'},
                    {index:5,name:'跟进线索次数',col:'customertwoFollowNum',width:'145'},
                    {index:6,name:'客户数量',col:'customerpoolNum',width:'110'},
                    {index:7,name:'跟进客户次数',col:'customerpoolFollowNum',width:'145'},
                    {index:8,name:'商机数量',col:'opportunityNum',width:'110'},
                    {index:9,name:'商机金额',col:'opportunityAmount',width:'110'},
                    {index:10,name:'成功金额',col:'successAmount',width:'110'},
                    {index:11,name:'失败金额',col:'errorAmount',width:'110'},
                    {index:12,name:'商机成功率',col:'successRate',width:'130'},
                    {index:13,name:'合同数量',col:'contractNum',width:'110'},
                    {index:14,name:'合同金额',col:'contractAmount',width:'110'},
                    {index:15,name:'回款金额',col:'backAmount',width:'110'},
                    {index:16,name:'未收款金额',col:'notBackAmount',width:'130'},
                ],

                deptrankList:[],
                deptData:[],
                deptList:[],
                deptcolList:[
                    {index:1,name:'排行',col:'sort',width:'80'},
                    {index:2,name:'部门',col:'deptname',width:'80'},
                    {index:3,name:'机构',col:'parentname',width:'80'},
                    {index:4,name:'合同数量',col:'contractNum',width:'90'},
                    {index:5,name:'合同金额',col:'amount',width:'90'},
                    {index:6,name:'平均金额',col:'avg',width:'90'},
                ],

                personrankList:[],
                personData:[],
                personList:[],
                personcolList:[
                    {index:1,name:'排行',col:'sort',width:'80'},
                    {index:2,name:'职员',col:'private_employee',width:'80'},
                    {index:3,name:'部门',col:'deptname',width:'80'},
                    {index:4,name:'机构',col:'parentname',width:'80'},
                    {index:5,name:'合同数量',col:'contractNum',width:'90'},
                    {index:6,name:'合同金额',col:'amount',width:'90'},
                    {index:7,name:'平均金额',col:'avg',width:'90'},
                ],

                tableData:[],
                colList:[],

                yeardisabled:false,
                rangedisabled:false
            }
        },
        mounted(){
            this.loadwidth()
            this.loadmechanism()
        },
        activated(){
            // this.loadwidth()
        },
        methods:{
            loadwidth(){
                let widths = document.documentElement.offsetWidth || document.body.offsetWidth
                let heights = document.documentElement.offsetHeight || document.body.offsetHeight
                this.bar_style.width = widths * 0.7 +'px'
                this.bar_style.height = heights * 0.6 +'px'
            },
            loadmechanism(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'dept/selectAllMechanism.do?cId='+_this.$store.state.iscId
                }).then(function(res){
                    _this.mechanismData = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loaddeptList(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.deptid = this.searchList.mechanism

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'dept/getChildrenByMechanism.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let data = res.data.map.success
                    _this.deptnameData = [{deptid:'',deptname:'全部'}]
                    data.forEach(el => {
                        _this.deptnameData.push({deptid:el.deptid,deptname:el.deptname})
                    });
                }).catch(function(err){
                    // console.log(err);
                });
            },

            //显示对应状态数表格数据
            showTableval(val){
                const _this = this
                let i = val.index
                this.index = val.index
                this.searchList = {mechanism:null,department:null,year:null,yearMonth:null,startTime:null,endTime:null,yearrange:''}
                this.yeardisabled = false
                this.rangedisabled = false
                this.monthList = []
                this.deptnameData = []
                this.nameList.forEach(function(obj){
                    obj.isActive = false;
                });

                let date = new Date()
                let yval = date.getFullYear() //获取完整的年份(4位,1970-????)
                let mval = date.getMonth() + 1 //获取当前月份(0-11,0代表1月)
                mval = (mval < 10 ? "0" + mval : mval)
                if(i == 1){
                    // axios({
                    //     method: 'get',
                    //     url: _this.$store.state.defaultHttp+'reportFormJurisdiction/opportunity.do',//商机报表
                    // }).then(function(res){
                        // if(res.data.msg && res.data.msg == 'error'){
                        //     _this.$message({
                        //         message:'对不起，您没有该权限，请联系管理员开通',
                        //         type:'error'
                        //     })
                        // }else{
                            _this.showTitle = false
                            val.isActive = !val.isActive
                            _this.$options.methods.loadcusStatistics.bind(_this)();
                        // }
                    // }).catch(function(err){
                    //     // console.log(err);
                    // });
                }else if(i == 2){
                    _this.rangedisabled = true
                    _this.monthList = [
                        {id:'-01',label:'一月'},{id:'-02',label:'二月'},{id:'-03',label:'三月'},{id:'-04',label:'四月'},{id:'-05',label:'五月'},{id:'-06',label:'六月'},
                        {id:'-07',label:'七月'},{id:'-08',label:'八月'},{id:'-09',label:'九月'},{id:'-10',label:'十月'},{id:'-11',label:'十一月'},{id:'-12',label:'十二月'},
                    ]
                    // axios({
                    //     method: 'get',
                    //     url: _this.$store.state.defaultHttp+'reportFormJurisdiction/opportunity.do',//商机报表
                    // }).then(function(res){
                        // if(res.data.msg && res.data.msg == 'error'){
                        //     _this.$message({
                        //         message:'对不起，您没有该权限，请联系管理员开通',
                        //         type:'error'
                        //     })
                        // }else{
                            
                            _this.showTitle = false
                            val.isActive = !val.isActive
                            
                            _this.searchList.year = yval.toString()
                            _this.searchList.yearMonth = '-' + mval

                            _this.$options.methods.loadoppForecast.bind(_this)();
                        // }
                    // }).catch(function(err){
                    //     // console.log(err);
                    // });
                }else if(i == 3){
                    // axios({
                    //     method: 'get',
                    //     url: _this.$store.state.defaultHttp+'reportFormJurisdiction/opportunity.do',//商机报表
                    // }).then(function(res){
                        // if(res.data.msg && res.data.msg == 'error'){
                        //     _this.$message({
                        //         message:'对不起，您没有该权限，请联系管理员开通',
                        //         type:'error'
                        //     })
                        // }else{
                            _this.showTitle = false
                            val.isActive = !val.isActive
                            _this.$options.methods.loadoppStage.bind(_this)();
                        // }
                    // }).catch(function(err){
                    //     // console.log(err);
                    // });
                }else if(i == 4){
                    // axios({
                    //     method: 'get',
                    //     url: _this.$store.state.defaultHttp+'reportFormJurisdiction/opportunity.do',//商机报表
                    // }).then(function(res){
                        // if(res.data.msg && res.data.msg == 'error'){
                        //     _this.$message({
                        //         message:'对不起，您没有该权限，请联系管理员开通',
                        //         type:'error'
                        //     })
                        // }else{
                            _this.showTitle = false
                            val.isActive = !val.isActive
                            _this.$options.methods.loadoppLose.bind(_this)();
                        // }
                    // }).catch(function(err){
                    //     // console.log(err);
                    // });
                }else if(i == 5){
                    axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+'reportFormJurisdiction/opportunity.do',//商机报表
                    }).then(function(res){
                        // if(res.data.msg && res.data.msg == 'error'){
                        //     _this.$message({
                        //         message:'对不起，您没有该权限，请联系管理员开通',
                        //         type:'error'
                        //     })
                        // }else{
                            _this.showTitle = false
                            val.isActive = !val.isActive
                            _this.$options.methods.loadoppNumber.bind(_this)();
                        // }
                    }).catch(function(err){
                        // console.log(err);
                    });
                }else if(i == 6){
                    axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+'reportFormJurisdiction/contract.do',//合同报表
                    }).then(function(res){
                        // if(res.data.msg && res.data.msg == 'error'){
                        //     _this.$message({
                        //         message:'对不起，您没有该权限，请联系管理员开通',
                        //         type:'error'
                        //     })
                        // }else{
                            _this.showTitle = false
                            val.isActive = !val.isActive
                            _this.$options.methods.loadagreeReport.bind(_this)();
                        // }
                    }).catch(function(err){
                        // console.log(err);
                    });
                }else if(i == 7){
                    // axios({
                    //     method: 'get',
                    //     url: _this.$store.state.defaultHttp+'reportFormJurisdiction/opportunity.do',//商机报表
                    // }).then(function(res){
                        // if(res.data.msg && res.data.msg == 'error'){
                        //     _this.$message({
                        //         message:'对不起，您没有该权限，请联系管理员开通',
                        //         type:'error'
                        //     })
                        // }else{
                            _this.showTitle = false
                            val.isActive = !val.isActive
                            _this.$options.methods.loadagreePayment.bind(_this)();
                        // }
                    // }).catch(function(err){
                    //     // console.log(err);
                    // });
                }else if(i == 8){
                    // axios({
                    //     method: 'get',
                    //     url: _this.$store.state.defaultHttp+'reportFormJurisdiction/opportunity.do',//商机报表
                    // }).then(function(res){
                        // if(res.data.msg && res.data.msg == 'error'){
                        //     _this.$message({
                        //         message:'对不起，您没有该权限，请联系管理员开通',
                        //         type:'error'
                        //     })
                        // }else{
                            _this.showTitle = false
                            val.isActive = !val.isActive

                            _this.searchList.year = yval.toString()

                            _this.$options.methods.loadagreeCycler.bind(_this)();
                        // }
                    // }).catch(function(err){
                    //     // console.log(err);
                    // });
                }else if(i == 9){
                    // axios({
                    //     method: 'get',
                    //     url: _this.$store.state.defaultHttp+'reportFormJurisdiction/opportunity.do',//商机报表
                    // }).then(function(res){
                        // if(res.data.msg && res.data.msg == 'error'){
                        //     _this.$message({
                        //         message:'对不起，您没有该权限，请联系管理员开通',
                        //         type:'error'
                        //     })
                        // }else{
                            _this.showTitle = false
                            val.isActive = !val.isActive

                            _this.searchList.year = yval.toString()
                            _this.$options.methods.loadworkIncrease.bind(_this)();
                        // }
                    // }).catch(function(err){
                    //     // console.log(err);
                    // });
                }else if(i == 10){
                    // axios({
                    //     method: 'get',
                    //     url: _this.$store.state.defaultHttp+'reportFormJurisdiction/opportunity.do',//商机报表
                    // }).then(function(res){
                        // if(res.data.msg && res.data.msg == 'error'){
                        //     _this.$message({
                        //         message:'对不起，您没有该权限，请联系管理员开通',
                        //         type:'error'
                        //     })
                        // }else{
                            _this.showTitle = false
                            val.isActive = !val.isActive

                            _this.searchList.year = yval.toString()
                            _this.$options.methods.loadtargetCompletion.bind(_this)();
                        // }
                    // }).catch(function(err){
                    //     // console.log(err);
                    // });
                }else if(i == 11){
                    // axios({
                    //     method: 'get',
                    //     url: _this.$store.state.defaultHttp+'reportFormJurisdiction/opportunity.do',//商机报表
                    // }).then(function(res){
                        // if(res.data.msg && res.data.msg == 'error'){
                        //     _this.$message({
                        //         message:'对不起，您没有该权限，请联系管理员开通',
                        //         type:'error'
                        //     })
                        // }else{
                            _this.showTitle = false
                            val.isActive = !val.isActive
                            _this.$options.methods.loadsalesman.bind(_this)();
                        // }
                    // }).catch(function(err){
                    //     // console.log(err);
                    // });
                }else if(i == 12){
                    axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+'reportFormJurisdiction/dept.do',//部门报表
                    }).then(function(res){
                        // if(res.data.msg && res.data.msg == 'error'){
                        //     _this.$message({
                        //         message:'对不起，您没有该权限，请联系管理员开通',
                        //         type:'error'
                        //     })
                        // }else{
                            _this.showTitle = false
                            val.isActive = !val.isActive
                            _this.$options.methods.loaddeptrank.bind(_this)();
                        // }
                    }).catch(function(err){
                        // console.log(err);
                    });
                }else if(i == 13){
                    axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+'reportFormJurisdiction/user.do',//个人报表
                    }).then(function(res){
                        // if(res.data.msg && res.data.msg == 'error'){
                        //     _this.$message({
                        //         message:'对不起，您没有该权限，请联系管理员开通',
                        //         type:'error'
                        //     })
                        // }else{
                            _this.showTitle = false
                            val.isActive = !val.isActive
                            _this.$options.methods.loadpersonrank.bind(_this)();
                        // }
                    }).catch(function(err){
                        // console.log(err);
                    });
                }
            },
            loadcusStatistics(){
                // customerpool/customerpoolStatisticalAnalysis.do
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.year = this.searchList.year
                if(this.searchList.year && this.searchList.yearMonth){
                    data.yearMonth = this.searchList.year + this.searchList.yearMonth
                }
                data.startTime = this.searchList.startTime
                data.endTime = this.searchList.endTime
                data.deptid = this.searchList.mechanism
                data.secondid = this.searchList.department

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerpool/customerpoolStatisticalAnalysis.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let info = res.data
                    _this.colList = _this.cusStatistics
                    _this.tableData = info
                    let a = info.length
                    let b = 0
                    let c = 0
                    let d = 0
                    let reg = new RegExp(',','g')
                    info.forEach(el => {
                        if(el.totalSum !== 0 && el.totalSum !== null){
                            el.bval = el.totalSum.replace(reg,'')
                        }else{
                            el.bval = '0'
                        }
                        if(el.backTotalSum !== 0 && el.backTotalSum !== null){
                            el.cval = el.backTotalSum.replace(reg,'')
                        }else{
                            el.cval = '0'
                        }
                        if(el.difference !== 0 && el.difference !== null){
                            el.dval = el.difference.replace(reg,'')
                        }else{
                            el.dval = '0'
                        }

                        b += parseFloat(el.bval)
                        c += parseFloat(el.cval)
                        d += parseFloat(el.dval)
                    });
                    _this.cusStatisticsList = {nameA:a,nameB:b,nameC:c,nameD:d}
                    // console.log(info,b,c,d)
                    _this.drawLine1()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadoppForecast(){
                // opportunity/opportunityForecastAnalysis.do
                const _this = this
                let qs = require('querystring')
                let data = {}
                // data.year = this.searchList.year
                if(this.searchList.year && this.searchList.yearMonth){
                    data.yearMonth = this.searchList.year + this.searchList.yearMonth
                }
                data.deptid = this.searchList.mechanism
                data.secondid = this.searchList.department
                this.oppForecastList = {
                    nameA:[],
                    nameA:[],
                    nameA:[],
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/opportunityForecastAnalysis.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let info = res.data 
                    _this.colList = _this.oppForecast
                    _this.tableData = info
                    let reg = new RegExp(',','g')
                    info.forEach(el => {
                        if(el.target !== 0 && el.target !== null){
                            el.bval = el.target.replace(reg,'')
                        }else{
                            el.bval = '0'
                        }
                        if(el.deal !== 0 && el.deal !== null){
                            el.cval = el.deal.replace(reg,'')
                        }else{
                            el.cval = '0'
                        }
                        if(el.difference !== 0 && el.difference !== null){
                            el.dval = el.difference.replace(reg,'')
                        }else{
                            el.dval = '0'
                        }
                        _this.oppForecastList.nameA.push(el.bval)
                        _this.oppForecastList.nameB.push(el.cval)
                        _this.oppForecastList.nameC.push(el.dval)
                    });
                    _this.drawLine2()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadoppStage(){
                // opportunity/opportunityStageAnalysis.do
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.year = this.searchList.year
                if(this.searchList.year && this.searchList.yearMonth){
                    data.yearMonth = this.searchList.year + this.searchList.yearMonth
                }
                data.startTime = this.searchList.startTime
                data.endTime = this.searchList.endTime
                data.deptid = this.searchList.mechanism
                data.secondid = this.searchList.department

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/opportunityStageAnalysis.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let info = res.data
                    _this.colList = _this.oppStage
                    _this.tableData = res.data
                    _this.drawLine3()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadoppLose(){
                // opportunity/losingOrderAnalysis.do
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.year = this.searchList.year
                if(this.searchList.year && this.searchList.yearMonth){
                    data.yearMonth = this.searchList.year + this.searchList.yearMonth
                }
                data.startTime = this.searchList.startTime
                data.endTime = this.searchList.endTime
                data.deptid = this.searchList.mechanism
                data.secondid = this.searchList.department

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/losingOrderAnalysis.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let info = res.data
                    _this.colList = _this.oppLost
                    _this.tableData = info
                    let newArr = new Array()
                    let tempArr = new Array()
                    for (let i = 0; i < info.length; i++) {
                        if (tempArr.indexOf(info[i].step_name) === -1) {
                            newArr.push({
                                name: info[i].step_name,
                                origin: [info[i]]
                            });
                            tempArr.push(info[i].step_name);
                        } else {
                            for (let j = 0; j < newArr.length; j++) {
                                if (newArr[j].name == info[i].step_name) {
                                    newArr[j].origin.push(info[i]);
                                    break;
                                }
                            }
                        }
                    }
                    _this.oppLostList = newArr
                    _this.drawLine4()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadoppNumber(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.year = this.searchList.year
                if(this.searchList.year && this.searchList.yearMonth){
                    data.yearMonth = this.searchList.year + this.searchList.yearMonth
                }
                data.startTime = this.searchList.startTime
                data.endTime = this.searchList.endTime
                data.deptid = this.searchList.mechanism
                data.secondid = this.searchList.department

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'addstep/selectAddstepState.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let data = res.data
                    _this.oppcolList = [
                        {index:-5,name:'职员',col:'private_employee'},
                        {index:-4,name:'部门',col:'deptname'},
                        {index:-3,name:'机构',col:'parentname'},
                        {index:-2,name:'客户数量',col:'customerNum'},
                    ]
                    _this.oppData = []
                    let info = data.reverse()
                    info.forEach((el,i) => {
                        _this.oppcolList.push({index:el.sort,name:el.step_name,col:el.col},)
                        _this.oppData.push({value:i,name:el.step_name + '（' + el.count + '）',label:el.count})
                    });
                    _this.drawLine5()
                }).catch(function(err){
                    // console.log(err);
                });

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/getOpportunityReportForm.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.oppReportList = res.data.map.opportunitys
                    _this.tableData = _this.oppReportList
                    _this.colList = _this.oppcolList
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadagreeReport(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.year = this.searchList.year
                if(this.searchList.year && this.searchList.yearMonth){
                    data.yearMonth = this.searchList.year + this.searchList.yearMonth
                }
                data.startTime = this.searchList.startTime
                data.endTime = this.searchList.endTime
                data.deptid = this.searchList.mechanism
                data.secondid = this.searchList.department

                _this.tableData = _this.agreeReportList
                _this.colList = _this.agreecolList
                _this.drawLine6()
            },
            loadagreePayment(){
                // contract/backPredictionAnalysis.do
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.year = this.searchList.year
                if(this.searchList.year && this.searchList.yearMonth){
                    data.yearMonth = this.searchList.year + this.searchList.yearMonth
                }
                data.startTime = this.searchList.startTime
                data.endTime = this.searchList.endTime
                data.deptid = this.searchList.mechanism
                data.secondid = this.searchList.department

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'contract/backPredictionAnalysis.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let info = res.data
                    _this.colList = _this.agreepaymentForecast
                    _this.tableData = res.data
                    let a = 0
                    let b = 0
                    let c = 0
                    let d = 0
                    let reg = new RegExp(',','g')
                    info.forEach(el => {
                        if(el.thirtyDay !== 0 && el.thirtyDay !== null){
                            el.aval = el.thirtyDay.replace(reg,'')
                        }else{
                            el.aval = '0'
                        }
                        if(el.sixtyDay !== 0 && el.sixtyDay !== null){
                            el.bval = el.sixtyDay.replace(reg,'')
                        }else{
                            el.bval = '0'
                        }
                        if(el.ninetyDay !== 0 && el.ninetyDay !== null){
                            el.cval = el.ninetyDay.replace(reg,'')
                        }else{
                            el.cval = '0'
                        }
                        if(el.oneHundredAndTwentyDay !== 0 && el.oneHundredAndTwentyDay !== null){
                            el.dval = el.oneHundredAndTwentyDay.replace(reg,'')
                        }else{
                            el.dval = '0'
                        }

                        a += parseFloat(el.aval)
                        b += parseFloat(el.bval)
                        c += parseFloat(el.cval)
                        d += parseFloat(el.dval)
                    });
                    _this.agreepaymentForecastList = {nameA:a,nameB:b,nameC:c,nameD:d}
                    _this.drawLine7()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadagreeCycler(){
                // contract/cycleContrast.do
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.year = this.searchList.year
                data.deptid = this.searchList.mechanism
                data.secondid = this.searchList.department

                this.agreeCycleList = {
                    nameA: [],
                    nameB: [],
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'contract/cycleContrast.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let info = res.data
                    _this.colList = _this.agreeCycle
                    _this.tableData = info
                    let aval = 0
                    let bval = 0
                    let reg = new RegExp(',','g')
                    info.forEach(el => {
                        if(el.amount !== 0 && el.amount !== null){
                            el.aval = el.amount.replace(reg,'')
                        }else{
                            el.aval = '0'
                        }
                        if(el.upAmount !== 0 && el.upAmount !== null){
                            el.bval = el.upAmount.replace(reg,'')
                        }else{
                            el.bval = '0'
                        }
                        
                        _this.agreeCycleList.nameA.push(el.aval)
                        _this.agreeCycleList.nameB.push(el.bval)
                    });
                    _this.drawLine8()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadworkIncrease(){
                // customerTwo/businessGrowthAnalysis.do
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.year = this.searchList.year
                data.deptid = this.searchList.mechanism
                data.secondid = this.searchList.department

                this.businessGrowthList = {
                    nameA: [],
                    nameB: [],
                    nameC: [],
                    nameD: [],
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerTwo/businessGrowthAnalysis.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let info = res.data
                    _this.colList = _this.businessGrowth
                    _this.tableData = info
                    let aval = 0
                    let bval = 0
                    let cval = 0
                    let dval = 0
                    let reg = new RegExp(',','g')
                    info.forEach(el => {
                        _this.businessGrowthList.nameA.push(el.customertwoNum)
                        _this.businessGrowthList.nameB.push(el.customerpoolNum)
                        _this.businessGrowthList.nameC.push(el.opportunityNum)
                        _this.businessGrowthList.nameD.push(el.contractNum)
                    });
                    _this.drawLine9()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadtargetCompletion(){
                // privateUser/goalCompletionAnalysis.do
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.year = this.searchList.year
                data.deptid = this.searchList.mechanism
                data.secondid = this.searchList.department

                this.targetCompletionList = {
                    nameA: [],
                    nameB: [],
                    nameC: [],
                    nameD: [],
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'privateUser/goalCompletionAnalysis.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let info = res.data
                    _this.colList = _this.targetCompletion
                    _this.tableData = info
                    let aval = 0
                    let bval = 0
                    let cval = 0
                    let dval = 0
                    let reg = new RegExp(',','g')
                    info.forEach(el => {
                        // _this.targetCompletionList.nameA.push(el.customertwoNum)
                        // _this.targetCompletionList.nameB.push(el.customerpoolNum)
                        // _this.targetCompletionList.nameC.push(el.opportunityNum)
                        // _this.targetCompletionList.nameD.push(el.contractNum)
                    });
                    _this.drawLine10()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadsalesman(){
                // privateUser/ statisticsAndAnalysisOfSalesperson.do
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.year = this.searchList.year
                if(this.searchList.year && this.searchList.yearMonth){
                    data.yearMonth = this.searchList.year + this.searchList.yearMonth
                }
                data.startTime = this.searchList.startTime
                data.endTime = this.searchList.endTime
                data.deptid = this.searchList.mechanism
                data.secondid = this.searchList.department

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'privateUser/statisticsAndAnalysisOfSalesperson.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let info = res.data
                    _this.colList = _this.salesmanStatistics
                    _this.tableData = info
                    let a = 0
                    let b = 0
                    let c = 0
                    let d = 0
                    let reg = new RegExp(',','g')
                    info.forEach(el => {
                        // if(el.customerpoolNum !== 0 && el.customerpoolNum !== null){
                        //     el.aval = el.customerpoolNum.replace(reg,'')
                            el.aval = el.customerpoolNum
                        // }else{
                        //     el.aval = '0'
                        // }
                        if(el.contractAmount !== 0 && el.contractAmount !== null){
                            el.bval = el.contractAmount.replace(reg,'')
                        }else{
                            el.bval = '0'
                        }
                        if(el.backAmount !== 0 && el.backAmount !== null){
                            el.cval = el.backAmount.replace(reg,'')
                        }else{
                            el.cval = '0'
                        }
                        if(el.notBackAmount !== 0 && el.notBackAmount !== null){
                            el.dval = el.notBackAmount.replace(reg,'')
                        }else{
                            el.dval = '0'
                        }

                        a += parseFloat(el.aval)
                        b += parseFloat(el.bval)
                        c += parseFloat(el.cval)
                        d += parseFloat(el.dval)
                    });
                    _this.salesmanStatisticsList = {nameA:a,nameB:b,nameC:c,nameD:d}
                    _this.drawLine11()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loaddeptrank(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.year = this.searchList.year
                if(this.searchList.year && this.searchList.yearMonth){
                    data.yearMonth = this.searchList.year + this.searchList.yearMonth
                }
                data.startTime = this.searchList.startTime
                data.endTime = this.searchList.endTime
                data.deptid = this.searchList.mechanism
                data.secondid = this.searchList.department

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getContractByDept.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.deptData = []
                    _this.deptList = []
                    _this.deptrankList = res.data.map.contracts
                    _this.tableData = _this.deptrankList
                    _this.colList = _this.deptcolList
                    _this.deptrankList.forEach(el => {
                        _this.deptData.push(el.amount)
                        _this.deptList.push(el.deptname)
                    });
                    _this.drawLine12()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadpersonrank(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.year = this.searchList.year
                if(this.searchList.year && this.searchList.yearMonth){
                    data.yearMonth = this.searchList.year + this.searchList.yearMonth
                }
                data.startTime = this.searchList.startTime
                data.endTime = this.searchList.endTime
                data.deptid = this.searchList.mechanism
                data.secondid = this.searchList.department

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getContractByPersonal.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.personData = []
                    _this.personList = []
                    _this.personrankList = res.data.map.contracts
                    _this.tableData = _this.personrankList
                    _this.colList = _this.personcolList
                    _this.personrankList.forEach(el => {
                        _this.personData.push(el.amount)
                        _this.personList.push(el.private_employee)
                    });
                    _this.drawLine13()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            drawLine1(){
                // 基于准备好的dom，初始化echarts实例
                let chart401 = echarts.init(document.getElementById('chart401'))
                // 绘制图表
                chart401.setOption({
                    title: { text: '客户统计分析',left: 'center' },
                    series: [
                        {
                            name: '总客户量',
                            type: 'pie',
                            radius: ['32%', '40%'],
                            center: ['25%', '25%'],
                            startAngle: 225,
                            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#C23531'
                            }, {
                                offset: 1,
                                color: '#C23531'
                            }]), "transparent"],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 75,
                                name: '总客户量',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '总客户量',
                                        textStyle: {
                                            color: '#C23531',
                                            fontSize: 16
                                        }
                                    }
                                }
                            }, {
                                value: 25,
                                name: '%',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '\n' + this.cusStatisticsList.nameA,
                                        textStyle: {
                                            color: '#C23531',
                                            fontSize: 20
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            name: '交易总额汇总',
                            type: 'pie',
                            radius: ['32%', '40%'],
                            center: ['75%', '25%'],
                            startAngle: 225,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 75,
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#2F4554'
                                        }, {
                                            offset: 1,
                                            color: '#2F4554'
                                        }]),
                                    }
                                },
                                name: '交易总额汇总',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '交易总额汇总',
                                        textStyle: {
                                            color: '#2F4554',
                                            fontSize: 16
                                        }
                                    }
                                }
                            }, {
                                value: 25,
                                name: '%',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '\n' + this.cusStatisticsList.nameB,
                                        textStyle: {
                                            color: '#2F4554',
                                            fontSize: 20
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            name: '收款总额监控',
                            type: 'pie',
                            radius: ['32%', '40%'],
                            center: ['25%', '75%'],
                            startAngle: 225,
                            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#61A0A8'
                            }, {
                                offset: 1,
                                color: '#61A0A8'
                            }]), "transparent"],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 75,
                                name: '收款总额监控',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '收款总额监控',
                                        textStyle: {
                                            color: '#61A0A8',
                                            fontSize: 16
                                        }
                                    }
                                }
                            }, {
                                value: 25,
                                name: '%',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '\n' + this.cusStatisticsList.nameC,
                                        textStyle: {
                                            color: '#61A0A8',
                                            fontSize: 20
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            name: '欠款总额监控',
                            type: 'pie',
                            radius: ['32%', '40%'],
                            center: ['75%', '75%'],
                            startAngle: 225,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 75,
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#D48265'
                                        }, {
                                            offset: 1,
                                            color: '#D48265'
                                        }]),
                                    }
                                },
                                name: '欠款总额监控',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '欠款总额监控',
                                        textStyle: {
                                            color: '#D48265',
                                            fontSize: 16
                                        }
                                    }
                                }
                            }, {
                                value: 25,
                                name: '%',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '\n' + this.cusStatisticsList.nameD,
                                        textStyle: {
                                            color: '#D48265',
                                            fontSize: 20
                                        }
                                    }
                                }
                            }]
                        }
                    ]
                });
            },
            drawLine2(){
                // 基于准备好的dom，初始化echarts实例
                let chart402 = echarts.init(document.getElementById('chart402'))
                // 绘制图表
                chart402.setOption({
                    title: { text: '商机预测分析',left: 'center' },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        right: '20%'
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    // legend: {
                    //     data:['目标金额','完成金额','差额']
                    // },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '目标金额',
                            min: 0,
                            max: 250,
                            position: 'right',
                            axisLine: {
                                lineStyle: {
                                    color: '#C23531'
                                }
                            },
                            axisLabel: {
                                formatter: '{value} 元'
                            }
                        },
                        {
                            type: 'value',
                            name: '完成金额',
                            min: 0,
                            max: 250,
                            position: 'right',
                            offset: 80,
                            axisLine: {
                                lineStyle: {
                                    color: '#2F4554'
                                }
                            },
                            axisLabel: {
                                formatter: '{value} 元'
                            }
                        },
                        {
                            type: 'value',
                            name: '差额',
                            min: 0,
                            max: 25,
                            position: 'left',
                            axisLine: {
                                lineStyle: {
                                    color: '#61A0A8'
                                }
                            },
                            axisLabel: {
                                formatter: '{value} 元'
                            }
                        }
                    ],
                    series: [
                        {
                            name:'目标金额',
                            type:'bar',
                            data:this.oppForecastList.nameA
                        },
                        {
                            name:'完成金额',
                            type:'bar',
                            yAxisIndex: 1,
                            data:this.oppForecastList.nameB
                        },
                        {
                            name:'差额',
                            type:'line',
                            yAxisIndex: 2,
                            data:this.oppForecastList.nameC
                        }
                    ]
                });
            },
            drawLine3(){
                // 基于准备好的dom，初始化echarts实例
                let chart403 = echarts.init(document.getElementById('chart403'))
                // 绘制图表
                chart403.setOption({
                    title: { text: '商机阶段分析',left: 'center' },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        right: '20%'
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    // legend: {
                    //     data:['目标金额','完成金额','差额']
                    // },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '目标金额',
                            min: 0,
                            max: 250,
                            position: 'right',
                            axisLine: {
                                lineStyle: {
                                    color: '#C23531'
                                }
                            },
                            axisLabel: {
                                formatter: '{value} 元'
                            }
                        },
                        {
                            type: 'value',
                            name: '完成金额',
                            min: 0,
                            max: 250,
                            position: 'right',
                            offset: 80,
                            axisLine: {
                                lineStyle: {
                                    color: '#2F4554'
                                }
                            },
                            axisLabel: {
                                formatter: '{value} 元'
                            }
                        },
                        {
                            type: 'value',
                            name: '差额',
                            min: 0,
                            max: 25,
                            position: 'left',
                            axisLine: {
                                lineStyle: {
                                    color: '#61A0A8'
                                }
                            },
                            axisLabel: {
                                formatter: '{value} 元'
                            }
                        }
                    ],
                    series: [
                        {
                            name:'目标金额',
                            type:'bar',
                            data:this.oppForecastList.nameA
                        },
                        {
                            name:'完成金额',
                            type:'bar',
                            yAxisIndex: 1,
                            data:this.oppForecastList.nameB
                        },
                        {
                            name:'差额',
                            type:'line',
                            yAxisIndex: 2,
                            data:this.oppForecastList.nameC
                        }
                    ]
                });
            },
            drawLine4(){
                // 基于准备好的dom，初始化echarts实例
                let chart404 = echarts.init(document.getElementById('chart404'))
                // 绘制图表
                // var  colorList=['#afa3f5', '#00d488', '#3feed4', '#3bafff', '#f1bb4c', "rgba(250,250,250,0.5)"];

                let arr = this.oppLostList
                let nameA = [
                    { value: 0, name: '商机总数量', label: { normal: { position: 'center', formatter: '商机总数量', textStyle: { color: '#000', fontSize: 16 } } } },
                    { value: 0, name: '#', label: { normal: { position: 'center', formatter: '\n8', textStyle: { color: '#000', fontSize: 16 } } } },
                    {name:'成功数量',value:60,proportion:'60'},
                    {name:'失败数量',value:30,proportion:'30'},
                ]
                let nameB = [
                    { value: 0, name: '商机总数量', label: { normal: { position: 'center', formatter: '商机总数量', textStyle: { color: '#000', fontSize: 16 } } } },
                    { value: 0, name: '#', label: { normal: { position: 'center', formatter: '\n8', textStyle: { color: '#000', fontSize: 16 } } } }
                ]
                arr.forEach(el => {
                    el.proportion = el.origin.length / arr.length * 100
                    nameB.push({name:el.name,value:(el.proportion).toFixed(2)})
                });

                chart404.setOption({
                    title: { text: '商机丢单分析',left: 'center' },
                    series: [
                        // 主要展示层的
                        {
                            radius: ['25%', '40%'],
                            center: ['25%', '50%'],
                            type: 'pie',
                            labelLine: {
                                normal: {
                                    show: true,
                                    length: 10,
                                    length2: 10,
                                    lineStyle: {
                                        color: '#d3d3d3'
                                    },
                                },
                                color: "#000",
                                emphasis: {
                                    show: true
                                }
                            },
                            label:{
                                normal:{
                                    formatter: function(params){
                                        var str = '';
                                        str = '{nameStyle| ' + params.name + ' }'+'{rate|'+params.value+'}' + '\n' + '{nameStyle| 占比 }'+'{rate|'+params.data.proportion+'%}'
                                        return str
                                    },
                                    height: 20,
                                    rich: {
                                        nameStyle: {
                                            fontSize: 14,
                                            color: "#555",
                                            align: 'left'
                                        },
                                        rate: {
                                            fontSize: 16,
                                            color: "#1ab4b8",
                                            align: 'left'
                                        }
                                    }
                                }
                            },
                            data: nameA,
                        },
                        // 边框的设置
                        {
                            radius: ['37%', '40%'],
                            center: ['25%', '50%'],
                            type: 'pie',
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            animation: false,
                            tooltip: {
                                show: false
                            },
                            itemStyle: {
                                normal: {
                                    color:'rgba(250,250,250,0.5)'
                                }
                            },
                            data: [{
                                value: 1,
                            }],
                        },
                        {
                            radius: ['25%', '40%'],
                            center: ['75%', '50%'],
                            type: 'pie',
                            labelLine: {
                                normal: {
                                    show: true,
                                    length: 10,
                                    length2: 10,
                                    lineStyle: {
                                        color: '#d3d3d3'
                                    },
                                    align: 'right'
                                },
                                color: "#000",
                                emphasis: {
                                    show: true
                                }
                            },
                            label:{
                                normal:{
                                    formatter: function(params){
                                        var str = '';
                                        str = '{nameStyle| ' + params.name + ' }'+'{rate|'+params.value+'%}'
                                        return str
                                    },
                                    height: 20,
                                    rich: {
                                        nameStyle: {
                                            fontSize: 14,
                                            color: "#555",
                                            align: 'left'
                                        },
                                        rate: {
                                            fontSize: 16,
                                            color: "#1ab4b8",
                                            align: 'left'
                                        }
                                    }
                                }
                            },
                            data: nameB
                        },
                        // 边框的设置
                        {
                            radius: ['37%', '40%'],
                            center: ['75%', '50%'],
                            type: 'pie',
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            animation: false,
                            tooltip: {
                                show: false
                            },
                            itemStyle: {
                                normal: {
                                    color:'rgba(250,250,250,0.5)'
                                }
                            },
                            data: [{
                                value: 1,
                            }],
                        }
                    ]
                    // tooltip: {
                    //     trigger: 'item',
                    //     formatter: "{b}: {c} ({d}%)"
                    // },
                    // // legend: {
                    // //     orient: 'vertical',
                    // //     x: 'left',
                    // //     data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
                    // // },
                    // series: [
                    //     {
                    //         name:'',
                    //         type:'pie',
                    //         // selectedMode: 'single',
                    //         radius: [0, '30%'],
                    //         color:['#ffffff'],

                    //         label: {
                    //             normal: {
                    //                 position: 'inner',
                    //                 textStyle: {
                    //                     color: '#000'  // 改变标示文字的颜色
                    //                 }
                    //             }

                    //         },
                    //         labelLine: {
                    //             normal: {
                    //                 show: false
                    //             }
                    //         },
                    //         data:[
                    //             {value:679, name:'营销广告'}
                    //         ]
                    //     },
                    //     {
                    //         name:'访问来源',
                    //         type:'pie',
                    //         radius: ['30%', '55%'],
                    //         data:[
                    //             {value:335, name:'直达'},
                    //             {value:310, name:'邮件营销'},
                    //             {value:234, name:'联盟广告'},
                    //             {value:135, name:'视频广告'},
                    //             {value:1048, name:'百度'},
                    //             {value:251, name:'谷歌'},
                    //             {value:147, name:'必应'},
                    //             {value:102, name:'其他'}
                    //         ]
                    //     }
                    // ]
                });
            },
            drawLine5(){
                // 基于准备好的dom，初始化echarts实例
                let chart405 = echarts.init(document.getElementById('chart405'))
                // 绘制图表
                chart405.setOption({
                    title : { text: '商机数量分析', left: 'center' },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b}"
                    },
                    calculable : true,
                    emphasis: {
                        label: {
                            fontSize: 20
                        }
                    },
                    series : [
                        {
                            name:'金额',
                            type:'funnel',
                            left: '10%',
                            width: '80%',
                            minSize: '30%',
                            sort: 'descending',
                            label: {
                                show: true,
                                position: 'inside'
                            },
                            data:this.oppData
                        }
                    ]
                });
            },
            drawLine6(){
                // 基于准备好的dom，初始化echarts实例
                let chart406 = echarts.init(document.getElementById('chart406'))
                // 绘制图表
                chart406.setOption({
                    title: { text: '合同报表',left: 'center' },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                    },
                    grid: {
                        left: 60,
                        containLabel: true
                    },
                    xAxis: {
                        bottom: 20,
                        type: 'category',
                        data: this.agreeList
                    },
                    yAxis: {
                        type:'value',
                    },
                    series: [{
                        name: '目标金额',
                        type: 'bar',
                        data: this.agreeData2
                    },{
                        name: '实际金额',
                        type: 'bar',
                        data: this.agreeData
                    }]
                });
            },
            drawLine7(){
                // 基于准备好的dom，初始化echarts实例
                let chart407 = echarts.init(document.getElementById('chart407'))
                // 绘制图表
                var colors = ['#5793f3', '#d14a61', '#675bba', '#53ac14'];
                chart407.setOption({
                    title: { text: '合同汇款统计分析',left: 'center' },
                    series: [
                        {
                            name: '预计30天',
                            type: 'pie',
                            radius: ['32%', '40%'],
                            center: ['25%', '25%'],
                            startAngle: 225,
                            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#C23531'
                            }, {
                                offset: 1,
                                color: '#C23531'
                            }]), "transparent"],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 75,
                                name: '预计30天',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '预计30天',
                                        textStyle: {
                                            color: '#C23531',
                                            fontSize: 16
                                        }
                                    }
                                }
                            }, {
                                value: 25,
                                name: '%',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '\n' + this.agreepaymentForecastList.nameA,
                                        textStyle: {
                                            color: '#C23531',
                                            fontSize: 20
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            name: '预计60天',
                            type: 'pie',
                            radius: ['32%', '40%'],
                            center: ['75%', '25%'],
                            startAngle: 225,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 75,
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#2F4554'
                                        }, {
                                            offset: 1,
                                            color: '#2F4554'
                                        }]),
                                    }
                                },
                                name: '预计60天',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '预计60天',
                                        textStyle: {
                                            color: '#2F4554',
                                            fontSize: 16
                                        }
                                    }
                                }
                            }, {
                                value: 25,
                                name: '%',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '\n' + this.agreepaymentForecastList.nameB,
                                        textStyle: {
                                            color: '#2F4554',
                                            fontSize: 20
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            name: '预计90天',
                            type: 'pie',
                            radius: ['32%', '40%'],
                            center: ['25%', '75%'],
                            startAngle: 225,
                            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#61A0A8'
                            }, {
                                offset: 1,
                                color: '#61A0A8'
                            }]), "transparent"],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 75,
                                name: '预计90天',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '预计90天',
                                        textStyle: {
                                            color: '#61A0A8',
                                            fontSize: 16
                                        }
                                    }
                                }
                            }, {
                                value: 25,
                                name: '%',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '\n' + this.agreepaymentForecastList.nameC,
                                        textStyle: {
                                            color: '#61A0A8',
                                            fontSize: 20
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            name: '预计120天',
                            type: 'pie',
                            radius: ['32%', '40%'],
                            center: ['75%', '75%'],
                            startAngle: 225,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 75,
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#D48265'
                                        }, {
                                            offset: 1,
                                            color: '#D48265'
                                        }]),
                                    }
                                },
                                name: '预计120天',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '预计120天',
                                        textStyle: {
                                            color: '#D48265',
                                            fontSize: 16
                                        }
                                    }
                                }
                            }, {
                                value: 25,
                                name: '%',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '\n' + this.agreepaymentForecastList.nameD,
                                        textStyle: {
                                            color: '#D48265',
                                            fontSize: 20
                                        }
                                    }
                                }
                            }]
                        }
                    ]
                })
            },
            drawLine8(){
                // 基于准备好的dom，初始化echarts实例
                let chart408 = echarts.init(document.getElementById('chart408'))
                // 绘制图表
                var colors = ['#5793f3', '#d14a61', '#675bba', '#53ac14'];
                chart408.setOption({
                    title: { text: '合同周期对比',left: 'center' },
                    tooltip : {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '3%',
                        top:'15%',
                        containLabel: true
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
                        }
                    ],
                    yAxis : {
                            type : 'value'
                        }
                    ,
                    series : [
                        {
                            name:'本月金额',
                            type:'line',
                            areaStyle: {
                                normal: {type: 'default',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(199, 37, 50,0.2)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(199, 37, 50,0.2)'
                                    }], false)
                                }
                            },
                            smooth:true,
                            itemStyle: {
                                normal: {areaStyle: {type: 'default'}}    
                            },
                            data:this.agreeCycleList.nameA
                        },
                        {
                            name:'上年同期金额',
                            type:'line',
                            areaStyle: {
                                normal: {type: 'default',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(19, 37, 250,0.2)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(19, 37, 250,0.2)'
                                    }], false)
                                }
                            },
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data:this.agreeCycleList.nameB
                        }
                    ]
                })
            },
            drawLine9(){
                // 基于准备好的dom，初始化echarts实例
                let chart409 = echarts.init(document.getElementById('chart409'))
                // 绘制图表
                var colors = ['#5793f3', '#d14a61', '#675bba', '#53ac14'];
                chart409.setOption({
                    title: { text: '业务增长分析',left: 'center' },
                    tooltip : {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '3%',
                        top:'15%',
                        containLabel: true
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
                        }
                    ],
                    yAxis : {
                            type : 'value'
                        }
                    ,
                    series : [
                        {
                            name:'线索数量',
                            type:'line',
                            areaStyle: {
                                normal: {type: 'default',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(194, 53, 49, 0.2)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(194, 53, 49, 0.2)'
                                    }], false)
                                }
                            },
                            smooth:true,
                            itemStyle: {
                                normal: {areaStyle: {type: 'default'}}    
                            },
                            data:this.businessGrowthList.nameA
                        },
                        {
                            name:'客户数量',
                            type:'line',
                            areaStyle: {
                                normal: {type: 'default',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(47, 69, 84, 0.2)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(47, 69, 84, 0.2)'
                                    }], false)
                                }
                            },
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data:this.businessGrowthList.nameB
                        },
                        {
                            name:'商机数量',
                            type:'line',
                            areaStyle: {
                                normal: {type: 'default',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(97, 160, 168, 0.2)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(97, 160, 168, 0.2)'
                                    }], false)
                                }
                            },
                            smooth:true,
                            itemStyle: {
                                normal: {areaStyle: {type: 'default'}}    
                            },
                            data:this.businessGrowthList.nameC
                        },
                        {
                            name:'合同数量',
                            type:'line',
                            areaStyle: {
                                normal: {type: 'default',
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(212, 130, 101, 0.2)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(212, 130, 101, 0.2)'
                                    }], false)
                                }
                            },
                            smooth:true,
                            itemStyle: {
                                normal: {areaStyle: {type: 'default'}}    
                            },
                            data:this.businessGrowthList.nameD
                        },
                    ]
                })
            },
            drawLine10(){
                // 基于准备好的dom，初始化echarts实例
                let chart410 = echarts.init(document.getElementById('chart410'))
                // 绘制图表
                var colors = ['#5793f3', '#d14a61', '#675bba', '#53ac14'];
                chart410.setOption({
                    title: { text: '目标完成度分析',left: 'center' },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    yAxis : [
                        {
                            type : 'category',
                            axisTick : {show: false},
                            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                        }
                    ],
                    series : [
                        {
                            name:'目标金额',
                            type:'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data:[200, 170, 240, 244, 200, 220, 210, 200, 170, 240, 244, 200]
                        },
                        {
                            name:'完成金额',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                            data:[320, 302, 341, 374, 390, 450, 420, 302, 341, 374, 390, 450]
                        },
                        {
                            name:'差额',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'left'
                                }
                            },
                            data:[-120, -132, -101, -134, -190, -230, -210, -132, -101, -134, -190, -230]
                        }
                    ]
                })
            },
            drawLine11(){
                // 基于准备好的dom，初始化echarts实例
                let chart411 = echarts.init(document.getElementById('chart411'))
                // 绘制图表
                chart411.setOption({
                    title: { text: '业务员统计分析',left: 'center' },
                    series: [
                        {
                            name: '总客户量',
                            type: 'pie',
                            radius: ['32%', '40%'],
                            center: ['25%', '25%'],
                            startAngle: 225,
                            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#C23531'
                            }, {
                                offset: 1,
                                color: '#C23531'
                            }]), "transparent"],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 75,
                                name: '总客户量',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '总客户量',
                                        textStyle: {
                                            color: '#C23531',
                                            fontSize: 16
                                        }
                                    }
                                }
                            }, {
                                value: 25,
                                name: '%',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '\n' + this.salesmanStatisticsList.nameA,
                                        textStyle: {
                                            color: '#C23531',
                                            fontSize: 20
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            name: '交易总额汇总',
                            type: 'pie',
                            radius: ['32%', '40%'],
                            center: ['75%', '25%'],
                            startAngle: 225,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 75,
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#2F4554'
                                        }, {
                                            offset: 1,
                                            color: '#2F4554'
                                        }]),
                                    }
                                },
                                name: '交易总额汇总',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '交易总额汇总',
                                        textStyle: {
                                            color: '#2F4554',
                                            fontSize: 16
                                        }
                                    }
                                }
                            }, {
                                value: 25,
                                name: '%',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '\n' + this.salesmanStatisticsList.nameB,
                                        textStyle: {
                                            color: '#2F4554',
                                            fontSize: 20
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            name: '收款总额监控',
                            type: 'pie',
                            radius: ['32%', '40%'],
                            center: ['25%', '75%'],
                            startAngle: 225,
                            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#61A0A8'
                            }, {
                                offset: 1,
                                color: '#61A0A8'
                            }]), "transparent"],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 75,
                                name: '收款总额监控',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '收款总额监控',
                                        textStyle: {
                                            color: '#61A0A8',
                                            fontSize: 16
                                        }
                                    }
                                }
                            }, {
                                value: 25,
                                name: '%',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '\n' + this.salesmanStatisticsList.nameC,
                                        textStyle: {
                                            color: '#61A0A8',
                                            fontSize: 20
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            name: '欠款总额监控',
                            type: 'pie',
                            radius: ['32%', '40%'],
                            center: ['75%', '75%'],
                            startAngle: 225,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 75,
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#D48265'
                                        }, {
                                            offset: 1,
                                            color: '#D48265'
                                        }]),
                                    }
                                },
                                name: '欠款总额监控',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '欠款总额监控',
                                        textStyle: {
                                            color: '#D48265',
                                            fontSize: 16
                                        }
                                    }
                                }
                            }, {
                                value: 25,
                                name: '%',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '\n' + this.salesmanStatisticsList.nameD,
                                        textStyle: {
                                            color: '#D48265',
                                            fontSize: 20
                                        }
                                    }
                                }
                            }]
                        }
                    ]
                })
            },
            drawLine12(){
                // 基于准备好的dom，初始化echarts实例
                let chart412 = echarts.init(document.getElementById('chart412'))
                // 绘制图表
                chart412.setOption({
                    title: { text: '部门业绩排行榜',left: 'center' },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} <br/> " + '业绩：' + "{c}"
                    },
                    grid: {
                        left: 60,
                        containLabel: true
                    },
                    xAxis: {
                        bottom: 20,
                        type: 'category',
                        data: this.deptList
                    },
                    yAxis: {
                        type:'value',
                    },
                    series: [{
                        name: '合同金额',
                        type: 'bar',
                        data: this.deptData
                    }]
                });
            },
            drawLine13(){
                // 基于准备好的dom，初始化echarts实例
                let chart413 = echarts.init(document.getElementById('chart413'))
                // 绘制图表
                chart413.setOption({
                    title: { text: '个人业绩排行榜',left: 'center' },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} <br/> " + '业绩：' + "{c}"
                    },
                    grid: {
                        left: 60,
                        containLabel: true
                    },
                    xAxis: {
                        bottom: 20,
                        type: 'category',
                        data: this.personList
                    },
                    yAxis: {
                        type:'value',
                        boundaryGap: [0, 0.01]
                    },
                    series: [{
                        name: '合同金额',
                        type: 'bar',
                        data: this.personData
                    }]
                });
            },
            search(){
                const _this = this
                if(!this.searchList.department && this.searchList.mechanism){
                    _this.$options.methods.loaddeptList.bind(_this)()
                }
                if(!this.searchList.yearMonth && this.searchList.year){
                    _this.rangedisabled = true
                    _this.monthList = [
                        {id:'-01',label:'一月'},{id:'-02',label:'二月'},{id:'-03',label:'三月'},{id:'-04',label:'四月'},{id:'-05',label:'五月'},{id:'-06',label:'六月'},
                        {id:'-07',label:'七月'},{id:'-08',label:'八月'},{id:'-09',label:'九月'},{id:'-10',label:'十月'},{id:'-11',label:'十一月'},{id:'-12',label:'十二月'},
                    ]
                }
                _this.$options.methods.searchtwo.bind(_this)()
                
            },
            searchtwo(){
                const _this = this

                if(_this.index == 1){
                    _this.$options.methods.loadcusStatistics.bind(_this)()
                }else if(_this.index == 2){
                    _this.$options.methods.loadoppForecast.bind(_this)()
                }else if(_this.index == 3){
                    _this.$options.methods.loadoppStage.bind(_this)()
                }else if(_this.index == 4){
                    _this.$options.methods.loadoppLose.bind(_this)()
                }else if(_this.index == 5){
                    _this.$options.methods.loadoppNumber.bind(_this)()
                }else if(_this.index == 6){
                    _this.$options.methods.loadagreeReport.bind(_this)()
                }else if(_this.index == 7){
                    _this.$options.methods.loadagreePayment.bind(_this)()
                }else if(_this.index == 8){
                    _this.$options.methods.loadagreeCycler.bind(_this)()
                }else if(_this.index == 9){
                    _this.$options.methods.loadworkIncrease.bind(_this)()
                }else if(_this.index == 10){
                    _this.$options.methods.loadtargetCompletion.bind(_this)()
                }else if(_this.index == 11){
                    _this.$options.methods.loadsalesman.bind(_this)()
                }else if(_this.index == 12){
                    _this.$options.methods.loaddeptrank.bind(_this)()
                }else if(_this.index == 13){
                    _this.$options.methods.loadpersonrank.bind(_this)()
                }
            },
            reset(){
                this.searchList = {mechanism:null,department:null,year:null,yearMonth:null,startTime:null,endTime:null,yearrange:''}
                this.yeardisabled = false
                this.rangedisabled = false
                this.monthList = []
                this.deptnameData = []
            },
            datepick(val){
                this.yeardisabled = true
                if(val){
                    this.searchList.startTime = val[0]
                    this.searchList.endTime = val[1]
                }else{
                    this.searchList.startTime = ''
                    this.searchList.endTime = ''
                }
                this.$options.methods.searchtwo.bind(this)()
            }
        }
    }
</script>
<style>
    .report_b{
        padding: 10px;
    }
    .null_c{
        width:100%;
        height: 100%;
        font-size: 24px;
        text-align: center;
        color:#919191;
        position: relative;
    }
    .null_c span{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .report_radio{
        margin: 0 25px;
    }
</style>
