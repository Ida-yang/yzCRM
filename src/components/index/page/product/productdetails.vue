<template>
    <div class="detail_c">
        <div class="bottom">
            <div class="pro_detail">
                <el-carousel class="first_left" indicator-position="outside">
                    <el-carousel-item v-for="(item,index) in itemImgList" :key="index">
                        <img :src="item.imgfile" alt="图片" @click="showImg($event,item)" width="300" height="240">
                    </el-carousel-item>
                </el-carousel>
                <ul class="first_right">
                    <li style="flex:0 0 100%;">产品名称：{{probasicData.goodsName}}</li>
                    <li>产品分类：{{probasicData.category}}</li>
                    <li>单位：{{probasicData.unit}}</li>
                    <li>产品品牌：{{probasicData.brand}}</li>
                    <li>产品属性：{{probasicData.attribute}}</li>
                    <li>销售价格：{{probasicData.price}}</li>
                    <li>标准成本价：{{probasicData.costPrice}}</li>
                    <li>是否可见：<span v-if="probasicData.see == 1">可见</span><span v-if="probasicData.see == 0">不可见</span></li>
                    <li>起订量：{{probasicData.startQuantity}}</li>
                    <li>交货天数：{{probasicData.deliveryDays}}</li>
                    <li style="flex:0 0 100%;">规格描述：{{probasicData.describe}}</li>
                    <li style="flex:0 0 100%;">产品备注：{{probasicData.remark}}</li>
                    <li v-for="(item,index) in fieldData" :key="index">
                        {{item.name}}：<span>{{item.value}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottom">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="基本资料" name="first">
                    <div class="first_bottom">
                        <el-table :data="proItemData" border stripe style="width: 100%">
                            <el-table-column header-align="center" align="center" type="index" min-width="45"></el-table-column>
                            <el-table-column label="主图" prop="imgfile" width="120">
                                <template slot-scope="scope">
                                    <img :src="scope.row.imgfile" :alt="probasicData.goodsName" @click="showImg($event,scope.row)" width="100" height="100">
                                </template>
                            </el-table-column>
                            <el-table-column label="产品编码" prop="goodsCode" min-width="150"></el-table-column>
                            <el-table-column label="规格" prop="specList" min-width="130">
                                <template slot-scope="scope">
                                    {{scope.row.specList}}
                                </template>
                            </el-table-column>
                            <el-table-column label="价格(元)" prop="price" min-width="130"></el-table-column>
                            <el-table-column label="条形码" prop="barcode" min-width="130"></el-table-column>
                            <el-table-column label="ERP对接码" prop="erpDocking" min-width="130"></el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="产品详情描述" name="second" class="first_c">
                    <div class="components-container" v-html="introduction"></div>
                </el-tab-pane>
                <el-tab-pane label="历史销售价格" name="third">
                    <el-table :data="historyData" border stripe style="width: 100%">
                        <el-table-column header-align="center" fixed align="center" type="index" width="45" />
                        <el-table-column label="订单日期" prop="orderTime" min-width="150" />
                        <el-table-column label="产品名称" prop="goodsName" min-width="150" />
                        <el-table-column label="规格描述" prop="describe" min-width="110" />
                        <el-table-column label="规格编码" prop="goodsCode" min-width="150" />
                        <el-table-column label="规格属性" prop="spec" min-width="110">
                            <template slot-scope="scope">
                            <span v-for="(item,i) in scope.row.goodspec" :key="i"><span v-if="i !== 0">/</span>{{item.value}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column label="数量" prop="num" min-width="130" />
                        <el-table-column label="单价" prop="price" min-width="130">
                            <template slot-scope="scope">
                                {{scope.row.price | rounding}}
                            </template>
                        </el-table-column>
                        <el-table-column label="金额" prop="amountOfMoney" min-width="110">
                            <template slot-scope="scope">
                                {{scope.row.amountOfMoney | rounding}}
                            </template>
                        </el-table-column>
                        <el-table-column label="折扣" prop="discount" min-width="110">
                            <template slot-scope="scope">
                                {{scope.row.discount}} %
                            </template>
                        </el-table-column>
                        <el-table-column label="折扣额" prop="discountAmount" min-width="110">
                            <template slot-scope="scope">
                                {{scope.row.discountAmount | rounding}}
                            </template>
                        </el-table-column>
                        <el-table-column label="税率" prop="taxRate" min-width="110">
                            <template slot-scope="scope">
                                {{scope.row.taxRate}} %
                            </template>
                        </el-table-column>
                        <el-table-column label="税额" prop="taxAmount" min-width="110">
                            <template slot-scope="scope">
                                {{scope.row.taxAmount | rounding}}
                            </template>
                        </el-table-column>
                        <el-table-column label="税后金额" prop="taxAfter" min-width="110">
                            <template slot-scope="scope">
                                {{scope.row.taxAfter | rounding}}
                            </template>
                        </el-table-column>
                    </el-table>
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
        
        filters: {
            rounding (value) {
                if(value){
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
                }
            }
        },
        data(){
            return{
                detailData:null,
                activeName:'first',

                probasicData:{},
                fieldData:[],
                introduction:'',
                itemImgList:[],
                proItemData: [{index:0,imgfile:'',spec1:'',barcode: '',erpDocking: ''}],

                historyData:[],

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
                let data = {
                    goodsId: this.detailData.id
                }
                let data1 = {
                    label: 4,
                    id: this.detailData.id
                }
                let data2 = {
                    page: 1,
                    limit: 99999999,
                    id: this.detailData.id
                }

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
                        }else{
                            el.imgfile = '../../../../static/img/noProduct.png'
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
                    if(res.data.goodsDesc.itemImages == '[]'){
                        _this.itemImgList = [{"name":"noProduct.png","value":"noProduct.png","imgfile":"../../../../static/img/noProduct.png"}]
                    }else{
                        _this.itemImgList = JSON.parse(res.data.goodsDesc.itemImages)
                        _this.itemImgList.forEach(a => {
                            if(a.value){
                                a.imgfile = _this.$store.state.systemHttp + 'product/' + _this.$store.state.iscId + '/' + a.value
                            }
                        });
                    }
                }).catch(function(err){
                    // console.log(err);
                });
                //加载自定义字段详情
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'field/information.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data1)
                }).then(function(res){
                    _this.fieldData = res.data
                }).catch(function(err){
                    // console.log(err);
                });

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'customerpool/selectBuyGoodsByCustomerpoolId.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data2)
                }).then(function(res){
                    let info = res.data.map.success
                    info.forEach(el => {
                        el.aaa = JSON.parse(el.spec)
                        el.goodspec = []
                        for(var key in el.aaa){
                            if(key !== "null" && key !== "undefined"){
                                el.goodspec.push({label:key,value:el.aaa[key]})
                            }
                        }
                    });
                    _this.historyData = info
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

