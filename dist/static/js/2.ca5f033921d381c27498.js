webpackJsonp([2],{Fkgz:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("wtEF"),i=a("mtWM"),l=a.n(i),n=a("mw3O"),o=a.n(n),r=a("Icdr");a("GbHy"),a("5/bM"),a("Oq2I"),a("miEh");var d={name:"welcome",store:s.a,computed:{tableData:function(){return s.a.state.welcomeData}},data:function(){return{msg:"首页",amountList:{},funnelList:[],barList:[],barData:[],searchList:{label:"1",date:"",oppdate:""},nullvalue:null,pIdData:[{label:"0",value:"全部"},{label:"1",value:"我的"},{label:"2",value:"本组"},{label:"3",value:"本机构"}]}},mounted:function(){this.getMonth(),this.loadData()},activated:function(){this.loadData()},methods:{loadData:function(){var t=this,e={},a={};e.state="未完成",0==this.searchList.label?(a.pId=t.nullvalue,e.pId=t.nullvalue):1==this.searchList.label?(a.pId=t.$store.state.ispId,e.pId=t.$store.state.ispId):2==this.searchList.label?(a.secondid=t.$store.state.deptid,e.secondid=t.$store.state.deptid):3==this.searchList.label&&(a.deptid=t.$store.state.insid,e.deptid=t.$store.state.insid);var s=a;s.yearMonth=this.searchList.oppdate;var i={};i.month=this.searchList.date,l()({method:"post",url:t.$store.state.defaultHttp+"homePageHeader/getHomePageHeader.do?cId="+t.$store.state.iscId,data:o.a.stringify(a)}).then(function(e){t.amountList=e.data}).catch(function(t){}),l()({method:"post",url:t.$store.state.defaultHttp+"getMonthCountByExample.do?cId="+t.$store.state.iscId,data:o.a.stringify(s)}).then(function(e){t.funnelList=[],e.data.reverse().forEach(function(e,a){t.funnelList.push({value:a,name:e.name+"（"+e.value+"）",label:e.value})}),t.$options.methods.drawfunnel.bind(t)(!0)}).catch(function(t){}),l()({method:"post",url:t.$store.state.defaultHttp+"getContractamount.do?cId="+t.$store.state.iscId,data:o.a.stringify(i)}).then(function(e){t.barData=e.data.name,t.barList=e.data.value,t.$options.methods.drawbar.bind(t)(!0)}).catch(function(t){}),l()({method:"post",url:t.$store.state.defaultHttp+"customerpool/selectWorkPlanAndVisit.do?cId="+t.$store.state.iscId,data:o.a.stringify(e)}).then(function(e){t.$store.state.welcomeData=e.data.map.workPlanAndVisit}).catch(function(t){})},openDetails:function(t,e){"任务"==e.type?this.$router.push({path:"/missionplan"}):"外勤"==e.type&&(this.$store.state.visitdetailsData={submitData:{id:e.id}},this.$router.push({path:"/visitplandetails"}))},getMonth:function(){var t=new Date,e=t.getFullYear(),a=t.getMonth()+1;a=a<10?"0"+a:a;var s=e.toString()+"-"+a.toString();this.searchList.date=s,this.searchList.oppdate=s},search:function(){this.$options.methods.loadData.bind(this)(!0)},drawfunnel:function(){r.init(document.getElementById("chart101")).setOption({title:{text:"商机漏斗",left:"center"},tooltip:{trigger:"item",formatter:"{b}"},calculable:!0,emphasis:{label:{fontSize:20}},series:[{name:"数量",type:"funnel",left:"5%",width:"90%",minSize:"35%",sort:"descending",label:{show:!0,position:"inside"},data:this.funnelList}]})},drawbar:function(){r.init(document.getElementById("chart102")).setOption({title:{text:"合同金额排行"},tooltip:{},xAxis:[{type:"category",data:this.barData,axisLabel:{interval:0,rotate:30}}],yAxis:[{type:"value",axisLabel:{margin:8}}],grid:{left:60,containLabel:!0},series:[{name:"合同金额总数",type:"bar",data:this.barList}]})}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"innerspace"},[a("div",{staticClass:"header-welhead"},[a("div",{staticClass:"radioList"},[a("el-radio-group",{model:{value:t.searchList.label,callback:function(e){t.$set(t.searchList,"label",e)},expression:"searchList.label"}},t._l(t.pIdData,function(e){return a("el-radio",{key:e.label,staticClass:"wel_radio",attrs:{label:e.label},on:{change:function(e){t.search()}}},[t._v(t._s(e.value))])}))],1)]),t._v(" "),a("div",{staticClass:"welhead"},[a("ul",[a("li",[a("p",[t._v("总线索")]),a("p",[t._v(t._s(t.amountList.totalClue))])]),t._v(" "),a("li",[a("p",[t._v("今日新增线索")]),a("p",[t._v(t._s(t.amountList.todayAddClue))])]),t._v(" "),a("li",[a("p",[t._v("今日更新线索")]),a("p",[t._v(t._s(t.amountList.todayRenewClue))])])]),t._v(" "),a("ul",[a("li",[a("p",[t._v("总客户")]),a("p",[t._v(t._s(t.amountList.totalCustomer))])]),t._v(" "),a("li",[a("p",[t._v("今日新增客户")]),a("p",[t._v(t._s(t.amountList.todayAddCustomer))])]),t._v(" "),a("li",[a("p",[t._v("今日更新客户")]),a("p",[t._v(t._s(t.amountList.todayRenewCustomer))])])]),t._v(" "),a("ul",[a("li",[a("p",[t._v("总商机")]),a("p",[t._v(t._s(t.amountList.totalOpportunity))])]),t._v(" "),a("li",[a("p",[t._v("今日新增商机")]),a("p",[t._v(t._s(t.amountList.todayAddOpportunity))])]),t._v(" "),a("li",[a("p",[t._v("今日推进商机")]),a("p",[t._v(t._s(t.amountList.todayRecommendOpportunity))])])]),t._v(" "),a("ul",[a("li",[a("p",[t._v("总合同")]),a("p",[t._v(t._s(t.amountList.totalContract))])]),t._v(" "),a("li",[a("p",[t._v("今日新增合同")]),a("p",[t._v(t._s(t.amountList.todayAddContract))])])])]),t._v(" "),a("div",{staticClass:"welmiddles"},[t._m(0),t._v(" "),a("div",{staticClass:"middleline"}),t._v(" "),a("div",{staticClass:"welmiddlebody"},[a("div",{staticClass:"weldropdown"},[a("el-date-picker",{attrs:{type:"month",placeholder:"选择日期","value-format":"yyyy-MM"},on:{change:t.search},model:{value:t.searchList.date,callback:function(e){t.$set(t.searchList,"date",e)},expression:"searchList.date"}})],1),t._v(" "),a("div",{staticClass:"barwidth",attrs:{id:"chart102"}})])]),t._v(" "),a("div",{staticClass:"welfoot"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:""}},[a("el-table-column",{attrs:{fixed:"","header-align":"center",align:"center",type:"index",width:"45"}}),t._v(" "),a("el-table-column",{attrs:{prop:"type","min-width":"120",label:"类型",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"theme","min-width":"150",label:"主题",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"hoverline",on:{click:function(a){t.openDetails(e.$index,e.row)}}},[t._v("\n                        "+t._s(e.row.theme)+"\n                    ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"describe","show-overflow-tooltip":"","min-width":"180",label:"描述",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"startTime","min-width":"150",label:"时间",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("p",[t._v(t._s(e.row.startTime))]),t._v(" "),a("p",[t._v(t._s(e.row.endTime))])])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"private_employee","min-width":"110",label:"负责人",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"state","min-width":"90",label:"状态",sortable:""}})],1)],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"welmiddlebody"},[e("div",{staticClass:"funnelwidth",attrs:{id:"chart101"}})])}]};var u=a("VU/8")(d,c,!1,function(t){a("yVTz")},null,null);e.default=u.exports},yVTz:function(t,e){}});