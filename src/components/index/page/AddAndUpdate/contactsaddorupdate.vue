<template>
    <!-- 联系人新增修改 -->
    <div class="content">
        <el-form :model="myForm" ref="myForm" class="myForm" :rules="rules">
            <!-- <h3>{{addOrUpdateData.title}}</h3> -->
            <el-form-item
                class="formitemcont"
                label-width="100px"
                v-for="item in addOrUpdateData.createForm"
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
                <el-input 
                    v-else-if="item.type && item.type == 'number'"
                    type="number"
                    :value="myForm[item.inputModel]"
                    @input="handleInput($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off">
                </el-input>
                <el-input 
                    v-else-if="item.type && item.type == 'require' && item.inputModel == 'poolName'"
                    :value="myForm[item.inputModel]"
                    @input="handleoninput($event, item.inputModel)"
                    style="width:90%;" 
                    auto-complete="off">
                </el-input>
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
                    <el-option v-for="o in cityList" :key="o.id" :label="o.name" :value="o.id"></el-option>
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
                <el-select 
                    v-else-if="item.type && item.type == 'select'"
                    :multiple="item.multiple"
                    :collapse-tags="item.multiple"
                    v-model="myForm[item.inputModel]"
                    @select="handleInput($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    style="width:30px;">
                    <el-option v-for="o in item.options" :key="o[item.okey]" :label="o[item.olabel]" :value="o[item.ovalue]"></el-option>
                </el-select>
                <el-date-picker
                    v-else-if="item.type && item.type == 'date'"
                    v-model="myForm[item.inputModel]"
                    type="date"
                    @change="handleInput($event, item.inputModel)"
                    :placeholder="item.placeholder"
                    format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    default-value="1985-06-15"
                    style="width:90%;" 
                    auto-complete="off">
                </el-date-picker>
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
        <div class="line"></div>
        <div class="formlist">
            <el-table
                :data="tableData"
                border
                stripe
                :default-sort = "{order: 'ascending'}"
                max-height="580"
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
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import bus from '../../bus';
    export default {
        name:'contactsaddOrUpdate',
        data(){
            return {
                tableData:null,
                addOrUpdateData: {},
                myForm: {
                    poolName:null,
                    address:null,},

                subData: {},
                mapJson:'../../../../dist/static/map.json',
                Provinces:[],
                cityList: [],
                areaList: [],
                Citys:[],
                block:[],
                countryid:null,
                cityid:null,
                areaid:null,

                page: 1,//默认第一页
                limit: 15,//默认10条
                selectData: null,
                tableNumber: null,
                rules: {
                    poolName : [{ required: true, message: '公司名称不能为空', trigger: 'blur' },],
                    name : [{ required: true, message: '联系人名称不能为空', trigger: 'blur' },],
                    telephone : [{ required: true, message: '电话不能为空', trigger: 'blur' },],
                },
            }
        },
        // mounted() {
        //     this.loadData();
        //     this.loadTable();
        //     this.loadCountry();
        // },
        activated() {
            this.loadData();
            this.loadTable();
            this.loadCountry();
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
            //获取右边表格
            loadTable(){
                let _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page;
                pageInfo.limit = this.limit;
                // console.log(pageInfo)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'rightPoolName.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    // console.log(res.data.map.success)
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count;
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
                let setForm = this.addOrUpdateData.setForm;
                if(setForm) {
                    createForm.forEach((item, index) => {
                        if(item.type && item.type == 'select') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else if(item.type && item.type == 'radio') {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else if(item.type && item.type == "date") {
                            this.$set(this.myForm, item.inputModel, setForm[item.inputModel]);
                        } else {
                            this.myForm[item.inputModel] = setForm[item.inputModel];
                        }
                    });
                    this.myForm.countryid = this.addOrUpdateData.setForm.country
                    this.myForm.cityid = this.addOrUpdateData.setForm.city
                    this.myForm.areaid = this.addOrUpdateData.setForm.area
                    // console.log(this.myForm);
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
                pageInfo.searchName = val
                // console.log(pageInfo)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'rightPoolName.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    // console.log(res.data)
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count;
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
                }
                let createForm = _this.addOrUpdateData.createForm;
                let flag = false;
                createForm.forEach(item => {
                    subData[item.inputModel] = _this.myForm[item.inputModel];
                    // console.log(_this.myForm)
                    if(item.inputModel == "name" && !subData[item.inputModel]) {//联系人名称不能为空
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
                    if(item.inputModel == "telephone" && !subData[item.inputModel]) {//手机号码或电话号码至少一个不能为空
                        _this.$message({
                            message: "电话号码不能为空",
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
                    delItem.path === this.$route.fullPath && this.$router.push('/contacts');
                }else{
                    this.$router.push('/welcome');
                }
            },
            //获取table的索引和行数据，当该行被点击时，将公司名称地址填充到表单（会刷新当前页面，之前填写的信息会被覆盖）
            getRow(index,row){
                this.myForm.poolName = row.name
                this.myForm.address = row.address
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
    h3 {
        /* text-align: center; */
        margin: 20px 60px;
    }
    .myForm {
        width: 41%;;
        /* padding: 20px; */
        float: left;
    }
    .formitemcont:nth-child(11),.formitemcont:nth-child(10){
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
        /* background-color: pink; */
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
