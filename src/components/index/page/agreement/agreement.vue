<template>
    <!-- 合同页面 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in agreementData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.type">
                <span class="nameList">合同类型：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="(item,index) in typeData" :key="index" :label="item.name" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.example">
                <span class="nameList">到期合同：</span>
                <el-radio v-for="(item,index) in agreementTime" :key="index" :label="item.id" @change="search()">{{item.name}}</el-radio>
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
            <el-button class="btn" size="mini" @click="handleDeletes()">删除</el-button>
            <!-- <el-button class="btn info-btn" size="mini" @click="Receivables()">收款</el-button> -->
            <div class="totalnum_head">共 <span style="font-weight:bold">{{tableNumber}}</span> 条</div>
            <el-popover placement="bottom" width="100" trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist" style="max-height:600px;overflow-y:overlay;overflow-x:hidden">
                    <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                </el-checkbox-group>
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table :data="tableData" ref="multipleTable" border stripe :summary-method="getSummaries" show-summary style="width:100%;text-align:left" @selection-change="selectInfo">
            <el-table-column fixed header-align="center" align="center" type="selection" width="45" scope.row.contract_id prop="contract_id" @selection-change="selectInfo" />
            <div v-for="(item,index) in filterList" :key="index" >
                <el-table-column label="合同编号" prop="contract_number" fixed v-if="item.prop == 'contract_number' && item.state == 1" min-width="145" sortable />
                <el-table-column label="合同名称" prop="contract_name" fixed v-if="item.prop == 'contract_name' && item.state == 1" min-width="150" sortable>
                    <template slot-scope="scope">
                        <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                            {{scope.row.contract_name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="合同类型" prop="contract_type" v-if="item.prop == 'contract_type' && item.state == 1" min-width="110" sortable />
                <el-table-column label="公司名称" prop="poolName" v-if="item.prop == 'poolName' && item.state == 1" min-width="180" sortable />
                <el-table-column label="商机名称" prop="opportunity_name" v-if="item.prop == 'opportunity_id' && item.state == 1" min-width="120" sortable />
                <el-table-column label="合同金额" prop="amount" v-if="item.prop == 'amount' && item.state == 1" min-width="125" sortable>
                    <template slot-scope="scope">
                        {{scope.row.amount | rounding}}
                    </template>
                </el-table-column>
                <el-table-column label="合同开始日期" prop="start_date" v-if="item.prop == 'start_date' && item.state == 1" min-width="130" sortable />
                <el-table-column label="合同到期日期" prop="end_date" show-overflow-tooltip v-if="item.prop == 'end_date' && item.state == 1" min-width="130" sortable />
                <el-table-column label="剩余天数" prop="expireDay" v-if="item.prop == 'expireDay' && item.state == 1" min-width="130" sortable />
                <el-table-column label="客户签约人" prop="signatories" v-if="item.prop == 'signatories' && item.state == 1" min-width="130" sortable />
                <el-table-column label="我方签约人" prop="our_signatories" v-if="item.prop == 'our_signatories' && item.state == 1" min-width="130" sortable />
                <el-table-column label="审核状态" prop="approvalStatus" v-if="item.prop == 'state' && item.state == 1" min-width="150" sortable />
                <el-table-column label="部门" prop="deptname" v-if="item.prop == 'deptname' && item.state == 1" min-width="100" sortable />
                <el-table-column label="机构" prop="parentname" v-if="item.prop == 'parentname' && item.state == 1" min-width="130" sortable />
                <el-table-column label="创建时间" prop="create_time" v-if="item.prop == 'createTime' && item.state == 1" min-width="150" sortable />
                <el-table-column label="备注" prop="remarks" v-if="item.prop == 'remarks' && item.state == 1" sortable />
                <el-table-column label="已回款金额" prop="already" v-if="item.prop == 'already' && item.state == 1" min-width="130" sortable>
                    <template slot-scope="scope">
                        {{scope.row.already | rounding}}
                    </template>
                </el-table-column>
                <el-table-column label="剩余款项金额" prop="surplus" v-if="item.prop == 'surplus' && item.state == 1" min-width="130" sortable>
                    <template slot-scope="scope">
                        {{scope.row.surplus | rounding}}
                    </template>
                </el-table-column>
            </div>
            <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" :disabled="scope.row.disabledBtn" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" :disabled="scope.row.disabledBtn" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        name:'agreement',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.agreementList;
            },
            tableNumber(){
               return store.state.agreementListnumber;     
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
                    type:null,
                    label:'1',
                    example:'0'
                },
                searchListNew:{
                    searchName:null,
                    type:null,
                    label:'1',
                    example:'0'
                },

                agreementData:[
                    {label:'0',value:'全部'},
                    {label:'1',value:'我的'},
                    {label:'2',value:'本组'},
                    {label:'3',value:'本机构'}
                ],

                agreementTime:[
                    {id:'',name:'全部'},
                    {id:'1',name:'本月'},
                    {id:'2',name:'近一个月到期'},
                    {id:'3',name:'已过期'}
                ],
                typeData:[
                    {id:'1',name:'服务合同'},
                    {id:'2',name:'销售合同'},
                    {id:'3',name:'代理合同'},
                    {id:'4',name:'其他'}
                ],

                nullvalue:null,

                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    ids:null,
                },

                filterList:null,
                checklist:null,
                
                formLabelWidth: '130px',
            }
        },
        mounted(){
            this.reloadTable()
            this.reloadData()
        },
        activated(){
            this.reloadTable()
        },

        methods: {
            //加载所有合同
            reloadTable() {
                const _this = this;
                let qs =require('querystring')
                let searchList = {}
                if(this.searchList.label == 0 ){
                    searchList.pId = _this.nullvalue
                }else if(this.searchList.label == 1){
                    searchList.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    searchList.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    searchList.deptid = _this.$store.state.insid
                }
                searchList.searchName = this.searchList.searchName
                searchList.example = this.searchList.example
                searchList.type = this.searchList.type
                searchList.page = this.page
                searchList.limit = this.limit
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getContractAll.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    let array = res.data.map.success
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
                    _this.$store.state.agreementList = array
                    _this.$store.state.agreementListnumber = res.data.count;
                }).catch(function(err){
                    // console.log(err)
                });
            },
            reloadData() {
                const _this = this;
                let qs =require('querystring')
                
                let filterList = {}
                filterList.type = '合同'
                let data = {}
                data.type = '合同'
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
            //获取列表id
            selectInfo(val){
                this.multipleSelection = val;
                let arr = val;
                let newArr = [new Array()];
                arr.forEach((item) => {
                    if(item.contract_id != 0){
                        newArr.push(item.contract_id)
                    }
                });
                this.idArr.ids = newArr;
                
            },
            openDetails(index,row){
                let agreedetailsData = {};
                agreedetailsData.submitData = {"id": row.contract_id};
                this.$store.state.agreedetailsData = agreedetailsData;
                this.$router.push({ path: '/agreementDetails' });
            },
            handleDeletes(){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.ids = this.idArr.ids

                if(idArr.ids){
                    _this.$confirm('是否确认删除？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        axios({
                            method: 'post',
                            url:  _this.$store.state.defaultHttp+ 'delContract.do?cId='+_this.$store.state.iscId,
                            data:qs.stringify(idArr),
                        }).then(function(res){
                            if(res.data && res.data == 'success') {
                                _this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                _this.$options.methods.reloadTable.bind(_this)(true);
                            }else if(res.data.msg && res.data.msg == 'error'){//删除合同
                                _this.$message({
                                    message: '对不起，您没有该权限，请联系管理员开通',
                                    type: 'error'
                                })
                            } else {
                                _this.$message({
                                    message: res.data,
                                    type: 'error'
                                });
                            }
                        }).catch(() => {
                            _this.$message({
                                type: 'info',
                                message: '取消删除'
                            });       
                        });
                    })
                }else{
                    _this.$message({
                        type: 'error',
                        message: '请先选择要删除的合同'
                    });   
                }
            },
            handleAdd(){
                let agreeaddOrUpdateData = {};
                const _this = this
                agreeaddOrUpdateData.createForm = [
                    {"label":"合同类型","inputModel":"contract_type","type":"select","options":[
                        {"okey":'0',"olabel":"销售合同","ovalue":"销售合同"},
                        {"okey":'2',"olabel":"服务合同","ovalue":"服务合同"},
                        {"okey":'3',"olabel":"代理合同","ovalue":"代理合同"},
                        {"okey":'4',"olabel":"其他","ovalue":"其他"},
                    ]},
                    {"label":"合同名称","inputModel":"contract_name",},
                    {"label":"客户","inputModel":"customerpool_id","type":"require"},
                    {"label":"对应商机","inputModel":"opportunity_id","type":"select"},
                    {"label":"合同金额","inputModel":"amount","type":"number"},
                    {"label":"开始时间","inputModel":"start_date","type":"date"},
                    {"label":"结束时间","inputModel":"end_date","type":"date"},
                    {"label":"客户签约人","inputModel":"signatories","type":"select"},
                    {"label":"我方签约人","inputModel":"our_signatories","disabled":true},
                    {"label":"备注","inputModel":"remarks","type":'textarea'}];
                agreeaddOrUpdateData.setForm = {
                    "contract_type": '',
                    "contract_name": '',
                    "customerpool_id": '',
                    "opportunity_id": '',
                    "amount": '',
                    "start_date": '',
                    "end_date": '',
                    "signatories": '',
                    "our_signatories": this.$store.state.user,
                    "remarks": ''};
                agreeaddOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'insertContract.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                this.$store.state.agreeaddOrUpdateData = agreeaddOrUpdateData;
                // this.$router.push({ path: '/agreementaddorupdate' });
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'contractJurisdiction/insert.do',//新增合同
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$router.push({ path: '/agreementaddorupdate' });
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleEdit(index,row){
                const _this = this
                let agreeaddOrUpdateData = {};
                agreeaddOrUpdateData.createForm = [
                    {"label":"合同类型","inputModel":"contract_type","type":"select","options":[
                        {"okey":'0',"olabel":"销售合同","ovalue":"销售合同"},
                        {"okey":'2',"olabel":"服务合同","ovalue":"服务合同"},
                        {"okey":'3',"olabel":"代理合同","ovalue":"代理合同"},
                        {"okey":'4',"olabel":"其他","ovalue":"其他"},
                    ]},
                    {"label":"合同名称","inputModel":"contract_name",},
                    {"label":"客户","inputModel":"customerpool_id","type":"require"},
                    {"label":"对应商机","inputModel":"opportunity_id","type":"select"},
                    {"label":"合同金额","inputModel":"amount","type":"number"},
                    {"label":"开始时间","inputModel":"start_date","type":"date"},
                    {"label":"结束时间","inputModel":"end_date","type":"date"},
                    {"label":"客户签约人","inputModel":"signatories","type":"select"},
                    {"label":"我方签约人","inputModel":"our_signatories","disabled":true},
                    {"label":"备注","inputModel":"remarks","type":'textarea'}];
                agreeaddOrUpdateData.setForm = {
                    "contract_type": row.contract_type,
                    "contract_name": row.contract_name,
                    "customerpool_id": row.customerpool_id,
                    "poolName": row.poolName,
                    "opportunity_id": row.opportunity_name,
                    "opportunity_name":row.opportunity_id,
                    "amount": row.amount,
                    "start_date": row.start_date,
                    "end_date": row.end_date,
                    "signatories": row.signatories,
                    "our_signatories": row.our_signatories,
                    "our_signatoriesId": row.pId,
                    "remarks": row.remarks};
                agreeaddOrUpdateData.submitData = {"id": row.contract_id};
                agreeaddOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'updateContract.do?cId='+this.$store.state.iscId,
                this.$store.state.agreeaddOrUpdateData = agreeaddOrUpdateData;
                
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'contractJurisdiction/update.do',//编辑合同
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$router.push({ path: '/agreementaddorupdate' });
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleDelete(index,row){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.ids = row.contract_id
                _this.$confirm('是否确认删除[' + row.contract_name + ']？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'delContract.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data && res.data == 'success') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){//删除合同
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        }  else {
                            _this.$message({
                                message: res.data,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败，请重新操作");
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除[' + row.contract_name + ']'
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
                    _this.$message.error("提交失败，请重新提交");
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
                    if(column.property == 'amount' || column.property == 'already' || column.property == 'surplus'){
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
            search() {
                const _this = this
                const qs = require('querystring')
                let authorityInterface = ''
                let i = 1
                if(this.searchList.label == 0 ){
                    authorityInterface = 'contractJurisdiction/all.do'//全部合同
                    i = 0
                }else if(this.searchList.label == 2){
                    authorityInterface = 'contractJurisdiction/second.do'//本组合同
                    i = 0
                }else if(this.searchList.label == 3){
                    authorityInterface = 'contractJurisdiction/dept.do'//本机构合同
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
                        _this.$message.error("查询失败，请重新查询");
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
