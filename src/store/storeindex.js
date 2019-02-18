import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
/*使用Vuex*/
Vue.use(Vuex)
/*配置全局数据*/
const state = {
  //配置访问地址
  // defaultHttp:'http://localhost:8080/wmsnet/',
  // defaultHttp:'http://192.168.0.55:8080/wmsnet3/',//林学
  // defaultHttp:'http://192.168.0.28:8080/wmsnet3/',//楚州
  // defaultHttp:'http://192.168.0.46:8080/wmsnet/',//卫东
  
  // defaultHttp: 'http://192.168.0.67:8080/wmsnet/', //本地服务器
  // defaultHttp: 'http://192.168.0.63:8080/wmsnet3/', //本地服务器
  defaultHttp: 'http://14.18.72.63:8092/wmsnet3/', //线上服务器
  // defaultHttp: 'http://192.168.0.51:8080/wmsnet3/', //本地服务器

  //tableHeight
  userData:null,
  maxheight:null,
  //保存状态
  selection:null,
  //组织列表
  organizationList:[],
  //打印序列号勾选记录
  printSelectData:[],
  //组织列表总数
  organizationListnumber:0,
  //仓库列表
  warehouseList:[],
  //仓库列表总数
  warehouseListnumber:0,
  //储位列表
  positionList:[],
  //储位列表总数
  positionListnumber:0,
  //物料列表
  materielList:[],
  //物料列表总数
  materielListnumber:0,
  //不良原因列表
  badcauseList:[],
  //不良原因列表总数
  badcauseListnumber:0,
  //客户列表
  customerList:[],
  //客户列表总数
  customerListnumber:0,
  //供应商列表
  supplierList:[],
  //供应商列表总数
  supplierListnumber:0,
  //产线列表
  productLineList:[],
  //产线列表总数
  productLineListnumber:0,
  //生产工序列表
  productProcessList:[],
  //生产工序列表总数
  productProcessListnumber:0,
  //工艺流程列表
  techProcessList:[],
  //工艺流程列表总数
  techProcessListnumber:0,
  //角色列表
  roleList:[],
  //角色列表总数
  roleListnumber:0,
  //全部权限列表
  powersList:[],
  //全部权限列表总数
  powersListnumber:0,
  //用户列表
  userList:[],
  //用户列表总数
  userListnumber:0,
  //全部角色列表
  rolesList:[],
  //全部角色列表总数
  rolesListnumber:0,
  //形态转换单列表
  modalShiftList:[],
  //形态转换单列表总数
  modalShiftListnumber:0,
  //来料质检列表
  incomeQISList:[],
  //来料质检列表总数
  incomeQISListnumber:0,
  //盘点单列表
  inventoryOrderList:[],
  //盘点单列表总数
  inventoryOrderListnumber:0,
  //盘点差异列表
  inventoryDifferenceList:[],
  //盘点差异列表总数
  inventoryDifferenceListnumber:0,

  //wmsnet-token 
  token:"",
  //出库单详情数据
  CheckData:null,
  
  //新增或修改页面内容
  addOrUpdateData: null,
  //设置关联的页面内容
  setOtherData: null,
  //选择生产工序页面内容
  selectInfo:null,

  orgId:null,

  //入库id，用于查看入库单明细
  inboundOrderId:null,
  //出库单id，用于查看出库明细
  outboundOrderId:null,
  //形态转换单id，用于查看转换单明细
  transferWithinId:null,
  //盘点单id，用于查看盘点明细
  inventoryOrderId:null,
  //盘点差异id，用于查看盘点差异明细
  inventoryDiffId:null,

  configThis:null,

  reloadHeader: true,

  //标签页
  tagsList: [],

  //Org 访问基础地址
  orgURL:"organization/",
  //仓库基础地址
  warehouseUrl:'ck/',
  //储位基础地址
  positionUrl:'storagelocation/',
  //客户基础地址
  customerUrl:'customer/',
  //供应商基础地址
  supplierUrl:'supplier/',
  //产线基础地址
  productLineUrl:'produline/',
  //不良原因基础地址
  badcauseUrl:'rejectlist/',
  //物料基础地址
  materielUrl:'product/',
  //生产工序基础地址
  productProcessUrl:'produprocess/',
  //工艺流程基础地址
  techProcessUrl:'techprocess/',
  //角色基础地址
  roleUrl:'role/',
  //权限基础地址
  powersUrl:'function/',
  //用户基础地址
  userUrl:'user/',
  //出库单修改接口
  orderUrl:'deliveryOrder/',
  //形态转换接口
  modalShiftUrl:'modalShift/',
  //入库单基础接口
  purchaseOrder:'purchaseorder/',
  //生产工单基础接口
  productWoUrl:'productWo/',
  //生产领用退库单
  cancellingstocks:'cancellingstocks/',
  //非生产性领用出库
  techprocess:'outbill/',
  //来料质检地址
  incomeQISUrl:'qualityInspection/',
  //工序质检地址
  processQISUrl:'processtorejects/',
  //盘点单地址
  inventoryOrderUrl:'inventoryOrder/',
  //盘点差异地址
  inventoryDifferenceUrl:'inventoryDiff/',

  //序列号
  serial:'serialnumber/',
  //打印接口
  print:'print/',
  serialArr:[],
  // tmpDown,
}
/*配置全局函数*/
const mutations = {
  loadUserNameInput(state){
    let Cboolean=state.userNamechecked
    state.userNamechecked==!Cboolean
  },
  loadUserPassInput(state){
    let Cboolean=state.userPasschecked
    state.userPasschecked==!Cboolean
  },
  set_serialArr(state, newArr){
      state.serialArr = newArr
  },
  getMaxHeight(state){
    let clientHeight = document.documentElement.clientHeight;
    // let clintWidth = document.documentElement.clientWidth;
    // console.log(clintWidth)
      state.maxheight = clientHeight - 220;
  },
  set_token(state, token) {
    state.token = token;
    sessionStorage.token = token;
  },
  del_token(state) {
    state.token = '';
    sessionStorage.removeItem('token');
  },
  
}
const actions = {
  loginForm (context,userInput){
    state.selection = userInput[1];
    axios({
      method: 'post',
      url: context.state.defaultHttp+'/user/login',
      data:JSON.stringify(userInput[0])
    }).then(function(res){
      if(res.data && res.data.code == 200) {
        localStorage.setItem('userData', JSON.stringify(res.data.result));
        localStorage.setItem('Isusername', res.data.result.username);
        localStorage.setItem('orgId',userInput[0].orgId);
        localStorage.setItem('userNameis',res.data.result.username)
        if(state.selection.userNamechecked === "true"){
          localStorage.setItem('userName',userInput[0].user);
          localStorage.setItem('userNameChecked',true);
        }else{
          localStorage.removeItem('userName');
          localStorage.removeItem('userNameChecked');
        }
        if(state.selection.userPasschecked === "true"){
          localStorage.setItem('userPass',userInput[0].password);
          localStorage.setItem('userPasschecked',true);
        }else{
          localStorage.removeItem('userPass');
          localStorage.removeItem('userPasschecked');
        }
        state.token = res.headers['wmsnet-token']
        userInput[2].$store.state.userData = res.data.result;
        sessionStorage.setItem("token",res.headers['wmsnet-token']) ;
        userInput[2].$router.push('/index')
        state.configThis = userInput[2];
        state.configThis.$message({
          message: '登录成功',
          type: 'success'
        })
      } else {
        state.configThis = userInput[2];
        state.configThis.$message({
          message: res.data.message,
          type: 'error'
        })
      }
    })
    .catch(function(err){
      // console.log(err)
    })
  },

}
/*将store导出*/
const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions:actions
})

export default store;