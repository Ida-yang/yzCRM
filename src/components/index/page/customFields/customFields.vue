<template>
    <div class="field_wrap">
        <el-card class="box-card field_box">
            <div slot="header" class="clearfix">
                <span>自定义字段设置</span>
            </div>
            <div class="text item">
                <div v-for="item in cardList" :key="item.label" class="field_card">
                    <div class="field_item">
                        <span class="field_span" :style="item.bgcolor">
                            <img :src="item.field_img" width="18" height="18" />
                        </span>
                        <span style="margin-left:10px">{{item.module_name}}</span>
                    </div>
                    <div class="field_item" style="color:#919191">{{item.update_time}} 更新</div>
                    <div class="field_item" style="justify-content:flex-end;color:#ff6333">
                        <span style="cursor:pointer;margin-right:20px" @click="toUpdateItem($event,item)">修 改</span>
                        <span style="cursor:pointer" @click="topreview($event,item)">预 览</span>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'customer',
        store,
        data(){
            return{
                msg:'自定义字段',

                cardList:[]
            }
        },

        activated(){
            this.loadData()
        },
        mounted(){
            this.loadData()
        },

        methods:{
            loadData(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'field/queryFieldType.do?cId='+_this.$store.state.iscId
                }).then(function(res){
                    let info = res.data
                    info.forEach(el => {
                        if(el.label == 1){
                            el.module_name = '线索管理',
                            el.field_img = '../../../../../static/img/field_img/clue.png'
                            el.bgcolor = 'background-color: rgb(108, 162, 255);'
                        }else if(el.label == 2){
                            el.module_name = '客户管理',
                            el.field_img = '../../../../../static/img/field_img/customer.png'
                            el.bgcolor = 'background-color: rgb(125, 211, 100);'
                        }else if(el.label == 3){
                            el.module_name = '联系人管理',
                            el.field_img = '../../../../../static/img/field_img/contact.png'
                            el.bgcolor = 'background-color: rgb(128, 191, 255);'
                        }else if(el.label == 4){
                            el.module_name = '产品管理',
                            el.field_img = '../../../../../static/img/field_img/product.png'
                            el.bgcolor = 'background-color: rgb(238, 205, 47);'
                        }else if(el.label == 5){
                            el.module_name = '商机管理',
                            el.field_img = '../../../../../static/img/field_img/opportunity.png'
                            el.bgcolor = 'background-color: rgb(92, 173, 255);'
                        }else if(el.label == 6){
                            el.module_name = '合同管理',
                            el.field_img = '../../../../../static/img/field_img/agreement.png'
                            el.bgcolor = 'background-color: rgb(114, 221, 207);'
                        }else if(el.label == 7){
                            el.module_name = '回款管理',
                            el.field_img = '../../../../../static/img/field_img/backMoney.png'
                            el.bgcolor = 'background-color: rgb(106, 201, 215);'
                        }else if(el.label == 8){
                            el.module_name = '回款计划管理',
                            el.field_img = '../../../../../static/img/field_img/planMoney.png'
                            el.bgcolor = 'background-color: rgb(209, 218, 103);'
                        }else if(el.label == 9){
                            el.module_name = '订单管理',
                            el.field_img = '../../../../../static/img/field_img/order.png'
                            el.bgcolor = 'background-color: rgb(114, 207, 141);'
                        }
                    });
                    _this.cardList = info
                }).catch(function(err){
                    // console.log(err);
                });
            },
            toUpdateItem(e,item){
                this.$store.state.customFieldData = item
                this.$router.push({ path: '/customFieldsUpdate' });
            },
            topreview(e,item){
                const _this = this
            }
        }
    }
</script>

<style>
    .field_box{
        box-shadow: none !important;
        border: none !important
    }
    .field_wrap{
        background-color: #fff;
        width: 100%;
        height: 100%
    }
    .field_card{
        height: 54px;
        border-bottom: 1px solid #cccccc;
        font-size: 13px;
        display: flex;
        align-items: center
    }
    .field_item{
        flex: 1;
        display: flex;
        align-items: center
    }
    .field_span{
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center
    }
</style>