webpackJsonp([38],{"9AEY":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("woOf"),l=a.n(s),i=a("wtEF"),o=a("mtWM"),n=a.n(o),r=(a("mw3O"),{name:"contacts",props:{totalNum:Number},store:i.a,computed:{tableData:function(){return i.a.state.contactsList},tableNumber:function(){return i.a.state.contactsListnumber}},data:function(){return{fieldHeadData:[],searchList:{keyType:"1",searchName:null,time:null,label:"1"},searchListNew:{keyType:"1",searchName:null,time:null,label:"1"},page:1,limit:20,idArr:{id:null},contactData:[{label:"0",value:"全部"},{label:"1",value:"我的"},{label:"2",value:"本组"},{label:"3",value:"本机构"}],timeData:[{id:"1",typeName:"今天"},{id:"2",typeName:"昨天"},{id:"3",typeName:"本周"},{id:"4",typeName:"本月"},{id:"5",typeName:"上月"}],nullvalue:null,filterList:null,checklist:null,dialogFormVisible:!1,dialogFormVisible1:!1,formLabelWidth:"130px"}},activated:function(){this.loadFieldHead(),this.reloadTable()},mounted:function(){this.loadFieldHead(),this.reloadTable(),this.reloadData()},methods:{reloadTable:function(){var e=this,t=a("1nuA"),s={};s.searchName=this.searchList.searchName,0==this.searchList.label?s.pId=e.nullvalue:1==this.searchList.label?s.pId=e.$store.state.ispId:2==this.searchList.label?s.secondid=e.$store.state.deptid:3==this.searchList.label&&(s.deptid=e.$store.state.insid),s.example=this.searchList.time,s.keyType=this.searchList.keyType,s.page=this.page,s.limit=this.limit,s.label=3,n()({method:"post",url:e.$store.state.defaultHttp+"pageInfo/queryPageList.do?cId="+e.$store.state.iscId,data:t.stringify(s)}).then(function(t){e.$store.state.contactsList=t.data.map.success,e.$store.state.contactsListnumber=t.data.count}).catch(function(e){})},loadFieldHead:function(){var e=this,t=a("1nuA"),s={label:3,pId:this.$store.state.ispId};n()({method:"post",url:e.$store.state.defaultHttp+"field/queryListHead.do?cId="+e.$store.state.iscId,data:t.stringify(s)}).then(function(t){e.fieldHeadData=t.data}).catch(function(e){})},reloadData:function(){var e=this,t=a("1nuA"),s={type:"联系人"},l={type:"联系人",state:1};n()({method:"post",url:e.$store.state.defaultHttp+"userPageInfo/getAllUserPage.do?cId="+e.$store.state.iscId+"&pId="+e.$store.state.ispId,data:t.stringify(s)}).then(function(t){e.filterList=t.data}).catch(function(e){}),n()({method:"post",url:e.$store.state.defaultHttp+"userPageInfo/getUserPage.do?cId="+e.$store.state.iscId+"&pId="+e.$store.state.ispId,data:t.stringify(l)}).then(function(t){e.checklist=t.data}).catch(function(e){})},selectInfo:function(e){this.multipleSelection=e;var t=e,a=[new Array];t.forEach(function(e){0!=e.csId&&a.push(e.csId)}),this.idArr.id=a},openDetails:function(e,t){this.$store.state.contdetailsData={id:t.csId},this.$router.push({path:"/contactsdetail"})},handleAdd:function(){var e=this,t={createForm:[{label:"联系人",inputModel:"name"},{label:"公司名称",inputModel:"poolName",type:"require"},{label:"手机",inputModel:"phone",type:"number"},{label:"电话",inputModel:"telephone",type:"number"},{label:"QQ",inputModel:"qq",type:"number"},{label:"邮箱",inputModel:"email"},{label:"微信",inputModel:"wechat"},{label:"性别",inputModel:"sex",type:"radio"},{label:"生日",inputModel:"birthday",type:"date"},{label:"职务",inputModel:"identity"},{label:"省/市/区",inputModel:"countryid",type:"select",placeholder:"请选择省"},{label:"",inputModel:"cityid",type:"select",placeholder:"请选择市"},{label:"",inputModel:"areaid",type:"select",placeholder:"请选择区"},{label:"地址",inputModel:"address"},{label:"备注",inputModel:"remark",type:"textarea"}],setForm:{name:"",poolName:"",telephone:"",phone:"",countryid:"",cityid:"",areaid:"",qq:"",email:"",wechat:"",sex:"",birthday:"",identity:"",address:"",remark:""}};t.submitURL=this.$store.state.defaultHttp+"insertContacts.do?cId="+this.$store.state.iscId+"&pId="+this.$store.state.ispId,this.$store.state.contaddOrUpdateData=t,n()({method:"get",url:e.$store.state.defaultHttp+"contactsJurisdiction/insert.do"}).then(function(t){t.data.msg&&"error"==t.data.msg?e.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):e.$router.push({path:"/contactsaddorupdate"})}).catch(function(e){})},handleEdit:function(e,t){var a=this,s={createForm:[{label:"联系人",inputModel:"name"},{label:"客户名称",inputModel:"poolName",type:"require"},{label:"手机",inputModel:"phone",type:"number"},{label:"电话",inputModel:"telephone",type:"number"},{label:"QQ",inputModel:"qq",type:"number"},{label:"邮箱",inputModel:"email"},{label:"微信",inputModel:"wechat"},{label:"性别",inputModel:"sex",type:"radio"},{label:"生日",inputModel:"birthday",type:"date"},{label:"职务",inputModel:"identity"},{label:"省/市/区",inputModel:"countryid",type:"select"},{label:"",inputModel:"cityid",type:"select"},{label:"",inputModel:"areaid",type:"select"},{label:"地址",inputModel:"address"},{label:"备注",inputModel:"remark",type:"textarea"}]};s.setForm={name:t.name,poolName:t.poolname,telephone:t.telephone,phone:t.phone,countryid:t.country,country:t.countryid,cityid:t.city,city:t.cityid,areaid:t.area,area:t.areaid,qq:t.qq,email:t.email,wechat:t.wechat,sex:t.sex,birthday:t.birthday,identity:t.identity,address:t.address,remark:t.remark},s.submitData={id:t.csId,batch_id:t.batch_id},s.submitURL=this.$store.state.defaultHttp+"updateContacts.do?cId="+this.$store.state.iscId,this.$store.state.contaddOrUpdateData=s,n()({method:"get",url:a.$store.state.defaultHttp+"contactsJurisdiction/update.do"}).then(function(e){e.data.msg&&"error"==e.data.msg?a.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):a.$router.push({path:"/contactsaddorupdate"})}).catch(function(e){})},handleDeletes:function(){var e=this,t=this,s=a("1nuA"),l=[];l.id=this.idArr.id,l.id?t.$confirm("是否确认删除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(a){a.value;n()({method:"post",url:t.$store.state.defaultHttp+"deleteContacts.do?cId="+t.$store.state.iscId,data:s.stringify(l)}).then(function(e){e.data.success&&1==e.data.success?(t.$message({message:"删除成功",type:"success"}),t.$options.methods.reloadTable.bind(t)(!0)):e.data.msg&&"error"==e.data.msg?t.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):t.$message({message:e.data.msg,type:"error"})}).catch(function(){e.$message({type:"info",message:"取消删除"})})}):t.$message({type:"error",message:"请先选择要删除的联系人"})},handleDelete:function(e,t){var s=this,l=this,i=a("1nuA"),o=[];o.id=t.csId,l.$confirm("是否确认删除["+t.name+"]？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){e.value;n()({method:"post",url:l.$store.state.defaultHttp+"deleteContacts.do?cId="+l.$store.state.iscId,data:i.stringify(o)}).then(function(e){e.data.success&&1==e.data.success?(l.$message({message:"删除成功",type:"success"}),l.$options.methods.reloadTable.bind(l)(!0)):e.data.msg&&"error"==e.data.msg?l.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):l.$message({message:e.data.msg,type:"error"})}).catch(function(e){l.$message.error("删除失败,请重新删除")})}).catch(function(){s.$message({type:"info",message:"取消删除["+t.name+"]"})})},hangleChange:function(e,t){var s=this,l=a("1nuA"),i={};i.pageInfoId=t.pageInfoId,i.state=1==e?1:0,n()({method:"post",url:s.$store.state.defaultHttp+"userPageInfo/updateUserPageByid.do?cId="+s.$store.state.iscId+"&pId="+s.$store.state.ispId,data:l.stringify(i)}).then(function(e){e.data&&"success"==e.data&&s.$options.methods.reloadData.bind(s)(!0)}).catch(function(e){})},search:function(){var e=this,t="",a=1;0==this.searchList.label?(t="contactsJurisdiction/all.do",a=0):2==this.searchList.label?(t="contactsJurisdiction/second.do",a=0):3==this.searchList.label&&(t="contactsJurisdiction/dept.do",a=0),0==a?n()({method:"get",url:e.$store.state.defaultHttp+t}).then(function(t){t.data.msg&&"error"==t.data.msg?e.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):e.$options.methods.reloadTable.bind(e)(!0)}).catch(function(e){}):e.$options.methods.reloadTable.bind(e)(!0)},reset:function(){this.searchList=l()({},this.searchListNew),this.$options.methods.reloadTable.bind(this)(!0)},handleSizeChange:function(e){this.limit=e,this.$options.methods.reloadTable.bind(this)(!1)},handleCurrentChange:function(e){this.page=e,this.$options.methods.reloadTable.bind(this)(!1)}}}),c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"radioList"},[a("el-radio-group",{model:{value:e.searchList.label,callback:function(t){e.$set(e.searchList,"label",t)},expression:"searchList.label"}},[a("span",{staticClass:"nameList"},[e._v("数据授权：")]),e._v(" "),e._l(e.contactData,function(t){return a("el-radio",{key:t.label,attrs:{label:t.label},on:{change:function(t){e.search()}}},[e._v(e._s(t.value))])})],2),e._v(" "),a("el-radio-group",{model:{value:e.searchList.time,callback:function(t){e.$set(e.searchList,"time",t)},expression:"searchList.time"}},[a("span",{staticClass:"nameList"},[e._v("新增时间：")]),e._v(" "),a("el-radio",{attrs:{label:e.nullvalue},on:{change:function(t){e.search()}}},[e._v("全部")]),e._v(" "),e._l(e.timeData,function(t){return a("el-radio",{key:t.id,attrs:{label:t.id},on:{change:function(t){e.search()}}},[e._v(e._s(t.typeName))])})],2)],1),e._v(" "),a("div",{staticClass:"searchList"},[a("el-input",{staticStyle:{"margin-left":"20px",width:"400px"},attrs:{placeholder:"请输入联系人或公司名称"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.search(t):null}},model:{value:e.searchList.searchName,callback:function(t){e.$set(e.searchList,"searchName",t)},expression:"searchList.searchName"}},[a("el-select",{staticStyle:{width:"125px"},attrs:{slot:"prepend",placeholder:"请选择"},slot:"prepend",model:{value:e.searchList.keyType,callback:function(t){e.$set(e.searchList,"keyType",t)},expression:"searchList.keyType"}},[a("el-option",{attrs:{label:"联系人名称",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"公司名称",value:"2"}})],1)],1),e._v("\n          \n        "),a("el-button",{attrs:{icon:"el-icon-search",type:"primary",size:"mini"},on:{click:function(t){e.search()}}},[e._v("查询")])],1),e._v(" "),a("div",{staticClass:"entry"},[a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(t){e.handleAdd()}}},[e._v("新增")]),e._v(" "),a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(t){e.handleDeletes()}}},[e._v("删除")]),e._v(" "),a("div",{staticClass:"totalnum_head"},[e._v("共 "),a("span",{staticClass:"bold_span"},[e._v(e._s(e.tableNumber))]),e._v(" 条")]),e._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"100",trigger:"click"}},[a("el-checkbox-group",{staticClass:"checklist",staticStyle:{"max-height":"600px","overflow-y":"overlay","overflow-x":"hidden"},model:{value:e.checklist,callback:function(t){e.checklist=t},expression:"checklist"}},e._l(e.filterList,function(t){return a("el-checkbox",{key:t.id,staticClass:"checkone",attrs:{label:t.name,value:t.state},on:{change:function(a){e.hangleChange(a,t)}}})})),e._v(" "),a("el-button",{staticClass:"info-btn screen",attrs:{slot:"reference",icon:"el-icon-more",type:"mini"},slot:"reference"})],1)],1),e._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""},on:{"selection-change":e.selectInfo}},[a("el-table-column",{attrs:{fixed:"","header-align":"center",align:"center",type:"selection",width:"45","scope.row.csId":"",prop:"csId"},on:{"selection-change":e.selectInfo}}),e._v(" "),e._l(e.filterList,function(t,s){return a("div",{key:s},["name"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"联系人",prop:"name",fixed:"","min-width":"100",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"hoverline",on:{click:function(a){e.openDetails(t.$index,t.row)}}},[e._v("\n                        "+e._s(t.row.name)+"\n                    ")])]}}])}):e._e(),e._v(" "),"poolname"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"公司名称",prop:"poolname",fixed:"","min-width":"200",sortable:""}}):e._e(),e._v(" "),"telephone"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"电话",prop:"telephone","min-width":"110",sortable:""}}):e._e(),e._v(" "),"phone"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"手机",prop:"phone","min-width":"110",sortable:""}}):e._e(),e._v(" "),"qq"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"QQ",prop:"qq","min-width":"110",sortable:""}}):e._e(),e._v(" "),"email"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"邮箱",prop:"email","show-overflow-tooltip":"","min-width":"130",sortable:""}}):e._e(),e._v(" "),"wechat"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"微信",prop:"wechat","min-width":"110",sortable:""}}):e._e(),e._v(" "),"sex"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"性别",prop:"sex","min-width":"90",sortable:""}}):e._e(),e._v(" "),"remarks"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"备注",prop:"remark","min-width":"180",sortable:""}}):e._e(),e._v(" "),"follow[0].createTime"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"最新跟进时间",prop:"follow[0].createTime","min-width":"150",sortable:""}}):e._e(),e._v(" "),"follow[0].followContent"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"最新跟进记录",prop:"follow[0].followContent","show-overflow-tooltip":"","min-width":"180",sortable:""}}):e._e(),e._v(" "),"follow[0].contactTime"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"下次联系时间",prop:"follow[0].contactTime","min-width":"150",sortable:""}}):e._e(),e._v(" "),"private_employee"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"负责人",prop:"private_employee","min-width":"110",sortable:""}}):e._e(),e._v(" "),"deptname"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"部门",prop:"deptname","min-width":"110",sortable:""}}):e._e(),e._v(" "),"parentname"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"机构",prop:"parentname","show-overflow-tooltip":"","min-width":"110",sortable:""}}):e._e(),e._v(" "),"countryid"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"省-市-区",prop:"countryid","min-width":"150",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(t.row.country)+"-"+e._s(t.row.city)+"-"+e._s(t.row.area)+"\n                ")]}}])}):e._e(),e._v(" "),"createTime"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"创建时间",prop:"createTime","min-width":"150",sortable:""}}):e._e(),e._v(" "),e._l(e.fieldHeadData,function(s){return t.prop==s.field_name&&1==t.state?a("el-table-column",{key:s.field_name,attrs:{label:s.name,prop:s.field_name,"min-width":"130",sortable:""}}):e._e()})],2)}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"150","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],2),e._v(" "),a("div",{staticClass:"block numberPage"},[a("el-pagination",{attrs:{"current-page":e.page,"page-sizes":[20,50,100,500],"page-size":20,layout:"total, sizes, prev, pager, next, jumper",total:e.tableNumber},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var d=a("VU/8")(r,c,!1,function(e){a("F42f")},null,null);t.default=d.exports},F42f:function(e,t){}});