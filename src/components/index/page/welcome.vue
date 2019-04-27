<template>
    <div class="innerspace">
        <div class="header-welhead">
            <div class="radioList">
                <el-radio-group v-model="searchList.label">
                    <el-radio class="wel_radio" v-for="item in pIdData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="welhead">
            <ul>
                <li><p>总线索</p><p>{{amountList.totalClue}}</p></li>
                <li><p>今日新增线索</p><p>{{amountList.todayAddClue}}</p></li>
                <li><p>今日更新线索</p><p>{{amountList.todayRenewClue}}</p></li>
            </ul>
            <ul>
                <li><p>总客户</p><p>{{amountList.totalCustomer}}</p></li>
                <li><p>今日新增客户</p><p>{{amountList.todayAddCustomer}}</p></li>
                <li><p>今日更新客户</p><p>{{amountList.todayRenewCustomer}}</p></li>
            </ul>
            <ul>
                <li><p>总商机</p><p>{{amountList.totalOpportunity}}</p></li>
                <li><p>今日新增商机</p><p>{{amountList.todayAddOpportunity}}</p></li>
                <li><p>今日推进商机</p><p>{{amountList.todayRecommendOpportunity}}</p></li>
            </ul>
            <ul>
                <li><p>总合同</p><p>{{amountList.totalContract}}</p></li>
                <li><p>今日新增合同</p><p>{{amountList.todayAddContract}}</p></li>
            </ul>
        </div>
        <div class="welmiddles">
            <div class="welmiddlebody">
                <div id="chart1" class="funnelwidth"></div>
            </div>
            <div class="middleline"></div>
            <div class="welmiddlebody">
                <div class="weldropdown">
                    <el-date-picker
                        v-model="searchList.date"
                        type="month"
                        placeholder="选择日期"
                        value-format="yyyy-MM"
                        @change="search">
                    </el-date-picker>
                </div>
                <div id="chart2" class="barwidth"></div>
            </div>
        </div>
        <div class="welfoot">
            <el-table
                :data="tableData"
                ref="multipleTable"
                border
                stripe
                style="width:100%">
                <el-table-column
                    fixed
                    header-align="center"
                    align="center"
                    type="index"
                    width="45">
                </el-table-column>
                <el-table-column
                    prop="type"
                    min-width="120"
                    label="类型"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="theme"
                    min-width="120"
                    label="主题"
                    sortable>
                    <template slot-scope="scope">
                        <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                            {{scope.row.theme}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="describe"
                    show-overflow-tooltip
                    min-width="120"
                    label="描述"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="startTime"
                    min-width="180"
                    label="时间"
                    sortable>
                    <template slot-scope="scope">
                        <div>
                            <p>{{scope.row.startTime}}</p>
                            <p>{{scope.row.endTime}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="private_employee"
                    min-width="110"
                    label="负责人"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="state"
                    min-width="90"
                    label="状态"
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
        name:'welcome',
        store,
        computed:{
            tableData(){
                return store.state.welcomeData
            }
        },
        data(){
            return {
                msg:"首页",

                amountList:{},
                funnelList:[],
                barList:[],
                barData:[],

                searchList:{
                    label:'1',
                    date: '',
                    oppdate: '',
                },
                nullvalue:null,

                pIdData:[
                    {label:'0',value:'全部'},
                    {label:'1',value:'我的'},
                    {label:'2',value:'本组'},
                    {label:'3',value:'本机构'},
                ],
            }
        },
        mounted(){
            this.getMonth()
            this.loadData()
        },
        activated(){
            this.loadData()
        },
        methods:{
            loadData(){
                const _this = this;

                let pageInfo2 = {}
                let searchList = {}
                pageInfo2.state = '未完成'
                if(this.searchList.label == 0 ){
                    searchList.pId = _this.nullvalue
                    pageInfo2.pId = _this.nullvalue
                }else if(this.searchList.label == 1){
                    searchList.pId = _this.$store.state.ispId
                    pageInfo2.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    searchList.secondid = _this.$store.state.deptid
                    pageInfo2.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    searchList.deptid = _this.$store.state.insid
                    pageInfo2.deptid = _this.$store.state.insid
                }
                
                let oppData = searchList
                oppData.yearMonth = this.searchList.oppdate

                let monthData = {}
                monthData.month = this.searchList.date

                //获取首页头部报表数据
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'homePageHeader/getHomePageHeader.do?cId=' + _this.$store.state.iscId,
                    data:qs.stringify(searchList),
                }).then(function(res){
                    _this.amountList = res.data
                }).catch(function(err){
                    // console.log(err)
                })

                //获取首页商机进度漏斗
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getMonthCountByExample.do?cId=' + _this.$store.state.iscId,
                    data:qs.stringify(oppData),
                }).then(function(res){
                    _this.funnelList = res.data
                    _this.$options.methods.drawfunnel.bind(_this)(true);
                }).catch(function(err){
                    // console.log(err)
                })
                //获取首页合同金额排行榜
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getContractamount.do?cId=' + _this.$store.state.iscId,
                    data:qs.stringify(monthData),
                }).then(function(res){
                    _this.barData = res.data.name
                    _this.barList = res.data.value
                    _this.$options.methods.drawbar.bind(_this)(true);
                }).catch(function(err){
                    // console.log(err)
                })
                
                //底部表格外勤任务
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/selectWorkPlanAndVisit.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo2)
                }).then(function(res){
                    _this.$store.state.welcomeData = res.data.map.workPlanAndVisit
                }).catch(function(err){
                    // console.log(err);
                });
            },
            openDetails(index,row){
                if(row.type == '任务'){
                    console.log(row,1111111)
                    this.$router.push({ path: '/missionplan' });
                }else if(row.type == '外勤'){
                    console.log(row,22222222)
                    this.$store.state.visitdetailsData = {submitData:{"id": row.id}}
                    this.$router.push({ path: '/visitplandetails' });
                }
            },
            getMonth(){
                let date=new Date;
                let year=date.getFullYear(); 
                let month=date.getMonth()+1;
                month =(month<10 ? "0"+month:month); 
                let mydate = (year.toString() + '-' + month.toString());
                this.searchList.date = mydate
                this.searchList.oppdate = mydate
            },
            search(){
                const _this = this
                _this.$options.methods.loadData.bind(_this)(true);
            },
            drawfunnel(){
                // 基于准备好的dom，初始化echarts实例
                let chart1 = echarts.init(document.getElementById('chart1'))
                // 绘制图表
                chart1.setOption({
                    title : { text: '商机漏斗' },
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
                            name:'数量',
                            type:'funnel',
                            sort: 'descending',
                            // width: '40%',
                            minSize: '10%',
                            // sort: 'none',
                            data:this.funnelList
                        }
                    ]
                });
            },
            drawbar(){
                // 基于准备好的dom，初始化echarts实例
                let chart2 = echarts.init(document.getElementById('chart2'))
                // 绘制图表
                chart2.setOption({
                    title: { text: '合同金额排行' },
                    tooltip: {},
                    xAxis: [{
                        type: 'category',
                        data: this.barData,
                        axisLabel:{
                            interval:0,
                            rotate:30 
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            margin: 8,
                            // formatter(value, index) {
                            //     if (value >= 10000 && value < 10000000) {
                            //         value = value / 10000 + "万";
                            //     } else if (value >= 10000000) {
                            //         value = value / 10000000 + "千万";
                            //     }
                            //     return value;
                            // }
                        }
                    }],
                    grid: {
                        left: 60,
                        containLabel: true
                    },
                    series: [{
                        name: '合同金额总数',
                        type: 'bar',
                        data: this.barList
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
    .header-welhead{
        width: 100%;
        height: 30px;
        background-color: #ffffff;
        padding-left: 65%;
    }
    .welhead{
        width: 100%;
        height: 100px;
        background-color: #ffffff;
        display: flex;
        display: -webkit-flex; /* Safari */
        justify-content: center;   /*水平居中*/
        align-items: center;
        margin-top: 20px;
    }
    .welhead ul{
        height: 100%;
        flex: 1;
        text-align: center;
        list-style: none;
        display: flex;
        display: -webkit-flex; /* Safari */
        justify-content: center;   /*水平居中*/
        align-items: center;
    }
    .welhead ul:not(:last-child){
        border-right: 10px solid #f0f0f0;
    }
    .welhead ul li{
        font-size: 14px;
        flex: 1;
        text-align: center;
        line-height: 24px;
    }
    .welmiddles{
        width: 100%;
        height: 500px;
        background-color: #ffffff;
        margin-top: 20px;
        display: flex;
        display: -webkit-flex; /* Safari */
        justify-content: center;   /*水平居中*/
        align-items: center;
    }
    .welmiddles .welmiddlebody{
        flex: 1;
        padding: 10px;
        width: 500px;
    }
    .middleline{
        width: 10px;
        height: 500px;
        border-right: 10px solid #f0f0f0
    }
    .weldropdown{
        width: 500px;
        height: 40px;
        padding-left: 230px;
        box-sizing: border-box;
    }
    .welfoot{
        width: 100%;
        height: auto;
        margin-top: 20px;
        background-color: #ffffff;
    }
    .funnelwidth{
        width: 400px;
        height: 400px;
        margin: 0 auto
    }
    .barwidth{
        width: 500px;
        height: 400px;
        margin: 0 auto
    }
    .wel_radio{
        flex: 0 0 7% !important;
        text-align: center;
    }
</style>
