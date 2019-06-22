<template>
    <div id="oppCharts_c" class="oppCharts_c" :class="{'charts-collapse':collapse}" v-show="collapse5">
        <div class="oppCharts_b">
            <div class="oppCharts_b_c">
                <el-progress type="circle" :percentage="rate"></el-progress>
            </div>
            <div class="oppCharts_b_c">
                <div id="chart015" :style="{width: '300px', height: '300px'}"></div>
            </div>
            <div class="oppCharts_b_c">
                <div id="chart016" :style="{width: '300px', height: '300px'}"></div>
            </div>
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
                return store.state.oppChartsData.id
            },
        },
        data() {
            return {
                collapse: false,
                collapse5: false,
                
                rate:null,
                cycle:[],
                stageAmount:[],
                amounts:[],
                weekAmount:[],

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
                let oppChartsData = this.$store.state.oppChartsData
                this.rate = null
                this.cycle = []
                this.stageAmount = []
                this.amounts = []
                this.weekAmount = []
                
                if(oppChartsData){
                    // console.log(oppChartsData)
                    // 目标达成率和预测周期
                    this.rate = oppChartsData.rateAndCycle.achievement_rate
                    this.cycle.push(
                        {name:'预计7天成交金额',value:oppChartsData.rateAndCycle.day7},
                        {name:'预计15天成交金额',value:oppChartsData.rateAndCycle.day15},
                        {name:'预计30天成交金额',value:oppChartsData.rateAndCycle.day30},
                    )
                    // 各个商机阶段的预计成交金额
                    oppChartsData.stageAmount.forEach(a => {
                        this.stageAmount.push({name:a.step_name,value:a.proportion})
                    });
                    // // 商机完成金额、预计成交金额、失败金额
                    // oppChartsData.amounts.forEach(a => {
                    //     this.stateData.push({name:a.typeName,value:a.num})
                    // });
                    // // 本月每周预计成交金额
                    // oppChartsData.weekAmount.forEach(a => {
                    //     this.stateData.push({name:a.typeName,value:a.num})
                    // });
                }
                this.$options.methods.drawLine.bind(this)()
                
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let chart015 = echarts.init(document.getElementById('chart015'))
                let chart016 = echarts.init(document.getElementById('chart016'))
                
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
        width: calc(100% - 197px);
        height: calc(100% - 246px);
        margin-right: 80px;
        background-color: #fdfeff;
        z-index: 999;
        overflow-y: overlay
    }
    .oppCharts_b{
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
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
    .charts-collapse{
        left: 80px;
        width: calc(100% - 112px);
    }
</style>



