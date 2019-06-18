<template>
    <div id="customercharts_c" class="customercharts_c" :class="{'charts-collapse':collapse}" v-show="collapse4">
        <div class="customercharts_b">
            <div class="customercharts_b_c">
                <div id="chart008" :style="{width: '300px', height: '300px'}"></div>
            </div>
            <div class="customercharts_b_c">
                <div id="chart009" :style="{width: '300px', height: '300px'}"></div>
            </div>
            <div class="customercharts_b_c">
                <div id="chart010" :style="{width: '300px', height: '300px'}"></div>
            </div>
            <div class="customercharts_b_c">
                <div id="chart011" :style="{width: '300px', height: '300px'}"></div>
            </div>
            <div class="customercharts_b_c">
                <div id="chart012" :style="{width: '300px', height: '300px'}"></div>
            </div>
            <div class="customercharts_b_c">
                <div id="chart013" :style="{width: '300px', height: '300px'}"></div>
            </div>
            <div class="customercharts_b_c">
                <div id="chart014" :style="{width: '300px', height: '300px'}"></div>
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
                return store.state.customerChartsData
            },
        },
        data() {
            return {
                collapse: false,
                collapse4: false,

                stateData:[],
                sourceData:[],
                industryData:[],
                countryData:[],
                enterpriseScaleData:[],
                yearData:[],
                typeData:[],

            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            bus.$on('collapse4', msg => {
                this.collapse4 = msg;
            })
        },
        mounted(){
            // this.loadChart()
        },
        watch:{
            loadData(nv,ov){
                if(this.$store.state.customerChartsData){
                    this.loadChart()
                }
            },
        },
        methods:{
            loadChart(){
                const _this = this
                let customerChartsData = this.$store.state.customerChartsData
                this.stateData = []
                this.sourceData = []
                this.industryData = []
                this.countryData = []
                this.enterpriseScaleData = []
                this.yearData = []
                this.typeData = []
                
                if(customerChartsData){
                    customerChartsData.state.forEach(a => {
                        console.log(a)
                        this.stateData.push({name:a.typeName,value:a.num})
                    });//客户状态
                    customerChartsData.source.forEach(b => {
                        this.sourceData.push({name:b.typeName,value:b.num})
                    });//客户来源
                    customerChartsData.industry.forEach(c => {
                        this.industryData.push({name:c.typeName,value:c.num})
                    });//行业
                    customerChartsData.country.forEach(d => {
                        this.countryData.push({name:d.typeName,value:d.num})
                    });//城市区域
                    customerChartsData.enterpriseScale.forEach(e => {
                        this.enterpriseScaleData.push({name:e.typeName,value:e.num})
                    });//规模
                    customerChartsData.year.forEach(g => {
                        this.yearData.push({name:g.typeName,value:g.num})
                    });//成立时间
                    customerChartsData.type.forEach(g => {
                        this.typeData.push({name:g.typeName,value:g.num})
                    });//客户级别
                }
                this.$options.methods.drawLine.bind(this)()
                
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let chart008 = echarts.init(document.getElementById('chart008'))
                let chart009 = echarts.init(document.getElementById('chart009'))
                let chart010 = echarts.init(document.getElementById('chart010'))
                let chart014 = echarts.init(document.getElementById('chart014'))
                let chart011 = echarts.init(document.getElementById('chart011'))
                let chart012 = echarts.init(document.getElementById('chart012'))
                let chart013 = echarts.init(document.getElementById('chart013'))
                //客户状态
                chart008.setOption({
                    title: {
                        text: '客户状态', // 标题文本
                        left: 'center',
                        top: 10
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a}：" + "{b} <br/> " + '数量：' + "{c}"
                    },
                    series : [{
                        name:'客户状态',  // 提示框标题
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
                //客户来源
                chart009.setOption({
                    title: {
                        text: '客户来源', // 标题文本
                        left: 'center',
                        top: 10
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a}：" + "{b} <br/> " + '数量：' + "{c}"
                    },
                    series : [{
                        name:'客户来源',  // 提示框标题
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
                chart010.setOption({
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
                chart014.setOption({
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
                chart011.setOption({
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
                chart012.setOption({
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
                //客户级别
                chart013.setOption({
                    title: {
                        text: '客户级别', // 标题文本
                        left: 'center',
                        top: 10
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a}：" + "{b} <br/> " + '数量：' + "{c}"
                    },
                    series : [{
                        name:'客户级别',  // 提示框标题
                        type: 'pie',
                        radius : '60%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: this.typeData,// 扇形区域数据
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
    #customercharts_c {    
        animation: bounceInRight;/*动画名称*/  
        animation-duration: .5s;/*动画持续时间*/  
        -webkit-animation:bounceInRight .5s;/*针对webkit内核*/  
    } 
    .customercharts_c{
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
    .customercharts_b{
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        /* justify-content: center; */
        align-items: center;
    }
    .customercharts_b .customercharts_b_c{
        flex: 0 0 calc(33% - 10px);
        height: 300px;
        margin: 5px;
        border-right: 1px solid #dddddd;
        border-top: 1px solid #dddddd
    }
    .customercharts_b .customercharts_b_c > div{
        margin:0 auto
    }
    .charts-collapse{
        left: 80px;
        width: calc(100% - 112px);
    }
</style>



