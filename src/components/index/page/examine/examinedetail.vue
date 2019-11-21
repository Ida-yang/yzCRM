<template>
    <!-- 审核单详情页 -->
    <el-row class="agrdetcontent" :gutter="10">
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card" v-model="examineDetail">
                    <div slot="header" class="clearfix">
                        <span class="bold_span">{{examineDetail.category + '审核-' + examineDetail.private_employee + '-' + examineDetail.cTime}}</span>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" v-if="!showLaunch && isSelf" @click="clickLaunch">发起</el-button>
                    </div>
                    <div class="text item">
                        <ul>
                            <li>制单人：<span>{{examineDetail.private_employee}}</span></li>
                            <li>部门：<span>{{examineDetail.deptname}}</span></li>
                            <li>机构：<span>{{examineDetail.parentname}}</span></li>
                            <li>创建时间：<span>{{examineDetail.createTime}}</span></li>
                            <li v-for="(item,index) in fieldData" :key="index">
                                {{item.name}}：<span>{{item.value}}</span>
                            </li>
                        </ul>
                        <br>
                        <ul>
                            <li>图片：<img :src="examineDetail.imageUrl" alt="" width="100" height="100" style="vertical-align:top;" @click="showImg" /></li>
                        </ul>
                        <ul>
                            <li>附件：<a :href="examineDetail.fileUrl" dowmload>{{examineDetail.file_name}}</a></li>
                        </ul>
                        <div class="agreeaudited" v-if="examineDetail.checkStatus == 1">
                            <img class="audited_img" :src="auditing" alt="审核中">
                        </div>
                        <div class="agreeaudited" v-if="examineDetail.checkStatus == 2">
                            <img class="audited_img" :src="audited" alt="已审核">
                        </div>
                        <div class="agreeaudited" v-if="examineDetail.checkStatus == 3">
                            <img class="audited_img" :src="noaudit" alt="未通过">
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="top" v-if="showLaunch">
                <el-card class="box-card" v-model="examineDetail">
                    <div slot="header" class="clearfix">
                        <el-popover placement="right-start" width="220" trigger="click">
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
                        <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(1)" v-show="hasCheck && examineDetail.checkStatus !== 2">通过</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(2)" v-show="hasCheck && examineDetail.checkStatus !== 2">拒绝</el-button>
                        <el-button style="float:right;" class="info-btn" size="mini" @click="showexamine(4)" v-show="hasCheck">驳回</el-button>
                    </div>
                    <div class="text item">
                        <div class="examine_c">
                            <div v-for="(item,index) in examineList" :key="index" class="examine_item">
                                <el-popover placement="bottom" width="220" trigger="hover" class="examine_cont">
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
                                            <span>{{b.realname + '(' + b.phone + ')'}}</span>
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
                                        <span v-if="item.examineStatus == 1" class="examine_status"><i class="el-icon-success" style="color:#67c23a;font-size:15px"></i> 已审核</span>
                                        <span v-if="item.examineStatus == 2" class="examine_status"><i class="el-icon-circle-close" style="color:#f56c6c;font-size:18px"></i> 未通过</span>
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
        </el-col>
        
        <el-col :span="6" style="padding:10px;min-height:635px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.keyword" placeholder="请输入标题名称" style="width:80%;" @keyup.enter.native="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
            </div>
            <el-table :data="tableDatas" style="width: 100%">
                <el-table-column label="标题" prop="poolName">
                    <template slot-scope="scope">
                    <div @click="getRow(scope.$index, scope.row)">
                        {{scope.row.category + '审核-' + scope.row.private_employee + '-' + scope.row.cTime}}
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
                    layout="total, sizes, prev, next"
                    :total="tableNumber">
                </el-pagination>
            </div>
        </el-col>

        <el-dialog title="审核意见" :visible.sync="dialogVisibleexa" :close-on-click-modal="false" width="40%">
            <el-form ref="exaform" :model="exaform" :rules="rules">
                <el-form-item prop="remarks">
                    <el-input v-model="exaform.remarks" type="textarea" rows="5" placeholder="请输入审核意见（必填）"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleexa = false">取 消</el-button>
                <el-button type="primary" @click="toexamine()">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </el-row>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'examinedetail',
        store,
        filters:{
            commaing(value){
                if(value){
                    let intPart = Math.trunc(value) //获取整数部分
                    let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
                    let floatPart = '.00' // 预定义小数部分
                    let valArray = value.toString().split('.')
                    if(valArray.length === 2) {
                        floatPart = valArray[1].toString() // 拿到小数部分
                        if(floatPart.length === 1) { // 补0,实际上用不着
                            return intPartFormat + '.' + floatPart + '0'
                        }else{
                            return intPartFormat + '.' + floatPart
                        }
                    } else {
                        return intPartFormat + floatPart
                    }
                }
                
            },
        },
        data(){
            return {
                detailData:null,
                
                tableDatas: null,
                tableNumber:null,
                page:1,
                limit:20,
                searchList:{
                    keyword:null,
                },
                
                examineDetail:{},
                fieldData:[],
                
                dialogImageUrl:null,
                dialogVisible:false,

                examineList:[],
                hasCheck:null,   //是否有审核权
                hasRecheck:null,   //是否有撤回权

                examineLog:[],
                showLaunch:false,
                isSelf:false,

                dialogVisibleexa:false,
                exaform:{
                    status:null,
                    remarks:null,
                },

                rules:{
                    remarks:[{ required: true, message: '审核意见不能为空', trigger: 'blur' }],
                },

                auditing: this.$store.state.systemHttp + '/upload/staticImg/inaudit.png',
                audited: this.$store.state.systemHttp + '/upload/staticImg/examine.png',
                noaudit: this.$store.state.systemHttp + '/upload/staticImg/refuse.png',
            }
        },
        activated(){
            this.loadData()
            this.loadTable()
        },
        methods: {
            loadData(){
                const _this = this
                let qs = require('querystring')

                this.detailData = this.$store.state.examinedetailData
                
                let info = {
                    label: 10,
                    id: this.detailData.id,
                    categoryId: this.detailData.category_id
                }

                //加载审核单详情
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'oaExamine/selectByPrimakey.do?cId='+_this.$store.state.iscId+'&id='+_this.detailData.id,
                }).then(function(res){
                    let response = res.data

                    let str = response.createTime.slice(0,10)
                    let reg = new RegExp('-','g')
                    response.cTime = str.replace(reg,'')

                    if(response.image){
                        response.imageUrl = _this.$store.state.systemHttp + 'upload/' + _this.$store.state.iscId + '/' + response.image
                    }
                    if(response.file){
                        let file_val = JSON.parse(response.file)
                        response.file_name = file_val.name
                        response.fileUrl = _this.$store.state.systemHttp + 'upload/' + _this.$store.state.iscId + '/' + file_val.response
                    }

                    _this.examineDetail = response

                    if(response.examineRecordId){
                        _this.$options.methods.loadExamine.bind(_this)()
                    }else{
                        _this.showLaunch = false
                        if(response.pid == _this.$store.state.ispId){
                            _this.isSelf = true
                        }else{
                            _this.isSelf = false
                        }
                    }
                }).catch(function(err){
                    // console.log(err);
                });
                //加载自定义字段详情
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'field/information.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(info)
                }).then(function(res){
                    _this.fieldData = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },

            loadExamine(){
                const _this = this
                let qs = require('querystring')
                let examine = {
                    checkStatus: _this.examineDetail.checkStatus,
                    recordId: _this.examineDetail.examineRecordId,
                    pId: _this.$store.state.ispId,
                    // categoryType: '4',
                    // categoryId: _this.examineDetail.category_id,
                    // secondid: _this.$store.state.deptid,
                }
                //加载审核流程
                axios({
                    method:'post',
                    // url:_this.$store.state.defaultHttp+'oaExamine/selectStepsByCategoryIdAndDeptId.do?cId='+_this.$store.state.iscId,
                    url:_this.$store.state.defaultHttp+'examineRecord/queryExamineRecordList.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(examine)
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
                                el.headPortrait = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.userList[0].img
                            }else{
                                el.headPortrait = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                            }
                        }
                        if(el.stepType ==2){
                            for(let i = 0; i < el.userList.length; i ++){
                                if(el.userList[i].img && el.userList[i].examineStatus !== 0){
                                    el.headPortrait = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.userList[i].img
                                    break
                                }else if(!el.userList[i].img && el.userList[i].examineStatus !== 0){
                                    el.headPortrait = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                                    break
                                }else if(el.userList[i].img && el.userList[i].examineStatus == 0){
                                    el.headPortrait = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.userList[i].img
                                    break
                                }else if(!el.userList[i].img && el.userList[i].examineStatus == 0){
                                    el.headPortrait = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                                    break
                                }
                            }
                        }
                        if(el.stepType == 3){
                            el.userList.forEach((a,i) => {
                                if(a.img){
                                    a.headPortrait = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+a.img
                                }else{
                                    a.headPortrait = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                                }
                            })
                        }
                    });
                    _this.hasCheck = res.data.isCheck  //是否有审核权
                    _this.hasRecheck = res.data.isRecheck  //是否有撤回权
                    _this.showLaunch = true
                }).catch(function(err){
                    // console.log(err);
                });
                //加载审核历史
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'examineLog/queryExamineLogList.do?cId='+_this.$store.state.iscId+'&recordId='+_this.examineDetail.examineRecordId,
                }).then(function(res){
                    _this.examineLog = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadTable(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                // if(this.searchList.label == 0 ){
                //     data.pId = _this.nullvalue
                // }else if(this.searchList.label == 1){
                //     data.pId = _this.$store.state.ispId
                // }else if(this.searchList.label == 2){
                //     data.secondid = _this.$store.state.deptid
                // }else if(this.searchList.label == 3){
                //     data.deptid = _this.$store.state.insid
                // }else{
                //     data.pId = _this.$store.state.ispId
                // }
                // if(this.searchList.keyType !== this.nullvalue){
                //     data.keyType = this.searchList.keyType
                // }
                data.page = this.page
                data.limit = this.limit
                // data.example = this.searchList.time
                // data.searchName = this.searchList.searchName
                // data.type = this.searchList.woClass
                // data.label = 11

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'oaExamine/selectList.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    let info = res.data.map.success
                    info.forEach(el => {
                        let a = el.timeConsuming
                        let b = parseInt(a / 24)
                        let c = parseInt(a % 24)
                        el.takeupTime = b + '天' + c + '小时'

                        let str = el.createTime.slice(0,10)
                        let reg = new RegExp('-','g')
                        el.cTime = str.replace(reg,'')

                        // if(el.image){
                        //     el.imageUrl = _this.$store.state.systemHttp + 'upload/' + _this.$store.state.iscId + '/' + el.image
                        // }
                        // if(el.file){
                        //     let file_val = JSON.parse(el.file)
                        //     el.file_name = file_val.name
                        //     el.fileUrl = _this.$store.state.systemHttp + 'upload/' + _this.$store.state.iscId + '/' + file_val.response
                        // }
                    });
                    _this.tableDatas = info
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                });
            },

            clickLaunch(){
                const _this = this
                let qs = require('querystring')
                console.log(this.examineDetail)
                let data = {
                    id: this.examineDetail.id,
                    pid: this.$store.state.ispId,
                    categoryId: this.examineDetail.category_id,
                    type: '4',
                    secondid: this.$store.state.deptid,
                }
                
                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'oaExamine/saveOaExamineRecord.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == "200") {
                        _this.$message({
                            message: '成功',
                            type: 'success'
                        });
                        _this.showLaunch = true
                        _this.$options.methods.loadData.bind(_this)()
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            showImg(e){
                this.dialogImageUrl = this.examineDetail.imageUrl
                this.dialogVisible = true
            },
            showexamine(e){
                this.exaform.status = e
                this.dialogVisibleexa = true
            },
            toexamine(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.detailData.id
                data.recordId = this.examineDetail.examineRecordId
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
                        _this.dialogVisibleexa = false
                        _this.exaform.status = null
                        _this.exaform.remarks = null
                        _this.$options.methods.loadData.bind(_this)()
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
                this.$store.state.examinedetailData = {id:row.id, category_id:row.category_id}
                this.$options.methods.loadData.bind(this)(true);
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
        min-height: 100%;
    }
    .fileinput{
        width: 100px;
        height: 100px;
        background-color: #ffffff;
        border: 1px dashed #409EFF;
    }
    .agreeaudited{
        position: absolute;
        right: 45%;
        top: 90px;
    }
    .agreeaudited .audited_img{
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
