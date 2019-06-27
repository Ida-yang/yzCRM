<template>
    <!-- 营销雷达 -->
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in pIdData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.time">
                <span class="nameList">新增时间：</span>
                <el-radio :label="nullvalue" @change="search()">全部</el-radio>
                <el-radio v-for="item in timeData" :key="item.id" :label="item.id" @change="search()">{{item.typeName}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList" style="width:100%;">
            <el-input placeholder="请输入联系人或公司名称" v-model="searchName" style="margin-left:20px;width:400px;" @keyup.enter.native="search">
                <el-select v-model="searchList.keyType" slot="prepend" placeholder="请选择" style="width:125px"> 
                    <el-option label="联系人名称" value="1"></el-option>
                    <el-option label="公司名称" value="2"></el-option>
                </el-select>
            </el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
            <br><br>
        </div>
        <el-table :data="tableData" ref="multipleTable" border stripe style="width:100%">
            <el-table-column fixed header-align="center" align="center" type="index" width="45" />
            <el-table-column label="访问来源" prop="phone" fixed min-width="110" sortable />
            <el-table-column label="访问人" prop="name" min-width="100" sortable />
            <el-table-column label="关联公司" prop="workName" min-width="200" sortable />
            <el-table-column label="访问时间" prop="createTime" min-width="150" sortable />
            <el-table-column label="访问内容" prop="content" show-overflow-tooltip min-width="180" sortable />
            <el-table-column prop="ip" label="IP" min-width="160" sortable />
        </el-table>
        <div class="block numberPage">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[100, 300, 500]"
                :page-size="100"
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
        name:'SMSradar',
        store,
        computed:{
            tableData(){
                return store.state.SMSradarList
            },
            tableNumber(){
                return store.state.SMSradarListnumber
            },
        },
        data(){
            return{
                msg:'营销雷达',
                searchList:{
                    label:'1',
                    time:null,
                    keyType:'1',
                },
                searchName:null,
                pIdData:[
                    {label:'0',value:'全部'},
                    {label:'1',value:'我的'},
                    {label:'2',value:'本组'},
                    {label:'3',value:'本机构'}
                ],
                timeData:[
                    {id:'1',typeName:'今天'},
                    {id:'2',typeName:'昨天'},
                    {id:'3',typeName:'本周'},
                    {id:'4',typeName:'本月'},
                    {id:'5',typeName:'上月'}
                ],

                nullvalue:null,
                page:1,//默认第一页
                limit:100,//默认100条

                clearTimeSet:null,

            }
        },
        beforeRouteLeave(to, from , next){
            clearInterval(this.clearTimeSet)
            this.clearTimeSet = null
            next()
        },
        mounted(){
            this.loadTable()
        },
        activated(){
            this.loadTable()
            this.setTime()
        },
        methods:{
            loadTable(){
                const _this = this;
                let qs =require('querystring')
                let searchList = {}
                if(this.searchList.keyType == '1'){
                    searchList.searchName = this.searchName
                }else if(this.searchList.keyType == '2'){
                    searchList.keyWord = this.searchName
                }
                if(this.searchList.label == 0 ){
                    searchList.pId = _this.nullvalue
                }else if(this.searchList.label == 1){
                    searchList.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    searchList.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    searchList.deptid = _this.$store.state.insid
                }
                searchList.example = this.searchList.time
                searchList.page = this.page;
                searchList.limit = this.limit;

                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'openRecord/selectOpenRecord.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.$store.state.SMSradarList = res.data.map.openRecords
                    _this.$store.state.SMSradarListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            setTime(){
                this.clearTimeSet = setInterval(() => {
                    this.$options.methods.loadTable.bind(this)()
                }, 60000);
            },
            search(){
                const _this = this
                let authorityInterface = ''
                let i = 1
                if(this.searchList.label == 0 ){
                    authorityInterface = 'openRecordJurisdiction/all.do'//全部短信日志
                    i = 0
                }else if(this.searchList.label == 2){
                    authorityInterface = 'openRecordJurisdiction/second.do'//本组短信日志
                    i = 0
                }else if(this.searchList.label == 3){
                    authorityInterface = 'openRecordJurisdiction/dept.do'//本机构短信日志
                    i = 0
                }

                if(i == 0){
                    axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+authorityInterface,
                    }).then(function(res){
                        if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message:'对不起，您没有该权限，请联系管理员开通',
                                type:'error'
                            })
                        }else{
                            _this.$options.methods.loadTable.bind(_this)(true);
                        }
                    }).catch(function(err){
                        // console.log(err);
                    });
                }else{
                    _this.$options.methods.loadTable.bind(_this)(true);
                }
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
        destroyed(){
            clearInterval(this.clearTimeSet)
            this.clearTimeSet = null
        },
    }
</script>

