<template>
    <!-- 客户池 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">客户分类：</span>
                <el-radio v-for="item in pIdData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList" style="width:100%;">
            <el-input v-model="searchList.searchName" placeholder="公司名称" style="width:300px;"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="info-btn" size="mini" @click="handleDeletes()">删除</el-button>
            <el-button class="info-btn" size="mini" @click="handleReceives()">领取</el-button>
            <!-- <el-button class="btn" size="mini" @click="cluePool()">分配</el-button> -->
            <el-popover placement="bottom" width="100" v-model="visible2" trigger="click">
                <el-select v-model="userData.pId" placeholder="请选择用户">
                    <el-option
                        v-for="item in useroptions"
                        :key="item.private_id"
                        :label="item.private_employee"
                        :value="item.private_id">
                    </el-option>
                </el-select>
                <br><br><br>
                <div style="text-align: right; margin: 0">
                    <el-button type="text" @click="visible2 = false">取消</el-button>
                    <el-button class="searchbutton" size="mini" @click="handleDistribution()">确定</el-button>
                </div>
                <el-button slot="reference" class="btn" size="mini">分配</el-button>
            </el-popover>
            <el-popover placement="bottom" width="100" trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist">
                    <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                </el-checkbox-group>
                <!-- <el-button slot="reference" icon="el-icon-more-outline" type="mini">筛选列表</el-button> -->
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" size="mini"></el-button>
            </el-popover>
        </div>
        <el-table
            :data="tableData"
            ref="multipleTable"
            border
            stripe
            :default-sort = "{order: 'ascending'}"
            style="width:100%;text-align:center"
            @selection-change="selectInfo">
            <el-table-column
                fixed
                header-align="left"
                align="center"
                type="selection"
                width="45"
                scope.row.id
                @selection-change="selectInfo">
            </el-table-column>
            <div v-for="(item,index) in filterList" :key="index" >
                <el-table-column
                    prop="name"
                    fixed
                    v-if="item.prop == 'name' && item.state == 1"
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
                    prop="address"
                    show-overflow-tooltip
                    v-else-if="item.prop == 'address' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="地址"
                    min-width="160"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].coName"
                    v-if="item.prop == 'contacts[0].coName' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="联系人"
                    min-width="100"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].telephone"
                    v-if="item.prop == 'contacts[0].telephone' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="电话"
                    width="100"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].phone"
                    v-if="item.prop == 'contacts[0].phone' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="手机"
                    width="100"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].qq"
                    v-if="item.prop == 'contacts[0].qq' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="QQ"
                    min-width="80"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].email"
                    v-else-if="item.prop == 'email' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="邮箱"
                    min-width="95"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].wechat"
                    v-else-if="item.prop == 'wechat' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="微信"
                    min-width="95"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].sex"
                    v-else-if="item.prop == 'sex' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="性别"
                    min-width="95"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="contacts[0].remark"
                    v-else-if="item.prop == 'remarks' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="备注"
                    min-width="95"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="follow[0].createTime"
                    v-if="item.prop == 'follow[0].createTime' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="最新跟进时间"
                    min-width="130"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="follow[0].followContent"
                    v-if="item.prop == 'follow[0].followContent' && item.state == 1"
                    show-overflow-tooltip
                    header-align="left"
                    align="left"
                    label="最新跟进记录"
                    min-width="130"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="follow[0].contactTime"
                    v-else-if="item.prop == 'follow[0].contactTime' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="140"
                    label="下次联系时间"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="privateUser[0].private_employee"
                    v-if="item.prop == 'privateUser[0].private_employee' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="前负责人"
                    min-width="110"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="deptname"
                    v-if="item.prop == 'deptname' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="部门"
                    min-width="110"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="parentname"
                    v-if="item.prop == 'parentname' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="机构"
                    min-width="110"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="countryid"
                    v-else-if="item.prop == 'countryid' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="140"
                    label="省-市-区"
                    sortable>
                    <template slot-scope="scope">{{scope.row.country}}-{{scope.row.city}}-{{scope.row.area}}</template>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    v-if="item.prop == 'createTime' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="创建时间"
                    min-width="140"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="status"
                    v-if="item.prop == 'status' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="100"
                    label="状态"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="levels"
                    v-else-if="item.prop == 'levels' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="客户级别"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="source"
                    v-if="item.prop == 'source' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="客户来源"
                    min-width="110"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="representative"
                    v-else-if="item.prop == 'representative' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="法人代表"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="registrationAuthority"
                    v-else-if="item.prop == 'registrationAuthority' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="登记机关"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="creditCode"
                    v-else-if="item.prop == 'creditCode' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="150"
                    label="社会信用代码"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="registrationNumber"
                    v-else-if="item.prop == 'registrationNumber' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="注册号"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="organizationCode"
                    v-else-if="item.prop == 'organizationCode' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="组织机构代码"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="capital"
                    v-else-if="item.prop == 'capital' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="注册资金"
                    sortable>
                    <template slot-scope="scope">{{scope.row.capital}} 万元</template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    v-else-if="item.prop == 'date' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="成立时间"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="enterpriseScale"
                    v-else-if="item.prop == 'enterpriseScale' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="企业规模"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="financingState"
                    v-else-if="item.prop == 'financingState' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="融资状态"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="industryType"
                    v-else-if="item.prop == 'industryType' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="行业"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="companyType"
                    v-else-if="item.prop == 'companyType' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="公司类型"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="operatingState"
                    v-else-if="item.prop == 'operatingState' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="110"
                    label="营业状态"
                    sortable>
                </el-table-column>
            </div>
            <el-table-column 
                label="操作"
                fixed="right"
                width="150"
                header-align="left"
                align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleReceive(scope.$index, scope.row)">领取</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        name:'customerPool',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.customerPoolList;
            },
            tableNumber(){
               return store.state.customerPoolListnumber;     
            },
        },
        data(){
            return {
                searchList:{
                    searchName:null,
                    label:'1',
                    page:null,
                    limit:null,
                },
                searchListNew:{
                    searchName:null,
                    label:'1',
                    page:null,
                    limit:null,
                },
                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    id:null,
                },

                pIdData:[
                    {label:'0',value:'全部客户'},
                    {label:'1',value:'我的客户'},
                    {label:'2',value:'本组'},
                    {label:'3',value:'本机构'},],

                useroptions:null,
                userData:{
                    pId:null,
                },
                
                filterList:null,
                checklist:null,
                
                dialogFormVisible:false,
                dialogFormVisible1:false,
                formLabelWidth: '130px',
                visible2: false,
            }
        },
        activated(){
            this.reloadTable()
            this.reloadData()
        },
        mounted(){
            this.reloadTable()
            this.reloadData()
        },
        beforeCreate(){
            let _this = this;
                let qs =require('querystring')
            axios({
                method: 'get',
                url: _this.$store.state.defaultHttp+'getNameAndId.do?cId='+_this.$store.state.iscId,
            }).then(function(res){
                // console.log(res.data)
                _this.useroptions = res.data
            }).catch(function(err){
                console.log(err);
            });
        },

        methods: {
            reloadTable() {
                let _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.searchName = this.searchList.searchName;
                if(this.searchList.label == 0 ){
                    searchList.pId = _this.nullvalue
                }else if(this.searchList.label == 1 ){
                    searchList.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    searchList.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    searchList.deptid = _this.$store.state.insid
                }else{
                    searchList.pId = _this.$store.state.ispId
                }
                searchList.page = this.page;
                searchList.limit = this.limit;
                // console.log(searchList)
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerpool/querypool.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.$store.state.customerPoolList = res.data.map.success
                    _this.$store.state.customerPoolListnumber = res.data.count;
                }).catch(function(err){
                    console.log(err);
                });
            },
            reloadData() {
                let _this = this;
                let qs =require('querystring')
                let filterList = {}
                filterList.type = '客户池'
                let data = {}
                data.type = '客户池'
                data.state = 1
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getAllUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(filterList)
                }).then(function(res){
                    // console.log(res.data)
                    _this.filterList = res.data
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(data)
                }).then(function(res){
                    // console.log(res.data)
                    _this.checklist = res.data
                }).catch(function(err){
                    console.log(err);
                });
            },
            selectInfo(val){
                this.multipleSelection = val;
                // console.log(val)
                let arr = val;
                let newArr = [new Array()];
                // console.log(arr)
                arr.forEach((item) => {
                    if(item.id != 0){
                        // console.log(item.id)
                        newArr.push(item.id)
                        // newArr.shift(item.id)
                        // console.log(newArr)
                    }
                });
                // console.log(newArr)
                this.idArr.id = newArr;
                // console.log(this.idArr.id)
                
            },
            handleDeletes(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                // console.log(idArr)
                _this.$confirm('是否确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'customerpool/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        // console.log(res)
                        if(res.data.success && res.data.success == true) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){//删除客户池
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
                        console.log(err);
                    });
                });
            },
            handleDelete(index,row){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = row.id
                _this.$confirm('是否确认删除[' + row.name + ']？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'customerpool/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        // console.log(res)
                        if(res.data.success && res.data.success == true) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        } else if(res.data.msg && res.data.msg == 'error'){//删除客户池
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        }else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        console.log(err);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除[' + row.name + ']'
                    });       
                });
            },
            handleReceives(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.ids = this.idArr.id
                idArr.pId = _this.$store.state.ispId
                idArr.secondid = _this.$store.state.deptid
                idArr.deptid = _this.$store.state.insid

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerPoolJurisdiction/receive.do',
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'error'){//领取客户池
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        axios({
                            method: 'post',
                            url:  _this.$store.state.defaultHttp+ 'customerpool/receivepool.do?cId='+_this.$store.state.iscId,
                            data:qs.stringify(idArr),
                        }).then(function(res){
                            // console.log(res)
                            if(res.data.code && res.data.code == 200) {
                                _this.$message({
                                    message: '领取成功',
                                    type: 'success'
                                });
                                _this.$options.methods.reloadTable.bind(_this)(true);
                            } else {
                                _this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(function(err){
                            console.log(err);
                        });
                    }
                }).catch(function(err){
                    console.log(err);
                });
                
            },
            handleReceive(index,row){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.ids = row.id
                idArr.secondid = _this.$store.state.deptid
                idArr.deptid = _this.$store.state.insid

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerPoolJurisdiction/receive.do',
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'error'){//领取客户池
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        axios({
                            method: 'post',
                            url: _this.$store.state.defaultHttp+'customerpool/receivepool.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                            data:qs.stringify(idArr),
                        }).then(function(res){
                            // console.log(res)
                            if(res.data.code && res.data.code == 200) {
                                _this.$message({
                                    message: '领取成功',
                                    type: 'success'
                                });
                                _this.$options.methods.reloadTable.bind(_this)(true);
                            } else {
                                _this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(function(err){
                            console.log(err);
                        })
                    }
                }).catch(function(err){
                    console.log(err);
                });
                
            },
            handleDistribution(){
                let _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.ids = this.idArr.id
                idArr.pId = this.userData.pId
                idArr.secondid = ''
                idArr.deptid = ''

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerPoolJurisdiction/distribution.do',
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'error'){//分配客户池
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        axios({
                            method: 'post',
                            url:  _this.$store.state.defaultHttp+ 'customerpool/receivepool.do?cId='+_this.$store.state.iscId,
                            data:qs.stringify(idArr),
                        }).then(function(res){
                            // console.log(res)
                            if(res.data.code && res.data.code == 200) {
                                _this.$message({
                                    message: '分配成功',
                                    type: 'success'
                                });
                                _this.visible2 = false
                                _this.$options.methods.reloadTable.bind(_this)(true);
                            } else {
                                _this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(function(err){
                            console.log(err);
                        });
                    }
                }).catch(function(err){
                    console.log(err);
                });
                
            },

            
            hangleChange(e,val){
                // console.log(e)
                let _this = this
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
                    // console.log(res)
                    if(res.data && res.data =="success"){
                        _this.$options.methods.reloadData.bind(_this)(true);
                    }else{
                        console.log(err)
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            search() {
                const _this = this
                const qs = require('querystring')
                if(this.searchList.label == 0 ){
                    this.authorityInterface = 'customerPoolJurisdiction/all.do'//全部客户池
                }else if(this.searchList.label == 1 ){
                    this.authorityInterface = 'customerPoolJurisdiction/my.do'//我的客户池
                }else if(this.searchList.label == 2){
                    this.authorityInterface = 'customerPoolJurisdiction/second.do'//本组客户池
                }else if(this.searchList.label == 3){
                    this.authorityInterface = 'customerPoolJurisdiction/dept.do'//本机构客户池
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+_this.authorityInterface,
                }).then(function(res){
                    // console.log(res)
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            reset(){
                this.searchList = Object.assign({}, this.searchListNew);
                this.$options.methods.reloadTable.bind(this)(true);
            },

            handleSizeChange(val) {
                let _this = this;
                _this.limit = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
            },
            handleCurrentChange(val) {
                let _this = this;
                _this.page = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
            },
        },
    }
</script>

<style>
    .el-row{
        margin-bottom: 10px;
    }
</style>
