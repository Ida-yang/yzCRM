<template>
    <!-- 客户池 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in pIdData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.time">
                <span class="nameList">新增时间：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in timeData" :key="item.id" :label="item.id" @change="search()">{{item.typeName}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList" style="width:100%;">
            <span class="nameList">公司名称：</span>
            <el-input v-model="searchList.searchName" placeholder="请输入公司名称" style="width:300px;" @keyup.enter.native="search"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="info-btn" size="mini" @click="handleDeletes()">删除</el-button>
            <el-button class="info-btn" size="mini" @click="handleReceives()">领取</el-button>

            <div class="totalnum_head">共 <span class="bold_span">{{tableNumber}}</span> 条</div>

            <el-popover placement="bottom" width="100" v-model="visible2" trigger="click">
                <el-select v-model="userData.pId" placeholder="请选择用户">
                    <el-option v-for="item in useroptions" :key="item.private_id" :label="item.private_employee" :value="item.private_id"></el-option>
                </el-select>
                <br><br><br>
                <div style="text-align: right; margin: 0">
                    <el-button type="text" @click="visible2 = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="handleDistribution()">确定</el-button>
                </div>
                <el-button slot="reference" class="btn" size="mini">分配</el-button>
            </el-popover>
            <div class="totalnum_head">共 <span class="bold_span">{{tableNumber}}</span> 条</div>
            <el-popover placement="bottom" width="100" trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist" style="max-height:600px;overflow-y:overlay;overflow-x:hidden">
                    <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                </el-checkbox-group>
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" size="mini"></el-button>
            </el-popover>
        </div>
        <el-table :data="tableData" ref="multipleTable" border stripe style="width:100%" @selection-change="selectInfo">
            <el-table-column fixed header-align="center" align="center" type="selection" width="45" scope.row.id @selection-change="selectInfo" />
            <el-table-column fixed header-align="center" align="center" width="65">
                <template slot-scope="scope">
                    <div v-show="scope.row.haveOpportunity !== 0" class="diamood_blue"><i class="mdi mdi-martini"></i></div>
                    <div v-show="scope.row.haveOpportunity == 0" class="diamood_blue_h"><i class="mdi mdi-martini"></i></div>
                    <div v-show="scope.row.haveContract !== 0" class="diamood_red"><i class="mdi mdi-coin"></i></div>
                    <div v-show="scope.row.haveContract == 0" class="diamood_red_h"><i class="mdi mdi-coin"></i></div>
                </template>
            </el-table-column>
            <div v-for="(item,index) in filterList" :key="index" >
                <el-table-column label="公司名称" prop="name" fixed v-if="item.prop == 'name' && item.state == 1" min-width="200" sortable>
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column label="地址" prop="address" show-overflow-tooltip v-if="item.prop == 'address' && item.state == 1" min-width="200" sortable />
                <el-table-column label="联系人" prop="contacts[0].coName" v-if="item.prop == 'contacts[0].coName' && item.state == 1" min-width="110" sortable />
                <el-table-column label="电话" prop="contacts[0].telephone" v-if="item.prop == 'contacts[0].telephone' && item.state == 1" width="110" sortable />
                <el-table-column label="手机" prop="contacts[0].phone" v-if="item.prop == 'contacts[0].phone' && item.state == 1" width="110" sortable />
                <el-table-column label="QQ" prop="contacts[0].qq" v-if="item.prop == 'contacts[0].qq' && item.state == 1" min-width="110" sortable />
                <el-table-column label="邮箱" prop="contacts[0].email" show-overflow-tooltip v-if="item.prop == 'email' && item.state == 1" min-width="130" sortable />
                <el-table-column label="微信" prop="contacts[0].wechat" v-if="item.prop == 'wechat' && item.state == 1" min-width="110" sortable />
                <el-table-column label="性别" prop="contacts[0].sex" v-if="item.prop == 'sex' && item.state == 1" min-width="90" sortable />
                <el-table-column label="备注" prop="contacts[0].remark" v-if="item.prop == 'remarks' && item.state == 1" min-width="180" sortable />
                <el-table-column label="最新跟进时间" prop="follow[0].createTime" v-if="item.prop == 'follow[0].createTime' && item.state == 1" min-width="150" sortable />
                <el-table-column label="最新跟进记录" prop="follow[0].followContent" show-overflow-tooltip v-if="item.prop == 'follow[0].followContent' && item.state == 1" min-width="180" sortable />
                <el-table-column label="下次联系时间" prop="follow[0].contactTime" v-if="item.prop == 'follow[0].contactTime' && item.state == 1" min-width="150" sortable />
                <el-table-column label="前负责人" prop="privateUser[0].private_employee" v-if="item.prop == 'privateUser[0].private_employee' && item.state == 1" min-width="110" sortable />
                <el-table-column label="部门" prop="deptname" v-if="item.prop == 'deptname' && item.state == 1" min-width="110" sortable />
                <el-table-column label="机构" prop="parentname" v-if="item.prop == 'parentname' && item.state == 1" min-width="110" show-overflow-tooltip sortable />
                <el-table-column label="省-市-区" prop="countryid" v-if="item.prop == 'countryid' && item.state == 1" min-width="150" sortable>
                    <template slot-scope="scope">
                        {{scope.row.country}}-{{scope.row.city}}-{{scope.row.area}}
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" v-if="item.prop == 'createTime' && item.state == 1" min-width="150" sortable />
                <el-table-column label="状态" prop="status" v-if="item.prop == 'status' && item.state == 1" min-width="90" sortable />
                <el-table-column label="客户分类" prop="levels" v-if="item.prop == 'levels' && item.state == 1" min-width="110" sortable />
                <el-table-column label="客户来源" prop="source" v-if="item.prop == 'source' && item.state == 1" min-width="110" sortable />
                <el-table-column label="法人代表" prop="representative" v-if="item.prop == 'representative' && item.state == 1" min-width="110" sortable />
                <el-table-column label="登记机关" prop="registrationAuthority" show-overflow-tooltip v-if="item.prop == 'registrationAuthority' && item.state == 1" min-width="110" sortable />
                <el-table-column label="社会信用代码" prop="creditCode" v-if="item.prop == 'creditCode' && item.state == 1" min-width="150" sortable />
                <el-table-column label="注册号" prop="registrationNumber" v-if="item.prop == 'registrationNumber' && item.state == 1" min-width="140" sortable />
                <el-table-column label="组织机构代码" prop="organizationCode" v-if="item.prop == 'organizationCode' && item.state == 1" min-width="140" sortable />
                <el-table-column label="注册资金" prop="capital" v-if="item.prop == 'capital' && item.state == 1" min-width="110" sortable>
                    <template slot-scope="scope">
                        {{scope.row.capital +'万元'}}
                    </template>
                </el-table-column>
                <el-table-column label="成立时间" prop="date" v-if="item.prop == 'date' && item.state == 1" min-width="110" sortable />
                <el-table-column label="企业规模" prop="enterpriseScale" v-if="item.prop == 'enterpriseScale' && item.state == 1" min-width="110" sortable />
                <el-table-column label="融资状态" prop="financingState" v-if="item.prop == 'financingState' && item.state == 1" min-width="110" sortable />
                <el-table-column label="行业" prop="industryType" show-overflow-tooltip v-if="item.prop == 'industryType' && item.state == 1" min-width="110" sortable />
                <el-table-column label="公司类型" prop="companyType" v-if="item.prop == 'companyType' && item.state == 1" min-width="110" sortable />
                <el-table-column label="营业状态" prop="operatingState" v-if="item.prop == 'operatingState' && item.state == 1" min-width="110" sortable />
            </div>
            <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button  size="mini"  @click="handleReceive(scope.$index, scope.row)">领取</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                    time:null,
                },
                searchListNew:{
                    searchName:null,
                    label:'1',
                    page:null,
                    limit:null,
                    time:null,
                },
                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    id:null,
                },

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

                nullvalue:null,

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
        },
        mounted(){
            this.reloadTable()
            this.reloadData()
        },
        beforeCreate(){
            const _this = this;
                let qs =require('querystring')
            axios({
                method: 'get',
                url: _this.$store.state.defaultHttp+'customerTwo/getNameAndId.do?cId='+_this.$store.state.iscId,
            }).then(function(res){
                _this.useroptions = res.data.map.success
            }).catch(function(err){
                // console.log(err);
            });
        },

        methods: {
            reloadTable() {
                const _this = this;
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
                }
                searchList.example = this.searchList.time
                searchList.page = this.page;
                searchList.limit = this.limit;
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerpool/querypool.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.$store.state.customerPoolList = res.data.map.success
                    _this.$store.state.customerPoolListnumber = res.data.count;
                }).catch(function(err){
                    // console.log(err);
                });
            },
            reloadData() {
                const _this = this;
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
                    // console.log(err)
                });
            },
            selectInfo(val){
                this.multipleSelection = val;
                let arr = val;
                let newArr = [new Array()];
                arr.forEach((item) => {
                    if(item.id != 0){
                        newArr.push(item.id)
                    }
                })
                this.idArr.id = newArr
                
            },
            handleDeletes(){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id

                if(idArr.id){
                    _this.$confirm('是否确认删除？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        axios({
                            method: 'post',
                            url:  _this.$store.state.defaultHttp+ 'customerpool/delete.do?cId='+_this.$store.state.iscId,
                            data:qs.stringify(idArr),
                        }).then(function(res){
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
                            _this.$message.error("删除失败,请重新删除");
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消删除'
                        });       
                    });
                }else{
                    _this.$message({
                        type: 'error',
                        message: '请先选择要删除的客户'
                    }); 
                }
                
            },
            handleDelete(index,row){
                const _this = this;
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
                        _this.$message.error("删除失败,请重新删除");
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除【' + row.name + '】'
                    });       
                });
                
            },
            handleReceives(){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.ids = this.idArr.id
                idArr.pId = _this.$store.state.ispId
                idArr.secondid = _this.$store.state.deptid
                idArr.deptid = _this.$store.state.insid

                if(idArr.ids){
                    _this.$confirm('是否确定领取？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(({ value }) => {
                        axios({
                            method: 'get',
                            url: _this.$store.state.defaultHttp+'customerPoolJurisdiction/receive.do',
                        }).then(function(res){
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
                                    _this.$message.error("领取失败,请重新领取");
                                });
                            }
                        }).catch(function(err){
                            // console.log(err);
                        });
                    }).catch(() => {
                        _this.$message({
                            type: 'info',
                            message: '取消领取'
                        });       
                    });
                }else{
                    _this.$message({
                        type: 'error',
                        message: '请先选择要领取的客户'
                    }); 
                }
                
                
            },
            handleReceive(index,row){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.ids = row.id
                idArr.secondid = _this.$store.state.deptid
                idArr.deptid = _this.$store.state.insid

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'customerPoolJurisdiction/receive.do',
                }).then(function(res){
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
                            _this.$message.error("领取失败,请重新领取");
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
                
            },
            handleDistribution(){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.ids = this.idArr.id
                idArr.pId = this.userData.pId
                idArr.distribution_pid = this.userData.pId
                idArr.secondid = ''
                idArr.deptid = ''

                if(idArr.ids){
                    axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+'customerPoolJurisdiction/distribution.do',
                    }).then(function(res){
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
                                _this.$message.error("分配失败,请重新分配");
                            });
                        }
                    }).catch(function(err){
                        // console.log(err);
                    });
                }else{
                    _this.$message({
                        type: 'error',
                        message: '请先选择要分配的客户'
                    }); 
                }
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
                let authorityInterface = ''
                let i = 1
                if(this.searchList.label == 0 ){
                    authorityInterface = 'customerPoolJurisdiction/all.do'//全部客户池
                    i = 0
                }else if(this.searchList.label == 2){
                    authorityInterface = 'customerPoolJurisdiction/second.do'//本组客户池
                    i = 0
                }else if(this.searchList.label == 3){
                    authorityInterface = 'customerPoolJurisdiction/dept.do'//本机构客户池
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
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        }
                    }).catch(function(err){
                        // console.log(err);
                    });
                }else{
                    _this.$options.methods.reloadTable.bind(_this)(true);
                }
            },
            reset(){
                this.searchList = Object.assign({}, this.searchListNew);
                this.$options.methods.reloadTable.bind(this)(true);
            },

            handleSizeChange(val) {
                const _this = this;
                _this.limit = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
            },
            handleCurrentChange(val) {
                const _this = this;
                _this.page = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
            },
        },
    }
</script>

<style>
</style>
