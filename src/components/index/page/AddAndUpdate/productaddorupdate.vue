<template>
    <div class="add_c">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="基本资料" name="first" class="first_c">
                <div class="first_top">
                    <div class="first_left">
                        <el-form :inline="true" ref="myform" :model="myform" :rules="rules">
                            <el-form-item class="first_input" label="产品名称" label-width="90px">
                                <el-input v-model="myform.chanpinmingcheng" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="单位" label-width="90px">
                                <el-select v-model="myform.unit" placeholder="请选择单位" class="inputbox">
                                    <el-option v-for="item in unitsData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="first_input" label="品牌" label-width="90px">
                                <el-select v-model="myform.pinpai" placeholder="请选择品牌" class="inputbox">
                                    <el-option v-for="item in brandsData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="first_input" label="产品分类" label-width="90px">
                                <el-input v-model="myform.chanpinfenlei" :disabled="true" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="产品属性" label-width="90px">
                                <el-select v-model="myform.chanpinshuxing" placeholder="请选择产品属性" class="inputbox">
                                    <el-option v-for="item in attributeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="first_input" label="销售价格" label-width="90px">
                                <el-input v-model="myform.xiaoshoujiage" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="标准成品价" label-width="90px">
                                <el-input v-model="myform.chengpinjia" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="描述" label-width="90px">
                                <el-input v-model="myform.miaoshu" class="inputbox"></el-input>
                            </el-form-item>
                            <el-form-item class="first_input" label="产品标签" label-width="90px">
                                <el-input v-model="myform.chanpinbiaoqian" class="inputbox"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="first_right">
                        <img src="../../../../../static/img/timg.jpg" width="200" height="200">
                    </div>
                </div>
                <div class="first_bottom">
                    <p class="pro_title">产品图片</p>
                    <div class="uploadBOX">
                        <div class="imgbox prod_img" v-for="(item,i) in fileList" :key="i" @mouseenter="mouseenterdiv(item)" @mouseleave="mouseleavediv(item)">
                            <img :src="item" alt="图片" @click="showImg($event,item)">
                            <div class="imgdel">
                                <i class="el-icon-delete" v-if="imgshow" @click="delImg($event,item)"></i>
                            </div>
                        </div>
                        <div class="filebox">
                            <span class="upload">
                                <input type="file" name="file" @change="tirggerFile($event)"/>
                            </span>
                        </div>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </div>
                <div class="first_bottom">
                    <p class="pro_title">产品规格</p><br>
                    <div class="filter-container">
                        <el-table :data="tableData1" border stripe style="width: 100%">
                            <el-table-column type="selection" prop="">
                                <template slot-scope="scope">
                                    <i class="el-icon-delete" @click="changeId(scope.row)"></i>
                                </template>
                            </el-table-column>
                            <el-table-column prop="specName" label="规格名称">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.specName" placeholder="请选择单位" class="inputbox" @change="changeLabel">
                                        <el-option v-for="item in specsData" :key="item.id" :label="item.specName" :value="item.specName"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="specValue" label="规格值" min-width="200">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.specValue" multiple filterable default-first-option style="width:100%" no-data-text="请输入" @change="changeValue">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-button size="mini" @click="AddId" v-show="addHeadbtn" style="margin-left:20px">添加</el-button>
                    <el-button size="mini" @click="batchGeneration" style="margin-left:20px">批量生成</el-button>
                    <br>
                    <el-table :data="tableData" :key="key" border stripe style="width: 100%" v-show="showspec">
                        <el-table-column header-align="center" align="center" type="index" min-width="45"></el-table-column>
                        <el-table-column prop="name" label="主图" min-width="100"/>
                        <el-table-column v-for="(item,i) in formThead" :key="i" :label="item.label" min-width="100">
                            <template slot-scope="scope">{{ scope.row[item.value] }}</template>
                        </el-table-column>
                        <el-table-column prop="Code" label="条形码" min-width="130"/>
                        <el-table-column prop="erpcode" label="ERP对接码" min-width="130"/>
                    </el-table>
                </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="价格资料" name="second">价格资料</el-tab-pane> -->
            <el-tab-pane label="商品详情描述" name="second">
                <div class="components-container ueditor_c">
                    <!-- <div class="info">UE编辑器示例<br>需要使用编辑器时，调用UE公共组件即可。可设置填充内容defaultMsg，配置信息config(宽度和高度等)，可调用组件中获取内容的方法。</div> -->
                    <!-- <button @click="getUEContent()">获取内容</button> -->
                    <div class="editor-container">
                        <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="submit_btn">
            <el-button type="primary" :disabled="isDisable" @click="onSubmit">立即提交</el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button @click="closeTag">取消</el-button>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import bus from '../../bus'
    import UE from '../../../index/ue.vue';

    export default {
        name:'productaddorupdate',
        store,
        components: {UE},
        data(){
            return{
                activeName:'first',
                myform:{
                    chanpinmingcheng:null,
                    unit:null,
                    pinpai:null,
                    chanpinfenleiID:null,
                    chanpinfenlei:null,
                    chanpinshuxing:null,
                    xiaoshoujiage:null,
                    chengpinjia:null,
                    miaoshu:null,
                    chanpinbiaoqian:null,
                    spec:[],
                },
                rules:{
                    chanpinmingcheng : [{ required: true, message: '产品名称不能为空', trigger: 'blur' },],
                    unit : [{ required: true, message: '单位不能为空', trigger: 'blur' },],
                    chanpinshuxing : [{ required: true, message: '产品属性不能为空', trigger: 'blur' },],
                },
                isDisable:false,

                tableData:[],

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

                fileList:[
                    '../../../../../static/img/index.jpg',
                    '../../../../../static/img/1.jpg',
                ],
                imgshow:false,

                dialogVisible:false,
                dialogImageUrl:'',

                showspec:false,

                defaultMsg: '这里是UE测试',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 500
                },

                tableData1:[],
                tableData: [],
                key: 1, // table key
                formThead: [], // 默认表头 Default header
                firstID:0,
                addHeadbtn:true,

                options: [],
            }
        },
        watch: {
            checkboxVal(valArr) {
                this.tableData.forEach(el => {
                    console.log(el)
                });
            },
        },
        mounted(){
            this.loadData()
            this.loadother()
            this.loadHead()
        },
        // JSON.parse(JSON.stringify(data))
        methods:{
            loadData(){
                let productaddOrUpdateData = this.$store.state.productaddOrUpdateData
                console.log(productaddOrUpdateData.setForm)
                this.myform = productaddOrUpdateData.setForm
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
            mouseenterdiv(val){
                this.imgshow = true
            },
            mouseleavediv(val){
                this.imgshow = false
            },
            showImg(){},
            delImg(){},
            tirggerFile(){},
            specHead(e){
                console.log(e)
                // this.specsData.forEach(el => {
                //     if(el.id == e){
                //         console.log(el.specValue)
                //     }
                // });
            },
            loadHead(){
                this.formThead = []
                this.tableData1.forEach(el => {
                    this.formThead.push({label:el.specName,value:el.id})
                });
            },
            changeId(e){
                console.log(e)
            },
            AddId(){
                // console.log(this.tableData1)
                this.firstID = this.firstID+1
                this.tableData1.push({id:'spec'+this.firstID, specName:'', specValue:[]})
                this.$options.methods.loadHead.bind(this)()
                if(this.tableData1.length == 3){
                    this.addHeadbtn = false
                }
            },
            changeLabel(e){
                // console.log(e)
                this.specsData.forEach(el => {
                    if(el.specName == e){
                        console.log(el.specValue)
                    }
                });
                this.$options.methods.loadHead.bind(this)()
            },
            changeValue(e){
                console.log(e)
            },
            batchGeneration(){
                let arr = this.tableData1
                this.tableData = []
                this.showspec = true

                if(arr.length == 1){
                    let a = arr[0].specValue
                    for(let i = 0;i < a.length; i ++){
                        console.log(a)
                        this.tableData.push({name:'1212',spec1:a[i],proNum:'00',Code: '10-20',erpcode: '10-20',})
                    }
                }
                if(arr.length == 2){
                    let a = arr[0].specValue
                    let b = arr[1].specValue
                    console.log(a,b)
                    for(let i = 0; i < a.length; i ++){
                        for(let j = 0; j < b.length; j ++){
                            this.tableData.push({name:'1212',spec1:a[i], spec2:b[j],proNum:'00',Code: '10-20',erpcode: '10-20',})
                        }
                    }
                }
                if(arr.length == 3){
                    let a = arr[0].specValue
                    let b = arr[1].specValue
                    let c = arr[2].specValue
                    console.log(a,b,c)
                    for(let i = 0; i < a.length; i ++){
                    for(let j = 0; j < b.length; j ++){
                        for(let k = 0; k < c.length; k ++){
                        this.tableData.push({name:'1212',spec1:a[i], spec2:b[j], spec3:c[k],proNum:'00',Code: '10-20',erpcode: '10-20',})
                        }
                    }
                    }
                }
            },
            onSubmit(){
                let content = this.$refs.ue.getUEContent();
                console.log(this.myform)
                console.log(content)
            },
            closeTag(){},
        },
    }
