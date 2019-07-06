<template>
    <div class="detail_c">
        <div class="bottom">
            <div class="pro_detail">
                <el-carousel class="first_left" indicator-position="outside">
                    <el-carousel-item v-for="(item,index) in itemImgList" :key="index">
                        <img :src="item.imgfile" alt="图片" @click="showImg($event,item)" width="350" height="300">
                    </el-carousel-item>
                </el-carousel>
                <ul class="first_right">
                    <li>产品编码：{{probasicData.aaaaaa}}</li>
                    <li>产品名称：{{probasicData.goodsName}}</li>
                    <li>产品分类：{{probasicData.category}}</li>
                    <li>单位：{{probasicData.unit}}</li>
                    <li>产品品牌：{{probasicData.brand}}</li>
                    <li>产品属性：{{probasicData.attribute}}</li>
                    <li>销售价格：{{probasicData.price}}</li>
                    <li>标准成本价：{{probasicData.costPrice}}</li>
                    <li style="flex:0 0 100%;">产品描述：{{probasicData.describe}}</li>
                </ul>
            </div>
        </div>
        <div class="bottom">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="产品详情描述" name="first" class="first_c">
                    <div class="components-container" v-html="introduction"></div>
                </el-tab-pane>
                <el-tab-pane label="基本资料" name="second">
                    <div class="first_bottom">
                        <el-table :data="proItemData" border stripe style="width: 100%">
                            <el-table-column header-align="center" align="center" type="index" min-width="45"></el-table-column>
                            <el-table-column label="主图" prop="imgfile" width="120">
                                <template slot-scope="scope">
                                    <img :src="scope.row.imgfile" :alt="scope.row.imgfile" @click="showImg($event,scope.row)" width="50" height="50">
                                </template>
                            </el-table-column>
                            <el-table-column label="规格" prop="specList" min-width="130">
                                <template slot-scope="scope">
                                    {{scope.row.specList}}
                                </template>
                            </el-table-column>
                            <el-table-column label="条形码" prop="barcode" min-width="130"></el-table-column>
                            <el-table-column label="ERP对接码" prop="erpDocking" min-width="130"></el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

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
                activeName:'first',

                probasicData:{},
                introduction:'',
                itemImgList:[],
                proItemData: [{index:0,imgfile:'',spec1:'',barcode: '',erpDocking: ''}],

                dialogVisible:false,
                dialogImageUrl:'',
            }
        },
        activated(){
            this.loadData()
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                this.detailData = this.$store.state.productdetailsData
                let data = {}
                data.goodsId = this.detailData.id

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'goods/searchByGoodsId.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.probasicData = res.data.goods
                    _this.introduction = res.data.goodsDesc.introduction
                    _this.proItemData = res.data.itemList
                    _this.proItemData.forEach(el => {
                        if(el.image){
                            el.imgfile = _this.$store.state.systemHttp + 'product/' + _this.$store.state.iscId + '/' + el.image
                        }
                        if(el.spec1 && !el.spec2 && !el.spec3){
                            el.specList = el.spec1
                            return
                        }else if(el.spec1 && el.spec2 && !el.spec3){
                            el.specList = el.spec1 + '/' + el.spec2
                            return
                        }else if(el.spec1 && el.spec2 && el.spec3){
                            el.specList = el.spec1 + '/' + el.spec2 + '/' + el.spec3
                            return
                        }else{
                            el.specList = null
                        }
                    });
                    _this.itemImgList = JSON.parse(res.data.goodsDesc.itemImages)
                    _this.itemImgList.forEach(a => {
                        if(a.value){
                            a.imgfile = _this.$store.state.systemHttp + 'product/' + _this.$store.state.iscId + '/' + a.value
                        }
                    });
                }).catch(function(err){
                    // console.log(err);
                });
            },
            showImg(e,val){
                this.dialogImageUrl = val.imgfile
                this.dialogVisible = true
            },
        },
    }
</script>

<style>
    .detail_c{
        width: 100%;
    }
</style>

