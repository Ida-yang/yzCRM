<template>
    <div class="innerspace">
        <div class="head">
            <span>获客报表是基于已签约的客户从行业占比，城市分布，企业规模，成立时间等四个维度分析，从而推荐出最优的拓展城市区域。</span>
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
                    :default-sort = "{order: 'descending'}"
                    style="width:100%;text-align:center">
                    <el-table-column
                        prop="industry"
                        header-align="left"
                        align="left"
                        min-width="110"
                        label="行业"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="internalproportion"
                        header-align="left"
                        align="left"
                        min-width="110"
                        label="内部占比"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="internalnumber"
                        header-align="left"
                        align="left"
                        min-width="110"
                        label="内部数量"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="countryproportion"
                        header-align="left"
                        align="left"
                        min-width="110"
                        label="全国占比"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="countrynumber"
                        header-align="left"
                        align="left"
                        min-width="120"
                        label="全国总数量"
                        sortable>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="middles">
            <div class="middlebody">
                <div id="chart4" :style="{width: '600px', height: '400px'}"></div>
            </div>
            <div class="middlebody">
                <el-table
                    :data="cityData"
                    ref="multipleTable"
                    border
                    stripe
                    :default-sort = "{order: 'descending'}"
                    style="width:100%;text-align:center">
                    <el-table-column
                        prop="city"
                        header-align="left"
                        align="left"
                        min-width="120"
                        label="城市"
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
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="middles">
            <div class="middlebody">
                <div id="chart1" :style="{width: '400px', height: '400px'}"></div>
            </div>
            <div class="middlebody">
                <el-table
                    :data="scaleData"
                    ref="multipleTable"
                    border
                    stripe
                    :default-sort = "{order: 'descending'}"
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
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="middles">
            <div class="middlebody">
                <div id="chart2" :style="{width: '400px', height: '400px'}"></div>
            </div>
            <div class="middlebody">
                <el-table
                    :data="yearsData"
                    ref="multipleTable"
                    border
                    stripe
                    :default-sort = "{order: 'descending'}"
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
                :default-sort = "{order: 'descending'}"
                style="width:100%;text-align:center">
                <el-table-column
                    prop="name"
                    header-align="left"
                    align="left"
                    min-width="160"
                    label="目标客户定位推荐"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="city"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="城市"
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
                <el-table-column
                    prop="scale"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="公司规模"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="capital"
                    header-align="left"
                    align="left"
                    min-width="120"
                    label="注册资金"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="ensure"
                    header-align="left"
                    align="left"
                    min-width="145"
                    label="当前城市保有量"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="sort"
                    header-align="left"
                    align="left"
                    min-width="90"
                    label="顺序"
                    sortable>
                </el-table-column>
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
                    prop="telephone"
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
                industryData:[
                    {industry:'电子',internalproportion:'9.09%',internalnumber:'3000',countryproportion:'0.09%',countrynumber:'130000000'},
                    {industry:'化妆品',internalproportion:'12.05%',internalnumber:'3000',countryproportion:'0.15%',countrynumber:'234000000'},
                    {industry:'五金',internalproportion:'18.16%',internalnumber:'3000',countryproportion:'0.18%',countrynumber:'53000000'},
                    {industry:'知识产权',internalproportion:'16.64%',internalnumber:'3000',countryproportion:'0.35%',countrynumber:'260000000'},
                    {industry:'农业',internalproportion:'19.63%',internalnumber:'3000',countryproportion:'0.51%',countrynumber:'30000000'},
                    {industry:'汽配',internalproportion:'24.31%',internalnumber:'3000',countryproportion:'0.12%',countrynumber:'54000000'},
                ],
                cityData:[
                    {city:'北京',number:'599',proportion:'5.01%'},                    
                    {city:'上海',number:'142',proportion:'5.01%'},                    
                    {city:'黑龙江',number:'44',proportion:'5.01%'},                    
                    {city:'深圳',number:'92',proportion:'5.01%'},                    
                    {city:'湖北',number:'810',proportion:'5.01%'},                    
                    {city:'广东',number:'19450',proportion:'5.01%'},                    
                    {city:'云南',number:'150',proportion:'5.01%'},                  
                ],
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
                yearsData:[
                    {years:'1年以内',number:'55',proportion:'5.01%'},                    
                    {years:'1-3年',number:'20',proportion:'5.01%'},                    
                    {years:'3-5年',number:'36',proportion:'5.01%'},                    
                    {years:'5-8年',number:'25',proportion:'5.01%'},                    
                    {years:'8-10年',number:'10',proportion:'5.01%'},                    
                    {years:'10年以上',number:'9',proportion:'5.01%'},                   
                ],
            }
        },
        activated(){
            this.loadData()
            this.drawLine();
        },
        mounted(){
            this.loadData()
            this.drawLine();
        },
        methods:{
            loadData(){
                let _this = this;
                _this.$store.state.reportFormList = [
                    {name:'化妆品行业',city:'广州',years:'1-3年',scale:'50-99人',capital:'200-500万',ensure:'1000万客户',sort:'1',financing:'100',list:'100',telephone:'100'},
                    {name:'化妆品行业',city:'广州',years:'1-3年',scale:'50-99人',capital:'200-500万',ensure:'1000万客户',sort:'2',financing:'100',list:'100',telephone:'100'},
                    {name:'化妆品行业',city:'广州',years:'1-3年',scale:'50-99人',capital:'200-500万',ensure:'1000万客户',sort:'3',financing:'100',list:'100',telephone:'100'},
                    {name:'化妆品行业',city:'广州',years:'1-3年',scale:'50-99人',capital:'200-500万',ensure:'1000万客户',sort:'4',financing:'100',list:'100',telephone:'100'},
                ]
                // let qs =require('querystring')
                // let searchList = {}
                // searchList.limit = 10;
                // // console.log(searchList)
                // axios({
                //     method: 'post',
                //     url: _this.$store.state.defaultHttp+'opportunity/query.do?cId='+_this.$store.state.iscId,
                //     data: qs.stringify(searchList),
                // }).then(function(res){
                //     // console.log(res.data.map.success)
                //     _this.$store.state.reportFormList = res.data.map.success
                // }).catch(function(err){
                //     console.log(err);
                // });
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let chart1 = echarts.init(document.getElementById('chart1'))
                let chart2 = echarts.init(document.getElementById('chart2'))
                let chart3 = echarts.init(document.getElementById('chart3'))
                let chart4 = echarts.init(document.getElementById('chart4'))
                // 绘制图表
                //公司规模分析
                chart1.setOption({
                    title: { text: '公司规模分析',left: 'center' },
                    tooltip: {},
                    xAxis: {
                        bottom: 20,
                        data: ["1-49", "50-99", "100-199", "200-499", "500-999", "1000-2999", "3000-4999", "5000以上"]
                    },
                    yAxis: {},
                    series: [{
                        name: '客户数量',
                        type: 'bar',
                        data: [62, 89, 36, 10, 36, 54, 16, 5]
                    }]
                });
                //成立年限分析
                chart2.setOption({
                    title: { text: '成立年限分析',left: 'center' },
                    tooltip: {},
                    xAxis: {
                        bottom: 20,
                        data: ["1年以内", "1-3年", "3-5年", "5-8年", "8-10年", "10年以上"]
                    },
                    yAxis: {},
                    series: [{
                        name: '客户数量',
                        type: 'bar',
                        data: [55, 20, 36, 25, 10, 9]
                    }]
                });
                //行业占比分析
                chart3.setOption({
                    title: {
                        text: '行业占比分析', // 标题文本
                        left: 'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/> " + '销售数量' + ":{c}"
                    },
                    legend: {
                        bottom: 20,
                        left: 'center',
                        data: ['电子','化妆品','五金','知识产权','农业','汽配'] // 扇形区域名称
                    },
                    series : [{
                        name:'客户数量',  // 提示框标题
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data:[
                                {value:3000, name:'电子'},
                                {value:3000, name:'化妆品'},
                                {value:3000, name:'五金'},
                                {value:3000, name:'知识产权'},
                                {value:3000, name:'农业'},
                                {value:3000, name:'汽配'}], // 扇形区域数据
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                });
                //城市分布
                chart4.setOption({
                    title: {
                        text: '城市分布分析', // 标题文本
                        left: 'center'
                    },
                    //  backgroundColor: "#02AFDB",
                    tooltip: {}, // 鼠标移到图里面的浮动提示框
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
                    series: [{
                        type: 'scatter',
                            coordinateSystem: 'geo' // 对应上方配置
                            },
                        {
                        name: '浏览量', // 浮动框的标题
                        type: 'map',
                        geoIndex: 0,
                        data: [{
                            "name": "北京",
                            "value": 599
                            }, {
                                "name": "上海",
                                "value": 142
                            }, {
                                "name": "黑龙江",
                                "value": 44
                            }, {
                                "name": "深圳",
                                "value": 92
                            }, {
                                "name": "湖北",
                                "value": 810
                            }, {
                                "name": "广东",
                                "value": 19450
                            }, {
                                "name": "云南",
                                "value": 150
                            }]
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
        height: 60px;
        background-color: #ffffff;
        text-align: center;
        line-height: 60px;
        font-size: 20px;
    }
    .middles{
        width: 100%;
        height: auto;
        background-color: #ffffff;
        margin-top: 10px;
        display: flex;
        display: -webkit-flex; /* Safari */
        justify-content: center;   /*水平居中*/
        align-items: center;
    }
    .middles .middlebody{
        flex: 1;
        width: 50%;
        /* padding: 10px; */
    }
    .middles .middlebody div{
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
