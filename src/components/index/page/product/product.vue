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
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
                <el-button class="btn info-btn" size="mini" @click="handledeletes()">删除</el-button>
                <el-button class="btn info-btn" size="mini" @click="showALL()">显示全部</el-button>

                <div class="totalnum_head">共 <span class="bold_span">{{tableNumber}}</span> 条</div>

                <el-popover placement="bottom" width="100" trigger="click">
                    <el-checkbox-group class="checklist" v-model="checklist" style="max-height:600px;overflow-y:overlay;overflow-x:hidden">
                        <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                    </el-checkbox-group>
                    <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
                </el-popover>
            </div>
            <el-table :data="tableData" ref="multipleTable" border stripe style="width:100%" @selection-change="selectInfo">
                <el-table-column fixed header-align="center" align="center" type="selection" width="45" prop="id" @selection-change="selectInfo" sortable />
                
                <el-table-column label="主图" fixed prop="productImg" width="80">
                    <template slot-scope="scope">
                        <el-popover placement="right" width="200" trigger="hover">
                            <img :src="scope.row.productImg" alt="" width="200" height="200">
                            <img slot="reference" :src="scope.row.productImg" alt="" width="60" height="60">
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="产品编码" fixed prop="itemList[0].goodsCode" min-width="150" sortable />
                <div v-for="(item,index) in filterList" :key="index">
                    <el-table-column label="产品名称" fixed prop="goodsName" v-if="item.prop == 'goodsName' && item.state == 1" min-width="130" sortable>
                        <template slot-scope="scope">
                            <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                                {{scope.row.goodsName}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="规格描述" prop="describe" v-if="item.prop == 'describe' && item.state == 1" show-overflow-tooltip min-width="180" sortable />
                    <el-table-column label="单位" prop="unit" v-if="item.prop == 'unit' && item.state == 1" min-width="90" sortable />
                    <el-table-column label="价格" prop="itemList[0].price" v-if="item.prop == 'price' && item.state == 1" min-width="90" sortable />
                    <el-table-column label="成本价" prop="costPrice" v-if="item.prop == 'costPrice' && item.state == 1" min-width="100" sortable />
                    <el-table-column label="品牌" prop="brand" v-if="item.prop == 'brand' && item.state == 1" min-width="90" sortable />
                    <el-table-column label="产品属性" prop="attribute" v-if="item.prop == 'attribute' && item.state == 1" min-width="120" sortable />
                    <el-table-column label="状态" prop="status" v-if="item.prop == 'status' && item.state == 1" min-width="90" sortable />
                    <el-table-column label="创建时间" prop="createTime" v-if="item.prop == 'createTime' && item.state == 1" min-width="150" sortable />
                </div>
                <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handledelete(scope.$index, scope.row)">删除</el-button>
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

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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
                    id:null,
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
                    classification_id:null,
                },
                
                filterList:null,
                checklist:null,

                idArr:{
                    id:null,
                },
                clickdata:null,
                
                page:1,
                limit:20,

                dialogImageUrl:'',
                dialogVisible:false
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
            this.reloadTable()
        },
        mounted(){
            this.reloadTable()
            this.reloadData()
        },
        methods:{
            reloadTable(){
                const _this = this
                let qs = require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                pageInfo.searchName = this.searchList.searchName
                pageInfo.classification_id = this.searchList.classification_id

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'goods/searchGoods.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    let info = res.data.map.goods
                    info.forEach(el => {
                        if(el.itemList[0].image){
                            el.productImg = _this.$store.state.systemHttp + 'product/' + _this.$store.state.iscId + '/' + el.itemList[0].image
                        }else{
                            el.productImg = '../../../../static/img/noProduct.png'
                        }
                    });
                    _this.$store.state.productList = info
                    _this.$store.state.productListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            reloadData(){
                const _this = this
                let qs = require('querystring')
                let filterList = {}
                filterList.type = '产品'
                let data = {}
                data.type = '产品'
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
                this.searchList.classification_id = data.id
                this.clickdata = data
                // if(data.next.length == 0){
                    this.$options.methods.reloadTable.bind(this)(true);
                // }
            },
            selectInfo(val){
                this.multipleSelection = val;
                let arr = val;
                let newArr = [new Array()];
                arr.forEach((item) => {
                    if(item.id != 0){
                        newArr.push(item.id)
                    }
                });
                this.idArr.id = newArr;
            },
            openDetails(index,row){
                const _this = this
                let productdetailsData = {}
                productdetailsData = {"id": row.id};
                this.$store.state.productdetailsData = productdetailsData
                _this.$router.push({ path: '/productdetails' })
            },
            showALL(){
                this.searchList.classification_id = null
                this.$options.methods.reloadTable.bind(this)()
            },
            //用户添加
            handleAdd(){
                const _this = this

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
                    let productaddData = {}
                    productaddData.setForm = {
                        "goodsName": '',
                        "unitId": '',
                        "brandId": '',
                        "classification_id": this.clickdata.id,
                        "category": this.clickdata.name,
                        "attribute": '',
                        "price": '',
                        "costPrice": '',
                        "isEnableSpec": '',
                        "describe": '',};
                    productaddData.submitURL = this.$store.state.defaultHttp+ 'customerTwo/saveClue.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                    this.$store.state.productaddData = productaddData;
                    _this.$router.push({ path: '/productadd' });
                }
            },
            //用户修改
            handleEdit(index,row){
                const _this = this
                let productupdateData = {}
                productupdateData.setForm = {"id": row.id};
                productupdateData.submitURL = this.$store.state.defaultHttp+ 'goods/update.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId,
                this.$store.state.productupdateData = productupdateData
                _this.$router.push({ path: '/productupdate' })
            },
            handledeletes(){
                const _this = this
                let qs = require('querystring')
                let idArr = []
                idArr.ids = this.idArr.id

                if(idArr.ids){
                    idArr.ids.shift(0)
                    _this.$confirm('是否确认删除？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        axios({
                            method: 'post',
                            url:  _this.$store.state.defaultHttp+ 'goods/delete.do?cId='+_this.$store.state.iscId,
                            data:qs.stringify(idArr),
                        }).then(function(res){
                            if(res.data.code && res.data.code == '200'){
                                _this.$message({
                                    message: '删除成功',
                                    type:'success'
                                })
                            }else{
                                _this.$message({
                                    message: res.data.msg,
                                    type:'error'
                                })
                            }
                            _this.$options.methods.reloadTable.bind(_this)();
                        }).catch(function(err){
                            _this.$message.error("删除失败，请重新操作");
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消删除'
                        });       
                    });
                }else{
                    _this.$message({
                        type: 'error',
                        message: '请先选择要删除的订单'
                    }); 
                }
            },
            handledelete(index,row){
                const _this = this
                let qs = require('querystring')
                let data = []
                data.ids = row.id

                _this.$confirm('是否确认删除[' + row.goodsName + ']？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'goods/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(data),
                    }).then(function(res){
                        if(res.data.code && res.data.code == '200'){
                            _this.$message({
                                message: '删除成功',
                                type:'success'
                            })
                        }else{
                            _this.$message({
                                message: res.data.msg,
                                type:'error'
                            })
                        }
                        _this.$options.methods.reloadTable.bind(_this)();
                    }).catch(function(err){
                        _this.$message.error("删除失败，请重新操作");
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除[' + row.goodsName + ']'
                    });       
                });
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
                        _this.$options.methods.reloadData.bind(_this)(true);
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            
            search() {
                const _this = this
                _this.$options.methods.reloadTable.bind(_this)(true);
            },
            handleSizeChange(val) {
                const _this = this;
                _this.limit = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
            },
            handleCurrentChange(val) {
                const _this = this;
                _this.page = val;
                _this.$options.methods.reloadTable.bind(_this)(false);
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
