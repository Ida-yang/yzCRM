webpackJsonp([19],{"4X+5":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("wtEF"),n=a("mtWM"),r=a.n(n),i=(a("mw3O"),{name:"smstemp",store:s.a,computed:{smsData:function(){return s.a.state.smstempList}},data:function(){return{dataList:null,nameList:[{index:1,name:"线索",isActive:!0},{index:2,name:"客户",isActive:!1},{index:3,name:"联系人",isActive:!1},{index:4,name:"商机",isActive:!1},{index:5,name:"合同",isActive:!1},{index:6,name:"营销",isActive:!1}],newform:{type:"线索",index:"1",id:null,title:null,genre:null,content:null,signature:null,varCount:0,dayNum:null,url:null},searchList:{type:null,genre:"",status:""},statusData:[{id:"",name:"全部"},{id:"1",name:"审核中"},{id:"2",name:"已审核"},{id:"3",name:"未通过"}],genreData:[{id:"",name:"全部"},{id:"通知类",name:"通知类"},{id:"营销类",name:"营销类"}],btnList:[{id:"001",name:"公司名称",value:"@var(name2)"},{id:"002",name:"联系人名称",value:"@var(name1)"},{id:"003",name:"合同到期时间",value:"@var(name3)"}],dialogVisible:!1,dialogVisible2:!1,rules:{title:[{required:!0,message:"短信标题不能为空",trigger:"blur"}],content:[{required:!0,message:"短信内容不能为空",trigger:"blur"}],signature:[{required:!0,message:"模板签名不能为空",trigger:"blur"}],genre:[{required:!0,message:"短信类型不能为空",trigger:"blur"}]},auditing:this.$store.state.systemHttp+"/upload/staticImg/examine.png",noaudit:this.$store.state.systemHttp+"/upload/staticImg/refuse.png"}},mounted:function(){this.reloadTable()},activated:function(){this.reloadTable()},methods:{reloadTable:function(){var e=this,t=a("1nuA"),s=(this.newform.index,{});s.type=this.newform.type,s.genre=this.searchList.genre,s.status=this.searchList.status,r()({method:"post",url:e.$store.state.defaultHttp+"template/selectTemplate.do?cId="+e.$store.state.iscId,data:t.stringify(s)}).then(function(t){e.$store.state.smstempList=t.data.map.templates}).catch(function(e){})},showTableval:function(e){this.newform.type=e.name,this.nameList.forEach(function(e){e.isActive=!1}),e.isActive=!e.isActive,this.$options.methods.reloadTable.bind(this)(!0)},handleAdd:function(){var e=this;this.newform.index;r()({method:"get",url:e.$store.state.defaultHttp+"templateJurisdiction/insert.do"}).then(function(t){t.data.msg&&"error"==t.data.msg?e.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):(e.newform.title=null,e.newform.genre=null,e.newform.content=null,e.newform.signature=null,e.newform.status=null,e.newform.dayNum=null,e.newform.url=null,e.dialogVisible=!0)}).catch(function(e){})},addbasicset:function(){var e=this,t=a("1nuA");this.newform.varCount=0;var s=this.newform.content;s&&(-1!=s.indexOf("@var(name2)")&&(this.newform.varCount+=1),-1!=s.indexOf("@var(name1)")&&(this.newform.varCount+=1),-1!=s.indexOf("@var(name3)")&&(this.newform.varCount+=1));var n={};n.type=this.newform.type,n.title=this.newform.title,n.genre=this.newform.genre,n.content=s,n.signature=this.newform.signature,n.varCount=this.newform.varCount,n.status=1,n.dayNum=this.newform.dayNum,n.url=this.newform.url;var i=!1;n.content||(e.$message({message:"短信内容不能为空",type:"error"}),i=!0),n.genre||(e.$message({message:"短信类型不能为空",type:"error"}),i=!0),n.signature||(e.$message({message:"短信签名不能为空",type:"error"}),i=!0),n.title||(e.$message({message:"短信标题不能为空",type:"error"}),i=!0),i||r()({method:"post",url:e.$store.state.defaultHttp+"template/insertTemplate.do?cId="+e.$store.state.iscId,data:t.stringify(n)}).then(function(t){t.data.code&&200==t.data.code?(e.$message({message:"添加成功",type:"success"}),e.dialogVisible=!1,e.$options.methods.reloadTable.bind(e)(!0)):e.$message({message:t.data.msg,type:"error"})}).catch(function(t){e.$message.error("添加失败,请重新添加")})},handleEdit:function(e,t){var a=this;r()({method:"get",url:a.$store.state.defaultHttp+"templateJurisdiction/update.do"}).then(function(e){e.data.msg&&"error"==e.data.msg?a.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):(a.newform.templateId=t.templateId,a.newform.title=t.title,a.newform.genre=t.genre,a.newform.content=t.content,a.newform.signature=t.signature,a.newform.status=t.status,a.newform.dayNum=t.dayNum,a.newform.url=t.url,a.dialogVisible2=!0)}).catch(function(e){})},updatebasicset:function(){var e=this,t=(this.newform.index,a("1nuA"));this.newform.varCount=0;var s=this.newform.content;s&&(-1!=s.indexOf("@var(name2)")&&(this.newform.varCount+=1),-1!=s.indexOf("@var(name1)")&&(this.newform.varCount+=1),-1!=s.indexOf("@var(name3)")&&(this.newform.varCount+=1));var n={};n.templateId=this.newform.templateId,n.type=this.newform.type,n.title=this.newform.title,n.genre=this.newform.genre,n.content=s,n.signature=this.newform.signature,n.varCount=this.newform.varCount,n.status=this.newform.status,n.dayNum=this.newform.dayNum,n.url=this.newform.url;var i=!1;n.content||(e.$message({message:"短信内容不能为空",type:"error"}),i=!0),n.genre||(e.$message({message:"短信类型不能为空",type:"error"}),i=!0),n.signature||(e.$message({message:"短信签名不能为空",type:"error"}),i=!0),n.title||(e.$message({message:"短信标题不能为空",type:"error"}),i=!0),i||r()({method:"post",url:e.$store.state.defaultHttp+"template/updateTemplate.do?cId="+e.$store.state.iscId,data:t.stringify(n)}).then(function(t){t.data.code&&200==t.data.code?(e.$message({message:"修改成功",type:"success"}),e.dialogVisible2=!1,e.$options.methods.reloadTable.bind(e)(!0)):e.$message({message:t.data.msg,type:"error"})}).catch(function(t){e.$message.error("修改失败,请重新修改")})},handledelete:function(e,t){var s=this,n=this,i=a("1nuA"),o={};o.templateId=t.templateId,n.$confirm("是否确认删除【"+t.title+"】？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){e.value;r()({method:"post",url:n.$store.state.defaultHttp+"template/deleteTemplate.do?cId="+n.$store.state.iscId,data:i.stringify(o)}).then(function(e){e.data.code&&200==e.data.code?(n.$message({message:"删除成功",type:"success"}),n.$options.methods.reloadTable.bind(n)(!0)):e.data.msg&&"error"==e.data.msg?n.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):n.$message({message:e.data.msg,type:"error"})}).catch(function(e){n.$message.error("删除失败,请重新删除")})}).catch(function(){s.$message({type:"info",message:"取消删除【"+t.title+"】"})})},handleSend:function(e,t){a("1nuA")},checkTag:function(e){var t=this.$refs.elInput,a=t.$refs.textarea.selectionStart,s=t.$refs.textarea.selectionEnd,n=t.value;0!==a&&0!==s&&(this.newform.content=n.substring(0,a)+e.value+n.substring(s),t.focus())},changeState:function(e){var t=this,s=a("1nuA"),n={};n.templateId=e.templateId,n.type=e.type,n.status=e.status,n.state=e.state,r()({method:"post",url:t.$store.state.defaultHttp+"template/updateTemplateState.do?cId="+t.$store.state.iscId,data:s.stringify(n)}).then(function(e){e.data.code&&200==e.data.code?(t.$message({message:"修改成功",type:"success"}),t.$options.methods.reloadTable.bind(t)(!0)):e.data.msg&&"error"==e.data.msg?t.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):t.$message({message:e.data.msg,type:"error"})}).catch(function(e){t.$message.error("修改失败,请重新修改")})},search:function(){this.$options.methods.reloadTable.bind(this)()}}}),o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contentall"},[a("div",{staticClass:"setleftcontent"},[a("ul",{staticClass:"namecontent"},e._l(e.nameList,function(t){return a("li",{key:t.index,class:{actived:t.isActive},attrs:{value:t.name},on:{click:function(a){e.showTableval(t)}}},[e._v(e._s(t.name))])}))]),e._v(" "),a("div",{staticClass:"centercontent"}),e._v(" "),a("div",{staticClass:"setrightcontent"},[a("div",{staticClass:"radioList"},[a("el-radio-group",{model:{value:e.searchList.status,callback:function(t){e.$set(e.searchList,"status",t)},expression:"searchList.status"}},[a("span",{staticClass:"nameList"},[e._v("模板状态：")]),e._v(" "),e._l(e.statusData,function(t){return a("el-radio",{key:t.id,attrs:{label:t.id},on:{change:function(t){e.search()}}},[e._v(e._s(t.name))])})],2),e._v(" "),a("el-radio-group",{model:{value:e.searchList.genre,callback:function(t){e.$set(e.searchList,"genre",t)},expression:"searchList.genre"}},[a("span",{staticClass:"nameList"},[e._v("短信类型：")]),e._v(" "),e._l(e.genreData,function(t){return a("el-radio",{key:t.id,attrs:{label:t.id},on:{change:function(t){e.search()}}},[e._v(e._s(t.name))])})],2)],1),e._v(" "),a("div",{staticClass:"entry"},[a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(t){e.handleAdd()}}},[e._v("新增")])],1),e._v(" "),a("div",{staticClass:"sms_c"},[a("ul",e._l(e.smsData,function(t,s){return a("li",{key:s},[a("div",{staticClass:"sms_h"},[a("span",[e._v(e._s(t.genre)+":"+e._s(t.title))])]),e._v(" "),a("hr",{staticStyle:{"background-color":"#cccccc",height:"1px",border:"none"}}),e._v(" "),a("div",{staticClass:"sms_b"},[a("p",[e._v("短信/彩信")]),e._v(" "),a("p",[e._v("2019-03-29 15:31:21")]),e._v(" "),a("div",{staticClass:"sms_b_c"},[e._v(" "+e._s(t.content)+" ")]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2==t.status,expression:"item.status == 2"}],staticClass:"approve"},[a("img",{staticClass:"approve_img",attrs:{src:e.auditing,alt:"已审核"}})]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:3==t.status,expression:"item.status == 3"}],staticClass:"approve"},[a("img",{staticClass:"approve_img",attrs:{src:e.noaudit,alt:"未通过"}})])]),e._v(" "),a("div",{staticClass:"sms_f"},[a("span",{on:{click:function(a){e.handleEdit(a,t)}}},[a("i",{staticClass:"el-icon-edit i_edit"})]),e._v(" "),a("el-tooltip",{attrs:{content:t.state,placement:"right"}},[a("el-switch",{staticClass:"i_send",attrs:{"active-value":"启用","inactive-value":"禁用","active-color":"#13ce66","inactive-color":"#bbbbbb"},on:{change:function(a){e.changeState(t)}},model:{value:t.state,callback:function(a){e.$set(t,"state",a)},expression:"item.state"}})],1),e._v(" "),a("span",{on:{click:function(a){e.handledelete(a,t)}}},[a("i",{staticClass:"el-icon-delete i_del"})])],1)])}))])]),e._v(" "),a("el-dialog",{attrs:{title:"添加短信模板",visible:e.dialogVisible,"close-on-click-modal":!1,width:"40%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"newform",staticStyle:{"padding-right":"30px"},attrs:{model:e.newform,"label-width":"110px",rules:e.rules}},[a("el-form-item",{attrs:{prop:"type",label:"应用模块"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.newform.type,callback:function(t){e.$set(e.newform,"type",t)},expression:"newform.type"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"title",label:"短信标题"}},[a("el-input",{attrs:{placeholder:"请输入短信标题"},model:{value:e.newform.title,callback:function(t){e.$set(e.newform,"title",t)},expression:"newform.title"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"signature",label:"短信签名"}},[a("el-input",{attrs:{placeholder:"请输入短信签名"},model:{value:e.newform.signature,callback:function(t){e.$set(e.newform,"signature",t)},expression:"newform.signature"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"genre",label:"短信类型"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择短信类型"},model:{value:e.newform.genre,callback:function(t){e.$set(e.newform,"genre",t)},expression:"newform.genre"}},[a("el-option",{attrs:{value:"通知类"}},[e._v("通知类")]),e._v(" "),a("el-option",{attrs:{value:"营销类"}},[e._v("营销类")])],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"url",label:"原网址"}},[a("el-input",{attrs:{placeholder:"请输入原网址"},model:{value:e.newform.url,callback:function(t){e.$set(e.newform,"url",t)},expression:"newform.url"}})],1),e._v(" "),"合同"==e.newform.type?a("el-form-item",{attrs:{prop:"dayNum",label:"提前提醒天数"}},[a("el-input",{attrs:{placeholder:"请输入提前提醒天数"},model:{value:e.newform.dayNum,callback:function(t){e.$set(e.newform,"dayNum",t)},expression:"newform.dayNum"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{prop:"content",label:"短信内容"}},[a("el-input",{ref:"elInput",attrs:{type:"textarea",rows:"5",placeholder:"请输入短信内容"},model:{value:e.newform.content,callback:function(t){e.$set(e.newform,"content",t)},expression:"newform.content"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"标签"}},e._l(e.btnList,function(t){return a("div",{key:t.id,staticStyle:{width:"100%"}},[a("el-button",{attrs:{plain:"",size:"mini",value:t.value},on:{click:function(a){e.checkTag(t)}}},[e._v(e._s(t.name))]),e._v(" "),a("span",[e._v("变量值为： "+e._s(t.value))])],1)}))],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addbasicset()}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改短信模板",visible:e.dialogVisible2,"close-on-click-modal":!1,width:"40%"},on:{"update:visible":function(t){e.dialogVisible2=t}}},[a("el-form",{ref:"newform",staticStyle:{"padding-right":"30px"},attrs:{model:e.newform,rules:e.rules,"label-width":"110px"}},[a("el-form-item",{attrs:{prop:"type",label:"应用模块"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.newform.type,callback:function(t){e.$set(e.newform,"type",t)},expression:"newform.type"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"title",label:"短信标题"}},[a("el-input",{attrs:{placeholder:"请输入短信标题"},model:{value:e.newform.title,callback:function(t){e.$set(e.newform,"title",t)},expression:"newform.title"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"signature",label:"短信签名"}},[a("el-input",{attrs:{placeholder:"请输入短信签名"},model:{value:e.newform.signature,callback:function(t){e.$set(e.newform,"signature",t)},expression:"newform.signature"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"genre",label:"短信类型"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择短信类型"},model:{value:e.newform.genre,callback:function(t){e.$set(e.newform,"genre",t)},expression:"newform.genre"}},[a("el-option",{attrs:{value:"通知类"}},[e._v("通知类")]),e._v(" "),a("el-option",{attrs:{value:"营销类"}},[e._v("营销类")])],1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"url",label:"原网址"}},[a("el-input",{attrs:{placeholder:"请输入原网址"},model:{value:e.newform.url,callback:function(t){e.$set(e.newform,"url",t)},expression:"newform.url"}})],1),e._v(" "),"合同"==e.newform.type?a("el-form-item",{attrs:{prop:"dayNum",label:"提前提醒天数"}},[a("el-input",{attrs:{placeholder:"请输入提前提醒天数"},model:{value:e.newform.dayNum,callback:function(t){e.$set(e.newform,"dayNum",t)},expression:"newform.dayNum"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{prop:"content",label:"短信内容"}},[a("el-input",{ref:"elInput",attrs:{type:"textarea",rows:"5",placeholder:"请输入短信内容"},model:{value:e.newform.content,callback:function(t){e.$set(e.newform,"content",t)},expression:"newform.content"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"标签"}},e._l(e.btnList,function(t){return a("div",{key:t.id,staticStyle:{width:"100%"}},[a("el-button",{attrs:{plain:"",size:"mini",value:t.value},on:{click:function(a){e.checkTag(t)}}},[e._v(e._s(t.name))]),e._v(" "),a("span",[e._v("变量值为： "+e._s(t.value))])],1)}))],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible2=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.updatebasicset()}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=a("VU/8")(i,o,!1,function(e){a("lKiG")},null,null);t.default=l.exports},lKiG:function(e,t){}});