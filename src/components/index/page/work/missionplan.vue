<template>
    <!-- 工作计划 -->
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
            <el-input v-model="searchList.searchName" placeholder="公司名称" style="width:300px;"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
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
                fixed
                header-align="left"
                align="left"
                min-width="350"
                label="主题"
                sortable>
                <template slot-scope="scope">
                    <div class="visit_info">
                        <span class="visit_theme mission_customer">{{scope.row.planningTheme}}</span>
                    </div>
                    <div class="visit_info">{{scope.row.describe}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="startTime"
                show-overflow-tooltip
                header-align="left"
                align="left"
                label="时间"
                min-width="135"
                sortable>
                <template slot-scope="scope">
                    <div>
                        <p>{{scope.row.startTime}}</p>
                        <p>{{scope.row.endTime}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="customerName"
                header-align="left"
                align="left"
                label="关联对象"
                min-width="150"
                sortable>
                <!-- <template slot-scope="scope">
                    <div>
                        <span v-for="(item,index) in scope.row.assistants" :key="index" :label="item">{{item}} , </span>
                    </div>
                </template> -->
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
                prop="private_employee"
                header-align="left"
                align="left"
                min-width="100"
                label="负责人"
                sortable>
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
                width="150"
                header-align="left"
                align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    :disabled="scope.row.disableBtn"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="primary"
                    :disabled="scope.row.disableBtn"
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
    name:'missionplan',
    store,
    computed: {
        tableData(){
            return store.state.missionplanList;
        },
        tableNumber(){
           return store.state.missionplanListnumber;
        },
    },
    data(){
        return{
            msg:'工作计划',

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
            thistime: null,

            searchList:{
                label:'1',
                time:null,
                state:null,
            },

            pIdData:[
                {id:'0',name:'全部'},
                {id:'1',name:'我的'},
                {id:'2',name:'本组'},
                {id:'3',name:'本机构'},
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
            searchName:null,

            // disableBtn:true
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
            if(this.searchList.label == 0 ){
                searchList.pId = _this.nullvalue
            }else if(this.searchList.label == 1){
                searchList.pId = _this.$store.state.ispId
            }else if(this.searchList.label == 2){
                searchList.secondid = _this.$store.state.deptid
            }else if(this.searchList.label == 3){
                searchList.deptid = _this.$store.state.insid
            }else{
                searchList.pId = _this.$store.state.ispId
            }
            if(this.searchList.state !== this.nullvalue){
                searchList.state = this.searchList.state
            }
            searchList.page = this.page
            searchList.limit = this.limit
            searchList.example = this.searchList.time
            searchList.searchName = this.searchName
            
            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'workPlan/selectWorkPlan.do?cId='+_this.$store.state.iscId,
                data: qs.stringify(searchList),
            }).then(function(res){
                let data = res.data.map.success
                console.log(data)
                _this.$store.state.missionplanList = data
                _this.$store.state.missionplanListnumber = res.data.count
                data.forEach(el => {
                    if(el.state == '未完成' || el.state == '申请拜访'){
                        el.progress = 'info'
                        el.completed = ''
                        el.nullify = ''
                    }else if(el.state == '已完成'){
                        el.progress = ''
                        el.completed = 'warning'
                        el.nullify = ''
                        let startTime = Date.parse(el.updateTime); // 开始时间
                        let endTime = new Date().getTime(); // 结束时间
                        let usedTime = endTime - startTime; // 相差的毫秒数
                        if(usedTime < 7200000){
                            el.disableBtn = false
                        }else{
                            el.disableBtn = true
                        }
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
            let arr = val;
            let newArr = [new Array()];
            arr.forEach((item) => {
                if(item.id != 0){
                    newArr.push(item.id)
                }
            });
            this.idArr.id = newArr;
        },
        getTime(){
            let myDate = new Date()
            let y = myDate.getFullYear() //获取完整的年份(4位,1970-????)
            let m = myDate.getMonth() + 1 //获取当前月份(0-11,0代表1月)
            let d = myDate.getDate() //获取当前日(1-31)
            let h = myDate.getHours() //获取当前小时数(0-23)
            let mm = myDate.getMinutes() //获取当前分钟数(0-59)
            let s = myDate.getSeconds() //获取当前秒数(0-59)
            m = (m < 10 ? "0" + m : m)
            d = (d < 10 ? "0" + d : d)
            h = (h < 10 ? "0" + h : h)
            mm = (mm < 10 ? "0" + mm : mm)
            s = (s < 10 ? "0" + s : s)
            this.thistime = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
            // console.log(this.thistime)
        },
        changeState(e,row){
            this.getTime()
            const _this = this
            let qs =require('querystring')
            let data = {}
            data.id = row.id
            data.state = e.target.innerText
            data.updateTime = this.thistime

            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'workPlan/updateWorkPlan.do?cId='+_this.$store.state.iscId,
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
                console.log(err);
            });
        },
        handleAdd(){
            const _this = this;
            let missionaddOrUpdateData = {}
            missionaddOrUpdateData.createForm = [
                {"label":"计划主题","inputModel":"planningTheme"},
                {"label":"关联对象","inputModel":"customerName","type":"require"},
                {"label":"开始时间","inputModel":"startTime","type":"date"},
                {"label":"结束时间","inputModel":"endTime","type":"date"},
                {"label":"描述","inputModel":"describe","type":"textarea"}]
            missionaddOrUpdateData.setForm = {
                "planningTheme": '',
                "describe": '',
                "startTime": '',
                "endTime": '',
                "customerName": ''}
            missionaddOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'workPlan/insertWorkPlan.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
            this.$store.state.missionaddOrUpdateData = missionaddOrUpdateData;
            _this.$router.push({ path: '/missionplanaddorupdate' });
        },
        handleEdit(index,row){
            const _this = this;
            let missionaddOrUpdateData = {}
            missionaddOrUpdateData.createForm = [
                {"label":"计划主题","inputModel":"planningTheme"},
                {"label":"关联对象","inputModel":"customerName","type":"require"},
                {"label":"开始时间","inputModel":"startTime","type":"date"},
                {"label":"结束时间","inputModel":"endTime","type":"date"},
                {"label":"描述","inputModel":"describe","type":"textarea"}]
            missionaddOrUpdateData.setForm = {
                "planningTheme": row.planningTheme,
                "describe": row.describe,
                "startTime": row.startTime,
                "endTime": row.endTime,
                "customerId": row.customerId,
                "customerName": row.customerName}
            missionaddOrUpdateData.submitData = {"id": row.id};
            missionaddOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'workPlan/updateWorkPlan.do?cId='+this.$store.state.iscId,
            this.$store.state.missionaddOrUpdateData = missionaddOrUpdateData;
            _this.$router.push({ path: '/missionplanaddorupdate' });
        },
        handledelete(index,row){
            const _this = this
            let qs = require('querystring')
            let idArr = []
            idArr.id = row.id

            _this.$confirm('是否确认删除[' + row.planningTheme + ']？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'workPlan/deleteWorkPlan.do?cId='+_this.$store.state.iscId,
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
                    console.log(err);
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消删除[' + row.planningTheme + ']'
                });       
            });
        },
        search(){
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
    .mission_customer{
        font-size: 13px;
        color: blue
    }

</style>


