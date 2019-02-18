<template>
    <div class="innerspace">
        <div class="head">
            <ul>
                <li><p>总线索</p><p>1000</p></li>
                <li><p>今日新增线索</p><p>100</p></li>
                <li><p>今日更新线索</p><p>100</p></li>
            </ul>
            <ul>
                <li><p>总客户</p><p>1000</p></li>
                <li><p>今日新增客户</p><p>100</p></li>
                <li><p>今日更新客户</p><p>100</p></li>
            </ul>
            <ul>
                <li><p>总商机</p><p>1000</p></li>
                <li><p>今日新增商机</p><p>100</p></li>
                <li><p>今日推荐商机</p><p>100</p></li>
            </ul>
            <ul>
                <li><p>总合同</p><p>1000</p></li>
                <li><p>今日新增合同</p><p>100</p></li>
            </ul>
        </div>
        <div class="middles">
            <div class="middlebody">
                <div id="chart1" :style="{width: '400px', height: '400px'}"></div>
            </div>
            <div class="middlebody">
                <div id="chart2" :style="{width: '400px', height: '400px'}"></div>
            </div>
        </div>
        <div class="foot">
            <el-table
            :data="tableData"
            ref="multipleTable"
            border
            stripe
            :default-sort = "{order: 'descending'}"
            style="width:100%;text-align:center"
            >
            <el-table-column
            fixed
            header-align="center"
            align="center"
            type="index"
            width="45">
            </el-table-column>
            <el-table-column
                prop="name"
                header-align="left"
                align="left"
                min-width="120"
                label="项目名"
                sortable>
            </el-table-column>
            <el-table-column
                prop="start_time"
                header-align="left"
                align="left"
                min-width="120"
                label="开始日期"
                sortable>
            </el-table-column>
            <el-table-column
                prop="end_deal"
                header-align="left"
                align="left"
                min-width="180"
                label="截止日期"
                sortable>
            </el-table-column>
            <el-table-column
                prop="state"
                header-align="left"
                align="left"
                min-width="90"
                label="状态"
                sortable>
            </el-table-column>
            <el-table-column
                prop="user"
                header-align="left"
                align="left"
                min-width="110"
                label="分配"
                sortable>
            </el-table-column>
        </el-table>
        </div>
    </div>
</template>

<script>
    
    import store from '../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    let echarts = require('echarts/lib/echarts')
    require('echarts/lib/chart/bar')
    require('echarts/lib/chart/funnel')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')

    export default {
        name:'suibian',
        store,
        computed:{
            tableData(){
                return store.state.welcomeData
            }
        },
        data(){
            return {
                msg:"首页"
            }
        },
        mounted(){
            this.loadData()
            this.drawLine();
        },
        methods:{
            loadData(){
                let _this = this;
                _this.$store.state.welcomeData = [
                    {name:'项目名称',start_time:'2019-01-01',end_deal:'2019-03-31',state:'启动',user:'销售'},
                    {name:'项目名称',start_time:'2019-01-01',end_deal:'2019-03-31',state:'启动',user:'销售'},
                    {name:'项目名称',start_time:'2019-01-01',end_deal:'2019-03-31',state:'启动',user:'销售'},
                    {name:'项目名称',start_time:'2019-01-01',end_deal:'2019-03-31',state:'启动',user:'销售'},
                    {name:'项目名称',start_time:'2019-01-01',end_deal:'2019-03-31',state:'启动',user:'销售'},
                    {name:'项目名称',start_time:'2019-01-01',end_deal:'2019-03-31',state:'启动',user:'销售'},
                    {name:'项目名称',start_time:'2019-01-01',end_deal:'2019-03-31',state:'启动',user:'销售'},
                    {name:'项目名称',start_time:'2019-01-01',end_deal:'2019-03-31',state:'启动',user:'销售'},
                    {name:'项目名称',start_time:'2019-01-01',end_deal:'2019-03-31',state:'启动',user:'销售'},
                    {name:'项目名称',start_time:'2019-01-01',end_deal:'2019-03-31',state:'启动',user:'销售'},
                ]
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let chart1 = echarts.init(document.getElementById('chart1'))
                let chart2 = echarts.init(document.getElementById('chart2'))
                // 绘制图表
                chart1.setOption({
                    title : { text: '销售漏斗' },
                    tooltip : {},
                    legend: {
                        data : ['展现','点击','访问','咨询','订单']
                    },
                    calculable : true,
                    emphasis: {
                        label: {
                            fontSize: 20
                        }
                    },
                    series : [
                        {
                            name:'销售漏斗',
                            type:'funnel',
                            // width: '40%',
                            minSize: '10%',
                            sort: 'none',
                            data:[
                                {value:0, name:'访问'},
                                {value:0, name:'咨询'},
                                {value:0, name:'订单'},
                                {value:0, name:'点击'},
                                {value:0, name:'展现'}
                            ]
                        }
                    ]
                });
                chart2.setOption({
                    title: { text: '销售排行' },
                    tooltip: {},
                    xAxis: {
                        data: ["张三", "李四", "王五", "赵六"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销售排行',
                        type: 'bar',
                        data: [5, 20, 36, 10]
                    }]
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
        height: 100px;
        background-color: #ffffff;
        display: flex;
        display: -webkit-flex; /* Safari */
        justify-content: center;   /*水平居中*/
        align-items: center;
    }
    .head ul{
        height: 100%;
        flex: 1;
        text-align: center;
        list-style: none;
        display: flex;
        display: -webkit-flex; /* Safari */
        justify-content: center;   /*水平居中*/
        align-items: center;
    }
    .head ul:not(:last-child){
        border-right: 10px solid #f0f0f0;
    }
    .head ul li{
        /* width: 50%;
        height: 50px;
        float: left; */
        font-size: 14px;
        flex: 1;
        text-align: center;
        line-height: 24px;
    }
    .middles{
        width: 100%;
        height: 400px;
        background-color: #ffffff;
        margin-top: 20px;
        display: flex;
        display: -webkit-flex; /* Safari */
        justify-content: center;   /*水平居中*/
        align-items: center;
    }
    .middles .middlebody{
        flex: 1;
        padding: 10px;
    }
    .middles .middlebody:first-child{
        border-right: 10px solid #f0f0f0;
    }
    .foot{
        width: 100%;
        height: auto;
        margin-top: 20px;
        background-color: #ffffff;
    }
</style>
