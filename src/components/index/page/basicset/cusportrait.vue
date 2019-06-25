<template>
    <div class="contentall">
        <div class="setleftcontent">
            <ul class="namecontent">
                <li v-for="item in menuList" :key="item.index" :value="item.name" :class="{actived:item.isActive}" @click="showTableval(item)">{{item.name}}</li>
            </ul>
        </div>
        <div class="setrightcontent">
            <div class="entry">
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    
    export default {
        name:'cusportrait',
        store,
        data(){
            return{
                msg:'cusportrait.vue',

                menuList:[
                    {index:'1',name:'职业',isActive:true},
                    {index:'2',name:'岗位',isActive:false},
                    {index:'3',name:'学历',isActive:false},
                    {index:'4',name:'年龄',isActive:false},
                    {index:'5',name:'性别',isActive:false},
                    {index:'6',name:'婚姻状况',isActive:false},
                    {index:'7',name:'家庭人数',isActive:false},
                    {index:'8',name:'子女人数',isActive:false},
                    {index:'9',name:'父母人数',isActive:false},
                    {index:'10',name:'年收入',isActive:false},
                    {index:'11',name:'行为爱好',isActive:false},
                    {index:'12',name:'阅读兴趣',isActive:false},
                    {index:'13',name:'社交兴趣',isActive:false},
                    {index:'14',name:'运动兴趣',isActive:false},
                    {index:'15',name:'手机兴趣',isActive:false},
                    {index:'16',name:'品牌兴趣',isActive:false},
                    {index:'17',name:'车辆兴趣',isActive:false},
                    {index:'18',name:'品茶兴趣',isActive:false},
                    {index:'19',name:'影视兴趣',isActive:false},
                    {index:'20',name:'音乐兴趣',isActive:false},
                    {index:'21',name:'饮食兴趣',isActive:false},
                    {index:'22',name:'服饰兴趣',isActive:false},
                    {index:'23',name:'大行业',isActive:false},
                    {index:'24',name:'小行业',isActive:false},
                    {index:'25',name:'企业规模',isActive:false},
                    {index:'26',name:'成立年限',isActive:false},
                    {index:'27',name:'是否上市',isActive:false},
                    {index:'28',name:'是否融资',isActive:false},
                    {index:'29',name:'经营状态',isActive:false},
                    {index:'30',name:'企业类型',isActive:false},
                ],

                valIndex:'1',
                newform:{
                    type:'职业',
                }
            }
        },
        mounted(){
            this.loadData()
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.type = this.newform.type

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'portraitType/getPortraitTypeGroupByType.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                }).catch(function(err){
                });
            },
            //显示左边对应表格和数据
            showTableval(val){
                const _this = this
                this.valIndex = val.index
                this.newform.type = val.name
                this.menuList.forEach(function(obj){
                    obj.isActive = false;
                });
                val.isActive = !val.isActive;
                _this.$options.methods.loadData.bind(_this)(true)
            },
            handleAdd(){

            },
        },
    }
</script>
