webpackJsonp([58],{DZT7:function(t,e){},XrnN:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("wtEF");var i=a("mtWM"),l=a.n(i),o=(a("9igS"),{name:"contactsaddorupdate",data:function(){return{activeName:"first",clueList:[],customerList:[],tableData:null,contaddOrUpdateData:{},myForm:{poolName:null,address:null},formid:null,subData:{},mapJson:"../../../../dist/static/map.json",Provinces:[],cityList:[],areaList:[],Citys:[],block:[],countryid:null,cityid:null,areaid:null,page:1,limit:15,selectData:null,rules:{poolName:[{required:!0,message:"公司名称不能为空",trigger:"blur"}],name:[{required:!0,message:"联系人名称不能为空",trigger:"blur"}],phone:[{required:!0,message:"电话不能为空",trigger:"blur"}]},searchvalue:null,isDisable:!1,fieldsform:{},previewData:[],deptData:[],defaultProps:{label:"deptname",children:"next"},userData:[],doUpload:this.$store.state.defaultHttp+"workOrder/upload.do?cId="+this.$store.state.iscId}},mounted:function(){this.loadData(),this.loadTable(),this.loadCountry(),this.loadfield(),this.loadUserandDept()},methods:{loadCountry:function(){var t=this,e=a("1nuA"),i={};this.cityid&&(i.id=this.cityid,l()({method:"post",url:t.$store.state.defaultHttp+"address/getAddress.do",data:e.stringify(i)}).then(function(e){t.areaList=e.data}).catch(function(t){})),this.countryid&&(i.id=this.countryid,l()({method:"post",url:t.$store.state.defaultHttp+"address/getAddress.do",data:e.stringify(i)}).then(function(e){t.cityList=e.data}).catch(function(t){})),i.id="",l()({method:"post",url:t.$store.state.defaultHttp+"address/getAddress.do",data:e.stringify(i)}).then(function(e){t.Provinces=e.data}).catch(function(t){})},loadTable:function(){var t=this,e=a("1nuA"),i={};i.page=this.page,i.limit=this.limit,i.pId=this.$store.state.ispId,i.searchName=this.searchvalue,l()({method:"post",url:t.$store.state.defaultHttp+"rightPoolName.do?cId="+t.$store.state.iscId,data:e.stringify(i)}).then(function(e){t.clueList=e.data.map.success.customerTwos,t.customerList=e.data.map.success.customerpools,t.tableData=t.clueList.concat(t.customerList)}).catch(function(t){})},loadData:function(){var t=this;this.contaddOrUpdateData=this.$store.state.contaddOrUpdateData,this.countryid=this.contaddOrUpdateData.setForm.country,this.cityid=this.contaddOrUpdateData.setForm.city,this.areaid=this.contaddOrUpdateData.setForm.area;var e=this.contaddOrUpdateData.createForm,a=this.contaddOrUpdateData.setForm;a&&(e.forEach(function(e,i){e.type&&"select"==e.type?t.$set(t.myForm,e.inputModel,a[e.inputModel]):e.type&&"radio"==e.type?t.$set(t.myForm,e.inputModel,a[e.inputModel]):e.type&&"date"==e.type?t.$set(t.myForm,e.inputModel,a[e.inputModel]):t.myForm[e.inputModel]=a[e.inputModel]}),this.myForm.countryid=this.contaddOrUpdateData.setForm.country,this.myForm.cityid=this.contaddOrUpdateData.setForm.city,this.myForm.areaid=this.contaddOrUpdateData.setForm.area,this.$emit("input",this.myForm))},loadfield:function(){var t=this,e=a("1nuA"),i=null,o=null;this.contaddOrUpdateData.submitData&&(i=this.contaddOrUpdateData.submitData.id,o=this.contaddOrUpdateData.submitData.batch_id);var s={label:3,id:i,batch_id:o};l()({method:"post",url:t.$store.state.defaultHttp+"field/queryField.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){var a=e.data;a.forEach(function(e,a){e.displayVal="",t.contaddOrUpdateData.submitData?(e.default_value=e.value,"user"!=e.formType&&"structure"!=e.formType||(e.displayVal=e.deptOrUserName,e.default_value=parseInt(e.value))):"checkbox"!==e.formType&&null!==e.value&&(e.default_value=e.value),1==e.is_null&&(t.rules[e.field_name]=[{required:!0,message:" ",trigger:"blur"}])}),t.previewData=a}).catch(function(t){})},loadUserandDept:function(){var t=this,e=a("1nuA"),i={page:1,limit:"9999"};l()({method:"post",url:t.$store.state.defaultHttp+"getPrivateUserAll.do?cId="+t.$store.state.iscId,data:e.stringify(i)}).then(function(e){t.userData=e.data.map.success}).catch(function(t){}),l()({method:"get",url:t.$store.state.defaultHttp+"dept/getDeptNodeTree.do?cId="+t.$store.state.iscId}).then(function(e){t.deptData=e.data.map.success}).catch(function(t){})},handleInput:function(t,e){this.myForm[e]=t},handleoninput:function(t,e){this.myForm[e]=t,this.searchvalue=t,this.$options.methods.loadTable.bind(this)(!0)},handlecheck:function(t,e){this.previewData.forEach(function(a){a.id==e.id&&(a.displayVal=t.deptname,a.default_value=t.deptid)})},beforeUpload:function(t){if(!(t.size/1024/1024<5))return this.$message.warning("文件大小不能超过 5MB!"),!1},uploadSuccess:function(t,e,a){this.previewData.forEach(function(e){"file"==e.formType&&(e.default_value=t)})},submit:function(){var t=this,e=(a("1nuA"),{});t.contaddOrUpdateData.submitData&&(e.id=t.contaddOrUpdateData.submitData.id,e.batch_id=t.contaddOrUpdateData.submitData.batch_id);var i=t.contaddOrUpdateData.createForm,o=t.previewData,s=(new Array,!1);if(i.forEach(function(a){e[a.inputModel]=t.myForm[a.inputModel],"email"==a.inputModel&&e[a.inputModel]&&!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(e.email)&&(t.$message({message:"邮箱格式不正确",type:"error"}),s=!0),"name"!=a.inputModel||e[a.inputModel]||(t.$message({message:"联系人名称不能为空",type:"error"}),s=!0),"poolName"!=a.inputModel||e[a.inputModel]||(t.$message({message:"公司名称不能为空",type:"error"}),s=!0),"phone"!=a.inputModel||e[a.inputModel]||(t.$message({message:"手机号码不能为空",type:"error"}),s=!0)}),o.forEach(function(e){"checkbox"==e.formType?e.value=e.default_value.join(","):"user"==e.formType||"structure"==e.formType?e.default_value&&(e.value=e.default_value.toString()):e.value=e.default_value,1!=e.is_null||e.value||(t.$message({message:e.name+"不能为空",type:"error"}),s=!0)}),!s){e.pId=this.$store.state.ispId,e.secondid=this.$store.state.deptid,e.deptid=this.$store.state.insid,e.customeroneId=this.myForm.customeroneId,e.customerpool_id=this.myForm.customerpool_id;var d={entity:e,field:o};this.isDisable=!0,l()({method:"post",url:t.$store.state.defaultHttp+"contacts/saveOrUpdate.do?cId="+t.$store.state.iscId,data:d}).then(function(e){e.data.code&&"200"==e.data.code?(t.$message({message:"成功",type:"success"}),t.closeTag()):t.$message({message:e.data.msg,type:"error"}),t.isDisable=!1}).catch(function(e){t.$message.error("提交失败，请重新提交")})}},handleSubmit:function(){var t=this,e=a("1nuA"),i={};t.contaddOrUpdateData.submitData&&(i.id=t.contaddOrUpdateData.submitData.id);var o=!1;t.contaddOrUpdateData.createForm.forEach(function(e){i[e.inputModel]=t.myForm[e.inputModel],"email"==e.inputModel&&i[e.inputModel]&&!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(i.email)&&(t.$message({message:"邮箱格式不正确",type:"error"}),o=!0),"name"!=e.inputModel||i[e.inputModel]||(t.$message({message:"联系人名称不能为空",type:"error"}),o=!0),"poolName"!=e.inputModel||i[e.inputModel]||(t.$message({message:"公司名称不能为空",type:"error"}),o=!0),"phone"!=e.inputModel||i[e.inputModel]||(t.$message({message:"手机号码不能为空",type:"error"}),o=!0)}),o||(i.secondid=this.$store.state.deptid,i.deptid=this.$store.state.insid,i.customeroneId=this.myForm.customeroneId,i.customerpool_id=this.myForm.customerpool_id,this.isDisable=!0,l()({method:"post",url:t.contaddOrUpdateData.submitURL,data:e.stringify(i)}).then(function(e){e.data.code&&"200"==e.data.code?(t.$message({message:"成功",type:"success"}),t.closeTag()):t.$message({message:e.data.msg,type:"error"}),t.isDisable=!1}).catch(function(e){t.$message.error("提交失败，请重新提交")}))},closeTag:function(){var t=this,e=void 0;this.$store.state.tagsList.forEach(function(a,i){a.name==t.$options.name&&(e=i)});var a=this.$store.state.tagsList.splice(e,1)[0];(this.$store.state.tagsList[e]?this.$store.state.tagsList[e]:this.$store.state.tagsList[e-1])?a.path===this.$route.fullPath&&this.$router.push("/contacts"):this.$router.push("/index")},getRow:function(t,e){var a=this;this.myForm.poolName=e.name,this.myForm.address=e.address,this.formid=e.id,this.clueList.forEach(function(t){a.formid==t.id&&(a.myForm.customeroneId=t.id,a.myForm.customerpool_id=null)}),this.customerList.forEach(function(t){a.formid==t.id&&(a.myForm.customerpool_id=t.id,a.myForm.customeroneId=null)})},choseProvince:function(t){this.myForm.cityid="",this.myForm.areaid="",this.countryid=t,this.$options.methods.loadCountry.bind(this)(!0)},choseCity:function(t){this.myForm.areaid="",this.cityid=t,this.$options.methods.loadCountry.bind(this)(!0)},choseBlock:function(t){this.E=t,this.areaid=t}}}),s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"addorupdatecontent"},[a("el-tabs",{staticClass:"formtabs",attrs:{type:"card"},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"主要数据",name:"first"}},[a("el-form",{ref:"myForm",staticClass:"cusForm",attrs:{model:t.myForm,rules:t.rules}},t._l(t.contaddOrUpdateData.createForm,function(e){return a("el-form-item",{key:e.inputModel,staticClass:"formitemcont",attrs:{"label-width":"100px",label:e.label,prop:e.inputModel}},[e.type&&"input"!=e.type?t._e():a("el-input",{staticStyle:{width:"90%"},attrs:{value:t.myForm[e.inputModel],"auto-complete":"off"},on:{input:function(a){t.handleInput(a,e.inputModel)}}}),t._v(" "),"textarea"==e.type?a("el-input",{staticStyle:{width:"90%"},attrs:{type:"textarea",rows:"5",value:t.myForm[e.inputModel],"auto-complete":"off",disabled:e.disabled},on:{input:function(a){t.handleInput(a,e.inputModel)}}}):e.type&&"number"==e.type?a("el-input",{staticStyle:{width:"90%"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",value:t.myForm[e.inputModel],"auto-complete":"off"},on:{input:function(a){t.handleInput(a,e.inputModel)}}}):e.type&&"require"==e.type&&"poolName"==e.inputModel?a("el-input",{staticStyle:{width:"90%"},attrs:{value:t.myForm[e.inputModel],"auto-complete":"off"},on:{input:function(a){t.handleoninput(a,e.inputModel)}}}):"countryid"==e.inputModel?a("el-select",{staticStyle:{width:"28%"},attrs:{placeholder:e.placeholder},on:{change:t.choseProvince},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}},t._l(t.Provinces,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})):"cityid"==e.inputModel?a("el-select",{staticClass:"cityseat",staticStyle:{width:"28%"},attrs:{placeholder:e.placeholder},on:{change:t.choseCity},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}},t._l(t.cityList,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})):"areaid"==e.inputModel?a("el-select",{staticClass:"areaseat",staticStyle:{width:"28%"},attrs:{placeholder:e.placeholder},on:{change:t.choseBlock},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}},t._l(t.areaList,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})):e.type&&"select"==e.type?a("el-select",{staticStyle:{width:"30px"},attrs:{multiple:e.multiple,"collapse-tags":e.multiple,placeholder:e.placeholder},on:{select:function(a){t.handleInput(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}},t._l(e.options,function(t){return a("el-option",{key:t[e.okey],attrs:{label:t[e.olabel],value:t[e.ovalue]}})})):e.type&&"date"==e.type?a("el-date-picker",{staticStyle:{width:"90%"},attrs:{type:"date",placeholder:e.placeholder,format:"yyyy-MM-dd","value-format":"yyyy-MM-dd","default-value":"1985-06-15","auto-complete":"off"},on:{change:function(a){t.handleInput(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}}):e.type&&"radio"==e.type&&"sex"==e.inputModel?a("div",[a("el-radio",{attrs:{label:"男"},on:{input:function(a){t.handleInput(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}},[t._v("男")]),t._v(" "),a("el-radio",{attrs:{label:"女"},on:{input:function(a){t.handleInput(a,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(a){t.$set(t.myForm,e.inputModel,a)},expression:"myForm[item.inputModel]"}},[t._v("女")])],1):t._e()],1)}))],1),t._v(" "),a("el-tab-pane",{attrs:{label:"自定义字段",name:"second"}},[a("el-form",{ref:"attributeform",staticClass:"cusForm",attrs:{model:t.fieldsform,rules:t.rules}},t._l(t.previewData,function(e){return a("el-form-item",{key:e.id,attrs:{label:e.name,prop:e.field_name,"label-width":"130px"}},["text"==e.formType||"email"==e.formType?a("el-input",{staticStyle:{width:"90%"},attrs:{placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"textarea"==e.formType?a("el-input",{staticStyle:{width:"90%"},attrs:{type:"textarea",maxlength:e.max_length,placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"number"==e.formType?a("el-input",{staticStyle:{width:"90%"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"floatnumber"==e.formType?a("el-input",{staticStyle:{width:"90%"},attrs:{onkeyup:"value=value.replace(/^\\D*(\\d*(?:\\.\\d{0,2})?).*$/g, '$1')",placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"mobile"==e.formType?a("el-input",{staticStyle:{width:"90%"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",maxlength:11,placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"select"==e.formType?a("el-select",{staticStyle:{width:"90%"},attrs:{placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}},t._l(e.setting,function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})})):"checkbox"==e.formType?a("el-select",{staticStyle:{width:"90%"},attrs:{multiple:"",placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}},t._l(e.setting,function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})})):"user"==e.formType?a("el-select",{staticStyle:{width:"90%"},attrs:{placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}},t._l(t.userData,function(t){return a("el-option",{key:t.private_id,attrs:{label:t.private_employee,value:t.private_id}})})):"structure"==e.formType?a("el-select",{staticClass:"noPadding_select",staticStyle:{width:"90%"},attrs:{placeholder:e.input_tips},model:{value:e.displayVal,callback:function(a){t.$set(e,"displayVal",a)},expression:"item.displayVal"}},[a("el-option",{staticClass:"droplist nopadding_option",attrs:{value:e.displayVal}},[a("el-tree",{ref:"tree",refInFor:!0,attrs:{"node-key":"deptid","highlight-current":"","default-expand-all":"","expand-on-click-node":!1,data:t.deptData,props:t.defaultProps},on:{"node-click":function(a){t.handlecheck(a,e)}}})],1)],1):"date"==e.formType?a("el-date-picker",{staticStyle:{width:"90%"},attrs:{type:"date",placeholder:e.input_tips,format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"datetime"==e.formType?a("el-date-picker",{staticStyle:{width:"90%"},attrs:{type:"datetime",placeholder:e.input_tips,format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"file"==e.formType?a("el-upload",{staticClass:"upload-demo",attrs:{action:t.doUpload,"on-success":t.uploadSuccess,"before-upload":t.beforeUpload}},[a("el-button",{attrs:{size:"mini",type:"info-btn"}},[t._v("上传")]),t._v(" "),a("div",{staticClass:"el-upload__tip",staticStyle:{"margin-top":"-20px"},attrs:{slot:"tip"},slot:"tip"},[t._v(t._s(e.input_tips))])],1):t._e()],1)}))],1)],1),t._v(" "),a("div",{staticClass:"line",staticStyle:{height:"740px"}}),t._v(" "),a("div",{staticClass:"formlist"},[a("el-table",{attrs:{data:t.tableData,border:"",stripe:"","default-sort":{order:"ascending"},"max-height":"730"}},[a("el-table-column",{attrs:{"header-align":"center",align:"center",width:"35"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{width:"15px",height:"15px",padding:"0","border-radius":"50%"},on:{click:function(a){t.getRow(e.$index,e.row)}}},[t._v(" ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"name","min-width":"200",label:"公司名称",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"address","show-overflow-tooltip":"","min-width":"200",label:"公司地址",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"representative","min-width":"90",label:"法人",sortable:""}})],1)],1),t._v(" "),a("div",{staticClass:"submit_btn"},[a("el-button",{staticStyle:{"margin-right":"50px !important"},attrs:{type:"primary",disabled:t.isDisable},on:{click:t.submit}},[t._v("立即提交")]),t._v(" "),a("el-button",{on:{click:t.closeTag}},[t._v("取消")])],1)],1)},staticRenderFns:[]};var d=a("VU/8")(o,s,!1,function(t){a("DZT7")},null,null);e.default=d.exports}});