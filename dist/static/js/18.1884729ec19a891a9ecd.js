webpackJsonp([18],{bebH:function(t,e){},"dK//":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("INCx"),o=a.n(s),l=a("bOdI"),i=a.n(l),n=(a("wtEF"),a("mtWM")),r=a.n(n),u=(a("mw3O"),{name:"name",data:function(){var t;return t={orderNo:null,orderupdateData:{},datalist:[],default_props:{label:"name",children:"next"},default_keys:[1],list:null,selectData:[],options:[],itemData:[{id:10,productImg:null,amountOfMoney:null,commitTime:null,brand:null,discount:null,discountAfter:null,discountAmount:null,tbGoods:{goodsName:"",describe:""},num:null,price:null,taxAfter:null,taxAmount:null,taxRate:null,unit:null,edit:!1,remark:null,remarks1:null,remarks2:null},{id:11,productImg:null,amountOfMoney:null,commitTime:null,brand:null,discount:null,discountAfter:null,discountAmount:null,tbGoods:{goodsName:"",describe:""},num:null,price:null,taxAfter:null,taxAmount:null,taxRate:null,unit:null,edit:!1,remark:null,remarks1:null,remarks2:null},{id:12,productImg:null,amountOfMoney:null,commitTime:null,brand:null,discount:null,discountAfter:null,discountAmount:null,tbGoods:{goodsName:"",describe:""},num:null,price:null,taxAfter:null,taxAmount:null,taxRate:null,unit:null,edit:!1,remark:null,remarks1:null,remarks2:null},{id:13,productImg:null,amountOfMoney:null,commitTime:null,brand:null,discount:null,discountAfter:null,discountAmount:null,tbGoods:{goodsName:"",describe:""},num:null,price:null,taxAfter:null,taxAmount:null,taxRate:null,unit:null,edit:!1,remark:null,remarks1:null,remarks2:null},{id:14,productImg:null,amountOfMoney:null,commitTime:null,brand:null,discount:null,discountAfter:null,discountAmount:null,tbGoods:{goodsName:"",describe:""},num:null,price:null,taxAfter:null,taxAmount:null,taxRate:null,unit:null,edit:!1,remark:null,remarks1:null,remarks2:null}],selectList:[],itemList:[],tableData:[],scopeIndex:null,nodeChange:!1,myform:{customerpoolId:null,contactId:null,orderTime:null,settlement:null,deliveryMode:null,deliveryAddress:null,user:this.$store.state.user,ascriptionId:null,ascription:null,department:null,mechanism:null,remarks:null},rules:{customerpoolId:[{required:!0,message:"公司名称不能为空",trigger:"blur"}],orderTime:[{required:!0,message:"订单时间不能为空",trigger:"blur"}],settlement:[{required:!0,message:"结算方式不能为空",trigger:"blur"}]},deliveryMethod:[],customerList:[],contactsList:[],brandList:[],settlementMethod:[{id:101,name:"一次性付款"},{id:102,name:"分次付款"},{id:103,name:"月结付款"}],customerId:null,cusdiscount:null,custaxRate:null,isDisable:!1,submitAdd:!0,goodsName:"",dialogVisible:!1,classification_id:null,idArr:[],multipleSelection:null,OKdisabled:!0,filterList:null,checklist:null},i()(t,"isDisable",!1),i()(t,"fieldsform",{}),i()(t,"previewData",[]),i()(t,"deptData",[]),i()(t,"defaultProps",{label:"deptname",children:"next"}),i()(t,"userData",[]),i()(t,"doUpload",this.$store.state.defaultHttp+"workOrder/upload.do?cId="+this.$store.state.iscId),t},mounted:function(){this.getList(),this.loadOther(),this.getData(),this.reloadData(),this.loadfield(),this.loadUserandDept()},methods:{reloadData:function(){var t=this,e=a("1nuA"),s={type:"销售订单详情"},o={type:"销售订单详情",state:1};r()({method:"post",url:t.$store.state.defaultHttp+"userPageInfo/getAllUserPage.do?cId="+t.$store.state.iscId+"&pId="+t.$store.state.ispId,data:e.stringify(s)}).then(function(e){t.filterList=e.data}).catch(function(t){}),r()({method:"post",url:t.$store.state.defaultHttp+"userPageInfo/getUserPage.do?cId="+t.$store.state.iscId+"&pId="+t.$store.state.ispId,data:e.stringify(o)}).then(function(e){t.checklist=e.data}).catch(function(t){})},getList:function(){var t=this,e=a("1nuA"),s={page:1,limit:1e6};r()({method:"post",url:t.$store.state.defaultHttp+"goods/search.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){var a=e.data.map.goods;t.list=a.map(function(e){return t.$set(e,"edit",!1),e}),a.forEach(function(e){for(var a in e.aaa=JSON.parse(e.spec),e.goodspec=[],e.aaa)"null"!==a&&"undefined"!==a&&e.goodspec.push({label:a,value:e.aaa[a]});e.image?e.productImg=t.$store.state.systemHttp+"product/"+t.$store.state.iscId+"/"+e.image:e.productImg="../../../../static/img/noProduct.png"}),t.$options.methods.getSelect.bind(t)()}).catch(function(t){})},getData:function(){var t=this,e=a("1nuA"),s={page:1,limit:1e6};s.classification_id=this.classification_id,s.searchName=this.goodsName,r()({method:"post",url:t.$store.state.defaultHttp+"goods/search.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){var a=e.data.map.goods;a.forEach(function(e){for(var a in e.aaa=JSON.parse(e.spec),e.goodspec=[],e.aaa)"null"!==a&&"undefined"!==a&&e.goodspec.push({label:a,value:e.aaa[a]});e.image?e.productImg=t.$store.state.systemHttp+"product/"+t.$store.state.iscId+"/"+e.image:e.productImg="../../../../static/img/noProduct.png"}),a.map(function(e){return t.$set(e,"edit",!1),e}),t.tableData=a}).catch(function(t){})},loadfield:function(){var t=this,e=a("1nuA"),s=this.$store.state.orderupdateData;this.orderupdateData=s;var o=null,l=null;this.orderupdateData.id&&(o=this.orderupdateData.id,l=this.orderupdateData.batch_id);var i={label:9,id:o,batch_id:l};r()({method:"post",url:t.$store.state.defaultHttp+"field/queryField.do?cId="+t.$store.state.iscId,data:e.stringify(i)}).then(function(e){var a=e.data;a.forEach(function(e,a){e.displayVal="","checkbox"!==e.formType&&null!==e.value&&(e.default_value=e.value),1==e.is_null&&(t.rules[e.field_name]=[{required:!0,message:" ",trigger:"blur"}])}),t.previewData=a}).catch(function(t){})},loadUserandDept:function(){var t=this,e=a("1nuA"),s={page:1,limit:"9999"};r()({method:"post",url:t.$store.state.defaultHttp+"getPrivateUserAll.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){t.userData=e.data.map.success}).catch(function(t){}),r()({method:"get",url:t.$store.state.defaultHttp+"dept/getDeptNodeTree.do?cId="+t.$store.state.iscId}).then(function(e){t.deptData=e.data.map.success}).catch(function(t){})},loadOther:function(){var t=this,e=a("1nuA"),s={type:"交货方式"},o={page:1,limit:1e7},l=new Date,i=l.getFullYear(),n=l.getMonth()+1,u=l.getDate();n=n<10?"0"+n:n,u=u<10?"0"+u:u,this.myform.orderTime=i+"-"+n+"-"+u,r()({method:"post",url:t.$store.state.defaultHttp+"typeInfo/getTypeInfoGroupByType.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){t.deliveryMethod=e.data}).catch(function(t){}),r()({method:"post",url:t.$store.state.defaultHttp+"customerpool/query.do?cId="+t.$store.state.iscId,data:e.stringify(o)}).then(function(e){t.customerList=e.data.map.success}).catch(function(t){}),r()({method:"post",url:t.$store.state.defaultHttp+"brand/selectBrandList.do?cId="+t.$store.state.iscId,data:e.stringify(o)}).then(function(e){t.brandList=e.data.map.brands}).catch(function(t){}),r()({method:"get",url:t.$store.state.defaultHttp+"classification/getClassificationNodeTree.do?cId="+t.$store.state.iscId}).then(function(e){t.datalist=e.data.map.success}).catch(function(t){})},loadContact:function(){var t=this,e=a("1nuA"),s={};s.customerpool_id=this.customerId,r()({method:"post",url:t.$store.state.defaultHttp+"getPoolContactsName.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){t.contactsList=e.data.map.success}).catch(function(t){})},getSelect:function(){var t=this;this.itemData.forEach(function(e,a){t.list.forEach(function(a,s){a.id==e.id&&t.list.splice(s,1)})}),this.selectData=this.list},selectCustomer:function(t){var e=this;this.customerId=t,this.customerList.forEach(function(a){a.id==t&&(e.myform.ascriptionId=a.privateUser[0].private_id,e.myform.ascription=a.privateUser[0].private_employee,e.myform.department=a.deptname,e.myform.mechanism=a.parentname,a.discount?e.cusdiscount=a.discount:e.cusdiscount="100",a.taxRate?e.custaxRate=a.taxRate:e.custaxRate="0")}),this.$options.methods.loadContact.bind(this)()},handleAdd:function(){this.itemData.push({productImg:null,amountOfMoney:null,commitTime:null,brand:null,discount:null,discountAfter:null,discountAmount:null,tbGoods:{goodsName:"",describe:""},num:null,price:null,taxAfter:null,taxAmount:null,taxRate:null,unit:null,edit:!1,remark:null,remarks1:null,remarks2:null})},cellClick:function(t,e,a,s){var o=this;t.edit=!1,"操作"!==e.label&&(this.myform.customerpoolId?(t.edit=!0,this.itemData.forEach(function(e,a){t.id==e.id&&(o.scopeIndex=a)})):this.$message({message:"请先选择客户",type:"error"}))},handleDelete:function(t,e){var a=this;this.itemData.forEach(function(e,s){s==t&&a.itemData.splice(s,1)}),this.$options.methods.getList.bind(this)()},confirmEdit:function(t){t.edit=!1,this.$message({message:"本地保存成功",type:"success"})},handleFoces:function(t,e){this.scopeIndex=t},handleFilter:function(t){var e=this;this.selectData=[],this.list.forEach(function(a){-1!=a.tbGoods.goodsName.indexOf(t)&&e.selectData.push(a)})},currentChange:function(t){var e=this;this.itemData.forEach(function(a,s){s==e.scopeIndex&&t&&(t.edit=!0,t.price=t.tbGoods.price,t.discount=e.cusdiscount,t.taxRate=e.custaxRate,t.num=1,e.itemData.splice(s,1,t),e.OKdisabled=!1,e.$options.methods.handleinput(1,s,t))}),this.list.forEach(function(a,s){t&&t.id==a.id&&e.list.splice(s,1)}),this.selectData=this.list},handleinput:function(t,e,a,s){if(a.num&&a.price){var o=parseInt(a.num)*parseFloat(a.price);a.amountOfMoney=o.toFixed(2)}if(a.amountOfMoney&&a.discount&&"discount"==s){var l=parseFloat(a.amountOfMoney)*parseFloat(a.discount)/100,i=parseFloat(a.amountOfMoney)-l;a.discountAmount=i.toFixed(2),a.discountAfter=l.toFixed(2)}else if(a.amountOfMoney&&a.discountAmount&&"discountAmount"==s){var n=parseFloat(a.amountOfMoney)-parseFloat(a.discountAmount),r=n/parseFloat(a.amountOfMoney)*100;a.discount=r.toFixed(2),a.discountAfter=n.toFixed(2)}else if(a.amountOfMoney&&a.discount){var u=parseFloat(a.amountOfMoney)*parseFloat(a.discount)/100,d=parseFloat(a.amountOfMoney)-u;a.discountAmount=d.toFixed(2),a.discountAfter=u.toFixed(2)}else a.discountAmount=0,a.discountAfter=a.amountOfMoney;if(a.amountOfMoney&&a.taxRate)if(a.discountAfter){var c=parseFloat(a.discountAfter)*parseFloat(a.taxRate)/100,m=parseFloat(a.discountAfter)+c;a.taxAmount=c.toFixed(2),a.taxAfter=m.toFixed(2)}else{var p=parseFloat(a.amountOfMoney)*parseFloat(a.taxRate)/100,f=parseFloat(a.amountOfMoney)+p;a.taxAmount=p.toFixed(2),a.taxAfter=f.toFixed(2)}else a.taxAmount=0,a.taxAfter=a.discountAfter},showDialog:function(){this.dialogVisible=!0,this.$options.methods.getData.bind(this)()},handleNodeClick:function(t){this.classification_id=t.id,this.nodeChange=!0,this.$options.methods.getData.bind(this)()},addInput:function(t){this.goodsName=t,this.$options.methods.getData.bind(this)()},selectInfo:function(t){this.itemList=[],this.multipleSelection=t;var e=t,a=new Array;e.forEach(function(t){0!=t.id&&a.push(t.id)}),this.idArr=a,this.itemList=t},selectItem:function(){var t=this;this.selectList.length&&this.selectList.forEach(function(e,a){t.itemList.push(e),t.itemList.forEach(function(a,s){e.id==a.id&&t.itemList.splice(s,1)})})},handleSubmit:function(){var t=this,e=[];this.itemData.forEach(function(a,s){a.goodsId&&e.push(a),t.itemList.length&&t.itemList.forEach(function(e,s){e.edit=!0,a.id==e.id&&t.itemList.splice(s,1)})}),this.itemData=e.concat(this.itemList),this.itemData.forEach(function(e,a){t.list.forEach(function(s,o){s.id==e.id&&(e.price=s.tbGoods.price,e.discount=t.cusdiscount,e.taxRate=t.custaxRate,e.num=1,t.list.splice(o,1),t.$options.methods.handleinput(1,a,e))})}),this.selectData=this.list,this.dialogVisible=!1},getSummary:function(t){var e=t.columns,a=t.data,s=[];return e.forEach(function(t,e){if(0!==e){var l=a.map(function(e){return Number(e[t.property])});if("amountOfMoney"==t.property||"discountAmount"==t.property||"discountAfter"==t.property||"taxAmount"==t.property||"taxAfter"==t.property){s[e]=l.reduce(function(t,e){return e+t},0),s[e]=s[e].toFixed(2);var i=o()(s[e]).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,"),n=".00",r=s[e].split(".");2===r.length?1===(n=r[1].toString()).length?s[e]=i+"."+n+"0":s[e]=i+"."+n:s[e]=i+n,s[e]+=" 元"}else"num"==t.property?(s[e]=l.reduce(function(t,e){return e+t},0),s[e]):s[e]=""}else s[e]="合计"}),s},handlecheck:function(t,e){this.previewData.forEach(function(a){a.id==e.id&&(a.displayVal=t.deptname,a.default_value=t.deptid)})},beforeUpload:function(t){if(!(t.size/1024/1024<5))return this.$message.warning("文件大小不能超过 5MB!"),!1},uploadSuccess:function(t,e,a){this.previewData.forEach(function(e){"file"==e.formType&&(e.default_value=t)})},onSubmit:function(){var t=this,e=t.previewData,a=0,s=new Array;this.itemData.forEach(function(t,e){t.goodsId&&(a+=parseFloat(t.taxAfter),s.push({itemId:t.id,num:parseInt(t.num),price:parseFloat(t.price),commitTime:t.commitTime,amountOfMoney:t.amountOfMoney,discount:t.discount,discountAmount:t.discountAmount,discountAfter:t.discountAfter,taxRate:t.taxRate,taxAmount:t.taxAmount,taxAfter:t.taxAfter,remarks1:t.remarks1,remarks2:t.remarks2}))});var o={id:null,batch_id:null,customerpoolId:this.myform.customerpoolId,contactId:this.myform.contactId,orderTime:this.myform.orderTime,settlement:this.myform.settlement,deliveryMode:this.myform.deliveryMode,deliveryAddress:this.myform.deliveryAddress,pId:parseInt(this.$store.state.ispId),ascriptionId:this.myform.ascriptionId,remarks:this.myform.remarks,totalSum:a},l=!1;if(s.length||(t.$message({message:"产品不能为空",type:"error"}),l=!0),o.settlement||(t.$message({message:"结算方式不能为空",type:"error"}),l=!0),o.orderTime||(t.$message({message:"订单时间不能为空",type:"error"}),l=!0),e.forEach(function(e){"checkbox"==e.formType?e.value=e.default_value.join(","):"user"==e.formType||"structure"==e.formType?e.default_value&&(e.value=e.default_value.toString()):e.value=e.default_value,1!=e.is_null||e.value||(t.$message({message:e.name+"不能为空",type:"error"}),l=!0)}),!l){var i={order:o,orderDetails:s,field:e};this.isDisable=!0,r()({method:"post",url:t.$store.state.defaultHttp+"order/saveOrUpdate.do?cId="+t.$store.state.iscId,data:i}).then(function(e){if(e.data.code&&"200"==e.data.code){t.$message({message:"添加成功",type:"success"});var a=e.data.map.order;t.$store.state.orderdetailsData={id:a.id,batch_id:a.batch_id},t.closeTag(),t.$router.push({path:"/orderDetail"})}else t.$message({message:e.data.msg,type:"error"});t.isDisable=!1}).catch(function(e){t.isDisable=!1})}},updateSubmit:function(){var t=this,e=t.previewData,a=0,s=new Array;this.itemData.forEach(function(t,e){t.goodsId&&(a+=parseFloat(t.taxAfter),s.push({itemId:t.id,num:parseInt(t.num),price:parseFloat(t.price),commitTime:t.commitTime,amountOfMoney:t.amountOfMoney,discount:t.discount,discountAmount:t.discountAmount,discountAfter:t.discountAfter,taxRate:t.taxRate,taxAmount:t.taxAmount,taxAfter:t.taxAfter,remarks1:t.remarks1,remarks2:t.remarks2}))});var o={id:this.myform.id,batch_id:this.myform.batch_id,customerpoolId:this.myform.customerpoolId,contactId:this.myform.contactId,orderTime:this.myform.orderTime,settlement:this.myform.settlement,deliveryMode:this.myform.deliveryMode,deliveryAddress:this.myform.deliveryAddress,pId:parseInt(this.$store.state.ispId),ascriptionId:this.myform.ascriptionId,remarks:this.myform.remarks,totalSum:a};e.forEach(function(t){"checkbox"==t.formType?t.value=t.default_value.join(","):"user"==t.formType||"structure"==t.formType?t.default_value&&(t.value=t.default_value.toString()):t.value=t.default_value});var l={order:o,orderDetails:s,field:e};this.isDisable=!0,r()({method:"post",url:t.$store.state.defaultHttp+"order/saveOrUpdate.do?cId="+t.$store.state.iscId,data:l}).then(function(e){e.data.code&&"200"==e.data.code?t.$message({message:"编辑成功",type:"success"}):t.$message({message:e.data.msg,type:"error"}),t.isDisable=!1}).catch(function(e){t.isDisable=!1})},submitOrClose:function(){var t=this,e=t.previewData,a=0,s=new Array;this.itemData.forEach(function(t,e){t.goodsId&&(a+=parseFloat(t.taxAfter),s.push({itemId:t.id,num:parseInt(t.num),price:parseFloat(t.price),commitTime:t.commitTime,amountOfMoney:t.amountOfMoney,discount:t.discount,discountAmount:t.discountAmount,discountAfter:t.discountAfter,taxRate:t.taxRate,taxAmount:t.taxAmount,taxAfter:t.taxAfter,remarks1:t.remarks1,remarks2:t.remarks2}))});var o={customerpoolId:this.myform.customerpoolId,contactId:this.myform.contactId,orderTime:this.myform.orderTime,settlement:this.myform.settlement,deliveryMode:this.myform.deliveryMode,deliveryAddress:this.myform.deliveryAddress,pId:parseInt(this.$store.state.ispId),ascriptionId:this.myform.ascriptionId,remarks:this.myform.remarks,totalSum:a},l=!1;if(s.length||(t.$message({message:"产品不能为空",type:"error"}),l=!0),o.settlement||(t.$message({message:"结算方式不能为空",type:"error"}),l=!0),o.orderTime||(t.$message({message:"订单时间不能为空",type:"error"}),l=!0),o.customerpoolId||(t.$message({message:"客户名称不能为空",type:"error"}),l=!0),e.forEach(function(e){"checkbox"==e.formType?e.value=e.default_value.join(","):"user"==e.formType||"structure"==e.formType?e.default_value&&(e.value=e.default_value.toString()):e.value=e.default_value,1!=e.is_null||e.value||(t.$message({message:e.name+"不能为空",type:"error"}),l=!0)}),!l){var i={order:o,orderDetails:s,field:e};this.isDisable=!0,r()({method:"post",url:t.$store.state.defaultHttp+"order/saveOrUpdate.do?cId="+t.$store.state.iscId,data:i}).then(function(e){e.data.code&&"200"==e.data.code?(t.$message({message:"添加成功",type:"success"}),t.closeTag()):t.$message({message:e.data.msg,type:"error"}),t.isDisable=!1}).catch(function(e){t.isDisable=!1})}},closeTag:function(){var t=this,e=void 0;this.$store.state.tagsList.forEach(function(a,s){a.name==t.$options.name&&(e=s)});var a=this.$store.state.tagsList.splice(e,1)[0];(this.$store.state.tagsList[e]?this.$store.state.tagsList[e]:this.$store.state.tagsList[e-1])?a.path===this.$route.fullPath&&this.$router.push("/order"):this.$router.push("/index")},hangleChange:function(t,e){var s=this,o=a("1nuA"),l={};l.pageInfoId=e.pageInfoId,l.state=1==t?1:0,r()({method:"post",url:s.$store.state.defaultHttp+"userPageInfo/updateUserPageByid.do?cId="+s.$store.state.iscId+"&pId="+s.$store.state.ispId,data:o.stringify(l)}).then(function(t){t.data&&"success"==t.data&&s.$options.methods.reloadData.bind(s)(!0)}).catch(function(t){s.$message.error("提交失败，请重新提交")})}}}),d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"orderadd_c"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",{staticClass:"bold_span"},[t._v("销售订单"),t.orderNo?a("span",{staticClass:"bold_span"},[t._v("："+t._s(t.orderNo))]):t._e()])]),t._v(" "),a("div",{staticClass:"orderHead"},[a("el-form",{ref:"myform",attrs:{inline:!0,model:t.myform,rules:t.rules}},[a("el-form-item",{staticClass:"first_input",attrs:{prop:"customerpoolId",label:"公司名称","label-width":"90px"}},[a("el-select",{staticClass:"inputbox",attrs:{placeholder:"请选择公司名称",filterable:""},on:{change:t.selectCustomer},model:{value:t.myform.customerpoolId,callback:function(e){t.$set(t.myform,"customerpoolId",e)},expression:"myform.customerpoolId"}},t._l(t.customerList,function(t){return a("el-option",{key:t.id,attrs:{label:t.pName,value:t.id}})}))],1),t._v(" "),a("el-form-item",{staticClass:"first_input",attrs:{label:"联系人","label-width":"90px"}},[a("el-select",{staticClass:"inputbox",attrs:{placeholder:"请选择联系人"},model:{value:t.myform.contactId,callback:function(e){t.$set(t.myform,"contactId",e)},expression:"myform.contactId"}},t._l(t.contactsList,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),a("el-form-item",{staticClass:"first_input",attrs:{prop:"orderTime",label:"订单时间","label-width":"90px"}},[a("el-date-picker",{staticClass:"inputbox",attrs:{type:"date",placeholder:"选择订单时间",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:t.myform.orderTime,callback:function(e){t.$set(t.myform,"orderTime",e)},expression:"myform.orderTime"}})],1),t._v(" "),a("el-form-item",{staticClass:"first_input",attrs:{prop:"settlement",label:"结算方式","label-width":"90px"}},[a("el-select",{staticClass:"inputbox",attrs:{placeholder:"请选择结算方式"},model:{value:t.myform.settlement,callback:function(e){t.$set(t.myform,"settlement",e)},expression:"myform.settlement"}},t._l(t.settlementMethod,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.name}})}))],1),t._v(" "),a("el-form-item",{staticClass:"first_input",attrs:{label:"交货方式","label-width":"90px"}},[a("el-select",{staticClass:"inputbox",attrs:{placeholder:"请选择交货方式"},model:{value:t.myform.deliveryMode,callback:function(e){t.$set(t.myform,"deliveryMode",e)},expression:"myform.deliveryMode"}},t._l(t.deliveryMethod,function(t){return a("el-option",{key:t.id,attrs:{label:t.typeName,value:t.id}})}))],1),t._v(" "),a("el-form-item",{staticClass:"first_input",attrs:{label:"交货地址","label-width":"90px"}},[a("el-input",{staticClass:"inputbox",model:{value:t.myform.deliveryAddress,callback:function(e){t.$set(t.myform,"deliveryAddress",e)},expression:"myform.deliveryAddress"}})],1),t._v(" "),a("el-form-item",{staticClass:"first_input",attrs:{label:"备注","label-width":"90px"}},[a("el-input",{staticClass:"inputbox",model:{value:t.myform.remarks,callback:function(e){t.$set(t.myform,"remarks",e)},expression:"myform.remarks"}})],1),t._v(" "),t._l(t.previewData,function(e){return a("el-form-item",{key:e.id,staticClass:"first_input",staticStyle:{"margin-right":"15px"},attrs:{label:e.name,prop:e.field_name,"label-width":"90px"}},["text"==e.formType||"email"==e.formType?a("el-input",{staticClass:"inputbox",attrs:{placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}},[t._v(">")]):"textarea"==e.formType?a("el-input",{staticClass:"inputbox",attrs:{type:"textarea",maxlength:e.max_length,placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}},[t._v(">")]):"number"==e.formType?a("el-input",{staticClass:"inputbox",attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}},[t._v(">")]):"floatnumber"==e.formType?a("el-input",{staticClass:"inputbox",attrs:{onkeyup:"value=value.replace(/^\\D*(\\d*(?:\\.\\d{0,2})?).*$/g, '$1')",placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}},[t._v(">")]):"mobile"==e.formType?a("el-input",{staticClass:"inputbox",attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",maxlength:11,placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}},[t._v(">")]):"select"==e.formType?a("el-select",{staticClass:"inputbox",attrs:{placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}},[t._v(">\n                        "),t._l(e.setting,function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})})],2):"checkbox"==e.formType?a("el-select",{staticClass:"inputbox",attrs:{multiple:"",placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}},[t._v(">\n                        "),t._l(e.setting,function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})})],2):"user"==e.formType?a("el-select",{staticClass:"inputbox",attrs:{placeholder:e.input_tips},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}},[t._v(">\n                        "),t._l(t.userData,function(t){return a("el-option",{key:t.private_id,attrs:{label:t.private_employee,value:t.private_id}})})],2):"structure"==e.formType?a("el-select",{staticClass:"noPadding_select inputbox",attrs:{placeholder:e.input_tips},model:{value:e.displayVal,callback:function(a){t.$set(e,"displayVal",a)},expression:"item.displayVal"}},[a("el-option",{staticClass:"droplist nopadding_option",attrs:{value:e.displayVal}},[a("el-tree",{ref:"tree",refInFor:!0,attrs:{"node-key":"deptid","highlight-current":"","default-expand-all":"","expand-on-click-node":!1,data:t.deptData,props:t.defaultProps},on:{"node-click":function(a){t.handlecheck(a,e)}}})],1)],1):"date"==e.formType?a("el-date-picker",{staticClass:"inputbox",attrs:{type:"date",placeholder:e.input_tips,format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"datetime"==e.formType?a("el-date-picker",{staticClass:"inputbox",attrs:{type:"datetime",placeholder:e.input_tips,format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:e.default_value,callback:function(a){t.$set(e,"default_value",a)},expression:"item.default_value"}}):"file"==e.formType?a("el-upload",{staticClass:"upload-demo",attrs:{action:t.doUpload,"on-success":t.uploadSuccess,"before-upload":t.beforeUpload}},[a("el-button",{attrs:{size:"mini",type:"info-btn"}},[t._v("上传")]),t._v(" "),a("div",{staticClass:"el-upload__tip",staticStyle:{"margin-top":"-20px"},attrs:{slot:"tip"},slot:"tip"},[t._v(t._s(e.input_tips))])],1):t._e()],1)})],2)],1)]),t._v(" "),a("div",{staticClass:"entry"},[a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini",icon:"el-icon-circle-plus-outline"},on:{click:t.handleAdd}}),t._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"100",trigger:"click"}},[a("el-checkbox-group",{staticClass:"checklist",staticStyle:{"max-height":"600px","overflow-y":"overlay","overflow-x":"hidden"},model:{value:t.checklist,callback:function(e){t.checklist=e},expression:"checklist"}},t._l(t.filterList,function(e){return a("el-checkbox",{key:e.id,staticClass:"checkone",attrs:{label:e.name,value:e.state},on:{change:function(a){t.hangleChange(a,e)}}})})),t._v(" "),a("el-button",{staticClass:"info-btn screen",attrs:{slot:"reference",icon:"el-icon-more",type:"mini"},slot:"reference"})],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.itemData,border:"",fit:"","highlight-current-row":"","show-summary":"","summary-method":t.getSummary},on:{"cell-click":t.cellClick}},[a("el-table-column",{attrs:{"header-align":"center",fixed:"",align:"center",type:"index","min-width":"45"}}),t._v(" "),t._l(t.filterList,function(e,s){return a("div",{key:s},["goodsName"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"产品名称",prop:"tbGoods.goodsName",width:"280px","class-name":"table_required",fixed:""},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.edit?[a("el-select",{attrs:{placeholder:"请选择",filterable:"","filter-method":t.handleFilter},on:{focus:function(a){t.handleFoces(e.$index,e.row)}},model:{value:e.row.tbGoods.goodsName,callback:function(a){t.$set(e.row.tbGoods,"goodsName",a)},expression:"scope.row.tbGoods.goodsName"}},[a("el-option",{staticClass:"droplist",attrs:{value:e.row.tbGoods.goodsName}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.selectData,border:"",fit:""},on:{"current-change":t.currentChange}},[a("el-table-column",{attrs:{"header-align":"center",type:"index","min-width":"45"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tbGoods.goodsName",label:"产品名称",width:"130"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tbGoods.describe","show-overflow-tooltip":"",label:"描述",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"goodspec",label:"规格属性","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.goodspec,function(e,s){return a("span",{key:s},[t._v(t._s(e.label+"："+e.value))])})}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"unit",label:"单位",width:"90"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tbGoods.remark",label:"产品备注",width:"130"}})],1)],1)],1),t._v(" "),a("el-button",{staticClass:"btn info-btn",staticStyle:{width:"30px",height:"28px",padding:"0"},attrs:{size:"mini",icon:"el-icon-more"},on:{click:function(e){t.showDialog()}}})]:a("span",[t._v(t._s(e.row.tbGoods.goodsName))])]}}])}):t._e(),t._v(" "),"image"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"主图",prop:"productImg",width:"101"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-popover",{attrs:{placement:"right",width:"200",trigger:"hover"}},[a("img",{attrs:{src:e.row.productImg,alt:"",width:"200",height:"200"}}),t._v(" "),a("img",{attrs:{slot:"reference",src:e.row.productImg,alt:"",width:"80",height:"80"},slot:"reference"})])]}}])}):t._e(),t._v(" "),"describe"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"规格描述",prop:"tbGoods.describe",width:"120"}}):t._e(),t._v(" "),"spec"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"规格属性",prop:"goodspec","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.goodspec,function(e,s){return a("span",{key:s},[t._v(t._s(e.value+"/"))])})}}])}):t._e(),t._v(" "),"unit"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"单位",prop:"unit",width:"50"}}):t._e(),t._v(" "),"num"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"数量",prop:"num","min-width":"100","class-name":"table_required"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.edit?[a("el-input",{staticClass:"edit-input",attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",size:"small"},on:{input:function(a){t.handleinput(a,e.$index,e.row)}},model:{value:e.row.num,callback:function(a){t.$set(e.row,"num",a)},expression:"scope.row.num"}})]:a("span",[t._v(t._s(e.row.num))])]}}])}):t._e(),t._v(" "),"price"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"单价",prop:"price","min-width":"120","class-name":"table_required"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.edit?[a("el-input",{staticClass:"edit-input",attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'.')",size:"small"},on:{input:function(a){t.handleinput(a,e.$index,e.row)}},model:{value:e.row.price,callback:function(a){t.$set(e.row,"price",a)},expression:"scope.row.price"}})]:a("span",[t._v(t._s(e.row.price))])]}}])}):t._e(),t._v(" "),"amountOfMoney"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"金额",prop:"amountOfMoney","min-width":"120"}}):t._e(),t._v(" "),"discount"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"折扣",prop:"discount",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.edit?[a("el-input",{staticClass:"edit-input",attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'.')",size:"small"},on:{input:function(a){t.handleinput(a,e.$index,e.row,"discount")}},model:{value:e.row.discount,callback:function(a){t.$set(e.row,"discount",a)},expression:"scope.row.discount"}},[a("span",{staticStyle:{"margin-right":"5px","line-height":"34px"},attrs:{slot:"suffix"},slot:"suffix"},[t._v("%")])])]:e.row.discount?a("span",[t._v(t._s(e.row.discount+" %"))]):t._e()]}}])}):t._e(),t._v(" "),"discountAmount"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"折扣额",prop:"discountAmount","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.edit?[a("el-input",{staticClass:"edit-input",attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'.')",size:"small"},on:{input:function(a){t.handleinput(a,e.$index,e.row,"discountAmount")}},model:{value:e.row.discountAmount,callback:function(a){t.$set(e.row,"discountAmount",a)},expression:"scope.row.discountAmount"}})]:a("span",[t._v(t._s(e.row.discountAmount))])]}}])}):t._e(),t._v(" "),"discountAfter"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"折后金额",prop:"discountAfter","min-width":"120"}}):t._e(),t._v(" "),"taxRate"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"税率",prop:"taxRate",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.edit?[a("el-input",{staticClass:"edit-input",attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'.')",size:"small"},on:{input:function(a){t.handleinput(a,e.$index,e.row)}},model:{value:e.row.taxRate,callback:function(a){t.$set(e.row,"taxRate",a)},expression:"scope.row.taxRate"}},[a("span",{staticStyle:{"margin-right":"5px","line-height":"34px"},attrs:{slot:"suffix"},slot:"suffix"},[t._v("%")])])]:a("span",[t._v(t._s(e.row.taxRate))])]}}])}):t._e(),t._v(" "),"taxAmount"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"税额",prop:"taxAmount","min-width":"120"}}):t._e(),t._v(" "),"taxAfter"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"税后金额",prop:"taxAfter","min-width":"120"}}):t._e(),t._v(" "),"commitTime"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"交货日期",prop:"commitTime",width:"172"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.edit?[a("el-date-picker",{staticClass:"table_date",attrs:{type:"date",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",size:"small"},model:{value:e.row.commitTime,callback:function(a){t.$set(e.row,"commitTime",a)},expression:"scope.row.commitTime"}})]:a("span",[t._v(t._s(e.row.commitTime))])]}}])}):t._e(),t._v(" "),"brand"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"产品品牌",prop:"brand",width:"80"}}):t._e(),t._v(" "),"remark"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"产品备注",prop:"tbGoods.remark",width:"120"}}):t._e(),t._v(" "),"remarks1"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"备注1",prop:"remarks1","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.edit?[a("el-input",{staticClass:"edit-input",attrs:{size:"small"},model:{value:e.row.remarks1,callback:function(a){t.$set(e.row,"remarks1",a)},expression:"scope.row.remarks1"}})]:a("span",[t._v(t._s(e.row.remarks1))])]}}])}):t._e(),t._v(" "),"remarks2"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"备注2",prop:"remarks2","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.edit?[a("el-input",{staticClass:"edit-input",attrs:{size:"small"},model:{value:e.row.remarks2,callback:function(a){t.$set(e.row,"remarks2",a)},expression:"scope.row.remarks2"}})]:a("span",[t._v(t._s(e.row.remarks2))])]}}])}):t._e()],1)}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"90",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{width:"30px",height:"30px",padding:"0"},attrs:{type:"success",plain:"",disabled:!e.row.edit,icon:"el-icon-circle-check-outline"},on:{click:function(a){t.confirmEdit(e.row)}}}),t._v(" "),a("el-button",{staticStyle:{width:"30px",height:"30px",padding:"0"},attrs:{type:"danger",plain:"",icon:"el-icon-delete"},on:{click:function(a){t.handleDelete(e.$index,e.row)}}})]}}])})],2),t._v(" "),a("el-form",{staticClass:"disabledForm",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"制单人","label-width":"90px"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.myform.user,callback:function(e){t.$set(t.myform,"user",e)},expression:"myform.user"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"负责人","label-width":"90px"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.myform.ascription,callback:function(e){t.$set(t.myform,"ascription",e)},expression:"myform.ascription"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"部门","label-width":"90px"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.myform.department,callback:function(e){t.$set(t.myform,"department",e)},expression:"myform.department"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"机构","label-width":"90px"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.myform.mechanism,callback:function(e){t.$set(t.myform,"mechanism",e)},expression:"myform.mechanism"}})],1)],1),t._v(" "),a("div",{staticClass:"submit_btn"},[a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.submitAdd,expression:"submitAdd"}],staticStyle:{"margin-right":"50px !important"},attrs:{type:"primary",disabled:t.isDisable},on:{click:t.onSubmit}},[t._v("保存并审核")]),t._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.submitAdd,expression:"submitAdd"}],staticStyle:{"margin-right":"50px !important"},attrs:{type:"primary",disabled:t.isDisable},on:{click:t.submitOrClose}},[t._v("保存并关闭")]),t._v(" "),a("el-button",{on:{click:t.closeTag}},[t._v("取消")])],1),t._v(" "),a("el-dialog",{staticClass:"orderDialog",attrs:{title:"选择产品",visible:t.dialogVisible,"close-on-click-modal":!1,width:"90%",center:""},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticClass:"otherleftcontent"},[a("el-tree",{attrs:{"node-key":"id","highlight-current":"",accordion:"","expand-on-click-node":"",data:t.datalist,props:t.default_props,"default-expanded-keys":t.default_keys},on:{"node-click":t.handleNodeClick}})],1),t._v(" "),a("div",{staticClass:"otherightcontent",staticStyle:{height:"calc(90vh - 150px)","margin-bottom":"10px"}},[a("div",{staticStyle:{margin:"0 0 10px 10px"}},[a("span",[t._v("产品名称：")]),a("el-input",{staticStyle:{width:"200px"},on:{input:t.addInput},model:{value:t.goodsName,callback:function(e){t.goodsName=e},expression:"goodsName"}})],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",fit:""},on:{"selection-change":t.selectInfo}},[a("el-table-column",{attrs:{"header-align":"center",align:"center",type:"selection","min-width":"45"},on:{"selection-change":t.selectInfo}}),t._v(" "),a("el-table-column",{attrs:{prop:"tbGoods.goodsName",label:"产品名称",width:"130"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tbGoods.describe","show-overflow-tooltip":"",label:"规格描述",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"goodspec",label:"规格属性","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.goodspec,function(e,s){return a("span",{key:s},[t._v(t._s(e.label+"："+e.value))])})}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"unit",label:"单位",width:"90"}}),t._v(" "),a("el-table-column",{attrs:{prop:"brand",label:"品牌",width:"90"}}),t._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"产品备注",width:"130"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer order_foot",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.handleSubmit()}}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var c=a("VU/8")(u,d,!1,function(t){a("bebH")},null,null);e.default=c.exports}});