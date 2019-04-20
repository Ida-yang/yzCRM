<template>
    <!-- 用户 -->
    <div class="contentall">
        <div class="otherleftcontent">
            <el-tree
                node-key="deptid"
                highlight-current
                default-expand-all
                :data="datalist"
                :props="defaultProps"
                :expand-on-click-node="false"
                @node-click="handleNodeClick">
            </el-tree>
        </div>
        <div class="centercontent"></div>
        <div class="otherightcontent">
            <div class="searchList" style="width:100%;">
                <el-input v-model="searchList.searchName" placeholder="请输入用户名称" style="width:300px;" @keyup.enter.native="search"></el-input>
                &nbsp;&nbsp;
                <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
            </div>
            <div class="entry">
                <el-button class="btn" size="mini" @click="handlesynchros()">同步</el-button>
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
                style="width:100%;text-align:center"
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
                    header-align="left"
                    align="left"
                    min-width="80"
                    label="头像"
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
                <div v-for="(item,index) in filterList" :key="index" >
                    <el-table-column
                        prop="private_number"
                        fixed
                        v-if="item.prop == 'private_number' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="160"
                        label="编号"
                        sortable>
                        <template slot-scope="scope">
                            <span v-if="scope.row.private_isAdmin == '是'" style="color:blue">{{scope.row.private_number}}</span>
                            <span v-if="scope.row.private_isAdmin == '否'">{{scope.row.private_number}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="private_employee"
                        fixed
                        v-if="item.prop == 'private_employee' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="90"
                        label="用户"
                        sortable>
                        <!-- <template slot-scope="scope">
                            <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                                {{scope.row.private_employee}}
                            </div>
                        </template> -->
                    </el-table-column>
                    <el-table-column
                        prop="private_username"
                        v-if="item.prop == 'private_username' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="120"
                        label="登录账号"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        v-if="item.prop == 'name' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="100"
                        label="岗位"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="private_phone"
                        v-if="item.prop == 'private_phone' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="120"
                        label="手机号"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="private_email"
                        show-overflow-tooltip
                        v-if="item.prop == 'private_email' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="130"
                        label="邮箱"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="deptname"
                        show-overflow-tooltip
                        v-if="item.prop == 'deptname' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="100"
                        label="部门"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="parentname"
                        v-if="item.prop == 'parentname' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="180"
                        label="机构"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        v-if="item.prop == 'createTime' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="150"
                        label="创建时间"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="isSynchronization"
                        v-if="item.prop == 'createTime' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="110"
                        label="是否同步"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="private_state"
                        v-if="item.prop == 'createTime' && item.state == 1"
                        header-align="left"
                        align="left"
                        min-width="80"
                        label="状态"
                        sortable>
                    </el-table-column>
                </div>
                <el-table-column label="操作"
                    fixed="right"
                    width="140"
                    header-align="left"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handlesynchro(scope.$index, scope.row)">同步</el-button>
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
        <el-dialog
            title="添加用户"
            :visible.sync="dialogVisible"
            width="40%">
                <el-form ref="newform" :model="newform" label-width="80px" :rules="rules">
                    <el-form-item prop="second_id" label="所属部门">
                        <el-input v-model="newform.secondname" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item prop="imgUrl" label="头像">
                        <el-upload class="avatar-uploader portrait" :action="doUpload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeUploadimg">
                            <img v-if="imgfile" :src="imgfile" class="avatar" width="100" height="100">
                            <i v-else class="el-icon-plus avatar-uploader-icon portrait_add"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item prop="private_phone" label="手机号码">
                        <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.private_phone" placeholder="请输入用户手机号码"></el-input>
                    </el-form-item>
                    <el-form-item prop="private_password" label="密码">
                        <el-input type="password" v-model="newform.private_password" placeholder="请输入用户密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="private_passwords" label="确认密码">
                        <el-input type="password" v-model="newform.private_passwords" placeholder="请再次输入用户密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="role_id" label="角色">
                        <el-select v-model="newform.role_id" placeholder="请选择用户角色" style="width:100%;">
                            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="private_employee" label="用户名称">
                        <el-input v-model="newform.private_employee" placeholder="请输入用户名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="private_state" label="用户状态">
                        <el-radio v-model="newform.private_state" label="启用">启用</el-radio>
                        <el-radio v-model="newform.private_state" label="禁止">禁止</el-radio>
                    </el-form-item>
                    <el-form-item prop="private_email" label="邮箱">
                        <el-input type="email" v-model="newform.private_email" placeholder="请输入用户邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="private_QQ" label="QQ">
                        <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.private_QQ" placeholder="请输入用户QQ"></el-input>
                    </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="adduser()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改用户"
            :visible.sync="dialogVisible2"
            width="40%">
            <el-form ref="newform" :model="newform" :rules="rules" label-width="80px">
                <el-form-item prop="second_id" label="所属部门">
                    <el-input v-model="newform.secondname" :disabled="true"></el-input>
                </el-form-item>
                    <el-form-item prop="imgUrl" label="头像">
                        <el-upload class="avatar-uploader portrait" :action="doUpload" :on-success="handleAvatarSuccess" :show-file-list="false" :before-upload="beforeUploadimg">
                            <img v-if="imgfile" :src="imgfile" class="avatar" width="100" height="100">
                            <i v-else class="el-icon-plus avatar-uploader-icon portrait_add"></i>
                        </el-upload>
                    </el-form-item>
                <el-form-item prop="private_phone" label="手机号码">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.private_phone" :disabled="true" placeholder="请输入用户手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="private_password" label="密码">
                    <el-input type="password" v-model="newform.private_password" placeholder="请输入用户密码"></el-input>
                </el-form-item>
                <el-form-item prop="private_passwords" label="确认密码">
                    <el-input type="password" v-model="newform.private_passwords" placeholder="请再次输入用户密码"></el-input>
                </el-form-item>
                <el-form-item prop="role_id" label="角色">
                    <el-select v-model="newform.role_id" placeholder="请选择用户角色" style="width:100%;">
                        <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="private_employee" label="用户名称">
                    <el-input v-model="newform.private_employee" placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item prop="private_state" label="用户状态">
                    <el-radio v-model="newform.private_state" label="启用">启用</el-radio>
                    <el-radio v-model="newform.private_state" label="禁止">禁止</el-radio>
                </el-form-item>
                <el-form-item prop="private_email" label="邮箱">
                    <el-input type="email" v-model="newform.private_email" placeholder="请输入用户邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="private_QQ" label="QQ">
                    <el-input onkeyup = "value=value.replace(/[^\d]/g,'')" v-model="newform.private_QQ" placeholder="请输入用户QQ"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="updateuser()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'user',
        props:{
            totalNum:Number,
        },
        store,
        computed: {
            tableData(){
                return store.state.userList;
            },
            tableNumber(){
               return store.state.userListnumber;     
            },
        },
        data(){
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.newform.private_password) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
            return {
                datalist:[],
                defaultProps:{
                    label:'deptname',
                    children:'next',
                },
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
                // checklist:['编号','用户','登录账号','角色','手机号','邮箱','部门','职位'],
                filterList:null,
                checklist:null,

                idArr:{
                    private_id:null,
                },
                roleList:null,
                clickdata:null,
                showbianhao:true,
                showmingcheng:true,
                showzhanghao:true,
                showjuese:true,
                showshouji:true,
                showyouxiang:true,
                showbumen:true,
                showzhiwei:true,
                showfuze:true,
                showzhuangtai:true,
                showlaiyuan:true,
                page:1,
                limit:20,
                dialogVisible:false,
                dialogVisible2:false,
                rules: {
                    role_id : [{ required: true, message: '用户角色不能为空', trigger: 'blur' },],
                    private_employee : [{ required: true, message: '用户名称不能为空', trigger: 'blur' },],
                    private_phone : [{ required: true, max: 11, min: 11, message: '请输入11位手机号码', trigger: 'blur' }],
                    private_password : [{ required: true, message: '密码不能为空', trigger: 'blur' },],
                    private_passwords : [{ required: true, validator: validatePass, trigger: 'blur' },],
                    private_state : [{ required: true, message: '请选择用户状态', trigger: 'blur' },],
                },

                doUpload:this.$store.state.defaultHttp + 'previewAvatar.do?cId=' + this.$store.state.iscId
            }
        },
        beforeCreate(){
            const _this = this
            axios({
                method: 'get',
                url: _this.$store.state.defaultHttp+'dept/getDeptNodeTree.do?cId='+_this.$store.state.iscId,
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
            this.loadData()
        },
        methods:{
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
                    _this.$store.state.userList = res.data.map.success
                    _this.$store.state.userListnumber = res.data.count
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
                this.newform.second_id = data.deptid
                this.newform.secondname = data.deptname
                this.$options.methods.reloadTable.bind(this)(true);
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
            handleAvatarSuccess(res, file) {
                this.imgfile = URL.createObjectURL(file.raw);
            },
            beforeUploadimg(file) {
                this.newform.imgUrl = file;
                const extension = file.name.split('.')[1] === 'jpg'
                const extension2 = file.name.split('.')[1] === 'png'
                const extension3 = file.name.split('.')[1] === 'jpeg'
                const isLt500k = file.size / 1024 / 1024 < 0.5
                if (!extension && !extension2 && !extension3) {
                    this.$message.warning('头像只能是 jpg、png、jpeg格式!')
                    return
                }
                if (!isLt500k) {
                    this.$message.warning('头像大小不能超过 500KB!')
                    return
                }
                this.imgName = file.name
                // return false;
            },
            //用户添加
            handleAdd(){
                const _this = this
                this.newform.role_id = null
                this.newform.private_phone = null
                this.newform.private_password = null
                this.newform.private_passwords = null
                this.newform.private_employee = null
                this.newform.private_state = null
                this.newform.private_email = ''
                this.newform.private_QQ = ''
                this.newform.file = ''

                if(!this.clickdata){
                    _this.$message({
                        message:'请先选择部门，再添加用户',
                        type:'info'
                    })
                }else{
                    axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+'userJurisdiction/insert.do',//新增用户
                    }).then(function(res){
                        if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message:'对不起，您没有该权限，请联系管理员开通',
                                type:'error'
                            })
                        }else{
                            _this.dialogVisible = true
                        }
                    }).catch(function(err){
                        // console.log(err);
                    });
                }
            },
            //用户添加提交按钮
            adduser(){
                const _this = this;
                let qs = require('querystring')
                let data = new FormData()
                data.append("second_id", this.newform.second_id);
                data.append("role_id", this.newform.role_id);
                data.append("private_phone", this.newform.private_phone);
                data.append("private_password", this.newform.private_password);
                data.append("private_employee", this.newform.private_employee);
                data.append("private_state", this.newform.private_state);
                data.append("private_email", this.newform.private_email);
                data.append("private_QQ", this.newform.private_QQ);
                data.append("file", this.newform.imgUrl, this.imgName);

                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    const myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
                    if(!item.private_state){
                        _this.$message({
                            message: "请选择用户状态",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.private_employee){
                        _this.$message({
                            message: "用户姓名不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.role_id){
                        _this.$message({
                            message: "用户角色不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.private_passwords !== item.private_password){
                        _this.$message({
                            message: "两次输入的密码不一致",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.private_passwords){
                        _this.$message({
                            message: "确认密码不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.private_password){
                        _this.$message({
                            message: "用户密码不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!myreg.test(item.private_phone)){
                        _this.$message({
                            message: "请输入11位手机号码",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.private_phone){
                        _this.$message({
                            message: "用户手机号码不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'insertPrivateUser.do?cId='+_this.$store.state.iscId,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data:data
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'添加用户成功',
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
            },
            //用户修改
            handleEdit(index,row){
                const _this = this
                let data = {}

                axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+'userJurisdiction/update.do',//编辑用户
                    }).then(function(res){
                        if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message:'对不起，您没有该权限，请联系管理员开通',
                                type:'error'
                            })
                        }else{
                            data.deptid = row.second_id
                            _this.newform.private_id = row.private_id
                            _this.newform.second_id = row.second_id
                            _this.newform.secondname = row.deptname
                            _this.newform.role_id = row.role_id
                            _this.newform.private_phone = row.private_phone
                            _this.newform.private_password = row.private_password
                            _this.newform.private_passwords = row.private_password
                            _this.newform.private_employee = row.private_employee
                            _this.newform.private_state = row.private_state
                            _this.newform.private_email = row.private_email
                            _this.newform.private_QQ = row.private_QQ
                            _this.newform.imgUrl = row.imgUrl
                            if(row.imgUrl){
                                _this.imgfile = '/upload/'+_this.$store.state.iscId+'/'+row.imgUrl
                            }
                            
                            _this.dialogVisible2 = true
                            axios({
                                method: 'post',
                                url: _this.$store.state.defaultHttp+'role/selectRole.do?cId='+_this.$store.state.iscId,
                                data:qs.stringify(data)
                            }).then(function(res){
                                _this.roleList = res.data
                            }).catch(function(err){
                                _this.$message.error("权限加载失败,请重新打开页面");
                            });
                        }
                    }).catch(function(err){
                        // console.log(err);
                    });
                
            },
            //用户修改提交按钮
            updateuser(){
                const _this = this;
                let qs = require('querystring')
                let data = new FormData()
                data.append("second_id", this.newform.second_id);
                data.append("private_id", this.newform.private_id);
                data.append("role_id", this.newform.role_id);
                data.append("private_phone", this.newform.private_phone);
                data.append("private_password", this.newform.private_password);
                data.append("private_employee", this.newform.private_employee);
                data.append("private_state", this.newform.private_state);
                data.append("private_email", this.newform.private_email);
                data.append("private_QQ", this.newform.private_QQ);
                data.append("file", this.newform.imgUrl, this.imgName);
                
                let arr = [this.newform]
                let flag = false;
                arr.forEach(item => {
                    if(!item.private_state){
                        _this.$message({
                            message: "请选择用户状态",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.private_employee){
                        _this.$message({
                            message: "用户姓名不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.role_id){
                        _this.$message({
                            message: "用户角色不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(item.private_passwords !== item.private_password){
                        _this.$message({
                            message: "两次输入的密码不一致",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.private_passwords){
                        _this.$message({
                            message: "确认密码不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                    if(!item.private_password){
                        _this.$message({
                            message: "用户密码不能为空",
                            type: 'error'
                        });
                        flag = true;
                    }
                });
                if(flag) return
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'updatePrivate.do?cId='+_this.$store.state.iscId,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data:data
                }).then(function(res){
                    if(res.data.code && res.data.code == 200){
                        _this.$message({
                            message:'修改用户成功',
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
            //同步用户
            handlesynchros(){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.privateId = this.idArr.private_id

                if(idArr.privateId){
                    _this.$confirm('确认同步到云服务器吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        axios({
                            method: 'post',
                            url:  _this.$store.state.defaultHttp+ 'tbPrivateToPublicUser.do?cId='+_this.$store.state.iscId,
                            data:qs.stringify(idArr),
                        }).then(function(res){
                            if(res.data.code && res.data.code == 200) {
                                _this.$message({
                                    message: '同步成功',
                                    type: 'success'
                                });
                                _this.$options.methods.reloadTable.bind(_this)(true);
                            }else if(res.data.msg && res.data.msg == 'error'){//同步用户
                                _this.$message({
                                    message: '对不起，您没有该权限，请联系管理员开通',
                                    type: 'error'
                                })
                            } else {
                                _this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(function(err){
                            _this.$message.error("同步失败,请重新同步");
                        });
                    });
                }else{
                    _this.$message({
                        type: 'error',
                        message: '请先选择要同步的用户'
                    }); 
                }
                
            },
            handlesynchro(index,row){
                const _this = this;
                let qs =require('querystring')
                let idArr = [];
                idArr.privateId = row.private_id

                _this.$confirm('确认同步 ['+ row.private_employee +'] 到云服务器吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'tbPrivateToPublicUser.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == 200) {
                            _this.$message({
                                message: '同步成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){//同步用户
                            _this.$message({
                                message: '对不起，您没有该权限，请联系管理员开通',
                                type: 'error'
                            })
                        } else {
                            _this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(err){
                        _this.$message.error("同步失败,请重新同步");
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
                        _this.$options.methods.loadData.bind(_this)(true);
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
