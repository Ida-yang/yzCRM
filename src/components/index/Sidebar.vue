<template>
    <div class="sidebar" >
        <el-menu class="sidebar-el-menu" v-if="crmMenu == 1" :default-active="onRoutes" :collapse="collapse" background-color="rgb(52, 63, 83)"
            text-color="#f7f7f7" active-text-color="#ff6333" unique-opened router>
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
            <template v-for="item in crmItemone">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" class="sidebar_submenu">
                        <template slot="title">
                            <i :class="item.icon" style="color:#fff"> </i>&nbsp;
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" class="sidebar_menu_item">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" class="sidebar_menu_item">
                        <i :class="item.icon" style="color:#fff"></i>&nbsp;
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
            <span class="title">应用</span>
            <template v-for="item in crmItemtwo">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" class="sidebar_submenu">
                        <template slot="title">
                            <i :class="item.icon"  style="color:#fff"> </i>&nbsp;
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" class="sidebar_menu_item">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" class="sidebar_menu_item">
                        <i :class="item.icon" style="color:#fff" ></i>&nbsp;
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
            <span class="title">设置</span>
            <template v-for="item in crmItemlast">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" class="sidebar_submenu">
                        <template slot="title">
                            <i :class="item.icon" style="color:#fff"> </i>&nbsp;
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" class="sidebar_menu_item">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" class="sidebar_menu_item">
                        <i :class="item.icon" style="color:#fff" ></i>&nbsp;
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>

        <el-menu class="sidebar-el-menu" v-if="crmMenu == 2" :default-active="onRoutes" :collapse="collapse" background-color="rgb(52, 63, 83)"
            text-color="#f7f7f7" active-text-color="#ff6333" unique-opened router>
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
            </div>
            <span class="title">办公</span>
            <template v-for="item in workItema">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" class="sidebar_submenu">
                        <template slot="title">
                            <i :class="item.icon" style="color:#fff"> </i>&nbsp;
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" class="sidebar_menu_item">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" class="sidebar_menu_item">
                        <i :class="item.icon" style="color:#fff" ></i>&nbsp;
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>

        <el-menu class="sidebar-el-menu" v-if="crmMenu == 3" :default-active="onRoutes" :collapse="collapse" background-color="rgb(52, 63, 83)"
            text-color="#f7f7f7" active-text-color="#ff6333" unique-opened router>
            <div id="logo" v-if="showlogo">
                <span style="font-size:16px">
                    云纵CRM信息平台
                </span>
            </div>
            <div id="logo1" v-if="!showlogo">
                <span style="font-size:16px">
                    CRM
                </span>
            </div>
            <span class="title">订货</span>
            <template v-for="item in orderItema">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" class="sidebar_submenu">
                        <template slot="title">
                            <i :class="item.icon" style="color:#fff"> </i>&nbsp;
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" class="sidebar_menu_item">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" class="sidebar_menu_item">
                        <i :class="item.icon" style="color:#fff" ></i>&nbsp;
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        <div :class="collapse?'s_menu':'switch_menu'">
            <span v-show="!collapse && crmMenu !== 1" class="switch_tag" @click="switchMenu(1)">CRM</span>
            <span v-show="collapse && crmMenu !== 1" class="switch_tag" @click="switchMenu(1)">
                <i class="mdi-account-multiple"></i>
            </span>
            <span v-show="!collapse && crmMenu !== 2" class="switch_tag" @click="switchMenu(2)">办公</span>
            <span v-show="collapse && crmMenu !== 2" class="switch_tag" @click="switchMenu(2)">
                <i class="mdi-city"></i>
            </span>
            <span v-show="!collapse && crmMenu !== 3" class="switch_tag" @click="switchMenu(3)">订货</span>
            <span v-show="collapse && crmMenu !== 3" class="switch_tag" @click="switchMenu(3)">
                <i class="mdi-cart"></i>
            </span>
        </div>
    </div>
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                crmMenu:1,
                collapse: false,
                showlogo:true,
                crmItemone: [
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
                crmItemtwo: [
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
                                index: 'receive',
                                title: '合同回款',
                            },
                            {
                                index: 'orderReceive',
                                title: '订单收款',
                            },
                            {
                                index: 'followlog',
                                title: '跟进记录',
                            },
                            { 
                                index: 'product',
                                title: '产品',
                            },
                            { 
                                index: 'namesss',
                                title: '名字',
                            },
                        ]
                    },
                    {
                        icon: 'mdi-bullseye',
                        index: '4',
                        title: '营销',
                        subs: [
                            {
                                index: 'culturePond',
                                title: '培育池',
                            },
                            {
                                index: 'competitor',
                                title: '竞争对手',
                            },
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
                                title: '营销雷达',
                            },
                        ]
                    },
                    {
                        icon: 'mdi-vector-triangle',
                        index: '5',
                        title: '售后服务',
                        subs: [
                            {
                                index: 'workOrder',
                                title: '工单',
                            },
                            {
                                index: 'jobClassification',
                                title: '新增工单',
                            },
                            {
                                index: 'experienceBase',
                                title: '经验库',
                            },
                        ]
                    },
                    {
                        icon: 'mdi-puzzle',
                        index: 'analysisReport',
                        title: '商业智能',
                    },
                ],
                
                crmItemlast: [
                    {
                        icon: 'mdi-settings',
                        index: '8',
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
                                index: 'customFields',
                                title: '自定义字段'
                            },
                            {
                                index: 'basicset',
                                title: '辅助资料'
                            },
                            {
                                index: 'cusportrait',
                                title: '客户画像'
                            },
                            {
                                index: 'approvalProcess',
                                title: '审批流程'
                            },
                            {
                                index: 'programme',
                                title: '目标',
                            },
                            {
                                index: 'logs',
                                title: '日志',
                            },
                        ]
                    },
                ],
                workItema:[
                    {
                        icon: 'mdi-account-outline',
                        index: '1',
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
                            {
                                index: 'note',
                                title: '便签',
                            },
                        ]
                    },
                ],
                orderItema:[
                    {
                        icon: 'mdi-account-outline',
                        index: '1',
                        title: '销售管理',
                        subs: [
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
                        icon: 'mdi-account-outline',
                        index: '2',
                        title: '财务管理',
                        subs: [
                            {
                                index: 'receive',
                                title: '合同回款',
                            },
                            {
                                index: 'orderReceive',
                                title: '订单收款',
                            },
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
            })
        },
        methods:{
            switchMenu(val){
                this.crmMenu = val
                // this.crmMenu = !this.crmMenu
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
        color: #f7f7f7;
        box-sizing: border-box
    }
    #logo1{
        width: 0;
        height: 60px;
        padding: 0 10px;
        line-height: 60px;
        color: #f7f7f7;
    }
    .sidebar{
        height: 100%;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0px;
        background-color: rgb(52, 63, 83);
        overflow-y: overlay;
        font-family: Montserrat,Georgia,'Times New Roman',Times,serif;
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
        padding-bottom: 40px;
        box-sizing: border-box
    }
    .title{
        display: inline-block;
        height: 40px;
        color: #f7f7f7;
        font-size: 12px;
        padding-left: 18px;
        line-height: 40px;
    }
    .switch_menu{
        width:150px;
        height: 40px;
        position: fixed;
        bottom: 0;
        background-color: rgb(52, 63, 83);
        -webkit-transition: width .3s;
        transition:width .3s;
    }
    .s_menu{
        width: 65px;
        height: 40px;
        position: fixed;
        bottom: 0;
        background-color: rgb(52, 63, 83);
        -webkit-transition: width .6s;
        transition:width .6s;
    }
    .switch_tag{
        display: inline-block;
        width: calc(50% - 4px);
        line-height: 40px;
        color: #f7f7f7;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        /* border-top: 1px dashed #f7f7f7; */
    }
    .switch_tag:hover{
        background-color: rgb(41, 47, 63);
        /* color: #ff6333 */
    }
    /* .switch_tag{
        border-right: 1px dashed #f7f7f7;
    } */
</style>
