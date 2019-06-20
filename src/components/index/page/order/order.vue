<template>
    <!-- 订单 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in pIdData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.example">
                <span class="nameList">计划时间：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in timeData" :key="item.id" :label="item.id" @change="search()">{{item.name}}</el-radio>
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
            <div class="totalnum_head">共 <span style="font-weight:bold">{{tableNumber}}</span> 条</div>
            <el-popover placement="bottom" width="100" trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist" style="max-height:600px;overflow-y:overlay;overflow-x:hidden">
                    <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                </el-checkbox-group>
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table :data="tableData" ref="multipleTable" border stripe :summary-method="getSummaries" show-summary style="width:100%;" @selection-change="selectInfo">
            <el-table-column fixed header-align="center" align="center" type="selection" width="45" scope.row.id prop="id" @selection-change="selectInfo" sortable />
            <div v-for="(item,index) in filterList" :key="index">
                <el-table-column label="日期" prop="orderTime" fixed v-if="item.prop == 'createTime' && item.state == 1" min-width="110" sortable />
                <el-table-column label="订单编号" prop="orderNo" fixed v-if="item.prop == 'orderNo' && item.state == 1" min-width="150" sortable>
                    <template slot-scope="scope">
                        <div @click="handleEdit(scope.$index, scope.row)" class="hoverline">
                            {{scope.row.orderNo}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="公司名称" prop="customerName" fixed show-overflow-tooltip v-if="item.prop == 'customerName' && item.state == 1" min-width="200" sortable />
                <el-table-column label="总金额" prop="totalSum" v-if="item.prop == 'totalSum' && item.state == 1" min-width="110" sortable>
                    <template slot-scope="scope">
                        {{scope.row.totalSum | rounding}}
                    </template>
                </el-table-column>
                <el-table-column label="审核状态" prop="approvalStatus" v-if="item.prop == 'checkStatus' && item.state == 1" min-width="110" sortable />
                <el-table-column label="联系人" prop="contactsName" v-if="item.prop == 'contactsName' && item.state == 1" min-width="100" sortable />
                <el-table-column label="结算方式" prop="settlement" v-if="item.prop == 'settlement' && item.state == 1" min-width="110" sortable />
                <el-table-column label="交货方式" prop="delivery" v-if="item.prop == 'delivery' && item.state == 1" min-width="110" sortable />
                <el-table-column label="交货地址" prop="deliveryAddress" show-overflow-tooltip v-if="item.prop == 'address' && item.state == 1" min-width="200" sortable />
                <el-table-column label="制单人" prop="private_employee" v-if="item.prop == 'private_employee' && item.state == 1" min-width="110" sortable />
                <el-table-column label="业务员" prop="ascription" v-if="item.prop == 'ascription' && item.state == 1" min-width="110" sortable />
                <el-table-column label="部门" prop="deptname" v-if="item.prop == 'deptname' && item.state == 1" min-width="100" sortable />
                <el-table-column label="机构" prop="parentname" show-overflow-tooltip v-if="item.prop == 'parentname' && item.state == 1" min-width="100" sortable />
            </div>
            <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" :disabled="scope.row.disabledBtn" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" :disabled="scope.row.disabledBtn" type="danger" @click="handledetele(scope.$index, scope.row)">删除</el-button>
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
        filters: {
            rounding (value) {
                value = value.toFixed(2)
                let intPart = Math.trunc(value) //获取整数部分
                let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                let floatPart = '.00' // 预定义小数部分
                let valArray = value.split('.')
                if(valArray.length === 2) {
                    floatPart = valArray[1].toString() // 拿到小数部分
                    if(floatPart.length === 1) { // 补0,实际上用不着
                        return intPartFormat + '.' + floatPart + '0'
                    }else{
                        return intPartFormat + '.' + floatPart
                    }
                } else {
                    return intPartFormat + floatPart
                }
            }
        },
        data(){
            return {
                searchList:{
                    searchName:null,
                    label:'1',
                    state:null,
                    type:null,
                    time:null,
                    example:null,
                },
                searchListNew:{
                    searchName:null,
                    label:'1',
                    state:null,
                    type:null,
                    time:null,
                    example:null,
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
                timeData:[
                    {id:'1',name:'今天'},
                    {id:'2',name:'昨天'},
                    {id:'3',name:'本周'},
                    {id:'4',name:'本月'},
                    {id:'5',name:'上月'},
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
                if(this.searchList.label == 0 ){
                    searchList.pId = _this.nullvalue
                }else if(this.searchList.label == 1){
                    searchList.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    searchList.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    searchList.deptid = _this.$store.state.insid
                }
                searchList.example = this.searchList.example
                searchList.page = this.page;
                searchList.limit = this.limit;
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'order/selectOrderList.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    let array = res.data.map.orders
                    array.forEach(el => {
                        if(el.checkStatus == 0){
                            el.approvalStatus = '未审核'
                        }else if(el.checkStatus == 1){
                            el.approvalStatus = '审核中'
                        }else if(el.checkStatus == 2){
                            el.approvalStatus = '审核通过'
                            el.disabledBtn = true
                        }else if(el.checkStatus == 3){
                            el.approvalStatus = '未通过'
                        }
                    });
                    _this.$store.state.orderList = array
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
                filterList.type = '销售订单'
                let data = {}
                data.type = '销售订单'
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
            
            getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if(column.property == 'totalSum'){
                        sums[index] = values.reduce((acc, cur) => (cur + acc), 0)
                        sums[index] = sums[index].toFixed(2)
                        let intPart = Math.trunc(sums[index])
                        let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                        let floatPart = '.00' // 预定义小数部分
                        let valArray = sums[index].split('.')
                        if(valArray.length === 2) {
                            floatPart = valArray[1].toString() // 拿到小数部分
                            if(floatPart.length === 1) { // 补0,实际上用不着
                                sums[index] = intPartFormat + '.' + floatPart + '0'
                            }else{
                                sums[index] = intPartFormat + '.' + floatPart
                            }
                        } else {
                            sums[index] = intPartFormat + floatPart
                        }
                        sums[index] += ' 元';
                    }else{
                        sums[index] = '';
                    }
                });

                return sums;
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
