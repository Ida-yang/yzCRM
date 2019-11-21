<template>
    <!-- 商业智能（报表）页面 -->
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
                    <span class="nameList">时间段：</span>
                    <el-date-picker v-model="searchList.yearrange" :disabled="rangedisabled" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" @change="datepick"></el-date-picker>
                </div>
                <div class="radioList report_radio">
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

                oppReportList:[],
                oppData:[],
                oppcolList:[],

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
                // val.isActive = !val.isActive;
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
                this.drawLine1()
            },
            loadoppForecast(){
                this.drawLine2()
            },
            loadoppStage(){
                this.drawLine3()
            },
            loadoppLose(){
                this.drawLine4()
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
                this.drawLine7()
            },
            loadagreeCycler(){
                this.drawLine8()
            },
            loadworkIncrease(){
                this.drawLine9()
            },
            loadtargetCompletion(){
                this.drawLine10()
            },
            loadsalesman(){
                this.drawLine11()
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
                });
            },
            drawLine2(){
                // 基于准备好的dom，初始化echarts实例
                let chart402 = echarts.init(document.getElementById('chart402'))
                // 绘制图表
                chart402.setOption({
                    
                });
            },
            drawLine3(){
                // 基于准备好的dom，初始化echarts实例
                let chart403 = echarts.init(document.getElementById('chart403'))
                // 绘制图表
                chart403.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data:['蒸发量','降水量','平均温度']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '水量',
                            min: 0,
                            max: 250,
                            interval: 50,
                            axisLabel: {
                                formatter: '{value} ml'
                            }
                        },
                        {
                            type: 'value',
                            name: '温度',
                            min: 0,
                            max: 25,
                            interval: 5,
                            axisLabel: {
                                formatter: '{value} °C'
                            }
                        }
                    ],
                    series: [
                        {
                            name:'蒸发量',
                            type:'bar',
                            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                        },
                        {
                            name:'降水量',
                            type:'bar',
                            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                        },
                        {
                            name:'平均温度',
                            type:'line',
                            yAxisIndex: 1,
                            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                        }
                    ]
                });
            },
            drawLine4(){
                // 基于准备好的dom，初始化echarts实例
                let chart404 = echarts.init(document.getElementById('chart404'))
                // 绘制图表
                chart404.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)"
                    },
                    // legend: {
                    //     orient: 'vertical',
                    //     x: 'left',
                    //     data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
                    // },
                    series: [
                        {
                            name:'',
                            type:'pie',
                            // selectedMode: 'single',
                            radius: [0, '30%'],
                            color:['#ffffff'],

                            label: {
                                normal: {
                                    position: 'inner',
                                    textStyle: {
                                        color: '#000'  // 改变标示文字的颜色
                                    }
                                }

                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:679, name:'营销广告'}
                            ]
                        },
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['30%', '55%'],
                            data:[
                                {value:335, name:'直达'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1048, name:'百度'},
                                {value:251, name:'谷歌'},
                                {value:147, name:'必应'},
                                {value:102, name:'其他'}
                            ]
                        }
                    ]
                });
            },
            drawLine5(){
                // 基于准备好的dom，初始化echarts实例
                let chart405 = echarts.init(document.getElementById('chart405'))
                // 绘制图表
                chart405.setOption({
                    title : { text: '商机漏斗', left: 'center' },
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
            drawLine7(){},
            drawLine8(){},
            drawLine9(){
                // 基于准备好的dom，初始化echarts实例
                let chart409 = echarts.init(document.getElementById('chart409'))
                // 绘制图表
                var colors = ['#5793f3', '#d14a61', '#675bba', '#53ac14'];
                chart409.setOption({
                    tooltip: {
                        trigger: 'none',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                formatter: function (params) {
                                    if(params.seriesData.length){
                                        console.log(params)
                                    }
                                    // return '降水量  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                }
                            }
                        }
                    },
                    legend: {
                        data:['2015 降水量', '2016 降水量', '2017 降水量', '2018 降水量']
                    },
                    grid: {
                        top: 70,
                        bottom: 50
                    },
                    xAxis: {
                        type: 'category',
                        data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name:'2015 降水量',
                            type:'line',
                            smooth: true,
                            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                        },
                        {
                            name:'2016 降水量',
                            type:'line',
                            smooth: true,
                            data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
                        },
                        {
                            name:'2017 降水量',
                            type:'line',
                            smooth: true,
                            data: [4.3, 4.9, 18.1, 23.7, 38.3, 54.2, 191.8, 42.6, 39.4, 18.4, 8.3, 1.6]
                        },
                        {
                            name:'2018 降水量',
                            type:'line',
                            smooth: true,
                            data: [3.3, 5.1, 12.5, 21.1, 41.9, 63.8, 261.3, 89.6, 38.9, 25.6, 12.4, 0.9]
                        }
                    ]
                })
            },
            drawLine10(){
                // 基于准备好的dom，初始化echarts实例
                let chart410 = echarts.init(document.getElementById('chart410'))
                // 绘制图表
                var colors = ['#5793f3', '#d14a61', '#675bba', '#53ac14'];
                chart410.setOption({
                    tooltip: {
                        trigger: 'none',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    legend: {
                        data:['2015 降水量', '2016 降水量', '2017 降水量']
                    },
                    grid: {
                        top: 70,
                        bottom: 50
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                onZero: false,
                                lineStyle: {
                                    color: colors[1]
                                }
                            },
                            axisPointer: {
                                label: {
                                    formatter: function (params) {
                                        return '降水量  ' + params.value
                                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                    }
                                }
                            },
                            data: ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12"]
                        },
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                onZero: false,
                                lineStyle: {
                                    color: colors[0]
                                }
                            },
                            axisPointer: {
                                label: {
                                    formatter: function (params) {
                                        return '降水量  ' + params.value
                                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                    }
                                }
                            },
                            data: ["2015-1", "2015-2", "2015-3", "2015-4", "2015-5", "2015-6", "2015-7", "2015-8", "2015-9", "2015-10", "2015-11", "2015-12"]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name:'2015 降水量',
                            type:'line',
                            xAxisIndex: 1,
                            smooth: true,
                            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                        },
                        {
                            name:'2016 降水量',
                            type:'line',
                            smooth: true,
                            data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
                        },
                        {
                            name:'2017 降水量',
                            type:'line',
                            smooth: true,
                            data: [4.3, 4.9, 18.1, 23.7, 38.3, 54.2, 191.8, 42.6, 39.4, 18.4, 8.3, 1.6]
                        },
                    ]
                })
            },
            drawLine11(){
                // 基于准备好的dom，初始化echarts实例
                let chart411 = echarts.init(document.getElementById('chart411'))
                // 绘制图表
                chart411.setOption({
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['利润', '支出', '收入']
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
                            data : ['周一','周二','周三','周四','周五','周六','周日']
                        }
                    ],
                    series : [
                        {
                            name:'利润',
                            type:'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data:[200, 170, 240, 244, 200, 220, 210]
                        },
                        {
                            name:'收入',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                            data:[320, 302, 341, 374, 390, 450, 420]
                        },
                        {
                            name:'支出',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'left'
                                }
                            },
                            data:[-120, -132, -101, -134, -190, -230, -210]
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
