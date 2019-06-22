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
            <el-radio-group v-model="searchList.keyType">
                <span class="nameList">工单状态：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in keyTypeData" :key="item.index" :label="item.index" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.woClass">
                <span class="nameList">工单分类：</span>
                <el-radio :label="nullvalue" @change="loadItem">全部</el-radio>
                <el-radio v-for="item in woClassData" :key="item.id" :label="item.id" @change="loadItem">{{item.name}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.woClass">
                <el-radio v-for="item in woItemData" :key="item.id" :label="item.id" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList" style="width:100%;">
            <span class="nameList">公司名称：</span>
            <el-input v-model="searchList.searchName" placeholder="请输入公司名称" style="width:300px;" @keyup.enter.native="search"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <div class="totalnum_head">共 <span class="bold_span">{{tableNumber}}</span> 条</div>
        </div>
        <el-table :data="tableData" border stripe style="width:100%">
            <el-table-column header-align="center" fixed align="center" type="index" width="45"></el-table-column>
            <el-table-column label="单号" prop="workOrderNo" fixed min-width="150" sortable></el-table-column>
            <el-table-column label="问题" prop="problem" fixed min-width="200" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                    <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                        {{scope.row.problem}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="serviceState" min-width="90" sortable></el-table-column>
            <el-table-column label="公司名称" prop="customerpool" min-width="200" sortable></el-table-column>
            <el-table-column label="联系人" prop="contacts" min-width="100" sortable></el-table-column>
            <el-table-column label="电话" prop="phone" min-width="110" sortable></el-table-column>
            <el-table-column label="反馈时间" prop="feedbackTime" min-width="150" sortable></el-table-column>
            <el-table-column label="反馈方式" prop="feedbackType" min-width="110" sortable></el-table-column>
            <el-table-column label="受理人" prop="acceptanceName" min-width="100" sortable></el-table-column>
            <el-table-column label="工单类型" prop="serviceTypeName" min-width="110" sortable></el-table-column>
            <el-table-column label="销售单号" prop="orderNo" min-width="150" sortable></el-table-column>
            <el-table-column label="制单人" prop="private_employee" min-width="100" sortable></el-table-column>
            <el-table-column label="业务员" prop="ascription" min-width="100" sortable></el-table-column>
            <el-table-column label="部门" prop="deptname" min-width="110" sortable></el-table-column>
            <el-table-column label="机构" prop="parentname" min-width="110" show-overflow-tooltip sortable></el-table-column>
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
                    keyType:null,
                    woClass:null,
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
                    {index:3,name:'本周'},
                    {index:4,name:'本月'},
                    {index:5,name:'上月'},
                ],
                keyTypeData:[
                    {index:1,name:'已解决'},
                    {index:2,name:'未解决'},
                    {index:3,name:'超过3天未解决'},
                    {index:4,name:'超过7天未解决'},
                    {index:5,name:'超过15天未解决'},
                    {index:6,name:'超过一个月未解决'},
                ],
                woClassData:[],
                woItemData:[],
                nullvalue:null,
            }
        },
        mounted(){
            this.loadTable()
            this.loadClass()
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
                if(this.searchList.keyType !== this.nullvalue){
                    data.keyType = this.searchList.keyType
                }
                data.page = this.page
                data.limit = this.limit
                data.example = this.searchList.time
                data.searchName = this.searchList.searchName
                data.type = this.searchList.woClass

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'workOrder/queryForList.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    let data = res.data.map.success
                    data.forEach(el => {
                        if(!el.solution){
                            el.serviceState = '待解决'
                        }else if(el.solution){
                            el.serviceState = '待评价'
                        }
                    });
                    _this.$store.state.workOrderList = data
                    _this.$store.state.workOrderListnumber = res.data.count
                }).catch(function(err){
                });
            },
            loadClass(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'serviceType/getServiceTypeNodeTree.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.woClassData = res.data.map.success
                }).catch(function(err){
                });
            },
            loadItem(val){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = val

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'serviceType/getServiceTypeByParentId.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.woItemData = res.data
                    _this.$options.methods.search.bind(_this)()
                }).catch(function(err){
                });
            },
            openDetails(index,row){
                this.$store.state.workOrderdetaildsData = {id:row.id}
                this.$router.push({ path: '/workOrderDetail' });
            },
            handleEdit(index,row){
                const _this = this
                let datas = {}
                datas.setform = row
                datas.submitUrl = this.$store.state.defaultHttp + 'workOrder/update.do?cId='+_this.$store.state.iscId,
                this.$store.state.workOrderaddorUpdateData = datas
                _this.$router.push({ path: '/workOrderaddorupdate' });
            },
            handleDelete(index,row){
                const _this = this
                let qs =require('querystring')
                let idArr = [];
                idArr.id = row.id

                _this.$confirm('确认删除 ['+ row.problem +'] 这个问题吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'workOrder/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.loadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){//同步用户
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新删除");
                    });
                });
            },
            search(){
                const _this = this
                this.$options.methods.loadTable.bind(this)()
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
