<template>
    <div id="cluecharts_c" class="cluecharts_c" :class="{'charts-collapse':collapse}" v-show="collapse3">
        <div class="cluecharts_b">
            <div class="cluecharts_b_c">
                <div id="chart001" :style="{width: '300px', height: '300px'}"></div>
            </div>
            <div class="cluecharts_b_c">
                <div id="chart002" :style="{width: '300px', height: '300px'}"></div>
            </div>
            <div class="cluecharts_b_c">
                <div id="chart003" :style="{width: '300px', height: '300px'}"></div>
            </div>
            <div class="cluecharts_b_c">
                <div id="chart004" :style="{width: '300px', height: '300px'}"></div>
            </div>
            <div class="cluecharts_b_c">
                <div id="chart005" :style="{width: '300px', height: '300px'}"></div>
            </div>
            <div class="cluecharts_b_c">
                <div id="chart006" :style="{width: '300px', height: '300px'}"></div>
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
                return store.state.clueChartsData
            },
        },
        data() {
            return {
                collapse: false,
                collapse3: false,

                stateData:[],
                sourceData:[],
                industryData:[],
                countryData:[],
                enterpriseScaleData:[],
                yearData:[],
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            bus.$on('collapse3', msg => {
                this.collapse3 = msg;
            })
        },
        mounted(){
            // this.loadChart()
        },
        watch:{
            loadData(nv,ov){
                if(this.$store.state.clueChartsData){
                    this.loadChart()
                }
            },
        },
        methods:{
            loadChart(){
                const _this = this
                let clueChartsData = this.$store.state.clueChartsData
                this.stateData = []
                this.sourceData = []
                this.industryData = []
                this.countryData = []
                this.enterpriseScaleData = []
                this.yearData = []
                
                if(clueChartsData){
                    clueChartsData.state.forEach(a => {
                        this.stateData.push({name:a.typeName,value:a.num})
                    });//线索状态
                    clueChartsData.source.forEach(b => {
                        this.sourceData.push({name:b.typeName,value:b.num})
                    });//线索来源
                    clueChartsData.industry.forEach(c => {
                        this.industryData.push({name:c.typeName,value:c.num})
                    });//行业
                    clueChartsData.country.forEach(d => {
                        this.countryData.push({name:d.typeName,value:d.num})
                    });//城市区域
                    clueChartsData.enterpriseScale.forEach(e => {
                        this.enterpriseScaleData.push({name:e.typeName,value:e.num})
                    });//规模
                    clueChartsData.year.forEach(g => {
                        this.yearData.push({name:g.typeName,value:g.num})
                    });//成立时间
                }
                this.$options.methods.drawLine.bind(this)()
                
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let chart001 = echarts.init(document.getElementById('chart001'))
                let chart002 = echarts.init(document.getElementById('chart002'))
                let chart003 = echarts.init(document.getElementById('chart003'))
                let chart004 = echarts.init(document.getElementById('chart004'))
                let chart005 = echarts.init(document.getElementById('chart005'))
                let chart006 = echarts.init(document.getElementById('chart006'))
                //线索状态
                chart001.setOption({
                    title: {
                        text: '线索状态', // 标题文本
                        left: 'center',
                        top: 10
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a}：" + "{b} <br/> " + '数量：' + "{c}"
                    },
                    series : [{
                        name:'线索状态',  // 提示框标题
                        type: 'pie',
                        radius : '60%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: this.stateData,// 扇形区域数据
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                });
                //线索来源
                chart002.setOption({
                    title: {
                        text: '线索来源', // 标题文本
                        left: 'center',
                        top: 10
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a}：" + "{b} <br/> " + '数量：' + "{c}"
                    },
                    series : [{
                        name:'线索来源',  // 提示框标题
                        type: 'pie',
                        radius : '60%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: this.sourceData,// 扇形区域数据
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                });
                //行业
                chart003.setOption({
                    title: {
                        text: '行业', // 标题文本
                        left: 'center',
                        top: 10
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a}：" + "{b} <br/> " + '数量：' + "{c}"
                    },
                    series : [{
                        name:'行业',  // 提示框标题
                        type: 'pie',
                        radius : '60%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: this.industryData,// 扇形区域数据
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                });
                //城市区域
                chart004.setOption({
                    title: {
                        text: '城市区域', // 标题文本
                        left: 'center',
                        top: 10
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a}：" + "{b} <br/> " + '数量：' + "{c}"
                    },
                    series : [{
                        name:'城市区域',  // 提示框标题
                        type: 'pie',
                        radius : '60%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: this.countryData,// 扇形区域数据
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                });
                //规模
                chart005.setOption({
                    title: {
                        text: '规模', // 标题文本
                        left: 'center',
                        top: 10
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a}：" + "{b} <br/> " + '数量：' + "{c}"
                    },
                    series : [{
                        name:'规模',  // 提示框标题
                        type: 'pie',
                        radius : '60%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: this.enterpriseScaleData,// 扇形区域数据
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                });
                //成立时间
                chart006.setOption({
                    title: {
                        text: '成立时间', // 标题文本
                        left: 'center',
                        top: 10
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a}：" + "{b} <br/> " + '数量：' + "{c}"
                    },
                    series : [{
                        name:'成立时间',  // 提示框标题
                        type: 'pie',
                        radius : '60%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: this.yearData,// 扇形区域数据
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
    #cluecharts_c {    
        animation: bounceInRight;/*动画名称*/  
        animation-duration: .5s;/*动画持续时间*/  
        -webkit-animation:bounceInRight .5s;/*针对webkit内核*/  
    } 
    .cluecharts_c{
        position: fixed;
        left: 165px;
        top: 256px;
        width: calc(100% - 197px);
        height: calc(100% - 260px);
        margin-right: 80px;
        background-color: #fdfeff;
        z-index: 999;
    }
    .cluecharts_b{
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center
    }
    .cluecharts_b .cluecharts_b_c{
        flex: 0 0 calc(33% - 10px);
        height: calc(50% - 10px);
        margin: 5px;
        border-right: 1px solid #dddddd;
        border-top: 1px solid #dddddd
    }
    .cluecharts_b .cluecharts_b_c > div{
        margin:0 auto
    }
    .charts-collapse{
        left: 80px;
        width: calc(100% - 112px);
    }
</style>



