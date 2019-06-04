<template>
    <div class="add_c">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="基本资料" name="first" class="first_c">
                <div class="first_top">
                    <div class="first_left">
                        <el-form :inline="true" ref="myform" :model="myform" :rules="rules">
                            <el-form-item class="first_input" label="产品分类" label-width="90px">
                                <el-input v-model="myform.category" :disabled="true" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item prop="goodsName" class="first_input" label="产品名称" label-width="90px">
                                <el-input v-model="myform.goodsName" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="描述" label-width="90px">
                                <el-input v-model="myform.describe" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item prop="unitId" class="first_input" label="单位" label-width="90px">
                                <el-select v-model="myform.unitId" placeholder="请选择单位" class="inputbox">
                                    <el-option v-for="item in unitsData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="first_input" label="品牌" label-width="90px">
                                <el-select v-model="myform.brandId" placeholder="请选择品牌" class="inputbox">
                                    <el-option v-for="item in brandsData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="attribute" class="first_input" label="产品属性" label-width="90px">
                                <el-select v-model="myform.attribute" placeholder="请选择产品属性" class="inputbox">
                                    <el-option v-for="item in attributeList" :key="item.id" :label="item.name" :value="item.name"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="first_input" label="销售价格" label-width="90px">
                                <el-input v-model="myform.price" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="标准成品价" label-width="90px">
                                <el-input v-model="myform.costPrice" class="inputbox"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!-- <div class="first_right">
                        <img src="../../../../../static/img/timg.jpg" width="200" height="200">
                    </div> -->
                </div>
                <div class="first_bottom">
                    <p class="pro_title">产品图片</p>
                    <div class="uploadproImg">
                        <el-upload
                            :action="doUpload"
                            multiple
                            :file-list="fileList"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="onSuccess"
                            :before-upload="beforeUploadimg">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </div>
                <div class="first_bottom">
                    <p class="pro_title">产品规格</p><br>
                    <div class="filter-container">
                        <el-table :data="specHeadData" border stripe style="width: 100%">
                            <el-table-column type="selection" prop="" width="45">
                                <template slot-scope="scope">
                                    <i class="el-icon-delete" v-show="scope.row.sign !== 'spec1'" @click="DelId(scope.row)"></i>
                                </template>
                            </el-table-column>
                            <el-table-column prop="specName" label="规格名称">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.spec_name" placeholder="请选择规格名称" class="inputbox" @change="changeLabel">
                                        <el-option v-for="item in specsData" :key="item.id" :label="item.specName" :value="item.specName" :disabled="item.disabled"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="specValue" label="规格值" min-width="200">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.spec_value" multiple filterable default-first-option style="width:100%" no-data-text="请将不需要的规格值删除">
                                        <el-option v-for="(item,i) in scope.row.options" :key="i" :label="item" :value="item"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-button size="mini" @click="AddId" v-show="addHeadbtn" style="margin-left:20px">添加</el-button>
                    <el-button size="mini" @click="batchGeneration" v-show="generate" style="margin-left:20px">批量生成</el-button>
                    <br><br>
                    <el-table :data="tableData" border stripe style="width: 100%" @current-change="handleCurrentChange">
                        <el-table-column type="selection" prop="" width="45">
                            <template slot-scope="scope">
                                <i class="el-icon-delete" @click="Delrow(scope.row)"></i>
                            </template>
                        </el-table-column>
                        <el-table-column header-align="center" align="center" type="index" min-width="45"></el-table-column>
                        <el-table-column prop="imgfile" label="主图" width="120">
                            <template slot-scope="scope">
                                <el-upload class="avatar-uploader portrait" :action="doUpload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeUploadimg">
                                    <img v-if="scope.row.imgfile" :src="scope.row.imgfile" class="avatar" width="100" height="100">
                                    <i v-else class="el-icon-plus avatar-uploader-icon portrait_add"></i>
                                </el-upload>
                            </template>
                        </el-table-column>
                        <el-table-column v-for="(item,i) in formThead" :key="i" :label="item.label" min-width="100">
                            <template slot-scope="scope">{{ scope.row[item.value] }}</template>
                        </el-table-column>
                        <el-table-column prop="barcode" label="条形码" min-width="130">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.barcode" class="inputbox"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="erpDocking" label="ERP对接码" min-width="130">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.erpDocking" class="inputbox"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="产品详情描述" name="second">
                <div class="components-container ueditor_c">
                    <div class="editor-container">
                        <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="submit_btn">
            <el-button type="primary" :disabled="isDisable" @click="onSubmit" style="margin-right:100px;">立即提交</el-button>
            <el-button @click="closeTag">取消</el-button>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import bus from '../../bus'
    import UE from '../../ue.vue';

    export default {
        name:'productadd',
        store,
        components: {UE},
        data(){
            return{
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
                rules:{
                    goodsName : [{ required: true, message: '产品名称不能为空', trigger: 'blur' },],
                    unitId : [{ required: true, message: '单位不能为空', trigger: 'blur' },],
                    attribute : [{ required: true, message: '产品属性不能为空', trigger: 'blur' },],
                },
                isDisable:false,

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
                imageList:[],

                dialogVisible:false,
                dialogImageUrl:'',

                defaultMsg: '填写产品详情描述前请把这句话删掉',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 500
                },

                specHeadData:[{sign:'spec1', spec_name:'', spec_value:[], options:[]}],
                tableData: [{index:0,imgfile:'',spec1:'',barcode: '',erpDocking: ''}],
                // key: 0, // table key
                formThead: [], // 默认表头 Default header
                firstID:1,
                addHeadbtn:true,
                generate:false,

                options: [],

                currentrow:null,
                doUpload:this.$store.state.defaultHttp + 'goods/masterGraph.do?cId=' + this.$store.state.iscId,


            }
        },
        mounted(){
            this.loadData()
            this.loadother()
        },
        methods:{
            loadData(){
                let productaddData = this.$store.state.productaddData
                this.myform = productaddData.setForm
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

            loadHead(){
                this.formThead = []
                this.specHeadData.forEach(el => {
                    this.formThead.push({label:el.spec_name,value:el.sign})
                });
            },
            DelId(e){
                this.addHeadbtn = true
                if(e.sign == 'spec1'){
                    this.$message('该行不可删除')
                }else{
                    this.specHeadData.forEach((el,i) => {
                        if(el.sign == e.sign){
                            this.specHeadData.splice(i,1)
                        }
                    });
                }
                if(this.specHeadData.length == 2){
                    this.specHeadData[1].sign = 'spec2'
                }
                this.$options.methods.loadHead.bind(this)()
            },
            Delrow(e){
                if(this.tableData.length == 1){
                    this.$message('该行不可删除')
                }else{
                    this.tableData.forEach((el,i) => {
                        if(el.index == e.index){
                            this.tableData.splice(i,1)
                        }
                    });
                }
            },
            AddId(){
                var a2 = {sign:'spec2', spec_name:'', spec_value:[], options:[]}
                var a3 = {sign:'spec3', spec_name:'', spec_value:[], options:[]}
                this.specHeadData.forEach((el,i) => {
                    if(this.specHeadData.length == 1){
                        this.specHeadData.push(a2)
                    }else if(this.specHeadData.length == 2){
                        this.specHeadData.push(a3)
                    }
                });
                if(this.specHeadData.length == 3){
                    this.addHeadbtn = false
                }
            },
            changeLabel(e){
                let aa = []
                this.generate = true
                this.myform.isEnableSpec = 1
                this.specsData.forEach(a => {
                    if(a.specName == e){
                        aa = a.specValue
                        this.specHeadData.forEach(b => {
                            if(b.spec_name == e){
                                b.spec_value = aa
                                b.options = aa
                            }
                        });
                    }
                });
                this.$options.methods.loadHead.bind(this)()
                this.$options.methods.disabledSome.bind(this)()
            },
            disabledSome(){
                this.specsData.forEach(a => {
                    a.disabled = false
                    this.specHeadData.forEach(b => {
                        if(a.specName == b.spec_name){
                            a.disabled = true
                        }
                    });
                });
            },
            batchGeneration(){
                let arr = this.specHeadData
                this.tableData = []

                if(arr.length == 1){
                    let a = arr[0]
                    for(let i = 0;i < a.spec_value.length; i ++){
                        this.tableData.push({imgfile:'',spec1:a.spec_value[i],sname1:a.spec_name,barcode: '',erpDocking: '',})
                    }
                }
                if(arr.length == 2){
                    let a = arr[0]
                    let b = arr[1]
                    for(let i = 0; i < a.spec_value.length; i ++){
                        for(let j = 0; j < b.spec_value.length; j ++){
                            this.tableData.push({imgfile:'',spec1:a.spec_value[i], spec2:b.spec_value[j], sname1:a.spec_name, sname2:b.spec_name, barcode: '',erpDocking: '',})
                        }
                    }
                }
                if(arr.length == 3){
                    let a = arr[0]
                    let b = arr[1]
                    let c = arr[2]
                    for(let i = 0; i < a.spec_value.length; i ++){
                        for(let j = 0; j < b.spec_value.length; j ++){
                            for(let k = 0; k < c.spec_value.length; k ++){
                            this.tableData.push({imgfile:'',spec1:a.spec_value[i], spec2:b.spec_value[j], spec3:c.spec_value[k], sname1:a.spec_name, sname2:b.spec_name, sname3:c.spec_name, barcode: '', erpDocking: '',})
                            }
                        }
                    }
                }
                this.$options.methods.pushIndex.bind(this)()
            },
            pushIndex(){
                let arr = this.tableData
                arr.forEach((el,i) => {
                    el.index = i
                });
            },
            handleCurrentChange(row){
                this.currentrow = row
            },
            handleRemove(file, fileList) {
                this.imageList.forEach((el,i) => {
                    if(el.name == file.name){
                        this.imageList.splice(i,1)
                    }
                });
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            onSuccess(res,file,fileList){
                this.imageList = []
                fileList.forEach(el => {
                    this.imageList.push({name:el.name,value:el.response})
                });
            },
            handleAvatarSuccess(res, file) {
                this.tableData.forEach(el => {
                    if(el.index == this.currentrow.index){
                        el.imgfile = URL.createObjectURL(file.raw)
                        el.image = res
                    }
                });
            },
            beforeUploadimg(file) {
                const extension = file.name.split('.')[1] === 'jpg'
                const extension2 = file.name.split('.')[1] === 'png'
                const extension3 = file.name.split('.')[1] === 'jpeg'
                const isLt500k = file.size / 1024 / 1024 < 0.5
                if (!extension && !extension2 && !extension3) {
                    this.$message.warning('图片只能是 jpg、png、jpeg格式!')
                    return
                }
                if (!isLt500k) {
                    this.$message.warning('图片大小不能超过 500KB!')
                    return
                }
            },
            onSubmit(){
                const _this = this
                let content = this.$refs.ue.getUEContent();
                let data = {}
                data.goods = new Object();
                data.goodsDesc = new Object();
                data.itemList = new Array();
                data.goodsSpec = new Array();
                data.goods = {
                    "goodsName": this.myform.goodsName,
                    "brandId" : this.myform.brandId,
                    "classification_id" : this.myform.classification_id,
                    "unitId" : this.myform.unitId,
                    "attribute" : this.myform.attribute,
                    "price" : this.myform.price,
                    "costPrice" : this.myform.costPrice,
                    "isEnableSpec" : this.myform.isEnableSpec,
                    "describe" : this.myform.describe,
                    "label" : this.myform.label,
                }

                data.goodsDesc = {"introduction": content,"itemImages":JSON.stringify(this.imageList)}

                // itemList
                this.tableData.forEach(el => {
                    let key1 = el.sname1
                    let key2 = el.sname2
                    let key3 = el.sname3
                    let obj = {key1: el.spec1,key2: el.spec2,key3: el.spec3}
                    obj[key1] = obj['key1']
                    obj[key2] = obj['key2']
                    obj[key3] = obj['key3']
                    delete obj['key1']
                    delete obj['key2']
                    delete obj['key3']
                    data.itemList.push({"image":el.image, "erpDocking":el.erpDocking, "barcode":el.barcode, "spec1":el.spec1, "spec2":el.spec2, "spec3":el.spec3, "sname1":el.sname1, "sname2":el.sname2, "sname3":el.sname3, "spec":JSON.stringify(obj)})
                });

                this.specHeadData.forEach(item => {
                    data.goodsSpec.push({"sign":item.sign,"spec_name":item.spec_name,"spec_value":item.spec_value,"options":item.options})
                });

                this.isDisable = true

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'goods/add.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:data
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message: '添加成功',
                            type:'success'
                        })
                        _this.closeTag();
                    }else{
                        _this.$message({
                            message: res.data.msg,
                            type:'error'
                        })
                    }
                    _this.isDisable = false
                }).catch(function(err){
                    _this.$message.error("提交失败，请重新提交");
                });
            },
            closeTag(){
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
                    delItem.path === this.$route.fullPath && this.$router.push('/product');
                }else{
                    this.$router.push('/index');
                }
            },
        },
    }
</script>

<style>
    .add_c{
        width: 100%;
        padding-bottom: 50px;
        box-sizing: border-box;
    }
</style>

