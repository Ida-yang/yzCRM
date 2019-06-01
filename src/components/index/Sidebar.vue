<template>
    <div class="sidebar" >
        <el-menu class="sidebar-el-menu" v-if="crmMenu" :default-active="onRoutes" :collapse="collapse" background-color="#20222a"
            text-color="#FFFFFF" active-text-color="#ff6722" unique-opened router>
            <div id="logo" v-if="showlogo">
                <span style="font-size:16px">
                    云纵CRM信息平台
                    <!-- <img src="../../../static/img/logo_2.png" alt="logo" /> -->
                </span>
            </div>
            <div id="logo1" v-if="!showlogo">
                <span style="font-size:16px">
                    CRM
                </span>
                <!-- <img src="../../../static/img/logo_1.png" alt="logo" /> -->
                <!-- <span style="font-size:16px">云纵CRM信息平台</span> -->
            </div>
            <span class="title">主要</span>
            <template v-for="item in itemone">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon" style="color:#fff"> </i>&nbsp;
                            <span slot="title" style="color:#fff">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon" style="color:#fff" ></i>&nbsp;
                        <span slot="title"  style="color:#fff">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
            <span class="title">应用</span>
            <template v-for="item in itemtwo">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"  style="color:#fff"> </i>&nbsp;
                            <span slot="title"  style="color:#fff">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon" style="color:#fff" ></i>&nbsp;
                        <span slot="title"  style="color:#fff">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
            <span class="title">设置</span>
            <template v-for="item in itemlast">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"  style="color:#fff"> </i>&nbsp;
                            <span slot="title"  style="color:#fff">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon" style="color:#fff" ></i>&nbsp;
                        <span slot="title"  style="color:#fff">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        <el-menu class="sidebar-el-menu" v-if="!crmMenu" :default-active="onRoutes" :collapse="collapse" background-color="#20222a"
            text-color="#FFFFFF" active-text-color="#ff6722" unique-opened router>
            <div id="logo1" v-if="!showlogo">
                <span style="font-size:16px">
                    CRM
                </span>
            </div>
        </el-menu>
        <div class="switch_menu" :collapse="collapse" @click="switchMenu"></div>
    </div>
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                crmMenu:true,
                collapse: false,
                showlogo:true,
                itemone: [
                    {
                        icon: 'mdi-airplay',
                        index: 'index',
                        title: '首页',
                    },
                    {
                        icon: 'mdi-database-plus',
                        index: '2',
                        title: '数据中心',
                        subs: [
                            {
                                index: 'customerSearch',
                                title: '线索挖掘',
                            },
                            {
                                index: 'reportForm',
                                title: '获客报表',
                            },
                        ]
                    },
                ],
                itemtwo: [
                    {
                        icon: 'mdi-cards-outline',
                        index: '3',
                        title: '销售支持',
                        subs: [
                            {
                                index: 'clue',
                                title: '线索',
                            },
                            {
                                index: 'cluePool',
                                title: '线索池',
                            },
                            {
                                index: 'customer',
                                title: '客户',
                            },
                            {
                                index: 'customerPool',
                                title: '客户池',
                            },
                            {
                                index: 'contacts',
                                title: '联系人',
                            },
                            {
                                index: 'businessOpportunity',
                                title: '商机',
                            },
                            {
                                index: 'agreement',
                                title: '合同',
                            },
                            {
                                index: 'order',
                                title: '销售订单',
                            },
                            {
                                index: 'product',
                                title: '产品',
                            },
                        ]
                    },
                    {
                        icon: 'mdi-bullseye',
                        index: '4',
                        title: '营销',
                        subs: [
                            {
                                index: 'socialMarketing',
                                title: '社交营销',
                            },
                            {
                                index: 'smstemp',
                                title: '短信模板',
                            },
                            {
                                index: 'SMSradar',
                                title: '短信雷达',
                            },
                        ]
                    },
                    {
                        icon: 'mdi-account-outline',
                        index: '5',
                        title: '办公',
                        subs: [
                            {
                                index: 'visitplan',
                                title: '外勤',
                            },
                            {
                                index: 'missionplan',
                                title: '任务',
                            },
                        ]
                    },
                    {
                        icon: 'mdi-puzzle',
                        index: 'analysisReport',
                        title: '商业智能',
                    },
                ],
                
                itemlast: [
                    {
                        icon: 'mdi-settings',
                        index: '7',
                        title: '系统设置',
                        subs: [
                            {
                                index: 'organization',
                                title: '组织机构',
                            },
                            {
                                index: 'user',
                                title: '用户管理',
                            }, 
                            {
                                index: 'basicset',
                                title: '辅助资料'
                            },
                            {
                                index: 'approvalProcess',
                                title: '审核流程'
                            },
                            {
                                index: 'programme',
                                title: '目标',
                            },
                            {
                                index: 'logs',
                                title: '日志',
                            },
                            // {
                            //     index: 'name',
                            //     title: '名字',
                            // },
                        ]
                    },
                ],
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                // console.log(msg)
                this.collapse = msg;
                if(msg == true){
                    this.showlogo = false
                }else{
                    this.showlogo = true
                }
                // this.showlogo = !this.showlogo
            })
        },
        methods:{
            switchMenu(){
                this.crmMenu = !this.crmMenu
            },
        },
    }
</script>

<style scoped>
    #logo{
        width:150px;
        height: 60px;
        padding: 0 8px;
        line-height: 60px;
        color: #ffffff;
        box-sizing: border-box
    }
    #logo1{
        width: 0;
        height: 60px;
        padding: 0 10px;
        line-height: 60px;
        color: #ffffff;
    }
    .sidebar{
        height: 100%;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0px;
        background-color: rgb(32, 34, 42);
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .el-menu{
        border: none
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 150px;
        height: auto;
    }
    .el-menu--collapse{
        width: 65px;
    }
    .sidebar > ul {
        height:100%;
        padding-top: 5px;
        padding-bottom: 50px;
        box-sizing: border-box
    }
    .title{
        display: inline-block;
        height: 40px;
        color: #ffffff;
        font-size: 10px;
        padding-left: 18px;
        line-height: 40px;
    }
    .switch_menu--collapse{
        width: 65px;
    }
    .switch_menu:not(.switch_menu--collapse){
        height: 50px;
        width: 150px;
        position: fixed;
        bottom: 0;
        background-color: rgb(32, 34, 42);
    }
</style>
