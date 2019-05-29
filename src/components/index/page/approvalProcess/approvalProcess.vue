<template>
    <div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <div class="totalnum_head">共 <span style="font-weight:bold">{{tableNumber}}</span> 条</div>
        </div>
        <el-table :data="tableData" border stripe style="width:100%">
            <el-table-column prop="name" fixed min-width="110" label="审批流程" sortable></el-table-column>
            <el-table-column prop="categoryType" min-width="110" label="关联对象" sortable></el-table-column>
            <el-table-column prop="deptIdLs" min-width="130" label="应用部门" sortable>
                <template slot-scope="scope">
                    <span v-for="item in scope.row.deptIdLs" :key="item.id">{{item.name}},</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="status" min-width="110" label="启用状态" sortable>
                <template slot-scope="scope">
                    <el-tooltip :content="scope.row.statusname" placement="top">
                        <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#bbbbbb" :active-value="1" :inactive-value="0" @change="changeStatus(scope.row)"></el-switch>
                    </el-tooltip>
                </template>
            </el-table-column> -->
            <el-table-column prop="remarks" min-width="110" label="备注" sortable></el-table-column>
            <el-table-column prop="updateUserName" min-width="110" label="最后修改人" sortable></el-table-column>
            <el-table-column prop="createTime" min-width="110" label="创建时间" sortable></el-table-column>
            <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        name:'approvalProcess',
        store,
        computed: {
            tableData(){
                return store.state.approvalProcessList
            },
            tableNumber(){
               return store.state.approvalProcessListnumber
            },
        },
        data(){
            return{
                page:1, //默认第1页
                limit:20 //默认20行
            }
        },
        activated(){
            this.loadTable()
        },
        mounted(){
            this.loadTable()
        },
        methods:{
            loadTable(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.page = this.page
                data.limit = this.limit

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'examine/queryAllExamine.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    let data = res.data.map.list
                    data.forEach(el => {
                        if(el.status == 1){
                            el.statusname = '启用'
                        }else if(el.status == 0){
                            el.statusname = '禁用'
                        }
                    });
                    _this.$store.state.approvalProcessList = data
                    _this.$store.state.approvalProcessListnumber = res.data.count
                }).catch(function(err){
                });

            },
            handleAdd(){
                this.$store.state.approvalupdateData = null
                this.$router.push({ path: '/approvalProcessadd' })
            },
            handleEdit(index,row){
                // console.log(row)
                row.levelList = []
                row.stepList.forEach(el => {
                    el.checkUserId = []
                    el.userList.forEach(a => {
                        el.checkUserId.push(a.userId)
                    });
                    row.levelList.push({index:el.stepNum,stepType:el.stepType,name:'第 ' + el.stepNum + ' 级',checkUserId:el.checkUserId,del:false})
                });
                this.$store.state.approvalupdateData = row
                this.$router.push({ path: '/approvalProcessadd' })
            },
            handleDelete(index,row){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = row.id
                data.status = 2
                data.pId = this.$store.state.ispId

                _this.$confirm('是否确认删除【'+ row.name +'】？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'examine/updateStatus.do?cId='+_this.$store.state.iscId,
                        data: qs.stringify(data)
                    }).then(function(res){
                        if(res.data.code && res.data.code == '200'){
                            _this.$message({
                                message:'删除成功',
                                type:'success'
                            })
                            _this.$options.methods.loadTable.bind(_this)()
                        }else{
                            _this.$message({
                                message:res.data.msg,
                                type:'error'
                            })
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新删除");
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除【' + row.name + '】'
                    });       
                });
            },
            changeStatus(row){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = row.id
                data.status = row.status
                data.pId = this.$store.state.ispId

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'examine/updateStatus.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'修改状态成功',
                            type:'success'
                        })
                        _this.$options.methods.loadTable.bind(_this)()
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("修改状态失败,请重新修改");
                });
            },
            handleSizeChange(val){
                const _this = this;
                _this.limit = val;
                _this.$options.methods.loadTable.bind(_this)(false);
            },
            handleCurrentChange(val){
                const _this = this;
                _this.page = val;
                _this.$options.methods.loadTable.bind(_this)(false);
            },
        },
    }
</script>

<style>

</style>


