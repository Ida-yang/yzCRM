webpackJsonp([69],{MIhd:function(t,a){},Rut7:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("wtEF"),i=s("mtWM"),c=s.n(i),n=(s("mw3O"),{name:"jobClassification",store:e.a,data:function(){return{msg:"新增工单，工单分类",classList:[],jobData:[]}},mounted:function(){this.loadData()},activated:function(){this.loadData()},methods:{loadData:function(){var t=this;s("1nuA");c()({method:"get",url:t.$store.state.defaultHttp+"oaExamineCategoryType/selectList.do?cId="+t.$store.state.iscId}).then(function(a){var s=a.data;t.classList=[];for(var e=0;e<s.length;e+=8)t.classList.push(s.slice(e,e+8));return t.classList}).catch(function(t){})},checkItem:function(t,a){var e=this,i=s("1nuA"),n={page:1,limit:99999999,keyType:"4",type:a.id};c()({method:"post",url:e.$store.state.defaultHttp+"oaExamineCategory/selectList.do?cId="+e.$store.state.iscId,data:i.stringify(n)}).then(function(s){e.jobData=s.data.map.success,0==e.jobData.length&&e.checkjobClass(t,a)}).catch(function(t){})},checkjobClass:function(t,a){this.$store.state.examineaddOrUpdateData=a,this.$router.push({path:"/examineaddOrUpdate"})}}}),o={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("p",{staticClass:"aaaa"},[t._v("发起审核")]),t._v(" "),s("el-carousel",{attrs:{autoplay:!1,"indicator-position":"outside"}},t._l(t.classList,function(a,e){return s("el-carousel-item",{key:e},[s("ul",{staticClass:"jobclass_ul"},t._l(a,function(a){return s("li",{key:a.id,staticClass:"jobclass_li",on:{click:function(s){t.checkItem(s,a)}}},[s("p",{staticClass:"p1"},[t._v(t._s(a.name))]),t._v(" "),s("p",{staticClass:"p2"},[t._v(t._s(a.remarks))])])}))])})),t._v(" "),s("div",{staticClass:"jobclass_line"}),t._v(" "),s("div",[s("ul",{staticClass:"jobclass2_ul"},t._l(t.jobData,function(a){return s("li",{key:a.id,staticClass:"jobclass2_li",on:{click:function(s){t.checkjobClass(s,a)}}},[s("p",{staticClass:"p4"},[t._v(t._s(a.title))])])}))])],1)},staticRenderFns:[]};var l=s("VU/8")(n,o,!1,function(t){s("MIhd")},null,null);a.default=l.exports}});