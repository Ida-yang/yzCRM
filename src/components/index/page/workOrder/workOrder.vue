<template>
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in pIdData" :key="item.index" :label="item.index" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.time">
                <span class="nameList">反馈时间：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in timeData" :key="item.index" :label="item.index" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.state">
                <span class="nameList">工单状态：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in stateData" :key="item.index" :label="item.name" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList" style="width:100%;">
            <span class="nameList">公司名称：</span>
            <el-input v-model="searchList.searchName" placeholder="请输入公司名称" style="width:300px;" @keyup.enter.native="search"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <div class="totalnum_head">共 <span style="font-weight:bold">{{tableNumber}}</span> 条</div>
        </div>
        <el-table :data="tableData" border stripe style="width:100%">
            <el-table-column prop="customerpool" fixed min-width="150" label="公司名称" sortable></el-table-column>
            <el-table-column prop="contacts" min-width="90" label="联系人" sortable></el-table-column>
            <el-table-column prop="phone" min-width="110" label="电话" sortable></el-table-column>
            <el-table-column prop="feedbackTime" min-width="145" label="反馈时间" sortable></el-table-column>
            <el-table-column prop="feedbackType" min-width="110" label="反馈方式" sortable></el-table-column>
            <el-table-column prop="acceptance" min-width="90" label="受理人" sortable></el-table-column>
            <el-table-column prop="serviceTypeName" min-width="110" label="工单类型" sortable></el-table-column>
            <el-table-column prop="orderId" min-width="145" label="销售单号" sortable></el-table-column>
            <el-table-column prop="problem" min-width="150" label="问题" show-overflow-tooltip="" sortable></el-table-column>
            <el-table-column prop="describe" min-width="150" label="描述" show-overflow-tooltip="" sortable></el-table-column>
            <el-table-column prop="enclosure" min-width="120" label="附件" sortable></el-table-column>
            <el-table-column prop="private_employee" min-width="90" label="制单人" sortable></el-table-column>
            <el-table-column prop="ascription" min-width="90" label="业务员" sortable></el-table-column>
            <el-table-column prop="deptname" min-width="110" label="部门" sortable></el-table-column>
            <el-table-column prop="parentname" min-width="130" label="机构" show-overflow-tooltip="" sortable></el-table-column>
            <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block numberPage">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[20, 50, 100, 500]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableNumber">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'workOrder',
        store,
        computed: {
            tableData(){
                return store.state.workOrderList
            },
            tableNumber(){
               return store.state.workOrderListnumber
            },
        },
        data(){
            return{
                msg:'工单',
                page: 1, //默认第一页
                limit: 20, //默认一页20行

                searchList:{
                    searchName:null,
                    label:1,
                    time:null,
                    state:null,
                },
                pIdData:[
                    {index:0,name:'全部'},
                    {index:1,name:'我的'},
                    {index:2,name:'本组'},
                    {index:3,name:'本机构'},
                ],
                timeData:[
                    {index:1,name:'今天'},
                    {index:2,name:'昨天'},
                    {index:3,name:'明天'},
                    {index:4,name:'本周'},
                    {index:5,name:'本月'},
                    {index:6,name:'上月'},
                    {index:7,name:'下月'},
                ],
                stateData:[
                    {index:1,name:'已解决'},
                    {index:2,name:'未解决'},
                    {index:3,name:'超过3天未解决'},
                    {index:4,name:'超过7天未解决'},
                    {index:5,name:'超过15天未解决'},
                    {index:6,name:'超过一个月未解决'},
                ],
                nullvalue:null,
            }
        },
        mounted(){
            this.loadTable()
        },
        activated(){
            this.loadTable()
        },
        methods:{
            loadTable(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                if(this.searchList.label == 0 ){
                    data.pId = _this.nullvalue
                }else if(this.searchList.label == 1){
                    data.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    data.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    data.deptid = _this.$store.state.insid
                }else{
                    data.pId = _this.$store.state.ispId
                }
                if(this.searchList.state !== this.nullvalue){
                    data.state = this.searchList.state
                }
                data.page = this.page
                data.limit = this.limit
                data.example = this.searchList.time
                data.searchName = this.searchList.searchName
                data.page = this.page
                data.limit = this.limit

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'workOrder/queryForList.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    let data = res.data.map.success
                    _this.$store.state.workOrderList = data
                    _this.$store.state.workOrderListnumber = res.data.count
                }).catch(function(err){
                });
            },
            handleAdd(){},
            handleEdit(index,row){
                console.log(index.row)
            },
            handleDelete(index,row){
                console.log(index,row)
            },
            handleSizeChange(val){
                this.limit = val
                this.$options.methods.loadTable.bind(this)()
            },
            handleCurrentChange(val){
                this.page = val
                this.$options.methods.loadTable.bind(this)()
            }
        },
    }
</script>

<style>

</style>
