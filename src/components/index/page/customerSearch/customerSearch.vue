<template>
    <!-- 客户搜索 -->
    <div>
        <div class="searchcontent" v-if="show">
            <div class="searchList1">
                <span class="searchtitle">公司名称：</span>
                <el-input v-model="searchList.keyword" placeholder="公司名称" style="width:450px;"></el-input>
                &nbsp;&nbsp;
                <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()">查询</el-button>
            </div>
            <!-- <br> -->
            <div class="searchList1">
                <span class="searchtitle">成立时间：</span>
                <el-date-picker
                    v-model="searchList.MinDate"
                    align="right"
                    type="date"
                    format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    placeholder="开始日期">
                </el-date-picker>
                <el-date-picker
                    v-model="searchList.MaxDate"
                    align="right"
                    type="date"
                    format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="searchList1 country">
                <span class="searchtitle"> 省-市-区：</span>
                <el-select
                    v-model="searchList.country"
                    @change="choseProvince"
                    placeholder="请选择省"
                    class="countryitem">
                    <el-option v-for="item in Provinces" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-select
                    v-model="searchList.city"
                    @change="choseCity"
                    placeholder="请选择市"
                    class="countryitem">
                    <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-select
                    v-model="searchList.area"
                    @change="choseBlock"
                    placeholder="请选择区"
                    class="countryitem">
                    <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </div>
            <div class="searchList">
                <span class="searchtitle">行业：</span>
                <el-select v-model="searchList.industryType" placeholder="行业" clearable class="filter-item" @change="showdetailindstry">
                    <el-option v-for="item in industryTypeList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
            </div>
            <div class="searchList">
                <span class="searchtitle">注册资金：</span>
                <el-select v-model="searchList.capital" placeholder="注册资金" clearable class="filter-item">
                    <el-option v-for="item in capitalList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
            </div>
            <div class="searchList">
                <span class="searchtitle">企业规模：</span>
                <el-select v-model="searchList.enterpriseScale" placeholder="企业规模" clearable class="filter-item">
                    <el-option v-for="item in enterpriseScaleList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
            </div>
            <div class="searchList">
                <span class="searchtitle">企业类型：</span>
                <el-select v-model="searchList.companyType" placeholder="企业类型" clearable class="filter-item">
                    <el-option v-for="item in companyTypeList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
            </div>
            <div class="searchList">
                <span class="searchtitle">经营状态：</span>
                <el-select v-model="searchList.operatingState" placeholder="经营状态" clearable class="filter-item">
                    <el-option v-for="item in operatingStateList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
            </div>
            <div class="searchList">
                <span class="searchtitle">融资状态：</span>
                <el-select v-model="searchList.financingState" placeholder="融资状态" clearable class="filter-item">
                    <el-option v-for="item in financingStateList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
            </div>
            <div class="searchList">
                <span class="searchtitle">上市信息：</span>
                <el-select v-model="searchList.listed" placeholder="上市信息" clearable class="filter-item">
                    <el-option v-for="item in listedList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
            </div>
            <div class="searchList">
                <span class="searchtitle">手机号码：</span>
                <el-select v-model="searchList.phone" placeholder="手机号码" clearable class="filter-item">
                    <el-option v-for="item in phoneList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
            </div>
            <div class="searchList">
                <span class="searchtitle">固定电话：</span>
                <el-select v-model="searchList.telephone" placeholder="固定电话" clearable class="filter-item">
                    <el-option v-for="item in telephoneList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
            </div>
            <div class="searchList">
                <span class="searchtitle">公司邮箱：</span>
                <el-select v-model="searchList.email" placeholder="公司邮箱" clearable class="filter-item">
                    <el-option v-for="item in emailList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
            </div>
            <div class="searchList">
                <span class="searchtitle">公司网站：</span>
                <el-select v-model="searchList.website" placeholder="公司网站" clearable class="filter-item">
                    <el-option v-for="item in websiteList" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
            </div>
            <div class="searchList">
                <span class="searchtitle">地址关键字：</span>
                <el-input v-model="searchList.AddressKeyword" placeholder="地址" style="width:223px;"></el-input>
            </div>
            <div class="searchList" style="margin-left:30px;">
                <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()">查询</el-button>
                &nbsp;&nbsp;
                <el-button icon="el-icon-circle-close-outline" style="background:#20222a;color:#ffffff;" size="mini" @click="reset()">清空</el-button>
            </div>
        </div>
        <div class="dropdown" @click="showSearchList">
            <el-button class="icon" icon="el-icon-caret-top" size="mini" v-show="text">隐藏搜索列表</el-button>
            <el-button class="icon" icon="el-icon-caret-bottom" size="mini" v-show="!text">显示搜索列表</el-button>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="transfer()">转移至线索</el-button>
            <el-popover
            placement="bottom"
            width="100"
            trigger="click">
            <el-checkbox-group class="checklist" v-model="checklist">
                <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
            </el-checkbox-group>
            <!-- <el-button slot="reference" class="info-btn" type="mini">筛选列表</el-button> -->
            <el-button slot="reference" class="info-btn screen" icon="el-icon-more-outline" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table
            :data="tableData"
            ref="multipleTable"
            border
            stripe
            v-loading.fullscreen.lock="Loading"
            style="text-align:center"
            @selection-change="selectInfo">
            <el-table-column
                header-align="center"
                fixed
                align="center"
                type="selection"
                width="45"
                scope.row.id
                @selection-change="selectInfo">
            </el-table-column>
            <div v-for="(item,index) in filterList" :key="index" >
                <el-table-column
                    prop="name"
                    v-if="item.prop == 'name' && item.state == 1"
                    header-align="left"
                    align="left"
                    min-width="200"
                    label="公司名称"
                    sortable>
                    <template slot-scope="scope">
                        <div class="hoverline">
                            {{scope.row.name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    show-overflow-tooltip
                    v-else-if="item.prop == 'address' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="公司地址"
                    min-width="160"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="capital"
                    v-else-if="item.prop == 'capital' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="注册资金"
                    width="110"
                    sortable>
                    <template slot-scope="scope">{{scope.row.capital}} 万元</template>
                </el-table-column>
                <el-table-column
                    prop="representative"
                    show-overflow-tooltip
                    v-else-if="item.prop == 'representative' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="法人" 
                    width="80"               
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="date"
                    v-else-if="item.prop == 'date' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="成立日期"
                    sortable
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="coPhone"
                    v-else-if="item.prop == 'coPhone' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="手机"
                    width="100"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="coTelephone"
                    v-else-if="item.prop == 'coTelephone' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="固话"
                    width="90"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="coEmail"
                    v-else-if="item.prop == 'coEmail' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="邮箱"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="coWebsite"
                    v-else-if="item.prop == 'coWebsite' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="网站"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="industryName"
                    show-overflow-tooltip
                    v-else-if="item.prop == 'industryName' && item.state == 1"
                    header-align="left"
                    align="left"
                    width="110"
                    label="行业"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="enterpriseScaleName"
                    v-else-if="item.prop == 'enterpriseScaleName' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="企业规模"
                    width="110"
                    sortable>
                </el-table-column>
                <el-table-column
                    v-else-if="item.prop == 'countryId' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="省-市-区"
                    width="140"
                    sortable>
                    <template slot-scope="scope">{{scope.row.countryId}}-{{scope.row.city}}-{{scope.row.area}}</template>
                </el-table-column>
                <el-table-column
                    prop="company"
                    v-else-if="item.prop == 'company' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="企业类型"
                    width="110"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="ostate"
                    v-else-if="item.prop == 'ostate' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="经营状态"
                    width="110"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="financing"
                    v-else-if="item.prop == 'financing' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="融资状态"
                    width="110"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="listed"
                    v-else-if="item.prop == 'listed' && item.state == 1"
                    header-align="left"
                    align="left"
                    label="上市信息"
                    width="110"
                    sortable>
                </el-table-column>
            </div>
        </el-table>
        <div class="block numberPage">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[15, 30, 50, 100]"
            :page-size="15"
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
    import bus from '../../bus';

    export default {
        name:'customerSearch',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.customerList;
            },
            tableNumber(){
               return store.state.customerListnumber;     
            },
        },
        data(){
            return {
                industryTypeList:[],
                capitalList:[{id:1,name:'100以内'},{id:2,name:'100-500万'},{id:3,name:'500-1000万'},{id:4,name:'1000-3000万'},{id:5,name:'3000-5000万'},{id:6,name:'5000万以上'}],
                enterpriseScaleList:[],
                companyTypeList:[],
                operatingStateList:[],
                financingStateList:[],
                listedList:[],
                phoneList:[{id:'0',name:'全部'},{id:'1',name:'有'},{id:'2',name:'无'}],
                telephoneList:[{id:'0',name:'全部'},{id:'1',name:'有'},{id:'2',name:'无'}],
                emailList:[{id:'0',name:'全部'},{id:'1',name:'有'},{id:'2',name:'无'}],
                websiteList:[{id:'0',name:'全部'},{id:'1',name:'有'},{id:'2',name:'无'}],
                searchList:{
                    keyword:null,
                    industryType:null,
                    MinDate:null,
                    MaxDate:null,
                    capital:null,
                    enterpriseScale:null,
                    companyType:null,
                    operatingState:null,
                    financingState:null,
                    listed:null,
                    phone:null,
                    telephone:null,
                    email:null,
                    website:null,
                    AddressKeyword:null,
                    country:null,
                    city:null,
                    area:null,
                },
                searchListNew:{
                    keyword:null,
                    industryType:null,
                    MinDate:null,
                    MaxDate:null,
                    capital:null,
                    enterpriseScale:null,
                    companyType:null,
                    operatingState:null,
                    financingState:null,
                    listed:null,
                    phone:null,
                    telephone:null,
                    email:null,
                    website:null,
                    AddressKeyword:null,
                    country:null,
                    city:null,
                    area:null,
                },
                page:1,//默认第一页
                limit:15,//默认10条
                idArr:{
                    id:null,
                },
                
                filterList:null,
                checklist:null,

                show:true,
                text:true,

                Loading: false,

                mapJson:'../../../../dist/static/map.json',
                Provinces:[],
                Citys:[],
                block:[],
                cityList: [],
                areaList: [],
            }
        },
        activated(){
            this.loadData()
            this.reloadTable()
        },
        mounted(){
            this.loadData()
            this.reloadTable()
        },

        methods: {
            loadData(){
                let _this = this
                let qs =require('querystring')
                // console.log(pageInfo)
                let industryTypeList = {} 
                industryTypeList.comboType = 'IndustryType'
                let enterpriseScaleList = {}   
                enterpriseScaleList.comboType = 'EnterpriseScale'
                let companyTypeList = {} 
                companyTypeList.comboType = 'CompanyType'
                let operatingStateList = {} 
                operatingStateList.comboType = 'OperatingState'
                let financingStateList = {} 
                financingStateList.comboType = 'FinancingState'
                let listedList = {} 
                listedList.comboType = 'Listed'
                let data = {}
                data.id = ''

                //省/市/区
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'address/getAddress.do',
                    data: qs.stringify(data),
                }).then(function(res){
                    // console.log(res.data)
                    _this.Provinces=res.data;
                }).catch(function(err){
                    console.log(err);
                });
                //行业
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(industryTypeList),
                }).then(function(res){
                    // console.log(res.data)
                    _this.industryTypeList=res.data;
                }).catch(function(err){
                    console.log(err);
                });
                //企业规模
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(enterpriseScaleList),
                }).then(function(res){
                    // console.log(res.data)
                    _this.enterpriseScaleList=res.data;
                }).catch(function(err){
                    console.log(err);
                });
                //企业类型
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(companyTypeList),
                }).then(function(res){
                    // console.log(res.data)
                    _this.companyTypeList=res.data;
                }).catch(function(err){
                    console.log(err);
                });
                //经营状态
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(operatingStateList),
                }).then(function(res){
                    // console.log(res.data)
                    _this.operatingStateList=res.data;
                }).catch(function(err){
                    console.log(err);
                });
                //融资状态
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(financingStateList),
                }).then(function(res){
                    // console.log(res.data)
                    _this.financingStateList=res.data;
                }).catch(function(err){
                    console.log(err);
                });
                //上市信息
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'search/find.do',
                    data: qs.stringify(listedList),
                }).then(function(res){
                    // console.log(res.data)
                    _this.listedList=res.data;
                }).catch(function(err){
                    console.log(err);
                });
            },
            //获取/查询大数据列表
            reloadTable() {
                // console.log(this.$store.state)
                let _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.keyword = this.searchList.keyword; //公司名称
                searchList.industryType = this.searchList.industryType; //行业
                searchList.MinDate = this.searchList.MinDate; //开始日期
                searchList.MaxDate = this.searchList.MaxDate; //结束日期
                searchList.capital = this.searchList.capital; //注册资金
                searchList.EnterpriseScale = this.searchList.enterpriseScale; //企业规模
                searchList.companyType = this.searchList.companyType; //企业类型
                searchList.operatingState = this.searchList.operatingState; //经营状态
                searchList.financingState = this.searchList.financingState; //融资状态
                searchList.listed = this.searchList.listed; //上市信息
                searchList.phone = this.searchList.phone; //手机号码
                searchList.telephone = this.searchList.telephone; //固定电话
                searchList.email = this.searchList.email; //公司邮箱
                searchList.website = this.searchList.website; //公司网站
                searchList.AddressKeyword = this.searchList.AddressKeyword; //地址
                searchList.country_id = this.searchList.country; //省
                searchList.city_id = this.searchList.city; //市
                searchList.area_id = this.searchList.area; //区
                searchList.page = this.page;
                searchList.limit = this.limit;
                // console.log(searchList)
                let filterList = {}
                filterList.type = '大数据客户搜索'
                let data = {}
                data.type = '大数据客户搜索'
                data.state = 1

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerOne/query.do',
                    data: qs.stringify(searchList),
                }).then(function(res){
                    // console.log(res.data.rows)
                    _this.$store.state.customerList = res.data.rows
                    _this.$store.state.customerListnumber = res.data.total;
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getAllUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(filterList)
                }).then(function(res){
                    // console.log(res.data)
                    _this.filterList = res.data
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(data)
                }).then(function(res){
                    // console.log(res.data)
                    _this.checklist = res.data
                }).catch(function(err){
                    console.log(err);
                });
            },
            selectInfo(val){
                this.multipleSelection = val;
                // console.log(val)
                let arr = val;
                let newArr = new Array()
                // console.log(arr)
                arr.forEach((item) => {
                    if(item.id != 0){
                        // console.log(item.id)
                        newArr.push(item.id)
                        // console.log(newArr)
                    }
                });
                // console.log(newArr)
                this.idArr.id = newArr;
                // console.log(this.idArr.id)
                
            },
            showSearchList(){
                this.show = !this.show;
                this.text = !this.text;
            },
            transfer(){
                let _this = this;
                let qs =require('querystring')
                // console.log(this.idArr)
                let idArr = [];
                idArr.id = this.idArr.id
                idArr.secondid = this.$store.state.deptid
                idArr.deptid = this.$store.state.insid
                // console.log(idArr)
                _this.Loading = true
                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'customerOne/insert.do?cId='+_this.$store.state.iscId+"&pId="+_this.$store.state.ispId,
                    data:qs.stringify(idArr),
                }).then(function(res){
                    console.log(res)
                    if(res.data.msg && res.data.msg == 'success') {
                        _this.Loading = false
                        _this.$message({
                            message: '转移成功',
                            type: 'success'
                        });
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    } else {
                        _this.Loading = false
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            showdetailindstry(val){
                // console.log(val)
            },
            
            hangleChange(e,val){
                // console.log(e)
                let _this = this
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
                    // console.log(res)
                    if(res.data && res.data =="success"){
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else{
                        console.log(err)
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            search() {
                this.$options.methods.reloadTable.bind(this)(true);
                // this.searchList.code = null;
                // this.searchList.name = null;
            },
            reset(){
                this.searchList = Object.assign({}, this.searchListNew);
                this.page = 1;
                this.limit = 15;
                this.$options.methods.reloadTable.bind(this)(true);
            },

            // 选省
            choseProvince(e) {
                let _this = this
                this.searchList.city = ''
                this.searchList.area = ''
                let qs =require('querystring')
                let data = {}
                data.id = e

                //省/市/区
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'address/getAddress.do',
                    data: qs.stringify(data),
                }).then(function(res){
                    // console.log(res.data)
                    _this.cityList=res.data;
                }).catch(function(err){
                    console.log(err);
                });
            },
            // 选市
            choseCity(e) {
                // console.log(e)
                let _this = this
                this.searchList.area = ''
                let qs =require('querystring')
                let data = {}
                data.id = e

                //省/市/区
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'address/getAddress.do',
                    data: qs.stringify(data),
                }).then(function(res){
                    // console.log(res.data)
                    _this.areaList=res.data;
                }).catch(function(err){
                    console.log(err);
                });
            },
            // 选区
            choseBlock(e) {
                // console.log(e)
                this.E=e;
            },

            handleSizeChange(val) {
                let _this = this;
                _this.limit = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
            },
            handleCurrentChange(val) {
                let _this = this;
                _this.page = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
            },
        },
    }
</script>

<style>
    .el-input {
        width: 100%;
    }
    .el-row{
        margin-bottom: 10px;
    }
    .searchcontent{
        width: 100%;
        height: 370px;
        overflow-x: hidden; 
        overflow-y: auto;
        float: left;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-wrap: wrap;
        align-content: flex-start;
    }
    .searchList{
        flex: 0 0 31%;
        /* margin: 8px; */
    }
    .searchList1{
        width: 100%;
        margin: 8px;
    }
    .searchList1 .el-date-editor.el-input{
        width: 222px;
    }
    .searchtitle{
        font-size: 14px;
        color: #595959;
        display: block;
        width: 100px;
        float: left;
        line-height: 30px;
        text-align: right;
    }
    .dropdown{
        width: 100%;
        height: 30px;
        clear: both;
        text-align: center;
        padding: 0;
        margin: 0 0 10px 0;
    }
    .icon{
        width: 100%;
        font-size: 14px;
        height: 30px;
        border-left: 0;
        border-right: 0;
    }
    /* .country{
        display: flex;
        display: -webkit-flex; Safari */
        /* justify-content: left;
        align-items: center;
    }
    .country .countryitem{
        margin-right: 5px;
    } */
</style>
