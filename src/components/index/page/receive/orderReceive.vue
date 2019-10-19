<template>
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in pIdData" :key="item.index" :label="item.index" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.example">
                <span class="nameList">收款日期：</span>
                <el-radio v-for="item in timeData" :key="item.id" :label="item.id" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
            <!-- <el-radio-group v-model="searchList.stateid">
                <span class="nameList">收款单状态：</span>
                <el-radio v-for="item in stateData" :key="item.index" :label="item.index" @change="search()">{{item.name}}</el-radio>
            </el-radio-group> -->
        </div>

        <div class="searchList" style="width:100%;">
            <span class="nameList">公司名称：</span>
            <el-input v-model="searchList.searchName" placeholder="请输入公司名称" style="width:300px;" @keyup.enter.native="search"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <div class="totalnum_head">共 <span class="bold_span">{{tableNumber}}</span> 条</div>

            <el-popover placement="bottom" width="100" trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist" style="max-height:600px;overflow-y:overlay;overflow-x:hidden">
                    <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                </el-checkbox-group>
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table :data="tableData" border stripe style="width:100%" :summary-method="getSummaries" show-summary>
            <el-table-column header-align="center" fixed align="center" type="index" width="45"></el-table-column>
            <el-table-column label="日期" prop="createTime" fixed min-width="110" sortable></el-table-column>
            <el-table-column label="收款编号" prop="backNo" fixed min-width="150" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                    <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                        {{scope.row.backNo}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="公司名称" prop="customerName" min-width="200" sortable></el-table-column>
            <el-table-column label="本次收款金额" prop="money" min-width="130" sortable>
                <template slot-scope="scope">
                    {{scope.row.money | commaing}}
                </template>
            </el-table-column>
            <el-table-column label="折后金额" prop="discountAfter" min-width="130" sortable>
                <template slot-scope="scope">
                    {{scope.row.discountAfter | commaing}}
                </template>
            </el-table-column>
            <el-table-column label="收款方式" prop="pay_type" min-width="110" sortable></el-table-column>
            <el-table-column label="状态" prop="checkStatus" width="90" sortable>
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.checkStatus == 0" size="small" style="background-color:#ffffff;color:#606266;border-color:#dcdfe6" effect="dark">待审核</el-tag>
                    <el-tag v-if="scope.row.checkStatus == 1" size="small" style="background-color:#e6a23c;color:#ffffff;border-color:#e6a23c" effect="dark">审核中</el-tag>
                    <el-tag v-if="scope.row.checkStatus == 2" size="small" style="background-color:#67c23a;color:#ffffff;border-color:#67c23a" effect="dark">已审核</el-tag>
                    <el-tag v-if="scope.row.checkStatus == 3" size="small" style="background-color:#f56c6c;color:#ffffff;border-color:#f56c6c" effect="dark">未通过</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="制单人" prop="private_employee" min-width="100" sortable></el-table-column>
            <el-table-column label="部门" prop="deptname" min-width="110" sortable></el-table-column>
            <el-table-column label="机构" prop="parentname" min-width="130" show-overflow-tooltip sortable></el-table-column>
            <el-table-column v-for="a in fieldHeadData" :label="a.name" :key="a.field_name" :prop="a.field_name" min-width="130" sortable />
            
            <el-table-column label="操作" fixed="right" width="90" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <!-- <el-button size="mini" type="danger" @click="handledetele(scope.$index, scope.row)">删除</el-button> -->
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
        name:'orderReceive',
        store,
        filters:{
            commaing(value){
                if(value !== 0){
                    let intPart = Math.trunc(value) //获取整数部分
                    let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                    let floatPart = '.00' // 预定义小数部分
                    let valArray = value.toString().split('.')
                    if(valArray.length === 2) {
                        floatPart = valArray[1].toString() // 拿到小数部分
                        if(floatPart.length === 1) { // 补0,实际上用不着
                            return intPartFormat + '.' + floatPart + '0'
                        }else{
                            return intPartFormat + '.' + floatPart
                        }
                    } else {
                        return intPartFormat + floatPart
                    }
                }else{
                    let num = 0.00
                    return num
                }
            },
        },
        computed:{
            tableData(){
                return store.state.orderReceiveList;
            },
            tableNumber(){
                return store.state.orderReceiveListnumber;
            }
        },
        data(){
            return{
                msg:'receive.vue',
                fieldHeadData:[],

                page:1,
                limit:20,
                searchList:{
                    example:0,
                    searchName:null,
                    stateid:null,
                    label:1,
                },

                stateData:[
                    {index:null,name:'全部'},
                    {index:0,name:'待审核'},
                    {index:1,name:'审核中'},
                    {index:2,name:'已审核'},
                    {index:3,name:'未通过'},
                ],
                pIdData:[
                    {index:null,name:'全部'},
                    {index:1,name:'我的'},
                    {index:2,name:'本组'},
                    {index:3,name:'本机构'},
                    {index:4,name:'待我审核'},
                ],
                timeData:[
                    {id:0,name:'全部'},
                    {id:1,name:'今天'},
                    {id:2,name:'昨天'},
                    {id:3,name:'本周'},
                    {id:4,name:'本月'},
                    {id:5,name:'上月'},
                ],
                nullvalue:null,

                filterList:null,
                checklist:null,
            }
        },
        activated(){
            this.loadFieldHead()
            this.loadTable()
        },
        mounted(){
            this.loadFieldHead()
            this.loadTable()
            this.reloadData()
        },
        methods:{
            loadTable(){
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
                }else if(this.searchList.label == 4){
                    data.examine = _this.$store.state.ispId
                }
                data.searchName = this.searchList.searchName
                data.example = this.searchList.example
                data.page = this.page;
                data.limit = this.limit;
                data.label = 12

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp + 'pageInfo/queryPageList.do?cId=' + _this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    let info = res.data.map.success
                    
                    _this.$store.state.orderReceiveList = info
                    _this.$store.state.orderReceiveListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadFieldHead(){
                const _this = this
                let qs =require('querystring')
                let data = {
                    label: 12,
                    pId: this.$store.state.ispId
                }

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'field/queryListHead.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data),
                }).then(function(res){
                    _this.fieldHeadData = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //获取筛选列表
            reloadData() {
                const _this = this;
                let qs =require('querystring')
                let filterList = {}
                filterList.type = '订单收款'
                let data = {}
                data.type = '订单收款'
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

            openDetails(index,row){
                this.$store.state.orderReceiveDetailData = {id:row.id, 'batch_id': row.batch_id};
                this.$router.push({ path: '/orderReceiveDetail' });
            },
            getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if(column.property == 'money' || column.property == 'discountAfter'){
                        sums[index] = values.reduce((acc, cur) => (cur + acc), 0)
                        sums[index] = sums[index].toFixed(2)
                        let intPart = Math.trunc(sums[index])
                        let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                        let floatPart = '.00' // 预定义小数部分
                        let valArray = sums[index].split('.')
                        if(valArray.length === 2) {
                            floatPart = valArray[1].toString() // 拿到小数部分
                            if(floatPart.length === 1) { // 补0,实际上用不着
                                sums[index] = intPartFormat + '.' + floatPart + '0'
                            }else{
                                sums[index] = intPartFormat + '.' + floatPart
                            }
                        } else {
                            sums[index] = intPartFormat + floatPart
                        }
                        sums[index] += ' 元';
                    }else{
                        sums[index] = '';
                    }
                });

                return sums;
            },
            
            handleAdd(){
                const _this = this
                // axios({
                //     method: 'get',
                //     url: _this.$store.state.defaultHttp+'clueJurisdiction/insert.do',//新增线索
                // }).then(function(res){
                //     if(res.data.msg && res.data.msg == 'error'){
                //         _this.$message({
                //             message:'对不起，您没有该权限，请联系管理员开通',
                //             type:'error'
                //         })
                //     }else{
                        this.$store.state.orderReceiveAddOrUpdateData = null
                        _this.$router.push({ path: '/orderReceiveaddOrUpdate' });
                //     }
                // }).catch(function(err){
                //     // console.log(err);
                // });
            },
            handleEdit(index,row){
                const _this = this
                this.$store.state.orderReceiveAddOrUpdateData = {id:row.id, 'batch_id': row.batch_id};
                // axios({
                //     method: 'get',
                //     url: _this.$store.state.defaultHttp+'clueJurisdiction/update.do',//修改线索
                // }).then(function(res){
                //     if(res.data.msg && res.data.msg == 'error'){
                //         _this.$message({
                //             message:'对不起，您没有该权限，请联系管理员开通',
                //             type:'error'
                //         })
                //     }else{
                        _this.$router.push({ path: '/orderReceiveaddOrUpdate' });
                //     }
                // }).catch(function(err){
                //     // console.log(err);
                // });
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
        },
    }
</script>

<style>

</style>