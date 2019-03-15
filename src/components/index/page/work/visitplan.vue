<template>
    <!-- 拜访计划 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">计划分类：</span>
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
                <el-radio v-for="item in stateData" :key="item.id" :label="item.id" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.exa">
                <span class="nameList">计划审核：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in exaData" :key="item.id" :label="item.id" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <div class="totalnum_head">共 <span style="font-weight:bold">{{tableNumber}}</span> 条</div>
        </div>
        <el-table
            :data="tableData"
            :default-sort = "{prop:'id',order: 'descending'}"
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
                prop="id"
                header-align="left"
                align="left"
                min-width="400"
                label="主要信息"
                sortable>
                <template slot-scope="scope">
                    <div class="visit_info">
                        <span @click="openDetails(scope.$index, scope.row)" class="visit_theme visit_customer hoverline">{{scope.row.customerName}}</span>
                        <span class="visit_theme">{{scope.row.contactsName}}</span>
                        <span class="visit_theme">{{scope.row.phone}}</span>
                    </div>
                    <div class="visit_info">{{scope.row.visitTheme}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="private_employee"
                show-overflow-tooltip
                header-align="left"
                align="left"
                label="负责人"
                min-width="95"
                sortable>
            </el-table-column>
            <el-table-column
                prop="assistants"
                header-align="left"
                align="left"
                label="协助人"
                min-width="95"
                sortable>
            </el-table-column>
            <el-table-column
                prop="approver"
                header-align="left"
                align="left"
                min-width="95"
                label="审批人"
                sortable>
            </el-table-column>
            <el-table-column
                prop="privateUser[0].private_employee"
                header-align="left"
                align="left"
                min-width="140"
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
                prop="state"
                header-align="left"
                align="left"
                min-width="220"
                label="状态"
                sortable>
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button size="mini" :type="scope.row.progress" @click="changeState($event, scope.row)">未完成</el-button>
                        <el-button size="mini" :type="scope.row.completed" @click="changeState($event, scope.row)">已完成</el-button>
                        <el-button size="mini" :type="scope.row.nullify" @click="changeState($event, scope.row)">作废</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
            <el-table-column
                prop="deptname"
                header-align="left"
                align="left"
                min-width="100"
                label="部门"
                sortable>
            </el-table-column>
            <el-table-column
                prop="parentname"
                show-overflow-tooltip
                header-align="left"
                align="left"
                min-width="100"
                label="机构"
                sortable>
            </el-table-column>
            <el-table-column label="操作"
                fixed="right"
                width="140"
                header-align="left"
                align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="primary"
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

            searchList:{
                label:'0',
                time:null,
                state:null,
                exa:null,
            },

            pIdData:[
                {id:'0',name:'全部计划'},
                {id:'1',name:'我的计划'},
                {id:'2',name:'本组计划'},
                {id:'3',name:'本机构计划'},
            ],
            timeData:[
                {id:'1',name:'今天'},
                {id:'2',name:'昨天'},
                {id:'3',name:'明天'},
                {id:'4',name:'本周'},
                {id:'5',name:'本月'},
                {id:'6',name:'上月'},
                {id:'7',name:'下月'},
            ],
            stateData:[
                {id:'1',name:'未完成'},
                {id:'2',name:'已完成'},
                {id:'3',name:'作废'},
            ],
            exaData:[
                {id:'1',name:'独自'},
                {id:'2',name:'协助'},
                {id:'3',name:'审核'},
            ],

            nullvalue:null,
            page:1,
            limit:15,
        }
    },
    mounted(){
        this.reloadTable()
    },
    activated(){
        this.reloadTable()
    },
    methods:{
        //获取/查询线索列表
        reloadTable() {
            const _this = this;
            let qs =require('querystring')
            let searchList = {}
            // searchList.searchName = this.searchList.searchName;
            // if(this.searchList.label == 0 ){
            //     searchList.pId = _this.nullvalue
            // }else if(this.searchList.label == 1){
            //     searchList.pId = _this.$store.state.ispId
            // }else if(this.searchList.label == 2){
            //     searchList.secondid = _this.$store.state.deptid
            // }else if(this.searchList.label == 3){
            //     searchList.deptid = _this.$store.state.insid
            // }else{
            //     searchList.pId = _this.$store.state.ispId
            // }
            // searchList.page = this.page
            // searchList.limit = this.limit
            searchList.example = this.searchList.time
            // console.log(searchList)
            
            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'visit/selectVisit.do?cId='+_this.$store.state.iscId,
                data: qs.stringify(searchList),
            }).then(function(res){
                // console.log(res.data.map.success)
                let data = res.data.map.success
                _this.$store.state.visitplanList = data
                _this.$store.state.visitplanListListnumber = res.data.count
                data.forEach(el => {
                    // console.log(el.state)
                    if(el.state == '未完成' || el.state == '申请拜访'){
                        el.progress = 'primary'
                        el.completed = ''
                        el.nullify = ''
                    }else if(el.state == '已完成'){
                        el.progress = ''
                        el.completed = 'success'
                        el.nullify = ''
                    }else{
                        el.progress = ''
                        el.completed = ''
                        el.nullify = 'danger'
                    }
                });
            }).catch(function(err){
                console.log(err);
            });
        },
        selectInfo(val){
            // console.log(val)
            let arr = val;
            let newArr = [new Array()];
            // console.log(arr)
            arr.forEach((item) => {
                if(item.id != 0){
                    newArr.push(item.id)
                }
            });
            // console.log(newArr)
            this.idArr.id = newArr;
        },
        openDetails(index,row){
            const _this = this
            _this.$router.push({ path: '/visitplandetails' });
        },
        changeState(e,row){
            const _this = this
            let qs =require('querystring')
            let data = {}
            data.id = row.id
            data.state = e.target.innerText
            // console.log(data)

            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'visit/updateVisit.do?cId='+_this.$store.state.iscId,
                data: qs.stringify(data),
            }).then(function(res){
                // console.log(res.data)
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
                console.log(err);
            });
        },
        handleAdd(){
            const _this = this;
            let visitaddOrUpdateData = {};
            // visitaddOrUpdateData.title = "添加拜访计划";
            visitaddOrUpdateData.createForm = [
                {"label":"拜访公司","inputModel":"customerpoolid","type":"require"},
                {"label":"拜访时间","inputModel":"visitTime","type":"date"},
                {"label":"结束时间","inputModel":"endTime","type":"date"},
                {"label":"拜访对象","inputModel":"contactsid","type":"select"},
                {"label":"拜访主题","inputModel":"visitTheme"},
                {"label":"拜访目的","inputModel":"visitObjective","type":"textarea"},
                {"label":"协助人员","inputModel":"assistantsid","type":"select","multiple":true},
                {"label":"审批人员","inputModel":"approverid","type":"select"},
                {"label":"备注","inputModel":"remarks","type":"textarea"}];
            visitaddOrUpdateData.setForm = {
                "customerpoolid": '',
                "visitTime": '',
                "endTime": '',
                "contactsid": '',
                "visitTheme": '',
                "visitObjective":'',
                "assistantsid":'',
                "approverid":'',
                "remarks": ''};
            visitaddOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'visit/insertVisit.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
            this.$store.state.visitaddOrUpdateData = visitaddOrUpdateData;
            _this.$router.push({ path: '/visitplanaddorupdate' });
        },
        handleEdit(index,row){
            // console.log(row.id)
            const _this = this;
            let visitaddOrUpdateData = {};
            // visitaddOrUpdateData.title = "添加拜访计划";
            visitaddOrUpdateData.createForm = [
                {"label":"拜访公司","inputModel":"customerpoolid","type":"require"},
                {"label":"拜访时间","inputModel":"visitTime","type":"date"},
                {"label":"结束时间","inputModel":"endTime","type":"date"},
                {"label":"拜访对象","inputModel":"contactsid","type":"select"},
                {"label":"拜访主题","inputModel":"visitTheme"},
                {"label":"拜访目的","inputModel":"visitObjective","type":"textarea"},
                {"label":"协助人员","inputModel":"assistantsid","type":"select","multiple":true},
                {"label":"审批人员","inputModel":"approverid","type":"select"},
                {"label":"备注","inputModel":"remarks","type":"textarea"}];
            visitaddOrUpdateData.setForm = {
                "customerpoolid": row.customerpoolid,
                "visitTime": row.visitTime,
                "endTime": row.endTime,
                "contactsid": row.contactsid,
                "visitTheme": row.visitTheme,
                "visitObjective":row.visitObjective,
                "assistantsid":row.assistantsid,
                "approverid":row.approverid,
                "remarks": row.remarks};
            visitaddOrUpdateData.submitData = {"id": row.id};
            visitaddOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'visit/insertVisit.do?cId='+this.$store.state.iscId,
            this.$store.state.visitaddOrUpdateData = visitaddOrUpdateData;
            _this.$router.push({ path: '/visitplanaddorupdate' });
        },
        handledelete(index,row){
            console.log(row.id)
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
                    console.log(res.data)
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
                    console.log(err);
                });
            })
        },
        search(){
            console.log(this.searchList)
            this.$options.methods.reloadTable.bind(this)(true);
        },
        handleSizeChange(val) {
            const _this = this;
            _this.limit = val;
            this.$options.methods.reloadTable.bind(this)(true);
        },
        handleCurrentChange(val) {
            const _this = this;
            _this.page = val;
            this.$options.methods.reloadTable.bind(this)(true);
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
        font-weight: bold
    }

</style>


