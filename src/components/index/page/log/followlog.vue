<template>
    <div>
        <div class="radioList">
            <el-radio-group v-model="searchList.label">
                <span class="nameList">数据授权：</span>
                <el-radio v-for="item in pIdData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.type">
                <span class="nameList">模块：</span>
                <el-radio v-for="item in moduleData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.example">
                <span class="nameList">跟进时间：</span>
                <el-radio v-for="item in timeData" :key="item.label" :label="item.label" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
            <el-radio-group v-model="searchList.keyType">
                <span class="nameList">跟进类型：</span>
                <el-radio :label="nullvalue">全部</el-radio>
                <el-radio v-for="item in typeData" :key="item.label" :label="item.value" @change="search()">{{item.value}}</el-radio>
            </el-radio-group>
        </div>
        <div class="searchList" style="width:100%;" v-if="searchList.label == 0">
            <span class="nameList">机构：</span>
            <el-select v-model="searchList.mechanism" placeholder="请选择"  @change="search">
                <el-option v-for="item in mechanismData" :key="item.deptid" :label="item.deptname" :value="item.deptid"></el-option>
            </el-select>
            <el-button icon="el-icon-circle-close-outline" style="margin-left:55px;background:rgb(52, 63, 83);color:#ffffff;" size="mini" @click="reset()">清空</el-button>
        </div>
        <div class="radioList" v-if="searchList.label == 0">
            <el-radio-group v-model="searchList.department">
                <el-radio v-for="item in deptnameData" :key="item.deptid" :label="item.deptid" @change="search">{{item.deptname}}</el-radio>
            </el-radio-group>
        </div>
        <div class="radioList" v-if="searchList.label == 0">
            <el-radio-group v-model="searchList.user">
                <el-radio v-for="item in userData" :key="item.private_id" :label="item.private_id" @change="search">{{item.private_employee}}</el-radio>
            </el-radio-group>
            <div style="width:100%;height:20px"></div>
        </div>
        <div class="folog_c">
            <ul class="followrecord" v-for="(item) in followList" :key="item.followId">
                <li class="recordicon">
                    <img :src="item.imgUrl" class="detail_portrait" :alt="item.private_employee" :title="item.private_employee" />
                </li>
                <li class="verticalline"></li>
                <li class="recordcontent">
                    <div class="left_more">
                        <p>
                            <span class="de_span_2">{{item.contacts[0].name}}</span>
                            <span class="de_span_1">&nbsp;|&nbsp;</span>
                            <span class="de_span_1">{{item.createTime}}</span>
                            <span v-if="item.contactTime" class="de_span_1">&nbsp;&nbsp;--&nbsp;&nbsp;</span>
                            <span class="de_span_1">{{item.contactTime}}</span>
                            &nbsp;&nbsp;
                            <span class="de_span_2">{{item.state}}</span>
                            &nbsp;&nbsp;
                            <span class="de_span_3">&nbsp;&nbsp;{{item.followType}}&nbsp;&nbsp;</span>
                            &nbsp;&nbsp;
                            <span class="de_span_4" @click="openfollow(item)">{{item.poolname}}</span>
                        </p>
                        <div style="margin-top:15px;margin-bottom:15px;" v-html="item.followContent"></div>
                        <div class="imgbox_two" v-if="item.imgName">
                            <img :src="item.picture_detail" alt="图片" width="80" height="80" @click="showImg($event,item)">
                        </div>
                        <div v-if="item.enclosureName">
                            <a :href="item.enclosureUrl" download>{{item.enclosureOldName}}</a>
                        </div>
                        
                        <p class="de_span_1">{{item.inputType}}</p>

                        <el-dialog :visible.sync="dialogVisible2">
                            <img width="100%" :src="dialogImageUrl2" alt="">
                        </el-dialog>
                    </div>
                </li>
            </ul>
        </div>
        <div class="block numberPage">
            <el-pagination
                @size-change="SizeChange"
                @current-change="CurrentChange"
                :current-page="page"
                :page-sizes="[50, 100, 200]"
                :page-size="50"
                layout="total, sizes, prev, pager, next, jumper"
                :total="listNumber">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'
    import bus from '../../bus'

    export default {
        name:'followlog',
        store,
        data(){
            return{
                followList:[],
                listNumber:0,

                msg:'followlog',
                searchList:{
                    type:'',
                    label:1,
                    example:'',
                    keyType:null,
                    mechanism:'',
                    department:'',
                    user:'',
                },
                nullvalue:null,
                page:1,
                limit:50,

                pIdData:[
                    {label:0,value:'全部'},
                    {label:1,value:'我的'},
                    {label:2,value:'部门'},
                    {label:3,value:'机构'},
                ],
                moduleData:[
                    {label:'',value:'全部'},
                    {label:1,value:'线索'},
                    {label:2,value:'客户'},
                ],
                timeData:[
                    {label:'',value:'全部'},
                    {label:1,value:'今天'},
                    {label:2,value:'昨天'},
                    {label:3,value:'本周'},
                    {label:4,value:'本月'},
                    {label:5,value:'上月'},
                ],
                typeData:[
                    {label:1,value:'电话'},
                    {label:2,value:'QQ'},
                    {label:3,value:'微信'},
                    {label:4,value:'邮箱'},
                    {label:5,value:'拜访'},
                ],
                mechanismData:[],
                deptnameData:[],
                userData:[],

                dialogVisible2:false,
                dialogImageUrl2:null,

                customer_id:null,

                cusfollow:false,
            }
        },
        mounted(){
            this.loadmechanism()
            this.loadData()
        },
        activated(){
            this.loadData()
        },
        methods:{
            loadmechanism(){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'dept/selectAllMechanism.do?cId='+_this.$store.state.iscId
                }).then(function(res){
                    _this.mechanismData = res.data.map.success
                }).catch(function(err){
                    // console.log(err);
                });
            },
            loadData(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                if(this.searchList.label == 0 ){
                    data.dept = this.searchList.mechanism
                    data.second = this.searchList.department
                    data.id = this.searchList.user
                }else if(this.searchList.label == 1){
                    data.pId = _this.$store.state.ispId
                }else if(this.searchList.label == 2){
                    data.secondid = _this.$store.state.deptid
                }else if(this.searchList.label == 3){
                    data.deptid = _this.$store.state.insid
                }
                data.type = this.searchList.type
                data.example = this.searchList.example
                data.keyType = this.searchList.keyType
                data.page = this.page;
                data.limit = this.limit;

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'selectFollowReportForm.do?cId='+_this.$store.state.iscId,
                    data: qs.stringify(data),
                }).then(function(res){
                    let data = res.data.map.success
                    data.forEach(el => {
                        if(el.userImagName){
                            el.imgUrl = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.userImagName
                        }
                        if(!el.userImagName || el.userImagName == null){
                            el.imgUrl = _this.$store.state.systemHttp + '/upload/staticImg/avatar.jpg'
                        }
                        if(el.imgName && el.imgName !== null){
                            el.picture_detail = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.imgName
                        }
                        if(el.enclosureName && el.enclosureName !== null){
                            el.enclosureUrl = _this.$store.state.systemHttp + '/upload/'+_this.$store.state.iscId+'/'+el.enclosureName
                        }

                        el.followContent = el.followContent.replace(/\n/g,'<br/>')
                    });
                    _this.followList = data
                    _this.listNumber = res.data.count
                }).catch(function(err){
                    // console.log(err);
                });
            },

            openfollow(val){
                const _this = this
                this.$store.state.customfollowId = {}
                if(val.customerpool_id){
                    this.$store.state.customfollowId = {
                        customerpool_id : val.customerpool_id,
                        submitUrl : _this.$store.state.defaultHttp+'customerpool/getFollowStaffAndpool.do?cId='+_this.$store.state.iscId
                    }
                }else if(val.customertwo_id){
                    this.$store.state.customfollowId = {
                        customertwoId : val.customertwo_id,
                        submitUrl : _this.$store.state.defaultHttp+'getFollowStaff.do?cId='+_this.$store.state.iscId
                    }
                }
                this.cusfollow = true;
                bus.$emit('cusfollow', this.cusfollow)
            },
            
            showImg(e,val){
                this.dialogImageUrl2 = this.$store.state.systemHttp + '/upload/'+this.$store.state.iscId+'/'+val.imgName
                this.dialogVisible2 = true
            },
            loaddeptList(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.deptid = this.searchList.mechanism

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'dept/getChildrenByMechanism.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let data = res.data.map.success
                    _this.deptnameData = [{deptid:'',deptname:'全部'}]
                    data.forEach(el => {
                        _this.deptnameData.push({deptid:el.deptid,deptname:el.deptname})
                    });
                }).catch(function(err){
                    // console.log(err);
                });
            },
            
            loadUser(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.deptid = this.searchList.department
                data.page = 1
                data.limit = 100000

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'getPrivateUserAll.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    let data = res.data.map.success
                    _this.userData = [{private_id:'',private_employee:'全部'}]
                    data.forEach(el => {
                        _this.userData.push({private_id:el.private_id,private_employee:el.private_employee})
                    });
                }).catch(function(err){
                    // console.log(err);
                });
            },
            search(){
                const _this = this
                if(!this.searchList.department && this.searchList.mechanism){
                    _this.$options.methods.loaddeptList.bind(_this)()
                }else if(this.searchList.department && this.searchList.mechanism){
                    _this.$options.methods.loadUser.bind(_this)()
                }
                _this.$options.methods.loadData.bind(_this)()
            },
            SizeChange(val){
                const _this = this
                this.limit = val
                _this.$options.methods.loadData.bind(_this)()
            },
            CurrentChange(val){
                const _this = this
                this.page = val
                _this.$options.methods.loadData.bind(_this)()
            }
        },
    }
</script>

<style>
    .folog_c{
        margin: 20px;
    }
</style>
