webpackJsonp([50],{H9MT:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("wtEF"),n=a("mtWM"),i=a.n(n),o=(a("mw3O"),{name:"approvalProcess",store:s.a,computed:{tableData:function(){return s.a.state.approvalProcessList},tableNumber:function(){return s.a.state.approvalProcessListnumber}},data:function(){return{page:1,limit:20,keyType:"1",searchList:[{index:"1",name:"合同流程设置",isActive:!0},{index:"2",name:"销售订单流程设置",isActive:!1},{index:"3",name:"回款流程设置",isActive:!1},{index:"4",name:"办公流程设置",isActive:!1}]}},activated:function(){this.loadTable()},mounted:function(){this.loadTable()},methods:{loadTable:function(){var t=this,e=a("1nuA"),s={};s.page=this.page,s.limit=this.limit,s.keyType=this.keyType,i()({method:"post",url:t.$store.state.defaultHttp+"examine/queryAllExamine.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){var a=e.data.map.list;a.forEach(function(t){1==t.status?t.statusname="启用":0==t.status&&(t.statusname="禁用")}),t.$store.state.approvalProcessList=a,t.$store.state.approvalProcessListnumber=e.data.count}).catch(function(t){})},showTableval:function(t){this.keyType=t.index,this.searchList.forEach(function(t){t.isActive=!1}),t.isActive=!t.isActive,this.$options.methods.loadTable.bind(this)()},handleAdd:function(){this.$store.state.approvalupdateData=null,this.$router.push({path:"/approvalProcessaddorupdate"})},handleEdit:function(t,e){e.levelList=[],e.stepList.forEach(function(t){t.checkUserId=[],t.userList.forEach(function(e){t.checkUserId.push(e.userId)}),e.levelList.push({index:t.stepNum,stepType:t.stepType,name:"第 "+t.stepNum+" 级",checkUserId:t.checkUserId,remarks:t.remarks,del:!1})}),this.$store.state.approvalupdateData=e,this.$router.push({path:"/approvalProcessaddorupdate"})},handleDelete:function(t,e){var s=this,n=this,o=a("1nuA"),l={};l.id=e.id,l.status=2,l.pId=this.$store.state.ispId,n.$confirm("是否确认删除【"+e.name+"】？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){t.value;i()({method:"post",url:n.$store.state.defaultHttp+"examine/updateStatus.do?cId="+n.$store.state.iscId,data:o.stringify(l)}).then(function(t){t.data.code&&"200"==t.data.code?(n.$message({message:"删除成功",type:"success"}),n.$options.methods.loadTable.bind(n)()):n.$message({message:t.data.msg,type:"error"})}).catch(function(t){n.$message.error("删除失败,请重新删除")})}).catch(function(){s.$message({type:"info",message:"取消删除【"+e.name+"】"})})},handleSizeChange:function(t){this.limit=t,this.$options.methods.loadTable.bind(this)(!1)},handleCurrentChange:function(t){this.page=t,this.$options.methods.loadTable.bind(this)(!1)}}}),l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentall"},[a("div",{staticClass:"setleftcontent"},[a("ul",{staticClass:"namecontent"},t._l(t.searchList,function(e){return a("li",{key:e.index,class:{actived:e.isActive},attrs:{value:e.name},on:{click:function(a){t.showTableval(e)}}},[t._v(t._s(e.name))])}))]),t._v(" "),a("div",{staticClass:"centercontent"}),t._v(" "),a("div",{staticClass:"setrightcontent"},[a("div",{staticClass:"entry"},[a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(e){t.handleAdd()}}},[t._v("新增")]),t._v(" "),a("div",{staticClass:"totalnum_head"},[t._v("共 "),a("span",{staticClass:"bold_span"},[t._v(t._s(t.tableNumber))]),t._v(" 条")])],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:""}},[a("el-table-column",{attrs:{label:"审核流程",prop:"name",fixed:"","min-width":"110",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"关联对象",prop:"categoryTypeName","min-width":"110",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"应用部门",prop:"deptIdLs","min-width":"150",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.deptIdLs,function(e){return a("span",{key:e.id},[t._v(t._s(e.name)+",")])})}}])}),t._v(" "),a("el-table-column",{attrs:{label:"最后修改人",prop:"updateUserName","min-width":"120",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"创建时间",prop:"createTime","min-width":"150",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"备注",prop:"remarks","min-width":"180",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"150","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"block numberPage"},[a("el-pagination",{attrs:{"current-page":t.page,"page-sizes":[20,50,100,500],"page-size":20,layout:"total, sizes, prev, pager, next, jumper",total:t.tableNumber},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)])},staticRenderFns:[]};var r=a("VU/8")(o,l,!1,function(t){a("TWnT")},null,null);e.default=r.exports},TWnT:function(t,e){}});