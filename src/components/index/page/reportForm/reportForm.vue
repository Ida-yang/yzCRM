<template>
    <div class="innerspace">
        <div class="head">
            <span>获客报表是基于已签约的客户从行业占比，省份分布，企业规模，成立时间等四个维度分析，从而推荐出最优的拓展省份区域。</span>
        </div>
        <div class="middles">
            <div class="middlebody">
                <div id="chart3" :style="{width: '500px', height: '400px'}"></div>
            </div>
            <div class="middlebody">
                <el-table
                    :data="industryData"
                    ref="multipleTable"
                    border
                    stripe
                    style="width:100%;text-align:center">
                    <el-table-column
                        prop="name"
                        header-align="left"
                        align="left"
                        label="行业"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="innerShare"
                        header-align="left"
                        align="left"
                        label="内部占比"
                        sortable>
                        <template slot-scope="scope">{{scope.row.innerShare}} %</template>
                    </el-table-column>
                    <el-table-column
                        prop="innerNum"
                        header-align="left"
                        align="left"
                        label="内部数量"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="countryShare"
                        header-align="left"
                        align="left"
                        label="全国占比"
                        sortable>
                        <template slot-scope="scope">{{scope.row.countryShare}} %</template>
                    </el-table-column>
                    <el-table-column
                        prop="countryNum"
                        header-align="left"
                        align="left"
                        min-width="90"
                        label="全国总数量"
                        sortable>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="middles">
            <div class="middlebody">
                <div id="chart4" :style="{width: '500px', height: '400px'}"></div>
            </div>
            <div class="middlebody">
                <el-table
                    :data="cityData"
                    ref="multipleTable"
                    border
                    stripe
                    style="width:100%;text-align:center">
                    <el-table-column
                        prop="name"
                        header-align="left"
                        align="left"
                        min-width="120"
                        label="省份"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        header-align="left"
                        align="left"
                        min-width="90"
                        label="数量"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="share"
                        header-align="left"
                        align="left"
                        min-width="90"
                        label="占比"
                        sortable>
                        <template slot-scope="scope">{{scope.row.share}} %</template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="middles">
            <div class="middlebody">
                <div id="chart1" :style="{width: '500px', height: '400px'}"></div>
            </div>
            <div class="middlebody">
                <el-table
                    :data="scaleData"
                    ref="multipleTable"
                    border
                    stripe
                    style="width:100%;text-align:center">
                    <el-table-column
                        prop="scale"
                        header-align="left"
                        align="left"
                        min-width="120"
                        label="公司规模"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="number"
                        header-align="left"
                        align="left"
                        min-width="90"
                        label="数量"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="proportion"
                        header-align="left"
                        align="left"
                        min-width="90"
                        label="占比"
                        sortable>
                        <template slot-scope="scope">{{scope.row.proportion}} %</template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="middles">
            <div class="middlebody">
                <div id="chart2" :style="{width: '500px', height: '400px'}"></div>
            </div>
            <div class="middlebody">
                <el-table
                    :data="yearsData"
                    ref="multipleTable"
                    border
                    stripe
                    style="width:100%;text-align:center">
                    <el-table-column
                        prop="years"
                        header-align="left"
                        align="left"
                        min-width="120"
                        label="年限"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        header-align="left"
                        align="left"
                        min-width="90"
                        label="数量"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="share"
                        header-align="left"
                        align="left"
                        min-width="90"
                        label="占比"
                        sortable>
                        <template slot-scope="scope">{{scope.row.share}} %</template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="foot">
            <el-table
                :data="tableData"
                ref="multipleTable"
                border
                stripe
                style="width:100%;text-align:center">
                <el-table-column
                    prop="industryName"
                    header-align="left"
                    align="left"
                    min-width="160"
                    label="目标客户定位推荐"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="cityName"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="省份"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="years"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="成立年限"
                    sortable>
                </el-table-column>
                <!-- <el-table-column
                    prop="scale"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="公司规模"
                    sortable>
                </el-table-column> -->
                <!-- <el-table-column
                    prop="capital"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="注册资金"
                    sortable>
                </el-table-column> -->
                <el-table-column
                    prop="result"
                    header-align="left"
                    align="left"
                    min-width="145"
                    label="当前省份保有量"
                    sortable>
                </el-table-column>
                <!-- <el-table-column
                    prop="sort"
                    header-align="left"
                    align="left"
                    min-width="90"
                    label="顺序"
                    sortable>
                </el-table-column> -->
                <el-table-column
                    prop="financing"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="已获得融资"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="list"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="已上市"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="phone"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="有电话"
                    sortable>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    import 'echarts/map/js/china.js';
    let echarts = require('echarts/lib/echarts')
    require('echarts/lib/chart/bar')
    require('echarts/lib/chart/pie')
    require('echarts/lib/chart/funnel')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')

    export default {
        name:'reportForm',
        store,
        computed:{
            tableData(){
                return store.state.reportFormList
            }
        },
        data(){
            return {
                msg:"报表",
                //行业占比
                industryData:[],
                industry:[],
                indata:[],
                //省份分布
                cityData:[],
                city:[],
                //公司规模
                scaleData:[
                    {scale:'1-49',number:'62',proportion:'5.01%'},                    
                    {scale:'50-99',number:'89',proportion:'5.01%'},                    
                    {scale:'100-199',number:'36',proportion:'5.01%'},                    
                    {scale:'200-499',number:'10',proportion:'5.01%'},                    
                    {scale:'500-999',number:'36',proportion:'5.01%'},                    
                    {scale:'1000-2999',number:'54',proportion:'5.01%'},                    
                    {scale:'3000-4999',number:'16',proportion:'5.01%'},                    
                    {scale:'5000以上',number:'5',proportion:'5.01%'},                  
                ],
                scale:[],
                scdata:[],
                //成立年限
                yearsData:[],
                years:[],
                yedata:[],
            }
        },
        // activated(){
        //     this.loadData()
        //     this.drawLine();
        // },
        mounted(){
            this.loadData()
        },
        methods:{
            loadData(){
                const _this = this;
                // let qs = require('querystring')
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'industryShare/selectIndustryShare.do?cId=' + _this.$store.state.iscId,
                }).then(function(res){
                    _this.industryData = res.data.map.industryShare
                    _this.industryData.forEach(el => {
                        _this.industry.push({name:el.name,value:el.innerNum})
                        _this.indata.push(el.name)
                    });
                    _this.drawLine3()
                }).catch(function(err){
                    // console.log(err)
                })
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'getCountContractByCountryId.do?cId=' + _this.$store.state.iscId,
                }).then(function(res){
                    _this.cityData = res.data.map.contracts
                    _this.cityData.forEach(el => {
                        _this.city.push({name:el.name,value:el.num})
                    });
                    _this.drawLine4()
                }).catch(function(err){
                    // console.log(err)
                })
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'getCountContractByYears.do?cId=' + _this.$store.state.iscId,
                }).then(function(res){
                    _this.yearsData = res.data.map.contracts
                    _this.yearsData.forEach(el => {
                        _this.years.push(el.num)
                        _this.yedata.push(el.years)
                    });
                    _this.drawLine2()
                    _this.drawLine1()
                }).catch(function(err){
                    // console.log(err)
                })
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'getCountContractRrecommend.do?cId=' + _this.$store.state.iscId,
                }).then(function(res){
                    _this.$store.state.reportFormList = res.data.map.contracts.slice(0,10)
                }).catch(function(err){
                    // console.log(err)
                })
                // _this.$store.state.reportFormList = [
                //     {name:'化妆品行业',city:'广州',years:'1-3年',scale:'50-99人',capital:'200-500万',ensure:'1000万客户',sort:'1',financing:'100',list:'100',telephone:'100'},
                //     {name:'化妆品行业',city:'广州',years:'1-3年',scale:'50-99人',capital:'200-500万',ensure:'1000万客户',sort:'2',financing:'100',list:'100',telephone:'100'},
                //     {name:'化妆品行业',city:'广州',years:'1-3年',scale:'50-99人',capital:'200-500万',ensure:'1000万客户',sort:'3',financing:'100',list:'100',telephone:'100'},
                //     {name:'化妆品行业',city:'广州',years:'1-3年',scale:'50-99人',capital:'200-500万',ensure:'1000万客户',sort:'4',financing:'100',list:'100',telephone:'100'},
                // ]
            },
            drawLine1(){
                // 基于准备好的dom，初始化echarts实例
                let chart1 = echarts.init(document.getElementById('chart1'))
                // 绘制图表
                //公司规模分析
                chart1.setOption({
                    title: { text: '公司规模分析',left: 'center' },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a}：" + "{b} <br/> " + '数量：' + "{c}"
                    },
                    color(params) { 
                　  //首先定义一个数组 
                    let colorList = ['#c23531','#61a0a8']; 
                        if(params.dataIndex % 2 == 0){
                            return colorList[0]
                        }else{
                            return colorList[1]
                        }
                    
                    },
                    xAxis: {
                        bottom: 20,
                        data: ["1-49", "50-99", "100-199", "200-499", "500-999", "1000-2999", "3000-4999", "5000以上"]
                    },
                    yAxis: {},
                    series: [{
                        name: '公司规模',
                        type: 'bar',
                        data: [62, 89, 36, 10, 36, 54, 16, 5]
                    }]
                });
            },
            drawLine2(){
                // 基于准备好的dom，初始化echarts实例
                let chart2 = echarts.init(document.getElementById('chart2'))
                // 绘制图表
                //成立年限分析
                chart2.setOption({
                    title: { text: '成立年限分析',left: 'center' },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a}：" + "{b} <br/> " + '数量：' + "{c}"
                    },
                    color(params) { 
                　  //首先定义一个数组 
                    let colorList = ['#c23531','#61a0a8']; 
                        if(params.dataIndex % 2 == 0){
                            return colorList[0]
                        }else{
                            return colorList[1]
                        }
                    
                    },
                    xAxis: {
                        bottom: 20,
                        data: this.yedata
                    },
                    yAxis: {},
                    series: [{
                        name: '成立年限',
                        type: 'bar',
                        data: this.years
                    }]
                });
            },
            drawLine3(){
                // 基于准备好的dom，初始化echarts实例
                let chart3 = echarts.init(document.getElementById('chart3'))
                // 绘制图表
                //行业占比分析
                chart3.setOption({
                    title: {
                        text: '行业占比分析', // 标题文本
                        left: 'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a}：" + "{b} <br/> " + '数量：' + "{c}"
                    },
                    legend: {
                        bottom: 20,
                        left: 'center',
                        data: ['电子','化妆品','五金','知识产权','农业','汽配'] // 扇形区域名称
                    },
                    series : [{
                        name:'行业',  // 提示框标题
                        type: 'pie',
                        radius : '60%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: this.industry,// 扇形区域数据
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
            drawLine4(){
                // 基于准备好的dom，初始化echarts实例
                let chart4 = echarts.init(document.getElementById('chart4'))
                // 绘制图表
                //省份分布
                chart4.setOption({
                    title: {
                        text: '省份分布分析', // 标题文本
                        left: 'center'
                    },
                    //  backgroundColor: "#02AFDB",
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a}：" + "{b} <br/> " + '数量：' + "{c}"
                    }, // 鼠标移到图里面的浮动提示框
                    dataRange: {
                        show: false,
                        min: 0,
                        max: 1000,
                        text: ['High', 'Low'],
                        realtime: true,
                        calculable: true,
                        color: ['#00ace0', '#68cceb', '#c2dce4']
                    },
                    geo: { // 这个是重点配置区
                        map: 'china', // 表示中国地图
                        roam: true,
                        label: {
                            normal: {
                                // show: true, // 是否显示对应地名
                                textStyle: {
                                    color: 'rgba(0,0,0,0.4)'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(0, 0, 0, 0.2)'
                            },
                            emphasis: {
                                areaColor: null,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 20,
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    series: [
                        {
                            type: 'scatter',
                            coordinateSystem: 'geo' // 对应上方配置
                        },
                        {
                            name: '省份', // 浮动框的标题
                            type: 'map',
                            geoIndex: 0,
                            data: this.city
                        }
                    ]
                });
            }
        },
    }
</script>
<style>
    .innerspace{
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0;
        background-color: #f0f0f0;
    }
    .head{
        width: 100%;
        height: auto;
        background-color: #ffffff;
        text-align: center;
        padding: 15px 0 ;
        line-height: 30px;
        font-size: 18px;
    }
    .middles{
        width: 100%;
        height: auto;
        background-color: #ffffff;
        margin-top: 10px;
        display: flex;
        display: -webkit-flex; /* Safari */
        justify-content: center;  /* 水平居中 */
        /* align-items: center; */
    }
    .middles .middlebody{
        flex: 1;
        width: 50%;
        padding: 0 10px;
    }
    .middles .middlebody > div{
        margin:0 auto
    }
    .middles .middlebody:first-child{
        border-right: 10px solid #f0f0f0;
    }
    .foot{
        width: 100%;
        height: auto;
        margin-top: 10px;
        background-color: #ffffff;
    }
</style>
