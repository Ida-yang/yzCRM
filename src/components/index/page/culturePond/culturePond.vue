<template>
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in pIdData" :key="item.index" :label="item.index" @change="search()">{{item.name}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList" style="width:100%;">
            <span class="nameList">公司名称：</span>
            <el-input placeholder="请输入公司名称" v-model="searchList.searchName" style="margin-left:20px;width:400px;" @keyup.enter.native="search"></el-input>
            &nbsp;&nbsp;
            <el-button icon="el-icon-search" type="primary" size="mini" @click="search()">查询</el-button>
        </div>
        <div class="entry">
            <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            <el-button class="btn info-btn" size="mini" @click="handleDeletes()">删除</el-button>
            <el-button class="btn info-btn" size="mini" @click="showsend()">发送短信</el-button>
            <el-button class="btn info-btn" size="mini" @click="showemail()">发送邮件</el-button>

            <div class="totalnum_head">共 <span class="bold_span">{{tableNumber}}</span> 条</div>

            <el-popover placement="left" width="150" trigger="click">
                <div class="download_c">
                    <p class="download_h">首次导入请下载模板</p>
                    <div class="download_down">
                        <el-button class="info-btn" type="mini"><a :href="downloadUrl" download>下载模板</a></el-button>
                    </div>
                    <el-upload class="upload-demo" ref="upload" :multiple="true" action="doUpload" :limit="1" :before-upload="beforeUpload">
                        <el-button slot="trigger" size="mini" class="info-btn">导入excel</el-button>
                    </el-upload>
                </div>
                <el-button slot="reference" class="info-btn screen_upload" type="mini">导入</el-button>
            </el-popover>

            <el-popover placement="bottom" width="100" trigger="click">
                <el-checkbox-group class="checklist" v-model="checklist" style="max-height:600px;overflow-y:overlay;overflow-x:hidden">
                    <el-checkbox class="checkone" v-for="item in filterList" :key="item.id" :label="item.name" :value="item.state" @change="hangleChange($event,item)"></el-checkbox>
                </el-checkbox-group>
                <el-button slot="reference" icon="el-icon-more" class="info-btn screen" type="mini"></el-button>
            </el-popover>
        </div>
        <el-table :data="tableData" border stripe style="width:100%" @selection-change="selectInfo">
            <el-table-column fixed header-align="center" align="center" type="selection" width="45" prop="id" @selection-change="selectInfo" sortable />
            <div v-for="(item,index) in filterList" :key="index">
                <el-table-column label="联系人" prop="contacts" v-if="item.prop == 'contacts' && item.state == 1" fixed min-width="100" sortable />
                <el-table-column label="公司名称" prop="name" v-if="item.prop == 'name' && item.state == 1" fixed min-width="200" sortable>
                    <template slot-scope="scope">
                        <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                            {{scope.row.name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="手机" prop="phone" v-if="item.prop == 'phone' && item.state == 1" min-width="110" sortable />
                <el-table-column label="邮箱" prop="email" v-if="item.prop == 'email' && item.state == 1" min-width="130" sortable />
                <el-table-column label="QQ" prop="qq" v-if="item.prop == 'qq' && item.state == 1" min-width="110" sortable />
                <el-table-column label="固话" prop="telephone" v-if="item.prop == 'telephone' && item.state == 1" min-width="110" sortable />
                <el-table-column label="微博" prop="microblog" v-if="item.prop == 'microblog' && item.state == 1" min-width="110" sortable />
                <el-table-column label="旺旺" prop="wangwang" v-if="item.prop == 'wangwang' && item.state == 1" min-width="110" sortable />
                <el-table-column label="地址" prop="address" v-if="item.prop == 'address' && item.state == 1" min-width="180" show-overflow-tooltip sortable />
                <el-table-column label="职位" prop="position" v-if="item.prop == 'position' && item.state == 1" min-width="100" sortable />
                <el-table-column label="性别" prop="sex" v-if="item.prop == 'sex' && item.state == 1" min-width="90" sortable />
                <el-table-column label="生日" prop="birthday" v-if="item.prop == 'birthday' && item.state == 1" min-width="110" sortable />
                <el-table-column label="省-市-区" prop="countryid" v-if="item.prop == 'provincialAndUrbanAreas' && item.state == 1" min-width="150" sortable>
                    <template slot-scope="scope">
                        {{scope.row.country}}-{{scope.row.city}}-{{scope.row.area}}
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" v-if="item.prop == 'createTime' && item.state == 1" min-width="150" sortable />
                <el-table-column label="负责人" prop="private_employee" v-if="item.prop == 'pId' && item.state == 1" min-width="100" sortable />
                <el-table-column label="部门" prop="deptname" v-if="item.prop == 'secondid' && item.state == 1" min-width="110" sortable />
                <el-table-column label="机构" prop="parentname" v-if="item.prop == 'deptid' && item.state == 1" min-width="110" show-overflow-tooltip sortable />
                <el-table-column label="是否开通微信" prop="weChat" v-if="item.prop == 'weChat' && item.state == 1" min-width="130" sortable />
                <el-table-column label="是否开通支付宝" prop="alipay" v-if="item.prop == 'alipay' && item.state == 1" min-width="145" sortable />
                <el-table-column label="短信营销次数" prop="msg_number_of_marketing" v-if="item.prop == 'msg_number_of_marketing' && item.state == 1" min-width="130" sortable />
                <el-table-column label="短信打开次数" prop="msg_open_num" v-if="item.prop == 'msg_open_num' && item.state == 1" min-width="130" sortable />
                <el-table-column label="邮件营销次数" prop="email_number_of_marketing" v-if="item.prop == 'email_number_of_marketing' && item.state == 1" min-width="130" sortable />
                <el-table-column label="邮件打开次数" prop="email_open_num" v-if="item.prop == 'email_open_num' && item.state == 1" min-width="130" sortable />
                <el-table-column label="标签" prop="label" v-if="item.prop == 'label' && item.state == 1" min-width="110" sortable />
            </div>
            <el-table-column label="操作" fixed="right" width="150" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

        <el-dialog title="发送短信" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules" style="padding-right:30px">
                <el-form-item prop="culnum" label="培育池选择量">
                    <el-input v-model="newform.culnum" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="templateId" label="短信模板">
                    <el-select v-model="newform.templateId" placeholder="请选择" style="width:100%" @change="changetemplate">
                        <el-option v-for="item in templateList" :key="item.templateId" :label="item.title" :value="item.templateId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="smscontent" label="短信内容">
                    <el-input type="textarea" rows="5" v-model="newform.smscontent"  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="explain" label="说明">
                    <el-input type="textarea" rows="5" v-model="newform.explain" placeholder="请输入短信说明"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendSMS()">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="发送邮件" :visible.sync="dialogVisible2" :close-on-click-modal="false" width="40%">
            <el-form ref="newform" :model="newform" label-width="110px" :rules="rules" style="padding-right:30px">
                <el-form-item prop="culnum" label="培育池选择量">
                    <el-input v-model="newform.culnum" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="templateId" label="邮件模板ID">
                    <el-input v-model="newform.templateId" placeholder="例如：rtqfM2"></el-input>
                </el-form-item>
                <el-form-item prop="url" label="网址">
                    <el-input v-model="newform.url">
                        <template slot="prepend">http://</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="sendEmail()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from '../../../../store/store';
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name:'culturePond',
        store,
        computed:{
            tableData(){
                return store.state.culturePondList
            },
            tableNumber(){
                return store.state.culturePondListnumber
            },
        },
        data(){
            return{
                msg:'culturePond.vue',

                page:1,
                limit:20,
                searchList:{
                    searchName:null,
                    label:1
                },

                pIdData:[
                    {index:0,name:'全部'},
                    {index:1,name:'我的'},
                    {index:2,name:'本组'},
                    {index:3,name:'本机构'},
                ],

                idArr:[],
                SMSId:[],
                SMSnames:[],
                SMSphones:[],
                SMScontacts:[],
                SMSemails:[],

                dialogVisible:false,
                dialogVisible2:false,
                templateList:null,
                newform:{
                    templateId:null,
                    culnum:null,
                    explain:null,
                    smscontent:null,
                    url:null,
                },
                rules: {
                    templateId : [{ required: true, message: '短信模板不能为空', trigger: 'blur' },],
                },

                downloadUrl: this.$store.state.systemHttp+'upload/culture_pool_template.xls',

                filterList:null,
                checklist:null,
            }
        },
        mounted(){
            this.loadTable()
            this.reloadData()
        },
        activated(){
            this.loadTable()
        },
        methods:{
            loadTable(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                if(this.searchList.label == 0 ){
                    data.pId = null
                }else if(this.searchList.label == 1){
                    data.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    data.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    data.deptid = _this.$store.state.insid
                }
                data.searchName = this.searchList.searchName
                data.page = this.page
                data.limit = this.limit

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp + 'cultivationPool/queryForList.do?cId=' + _this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    _this.$store.state.culturePondList = res.data.map.success
                    _this.$store.state.culturePondListnumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadTemplate(){
                const _this = this;
                let qs =require('querystring')
                let data = {}
                data.type = '营销'
                data.genre = '营销类'
                data.status = '2'
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'template/selectTemplate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    _this.templateList = res.data.map.templates
                }).catch(function(err){
                    // console.log(err);
                });
            },
            //获取筛选列表
            reloadData() {
                const _this = this;
                let qs =require('querystring')
                let filterList = {}
                filterList.type = '培育池'
                let data = {}
                data.type = '培育池'
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
            openDetails(index,row){
                this.$store.state.culturePondetailData = {id:row.id}
                this.$router.push({ path: '/culturePondetail' });
            },
            selectInfo(val){
                const _this = this
                let arr = val;
                let newArr = [new Array()];
                this.SMSId = []
                this.SMSnames = []
                this.SMSphones = []
                this.SMScontacts = []
                this.SMSemails = []
                arr.forEach((item) => {
                    if(item.id != 0){
                        newArr.push(item.id)
                        _this.SMSId.push(item.id)
                        _this.SMSnames.push(item.name)
                        _this.SMSphones.push(item.phone)
                        _this.SMScontacts.push(item.contacts)
                        _this.SMSemails.push(item.email)
                    }
                });
                this.idArr = newArr;
            },
            handleAdd(){
                this.$store.state.culPondaddorUpdateData = {}
                this.$router.push({path:'/culPondaddorUpdate'})
            },
            handleEdit(index,row){
                this.$store.state.culPondaddorUpdateData = row
                this.$router.push({path:'/culPondaddorUpdate'})
            },
            handleDelete(index,row){
                const _this = this;
                let qs =require('querystring')
                let idArr = []
                idArr.ids = row.id

                _this.$confirm('是否确认删除[' + row.name + ']？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url: _this.$store.state.defaultHttp+'cultivationPool/deleteByPrimaryKey.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idArr),
                    }).then(function(res){
                        if(res.data.code && res.data.code == '200') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.loadTable.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){//删除培育池
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
                        _this.$message.error("删除失败,请重新删除");
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除【' + row.name + '】'
                    });       
                });
            },
            handleDeletes(){
                const _this = this;
                let qs =require('querystring')
                let idArr = []
                idArr.ids = this.idArr

                if(idArr.ids){
                    _this.$confirm('是否确认删除？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        axios({
                            method: 'post',
                            url:  _this.$store.state.defaultHttp+ 'cultivationPool/deleteByPrimaryKey.do?cId='+_this.$store.state.iscId,
                            data:qs.stringify(idArr),
                        }).then(function(res){
                            if(res.data.code && res.data.code == '200') {
                                _this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                _this.$options.methods.loadTable.bind(_this)(true);
                            }else if(res.data.msg && res.data.msg == 'error'){//删除培育池
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
                        }).catch((err) => {
                            _this.$message.error("删除失败,请重新删除");
                        })
                    }).catch(() => {
                        _this.$message({
                            type: 'info',
                            message: '取消删除'
                        });       
                    });
                }else{
                    _this.$message({
                        type: 'error',
                        message: '请先选择要删除的线索'
                    }); 
                }
            },
            
            beforeUpload(file){
                this.files = file;
                const extension = file.name.split('.')[1] === 'xls'
                const extension2 = file.name.split('.')[1] === 'xlsx'
                const isLt5M = file.size / 1024 / 1024 < 5
                if (!extension && !extension2) {
                    this.$message.warning('上传模板只能是 xls、xlsx格式!')
                    return
                }
                if (!isLt5M) {
                    this.$message.warning('上传模板大小不能超过 5MB!')
                    return
                }
                this.fileName = file.name;
                setTimeout(() => {
                    this.submitUpload();
                },500);
                return false; // 返回false不会自动上传
            },
            // 上传excel
            submitUpload() {
                const _this = this
                if(this.fileName == ""){
                    this.$message.warning('请选择要上传的文件！')
                    return false
                }
                let fileFormData = new FormData();
                fileFormData.append("pId", this.$store.state.ispId);
                fileFormData.append("secondid", this.$store.state.deptid);
                fileFormData.append("deptid", this.$store.state.insid);
                //fileName是键，files是值，就是要传的文件，files是要传的文件名
                fileFormData.append('files', this.files, this.fileName);
                let requestConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }
                // 执行上传excel
                axios.post(this.$store.state.defaultHttp+'cultivationPool/upload.do?cId='+this.$store.state.iscId,fileFormData, requestConfig)
                .then(res => {
                    _this.$message({
                        message: '上传成功',
                        type: 'success'
                    })
                    _this.$options.methods.loadTable.bind(_this)(true);
                }).catch((e) => {
                    _this.$message.error("excel上传失败，请重新上传");
                })
            },
            changetemplate(val){
                this.templateList.forEach(el => {
                    if(el.templateId == val){
                        this.newform.smscontent = el.content
                    }
                });
            },
            showsend(){
                const _this = this
                if(this.SMSId[0]){
                    _this.$options.methods.loadTemplate.bind(_this)()
                    _this.newform.culnum = _this.SMSId.length
                    _this.newform.templateId = ''
                    _this.newform.explain = ''
                    _this.newform.smscontent = ''
                    _this.dialogVisible = true
                }else{
                    this.$message({
                        type: 'error',
                        message: '请先选择要发送短信的培育池'
                    }); 
                }
            },
            sendSMS(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.names = this.SMSnames
                data.phones = this.SMSphones
                data.contacts = this.SMScontacts
                data.templateId = this.newform.templateId

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'message/sendMarketingMsg.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'发送成功',
                            type:'success'
                        })
                        _this.$options.methods.addSMSsended.bind(_this)()
                        _this.dialogVisible = false
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    // console.log(err);
                });
            },
            addSMSsended(){
                const _this = this
                let qs = require('querystring')
                let data2 = {}
                data2.type = '培育池'
                data2.ids = this.SMSId
                data2.names = this.SMSnames
                data2.phones = this.SMSphones
                data2.contacts = this.SMScontacts
                data2.templateId = this.newform.templateId
                data2.explain = this.newform.explain
                data2.pId = this.$store.state.ispId
                data2.secondid = this.$store.state.deptid
                data2.deptid = this.$store.state.insid

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'sendRecord/insertSendRecord.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data2)
                }).then(function(res){
                }).catch(function(err){
                });
            },

            showemail(){
                const _this = this
                if(this.SMSId[0]){
                    _this.newform.culnum = _this.SMSId.length
                    _this.newform.url = ''
                    _this.newform.templateId = ''
                    this.dialogVisible2 = true
                }else{
                    _this.$message({
                        type: 'error',
                        message: '请先选择要发送邮箱的培育池'
                    }); 
                }
            },
            sendEmail(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.names = this.SMSnames
                data.emails = this.SMSemails
                data.templateId = this.newform.templateId
                data.url = this.newform.url

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'message/mailXSend.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data)
                }).then(function(res){
                    if(res.data.code && res.data.code == '200'){
                        _this.$message({
                            message:'发送成功',
                            type:'success'
                        })
                        _this.dialogVisible2 = false
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
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
            search(){
                this.$options.methods.loadTable.bind(this)()
            },
            handleSizeChange(val){
                this.limit = val
                this.$options.methods.loadTable.bind(this)()
            },
            handleCurrentChange(val){
                this.page = val
                this.$options.methods.loadTable.bind(this)()
            },
        },
    }
</script>
