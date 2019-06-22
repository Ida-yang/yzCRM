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
        </div>
        <el-table :data="tableData" border stripe style="width:100%" @selection-change="selectInfo">
            <el-table-column fixed header-align="center" align="center" type="selection" width="45" prop="id" @selection-change="selectInfo" sortable />
            <el-table-column label="联系人" prop="contacts" fixed min-width="100" sortable />
            <el-table-column label="公司名称" prop="name" fixed min-width="200" sortable>
                <template slot-scope="scope">
                    <div @click="openDetails(scope.$index, scope.row)" class="hoverline">
                        {{scope.row.name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="手机" prop="phone" min-width="110" sortable />
            <el-table-column label="邮箱" prop="email" min-width="130" sortable />
            <el-table-column label="QQ" prop="qq" min-width="110" sortable />
            <el-table-column label="固话" prop="telephone" min-width="110" sortable />
            <el-table-column label="微博" prop="microblog" min-width="110" sortable />
            <el-table-column label="旺旺" prop="wangwang" min-width="110" sortable />
            <el-table-column label="地址" prop="address" min-width="180" show-overflow-tooltip sortable />
            <el-table-column label="职位" prop="position" min-width="100" sortable />
            <el-table-column label="性别" prop="sex" min-width="90" sortable />
            <el-table-column label="生日" prop="birthday" min-width="110" sortable />
            <el-table-column label="省-市-区" prop="countryid" min-width="150" sortable>
                <template slot-scope="scope">
                    {{scope.row.country + '-' + scope.row.city + '-' + scope.row.area}}
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime" min-width="150" sortable />
            <el-table-column label="负责人" prop="private_employee" min-width="100" sortable />
            <el-table-column label="部门" prop="deptname" min-width="110" sortable />
            <el-table-column label="机构" prop="parentname" min-width="110" show-overflow-tooltip sortable />
            <el-table-column label="是否开通微信" prop="weChat" min-width="130" sortable />
            <el-table-column label="是否开通支付宝" prop="alipay" min-width="145" sortable />
            <el-table-column label="短信营销次数" prop="msg_number_of_marketing" min-width="130" sortable />
            <el-table-column label="短信打开次数" prop="msg_open_num" min-width="130" sortable />
            <el-table-column label="邮件营销次数" prop="email_number_of_marketing" min-width="130" sortable />
            <el-table-column label="邮件打开次数" prop="email_open_num" min-width="130" sortable />
            <el-table-column label="标签" prop="label" min-width="110" sortable />
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
                    searchOption:'1',
                    label:'1'
                },

                pIdData:[
                    {index:'0',name:'全部'},
                    {index:'1',name:'我的'},
                    {index:'2',name:'本组'},
                    {index:'3',name:'本机构'},
                ],

                idArr:[],

                downloadUrl: this.$store.state.systemHttp+'upload/culture_pool_template.xls',
            }
        },
        mounted(){
            this.loadTable()
        },
        activated(){
            this.loadTable()
        },
        methods:{
            loadTable(){
                const _this = this
                let qs = require('querystring')
                let data = {}
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
            openDetails(index,row){
                this.$store.state.culturePondetailData = {id:row.id}
                this.$router.push({ path: '/culturePondetail' });
            },
            selectInfo(val){
                const _this = this
                let arr = val;
                let newArr = [new Array()];
                arr.forEach((item) => {
                    if(item.id != 0){
                        newArr.push(item.id)
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
