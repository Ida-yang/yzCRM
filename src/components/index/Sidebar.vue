<template>
    <div class="sidebar" >
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#20222a"
            text-color="#FFFFFF" active-text-color="#ff6722" unique-opened router>
            <div id="logo" v-if="show">
                <span style="font-size:16px">云纵CRM信息平台</span>
            </div>
            <div id="logo1" v-if="!show">
                <!-- <span style="font-size:16px">云纵CRM信息平台</span> -->
            </div>
            <span class="title">主要</span>
            <template v-for="item in itemone">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"  style="color:#fff"></i>
                            <span slot="title"  style="color:#fff">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon" style="color:#fff" ></i>
                        <span slot="title"  style="color:#fff">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
            <span class="title">应用</span>
            <template v-for="item in itemtwo">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"  style="color:#fff"></i>
                            <span slot="title"  style="color:#fff">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon" style="color:#fff" ></i>
                        <span slot="title"  style="color:#fff">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
            <span class="title">设置</span>
            <template v-for="item in itemlast">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"  style="color:#fff"></i>
                            <span slot="title"  style="color:#fff">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon" style="color:#fff" ></i>
                        <span slot="title"  style="color:#fff">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                collapse: false,
                show:true,
                itemone: [
                    {
                        icon: 'el-icon-new-homepage_fill',
                        index: '1',
                        title: '首页',
                    },
                    {
                        icon: 'el-icon-new-gongyi',
                        index: '2',
                        title: '数据中心',
                        subs: [
                            {
                                index: 'customerSearch',
                                title: '搜索客户',
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
                        icon: 'el-icon-new-mn_yonghuziliao',
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
                        ]
                    },
                    {
                        icon: 'el-icon-new-quanxianguanli',
                        index: '4',
                        title: '营销',
                        subs: [
                            {
                                index: 'socialMarketing',
                                title: '社交营销',
                            },
                        ]
                    },
                ],
                
                itemlast: [
                    {
                        icon: 'el-icon-new-shezhi',
                        index: '999',
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
                                index: 'programme',
                                title: '方案/目标',
                            },
                            // {
                            //     index: 'suibian',
                            //     title: '随便',
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
                this.collapse = msg;
                this.show = !this.show
            })
        }
    }
</script>

<style scoped>
    #logo{
        width:150px;
        height: 60px;
        padding: 0 10px;
        line-height: 60px;
        font-family: "楷体";
        color: #ffffff;
    }
    #logo1{
        width: 0;
        height: 60px;
        padding: 0 10px;
        line-height: 60px;
        font-family: "楷体";
        color: #ffffff;
    }
    .sidebar{
        height: 100%;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0px;
        /* border-right: 1px solid #ffff00; */
        /* overflow-y: scroll; */
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 150px;
    }
    .sidebar > ul {
        height:100%;
    }
    .title{
        display: inline-block;
        height: 40px;
        color: #ffffff;
        font-size: 10px;
        padding-left: 18px;
        line-height: 40px;
    }
</style>
