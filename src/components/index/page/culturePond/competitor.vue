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
            <el-button class="btn info-btn" size="mini" @click="handleDeletes()">删除</el-button>

            <div class="totalnum_head">共 <span class="bold_span">{{tableNumber}}</span> 条</div>

            <el-popover placement="bottom" width="100" trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist" style="max-height:600px;overflow-y:overlay;overflow-x:hidden">
                    <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                </el-checkbox-group>
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table :data="tableData" border stripe style="width:100%" @selection-change="selectInfo">
            <el-table-column fixed header-align="center" align="center" type="selection" width="45" prop="id" @selection-change="selectInfo" sortable />
            <!-- <div v-for="(item,index) in filterList" :key="index"> -->
                <el-table-column label="联系人" prop="contacts" fixed min-width="100" sortable />
                <el-table-column label="公司名称" prop="name" fixed min-width="200" sortable>
                    <!-- <template slot-scope="scope">
                        <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                            {{scope.row.name}}
                        </div>
                    </template> -->
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
                <el-table-column label="省-市-区" prop="countryid" min-width="150" sortable>
                    <template slot-scope="scope">
                        {{scope.row.country}}-{{scope.row.city}}-{{scope.row.area}}
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" min-width="150" sortable />
                <el-table-column label="负责人" prop="private_employee" min-width="100" sortable />
                <el-table-column label="部门" prop="deptname" min-width="110" sortable />
                <el-table-column label="机构" prop="parentname" min-width="110" show-overflow-tooltip sortable />
            <!-- </div> -->
            <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'competitor',
        store,
        computed:{
            tableData(){
                return store.state.competitorList
            },
            tableNumber(){
                return store.state.competitorListnumber
            },
        },
        data(){
            return{
                msg:'competitor.vue',

                page:1,
                limit:20,
                searchList:{
                    searchName:null,
                    label:1
                },
                pIdData:[
                    {index:0,name:'全部'},
                    {index:1,name:'我的'},
                    {index:2,name:'本组'},
                    {index:3,name:'本机构'},
                ],

                idArr:[],

                filterList:null,
                checklist:null,
            }
        },
        mounted(){
            this.loadData()
        },
        activated(){
            this.loadData()
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                if(this.searchList.label == 0 ){
                    data.pId = null
                }else if(this.searchList.label == 1){
                    data.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    data.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    data.deptid = _this.$store.state.insid
                }
                data.searchName = this.searchList.searchName
                data.page = this.page
                data.limit = this.limit

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp + 'competitor/queryForList.do?cId=' + _this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.$store.state.competitorList = res.data.map.success
                    _this.$store.state.competitorListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //获取筛选列表
            reloadData() {
                const _this = this;
                let qs =require('querystring')
                let filterList = {}
                filterList.type = '培育池'
                let data = {}
                data.type = '培育池'
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
                const _this = this
                let arr = val;
                let newArr = [new Array()];
                arr.forEach((item) => {
                    if(item.id != 0){
                        newArr.push(item.id)
                    }
                });
                this.idArr = newArr;
            },
            // openDetails(index,row){
            //     this.$store.state.competitordetailData = {id:row.id}
            //     this.$router.push({ path: '/competitordetail' });
            // },
            handleAdd(){
                this.$store.state.competitorAddOrUpdateData = {}
                this.$router.push({path:'/competitoraddorupdate'})
            },
            handleEdit(index,row){
                this.$store.state.competitorAddOrUpdateData = row
                this.$router.push({path:'/competitoraddorupdate'})
            },
            handleDeletes(){},
            handleDelete(index,row){},
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
                this.$options.methods.loadData.bind(this)()
            },
            handleSizeChange(val){
                this.limit = val
                this.$options.methods.loadData.bind(this)()
            },
            handleCurrentChange(val){
                this.page = val
                this.$options.methods.loadData.bind(this)()
            },
        },
    }
</script>

<style>

</style>
