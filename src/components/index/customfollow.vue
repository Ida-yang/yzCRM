<template>
    <div class="cf_c" v-show="cusfollow">
        <div class="cf_close" @click="closeFollow"><i class="el-icon-circle-close-outline"></i></div>
        <ul class="followrecord" v-for="(item) in followData" :key="item.followId">
            <li class="recordicon">
                <img :src="item.imgUrl" class="detail_portrait" :alt="item.private_employee" :title="item.private_employee" />
            </li>
            <li class="verticalline"></li>
            <li class="recordcontent">
                <div class="left_more">
                    <p>
                        <span class="de_span_2">{{item.contacts[0].name}}</span>
                        <span class="de_span_1">&nbsp;|&nbsp;</span>
                        <span class="de_span_1">{{item.createTime}}</span>
                        <span v-if="item.contactTime" class="de_span_1">&nbsp;&nbsp;--&nbsp;&nbsp;</span>
                        <span class="de_span_1">{{item.contactTime}}</span>
                        &nbsp;&nbsp;
                        <span class="de_span_2">{{item.state}}</span>
                        &nbsp;&nbsp;
                        <span class="de_span_3">&nbsp;&nbsp;{{item.followType}}&nbsp;&nbsp;</span>
                    </p>
                    <p style="margin-top:15px;margin-bottom:15px;">{{item.followContent}}</p>
                    
                    <div class="imgbox_two" v-if="item.imgName">
                        <img :src="item.picture_detail" alt="图片" width="80" height="80">
                    </div>
                    <div v-if="item.enclosureName">
                        <a :href="item.enclosureUrl" download>{{item.enclosureOldName}}</a>
                    </div>
                    
                    <p class="de_span_1">{{item.inputType}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import store from '../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    import bus from './bus'

    export default {
        name:'customfollow',
        store,
        computed: {
            searchList(){
                return store.state.customfollowId;
            },
        },
        data(){
            return{
                msg:'customfollow.vue',

                cusfollow:false,

                followData:[],
                follownumber:0,
            }
        },
        watch:{
            searchList(nv,ov){
                this.loadData()
            },
            $route(newValue, oldValue){
                this.cusfollow = false
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信
            bus.$on('cusfollow', msg => {
                this.cusfollow = msg;
            })
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                let submitUrl = ''
                let customfollowList = this.$store.state.customfollowId
                if(customfollowList.customerpool_id){
                    data.customerpool_id = customfollowList.customerpool_id
                }else if(customfollowList.customertwoId){
                    data.customertwoId = customfollowList.customertwoId
                }
                submitUrl = customfollowList.submitUrl

                axios({
                    method:'post',
                    url:submitUrl,
                    data: qs.stringify(data)
                }).then(function(res){
                    let data = res.data.map.success
                    data.forEach(el => {
                        if(el.userImagName){
                            el.imgUrl = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.userImagName
                        }
                        if(!el.userImagName || el.userImagName == null){
                            el.imgUrl = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                        }
                        if(el.imgName && el.imgName !== null){
                            el.picture_detail = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.imgName
                        }
                        if(el.enclosureName && el.enclosureName !== null){
                            el.enclosureUrl = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.enclosureName
                        }
                    });
                    _this.followData = data
                    _this.follownumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            closeFollow(){
                this.cusfollow = false
            },
        },
    }
</script>

<style>
    .cf_c{
        width: 600px;
        height: calc(100% - 90px);
        background-color: rgb(255, 255, 255);
        position: fixed;
        right: 0;
        top: 90px;
        z-index: 99;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #f0f0f0;
        box-shadow: -5px -3px 10px #dddddd;
        overflow: overlay
    }
    .cf_close{
        width: 20px;
        height: 20px;
        margin-left: 520px;
        line-height: 20px;
        font-size: 14px;
        text-align: right;
        cursor: pointer;
    }
</style>
