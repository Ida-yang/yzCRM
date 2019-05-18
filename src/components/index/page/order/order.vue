<template>
    <!-- 订单 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in pIdData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList">
            <span class="nameList">公司名称：</span>
            <el-input v-model="searchList.searchName" placeholder="请输入公司名称" style="width:300px;" @keyup.enter.native="search"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <el-button class="btn info-btn" size="mini" @click="handledeletes()">删除</el-button>
            <div class="totalnum_head">共 <span style="font-weight:bold">{{tableNumber}}</span> 条</div>
            <el-popover
                placement="bottom"
                width="100"
                trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist">
                    <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                </el-checkbox-group>
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table
            :data="tableData"
            ref="multipleTable"
            border
            stripe
            style="width:100%;"
            @selection-change="selectInfo">
            <el-table-column
                fixed
                header-align="center"
                align="center"
                type="selection"
                width="45"
                scope.row.id
                prop="id"
                @selection-change="selectInfo"
                sortable>
            </el-table-column>
                <el-table-column
                    prop="orderTime"
                    fixed
                    label="日期"
                    min-width="100"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="orderNo"
                    fixed
                    label="订单编号"
                    min-width="145"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="customerName"
                    fixed
                    show-overflow-tooltip
                    label="公司名称"
                    min-width="180"
                    sortable>
                    <template slot-scope="scope">
                        <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                            {{scope.row.customerName}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="contactsName"
                    label="联系人"
                    min-width="100"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="settlement"
                    label="结算方式"
                    min-width="110"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="delivery"
                    label="交货方式"
                    min-width="110"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="deliveryAddress"
                    show-overflow-tooltip
                    label="交货地址"
                    min-width="150"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_employee"
                    label="制单人名称"
                    min-width="120"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="ascription"
                    label="归属人名称"
                    min-width="120"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="deptname"
                    label="归属人部门"
                    min-width="120"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="parentname"
                    show-overflow-tooltip
                    label="归属人机构"
                    min-width="120"
                    sortable>
                </el-table-column>
            <el-table-column label="操作"
                fixed="right"
                width="150"
                header-align="center"
                align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handledetele(scope.$index, scope.row)">删除</el-button>
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
        name:'order',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.orderList;
            },
            tableNumber(){
               return store.state.orderListnumber;     
            },
        },
        data(){
            return {
                searchList:{
                    searchName:null,
                    label:'1',
                    state:null,
                    type:null,
                    time:null,
                },
                searchListNew:{
                    searchName:null,
                    label:'1',
                    state:null,
                    type:null,
                    time:null,
                },
                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    id:null,
                },
                SMSId:[],
                SMSnames:[],
                SMSphones:[],
                SMScontacts:[],
                pIdData:[
                    {label:'0',value:'全部'},
                    {label:'1',value:'我的'},
                    {label:'2',value:'本组'},
                    {label:'3',value:'本机构'}
                ],

                nullvalue:null,

                filterList:null,
                checklist:null,
            }
        },
        activated(){
            this.loadTable()
        },
        mounted(){
            this.loadTable()
            this.reloadData()
        },

        methods: {
            //获取/查询订单列表
            loadTable() {
                const _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.searchName = this.searchList.searchName;
                // if(this.searchList.label == 0 ){
                //     searchList.pId = _this.nullvalue
                // }else if(this.searchList.label == 1){
                //     searchList.pId = _this.$store.state.ispId
                // }else if(this.searchList.label == 2){
                //     searchList.secondid = _this.$store.state.deptid
                // }else if(this.searchList.label == 3){
                //     searchList.deptid = _this.$store.state.insid
                // }
                searchList.page = this.page;
                searchList.limit = this.limit;
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'order/selectOrderList.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.$store.state.orderList = res.data.map.orders
                    _this.$store.state.orderListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            
            //获取筛选列表
            reloadData() {
                const _this = this;
                let qs =require('querystring')
                let filterList = {}
                filterList.type = '订单'
                let data = {}
                data.type = '订单'
                data.state = 1
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getAllUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(filterList)
                }).then(function(res){
                    _this.filterList = res.data
                }).catch(function(err){
                    // console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.checklist = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            selectInfo(val){
                const _this = this
                let arr = val;
                let newArr = [new Array()];
                arr.forEach((item) => {
                    if(item.id != 0){
                        newArr.push(item.id)
                    }
                });
                this.idArr.id = newArr;
            },
            openDetails(index,row){
                this.$store.state.cluedetailsData = {submitData:{"id": row.id}};
                this.$router.push({ path: '/clueDetails' });
            },
            handleAdd(){
                const _this = this
                // axios({
                //     method: 'get',
                //     url: _this.$store.state.defaultHttp+'clueJurisdiction/insert.do',//新增线索
                // }).then(function(res){
                //     if(res.data.msg && res.data.msg == 'error'){
                //         _this.$message({
                //             message:'对不起，您没有该权限，请联系管理员开通',
                //             type:'error'
                //         })
                //     }else{
                        _this.$router.push({ path: '/orderadd' });
                //     }
                // }).catch(function(err){
                //     // console.log(err);
                // });
            },
            handleEdit(index,row){
                const _this = this
                let orderupdateData = {}
                orderupdateData.setForm = {id:row.id}
                this.$store.state.orderupdateData = orderupdateData;
                // axios({
                //     method: 'get',
                //     url: _this.$store.state.defaultHttp+'clueJurisdiction/update.do',//修改线索
                // }).then(function(res){
                //     if(res.data.msg && res.data.msg == 'error'){
                //         _this.$message({
                //             message:'对不起，您没有该权限，请联系管理员开通',
                //             type:'error'
                //         })
                //     }else{
                        _this.$router.push({ path: '/orderupdate' });
                //     }
                // }).catch(function(err){
                //     // console.log(err);
                // });
            },
            handledeletes(){
                const _this = this
                // this.
                let qs = require('querystring')
                let idArr = []
                idArr.id = this.idArr.id

                if(idArr.id){
                    idArr.id.shift(0)
                    _this.$confirm('是否确认删除订单？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        axios({
                            method: 'post',
                            url:  _this.$store.state.defaultHttp+ 'order/delete.do?cId='+_this.$store.state.iscId,
                            data:qs.stringify(idArr),
                        }).then(function(res){
                            if(res.data.code && res.data.code == '200'){
                                _this.$message({
                                    message: '删除成功',
                                    type:'success'
                                })
                            }else{
                                _this.$message({
                                    message: res.data.msg,
                                    type:'error'
                                })
                            }
                            _this.$options.methods.loadTable.bind(_this)();
                        }).catch(function(err){
                            console.log(err)
                            _this.$message.error("删除失败，请重新操作");
                        })
                    }).catch(() => {
                        _this.$message({
                            type: 'info',
                            message: '取消删除'
                        });       
                    });
                }else{
                    _this.$message({
                        type: 'error',
                        message: '请先选择要删除的订单'
                    }); 
                }
            },
            handledetele(index,row){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = row.id

                _this.$confirm('是否确认删除[' + row.customerName + ']的订单？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'order/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(data),
                    }).then(function(res){
                        if(res.data.code && res.data.code =="200"){
                            _this.$message({
                                message:'删除成功',
                                type:'success'
                            })
                            _this.$options.methods.loadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){//删除合同
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        }else{
                            _this.$message({
                                message:res.data.msg,
                                type:'error'
                            })
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败，请重新操作");
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除[' + row.customerName + ']的订单'
                    });       
                });
            },
            hangleChange(e,val){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.pageInfoId = val.pageInfoId
                if(e == true){
                    data.state = 1
                }else{
                    data.state = 0
                }

                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'userPageInfo/updateUserPageByid.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data),
                }).then(function(res){
                    if(res.data && res.data =="success"){
                        _this.$options.methods.reloadData.bind(_this)(true);
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            search() {
                const _this = this
                const qs = require('querystring')
                let authorityInterface = ''
                let i = 1
                if(this.searchList.label == 0 ){
                    authorityInterface = 'clueJurisdiction/all.do'//全部线索
                    i = 0
                }else if(this.searchList.label == 2){
                    authorityInterface = 'clueJurisdiction/second.do'//本组线索
                    i = 0
                }else if(this.searchList.label == 3){
                    authorityInterface = 'clueJurisdiction/dept.do'//本机构线索
                    i = 0
                }

                if(i == 0){
                    axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+authorityInterface,
                    }).then(function(res){
                        if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message:'对不起，您没有该权限，请联系管理员开通',
                                type:'error'
                            })
                        }else{
                            _this.$options.methods.loadTable.bind(_this)(true);
                        }
                    }).catch(function(err){
                        // console.log(err);
                    });
                }else{
                    _this.$options.methods.loadTable.bind(_this)(true);
                }
                
            },
            reset(){
                this.searchList = Object.assign({}, this.searchListNew);
                this.$options.methods.loadTable.bind(this)(true);
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
