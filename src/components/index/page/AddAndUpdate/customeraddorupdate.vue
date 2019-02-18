<template>
    <!-- 客户新增修改 -->
    <div class="content">
        <el-tabs class="formtabs" v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="主要数据" name="first">
                <el-form :model="myForm" ref="myForm" class="clueForm" :rules="rules">
                    <!-- <h3>{{addOrUpdateData.title}}</h3> -->
                    <el-form-item
                        class="formitemcus"
                        label-width="100px"
                        v-for="item in addOrUpdateData.createForm"
                        :label="item.label"
                        :key="item.inputModel"
                        :prop="item.inputModel">

                        <el-input 
                            v-if="!item.type || item.type == 'input'"
                            :value="myForm[item.inputModel]"
                            @input="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;" 
                            auto-complete="off"
                            @keyup.enter.native="submit">
                        </el-input>
                        <el-input 
                            v-else-if="item.type && item.type == 'number'"
                            type="number"
                            :value="myForm[item.inputModel]"
                            @input="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;" 
                            auto-complete="off">
                        </el-input>
                        <el-input 
                            v-else-if="item.type && item.type == 'require' && item.inputModel == 'poolName'"
                            :value="myForm[item.inputModel]"
                            @input="handleoninput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;" 
                            auto-complete="off">
                        </el-input>
                        <el-select 
                            v-else-if="item.inputModel == 'customerStateid'"
                            v-model="myForm[item.inputModel]"
                            @change="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in cuesList" :key="o.id" :label="o.typeName" :value="o.id"></el-option>
                        </el-select>
                        <el-select 
                            v-else-if="item.inputModel == 'levelsid'"
                            v-model="myForm[item.inputModel]"
                            @change="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in levelList" :key="o.id" :label="o.typeName" :value="o.id"></el-option>
                        </el-select>
                        <el-select 
                            v-else-if="item.inputModel == 'countryid'"
                            v-model="myForm[item.inputModel]"
                            @change="choseProvince"
                            :placeholder="item.placeholder"
                            style="width:28%;">
                            <el-option v-for="o in Provinces" :key="o.id" :label="o.name" :value="o.id"></el-option>
                        </el-select>
                        <el-select
                            class="cityseat"
                            v-else-if="item.inputModel == 'cityid'"
                            v-model="myForm[item.inputModel]"
                            @change="choseCity"
                            :placeholder="item.placeholder"
                            style="width:28%;">
                            <el-option  v-for="o in cityList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                        </el-select>
                        <el-select
                            class="areaseat"
                            v-else-if="item.inputModel == 'areaid'"
                            v-model="myForm[item.inputModel]"
                            @change="choseBlock"
                            :placeholder="item.placeholder"
                            style="width:28%;">
                            <el-option v-for="o in areaList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                        </el-select>
                        <div v-else-if="item.type && item.type == 'radio' && item.inputModel == 'sex'">
                            <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="男">男</el-radio>
                            <el-radio v-model="myForm[item.inputModel]" @input="handleInput($event, item.inputModel)" label="女">女</el-radio>
                        </div>
                    </el-form-item>
                    <div style="margin-left:60px;">
                        <el-button class="searchbutton" @click="submit">立即提交</el-button>
                        &nbsp;&nbsp;
                        <el-button @click="closeTag">取消</el-button>
                    </div>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="辅助资料" name="second">
                <el-form :model="myForm" ref="myForm" class="auxForm" :rules="rules">
                    <!-- <h3>{{addOrUpdateData.title}}</h3> -->
                    <el-form-item
                        label-width="130px"
                        v-for="item in addOrUpdateData.assistForm"
                        :label="item.label"
                        :key="item.inputModel"
                        :prop="item.inputModel">

                        <el-input 
                            v-if="!item.type || item.type == 'input'"
                            :value="myForm[item.inputModel]"
                            @input="handleInput($event, item.inputModel)"
                            style="width:90%;" 
                            auto-complete="off"
                            @keyup.enter.native="submit">
                        </el-input>
                        <!-- 注册资金 -->
                        <el-input 
                            v-else-if="item.inputModel == 'capital'"
                            type="number"
                            :value="myForm[item.inputModel]"
                            @input="handleinput($event, item.inputModel)"
                            style="width:90%;" 
                            auto-complete="off">
                            <span slot="suffix" style="margin-right:20px">万元</span>
                        </el-input>
                        <!-- 注册时间 -->
                        <el-date-picker
                            v-else-if="item.type && item.type == 'date'"
                            v-model="myForm[item.inputModel]"
                            type="date"
                            @change="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            style="width:90%;" 
                            auto-complete="off">
                        </el-date-picker>
                        <!-- 企业规模 -->
                        <el-select 
                            v-else-if="item.type && item.type == 'select' && item.inputModel == 'enterpriseScale'"
                            :multiple="item.multiple"
                            :collapse-tags="item.multiple"
                            v-model="myForm[item.inputModel]"
                            @select="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in enterpriseScaleList" :key="o.id" :label="o.name" :value="o.name"></el-option>
                        </el-select>
                        <!-- 融资状态 -->
                        <el-select 
                            v-else-if="item.type && item.type == 'select' && item.inputModel == 'financingState'"
                            :multiple="item.multiple"
                            :collapse-tags="item.multiple"
                            v-model="myForm[item.inputModel]"
                            @select="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in financingStateList" :key="o.id" :label="o.name" :value="o.name"></el-option>
                        </el-select>
                        <!-- 行业 -->
                        <el-select 
                            v-else-if="item.type && item.type == 'select' && item.inputModel == 'industryType'"
                            :multiple="item.multiple"
                            :collapse-tags="item.multiple"
                            v-model="myForm[item.inputModel]"
                            @select="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in industryTypeList" :key="o.id" :label="o.name" :value="o.name"></el-option>
                        </el-select>
                        <!-- 公司类型 -->
                        <el-select 
                            v-else-if="item.type && item.type == 'select' && item.inputModel == 'companyType'"
                            :multiple="item.multiple"
                            :collapse-tags="item.multiple"
                            v-model="myForm[item.inputModel]"
                            @select="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in companyTypeList" :key="o.id" :label="o.name" :value="o.name"></el-option>
                        </el-select>
                        <!-- 经营状态 -->
                        <el-select 
                            v-else-if="item.type && item.type == 'select' && item.inputModel == 'operatingState'"
                            :multiple="item.multiple"
                            :collapse-tags="item.multiple"
                            v-model="myForm[item.inputModel]"
                            @select="handleInput($event, item.inputModel)"
                            :placeholder="item.placeholder"
                            style="width:90%;">
                            <el-option v-for="o in operatingStateList" :key="o.id" :label="o.name" :value="o.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <div class="line"></div>
        <div class="formlist">
            <el-table
                :data="tableData"
                border
                stripe
                :default-sort = "{order: 'ascending'}"
                max-height="680"
                style="text-align:center">
                <el-table-column
                    header-align="center"
                    align="center"
                    width="35">
                    <template slot-scope="scope">
                        <el-button style="width:15px;height:15px;padding:0;border-radius:50%;" @click="getRow(scope.$index,scope.row)">&nbsp;</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    header-align="left"
                    align="left"
                    min-width="80"
                    label="公司名称"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="address"
                    header-align="left"
                    align="left"
                    min-width="130"
                    label="公司地址"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="representative"
                    header-align="left"
                    align="left"
                    min-width="40"
                    label="法人"
                    sortable>
                </el-table-column>
            </el-table>
            <!-- <div class="block numberPage">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[15, 30, 50, 100]"
                :page-size="15"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableNumber">
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import bus from '../../bus';
    export default {
        name:'customeraddOrUpdate',
        data(){
            return {
                activeName: 'first',
                tableData:null,
                addOrUpdateData: {},
                myForm: {
                    poolName:null,
                    address:null,
                },
                
                industryTypeList:null, //行业
                enterpriseScaleList:null, // 企业规模
                companyTypeList:null, //企业类型
                operatingStateList:null, //经营状态
                financingStateList:null, //融资状态
                listedList:null, //上市信息

                cuesList:null,
                levelList:null,
                subData: {},
                mapJson:'../../../../dist/static/map.json',
                Provinces:[],
                Citys:[],
                block:[],
                cityList: [],
                areaList: [],
                countryid:null,
                cityid:null,
                areaid:null,

                page: 1,//默认第一页
                limit: 15,//默认10条
                selectData: null,
                tableNumber: null,
                rules: {
                    poolName : [{ required: true, message: '公司名称不能为空', trigger: 'blur' },],
                    contactsName : [{ required: true, message: '联系人名称不能为空', trigger: 'blur' },],
                    telphone : [{ required: true, message: '电话不能为空', trigger: 'blur' },],
                    levelsid : [{ required: true, message: '请选择客户级别', trigger: 'blur' },],
                    customerStateid : [{ required: true, message: '请选择客户来源', trigger: 'blur' },],
                },
            }
        },
        beforeCreate(){
            let _this = this
            let qs = require('querystring')

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

            //行业
            axios({
                method: 'post',
                url: _this.$store.state.defaultHttp+'search/find.do',
                data: qs.stringify(industryTypeList,),
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
        // mounted(){
        //     this.loadData();
        //     this.loadTable();
        //     this.loadCountry()
        // },
        activated() {
            this.loadData();
            this.loadTable();
            this.loadCountry()
        },
        methods:{
            loadCountry(){
                let _this = this
                let qs =require('querystring')
                let country = {}
                if(this.cityid){
                    country.id = this.cityid
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'address/getAddress.do',
                        data: qs.stringify(country),
                    }).then(function(res){
                        // console.log(res.data)
                        _this.areaList=res.data;
                    }).catch(function(err){
                        console.log(err);
                    });
                }
                if(this.countryid){
                    country.id = this.countryid
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'address/getAddress.do',
                        data: qs.stringify(country),
                    }).then(function(res){
                        // console.log(res.data)
                        _this.cityList=res.data;
                    }).catch(function(err){
                        console.log(err);
                    });
                }
                country.id = ''

                //省/市/区
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'address/getAddress.do',
                    data: qs.stringify(country),
                }).then(function(res){
                    // console.log(res.data)
                    _this.Provinces=res.data;
                }).catch(function(err){
                    console.log(err);
                });
                
            },
            //获取右边表格、客户来源和客户级别
            loadTable(){
                let _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page;
                pageInfo.limit = this.limit;
                // console.log(pageInfo)
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerOne/query.do',
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    // console.log(res.data.rows)
                    _this.tableData = res.data.rows
                    _this.tableNumber = res.data.total;
                }).catch(function(err){
                    console.log(err);
                });
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'typeInfo/getTypeInfoByType.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    // console.log(res.data)
                    _this.cuesList = res.data.name3001
                    _this.levelList = res.data.name4001
                }).catch(function(err){
                    console.log(err);
                });
            },
            //加载或重载页面
            loadData() {
                this.addOrUpdateData = this.$store.state.addOrUpdateData;
                this.countryid = this.addOrUpdateData.setForm.country
                this.cityid = this.addOrUpdateData.setForm.city
                this.areaid = this.addOrUpdateData.setForm.area
                // console.log(this.addOrUpdateData)

                // 设置默认值
                let createForm = this.addOrUpdateData.createForm;
                let assistForm = this.addOrUpdateData.assistForm;
                let setForm = this.addOrUpdateData.setForm;
                if(setForm) {
                    createForm.forEach((item, index) => {
                        if(item.type && item.type == 'select') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else if(item.type && item.type == 'radio') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else {
                            this.myForm[item.inputModel] = setForm[item.inputModel];
                        }
                    });
                    assistForm.forEach((item, index) => {
                        if(item.type && item.type == 'select') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else if(item.type && item.type == 'radio') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else if(item.type && item.type == 'date'){
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else {
                            this.myForm[item.inputModel] = setForm[item.inputModel];
                        }
                    });
                    // console.log(this.myForm);
                    this.myForm.levelsid = this.addOrUpdateData.setForm.levels
                    this.myForm.countryid = this.addOrUpdateData.setForm.country
                    this.myForm.cityid = this.addOrUpdateData.setForm.city
                    this.myForm.areaid = this.addOrUpdateData.setForm.area
                    // this.myForm.customerStateid = this.addOrUpdateData.setForm.customerState
                    this.$emit('input', this.myForm);
                }
            },
            handleInput(val, key) {
                this.myForm[key] = val;
                // console.log(val)
            },
            handleoninput(val,key){
                let _this = this
                this.myForm[key] = val
                // console.log(this.myForm[key])
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page;
                pageInfo.limit = this.limit;
                pageInfo.keyword = val;
                // console.log(pageInfo)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerOne/query.do',
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    // console.log(res.data.rows)
                    _this.tableData = res.data.rows
                    _this.tableNumber = res.data.total;
                }).catch(function(err){
                    console.log(err);
                });
            },
            //提交或修改
            submit() {
                let _this = this;
                let qs =require('querystring')
                let subData = {};
                if(_this.addOrUpdateData.submitData) {
                    subData.id = _this.addOrUpdateData.submitData.id;
                    subData.csId = _this.addOrUpdateData.submitData.csId;
                }
                let createForm = _this.addOrUpdateData.createForm;
                let assistForm = _this.addOrUpdateData.assistForm;
                let flag = false;
                assistForm.forEach(item => {
                    subData[item.inputModel] = _this.myForm[item.inputModel]
                });
                createForm.forEach(item => {
                    subData[item.inputModel] = _this.myForm[item.inputModel];
                    // console.log(_this.myForm)
                    if(item.inputModel == "contactsName" && !subData[item.inputModel]) {//联系人名称不能为空
                        _this.$message({
                            message: "联系人名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "poolName" && !subData[item.inputModel]) {//公司名称不能为空
                        _this.$message({
                            message: "公司名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "telphone" && !subData[item.inputModel]) {//手机号码或电话号码至少一个不能为空
                        _this.$message({
                            message: "电话号码不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "levelsid" && !subData[item.inputModel]) {//客户级别不能为空
                        _this.$message({
                            message: "客户级别不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.inputModel == "customerStateid" && !subData[item.inputModel]) {//客户来源不能为空
                        _this.$message({
                            message: "客户来源不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return;
                subData.secondid = this.$store.state.deptid
                subData.deptid = this.$store.state.insid
                // console.log(_this.myForm)
                // console.log(subData)

                axios({
                    method: 'post',
                    url: _this.addOrUpdateData.submitURL,
                    data: qs.stringify(subData)
                }).then(function(res){
                    // console.log(res)
                    if(res.data.code && res.data.code == "200") {
                        _this.$message({
                            message: '成功',
                            type: 'success'
                        });
                        _this.closeTag();
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    console.log(err);
                }); 
            },
            //取消时返回上一个页面，若只有一个页面，则返回首页
            closeTag() {
                let tagsList = this.$store.state.tagsList;
                let index;
                tagsList.forEach((element, i) => {
                    if(element.name == this.$options.name) {
                        index = i;
                    }
                });
                const delItem = this.$store.state.tagsList.splice(index, 1)[0];
                const item = this.$store.state.tagsList[index] ? this.$store.state.tagsList[index] : this.$store.state.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push('/customer');
                }else{
                    this.$router.push('/welcome');
                }
            },
            //获取table的索引和行数据，当该行被点击时，将公司名称地址填充到表单（会刷新当前页面，之前填写的信息会被覆盖）
            getRow(index,row){
                this.myForm.poolName = row.name
                this.myForm.address = row.address
                this.myForm.representative = row.representative  //法人代表  
                this.myForm.registrationAuthority = row.registrationAuthority  //登记机关
                this.myForm.registrationNumber = row.registrationNumber  //注册号
                this.myForm.organizationCode = row.organizationCode  //组织机构代码
                this.myForm.date = row.date  //注册时间
                this.myForm.industryType = row.industryName  //行业
                this.myForm.companyType = row.company  //公司类型
                this.myForm.operatingState = row.ostate  // 经营状态
                this.myForm.capital = row.capital  //注册资金
                this.myForm.financingState = row.financing  //是否融资
                this.myForm.enterpriseScale = row.enterpriseScaleName  //企业规模
                this.myForm.creditCode = row.creditCode  //统一社会信用代码
            },
            
            // 选省
            choseProvince(e) {
                let _this = this
                this.myForm.cityid = ''
                this.myForm.areaid = ''
                this.countryid = e
                _this.$options.methods.loadCountry.bind(_this)(true);
            },
            // 选市
            choseCity(e) {
                let _this = this
                this.myForm.areaid = ''
                this.cityid = e
                _this.$options.methods.loadCountry.bind(_this)(true);
            },
            // 选区
            choseBlock(e) {
                this.E=e;
                this.areaid = e
            },

            handleClick(tab, event){
                // console.log(tab, event)
            },

            handleSizeChange(val) {
                let _this = this;
                _this.limit = val;
                _this.$options.methods.loadTable.bind(_this)(true);
            },
            handleCurrentChange(val) {
                let _this = this;
                _this.page = val;
                _this.$options.methods.loadTable.bind(_this)(true);
            },
        }
        
    }
</script>

<style>
    .content {
        width: 98%;
    }
    .formtabs{
        width: 41%;
        float: left;
    }
    .clueForm {
        width: 100%;
    }
    .auxForm{
        width: 100%;
    }
    .formitemcus:nth-child(11),.formitemcus:nth-child(12){
        margin: 0;
    }
    .line{
        float: left;
        height: 95%;
        border-left: 1px solid #000;
        margin-right: 5px;
    }
    .formlist{
        width: 57%;
        height: auto;
        float: left;
    }
    .cityseat{
        position: absolute;
        top:-52px;
        left:30%;
    }
    .areaseat{
        position: absolute;
        top:-52px;
        left:60%;
    }
</style>
