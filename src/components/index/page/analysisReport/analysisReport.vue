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
                <el-button icon="el-icon-circle-close-outline" style="margin-left:55px;background:#20222a;color:#ffffff;" size="mini" @click="reset()">清空</el-button>
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
                <el-table
                    :data="tableData"
                    border
                    stripe
                    style="width:100%;text-align:center">
                    <template v-for="item in colList">
                        <el-table-column
                            :key="item.index"
                            :prop="item.col"
                            header-align="left"
                            align="left"
                            show-overflow-tooltip
                            :min-width="item.width"
                            :label="item.name">
                        </el-table-column>
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
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')

    export default {
        name:'analysisReport',
        store,
        data(){
            return {
                showTitle:true,

                nameList:[
                    {index:1,name:'合同报表',id:'chart1',isActive:false},
                    {index:2,name:'商机报表',id:'chart2',isActive:false},
                    {index:3,name:'部门业绩排行榜',id:'chart3',isActive:false},
                    {index:4,name:'个人业绩排行榜',id:'chart4',isActive:false},
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
                _this.drawLine1()
            },
            loadoppReport(){
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
                    data.forEach(el => {
                        _this.oppcolList.push({index:el.sort,name:el.step_name,col:el.col},)
                        _this.oppData.push({name:el.step_name,value:el.count})
                    });
                    _this.drawLine2()
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
                    _this.drawLine3()
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
                    _this.drawLine4()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //显示对应状态数表格数据
            showTableval(val){
                const _this = this
                let i = val.index
                this.showTitle = false
                this.index = val.index
                this.searchList = {mechanism:null,department:null,year:null,yearMonth:null,startTime:null,endTime:null,yearrange:''}
                this.yeardisabled = false
                this.rangedisabled = false
                this.monthList = []
                this.deptnameData = []
                this.nameList.forEach(function(obj){
                    obj.isActive = false;
                });
                val.isActive = !val.isActive;
                if(i == 1){
                    _this.$options.methods.loadagreeReport.bind(_this)()
                }else if(i == 2){
                    _this.$options.methods.loadoppReport.bind(_this)()
                }else if(i == 3){
                    _this.$options.methods.loaddeptrank.bind(_this)()
                }else if(i == 4){
                    _this.$options.methods.loadpersonrank.bind(_this)()
                }
            },
            drawLine1(){
                // 基于准备好的dom，初始化echarts实例
                let chart1 = echarts.init(document.getElementById('chart1'))
                // 绘制图表
                chart1.setOption({
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
            drawLine2(){
                // 基于准备好的dom，初始化echarts实例
                let chart2 = echarts.init(document.getElementById('chart2'))
                // 绘制图表
                chart2.setOption({
                    title : { text: '商机漏斗', left: 'center' },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b}<br>{a}：{c}"
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
                            // width: '40%',
                            minSize: '10%',
                            sort: 'none',
                            data:this.oppData
                        }
                    ]
                });
            },
            drawLine3(){
                // 基于准备好的dom，初始化echarts实例
                let chart3 = echarts.init(document.getElementById('chart3'))
                // 绘制图表
                chart3.setOption({
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
            drawLine4(){
                // 基于准备好的dom，初始化echarts实例
                let chart4 = echarts.init(document.getElementById('chart4'))
                // 绘制图表
                chart4.setOption({
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
                    _this.$options.methods.loadagreeReport.bind(_this)()
                }else if(_this.index == 2){
                    _this.$options.methods.loadoppReport.bind(_this)()
                }else if(_this.index == 3){
                    _this.$options.methods.loaddeptrank.bind(_this)()
                }else if(_this.index == 4){
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
        color:#8a8a8a;
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
