<template>
    <!-- 拜访计划 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in pIdData" :key="item.id" :label="item.id" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.time">
                <span class="nameList">计划时间：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in timeData" :key="item.id" :label="item.id" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.state">
                <span class="nameList">计划状态：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in stateData" :key="item.id" :label="item.name" @change="search()">{{item.name}}</el-radio>
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
            <div v-for="(item,index) in filterList" :key="index" >
                <el-table-column
                    prop="id"
                    v-if="item.prop == 'visitTheme' && item.state == 1"
                    fixed
                    header-align="left"
                    align="left"
                    min-width="350"
                    label="主要信息"
                    sortable>
                    <template slot-scope="scope">
                        <div class="visit_info">
                            <span @click="openDetails(scope.$index, scope.row)" class="visit_theme visit_customer hoverline">{{scope.row.customerName}}</span>
                            <span class="visit_theme">{{scope.row.contactsName}}</span>
                        </div>
                        <div class="visit_info">{{scope.row.visitTheme}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="phone"
                    v-else-if="item.prop == 'pheone' && item.state == 1"
                    show-overflow-tooltip
                    header-align="left"
                    align="left"
                    label="电话"
                    min-width="95"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="visitTime"
                    v-else-if="item.prop == 'visitTime' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="150"
                    label="计划时间"
                    sortable>
                    <template slot-scope="scope">
                        <div>
                            <p>{{scope.row.visitTime}}</p>
                            <p>{{scope.row.endTime}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="private_employee"
                    v-else-if="item.prop == 'private_employee' && item.state == 1"
                    show-overflow-tooltip
                    header-align="left"
                    align="left"
                    label="负责人"
                    min-width="95"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="assistants"
                    v-else-if="item.prop == 'assistants' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="协助人"
                    min-width="120"
                    sortable>
                    <template slot-scope="scope">
                        <div>
                            <span v-for="(item,index) in scope.row.assistants" :key="index" :label="item">{{item}} , </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="approver"
                    v-else-if="item.prop == 'approver' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="95"
                    label="审批人"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="approverState"
                    v-else-if="item.prop == 'approverState' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="审批状态"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="remindTime"
                    v-else-if="item.prop == 'remindTime' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="150"
                    label="提醒时间"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="state"
                    v-else-if="item.prop == 'state' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="220"
                    label="状态"
                    sortable>
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-button size="mini" :disabled="scope.row.progressBtn" :type="scope.row.progress" @click="changeState($event, scope.row)">未完成</el-button>
                            <el-button size="mini" :disabled="scope.row.completedBtn" :type="scope.row.completed" @click="changeState($event, scope.row)">已完成</el-button>
                            <el-button size="mini" :disabled="scope.row.nullifyBtn"  :type="scope.row.nullify" @click="changeState($event, scope.row)">作废</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="deptname"
                    v-else-if="item.prop == 'deptname' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="100"
                    label="部门"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="parentname"
                    v-else-if="item.prop == 'parentname' && item.state == 1"
                    show-overflow-tooltip
                    header-align="left"
                    align="left"
                    min-width="100"
                    label="机构"
                    sortable>
                </el-table-column>
            </div>
            <el-table-column label="操作"
                fixed="right"
                width="150"
                header-align="left"
                align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    :disabled="scope.row.editBtn"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="primary"
                    :disabled="scope.row.deleteBtn"
                    @click="handledelete(scope.$index, scope.row)">删除</el-button>
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
    name:'visitplan',
    store,
    computed: {
        tableData(){
            return store.state.visitplanList;
        },
        tableNumber(){
           return store.state.visitplanListnumber;
        },
    },
    data(){
        return{
            msg:'拜访计划',

            btnList:[
                {id:'1',name:'未完成'},
                {id:'2',name:'已完成'},
                {id:'3',name:'作废'},
            ],
            progress:'',
            completed:'',
            nullify:'',

            idArr:{
                id:null,
            },

            state:'未完成',

            filterList:null,
            checklist:null,

            searchList:{
                label:'1',
                time:null,
                state:'未完成',
                exa:null,
                searchName:null,
            },

            pIdData:[
                {id:'0',name:'全部'},
                {id:'1',name:'我的'},
                {id:'2',name:'本组'},
                {id:'3',name:'本机构'},
                {id:'10',name:'我协助'},
                {id:'11',name:'我审核'},
            ],
            timeData:[
                {id:'2',name:'今天'},
                {id:'1',name:'昨天'},
                {id:'5',name:'明天'},
                {id:'3',name:'本周'},
                {id:'6',name:'本月'},
                {id:'7',name:'上月'},
                {id:'8',name:'下月'},
            ],
            stateData:[
                {id:'1',name:'未完成'},
                {id:'2',name:'已完成'},
                {id:'3',name:'作废'},
            ],

            nullvalue:null,
            page:1,
            limit:15,
        }
    },
    mounted(){
        this.reloadTable()
        this.reloadData()
    },
    activated(){
        this.reloadTable()
    },
    methods:{
        //获取/查询外勤列表
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
            }else if(this.searchList.label == 10){
                searchList.userid = _this.$store.state.ispId
                searchList.type = 1
            }else if(this.searchList.label == 11){
                searchList.userid = _this.$store.state.ispId
                searchList.type = 2
            }
            if(this.searchList.state !== this.nullvalue){
                searchList.state = this.searchList.state
            }
            searchList.page = this.page
            searchList.limit = this.limit
            searchList.example = this.searchList.time
            searchList.searchName = this.searchList.searchName
            
            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'visit/selectVisit.do?cId='+_this.$store.state.iscId,
                data: qs.stringify(searchList),
            }).then(function(res){
                let data = res.data.map.success
                _this.$store.state.visitplanList = data
                _this.$store.state.visitplanListnumber = res.data.count
                data.forEach(el => {
                    let startTime = Date.parse(el.updateTime); // 开始时间
                    let endTime = new Date().getTime(); // 结束时间
                    let usedTime = endTime - startTime; // 相差的毫秒数
                    if(el.state == '未完成' || el.state == '申请拜访'){
                        el.progress = 'info'
                        el.completed = ''
                        el.nullify = ''
                    }else if(el.state == '已完成'){
                        el.progress = ''
                        el.completed = 'warning'
                        el.nullify = ''
                        if(usedTime > 7200000){
                            el.progressBtn = true
                            el.nullifyBtn = true
                            el.editBtn = true
                            el.deleteBtn = true
                        }
                    }else{
                        el.progress = ''
                        el.completed = ''
                        el.nullify = 'danger'
                        el.completedBtn = true
                        el.editBtn = true
                    }
                    if(el.approverState == '已审核'){
                        el.editBtn = true
                        el.deleteBtn = true
                    }
                    el.assistants = []
                    el.assistantsid = []
                    if(el.privateUser !== []){
                        el.privateUser.forEach(item => {
                            el.assistants.push(item.private_name)
                            el.assistantsid.push(item.private_id)
                        });
                    }
                });
            }).catch(function(err){
                // console.log(err);
            });
        },
        //获取筛选列表
        reloadData() {
            const _this = this;
            let qs =require('querystring')
            let filterList = {}
            filterList.type = '拜访计划'
            let data = {}
            data.type = '拜访计划'
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
            // let visitdetailsData = {};
            // visitdetailsData.submitData = {"id": row.id};
            this.$store.state.visitdetailsData = {submitData:{"id": row.id}}
            this.$router.push({ path: '/visitplandetails' });
            // bus.$emit('id', row.id);
        },
        getTime(){
            this.$store.commit('getNowTime')
        },
        changeState(e,row){
            this.getTime()
            const _this = this
            let qs =require('querystring')
            let data = {}
            data.id = row.id
            data.state = e.target.innerText
            data.updateTime = this.$store.state.nowtime
            if(row.pId == this.$store.state.ispId){
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'visit/updateVisitState.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data),
                }).then(function(res){
                    if(res.data.code && res.data.code == 200) {
                        _this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        _this.$options.methods.reloadTable.bind(_this)(true)
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    _this.$message.error("操作失败,请重新操作");
                });
            }else{
                _this.$message({
                    message: '对不起，您没有修改状态的权限',
                    type: 'error'
                });
            }

            
        },
        handleAdd(){
            const _this = this
            let visitaddOrUpdateData = {}
            visitaddOrUpdateData.createForm = [
                {"label":"拜访公司","inputModel":"customerName","type":"require"},
                {"label":"拜访时间","inputModel":"visitTime","type":"date"},
                {"label":"结束时间","inputModel":"endTime","type":"date"},
                {"label":"提醒时间","inputModel":"remindTime","type":"date"},
                {"label":"拜访对象","inputModel":"contactsid","type":"select"},
                {"label":"拜访主题","inputModel":"visitTheme"},
                {"label":"拜访目的","inputModel":"visitObjective","type":"textarea"},
                {"label":"协助人员","inputModel":"assistantsid","type":"select","multiple":true},
                {"label":"审批人员","inputModel":"approverid","type":"select"},
                {"label":"备注","inputModel":"remarks","type":"textarea"}]
            visitaddOrUpdateData.setForm = {
                "customerName": '',
                "visitTime": '',
                "endTime": '',
                "remindTime":'',
                "contactsid": '',
                "visitTheme": '',
                "visitObjective":'',
                "assistantsid":'',
                "approverid":'',
                "remarks": ''}
            visitaddOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'visit/insertVisit.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId
            this.$store.state.visitaddOrUpdateData = visitaddOrUpdateData
            _this.$router.push({ path: '/visitplanaddorupdate' })
        },
        handleEdit(index,row){
            const _this = this
            let visitaddOrUpdateData = {}
            visitaddOrUpdateData.createForm = [
                {"label":"拜访公司","inputModel":"customerName","type":"require"},
                {"label":"拜访时间","inputModel":"visitTime","type":"date"},
                {"label":"结束时间","inputModel":"endTime","type":"date"},
                {"label":"提醒时间","inputModel":"remindTime","type":"date"},
                {"label":"拜访对象","inputModel":"contactsid","type":"select"},
                {"label":"拜访主题","inputModel":"visitTheme"},
                {"label":"拜访目的","inputModel":"visitObjective","type":"textarea"},
                {"label":"协助人员","inputModel":"assistantsid","type":"select","multiple":true},
                {"label":"审批人员","inputModel":"approverid","type":"select"},
                {"label":"备注","inputModel":"remarks","type":"textarea"}]
            visitaddOrUpdateData.setForm = {
                "customerpoolid": row.customerpoolid,
                "customerName": row.customerName,
                "visitTime": row.visitTime,
                "endTime": row.endTime,
                "remindTime": row.remindTime,
                "contactsid": row.contactsid,
                "contactsName": row.contactsName,
                "visitTheme": row.visitTheme,
                "visitObjective":row.visitObjective,
                "assistantsid":row.assistantsid,
                "assistants": row.assistants,
                "approverid":row.approverid,
                "approver": row.approver,
                "remarks": row.remarks}
            visitaddOrUpdateData.submitData = {"id": row.id}
            visitaddOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'visit/updateVisit.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId
            this.$store.state.visitaddOrUpdateData = visitaddOrUpdateData
            _this.$router.push({ path: '/visitplanaddorupdate' })
        },
        handledelete(index,row){
            const _this = this
            let qs = require('querystring')
            let idArr = []
            idArr.id = row.id

            _this.$confirm('是否确认删除[' + row.visitTheme + ']？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'visit/deleteVisit.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(idArr),
                }).then(function(res){
                    if(res.data.code && res.data.code == 200) {
                        _this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        _this.$options.methods.reloadTable.bind(_this)(true)
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
                    message: '取消删除[' + row.visitTheme + ']'
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
        search(){
            this.$options.methods.reloadTable.bind(this)(true)
        },
        handleSizeChange(val) {
            const _this = this;
            _this.limit = val;
            this.$options.methods.reloadTable.bind(this)(true)
        },
        handleCurrentChange(val) {
            const _this = this;
            _this.page = val;
            this.$options.methods.reloadTable.bind(this)(true)
        },
    },
}
</script>

<style>
    .visit_info{
        width: 300px;
    }
    .visit_theme{
        margin-right: 20px;
    }
    .visit_customer{
        font-size: 13px;
    }

</style>


