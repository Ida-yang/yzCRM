<template>
    <div id="oppCharts_c" class="oppCharts_c" :class="{'charts-collapse':collapse}" v-show="collapse5">
        <div class="oppCharts_b">
            <div class="oppCharts_b_c">
                <div class="rateEntry">目标占比</div>
                <el-progress type="circle" :percentage="rate" :stroke-width="8"></el-progress>
                <div>
                    <span style="display:inline-block;width:45%;text-align:center">目标金额：{{targetAmount}}</span>
                    <span style="display:inline-block;width:45%;text-align:center">已完成金额：{{transactionAmount}}</span>
                </div>
            </div>
            <div class="oppCharts_b_c">
                <div id="chart015" :style="{width: '100%', height: '300px'}"></div>
            </div>
            <div class="oppCharts_b_c">
                <div id="chart016" :style="{width: '100%', height: '300px'}"></div>
            </div>
        </div>
        <div class="oppCharts_t">
            <!-- <div class="oppEntry">当月预计成交金额分析</div> -->
            <el-table :data="amounts" border stripe style="width:100%;">
                <el-table-column prop="title" label="" />
                <el-table-column prop="target" label="金额目标" />
                <el-table-column prop="opportunity_achievement" label="预计当月成交金额" />
                <el-table-column prop="achievementProportion" label="占比" />
                <el-table-column prop="deal" label="当月已成交" />
                <el-table-column prop="dealProportion" label="占比" />
                <el-table-column prop="difference" label="差额" />
                <el-table-column prop="fail" label="失败" />
            </el-table>
        </div>
        <div class="oppCharts_t">
            <!-- <div class="oppEntry">当月商机阶段占比分析（阶段越往后且金额越大越有利）</div> -->
             <el-table :data="moneyList" border stripe style="width:100%;">
                 <el-table-column prop="title" label="" />
                <template v-for="item in colList">
                    <el-table-column :label="item.name" :prop="item.col" :key="item.index"></el-table-column>
                </template>
            </el-table>
        </div>
        <div class="oppCharts_t">
            <!-- <div class="oppEntry">当月商机成交周期分析（周期越往前且金额越大越有利）</div> -->
            <!-- <table class="el-table" style="width:1400px" cellspacing="0"> -->
            <table class="el-table" style="width:100%;" cellspacing="0">
                <tr>
                    <th style=""></th>
                    <th v-for="(item,i) in weekAmount" :key="i" style="padding-left:10px;">{{item.title}}</th>
                </tr>
                <tr>
                    <td style="padding-left:10px;">预计成交金额</td>
                    <td v-for="(item,i) in weekAmount" :key="i" style="padding-left:10px;">{{item.opportunity_achievement}}</td>
                </tr>
                <tr>
                    <td style="padding-left:10px;">与预计占比</td>
                    <td v-for="(item,i) in weekAmount" :key="i" style="padding-left:10px;font-weight:bold">{{item.estimateProportions}}</td>
                </tr>
                <tr>
                    <td style="padding-left:10px;">与目标占比</td>
                    <td v-for="(item,i) in weekAmount" :key="i" style="padding-left:10px;">{{item.estimateTargetProportions}}</td>
                </tr>
                <tr>
                    <td style="padding-left:10px;">实际成交</td>
                    <td v-for="(item,i) in weekAmount" :key="i" style="padding-left:10px;">{{item.deal}}</td>
                </tr>
                <tr>
                    <td style="padding-left:10px;">与实际占比</td>
                    <td v-for="(item,i) in weekAmount" :key="i" style="padding-left:10px;font-weight:bold">{{item.actualProportion}}</td>
                </tr>
                <tr>
                    <td style="padding-left:10px;">与目标占比</td>
                    <td v-for="(item,i) in weekAmount" :key="i" style="padding-left:10px;">{{item.actualTargetProportion}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import store from '../../store/store'
    import axios from 'axios'
    import bus from './bus';
    import qs from 'qs'
    let echarts = require('echarts/lib/echarts')
    require('echarts/lib/chart/pie')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')

    export default {
        store,
        computed:{
            loadData(){
                return store.state.oppChartsData
            },
        },
        data() {
            return {
                collapse: false,
                collapse5: false,
                
                rate:0,
                targetAmount:null,
                transactionAmount:null,
                cycle:[],
                stageAmount:[],
                amounts:[],
                weekAmount:[],

                moneyList:[],
                colList:[],

            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            bus.$on('collapse5', msg => {
                this.collapse5 = msg;
            })
        },
        watch:{
            loadData(nv,ov){
                if(this.$store.state.oppChartsData){
                    this.loadChart()
                }
            },
        },
        methods:{
            loadChart(){
                const _this = this
                let qs = require('querystring')
                let data = this.$store.state.oppChartsData
                this.cycle = []
                this.stageAmount = []
                this.colList = []
                this.moneyList = []

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/opportunityPredictionPeriod.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.rate = res.data.achievement_rate
                    _this.cycle.push(
                        {name:'预计7天成交金额',value:res.data.day7},
                        {name:'预计15天成交金额',value:res.data.day15},
                        {name:'预计本月成交金额',value:res.data.day30},
                    )
                    _this.$options.methods.drawLine1.bind(_this)()
                }).catch(function(err){
                });
                // 各个商机阶段的预计成交金额
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/opportunitySumAchievement.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    res.data.forEach(a => {
                        let proportion = parseFloat(a.proportion)
                        _this.stageAmount.push({name:a.step_name,value:proportion})
                        _this.colList.push({index:a.sort,name:a.step_name,col:a.col},)
                    });
                    _this.$options.methods.drawLine2.bind(_this)()
                }).catch(function(err){
                });
                // 商机完成金额、预计成交金额、失败金额
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/opportunityStageMoney.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.amounts = res.data.opportunityStageMoney
                    _this.amounts.forEach(el => {
                        el.title = '金额'
                        _this.targetAmount = el.target
                        _this.transactionAmount = el.deal
                    });
                    _this.moneyList.push(res.data.money)
                    _this.moneyList.push(res.data.moneyProportion)
                    _this.moneyList.push(res.data.num)
                    _this.moneyList.push(res.data.numProportion)
                }).catch(function(err){
                });
                // // 本月每周预计成交金额
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/opportunityAchievementWeek.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.weekAmount = res.data
                }).catch(function(err){
                });
            },
            drawLine1(){
                // 基于准备好的dom，初始化echarts实例
                let chart015 = echarts.init(document.getElementById('chart015'))
                
                chart015.setOption({
                    title: {
                        text: '商机预测周期占比', // 标题文本
                        left: 'center',
                        top: 10
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a}：" + "{b} <br/> " + '占比：' + "{c}"
                    },
                    series : [{
                        name:'商机周期',  // 提示框标题
                        type: 'pie',
                        radius : '60%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: this.cycle,// 扇形区域数据
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                });
            },
            drawLine2(){
                // 基于准备好的dom，初始化echarts实例
                let chart016 = echarts.init(document.getElementById('chart016'))
                
                chart016.setOption({
                    title: {
                        text: '商机阶段占比', // 标题文本
                        left: 'center',
                        top: 10
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a}：" + "{b} <br/> " + '占比：' + "{c}"
                    },
                    series : [{
                        name:'商机阶段',  // 提示框标题
                        type: 'pie',
                        radius : '60%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: this.stageAmount,// 扇形区域数据
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                });
            },
        },
    }