</script>

<style>
    .add_c{
        width: 100%;
    }
    .first_c{
        width: 100%;
        padding-bottom: 50px;
        box-sizing: border-box;
        background-color: #f0f0f0;
    }
    .first_top{
        width: 100%;
        display: flex;
        margin-bottom: 10px;
        background-color: #fdfeff;
    }
    .first_left{
        width: calc(100% - 300px);
        padding: 20px;
        /* background-color: #c5b3b3; */
    }
    .first_left .first_input{
        width: calc(50% - 20px);
    }
    .first_left .el-form-item__content{
        width: calc(100% - 100px);
    }
    .first_input .inputbox{
        width: calc(100% - 20px);
    }
    .first_right{
        width: 350px;
        /* background-color: #b3c5bb; */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .first_bottom{
        width: 100%;
        margin-bottom: 10px;
        background-color: #fdfeff;
        padding-bottom: 10px;
        box-sizing: border-box
    }
    .pro_title{
        padding: 10px 0 0 10px;
        font-weight: 500;
        color: #409EFF
    }
    .submit_btn{
        width: 100%;
        height: 60px;
        position: fixed;
        bottom: 0;
        background-color: #fdfeff;
        border-top: 1px solid #e4e7ed;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ueditor_c{
        margin: 20px;
    }
    .spec_select{
        padding: 10px 20px;
        box-sizing: border-box
    }
</style>

