webpackJsonp([8],{Ve1O:function(e,t){},YUaA:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("mvHQ"),i=a.n(s),o=a("wtEF"),n=a("mtWM"),l=a.n(n),r=(a("9igS"),a("PQp9")),c={name:"productupdate",store:o.a,components:{UE:r.a},data:function(){return{updataData:null,despecData:[],activeName:"first",myform:{goodsName:null,unitId:null,brandId:null,chanpinfenleiID:null,classification_id:null,attribute:null,price:null,costPrice:null,describe:null,label:null,isEnableSpec:"0"},rules:{goodsName:[{required:!0,message:"产品名称不能为空",trigger:"blur"}],unitId:[{required:!0,message:"单位不能为空",trigger:"blur"}],attribute:[{required:!0,message:"产品属性不能为空",trigger:"blur"}],price:[{required:!0,message:"销售价格不能为空",trigger:"blur"}]},isDisable:!1,page:1,limit:20,attributeList:[{id:1,name:"成品"},{id:2,name:"原材料"},{id:3,name:"辅材"},{id:4,name:"办公用品"}],unitsData:null,brandsData:null,specsData:null,fileList:[],imageList:[],imgshow:!1,dialogVisible:!1,dialogImageUrl:"",defaultMsg:"这里是UE测试",config:{initialFrameWidth:null,initialFrameHeight:500,toolbars:[["undo","redo","|","bold","italic","underline","fontborder","strikethrough","superscript","subscript","pasteplain","|","forecolor","backcolor","insertorderedlist","insertunorderedlist","selectall","cleardoc","|","rowspacingtop","rowspacingbottom","lineheight","|","customstyle","paragraph","fontfamily","fontsize","|","justifyleft","justifycenter","justifyright","justifyjustify","|","touppercase","tolowercase","|","link","unlink","anchor","|","imagenone","imageleft","imageright","imagecenter","|","simpleupload","insertimage","emotion","scrawl","attachment","insertcode","pagebreak","template","background","|","horizontal","date","time","spechars","snapscreen","|","inserttable","deletetable","insertparagraphbeforetable","insertrow","deleterow","insertcol","deletecol","mergecells","mergeright","mergedown","splittocells","splittorows","splittocols"]],elementPathEnabled:!1,wordCount:!1},specHeadData:[],tableData:[{index:0,imgfile:"",spec1:"",barcode:"",erpDocking:""}],formThead:[],firstID:1,addHeadbtn:!0,currentrow:null,doUpload:this.$store.state.defaultHttp+"goods/masterGraph.do?cId="+this.$store.state.iscId,generationBtn:!0}},mounted:function(){this.loadData(),this.loadother()},methods:{loadData:function(){var e=this,t=a("1nuA"),s=this.$store.state.productupdateData,i={};i.goodsId=s.setForm.id,l()({method:"post",url:e.$store.state.defaultHttp+"goods/searchByGoodsId.do?cId="+e.$store.state.iscId,data:t.stringify(i)}).then(function(t){e.updataData=t.data,e.myform=t.data.goods,e.specHeadData=t.data.goodsSpec,e.defaultMsg=t.data.goodsDesc.introduction,e.imageList=JSON.parse(t.data.goodsDesc.itemImages),e.tableData=t.data.itemList,e.despecData=t.data.itemList,e.tableData.forEach(function(t){t.image&&(t.imgfile=e.$store.state.systemHttp+"product/"+e.$store.state.iscId+"/"+t.image)}),1!=e.specHeadData.length&&e.specHeadData.length?e.generationBtn=!1:e.generationBtn=!0,e.fileList=[],e.imageList.length&&e.imageList.forEach(function(t){e.fileList.push({name:t.name,url:e.$store.state.systemHttp+"product/"+e.$store.state.iscId+"/"+t.value})}),e.$options.methods.loadHead.bind(e)()}).catch(function(e){})},loadother:function(){var e=this,t=this,s=a("1nuA"),i={};i.page=this.page,i.limit=this.limit,l()({method:"post",url:t.$store.state.defaultHttp+"unit/selectUnitList.do?cId="+t.$store.state.iscId,data:s.stringify(i)}).then(function(e){t.unitsData=e.data.map.units}).catch(function(e){}),l()({method:"post",url:t.$store.state.defaultHttp+"brand/selectBrandList.do?cId="+t.$store.state.iscId,data:s.stringify(i)}).then(function(e){t.brandsData=e.data.map.brands}).catch(function(e){}),l()({method:"get",url:t.$store.state.defaultHttp+"specification/selectList.do?cId="+t.$store.state.iscId}).then(function(e){t.specsData=e.data}).catch(function(e){}),setTimeout(function(){e.$options.methods.disabledSome.bind(e)()},1e3)},loadHead:function(){var e=this;this.formThead=[],this.specHeadData.length&&this.specHeadData.forEach(function(t){t.spec_name&&e.formThead.push({label:t.spec_name,value:t.sign})})},DelId:function(e){var t=this;this.addHeadbtn=!0,"spec1"==e.sign?this.$message("bukeyi shanchu"):this.specHeadData.forEach(function(a,s){a.sign==e.sign&&t.specHeadData.splice(s,1)}),2==this.specHeadData.length&&(this.specHeadData[1].sign="spec2"),this.$options.methods.loadHead.bind(this)(),this.$options.methods.disabledSome.bind(this)()},Delrow:function(e,t){var a=this;1==this.tableData.length?this.$message("该行不可删除"):this.tableData.forEach(function(e,s){s==t&&a.tableData.splice(s,1)})},AddId:function(){var e=this,t={sign:"spec2",spec_name:"",spec_value:[],options:[]},a={sign:"spec3",spec_name:"",spec_value:[],options:[]};this.specHeadData.forEach(function(s,i){1==e.specHeadData.length?e.specHeadData.push(t):2==e.specHeadData.length&&e.specHeadData.push(a)}),3==this.specHeadData.length?this.addHeadbtn=!1:this.specHeadData.length||(this.specHeadData=[{sign:"spec1",spec_name:"",spec_value:[],options:[]}])},changeLabel:function(e){var t=this,a=[];this.specsData.forEach(function(s){s.specName==e&&(a=s.specValue,t.specHeadData.forEach(function(t){t.spec_name==e&&(t.spec_value=a,t.options=a)}))}),this.generationBtn=!1,this.$options.methods.loadHead.bind(this)(),this.$options.methods.disabledSome.bind(this)()},disabledSome:function(){var e=this;this.specsData.forEach(function(t){t.disabled=!1,e.specHeadData.forEach(function(e){t.specName==e.spec_name&&(t.disabled=!0)})})},batchGeneration:function(){var e=this.specHeadData;if(this.tableData=[],this.myform.isEnableSpec="1",1==e.length)for(var t=e[0],a=0;a<t.spec_value.length;a++)this.tableData.push({imgfile:"",spec1:t.spec_value[a],spec2:null,spec3:null,sname1:t.spec_name,sname2:null,sname3:null,price:this.myform.price,barcode:"",erpDocking:""});if(2==e.length)for(var s=e[0],i=e[1],o=0;o<s.spec_value.length;o++)for(var n=0;n<i.spec_value.length;n++)this.tableData.push({imgfile:"",spec1:s.spec_value[o],spec2:i.spec_value[n],spec3:null,sname1:s.spec_name,sname2:i.spec_name,sname3:null,price:this.myform.price,barcode:"",erpDocking:""});if(3==e.length)for(var l=e[0],r=e[1],c=e[2],d=0;d<l.spec_value.length;d++)for(var p=0;p<r.spec_value.length;p++)for(var u=0;u<c.spec_value.length;u++)this.tableData.push({imgfile:"",spec1:l.spec_value[d],spec2:r.spec_value[p],spec3:c.spec_value[u],sname1:l.spec_name,sname2:r.spec_name,sname3:c.spec_name,price:this.myform.price,barcode:"",erpDocking:""});this.$options.methods.pushValue.bind(this)()},pushIndex:function(){this.tableData.forEach(function(e,t){e.index=t})},pushValue:function(){var e=this.tableData,t=this.despecData;e.length!==t.length?e.forEach(function(e){e.sname1&&void 0==e.sname2&&t.forEach(function(t){e.spec1==t.spec1&&e.spec2==t.spec2&&e.spec3==t.spec3&&(e.id=t.id,e.image=t.image,e.imgfile=t.imgfile,e.barcode=t.barcode,e.erpDocking=t.erpDocking,e.sname1=t.sname1,e.sname2=t.sname2,e.sname3=t.sname3)})}):e.forEach(function(e){e.sname1&&void 0==e.sname2&&t.forEach(function(t){e.spec1==t.spec1&&e.spec2==t.spec2&&e.spec3==t.spec3&&(e.id=t.id,e.image=t.image,e.imgfile=t.imgfile,e.barcode=t.barcode,e.erpDocking=t.erpDocking,e.sname1=t.sname1,e.sname2=t.sname2,e.sname3=t.sname3)})})},handleCurrentChange:function(e){this.currentrow=e},handleRemove:function(e,t){var a=this;this.imageList.forEach(function(t,s){t.name==e.name&&a.imageList.splice(s,1)})},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},onSuccess:function(e,t,a){var s=this;this.imageList=[],a.forEach(function(e){s.imageList.push({name:e.name,value:e.response})})},handleAvatarSuccess:function(e,t){var a=this;this.tableData.forEach(function(s){s.id==a.currentrow.id&&s.goodsCode==a.currentrow.goodsCode&&(s.imgfile=URL.createObjectURL(t.raw),s.image=e)})},beforeUploadimg:function(e){var t="jpg"===e.name.split(".")[1],a="png"===e.name.split(".")[1],s="jpeg"===e.name.split(".")[1],i=e.size/1024/1024<.5;t||a||s?i||this.$message.warning("图片大小不能超过 500KB!"):this.$message.warning("图片只能是 jpg、png、jpeg格式!")},onSubmit:function(){var e=this,t=this,a=this.$refs.ue.getUEContent(),s={};s.goods=new Object,s.goodsDesc=new Object,s.itemList=new Array,s.goodsSpec=new Array,s.goods={id:this.myform.id,goodsName:this.myform.goodsName,brandId:this.myform.brandId,classification_id:this.myform.classification_id,unitId:this.myform.unitId,attribute:this.myform.attribute,price:this.myform.price,costPrice:this.myform.costPrice,isEnableSpec:this.myform.isEnableSpec,describe:this.myform.describe,label:this.myform.label},s.goodsDesc={introduction:a,goodsId:this.myform.id,itemImages:i()(this.imageList)},this.tableData.forEach(function(t){console.log(t);var a=t.sname1,o=t.sname2,n=t.sname3,l={key1:t.spec1,key2:t.spec2,key3:t.spec3};l[a]=l.key1,l[o]=l.key2,l[n]=l.key3,delete l.key1,delete l.key2,delete l.key3,delete l.null,s.itemList.push({id:t.id,goodsCode:t.goodsCode,goodsId:e.myform.id,price:t.price,image:t.image,erpDocking:t.erpDocking,barcode:t.barcode,spec1:t.spec1,spec2:t.spec2,spec3:t.spec3,sname1:t.sname1,sname2:t.sname2,sname3:t.sname3,spec:i()(l)})}),this.specHeadData.forEach(function(t){s.goodsSpec.push({goodsId:e.myform.id,sign:t.sign,spec_name:t.spec_name,spec_value:t.spec_value,options:t.options})});var o=!1;s.goods.price||(t.$message({message:"销售价格不能为空",type:"error"}),o=!0),s.goods.goodsName||(t.$message({message:"产品名称不能为空",type:"error"}),o=!0),o||(this.isDisable=!0,l()({method:"post",url:t.$store.state.defaultHttp+"goods/update.do?cId="+t.$store.state.iscId+"&pId="+t.$store.state.ispId,data:s}).then(function(e){e.data.code&&"200"==e.data.code?(t.$message({message:"修改成功",type:"success"}),t.closeTag()):t.$message({message:e.data.msg,type:"error"}),t.isDisable=!1}).catch(function(e){}))},closeTag:function(){var e=this,t=void 0;this.$store.state.tagsList.forEach(function(a,s){a.name==e.$options.name&&(t=s)});var a=this.$store.state.tagsList.splice(t,1)[0];(this.$store.state.tagsList[t]?this.$store.state.tagsList[t]:this.$store.state.tagsList[t-1])?a.path===this.$route.fullPath&&this.$router.push("/product"):this.$router.push("/index")}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"update_c bottom"},[a("el-tabs",{attrs:{type:"card"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{staticClass:"first_c",attrs:{label:"基本资料",name:"first"}},[a("div",{staticClass:"first_top"},[a("el-form",{ref:"myform",attrs:{inline:!0,model:e.myform,rules:e.rules}},[a("el-form-item",{staticClass:"first_input",attrs:{label:"产品分类","label-width":"90px"}},[a("el-input",{staticClass:"inputbox",attrs:{disabled:!0},model:{value:e.myform.category,callback:function(t){e.$set(e.myform,"category",t)},expression:"myform.category"}})],1),e._v(" "),a("el-form-item",{staticClass:"first_input",attrs:{prop:"goodsName",label:"产品名称","label-width":"90px"}},[a("el-input",{staticClass:"inputbox",model:{value:e.myform.goodsName,callback:function(t){e.$set(e.myform,"goodsName",t)},expression:"myform.goodsName"}})],1),e._v(" "),a("el-form-item",{staticClass:"first_input",attrs:{prop:"unitId",label:"单位","label-width":"90px"}},[a("el-select",{staticClass:"inputbox",attrs:{placeholder:"请选择单位"},model:{value:e.myform.unitId,callback:function(t){e.$set(e.myform,"unitId",t)},expression:"myform.unitId"}},e._l(e.unitsData,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{staticClass:"first_input",attrs:{label:"品牌","label-width":"90px"}},[a("el-select",{staticClass:"inputbox",attrs:{placeholder:"请选择品牌"},model:{value:e.myform.brandId,callback:function(t){e.$set(e.myform,"brandId",t)},expression:"myform.brandId"}},e._l(e.brandsData,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{staticClass:"first_input",attrs:{prop:"attribute",label:"产品属性","label-width":"90px"}},[a("el-select",{staticClass:"inputbox",attrs:{placeholder:"请选择产品属性"},model:{value:e.myform.attribute,callback:function(t){e.$set(e.myform,"attribute",t)},expression:"myform.attribute"}},e._l(e.attributeList,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.name}})}))],1),e._v(" "),a("el-form-item",{staticClass:"first_input",attrs:{prop:"price",label:"销售价格","label-width":"90px"}},[a("el-input",{staticClass:"inputbox",model:{value:e.myform.price,callback:function(t){e.$set(e.myform,"price",t)},expression:"myform.price"}})],1),e._v(" "),a("el-form-item",{staticClass:"first_input",attrs:{label:"标准成品价","label-width":"90px"}},[a("el-input",{staticClass:"inputbox",model:{value:e.myform.costPrice,callback:function(t){e.$set(e.myform,"costPrice",t)},expression:"myform.costPrice"}})],1),e._v(" "),a("el-form-item",{staticClass:"first_input",attrs:{label:"规格描述","label-width":"90px"}},[a("el-input",{staticClass:"inputbox",attrs:{type:"textarea",rows:"1"},model:{value:e.myform.describe,callback:function(t){e.$set(e.myform,"describe",t)},expression:"myform.describe"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"first_bottom"},[a("p",{staticClass:"pro_title"},[e._v("产品图片")]),e._v(" "),a("div",{staticClass:"uploadproImg"},[a("el-upload",{attrs:{action:e.doUpload,multiple:"","file-list":e.fileList,"list-type":"picture-card","on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove,"on-success":e.onSuccess,"before-upload":e.beforeUploadimg}},[a("i",{staticClass:"el-icon-plus"})]),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1)]),e._v(" "),a("div",{staticClass:"first_bottom"},[a("p",{staticClass:"pro_title"},[e._v("多规格属性")]),a("br"),e._v(" "),a("div",{staticClass:"filter-container"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.specHeadData,border:"",stripe:""}},[a("el-table-column",{attrs:{type:"selection",prop:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("i",{directives:[{name:"show",rawName:"v-show",value:"spec1"!==t.row.sign,expression:"scope.row.sign !== 'spec1'"}],staticClass:"el-icon-delete",on:{click:function(a){e.DelId(t.row)}}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"specName",label:"规格名称","min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{staticClass:"inputbox",attrs:{placeholder:"请选择规格名称"},on:{change:e.changeLabel},model:{value:t.row.spec_name,callback:function(a){e.$set(t.row,"spec_name",a)},expression:"scope.row.spec_name"}},e._l(e.specsData,function(e){return a("el-option",{key:e.id,attrs:{label:e.specName,value:e.specName,disabled:e.disabled}})}))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"specValue",label:"规格值","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"",filterable:"","default-first-option":"","no-data-text":"请将不需要的规格值删除"},model:{value:t.row.spec_value,callback:function(a){e.$set(t.row,"spec_value",a)},expression:"scope.row.spec_value"}},e._l(t.row.options,function(e,t){return a("el-option",{key:t,attrs:{label:e,value:e}})}))]}}])})],1)],1),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.addHeadbtn,expression:"addHeadbtn"}],staticStyle:{"margin-left":"20px"},attrs:{size:"mini"},on:{click:e.AddId}},[e._v("添加")]),e._v(" "),a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{size:"mini",disabled:e.generationBtn},on:{click:e.batchGeneration}},[e._v("批量生成")]),e._v(" "),a("br"),a("br"),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:""},on:{"current-change":e.handleCurrentChange}},[a("el-table-column",{attrs:{type:"selection",prop:"",width:"45"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("i",{staticClass:"el-icon-delete",on:{click:function(a){e.Delrow(t.row,t.$index)}}})]}}])}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",type:"index","min-width":"45"}}),e._v(" "),a("el-table-column",{attrs:{prop:"imgfile",label:"主图",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-upload",{staticClass:"avatar-uploader portrait",attrs:{action:e.doUpload,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeUploadimg}},[null!==t.row.image?a("img",{staticClass:"avatar",attrs:{src:t.row.imgfile,width:"100",height:"100"}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon portrait_add"})])]}}])}),e._v(" "),e._l(e.formThead,function(t,s){return a("el-table-column",{key:s,attrs:{label:t.label,"min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v(e._s(a.row[t.value]))]}}])})}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"价格","min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{staticClass:"inputbox",model:{value:t.row.price,callback:function(a){e.$set(t.row,"price",a)},expression:"scope.row.price"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"barcode",label:"条形码","min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{staticClass:"inputbox",model:{value:t.row.barcode,callback:function(a){e.$set(t.row,"barcode",a)},expression:"scope.row.barcode"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"erpDocking",label:"ERP对接码","min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{staticClass:"inputbox",model:{value:t.row.erpDocking,callback:function(a){e.$set(t.row,"erpDocking",a)},expression:"scope.row.erpDocking"}})]}}])})],2)],1)]),e._v(" "),a("el-tab-pane",{attrs:{label:"产品详情描述",name:"second"}},[a("div",{staticClass:"components-container ueditor_c"},[a("div",{staticClass:"editor-container"},[a("UE",{ref:"ue",attrs:{defaultMsg:e.defaultMsg,config:e.config}})],1)])])],1),e._v(" "),a("div",{staticClass:"submit_btn"},[a("el-button",{staticStyle:{"margin-right":"100px"},attrs:{type:"primary",disabled:e.isDisable},on:{click:e.onSubmit}},[e._v("立即提交")]),e._v(" "),a("el-button",{on:{click:e.closeTag}},[e._v("取消")])],1)],1)},staticRenderFns:[]};var p=a("VU/8")(c,d,!1,function(e){a("Ve1O")},null,null);t.default=p.exports},mvHQ:function(e,t,a){e.exports={default:a("qkKv"),__esModule:!0}},qkKv:function(e,t,a){var s=a("FeBl"),i=s.JSON||(s.JSON={stringify:JSON.stringify});e.exports=function(e){return i.stringify.apply(i,arguments)}}});