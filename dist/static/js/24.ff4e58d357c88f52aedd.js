webpackJsonp([24],{"7KSd":function(t,e){},"82k4":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});o("wtEF");var a=o("mtWM"),i=o.n(a),s=(o("9igS"),{name:"contactsaddorupdate",data:function(){return{clueList:[],customerList:[],tableData:null,contaddOrUpdateData:{},myForm:{poolName:null,address:null},formid:null,subData:{},mapJson:"../../../../dist/static/map.json",Provinces:[],cityList:[],areaList:[],Citys:[],block:[],countryid:null,cityid:null,areaid:null,page:1,limit:15,selectData:null,rules:{poolName:[{required:!0,message:"公司名称不能为空",trigger:"blur"}],name:[{required:!0,message:"联系人名称不能为空",trigger:"blur"}],phone:[{required:!0,message:"电话不能为空",trigger:"blur"}]},searchvalue:null,isDisable:!1}},activated:function(){this.loadData(),this.loadTable(),this.loadCountry()},methods:{loadCountry:function(){var t=this,e=o("1nuA"),a={};this.cityid&&(a.id=this.cityid,i()({method:"post",url:t.$store.state.defaultHttp+"address/getAddress.do",data:e.stringify(a)}).then(function(e){t.areaList=e.data}).catch(function(t){})),this.countryid&&(a.id=this.countryid,i()({method:"post",url:t.$store.state.defaultHttp+"address/getAddress.do",data:e.stringify(a)}).then(function(e){t.cityList=e.data}).catch(function(t){})),a.id="",i()({method:"post",url:t.$store.state.defaultHttp+"address/getAddress.do",data:e.stringify(a)}).then(function(e){t.Provinces=e.data}).catch(function(t){})},loadTable:function(){var t=this,e=o("1nuA"),a={};a.page=this.page,a.limit=this.limit,a.pId=this.$store.state.ispId,a.searchName=this.searchvalue,i()({method:"post",url:t.$store.state.defaultHttp+"rightPoolName.do?cId="+t.$store.state.iscId,data:e.stringify(a)}).then(function(e){t.clueList=e.data.map.success.customerTwos,t.customerList=e.data.map.success.customerpools,t.tableData=t.clueList.concat(t.customerList)}).catch(function(t){})},loadData:function(){var t=this;this.contaddOrUpdateData=this.$store.state.contaddOrUpdateData,this.countryid=this.contaddOrUpdateData.setForm.country,this.cityid=this.contaddOrUpdateData.setForm.city,this.areaid=this.contaddOrUpdateData.setForm.area;var e=this.contaddOrUpdateData.createForm,o=this.contaddOrUpdateData.setForm;o&&(e.forEach(function(e,a){e.type&&"select"==e.type?t.$set(t.myForm,e.inputModel,o[e.inputModel]):e.type&&"radio"==e.type?t.$set(t.myForm,e.inputModel,o[e.inputModel]):e.type&&"date"==e.type?t.$set(t.myForm,e.inputModel,o[e.inputModel]):t.myForm[e.inputModel]=o[e.inputModel]}),this.myForm.countryid=this.contaddOrUpdateData.setForm.country,this.myForm.cityid=this.contaddOrUpdateData.setForm.city,this.myForm.areaid=this.contaddOrUpdateData.setForm.area,this.$emit("input",this.myForm))},handleInput:function(t,e){this.myForm[e]=t},handleoninput:function(t,e){this.myForm[e]=t,this.searchvalue=t,this.$options.methods.loadTable.bind(this)(!0)},submit:function(){var t=this,e=o("1nuA"),a={};t.contaddOrUpdateData.submitData&&(a.id=t.contaddOrUpdateData.submitData.id);var s=!1;t.contaddOrUpdateData.createForm.forEach(function(e){a[e.inputModel]=t.myForm[e.inputModel],"email"==e.inputModel&&a[e.inputModel]&&!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(a.email)&&(t.$message({message:"邮箱格式不正确",type:"error"}),s=!0),"name"!=e.inputModel||a[e.inputModel]||(t.$message({message:"联系人名称不能为空",type:"error"}),s=!0),"poolName"!=e.inputModel||a[e.inputModel]||(t.$message({message:"公司名称不能为空",type:"error"}),s=!0),"phone"!=e.inputModel||a[e.inputModel]||(t.$message({message:"手机号码不能为空",type:"error"}),s=!0)}),s||(a.secondid=this.$store.state.deptid,a.deptid=this.$store.state.insid,a.customeroneId=this.myForm.customeroneId,a.customerpool_id=this.myForm.customerpool_id,this.isDisable=!0,i()({method:"post",url:t.contaddOrUpdateData.submitURL,data:e.stringify(a)}).then(function(e){e.data.code&&"200"==e.data.code?(t.$message({message:"成功",type:"success"}),t.closeTag()):t.$message({message:e.data.msg,type:"error"}),t.isDisable=!1}).catch(function(e){t.$message.error("提交失败，请重新提交")}))},closeTag:function(){var t=this,e=void 0;this.$store.state.tagsList.forEach(function(o,a){o.name==t.$options.name&&(e=a)});var o=this.$store.state.tagsList.splice(e,1)[0];(this.$store.state.tagsList[e]?this.$store.state.tagsList[e]:this.$store.state.tagsList[e-1])?o.path===this.$route.fullPath&&this.$router.push("/contacts"):this.$router.push("/index")},getRow:function(t,e){var o=this;this.myForm.poolName=e.name,this.myForm.address=e.address,this.formid=e.id,this.clueList.forEach(function(t){o.formid==t.id&&(o.myForm.customeroneId=t.id,o.myForm.customerpool_id=null)}),this.customerList.forEach(function(t){o.formid==t.id&&(o.myForm.customerpool_id=t.id,o.myForm.customeroneId=null)})},choseProvince:function(t){this.myForm.cityid="",this.myForm.areaid="",this.countryid=t,this.$options.methods.loadCountry.bind(this)(!0)},choseCity:function(t){this.myForm.areaid="",this.cityid=t,this.$options.methods.loadCountry.bind(this)(!0)},choseBlock:function(t){this.E=t,this.areaid=t}}}),n={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"addorupdatecontent"},[o("el-form",{ref:"myForm",staticClass:"myForm",attrs:{model:t.myForm,rules:t.rules}},t._l(t.contaddOrUpdateData.createForm,function(e){return o("el-form-item",{key:e.inputModel,staticClass:"formitemcont",attrs:{"label-width":"100px",label:e.label,prop:e.inputModel}},[e.type&&"input"!=e.type?t._e():o("el-input",{staticStyle:{width:"90%"},attrs:{value:t.myForm[e.inputModel],"auto-complete":"off"},on:{input:function(o){t.handleInput(o,e.inputModel)}}}),t._v(" "),"textarea"==e.type?o("el-input",{staticStyle:{width:"90%"},attrs:{type:"textarea",rows:"5",value:t.myForm[e.inputModel],"auto-complete":"off",disabled:e.disabled},on:{input:function(o){t.handleInput(o,e.inputModel)}}}):e.type&&"number"==e.type?o("el-input",{staticStyle:{width:"90%"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",value:t.myForm[e.inputModel],"auto-complete":"off"},on:{input:function(o){t.handleInput(o,e.inputModel)}}}):e.type&&"require"==e.type&&"poolName"==e.inputModel?o("el-input",{staticStyle:{width:"90%"},attrs:{value:t.myForm[e.inputModel],"auto-complete":"off"},on:{input:function(o){t.handleoninput(o,e.inputModel)}}}):"countryid"==e.inputModel?o("el-select",{staticStyle:{width:"28%"},attrs:{placeholder:e.placeholder},on:{change:t.choseProvince},model:{value:t.myForm[e.inputModel],callback:function(o){t.$set(t.myForm,e.inputModel,o)},expression:"myForm[item.inputModel]"}},t._l(t.Provinces,function(t){return o("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})):"cityid"==e.inputModel?o("el-select",{staticClass:"cityseat",staticStyle:{width:"28%"},attrs:{placeholder:e.placeholder},on:{change:t.choseCity},model:{value:t.myForm[e.inputModel],callback:function(o){t.$set(t.myForm,e.inputModel,o)},expression:"myForm[item.inputModel]"}},t._l(t.cityList,function(t){return o("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})):"areaid"==e.inputModel?o("el-select",{staticClass:"areaseat",staticStyle:{width:"28%"},attrs:{placeholder:e.placeholder},on:{change:t.choseBlock},model:{value:t.myForm[e.inputModel],callback:function(o){t.$set(t.myForm,e.inputModel,o)},expression:"myForm[item.inputModel]"}},t._l(t.areaList,function(t){return o("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})):e.type&&"select"==e.type?o("el-select",{staticStyle:{width:"30px"},attrs:{multiple:e.multiple,"collapse-tags":e.multiple,placeholder:e.placeholder},on:{select:function(o){t.handleInput(o,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(o){t.$set(t.myForm,e.inputModel,o)},expression:"myForm[item.inputModel]"}},t._l(e.options,function(t){return o("el-option",{key:t[e.okey],attrs:{label:t[e.olabel],value:t[e.ovalue]}})})):e.type&&"date"==e.type?o("el-date-picker",{staticStyle:{width:"90%"},attrs:{type:"date",placeholder:e.placeholder,format:"yyyy-MM-dd","value-format":"yyyy-MM-dd","default-value":"1985-06-15","auto-complete":"off"},on:{change:function(o){t.handleInput(o,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(o){t.$set(t.myForm,e.inputModel,o)},expression:"myForm[item.inputModel]"}}):e.type&&"radio"==e.type&&"sex"==e.inputModel?o("div",[o("el-radio",{attrs:{label:"男"},on:{input:function(o){t.handleInput(o,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(o){t.$set(t.myForm,e.inputModel,o)},expression:"myForm[item.inputModel]"}},[t._v("男")]),t._v(" "),o("el-radio",{attrs:{label:"女"},on:{input:function(o){t.handleInput(o,e.inputModel)}},model:{value:t.myForm[e.inputModel],callback:function(o){t.$set(t.myForm,e.inputModel,o)},expression:"myForm[item.inputModel]"}},[t._v("女")])],1):t._e()],1)})),t._v(" "),o("div",{staticClass:"line",staticStyle:{height:"740px"}}),t._v(" "),o("div",{staticClass:"formlist"},[o("el-table",{attrs:{data:t.tableData,border:"",stripe:"","default-sort":{order:"ascending"},"max-height":"730"}},[o("el-table-column",{attrs:{"header-align":"center",align:"center",width:"35"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{staticStyle:{width:"15px",height:"15px",padding:"0","border-radius":"50%"},on:{click:function(o){t.getRow(e.$index,e.row)}}},[t._v(" ")])]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"name","min-width":"200",label:"公司名称",sortable:""}}),t._v(" "),o("el-table-column",{attrs:{prop:"address","show-overflow-tooltip":"","min-width":"200",label:"公司地址",sortable:""}}),t._v(" "),o("el-table-column",{attrs:{prop:"representative","min-width":"90",label:"法人",sortable:""}})],1)],1),t._v(" "),o("div",{staticClass:"submit_btn"},[o("el-button",{staticStyle:{"margin-right":"50px !important"},attrs:{type:"primary",disabled:t.isDisable},on:{click:t.submit}},[t._v("立即提交")]),t._v(" "),o("el-button",{on:{click:t.closeTag}},[t._v("取消")])],1)],1)},staticRenderFns:[]};var l=o("VU/8")(s,n,!1,function(t){o("7KSd")},null,null);e.default=l.exports}});