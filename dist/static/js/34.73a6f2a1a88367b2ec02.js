webpackJsonp([34],{lnBb:function(t,e){},pPvd:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("woOf"),o=a.n(s),i=a("INCx"),n=a.n(i),r=a("wtEF"),l=a("mtWM"),p=a.n(l),c=(a("mw3O"),a("9igS")),u={name:"businessOpportunity",props:{totalNum:Number},store:r.a,computed:{tableData:function(){return r.a.state.businessOpportunityList},tableNumber:function(){return r.a.state.businessOpportunityListnumber}},filters:{rounding:function(t){if(t){var e=n()(t).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,"),a=".00",s=t.toString().split(".");return 2===s.length?1===(a=s[1].toString()).length?e+"."+a+"0":e+"."+a:e+a}}},data:function(){return{searchList:{searchName:null,time:null,state:null,keyWord:null,label:"1"},searchListNew:{searchName:null,time:null,state:null,keyWord:null,label:"1"},businessData:[{label:"0",value:"全部"},{label:"1",value:"我的"},{label:"2",value:"本组"},{label:"3",value:"本机构"}],timeData:[{id:"1",typeName:"今天"},{id:"2",typeName:"昨天"},{id:"3",typeName:"本周"},{id:"4",typeName:"本月"},{id:"5",typeName:"上月"}],stepData:[],stateData:[{id:"6",typeName:"本月已成交"},{id:"1",typeName:"预计7天成交"},{id:"2",typeName:"预计15天成交"},{id:"3",typeName:"预计本月成交"},{id:"4",typeName:"预计下月成交"},{id:"5",typeName:"异常商机"}],nullvalue:null,page:1,limit:20,idArr:{id:null},filterList:null,checklist:null,dialogFormVisible:!1,dialogFormVisible1:!1,formLabelWidth:"130px",tableDatas:[{title:"当月预计成交金额",jine:"金额",yujizhanbi:"预计占比",shijichengjiao:"实际成交",shijizhanbi:"实际占比"},{title:"预计第一周成交",jine:"金额",yujizhanbi:"预计占比",shijichengjiao:"实际成交",shijizhanbi:"实际占比"},{title:"预计第二周成交",jine:"金额",yujizhanbi:"预计占比",shijichengjiao:"实际成交",shijizhanbi:"实际占比"},{title:"预计第三周成交",jine:"金额",yujizhanbi:"预计占比",shijichengjiao:"实际成交",shijizhanbi:"实际占比"},{title:"预计第四周成交",jine:"金额",yujizhanbi:"预计占比",shijichengjiao:"实际成交",shijizhanbi:"实际占比"}],collapse5:!1}},beforeRouteLeave:function(t,e,a){this.collapse5=!1,c.a.$emit("collapse5",this.collapse5),a()},activated:function(){this.reloadTable()},mounted:function(){this.reloadTable(),this.reloadData(),this.loadStep()},methods:{reloadTable:function(){var t=this,e=a("1nuA"),s={};s.searchName=this.searchList.searchName,0==this.searchList.label?s.pId=t.nullvalue:1==this.searchList.label?s.pId=t.$store.state.ispId:2==this.searchList.label?s.secondid=t.$store.state.deptid:3==this.searchList.label&&(s.deptid=t.$store.state.insid),s.example=this.searchList.time,s.stateid=this.searchList.state,s.keyWord=this.searchList.keyWord,s.page=this.page,s.limit=this.limit,p()({method:"post",url:t.$store.state.defaultHttp+"opportunity/query.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){var a=e.data.map.success;a.forEach(function(t){t.successAmount=0,t.failAmount=0,t.estimatedAmount=0,"100"==t.opportunityProgress[0].progress_probability?(t.stepcolor="#67c23a",t.successAmount=t.opportunity_achievement,t.failAmount=0,t.estimatedAmount=0):"0"==t.opportunityProgress[0].progress_probability?(t.successAmount=0,t.failAmount=t.opportunity_achievement,t.estimatedAmount=0):t.opportunityProgress[0].progress_probability<"50"?(t.stepcolor="#909399",t.successAmount=0,t.failAmount=0,t.estimatedAmount=t.opportunity_achievement):t.opportunityProgress[0].progress_probability>="50"&&(t.stepcolor="#f56c6c",t.successAmount=0,t.failAmount=0,t.estimatedAmount=t.opportunity_achievement)}),t.$store.state.businessOpportunityList=a,t.$store.state.businessOpportunityListnumber=e.data.count}).catch(function(t){})},reloadData:function(){var t=this,e=a("1nuA"),s={type:"商机"},o={type:"商机",state:1};p()({method:"post",url:t.$store.state.defaultHttp+"userPageInfo/getAllUserPage.do?cId="+t.$store.state.iscId+"&pId="+t.$store.state.ispId,data:e.stringify(s)}).then(function(e){t.filterList=e.data}).catch(function(t){}),p()({method:"post",url:t.$store.state.defaultHttp+"userPageInfo/getUserPage.do?cId="+t.$store.state.iscId+"&pId="+t.$store.state.ispId,data:e.stringify(o)}).then(function(e){t.checklist=e.data}).catch(function(t){})},loadStep:function(){var t=this;p()({method:"get",url:t.$store.state.defaultHttp+"addstep/selectAddstep.do?cId="+t.$store.state.iscId}).then(function(e){t.stepData=e.data.map.addsteps}).catch(function(t){})},colorMethod:function(t){return t<50?"#909399":t<100?"#f56c6c":"#67c23a"},selectInfo:function(t){this.multipleSelection=t;var e=t,a=[new Array];e.forEach(function(t){0!=t.opportunity_id&&a.push(t.opportunity_id)}),this.idArr.id=a},openDetails:function(t,e){var a={};a.submitData={id:e.opportunity_id},this.$store.state.oppdetailsData=a,this.$router.push({path:"/businessOpportunityDetails"})},handleAdd:function(){var t={},e=this;t.createForm=[{label:"商机名称",inputModel:"opportunity_name"},{label:"公司名称",inputModel:"customerpool_id",type:"require"},{label:"客户决策人",inputModel:"contacts_id",type:"select"},{label:"预计成交金额",inputModel:"opportunity_achievement",type:"number"},{label:"预计成交时间",inputModel:"opportunity_deal",type:"date"},{label:"负责人",inputModel:"user_id",disabled:!0},{label:"备注",inputModel:"opportunity_remarks",type:"textarea"}],t.setForm={opportunity_name:"",customerpool_id:"",customerpool_name:"",contacts_id:"",contacts_name:"",opportunity_achievement:"",opportunity_deal:"",user_id:this.$store.state.user,opportunity_remarks:""},t.submitURL=this.$store.state.defaultHttp+"opportunity/saveOrUpdate.do?cId="+this.$store.state.iscId,this.$store.state.oppaddOrUpdateData=t,p()({method:"get",url:e.$store.state.defaultHttp+"opportunityJurisdiction/insert.do"}).then(function(t){t.data.msg&&"error"==t.data.msg?e.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):e.$router.push({path:"/Opportunityaddorupdate"})}).catch(function(t){})},handleEdit:function(t,e){var a=this,s={createForm:[{label:"商机名称",inputModel:"opportunity_name"},{label:"公司名称",inputModel:"customerpool_id",type:"require"},{label:"客户决策人",inputModel:"contacts_id",type:"select"},{label:"预计成交金额",inputModel:"opportunity_achievement",type:"number"},{label:"预计成交时间",inputModel:"opportunity_deal",type:"date"},{label:"负责人",inputModel:"user_id",disabled:!0},{label:"备注",inputModel:"opportunity_remarks",type:"textarea"}]};s.setForm={opportunity_name:e.opportunity_name,customerpool_id:e.customerpool[0].id,customerpool_name:e.customerpool[0].name,contacts_id:e.contacts[0].coName,contacts_name:e.contacts[0].csId,opportunity_achievement:e.opportunity_achievement,opportunity_deal:e.opportunity_deal,user_id:e.private_employee,opportunity_remarks:e.opportunity_remarks},s.submitData={id:e.opportunity_id},s.submitURL=this.$store.state.defaultHttp+"opportunity/saveOrUpdate.do?cId="+this.$store.state.iscId,this.$store.state.oppaddOrUpdateData=s,p()({method:"get",url:a.$store.state.defaultHttp+"opportunityJurisdiction/update.do"}).then(function(t){t.data.msg&&"error"==t.data.msg?a.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):a.$router.push({path:"/Opportunityaddorupdate"})}).catch(function(t){})},handleDeletes:function(){var t=this,e=a("1nuA"),s=[];s.id=this.idArr.id,s.id?t.$confirm("是否确认删除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(a){a.value;p()({method:"post",url:t.$store.state.defaultHttp+"opportunity/delete.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){e.data.success&&1==e.data.success?(t.$message({message:"删除成功",type:"success"}),t.$options.methods.reloadTable.bind(t)(!0)):e.data.msg&&"error"==e.data.msg?t.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):t.$message({message:e.data.msg,type:"error"})}).catch(function(e){t.$message.error("删除失败,请重新删除")})}).catch(function(){t.$message({type:"info",message:"取消删除"})}):t.$message({type:"error",message:"请先选择要删除的商机"})},handleDelete:function(t,e){var s=this,o=this,i=a("1nuA"),n=[];n.id=e.opportunity_id,o.$confirm("是否确认删除["+e.opportunity_name+"]？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){t.value;p()({method:"post",url:o.$store.state.defaultHttp+"opportunity/delete.do?cId="+o.$store.state.iscId,data:i.stringify(n)}).then(function(t){t.data.success&&1==t.data.success?(o.$message({message:"删除成功",type:"success"}),o.$options.methods.reloadTable.bind(o)(!0)):t.data.msg&&"error"==t.data.msg?o.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):o.$message({message:t.data.msg,type:"error"})}).catch(function(t){o.$message.error("删除失败,请重新删除")})}).catch(function(){s.$message({type:"info",message:"取消删除["+e.opportunity_name+"]"})})},hangleChange:function(t,e){var s=this,o=a("1nuA"),i={};i.pageInfoId=e.pageInfoId,i.state=1==t?1:0,p()({method:"post",url:s.$store.state.defaultHttp+"userPageInfo/updateUserPageByid.do?cId="+s.$store.state.iscId+"&pId="+s.$store.state.ispId,data:o.stringify(i)}).then(function(t){t.data&&"success"==t.data&&s.$options.methods.reloadData.bind(s)(!0)}).catch(function(t){})},getSummaries:function(t){var e=t.columns,a=t.data,s=[];return e.forEach(function(t,e){if(0!==e){var o=a.map(function(e){return Number(e[t.property])});if("estimatedAmount"==t.property||"successAmount"==t.property||"failAmount"==t.property||"opportunity_achievement"==t.property){s[e]=o.reduce(function(t,e){return e+t},0),s[e]=s[e].toFixed(2);var i=n()(s[e]).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,"),r=".00",l=s[e].split(".");2===l.length?1===(r=l[1].toString()).length?s[e]=i+"."+r+"0":s[e]=i+"."+r:s[e]=i+r,s[e]+=" 元"}else s[e]=""}else s[e]="总价"}),s},search:function(){var t=this,e=(a("1nuA"),""),s=1;0==this.searchList.label?(e="opportunityJurisdiction/all.do",s=0):2==this.searchList.label?(e="opportunityJurisdiction/second.do",s=0):3==this.searchList.label&&(e="opportunityJurisdiction/dept.do",s=0),0==s?p()({method:"get",url:t.$store.state.defaultHttp+e}).then(function(e){e.data.msg&&"error"==e.data.msg?t.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):t.$options.methods.reloadTable.bind(t)(!0)}).catch(function(t){}):t.$options.methods.reloadTable.bind(t)(!0)},reset:function(){this.searchList=o()({},this.searchListNew),this.$options.methods.reloadTable.bind(this)(!0)},handleSizeChange:function(t){this.limit=t,this.$options.methods.reloadTable.bind(this)(!1)},handleCurrentChange:function(t){this.page=t,this.$options.methods.reloadTable.bind(this)(!1)},generateCharts:function(){a("1nuA");var t=new Date,e=t.getFullYear(),s=t.getMonth()+1;s=s<10?"0"+s:s;var o={};1==this.searchList.label?o.pId=this.$store.state.ispId:2==this.searchList.label?o.secondid=this.$store.state.deptid:3==this.searchList.label&&(o.deptid=this.$store.state.insid),o.yearMonth=e+"-"+s,this.$store.state.oppChartsData=o,this.collapse5=!this.collapse5,c.a.$emit("collapse5",this.collapse5)}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"radioList"},[a("el-radio-group",{model:{value:t.searchList.label,callback:function(e){t.$set(t.searchList,"label",e)},expression:"searchList.label"}},[a("span",{staticClass:"nameList"},[t._v("数据授权：")]),t._v(" "),t._l(t.businessData,function(e){return a("el-radio",{key:e.label,attrs:{label:e.label},on:{change:function(e){t.search()}}},[t._v(t._s(e.value))])})],2),t._v(" "),a("el-radio-group",{model:{value:t.searchList.state,callback:function(e){t.$set(t.searchList,"state",e)},expression:"searchList.state"}},[a("span",{staticClass:"nameList"},[t._v("商机进度：")]),t._v(" "),a("el-radio",{attrs:{label:t.nullvalue},on:{change:function(e){t.search()}}},[t._v("全部")]),t._v(" "),t._l(t.stepData,function(e){return a("el-radio",{key:e.step_id,attrs:{label:e.step_id},on:{change:function(e){t.search()}}},[t._v(t._s(e.step_name))])})],2),t._v(" "),a("el-radio-group",{model:{value:t.searchList.keyWord,callback:function(e){t.$set(t.searchList,"keyWord",e)},expression:"searchList.keyWord"}},[a("span",{staticClass:"nameList"},[t._v("商机预测：")]),t._v(" "),a("el-radio",{attrs:{label:t.nullvalue},on:{change:function(e){t.search()}}},[t._v("全部")]),t._v(" "),t._l(t.stateData,function(e){return a("el-radio",{key:e.id,attrs:{label:e.id},on:{change:function(e){t.search()}}},[t._v(t._s(e.typeName))])})],2),t._v(" "),a("el-radio-group",{model:{value:t.searchList.time,callback:function(e){t.$set(t.searchList,"time",e)},expression:"searchList.time"}},[a("span",{staticClass:"nameList"},[t._v("新增时间：")]),t._v(" "),a("el-radio",{attrs:{label:t.nullvalue},on:{change:function(e){t.search()}}},[t._v("全部")]),t._v(" "),t._l(t.timeData,function(e){return a("el-radio",{key:e.id,attrs:{label:e.id},on:{change:function(e){t.search()}}},[t._v(t._s(e.typeName))])})],2)],1),t._v(" "),a("div",{staticClass:"searchList",staticStyle:{width:"100%"}},[a("span",{staticClass:"nameList"},[t._v("公司名称：")]),t._v(" "),a("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入公司名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.search(e):null}},model:{value:t.searchList.searchName,callback:function(e){t.$set(t.searchList,"searchName",e)},expression:"searchList.searchName"}}),t._v("\n          \n        "),a("el-button",{attrs:{icon:"el-icon-search",type:"primary",size:"mini"},on:{click:function(e){t.search()}}},[t._v("查询")])],1),t._v(" "),a("div",{staticClass:"generCharts",on:{click:t.generateCharts}},[a("i",{staticClass:"mdi-chart-pie chart_icon"})]),t._v(" "),a("div",{staticClass:"entry"},[a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(e){t.handleAdd()}}},[t._v("新增")]),t._v(" "),a("el-button",{staticClass:"btn",attrs:{size:"mini"},on:{click:function(e){t.handleDeletes()}}},[t._v("删除")]),t._v(" "),a("div",{staticClass:"totalnum_head"},[t._v("共 "),a("span",{staticClass:"bold_span"},[t._v(t._s(t.tableNumber))]),t._v(" 条")]),t._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"100",trigger:"click"}},[a("el-checkbox-group",{staticClass:"checklist",model:{value:t.checklist,callback:function(e){t.checklist=e},expression:"checklist"}},t._l(t.filterList,function(e){return a("el-checkbox",{key:e.id,staticClass:"checkone",attrs:{label:e.name,value:e.state},on:{change:function(a){t.hangleChange(a,e)}}})})),t._v(" "),a("el-button",{staticClass:"info-btn screen",attrs:{slot:"reference",icon:"el-icon-more",type:"mini"},slot:"reference"})],1)],1),t._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:"","summary-method":t.getSummaries,"show-summary":""},on:{"selection-change":t.selectInfo}},[a("el-table-column",{attrs:{fixed:"","header-align":"center",align:"center",type:"selection",width:"45","scope.row.opportunity_id":"",prop:"opportunity_id"},on:{"selection-change":t.selectInfo}}),t._v(" "),t._l(t.filterList,function(e,s){return a("div",{key:s},["opportunity_number"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"商机编号",prop:"opportunity_number",fixed:"","min-width":"150",sortable:""}}):t._e(),t._v(" "),"opportunity_name"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"商机名称",prop:"opportunity_name",fixed:"","min-width":"150",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"hoverline",on:{click:function(a){t.openDetails(e.$index,e.row)}}},[t._v("\n                        "+t._s(e.row.opportunity_name)+"\n                    ")])]}}])}):t._e(),t._v(" "),"opportunity_time"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"创建时间",prop:"opportunity_time","min-width":"150",sortable:""}}):t._e(),t._v(" "),"customerpool[0].name"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"公司名称",prop:"customerpool[0].name","min-width":"200",sortable:""}}):t._e(),t._v(" "),"contacts[0].coName"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"客户决策人",prop:"contacts[0].coName","min-width":"120",sortable:""}}):t._e(),t._v(" "),"opportunityProgress[0].progress_name"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"商机进度",prop:"opportunityProgress[0].progress_name","min-width":"110",sortable:""}}):t._e(),t._v(" "),"opportunityProgress[0].progress_probability"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"成功几率",prop:"opportunityProgress[0].progress_probability","show-overflow-tooltip":"","min-width":"130",sortable:""},scopedSlots:t._u([{key:"default",fn:function(t){return[a("el-progress",{attrs:{"text-inside":!0,"stroke-width":20,percentage:parseInt(t.row.opportunityProgress[0].progress_probability),color:t.row.stepcolor}})]}}])}):t._e(),t._v(" "),"opportunity_achievement"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"预计成交金额",prop:"estimatedAmount","min-width":"130",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                    "+t._s(t._f("rounding")(e.row.estimatedAmount))+"\n                ")]}}])}):t._e(),t._v(" "),"successMoney"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"成功金额",prop:"successAmount","min-width":"130",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                    "+t._s(t._f("rounding")(e.row.successAmount))+"\n                ")]}}])}):t._e(),t._v(" "),"failMoney"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"失败金额",prop:"failAmount","min-width":"130",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                    "+t._s(t._f("rounding")(e.row.failAmount))+"\n                ")]}}])}):t._e(),t._v(" "),"opportunity_deal"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"预计成交时间",prop:"opportunity_deal","min-width":"150",sortable:""}}):t._e(),t._v(" "),"private_employee"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"负责人",prop:"private_employee","min-width":"90",sortable:""}}):t._e(),t._v(" "),"deptname"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"部门",prop:"deptname","min-width":"90",sortable:""}}):t._e(),t._v(" "),"parentname"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"机构",prop:"parentname","min-width":"110","show-overflow-tooltip":"",sortable:""}}):t._e(),t._v(" "),"opportunity_remarks"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"备注",prop:"opportunity_remarks","min-width":"180",sortable:""}}):t._e()],1)}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"150","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],2),t._v(" "),a("div",{staticClass:"block numberPage"},[a("el-pagination",{attrs:{"current-page":t.page,"page-sizes":[20,50,100,500],"page-size":20,layout:"total, sizes, prev, pager, next, jumper",total:t.tableNumber},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var h=a("VU/8")(u,d,!1,function(t){a("lnBb")},null,null);e.default=h.exports}});