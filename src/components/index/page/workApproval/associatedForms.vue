<template>
    <!-- 审核流程 -->
    <div class="contentall">
        <div class="setleftcontent">
            <el-menu default-active="1" class="el-menu-vertical-demo base_menu">
                <el-menu-item v-for="item in workList" :key="item.id" :index="item.index" @click="showWorkleval(item)">{{item.name}}</el-menu-item>
            </el-menu>
        </div>
        <div class="centercontent"></div>
        <div class="setrightcontent">
            <div class="entry">
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
                <div class="totalnum_head">共 <span class="bold_span">{{tableNumber}}</span> 条</div>
            </div>
            <el-table :data="tableData" border stripe style="width:100%">
                <el-table-column label="审核类型" prop="title" fixed min-width="110" sortable></el-table-column>
                <el-table-column label="可见部门" prop="deptIdLs" min-width="150" sortable>
                    <template slot-scope="scope">
                        <span v-for="(item,i) in scope.row.deptIdLs" :key="item.id"><span v-if="i !== 0">，</span>{{item.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" min-width="150" sortable></el-table-column>
                <el-table-column label="备注" prop="remarks" min-width="180" sortable></el-table-column>
                <el-table-column label="操作" fixed="right" width="230" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editForm(scope.$index, scope.row)">编辑表单</el-button>
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
                
                workApprovalId:null,
                
                workList:[],
            }
        },
        activated(){
            this.loadTable()
        },
        mounted(){
            this.loadLabel()
        },
        methods:{
            loadLabel(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'oaExamineCategoryType/selectList.do?cId='+_this.$store.state.iscId
                }).then(function(res){
                    let info = res.data
                    info.forEach((el,i) => {
                        if(i == 0){
                            _this.workApprovalId = el.id
                        }
                        let a = i + 1
                        el.index = a.toString()
                    });
                    _this.workList = info

                    _this.$options.methods.loadTable.bind(_this)()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadTable(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.page = this.page
                data.limit = this.limit
                data.type = this.workApprovalId
                data.secondid = this.$store.state.deptid

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'oaExamineCategory/selectList.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    let info = res.data.map.success
                    _this.$store.state.approvalProcessList = info
                    _this.$store.state.approvalProcessListnumber = res.data.count
                }).catch(function(err){
                });
            },
            showWorkleval(val){
                this.workApprovalId = val.id
                this.$options.methods.loadTable.bind(this)()
            },
            handleAdd(){
                this.$store.state.workApprovalData = {examineTypeId:this.workApprovalId}
                this.$router.push({ path: '/workApprovaladdOrUpdate' })
            },
            handleEdit(index,row){
                this.$store.state.workApprovalData = row
                this.$router.push({ path: '/workApprovaladdOrUpdate' })
            },
            editForm(index,row){
                this.$store.state.associatedFormsData = row
                this.$router.push({ path: '/associatedFormsaddOrUpdate' })
            },
            handleDelete(index,row){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = row.id
                data.deleted = 1

                _this.$confirm('是否确认删除【'+ row.title +'】？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'oaExamineCategory/saveOrUpdate.do?cId='+_this.$store.state.iscId,
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
                        message: '取消删除【' + row.title + '】'
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


