<template>
    <!-- 线索 -->
    <div>
        <div class="searchList" style="width:100%;">
            <span class="nameList">操作模块：</span>
            <el-select v-model="searchList.model" clearable placeholder="请选择"  @change="search">
                <el-option v-for="item in modelData" :key="item.label" :label="item.value" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="searchList" style="width:100%;">
            <span class="nameList">用户：</span>
            <el-select v-model="searchList.private_employee" clearable placeholder="请选择"  @change="search">
                <el-option v-for="item in pIdlist" :key="item.private_id" :label="item.private_employee" :value="item.private_employee"></el-option>
            </el-select>
        </div>
        <div class="searchList" style="width:100%;">
            <span class="nameList">操作时间：</span>
            <el-date-picker v-model="searchList.yearrange" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" @change="datepick"></el-date-picker>
        </div>
        <div class="searchList" style="width:100%;"></div>
        <el-table
            :data="tableData"
            ref="multipleTable"
            border
            stripe
            style="width:100%;">
            <el-table-column
                prop="model"
                fixed
                header-align="left"
                align="left"
                min-width="100"
                label="模块"
                sortable>
            </el-table-column>
            <el-table-column
                prop="workName"
                show-overflow-tooltip
                header-align="left"
                align="left"
                label="对象"
                min-width="160"
                sortable>
            </el-table-column>
            <el-table-column
                prop="type"
                header-align="left"
                align="left"
                label="操作类型"
                min-width="130"
                sortable>
            </el-table-column>
            <el-table-column
                prop="private_employee"
                header-align="left"
                align="left"
                label="用户"
                min-width="100"
                sortable>
            </el-table-column>
            <el-table-column
                prop="startDate"
                header-align="left"
                align="left"
                label="时间"
                min-width="140"
                sortable>
            </el-table-column>
            <el-table-column
                prop="ip"
                show-overflow-tooltip
                header-align="left"
                align="left"
                label="IP地址"
                min-width="160"
                sortable>
            </el-table-column>
        </el-table>
        <div class="block numberPage">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[100, 300, 500]"
            :page-size="100"
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
        name:'log',
        store,
        computed: {
            tableData(){
                return store.state.logList;
            },
            tableNumber(){
               return store.state.logListnumber;     
            },
        },
        data(){
            return {
                searchList:{
                    model:null,
                    private_employee:null,
                    yearrange:null,
                    startTime:null,
                    endTime:null,
                },
                page:1,//默认第一页
                limit:100,//默认20条

                modelData:[
                    {label:'1',value:'社交营销'},
                    {label:'2',value:'商机状态'},
                    {label:'3',value:'工商数据'},
                    {label:'4',value:'方案目标'},
                    {label:'5',value:'联系人'},
                    {label:'6',value:'合同'},
                    {label:'7',value:'数据中心'},
                    {label:'8',value:'客户'},
                    {label:'9',value:'线索'},
                    {label:'10',value:'部门机构'},
                    {label:'11',value:'跟进记录'},
                    {label:'12',value:'图片'},
                    {label:'14',value:'行业'},
                    {label:'15',value:'登录'},
                    {label:'16',value:'提醒信息'},
                    {label:'17',value:'商机'},
                    {label:'18',value:'辅助资料'},
                    {label:'19',value:'用户'},
                    {label:'20',value:'角色'},
                    {label:'21',value:'短信模板'},
                    {label:'22',value:'类别信息'},
                    {label:'23',value:'外勤'},
                    {label:'24',value:'微信二维码'},
                    {label:'25',value:'任务'},
                ],
                pIdlist:[]
            }
        },
        beforeCreate(){
            const _this = this;
            axios({
                method: 'get',
                url: _this.$store.state.defaultHttp+'getNameAndId.do?cId='+_this.$store.state.iscId,
            }).then(function(res){
                _this.pIdlist = res.data
            }).catch(function(err){
                // console.log(err);
            });
        },
        activated(){
            this.loadTable()
        },
        mounted(){
            this.loadTable()
        },

        methods: {
            //获取/查询线索列表
            loadTable() {
                const _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.model = this.searchList.model
                searchList.private_employee = this.searchList.private_employee
                searchList.startTime = this.searchList.startTime
                searchList.endTime = this.searchList.endTime
                searchList.page = this.page;
                searchList.limit = this.limit;
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'logInfo/selectLogInfo.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.$store.state.logList = res.data.map.logInfos
                    _this.$store.state.logListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            datepick(val){
                if(val){
                    this.searchList.startTime = val[0]
                    this.searchList.endTime = val[1]
                }else{
                    this.searchList.startTime = ''
                    this.searchList.endTime = ''
                }
                this.$options.methods.loadTable.bind(this)()
            },
            search() {
                const _this = this
                _this.$options.methods.loadTable.bind(_this)(true);
            },

            handleSizeChange(val) {
                const _this = this;
                _this.limit = val;
                _this.$options.methods.loadTable.bind(_this)(false);
            },
            handleCurrentChange(val) {
                const _this = this;
                _this.page = val;
                _this.$options.methods.loadTable.bind(_this)(false);
            },
        },
    }
</script>

<style>
    .el-table td, .el-table th {
        padding: 6px 0 !important;
        line-height: 30px;
    }
    
</style>
