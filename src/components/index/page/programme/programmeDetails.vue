<template>
    <!-- 方案详情页 -->
    <el-row class="prodetcontent" :gutter="10">
        <el-col :span="18">
            <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="bold_span">{{programme.projectName}}</span>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="retracts">收起</el-button>
                        <el-button style="float:right;margin-left:10px;" class="info-btn" size="mini" @click="retract()" v-show="!retracts">显示</el-button>
                    </div>
                    <div class="text item" v-show="thisshow">
                        <ul>
                            <li>年份：<span>{{programme.time}}</span></li>
                            <li>状态：<span>{{programme.state}}</span></li>
                            <li>创建时间：<span>{{programme.createTime}}</span></li>
                            <li>创建人：<span>{{programme.private_employee}}</span></li>
                            <li>应用部门：<span>{{programme.deptname}}</span></li>
                            <li>应用机构：<span>{{programme.parentname}}</span></li>
                        </ul>
                        <p>&nbsp;</p>
                    </div>
                    <div v-show="!thisshow"></div>
                </el-card>
            </div>
            <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>线索和每日考核目标</span>
                    </div>
                    <div class="text item">
                        <el-table :data="cLueProjects" border strip style="width: 100%">
                            <el-table-column label="岗位" min-width="110" prop="name" />
                            <el-table-column label="线索/客户新增目标" prop="addClue" min-width="150" />
                            <el-table-column label="线索更新目标" prop="toUpdate" min-width="130" />
                            <el-table-column label="每月" prop="monthNum" min-width="110" />
                            <el-table-column label="每周" prop="weekNum" min-width="100" />
                            <el-table-column label="操作" width="90" header-align="center" align="center">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleclue(scope.$index, scope.row)">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </div>
            <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>拜访周目标</span>
                    </div>
                    <div class="text item">
                        <el-table :data="visitprojects" border strip style="width: 100%">
                            <el-table-column label="岗位" prop="name" min-width="110" />
                            <el-table-column label="拜访目标" prop="visitNum" min-width="110" />
                            <el-table-column label="每月最低" prop="monthMinimum" min-width="110" />
                            <el-table-column label="操作" width="90" header-align="center" align="center">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handlevisit(scope.$index, scope.row)">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </div>
            <div class="top">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>每日商机考核</span>
                    </div>
                    <div class="text item">
                        <el-table :data="opportunityProjects" border strip style="width: 100%">
                            <el-table-column label="岗位" prop="name" min-width="110" />
                            <el-table-column label="商机新增目标" prop="opportunityNum" min-width="130" />
                            <el-table-column label="操作" width="90" header-align="center" align="center">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleopportunity(scope.$index, scope.row)">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </div>
        </el-col>
        
        <el-col :span="6" style="padding:10px;" class="right">
            <div class="searchList" style="width:100%;">
                <el-input  v-model="searchList.keyword" placeholder="请输入公司名称" style="width:80%;" @keyup.enter.native="search"></el-input>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()"></el-button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="方案名称" prop="projectName">
                    <template slot-scope="scope">
                        <div @click="getRow(scope.$index, scope.row)">
                            {{scope.row.projectName}}
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
        <el-dialog title="线索和每日考核方案" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%">
            <el-form label-width="130px" :model="updateList">
                <el-form-item label="线索/客户新增目标">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" class="oppinput" v-model="updateList.addClue"></el-input>
                </el-form-item>
                <el-form-item label="线索更新目标">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" class="oppinput" v-model="updateList.toUpdate"></el-input>
                </el-form-item>
                <el-form-item label="每月">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" class="oppinput" v-model="updateList.monthNum"></el-input>
                </el-form-item>
                <el-form-item label="每周">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" class="oppinput" v-model="updateList.weekNum"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addcLue()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="拜访周目标" :visible.sync="dialogVisible2" :close-on-click-modal="false" width="40%">
            <el-form label-width="80px" :model="updateList">
                <el-form-item label="拜访目标">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" class="oppinput" v-model="updateList.visitNum"></el-input>
                </el-form-item>
                <el-form-item label="每月最低">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" class="oppinput" v-model="updateList.monthMinimum"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="addvisit()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="每周商机考核" :visible.sync="dialogVisible3" :close-on-click-modal="false" width="40%">
            <el-form label-width="100px" :model="updateList">
                <el-form-item label="商机新增目标">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" class="oppinput" v-model="updateList.opportunityNum"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="addopportunity()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="合同金额" :visible.sync="dialogVisible4" :close-on-click-modal="false" width="40%">
            <el-form label-width="80px" :model="updateList">
                <el-form-item label="每月">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" class="oppinput" v-model="updateList.monthMoney"></el-input>
                </el-form-item>
                <el-form-item label="每周">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" class="oppinput" v-model="updateList.weekMoney"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="addcontract()">确 定</el-button>
            </span>
        </el-dialog>
    </el-row>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'programmeDetails',
        store,
        data(){
            return {
                detailData:null,
                searchList:{
                    keyword:null,
                },
                programme:{},
                tableData: null,
                tableNumber:null,
                visitprojects:null,  //拜访目标
                cLueProjects:null,  //线索目标
                contractProjects:null,  //合同金额目标
                opportunityProjects:null,  //商机目标
                page:1,
                limit:20,
                thisshow:true,
                idArr:{
                    id:null,
                },
                active: 0,
                stepList:null,
                updateList:{
                    id:null,
                    projectid:null, // 方案编号
                    addClue:null, // 新增线索目标数
                    monthNum:null, // 每月目标数
                    toUpdate:null, // 线索、客户更新目标数
                    weekNum:null, // 周目标数
                    weekMoney:null, // 每周合同金额
                    monthMoney:null, // 每月合同金额
                    opportunityNum:null, // 商机新增目标
                    visitNum:null, // 拜访目标数量
                    monthMinimum:null, // 每月最低拜访数量
                },
                dialogVisible:false,
                dialogVisible2:false,
                dialogVisible3:false,
                dialogVisible4:false,
                shownext:true,
                showfail:false,

                retracts:true,
            }
        },
        activated(){
            this.loadData();
        },
        // mounted(){
        //     this.loadData();
        // },
        methods: {
            loadData() {
                this.detailData = this.$store.state.prodetailsData.submitData;
                this.idArr.id = this.$store.state.prodetailsData.submitData.id
                const _this = this
                let qs =require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                //详情页联系人
                axios({
                    method:'get',
                    url:_this.$store.state.defaultHttp+'project/getProjectById.do?cId='+_this.$store.state.iscId+'&id='+_this.detailData.id,
                }).then(function(res){
                    _this.programme = res.data
                    _this.cLueProjects = res.data.cLueProjects
                    _this.contractProjects = res.data.contractProjects
                    _this.opportunityProjects = res.data.opportunityProjects
                    _this.visitprojects = res.data.visitprojects
                }).catch(function(err){
                    // console.log(err);
                });
                //右侧表格
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'project/getProject.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(pageInfo),
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            retract(){
                this.thisshow = !this.thisshow
                this.retracts = !this.retracts
            },
            getRow(index,row){
                this.$store.state.prodetailsData.submitData = {"id":row.id}
                this.idArr.id = row.id
                this.$options.methods.loadData.bind(this)(true);
            },
            handleclue(index,row){
                this.updateList.id = row.id
                this.updateList.projectid = row.projectid
                this.updateList.addClue = null
                this.updateList.toUpdate = null
                this.updateList.monthNum = null
                this.updateList.weekNum = null
                this.dialogVisible = true
            },
            addcLue(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.updateList.id
                data.projectid = this.updateList.projectid
                data.addClue = this.updateList.addClue
                data.toUpdate = this.updateList.toUpdate
                data.monthNum = this.updateList.monthNum
                data.weekNum = this.updateList.weekNum

                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'cLueProject/updateClueProject.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data),
                }).then(function(res){
                    if(res.data.code && res.data.code == 200) {
                        _this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        _this.dialogVisible = false
                        _this.$store.state.prodetailsData.submitData = {'id':data.projectid}
                        _this.$options.methods.loadData.bind(_this)(true);
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    _this.$message.error("提交失败,请重新提交");
                });
            },
            handlevisit(index,row){
                this.updateList.id = row.id
                this.updateList.projectid = row.projectid
                this.updateList.visitNum = null
                this.updateList.monthMinimum = null
                this.dialogVisible2 = true
            },
            addvisit(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.updateList.id
                data.projectid = this.updateList.projectid
                data.visitNum = this.updateList.visitNum
                data.monthMinimum = this.updateList.monthMinimum

                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'visitproject/updateVisitproject.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data),
                }).then(function(res){
                    if(res.data.code && res.data.code == 200) {
                        _this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        _this.dialogVisible2 = false
                        _this.$store.state.prodetailsData.submitData = {'id':data.projectid}
                        _this.$options.methods.loadData.bind(_this)(true);
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    _this.$message.error("提交失败,请重新提交");
                });
            },
            handleopportunity(index,row){
                this.updateList.id = row.id
                this.updateList.projectid = row.projectid
                this.updateList.opportunityNum = null
                this.dialogVisible3 = true
            },
            addopportunity(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.updateList.id
                data.projectid = this.updateList.projectid
                data.opportunityNum = this.updateList.opportunityNum

                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'opportunityProject/updateOpportunityProject.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data),
                }).then(function(res){
                    if(res.data.code && res.data.code == 200) {
                        _this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        _this.dialogVisible3 = false
                        _this.$store.state.prodetailsData.submitData = {'id':data.projectid}
                        _this.$options.methods.loadData.bind(_this)(true);
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    _this.$message.error("提交失败,请重新提交");
                });
            },
            handlecontract(index,row){
                this.updateList.id = row.id
                this.updateList.projectid = row.projectid
                this.updateList.monthMoney = null
                this.updateList.weekMoney = null
                this.dialogVisible4 = true
            },
            addcontract(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.updateList.id
                data.projectid = this.updateList.projectid
                data.monthMoney = this.updateList.monthMoney
                data.weekMoney = this.updateList.weekMoney

                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'contractProject/updateContractProject.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data),
                }).then(function(res){
                    if(res.data.code && res.data.code == 200) {
                        _this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        _this.dialogVisible4 = false
                        _this.$store.state.prodetailsData.submitData = {'id':data.projectid}
                        _this.$options.methods.loadData.bind(_this)(true);
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(err){
                    _this.$message.error("提交失败,请重新提交");
                });
            },
            search(){
                const _this = this;
                let qs =require('querystring')
                let searchList = {}
                searchList.searchName = this.searchList.keyword;
                searchList.page = this.page;
                searchList.limit = this.limit;

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'opportunity/query.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(searchList),
                }).then(function(res){
                    _this.tableData = res.data.map.success
                    _this.tableNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
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
    .prodetcontent{
        background-color: #f7f7f7;
        height: auto;
        min-height: 100%;
    }
    .oppinput{
        width:90%;
    }
</style>
