<template>
    <!-- 商机 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in businessData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.state">
                <span class="nameList">商机进度：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in stepData" :key="item.step_id" :label="item.step_id" @change="search()">{{item.step_name}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.keyWord">
                <span class="nameList">商机预测：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in stateData" :key="item.id" :label="item.id" @change="search()">{{item.typeName}}</el-radio>
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
        <div class="generCharts" @click="generateCharts">
            <i class="mdi-chart-pie chart_icon"></i>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <el-button class="btn" size="mini" @click="handleDeletes()">删除</el-button>

            <div class="totalnum_head">共 <span class="bold_span">{{tableNumber}}</span> 条</div>

            <el-popover placement="bottom" width="100" trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist">
                    <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                </el-checkbox-group>
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table :data="tableData" ref="multipleTable" border stripe :summary-method="getSummaries" show-summary style="width:100%" @selection-change="selectInfo" >
            <el-table-column fixed header-align="center" align="center" type="selection" width="45" scope.row.opportunity_id prop="opportunity_id" @selection-change="selectInfo">
            </el-table-column>
            <div v-for="(item,index) in filterList" :key="index" >
                <el-table-column label="商机编号" prop="opportunity_number" fixed v-if="item.prop == 'opportunity_number' && item.state == 1" min-width="150" sortable />
                <el-table-column label="商机名称" prop="opportunity_name" fixed v-if="item.prop == 'opportunity_name' && item.state == 1" min-width="150" sortable>
                    <template slot-scope="scope">
                        <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                            {{scope.row.opportunity_name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="opportunity_time" v-if="item.prop == 'opportunity_time' && item.state == 1" min-width="150" sortable />
                <el-table-column label="公司名称" prop="name" v-if="item.prop == 'customerpool[0].name' && item.state == 1" min-width="200" sortable />
                <el-table-column label="客户决策人" prop="coName" v-if="item.prop == 'contacts[0].coName' && item.state == 1" min-width="120" sortable />
                <el-table-column label="商机进度" prop="opportunityProgress[0].progress_name" v-if="item.prop == 'opportunityProgress[0].progress_name' && item.state == 1" min-width="110" sortable />
                <el-table-column label="成功几率" prop="opportunityProgress[0].progress_probability" show-overflow-tooltip v-if="item.prop == 'opportunityProgress[0].progress_probability' && item.state == 1" min-width="130" sortable>
                    <template slot-scope="scope">
                        <el-progress :text-inside="true" :stroke-width="20" :percentage="parseInt(scope.row.opportunityProgress[0].progress_probability)" :color="scope.row.stepcolor"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="预计成交金额" prop="estimatedAmount" v-if="item.prop == 'opportunity_achievement' && item.state == 1" min-width="130" sortable>
                    <template slot-scope="scope">
                        {{scope.row.estimatedAmount | rounding}}
                    </template>
                </el-table-column>
                <el-table-column label="成功金额" prop="successAmount" v-if="item.prop == 'successMoney' && item.state == 1" min-width="130" sortable>
                    <template slot-scope="scope">
                        {{scope.row.successAmount | rounding}}
                    </template>
                </el-table-column>
                <el-table-column label="失败金额" prop="failAmount" v-if="item.prop == 'failMoney' && item.state == 1" min-width="130" sortable>
                    <template slot-scope="scope">
                        {{scope.row.failAmount | rounding}}
                    </template>
                </el-table-column>
                <el-table-column label="预计成交时间" prop="opportunity_deal" v-if="item.prop == 'opportunity_deal' && item.state == 1" min-width="150" sortable />
                <el-table-column label="合同编号" prop="contractNumber" v-if="item.prop == 'contractNumber' && item.state == 1" min-width="150" sortable />
                <el-table-column label="合同金额" prop="amount" v-if="item.prop == 'amount' && item.state == 1" min-width="150" sortable>
                    <template slot-scope="scope">
                        {{scope.row.amount | rounding}}
                    </template>
                </el-table-column>
                <el-table-column label="负责人" prop="private_employee" v-if="item.prop == 'private_employee' && item.state == 1" min-width="90" sortable />
                <el-table-column label="部门" prop="deptname" v-if="item.prop == 'deptname' && item.state == 1" min-width="90" sortable />
                <el-table-column label="机构" prop="parentname" v-if="item.prop == 'parentname' && item.state == 1" min-width="110" show-overflow-tooltip sortable />
                <el-table-column label="备注" prop="opportunity_remarks" v-if="item.prop == 'opportunity_remarks' && item.state == 1" min-width="180" sortable />
                <el-table-column v-for="a in fieldHeadData" :label="a.name" :key="a.field_name" :prop="a.field_name" v-if="item.prop == a.field_name && item.state == 1" min-width="130" sortable />
            </div>
            <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" :disabled="scope.row.contractNumber !== null" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" :disabled="scope.row.contractNumber !== null" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    import bus from '../../bus';

    export default {
        name:'businessOpportunity',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.businessOpportunityList;
            },
            tableNumber(){
               return store.state.businessOpportunityListnumber;     
            },
        },
        filters: {
            rounding (value) {
                if(value){
                    let intPart = Math.trunc(value) //获取整数部分
                    let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                    let floatPart = '.00' // 预定义小数部分
                    let valArray = value.toString().split('.')
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
            }
        },
        data(){
            return {
                fieldHeadData:[],
                searchList:{
                    searchName:null,
                    time:null,
                    state:null,
                    keyWord:null,
                    label:'1'
                },
                searchListNew:{
                    searchName:null,
                    time:null,
                    state:null,
                    keyWord:null,
                    label:'1'
                },

                businessData:[
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
                stepData:[],
                stateData:[
                    {id:'6',typeName:'本月已成交'},
                    {id:'1',typeName:'预计7天成交'},
                    {id:'2',typeName:'预计15天成交'},
                    {id:'3',typeName:'预计本月成交'},
                    {id:'4',typeName:'预计下月成交'},
                    {id:'5',typeName:'异常商机'}
                ],

                nullvalue:null,

                page:1,//默认第一页
                limit:20,//默认20条
                idArr:{
                    id:null,
                },
                
                filterList:null,
                checklist:null,
                
                dialogFormVisible:false,
                dialogFormVisible1:false,
                formLabelWidth: '130px',
                tableDatas: [
                    {
                        title:'当月预计成交金额',
                        jine:'金额',
                        yujizhanbi:'预计占比',
                        shijichengjiao:'实际成交',
                        shijizhanbi:'实际占比',
                    },{
                        title:'预计第一周成交',
                        jine:'金额',
                        yujizhanbi:'预计占比',
                        shijichengjiao:'实际成交',
                        shijizhanbi:'实际占比',
                    },{
                        title:'预计第二周成交',
                        jine:'金额',
                        yujizhanbi:'预计占比',
                        shijichengjiao:'实际成交',
                        shijizhanbi:'实际占比',
                    },{
                        title:'预计第三周成交',
                        jine:'金额',
                        yujizhanbi:'预计占比',
                        shijichengjiao:'实际成交',
                        shijizhanbi:'实际占比',
                    },{
                        title:'预计第四周成交',
                        jine:'金额',
                        yujizhanbi:'预计占比',
                        shijichengjiao:'实际成交',
                        shijizhanbi:'实际占比',
                    }
                ],

                collapse5:false
            }
        },
        beforeRouteLeave(to, from , next){
            this.collapse5 = false;
            bus.$emit('collapse5', this.collapse5);
            next()
        },
        activated(){
            this.loadFieldHead()
            this.reloadTable()
        },
        mounted(){
            this.loadFieldHead()
            this.reloadTable()
            this.reloadData()
            this.loadStep()
        },

        methods: {
            reloadTable() {
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
                searchList.example = this.searchList.time
                searchList.stateid = this.searchList.state
                searchList.keyWord = this.searchList.keyWord
                searchList.page = this.page;
                searchList.limit = this.limit;
                searchList.label = 5
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'pageInfo/queryPageList.do?cId='+_this.$store.state.iscId,
                    // url: _this.$store.state.defaultHttp+'opportunity/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    let data = res.data.map.success
                    data.forEach((el) => {
                        el.successAmount = 0
                        el.failAmount = 0
                        el.estimatedAmount = 0
                        if(el.opportunityProgress[0].progress_probability == '100'){
                            el.stepcolor = '#67c23a'
                            el.successAmount = el.opportunity_achievement
                            el.failAmount = 0
                            el.estimatedAmount = 0
                        }else if(el.opportunityProgress[0].progress_probability == '0'){
                            el.successAmount = 0
                            el.failAmount = el.opportunity_achievement
                            el.estimatedAmount = 0
                        }else if(el.opportunityProgress[0].progress_probability < '50'){
                            el.stepcolor = '#909399'
                            el.successAmount = 0
                            el.failAmount = 0
                            el.estimatedAmount = el.opportunity_achievement
                        }else if(el.opportunityProgress[0].progress_probability >= '50'){
                            el.stepcolor = '#f56c6c'
                            el.successAmount = 0
                            el.failAmount = 0
                            el.estimatedAmount = el.opportunity_achievement
                        }
                    });
                    _this.$store.state.businessOpportunityList = data
                    _this.$store.state.businessOpportunityListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadFieldHead(){
                const _this = this
                let qs =require('querystring')
                let data = {
                    label: 5,
                    pId: this.$store.state.ispId
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'field/queryListHead.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data),
                }).then(function(res){
                    _this.fieldHeadData = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            reloadData() {
                const _this = this;
                let qs =require('querystring')
                let filterList = {}
                filterList.type = '商机'
                let data = {}
                data.type = '商机'
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
            loadStep(){
                const _this = this
                
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'addstep/selectAddstep.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.stepData = res.data.map.addsteps
                }).catch(function(err){
                    // console.log(err);
                });
            },
            colorMethod(percentage){
                if(percentage < 50) {
                    return '#909399';
                }else if(percentage < 100) {
                    return '#f56c6c';
                }else{
                    return '#67c23a';
                }
            },
            selectInfo(val){
                this.multipleSelection = val;
                let arr = val;
                let newArr = [new Array()];
                arr.forEach((item) => {
                    if(item.opportunity_id != 0){
                        newArr.push(item.opportunity_id)
                    }
                });
                this.idArr.id = newArr;
            },
            openDetails(index,row){
                let oppdetailsData = {};
                oppdetailsData.submitData = {"id": row.opportunity_id};
                this.$store.state.oppdetailsData = oppdetailsData;
                this.$router.push({ path: '/businessOpportunityDetails' });
            },
            handleAdd(){
                let oppaddOrUpdateData = {};
                const _this = this
                oppaddOrUpdateData.createForm = [
                    {"label":"商机名称","inputModel":"opportunity_name"},
                    {"label":"公司名称","inputModel":"customerpool_id","type":"require"},
                    {"label":"客户决策人","inputModel":"contacts_id","type":"select"},
                    {"label":"预计成交金额","inputModel":"opportunity_achievement","type":"number"},
                    {"label":"预计成交时间","inputModel":"opportunity_deal","type":"date"},
                    {"label":"负责人","inputModel":"user_id","disabled":true},
                    {"label":"备注","inputModel":"opportunity_remarks","type":'textarea'}];
                oppaddOrUpdateData.setForm = {
                    "opportunity_name": '',
                    "customerpool_id": '',
                    "customerpool_name": '',
                    "contacts_id": '',
                    "contacts_name": '',
                    "opportunity_achievement":'',
                    "opportunity_deal":'',
                    "user_id":this.$store.state.user,
                    "opportunity_remarks": ''};
                oppaddOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'opportunity/saveOrUpdate.do?cId='+this.$store.state.iscId,
                this.$store.state.oppaddOrUpdateData = oppaddOrUpdateData;

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'opportunityJurisdiction/insert.do',//新增商机
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$router.push({ path: '/Opportunityaddorupdate' });
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleEdit(index,row){
                const _this = this
                let oppaddOrUpdateData = {};
                oppaddOrUpdateData.createForm = [
                    {"label":"商机名称","inputModel":"opportunity_name"},
                    {"label":"公司名称","inputModel":"customerpool_id","type":"require"},
                    {"label":"客户决策人","inputModel":"contacts_id","type":"select"},
                    {"label":"预计成交金额","inputModel":"opportunity_achievement","type":"number"},
                    {"label":"预计成交时间","inputModel":"opportunity_deal","type":"date"},
                    {"label":"负责人","inputModel":"user_id","disabled":true},
                    {"label":"备注","inputModel":"opportunity_remarks","type":'textarea'}];
                oppaddOrUpdateData.setForm = {
                    "opportunity_name": row.opportunity_name,
                    "customerpool_id": row.customerpool_id,
                    "customerpool_name": row.name,
                    "contacts_id": row.coName,
                    "contacts_name": row.csId,
                    "opportunity_achievement":row.opportunity_achievement,
                    "opportunity_deal":row.opportunity_deal,
                    "user_id":row.private_employee,
                    "opportunity_remarks": row.opportunity_remarks};
                oppaddOrUpdateData.submitData = {"id":row.opportunity_id, 'batch_id': row.batch_id};
                oppaddOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'opportunity/saveOrUpdate.do?cId='+this.$store.state.iscId,
                this.$store.state.oppaddOrUpdateData = oppaddOrUpdateData;

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'opportunityJurisdiction/update.do',//编辑商机
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$router.push({ path: '/Opportunityaddorupdate' });
                    }
                }).catch(function(err){
                    // console.log(err);
                });
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
                            url:  _this.$store.state.defaultHttp+ 'opportunity/delete.do?cId='+_this.$store.state.iscId,
                            data:qs.stringify(idArr),
                        }).then(function(res){
                            if(res.data.success && res.data.success == true) {
                                _this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                _this.$options.methods.reloadTable.bind(_this)(true);
                            }else if(res.data.msg && res.data.msg == 'error'){//删除商机
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
                        _this.$message({
                            type: 'info',
                            message: '取消删除'
                        });       
                    });
                }else{
                    _this.$message({
                        type: 'error',
                        message: '请先选择要删除的商机'
                    }); 
                }
                
            },
            handleDelete(index,row){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = row.opportunity_id

                _this.$confirm('是否确认删除[' + row.opportunity_name + ']？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'opportunity/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.success && res.data.success == true) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){//删除商机
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
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除[' + row.opportunity_name + ']'
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
            getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if(column.property == 'estimatedAmount' || column.property == 'successAmount' || column.property == 'failAmount' || column.property == 'opportunity_achievement' || column.property == 'amount'){
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
                    authorityInterface = 'opportunityJurisdiction/all.do'//全部商机
                    i = 0
                }else if(this.searchList.label == 2){
                    authorityInterface = 'opportunityJurisdiction/second.do'//本组商机
                    i = 0
                }else if(this.searchList.label == 3){
                    authorityInterface = 'opportunityJurisdiction/dept.do'//本机构商机
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
            generateCharts(){
                const _this = this
                let qs = require('querystring')

                let date = new Date()
                let y = date.getFullYear() //获取完整的年份(4位,1970-????)
                let m = date.getMonth() + 1 //获取当前月份(0-11,0代表1月)
                m = (m < 10 ? "0" + m : m)

                let data = {}
                if(this.searchList.label == 1){
                    data.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    data.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    data.deptid = _this.$store.state.insid
                }
                data.yearMonth = y + '-' + m

                _this.$store.state.oppChartsData = data

                _this.collapse5 = !_this.collapse5
                bus.$emit('collapse5', _this.collapse5)
            },
        },
    }
</script>

<style>
</style>
