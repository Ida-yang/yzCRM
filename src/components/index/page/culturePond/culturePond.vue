<template>
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in pIdData" :key="item.index" :label="item.index" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList" style="width:100%;">
            <span class="nameList">公司名称：</span>
            <el-input placeholder="请输入公司名称" v-model="searchList.searchName" style="margin-left:20px;width:400px;" @keyup.enter.native="search"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>

            <div class="totalnum_head">共 <span style="font-weight:bold">{{tableNumber}}</span> 条</div>
        </div>
        <el-table :data="tableData" border stripe style="width:100%">
            <el-table-column header-align="center" fixed align="center" type="index" width="45" />
            <el-table-column label="联系人" prop="contacts" fixed min-width="100" sortable />
            <el-table-column label="公司名称" prop="name" fixed min-width="200" sortable>
                <template slot-scope="scope">
                    <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                        {{scope.row.name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="手机" prop="phone" min-width="110" sortable />
            <el-table-column label="邮箱" prop="email" min-width="130" sortable />
            <el-table-column label="QQ" prop="qq" min-width="110" sortable />
            <el-table-column label="固话" prop="telephone" min-width="110" sortable />
            <el-table-column label="微博" prop="microblog" min-width="110" sortable />
            <el-table-column label="旺旺" prop="wangwang" min-width="110" sortable />
            <el-table-column label="地址" prop="address" min-width="180" show-overflow-tooltip sortable />
            <el-table-column label="职位" prop="position" min-width="100" sortable />
            <el-table-column label="性别" prop="sex" min-width="90" sortable />
            <el-table-column label="生日" prop="birthday" min-width="110" sortable />
            <el-table-column label="省-市-区" prop="countryid" min-width="110" sortable>
                <template slot-scope="scope">
                    {{scope.row.country + '-' + scope.row.city + '-' + scope.row.area}}
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime" min-width="150" sortable />
            <el-table-column label="负责人" prop="private_employee" min-width="100" sortable />
            <el-table-column label="部门" prop="deptname" min-width="110" sortable />
            <el-table-column label="机构" prop="parentname" min-width="110" show-overflow-tooltip sortable />
            <el-table-column label="是否开通微信" prop="weChat" min-width="130" sortable />
            <el-table-column label="是否开通支付宝" prop="alipay" min-width="145" sortable />
            <el-table-column label="短信营销次数" prop="msg_number_of_marketing" min-width="130" sortable />
            <el-table-column label="短信打开次数" prop="msg_open_num" min-width="130" sortable />
            <el-table-column label="邮件营销次数" prop="email_number_of_marketing" min-width="130" sortable />
            <el-table-column label="邮件打开次数" prop="email_open_num" min-width="130" sortable />
            <el-table-column label="标签" prop="label" min-width="110" sortable />
            <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    import store from '../../../../store/store';
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'culturePond',
        store,
        computed:{
            tableData(){
                return store.state.culturePondList
            },
            tableNumber(){
                return store.state.culturePondListnumber
            },
        },
        data(){
            return{
                msg:'culturePond.vue',

                page:1,
                limit:20,
                searchList:{
                    searchName:null,
                    searchOption:'1',
                    label:'1'
                },

                pIdData:[
                    {index:'0',name:'全部'},
                    {index:'1',name:'我的'},
                    {index:'2',name:'本组'},
                    {index:'3',name:'本机构'},
                ],
            }
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
                    method:'post',
                    url:_this.$store.state.defaultHttp + 'cultivationPool/queryForList.do?cId=' + _this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.$store.state.culturePondList = res.data.map.success
                    _this.$store.state.culturePondListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            openDetails(index,row){
                this.$store.state.culturePondetailData = {id:row.id}
                this.$router.push({ path: '/culturePondetail' });
            },
            handleAdd(){},
            handleEdit(index,row){
                console.log(index,row)
            },
            handleDelete(index,row){
                console.log(index,row)
            },
            search(){
                this.$options.methods.loadTable.bind(this)()
            },
            handleSizeChange(val){
                this.limit = val
                this.$options.methods.loadTable.bind(this)()
            },
            handleCurrentChange(val){
                this.page = val
                this.$options.methods.loadTable.bind(this)()
            },
        },
    }
</script>
