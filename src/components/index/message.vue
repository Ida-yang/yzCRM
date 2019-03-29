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
                    style="width:100%;text-align:center">
                    <el-table-column
                        prop="typeName"
                        header-align="left"
                        align="left"
                        label="模块"
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="remindContent"
                        header-align="left"
                        align="left"
                        label="待办内容">
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
                        header-align="left"
                        align="left"
                        label="模块"
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="remindContent"
                        header-align="left"
                        align="left"
                        label="待审核内容">
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
        data() {
            return {
                collapse2: false,

                thistime:null,
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
                console.log(msg)
            })
        },
        mounted(){
            this.loadmessage()
        },
        watch:{
            $route(newValue, oldValue){
                this.loadmessage()
            }
        },
        methods:{
            getTime(){
                let myDate = new Date()
                let y = myDate.getFullYear() //获取完整的年份(4位,1970-????)
                let m = myDate.getMonth() + 1 //获取当前月份(0-11,0代表1月)
                let d = myDate.getDate() //获取当前日(1-31)
                let h = myDate.getHours() //获取当前小时数(0-23)
                let mm = myDate.getMinutes() //获取当前分钟数(0-59)
                let s = myDate.getSeconds() //获取当前秒数(0-59)
                m = (m < 10 ? "0" + m : m)
                d = (d < 10 ? "0" + d : d)
                h = (h < 10 ? "0" + h : h)
                mm = (mm < 10 ? "0" + mm : mm)
                s = (s < 10 ? "0" + s : s)
                this.thistime = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
            },
            loadmessage(){
                this.getTime()
                const _this = this
                let qs =require('querystring')
                let data = {}
                // data.remindTime = this.thistime
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
                    console.log(err)
                });
            },
            leavemessage(e){
                this.collapse2 = false;
                bus.$emit('collapse2', this.collapse2)
            },
            openDetails(index,row){
                console.log(row)
                if(row.type == 'visit'){
                    console.log(row.typeId)
                    this.$store.state.visitdetailsData = {submitData:{"id": row.typeId}}
                    this.$router.push({ path: '/visitplandetails' });
                }
            }
        }
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
        width: 300px;
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
        background-color: #525866;
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
