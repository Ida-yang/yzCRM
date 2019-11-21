<template>
    <!-- 审核流程 -->
    <div class="contentall">
        <div class="setleftcontent">
            <el-menu :default-active="defaultKey" class="el-menu-vertical-demo base_menu" :default-openeds="defauleOpen">
                <el-menu-item index="1" @click="showTableval('1')">合同流程设置</el-menu-item>
                <el-menu-item index="2" @click="showTableval('2')">销售订单流程设置</el-menu-item>
                <el-menu-item index="3" @click="showTableval('3')">合同回款流程设置</el-menu-item>
                <el-submenu index="4">
                    <span slot="title">办公流程设置</span>
                    <el-menu-item v-for="item in workList" :key="item.id" :index="item.index" @click="showWorkleval(item)">{{item.title}}</el-menu-item>
                </el-submenu>
                <el-menu-item index="5" @click="showTableval('5')">外勤流程设置</el-menu-item>
                <el-menu-item index="6" @click="showTableval('6')">订单收款流程设置</el-menu-item>
            </el-menu>
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
                        <span v-for="(item,i) in scope.row.deptIdLs" :key="item.id"><span v-if="i !== 0">，</span>{{item.name}}</span>
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
                workApprovalId:null,

                defaultKey:'1',
                defauleOpen:[],
                
                workList:[],
            }
        },
        activated(){
            this.loadWorkLavel()
        },
        mounted(){
            this.loadWorkLavel()
        },
        beforeRouteLeave(to, from , next){
            this.$store.state.jumpvalData = null
            this.defaultKey = '1'
            this.defauleOpen = []
            this.workApprovalId = null
            this.keyType = '1'
            console.log('gdfgdfgdf',this.$store.state.jumpvalData)
            next()
        },
        methods:{
            loadWorkLavel(){
                const _this = this
                let qs = require('querystring')
                let data = {
                    limit: 99999999,
                    page: 1,
                    secondid: this.$store.state.deptid
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'oaExamineCategory/selectList.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    let info = res.data.map.success
                    info.forEach((el,i) => {
                        let a = i + 100
                        el.index = a.toString()
                    });
                    _this.workList = info

                    _this.$options.methods.loadIndex.bind(_this)()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadIndex(){
                let jumpval = this.$store.state.jumpvalData
                if(jumpval){
                    this.defauleOpen = ['4']
                    this.workList.forEach(el => {
                        if(el.id == jumpval.id){
                            this.defaultKey = el.index
                        }
                    });
                    this.showWorkleval(jumpval)
                }else{
                    this.$options.methods.loadTable.bind(this)()
                }
            },
            loadTable(){
                const _this = this
                let qs = require('querystring')
                let data = {
                    page: this.page,
                    limit: this.limit,
                    keyType: this.keyType,
                }
                if(data.keyType == '4'){
                    data.type = this.workApprovalId
                }

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
                this.keyType = val
                this.$options.methods.loadTable.bind(this)()
            },
            showWorkleval(val){
                console.log(val)
                this.keyType = '4'
                this.workApprovalId = val.id
                this.$options.methods.loadTable.bind(this)()
            },
            handleAdd(){
                if(this.keyType !== '4'){
                    this.$store.state.approvaladdOrUpdateData = {categoryType:parseInt(this.keyType)}
                    this.$router.push({ path: '/approvalProcessaddorupdate' })
                }else{
                    this.$store.state.approvaladdOrUpdateData = {categoryType:parseInt(this.keyType),category_id:this.workApprovalId}
                    this.$router.push({ path: '/approvalProcessaddorupdate' })
                }
            },
            handleEdit(index,row){
                row.levelList = []
                row.stepList.forEach(el => {
                    el.checkUserId = []
                    el.userList.forEach(a => {
                        el.checkUserId.push(a.userId)
                    });
                    row.levelList.push({index:el.stepNum,stepType:el.stepType,name:'第 ' + el.stepNum + ' 级',checkUserId:el.checkUserId, remarks:el.remarks, del:false})
                });
                this.$store.state.approvaladdOrUpdateData = row
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


