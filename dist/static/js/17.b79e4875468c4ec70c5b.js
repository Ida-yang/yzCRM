webpackJsonp([17],{T4XQ:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("wtEF"),s=a("mtWM"),i=a.n(s),o=a("mw3O"),l=a.n(o),n={name:"user",props:{totalNum:Number},store:r.a,computed:{tableData:function(){return r.a.state.userList},tableNumber:function(){return r.a.state.userListnumber}},data:function(){var e=this;return{datalist:[],defaultProps:{label:"deptname",children:"next"},newform:{second_id:null,secondname:null,private_id:null,role_id:null,private_phone:null,private_password:null,private_passwords:null,private_employee:null,private_state:"启用",private_email:"",private_QQ:"",imgUrl:null},imgName:null,imgfile:null,searchList:{searchName:null,deptid:null},filterList:null,checklist:null,idArr:{private_id:null},roleList:null,clickdata:null,showbianhao:!0,showmingcheng:!0,showzhanghao:!0,showjuese:!0,showshouji:!0,showyouxiang:!0,showbumen:!0,showzhiwei:!0,showfuze:!0,showzhuangtai:!0,showlaiyuan:!0,page:1,limit:20,dialogVisible:!1,dialogVisible2:!1,rules:{role_id:[{required:!0,message:"用户角色不能为空",trigger:"blur"}],private_employee:[{required:!0,message:"用户名称不能为空",trigger:"blur"}],private_phone:[{required:!0,max:11,min:11,message:"请输入11位手机号码",trigger:"blur"}],private_password:[{required:!0,message:"密码不能为空",trigger:"blur"}],private_passwords:[{required:!0,validator:function(t,a,r){""===a?r(new Error("请再次输入密码")):a!==e.newform.private_password?r(new Error("两次输入密码不一致!")):r()},trigger:"blur"}],private_state:[{required:!0,message:"请选择用户状态",trigger:"blur"}]},doUpload:this.$store.state.defaultHttp+"previewAvatar.do?cId="+this.$store.state.iscId}},beforeCreate:function(){var e=this;i()({method:"get",url:e.$store.state.defaultHttp+"dept/getDeptNodeTree.do?cId="+e.$store.state.iscId}).then(function(t){e.datalist=t.data.map.success}).catch(function(e){})},activated:function(){this.reloadTable()},mounted:function(){this.reloadTable(),this.loadData()},methods:{reloadTable:function(){var e=this,t=a("1nuA"),r={};r.page=this.page,r.limit=this.limit,r.searchName=this.searchList.searchName,r.deptid=this.searchList.deptid;var s={};s.deptid=this.searchList.deptid,i()({method:"post",url:e.$store.state.defaultHttp+"getPrivateUserAll.do?cId="+e.$store.state.iscId,data:t.stringify(r)}).then(function(t){e.$store.state.userList=t.data.map.success,e.$store.state.userListnumber=t.data.count,t.data.map.success.forEach(function(t){t.imgUrl?t.portrait=e.$store.state.systemHttp+"/upload/"+e.$store.state.iscId+"/"+t.imgUrl:t.noportrait=e.$store.state.systemHttp+"/upload/staticImg/avatar.jpg"})}).catch(function(e){}),i()({method:"post",url:e.$store.state.defaultHttp+"role/selectRole.do?cId="+e.$store.state.iscId,data:t.stringify(s)}).then(function(t){e.roleList=t.data}).catch(function(e){})},loadData:function(){var e=this,t=a("1nuA"),r={type:"用户"},s={type:"用户",state:1};i()({method:"post",url:e.$store.state.defaultHttp+"userPageInfo/getAllUserPage.do?cId="+e.$store.state.iscId+"&pId="+e.$store.state.ispId,data:t.stringify(r)}).then(function(t){e.filterList=t.data}).catch(function(e){}),i()({method:"post",url:e.$store.state.defaultHttp+"userPageInfo/getUserPage.do?cId="+e.$store.state.iscId+"&pId="+e.$store.state.ispId,data:t.stringify(s)}).then(function(t){e.checklist=t.data}).catch(function(e){})},handleNodeClick:function(e){this.searchList.deptid=e.deptid,this.clickdata=e,this.newform.second_id=e.deptid,this.newform.secondname=e.deptname,this.$options.methods.reloadTable.bind(this)(!0)},selectInfo:function(e){this.multipleSelection=e;var t=e,a=[new Array];t.forEach(function(e){0!=e.private_id&&a.push(e.private_id)}),this.idArr.private_id=a},handleAvatarSuccess:function(e,t){this.imgfile=URL.createObjectURL(t.raw)},beforeUploadimg:function(e){this.newform.imgUrl=e;var t="jpg"===e.name.split(".")[1],a="png"===e.name.split(".")[1],r="jpeg"===e.name.split(".")[1],s=e.size/1024/1024<.5;t||a||r?s?this.imgName=e.name:this.$message.warning("头像大小不能超过 500KB!"):this.$message.warning("头像只能是 jpg、png、jpeg格式!")},handleAdd:function(){var e=this;this.newform.role_id=null,this.newform.private_phone=null,this.newform.private_password=null,this.newform.private_passwords=null,this.newform.private_employee=null,this.newform.private_state=null,this.newform.private_email="",this.newform.private_QQ="",this.newform.file="",this.clickdata?i()({method:"get",url:e.$store.state.defaultHttp+"userJurisdiction/insert.do"}).then(function(t){t.data.msg&&"error"==t.data.msg?e.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):e.dialogVisible=!0}).catch(function(e){}):e.$message({message:"请先选择部门，再添加用户",type:"info"})},adduser:function(){var e=this,t=(a("1nuA"),new FormData);t.append("second_id",this.newform.second_id),t.append("role_id",this.newform.role_id),t.append("private_phone",this.newform.private_phone),t.append("private_password",this.newform.private_password),t.append("private_employee",this.newform.private_employee),t.append("private_state",this.newform.private_state),t.append("private_email",this.newform.private_email),t.append("private_QQ",this.newform.private_QQ),t.append("file",this.newform.imgUrl,this.imgName);var r=!1;[this.newform].forEach(function(t){t.private_state||(e.$message({message:"请选择用户状态",type:"error"}),r=!0),t.private_employee||(e.$message({message:"用户姓名不能为空",type:"error"}),r=!0),t.role_id||(e.$message({message:"用户角色不能为空",type:"error"}),r=!0),t.private_passwords!==t.private_password&&(e.$message({message:"两次输入的密码不一致",type:"error"}),r=!0),t.private_passwords||(e.$message({message:"确认密码不能为空",type:"error"}),r=!0),t.private_password||(e.$message({message:"用户密码不能为空",type:"error"}),r=!0),/^[1][3,4,5,6,7,8][0-9]{9}$/.test(t.private_phone)||(e.$message({message:"请输入11位手机号码",type:"error"}),r=!0),t.private_phone||(e.$message({message:"用户手机号码不能为空",type:"error"}),r=!0)}),r||i()({method:"post",url:e.$store.state.defaultHttp+"insertPrivateUser.do?cId="+e.$store.state.iscId,headers:{"Content-Type":"multipart/form-data"},data:t}).then(function(t){t.data.code&&200==t.data.code?(e.$message({message:"添加用户成功",type:"success"}),e.dialogVisible=!1,e.$options.methods.reloadTable.bind(e)(!0)):e.$message({message:t.data.msg,type:"error"})}).catch(function(t){e.$message.error("添加失败,请重新添加")})},handleEdit:function(e,t){var a=this,r={};i()({method:"get",url:a.$store.state.defaultHttp+"userJurisdiction/update.do"}).then(function(e){e.data.msg&&"error"==e.data.msg?a.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):(r.deptid=t.second_id,a.newform.private_id=t.private_id,a.newform.second_id=t.second_id,a.newform.secondname=t.deptname,a.newform.role_id=t.role_id,a.newform.private_phone=t.private_phone,a.newform.private_password=t.private_password,a.newform.private_passwords=t.private_password,a.newform.private_employee=t.private_employee,a.newform.private_state=t.private_state,a.newform.private_email=t.private_email,a.newform.private_QQ=t.private_QQ,a.newform.imgUrl=t.imgUrl,t.imgUrl&&(a.imgfile=a.$store.state.systemHttp+"/upload/"+a.$store.state.iscId+"/"+t.imgUrl),a.dialogVisible2=!0,i()({method:"post",url:a.$store.state.defaultHttp+"role/selectRole.do?cId="+a.$store.state.iscId,data:l.a.stringify(r)}).then(function(e){a.roleList=e.data}).catch(function(e){a.$message.error("权限加载失败,请重新打开页面")}))}).catch(function(e){})},updateuser:function(){var e=this,t=(a("1nuA"),new FormData);t.append("second_id",this.newform.second_id),t.append("private_id",this.newform.private_id),t.append("role_id",this.newform.role_id),t.append("private_phone",this.newform.private_phone),t.append("private_password",this.newform.private_password),t.append("private_employee",this.newform.private_employee),t.append("private_state",this.newform.private_state),t.append("private_email",this.newform.private_email),t.append("private_QQ",this.newform.private_QQ),t.append("file",this.newform.imgUrl,this.imgName);var r=!1;[this.newform].forEach(function(t){t.private_state||(e.$message({message:"请选择用户状态",type:"error"}),r=!0),t.private_employee||(e.$message({message:"用户姓名不能为空",type:"error"}),r=!0),t.role_id||(e.$message({message:"用户角色不能为空",type:"error"}),r=!0),t.private_passwords!==t.private_password&&(e.$message({message:"两次输入的密码不一致",type:"error"}),r=!0),t.private_passwords||(e.$message({message:"确认密码不能为空",type:"error"}),r=!0),t.private_password||(e.$message({message:"用户密码不能为空",type:"error"}),r=!0)}),r||i()({method:"post",url:e.$store.state.defaultHttp+"updatePrivate.do?cId="+e.$store.state.iscId,headers:{"Content-Type":"multipart/form-data"},data:t}).then(function(t){t.data.code&&200==t.data.code?(e.$message({message:"修改用户成功",type:"success"}),e.dialogVisible2=!1,e.$options.methods.reloadTable.bind(e)(!0)):e.$message({message:t.data.msg,type:"error"})}).catch(function(t){e.$message.error("修改失败,请重新修改")})},handlesynchros:function(){var e=this,t=a("1nuA"),r=[];r.privateId=this.idArr.private_id,r.privateId?e.$confirm("确认同步到云服务器吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(a){a.value;i()({method:"post",url:e.$store.state.defaultHttp+"tbPrivateToPublicUser.do?cId="+e.$store.state.iscId,data:t.stringify(r)}).then(function(t){t.data.code&&200==t.data.code?(e.$message({message:"同步成功",type:"success"}),e.$options.methods.reloadTable.bind(e)(!0)):t.data.msg&&"error"==t.data.msg?e.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):e.$message({message:t.data.msg,type:"error"})}).catch(function(t){e.$message.error("同步失败,请重新同步")})}):e.$message({type:"error",message:"请先选择要同步的用户"})},handlesynchro:function(e,t){var r=this,s=a("1nuA"),o=[];o.privateId=t.private_id,r.$confirm("确认同步 ["+t.private_employee+"] 到云服务器吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){e.value;i()({method:"post",url:r.$store.state.defaultHttp+"tbPrivateToPublicUser.do?cId="+r.$store.state.iscId,data:s.stringify(o)}).then(function(e){e.data.code&&200==e.data.code?(r.$message({message:"同步成功",type:"success"}),r.$options.methods.reloadTable.bind(r)(!0)):e.data.msg&&"error"==e.data.msg?r.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):r.$message({message:e.data.msg,type:"error"})}).catch(function(e){r.$message.error("同步失败,请重新同步")})})},hangleChange:function(e,t){var r=this,s=a("1nuA"),o={};o.pageInfoId=t.pageInfoId,o.state=1==e?1:0,i()({method:"post",url:r.$store.state.defaultHttp+"userPageInfo/updateUserPageByid.do?cId="+r.$store.state.iscId+"&pId="+r.$store.state.ispId,data:s.stringify(o)}).then(function(e){e.data&&"success"==e.data&&r.$options.methods.loadData.bind(r)(!0)}).catch(function(e){})},search:function(){this.$options.methods.reloadTable.bind(this)(!0)},handleSizeChange:function(e){this.limit=e,this.$options.methods.reloadTable.bind(this)(!1)},handleCurrentChange:function(e){this.page=e,this.$options.methods.reloadTable.bind(this)(!1)}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contentall"},[a("div",{staticClass:"otherleftcontent"},[a("el-tree",{attrs:{"node-key":"deptid","highlight-current":"","default-expand-all":"",data:e.datalist,props:e.defaultProps,"expand-on-click-node":!1},on:{"node-click":e.handleNodeClick}})],1),e._v(" "),a("div",{staticClass:"centercontent"}),e._v(" "),a("div",{staticClass:"otherightcontent"},[a("div",{staticClass:"searchList",staticStyle:{width:"100%"}},[a("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入用户名称"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.search(t):null}},model:{value:e.searchList.searchName,callback:function(t){e.$set(e.searchList,"searchName",t)},expression:"searchList.searchName"}}),e._v("\n              \n            "),a("el-button",{attrs:{icon:"el-icon-search",type:"primary",size:"mini"},on:{click:function(t){e.search()}}},[e._v("查询")])],1),e._v(" "),a("div",{staticClass:"entry"},[a("el-button",{staticClass:"btn",attrs:{size:"mini"},on:{click:function(t){e.handlesynchros()}}},[e._v("同步")]),e._v(" "),a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(t){e.handleAdd()}}},[e._v("新增")]),e._v(" "),a("div",{staticClass:"totalnum_head"},[e._v("共 "),a("span",{staticClass:"bold_span"},[e._v(e._s(e.tableNumber))]),e._v(" 条")]),e._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"100",trigger:"click"}},[a("el-checkbox-group",{staticClass:"checklist",staticStyle:{"max-height":"600px","overflow-y":"overlay","overflow-x":"hidden"},model:{value:e.checklist,callback:function(t){e.checklist=t},expression:"checklist"}},e._l(e.filterList,function(t){return a("el-checkbox",{key:t.id,staticClass:"checkone",attrs:{label:t.name,value:t.state},on:{change:function(a){e.hangleChange(a,t)}}})})),e._v(" "),a("el-button",{staticClass:"info-btn screen",attrs:{slot:"reference",icon:"el-icon-more",type:"mini"},slot:"reference"})],1)],1),e._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""},on:{"selection-change":e.selectInfo}},[a("el-table-column",{attrs:{fixed:"","header-align":"center",align:"center",type:"selection",width:"45","scope.row.private_id":"",prop:"private_id",sortable:""},on:{"selection-change":e.selectInfo}}),e._v(" "),a("el-table-column",{attrs:{label:"头像",prop:"imgUrl",fixed:"","header-align":"center",align:"center","min-width":"80",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{attrs:{placement:"right",width:"200",trigger:"hover"}},[a("img",{directives:[{name:"show",rawName:"v-show",value:t.row.imgUrl,expression:"scope.row.imgUrl"}],staticClass:"img_portrait_big",attrs:{src:t.row.portrait,alt:"头像",width:"200",height:"200"}}),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:t.row.imgUrl,expression:"scope.row.imgUrl"}],staticClass:"img_portrait",attrs:{slot:"reference",src:t.row.portrait,alt:"头像",width:"50",height:"50"},slot:"reference"}),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:!t.row.imgUrl,expression:"!scope.row.imgUrl"}],staticClass:"img_portrait",attrs:{slot:"reference",src:t.row.noportrait,alt:"头像",width:"50",height:"50"},slot:"reference"})])]}}])}),e._v(" "),e._l(e.filterList,function(t,r){return a("div",{key:r},["private_number"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"编号",prop:"private_number",fixed:"","min-width":"160",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return["是"==t.row.private_isAdmin?a("span",{staticStyle:{color:"blue"}},[e._v(e._s(t.row.private_number))]):e._e(),e._v(" "),"否"==t.row.private_isAdmin?a("span",[e._v(e._s(t.row.private_number))]):e._e()]}}])}):e._e(),e._v(" "),"private_employee"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"用户",prop:"private_employee",fixed:"","min-width":"90",sortable:""}}):e._e(),e._v(" "),"private_username"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"登录账号",prop:"private_username","min-width":"110",sortable:""}}):e._e(),e._v(" "),"name"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"岗位",prop:"name","min-width":"100",sortable:""}}):e._e(),e._v(" "),"private_phone"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"手机号",prop:"private_phone","min-width":"110",sortable:""}}):e._e(),e._v(" "),"private_email"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"邮箱",prop:"private_email","show-overflow-tooltip":"","min-width":"130",sortable:""}}):e._e(),e._v(" "),"deptname"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"部门",prop:"deptname","show-overflow-tooltip":"","min-width":"100",sortable:""}}):e._e(),e._v(" "),"parentname"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"机构",prop:"parentname","min-width":"110","show-overflow-tooltip":"",sortable:""}}):e._e(),e._v(" "),"createTime"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"创建时间",prop:"createTime","min-width":"150",sortable:""}}):e._e(),e._v(" "),"isSynchronization"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"是否同步",prop:"isSynchronization","min-width":"110",sortable:""}}):e._e(),e._v(" "),"private_state"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"状态",prop:"private_state","min-width":"90",sortable:""}}):e._e()],1)}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"150","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handlesynchro(t.$index,t.row)}}},[e._v("同步")])]}}])})],2),e._v(" "),a("div",{staticClass:"block numberPage"},[a("el-pagination",{attrs:{"current-page":e.page,"page-sizes":[20,50,100,500],"page-size":20,layout:"total, sizes, prev, pager, next, jumper",total:e.tableNumber},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"添加用户",visible:e.dialogVisible,"close-on-click-modal":!1,width:"40%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"newform",attrs:{model:e.newform,"label-width":"80px",rules:e.rules}},[a("el-form-item",{attrs:{prop:"second_id",label:"所属部门"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.newform.secondname,callback:function(t){e.$set(e.newform,"secondname",t)},expression:"newform.secondname"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"imgUrl",label:"头像"}},[a("el-upload",{staticClass:"avatar-uploader portraits",attrs:{action:e.doUpload,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeUploadimg}},[e.imgfile?a("img",{staticClass:"avatar",attrs:{src:e.imgfile,width:"100",height:"100"}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon portrait_add"})])],1),e._v(" "),a("el-form-item",{attrs:{prop:"private_phone",label:"手机号码"}},[a("el-input",{attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",placeholder:"请输入用户手机号码"},model:{value:e.newform.private_phone,callback:function(t){e.$set(e.newform,"private_phone",t)},expression:"newform.private_phone"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"private_password",label:"密码"}},[a("el-input",{attrs:{type:"password",placeholder:"请输入用户密码"},model:{value:e.newform.private_password,callback:function(t){e.$set(e.newform,"private_password",t)},expression:"newform.private_password"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"private_passwords",label:"确认密码"}},[a("el-input",{attrs:{type:"password",placeholder:"请再次输入用户密码"},model:{value:e.newform.private_passwords,callback:function(t){e.$set(e.newform,"private_passwords",t)},expression:"newform.private_passwords"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"role_id",label:"角色"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择用户角色"},model:{value:e.newform.role_id,callback:function(t){e.$set(e.newform,"role_id",t)},expression:"newform.role_id"}},e._l(e.roleList,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{prop:"private_employee",label:"用户名称"}},[a("el-input",{attrs:{placeholder:"请输入用户名称"},model:{value:e.newform.private_employee,callback:function(t){e.$set(e.newform,"private_employee",t)},expression:"newform.private_employee"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"private_state",label:"用户状态"}},[a("el-radio",{attrs:{label:"启用"},model:{value:e.newform.private_state,callback:function(t){e.$set(e.newform,"private_state",t)},expression:"newform.private_state"}},[e._v("启用")]),e._v(" "),a("el-radio",{attrs:{label:"禁止"},model:{value:e.newform.private_state,callback:function(t){e.$set(e.newform,"private_state",t)},expression:"newform.private_state"}},[e._v("禁止")])],1),e._v(" "),a("el-form-item",{attrs:{prop:"private_email",label:"邮箱"}},[a("el-input",{attrs:{type:"email",placeholder:"请输入用户邮箱"},model:{value:e.newform.private_email,callback:function(t){e.$set(e.newform,"private_email",t)},expression:"newform.private_email"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"private_QQ",label:"QQ"}},[a("el-input",{attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",placeholder:"请输入用户QQ"},model:{value:e.newform.private_QQ,callback:function(t){e.$set(e.newform,"private_QQ",t)},expression:"newform.private_QQ"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.adduser()}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改用户",visible:e.dialogVisible2,"close-on-click-modal":!1,width:"40%"},on:{"update:visible":function(t){e.dialogVisible2=t}}},[a("el-form",{ref:"newform",attrs:{model:e.newform,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{prop:"second_id",label:"所属部门"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.newform.secondname,callback:function(t){e.$set(e.newform,"secondname",t)},expression:"newform.secondname"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"imgUrl",label:"头像"}},[a("el-upload",{staticClass:"avatar-uploader portraits",attrs:{action:e.doUpload,"on-success":e.handleAvatarSuccess,"show-file-list":!1,"before-upload":e.beforeUploadimg}},[e.imgfile?a("img",{staticClass:"avatar",attrs:{src:e.imgfile,width:"100",height:"100"}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon portrait_add"})])],1),e._v(" "),a("el-form-item",{attrs:{prop:"private_phone",label:"手机号码"}},[a("el-input",{attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",disabled:!0,placeholder:"请输入用户手机号码"},model:{value:e.newform.private_phone,callback:function(t){e.$set(e.newform,"private_phone",t)},expression:"newform.private_phone"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"private_password",label:"密码"}},[a("el-input",{attrs:{type:"password",placeholder:"请输入用户密码"},model:{value:e.newform.private_password,callback:function(t){e.$set(e.newform,"private_password",t)},expression:"newform.private_password"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"private_passwords",label:"确认密码"}},[a("el-input",{attrs:{type:"password",placeholder:"请再次输入用户密码"},model:{value:e.newform.private_passwords,callback:function(t){e.$set(e.newform,"private_passwords",t)},expression:"newform.private_passwords"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"role_id",label:"角色"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择用户角色"},model:{value:e.newform.role_id,callback:function(t){e.$set(e.newform,"role_id",t)},expression:"newform.role_id"}},e._l(e.roleList,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{prop:"private_employee",label:"用户名称"}},[a("el-input",{attrs:{placeholder:"请输入用户名称"},model:{value:e.newform.private_employee,callback:function(t){e.$set(e.newform,"private_employee",t)},expression:"newform.private_employee"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"private_state",label:"用户状态"}},[a("el-radio",{attrs:{label:"启用"},model:{value:e.newform.private_state,callback:function(t){e.$set(e.newform,"private_state",t)},expression:"newform.private_state"}},[e._v("启用")]),e._v(" "),a("el-radio",{attrs:{label:"禁止"},model:{value:e.newform.private_state,callback:function(t){e.$set(e.newform,"private_state",t)},expression:"newform.private_state"}},[e._v("禁止")])],1),e._v(" "),a("el-form-item",{attrs:{prop:"private_email",label:"邮箱"}},[a("el-input",{attrs:{type:"email",placeholder:"请输入用户邮箱"},model:{value:e.newform.private_email,callback:function(t){e.$set(e.newform,"private_email",t)},expression:"newform.private_email"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"private_QQ",label:"QQ"}},[a("el-input",{attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",placeholder:"请输入用户QQ"},model:{value:e.newform.private_QQ,callback:function(t){e.$set(e.newform,"private_QQ",t)},expression:"newform.private_QQ"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible2=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.updateuser()}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(n,p,!1,function(e){a("nWb6")},null,null);t.default=d.exports},nWb6:function(e,t){}});