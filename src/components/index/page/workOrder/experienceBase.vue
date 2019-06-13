<template>
    <!-- 经验库 -->
    <div class="contentall">
        <div class="otherleftcontent">
            <el-tree
                node-key="id" highlight-current default-expand-all
                :data="classData"
                :props="defaultProps"
                :expand-on-click-node="false"
                @node-click="handleNodeClick">
            </el-tree>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'experienceBase',
        store,
        data(){
            return{
                msg:'经验库',
                
                classData:[],
                defaultProps:{
                    label:'name',
                    children:'next',
                },
                defaultkeys:[1],
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
                    url: _this.$store.state.defaultHttp+'serviceType/getServiceTypeNodeTree.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.classData = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleNodeClick(data){
                console.log(data)
            },
        },
    }
</script>


<style>

</style>