</script>

<style scoped>
    @keyframes bounceInRight {
        from, 60%, 75%, 90%, to {animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);}
        0% {opacity: 0;transform: translate3d(3000px, 0, 0);}
        60% {opacity: 1;transform: translate3d(-25px, 0, 0);}
        75% {transform: translate3d(10px, 0, 0);}
        90% {transform: translate3d(-5px, 0, 0);}
        100% {opacity: 1;transform: none;}
    }
    @-webkit-keyframes bounceInRight {
        from, 60%, 75%, 90%, to {animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);}
        0% {opacity: 0;transform: translate3d(3000px, 0, 0);}
        60% {opacity: 1;transform: translate3d(-25px, 0, 0);}
        75% {transform: translate3d(10px, 0, 0);}
        90% {transform: translate3d(-5px, 0, 0);}
        100% {opacity: 1;transform: none;}
    }
    #oppCharts_c {    
        animation: bounceInRight;/*动画名称*/  
        animation-duration: .5s;/*动画持续时间*/  
        -webkit-animation:bounceInRight .5s;/*针对webkit内核*/  
    } 
    .oppCharts_c{
        position: fixed;
        left: 165px;
        top: 246px;
        width: calc(100% - 177px);
        height: calc(100% - 246px);
        margin-right: 20px;
        background-color: #fdfeff;
        z-index: 999;
        overflow-y: overlay
    }
    .oppCharts_b{
        width: 100%;
        height: 300px;
        display: flex;
        flex-wrap: wrap;
    }
    .oppCharts_t{
        width: 100%;
        margin-bottom: 20px;
    }
    .oppCharts_b .oppCharts_b_c{
        flex: 0 0 calc(33% - 10px);
        height: 300px;
        margin: 5px;
        border-right: 1px solid #dddddd;
        border-top: 1px solid #dddddd
    }
    .oppCharts_b .oppCharts_b_c > div{
        margin:0 auto
    }
    .oppCharts_b .oppCharts_b_c .el-progress--circle{
        margin-left: calc(50% - 63px);
        margin-top: 37px;
        margin-bottom: 30px;
    }
    .charts-collapse{
        left: 80px;
        width: calc(100% - 92px);
    }
    .oppEntry{
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        text-align: center;
        font-weight: bold;
        background-color: #f7f7f7;
        color: #1f2d3d
    }
    .rateEntry{
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        text-align: center;
        font-weight: bold;
    }
</style>



