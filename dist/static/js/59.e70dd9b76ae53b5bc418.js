webpackJsonp([59],{Em61:function(t,e){},riUA:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("wtEF"),o=(a("NYxO"),a("mtWM")),i=a.n(o),s=(a("9igS"),{name:"Opportunityaddorupdate",store:l.a,data:function(){return{pickerOptions:{disabledDate:function(t){return t.getTime()<Date.now()-864e5}},activeName:"first",contactslist:null,oppaddOrUpdateData:{},myForm:{customerpool_id:null},subData:{},page:1,limit:15,rules:{opportunity_name:[{required:!0,message:"商机名称不能为空",trigger:"blur"}],customerpool_id:[{required:!0,message:"关联客户不能为空",trigger:"blur"}],contacts_id:[{required:!0,message:"决策人不能为空",trigger:"blur"}],opportunity_achievement:[{required:!0,message:"预计成交金额不能为空",trigger:"blur"}],opportunity_deal:[{required:!0,message:"预计成交时间不能为空",trigger:"blur"}]},tableData:null,formid:null,searchvalue:null,isDisable:!1,fieldsform:{},previewData:[],deptData:[],defaultProps:{label:"deptname",children:"next"},userData:[],doUpload:this.$store.state.defaultHttp+"workOrder/upload.do?cId="+this.$store.state.iscId}},mounted:function(){this.loadData(),this.loadTable(),this.loadcustomer(),this.loadfield(),this.loadUserandDept()},methods:{loadcustomer:function(){var t=this,e=a("1nuA"),l={};l.customerpool_id=this.formid,i()({method:"post",url:t.$store.state.defaultHttp+"getPoolContactsName.do?cId="+t.$store.state.iscId,data:e.stringify(l)}).then(function(e){t.contactslist=e.data.map.success}).catch(function(t){})},loadData:function(){var t=this;this.oppaddOrUpdateData=this.$store.state.oppaddOrUpdateData;var e=this.oppaddOrUpdateData.createForm,a=this.oppaddOrUpdateData.setForm;a&&(e.forEach(function(e,l){e.type&&"select"==e.type?t.$set(t.myForm,e.inputModel,a[e.inputModel]):e.type&&"radio"==e.type?t.$set(t.myForm,e.inputModel,a[e.inputModel]):e.type&&"date"==e.type?t.$set(t.myForm,e.inputModel,a[e.inputModel]):t.myForm[e.inputModel]=a[e.inputModel]}),this.myForm.customerpool_id=this.oppaddOrUpdateData.setForm.customerpool_name,this.formid=this.oppaddOrUpdateData.setForm.customerpool_id,this.myForm.contacts_id=this.oppaddOrUpdateData.setForm.contacts_name,this.$emit("input",this.myForm))},loadfield:function(){var t=this,e=a("1nuA"),l=null,o=null;this.oppaddOrUpdateData.submitData&&(l=this.oppaddOrUpdateData.submitData.id,o=this.oppaddOrUpdateData.submitData.batch_id);var s={label:5,id:l,batch_id:o};i()({method:"post",url:t.$store.state.defaultHttp+"field/queryField.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){var a=e.data;a.forEach(function(e,a){e.displayVal="",t.oppaddOrUpdateData.submitData?(e.default_value=e.value,"user"!=e.formType&&"structure"!=e.formType||(e.displayVal=e.deptOrUserName,e.default_value=parseInt(e.value))):"checkbox"!==e.formType&&null!==e.value&&(e.default_value=e.value),1==e.is_null&&(t.rules[e.field_name]=[{required:!0,message:" ",trigger:"blur"}])}),t.previewData=a}).catch(function(t){})},loadUserandDept:function(){var t=this,e=a("1nuA"),l={page:1,limit:"9999"};i()({method:"post",url:t.$store.state.defaultHttp+"getPrivateUserAll.do?cId="+t.$store.state.iscId,data:e.stringify(l)}).then(function(e){t.userData=e.data.map.success}).catch(function(t){}),i()({method:"get",url:t.$store.state.defaultHttp+"dept/getDeptNodeTree.do?cId="+t.$store.state.iscId}).then(function(e){t.deptData=e.data.map.success}).catch(function(t){})},loadTable:function(){var t=this,e=a("1nuA"),l={};l.page=this.page,l.limit=this.limit,l.pId=this.$store.state.ispId,l.searchName=this.searchvalue,i()({method:"post",url:t.$store.state.defaultHttp+"rightPoolName.do?cId="+t.$store.state.iscId,data:e.stringify(l)}).then(function(e){t.tableData=e.data.map.success.customerpools}).catch(function(t){})},handleoninput:function(t,e){this.myForm[e]=t,this.searchvalue=t,this.loadTable()},handleblur:function(t,e){var a=this,l=t.target.value;this.tableData.forEach(function(t){l==t.name&&(a.formid=t.id,a.myForm.customerpool_id=t.name,a.loadcustomer())})},getRow:function(t,e){this.formid=e.id,this.myForm.customerpool_id=e.name,this.loadcustomer()},handleInput:function(t,e){this.myForm[e]=t},handlecheck:function(t,e){this.previewData.forEach(function(a){a.id==e.id&&(a.displayVal=t.deptname,a.default_value=t.deptid)})},beforeUpload:function(t){t.size/1024/1024<5||this.$message.warning("文件大小不能超过 5MB!")},uploadSuccess:function(t,e,a){this.previewData.forEach(function(e){"file"==e.formType&&(e.default_value=t)})},submit:function(){var t=this,e=this,l=(a("1nuA"),{});e.oppaddOrUpdateData.submitData&&(l.opportunity_id=e.oppaddOrUpdateData.submitData.id,l.batch_id=e.oppaddOrUpdateData.submitData.batch_id);var o=e.oppaddOrUpdateData.createForm,s=e.previewData,r=(new Array,!1);if(o.forEach(function(a){l[a.inputModel]=e.myForm[a.inputModel],l.customerpool_id=t.formid,"opportunity_name"!=a.inputModel||l[a.inputModel]||(e.$message({message:"商机名称不能为空",type:"error"}),r=!0),"customerpool_id"!=a.inputModel||l[a.inputModel]||(e.$message({message:"关联客户不能为空",type:"error"}),r=!0),"contacts_id"!=a.inputModel||l[a.inputModel]||(e.$message({message:"决策人不能为空",type:"error"}),r=!0),"opportunity_achievement"!=a.inputModel||l[a.inputModel]||(e.$message({message:"预计成交金额不能为空",type:"error"}),r=!0),"opportunity_deal"!=a.inputModel||l[a.inputModel]||(e.$message({message:"预计成交时间不能为空",type:"error"}),r=!0)}),s.forEach(function(t){"checkbox"==t.formType?t.value=t.default_value.join(","):"user"==t.formType||"structure"==t.formType?t.default_value&&(t.value=t.default_value.toString()):t.value=t.default_value,1!=t.is_null||t.value||(e.$message({message:t.name+"不能为空",type:"error"}),r=!0)}),!r){l.secondid=this.$store.state.deptid,l.deptid=this.$store.state.insid,l.user_id=this.$store.state.ispId;var d={entity:l,field:s};this.isDisable=!0,i()({method:"post",url:e.$store.state.defaultHttp+"opportunity/saveOrUpdateOpportunity.do?cId="+e.$store.state.iscId,data:d}).then(function(t){t.data.code&&"200"==t.data.code?(e.$message({message:"成功",type:"success"}),e.closeTag()):e.$message({message:t.data.msg,type:"error"}),e.isDisable=!1}).catch(function(t){e.$message.error("提交失败，请重新提交")})}},handleSubmit:function(){var t=this,e=this,l=a("1nuA"),o={};e.oppaddOrUpdateData.submitData&&(o.opportunity_id=this.oppaddOrUpdateData.submitData.id);var s=!1;e.oppaddOrUpdateData.createForm.forEach(function(a){o[a.inputModel]=e.myForm[a.inputModel],o.customerpool_id=t.formid,"opportunity_name"!=a.inputModel||o[a.inputModel]||(e.$message({message:"商机名称不能为空",type:"error"}),s=!0),"customerpool_id"!=a.inputModel||o[a.inputModel]||(e.$message({message:"关联客户不能为空",type:"error"}),s=!0),"contacts_id"!=a.inputModel||o[a.inputModel]||(e.$message({message:"决策人不能为空",type:"error"}),s=!0),"opportunity_achievement"!=a.inputModel||o[a.inputModel]||(e.$message({message:"预计成交金额不能为空",type:"error"}),s=!0),"opportunity_deal"!=a.inputModel||o[a.inputModel]||(e.$message({message:"预计成交时间不能为空",type:"error"}),s=!0)}),s||(o.secondid=this.$store.state.deptid,o.deptid=this.$store.state.insid,o.user_id=this.$store.state.ispId,this.isDisable=!0,i()({method:"post",url:e.oppaddOrUpdateData.submitURL,data:l.stringify(o)}).then(function(t){t.data.code&&200==t.data.code?(e.$message({message:"成功",type:"success"}),e.closeTag()):e.$message({message:t.data.msg,type:"error"}),e.isDisable=!1}).catch(function(t){e.$message.error("提交失败，请重新提交")}))},closeTag:function(){var t=this,e=void 0;this.$store.state.tagsList.forEach(function(a,l){a.name==t.$options.name&&(e=l)});var a=this.$store.state.tagsList.splice(e,1)[0];(this.$store.state.tagsList[e]?this.$store.state.tagsList[e]:this.$store.state.tagsList[e-1])?a.path===this.$route.fullPath&&this.$router.push("/businessOpportunity"):this.$router.push("/index")}}}),r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"addorupdatecontent"},[a("el-tabs",{staticClass:"formtabs",attrs:{type:"card"},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"主要数据",name:"first"}},[a("el-form",{ref:"myForm",staticClass:"cusForm",attrs:{model:t.myForm,rules:t.rules}},t._l(t.oppaddOrUpdateData.createForm,function(e){return a("el-form-item",{key:e.inputModel,attrs:{"label-width":"110px",label:e.label,prop:e.inputModel}},[e.type&&"input"!=e.type?t._e():a("el-input",{staticStyle:{width:"90%"},attrs:{value:t.myForm[e.inputModel],disabled:e.disabled,"auto-complete":"off"},on:{input:function(a){t.handleInput(a,e.inputModel)}}}),t._v(" "),"textarea"==e.type?a("el-input",{staticStyle:{width:"90%"},attrs:{type:"textarea",rows:"5",value:t.myForm[e.inputModel],"auto-complete":"off"},on:{input:function(a){t.handleInput(a,e.inputModel)}}}):e.type&&"number"==e.type?a("el-input",{staticStyle:{width:"90%"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'.')",value:t.myForm[e.inputModel],"auto-complete":"off"},on:{input:function(a){t.handleInput(a,e.inputModel)}}}):e.type&&"require"==e.type&&"customerpool_id"==e.inputModel?a("el-input",{staticStyle:{width:"90%"},attrs:{value:t.myForm[e.inputModel],"auto-complete":"off"},on:{input:function(a){t.handleoninput(a,e.inputModel)},blur:function(a){t.handleblur(a,e.inputModel)}}}):e.type&&"select"==e.type&&"contacts_id"==e.inputModel?a("el-select",{staticStyle:{width:"90%"},attrs:{multiple:e.multiple,"collapse-tags":e.multiple,placeholder:e.placeholder},on:{change:function(a){t.handleInput(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}},t._l(t.contactslist,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})):e.type&&"select"==e.type?a("el-select",{staticStyle:{width:"90%"},attrs:{multiple:e.multiple,"collapse-tags":e.multiple,placeholder:e.placeholder},on:{change:function(a){t.handleInput(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}},t._l(e.options,function(t){return a("el-option",{key:t[e.okey],attrs:{label:t[e.olabel],value:t[e.ovalue]}})})):e.type&&"date"==e.type?a("el-date-picker",{staticStyle:{width:"90%"},attrs:{type:"date",placeholder:e.placeholder,format:"yyyy-MM-dd","value-format":"yyyy-MM-dd","picker-options":t.pickerOptions,"auto-complete":"off"},on:{change:function(a){t.handleInput(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}}):e.type&&"radio"==e.type?a("div",[a("el-radio",{attrs:{label:"是"},on:{input:function(a){t.handleInput(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}},[t._v("是")]),t._v(" "),a("el-radio",{attrs:{label:"否"},on:{input:function(a){t.handleInput(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}},[t._v("否")])],1):t._e()],1)}))],1),t._v(" "),a("el-tab-pane",{attrs:{label:"自定义字段",name:"second"}},[a("el-form",{ref:"attributeform",staticClass:"cusForm",attrs:{model:t.fieldsform,rules:t.rules}},t._l(t.previewData,function(e){return a("el-form-item",{key:e.id,attrs:{label:e.name,prop:e.field_name,"label-width":"130px"}},["text"==e.formType||"email"==e.formType?a("el-input",{staticStyle:{width:"90%"},attrs:{placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"textarea"==e.formType?a("el-input",{staticStyle:{width:"90%"},attrs:{type:"textarea",maxlength:e.max_length,placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"number"==e.formType?a("el-input",{staticStyle:{width:"90%"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"floatnumber"==e.formType?a("el-input",{staticStyle:{width:"90%"},attrs:{onkeyup:"value=value.replace(/^\\D*(\\d*(?:\\.\\d{0,2})?).*$/g, '$1')",placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"mobile"==e.formType?a("el-input",{staticStyle:{width:"90%"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",maxlength:11,placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"select"==e.formType?a("el-select",{staticStyle:{width:"90%"},attrs:{placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}},t._l(e.setting,function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})})):"checkbox"==e.formType?a("el-select",{staticStyle:{width:"90%"},attrs:{multiple:"",placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}},t._l(e.setting,function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})})):"user"==e.formType?a("el-select",{staticStyle:{width:"90%"},attrs:{placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}},t._l(t.userData,function(t){return a("el-option",{key:t.private_id,attrs:{label:t.private_employee,value:t.private_id}})})):"structure"==e.formType?a("el-select",{staticClass:"noPadding_select",staticStyle:{width:"90%"},attrs:{placeholder:e.input_tips},model:{value:e.displayVal,callback:function(a){t.$set(e,"displayVal",a)},expression:"item.displayVal"}},[a("el-option",{staticClass:"droplist nopadding_option",attrs:{value:e.displayVal}},[a("el-tree",{ref:"tree",refInFor:!0,attrs:{"node-key":"deptid","highlight-current":"","default-expand-all":"","expand-on-click-node":!1,data:t.deptData,props:t.defaultProps},on:{"node-click":function(a){t.handlecheck(a,e)}}})],1)],1):"date"==e.formType?a("el-date-picker",{staticStyle:{width:"90%"},attrs:{type:"date",placeholder:e.input_tips,format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"datetime"==e.formType?a("el-date-picker",{staticStyle:{width:"90%"},attrs:{type:"datetime",placeholder:e.input_tips,format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"file"==e.formType?a("el-upload",{staticClass:"upload-demo",attrs:{action:t.doUpload,multiple:!1,limit:1,"on-success":t.uploadSuccess,"before-upload":t.beforeUpload}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("上传")]),t._v(" "),a("div",{staticClass:"el-upload__tip",staticStyle:{"margin-top":"-20px"},attrs:{slot:"tip"},slot:"tip"},[t._v(t._s(e.input_tips))])],1):t._e()],1)}))],1)],1),t._v(" "),a("div",{staticClass:"line",staticStyle:{height:"490px"}}),t._v(" "),a("div",{staticClass:"formlist"},[a("el-table",{attrs:{data:t.tableData,border:"",stripe:"","default-sort":{order:"ascending"},"max-height":"480"}},[a("el-table-column",{attrs:{"header-align":"center",align:"center",width:"35"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{width:"15px",height:"15px",padding:"0","border-radius":"50%"},on:{click:function(a){t.getRow(e.$index,e.row)}}},[t._v(" ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"name","min-width":"200",label:"公司名称",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"address","show-overflow-tooltip":"","min-width":"200",label:"公司地址",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"representative","min-width":"90",label:"法人",sortable:""}})],1)],1),t._v(" "),a("div",{staticClass:"submit_btn"},[a("el-button",{staticStyle:{"margin-right":"50px !important"},attrs:{type:"primary",disabled:t.isDisable},on:{click:t.submit}},[t._v("立即提交")]),t._v(" "),a("el-button",{on:{click:t.closeTag}},[t._v("取消")])],1)],1)},staticRenderFns:[]};var d=a("VU/8")(s,r,!1,function(t){a("Em61")},null,null);e.default=d.exports}});