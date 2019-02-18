<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>
<style>
    html { overflow-x: hidden; overflow-y: auto; }
    .content-box{
        position: absolute;
        top: 50px;
    }
    .content{
        background: none repeat scroll 0 0 #fdfeff;
        position: absolute;
        left: 0;
        right: 0;
        top: 40px;
        bottom:0;
        width: auto;
        /* padding:10px 0; */
        padding: 0;
        margin: 0 15px;
        box-sizing: border-box;
        overflow-x: hidden; overflow-y: auto; 
    }
    .el-form-item.is-required .el-form-item__label:before{
        content:'*';
        color:#f56c6c;
        margin-right:4px
    }
</style>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                // console.log(msg)
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
                // console.log(this.tagsList)
            })
        }
    }
</script>
