<template>
    <!-- 方案 -->
    <div class="contentall">
        <div class="otherleftcontent">
            <el-tree
                node-key="deptid"
                highlight-current default-expand-all
                :data="datalist"
                :props="defaultProps"
                :expand-on-click-node="false"
                @node-click="handleNodeClick">
            </el-tree>
        </div>
        <div class="centercontent"></div>
        <div class="otherightcontent">
            <el-tabs v-model="activename" type="card" @tab-click="tabClick">
                <el-tab-pane label="部门/个人目标" name="first">
                    <!-- <div v-show="!showGoals">请点击左边部门</div> -->
                    <div class="entry" v-show="!showGoals">
                        <p class="entry_name">请选择部门，查看部门/个人目标</p>
                    </div>
                    <div v-show="showGoals">
                        <span class="nameList">年份：</span><el-date-picker v-model="goalsyear" type="year" format="yyyy" value-format="yyyy" placeholder="选择年份" @change="changeYear"></el-date-picker>
                        <p>&nbsp;</p>
                        <div class="entry">
                            <p class="entry_name">{{goalsyear + '年' + depGoalsName + '全年目标业绩为' + depGoalsNum + '元'}}</p>
                        </div>
                        <el-table :data="depGoalsData" border stripe style="width:100%">
                            <el-table-column prop="deptname" fixed min-width="110" label="部门" sortable />
                            <el-table-column prop="month01" min-width="90" label="一月" sortable />
                            <el-table-column prop="month02" min-width="90" label="二月" sortable />
                            <el-table-column prop="month03" min-width="90" label="三月" sortable />
                            <el-table-column prop="month04" min-width="90" label="四月" sortable />
                            <el-table-column prop="month05" min-width="90" label="五月" sortable />
                            <el-table-column prop="month06" min-width="90" label="六月" sortable />
                            <el-table-column prop="month07" min-width="90" label="七月" sortable />
                            <el-table-column prop="month08" min-width="90" label="八月" sortable />
                            <el-table-column prop="month09" min-width="90" label="九月" sortable />
                            <el-table-column prop="month10" min-width="90" label="十月" sortable />
                            <el-table-column prop="month11" min-width="90" label="十一月" sortable />
                            <el-table-column prop="month12" min-width="90" label="十二月" sortable />
                        </el-table>
                        <div class="entry">
                            <p class="entry_name">{{depGoalsName + '成员' + goalsyear + '年目标明细'}}</p>
                        </div>
                        <el-table :data="goalsData" border stripe style="width:100%">
                            <el-table-column prop="private_employee" fixed min-width="110" label="员工" sortable />
                            <el-table-column prop="month01" min-width="90" label="一月" sortable />
                            <el-table-column prop="month02" min-width="90" label="二月" sortable />
                            <el-table-column prop="month03" min-width="90" label="三月" sortable />
                            <el-table-column prop="month04" min-width="90" label="四月" sortable />
                            <el-table-column prop="month05" min-width="90" label="五月" sortable />
                            <el-table-column prop="month06" min-width="90" label="六月" sortable />
                            <el-table-column prop="month07" min-width="90" label="七月" sortable />
                            <el-table-column prop="month08" min-width="90" label="八月" sortable />
                            <el-table-column prop="month09" min-width="90" label="九月" sortable />
                            <el-table-column prop="month10" min-width="90" label="十月" sortable />
                            <el-table-column prop="month11" min-width="90" label="十一月" sortable />
                            <el-table-column prop="month12" min-width="90" label="十二月" sortable />
                            <el-table-column label="操作" fixed="right" width="90" header-align="center" align="center">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="方案目标" name="second">
                    <div class="radioList">
                        <el-radio-group v-model="searchList.state">
                            <span class="nameList">方案状态：</span>
                            <el-radio :label="nullvalue" @change="search()">全部状态</el-radio>
                            <el-radio label="启用" @change="search()">启用</el-radio>
                            <el-radio label="禁止" @change="search()">禁用</el-radio>
                        </el-radio-group>
                    </div>
                    <br>
                    <div class="entry">
                        <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
                        <el-button class="btn" size="mini" @click="handledeletes()">删除</el-button>

                        <div class="totalnum_head">共 <span style="font-weight:bold">{{tableNumber}}</span> 条</div>

                        <el-popover placement="bottom" width="100" trigger="click">
                            <el-checkbox-group class="checklist" v-model="checklist" style="max-height:600px;overflow-y:overlay;overflow-x:hidden">
                                <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                            </el-checkbox-group>
                            <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
                        </el-popover>
                    </div>
                    <el-table :data="tableData" ref="multipleTable" border stripe style="width:100%"
                        @selection-change="selectInfo">
                        <el-table-column fixed header-align="center" align="center" type="selection" width="45" scope.row.id prop="id" @selection-change="selectInfo" sortable />
                        <div v-for="(item,index) in filterList" :key="index" >
                            <el-table-column label="方案名称" prop="projectName" fixed v-if="item.prop == 'projectName' && item.state == 1" min-width="150" sortable>
                                <template slot-scope="scope">
                                    <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                                        {{scope.row.projectName}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="年份" prop="time" v-if="item.prop == 'time' && item.state == 1" min-width="90" sortable />
                            <el-table-column label="负责人" prop="private_employee" v-if="item.prop == 'private_employee' && item.state == 1" min-width="100" sortable />
                            <el-table-column label="部门" prop="deptname" v-if="item.prop == 'deptname' && item.state == 1" min-width="110" sortable />
                            <el-table-column label="机构" prop="parentname" v-if="item.prop == 'parentname' && item.state == 1" min-width="110" show-overflow-tooltip sortable />
                            <el-table-column label="创建时间" prop="createTime" v-if="item.prop == 'createTime' && item.state == 1" min-width="150" sortable />
                            <el-table-column label="状态" prop="state" v-if="item.prop == 'state' && item.state == 1" min-width="80" sortable />
                        </div>
                        <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
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
                </el-tab-pane>
                <el-tab-pane label="线索客户参数" name="third">
                    <div class="entry">
                        <p class="entry_name" v-show="showparams">{{depts}}</p>
                        <p class="entry_name" v-show="!showparams">请选择部门，查看限制参数</p>
                        <!-- <el-button class="btn info-btn" size="mini" @click="editParam()">编辑</el-button> -->
                    </div>
                    <div class="param_c" v-show="showparams">
                        <p>线索超过 <el-input class="inputnum" v-model="paramList.clueDay" name="clueDay" @blur="changeNum"></el-input> 天后，线索自动归集到线索池，同时每个人最多允许存在 <el-input class="inputnum" v-model="paramList.clueNum" name="clueNum" @blur="changeNum"></el-input> 条在线索，超过后不允许新增。</p>
                        <p>客户超过 <el-input class="inputnum" v-model="paramList.customerDay" name="customerDay" @blur="changeNum"></el-input> 天后，客户自动归集到客户池，同时每个人最多允许存在 <el-input class="inputnum" v-model="paramList.customerNum" name="customerNum" @blur="changeNum"></el-input> 条在客户，超过后不允许新增。</p>
                        <p>没人最多允许存在 <el-input class="inputnum" v-model="paramList.opportunityNum" name="opportunityNum" @blur="changeNum"></el-input> 条商机，超过后不允许新增。</p>
                    </div>
                </el-tab-pane>
            </el-tabs>
            
        </div>
        <el-dialog title="添加方案" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%" class="dialogform">
            <el-form ref="newform" :model="newform" label-width="80px" :rules="rules">
                <el-form-item prop="second_id" label="所属部门">
                    <el-input v-model="newform.secondname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="projectName" label="方案名称">
                    <el-input v-model="newform.projectName" placeholder="请输入方案名称"></el-input>
                </el-form-item>
                <el-form-item prop="time" label="年份">
                    <el-date-picker format="yyyy" value-format="yyyy" v-model="newform.time" type="year" placeholder="选择年份">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="private_employee" label="负责人">
                    <el-input v-model="newform.private_employee" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="state" label="方案状态">
                    <el-radio v-model="newform.state" label="启用">启用</el-radio>
                    <el-radio v-model="newform.state" label="禁用">禁用</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addprogramme()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改方案" :visible.sync="dialogVisible2" :close-on-click-modal="false" width="40%" class="dialogform">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="80px">
                <el-form-item prop="second_id" label="所属部门">
                    <el-input v-model="newform.secondname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="projectName" label="方案名称">
                    <el-input v-model="newform.projectName" placeholder="请输入方案名称"></el-input>
                </el-form-item>
                <el-form-item prop="time" label="年份">
                    <el-date-picker format="yyyy" value-format="yyyy" v-model="newform.time" type="year" placeholder="选择年份" style="width:100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="private_employee" label="负责人">
                    <el-input v-model="newform.private_employee" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="state" label="方案状态">
                    <el-radio v-model="newform.state" label="启用">启用</el-radio>
                    <el-radio v-model="newform.state" label="禁用">禁用</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="updateprogramme()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="个人目标" :visible.sync="dialogVisible3" :close-on-click-modal="false" width="40%" class="dialogform">
            <el-form ref="goalsForm" :model="goalsForm" :rules="rules" label-width="80px">
                <el-form-item prop="private_employee" label="员工">
                    <el-input v-model="goalsForm.private_employee" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="month01" label="一月">
                    <el-input v-model="goalsForm.month01" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入一月份目标"></el-input>
                </el-form-item>
                <el-form-item prop="month02" label="二月">
                    <el-input v-model="goalsForm.month02" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入二月份目标"></el-input>
                </el-form-item>
                <el-form-item prop="month03" label="三月">
                    <el-input v-model="goalsForm.month03" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入三月份目标"></el-input>
                </el-form-item>
                <el-form-item prop="month04" label="四月">
                    <el-input v-model="goalsForm.month04" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入四月份目标"></el-input>
                </el-form-item>
                <el-form-item prop="month05" label="五月">
                    <el-input v-model="goalsForm.month05" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入五月份目标"></el-input>
                </el-form-item>
                <el-form-item prop="month06" label="六月">
                    <el-input v-model="goalsForm.month06" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入六月份目标"></el-input>
                </el-form-item>
                <el-form-item prop="month07" label="七月">
                    <el-input v-model="goalsForm.month07" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入七月份目标"></el-input>
                </el-form-item>
                <el-form-item prop="month08" label="八月">
                    <el-input v-model="goalsForm.month08" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入八月份目标"></el-input>
                </el-form-item>
                <el-form-item prop="month09" label="九月">
                    <el-input v-model="goalsForm.month09" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入九月份目标"></el-input>
                </el-form-item>
                <el-form-item prop="month10" label="十月">
                    <el-input v-model="goalsForm.month10" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入十月份目标"></el-input>
                </el-form-item>
                <el-form-item prop="month11" label="十一月">
                    <el-input v-model="goalsForm.month11" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入十一月份目标"></el-input>
                </el-form-item>
                <el-form-item prop="month12" label="十二月">
                    <el-input v-model="goalsForm.month12" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入十二月份目标"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="updategoals()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'programme',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.programmeList;
            },
            tableNumber(){
               return store.state.programmeListnumber;     
            },
        },
        data(){
            return {
                datalist:[],
                defaultProps:{
                    label:'deptname',
                    children:'next',
                },

                activename:'first',

                depGoalsData:[],
                goalsData:[],
                depGoalsName:null,
                depGoalsNum:null,

                newform:{
                    second_id:null,
                    secondname:null,
                    id:null,
                    projectName:null,
                    time:null,
                    state:'启用',
                    private_employee:null,
                    createTime:null,
                    clueDay:0,
                    customerDay:0,
                    clueNum:0,
                    customerNum:0,
                    opportunityNum:0,
                },
                goalsForm:{},
                goalsyear:null,

                searchList:{
                    state:null,
                    secondid:null,
                },
                
                filterList:null,
                checklist:null,
                idArr:{
                    id:null,
                },
                roleList:null,
                clickdata:null,
                
                page:1,
                limit:20,
                dialogVisible:false,
                dialogVisible2:false,
                dialogVisible3:false,
                rules: {
                    projectName : [{ required: true, message: '方案名称不能为空', trigger: 'blur' },],
                    time : [{ required: true, message: '请选择年份', trigger: 'blur' }],
                },
                nullvalue:null,

                paramList:{},

                depts:null,
                showparams:false,
                showGoals:false
            }
        },
        activated(){
            this.loadGoals()
        },
        mounted(){
            let myDate = new Date()
            let year = myDate.getFullYear() //获取完整的年份(4位,1970-????)
            this.goalsyear = year.toString()
            this.loadGoals()
            this.loadData()
        },
        methods:{
            loadData(){
                const _this = this
                let qs = require('querystring')
                let filterList = {}
                filterList.type = '方案'
                let data = {}
                data.type = '方案'
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
                //获取机构部门树型结构
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'dept/getDeptNodeTree.do?cId='+_this.$store.state.iscId,
                }).then(function(res){
                    _this.datalist = res.data.map.success
                    // _this.depGoalsData[0].deptname = res.data.map.success[0].deptname
                }).catch(function(err){
                    // console.log(err);
                });
            },
            reloadTable(){
                const _this = this
                let qs = require('querystring')
                let pageInfo = {}
                pageInfo.page = this.page
                pageInfo.limit = this.limit
                pageInfo.state = this.searchList.state
                pageInfo.secondid = this.searchList.secondid

                //获取所有方案
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'project/getProject.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    _this.$store.state.programmeList = res.data.map.success
                    _this.$store.state.programmeListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //加载个人目标
            loadGoals(){
                const _this = this
                let qs = require('querystring')
                let pageInfo = {}
                pageInfo.secondid = this.searchList.secondid
                pageInfo.year = this.goalsyear

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'contractMoneyProject/selectByYearAndSecondid.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    if(res.data.contractMoneyProject.length){
                        if(_this.searchList.secondid){
                            let objs = res.data.statistics
                            _this.goalsData = res.data.contractMoneyProject
                            _this.depGoalsData = [res.data.statistics]
                            _this.depGoalsName = objs.deptname
                            _this.depGoalsNum = objs.month01 + objs.month02 + objs.month03 + objs.month04 + objs.month05 + objs.month06 + objs.month07 + objs.month08 + objs.month09 + objs.month10 + objs.month11 + objs.month12
                        }
                    }else{
                        if(_this.searchList.secondid){
                            _this.goalsData = []
                            _this.depGoalsData = [{deptname:_this.newform.secondname,month01:0,month02:0,month03:0,month04:0,month05:0,month06:0,month07:0,month08:0,month09:0,month10:0,month11:0,month12:0}]
                            _this.depGoalsName = _this.newform.secondname
                            _this.depGoalsNum = 0
                        }
                    }
                    
                }).catch(function(err){
                    // console.log(err);
                });
            },
            reloadNum(){
                const _this = this
                let qs = require('querystring')
                let pageInfo = {}
                pageInfo.secondid = this.searchList.secondid

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'restrictiveConditions/selectBySecondid.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(pageInfo)
                }).then(function(res){
                    let data = res.data.map.restrictiveConditions
                    if(data){
                        _this.paramList = data
                    }
                    if(_this.searchList.secondid){
                        _this.showparams = true
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleNodeClick(data){
                this.searchList.secondid = data.deptid
                this.clickdata = data
                this.depts = data.deptname
                this.newform.second_id = data.deptid
                this.newform.secondname = data.deptname
                if(this.activename == 'first'){
                    // this.depGoalsData = [{deptname:data.deptname,month01:null,month02:null,month03:null,month04:null,month05:null,month06:null,month07:null,month08:null,month09:null,month10:null,month11:null,month12:null}]
                    this.$options.methods.loadGoals.bind(this)(true)
                    this.showGoals = true
                }else if(this.activename == 'second'){
                    this.$options.methods.reloadTable.bind(this)(true)
                }else if(this.activename == 'third'){
                    this.$options.methods.reloadNum.bind(this)(true)
                    this.showparams = true
                }
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
            //方案添加
            handleAdd(){
                const _this = this

                if(!this.clickdata){
                    _this.$message({
                        message:'请先选择部门，再添加方案',
                        type:'info'
                    })
                }else if(this.clickdata.next == ''){
                    axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+'projectJurisdiction/insert.do',//新增方案
                    }).then(function(res){
                        if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message:'对不起，您没有该权限，请联系管理员开通',
                                type:'error'
                            })
                        }else{  
                            _this.newform.projectName = null
                            _this.newform.time = null
                            _this.newform.private_employee = _this.$store.state.user
                            _this.dialogVisible = true
                        }
                    }).catch(function(err){
                        // console.log(err);
                    });
                }else{
                    _this.$message({
                        message:'该部门下还有子部门，请选择子部门',
                        type:'error'
                    })
                }
            },
            //方案添加提交按钮
            addprogramme(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.secondid = this.newform.second_id
                data.projectName = this.newform.projectName
                data.time = this.newform.time+'-01-01'
                data.state = this.newform.state

                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    if(!item.projectName){
                        _this.$message({
                            message: "方案名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.time){
                        _this.$message({
                            message: "年份不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'project/insertProject.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加方案成功',
                            type:'success'
                        })
                        _this.dialogVisible = false
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("添加失败,请重新添加");
                });
                // alert('添加成功')
            },
            //方案修改
            handleUpdate(index,row){
                const _this = this
                let data = {}

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'projectJurisdiction/update.do',//编辑方案
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.id = row.id
                        _this.newform.secondid = row.second_id
                        _this.newform.secondname = row.deptname
                        _this.newform.deptid = row.deptid
                        _this.newform.projectName = row.projectName
                        _this.newform.time = row.time+'-01-01'
                        _this.newform.state = row.state
                        _this.newform.private_employee = row.private_employee
                        _this.newform.createTime = row.createTime
                        _this.dialogVisible2 = true
                    }
                }).catch(function(err){
                    // console.log(err);
                });
                
            },
            //方案修改提交按钮
            updateprogramme(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.id = this.newform.id
                data.deptid = this.newform.deptid
                data.second_id = this.newform.second_id
                data.projectName = this.newform.projectName
                data.time = this.newform.time
                data.state = this.newform.state
                data.createTime = this.newform.createTime
                
                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    if(!item.projectName){
                        _this.$message({
                            message: "方案名称不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.time){
                        _this.$message({
                            message: "年份不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'project/updateProject.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改方案成功',
                            type:'success'
                        })
                        _this.dialogVisible2 = false
                        _this.$options.methods.reloadTable.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("修改失败,请重新修改");
                });
            },
            openDetails(index,row){
                let prodetailsData = {};
                prodetailsData.submitData = {"id": row.id};
                this.$store.state.prodetailsData = prodetailsData;
                this.$router.push({ path: '/programmeDetails' });
            },
            handledeletes(){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = this.idArr.id
                idArr.shift(0)
                
                if(idArr.id){
                    _this.$confirm('确认删除吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        axios({
                            method: 'post',
                            url:  _this.$store.state.defaultHttp+ 'project/deleteProject.do?cId='+_this.$store.state.iscId,
                            data:qs.stringify(idArr),
                        }).then(function(res){
                            if(res.data.code && res.data.code == 200) {
                                _this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                _this.$options.methods.reloadTable.bind(_this)(true);
                            } else if(res.data.msg && res.data.msg == 'error'){//删除方案
                                _this.$message({
                                    message: '对不起，您没有该权限，请联系管理员开通',
                                    type: 'error'
                                })
                            }else {
                                _this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(function(err){
                            _this.$message.error("删除失败,请重新删除");
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消删除'
                        });       
                    });
                }else{
                    _this.$message({
                        type: 'error',
                        message: '请先选择要删除的方案'
                    }); 
                }
                
            },
            handledelete(index,row){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.id = row.id

                _this.$confirm('确认删除 ['+ row.projectName +'] 吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'project/deleteProject.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        } else if(res.data.msg && res.data.msg == 'error'){//删除方案
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        }else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新删除");
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除[' + row.projectName + ']'
                    });       
                });
            },
            changeNum(e){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.paramList.id
                data.secondid = this.paramList.secondid
                data.clueDay = this.paramList.clueDay
                data.clueNum = this.paramList.clueNum
                data.customerDay = this.paramList.customerDay
                data.customerNum = this.paramList.customerNum
                data.opportunityNum = this.paramList.opportunityNum

                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'restrictiveConditions/updateRestrictiveConditionsById.do?cId='+_this.$store.state.iscId+'&pId='+_this.$store.state.ispId,
                    data:qs.stringify(data),
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            type: 'success',
                            message: '修改成功'
                        });  
                    }else if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.$message({
                            message: res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
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
                        _this.$options.methods.loadData.bind(_this)(true);
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            changeYear(e){
                this.goalsyear = e
                this.$options.methods.loadGoals.bind(this)()
            },
            handleEdit(index,row){
                this.goalsForm.id = row.id
                this.goalsForm.pId = row.pId
                this.goalsForm.private_employee = row.private_employee
                this.goalsForm.month01 = row.month01
                this.goalsForm.month02 = row.month02
                this.goalsForm.month03 = row.month03
                this.goalsForm.month04 = row.month04
                this.goalsForm.month05 = row.month05
                this.goalsForm.month06 = row.month06
                this.goalsForm.month07 = row.month07
                this.goalsForm.month08 = row.month08
                this.goalsForm.month09 = row.month09
                this.goalsForm.month10 = row.month10
                this.goalsForm.month11 = row.month11
                this.goalsForm.month12= row.month12
                this.dialogVisible3 = true
            },
            updategoals(){
                const _this = this
                let qs = require('querystring')
                let data = this.goalsForm

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'contractMoneyProject/updateContractMoneyProject.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message: '编辑成功',
                            type: 'success'
                        })
                        _this.dialogVisible3 = false
                        _this.$options.methods.loadGoals.bind(_this)()
                    }else{
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            tabClick(e){
                // console.log(e)
                if(e.index == 0){
                    this.$options.methods.loadGoals.bind(this)()
                }else if(e.index == 1){
                    this.$options.methods.reloadTable.bind(this)()
                }else if(e.index == 2){
                    this.$options.methods.reloadNum.bind(this)()
                }
            },
            search() {
                this.$options.methods.reloadTable.bind(this)(true);
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
    .dialogform .el-form-item{
        width: 90%;
    }
    .dialogform .el-form-item .el-input{
        width: 100%;
    }
    .param_c{
        line-height: 50px;
        padding-left: 20px;
        font-size: 14px;
    }
    .inputnum{
        width: 75px;
    }
    .inputnum .el-input__inner{
        text-align: center;
        color: #409EFF;
        font-weight: bold
    }
    .entry_name{
        width: 100%;
        line-height: 50px;
        text-align: center;
    }
</style>
