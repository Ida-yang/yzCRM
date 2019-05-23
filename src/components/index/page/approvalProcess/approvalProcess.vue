<template>
    <div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <div class="totalnum_head">共 <span style="font-weight:bold">{{tableNumber}}</span> 条</div>
        </div>
        <el-table :data="tableData" border stripe style="width:100%">
            <el-table-column prop="name" fixed min-width="110" label="审批流程" sortable></el-table-column>
            <el-table-column prop="one" min-width="110" label="审批类型" sortable></el-table-column>
            <el-table-column prop="two" min-width="90" label="二月" sortable></el-table-column>
            <el-table-column prop="three" min-width="90" label="三月" sortable></el-table-column>
            <el-table-column prop="four" min-width="90" label="四月" sortable></el-table-column>
            <el-table-column prop="five" min-width="90" label="五月" sortable></el-table-column>
            <el-table-column prop="six" min-width="90" label="六月" sortable></el-table-column>
            <el-table-column prop="seven" min-width="90" label="七月" sortable></el-table-column>
            <el-table-column prop="eight" min-width="90" label="八月" sortable></el-table-column>
            <el-table-column prop="nine" min-width="90" label="九月" sortable></el-table-column>
            <el-table-column prop="ten" min-width="90" label="十月" sortable></el-table-column>
            <el-table-column prop="eleven" min-width="90" label="十一月" sortable></el-table-column>
            <el-table-column prop="twelve" min-width="90" label="十二月" sortable></el-table-column>
            <el-table-column label="操作" fixed="right" width="90" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
                    _this.store.state.approvalProcessList = res.data.map.list
                    _this.store.state.approvalProcessListnumber = res.data.count
                }).catch(function(err){
                });

            },
            handleAdd(){
                this.$router.push({ path: '/approvalProcessadd' })
            },
            handleEdit(){},
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


