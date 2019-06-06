<template>
    <div>
        <p class="aaaa">新增工单分类</p>
        <el-carousel :autoplay="false" indicator-position="outside">
            <el-carousel-item v-for="(item,index) in classList" :key="index">
                <!-- <h3 class="small">{{ item }}</h3> -->
                <ul class="jobclass_ul">
                    <li class="jobclass_li" v-for="a in item" :key="a.id" @click="checkItem($event,a)">
                        <p class="p1">{{a.name}}</p>
                        <p class="p2">{{a.remarks}}</p>
                        <p class="p3">{{'负责部门：' + a.deptName}}</p>
                    </li>
                </ul>
            </el-carousel-item>
        </el-carousel>
        <div class="jobclass_line"></div>
        <div>
            <ul class="jobclass2_ul">
                <li class="jobclass2_li" v-for="b in jobData" :key="b.id" @click="checkjobClass($event,b)">
                    <p class="p4">{{b.name}}</p>
                    <!-- <p class="p2">{{a.remarks}}</p> -->
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

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'serviceType/getServiceTypeNodeTree.do?cId='+_this.$store.state.iscId
                }).then(function(res){
                    let data = res.data.map.success
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
                let data = {}
                data.id = val.id

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'serviceType/getServiceTypeByParentId.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.jobData = res.data
                    if(_this.jobData.length == 0){
                        _this.checkjobClass(e,val)
                    }
                }).catch(function(err){
                });
            },
            checkjobClass(e,val){
                const _this = this
                let datas = {}
                datas.setform = val
                datas.submitUrl = this.$store.state.defaultHttp + 'workOrder/insert.do?cId='+_this.$store.state.iscId,
                this.$store.state.workOrderaddorUpdateData = datas
                _this.$router.push({ path: '/workOrderaddorupdate' });
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
    .jobclass_line{
        width: 100%;
        height: 15px;
        background-color: #f0f0f0;
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
    .p1{
        font-size: 16px;
        line-height: 30px;
    }
    .p2{
        font-size: 14px;
        height: 48px;
        line-height: 24px;
        color: #686868
    }
    .p3{
        font-size: 14px;
        line-height: 30px;
    }
    .p4{
        font-size: 16px;
        line-height: 60px;
    }
</style>
