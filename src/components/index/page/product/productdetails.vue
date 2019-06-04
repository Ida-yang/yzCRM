<template>
    <div class="detail_c">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="基本资料" name="first" class="first_c">
                <div class="first_top">
                    <div class="first_left">
                        <el-form :inline="true" ref="myform" :model="myform">
                            <el-form-item class="first_input" label="产品分类" label-width="90px">
                                <el-input v-model="myform.category" :disabled="true" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="产品名称" label-width="90px">
                                <el-input v-model="myform.goodsName" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="描述" label-width="90px">
                                <el-input v-model="myform.describe" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="单位" label-width="90px">
                                <el-select v-model="myform.unitId" placeholder="请选择单位" class="inputbox">
                                    <el-option v-for="item in unitsData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="first_input" label="品牌" label-width="90px">
                                <el-select v-model="myform.brandId" placeholder="请选择品牌" class="inputbox">
                                    <el-option v-for="item in brandsData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="first_input" label="产品属性" label-width="90px">
                                <el-select v-model="myform.attribute" placeholder="请选择产品属性" class="inputbox">
                                    <el-option v-for="item in attributeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="first_input" label="销售价格" label-width="90px">
                                <el-input v-model="myform.price" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="标准成品价" label-width="90px">
                                <el-input v-model="myform.costPrice" class="inputbox"></el-input>
                            </el-form-item>
                            <!-- <el-form-item class="first_input" label="产品标签" label-width="90px">
                                <el-input v-model="myform.chanpinbiaoqian" class="inputbox"></el-input>
                            </el-form-item> -->
                        </el-form>
                    </div>
                    <div class="first_right">
                        <img src="../../../../../static/img/timg.jpg" width="200" height="200">
                    </div>
                </div>
                <div class="first_bottom">
                    <p class="pro_title">产品图片</p>
                    <div class="uploadBOX">
                        <div class="imgbox" v-for="item in fileList" :key="item.id">
                            <img :src="item.imgURL" alt="图片" @click="showImg($event,item)">
                        </div>
                    </div>
                </div>
                <div class="first_bottom">
                    <p class="pro_title">产品规格</p><br>
                    <div class="filter-container">
                        <el-table :data="tableData1" border stripe style="width: 100%">
                            <el-table-column header-align="center" align="center" type="index" min-width="45"></el-table-column>
                            <el-table-column prop="spec_name" label="规格名称"></el-table-column>
                            <el-table-column prop="specValue" label="规格值" min-width="200">
                                <template slot-scope="scope">
                                    <el-tag type="info" v-for="(item,i) in scope.row.spec_value" :key="i" style="margin-right:8px;">&nbsp;{{item}}&nbsp;</el-tag>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-table :data="tableData" border stripe style="width: 100%">
                        <el-table-column header-align="center" align="center" type="index" min-width="45"></el-table-column>
                        <el-table-column prop="imgfile" label="主图" width="120">
                            <template slot-scope="scope">
                                <div>
                                    <img src="../../../../../static/img/timg.jpg" :alt="scope.row.imgfile" @click="showImg($event,item)" width="100" height="100">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column v-for="(item,i) in formThead" :key="i" :label="item.label" min-width="100">
                            <template slot-scope="scope">{{ scope.row[item.value] }}</template>
                        </el-table-column>
                        <el-table-column prop="barcode" label="条形码" min-width="130"></el-table-column>
                        <el-table-column prop="erpDocking" label="ERP对接码" min-width="130"></el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="价格资料" name="second">价格资料</el-tab-pane> -->
            <el-tab-pane label="产品详情描述" name="second">
                <div class="components-container ueditor_c">
                    <div class="editor-container">
                        <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import bus from '../../bus'
    import UE from '../../../index/ue.vue';

    export default {
        name:'productdetails',
        store,
        components: {UE},
        data(){
            return{
                detailData:null,
                updataData:null,
                activeName:'first',
                myform:{
                    goodsName:null,
                    unitId:null,
                    brandId:null,
                    chanpinfenleiID:null,
                    classification_id:null,
                    attribute:null,
                    price:null,
                    costPrice:null,
                    describe:null,
                    chanpinbiaoqian:null,
                    spec:[],
                },

                page:1,//默认为第一页
                limit:20,//默认为20行

                attributeList:[
                    {id:1,name:'成品'},
                    {id:2,name:'原材料'},
                    {id:3,name:'辅材'},
                    {id:4,name:'办公用品'},
                ],
                unitsData:null,
                brandsData:null,
                specsData:null,

                fileList:[],
                imgshow:false,

                dialogVisible:false,
                dialogImageUrl:'',

                defaultMsg: '这里是UE测试',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 500
                },

                tableData1:[{sign:'spec1', spec_name:'', spec_value:[], options:[]}],
                tableData: [{index:0,imgfile:'',spec1:'',barcode: '',erpDocking: ''}],
                formThead: [], // 默认表头 Default header
                firstID:1,

                doUpload:this.$store.state.defaultHttp + 'previewAvatar.do?cId=' + this.$store.state.iscId,
            }
        },
        watch: {
            checkboxVal(valArr) {
                this.tableData.forEach(el => {
                    console.log(el)
                });
            },
        },
        activated(){
            this.loadData()
        },
        mounted(){
            this.loadData()
            this.loadother()
        },
        // JSON.parse(JSON.stringify(data))
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                this.detailData = this.$store.state.productdetailsData.submitData
                let data = {}
                data.goodsId = this.detailData.id

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'goods/searchByGoodsId.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.updataData = res.data
                    _this.myform = res.data.goods
                    _this.tableData1 = res.data.goodsSpec
                    _this.tableData = res.data.itemList
                    _this.$options.methods.loadHead.bind(_this)()
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadother(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.page = this.page
                data.limit = this.limit

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'unit/selectUnitList.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.unitsData = res.data.map.units
                }).catch(function(err){
                    // console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'brand/selectBrandList.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.brandsData = res.data.map.brands
                }).catch(function(err){
                    // console.log(err);
                });
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'specification/selectList.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.specsData = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            showImg(e,val){
                this.dialogImageUrl = '../../../../../static/img/timg.jpg'
                this.dialogVisible = true
            },

            loadHead(){
                this.formThead = []
                this.tableData1.forEach(el => {
                    this.formThead.push({label:el.spec_name,value:el.sign})
                });
            },
        },
    }
</script>

<style>
    .detail_c{
        width: 100%;
    }
</style>

