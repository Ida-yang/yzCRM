webpackJsonp([37],{Nmtr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("INCx"),n=a.n(s),i=a("wtEF"),r=a("mtWM"),o=a.n(r),l=(a("mw3O"),{name:"orderReceive",store:i.a,filters:{commaing:function(e){if(0!==e){var t=n()(e).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,"),a=".00",s=e.toString().split(".");return 2===s.length?1===(a=s[1].toString()).length?t+"."+a+"0":t+"."+a:t+a}return 0}},computed:{tableData:function(){return i.a.state.orderReceiveList},tableNumber:function(){return i.a.state.orderReceiveListnumber}},data:function(){return{msg:"receive.vue",fieldHeadData:[],page:1,limit:20,searchList:{example:0,searchName:null,stateid:null,label:1},stateData:[{index:null,name:"全部"},{index:0,name:"待审核"},{index:1,name:"审核中"},{index:2,name:"已审核"},{index:3,name:"未通过"}],pIdData:[{index:null,name:"全部"},{index:1,name:"我的"},{index:2,name:"本组"},{index:3,name:"本机构"},{index:4,name:"待我审核"}],timeData:[{id:0,name:"全部"},{id:1,name:"今天"},{id:2,name:"昨天"},{id:3,name:"本周"},{id:4,name:"本月"},{id:5,name:"上月"}],nullvalue:null,filterList:null,checklist:null}},activated:function(){this.loadFieldHead(),this.loadTable()},mounted:function(){this.loadFieldHead(),this.loadTable(),this.reloadData()},methods:{loadTable:function(){var e=this,t=a("1nuA"),s={};0==this.searchList.label?s.pId=null:1==this.searchList.label?s.pId=e.$store.state.ispId:2==this.searchList.label?s.secondid=e.$store.state.deptid:3==this.searchList.label?s.deptid=e.$store.state.insid:4==this.searchList.label&&(s.examine=e.$store.state.ispId),s.searchName=this.searchList.searchName,s.example=this.searchList.example,s.page=this.page,s.limit=this.limit,s.label=12,o()({method:"post",url:e.$store.state.defaultHttp+"pageInfo/queryPageList.do?cId="+e.$store.state.iscId,data:t.stringify(s)}).then(function(t){var a=t.data.map.success;a.forEach(function(e){0!==e.checkStatus?e.unUpdate=!0:e.unUpdate=!1}),e.$store.state.orderReceiveList=a,e.$store.state.orderReceiveListnumber=t.data.count}).catch(function(e){})},loadFieldHead:function(){var e=this,t=a("1nuA"),s={label:12,pId:this.$store.state.ispId};o()({method:"post",url:e.$store.state.defaultHttp+"field/queryListHead.do?cId="+e.$store.state.iscId,data:t.stringify(s)}).then(function(t){e.fieldHeadData=t.data}).catch(function(e){})},reloadData:function(){var e=this,t=a("1nuA"),s={type:"订单收款"},n={type:"订单收款",state:1};o()({method:"post",url:e.$store.state.defaultHttp+"userPageInfo/getAllUserPage.do?cId="+e.$store.state.iscId+"&pId="+e.$store.state.ispId,data:t.stringify(s)}).then(function(t){e.filterList=t.data}).catch(function(e){}),o()({method:"post",url:e.$store.state.defaultHttp+"userPageInfo/getUserPage.do?cId="+e.$store.state.iscId+"&pId="+e.$store.state.ispId,data:t.stringify(n)}).then(function(t){e.checklist=t.data}).catch(function(e){})},openDetails:function(e,t){this.$store.state.orderReceiveDetailData={id:t.id,batch_id:t.batch_id},this.$router.push({path:"/orderReceiveDetail"})},getSummaries:function(e){var t=e.columns,a=e.data,s=[];return t.forEach(function(e,t){if(0!==t){var i=a.map(function(t){return Number(t[e.property])});if("money"==e.property||"discountAfter"==e.property){s[t]=i.reduce(function(e,t){return t+e},0),s[t]=s[t].toFixed(2);var r=n()(s[t]).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,"),o=".00",l=s[t].split(".");2===l.length?1===(o=l[1].toString()).length?s[t]=r+"."+o+"0":s[t]=r+"."+o:s[t]=r+o,s[t]+=" 元"}else s[t]=""}else s[t]="总价"}),s},handleAdd:function(){this.$store.state.orderReceiveAddOrUpdateData=null,this.$router.push({path:"/orderReceiveadd"})},handleEdit:function(e,t){this.$store.state.orderReceiveAddOrUpdateData={id:t.id,batch_id:t.batch_id},this.$router.push({path:"/orderReceiveupdate"})},handledetele:function(e,t){var s=this,n=this,i=a("1nuA"),r={};r.id=t.id,r.batch_id=t.batch_id,n.$confirm("是否确认删除["+t.customerName+"]的收款单？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){e.value;o()({method:"post",url:n.$store.state.defaultHttp+"orderBack/delete.do?cId="+n.$store.state.iscId,data:i.stringify(r)}).then(function(e){e.data.code&&"200"==e.data.code?(n.$message({message:"删除成功",type:"success"}),n.$options.methods.loadTable.bind(n)(!0)):e.data.msg&&"error"==e.data.msg?n.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):n.$message({message:e.data.msg,type:"error"})}).catch(function(e){n.$message.error("删除失败，请重新操作")})}).catch(function(){s.$message({type:"info",message:"取消删除["+t.customerName+"]的收款单"})})},search:function(){this.$options.methods.loadTable.bind(this)()},handleSizeChange:function(e){this.limit=e,this.$options.methods.loadTable.bind(this)()},handleCurrentChange:function(e){this.page=e,this.$options.methods.loadTable.bind(this)()},hangleChange:function(e,t){var s=this,n=a("1nuA"),i={};i.pageInfoId=t.pageInfoId,i.state=1==e?1:0,o()({method:"post",url:s.$store.state.defaultHttp+"userPageInfo/updateUserPageByid.do?cId="+s.$store.state.iscId+"&pId="+s.$store.state.ispId,data:n.stringify(i)}).then(function(e){e.data&&"success"==e.data&&s.$options.methods.reloadData.bind(s)(!0)}).catch(function(e){})}}}),c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"radioList"},[a("el-radio-group",{model:{value:e.searchList.label,callback:function(t){e.$set(e.searchList,"label",t)},expression:"searchList.label"}},[a("span",{staticClass:"nameList"},[e._v("数据授权：")]),e._v(" "),e._l(e.pIdData,function(t){return a("el-radio",{key:t.index,attrs:{label:t.index},on:{change:function(t){e.search()}}},[e._v(e._s(t.name))])})],2),e._v(" "),a("el-radio-group",{model:{value:e.searchList.example,callback:function(t){e.$set(e.searchList,"example",t)},expression:"searchList.example"}},[a("span",{staticClass:"nameList"},[e._v("收款日期：")]),e._v(" "),e._l(e.timeData,function(t){return a("el-radio",{key:t.id,attrs:{label:t.id},on:{change:function(t){e.search()}}},[e._v(e._s(t.name))])})],2)],1),e._v(" "),a("div",{staticClass:"searchList",staticStyle:{width:"100%"}},[a("span",{staticClass:"nameList"},[e._v("公司名称：")]),e._v(" "),a("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入公司名称"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.search(t):null}},model:{value:e.searchList.searchName,callback:function(t){e.$set(e.searchList,"searchName",t)},expression:"searchList.searchName"}}),e._v("\n          \n        "),a("el-button",{attrs:{icon:"el-icon-search",type:"primary",size:"mini"},on:{click:function(t){e.search()}}},[e._v("查询")])],1),e._v(" "),a("div",{staticClass:"entry"},[a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(t){e.handleAdd()}}},[e._v("新增")]),e._v(" "),a("div",{staticClass:"totalnum_head"},[e._v("共 "),a("span",{staticClass:"bold_span"},[e._v(e._s(e.tableNumber))]),e._v(" 条")]),e._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"100",trigger:"click"}},[a("el-checkbox-group",{staticClass:"checklist",staticStyle:{"max-height":"600px","overflow-y":"overlay","overflow-x":"hidden"},model:{value:e.checklist,callback:function(t){e.checklist=t},expression:"checklist"}},e._l(e.filterList,function(t){return a("el-checkbox",{key:t.id,staticClass:"checkone",attrs:{label:t.name,value:t.state},on:{change:function(a){e.hangleChange(a,t)}}})})),e._v(" "),a("el-button",{staticClass:"info-btn screen",attrs:{slot:"reference",icon:"el-icon-more",type:"mini"},slot:"reference"})],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:"","summary-method":e.getSummaries,"show-summary":""}},[a("el-table-column",{attrs:{"header-align":"center",fixed:"",align:"center",type:"index",width:"45"}}),e._v(" "),a("el-table-column",{attrs:{label:"日期",prop:"createTime",fixed:"","min-width":"110",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"收款编号",prop:"backNo",fixed:"","min-width":"150","show-overflow-tooltip":"",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"hoverline",on:{click:function(a){e.openDetails(t.$index,t.row)}}},[e._v("\n                    "+e._s(t.row.backNo)+"\n                ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"公司名称",prop:"customerName","min-width":"200",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"本次收款金额",prop:"money","min-width":"130",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(e._f("commaing")(t.row.money))+"\n            ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"折后金额",prop:"discountAfter","min-width":"130",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(e._f("commaing")(t.row.discountAfter))+"\n            ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"结算账户",prop:"pay_type","min-width":"110",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"状态",prop:"checkStatus",width:"90",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.checkStatus?a("el-tag",{staticStyle:{"background-color":"#ffffff",color:"#606266","border-color":"#dcdfe6"},attrs:{size:"small",effect:"dark"}},[e._v("待审核")]):e._e(),e._v(" "),1==t.row.checkStatus?a("el-tag",{staticStyle:{"background-color":"#e6a23c",color:"#ffffff","border-color":"#e6a23c"},attrs:{size:"small",effect:"dark"}},[e._v("审核中")]):e._e(),e._v(" "),2==t.row.checkStatus?a("el-tag",{staticStyle:{"background-color":"#67c23a",color:"#ffffff","border-color":"#67c23a"},attrs:{size:"small",effect:"dark"}},[e._v("已审核")]):e._e(),e._v(" "),3==t.row.checkStatus?a("el-tag",{staticStyle:{"background-color":"#f56c6c",color:"#ffffff","border-color":"#f56c6c"},attrs:{size:"small",effect:"dark"}},[e._v("未通过")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"制单人",prop:"private_employee","min-width":"100",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"部门",prop:"deptname","min-width":"110",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"机构",prop:"parentname","min-width":"130","show-overflow-tooltip":"",sortable:""}}),e._v(" "),e._l(e.fieldHeadData,function(e){return a("el-table-column",{key:e.field_name,attrs:{label:e.name,prop:e.field_name,"min-width":"130",sortable:""}})}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"150","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",disabled:t.row.unUpdate},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handledetele(t.$index,t.row)}}},[e._v("删除")])]}}])})],2),e._v(" "),a("div",{staticClass:"block numberPage"},[a("el-pagination",{attrs:{"current-page":e.page,"page-sizes":[20,50,100,500],"page-size":20,layout:"total, sizes, prev, pager, next, jumper",total:e.tableNumber},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var d=a("VU/8")(l,c,!1,function(e){a("r9lT")},null,null);t.default=d.exports},r9lT:function(e,t){}});