webpackJsonp([47],{Idlu:function(t,e){},YClR:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("wtEF"),i=a("mtWM"),n=a.n(i),r=(a("mw3O"),{name:"visitplan",store:s.a,computed:{tableData:function(){return s.a.state.visitplanList},tableNumber:function(){return s.a.state.visitplanListnumber}},data:function(){return{msg:"拜访计划",btnList:[{id:"1",name:"未完成"},{id:"2",name:"已完成"},{id:"3",name:"作废"}],progress:"",completed:"",nullify:"",idArr:{id:null},state:"未完成",filterList:null,checklist:null,searchList:{label:"1",time:null,state:"未完成",exa:null,searchName:null},pIdData:[{id:"0",name:"全部"},{id:"1",name:"我的"},{id:"2",name:"本组"},{id:"3",name:"本机构"},{id:"10",name:"我协助"},{id:"11",name:"我审核"}],timeData:[{id:"2",name:"今天"},{id:"1",name:"昨天"},{id:"5",name:"明天"},{id:"3",name:"本周"},{id:"6",name:"本月"},{id:"7",name:"上月"},{id:"8",name:"下月"}],stateData:[{id:"1",name:"未完成"},{id:"2",name:"已完成"},{id:"3",name:"作废"}],nullvalue:null,page:1,limit:15}},mounted:function(){this.reloadTable(),this.reloadData()},activated:function(){this.reloadTable()},methods:{reloadTable:function(){var t=this,e=a("1nuA"),s={};0==this.searchList.label?s.pId=t.nullvalue:1==this.searchList.label?s.pId=t.$store.state.ispId:2==this.searchList.label?s.secondid=t.$store.state.deptid:3==this.searchList.label?s.deptid=t.$store.state.insid:10==this.searchList.label?(s.userid=t.$store.state.ispId,s.type=1):11==this.searchList.label&&(s.userid=t.$store.state.ispId,s.type=2),this.searchList.state!==this.nullvalue&&(s.state=this.searchList.state),s.page=this.page,s.limit=this.limit,s.example=this.searchList.time,s.searchName=this.searchList.searchName,n()({method:"post",url:t.$store.state.defaultHttp+"visit/selectVisit.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){var a=e.data.map.success;t.$store.state.visitplanList=a,t.$store.state.visitplanListnumber=e.data.count,a.forEach(function(t){var e=Date.parse(t.updateTime),a=(new Date).getTime()-e;"未完成"==t.state||"申请拜访"==t.state?(t.progress="info",t.completed="",t.nullify=""):"已完成"==t.state?(t.progress="",t.completed="warning",t.nullify="",a>72e5&&(t.progressBtn=!0,t.nullifyBtn=!0,t.editBtn=!0,t.deleteBtn=!0)):(t.progress="",t.completed="",t.nullify="danger",t.completedBtn=!0,t.editBtn=!0),"已审核"==t.approverState&&(t.editBtn=!0,t.deleteBtn=!0),t.assistants=[],t.assistantsid=[],t.privateUser!==[]&&t.privateUser.forEach(function(e){t.assistants.push(e.private_name),t.assistantsid.push(e.private_id)})})}).catch(function(t){})},reloadData:function(){var t=this,e=a("1nuA"),s={type:"拜访计划"},i={type:"拜访计划",state:1};n()({method:"post",url:t.$store.state.defaultHttp+"userPageInfo/getAllUserPage.do?cId="+t.$store.state.iscId+"&pId="+t.$store.state.ispId,data:e.stringify(s)}).then(function(e){t.filterList=e.data}).catch(function(t){}),n()({method:"post",url:t.$store.state.defaultHttp+"userPageInfo/getUserPage.do?cId="+t.$store.state.iscId+"&pId="+t.$store.state.ispId,data:e.stringify(i)}).then(function(e){t.checklist=e.data}).catch(function(t){})},selectInfo:function(t){var e=t,a=[new Array];e.forEach(function(t){0!=t.id&&a.push(t.id)}),this.idArr.id=a},openDetails:function(t,e){this.$store.state.visitdetailsData={submitData:{id:e.id}},this.$router.push({path:"/visitplandetails"})},getTime:function(){this.$store.commit("getNowTime")},changeState:function(t,e){this.getTime();var s=this,i=a("1nuA"),r={};r.id=e.id,r.state=t.target.innerText,r.updateTime=this.$store.state.nowtime,e.pId==this.$store.state.ispId?n()({method:"post",url:s.$store.state.defaultHttp+"visit/updateVisitState.do?cId="+s.$store.state.iscId,data:i.stringify(r)}).then(function(t){t.data.code&&200==t.data.code?(s.$message({message:"修改成功",type:"success"}),s.$options.methods.reloadTable.bind(s)(!0)):s.$message({message:t.data.msg,type:"error"})}).catch(function(t){s.$message.error("操作失败,请重新操作")}):s.$message({message:"对不起，您没有修改状态的权限",type:"error"})},handleAdd:function(){var t=this,e={createForm:[{label:"拜访公司",inputModel:"customerName",type:"require"},{label:"拜访时间",inputModel:"visitTime",type:"date"},{label:"结束时间",inputModel:"endTime",type:"date"},{label:"提醒时间",inputModel:"remindTime",type:"date"},{label:"拜访对象",inputModel:"contactsid",type:"select"},{label:"拜访主题",inputModel:"visitTheme"},{label:"拜访目的",inputModel:"visitObjective",type:"textarea"},{label:"协助人员",inputModel:"assistantsid",type:"select",multiple:!0},{label:"备注",inputModel:"remarks",type:"textarea"}],setForm:{customerName:"",visitTime:"",endTime:"",remindTime:"",contactsid:"",visitTheme:"",visitObjective:"",assistantsid:"",remarks:""}};e.submitURL=this.$store.state.defaultHttp+"visit/insertVisit.do?cId="+this.$store.state.iscId+"&pId="+this.$store.state.ispId,this.$store.state.visitaddOrUpdateData=e,n()({method:"get",url:t.$store.state.defaultHttp+"visitJurisdiction/insert.do"}).then(function(e){e.data.msg&&"error"==e.data.msg?t.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):t.$router.push({path:"/visitplanaddorupdate"})}).catch(function(t){})},handleEdit:function(t,e){var a=this,s={createForm:[{label:"拜访公司",inputModel:"customerName",type:"require"},{label:"拜访时间",inputModel:"visitTime",type:"date"},{label:"结束时间",inputModel:"endTime",type:"date"},{label:"提醒时间",inputModel:"remindTime",type:"date"},{label:"拜访对象",inputModel:"contactsid",type:"select"},{label:"拜访主题",inputModel:"visitTheme"},{label:"拜访目的",inputModel:"visitObjective",type:"textarea"},{label:"协助人员",inputModel:"assistantsid",type:"select",multiple:!0},{label:"备注",inputModel:"remarks",type:"textarea"}]};s.setForm={customerpoolid:e.customerpoolid,customerName:e.customerName,visitTime:e.visitTime,endTime:e.endTime,remindTime:e.remindTime,contactsid:e.contactsid,contactsName:e.contactsName,visitTheme:e.visitTheme,visitObjective:e.visitObjective,assistantsid:e.assistantsid,assistants:e.assistants,remarks:e.remarks},s.submitData={id:e.id},s.submitURL=this.$store.state.defaultHttp+"visit/updateVisit.do?cId="+this.$store.state.iscId+"&pId="+this.$store.state.ispId,this.$store.state.visitaddOrUpdateData=s,n()({method:"get",url:a.$store.state.defaultHttp+"visitJurisdiction/update.do"}).then(function(t){t.data.msg&&"error"==t.data.msg?a.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):a.$router.push({path:"/visitplanaddorupdate"})}).catch(function(t){})},handledelete:function(t,e){var s=this,i=this,r=a("1nuA"),o=[];o.id=e.id,i.$confirm("是否确认删除["+e.visitTheme+"]？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){t.value;n()({method:"post",url:i.$store.state.defaultHttp+"visit/deleteVisit.do?cId="+i.$store.state.iscId,data:r.stringify(o)}).then(function(t){t.data.code&&200==t.data.code?(i.$message({message:"删除成功",type:"success"}),i.$options.methods.reloadTable.bind(i)(!0)):t.data.msg&&"error"==t.data.msg?i.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):i.$message({message:t.data.msg,type:"error"})}).catch(function(t){i.$message.error("删除失败,请重新删除")})}).catch(function(){s.$message({type:"info",message:"取消删除["+e.visitTheme+"]"})})},hangleChange:function(t,e){var s=this,i=a("1nuA"),r={};r.pageInfoId=e.pageInfoId,r.state=1==t?1:0,n()({method:"post",url:s.$store.state.defaultHttp+"userPageInfo/updateUserPageByid.do?cId="+s.$store.state.iscId+"&pId="+s.$store.state.ispId,data:i.stringify(r)}).then(function(t){t.data&&"success"==t.data&&s.$options.methods.reloadData.bind(s)(!0)}).catch(function(t){})},search:function(){var t=this,e="",a=1;0==this.searchList.label?(e="visitJurisdiction/all.do",a=0):2==this.searchList.label?(e="visitJurisdiction/second.do",a=0):3==this.searchList.label?(e="visitJurisdiction/dept.do",a=0):10==this.searchList.label?(e="visitJurisdiction/assistants.do",a=0):11==this.searchList.label&&(e="visitJurisdiction/approver.do",a=0),0==a?n()({method:"get",url:t.$store.state.defaultHttp+e}).then(function(e){e.data.msg&&"error"==e.data.msg?t.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):t.$options.methods.reloadTable.bind(t)(!0)}).catch(function(t){}):t.$options.methods.reloadTable.bind(t)(!0)},handleSizeChange:function(t){this.limit=t,this.$options.methods.reloadTable.bind(this)(!0)},handleCurrentChange:function(t){this.page=t,this.$options.methods.reloadTable.bind(this)(!0)}}}),o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"radioList"},[a("el-radio-group",{model:{value:t.searchList.label,callback:function(e){t.$set(t.searchList,"label",e)},expression:"searchList.label"}},[a("span",{staticClass:"nameList"},[t._v("数据授权：")]),t._v(" "),t._l(t.pIdData,function(e){return a("el-radio",{key:e.id,attrs:{label:e.id},on:{change:function(e){t.search()}}},[t._v(t._s(e.name))])})],2),t._v(" "),a("el-radio-group",{model:{value:t.searchList.time,callback:function(e){t.$set(t.searchList,"time",e)},expression:"searchList.time"}},[a("span",{staticClass:"nameList"},[t._v("计划时间：")]),t._v(" "),a("el-radio",{attrs:{label:t.nullvalue},on:{change:function(e){t.search()}}},[t._v("全部")]),t._v(" "),t._l(t.timeData,function(e){return a("el-radio",{key:e.id,attrs:{label:e.id},on:{change:function(e){t.search()}}},[t._v(t._s(e.name))])})],2),t._v(" "),a("el-radio-group",{model:{value:t.searchList.state,callback:function(e){t.$set(t.searchList,"state",e)},expression:"searchList.state"}},[a("span",{staticClass:"nameList"},[t._v("计划状态：")]),t._v(" "),a("el-radio",{attrs:{label:t.nullvalue},on:{change:function(e){t.search()}}},[t._v("全部")]),t._v(" "),t._l(t.stateData,function(e){return a("el-radio",{key:e.id,attrs:{label:e.name},on:{change:function(e){t.search()}}},[t._v(t._s(e.name))])})],2)],1),t._v(" "),a("div",{staticClass:"searchList"},[a("span",{staticClass:"nameList"},[t._v("公司名称：")]),t._v(" "),a("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入公司名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.search(e):null}},model:{value:t.searchList.searchName,callback:function(e){t.$set(t.searchList,"searchName",e)},expression:"searchList.searchName"}}),t._v("\n          \n        "),a("el-button",{attrs:{icon:"el-icon-search",type:"primary",size:"mini"},on:{click:function(e){t.search()}}},[t._v("查询")])],1),t._v(" "),a("div",{staticClass:"entry"},[a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(e){t.handleAdd()}}},[t._v("新增")]),t._v(" "),a("div",{staticClass:"totalnum_head"},[t._v("共 "),a("span",{staticClass:"bold_span"},[t._v(t._s(t.tableNumber))]),t._v(" 条")]),t._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"100",trigger:"click"}},[a("el-checkbox-group",{staticClass:"checklist",staticStyle:{"max-height":"600px","overflow-y":"overlay","overflow-x":"hidden"},model:{value:t.checklist,callback:function(e){t.checklist=e},expression:"checklist"}},t._l(t.filterList,function(e){return a("el-checkbox",{key:e.id,staticClass:"checkone",attrs:{label:e.name,value:e.state},on:{change:function(a){t.hangleChange(a,e)}}})})),t._v(" "),a("el-button",{staticClass:"info-btn screen",attrs:{slot:"reference",icon:"el-icon-more",type:"mini"},slot:"reference"})],1)],1),t._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:""},on:{"selection-change":t.selectInfo}},[a("el-table-column",{attrs:{fixed:"","header-align":"center",align:"center",type:"selection",width:"45",prop:"id",sortable:""},on:{"selection-change":t.selectInfo}}),t._v(" "),t._l(t.filterList,function(e,s){return a("div",{key:s},["visitTheme"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"主要信息",prop:"id",fixed:"","min-width":"350",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"visit_info"},[a("span",{staticClass:"visit_theme visit_customer hoverline",on:{click:function(a){t.openDetails(e.$index,e.row)}}},[t._v(t._s(e.row.customerName))]),t._v(" "),a("span",{staticClass:"visit_theme"},[t._v(t._s(e.row.contactsName))])]),t._v(" "),a("div",{staticClass:"visit_info"},[t._v(t._s(e.row.visitTheme))])]}}])}):t._e(),t._v(" "),"pheone"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"电话",prop:"phone","min-width":"110",sortable:""}}):t._e(),t._v(" "),"visitTime"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"计划时间",prop:"visitTime","min-width":"150",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("p",[t._v(t._s(e.row.visitTime))]),t._v(" "),a("p",[t._v(t._s(e.row.endTime))])])]}}])}):t._e(),t._v(" "),"private_employee"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"负责人",prop:"private_employee","min-width":"100",sortable:""}}):t._e(),t._v(" "),"assistants"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"协助人",prop:"assistants","min-width":"100",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",t._l(e.row.assistants,function(e,s){return a("p",{key:s,attrs:{label:e}},[t._v(t._s(e)+" , ")])}))]}}])}):t._e(),t._v(" "),"approverState"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"审核状态",prop:"approverState","min-width":"110",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.checkStatus?a("el-tag",{staticStyle:{"background-color":"#ffffff",color:"#606266","border-color":"#dcdfe6"},attrs:{size:"small",effect:"dark"}},[t._v("待审核")]):t._e(),t._v(" "),1==e.row.checkStatus?a("el-tag",{staticStyle:{"background-color":"#e6a23c",color:"#ffffff","border-color":"#e6a23c"},attrs:{size:"small",effect:"dark"}},[t._v("审核中")]):t._e(),t._v(" "),2==e.row.checkStatus?a("el-tag",{staticStyle:{"background-color":"#67c23a",color:"#ffffff","border-color":"#67c23a"},attrs:{size:"small",effect:"dark"}},[t._v("已审核")]):t._e(),t._v(" "),3==e.row.checkStatus?a("el-tag",{staticStyle:{"background-color":"#f56c6c",color:"#ffffff","border-color":"#f56c6c"},attrs:{size:"small",effect:"dark"}},[t._v("未通过")]):t._e()]}}])}):t._e(),t._v(" "),"remindTime"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"提醒时间",prop:"remindTime","min-width":"150",sortable:""}}):t._e(),t._v(" "),"state"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"状态",prop:"state","min-width":"220",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button-group",[a("el-button",{attrs:{size:"mini",disabled:e.row.progressBtn,type:e.row.progress},on:{click:function(a){t.changeState(a,e.row)}}},[t._v("未完成")]),t._v(" "),a("el-button",{attrs:{size:"mini",disabled:e.row.completedBtn,type:e.row.completed},on:{click:function(a){t.changeState(a,e.row)}}},[t._v("已完成")]),t._v(" "),a("el-button",{attrs:{size:"mini",disabled:e.row.nullifyBtn,type:e.row.nullify},on:{click:function(a){t.changeState(a,e.row)}}},[t._v("作废")])],1)]}}])}):t._e(),t._v(" "),"deptname"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"部门",prop:"deptname","min-width":"110",sortable:""}}):t._e(),t._v(" "),"parentname"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"机构",prop:"parentname","show-overflow-tooltip":"","min-width":"110",sortable:""}}):t._e()],1)}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"150","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",disabled:e.row.editBtn},on:{click:function(a){t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger",disabled:e.row.deleteBtn},on:{click:function(a){t.handledelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],2),t._v(" "),a("div",{staticClass:"block numberPage"},[a("el-pagination",{attrs:{"current-page":t.page,"page-sizes":[20,50,100,500],"page-size":20,layout:"total, sizes, prev, pager, next, jumper",total:t.tableNumber},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var l=a("VU/8")(r,o,!1,function(t){a("Idlu")},null,null);e.default=l.exports}});