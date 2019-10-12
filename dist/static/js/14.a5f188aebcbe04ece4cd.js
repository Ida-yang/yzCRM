webpackJsonp([14],{crmd:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("wtEF"),o=a("mtWM"),n=a.n(o),i=(a("mw3O"),{name:"competitor",store:s.a,computed:{tableData:function(){return s.a.state.competitorList},tableNumber:function(){return s.a.state.competitorListnumber}},data:function(){return{msg:"competitor.vue",page:1,limit:20,searchList:{searchName:null,label:1},pIdData:[{index:0,name:"全部"},{index:1,name:"我的"},{index:2,name:"本组"},{index:3,name:"本机构"}],idArr:[],filterList:null,checklist:null}},mounted:function(){this.loadData(),this.reloadData()},activated:function(){this.loadData()},methods:{loadData:function(){var t=this,e=a("1nuA"),s={};0==this.searchList.label?s.pId=null:1==this.searchList.label?s.pId=t.$store.state.ispId:2==this.searchList.label?s.secondid=t.$store.state.deptid:3==this.searchList.label&&(s.deptid=t.$store.state.insid),s.searchName=this.searchList.searchName,s.page=this.page,s.limit=this.limit,n()({method:"post",url:t.$store.state.defaultHttp+"competitor/queryForList.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){t.$store.state.competitorList=e.data.map.success,t.$store.state.competitorListnumber=e.data.count}).catch(function(t){})},reloadData:function(){var t=this,e=a("1nuA"),s={type:"竞争对手"},o={type:"竞争对手",state:1};n()({method:"post",url:t.$store.state.defaultHttp+"userPageInfo/getAllUserPage.do?cId="+t.$store.state.iscId+"&pId="+t.$store.state.ispId,data:e.stringify(s)}).then(function(e){t.filterList=e.data}).catch(function(t){}),n()({method:"post",url:t.$store.state.defaultHttp+"userPageInfo/getUserPage.do?cId="+t.$store.state.iscId+"&pId="+t.$store.state.ispId,data:e.stringify(o)}).then(function(e){t.checklist=e.data}).catch(function(t){})},selectInfo:function(t){var e=t,a=[new Array];e.forEach(function(t){0!=t.id&&a.push(t.id)}),this.idArr=a},handleAdd:function(){this.$store.state.competitorAddOrUpdateData={},this.$router.push({path:"/competitoraddorupdate"})},handleEdit:function(t,e){this.$store.state.competitorAddOrUpdateData=e,this.$router.push({path:"/competitoraddorupdate"})},handleDeletes:function(){var t=this,e=a("1nuA"),s=[];s.ids=this.idArr,s.ids?t.$confirm("是否确认删除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(a){a.value;n()({method:"post",url:t.$store.state.defaultHttp+"competitor/deleteByPrimaryKey.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){e.data.code&&"200"==e.data.code?(t.$message({message:"删除成功",type:"success"}),t.$options.methods.loadData.bind(t)(!0)):e.data.msg&&"error"==e.data.msg?t.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):t.$message({message:e.data.msg,type:"error"})}).catch(function(e){t.$message.error("删除失败,请重新删除")})}).catch(function(){t.$message({type:"info",message:"取消删除"})}):t.$message({type:"error",message:"请先选择要删除的线索"})},handleDelete:function(t,e){var s=this,o=this,i=a("1nuA"),r=[];r.ids=e.id,o.$confirm("是否确认删除["+e.name+"]？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){t.value;n()({method:"post",url:o.$store.state.defaultHttp+"competitor/deleteByPrimaryKey.do?cId="+o.$store.state.iscId,data:i.stringify(r)}).then(function(t){t.data.code&&"200"==t.data.code?(o.$message({message:"删除成功",type:"success"}),o.$options.methods.loadData.bind(o)(!0)):t.data.msg&&"error"==t.data.msg?o.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):o.$message({message:t.data.msg,type:"error"})}).catch(function(t){o.$message.error("删除失败,请重新删除")})}).catch(function(){s.$message({type:"info",message:"取消删除【"+e.name+"】"})})},hangleChange:function(t,e){var s=this,o=a("1nuA"),i={};i.pageInfoId=e.pageInfoId,i.state=1==t?1:0,n()({method:"post",url:s.$store.state.defaultHttp+"userPageInfo/updateUserPageByid.do?cId="+s.$store.state.iscId+"&pId="+s.$store.state.ispId,data:o.stringify(i)}).then(function(t){t.data&&"success"==t.data&&s.$options.methods.reloadData.bind(s)(!0)}).catch(function(t){})},search:function(){this.$options.methods.loadData.bind(this)()},handleSizeChange:function(t){this.limit=t,this.$options.methods.loadData.bind(this)()},handleCurrentChange:function(t){this.page=t,this.$options.methods.loadData.bind(this)()}}}),r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"radioList"},[a("el-radio-group",{model:{value:t.searchList.label,callback:function(e){t.$set(t.searchList,"label",e)},expression:"searchList.label"}},[a("span",{staticClass:"nameList"},[t._v("数据授权：")]),t._v(" "),t._l(t.pIdData,function(e){return a("el-radio",{key:e.index,attrs:{label:e.index},on:{change:function(e){t.search()}}},[t._v(t._s(e.name))])})],2)],1),t._v(" "),a("div",{staticClass:"searchList",staticStyle:{width:"100%"}},[a("span",{staticClass:"nameList"},[t._v("公司名称：")]),t._v(" "),a("el-input",{staticStyle:{"margin-left":"20px",width:"400px"},attrs:{placeholder:"请输入公司名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.search(e):null}},model:{value:t.searchList.searchName,callback:function(e){t.$set(t.searchList,"searchName",e)},expression:"searchList.searchName"}}),t._v("\n          \n        "),a("el-button",{attrs:{icon:"el-icon-search",type:"primary",size:"mini"},on:{click:function(e){t.search()}}},[t._v("查询")])],1),t._v(" "),a("div",{staticClass:"entry"},[a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(e){t.handleAdd()}}},[t._v("新增")]),t._v(" "),a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(e){t.handleDeletes()}}},[t._v("删除")]),t._v(" "),a("div",{staticClass:"totalnum_head"},[t._v("共 "),a("span",{staticClass:"bold_span"},[t._v(t._s(t.tableNumber))]),t._v(" 条")]),t._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"100",trigger:"click"}},[a("el-checkbox-group",{staticClass:"checklist",staticStyle:{"max-height":"600px","overflow-y":"overlay","overflow-x":"hidden"},model:{value:t.checklist,callback:function(e){t.checklist=e},expression:"checklist"}},t._l(t.filterList,function(e){return a("el-checkbox",{key:e.id,staticClass:"checkone",attrs:{label:e.name,value:e.state},on:{change:function(a){t.hangleChange(a,e)}}})})),t._v(" "),a("el-button",{staticClass:"info-btn screen",attrs:{slot:"reference",icon:"el-icon-more",type:"mini"},slot:"reference"})],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:""},on:{"selection-change":t.selectInfo}},[a("el-table-column",{attrs:{fixed:"","header-align":"center",align:"center",type:"selection",width:"45",prop:"id",sortable:""},on:{"selection-change":t.selectInfo}}),t._v(" "),t._l(t.filterList,function(e,s){return a("div",{key:s},["contacts"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"联系人",prop:"contacts",fixed:"","min-width":"100",sortable:""}}):t._e(),t._v(" "),"name"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"公司名称",prop:"name",fixed:"","min-width":"200",sortable:""}}):t._e(),t._v(" "),"phone"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"手机",prop:"phone","min-width":"110",sortable:""}}):t._e(),t._v(" "),"email"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"邮箱",prop:"email","min-width":"130",sortable:""}}):t._e(),t._v(" "),"qq"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"QQ",prop:"qq","min-width":"110",sortable:""}}):t._e(),t._v(" "),"telephone"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"固话",prop:"telephone","min-width":"110",sortable:""}}):t._e(),t._v(" "),"microblog"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"微博",prop:"microblog","min-width":"110",sortable:""}}):t._e(),t._v(" "),"wangwang"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"旺旺",prop:"wangwang","min-width":"110",sortable:""}}):t._e(),t._v(" "),"address"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"地址",prop:"address","min-width":"180","show-overflow-tooltip":"",sortable:""}}):t._e(),t._v(" "),"position"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"职位",prop:"position","min-width":"100",sortable:""}}):t._e(),t._v(" "),"sex"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"性别",prop:"sex","min-width":"90",sortable:""}}):t._e(),t._v(" "),"birthday"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"生日",prop:"birthday","min-width":"110",sortable:""}}):t._e(),t._v(" "),"provincialAndUrbanAreas"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"省-市-区",prop:"countryid","min-width":"150",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                    "+t._s(e.row.country)+"-"+t._s(e.row.city)+"-"+t._s(e.row.area)+"\n                ")]}}])}):t._e(),t._v(" "),"createTime"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"创建时间",prop:"createTime","min-width":"150",sortable:""}}):t._e(),t._v(" "),"pId"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"负责人",prop:"private_employee","min-width":"100",sortable:""}}):t._e(),t._v(" "),"secondid"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"部门",prop:"deptname","min-width":"110",sortable:""}}):t._e(),t._v(" "),"deptid"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"机构",prop:"parentname","min-width":"110","show-overflow-tooltip":"",sortable:""}}):t._e()],1)}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"150","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],2)],1)},staticRenderFns:[]};var l=a("VU/8")(i,r,!1,function(t){a("kAhx")},null,null);e.default=l.exports},kAhx:function(t,e){}});