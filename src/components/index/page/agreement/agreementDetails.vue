<template>
    <!-- 合同详情页 -->
    <el-row class="agrdetcontent" :gutter="10">
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
                            <li>合同金额：<span style="font-weight:bold;font-size:16px">{{agreementdetail.amount | commaing}} 元</span></li>
                            <li>合同类型：<span>{{agreementdetail.contract_type}}</span></li>
                            <li>客户签约人：<span>{{agreementdetail.signatories}}</span></li>
                            <li>我方签约人：<span>{{agreementdetail.our_signatories}}</span></li>
                            <li>签约时间：<span>{{agreementdetail.start_date}}</span></li>
                            <li>到期时间：<span>{{agreementdetail.end_date}}</span></li>
                            <li>剩余天数：<span>{{agreementdetail.due_time}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                        <div class="audited" v-if="agreementdetail.checkStatus == 1">
                            <img class="audited_img" src="/upload/staticImg/inaudit.png" alt="审核中">
                        </div>
                        <div class="audited" v-if="agreementdetail.checkStatus == 2">
                            <img class="audited_img" src="/upload/staticImg/examine.png" alt="已审核">
                        </div>
                        <div class="audited" v-if="agreementdetail.checkStatus == 3">
                            <img class="audited_img" src="/upload/staticImg/refuse.png" alt="未通过">
                        </div>
                    </div>
                    <div v-show="!thisshow"></div>
                </el-card>
            </div>
            <div class="top">
                <el-card class="box-card" v-model="agreementdetail">
                    <div slot="header" class="clearfix">
                        <el-popover placement="right-start" width="200" trigger="click">
                            <div style="max-height:400px;overflow-y:overlay">
                                <div class="examine_popover" v-for="(b,j) in examineLog" :key="j">
                                    <span class="examine_ico">
                                        <i v-if="b.examineStatus == 0" class="el-icon-time" style="font-size:20px"></i>
                                        <i v-if="b.examineStatus == 1" class="el-icon-circle-check-outline" style="color:#67c23a;font-size:20px"></i>
                                        <i v-if="b.examineStatus == 2" class="el-icon-circle-close-outline" style="color:#f56c6c;font-size:20px"></i>
                                        <i v-if="b.examineStatus == 3" class="el-icon-time" style="color:#e6a23c;font-size:20px"></i>
                                        <i v-if="b.examineStatus == 5" class="el-icon-circle-plus-outline" style="color:#67c23a;font-size:20px"></i>
                                    </span>
                                    <div class="examint_msg">
                                        <p style="font-size:13px;color:#aaaaaa">{{b.examineTime}}</p>
                                        <p v-if="b.examineStatus == 1">{{b.realname + ' 已审核'}}</p>
                                        <p v-if="b.examineStatus == 2">{{b.realname + ' 已拒绝'}}</p>
                                        <div class="examint_remark"><p>{{b.remarks}}</p></div>
                                    </div>
                                </div>
                            </div>
                            <span slot="reference" style="font-size:14px;;text-decoration:underline">查看审核历史</span>
                        </el-popover>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(1)" v-show="hasCheck">通过</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(2)" v-show="hasCheck">拒绝</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(4)" v-show="hasCheck">驳回</el-button>
                    </div>
                    <div class="text item">
                        <div class="examine_c">
                            <div v-for="(item,index) in examineList" :key="index" class="examine_item">
                                <el-popover placement="bottom" width="200" trigger="hover" class="examine_cont">
                                    <div class="examine_popover" v-for="(b,j) in item.userList" :key="j">
                                        <span class="examine_ico">
                                            <i v-if="b.examineStatus == 0" class="el-icon-time" style="font-size:20px"></i>
                                            <i v-if="b.examineStatus == 1" class="el-icon-success" style="color:#67c23a;font-size:18px"></i>
                                            <i v-if="b.examineStatus == 2" class="el-icon-circle-close" style="color:#f56c6c;font-size:20px"></i>
                                            <i v-if="b.examineStatus == 3" class="el-icon-time" style="color:#e6a23c;font-size:20px"></i>
                                            <i v-if="b.examineStatus == 5" class="el-icon-circle-plus" style="color:#67c23a;font-size:20px"></i>
                                        </span>
                                        <div class="examint_msg">
                                            <p style="font-size:13px;color:#aaaaaa">{{b.examineTime}}</p>
                                            <p>{{b.realname + '(' + b.phone + ')'}}</p>
                                            <p v-if="b.examineStatus == 0">未审核此申请</p>
                                            <p v-if="b.examineStatus == 1">通过此申请</p>
                                            <p v-if="b.examineStatus == 2">拒绝此申请</p>
                                            <p v-if="b.examineStatus == 5">创建此申请</p>
                                        </div>
                                    </div>
                                    <div slot="reference" style="width:100%;">
                                        <span class="examine_po" v-if="item.examineStatus == 5 || item.examineStatus == 4">
                                            <img class="examine_img" :src="item.headPortrait" width="50" height="50" />
                                        </span>
                                        <span class="examine_po1" v-if="item.stepType == 2">
                                            <img class="examine_img" :class="{'mohu':item.examineStatus !== 1}" :src="item.headPortrait" width="50" height="50" />
                                        </span>
                                        <div v-if="item.stepType == 3" style="display:inline-block;margin:0 15px;" :style="item.type_style">
                                            <span class="examine_po2" v-for="(a,i) in item.userList" :key="i">
                                                <img class="examine_img" :class="{'mohu':a.examineStatus == 0}" :src="a.headPortrait" width="50" height="50" />
                                            </span>
                                        </div>
                                        <br>
                                        <span v-if="item.examineUserName" class="examine_type">{{item.examineUserName}}</span>
                                        <span v-if="item.stepType == 2" class="examine_type">{{item.userLength + '人或签'}}</span>
                                        <span v-if="item.stepType == 3" class="examine_type">{{item.userLength + '人会签'}}</span>
                                        <br>
                                        <span v-if="item.examineStatus == 0 && index == 1" class="examine_status">一级审核</span>
                                        <span v-if="item.examineStatus == 0 && index == 2" class="examine_status">二级审核</span>
                                        <span v-if="item.examineStatus == 0 && index == 3" class="examine_status">三级审核</span>
                                        <span v-if="item.examineStatus == 0 && index == 4" class="examine_status">四级审核</span>
                                        <span v-if="item.examineStatus == 0 && index == 5" class="examine_status">五级审核</span>
                                        <span v-if="item.examineStatus == 0 && index == 6" class="examine_status">六级审核</span>
                                        <span v-if="item.examineStatus == 1" class="examine_status"><i class="el-icon-success" style="color:#67c23a;font-size:15px"></i> 已通过</span>
                                        <span v-if="item.examineStatus == 2" class="examine_status"><i class="el-icon-circle-close" style="color:#f56c6c;font-size:18px"></i> 已拒绝</span>
                                        <span v-if="item.examineStatus == 3" class="examine_status"><i class="el-icon-time" style="color:#e6a23c;font-size:18px"></i> 审核中</span>
                                        <span v-if="item.examineStatus == 5" class="examine_status"><i class="el-icon-circle-plus" style="color:#67c23a;font-size:18px"></i> 发起</span>
                                    </div>
                                </el-popover>
                                <span v-if="index !== examineList.length - 1" class="examine_next"><i class="el-icon-arrow-right"></i></span>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="bottom">
                <el-tabs v-model="activeName2" type="card">
                    <el-tab-pane label="合同详情" name="first">
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
                            </el-dialog>
                        </div>
                        <div class="text" style="height:150px;">
                            <ul>
                                <li>创建人：<span>{{agreementdetail.private_employee}}</span></li>
                                <li>创建人部门：<span>{{agreementdetail.deptname}}</span></li>
                                <li>创建人机构：<span>{{agreementdetail.parentname}}</span></li>
                                <li>创建时间：<span>{{agreementdetail.create_time}}</span></li>
                                <li>修改时间：<span>{{agreementdetail.update_time}}</span></li>
                            </ul>
                            <p>&nbsp;</p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="回款计划" name="second">
                        <span style="text-align:center;">暂无计划</span>
                    </el-tab-pane>
                    <el-tab-pane label="产品" name="third">
                        <span style="text-align:center;">暂无计划</span>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
        
        <el-col :span="6" style="padding:10px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.keyword" placeholder="请输入公司名称" style="width:80%;" @keyup.enter.native="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
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
        <el-dialog
            title="审核意见"
            :visible.sync="dialogVisible2"
            width="40%">
            <el-form ref="exaform" :model="exaform" :rules="rules">
                <el-form-item prop="remarks">
                    <el-input v-model="exaform.remarks" type="textarea" rows="5" placeholder="请输入审核意见（必填）"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="toexamine()">确 定</el-button>
            </span>
        </el-dialog>
    </el-row>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'agreementDetails',
        store,
        filters:{
            commaing(value){
                let intPart = Math.trunc(value) //获取整数部分
                let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                return intPartFormat
            },
        },
        data(){
            return {
                detailData:null,
                searchList:{
                    keyword:null,
                },
                agreementdetail:{},
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

                examineList:[],
                hasCheck:null,   //是否有审核权
                hasRecheck:null,   //是否有撤回权

                examineLog:[],

                dialogVisible2:false,
                exaform:{
                    status:null,
                    remarks:null,
                },
                rules:{
                    remarks:[{ required: true, message: '审核意见不能为空', trigger: 'blur' }]
                },
            }
        },
        activated(){
            this.loadData();
            this.loadIMG()
        },
        methods: {
            loadData() {
                const _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                pageInfo.searchName = this.searchList.keyword
                //加载详情页右侧表格
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'getContractAll.do?cId='+_this.$store.state.iscId + '&pId=' +_this.$store.state.ispId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadIMG(){
                const _this = this
                this.detailData = this.$store.state.agreedetailsData.submitData;
                this.idArr.id = this.$store.state.agreedetailsData.submitData.id
                _this.fileList = []
                let qs = require('querystring')
                let data = {}
                data.typetid = this.detailData.id
                data.type = '合同'
                data.pId = this.$store.state.ispId
                data.cId = this.$store.state.iscId

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'imgInfo/getImgInfoByTypeid.do',
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.dataList = res.data
                    let arr = _this.dataList
                    arr.forEach(el => {
                        _this.imgid = el.id
                        _this.imgurl = '/upload/'+_this.$store.state.iscId+'/'+el.name
                        _this.fileList.push({id:_this.imgid,imgURL:_this.imgurl})
                    });
                }).catch(function(err){
                    _this.$message.error("图片加载失败");
                });
                //加载合同详情
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'getContractById.do?cId='+_this.$store.state.iscId+'&contractId='+this.detailData.id,
                }).then(function(res){
                    _this.agreementdetail = res.data
                    //加载审核流程
                    axios({
                        method:'get',
                        url:_this.$store.state.defaultHttp+'examineRecord/queryExamineRecordList.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId + '&recordId='+_this.agreementdetail.examineRecordId,
                    }).then(function(res){
                        _this.examineList = res.data.steps
                        _this.examineList.forEach((el,index) => {
                            el.userLength = el.userList.length
                            if(el.userLength == 1){
                                el.type_style = 'width:50px;'
                            }else if(el.userLength == 2){
                                el.type_style = 'width:75px;'
                            }else if(el.userLength == 3){
                                el.type_style = 'width:100px;'
                            }else if(el.userLength == 4){
                                el.type_style = 'width:125px;'
                            }else if(el.userLength == 5){
                                el.type_style = 'width:150px;'
                            }
                            
                            if(index == 0){
                                if(el.userList[0].img){
                                    // el.headPortrait = '../../../../static/img/17.jpg'
                                    el.headPortrait = '/upload/'+_this.$store.state.iscId+'/'+el.userList[0].img
                                }else{
                                    // el.headPortrait = '../../../../static/img/timg.jpg'
                                    el.headPortrait = '/upload/staticImg/avatar.jpg'
                                }
                            }
                            if(el.stepType ==2){
                                for(let i = 0; i < el.userList.length; i ++){
                                    if(el.userList[i].img && el.userList[i].examineStatus !== 0){
                                        // el.headPortrait = '../../../../static/img/17.jpg'
                                        el.headPortrait = '/upload/'+_this.$store.state.iscId+'/'+el.userList[i].img
                                        break
                                    }else if(!el.userList[i].img && el.userList[i].examineStatus !== 0){
                                        // el.headPortrait = '../../../../static/img/timg.jpg'
                                        el.headPortrait = '/upload/staticImg/avatar.jpg'
                                        break
                                    }else if(el.userList[i].img && el.userList[i].examineStatus == 0){
                                        // el.headPortrait = '../../../../static/img/17.jpg'
                                        el.headPortrait = '/upload/'+_this.$store.state.iscId+'/'+el.userList[i].img
                                        break
                                    }else if(!el.userList[i].img && el.userList[i].examineStatus == 0){
                                        // el.headPortrait = '../../../../static/img/timg.jpg'
                                        el.headPortrait = '/upload/staticImg/avatar.jpg'
                                        break
                                    }
                                }
                            }
                            if(el.stepType == 3){
                                el.userList.forEach((a,i) => {
                                    if(a.img){
                                        // a.headPortrait = '../../../../static/img/17.jpg'
                                        a.headPortrait = '/upload/'+_this.$store.state.iscId+'/'+a.img
                                    }else{
                                        // a.headPortrait = '../../../../static/img/timg.jpg'
                                        a.headPortrait = '/upload/staticImg/avatar.jpg'
                                    }
                                })
                            }
                        });
                        _this.hasCheck = res.data.isCheck  //是否有审核权
                        _this.hasRecheck = res.data.isRecheck  //是否有撤回权
                    }).catch(function(err){
                        // console.log(err);
                    });
                    //加载审核历史
                    axios({
                        method:'get',
                        url:_this.$store.state.defaultHttp+'examineLog/queryExamineLogList.do?cId='+_this.$store.state.iscId+'&recordId='+_this.agreementdetail.examineRecordId,
                    }).then(function(res){
                        _this.examineLog = res.data
                    }).catch(function(err){
                        // console.log(err);
                    });
                }).catch(function(err){
                    // console.log(err);
                });
                
            },
            tirggerFile (event) {
                const _this = this;
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
            },
            delImg(e,val){
                const _this = this;
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
                        _this.$message.error("删除失败,请重新操作");
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
            showexamine(e){
                this.exaform.status = e
                this.dialogVisible2 = true
            },
            toexamine(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.detailData.id
                data.recordId = this.agreementdetail.examineRecordId
                data.pId = this.$store.state.ispId
                data.status = this.exaform.status
                data.remarks = this.exaform.remarks

                let flag = false
                if(!data.remarks){
                    _this.$message({
                        message:'审核意见不能为空',
                        type:'error'
                    })
                    flag = true
                }
                if(flag) return

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'examineRecord/auditExamine.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'操作成功',
                            type:'success'
                        })
                        _this.dialogVisible2 = false
                        _this.exaform.status = null
                        _this.exaform.remarks = null
                        _this.$options.methods.loadIMG.bind(_this)()
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("审核失败，请稍后再试");
                });
            },
            getRow(index,row){
                this.$store.state.agreedetailsData.submitData = {"id":row.contract_id}
                this.idArr.contractId = row.contract_id
                this.$options.methods.loadIMG.bind(this)(true);
            },
            search(){
                const _this = this;
                _this.$options.methods.loadData.bind(_this)();
            },
            handleSizeChange(val) {
                const _this = this;
                _this.limit = val;
                _this.$options.methods.loadData.bind(_this)();
            },
            handleCurrentChange(val) {
                const _this = this;
                _this.page = val;
                _this.$options.methods.loadData.bind(_this)();
            },
        },
    }
</script>

<style>
    .agrdetcontent{
        background-color: #f7f7f7;
        height: auto;
    }
    .right{
        height: auto;
        background-color: #fff;
        padding-bottom: 5px;
    }
    .el-card__body{
        padding: 0;
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
    .audited{
        position: absolute;
        right: 45%;
        top: 90px;
    }
    .audited .audited_img{
        width: 150px;
        height: 75px;
        transform: rotate(-10deg)
    }
    .qingxi{
        opacity: 1;
    }
    .mohu{
        opacity: 0.3;
    }
</style>
