<template>
    <div id="message_c" class="message_c" v-show="collapse2" @mouseleave="leavemessage($event)">
        <div class="message_h">
            <i class="mdi mdi-bell-outline"></i>
            <span>消息</span>
        </div>
        <el-collapse v-model="activeNames" class="message_b" accordion>
            <el-collapse-item title="待办" name="1">
                <el-table
                    :data="tableData"
                    border
                    stripe
                    style="width:100%">
                    <el-table-column
                        prop="typeName"
                        label="事件"
                        min-width="118">
                    </el-table-column>
                    <el-table-column
                        prop="remindContent"
                        label="待办内容"
                        min-width="250">
                        <template slot-scope="scope">
                            <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                                {{scope.row.remindContent}}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-collapse-item>
            <el-collapse-item title="待审核" name="2">
                <el-table
                    :data="tableData2"
                    border
                    stripe
                    style="width:100%;text-align:center">
                    <el-table-column
                        prop="typeName"
                        label="事件"
                        min-width="118">
                    </el-table-column>
                    <el-table-column
                        prop="remindContent"
                        label="待审核内容"
                        min-width="250">
                        <template slot-scope="scope">
                            <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                                {{scope.row.remindContent}}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    import store from '../../store/store'
    import axios from 'axios'
    import bus from './bus';
    import $ from 'jquery'
    import qs from 'qs'

    export default {
        computed:{
            loadState(){
                return store.state.loadornot
            },
        },
        data() {
            return {
                collapse2: false,

                messageList:null,
                tableData:[],
                tableData2:[],

                activeNames: ['1']
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse2', msg => {
                this.collapse2 = msg;
            })
        },
        mounted(){
            this.loadmessage()
        },
        watch:{
            loadState(nv,ov){
                if(this.$store.state.loadornot){
                    this.loadmessage()
                }
            },
        },
        methods:{
            getTime(){
                this.$store.commit('getNowTime')
            },
            loadmessage(){
                this.getTime()
                const _this = this
                let qs =require('querystring')
                let data = {}
                data.remindTime = this.$store.state.nowtime
                data.state = '未读'

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'message/selectMessage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(data),
                }).then(function(res){
                    _this.messageList = res.data
                    _this.tableData = []
                    _this.tableData2 = []
                    _this.tableData = res.data.dealtWith
                    _this.tableData2 = res.data.examine
                }).catch(function(err){
                    // console.log(err)
                });
            },
            leavemessage(e){
                this.$store.state.loadornot = false
                this.collapse2 = false;
                bus.$emit('collapse2', this.collapse2)
            },
            openDetails(index,row){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = row.id
                data.state = '已读'

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'message/updateMessage.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data),
                }).then(function(res){
                    _this.$options.methods.loadmessage.bind(_this)()
                }).catch(function(err){
                });

                if(row.type == 'visit'){
                    this.$store.state.visitdetailsData = {submitData:{"id": row.typeId}}
                    this.$router.push({ path: '/visitplandetails' });
                    bus.$emit('id', row.typeId);
                }
                else if(row.type == 'workplan'){
                    this.$router.push({ path: '/missionplan' });
                }
                else if(row.type == 'customerTwo'){
                    this.$store.state.cluedetailsData = {submitData:{"id": row.typeId}};
                    this.$router.push({ path: '/clueDetails' });
                    bus.$emit('clue', row.typeId);
                }
                else if(row.type == 'customerpool'){
                    this.$store.state.cusdetailsData = {submitData:{"id": row.typeId}};
                    this.$router.push({ path: '/customerDetails' });
                    bus.$emit('customer', row.typeId);
                }
            }
        },
    }
</script>

<style scoped>
    @keyframes bounceInRight {
        from, 60%, 75%, 90%, to {animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);}
        0% {opacity: 0;transform: translate3d(3000px, 0, 0);}
        60% {opacity: 1;transform: translate3d(-25px, 0, 0);}
        75% {transform: translate3d(10px, 0, 0);}
        90% {transform: translate3d(-5px, 0, 0);}
        100% {opacity: 1;transform: none;}
    }
    @-webkit-keyframes bounceInRight {
        from, 60%, 75%, 90%, to {animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);}
        0% {opacity: 0;transform: translate3d(3000px, 0, 0);}
        60% {opacity: 1;transform: translate3d(-25px, 0, 0);}
        75% {transform: translate3d(10px, 0, 0);}
        90% {transform: translate3d(-5px, 0, 0);}
        100% {opacity: 1;transform: none;}
    }
    #message_c {    
        animation: bounceInRight;/*动画名称*/  
        animation-duration: .5s;/*动画持续时间*/  
        -webkit-animation:bounceInRight .5s;/*针对webkit内核*/  
    } 
    .message_c{
        position: fixed;
        right: 0;
        width: 400px;
        height: 100%;
        /* margin-top: 80px; */
        background-color: #ffffff;
        z-index: 999;
        border: 1px solid #dddddd;
    }
    .message_h{
        width: 100%;
        height: 50px;
        /* background-color: #b8b8b8; */
        background-color: #20222a;
        color: #ffffff;
        line-height: 50px;
        padding-left: 20px;
        box-sizing: border-box;
        font-size: 14px;
    }
    .message_b{
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
</style>
