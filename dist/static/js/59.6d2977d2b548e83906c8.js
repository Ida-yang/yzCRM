webpackJsonp([59],{WqXw:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("wtEF"),s=a("mtWM"),i=a.n(s),n=(a("mw3O"),{name:"SMSradar",store:l.a,computed:{tableData:function(){return l.a.state.SMSradarList},tableNumber:function(){return l.a.state.SMSradarListnumber}},data:function(){return{msg:"营销雷达",searchList:{label:"1",time:null,keyType:"1"},searchName:null,pIdData:[{label:"0",value:"全部"},{label:"1",value:"我的"},{label:"2",value:"本组"},{label:"3",value:"本机构"}],timeData:[{id:"1",typeName:"今天"},{id:"2",typeName:"昨天"},{id:"3",typeName:"本周"},{id:"4",typeName:"本月"},{id:"5",typeName:"上月"}],nullvalue:null,page:1,limit:100,clearTimeSet:null}},beforeRouteLeave:function(e,t,a){clearInterval(this.clearTimeSet),this.clearTimeSet=null,a()},mounted:function(){this.loadTable()},activated:function(){this.loadTable(),this.setTime()},methods:{loadTable:function(){var e=this,t=a("1nuA"),l={};"1"==this.searchList.keyType?l.searchName=this.searchName:"2"==this.searchList.keyType&&(l.keyWord=this.searchName),0==this.searchList.label?l.pId=e.nullvalue:1==this.searchList.label?l.pId=e.$store.state.ispId:2==this.searchList.label?l.secondid=e.$store.state.deptid:3==this.searchList.label&&(l.deptid=e.$store.state.insid),l.example=this.searchList.time,l.page=this.page,l.limit=this.limit,i()({method:"post",url:e.$store.state.defaultHttp+"openRecord/selectOpenRecord.do?cId="+e.$store.state.iscId,data:t.stringify(l)}).then(function(t){e.$store.state.SMSradarList=t.data.map.openRecords,e.$store.state.SMSradarListnumber=t.data.count}).catch(function(e){})},setTime:function(){var e=this;this.clearTimeSet=setInterval(function(){e.$options.methods.loadTable.bind(e)()},6e4)},search:function(){var e=this,t="",a=1;0==this.searchList.label?(t="openRecordJurisdiction/all.do",a=0):2==this.searchList.label?(t="openRecordJurisdiction/second.do",a=0):3==this.searchList.label&&(t="openRecordJurisdiction/dept.do",a=0),0==a?i()({method:"get",url:e.$store.state.defaultHttp+t}).then(function(t){t.data.msg&&"error"==t.data.msg?e.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):e.$options.methods.loadTable.bind(e)(!0)}).catch(function(e){}):e.$options.methods.loadTable.bind(e)(!0)},handleSizeChange:function(e){this.limit=e,this.$options.methods.loadTable.bind(this)(!1)},handleCurrentChange:function(e){this.page=e,this.$options.methods.loadTable.bind(this)(!1)}},destroyed:function(){clearInterval(this.clearTimeSet),this.clearTimeSet=null}}),r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"radioList"},[a("el-radio-group",{model:{value:e.searchList.label,callback:function(t){e.$set(e.searchList,"label",t)},expression:"searchList.label"}},[a("span",{staticClass:"nameList"},[e._v("数据授权：")]),e._v(" "),e._l(e.pIdData,function(t){return a("el-radio",{key:t.label,attrs:{label:t.label},on:{change:function(t){e.search()}}},[e._v(e._s(t.value))])})],2),e._v(" "),a("el-radio-group",{model:{value:e.searchList.time,callback:function(t){e.$set(e.searchList,"time",t)},expression:"searchList.time"}},[a("span",{staticClass:"nameList"},[e._v("新增时间：")]),e._v(" "),a("el-radio",{attrs:{label:e.nullvalue},on:{change:function(t){e.search()}}},[e._v("全部")]),e._v(" "),e._l(e.timeData,function(t){return a("el-radio",{key:t.id,attrs:{label:t.id},on:{change:function(t){e.search()}}},[e._v(e._s(t.typeName))])})],2)],1),e._v(" "),a("div",{staticClass:"searchList",staticStyle:{width:"100%"}},[a("el-input",{staticStyle:{"margin-left":"20px",width:"400px"},attrs:{placeholder:"请输入联系人或公司名称"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.search(t):null}},model:{value:e.searchName,callback:function(t){e.searchName=t},expression:"searchName"}},[a("el-select",{staticStyle:{width:"125px"},attrs:{slot:"prepend",placeholder:"请选择"},slot:"prepend",model:{value:e.searchList.keyType,callback:function(t){e.$set(e.searchList,"keyType",t)},expression:"searchList.keyType"}},[a("el-option",{attrs:{label:"联系人名称",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"公司名称",value:"2"}})],1)],1),e._v("\n          \n        "),a("el-button",{attrs:{icon:"el-icon-search",type:"primary",size:"mini"},on:{click:function(t){e.search()}}},[e._v("查询")]),e._v(" "),a("br"),a("br")],1),e._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""}},[a("el-table-column",{attrs:{fixed:"","header-align":"center",align:"center",type:"index",width:"45"}}),e._v(" "),a("el-table-column",{attrs:{label:"访问来源",prop:"phone",fixed:"","min-width":"110",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"访问人",prop:"name","min-width":"100",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"关联公司",prop:"workName","min-width":"200",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"访问时间",prop:"createTime","min-width":"150",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"访问内容",prop:"content","show-overflow-tooltip":"","min-width":"180",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"ip",label:"IP","min-width":"160",sortable:""}})],1),e._v(" "),a("div",{staticClass:"block numberPage"},[a("el-pagination",{attrs:{"current-page":e.page,"page-sizes":[100,300,500],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:e.tableNumber},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]},o=a("VU/8")(n,r,!1,null,null,null);t.default=o.exports}});