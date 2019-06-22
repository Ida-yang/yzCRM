import Vue from 'vue'
import Vuex from 'vuex'
/*使用Vuex*/
Vue.use(Vuex)
/*配置全局数据*/
const state = {
  //配置访问地址
  // defaultHttp: 'https://crm.yunzoe.com/yzcrm/', //线上服务器
  // systemHttp: 'https://crm.yunzoe.com/', //线上服务器
  // defaultHttp:'http://192.168.1.105:8080/', //测试服务器
  defaultHttp:'http://crm2019.yunzoe.com/yzcrm/', //测试服务器
  systemHttp:'http://crm2019.yunzoe.com/', //测试服务器

  //作者
  author:'Ida',
  //登录
  iscId:'', //cId
  ispId:'', //pId
  user:'', //用户名
  deptid:'', //部门ID
  roleid:'', //角色ID
  insid:'', //机构ID
  portrait:'',//用户头像名称

  //标签页
  tagsList:[],

  //消息提醒红点
  dotmessage:true,
  messageList:null,

  //消息是否加载
  loadornot:false,

  //首页列表
  welcomeData:null,

  //添加或修改列表数据
  clueaddOrUpdateData:null, // 线索
  cusaddOrUpdateData:null, // 客户
  agreeaddOrUpdateData:null, // 合同
  oppaddOrUpdateData:null, // 商机
  contaddOrUpdateData:null, // 联系人
  visitaddOrUpdateData:null, // 外勤
  missionaddOrUpdateData:null, // 任务
  productaddData:null, // 产品新增
  productupdateData:null, // 产品编辑
  orderaddData:null, // 订单新增
  orderupdateData:null, // 订单编辑
  approvaladdData:null, // 审批流程新增
  approvalupdateData:null, // 审批流程编辑
  workOrderaddorUpdateData:null, // 工单
  culPondaddorUpdateData:null, // 培育池
  
  //跳转详情页列表
  cluedetailsData:null, // 线索
  cusdetailsData:null, // 客户
  agreedetailsData:null, // 合同
  oppdetailsData:null, // 商机
  contdetailsData:null, // 联系人
  prodetailsData:null, // 方案
  visitdetailsData:null, // 外勤
  missiondetailsData:null, // 任务
  productdetailsData:null, // 产品
  workOrderdetaildsData:null, // 工单
  expBasedetailData:null, // 经验库
  receivdetailData:null, // 回款
  culturePondetailData:null, // 培育池


  //线索挖掘列表
  customerList:[],
  //线索挖掘列表总数
  customerListnumber: 0,
  //线索挖掘详情页联列表
  searchdetailsData:null,

  //线索列表
  clueList:[],
  //线索列表总数
  clueListnumber:0,
  //线索详情页联系人列表
  clueDetailsList:null,
  //线索列表数据
  clueData:null,
  //线索池列表
  cluePoolList:[],
  //线索池列表总数
  cluePoolListnumber:0,
  //线索图表数据
  clueChartsData:null,

  //客户列表
  customerList:[],
  //客户列表总数
  customerListnumber:0,
  //客户详情页联系人列表
  cusConsDetailsList:null,
  //客户详情页商机列表
  opportunityDetailsList:null,
  //客户详情页合同列表
  agreementDetailsList:null,
  //客户详情页开票列表
  InvoiceDetailsList:null,
  //客户详情页外勤任务列表
  FielDutyDetailsList:null,
  //客户列表数据
  customerData:null,
  //客户池列表
  customerPoolList:[],
  //客户池列表总数
  customerPoolListnumber:0,
  //客户图表数据
  customerChartsData:null,

  //联系人列表
  contactsList:[],
  //联系人列表总数
  contactsListnumber:0,

  //合同列表
  agreementList:[],
  //合同列表总数
  agreementListnumber:0,

  //商机列表
  businessOpportunityList:[],
  //商机列表总数
  businessOpportunityListnumber:0,
  // 商机图标数据
  oppChartsData:{
    id:null,
    rateAndCycle:null,
    stageAmount:[],
    rateAndCycle:[],
    rateAndCycle:[],
  },

  //用户列表
  userList:[],
  //用户列表总数
  userListnumber:0,

  //活动列表
  activityList:[],
  //活动列表总数
  activityListnumber:0,

  //状态列表
  stateList:[],

  //方案列表
  programmeList:[],
  //方案列表总数
  programmeListnumber:0,

  //报表列表
  reportFormList:[],
  //报表列表总数
  reportFormListnumber:0,

  //外勤列表
  visitplanList:[],
  //外勤列表总数
  visitplanListnumber:0,
  
  //任务列表
  missionplanList:[],
  //任务列表总数
  missionplanListnumber:0,

  //短信模板列表
  smstempList:[],
  //短信模板列表总数
  smstempListnumber:0,

  //短信日志列表
  SMSlogList:[],
  //短信日志列表总数
  SMSlogListnumber:0,

  //操作日志列表
  logList:[],
  //操作日志列表总数
  logListnumber:0,

  //短信雷达列表
  SMSradarList:[],
  //短信雷达列表总数
  SMSradarListnumber:0,

  //产品列表
  productList:[],
  //产品列表总数
  productListnumber:0,

  //订单列表
  orderList:[],
  //订单列表总数
  orderListnumber:0,

  //审批流程列表
  approvalProcessList:[],
  //审批流程列表总数
  approvalProcessListnumber:0,

  //工单列表
  workOrderList:[],
  //工单列表总数
  workOrderListnumber:0,

  //经验库列表
  experienceBaseList:[],
  //经验库列表总数
  experienceBaseListnumber:0,

  //客户跟进记录ID
  customfollowId:null,

  //应收回款列表
  receiveList:[],
  //应收惠匡列表总数
  receiveListnumber:0,

  //培育池列表
  culturePondList:[],
  //培育池列表总数
  culturePondListnumber:0,

  //当前时间
  nowtime:null,
}
/*配置全局函数*/
const mutations = {
  newAuthor(state,msg){
    state.author = msg;
  },
  iscId(state,msg){
    state.iscId = msg;
    localStorage.setItem('iscId',msg);
  },
  ispId(state,msg){
    state.ispId = msg;
    localStorage.setItem('ispId',msg);
  },
  user(state,msg){
    state.user = msg;
    localStorage.setItem('user',msg);
  },
  deptid(state,msg){
    state.deptid = msg;
    localStorage.setItem('deptid',msg);
  },
  roleid(state,msg){
    state.roleid = msg;
    localStorage.setItem('roleid',msg);
  },
  insid(state,msg){
    state.insid = msg;
    localStorage.setItem('insid',msg);
  },
  portrait(state,msg){
    state.portrait = msg;
    localStorage.setItem('portrait',msg)
  },
  getNowTime(){
    let myDate = new Date()
    let y = myDate.getFullYear() //获取完整的年份(4位,1970-????)
    let m = myDate.getMonth() + 1 //获取当前月份(0-11,0代表1月)
    let d = myDate.getDate() //获取当前日(1-31)
    let h = myDate.getHours() //获取当前小时数(0-23)
    let mm = myDate.getMinutes() //获取当前分钟数(0-59)
    let s = myDate.getSeconds() //获取当前秒数(0-59)
    m = (m < 10 ? "0" + m : m)
    d = (d < 10 ? "0" + d : d)
    h = (h < 10 ? "0" + h : h)
    mm = (mm < 10 ? "0" + mm : mm)
    s = (s < 10 ? "0" + s : s)
    state.nowtime = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
  },
  getNowDate(){
    let myDate = new Date()
    let y = myDate.getFullYear() //获取完整的年份(4位,1970-????)
    let m = myDate.getMonth() + 1 //获取当前月份(0-11,0代表1月)
    let d = myDate.getDate() //获取当前日(1-31)
    m = (m < 10 ? "0" + m : m)
    d = (d < 10 ? "0" + d : d)
    state.nowdate = y + '-' + m + '-' + d
  },

}

/*将store导出*/
const store = new Vuex.Store({
  state: state,
  mutations: mutations,
})

export default store;