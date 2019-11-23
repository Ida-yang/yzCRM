<template>

    <!-- 机构部门及角色 -->
    <div class="organ_content">
        <div class="leftcontent">
            <el-tree
                node-key="deptid"
                highlight-current default-expand-all
                :data="datalist"
                :props="defaultProps"
                :expand-on-click-node="false"
                @node-click="handleNodeClick">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span><i class="el-icon-info">&nbsp;&nbsp;</i>{{ node.label }}</span>
                    <span class="operation_org">
                        <el-button type="text" size="mini" style="font-size:12px;" @click="handleappend(data)">添加/</el-button>
                        <el-button type="text" size="mini" style="font-size:12px;" @click="handleUpdate(data)">修改/</el-button>
                        <el-button type="text" size="mini" style="font-size:12px;" @click="deletedept(node,data)">删除</el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <div class="rightcontent">
            <div class="entry">
                <el-button class="btn info-btn" size="mini" @click="handleAdd()">新增</el-button>
            </div>
            <el-table :data="roleList" border stripe :max-height="maxheight" style="width:100%">
                <el-table-column header-align="center" align="center" type="selection" width="45" sortable />
                <el-table-column label="角色名称" prop="name" min-width="110" sortable />
                <el-table-column label="部门" prop="deptname" min-width="110" sortable />
                <el-table-column label="上级部门" prop="parentname" min-width="110" show-overflow-tooltip sortable />
                <el-table-column label="操作" width="150" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handledelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="添加" :visible.sync="dialogVisible" :close-on-click-modal="false" width="50%">
            <el-form ref="newform" :model="newform" label-width="80px">
                <el-form-item label="上级部门">
                    <el-input v-model="newform.parentname" :disabled="true" style="200px;"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="newform.deptname" style="200px;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="appenddept()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改" :visible.sync="dialogVisible2" :close-on-click-modal="false" width="50%">
            <el-form ref="newform" :model="newform" label-width="80px">
                <el-form-item label="上级部门">
                    <el-input v-model="newform.parentname" :disabled="true" style="200px;"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="newform.deptname" style="200px;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="updatedept()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加角色" :visible.sync="dialogVisible3" :close-on-click-modal="false" width="70%">
            <el-form ref="roleform" :model="roleform" label-width="80px">
                <el-form-item label="所属部门">
                    <el-input v-model="roleform.deptname" :disabled="true" style="200px;"></el-input>
                </el-form-item>
                <el-form-item label="角色名称">
                    <el-input v-model="roleform.name" style="200px;"></el-input>
                </el-form-item>
            </el-form>
            <el-tabs v-model="activeindex" type="card" @tab-click="checkResource">
                <el-tab-pane label="线索" name="first">
                    <el-checkbox :indeterminate="someclue" v-model="allclue" @change="CheckAllclues">全选</el-checkbox>
                    <div v-for="(item,index) in cluesData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type2" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type3" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="客户" name="second">
                    <el-checkbox :indeterminate="somecuestom" v-model="allcuestom" @change="CheckAllcuestoms">全选</el-checkbox>
                    <div v-for="(item,index) in cuestomsData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type2" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type3" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="联系人" name="third">
                    <el-checkbox :indeterminate="somecontact" v-model="allcontact" @change="CheckAllcontacts">全选</el-checkbox>
                    <div v-for="(item,index) in contactsData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="商机" name="fourth">
                    <el-checkbox :indeterminate="someoppo" v-model="alloppo" @change="CheckAlloppos">全选</el-checkbox>
                    <div v-for="(item,index) in opposData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="合同" name="fifth">
                    <el-checkbox :indeterminate="someagree" v-model="allagree" @change="CheckAllagrees">全选</el-checkbox>
                    <div v-for="(item,index) in agreesData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="社交营销" name="sixth">
                    <el-checkbox :indeterminate="someactive" v-model="allactive" @change="CheckAllactives">全选</el-checkbox>
                    <div v-for="(item,index) in activesData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type2" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type3" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type4" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="系统设置" name="seventh">
                    <el-checkbox :indeterminate="someset" v-model="allset" @change="CheckAllsets">全选</el-checkbox>
                    <div v-for="(item,index) in setsData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type2" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type3" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type4" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type5" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="办公" name="eighth">
                    <el-checkbox :indeterminate="somework" v-model="allwork" @change="CheckAllworks">全选</el-checkbox>
                    <div v-for="(item,index) in worksData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type2" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="报表与分析" name="ninth">
                    <el-checkbox :indeterminate="somereport" v-model="allreport" @change="CheckAllreports">全选</el-checkbox>
                    <div v-for="(item,index) in reportsData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="菜单" name="tenth">
                    <el-checkbox :indeterminate="somemenu" v-model="allmenu" @change="CheckAllmenus">全选</el-checkbox>
                    <div v-for="(item,index) in menusData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div>
                <span v-for="(item,index) in checkedList" :key="index">{{item}},</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="addrole()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改角色" :visible.sync="dialogVisible4" :close-on-click-modal="false" width="50%">
            <el-form ref="roleform" :model="roleform" label-width="80px">
                <el-form-item label="所属部门">
                    <el-input v-model="roleform.deptname" :disabled="true" style="200px;"></el-input>
                </el-form-item>
                <el-form-item label="角色名称">
                    <el-input v-model="roleform.name" style="200px;"></el-input>
                </el-form-item>
            </el-form>
            <el-tabs v-model="activeindex" type="card" @tab-click="checkResource">
                <el-tab-pane label="线索" name="first">
                    <el-checkbox :indeterminate="someclue" v-model="allclue" @change="CheckAllclues">全选</el-checkbox>
                    <div v-for="(item,index) in cluesData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type2" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type3" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="客户" name="second">
                    <el-checkbox :indeterminate="somecuestom" v-model="allcuestom" @change="CheckAllcuestoms">全选</el-checkbox>
                    <div v-for="(item,index) in cuestomsData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type2" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type3" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="联系人" name="third">
                    <el-checkbox :indeterminate="somecontact" v-model="allcontact" @change="CheckAllcontacts">全选</el-checkbox>
                    <div v-for="(item,index) in contactsData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="商机" name="fourth">
                    <el-checkbox :indeterminate="someoppo" v-model="alloppo" @change="CheckAlloppos">全选</el-checkbox>
                    <div v-for="(item,index) in opposData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="合同" name="fifth">
                    <el-checkbox :indeterminate="someagree" v-model="allagree" @change="CheckAllagrees">全选</el-checkbox>
                    <div v-for="(item,index) in agreesData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="社交营销" name="sixth">
                    <el-checkbox :indeterminate="someactive" v-model="allactive" @change="CheckAllactives">全选</el-checkbox>
                    <div v-for="(item,index) in activesData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type2" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type3" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type4" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="系统设置" name="seventh">
                    <el-checkbox :indeterminate="someset" v-model="allset" @change="CheckAllsets">全选</el-checkbox>
                    <div v-for="(item,index) in setsData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type2" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type3" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type4" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type5" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="办公" name="eighth">
                    <el-checkbox :indeterminate="somework" v-model="allwork" @change="CheckAllworks">全选</el-checkbox>
                    <div v-for="(item,index) in worksData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type2" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="报表与分析" name="ninth">
                    <el-checkbox :indeterminate="somereport" v-model="allreport" @change="CheckAllreports">全选</el-checkbox>
                    <div v-for="(item,index) in reportsData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="菜单" name="tenth">
                    <el-checkbox :indeterminate="somemenu" v-model="allmenu" @change="CheckAllmenus">全选</el-checkbox>
                    <div v-for="(item,index) in menusData" :key="index">
                        <el-checkbox v-model="a.checked" class="checkboxclass" v-for="a in item.type1" :key="a.id" :label="a.id" @change="changevalue($event,a)">{{a.resourcename}}</el-checkbox>
                        <div style="width:100%;height:20px;"></div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="updaterole()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import store from '../../../../store/store'
    import axios from 'axios'
    import qs from 'qs'

    const roleOptions = [];

    export default {
        name:'organization',
        store,
        data(){
            return {
                datalist:[],
                defaultProps:{
                    label:'deptname',
                    children:'next',
                },
                newform:{
                    parentid:null,
                    parentname:null,
                    deptid:null,
                    deptname:null,
                },
                roleform:{
                    deptid:null,
                    deptname:null,
                    name:null,
                    ids:[],
                },
                searchList:{
                    deptid:null,
                    parentid:null,
                },
                roleList:[],
                maxheight: document.body.clientHeight - 200,
                clickdata:null,
                dialogVisible:false,
                dialogVisible2:false,
                dialogVisible3:false,
                dialogVisible4:false,
                
                activeName: 'first',
                activeindex: 'first',

                resourceData:null,

                checkedList:[],

                cluesData:null,
                cuestomsData:null,
                contactsData:null,
                opposData:null,
                agreesData:null,
                activesData:null,
                setsData:null,
                worksData:null,
                reportsData:null,
                menusData:null,

                someclue:false,
                somecuestom:false,
                somecontact:false,
                someoppo:false,
                someagree:false,
                someactive:false,
                someset:false,
                somework:false,
                somereport:false,
                somemenu:false,

                allclue:false,
                allcuestom:false,
                allcontact:false,
                alloppo:false,
                allagree:false,
                allactive:false,
                allset:false,
                allwork:false,
                allreport:false,
                allmenu:false,

                roleclues:[],
                rolecuestoms:[],
                rolecontacts:[],
                roleoppos:[],
                roleagrees:[],
                roleactives:[],
                rolesets:[],
                roleworks:[],
                rolereports:[],
                rolemenus:[],

            }
        },
        mounted(){
            this.reloadData()
            this.loadData()
            this.getresource()
        },
        activated(){
            this.reloadData()
        },
        methods:{
            //加载机构部门树结构
            loadData(){
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
            //获取该节点下的所有角色
            reloadData(){
                const _this = this
                let qs = require('querystring')
                let searchInfo = {}
                searchInfo.deptid = this.searchList.deptid
                searchInfo.parentid = this.searchList.parentid

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'role/selectRole.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(searchInfo)
                }).then(function(res){
                    _this.roleList = res.data
                }).catch(function(err){
                    // console.log(err);
                });
            },
            getresource(){
                const _this = this
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'resource/getResources.do',
                }).then(function(res){
                    _this.cluesData = res.data.name1
                    _this.cuestomsData = res.data.name2
                    _this.contactsData = res.data.name3
                    _this.opposData = res.data.name4
                    _this.agreesData = res.data.name5
                    _this.activesData = res.data.name6
                    _this.setsData = res.data.name7
                    _this.worksData = res.data.name8
                    _this.reportsData = res.data.name9
                    _this.menusData = res.data.name10
                }).catch(function(err){
                    // console.log(err);
                });
            },
            handleNodeClick(data){
                this.searchList.deptid = data.deptid
                this.searchList.parentid = data.parentid
                this.clickdata = data
                this.roleform.deptid = data.deptid;
                this.$options.methods.reloadData.bind(this)(true);
            },
            //上级部门添加
            handleappend(data){
                const _this = this
                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'deptJurisdiction/insert.do',//新增部门
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.parentname = data.deptname
                        _this.newform.parentid = data.deptid
                        _this.newform.deptname = ''
                        _this.dialogVisible = true
                    }
                }).catch(function(err){
                    // console.log(err);
                });
                
            },
            //上级部门添加提交按钮
            appenddept(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.parentid = this.newform.parentid
                data.parentname = this.newform.parentname
                data.deptname = this.newform.deptname
                
                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'dept/insertDept.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'success'){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                    _this.dialogVisible = false
                    _this.searchList = []
                    _this.$options.methods.loadData.bind(_this)(true);
                    _this.$options.methods.reloadData.bind(_this)(true);
                }).catch(function(err){
                    _this.$message.error("添加失败,请重新添加");
                });
            },
            //上级部门修改
            handleUpdate(data){
                const _this = this;

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'deptJurisdiction/update.do',//编辑部门
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.newform.parentname = data.parentname
                        _this.newform.deptid = data.deptid
                        _this.newform.deptname = data.deptname
                        _this.dialogVisible2 = true
                    }
                }).catch(function(err){
                    // console.log(err);
                });
                
            },
            //上级部门修改提交按钮
            updatedept(){
                const _this = this;
                let qs = require('querystring')
                let data = {}
                data.deptid = this.newform.deptid
                data.deptname = this.newform.deptname

                axios({
                    method: 'post',
                    url: _this.$store.state.defaultHttp+'dept/updateDeptById.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'success'){
                        _this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                    _this.dialogVisible2 = false
                    _this.searchList = []
                    _this.$options.methods.loadData.bind(_this)(true);
                    _this.$options.methods.reloadData.bind(_this)(true);
                }).catch(function(err){
                    _this.$message.error("修改失败,请重新修改");
                });
            },
            //上级部门删除提交按钮
            deletedept(node,data){
                const _this = this;
                let qs =require('querystring')
                let idData = {}
                idData.deptid = data.deptid
                _this.$confirm('是否确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'dept/deleteDeptById.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(idData),
                    }).then(function(res){
                        if(res.data.msg && res.data.msg == 'success') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        }else if(res.data.msg && res.data.msg == 'error'){//删除部门
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
                        _this.searchList = []
                        _this.$options.methods.loadData.bind(_this)(true);
                        _this.$options.methods.reloadData.bind(_this)(true);
                    }).catch(function(err){
                        _this.$message.error("删除失败,请重新删除");
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });       
                });
            },
            //添加角色
            handleAdd(){
                const _this = this
                this.roleform.name = ''
                this.roleform.ids = []
                this.checkedList = []
                if(!this.clickdata){
                    _this.$message({
                        message:'请先选择部门，再添加角色',
                        type:'info'
                    })
                }else{
                    axios({
                        method: 'get',
                        url: _this.$store.state.defaultHttp+'roleJurisdiction/insert.do',//新增角色
                    }).then(function(res){
                        if(res.data.msg && res.data.msg == 'error'){
                            _this.$message({
                                message:'对不起，您没有该权限，请联系管理员开通',
                                type:'error'
                            })
                        }else{
                            _this.cluesData.forEach(i => {//线索
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        a.checked = false
                                    });
                                }
                                if(i.type2){
                                    i.type2.forEach(a => {
                                        a.checked = false
                                    });
                                }
                                if(i.type3){
                                    i.type3.forEach(a => {
                                        a.checked = false
                                    });
                                }
                            });
                            _this.cuestomsData.forEach(i => {//客户
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        a.checked = false
                                    });
                                }
                                if(i.type2){
                                    i.type2.forEach(a => {
                                        a.checked = false
                                    });
                                }
                            });
                            _this.contactsData.forEach(i => {//联系人
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        a.checked = false
                                    });
                                }
                            });
                            _this.opposData.forEach(i => {//商机
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        a.checked = false
                                    });
                                }
                            });
                            _this.agreesData.forEach(i => {//合同
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        a.checked = false
                                    });
                                }
                            });
                            _this.activesData.forEach(i => {//社交营销
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        a.checked = false
                                    });
                                }
                                if(i.type2){
                                    i.type2.forEach(a => {
                                        a.checked = false
                                    });
                                }
                                if(i.type3){
                                    i.type3.forEach(a => {
                                        a.checked = false
                                    });
                                }
                                if(i.type4){
                                    i.type4.forEach(a => {
                                        a.checked = false
                                    });
                                }
                            });
                            _this.setsData.forEach(i => {//系统设置
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        a.checked = false
                                    });
                                }
                                if(i.type2){
                                    i.type2.forEach(a => {
                                        a.checked = false
                                    });
                                }
                                if(i.type3){
                                    i.type3.forEach(a => {
                                        a.checked = false
                                    });
                                }
                                if(i.type4){
                                    i.type4.forEach(a => {
                                        a.checked = false
                                    });
                                }
                                if(i.type5){
                                    i.type5.forEach(a => {
                                        a.checked = false
                                    });
                                }
                            });
                            _this.worksData.forEach(i => {//办公
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        a.checked = false
                                    });
                                }
                                if(i.type2){
                                    i.type2.forEach(a => {
                                        a.checked = false
                                    });
                                }
                            });
                            _this.reportsData.forEach(i => {//报表与分析
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        a.checked = false
                                    });
                                }
                            });
                            _this.menusData.forEach(i => {//菜单栏
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        a.checked = false
                                    });
                                }
                            });
                            _this.roleform.deptname = _this.clickdata.deptname
                            _this.dialogVisible3 = true
                        }
                    }).catch(function(err){
                        // console.log(err);
                    });
                    
                }
            },
            //添加角色按钮提交
            addrole(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.deptid = this.roleform.deptid
                data.name = this.roleform.name
                data.ids = this.checkedList

                axios({
                    method:'post',
                    url:_this.$store.state.defaultHttp+'role/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data)
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'success'){
                        _this.$message({
                            message:'添加成功',
                            type:'success'
                        })
                        _this.dialogVisible3 = false
                        _this.$options.methods.reloadData.bind(_this)(true);
                    }else{
                        _this.$message({
                            message:res.data.msg,
                            type:'error'
                        })
                    }
                }).catch(function(err){
                    _this.$message.error("添加失败,请重新添加");
                })
            },
            //修改角色
            handleEdit(e,val){
                const _this = this

                axios({
                    method: 'get',
                    url: _this.$store.state.defaultHttp+'roleJurisdiction/update.do',//编辑角色
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'error'){
                        _this.$message({
                            message:'对不起，您没有该权限，请联系管理员开通',
                            type:'error'
                        })
                    }else{
                        _this.checkedList = []
                        let ids = val.resources
                        ids.forEach(el => {
                            if(el.id){
                                _this.checkedList.push(el.id)
                            }
                            _this.cluesData.forEach(i => {//线索
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                                if(i.type2){
                                    i.type2.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                                if(i.type3){
                                    i.type3.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                            });
                            _this.cuestomsData.forEach(i => {//客户
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                                if(i.type2){
                                    i.type2.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                            });
                            _this.contactsData.forEach(i => {//联系人
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                            });
                            _this.opposData.forEach(i => {//商机
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                            });
                            _this.agreesData.forEach(i => {//合同
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                            });
                            _this.activesData.forEach(i => {//社交营销
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                                if(i.type2){
                                    i.type2.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                                if(i.type3){
                                    i.type3.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                                if(i.type4){
                                    i.type4.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                            });
                            _this.setsData.forEach(i => {//系统设置
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                                if(i.type2){
                                    i.type2.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                                if(i.type3){
                                    i.type3.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                                if(i.type4){
                                    i.type4.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                                if(i.type5){
                                    i.type5.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                            });
                            _this.worksData.forEach(i => {//办公
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                                if(i.type2){
                                    i.type2.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                            });
                            _this.reportsData.forEach(i => {//报表与分析
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                            });
                            _this.menusData.forEach(i => {//菜单栏
                                if(i.type1){
                                    i.type1.forEach(a => {
                                        if(el.id == a.id){
                                            a.checked = true
                                        }
                                    });
                                }
                            });
                        });
                        _this.roleform.id = val.id
                        _this.roleform.name = val.name
                        _this.roleform.deptid = val.deptid
                        _this.roleform.deptname = val.deptname
                        _this.dialogVisible4 = true
                    }
                }).catch(function(err){
                    // console.log(err);
                });
                
            },
            //修改角色按钮提交
            updaterole(){
                const _this = this
                let qs = require('querystring')
                let data = {}
                data.id = this.roleform.id
                data.name = this.roleform.name
                data.deptid = this.roleform.deptid
                data.ids = this.checkedList

                axios({
                    method: 'post',
                    url:  _this.$store.state.defaultHttp+ 'role/saveOrUpdate.do?cId='+_this.$store.state.iscId,
                    data:qs.stringify(data),
                }).then(function(res){
                    if(res.data.msg && res.data.msg == 'success') {
                        _this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        _this.dialogVisible4 = false
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                    _this.$options.methods.reloadData.bind(_this)(true);
                }).catch(function(err){
                    _this.$message.error("修改失败,请重新修改");
                });
            },
            //删除角色
            handledelete(index,row){
                const _this = this
                let data = {}
                let qs = require('querystring')
                data.id = row.id
                _this.$confirm('是否确认删除【' + row.id + '】吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    axios({
                        method: 'post',
                        url:  _this.$store.state.defaultHttp+ 'role/delete.do?cId='+_this.$store.state.iscId,
                        data:qs.stringify(data),
                    }).then(function(res){
                        if(res.data.msg && res.data.msg == 'success') {
                            _this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.$options.methods.reloadData.bind(_this)(true);
                        }else if(res.data.msg && res.data.msg == 'error'){//删除角色
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
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除【' + row.id + '】'
                    });       
                });
            },


            // 选中全部线索权限
            CheckAllclues(val) {
                let data = this.cluesData
                let arr = this.checkedList
                data.forEach(el => {
                    if(el.type1){
                        el.type1.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                    if(el.type2){
                        el.type2.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                    if(el.type3){
                        el.type3.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                });
                this.$options.methods.norepeat.bind(this)()
            },
            // 选中全部客户权限
            CheckAllcuestoms(val) {
                let data = this.cuestomsData
                let arr = this.checkedList
                data.forEach(el => {
                    if(el.type1){
                        el.type1.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                    if(el.type2){
                        el.type2.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                });
                this.$options.methods.norepeat.bind(this)()
            },
            // 选中全部联系人权限
            CheckAllcontacts(val) {
                let data = this.contactsData
                let arr = this.checkedList
                data.forEach(el => {
                    if(el.type1){
                        el.type1.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                });
                this.$options.methods.norepeat.bind(this)()
            },
            // 选中全部商机权限
            CheckAlloppos(val) {
                let data = this.opposData
                let arr = this.checkedList
                data.forEach(el => {
                    if(el.type1){
                        el.type1.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                });
                this.$options.methods.norepeat.bind(this)()
            },
            // 选中全部合同权限
            CheckAllagrees(val) {
                let data = this.agreesData
                let arr = this.checkedList
                data.forEach(el => {
                    if(el.type1){
                        el.type1.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                });
                this.$options.methods.norepeat.bind(this)()
            },
            // 选中全部活动权限
            CheckAllactives(val) {
                let data = this.activesData
                let arr = this.checkedList
                data.forEach(el => {
                    if(el.type1){
                        el.type1.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                    if(el.type2){
                        el.type2.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                    if(el.type3){
                        el.type3.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                    if(el.type4){
                        el.type4.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                });
                this.$options.methods.norepeat.bind(this)()
            },
            // 选中全部基础设置权限
            CheckAllsets(val) {
                let data = this.setsData
                let arr = this.checkedList
                data.forEach(el => {
                    if(el.type1){
                        el.type1.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                    if(el.type2){
                        el.type2.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                    if(el.type3){
                        el.type3.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                    if(el.type4){
                        el.type4.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                    if(el.type5){
                        el.type5.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                });
                this.$options.methods.norepeat.bind(this)()
            },
            // 选中全部办公权限
            CheckAllworks(val) {
                let data = this.worksData
                let arr = this.checkedList
                data.forEach(el => {
                    if(el.type1){
                        el.type1.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                    if(el.type2){
                        el.type2.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                });
                this.$options.methods.norepeat.bind(this)()
            },
            // 选中全部报表与分析权限
            CheckAllreports(val) {
                let data = this.reportsData
                let arr = this.checkedList
                data.forEach(el => {
                    if(el.type1){
                        el.type1.forEach(item => {
                            if(val == true){
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                });
                this.$options.methods.norepeat.bind(this)()
            },
            // 选中全部菜单权限
            CheckAllmenus(val) {
                let data = this.menusData
                let arr = this.checkedList
                data.forEach(el => {
                    if(el.type1){
                        el.type1.forEach(item => {
                            if(val == true){
                                this.rolemenus.push(item.id)
                                this.checkedList.push(item.id)
                                item.checked = true
                            }else{
                                this.rolemenus.pop(item.id)
                                arr.forEach((el,i) => {
                                    if(arr[i] == item.id){
                                        this.checkedList.splice(i,1)
                                    }
                                });
                                item.checked = false
                            }
                        });
                    }
                });
                this.$options.methods.norepeat.bind(this)()
            },

            changevalue(e,val){
                let i = this.checkindex
                let arr = this.checkedList
                
                if(e == true){
                    this.checkedList.push(val.id)
                }
                if(e == false){
                    arr.forEach((el,i) => {
                        if(arr[i] == val.id){
                            this.checkedList.splice(i,1)
                        }
                    });
                }
                this.$options.methods.norepeat.bind(this)()
                if(i == 0){//线索
                    if(e == true){
                        this.roleclues.push(val.id)
                    }else if(e == false){
                        this.roleclues.pop(val.id)
                    }
                    if(this.roleclues.length == this.cluesData[0].count){
                        this.allclue = true
                    }else{
                        this.allclue = false
                    }
                }
                if(i == 1){//客户
                    if(e == true){
                        this.rolecuestoms.push(val.id)
                    }else if(e == false){
                        this.rolecuestoms.pop(val.id)
                    }
                    if(this.rolecuestoms.length == this.cuestomsData[0].count){
                        this.allcuestom = true
                    }else{
                        this.allcuestom = false
                    }
                }
                if(i == 2){//联系人
                    if(e == true){
                        this.rolecontacts.push(val.id)
                    }else if(e == false){
                        this.rolecontacts.pop(val.id)
                    }
                    if(this.rolecontacts.length == this.contactsData[0].count){
                        this.allcontact = true
                    }else{
                        this.allcontact = false
                    }
                }
                if(i == 3){//商机
                    if(e == true){
                        this.roleoppos.push(val.id)
                    }else if(e == false){
                        this.roleoppos.pop(val.id)
                    }
                    if(this.roleoppos.length == this.opposData[0].count){
                        this.alloppo = true
                    }else{
                        this.alloppo = false
                    }
                }
                if(i == 4){//合同
                    if(e == true){
                        this.rolecontacts.push(val.id)
                    }else if(e == false){
                        this.rolecontacts.pop(val.id)
                    }
                    if(this.rolecontacts.length == this.agreesData[0].count){
                        this.allagree = true
                    }else{
                        this.allagree = false
                    }
                }
                if(i == 5){//社交营销
                    if(e == true){
                        this.roleactives.push(val.id)
                    }else if(e == false){
                        this.roleactives.pop(val.id)
                    }
                    if(this.roleactives.length == this.activesData[0].count){
                        this.allactive = true
                    }else{
                        this.allactive = false
                    }
                }
                if(i == 6){//系统设置
                    if(e == true){
                        this.rolesets.push(val.id)
                    }else if(e == false){
                        this.rolesets.pop(val.id)
                    }
                    if(this.rolesets.length == this.setsData[0].count){
                        this.allset = true
                    }else{
                        this.allset = false
                    }
                }
                if(i == 7){//办公
                    if(e == true){
                        this.roleworks.push(val.id)
                    }else if(e == false){
                        this.roleworks.pop(val.id)
                    }
                    if(this.roleworks.length == this.worksData[0].count){
                        this.allwork = true
                    }else{
                        this.allwork = false
                    }
                }
                if(i == 8){//报表与分析
                    if(e == true){
                        this.rolereports.push(val.id)
                    }else if(e == false){
                        this.rolereports.pop(val.id)
                    }
                    if(this.rolereports.length == this.reportsData[0].count){
                        this.allreport = true
                    }else{
                        this.allreport = false
                    }
                }
                if(i == 9){//菜单
                    if(e == true){
                        this.rolemenus.push(val.id)
                    }else if(e == false){
                        this.rolemenus.pop(val.id)
                    }
                    if(this.rolemenus.length == this.menusData[0].count){
                        this.allmenu = true
                    }else{
                        this.allmenu = false
                    }
                }
            },
            checkResource(i){
                this.checkindex = i.index
            },
            norepeat(){
                let hash = []
                for (let i = 0; i < this.checkedList.length; i++) {
                    if(hash.indexOf(this.checkedList[i])==-1){
                        hash.push(this.checkedList[i]);
                    }
                }
                this.checkedList = hash
            },
            
        }
    }
</script>

<style>
    .organ_content{
        background-color: #ffffff;
        height: 100%;
    }
    .leftcontent{
        width: 420px;
        height: 100%;
        float: left;
        box-sizing: border-box;
        overflow-y: scroll;
    }
    .el-tree{
        margin: 20px 0;
    }
    .rightcontent{
        width: calc(100% - 420px);
        height: 100%;
        float: left;
        box-sizing: border-box;
    }
    .rolerecord{
        clear: both;
        width: 100%;
        list-style: none;
        position: relative;
    }
    .rolerecord li{
        float: left;
        font-size: 12px;
        box-sizing:border-box; 
        -moz-box-sizing:border-box; /* Firefox */ 
        -webkit-box-sizing:border-box;
    }
    .checkboxclass{
        width: 100px;
        margin-left: 30px;
    }
</style>
