webpackJsonp([59],{QdUB:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("wtEF"),a("NYxO");var o=a("mtWM"),i=a.n(o),r=(a("9igS"),{name:"agreementaddorupdate",data:function(){return{agreeaddOrUpdateData:{},myForm:{start_date:null,end_date:null,customerpool_id:null,signatories:null,orderId:null},subData:{},oppoptions:null,contactslist:null,our_signatoriesId:null,page:1,limit:15,rules:{our_signatories:[{required:!0,message:"我方签约人不能为空",trigger:"blur"}],signatories:[{required:!0,message:"客户签约人不能为空",trigger:"blur"}],end_date:[{required:!0,message:"合同结束时间不能为空",trigger:"blur"}],start_date:[{required:!0,message:"合同开始时间不能为空",trigger:"blur"}],amount:[{required:!0,message:"合同金额不能为空",trigger:"blur"}],customerpool_id:[{required:!0,message:"客户不能为空",trigger:"blur"}],contract_type:[{required:!0,message:"合同类型不能为空",trigger:"blur"}],contract_name:[{required:!0,message:"合同名称不能为空",trigger:"blur"}]},tableData:null,formid:null,searchvalue:null,isDisable:!1}},mounted:function(){this.loadData(),this.loadTable(),this.loadOpp()},methods:{loadData:function(){var t=this;this.agreeaddOrUpdateData=this.$store.state.agreeaddOrUpdateData,this.oppoptions=this.$store.state.agreeaddOrUpdateData.customerpool_id,this.our_signatoriesId=this.agreeaddOrUpdateData.setForm.our_signatoriesId;var e=this.agreeaddOrUpdateData.createForm,a=this.agreeaddOrUpdateData.setForm;a&&(e.forEach(function(e,o){e.type&&"select"==e.type?t.$set(t.myForm,e.inputModel,a[e.inputModel]):e.type&&"radio"==e.type?t.$set(t.myForm,e.inputModel,a[e.inputModel]):t.myForm[e.inputModel]=a[e.inputModel]}),this.myForm.customerpool_id=this.agreeaddOrUpdateData.setForm.poolName,this.formid=this.agreeaddOrUpdateData.setForm.customerpool_id,this.myForm.opportunity_id=this.agreeaddOrUpdateData.setForm.opportunity_name,this.$emit("input",this.myForm))},loadOpp:function(){var t=this,e=a("1nuA"),o={};o.customerpool_id=this.formid,i()({method:"post",url:t.$store.state.defaultHttp+"opportunity/getOpportunityAll.do?cId="+t.$store.state.iscId,data:e.stringify(o)}).then(function(e){t.oppoptions=e.data}).catch(function(t){}),i()({method:"post",url:t.$store.state.defaultHttp+"getPoolContactsName.do?cId="+t.$store.state.iscId,data:e.stringify(o)}).then(function(e){t.contactslist=e.data.map.success,t.contactslist.forEach(function(e){t.myForm.signatories==e.name&&(t.myForm.signatories=e.id)})}).catch(function(t){})},loadTable:function(){var t=this,e=a("1nuA"),o={};o.page=this.page,o.limit=this.limit,o.pId=this.$store.state.ispId,o.searchName=this.searchvalue,i()({method:"post",url:t.$store.state.defaultHttp+"rightPoolName.do?cId="+t.$store.state.iscId,data:e.stringify(o)}).then(function(e){t.tableData=e.data.map.success.customerpools}).catch(function(t){})},handleInput:function(t,e){this.myForm[e]=t},handlechange:function(t,e){this.myForm[e]=t;var a=t.split("-"),o=parseInt(a[0])+1,i=a[1],r=a[2];this.myForm.end_date=o+"-"+i+"-"+r},getRow:function(t,e){this.formid=e.id,this.myForm.customerpool_id=e.name,this.loadOpp()},handleoninput:function(t,e){this.myForm[e]=t,this.searchvalue=t,this.loadTable()},handleblur:function(t,e){var a=this,o=t.target.value;this.tableData.forEach(function(t){o==t.name&&(a.formid=t.id,a.loadOpp())})},handleopp:function(t,e){var a=this;this.oppoptions.forEach(function(e){t==e.opportunity_id&&(a.myForm.amount=e.opportunity_achievement,a.myForm.orderId=e.orderId)})},submit:function(){var t=this,e=a("1nuA"),o={};t.agreeaddOrUpdateData.submitData?(o.contract_id=t.agreeaddOrUpdateData.submitData.id,o.csId=t.agreeaddOrUpdateData.submitData.csId):o.orderId=this.myForm.orderId,o.secondid=this.$store.state.deptid,o.deptid=this.$store.state.insid;var r=!1;t.agreeaddOrUpdateData.createForm.forEach(function(e){o[e.inputModel]=t.myForm[e.inputModel],"our_signatories"!=e.inputModel||o[e.inputModel]||(t.$message({message:"我方签约人不能为空",type:"error"}),r=!0),"signatories"!=e.inputModel||o[e.inputModel]||(t.$message({message:"客户签约人不能为空",type:"error"}),r=!0),"end_date"!=e.inputModel||o[e.inputModel]||(t.$message({message:"合同结束日期不能为空",type:"error"}),r=!0),"start_date"!=e.inputModel||o[e.inputModel]||(t.$message({message:"合同开始日期不能为空",type:"error"}),r=!0),"amount"!=e.inputModel||o[e.inputModel]||(t.$message({message:"合同金额不能为空",type:"error"}),r=!0),"customerpool_id"!=e.inputModel||o[e.inputModel]||(t.$message({message:"客户不能为空",type:"error"}),r=!0),"contract_type"!=e.inputModel||o[e.inputModel]||(t.$message({message:"合同类型不能为空",type:"error"}),r=!0),"contract_name"!=e.inputModel||o[e.inputModel]||(t.$message({message:"合同名称不能为空",type:"error"}),r=!0)}),r||(o.customerpool_id=this.formid,o.our_signatories==this.$store.state.user?o.our_signatories=this.$store.state.ispId:o.our_signatories=this.our_signatoriesId,this.isDisable=!0,i()({method:"post",url:t.agreeaddOrUpdateData.submitURL,data:e.stringify(o)}).then(function(e){e.data.code&&"200"==e.data.code?(t.$message({message:"成功",type:"success"}),t.closeTag()):t.$message({message:e.data.msg,type:"error"}),t.isDisable=!1}).catch(function(t){}))},closeTag:function(){var t=this,e=void 0;this.$store.state.tagsList.forEach(function(a,o){a.name==t.$options.name&&(e=o)});var a=this.$store.state.tagsList.splice(e,1)[0];(this.$store.state.tagsList[e]?this.$store.state.tagsList[e]:this.$store.state.tagsList[e-1])?a.path===this.$route.fullPath&&this.$router.push("/agreement"):this.$router.push("/index")}}}),s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"addorupdatecontent"},[a("el-form",{ref:"myForm",staticClass:"myForm",attrs:{model:t.myForm,rules:t.rules}},t._l(t.agreeaddOrUpdateData.createForm,function(e){return a("el-form-item",{key:e.inputModel,attrs:{"label-width":"100px",label:e.label,prop:e.inputModel}},[e.type&&"input"!=e.type?t._e():a("el-input",{staticStyle:{width:"90%"},attrs:{value:t.myForm[e.inputModel],"auto-complete":"off",disabled:e.disabled},on:{input:function(a){t.handleInput(a,e.inputModel)}}}),t._v(" "),"textarea"==e.type?a("el-input",{staticStyle:{width:"90%"},attrs:{type:"textarea",rows:"5",value:t.myForm[e.inputModel],"auto-complete":"off",disabled:e.disabled},on:{input:function(a){t.handleInput(a,e.inputModel)}}}):e.type&&"number"==e.type?a("el-input",{staticStyle:{width:"90%"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'.')",value:t.myForm[e.inputModel],"auto-complete":"off"},on:{input:function(a){t.handleInput(a,e.inputModel)}}}):e.type&&"require"==e.type&&"customerpool_id"==e.inputModel?a("el-input",{staticStyle:{width:"90%"},attrs:{value:t.myForm[e.inputModel],"auto-complete":"off"},on:{input:function(a){t.handleoninput(a,e.inputModel)},blur:function(a){t.handleblur(a,e.inputModel)}}}):"opportunity_id"==e.inputModel?a("el-select",{staticStyle:{width:"90%"},attrs:{filterable:"",multiple:e.multiple,"collapse-tags":e.multiple,placeholder:e.placeholder},on:{change:function(a){t.handleopp(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}},t._l(t.oppoptions,function(t){return a("el-option",{key:t.opportunity_id,attrs:{label:t.opportunity_name,value:t.opportunity_id}})})):"signatories"==e.inputModel?a("el-select",{staticStyle:{width:"90%"},attrs:{filterable:"",multiple:e.multiple,"collapse-tags":e.multiple,placeholder:e.placeholder},on:{change:function(a){t.handleInput(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}},t._l(t.contactslist,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})):e.type&&"select"==e.type?a("el-select",{staticStyle:{width:"90%"},attrs:{multiple:e.multiple,"collapse-tags":e.multiple,placeholder:e.placeholder},on:{change:function(a){t.handleInput(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}},t._l(e.options,function(t){return a("el-option",{key:t.okey,attrs:{label:t.olabel,value:t.ovalue}})})):e.type&&"date"==e.type&&"start_date"==e.inputModel?a("el-date-picker",{staticStyle:{width:"90%"},attrs:{type:"date",placeholder:e.placeholder,format:"yyyy-MM-dd","value-format":"yyyy-MM-dd","auto-complete":"off"},on:{change:function(a){t.handlechange(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}}):e.type&&"date"==e.type&&"end_date"==e.inputModel?a("el-date-picker",{staticStyle:{width:"90%"},attrs:{type:"date",placeholder:e.placeholder,format:"yyyy-MM-dd","value-format":"yyyy-MM-dd","auto-complete":"off"},on:{change:function(a){t.handleInput(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}}):e.type&&"radio"==e.type?a("div",[a("el-radio",{attrs:{label:"是"},on:{input:function(a){t.handleInput(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}},[t._v("是")]),t._v(" "),a("el-radio",{attrs:{label:"否"},on:{input:function(a){t.handleInput(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}},[t._v("否")])],1):t._e()],1)})),t._v(" "),a("div",{staticClass:"line",staticStyle:{height:"590px"}}),t._v(" "),a("div",{staticClass:"formlist"},[a("el-table",{attrs:{data:t.tableData,border:"",stripe:"","default-sort":{order:"ascending"},"max-height":"580"}},[a("el-table-column",{attrs:{"header-align":"center",align:"center",width:"35"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{width:"15px",height:"15px",padding:"0","border-radius":"50%"},on:{click:function(a){t.getRow(e.$index,e.row)}}},[t._v(" ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"name","min-width":"200",label:"公司名称",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"address","show-overflow-tooltip":"","min-width":"200",label:"公司地址",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"representative","min-width":"90",label:"法人",sortable:""}})],1)],1),t._v(" "),a("div",{staticClass:"submit_btn"},[a("el-button",{staticStyle:{"margin-right":"50px !important"},attrs:{type:"primary",disabled:t.isDisable},on:{click:t.submit}},[t._v("立即提交")]),t._v(" "),a("el-button",{on:{click:t.closeTag}},[t._v("取消")])],1)],1)},staticRenderFns:[]};var l=a("VU/8")(r,s,!1,function(t){a("gZpC")},null,null);e.default=l.exports},gZpC:function(t,e){}});