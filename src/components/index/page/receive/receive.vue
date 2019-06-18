<template>
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.stateid">
                <span class="nameList">工单状态：</span>
                <el-radio :label="nullvalue" @click="search">全部</el-radio>
                <el-radio v-for="item in stateData" :key="item.index" :label="item.index" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList" style="width:100%;">
            <span class="nameList">公司名称：</span>
            <el-input placeholder="请输入公司名称或单号" v-model="searchList.searchName" style="margin-left:20px;width:400px;" @input="search">
                <el-select v-model="searchList.searchOption" slot="prepend" placeholder="请选择" style="width:110px"> 
                    <el-option label="公司名称" value="1"></el-option>
                    <el-option label="原单号" value="2"></el-option>
                </el-select>
            </el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <div class="totalnum_head">共 <span style="font-weight:bold">{{tableNumber}}</span> 条</div>
        </div>
        <el-table :data="tableData" border stripe style="width:100%">
            <el-table-column header-align="center" fixed align="center" type="index" width="45"></el-table-column>
            <el-table-column label="日期" prop="createTime" fixed min-width="100" sortable></el-table-column>
            <el-table-column label="回款编号" prop="backNo" fixed min-width="150" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                    <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                        {{scope.row.backNo}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="公司名称" prop="customerName" min-width="180" sortable></el-table-column>
            <el-table-column label="原单号" prop="contract_number" min-width="150" sortable></el-table-column>
            <el-table-column label="原单类型" prop="type" min-width="110" sortable></el-table-column>
            <el-table-column label="总金额" prop="totalAmount" min-width="100" sortable></el-table-column>
            <el-table-column label="已回款金额" prop="amount_of_repayment" min-width="130" sortable></el-table-column>
            <el-table-column label="本次回款金额" prop="price" min-width="130" sortable>
                <template slot-scope="scope">
                    {{scope.row.price | commaing}}
                </template>
            </el-table-column>
            <el-table-column label="支付方式" prop="pay_type" min-width="110" sortable></el-table-column>
            <el-table-column label="状态" prop="checkStatus" min-width="90" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.checkStatus == 0">待审核</span>
                    <span v-if="scope.row.checkStatus == 1">审核中</span>
                    <span v-if="scope.row.checkStatus == 2">已审核</span>
                    <span v-if="scope.row.checkStatus == 3">未通过</span>
                </template>
            </el-table-column>
            <el-table-column label="制单人" prop="private_employee" min-width="90" sortable></el-table-column>
            <el-table-column label="部门" prop="deptname" min-width="110" sortable></el-table-column>
            <el-table-column label="机构" prop="parentname" min-width="130" show-overflow-tooltip="" sortable></el-table-column>
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
    import store from '../../../../store/store';
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'receive',
        store,
        filters:{
            commaing(value){
                let intPart = Math.trunc(value) //获取整数部分
                let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                return intPartFormat
            },
        },
        computed:{
            tableData(){
                return store.state.receiveList;
            },
            tableNumber(){
                return store.state.receiveListnumber;
            }
        },
        data(){
            return{
                msg:'receive.vue',

                page:1,
                limit:20,
                searchList:{
                    searchName:null,
                    searchOption:'1',
                    stateid:0
                },

                stateData:[
                    {index:0,name:'待审核'},
                    {index:1,name:'已审核'},
                    {index:2,name:'审核中'},
                    {index:3,name:'未通过'},
                ],
                nullvalue:null,
            }
        },
        mounted(){
            this.loadTable()
        },
        methods:{
            loadTable(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                if(this.searchList.searchOption == '1'){
                    data.searchName = this.searchList.searchName
                }else if(this.searchList.searchOption == '2'){
                    data.keyWord = this.searchList.searchName
                }
                data.stateid = this.searchList.stateid
                data.page = this.page
                data.limit = this.limit

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp + 'back/queryForList.do?cId=' + _this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.$store.state.receiveList = res.data.map.success
                    _this.$store.state.receiveListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            openDetails(index,row){
                this.$store.state.receivdetailData = {id:row.id}
                this.$router.push({ path: '/receivedetail' });
            },
            search(){
                console.log(this.searchList.searchOption)
                this.$options.methods.loadTable.bind(this)()
            },
            handleSizeChange(val){
                this.limit = val
                this.$options.methods.loadTable.bind(this)()
            },
            handleCurrentChange(val){
                this.page = val
                this.$options.methods.loadTable.bind(this)()
            },
        },
    }
</script>
