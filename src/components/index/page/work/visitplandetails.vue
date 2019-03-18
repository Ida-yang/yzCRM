<template>
    <el-row class="content1" :gutter="10">
        <!-- <p>商机详情页</p> -->
        <el-col :span="18">
            <div class="top">
                
            </div>
            <div class="bottom2">
                
            </div>
        </el-col>
        
        <el-col :span="6" style="padding:10px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.keyword" placeholder="请输入标题" style="width:80%;"></el-input>
                <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()"></el-button>
            </div>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                prop="opportunity_name"
                label="商机名称">
                    <template slot-scope="scope">
                    <div @click="getRow(scope.$index, scope.row)">
                        {{scope.row.opportunity_name}}
                    </div>
                </template>
                </el-table-column>
            </el-table>
            <div class="block numberPage number">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20, 30, 50, 100]"
                :page-size="20"
                layout="total, sizes, prev, pager, next"
                :total="tableNumber">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

export default {
    name:'visitplandetails',
    store,
    data(){
        return{
            msg:'拜访计划详情页',

            detailData:null,
            visitId:null,

            searchList:{
                keyword:null,
            },
            tableData:null,
            tableNumber:0,
            page:1,
            limit:20
        }
    },
    activated(){
        this.loadData()
    },
    methods:{
        loadData(){
            this.detailData = this.$store.state.visitdetailsData
            this.visitId = this.detailData.submitData.id
            console.log(this.visitId)
        },
        handleSizeChange(val) {
            const _this = this;
            _this.limit = val;
            // _this.$options.methods.reloadTable.bind(_this)(false);
        },
        handleCurrentChange(val) {
            const _this = this;
            _this.page = val;
            // _this.$options.methods.reloadTable.bind(_this)(false);
        },
    },
}
</script>

<style>

</style>


