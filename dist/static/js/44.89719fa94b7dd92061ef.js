webpackJsonp([44],{dVQL:function(e,t){},kGHY:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("woOf"),l=a.n(s),o=a("wtEF"),i=a("mtWM"),n=a.n(i),r=(a("uXZL"),a("9igS")),d=(a("mw3O"),{name:"customer",props:{totalNum:Number},store:o.a,computed:{tableData:function(){return o.a.state.customerList},tableNumber:function(){return o.a.state.customerListnumber}},data:function(){return{fieldHeadData:[],searchList:{searchName:null,label:"1",keyType:null,state:null,keyWord:null,time:null},searchListNew:{searchName:null,label:"1",keyType:null,state:null,keyWord:null,time:null},page:1,limit:20,idArr:{id:null},SMSId:[],SMSnames:[],SMSphones:[],SMScontacts:[],pIdData:[{label:"0",value:"全部"},{label:"1",value:"我的"},{label:"2",value:"本组"},{label:"3",value:"本机构"}],timeData:[{id:"1",typeName:"今天"},{id:"2",typeName:"昨天"},{id:"3",typeName:"本周"},{id:"4",typeName:"本月"},{id:"5",typeName:"上月"}],stateData:null,labelData:null,typeData:null,nullvalue:null,filterList:null,checklist:null,dialogFormVisible:!1,dialogFormVisible1:!1,formLabelWidth:"130px",downloadUrl:this.$store.state.systemHttp+"upload/import_template.xls",dialogVisible:!1,templateList:null,newform:{templateId:null,customernum:null,explain:null,smscontent:null},rules:{templateId:[{required:!0,message:"短信模板不能为空",trigger:"blur"}]},collapse4:!1}},beforeRouteLeave:function(e,t,a){this.collapse4=!1,r.a.$emit("collapse4",this.collapse4),a()},beforeCreate:function(){var e=this;n()({method:"get",url:e.$store.state.defaultHttp+"typeInfo/getTypeInfoByType.do?cId="+e.$store.state.iscId}).then(function(t){e.stateData=t.data.name2001,e.typeData=t.data.name3001,e.labelData=t.data.name4001}).catch(function(e){})},activated:function(){this.loadFieldHead(),this.reloadTable()},mounted:function(){this.loadFieldHead(),this.reloadTable(),this.reloadData()},methods:{reloadTable:function(){var e=this,t=a("1nuA"),s={};s.searchName=this.searchList.searchName,0==this.searchList.label?s.pId=e.nullvalue:1==this.searchList.label?s.pId=e.$store.state.ispId:2==this.searchList.label?s.secondid=e.$store.state.deptid:3==this.searchList.label&&(s.deptid=e.$store.state.insid),s.example=this.searchList.time,s.stateid=this.searchList.state,s.levelsid=this.searchList.keyType,s.customerStateid=this.searchList.keyWord,s.page=this.page,s.limit=this.limit,s.label=2,n()({method:"post",url:e.$store.state.defaultHttp+"pageInfo/queryPageList.do?cId="+e.$store.state.iscId,data:t.stringify(s)}).then(function(t){e.$store.state.customerList=t.data.map.success,e.$store.state.customerListnumber=t.data.count}).catch(function(e){})},loadFieldHead:function(){var e=this,t=a("1nuA"),s={label:1,pId:this.$store.state.ispId};n()({method:"post",url:e.$store.state.defaultHttp+"field/queryListHead.do?cId="+e.$store.state.iscId,data:t.stringify(s)}).then(function(t){e.fieldHeadData=t.data}).catch(function(e){})},reloadData:function(){var e=this,t=a("1nuA"),s={type:"客户"},l={type:"客户",state:1};n()({method:"post",url:e.$store.state.defaultHttp+"userPageInfo/getAllUserPage.do?cId="+e.$store.state.iscId+"&pId="+e.$store.state.ispId,data:t.stringify(s)}).then(function(t){e.filterList=t.data}).catch(function(e){}),n()({method:"post",url:e.$store.state.defaultHttp+"userPageInfo/getUserPage.do?cId="+e.$store.state.iscId+"&pId="+e.$store.state.ispId,data:t.stringify(l)}).then(function(t){e.checklist=t.data}).catch(function(e){})},loadTemplate:function(){var e=this,t=a("1nuA"),s={type:"客户",genre:"营销类",status:"2"};n()({method:"post",url:e.$store.state.defaultHttp+"template/selectTemplate.do?cId="+e.$store.state.iscId,data:t.stringify(s)}).then(function(t){e.templateList=t.data.map.templates}).catch(function(e){})},selectInfo:function(e){var t=this;this.multipleSelection=e;var a=e,s=[new Array];this.SMSId=[],this.SMSnames=[],this.SMSphones=[],this.SMScontacts=[],a.forEach(function(e){0!=e.id&&(s.push(e.id),t.SMSId.push(e.id),t.SMSnames.push(e.pName),t.SMSphones.push(e.contacts[0].phone),t.SMScontacts.push(e.contacts[0].coName))}),this.idArr.id=s},openDetails:function(e,t){this.$store.state.cusdetailsData={submitData:{id:t.id}},this.$router.push({path:"/customerDetails"})},handleAdd:function(){var e=this,t={createForm:[{label:"客户来源",inputModel:"customerStateid",type:"select"},{label:"客户名称",inputModel:"poolName",type:"require"},{label:"客户分类",inputModel:"levelsid",type:"select"},{label:"联系人",inputModel:"contactsName"},{label:"手机",inputModel:"phone",type:"number"},{label:"电话",inputModel:"telphone",type:"number"},{label:"QQ",inputModel:"qq",type:"number"},{label:"性别",inputModel:"sex",type:"radio"},{label:"职务",inputModel:"identity"},{label:"省/市/区",inputModel:"countryid",type:"select",placeholder:"请选择省"},{label:"",inputModel:"cityid",type:"select",placeholder:"请选择市"},{label:"",inputModel:"areaid",type:"select",placeholder:"请选择区"},{label:"地址",inputModel:"address"},{label:"网址",inputModel:"url",type:"url"},{label:"备注",inputModel:"remark",type:"textarea"}],assistForm:[{label:"法人代表",inputModel:"representative"},{label:"登记机关",inputModel:"registrationAuthority"},{label:"统一社会信用代码",inputModel:"creditCode"},{label:"注册号",inputModel:"registrationNumber"},{label:"组织机构代码",inputModel:"organizationCode"},{label:"注册资金",inputModel:"capital",type:"number"},{label:"注册时间",inputModel:"registerTime",type:"date"},{label:"企业规模",inputModel:"enterpriseScaleId",type:"select"},{label:"融资状态",inputModel:"financingStateId",type:"select"},{label:"行业",inputModel:"industryId",type:"select"},{label:"公司类型",inputModel:"companyId",type:"select"},{label:"经营状态",inputModel:"operatingStateId",type:"select"}],orderForm:[{label:"税率",inputModel:"taxRate"},{label:"经销商级别",inputModel:"distributorId",type:"select"}],setForm:{customerStateid:"",poolName:"",levelsid:"",taxRate:"",distributorId:"",contactsName:"",telphone:"",phone:"",countryid:"",cityid:"",areaid:"",qq:"",email:"",sex:"",identity:"",address:"",url:"",remark:"",representative:"",registrationAuthority:"",creditCode:"",registrationNumber:"",organizationCode:"",capital:"",registerTime:"",enterpriseScaleId:"",financingStateId:"",industryId:"",companyId:"",operatingStateId:""}};t.submitURL=this.$store.state.defaultHttp+"customerpool/savePool.do?cId="+this.$store.state.iscId+"&pId="+this.$store.state.ispId,this.$store.state.cusaddOrUpdateData=t,n()({method:"get",url:e.$store.state.defaultHttp+"customerJurisdiction/insert.do"}).then(function(t){t.data.msg&&"error"==t.data.msg?e.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):e.$router.push({path:"/customeraddorupdate"})}).catch(function(e){})},handleEdit:function(e,t){var a=this,s={createForm:[{label:"客户来源",inputModel:"customerStateid",type:"select"},{label:"客户名称",inputModel:"poolName",type:"require"},{label:"客户分类",inputModel:"levelsid",type:"select"},{label:"联系人",inputModel:"contactsName"},{label:"手机",inputModel:"phone",type:"number"},{label:"电话",inputModel:"telphone",type:"number"},{label:"QQ",inputModel:"qq",type:"number"},{label:"性别",inputModel:"sex",type:"radio"},{label:"职务",inputModel:"identity"},{label:"省/市/区",inputModel:"countryid",type:"select",placeholder:"请选择省"},{label:"",inputModel:"cityid",type:"select",placeholder:"请选择市"},{label:"",inputModel:"areaid",type:"select",placeholder:"请选择区"},{label:"地址",inputModel:"address"},{label:"网址",inputModel:"url",type:"url"},{label:"备注",inputModel:"remark",type:"textarea"}],assistForm:[{label:"法人代表",inputModel:"representative"},{label:"登记机关",inputModel:"registrationAuthority"},{label:"统一社会信用代码",inputModel:"creditCode"},{label:"注册号",inputModel:"registrationNumber"},{label:"组织机构代码",inputModel:"organizationCode"},{label:"注册资金",inputModel:"capital",type:"number"},{label:"注册时间",inputModel:"registerTime",type:"date"},{label:"企业规模",inputModel:"enterpriseScaleId",type:"select"},{label:"融资状态",inputModel:"financingStateId",type:"select"},{label:"行业",inputModel:"industryId",type:"select"},{label:"公司类型",inputModel:"companyId",type:"select"},{label:"经营状态",inputModel:"operatingStateId",type:"select"}],orderForm:[{label:"税率",inputModel:"taxRate"},{label:"经销商级别",inputModel:"distributorId",type:"select"}]};s.setForm={customerStateid:t.sourceid,poolName:t.pName,levelsid:t.levels,levels:t.levelsid,taxRate:t.taxRate,distributorId:t.distributorId,contactsName:t.contacts[0].coName,telphone:t.contacts[0].telephone,phone:t.contacts[0].phone,countryid:t.country,country:t.countryid,cityid:t.city,city:t.cityid,areaid:t.area,area:t.areaid,qq:t.contacts[0].qq,email:t.contacts[0].email,sex:t.contacts[0].sex,identity:t.contacts[0].identity,address:t.address,url:t.url,remark:t.remark,representative:t.representative,registrationAuthority:t.registrationAuthority,creditCode:t.creditCode,registrationNumber:t.registrationNumber,organizationCode:t.organizationCode,capital:t.capital,registerTime:t.date,enterpriseScale:t.enterpriseScale,enterpriseScaleId:t.enterpriseScaleId,financingState:t.financingState,financingStateId:t.financingStateId,industryType:t.industryType,industryId:t.industryId,companyType:t.companyType,companyId:t.companyId,operatingState:t.operatingState,operatingStateId:t.operatingStateId},s.submitData={id:t.id,csId:t.contacts[0].csId,batch_id:t.batch_id},s.submitURL=this.$store.state.defaultHttp+"customerpool/updatepool.do?cId="+this.$store.state.iscId+"&pId="+this.$store.state.ispId,this.$store.state.cusaddOrUpdateData=s,n()({method:"get",url:a.$store.state.defaultHttp+"customerJurisdiction/update.do"}).then(function(e){e.data.msg&&"error"==e.data.msg?a.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):a.$router.push({path:"/customeraddorupdate"})}).catch(function(e){})},TocustomerPool:function(){var e=this,t=a("1nuA"),s=[];s.id=this.idArr.id,s.id?n()({method:"post",url:e.$store.state.defaultHttp+"customerpool/updateTo.do?cId="+e.$store.state.iscId,data:t.stringify(s)}).then(function(t){t.data.code&&200==t.data.code?(e.$message({message:"转移成功",type:"success"}),e.$options.methods.reloadTable.bind(e)(!0)):t.data.msg&&"error"==t.data.msg?e.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):e.$message({message:t.data.msg,type:"error"})}).catch(function(t){e.$message.error("转移失败,请重新转移")}):e.$message({type:"error",message:"请先选择要转移的客户"})},hangleChange:function(e,t){var s=this,l=a("1nuA"),o={};o.pageInfoId=t.pageInfoId,o.state=1==e?1:0,n()({method:"post",url:s.$store.state.defaultHttp+"userPageInfo/updateUserPageByid.do?cId="+s.$store.state.iscId+"&pId="+s.$store.state.ispId,data:l.stringify(o)}).then(function(e){e.data&&"success"==e.data&&s.$options.methods.reloadData.bind(s)(!0)}).catch(function(e){})},search:function(){var e=this,t="",a=1;0==this.searchList.label?(t="customerJurisdiction/all.do",a=0):2==this.searchList.label?(t="customerJurisdiction/second.do",a=0):3==this.searchList.label&&(t="customerJurisdiction/dept.do",a=0),0==a?n()({method:"get",url:e.$store.state.defaultHttp+t}).then(function(t){t.data.msg&&"error"==t.data.msg?e.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):e.$options.methods.reloadTable.bind(e)(!0)}).catch(function(e){}):e.$options.methods.reloadTable.bind(e)(!0)},reset:function(){this.searchList=l()({},this.searchListNew),this.$options.methods.reloadTable.bind(this)(!0)},handleSizeChange:function(e){this.limit=e,this.$options.methods.reloadTable.bind(this)(!1)},handleCurrentChange:function(e){this.page=e,this.$options.methods.reloadTable.bind(this)(!1)},beforeUpload:function(e){var t=this;this.files=e;var a="xls"===e.name.split(".")[1],s="xlsx"===e.name.split(".")[1],l=e.size/1024/1024<5;if(a||s){if(l)return this.fileName=e.name,setTimeout(function(){t.submitUpload()},500),!1;this.$message.warning("上传模板大小不能超过 5MB!")}else this.$message.warning("上传模板只能是 xls、xlsx格式!")},submitUpload:function(){var e=this;if(""==this.fileName)return this.$message.warning("请选择要上传的文件！"),!1;var t=new FormData;t.append("pId",this.$store.state.ispId),t.append("secondid",this.$store.state.deptid),t.append("deptid",this.$store.state.insid),t.append("files",this.files,this.fileName);n.a.post(this.$store.state.defaultHttp+"customerpool/upload.do?cId="+this.$store.state.iscId,t,{headers:{"Content-Type":"multipart/form-data"}}).then(function(t){t.data.code&&200==t.data.code?e.$message({message:"上传成功",type:"success"}):e.$message({message:t.data.msg,type:"error"}),e.$options.methods.reloadTable.bind(e)(!0)}).catch(function(t){e.$message.error("excel上传失败，请重新上传")})},showsend:function(){var e=this;this.SMSId[0]?n()({method:"get",url:e.$store.state.defaultHttp+"customerJurisdiction/send.do"}).then(function(t){t.data.msg&&"error"==t.data.msg?e.$message({message:"对不起，您没有该权限，请联系管理员开通",type:"error"}):(e.$options.methods.loadTemplate.bind(e)(),e.newform.customernum=e.SMSId.length,e.newform.templateId="",e.newform.smscontent="",e.newform.explain="",e.dialogVisible=!0)}).catch(function(e){}):this.$message({type:"error",message:"请先选择要发送短信的线索"})},changetemplate:function(e){var t=this;this.templateList.forEach(function(a){a.templateId==e&&(t.newform.smscontent=a.content)})},sendSMS:function(){var e=this,t=a("1nuA"),s={};s.names=this.SMSnames,s.phones=this.SMSphones,s.contacts=this.SMScontacts,s.templateId=this.newform.templateId,n()({method:"post",url:e.$store.state.defaultHttp+"message/sendMarketingMsg.do?cId="+this.$store.state.iscId,data:t.stringify(s)}).then(function(t){t.data.code&&"200"==t.data.code?(e.$message({message:"发送成功",type:"success"}),e.dialogVisible=!1,e.$options.methods.addSMSsended.bind(e)()):e.$message({message:t.data.msg,type:"error"})}).catch(function(e){})},addSMSsended:function(){var e=a("1nuA"),t={type:"客户"};t.ids=this.SMSId,t.names=this.SMSnames,t.phones=this.SMSphones,t.contacts=this.SMScontacts,t.templateId=this.newform.templateId,t.explain=this.newform.explain,t.pId=this.$store.state.ispId,t.secondid=this.$store.state.deptid,t.deptid=this.$store.state.insid,n()({method:"post",url:this.$store.state.defaultHttp+"sendRecord/insertSendRecord.do?cId="+this.$store.state.iscId,data:e.stringify(t)}).then(function(e){}).catch(function(e){})},generateCharts:function(){var e=this,t=a("1nuA"),s={};1==this.searchList.label?s.pId=e.$store.state.ispId:2==this.searchList.label?s.secondid=e.$store.state.deptid:3==this.searchList.label&&(s.deptid=e.$store.state.insid),n()({method:"post",url:e.$store.state.defaultHttp+"customerpool/selectByStateAndSourceAndType.do?cId="+e.$store.state.iscId,data:t.stringify(s)}).then(function(t){t.data.code&&"200"==t.data.code?(e.$store.state.customerChartsData=t.data.map.map,e.collapse4=!e.collapse4,r.a.$emit("collapse4",e.collapse4)):e.$message({message:t.data.msg,type:"error"})}).catch(function(e){})}}}),c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"radioList"},[a("el-radio-group",{model:{value:e.searchList.label,callback:function(t){e.$set(e.searchList,"label",t)},expression:"searchList.label"}},[a("span",{staticClass:"nameList"},[e._v("数据授权：")]),e._v(" "),e._l(e.pIdData,function(t){return a("el-radio",{key:t.label,attrs:{label:t.label},on:{change:function(t){e.search()}}},[e._v(e._s(t.value))])})],2),e._v(" "),a("el-radio-group",{model:{value:e.searchList.keyType,callback:function(t){e.$set(e.searchList,"keyType",t)},expression:"searchList.keyType"}},[a("span",{staticClass:"nameList"},[e._v("客户分类：")]),e._v(" "),a("el-radio",{attrs:{label:e.nullvalue},on:{change:function(t){e.search()}}},[e._v("全部")]),e._v(" "),e._l(e.labelData,function(t){return a("el-radio",{key:t.id,attrs:{label:t.id},on:{change:function(t){e.search()}}},[e._v(e._s(t.typeName))])})],2),e._v(" "),a("el-radio-group",{model:{value:e.searchList.keyWord,callback:function(t){e.$set(e.searchList,"keyWord",t)},expression:"searchList.keyWord"}},[a("span",{staticClass:"nameList"},[e._v("客户来源：")]),e._v(" "),a("el-radio",{attrs:{label:e.nullvalue},on:{change:function(t){e.search()}}},[e._v("全部")]),e._v(" "),e._l(e.typeData,function(t){return a("el-radio",{key:t.id,attrs:{label:t.id},on:{change:function(t){e.search()}}},[e._v(e._s(t.typeName))])})],2),e._v(" "),a("el-radio-group",{model:{value:e.searchList.state,callback:function(t){e.$set(e.searchList,"state",t)},expression:"searchList.state"}},[a("span",{staticClass:"nameList"},[e._v("客户状态：")]),e._v(" "),a("el-radio",{attrs:{label:e.nullvalue},on:{change:function(t){e.search()}}},[e._v("全部")]),e._v(" "),e._l(e.stateData,function(t){return a("el-radio",{key:t.id,attrs:{label:t.id},on:{change:function(t){e.search()}}},[e._v(e._s(t.typeName))])})],2),e._v(" "),a("el-radio-group",{model:{value:e.searchList.time,callback:function(t){e.$set(e.searchList,"time",t)},expression:"searchList.time"}},[a("span",{staticClass:"nameList"},[e._v("新增时间：")]),e._v(" "),a("el-radio",{attrs:{label:e.nullvalue},on:{change:function(t){e.search()}}},[e._v("全部")]),e._v(" "),e._l(e.timeData,function(t){return a("el-radio",{key:t.id,attrs:{label:t.id},on:{change:function(t){e.search()}}},[e._v(e._s(t.typeName))])})],2)],1),e._v(" "),a("div",{staticClass:"searchList"},[a("span",{staticClass:"nameList"},[e._v("公司名称：")]),e._v(" "),a("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入公司名称"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.search(t):null}},model:{value:e.searchList.searchName,callback:function(t){e.$set(e.searchList,"searchName",t)},expression:"searchList.searchName"}}),e._v("\n          \n        "),a("el-button",{attrs:{icon:"el-icon-search",type:"primary",size:"mini"},on:{click:function(t){e.search()}}},[e._v("查询")])],1),e._v(" "),a("div",{staticClass:"generCharts",on:{click:e.generateCharts}},[a("i",{staticClass:"mdi-chart-pie chart_icon"})]),e._v(" "),a("div",{staticClass:"entry"},[a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(t){e.handleAdd()}}},[e._v("新增")]),e._v(" "),a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(t){e.TocustomerPool()}}},[e._v("转移至客户池")]),e._v(" "),a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(t){e.showsend()}}},[e._v("发送短信")]),e._v(" "),a("div",{staticClass:"totalnum_head"},[e._v("共 "),a("span",{staticClass:"bold_span"},[e._v(e._s(e.tableNumber))]),e._v(" 条")]),e._v(" "),a("el-popover",{attrs:{placement:"left",width:"150",trigger:"click"}},[a("div",{staticClass:"download_c"},[a("p",{staticClass:"download_h"},[e._v("首次导入请下载模板")]),e._v(" "),a("div",{staticClass:"download_down"},[a("el-button",{staticClass:"info-btn",attrs:{type:"mini"}},[a("a",{attrs:{href:e.downloadUrl,download:""}},[e._v("下载模板")])])],1),e._v(" "),a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{multiple:!0,action:"doUpload",limit:3,"before-upload":e.beforeUpload}},[a("el-button",{staticClass:"info-btn",attrs:{slot:"trigger",size:"mini"},slot:"trigger"},[e._v("导入excel")])],1)],1),e._v(" "),a("el-button",{staticClass:"info-btn screen_upload",attrs:{slot:"reference",type:"mini"},slot:"reference"},[e._v("导入")])],1),e._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"100",trigger:"click"}},[a("el-checkbox-group",{staticClass:"checklist",staticStyle:{"max-height":"600px","overflow-y":"overlay","overflow-x":"hidden"},model:{value:e.checklist,callback:function(t){e.checklist=t},expression:"checklist"}},e._l(e.filterList,function(t){return a("el-checkbox",{key:t.id,staticClass:"checkone",attrs:{label:t.name,value:t.state},on:{change:function(a){e.hangleChange(a,t)}}})})),e._v(" "),a("el-button",{staticClass:"info-btn screen",attrs:{slot:"reference",icon:"el-icon-more",type:"mini"},slot:"reference"})],1)],1),e._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""},on:{"selection-change":e.selectInfo}},[a("el-table-column",{attrs:{fixed:"","header-align":"center",align:"center",type:"selection",width:"45","scope.row.id":"",prop:"id"},on:{"selection-change":e.selectInfo}}),e._v(" "),a("el-table-column",{attrs:{fixed:"","header-align":"center",align:"center",width:"65"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{directives:[{name:"show",rawName:"v-show",value:0!==t.row.haveOpportunity,expression:"scope.row.haveOpportunity !== 0"}],staticClass:"diamood_blue"},[a("i",{staticClass:"mdi mdi-martini"})]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0==t.row.haveOpportunity,expression:"scope.row.haveOpportunity == 0"}],staticClass:"diamood_blue_h"},[a("i",{staticClass:"mdi mdi-martini"})]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0!==t.row.haveContract,expression:"scope.row.haveContract !== 0"}],staticClass:"diamood_red"},[a("i",{staticClass:"mdi mdi-coin"})]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0==t.row.haveContract,expression:"scope.row.haveContract == 0"}],staticClass:"diamood_red_h"},[a("i",{staticClass:"mdi mdi-coin"})])]}}])}),e._v(" "),e._l(e.filterList,function(t,s){return a("div",{key:s},["pName"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"公司名称",prop:"pName",fixed:"","min-width":"200",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"hoverline",on:{click:function(a){e.openDetails(t.$index,t.row)}}},[e._v("\n                        "+e._s(t.row.pName)+"\n                    ")])]}}])}):e._e(),e._v(" "),"address"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"地址",prop:"address","show-overflow-tooltip":"","min-width":"200",sortable:""}}):e._e(),e._v(" "),"contacts[0].coName"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"联系人",prop:"contacts[0].coName","min-width":"100",sortable:""}}):e._e(),e._v(" "),"contacts[0].telephone"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"电话",prop:"contacts[0].telephone","min-width":"110",sortable:""}}):e._e(),e._v(" "),"contacts[0].phone"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"手机",prop:"contacts[0].phone","min-width":"110",sortable:""}}):e._e(),e._v(" "),"contacts[0].qq"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"QQ",prop:"contacts[0].qq","min-width":"110",sortable:""}}):e._e(),e._v(" "),"email"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"邮箱",prop:"contacts[0].email","show-overflow-tooltip":"","min-width":"130",sortable:""}}):e._e(),e._v(" "),"wechat"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"微信",prop:"contacts[0].wechat","min-width":"110",sortable:""}}):e._e(),e._v(" "),"sex"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"性别",prop:"contacts[0].sex","min-width":"90",sortable:""}}):e._e(),e._v(" "),"remarks"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"备注",prop:"contacts[0].remark","min-width":"180",sortable:""}}):e._e(),e._v(" "),"follow[0].createTime"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"最新跟进时间",prop:"follow[0].createTime","min-width":"150",sortable:""}}):e._e(),e._v(" "),"follow[0].followContent"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"最新跟进记录",prop:"follow[0].followContent","show-overflow-tooltip":"","min-width":"180",sortable:""}}):e._e(),e._v(" "),"follow[0].contactTime"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"下次联系时间",prop:"follow[0].contactTime","min-width":"150",sortable:""}}):e._e(),e._v(" "),"privateUser[0].private_employee"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"负责人",prop:"privateUser[0].private_employee","min-width":"100",sortable:""}}):e._e(),e._v(" "),"deptname"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"部门",prop:"deptname","min-width":"110",sortable:""}}):e._e(),e._v(" "),"parentname"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"机构",prop:"parentname","min-width":"110","show-overflow-tooltip":"",sortable:""}}):e._e(),e._v(" "),"countryid"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"省-市-区",prop:"countryid","min-width":"150",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.country)+"-"+e._s(t.row.city)+"-"+e._s(t.row.area))]}}])}):e._e(),e._v(" "),"createTime"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"创建时间",prop:"createTime","min-width":"150",sortable:""}}):e._e(),e._v(" "),"status"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"状态",prop:"status","min-width":"90",sortable:""}}):e._e(),e._v(" "),"levels"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"客户分类",prop:"levels","min-width":"110",sortable:""}}):e._e(),e._v(" "),"source"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"客户来源",prop:"source","min-width":"110",sortable:""}}):e._e(),e._v(" "),"representative"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"法人代表",prop:"representative","min-width":"110",sortable:""}}):e._e(),e._v(" "),"registrationAuthority"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"登记机关",prop:"registrationAuthority","show-overflow-tooltip":"","min-width":"150",sortable:""}}):e._e(),e._v(" "),"creditCode"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"社会信用代码",prop:"creditCode","min-width":"150",sortable:""}}):e._e(),e._v(" "),"registrationNumber"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"注册号",prop:"registrationNumber","min-width":"140",sortable:""}}):e._e(),e._v(" "),"organizationCode"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"组织机构代码",prop:"organizationCode","min-width":"140",sortable:""}}):e._e(),e._v(" "),"capital"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"注册资金",prop:"capital","min-width":"110",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.capital)+" "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.row.capital,expression:"scope.row.capital"}]},[e._v("万元")])]}}])}):e._e(),e._v(" "),"date"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"成立时间",prop:"date","min-width":"110",sortable:""}}):e._e(),e._v(" "),"enterpriseScale"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"企业规模",prop:"enterpriseScale","min-width":"110",sortable:""}}):e._e(),e._v(" "),"financingState"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"融资状态",prop:"financingState","min-width":"110",sortable:""}}):e._e(),e._v(" "),"industryType"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"行业",prop:"industryType","show-overflow-tooltip":"","min-width":"110",sortable:""}}):e._e(),e._v(" "),"companyType"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"公司类型",prop:"companyType","min-width":"110",sortable:""}}):e._e(),e._v(" "),"operatingState"==t.prop&&1==t.state?a("el-table-column",{attrs:{label:"营业状态",prop:"operatingState","min-width":"110",sortable:""}}):e._e(),e._v(" "),e._l(e.fieldHeadData,function(s){return t.prop==s.field_name&&1==t.state?a("el-table-column",{key:s.field_name,attrs:{label:s.name,prop:s.field_name,"min-width":"130",sortable:""}}):e._e()})],2)}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"90","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("编辑")])]}}])})],2),e._v(" "),a("div",{staticClass:"block numberPage"},[a("el-pagination",{attrs:{"current-page":e.page,"page-sizes":[20,50,100,500],"page-size":20,layout:"total, sizes, prev, pager, next, jumper",total:e.tableNumber},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:"发送短信",visible:e.dialogVisible,"close-on-click-modal":!1,width:"40%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"newform",staticStyle:{"padding-right":"30px"},attrs:{model:e.newform,"label-width":"110px",rules:e.rules}},[a("el-form-item",{attrs:{prop:"customernum",label:"线索选择量"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.newform.customernum,callback:function(t){e.$set(e.newform,"customernum",t)},expression:"newform.customernum"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"templateId",label:"短信模板"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},on:{change:e.changetemplate},model:{value:e.newform.templateId,callback:function(t){e.$set(e.newform,"templateId",t)},expression:"newform.templateId"}},e._l(e.templateList,function(e){return a("el-option",{key:e.templateId,attrs:{label:e.title,value:e.templateId}})}))],1),e._v(" "),a("el-form-item",{attrs:{prop:"smscontent",label:"短信内容"}},[a("el-input",{attrs:{type:"textarea",rows:"5",disabled:!0},model:{value:e.newform.smscontent,callback:function(t){e.$set(e.newform,"smscontent",t)},expression:"newform.smscontent"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"explain",label:"说明"}},[a("el-input",{attrs:{type:"textarea",rows:"5",placeholder:"请输入短信说明"},model:{value:e.newform.explain,callback:function(t){e.$set(e.newform,"explain",t)},expression:"newform.explain"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.sendSMS()}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var p=a("VU/8")(d,c,!1,function(e){a("dVQL")},null,null);t.default=p.exports}});