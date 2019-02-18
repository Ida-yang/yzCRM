<template>
    <!-- 合同详情页 -->
    <el-row class="content1" :gutter="10">
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card" v-model="agreementdetail">
                    <div slot="header" class="clearfix">
                        <span>{{agreementdetail.poolName}}</span>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="retracts">收起</el-button>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="!retracts">显示</el-button>
                    </div>
                    <div class="text item" v-show="thisshow">
                        <ul>
                            <li>合同代码：<span>{{agreementdetail.contract_number}}</span></li>
                            <li>合同名称：<span>{{agreementdetail.contract_name}}</span></li>
                            <li>商机名称：<span>{{agreementdetail.opportunity_name}}</span></li>
                            <li>合同金额：<span>{{agreementdetail.amount}}</span></li>
                            <li>合同类型：<span>{{agreementdetail.contract_type}}</span></li>
                            <li>客户签约人：<span>{{agreementdetail.signatories}}</span></li>
                            <li>我方签约人：<span>{{agreementdetail.our_signatories}}</span></li>
                            <li>签约时间：<span>{{agreementdetail.start_date}}</span></li>
                            <li>到期时间：<span>{{agreementdetail.end_date}}</span></li>
                            <li>剩余天数：<span>{{agreementdetail.due_time}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                    <div v-show="!thisshow"></div>
                </el-card>
            </div>
            <div class="bottom">
                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane label="跟进记录" name="first">
                        <div class="uploadBOX">
                            <div class="imgbox" v-for="item in fileList" :key="item.id" @mouseenter="mouseenterdiv(item)" @mouseleave="mouseleavediv(item)">
                                <img :src="item.imgURL" alt="图片" @click="showImg($event,item)">
                                <i class="el-icon-circle-close-outline imgdel" v-if="imgshow" @click="delImg($event,item)"></i>
                            </div>
                            <div class="filebox">
                                <span class="upload">
                                    <input type="file" name="file" @change="tirggerFile($event)"/>
                                </span>
                            </div>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                                <!-- <img src="/upload/staticImg/bg.jpg" width="100%" alt="图片"> -->
                            </el-dialog>
                        </div>
                        <div class="text" style="height:150px;">
                            <ul>
                                <li>创建人：<span>{{agreementdetail.private_employee}}</span></li>
                                <li>创建人部门：<span>{{agreementdetail.private_employee}}</span></li>
                                <li>创建人机构：<span>{{agreementdetail.private_employee}}</span></li>
                                <li>创建时间：<span>{{agreementdetail.create_time}}</span></li>
                                <li>修改时间：<span>{{agreementdetail.update_time}}</span></li>
                                <!-- <li>修改人：<span>{{agreementdetail.signatories}}</span></li> -->
                            </ul>
                            <p>&nbsp;</p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="回款计划" name="second">
                        <span style="text-align:center;">暂无计划</span>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
        
        <el-col :span="6" style="padding:10px;" class="right">
            <div class="searchList" style="width:100%;">
                <!-- <el-input v-model="searchList.searchName" placeholder="公司名称" style="width:200px;"></el-input> -->
                <el-input  v-model="searchList.keyword" placeholder="请输入标题" style="width:80%;"></el-input>
                <el-button icon="el-icon-search" class="searchbutton" size="mini" @click="search()"></el-button>
            </div>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                prop="poolName"
                label="公司名称">
                    <template slot-scope="scope">
                    <div @click="getRow(scope.$index, scope.row)">
                        {{scope.row.poolName}}
                    </div>
                </template>
                </el-table-column>
            </el-table>
            <div class="block numberPage number">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20, 30, 50, 100]"
                :page-size="20"
                layout="total, sizes, prev, pager, next"
                :total="tableNumber">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'clueDetails',
        store,
        computed: {
            clueDetails(){
                return store.state.clueDetailsList;
            }
        },
        data(){
            return {
                detailData:null,
                agreementform:{
                    agreementContent:'',
                },
                searchList:{
                    keyword:null,
                },
                agreementdetail:{
                    // name:'',
                },
                record:null,
                fastcontactList:null,
                contactList:null,
                activeName2: 'first',
                tableData: null,
                tableNumber:null,
                page:1,
                limit:20,
                thisshow:true,
                idArr:{
                    id:null,
                },
                dataList:null,
                fileList:null,
                imgid:null,
                imgurl:null,
                dialogImageUrl:null,
                dialogVisible:false,
                imgshow:false,

                retracts:true,
            }
        },
        activated(){
            this.loadData();
            this.loadIMG()
        },
        // mounted(){
        //     this.loadData();
        //     this.loadIMG()
        // },
        methods: {
            loadData() {
                this.detailData = this.$store.state.detailsData.submitData;
                this.idArr.id = this.$store.state.detailsData.submitData.id
                // console.log(this.detailData)
                let _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                // console.log(this);
                //加载详情页右侧表格
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'getContractAll.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    // console.log(res.data)
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                    // console.log(_this.tableData)
                }).catch(function(err){
                    console.log(err);
                });
                //加载合同详情
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'getContractById.do?cId='+_this.$store.state.iscId+'&contractId='+this.detailData.id,
                }).then(function(res){
                    // console.log(res.data)
                    _this.agreementdetail = res.data
                    // console.log(_this.agreementdetail)
                }).catch(function(err){
                    console.log(err);
                });
            },
            loadIMG(){
                let _this = this
                _this.fileList = []
                let qs = require('querystring')
                let data = {}
                data.typetid = this.detailData.id
                data.type = '合同'
                data.pId = this.$store.state.ispId
                data.cId = this.$store.state.iscId
                // console.log(data)

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'imgInfo/getImgInfoByTypeid.do',
                    data:qs.stringify(data)
                }).then(function(res){
                    // console.log(res.data)
                    _this.dataList = res.data
                    let arr = _this.dataList
                    arr.forEach(el => {
                        // console.log(el.id)
                        _this.imgid = el.id
                        _this.imgurl = '/upload/'+_this.$store.state.iscId+'/'+el.name
                        _this.fileList.push({id:_this.imgid,imgURL:_this.imgurl})
                    });
                    // console.log(_this.fileList)
                }).catch(function(err){
                    console.log(err);
                });
            },
            tirggerFile (event) {
                let _this = this;
                let file = event.target.files[0]
                let param = new FormData() // 创建form对象
                param.append('file', file, file.name) // 通过append向form对象添加数据
                // console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
                // 添加请求头
                axios.post(this.$store.state.defaultHttp+'contractUpload.do?cId='+this.$store.state.iscId+'&pId='+this.$store.state.ispId+'&contractid='+this.detailData.id, param, config)
                .then(res => {
                    // console.log(res)
                    if (res.data == 'success') {
                        _this.$message({
                            message:'上传成功',
                            type:'success'
                        })
                        _this.$options.methods.loadIMG.bind(_this)(true);
                    }else{
                        _this.$message({
                            message: res.data,
                            type: 'error'
                        })
                    }
                })
            },
            showImg(e,val){
                this.dialogImageUrl = val.imgURL
                this.dialogVisible = true
                // console.log(this.dialogImageUrl)
            },
            delImg(e,val){
                // console.log(val.id)
                let _this = this;
                let qs = require('querystring')
                let idArr = [];
                idArr.id = val.id
                _this.$confirm('是否确认删除该图片？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'imgInfo/delImgInfoById.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        // console.log(res)
                        if(res.data.code && res.data.code == '200') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.loadIMG.bind(_this)(true);
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        console.log(err);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });       
                });
            },
            mouseenterdiv(val){
                this.imgshow = true
            },
            mouseleavediv(val){
                this.imgshow = false
            },
            retract(){
                this.thisshow = !this.thisshow
                this.retracts = !this.retracts
            },
            getRow(index,row){
                // console.log(row)
                this.$store.state.detailsData.submitData = {"id":row.contract_id}
                this.idArr.contractId = row.contract_id
                
                // this.detailData.contractId = row.contractId
                this.$options.methods.loadData.bind(this)(true);
            },
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            search(){
                let _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.searchName = this.searchList.keyword;
                searchList.page = this.page;
                searchList.limit = this.limit;
                // console.log(searchList)
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'customerTwo/getUserByClue.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    // console.log(res)
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    console.log(err);
                });
            },
            handleSizeChange(val) {
                let _this = this;
                _this.limit = val;
                _this.$options.methods.loadData.bind(_this)();
            },
            handleCurrentChange(val) {
                let _this = this;
                _this.page = val;
                _this.$options.methods.loadData.bind(_this)();
            },
        },
    }
