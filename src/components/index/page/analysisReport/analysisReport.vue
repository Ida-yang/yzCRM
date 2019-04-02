<template>
    <!-- 基础设置页面 -->
    <div class="contentall">
        <div class="setleftcontent">
            <ul class="namecontent">
                <li v-for="item in nameList" :key="item.index" :value="item.name" :class="{actived:item.isActive}" @click="showTableval(item)">{{item.name}}</li>
            </ul>
        </div>
        <div class="centercontent"></div>
        <div class="setrightcontent" v-show="item.isActive" v-for="item in nameList" :key="item.index">
            <div class="checkform" v-if="item.index == 1">
                <div class="searchList" style="width:100%;">
                    <span class="nameList">年份：</span>
                    <el-date-picker v-model="searchList.year" type="year" placeholder="选择年份"></el-date-picker>
                    <span class="nameList">月份：</span>
                    <el-date-picker v-model="searchList.yearMonth" type="month" placeholder="选择月份"></el-date-picker>
                </div>
                <div class="searchList" style="width:100%;">
                    <span class="nameList">机构：</span>
                    <el-select v-model="searchList.mechanism" placeholder="请选择">
                        <el-option v-for="item in mechanismData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="radioList" v-if="showradioList">
                    <el-radio-group v-model="searchList.label">
                        <span class="nameList">部门：</span>
                        <el-radio v-for="item in deptnameData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="checkform" v-if="item.index == 2">
                {{item.name}}
            </div>
            <div class="checkform" v-if="item.index == 3">
                {{item.name}}
            </div>
            <div class="checkform" v-if="item.index == 4">
                {{item.name}}
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
        <div class="null_c"><span>请点击左边菜单栏查看报表</span></div>
    </div>
</template>
<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    let echarts = require('echarts/lib/echarts')
    require('echarts/lib/chart/bar')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')

    export default {
        name:'analysisReport',
        store,
        data(){
            return {
                nameList:[
                    {col:'amount',index:1,name:'合同报表',id:'chart1',isActive:false},
                    {col:'parentname',index:2,name:'商机报表',id:'chart2',isActive:false},
                    {col:'contractNum',index:3,name:'部门业绩排行榜',id:'chart3',isActive:false},
                    {col:'deptname',index:4,name:'个人业绩排行榜',id:'chart4',isActive:false},
                ],

                bar_style:{
                    width:'',
                    height:''
                },

                searchList:{
                    mechanism:null,
                    department:null,
                    year:null,
                    yearMonth:null,
                },
                showradioList:false,
                mechanismData:[],
                deptnameData:[],

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
                oppList:[],
                oppcolList:[],

                deptrankList:[],
                deptData:[],
                deptList:[],
                deptcolList:[
                    {index:1,name:'排行',col:'sort',width:'80'},
                    {index:2,name:'机构',col:'parentname',width:'80'},
                    {index:3,name:'部门',col:'deptname',width:'80'},
                    {index:4,name:'合同数量',col:'contractNum',width:'90'},
                    {index:5,name:'合同金额',col:'amount',width:'90'},
                    {index:6,name:'平均金额',col:'amount',width:'90'},
                ],

                personrankList:[],
                personData:[],
                personList:[],
                personcolList:[
                    {index:1,name:'排行',col:'sort',width:'80'},
                    {index:2,name:'职员',col:'private_employee',width:'80'},
                    {index:3,name:'机构',col:'parentname',width:'80'},
                    {index:4,name:'部门',col:'deptname',width:'80'},
                    {index:5,name:'合同数量',col:'contractNum',width:'90'},
                    {index:6,name:'合同金额',col:'amount',width:'90'},
                    {index:7,name:'平均金额',col:'amount',width:'90'},
                ],

                tableData:[],
                colList:[],

            }
        },
        mounted(){
            this.loadwidth()
            this.loadOppStep()
        },
        activated(){
            this.loadwidth()
        },
        methods:{
            loadwidth(){
                let widths = document.documentElement.offsetWidth || document.body.offsetWidth
                let heights = document.documentElement.offsetHeight || document.body.offsetHeight
                this.bar_style.width = widths * 0.7 +'px'
                this.bar_style.height = heights * 0.6 +'px'
                console.log(this.bar_style.width,this.bar_style.height)
            },
            loadOppStep(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'addstep/selectAddstep.do?cId='+_this.$store.state.iscId
                }).then(function(res){
                    let data = res.data.map.addsteps
                    _this.oppcolList = [
                        {index:-5,name:'职员',col:'parentname'},
                        {index:-4,name:'机构',col:'deptname'},
                        {index:-3,name:'部门',col:'contractNum'},
                        {index:-2,name:'客户数量',col:'amount'},
                    ]
                    data.forEach(el => {
                        // console.log(el.step_name)
                        _this.oppcolList.push({index:el.step_id,name:el.step_name,col:el.step_probability},)
                    });
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadagreeReport(){
                const _this = this
                let qs = require('querystring')
                _this.tableData = _this.agreeReportList
                _this.colList = _this.agreecolList
                _this.drawLine1()
            },
            loadoppReport(){
                const _this = this
                let qs = require('querystring')
                _this.tableData = _this.oppReportList
                _this.colList = _this.oppcolList
                _this.drawLine2()
            },
            loaddeptrank(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.year = this.searchList.year
                data.yearMonth = this.searchList.yearMonth
                data.secondid = this.searchList.department

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getContractByDept.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res.data)
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
                data.yearMonth = this.searchList.yearMonth
                data.secondid = this.searchList.department

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getContractByPersonal.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res.data)
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
                // this.index = val.index
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
</style>
