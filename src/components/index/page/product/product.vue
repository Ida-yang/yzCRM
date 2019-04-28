<template>
    <!-- 用户 -->
    <div class="contentall">
        <div class="otherleftcontent">
            <el-tree
                node-key="id"
                highlight-current
                accordion
                :data="datalist"
                :props="defaultProps"
                :default-expanded-keys="defaultkeys"
                expand-on-click-node
                @node-click="handleNodeClick">
            </el-tree>
        </div>
        <div class="centercontent"></div>
        <div class="otherightcontent">
            <div class="searchList" style="width:100%;">
                <el-input v-model="searchList.searchName" placeholder="请输入产品名称" style="width:300px;" @keyup.enter.native="search"></el-input>
                &nbsp;&nbsp;
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
            </div>
            <div class="entry">
                <el-button class="btn" size="mini" @click="handledeletes()">删除</el-button>
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
                <div class="totalnum_head">共 <span style="font-weight:bold">{{tableNumber}}</span> 条</div>
                <el-popover
                    placement="bottom"
                    width="100"
                    trigger="click">
                    <el-checkbox-group class="checklist" v-model="checklist">
                        <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                    </el-checkbox-group>
                    <!-- <el-button slot="reference" icon="el-icon-more-outline" type="mini">筛选列表</el-button> -->
                    <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
                </el-popover>
            </div>
            <el-table
                :data="tableData"
                ref="multipleTable"
                border
                stripe
                style="width:100%"
                @selection-change="selectInfo"
                >
                <el-table-column
                    fixed
                    header-align="center"
                    align="center"
                    type="selection"
                    width="45"
                    scope.row.private_id
                    prop="private_id"
                    @selection-change="selectInfo"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="imgUrl"
                    fixed
                    header-align="center"
                    align="center"
                    min-width="80"
                    label="图片"
                    sortable>
                    <template slot-scope="scope">
                        <el-popover
                            placement="right"
                            width="200"
                            trigger="hover">
                            <img class="img_portrait_big" v-show="scope.row.imgUrl" :src="scope.row.portrait" alt="头像" width="200" height="200">
                            <img class="img_portrait" v-show="scope.row.imgUrl" slot="reference" :src="scope.row.portrait" alt="头像" width="50" height="50">
                            <img class="img_portrait" v-show="!scope.row.imgUrl" slot="reference" src="/upload/staticImg/avatar.jpg" alt="头像" width="50" height="50">
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="private_number"
                    fixed
                    min-width="130"
                    label="产品编码"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_employee"
                    fixed
                    min-width="130"
                    label="产品名称"
                    sortable>
                    <template slot-scope="scope">
                        <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                            {{scope.row.private_employee}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="private_username"
                    min-width="120"
                    label="规格型号"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="name"
                    min-width="90"
                    label="单位"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_phone"
                    min-width="90"
                    label="品牌"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="private_state"
                    min-width="90"
                    label="状态"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    min-width="150"
                    label="创建时间"
                    sortable>
                </el-table-column>
                <el-table-column label="操作"
                    fixed="right"
                    width="140"
                    header-align="center"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handledelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block numberPage">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20, 50, 100, 500]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableNumber">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'product',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.productList;
            },
            tableNumber(){
               return store.state.productListnumber;     
            },
        },
        data(){
            return {
                datalist:[],
                defaultProps:{
                    label:'name',
                    children:'next',
                },
                defaultkeys:[1],
                
                newform:{
                    second_id:null,
                    secondname:null,
                    private_id:null,
                    role_id:null,
                    private_phone:null,
                    private_password:null,
                    private_passwords:null,
                    private_employee:null,
                    private_state:'启用',
                    private_email:'',
                    private_QQ:'',
                    imgUrl:null,
                },
                imgName:null,
                imgfile:null,

                searchList:{
                    searchName:null,
                    deptid:null,
                },
                
                filterList:null,
                checklist:null,

                idArr:{
                    private_id:null,
                },
                roleList:null,
                clickdata:null,
                
                page:1,
                limit:20,
            }
        },
        beforeCreate(){
            const _this = this
            axios({
                method: 'get',
                url: _this.$store.state.defaultHttp+'classification/getClassificationNodeTree.do?cId='+_this.$store.state.iscId,
            }).then(function(res){
                _this.datalist = res.data.map.success
            }).catch(function(err){
                // console.log(err);
            });
        },
        activated(){
            // this.reloadTable()
            this.onloads()
        },
        mounted(){
            // this.reloadTable()
            // this.loadData()
            // this.onloads()
        },
        methods:{
            
            onloads(){
                // let a = [10,30,20]
                // let b = [5,10]
                // for(let i = 0; i < a.length; i ++){
                //     // console.log(a[i])
                //     for(let j = 0; j < b.length; j ++){
                //         console.log(a[i]+b[j])
                //     }
                // }
                // let a = '10'
                // let b = 2220
                // console.log(a*b/100)
            },
            reloadTable(){
                const _this = this
                let qs = require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                pageInfo.searchName = this.searchList.searchName
                pageInfo.deptid = this.searchList.deptid
                let dept = {}
                dept.deptid = this.searchList.deptid

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getPrivateUserAll.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    _this.$store.state.productList = res.data.map.success
                    _this.$store.state.productListnumber = res.data.count
                    let arr = res.data.map.success
                    arr.forEach(el => {
                        if(el.imgUrl){
                            el.portrait = '/upload/'+_this.$store.state.iscId+'/'+el.imgUrl
                        }else{
                            return
                        }
                    });
                }).catch(function(err){
                    // console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'role/selectRole.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(dept)
                }).then(function(res){
                    _this.roleList = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadData(){
                const _this = this
                let qs = require('querystring')
                let filterList = {}
                filterList.type = '用户'
                let data = {}
                data.type = '用户'
                data.state = 1
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getAllUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(filterList)
                }).then(function(res){
                    _this.filterList = res.data
                }).catch(function(err){
                    // console.log(err);
                });
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'userPageInfo/getUserPage.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.checklist = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleNodeClick(data){
                this.searchList.deptid = data.deptid
                this.clickdata = data
                // this.$options.methods.reloadTable.bind(this)(true);
            },
            selectInfo(val){
                this.multipleSelection = val;
                let arr = val;
                let newArr = [new Array()];
                arr.forEach((item) => {
                    if(item.private_id != 0){
                        newArr.push(item.private_id)
                    }
                });
                this.idArr.private_id = newArr;
                
            },
            openDetails(index,row){
                console.log(row)
            },
            //用户添加
            handleAdd(){
                const _this = this
                console.log(this.clickdata)

                if(!this.clickdata){
                    _this.$message({
                        message:'请先选择产品分类，再添加产品',
                        type:'info'
                    })
                }else if(this.clickdata.next.length){
                    _this.$message({
                        message:'该产品分类下还有分类，请选择最明细的产品分类',
                        type:'info'
                    })
                }else{
                    let productaddOrUpdateData = {}
                    productaddOrUpdateData.setForm = {
                        "chanpinmingcheng": '',
                        "unit": '',
                        "pinpai": '',
                        "chanpinfenleiID": this.clickdata.id,
                        "chanpinfenlei": this.clickdata.name,
                        "chanpinshuxing": '',
                        "xiaoshoujiage": '',
                        "chengpinjia": '',
                        "miaoshu": '',
                        "chanpinbiaoqian": '',};
                    productaddOrUpdateData.submitURL = this.$store.state.defaultHttp+ 'customerTwo/saveClue.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                    this.$store.state.productaddOrUpdateData = productaddOrUpdateData;
                    _this.$router.push({ path: '/productaddorupdate' });
                }
            },
            //用户修改
            handleEdit(index,row){
                const _this = this
                console.log(row)
            },
            handledeletes(){
                const _this = this
                console.log(this.idArr)
            },
            handledelete(index,row){
                const _this = this
                console.log(row)
            },
            hangleChange(e,val){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.pageInfoId = val.pageInfoId
                if(e == true){
                    data.state = 1
                }else{
                    data.state = 0
                }

                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'userPageInfo/updateUserPageByid.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data),
                }).then(function(res){
                    if(res.data && res.data =="success"){
                        // _this.$options.methods.loadData.bind(_this)(true);
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            
            search() {
                const _this = this
                // _this.$options.methods.reloadTable.bind(_this)(true);
            },
            handleSizeChange(val) {
                const _this = this;
                _this.limit = val;
                // _this.$options.methods.reloadTable.bind(_this)(false);
            },
            handleCurrentChange(val) {
                const _this = this;
                _this.page = val;
                // _this.$options.methods.reloadTable.bind(_this)(false);
            },
        }
    }
</script>
<style>
    /* .contentall{
        background-color: #ffffff;
    } */
    .portrait .el-upload--text{
        width: 100px;
        height: 100px;
    }
    .portrait .el-upload--text .portrait_add{
        line-height: 100px;
    }
    .img_portrait{
        border-radius: 25px;
    }
    .img_portrait_big{
        border-radius: 100px
    }
</style>
