webpackJsonp([51],{UupZ:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});l("wtEF");var a=l("mtWM"),i=l.n(a),u=(l("mw3O"),{data:function(){return{msg:"自定义字段详情",updateLabel:{},fieldList:[{label:1,name:"单行文本",icon:"el-icon-date"},{label:2,name:"多行文本",icon:"el-icon-date"},{label:3,name:"单选",icon:"el-icon-date"},{label:9,name:"多选",icon:"el-icon-date"},{label:5,name:"数字",icon:"el-icon-date"},{label:6,name:"货币",icon:"el-icon-date"},{label:4,name:"日期",icon:"el-icon-date"},{label:13,name:"日期时间",icon:"el-icon-date"},{label:7,name:"手机",icon:"el-icon-date"},{label:14,name:"邮箱",icon:"el-icon-date"},{label:10,name:"人员",icon:"el-icon-date"},{label:12,name:"部门",icon:"el-icon-date"},{label:11,name:"附件",icon:"el-icon-date"}],updateForm:[],previewData:[],fieldsform:{},rules:{},dialogVisible:!1,attributeform:{name:"",field_name:"",input_tips:"",default_value:"",max_length:"",check_setting:[{value:"check_setting"},{value:"check_value"},{value:""}],check_value:[""],radio_value:"",is_null:0,is_unique:0},attributeField:{},fileList:[{name:"food.jpeg",url:"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",status:"finished"},{name:"food2.jpeg",url:"https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",status:"finished"}],click_item_index:0,updateData:{},isDisable:!1}},mounted:function(){this.loadData()},methods:{loadData:function(){var e=this,t=l("1nuA");this.updateLabel=this.$store.state.customFieldData;var a={label:this.updateLabel.label};i()({method:"post",url:e.$store.state.defaultHttp+"field/list.do?cId="+e.$store.state.iscId,data:t.stringify(a)}).then(function(t){var l=t.data;e.updateForm=l,l.forEach(function(t){1==t.is_null&&(e.rules[t.field_name]=[{required:!0,message:" "}])}),e.loadfield(e.updateForm[0])}).catch(function(e){})},loadfield:function(e){var t=e;this.updateData=e;var l=new Array,a=!1,i=!1;e.setting.forEach(function(e){l.push({value:e})}),1==e.is_null&&(a=!0),1==e.is_unique&&(i=!0),this.attributeform={name:e.name,field_name:e.field_name,input_tips:e.input_tips,default_value:e.default_value,max_length:e.max_length,check_setting:l,check_value:e.default_value,radio_value:e.default_value,is_null:a,is_unique:i},"text"==t.formType||"email"==t.formType||"number"==t.formType||"floatnumber"==t.formType||"mobile"==t.formType?this.attributeField={default_value:!0,default_date:!1,default_datetime:!1,max_length:!1,check_setting:!1,check_value:!1,radio_value:!1}:"textarea"==t.formType?this.attributeField={default_value:!0,default_date:!1,default_datetime:!1,max_length:!0,check_setting:!1,check_value:!1,radio_value:!1}:"select"==t.formType?this.attributeField={default_value:!1,default_date:!1,default_datetime:!1,max_length:!1,check_setting:!0,check_value:!1,radio_value:!0}:"checkbox"==t.formType?this.attributeField={default_value:!1,default_date:!1,default_datetime:!1,max_length:!1,check_setting:!0,check_value:!0,radio_value:!1}:"user"==t.formType||"structure"==t.formType||"file"==t.formType?this.attributeField={default_value:!1,default_date:!1,default_datetime:!1,max_length:!1,check_setting:!1,check_value:!1,radio_value:!1}:"date"==t.formType?this.attributeField={default_value:!1,default_date:!0,default_datetime:!1,max_length:!1,check_setting:!1,check_value:!1,radio_value:!1}:"datetime"==t.formType&&(this.attributeField={default_value:!1,default_date:!1,default_datetime:!0,max_length:!1,check_setting:!1,check_value:!1,radio_value:!1})},clickFieldItem:function(e,t){var l=this;1==t.label?this.updateForm.push({id:null,parent_id:null,label:null,sorting:null,operating:null,examine_category_id:null,default_value:"",field_name:"",formType:"text",input_tips:"",is_null:0,is_sys:0,is_unique:0,max_length:null,name:"单行文本",setting:[],type:t.label}):2==t.label?this.updateForm.push({id:null,parent_id:null,label:null,sorting:null,operating:null,examine_category_id:null,default_value:"",field_name:"",formType:"textarea",input_tips:"",is_null:0,is_sys:0,is_unique:0,max_length:null,name:"多行文本",setting:[],type:t.label}):3==t.label?this.updateForm.push({id:null,parent_id:null,label:null,sorting:null,operating:null,examine_category_id:null,default_value:null,field_name:"",formType:"select",input_tips:"",is_null:0,is_sys:0,is_unique:0,max_length:null,name:"单选",setting:[""],type:t.label}):9==t.label?this.updateForm.push({id:null,parent_id:null,label:null,sorting:null,operating:null,examine_category_id:null,default_value:[],field_name:"",formType:"checkbox",input_tips:"",is_null:0,is_sys:0,is_unique:0,max_length:null,name:"多选",setting:[""],type:t.label}):5==t.label?this.updateForm.push({id:null,parent_id:null,label:null,sorting:null,operating:null,examine_category_id:null,default_value:null,field_name:"",formType:"number",input_tips:"",is_null:0,is_sys:0,is_unique:0,max_length:null,name:"数字",setting:[],type:t.label}):6==t.label?this.updateForm.push({id:null,parent_id:null,label:null,sorting:null,operating:null,examine_category_id:null,default_value:null,field_name:"",formType:"floatnumber",input_tips:"",is_null:0,is_sys:0,is_unique:0,max_length:null,name:"货币",setting:[],type:t.label}):4==t.label?this.updateForm.push({id:null,parent_id:null,label:null,sorting:null,operating:null,examine_category_id:null,default_value:"",field_name:"",formType:"date",input_tips:"",is_null:0,is_sys:0,is_unique:0,max_length:null,name:"日期",setting:[],type:t.label}):13==t.label?this.updateForm.push({id:null,parent_id:null,label:null,sorting:null,operating:null,examine_category_id:null,default_value:"",field_name:"",formType:"datetime",input_tips:"",is_null:0,is_sys:0,is_unique:0,max_length:null,name:"日期时间",setting:[],type:t.label}):7==t.label?this.updateForm.push({id:null,parent_id:null,label:null,sorting:null,operating:null,examine_category_id:null,default_value:"",field_name:"",formType:"mobile",input_tips:"",is_null:0,is_sys:0,is_unique:0,max_length:null,name:"手机",setting:[],type:t.label}):14==t.label?this.updateForm.push({id:null,parent_id:null,label:null,sorting:null,operating:null,examine_category_id:null,default_value:"",field_name:"",formType:"email",input_tips:"",is_null:0,is_sys:0,is_unique:0,max_length:null,name:"邮箱",setting:[],type:t.label}):10==t.label?this.updateForm.push({id:null,parent_id:null,label:null,sorting:null,operating:null,examine_category_id:null,default_value:"",field_name:"",formType:"user",input_tips:"",is_null:0,is_sys:0,is_unique:0,max_length:null,name:"人员",setting:[],type:t.label}):12==t.label?this.updateForm.push({id:null,parent_id:null,label:null,sorting:null,operating:null,examine_category_id:null,default_value:"",field_name:"",formType:"structure",input_tips:"",is_null:0,is_sys:0,is_unique:0,max_length:null,name:"部门",setting:[],type:t.label}):11==t.label&&this.updateForm.push({id:null,parent_id:null,label:null,sorting:null,operating:null,examine_category_id:null,default_value:"",field_name:"",formType:"file",input_tips:"只能上传jpg/png文件，且不超过500kb",is_null:0,is_sys:0,is_unique:0,max_length:null,name:"附件",setting:[],type:t.label});var a=this.updateForm.length;this.updateForm.forEach(function(e,t){t==a-1&&(e.field_name=e.formType+t,l.click_item_index=t,l.loadfield(e))})},clickFormItem:function(e,t,l){this.click_item_index=l,this.loadfield(t)},delFieldItem:function(e,t,l){1==t.is_sys?this.$message({message:"该字段不可删除"}):this.updateForm.splice(l,1)},handleInput:function(e,t){1==this.updateData.is_sys?this.$message({message:"该字段不可修改"}):1==t?this.loadselectItem("name",e):2==t?this.loadselectItem("input_tips",e):3==t?this.loadselectItem("default_value",e):4==t&&this.loadselectItem("max_length",e)},handleChange:function(e,t){1==this.updateData.is_sys?this.$message({message:"该字段不可修改"}):1==t?this.loadselectItem("default_value",e):2==t?this.loadselectItem("default_value",e):3==t?this.loadselectItem("default_value",e):4==t?this.loadselectItem("default_value",e):5==t?1==e?this.loadselectItem("is_null",1):0==e&&this.loadselectItem("is_null",0):6==t&&(1==e?this.loadselectItem("is_unique",1):0==e&&this.loadselectItem("is_unique",0))},plusCheck:function(e,t){this.attributeform.check_setting.push({value:null})},removeCheck:function(e,t){this.attributeform.check_setting.splice(t,1)},loadselectItem:function(e,t){var l=this,a=this;this.rules={},this.updateForm.forEach(function(i,u){u==l.click_item_index&&(i[e]=t),1==i.is_null&&(a.rules[i.field_name]=[{required:!0,message:" "}])})},topreview:function(){var e=new Array;this.updateForm.forEach(function(t){0==t.is_sys&&e.push(t)}),this.previewData=e,this.dialogVisible=!0},submit:function(){var e=this,t=new Array;this.updateForm.forEach(function(e){t.push({id:e.id,parent_id:e.parent_id,label:e.label,sorting:e.sorting,operating:e.operating,examine_category_id:e.examine_category_id,name:e.name,field_name:e.field_name,type:e.type,input_tips:e.input_tips,max_length:e.max_length,default_value:e.default_value,is_unique:e.is_unique,is_null:e.is_null,is_sys:e.is_sys,formType:e.formType,setting:e.setting})});var l={label:this.updateLabel.label,data:t};this.isDisable=!0,i()({method:"post",url:e.$store.state.defaultHttp+"field/save.do?cId="+e.$store.state.iscId,data:l}).then(function(t){t.data.code&&"200"==t.data.code?(e.$message({message:"保存成功",type:"success"}),e.isDisable=!1,i()({method:"post",url:e.$store.state.defaultHttp+"userPageInfo/saveUserPageInfo.do?cId="+e.$store.state.iscId,data:l}).then(function(t){t.data.code&&"200"==t.data.code?e.closeTag():e.$message({message:"页面未同步成功，请重新保存此页面",type:"error"})}).catch(function(e){})):e.$message({message:t.data.msg,type:"error"})}).catch(function(e){})},closeTag:function(){var e=this,t=void 0;this.$store.state.tagsList.forEach(function(l,a){l.name==e.$options.name&&(t=a)});var l=this.$store.state.tagsList.splice(t,1)[0];(this.$store.state.tagsList[t]?this.$store.state.tagsList[t]:this.$store.state.tagsList[t-1])?l.path===this.$route.fullPath&&this.$router.push("/customFields"):this.$router.push("/index")}}}),s={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"field_update"},[l("el-row",{staticClass:"field_update_row",attrs:{gutter:10}},[l("el-col",{staticClass:"field_update_col field_update_left",attrs:{span:7}},[l("span",{staticClass:"field_update_title"},[e._v("字段库")]),e._v(" "),l("div",{staticClass:"field_warehouse"},e._l(e.fieldList,function(t,a){return l("div",{key:a,staticClass:"field_option",on:{click:function(l){e.clickFieldItem(l,t)}}},[l("i",{class:t.icon,staticStyle:{color:"#F2B774"}}),e._v("\n                     "+e._s(t.name)+"\n                ")])}))]),e._v(" "),l("el-col",{staticClass:"field_update_col field_update_center",attrs:{span:10}},[l("div",{staticClass:"field_update_center_head"},[l("span",{staticStyle:{cursor:"pointer","font-size":"14px",color:"#ff6333","margin-right":"30px"},on:{click:function(t){e.topreview()}}},[e._v("预 览")]),e._v(" "),l("el-button",{staticStyle:{"margin-right":"10px !important"},attrs:{type:"primary",size:"medium",disabled:e.isDisable},on:{click:e.submit}},[e._v("提交")]),e._v(" "),l("el-button",{staticClass:"info-btn",staticStyle:{"margin-right":"10px !important"},attrs:{size:"medium"},on:{click:e.closeTag}},[e._v("返回")])],1),e._v(" "),l("el-form",{ref:"attributeform",staticClass:"field_form",attrs:{model:e.fieldsform,"label-width":"80px",rules:e.rules}},e._l(e.updateForm,function(t,a){return l("el-form-item",{key:a,staticClass:"field_form_item",class:e.click_item_index==a?"bg_field":"",attrs:{label:t.name,prop:t.field_name},nativeOn:{click:function(l){e.clickFormItem(l,t,a)}}},["text"==t.formType||"email"==t.formType?l("el-input",{staticStyle:{width:"240px"},attrs:{disabled:"",placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"textarea"==t.formType?l("el-input",{staticStyle:{width:"240px"},attrs:{disabled:"",type:"textarea",maxlength:t.max_length,placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"number"==t.formType?l("el-input",{staticStyle:{width:"240px"},attrs:{disabled:"",onkeyup:"value=value.replace(/[^\\d]/g,'')",placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"floatnumber"==t.formType?l("el-input",{staticStyle:{width:"240px"},attrs:{disabled:"",onkeyup:"value=value.replace(/^\\D*(\\d*(?:\\.\\d{0,2})?).*$/g, '$1')",placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"mobile"==t.formType?l("el-input",{staticStyle:{width:"240px"},attrs:{disabled:"",onkeyup:"value=value.replace(/[^\\d]/g,'')",maxlength:11,placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"select"==t.formType?l("el-select",{staticStyle:{width:"240px"},attrs:{disabled:"",placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"checkbox"==t.formType?l("el-select",{staticStyle:{width:"240px"},attrs:{multiple:"",disabled:"",placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"user"==t.formType||"structure"==t.formType?l("el-select",{staticStyle:{width:"240px"},attrs:{disabled:"",multiple:"",placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"date"==t.formType?l("el-date-picker",{staticStyle:{width:"240px"},attrs:{disabled:"",type:"date",placeholder:t.input_tips,format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"datetime"==t.formType?l("el-date-picker",{staticStyle:{width:"240px"},attrs:{disabled:"",type:"datetime",placeholder:t.input_tips,format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"file"==t.formType?l("el-button",{staticClass:"info-btn",attrs:{size:"mini"}},[e._v("上传")]):e._e(),e._v(" "),"file"==t.formType?l("div",{staticClass:"el-upload__tip",staticStyle:{"line-height":"16px"}},[e._v(e._s(t.input_tips))]):e._e(),e._v(" "),e.click_item_index==a&&1!==t.is_sys?l("div",{staticClass:"field_item_del",on:{click:function(l){e.delFieldItem(l,t,a)}}},[l("i",{staticClass:"el-icon-delete",staticStyle:{color:"#ff6633","font-size":"16px"}})]):e._e()],1)}))],1),e._v(" "),l("el-col",{staticClass:"field_update_col field_update_right",attrs:{span:7}},[l("div",{staticClass:"field_update_right_head"},[l("span",{staticClass:"field_update_title"},[e._v("字段属性")])]),e._v(" "),l("el-form",{ref:"attributeform",staticClass:"attribute_form",attrs:{model:e.attributeform}},[l("span",{staticClass:"fieldform_label"},[e._v("标识名")]),e._v(" "),l("el-form-item",[l("el-input",{attrs:{placeholder:"标识名不能为空"},on:{input:function(t){e.handleInput(t,1)}},model:{value:e.attributeform.name,callback:function(t){e.$set(e.attributeform,"name",t)},expression:"attributeform.name"}})],1),e._v(" "),l("span",{staticClass:"fieldform_label"},[e._v("提示文字")]),e._v(" "),l("el-form-item",[l("el-input",{attrs:{placeholder:"显示在输入框或选项框内的文字"},on:{input:function(t){e.handleInput(t,2)}},model:{value:e.attributeform.input_tips,callback:function(t){e.$set(e.attributeform,"input_tips",t)},expression:"attributeform.input_tips"}})],1),e._v(" "),e.attributeField.default_value||e.attributeField.default_date||e.attributeField.default_datetime?l("span",{staticClass:"fieldform_label"},[e._v("默认值")]):e._e(),e._v(" "),l("el-form-item",[e.attributeField.default_value?l("el-input",{on:{input:function(t){e.handleInput(t,3)}},model:{value:e.attributeform.default_value,callback:function(t){e.$set(e.attributeform,"default_value",t)},expression:"attributeform.default_value"}}):e._e(),e._v(" "),e.attributeField.default_date?l("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",placeholder:"选择日期"},on:{input:function(t){e.handleChange(t,1)}},model:{value:e.attributeform.default_value,callback:function(t){e.$set(e.attributeform,"default_value",t)},expression:"attributeform.default_value"}}):e._e(),e._v(" "),e.attributeField.default_datetime?l("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期时间"},on:{input:function(t){e.handleChange(t,2)}},model:{value:e.attributeform.default_value,callback:function(t){e.$set(e.attributeform,"default_value",t)},expression:"attributeform.default_value"}}):e._e()],1),e._v(" "),e.attributeField.max_length?l("span",{staticClass:"fieldform_label"},[e._v("字符上限")]):e._e(),e._v(" "),l("el-form-item",[e.attributeField.max_length?l("el-input",{on:{input:function(t){e.handleInput(t,4)}},model:{value:e.attributeform.max_length,callback:function(t){e.$set(e.attributeform,"max_length",t)},expression:"attributeform.max_length"}}):e._e()],1),e._v(" "),e.attributeField.check_setting?l("span",{staticClass:"fieldform_label"},[e._v("选项设置")]):e._e(),e._v(" "),e.attributeField.check_value?l("el-form-item",{staticClass:"field_checkbox"},[l("el-checkbox-group",{on:{change:function(t){e.handleChange(t,3)}},model:{value:e.attributeform.check_value,callback:function(t){e.$set(e.attributeform,"check_value",t)},expression:"attributeform.check_value"}},e._l(e.attributeform.check_setting,function(t,a){return l("div",{key:a,staticClass:"check_div"},[l("el-checkbox",{staticClass:"field_check",attrs:{label:t.value}},[l("el-input",{model:{value:t.value,callback:function(l){e.$set(t,"value",l)},expression:"el.value"}})],1),e._v(" "),l("span",{staticClass:"plus_remove_icon"},[l("i",{staticClass:"el-icon-circle-plus",on:{click:function(l){e.plusCheck(t,a)}}}),e._v(" "),l("i",{staticClass:"el-icon-remove",on:{click:function(l){e.removeCheck(t,a)}}})])],1)}))],1):e._e(),e._v(" "),e.attributeField.radio_value?l("el-form-item",{staticClass:"field_radiobox"},[l("el-radio-group",{on:{change:function(t){e.handleChange(t,4)}},model:{value:e.attributeform.radio_value,callback:function(t){e.$set(e.attributeform,"radio_value",t)},expression:"attributeform.radio_value"}},e._l(e.attributeform.check_setting,function(t,a){return l("div",{key:a,staticClass:"check_div"},[l("el-radio",{staticClass:"field_check",attrs:{label:t.value}},[l("el-input",{model:{value:t.value,callback:function(l){e.$set(t,"value",l)},expression:"el.value"}})],1),e._v(" "),l("span",{staticClass:"plus_remove_icon"},[l("i",{staticClass:"el-icon-circle-plus",on:{click:function(l){e.plusCheck(t,a)}}}),e._v(" "),l("i",{staticClass:"el-icon-remove",on:{click:function(l){e.removeCheck(t,a)}}})])],1)}))],1):e._e(),e._v(" "),l("el-form-item",[l("el-checkbox",{attrs:{label:"设为必填"},on:{change:function(t){e.handleChange(t,5)}},model:{value:e.attributeform.is_null,callback:function(t){e.$set(e.attributeform,"is_null",t)},expression:"attributeform.is_null"}}),e._v(" "),l("br"),e._v(" "),l("el-checkbox",{attrs:{label:"设为唯一"},on:{change:function(t){e.handleChange(t,6)}},model:{value:e.attributeform.is_unique,callback:function(t){e.$set(e.attributeform,"is_unique",t)},expression:"attributeform.is_unique"}})],1)],1)],1)],1),e._v(" "),l("el-dialog",{staticClass:"preview_dialog",attrs:{title:"自定义字段",visible:e.dialogVisible,width:"50%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[l("div",{staticClass:"preview_dialog_body"},[l("el-form",{ref:"attributeform",attrs:{model:e.fieldsform,"label-width":"80px",rules:e.rules}},e._l(e.previewData,function(t,a){return l("el-form-item",{key:a,attrs:{label:t.name,prop:t.field_name}},["text"==t.formType||"email"==t.formType?l("el-input",{staticStyle:{width:"240px"},attrs:{disabled:"",placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"textarea"==t.formType?l("el-input",{staticStyle:{width:"240px"},attrs:{disabled:"",type:"textarea",maxlength:t.max_length,placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"number"==t.formType?l("el-input",{staticStyle:{width:"240px"},attrs:{disabled:"",onkeyup:"value=value.replace(/[^\\d]/g,'')",placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"floatnumber"==t.formType?l("el-input",{staticStyle:{width:"240px"},attrs:{disabled:"",onkeyup:"value=value.replace(/^\\D*(\\d*(?:\\.\\d{0,2})?).*$/g, '$1')",placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"mobile"==t.formType?l("el-input",{staticStyle:{width:"240px"},attrs:{disabled:"",onkeyup:"value=value.replace(/[^\\d]/g,'')",maxlength:11,placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"select"==t.formType?l("el-select",{staticStyle:{width:"240px"},attrs:{disabled:"",placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"checkbox"==t.formType?l("el-select",{staticStyle:{width:"240px"},attrs:{multiple:"",disabled:"",placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"user"==t.formType||"structure"==t.formType?l("el-select",{staticStyle:{width:"240px"},attrs:{disabled:"",multiple:"",placeholder:t.input_tips},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"date"==t.formType?l("el-date-picker",{staticStyle:{width:"240px"},attrs:{disabled:"",type:"date",placeholder:t.input_tips,format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"datetime"==t.formType?l("el-date-picker",{staticStyle:{width:"240px"},attrs:{disabled:"",type:"datetime",placeholder:t.input_tips,format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.default_value,callback:function(l){e.$set(t,"default_value",l)},expression:"item.default_value"}}):"file"==t.formType?l("el-button",{staticClass:"info-btn",attrs:{disabled:"",size:"mini"}},[e._v("上传")]):e._e(),e._v(" "),"file"==t.formType?l("div",{staticClass:"el-upload__tip",staticStyle:{"line-height":"16px"}},[e._v(e._s(t.input_tips))]):e._e()],1)}))],1),e._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{size:"medium"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)])],1)},staticRenderFns:[]};var n=l("VU/8")(u,s,!1,function(e){l("kPgN")},null,null);t.default=n.exports},kPgN:function(e,t){}});