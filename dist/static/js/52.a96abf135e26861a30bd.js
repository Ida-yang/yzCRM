webpackJsonp([52],{"C/VW":function(t,e){},NgBh:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("wtEF"),i=a("mtWM"),o=a.n(i),n=(a("mw3O"),{name:"product",props:{totalNum:Number},store:s.a,computed:{tableData:function(){return s.a.state.productList},tableNumber:function(){return s.a.state.productListnumber}},data:function(){return{fieldHeadData:[],datalist:[],defaultProps:{label:"name",children:"next"},defaultkeys:[1],newform:{second_id:null,secondname:null,id:null,role_id:null,private_phone:null,private_password:null,private_passwords:null,private_employee:null,private_state:"启用",private_email:"",private_QQ:"",imgUrl:null},imgName:null,imgfile:null,searchList:{searchName:null,deptid:null,classification_id:null},filterList:null,checklist:null,idArr:{id:null},clickdata:null,page:1,limit:20,dialogImageUrl:"",dialogVisible:!1}},beforeCreate:function(){var t=this;o()({method:"get",url:t.$store.state.defaultHttp+"classification/getClassificationNodeTree.do?cId="+t.$store.state.iscId}).then(function(e){t.datalist=e.data.map.success}).catch(function(t){})},activated:function(){this.loadFieldHead(),this.reloadTable()},mounted:function(){this.loadFieldHead(),this.reloadTable(),this.reloadData()},methods:{reloadTable:function(){var t=this,e=a("1nuA"),s={};s.page=this.page,s.limit=this.limit,s.searchName=this.searchList.searchName,s.classification_id=this.searchList.classification_id,s.label=4,o()({method:"post",url:t.$store.state.defaultHttp+"pageInfo/queryPageList.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){var a=e.data.map.goods;a.forEach(function(e){e.itemList[0].image?e.productImg=t.$store.state.systemHttp+"product/"+t.$store.state.iscId+"/"+e.itemList[0].image:e.productImg="../../../../static/img/noProduct.png"}),t.$store.state.productList=a,t.$store.state.productListnumber=e.data.count}).catch(function(t){})},loadFieldHead:function(){var t=this,e=a("1nuA"),s={label:4,pId:this.$store.state.ispId};o()({method:"post",url:t.$store.state.defaultHttp+"field/queryListHead.do?cId="+t.$store.state.iscId,data:e.stringify(s)}).then(function(e){t.fieldHeadData=e.data}).catch(function(t){})},reloadData:function(){var t=this,e=a("1nuA"),s={type:"产品"},i={type:"产品",state:1};o()({method:"post",url:t.$store.state.defaultHttp+"userPageInfo/getAllUserPage.do?cId="+t.$store.state.iscId+"&pId="+t.$store.state.ispId,data:e.stringify(s)}).then(function(e){t.filterList=e.data}).catch(function(t){}),o()({method:"post",url:t.$store.state.defaultHttp+"userPageInfo/getUserPage.do?cId="+t.$store.state.iscId+"&pId="+t.$store.state.ispId,data:e.stringify(i)}).then(function(e){t.checklist=e.data}).catch(function(t){})},handleNodeClick:function(t){this.searchList.classification_id=t.id,this.clickdata=t,this.$options.methods.reloadTable.bind(this)(!0)},selectInfo:function(t){this.multipleSelection=t;var e=t,a=[new Array];e.forEach(function(t){0!=t.id&&a.push(t.id)}),this.idArr.id=a},openDetails:function(t,e){var a;a={id:e.id},this.$store.state.productdetailsData=a,this.$router.push({path:"/productdetails"})},showALL:function(){this.searchList.classification_id=null,this.$options.methods.reloadTable.bind(this)()},handleAdd:function(){if(this.clickdata)if(this.clickdata.next.length)this.$message({message:"该产品分类下还有分类，请选择最明细的产品分类",type:"info"});else{var t={};t.setForm={goodsName:"",unitId:"",see:1,brandId:"",classification_id:this.clickdata.id,category:this.clickdata.name,attribute:"",price:"",costPrice:"",isEnableSpec:"",describe:"",startQuantity:"",deliveryDays:""},t.submitURL=this.$store.state.defaultHttp+"customerTwo/saveClue.do?cId="+this.$store.state.iscId+"&pId="+this.$store.state.ispId,this.$store.state.productaddData=t,this.$router.push({path:"/productadd"})}else this.$message({message:"请先选择产品分类，再添加产品",type:"info"})},handleEdit:function(t,e){var a={};a.setForm={id:e.id,batch_id:e.batch_id},a.submitURL=this.$store.state.defaultHttp+"goods/update.do?cId="+this.$store.state.iscId+"&pId="+this.$store.state.ispId,this.$store.state.productupdateData=a,this.$router.push({path:"/productupdate"})},handledeletes:function(){var t=this,e=this,s=a("1nuA"),i=[];i.ids=this.idArr.id,i.ids?(i.ids.shift(0),e.$confirm("是否确认删除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){t.value;o()({method:"post",url:e.$store.state.defaultHttp+"goods/delete.do?cId="+e.$store.state.iscId,data:s.stringify(i)}).then(function(t){t.data.code&&"200"==t.data.code?e.$message({message:"删除成功",type:"success"}):e.$message({message:t.data.msg,type:"error"}),e.$options.methods.reloadTable.bind(e)()}).catch(function(t){e.$message.error("删除失败，请重新操作")})}).catch(function(){t.$message({type:"info",message:"取消删除"})})):e.$message({type:"error",message:"请先选择要删除的订单"})},handledelete:function(t,e){var s=this,i=this,n=a("1nuA"),l=[];l.ids=e.id,i.$confirm("是否确认删除["+e.goodsName+"]？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){t.value;o()({method:"post",url:i.$store.state.defaultHttp+"goods/delete.do?cId="+i.$store.state.iscId,data:n.stringify(l)}).then(function(t){t.data.code&&"200"==t.data.code?i.$message({message:"删除成功",type:"success"}):i.$message({message:t.data.msg,type:"error"}),i.$options.methods.reloadTable.bind(i)()}).catch(function(t){i.$message.error("删除失败，请重新操作")})}).catch(function(){s.$message({type:"info",message:"取消删除["+e.goodsName+"]"})})},hangleChange:function(t,e){var s=this,i=a("1nuA"),n={};n.pageInfoId=e.pageInfoId,n.state=1==t?1:0,o()({method:"post",url:s.$store.state.defaultHttp+"userPageInfo/updateUserPageByid.do?cId="+s.$store.state.iscId+"&pId="+s.$store.state.ispId,data:i.stringify(n)}).then(function(t){t.data&&"success"==t.data&&s.$options.methods.reloadData.bind(s)(!0)}).catch(function(t){})},search:function(){this.$options.methods.reloadTable.bind(this)(!0)},handleSizeChange:function(t){this.limit=t,this.$options.methods.reloadTable.bind(this)(!1)},handleCurrentChange:function(t){this.page=t,this.$options.methods.reloadTable.bind(this)(!1)}}}),l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contentall"},[a("div",{staticClass:"otherleftcontent"},[a("el-tree",{attrs:{"node-key":"id","highlight-current":"",accordion:"",data:t.datalist,props:t.defaultProps,"default-expanded-keys":t.defaultkeys,"expand-on-click-node":""},on:{"node-click":t.handleNodeClick}})],1),t._v(" "),a("div",{staticClass:"centercontent"}),t._v(" "),a("div",{staticClass:"otherightcontent"},[a("div",{staticClass:"searchList",staticStyle:{width:"100%"}},[a("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入产品名称"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.search(e):null}},model:{value:t.searchList.searchName,callback:function(e){t.$set(t.searchList,"searchName",e)},expression:"searchList.searchName"}}),t._v("\n              \n            "),a("el-button",{attrs:{icon:"el-icon-search",type:"primary",size:"mini"},on:{click:function(e){t.search()}}},[t._v("查询")])],1),t._v(" "),a("div",{staticClass:"entry"},[a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(e){t.handleAdd()}}},[t._v("新增")]),t._v(" "),a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(e){t.handledeletes()}}},[t._v("删除")]),t._v(" "),a("el-button",{staticClass:"btn info-btn",attrs:{size:"mini"},on:{click:function(e){t.showALL()}}},[t._v("显示全部")]),t._v(" "),a("div",{staticClass:"totalnum_head"},[t._v("共 "),a("span",{staticClass:"bold_span"},[t._v(t._s(t.tableNumber))]),t._v(" 条")]),t._v(" "),a("el-popover",{attrs:{placement:"bottom",width:"100",trigger:"click"}},[a("el-checkbox-group",{staticClass:"checklist",staticStyle:{"max-height":"600px","overflow-y":"overlay","overflow-x":"hidden"},model:{value:t.checklist,callback:function(e){t.checklist=e},expression:"checklist"}},t._l(t.filterList,function(e){return a("el-checkbox",{key:e.id,staticClass:"checkone",attrs:{label:e.name,value:e.state},on:{change:function(a){t.hangleChange(a,e)}}})})),t._v(" "),a("el-button",{staticClass:"info-btn screen",attrs:{slot:"reference",icon:"el-icon-more",type:"mini"},slot:"reference"})],1)],1),t._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:""},on:{"selection-change":t.selectInfo}},[a("el-table-column",{attrs:{fixed:"","header-align":"center",align:"center",type:"selection",width:"45",prop:"id",sortable:""},on:{"selection-change":t.selectInfo}}),t._v(" "),a("el-table-column",{attrs:{label:"主图",fixed:"",prop:"productImg",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-popover",{attrs:{placement:"right",width:"200",trigger:"hover"}},[a("img",{attrs:{src:e.row.productImg,alt:"",width:"200",height:"200"}}),t._v(" "),a("img",{attrs:{slot:"reference",src:e.row.productImg,alt:"",width:"60",height:"60"},slot:"reference"})])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"产品编码",fixed:"",prop:"itemList[0].goodsCode","min-width":"150",sortable:""}}),t._v(" "),t._l(t.filterList,function(e,s){return a("div",{key:s},["goodsName"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"产品名称",fixed:"",prop:"goodsName","min-width":"130",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"hoverline",on:{click:function(a){t.openDetails(e.$index,e.row)}}},[t._v("\n                            "+t._s(e.row.goodsName)+"\n                        ")])]}}])}):t._e(),t._v(" "),"describe"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"规格描述",prop:"describe","show-overflow-tooltip":"","min-width":"180",sortable:""}}):t._e(),t._v(" "),"unit"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"单位",prop:"unit","min-width":"90",sortable:""}}):t._e(),t._v(" "),"price"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"价格",prop:"itemList[0].price","min-width":"90",sortable:""}}):t._e(),t._v(" "),"costPrice"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"成本价",prop:"costPrice","min-width":"100",sortable:""}}):t._e(),t._v(" "),"brand"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"品牌",prop:"brand","min-width":"90",sortable:""}}):t._e(),t._v(" "),"attribute"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"产品属性",prop:"attribute","min-width":"120",sortable:""}}):t._e(),t._v(" "),"status"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"状态",prop:"status","min-width":"90",sortable:""}}):t._e(),t._v(" "),"createTime"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"起订量",prop:"startQuantity","min-width":"90",sortable:""}}):t._e(),t._v(" "),"createTime"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"交货天数",prop:"deliveryDays","min-width":"110",sortable:""}}):t._e(),t._v(" "),"createTime"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"创建时间",prop:"createTime","min-width":"150",sortable:""}}):t._e(),t._v(" "),"remark"==e.prop&&1==e.state?a("el-table-column",{attrs:{label:"产品备注",prop:"remark","min-width":"150",sortable:""}}):t._e(),t._v(" "),t._l(t.fieldHeadData,function(s){return e.prop==s.field_name&&1==e.state?a("el-table-column",{key:s.field_name,attrs:{label:s.name,prop:s.field_name,"min-width":"130",sortable:""}}):t._e()})],2)}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"150","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.handledelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],2),t._v(" "),a("div",{staticClass:"block numberPage"},[a("el-pagination",{attrs:{"current-page":t.page,"page-sizes":[20,50,100,500],"page-size":20,layout:"total, sizes, prev, pager, next, jumper",total:t.tableNumber},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),a("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1)},staticRenderFns:[]};var r=a("VU/8")(n,l,!1,function(t){a("C/VW")},null,null);e.default=r.exports}});