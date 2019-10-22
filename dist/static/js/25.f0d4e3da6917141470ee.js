webpackJsonp([25],{"p4f+":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});s("wtEF");var a=s("mtWM"),i=s.n(a),r=(s("mw3O"),{data:function(){return{datalist:[],defaultProps:{label:"deptname",children:"next"},myform:{name:null,categoryType:1,deptNames:[],deptIds:[],remarks:null,id:null},AssociatedList:[{id:1,name:"合同"},{id:2,name:"销售订单"},{id:3,name:"合同回款"},{id:4,name:"办公"},{id:5,name:"外勤"},{id:6,name:"订单收款"}],levelList:[{index:1,name:"第 1 级",stepType:2,checkUserId:[],remarks:null,del:!1}],stepTypeList:[{id:2,stepName:"多人或签"},{id:3,stepName:"多人会签"}],userList:[],rules:{deptNames:[{required:!0,message:"应用部门不能为空",trigger:"blur"}],name:[{required:!0,message:"审批流名称不能为空",trigger:"blur"}]},isDisable:!1,showaddStep:!0}},mounted:function(){this.loadData(),this.setMyForm()},methods:{loadData:function(){var e=this;i()({method:"get",url:e.$store.state.defaultHttp+"dept/getDeptNodeTree.do?cId="+e.$store.state.iscId}).then(function(t){e.datalist=t.data.map.success}).catch(function(e){}),i()({method:"get",url:e.$store.state.defaultHttp+"customerTwo/getNameAndId.do?cId="+e.$store.state.iscId}).then(function(t){e.userList=t.data.map.success}).catch(function(e){})},setMyForm:function(){var e=this,t=e.$store.state.approvalupdateData;e.myform.deptIds=[],e.myform.deptNames=[],t&&(e.myform.id=t.id,e.myform.name=t.name,e.myform.categoryType=t.categoryType,e.myform.remarks=t.remarks,e.levelList=t.levelList,t.deptIdLs.forEach(function(t){e.myform.deptIds.push(t.id),e.myform.deptNames.push(t.name)}),e.$refs.tree.setCheckedKeys(e.myform.deptIds))},handlecheck:function(e,t){var a=this,r=this,o=s("1nuA");this.myform.deptNames=[],t.checkedNodes.forEach(function(e,t){a.myform.deptNames.push(e.deptname)}),this.myform.deptIds=t.checkedKeys;var l={};l.id=this.myform.id,l.categoryType=this.myform.categoryType,this.myform.deptIds.length?l.secondid=this.myform.deptIds:l.secondid=null,i()({method:"post",url:r.$store.state.defaultHttp+"examine/queryExaminByDeptId.do?cId="+r.$store.state.iscId,data:o.stringify(l)}).then(function(e){e.data.code&&"20001"==e.data.code&&r.$message({message:e.data.msg,type:"error"})}).catch(function(e){})},addStepType:function(){var e=this;this.levelList.forEach(function(t,s){if(s==e.levelList.length-1){var a=t.index+1;e.levelList.push({index:a,name:"第 "+a+" 级",stepType:2,checkUserId:[],remarks:null,del:!1})}}),this.levelList.length<6?this.showaddStep=!0:this.showaddStep=!1},onmouseover:function(e){e.del=!0},onmouseleave:function(e){e.del=!1},delStep:function(e){var t=this,s=e.index;1==this.levelList.length?this.$message({message:"至少保留一层",type:"error"}):this.levelList.forEach(function(s,a){e.index==s.index&&t.levelList.splice(a,1)}),this.rescheduling(s)},rescheduling:function(e){this.levelList.forEach(function(t,s){if(t.index>e){var a=t.index-1;t.index=a,t.name="第 "+a+" 级"}}),this.levelList.length<6?this.showaddStep=!0:this.showaddStep=!1},onSubmit:function(){var e=this,t=(s("1nuA"),[]);this.levelList.forEach(function(e,s){t.push({stepType:e.stepType,checkUserId:e.checkUserId,remarks:e.remarks})});var a={id:this.myform.id,categoryType:this.myform.categoryType,deptIds:this.myform.deptIds,name:this.myform.name,remarks:this.myform.remarks,step:t};this.isDisable=!0,i()({method:"post",url:e.$store.state.defaultHttp+"examine/saveExamine.do?cId="+e.$store.state.iscId+"&pId="+this.$store.state.ispId,data:a}).then(function(t){t.data.code&&"200"==t.data.code?(e.$message({message:"成功",type:"success"}),e.closeTag()):e.$message({message:t.data.msg,type:"error"}),e.isDisable=!1}).catch(function(t){e.isDisable=!1})},closeTag:function(){var e=this,t=void 0;this.$store.state.tagsList.forEach(function(s,a){s.name==e.$options.name&&(t=a)});var s=this.$store.state.tagsList.splice(t,1)[0];(this.$store.state.tagsList[t]?this.$store.state.tagsList[t]:this.$store.state.tagsList[t-1])?s.path===this.$route.fullPath&&this.$router.push("/approvalProcess"):this.$router.push("/index")}}}),o={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"ap_top"},[s("el-form",{ref:"myform",attrs:{inline:!0,model:e.myform,rules:e.rules,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"审核流名称",prop:"name"}},[s("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini"},model:{value:e.myform.name,callback:function(t){e.$set(e.myform,"name",t)},expression:"myform.name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"关联对象"}},[s("el-select",{attrs:{placeholder:"请选择关联对象",size:"mini"},model:{value:e.myform.categoryType,callback:function(t){e.$set(e.myform,"categoryType",t)},expression:"myform.categoryType"}},e._l(e.AssociatedList,function(e){return s("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),s("el-form-item",{attrs:{label:"备注"}},[s("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini"},model:{value:e.myform.remarks,callback:function(t){e.$set(e.myform,"remarks",t)},expression:"myform.remarks"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"应用部门",prop:"deptNames"}},[s("el-select",{staticClass:"dept_select",attrs:{multiple:"",placeholder:"请选择应用部门",size:"mini"},model:{value:e.myform.deptNames,callback:function(t){e.$set(e.myform,"deptNames",t)},expression:"myform.deptNames"}},[s("el-option",{staticClass:"droplist",attrs:{value:e.myform.deptNames}},[s("el-tree",{ref:"tree",staticClass:"drop_tree",attrs:{"node-key":"deptid","highlight-current":"","default-expand-all":"","show-checkbox":"","expand-on-click-node":!1,data:e.datalist,props:e.defaultProps},on:{check:e.handlecheck}})],1)],1)],1)],1)],1),e._v(" "),s("div",{staticClass:"ap_bottom"},[e._l(e.levelList,function(t){return s("div",{key:t.index,staticClass:"ap_level",on:{mouseover:function(s){e.onmouseover(t)},mouseleave:function(s){e.onmouseleave(t)}}},[s("span",{staticClass:"nameList"},[s("span",{staticStyle:{color:"#f56c6c","margin-right":"4px"}},[e._v("*")]),e._v(e._s(t.name))]),e._v(" "),s("el-select",{attrs:{size:"mini"},model:{value:t.stepType,callback:function(s){e.$set(t,"stepType",s)},expression:"item.stepType"}},e._l(e.stepTypeList,function(e){return s("el-option",{key:e.id,attrs:{label:e.stepName,value:e.id}})})),e._v(" "),s("el-select",{staticClass:"ap_check",attrs:{multiple:"",placeholder:"请选择审核人员","multiple-limit":5,filterable:"",size:"mini"},model:{value:t.checkUserId,callback:function(s){e.$set(t,"checkUserId",s)},expression:"item.checkUserId"}},e._l(e.userList,function(e){return s("el-option",{key:e.private_id,attrs:{label:e.private_employee,value:e.private_id}})})),e._v(" "),s("el-input",{staticStyle:{width:"200px","margin-left":"20px"},attrs:{size:"mini",placeholder:"备注信息"},model:{value:t.remarks,callback:function(s){e.$set(t,"remarks",s)},expression:"item.remarks"}}),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.del,expression:"item.del"}],staticClass:"ap_del",on:{click:function(s){e.delStep(t)}}},[s("i",{staticClass:"el-icon-delete"})])],1)}),e._v(" "),s("el-button",{directives:[{name:"show",rawName:"v-show",value:e.showaddStep,expression:"showaddStep"}],staticStyle:{"margin-left":"45px"},attrs:{type:"text",size:"mini"},on:{click:e.addStepType}},[e._v("+ 新增审核层级")])],2),e._v(" "),e._m(0),e._v(" "),s("div",{staticClass:"submit_btn"},[s("el-button",{staticStyle:{"margin-right":"100px"},attrs:{type:"primary",disabled:e.isDisable},on:{click:e.onSubmit}},[e._v("立即提交")]),e._v(" "),s("el-button",{on:{click:e.closeTag}},[e._v("取消")])],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"ap_remark"},[t("p",[this._v("* 多人或签：表示指定用户中任意一人审核即可。 ")]),this._v(" "),t("p",[this._v("* 多人会签：指定用户中所有人都要审核才算通过。")])])}]};var l=s("VU/8")(r,o,!1,function(e){s("rPLF")},null,null);t.default=l.exports},rPLF:function(e,t){}});