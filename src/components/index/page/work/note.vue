<template>
    <div class="contentall">
        <div class="setleftcontent" style="position: relative;">
            <el-button class="btn menu_btn" size="mini" @click="addMenu()">新增</el-button>
            <el-menu default-active="1" class="el-menu-vertical-demo base_menu">
                <el-submenu index="1">
                    <span slot="title">便签</span>
                    <el-menu-item v-for="(item,i) in noteMenu" :key="i" :index="item.index" @click="showTableval(item)">
                        {{item.name}}
                        <i class="el-icon-edit" style="float:right;line-height:40px;font-size:12px;color:#606266" @click="updateMenu(a)"></i>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="setrightcontent">
            <ul class="note_ul">
                <li class="note_li" v-for="a in noteData" :key="a.index">
                    <div class="note_set">
                        <i class="el-icon-plus"></i>
                        <span>2019-06-28 18:12:26</span>
                        <i class="el-icon-delete"></i>
                    </div>
                    <div class="note_c" v-html="a.name"></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    import UE from '../../ue.vue'

    export default {
        name:'note',
        store,
        components:{UE},
        data(){
            return{
                msg:'note.vue',

                noteMenu:[
                    {index:'1',name:'创意'},
                    {index:'2',name:'记事'}
                ],
                noteData:[
                    {index:'1',name:'<p>1.今天要完成的事情</p><p>2.想一个解决方案</p>'},
                    {index:'2',name:'<p>想一个解创意决方案想一个解记事记事记事决创意方案</p>'},
                    {index:'3',name:'<p>想一个解记事决方案想一个解记事决方案想一个解记事决方案</p>'},
                    {index:'4',name:'<p>想创意记事记事记事记事一个解决方案</p>'},
                    {index:'5',name:'<p>想一个记事记事记事解决方案</p>'},
                    {index:'6',name:'<p>想一个解记事记事记事决创意方案</p>'},
                    {index:'7',name:'<p>想一创意个记事解决方案</p>'},
                ],
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
                let data = {}

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'noteType/getNoteTypeNodeTree.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    // data: qs.stringify(data)
                }).then(function(res){
                    _this.noteMenu = res.data.map.success
                }).catch(function(err){
                });
            },
            showTableval(val){
                console.log(val)
            },
            addMenu(){},
            updateMenu(val){
                console.log(val)
            },
            menuSubmit(){},
            addNote(){},
            updateNote(val){
                console.log(val)
            },
            noteSubmit(){},
        },
    }
</script>

<style>
    .menu_btn{
        position: absolute;
        right: 3px;
        top: -13px;
    }
    .note_ul{
        width: 100%;
        height: 360px;
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
    }
    .note_li{
        flex: 0 0 calc(25% - 25px);
        height: 200px;
        background-color: #fcfbdd;
        color: #20222a;
        margin-left: 20px;
        margin-top: 20px;
    }
    .note_set{
        width: 100%;
        height: 30px;
        background-color: #f8f7d5;
        font-size: 12px;
        text-align: center;
        color: #919191;
        display: flex;
        justify-content: center;
    }
    .note_set i{
        flex: 0 0 30px;
        line-height: 30px;
    }
    .note_set span{
        flex: 0 0 calc(100% - 70px);
        line-height: 30px;
    }
    .note_c{
        padding: 5px 15px;
        box-sizing: border-box;
        font-size: 14px;
    }
</style>
