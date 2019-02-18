<template>
    <div ref="outer-bar" class="tags" v-if="showTags" id="showBox">
        <ul ref="inner-bar" v-bind:style="{left:leftStyle+'px'}">
            <li ref="tabs" class="tags-li" v-for="(item,index) in TagsList"
             :class="{'active': isActive(item.path)}" :key="index" @contextmenu="clickMe(index)">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div ref="rock" class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" class="searchbutton">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    	
    import store from '../../store/store';
    import $ from 'jquery';
    import bus from './bus';
    export default {
        data() {
            return {
                tagsList: [],
                leftStyle:0
            }
        },
        inject:["reload"],
        methods: {
            clickMe(index){
                event.preventDefault();
            },
            isActive(path) {
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                }else{
                    this.$router.push('/welcome');
                }
                this.$store.state.tagsList = this.tagsList;
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.$router.push('/welcome');
                this.$store.state.tagsList = this.tagsList;
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                })
                this.tagsList = curItem;
                this.$store.state.tagsList = this.tagsList;
            },
            // 设置标签
            setTags(route){
                // console.log( $("#showBox").width())
                const isExist = this.tagsList.some(item => {
                    return item.path === route.fullPath;
                })
                !isExist && this.tagsList.push({
                    title: route.meta.title,
                    path: route.fullPath,
                    name: route.matched[1].components.default.name
                })
                const index = this.tagsList.findIndex(item => item.path === route.fullPath);
                this.$nextTick(() => {
                    if (index === this.tagsList.length - 1) {
                        this.leftStyle = this.$refs.tabs[index].offsetLeft
                            + this.$refs.tabs[index].offsetWidth
                            - this.$refs['outer-bar'].offsetWidth
                            + this.$refs.rock.offsetWidth;
                        this.leftStyle = -this.leftStyle;
                    }
                    if (index < this.tagsList.length - 1) {
                        let rightStyle = 0;
                        if (index < this.tagsList.length - 2) {
                            rightStyle = this.$refs['inner-bar'].offsetWidth - this.$refs.tabs[index + 2].offsetLeft;
                        }
                        const offsetRight = this.$refs['inner-bar'].offsetWidth
                            + this.leftStyle
                            - this.$refs['outer-bar'].offsetWidth
                            + this.$refs.rock.offsetWidth;
                        if (offsetRight > rightStyle) {
                            this.leftStyle = this.$refs.tabs[index + 1].offsetLeft
                                + this.$refs.tabs[index + 1].offsetWidth
                                - this.$refs['outer-bar'].offsetWidth
                                + this.$refs.rock.offsetWidth;
                            this.leftStyle = -this.leftStyle;
                        }
                    }
                    if (index === 0) {
                        this.leftStyle = 0;
                    }
                    if (index > 0 && this.$refs.tabs[index - 1].offsetLeft < -this.leftStyle) {
                        this.leftStyle = -this.$refs.tabs[index - 1].offsetLeft;
                    }
                    if (this.leftStyle > 0) {
                        this.leftStyle = 0;
                    }
                });
                this.$store.state.tagsList = this.tagsList;
                bus.$emit('tags', this.tagsList);
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            },
            TagsList(){
                return store.state.tagsList;
            }
            
        },
        watch:{
            $route(newValue, oldValue){
                // console.log(newValue, oldValue)
                this.setTags(newValue);
            }
        },
        created(){
            // console.log(this.tagsList)
            // console.log(this.$route)
            this.setTags(this.$route);
            this.$store.state.tagsList = this.tagsList;
        }
        
    }

</script>


<style>
    .tags {
        position: relative;
        height: 30px;
        overflow: hidden;
        background: #fdfeff;
        padding-right: 50px;
    }
    .el-button--small, .el-button--small.is-round {
        padding: 7px 9px !important;
    }
    .bre-item span:hover{
        color: #595959;
    }
    .tags ul {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        width: 5000px;
        height: 30px;
        margin-left: 10px;
    }

    .tags-li {
        float: left;
        margin: 3px 1px 2px 1px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #000;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    /* .tags-li.active {
        color: #000;
    } */

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-li.active {
        border: 1px solid #ff5722;
        background-color: #ff5722;
        color: #fff;
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 50px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }

</style>