</script>

<style>
    .content1{
        background-color: #f7f7f7;
        height: auto;
    }
    .number{
        padding: 0;
    }
    .right{
        height: auto;
        background-color: #fff;
        padding-bottom: 5px;
    }
    .top{
        height: auto;
        background-color: #fff;
    }
    .bottom{
        height: 100%;
        background-color: #fff;
        margin-top: 20px;
        padding: 5px 20px;
    }
    .el-card__body{
        padding: 0;
    }
    .agreementform{
        height: auto;
        min-height: 200px;
        margin-bottom: 30px;
        position: relative;
        /* background-color: #90b49c; */
    }
    .agreementform > .el-form-item:not(:first-child){
        float: left;
        margin-bottom: 5px;
    }
    .fileinput{
        width: 100px;
        height: 100px;
        background-color: #ffffff;
        border: 1px dashed #409EFF;
    }
    .fileinputnone{
        background-color: transparent;
    }
    .fileinputnone input{
        height: 100px;
        right: 0;
        top:30px;
        opacity: 0;
        cursor: pointer;
    }
    .fileinputnone .el-input__inner{
        background-color: transparent;
        padding: 0;
        height: 100px !important;
        color: transparent;
    }
    .uploadBOX{
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-wrap: wrap;
        align-content: flex-start;
	    margin-top: 20px;
    }
    .imgbox{
        flex: 0 0 100px;
	    margin-left: 10px;
        margin-bottom: 10px;
        /* width: 100px;
        height: 100px; */
    }
    .imgbox img{
        width: 100px;
        height: 100px;
    }
    .filebox{
        width: 100px;
        height: 100px;
        /* background-color: rgb(78, 121, 96); */
    }
	.upload {
	    width: 100px;;
	    height: 100px;
	    display: inline-block;
	    border-radius: 5px;
	    position: relative;
	    margin-left: 10px;
	    background: rgb(255, 255, 255) url('../../../../assets/img/plus.png') center center no-repeat;
	    background-size: 100px 100px;
        border: 1px dashed #d9d9d9;
	}
	.upload input{
	    position: relative;
	    width: 100px;
	    height: 100px;
	    top: 0;
	    left: 0;
	    opacity: 0;
	}
	.filebox img{
	    width: 100px;
	    height: 100px;
	    line-height: 100px;
	    /* display: block; */
	    float: left;
        border-radius: 4px;
	}
	.upload i {
	    position: absolute;
	    bottom: 0;
	    left: 100px;
	    color: rgb(83, 76, 76);
	    font-size: 24px;
	}
</style>
