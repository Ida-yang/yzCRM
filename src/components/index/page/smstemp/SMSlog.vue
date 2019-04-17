<template>
    <!-- 短信日志 -->
    <div>
        <div class="searchList" style="width:100%;">
            <span class="nameList">发送时间：</span>
            <el-date-picker v-model="searchList.yearrange" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" @change="datepick"></el-date-picker>
        </div>
        <div class="searchList">
            <el-select v-model="searchList.keyType" style="margin-left:20px;width:125px">
                <el-option label="联系人名称" value="1">联系人名称</el-option>
                <el-option label="公司名称" value="2">公司名称</el-option>
            </el-select>
            <el-input v-model="searchName" placeholder="请输入联系人或公司名称" style="width:300px;" @keyup.enter.native="search"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="searchList" style="width:100%;"></div>
        <el-table
            :data="tableData"
            ref="multipleTable"
            border
            stripe
            style="width:100%;">
            <el-table-column
                prop="workname"
                show-overflow-tooltip
                header-align="left"
                align="left"
                label="公司名称"
                min-width="160"
                sortable>
            </el-table-column>
            <el-table-column
                prop="contact"
                header-align="left"
                align="left"
                label="联系人"
                min-width="130"
                sortable>
            </el-table-column>
            <el-table-column
                prop="phone"
                header-align="left"
                align="left"
                label="电话"
                min-width="100"
                sortable>
            </el-table-column>
            <!-- <el-table-column
                prop="contact"
                header-align="left"
                align="left"
                label="模板标题"
                min-width="130"
                sortable>
            </el-table-column>
            <el-table-column
                prop="contact"
                header-align="left"
                align="left"
                label="模板内容"
                min-width="130"
                sortable>
            </el-table-column> -->
            <el-table-column
                prop="private_employee"
                header-align="left"
                align="left"
                label="发送者"
                min-width="140"
                sortable>
            </el-table-column>
            <el-table-column
                prop="deptname"
                show-overflow-tooltip
                header-align="left"
                align="left"
                label="部门"
                min-width="160"
                sortable>
            </el-table-column>
            <el-table-column
                prop="parentname"
                show-overflow-tooltip
                header-align="left"
                align="left"
                label="机构"
                min-width="160"
                sortable>
            </el-table-column>
            <el-table-column
                prop="createTime"
                show-overflow-tooltip
                header-align="left"
                align="left"
                label="发送时间"
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
        name:'SMSlog',
        store,
        computed: {
            tableData(){
                return store.state.SMSlogList;
            },
            tableNumber(){
               return store.state.SMSlogListnumber;     
            },
        },
        data(){
            return {
                searchList:{
                    keyType:'1',
                    yearrange:null,
                    startTime:null,
                    endTime:null,
                },
                page:1,//默认第一页
                limit:100,//默认100条

                searchName:null,
            }
        },
        activated(){
            this.loadTable()
        },
        mounted(){
            this.loadTable()
        },

        methods: {
            //获取短信发送记录
            loadTable() {
                const _this = this;
                let qs =require('querystring')
                let searchList = {}
                if(this.searchList.keyType == '1'){
                    searchList.searchName = this.searchName
                }else if(this.searchList.keyType == '2'){
                    searchList.keyWord = this.searchName
                }
                searchList.startTime = this.searchList.startTime
                searchList.endTime = this.searchList.endTime
                searchList.page = this.page;
                searchList.limit = this.limit;
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'sendRecord/selectSendRecord.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.$store.state.SMSlogList = res.data.map.sendRecords
                    _this.$store.state.SMSlogListnumber = res.data.count
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
