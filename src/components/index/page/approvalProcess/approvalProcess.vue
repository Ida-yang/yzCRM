<template>
    <div class="contentall">
        <div class="setleftcontent">
            <ul class="namecontent">
                <li v-for="item in searchList" :key="item.index" :value="item.name" :class="{actived:item.isActive}" @click="showTableval(item)">{{item.name}}</li>
            </ul>
        </div>
        <div class="centercontent"></div>
        <div class="setrightcontent">
            <div class="entry">
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
                <div class="totalnum_head">共 <span class="bold_span">{{tableNumber}}</span> 条</div>
            </div>
            <el-table :data="tableData" border stripe style="width:100%">
                <el-table-column label="审核流程" prop="name" fixed min-width="110" sortable></el-table-column>
                <el-table-column label="关联对象" prop="categoryTypeName" min-width="110" sortable></el-table-column>
                <el-table-column label="应用部门" prop="deptIdLs" min-width="150" sortable>
                    <template slot-scope="scope">
                        <span v-for="item in scope.row.deptIdLs" :key="item.id">{{item.name}},</span>
                    </template>
                </el-table-column>
                <el-table-column label="最后修改人" prop="updateUserName" min-width="120" sortable></el-table-column>
                <el-table-column label="创建时间" prop="createTime" min-width="150" sortable></el-table-column>
                <el-table-column label="备注" prop="remarks" min-width="180" sortable></el-table-column>
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
                limit:20, //默认20行
                keyType:'1',

                searchList:[
                    {index:'1',name:'合同流程设置',isActive:true},
                    {index:'2',name:'销售订单流程设置',isActive:false},
                    {index:'3',name:'回款流程设置',isActive:false},
                    {index:'4',name:'办公流程设置',isActive:false},
                ],
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
                data.keyType = this.keyType

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
            showTableval(val){
                this.keyType = val.index
                this.searchList.forEach(function(obj){
                    obj.isActive = false;
                });
                val.isActive = !val.isActive;
                this.$options.methods.loadTable.bind(this)()
            },
            handleAdd(){
                this.$store.state.approvalupdateData = null
                this.$router.push({ path: '/approvalProcessaddorupdate' })
            },
            handleEdit(index,row){
                // console.log(row)
                row.levelList = []
                row.stepList.forEach(el => {
                    el.checkUserId = []
                    el.userList.forEach(a => {
                        el.checkUserId.push(a.userId)
                    });
                    row.levelList.push({index:el.stepNum,stepType:el.stepType,name:'第 ' + el.stepNum + ' 级',checkUserId:el.checkUserId, remarks:el.remarks, del:false})
                });
                this.$store.state.approvalupdateData = row
                this.$router.push({ path: '/approvalProcessaddorupdate' })
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


