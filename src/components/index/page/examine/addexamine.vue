<template>
    <div>
        <p class="aaaa">发起审批</p>
        <el-carousel :autoplay="false" indicator-position="outside">
            <el-carousel-item v-for="(item,index) in classList" :key="index">
                <ul class="jobclass_ul">
                    <li class="jobclass_li" v-for="a in item" :key="a.id" @click="checkItem($event,a)">
                        <p class="p1">{{a.name}}</p>
                        <p class="p2">{{a.remarks}}</p>
                        <!-- <p class="p3">{{'负责部门：' + a.deptName}}</p> -->
                    </li>
                </ul>
            </el-carousel-item>
        </el-carousel>
        <div class="jobclass_line"></div>
        <div>
            <ul class="jobclass2_ul">
                <li class="jobclass2_li" v-for="b in jobData" :key="b.id" @click="checkjobClass($event,b)">
                    <p class="p4">{{b.title}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'jobClassification',
        store,
        data(){
            return{
                msg:'新增工单，工单分类',
                classList:[],
                jobData:[],
            }
        },
        mounted(){
            this.loadData()
        },
        activated(){
            this.loadData()
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'oaExamineCategoryType/selectList.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    let data = res.data
                    _this.classList = []
                    for(var i = 0; i < data.length; i = i+8){
                        _this.classList.push(data.slice(i,i+8))
                    }
                    return _this.classList
                }).catch(function(err){
                });
            },
            checkItem(e,val){
                const _this = this
                let qs = require('querystring')
                let data = {
                    page: 1,
                    limit: 99999999,
                    keyType: '4',
                    type: val.id
                }
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'oaExamineCategory/selectList.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.jobData = res.data.map.success
                    if(_this.jobData.length == 0){
                        _this.checkjobClass(e,val)
                    }
                }).catch(function(err){
                });
            },
            checkjobClass(e,val){
                const _this = this
                this.$store.state.examineaddOrUpdateData = val
                _this.$router.push({ path: '/examineaddOrUpdate' });
            },
        },
    }
</script>

<style>
    .aaaa{
        font-size: 18px;
        padding-left: 20px;
        padding-top: 20px;
        /* line-height: 30px; */
    }
    .el-carousel__container{
        height: 360px;
    }
    .jobclass_ul{
        width: 100%;
        height: 360px;
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
    }
    .jobclass_ul .jobclass_li{
        flex: 0 0 calc(25% - 25px);
        height: 150px;
        background-color: #f1f7fa;
        margin-left: 20px;
        padding: 20px 25px;
        box-sizing: border-box;
        border: 1px dashed #cccccc;
    }
    .jobclass_ul .jobclass_li:nth-child(-n+4){
        margin-top: 20px;
    }
    .jobclass2_ul{
        width: 100%;
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
    }
    .jobclass2_ul .jobclass2_li{
        flex: 0 0 calc(25% - 25px);
        height: 60px;
        background-color: #eef5f8;
        margin-left: 20px;
        margin-top: 20px;
        padding-left: 25px;
        box-sizing: border-box;
    }
    .jobclass_li .p1{
        font-size: 16px;
        line-height: 30px;
    }
    .jobclass_li .p2{
        font-size: 14px;
        height: 48px;
        line-height: 24px;
        color: #686868
    }
    .jobclass_li .p3{
        font-size: 14px;
        line-height: 30px;
    }
    .jobclass2_li .p4{
        font-size: 16px;
        line-height: 60px;
    }
</style>
