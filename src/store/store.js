import Vue from 'vue'
import Vuex from 'vuex'
/*使用Vuex*/
Vue.use(Vuex)
/*配置全局数据*/
const state = {
  //配置访问地址
  defaultHttp: 'http://crm.yunzoe.com/yzcrm/', //线上服务器
  // defaultHttp:'http://192.168.1.105:8080/', //测试服务器

  //作者
  author:'Ida',
  //登录
  iscId:'', //cId
  ispId:'', //pId
  user:'', //用户名
  deptid:'', //部门ID
  roleid:'', //角色ID
  insid:'', //机构ID

  //标签页
  tagsList:[],

  //首页列表
  welcomeData:null,

  //添加或修改列表数据
  addOrUpdateData:null,
  //跳转详情页列表
  detailsData:null,


  //搜索客户列表
  customerList:[],
  //搜索客户列表总数
  customerListnumber: 0,

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

  //客户列表
  customerList:[],
  //客户列表总数
  customerListnumber:0,
  //客户详情页联系人列表
  customerDetailsList:null,
  //客户详情页商机列表
  opportunityDetailsList:null,
  //客户详情页合同列表
  agreementDetailsList:null,
  //客户详情页开票列表
  InvoiceDetailsLis:null,
  //客户列表数据
  customerData:null,
  //客户池列表
  customerPoolList:[],
  //客户池列表总数
  customerPoolListnumber:0,

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
  }

}

/*将store导出*/
const store = new Vuex.Store({
  state: state,
  mutations: mutations,
})

export default store;