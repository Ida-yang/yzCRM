<template>
    <!-- <div>{{msg}}</div> -->
    <!-- 短信雷达 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in pIdData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.time">
                <span class="nameList">时间更新：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in timeData" :key="item.id" :label="item.id" @change="search()">{{item.typeName}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList" style="width:100%;">
            <el-input placeholder="请输入联系人或公司名称" v-model="searchName" style="margin-left:20px;width:400px;" @keyup.enter.native="search">
                <el-select v-model="searchList.keyType" slot="prepend" placeholder="请选择" style="width:125px"> 
                <el-option label="联系人名称" value="1"></el-option>
                <el-option label="公司名称" value="2"></el-option>
                </el-select>
            </el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
        </div>
        <el-table
            :data="tableData"
            ref="multipleTable"
            border
            stripe
            style="width:100%;text-align:center">
            <el-table-column
                fixed
                header-align="center"
                align="center"
                type="index"
                width="45">
            </el-table-column>
            <el-table-column
                prop="coName"
                fixed
                header-align="left"
                align="left"
                label="联系人"
                min-width="100"
                sortable>
            </el-table-column>
            <el-table-column
                prop="name"
                fixed
                header-align="left"
                align="left"
                min-width="180"
                label="公司名称"
                sortable>
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column
                prop="createTime"
                header-align="left"
                align="left"
                label="时间"
                min-width="145"
                sortable>
            </el-table-column>
            <el-table-column
                prop="titile"
                show-overflow-tooltip
                header-align="left"
                align="left"
                label="内容"
                min-width="160"
                sortable>
            </el-table-column>
            <el-table-column
                prop="ip"
                header-align="left"
                align="left"
                label="IP"
                min-width="140"
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
        name:'SMSradar',
        store,
        computed:{
            tableData(){
                return store.state.SMSradarList
            },
            tableNumber(){
                return store.state.SMSradarListnumber
            },
        },
        data(){
            return{
                msg:'短信雷达',
                searchList:{},
                nullvalue:null,
                page:1,//默认第一页
                limit:100,//默认100条

                pIdData:[
                    {label:'0',value:'全部'},
                    {label:'1',value:'我的'},
                    {label:'2',value:'本组'},
                    {label:'3',value:'本机构'}
                ],
                timeData:[
                    {id:'1',typeName:'今天'},
                    {id:'2',typeName:'昨天'},
                    {id:'3',typeName:'本周'},
                    {id:'4',typeName:'本月'},
                    {id:'5',typeName:'上月'}
                ],
                searchName:null,
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
                const _this = this;
                let qs =require('querystring')
                let searchList = {}
                if(this.searchList.keyType == '1'){
                    searchList.searchName = this.searchName
                }else if(this.searchList.keyType == '2'){
                    searchList.keyWord = this.searchName
                }
                if(this.searchList.label == 0 ){
                    searchList.pId = _this.nullvalue
                }else if(this.searchList.label == 1){
                    searchList.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    searchList.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    searchList.deptid = _this.$store.state.insid
                }
                searchList.page = this.page;
                searchList.limit = this.limit;

                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'openRecord/selectOpenRecord.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.$store.state.SMSradarList = res.data.map.openRecords
                    _this.$store.state.SMSradarListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            search(){},
            handleSizeChange(){},
            handleCurrentChange(){},
        },
    }
</script>

