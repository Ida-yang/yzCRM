<template>
    <!-- 日志页面 -->
    <div class="contentall">
        <div class="setleftcontent">
            <ul class="namecontent">
                <li v-for="item in nameList" :key="item.index" :value="item.name" :class="{actived:item.isActive}" @click="showTableval(item)">{{item.name}}</li>
            </ul>
        </div>
        <div class="centercontent"></div>
        <div class="setrightcontent" v-if="index == 1">
            <div class="searchList" style="width:100%;">
                <span class="nameList">操作模块：</span>
                <el-select v-model="searchList2.model" clearable placeholder="请选择"  @change="searchOplog">
                    <el-option v-for="item in modelData" :key="item.label" :label="item.value" :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="searchList" style="width:100%;">
                <span class="nameList">用户：</span>
                <el-select v-model="searchList2.private_employee" clearable placeholder="请选择"  @change="searchOplog">
                    <el-option v-for="item in pIdlist" :key="item.private_id" :label="item.private_employee" :value="item.private_employee"></el-option>
                </el-select>
            </div>
            <div class="searchList" style="width:100%;">
                <span class="nameList">操作时间：</span>
                <el-date-picker v-model="searchList2.yearrange" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" @change="oplogDatepick"></el-date-picker>
            </div>
            <div class="searchList" style="width:100%;"></div>
            <el-table
                :data="oplogData"
                ref="multipleTable"
                border
                stripe
                style="width:100%;">
                <el-table-column
                    fixed
                    header-align="center"
                    align="center"
                    type="index"
                    width="45">
                </el-table-column>
                <el-table-column
                    prop="model"
                    fixed
                    header-align="left"
                    align="left"
                    min-width="100"
                    label="模块"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="workName"
                    show-overflow-tooltip
                    header-align="left"
                    align="left"
                    label="对象"
                    min-width="160"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="type"
                    header-align="left"
                    align="left"
                    label="操作类型"
                    min-width="130"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_employee"
                    header-align="left"
                    align="left"
                    label="用户"
                    min-width="100"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="startDate"
                    header-align="left"
                    align="left"
                    label="时间"
                    min-width="140"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="ip"
                    show-overflow-tooltip
                    header-align="left"
                    align="left"
                    label="IP地址"
                    min-width="160"
                    sortable>
                </el-table-column>
            </el-table>
            <div class="block numberPage">
                <el-pagination
                @size-change="oplogSizeChange"
                @current-change="oplogCurrentChange"
                :current-page="page"
                :page-sizes="[100, 300, 500]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="oplogNumber">
                </el-pagination>
            </div>
        </div>
        <div class="setrightcontent" v-if="index == 2">
            <div class="radioList">
                <el-radio-group v-model="searchList.label">
                    <span class="nameList">数据授权：</span>
                    <el-radio v-for="item in pIdData" :key="item.label" :label="item.label" @change="searchSMSlog()">{{item.value}}</el-radio>
                </el-radio-group>
            </div>
            <div class="searchList" style="width:100%;">
                <span class="nameList">发送时间：</span>
                <el-date-picker v-model="searchList.yearrange" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" @change="SMSlogdatepick"></el-date-picker>
            </div>
            <div class="searchList">
                <el-input placeholder="请输入联系人或公司名称" v-model="searchName" style="margin-left:20px;width:400px;" @keyup.enter.native="searchSMSlog">
                    <el-select v-model="searchList.keyType" slot="prepend" placeholder="请选择" style="width:125px"> 
                    <el-option label="联系人名称" value="1"></el-option>
                    <el-option label="公司名称" value="2"></el-option>
                    </el-select>
                </el-input>
                &nbsp;&nbsp;
                <el-button icon="el-icon-search" type="primary" size="mini" @click="searchSMSlog()">查询</el-button>
            </div>
            <div class="searchList" style="width:100%;"></div>
            <el-table
                :data="SMSlogData"
                ref="multipleTable"
                border
                stripe
                style="width:100%;">
                <el-table-column
                    fixed
                    header-align="center"
                    align="center"
                    type="index"
                    width="45">
                </el-table-column>
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
                <el-table-column
                    prop="title"
                    header-align="left"
                    align="left"
                    label="模板标题"
                    min-width="130"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="content"
                    show-overflow-tooltip
                    header-align="left"
                    align="left"
                    label="模板内容"
                    min-width="180"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="explain"
                    show-overflow-tooltip
                    header-align="left"
                    align="left"
                    label="短信说明"
                    min-width="180"
                    sortable>
                </el-table-column>
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
                @size-change="SMSlogSizeChange"
                @current-change="SMSlogCurrentChange"
                :current-page="page"
                :page-sizes="[100, 300, 500]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="SMSlogNumber">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'logs',
        store,
        computed: {
            oplogData(){
                return store.state.logList;
            },
            oplogNumber(){
               return store.state.logListnumber;     
            },
            SMSlogData(){
                return store.state.SMSlogList;
            },
            SMSlogNumber(){
               return store.state.SMSlogListnumber;     
            },
        },
        data(){
            return {
                
                nameList:[
                    {index:1,name:'操作日志',isActive:true},
                    {index:2,name:'短信日志',isActive:false},
                ],
                index:'1',
                
                searchList:{
                    keyType:'1',
                    yearrange:null,
                    startTime:null,
                    endTime:null,
                    label:'1'
                },
                searchList2:{
                    model:null,
                    private_employee:null,
                    yearrange:null,
                    startTime:null,
                    endTime:null,
                },
                page:1,//默认第一页
                limit:100,//默认100条

                modelData:[
                    {label:'1',value:'社交营销'},
                    {label:'2',value:'商机状态'},
                    {label:'3',value:'工商数据'},
                    {label:'4',value:'方案目标'},
                    {label:'5',value:'联系人'},
                    {label:'6',value:'合同'},
                    {label:'7',value:'数据中心'},
                    {label:'8',value:'客户'},
                    {label:'9',value:'线索'},
                    {label:'10',value:'部门机构'},
                    {label:'11',value:'跟进记录'},
                    {label:'12',value:'图片'},
                    {label:'14',value:'行业'},
                    {label:'15',value:'登录'},
                    {label:'16',value:'提醒信息'},
                    {label:'17',value:'商机'},
                    {label:'18',value:'辅助资料'},
                    {label:'19',value:'用户'},
                    {label:'20',value:'角色'},
                    {label:'21',value:'短信模板'},
                    {label:'22',value:'类别信息'},
                    {label:'23',value:'外勤'},
                    {label:'24',value:'微信二维码'},
                    {label:'25',value:'任务'},
                ],
                pIdlist:[],
                
                pIdData:[
                    {label:'0',value:'全部'},
                    {label:'1',value:'我的'},
                    {label:'2',value:'本组'},
                    {label:'3',value:'本机构'}
                ],
                searchName:null,
            }
        },
        mounted(){
            this.loadpId()
            this.loadOplog()
            this.loadSMSlog()
        },
        activated(){
            this.loadOplog()
            this.loadSMSlog()
        },
        methods:{
            loadOplog(){
                const _this = this;
                let qs =require('querystring')
                let searchList2 = {}
                searchList2.model = this.searchList2.model
                searchList2.private_employee = this.searchList2.private_employee
                searchList2.startTime = this.searchList2.startTime
                searchList2.endTime = this.searchList2.endTime
                searchList2.page = this.page;
                searchList2.limit = this.limit;
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'logInfo/selectLogInfo.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList2),
                }).then(function(res){
                    _this.$store.state.logList = res.data.map.logInfos
                    _this.$store.state.logListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadSMSlog(){
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
            loadpId(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'getNameAndId.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.pIdlist = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //显示左边对应表格数据
            showTableval(val){
                const _this = this
                this.index = val.index
                this.nameList.forEach(function(obj){
                    obj.isActive = false;
                });
                val.isActive = !val.isActive;
            },
            oplogDatepick(val){
                if(val){
                    this.searchList2.startTime = val[0]
                    this.searchList2.endTime = val[1]
                }else{
                    this.searchList2.startTime = ''
                    this.searchList2.endTime = ''
                }
                this.$options.methods.loadOplog.bind(this)()
            },
            SMSlogdatepick(val){
                if(val){
                    this.searchList.startTime = val[0]
                    this.searchList.endTime = val[1]
                }else{
                    this.searchList.startTime = ''
                    this.searchList.endTime = ''
                }
                this.$options.methods.loadSMSlog.bind(this)()
            },

            searchSMSlog() {
                const _this = this
                let authorityInterface = ''
                if(this.searchList.label == 0 ){
                    authorityInterface = 'sendRecordJurisdiction/all.do'//全部短信日志
                }else if(this.searchList.label == 1 ){
                    authorityInterface = 'sendRecordJurisdiction/my.do'//我的短信日志
                }else if(this.searchList.label == 2){
                    authorityInterface = 'sendRecordJurisdiction/second.do'//本组短信日志
                }else if(this.searchList.label == 3){
                    authorityInterface = 'sendRecordJurisdiction/dept.do'//本机构短信日志
                }

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
                        _this.$options.methods.loadSMSlog.bind(_this)(true);
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            searchOplog() {
                const _this = this
                _this.$options.methods.loadOplog.bind(_this)(true);
            },

            oplogSizeChange(val) {
                const _this = this;
                _this.limit = val;
                _this.$options.methods.loadOplog.bind(_this)(false);
            },
            oplogCurrentChange(val) {
                const _this = this;
                _this.page = val;
                _this.$options.methods.loadOplog.bind(_this)(false);
            },
            SMSlogSizeChange(val) {
                const _this = this;
                _this.limit = val;
                _this.$options.methods.loadSMSlog.bind(_this)(false);
            },
            SMSlogCurrentChange(val) {
                const _this = this;
                _this.page = val;
                _this.$options.methods.loadSMSlog.bind(_this)(false);
            },
        }
    }
</script>
<style>
</style>
