webpackJsonp([36],{"7BMB":function(t,e){},iWtL:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("INCx"),i=a.n(s),r=a("wtEF"),o=a("mtWM"),n=a.n(o),l=(a("mw3O"),{name:"orderReceiveDetail",store:r.a,filters:{commaing:function(t){if(t){var e=i()(t).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,"),a=".00",s=t.toString().split(".");return 2===s.length?1===(a=s[1].toString()).length?e+"."+a+"0":e+"."+a:e+a}}},data:function(){return{detailData:{},orderReceiveDetailData:{},fieldData:[],itemData:[],filesData:[],imagesData:[],thisshow:!1,retracts:!1,hasCheck:null,examineLog:[],examineList:[],dialogVisible2:!1,exaform:{status:null,remarks:null},rules:{remarks:[{required:!0,message:"审核意见不能为空",trigger:"blur"}]},auditing:this.$store.state.systemHttp+"/upload/staticImg/inaudit.png",audited:this.$store.state.systemHttp+"/upload/staticImg/examine.png",noaudit:this.$store.state.systemHttp+"/upload/staticImg/refuse.png"}},activated:function(){this.loadData()},methods:{loadData:function(){var t=this,e=a("1nuA");this.detailData=this.$store.state.orderReceiveDetailData;var s={id:this.detailData.id},i={label:12,id:this.detailData.id};n()({method:"post",url:t.$store.state.defaultHttp+"orderBack/selectById.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){t.orderReceiveDetailData=e.data,t.itemData=e.data.orderBackDetailList,t.$options.methods.loadExamine.bind(t)(),t.$options.methods.getFiles.bind(t)()}).catch(function(t){}),n()({method:"post",url:t.$store.state.defaultHttp+"field/information.do?cId="+t.$store.state.iscId,data:e.stringify(i)}).then(function(e){t.fieldData=e.data}).catch(function(t){})},getFiles:function(){var t=this;(this.filesData=[],this.imagesData=[],this.orderReceiveDetailData.files)&&JSON.parse(this.orderReceiveDetailData.files).forEach(function(e){t.filesData.push({name:e.name,url:t.$store.state.systemHttp+"upload/"+t.$store.state.iscId+"/"+e.response})});this.orderReceiveDetailData.images&&JSON.parse(this.orderReceiveDetailData.images).forEach(function(e){t.imagesData.push({name:e.name,url:t.$store.state.systemHttp+"upload/"+t.$store.state.iscId+"/"+e.response})})},loadExamine:function(){var t=this,e=a("1nuA"),s={checkStatus:this.orderReceiveDetailData.checkStatus,recordId:this.orderReceiveDetailData.examineRecordId,pId:this.$store.state.ispId};n()({method:"post",url:t.$store.state.defaultHttp+"examineRecord/queryExamineRecordList.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){t.examineList=e.data.steps,t.examineList.forEach(function(e,a){if(e.userLength=e.userList.length,1==e.userLength?e.type_style="width:50px;":2==e.userLength?e.type_style="width:75px;":3==e.userLength?e.type_style="width:100px;":4==e.userLength?e.type_style="width:125px;":5==e.userLength&&(e.type_style="width:150px;"),0==a&&(e.userList[0].img?e.headPortrait=t.$store.state.systemHttp+"/upload/"+t.$store.state.iscId+"/"+e.userList[0].img:e.headPortrait=t.$store.state.systemHttp+"/upload/staticImg/avatar.jpg"),2==e.stepType)for(var s=0;s<e.userList.length;s++){if(e.userList[s].img&&0!==e.userList[s].examineStatus){e.headPortrait=t.$store.state.systemHttp+"/upload/"+t.$store.state.iscId+"/"+e.userList[s].img;break}if(!e.userList[s].img&&0!==e.userList[s].examineStatus){e.headPortrait=t.$store.state.systemHttp+"/upload/staticImg/avatar.jpg";break}if(e.userList[s].img&&0==e.userList[s].examineStatus){e.headPortrait=t.$store.state.systemHttp+"/upload/"+t.$store.state.iscId+"/"+e.userList[s].img;break}if(!e.userList[s].img&&0==e.userList[s].examineStatus){e.headPortrait=t.$store.state.systemHttp+"/upload/staticImg/avatar.jpg";break}}3==e.stepType&&e.userList.forEach(function(e,a){e.img?e.headPortrait=t.$store.state.systemHttp+"/upload/"+t.$store.state.iscId+"/"+e.img:e.headPortrait=t.$store.state.systemHttp+"/upload/staticImg/avatar.jpg"})}),t.hasCheck=e.data.isCheck,t.hasRecheck=e.data.isRecheck}).catch(function(t){}),n()({method:"get",url:t.$store.state.defaultHttp+"examineLog/queryExamineLogList.do?cId="+t.$store.state.iscId+"&recordId="+t.orderReceiveDetailData.examineRecordId}).then(function(e){t.examineLog=e.data}).catch(function(t){})},getSummary:function(t){var e=t.columns,a=t.data,s=[];return e.forEach(function(t,e){if(0!==e){var r=a.map(function(e){return Number(e[t.property])});if("this_money"==t.property||"accepted_money"==t.property||"uncollected_money"==t.property||"order_money"==t.property){s[e]=r.reduce(function(t,e){return e+t},0),s[e]=s[e].toFixed(2);var o=i()(s[e]).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,"),n=".00",l=s[e].split(".");2===l.length?1===(n=l[1].toString()).length?s[e]=o+"."+n+"0":s[e]=o+"."+n:s[e]=o+n,s[e]+=" 元"}else"num"==t.property?(s[e]=r.reduce(function(t,e){return e+t},0),s[e]):s[e]=""}else s[e]="合计"}),s},retract:function(){this.thisshow=!this.thisshow,this.retracts=!this.retracts},showexamine:function(t){this.exaform.status=t,this.dialogVisible2=!0},toexamine:function(){var t=this,e=a("1nuA"),s={};s.id=this.orderReceiveDetailData.id,s.recordId=this.orderReceiveDetailData.examineRecordId,s.pId=this.$store.state.ispId,s.status=this.exaform.status,s.remarks=this.exaform.remarks;var i=!1;s.remarks||(t.$message({message:"审核意见不能为空",type:"error"}),i=!0),i||n()({method:"post",url:t.$store.state.defaultHttp+"examineRecord/auditExamine.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){e.data.code&&"200"==e.data.code?(t.$message({message:"操作成功",type:"success"}),t.dialogVisible2=!1,t.exaform.status=null,t.exaform.remarks=null,t.$options.methods.loadData.bind(t)()):t.$message({message:e.data.msg,type:"error"})}).catch(function(e){t.$message.error("审核失败，请稍后再试")})}}}),c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"orderadd_c"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",{staticClass:"bold_span"},[t._v("订单收款单"),a("span",{staticClass:"bold_span"},[t._v("："+t._s(t.orderReceiveDetailData.backNo))])]),t._v(" "),a("el-button",{staticClass:"info-btn",staticStyle:{float:"right","margin-left":"10px"},attrs:{size:"mini"},on:{click:function(e){t.retract()}}},[t._v("审核")])],1),t._v(" "),a("div",{staticClass:"text item"},[a("ul",[a("li",[t._v("公司名称："),a("span",[t._v(t._s(t.orderReceiveDetailData.customerName))])]),t._v(" "),a("li",[t._v("收款日期："),a("span",[t._v(t._s(t.orderReceiveDetailData.createTime))])]),t._v(" "),a("li",[t._v("收款方式："),a("span",[t._v(t._s(t.orderReceiveDetailData.pay_type))])]),t._v(" "),a("li",[t._v("收款总金额："),a("span",{staticClass:"bold_span"},[t._v(t._s(t._f("commaing")(t.orderReceiveDetailData.money))+" 元")])]),t._v(" "),a("li",[t._v("折后金额："),a("span",[t._v(t._s(t._f("commaing")(t.orderReceiveDetailData.discountAfter))+" 元")])]),t._v(" "),a("li",[t._v("折扣额："),a("span",[t._v(t._s(t._f("commaing")(t.orderReceiveDetailData.discountAmount))+" 元")])]),t._v(" "),a("li",[t._v("折扣率："),a("span",[t._v(t._s(t.orderReceiveDetailData.discount)+" %")])]),t._v(" "),a("li",[t._v("备注："),a("span",[t._v(t._s(t.orderReceiveDetailData.remarks))])]),t._v(" "),t._l(t.fieldData,function(e,s){return a("li",{key:s},[t._v("\n                    "+t._s(e.name)+"："),a("span",[t._v(t._s(e.value))])])})],2),t._v(" "),1==t.orderReceiveDetailData.checkStatus?a("div",{staticClass:"orderaudit"},[a("img",{staticClass:"audit_img",attrs:{src:t.auditing,alt:"审核中"}})]):t._e(),t._v(" "),2==t.orderReceiveDetailData.checkStatus?a("div",{staticClass:"orderaudit"},[a("img",{staticClass:"audit_img",attrs:{src:t.audited,alt:"已审核"}})]):t._e(),t._v(" "),3==t.orderReceiveDetailData.checkStatus?a("div",{staticClass:"orderaudit"},[a("img",{staticClass:"audit_img",attrs:{src:t.noaudit,alt:"未通过"}})]):t._e()])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.thisshow,expression:"thisshow"}],staticClass:"jobclass_line"}),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.thisshow,expression:"thisshow"}]},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("el-popover",{attrs:{placement:"right-start",width:"220",trigger:"click"}},[a("div",{staticStyle:{"max-height":"400px","overflow-y":"overlay"}},t._l(t.examineLog,function(e,s){return a("div",{key:s,staticClass:"examine_popover"},[a("span",{staticClass:"examine_ico"},[0==e.examineStatus?a("i",{staticClass:"el-icon-time",staticStyle:{"font-size":"20px"}}):t._e(),t._v(" "),1==e.examineStatus?a("i",{staticClass:"el-icon-circle-check-outline",staticStyle:{color:"#67c23a","font-size":"20px"}}):t._e(),t._v(" "),2==e.examineStatus?a("i",{staticClass:"el-icon-circle-close-outline",staticStyle:{color:"#f56c6c","font-size":"20px"}}):t._e(),t._v(" "),3==e.examineStatus?a("i",{staticClass:"el-icon-time",staticStyle:{color:"#e6a23c","font-size":"20px"}}):t._e(),t._v(" "),5==e.examineStatus?a("i",{staticClass:"el-icon-circle-plus-outline",staticStyle:{color:"#67c23a","font-size":"20px"}}):t._e()]),t._v(" "),a("div",{staticClass:"examint_msg"},[a("p",{staticStyle:{"font-size":"13px",color:"#aaaaaa"}},[t._v(t._s(e.examineTime))]),t._v(" "),1==e.examineStatus?a("p",[t._v(t._s(e.realname+" 已审核"))]):t._e(),t._v(" "),2==e.examineStatus?a("p",[t._v(t._s(e.realname+" 已拒绝"))]):t._e(),t._v(" "),a("div",{staticClass:"examint_remark"},[a("p",[t._v(t._s(e.remarks))])])])])})),t._v(" "),a("span",{staticStyle:{"font-size":"14px","text-decoration":"underline"},attrs:{slot:"reference"},slot:"reference"},[t._v("查看审核历史")])]),t._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.hasCheck&&2!==t.orderReceiveDetailData.checkStatus,expression:"hasCheck && orderReceiveDetailData.checkStatus !== 2"}],staticClass:"info-btn",staticStyle:{float:"right"},attrs:{size:"mini"},on:{click:function(e){t.showexamine(1)}}},[t._v("通过")]),t._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.hasCheck&&2!==t.orderReceiveDetailData.checkStatus,expression:"hasCheck && orderReceiveDetailData.checkStatus !== 2"}],staticClass:"info-btn",staticStyle:{float:"right"},attrs:{size:"mini"},on:{click:function(e){t.showexamine(2)}}},[t._v("拒绝")]),t._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.hasCheck,expression:"hasCheck"}],staticClass:"info-btn",staticStyle:{float:"right"},attrs:{size:"mini"},on:{click:function(e){t.showexamine(4)}}},[t._v("驳回")])],1),t._v(" "),a("div",{staticClass:"text item"},[a("div",{staticClass:"examine_c"},t._l(t.examineList,function(e,s){return a("div",{key:s,staticClass:"examine_item"},[a("el-popover",{staticClass:"examine_cont",attrs:{placement:"bottom",width:"200",trigger:"hover"}},[t._l(e.userList,function(e,s){return a("div",{key:s,staticClass:"examine_popover"},[a("span",{staticClass:"examine_ico"},[0==e.examineStatus?a("i",{staticClass:"el-icon-time",staticStyle:{"font-size":"20px"}}):t._e(),t._v(" "),1==e.examineStatus?a("i",{staticClass:"el-icon-success",staticStyle:{color:"#67c23a","font-size":"18px"}}):t._e(),t._v(" "),2==e.examineStatus?a("i",{staticClass:"el-icon-circle-close",staticStyle:{color:"#f56c6c","font-size":"20px"}}):t._e(),t._v(" "),3==e.examineStatus?a("i",{staticClass:"el-icon-time",staticStyle:{color:"#e6a23c","font-size":"20px"}}):t._e(),t._v(" "),5==e.examineStatus?a("i",{staticClass:"el-icon-circle-plus",staticStyle:{color:"#67c23a","font-size":"20px"}}):t._e()]),t._v(" "),a("div",{staticClass:"examint_msg"},[a("p",{staticStyle:{"font-size":"13px",color:"#aaaaaa"}},[t._v(t._s(e.examineTime))]),t._v(" "),a("p",[t._v(t._s(e.realname+"("+e.phone+")"))]),t._v(" "),0==e.examineStatus?a("p",[t._v("未审核此申请")]):t._e(),t._v(" "),1==e.examineStatus?a("p",[t._v("通过此申请")]):t._e(),t._v(" "),2==e.examineStatus?a("p",[t._v("拒绝此申请")]):t._e(),t._v(" "),5==e.examineStatus?a("p",[t._v("创建此申请")]):t._e()])])}),t._v(" "),a("div",{staticStyle:{width:"100%"},attrs:{slot:"reference"},slot:"reference"},[5==e.examineStatus||4==e.examineStatus?a("span",{staticClass:"examine_po"},[a("img",{staticClass:"examine_img",attrs:{src:e.headPortrait,width:"50",height:"50"}})]):t._e(),t._v(" "),2==e.stepType?a("span",{staticClass:"examine_po1"},[a("img",{staticClass:"examine_img",class:{mohu:1!==e.examineStatus},attrs:{src:e.headPortrait,width:"50",height:"50"}})]):t._e(),t._v(" "),3==e.stepType?a("div",{staticStyle:{display:"inline-block",margin:"0 15px"},style:e.type_style},t._l(e.userList,function(t,e){return a("span",{key:e,staticClass:"examine_po2"},[a("img",{staticClass:"examine_img",class:{mohu:0==t.examineStatus},attrs:{src:t.headPortrait,width:"50",height:"50"}})])})):t._e(),t._v(" "),a("br"),t._v(" "),e.examineUserName?a("span",{staticClass:"examine_type"},[t._v(t._s(e.examineUserName))]):t._e(),t._v(" "),2==e.stepType?a("span",{staticClass:"examine_type"},[t._v(t._s(e.userLength+"人或签"))]):t._e(),t._v(" "),3==e.stepType?a("span",{staticClass:"examine_type"},[t._v(t._s(e.userLength+"人会签"))]):t._e(),t._v(" "),a("br"),t._v(" "),0==e.examineStatus&&1==s?a("span",{staticClass:"examine_status"},[t._v("一级审核")]):t._e(),t._v(" "),0==e.examineStatus&&2==s?a("span",{staticClass:"examine_status"},[t._v("二级审核")]):t._e(),t._v(" "),0==e.examineStatus&&3==s?a("span",{staticClass:"examine_status"},[t._v("三级审核")]):t._e(),t._v(" "),0==e.examineStatus&&4==s?a("span",{staticClass:"examine_status"},[t._v("四级审核")]):t._e(),t._v(" "),0==e.examineStatus&&5==s?a("span",{staticClass:"examine_status"},[t._v("五级审核")]):t._e(),t._v(" "),0==e.examineStatus&&6==s?a("span",{staticClass:"examine_status"},[t._v("六级审核")]):t._e(),t._v(" "),1==e.examineStatus?a("span",{staticClass:"examine_status"},[a("i",{staticClass:"el-icon-success",staticStyle:{color:"#67c23a","font-size":"15px"}}),t._v(" 已审核")]):t._e(),t._v(" "),2==e.examineStatus?a("span",{staticClass:"examine_status"},[a("i",{staticClass:"el-icon-circle-close",staticStyle:{color:"#f56c6c","font-size":"18px"}}),t._v(" 未通过")]):t._e(),t._v(" "),3==e.examineStatus?a("span",{staticClass:"examine_status"},[a("i",{staticClass:"el-icon-time",staticStyle:{color:"#e6a23c","font-size":"18px"}}),t._v(" 审核中")]):t._e(),t._v(" "),5==e.examineStatus?a("span",{staticClass:"examine_status"},[a("i",{staticClass:"el-icon-circle-plus",staticStyle:{color:"#67c23a","font-size":"18px"}}),t._v(" 发起")]):t._e()])],2),t._v(" "),s!==t.examineList.length-1?a("span",{staticClass:"examine_next"},[a("i",{staticClass:"el-icon-arrow-right"})]):t._e()],1)}))])])],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.thisshow,expression:"!thisshow"}]}),t._v(" "),a("div",{staticClass:"entry"}),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.itemData,border:"",fit:"","highlight-current-row":"","show-summary":"","summary-method":t.getSummary}},[a("el-table-column",{attrs:{"header-align":"center",align:"center",fixed:"",type:"index","min-width":"45"}}),t._v(" "),a("el-table-column",{attrs:{label:"销售单号",prop:"orderNo","min-width":"200"}}),t._v(" "),a("el-table-column",{attrs:{label:"订单日期",prop:"orderTime",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{label:"订单金额",prop:"order_money",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(t._f("commaing")(e.row.order_money))+"\n            ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"已收金额",prop:"accepted_money",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(t._f("commaing")(e.row.accepted_money))+"\n            ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"未收款金额",prop:"uncollected_money",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(t._f("commaing")(e.row.uncollected_money))+"\n            ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"本次回款金额",prop:"this_money","min-width":"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(t._f("commaing")(e.row.this_money))+"\n            ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"备注",prop:"remarks",width:"180"}})],1),t._v(" "),a("el-form",{staticClass:"uploadForm",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"附件","label-width":"90px"}},[a("ul",{staticClass:"fileUl"},t._l(t.filesData,function(e,s){return a("li",{key:s},[a("a",{attrs:{download:"",href:e.url}},[t._v(t._s(s+1)+". "+t._s(e.name))])])}))]),t._v(" "),a("el-form-item",{attrs:{label:"图片","label-width":"90px"}},[a("ul",{staticClass:"fileUl"},t._l(t.imagesData,function(e,s){return a("li",{key:s},[a("a",{attrs:{download:"",href:e.url,target:"_blank"}},[t._v(t._s(s+1)+". "+t._s(e.name))])])}))])],1),t._v(" "),a("el-dialog",{attrs:{title:"审核意见","close-on-click-modal":!1,visible:t.dialogVisible2,width:"40%"},on:{"update:visible":function(e){t.dialogVisible2=e}}},[a("el-form",{ref:"exaform",attrs:{model:t.exaform,rules:t.rules}},[a("el-form-item",{attrs:{prop:"remarks"}},[a("el-input",{attrs:{type:"textarea",rows:"5",placeholder:"请输入审核意见（必填）"},model:{value:t.exaform.remarks,callback:function(e){t.$set(t.exaform,"remarks",e)},expression:"exaform.remarks"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible2=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.toexamine()}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(l,c,!1,function(t){a("7BMB")},null,null);e.default=m.exports}});