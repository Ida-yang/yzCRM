<template>
    <div class="addorupdatecontent">
        <el-form :model="myForm" ref="myForm" class="myForm" :rules="rules" label-width="110px">
            <el-form-item label="联系人" prop="contacts">
                <el-input v-model="myForm.contacts" style="width:90%;" />
            </el-form-item>
            <el-form-item label="公司名称" prop="name">
                <el-input v-model="myForm.name" style="width:90%;" @input="handleoninput" />
            </el-form-item>
            <el-form-item label="手机" prop="phone">
                <el-input v-model="myForm.phone" style="width:90%;" />
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="myForm.telephone" style="width:90%;" />
            </el-form-item>
            <el-form-item label="微信">
                <el-input v-model="myForm.weChat" style="width:90%;" />
            </el-form-item>
            <el-form-item label="QQ">
                <el-input v-model="myForm.qq" style="width:90%;" />
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="myForm.email" style="width:90%;" />
            </el-form-item>
            <el-form-item label="性别">
                <el-radio v-model="myForm.sex" label="男">男</el-radio>
                <el-radio v-model="myForm.sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="生日">
                <el-date-picker v-model="myForm.birthday" format="yyyy-MM-dd" value-format="yyyy-MM-dd" default-value="1985-06-15" style="width:90%;">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="职业">
                <el-input v-model="myForm.position" style="width:90%;" />
            </el-form-item>
            <el-form-item label="省/市/区">
                <el-select v-model="myForm.countryid" @change="choseProvince" placeholder="请选择省" style="width:28%;">
                    <el-option v-for="o in Provinces" :key="o.id" :label="o.name" :value="o.id"></el-option>
                </el-select>
                <el-select v-model="myForm.cityid" @change="choseCity" placeholder="请选择市" style="width:28%;">
                    <el-option v-for="o in cityList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                </el-select>
                <el-select v-model="myForm.areaid" @change="choseBlock" placeholder="请选择区" style="width:28%;">
                    <el-option v-for="o in areaList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="微博">
                <el-input v-model="myForm.microblog" style="width:90%;" />
            </el-form-item>
            <el-form-item label="支付宝">
                <el-input v-model="myForm.alipay" style="width:90%;" />
            </el-form-item>
            <el-form-item label="旺旺">
                <el-input v-model="myForm.wangwang" style="width:90%;" />
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="myForm.address" style="width:90%;" />
            </el-form-item>
            <!-- <el-form-item label="备注">
                <el-input v-model="myForm.name" type="textarea" rows="5" style="width:90%;" />
            </el-form-item> -->
            <!-- <div style="float:right;margin:20px 60px;">
                <el-button type="primary" :disabled="isDisable" @click="submit">立即提交</el-button>
                &nbsp;&nbsp;
                <el-button @click="closeTag">取消</el-button>
            </div> -->
        </el-form>
        <div class="line" style="height:770px"></div>
        <div class="formlist">
            <el-table :data="tableData" border stripe :default-sort = "{order: 'ascending'}" max-height="760">
                <el-table-column header-align="center" align="center" width="35">
                    <template slot-scope="scope">
                        <el-button style="width:15px;height:15px;padding:0;border-radius:50%;" @click="getRow(scope.$index,scope.row)">&nbsp;</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="name" min-width="200" label="公司名称" sortable />
                <el-table-column prop="address" show-overflow-tooltip min-width="200" label="公司地址" sortable />
                <el-table-column prop="representative" min-width="90" label="法人" sortable />
            </el-table>
        </div>

        <div class="submit_btn">
            <el-button type="primary" :disabled="isDisable" @click="submit" style="margin-right:50px !important;">立即提交</el-button>
            <el-button @click="closeTag">取消</el-button>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store';
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'culPondaddorUpdate',
        store,
        data(){
            return{
                msg:'culPondaddorUpdate.vue',

                myForm:{},
                rules:{
                    contacts: [{ required: true, message: '联系人不能为空', trigger: 'blur' },],
                    name: [{ required: true, message: '公司名称不能为空', trigger: 'blur' },],
                    phone: [{ required: true, message: '手机号码不能为空', trigger: 'blur' },],
                },

                Provinces:[],
                cityList: [],
                areaList: [],

                tableData:[],

                isDisable:false,
            }
        },
        mounted(){
            this.loadTable()
            this.loadData()
        },
        methods:{
            loadTable(){
                const _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = 1;
                pageInfo.limit = 25;
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerOne/query.do',
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    _this.tableData = res.data.rows
                }).catch(function(err){
                });
            },
            loadData(){
                const _this = this
                let qs = require('querystring')
                let culData = this.$store.state.culPondaddorUpdateData
                console.log(this.$store.state.culPondaddorUpdateData)
                if(culData.id){
                    this.myForm = {
                        id:culData.id,
                        name:culData.name,
                        contacts:culData.contacts,
                        phone:culData.phone,
                        email:culData.email,
                        qq:culData.qq,
                        telephone:culData.telephone,
                        microblog:culData.microblog,
                        wangwang:culData.wangwang,
                        address:culData.address,
                        position:culData.position,
                        sex:culData.sex,
                        birthday:culData.birthday,
                        countryid:culData.countryid,
                        cityid:culData.cityid,
                        areaid:culData.areaid,
                        weChat:culData.weChat,
                        alipay:culData.alipay,
                        label:culData.label,
                        pId:this.$store.state.ispId,
                        secondid:this.$store.state.deptid,
                        deptid:this.$store.state.insid,
                    }
                }else{
                    this.myForm = {
                        name:null, contacts:null, phone:null, email:null, qq:null, telephone:null, microblog:null, 
                        wangwang:null, address:null, position:null, sex:null, birthday:null, 
                        countryid:null, cityid:null, areaid:null, weChat:null, alipay:null, label:null,
                        pId:this.$store.state.ispId,
                        secondid:this.$store.state.deptid,
                        deptid:this.$store.state.insid,
                    }
                }
                this.$options.methods.loadCountry.bind(this)()
            },
            loadCountry(){
                const _this = this
                let qs =require('querystring')
                let country = {}
                if(this.myForm.cityid){
                    country.id = this.myForm.cityid
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'address/getAddress.do',
                        data: qs.stringify(country),
                    }).then(function(res){
                        _this.areaList=res.data;
                    }).catch(function(err){
                    });
                }
                if(this.myForm.countryid){
                    country.id = this.myForm.countryid
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'address/getAddress.do',
                        data: qs.stringify(country),
                    }).then(function(res){
                        _this.cityList=res.data;
                    }).catch(function(err){
                    });
                }
                country.id = ''

                //省/市/区
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'address/getAddress.do',
                    data: qs.stringify(country),
                }).then(function(res){
                    _this.Provinces=res.data;
                }).catch(function(err){
                });
                
            },
            handleoninput(val){
                console.log(val)
                const _this = this
                this.myForm.name = val
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = 1
                pageInfo.limit = 25
                pageInfo.keyword = val

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerOne/query.do',
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    _this.tableData = res.data.rows
                }).catch(function(err){
                });
            },
            // 选省
            choseProvince(e) {
                const _this = this
                this.myForm.cityid = ''
                this.myForm.areaid = ''
                this.countryid = e
                _this.$options.methods.loadCountry.bind(_this)(true);
            },
            // 选市
            choseCity(e) {
                const _this = this
                this.myForm.areaid = ''
                this.cityid = e
                _this.$options.methods.loadCountry.bind(_this)(true);
            },
            // 选区
            choseBlock(e) {
                this.E=e;
                this.areaid = e
            },
            getRow(index,row){
                this.myForm.name = row.name
                this.myForm.address = row.address
            },
            submit(){
                console.log(this.myForm)
                
                const _this = this;
                let qs =require('querystring')
                let subData = this.myForm

                let flag = false;
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
                // var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
                if(subData.email && !reg.test(subData.email)) {
                    _this.$message({
                        message: "邮箱格式不正确",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!subData.contacts) {
                    _this.$message({
                        message: "联系人名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!subData.name) {
                    _this.$message({
                        message: "公司名称不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(!subData.phone) {
                    _this.$message({
                        message: "手机号码不能为空",
                        type: 'error'
                    });
                    flag = true;
                }
                if(flag) return;

                this.isDisable = true

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'cultivationPool/saveOrUpdate.do?cId=' + _this.$store.state.iscId,
                    data: qs.stringify(subData)
                }).then(function(res){
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
                    _this.isDisable = false
                }).catch(function(err){
                    _this.$message.error("提交失败，请重新提交");
                    
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
                    delItem.path === this.$route.fullPath && this.$router.push('/culturePond');
                }else{
                    this.$router.push('/index');
                }
            },
        },
    }
</script>

<style>
</style>
