import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
  

const router =new Router({
  
  // mode: "history",/**** 部署时要删除（注释），再进行打包 ****/
  
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/',
      component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
      path: '/login',
      component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
      path: '/activity',
      component: resolve => require(['../components/activity.vue'], resolve)
    },
    {
      path:'/index',
      component:resolve => require(['../components/index/index.vue'], resolve),
      meta: { title: '首页' ,requireAuth:true},
      children:[
        {
          path: '/',
          component: resolve => require(['../components/index/page/welcome.vue'], resolve),
          meta: { title: '首页' ,requireAuth:true}
        },
        {
          path: '/index',
          component: resolve => require(['../components/index/page/welcome.vue'], resolve),
          meta: { title: '首页' ,requireAuth:true}
        },
        {
          path: '/customerSearch',
          component: resolve => require(['../components/index/page/customerSearch/customerSearch.vue'], resolve),
          meta: { title: '线索挖掘',name:'customerSearch' ,requireAuth:true}
        },
        {
          path: '/reportForm',
          component: resolve => require(['../components/index/page/reportForm/reportForm.vue'], resolve),
          meta: { title: '获客报表',name:'reportForm' ,requireAuth:true}
        },
        {
          path: '/clue',
          component: resolve => require(['../components/index/page/clue/clue.vue'], resolve),
          meta: { title: '线索',name:'clue' ,requireAuth:true}
        },
        {
          path: '/clueDetails',
          component: resolve => require(['../components/index/page/clue/clueDetails.vue'], resolve),
          meta: { title: '线索详情' ,requireAuth:true}
        },
        {
          path: '/clueaddorupdate',
          component: resolve => require(['../components/index/page/AddAndUpdate/clueaddorupdate.vue'], resolve),
          meta: { title: '编辑线索' ,requireAuth:true}
        },
        {
          path: '/cluePool',
          component: resolve => require(['../components/index/page/clue/cluePool.vue'], resolve),
          meta: { title: '线索池',name:'cluePool' ,requireAuth:true}
        },
        {
          path: '/customer',
          component: resolve => require(['../components/index/page/customer/customer.vue'], resolve),
          meta: { title: '客户',name:'customer' ,requireAuth:true}
        },
        {
          path: '/customerDetails',
          component: resolve => require(['../components/index/page/customer/customerDetails.vue'], resolve),
          meta: { title: '客户详情' ,requireAuth:true}
        },
        {
          path: '/customeraddorupdate',
          component: resolve => require(['../components/index/page/AddAndUpdate/customeraddorupdate.vue'], resolve),
          meta: { title: '编辑客户' ,requireAuth:true}
        },
        {
          path: '/customerPool',
          component: resolve => require(['../components/index/page/customer/customerPool.vue'], resolve),
          meta: { title: '客户池',name:'customerPool' ,requireAuth:true}
        },
        {
          path: '/contacts',
          component: resolve => require(['../components/index/page/contacts/contacts.vue'], resolve),
          meta: { title: '联系人',name:'contacts' ,requireAuth:true}
        },
        {
          path: '/contactsaddorupdate',
          component: resolve => require(['../components/index/page/AddAndUpdate/contactsaddorupdate.vue'], resolve),
          meta: { title: '编辑联系人' ,requireAuth:true}
        },
        {
          path: '/agreement',
          component: resolve => require(['../components/index/page/agreement/agreement.vue'], resolve),
          meta: { title: '合同',name:'agreement' ,requireAuth:true}
        },
        {
          path: '/agreementDetails',
          component: resolve => require(['../components/index/page/agreement/agreementDetails.vue'], resolve),
          meta: { title: '合同详情' ,requireAuth:true}
        },
        {
          path: '/agreementaddorupdate',
          component: resolve => require(['../components/index/page/AddAndUpdate/agreementaddorupdate.vue'], resolve),
          meta: { title: '编辑合同' ,requireAuth:true}
        },
        {
          path: '/businessOpportunity',
          component: resolve => require(['../components/index/page/businessOpportunity/businessOpportunity.vue'], resolve),
          meta: { title: '商机',name:'businessOpportunity' ,requireAuth:true}
        },
        {
          path: '/businessOpportunityDetails',
          component: resolve => require(['../components/index/page/businessOpportunity/businessOpportunityDetails.vue'], resolve),
          meta: { title: '商机详情' ,requireAuth:true}
        },
        {
          path: '/Opportunityaddorupdate',
          component: resolve => require(['../components/index/page/AddAndUpdate/Opportunityaddorupdate.vue'], resolve),
          meta: { title: '编辑商机' ,requireAuth:true}
        },
        {
          path: '/organization',
          component: resolve => require(['../components/index/page/organization/organization.vue'], resolve),
          meta: { title: '组织机构',name:'organization' ,requireAuth:true}
        },
        {
          path: '/user',
          component: resolve => require(['../components/index/page/user/user.vue'], resolve),
          meta: { title: '用户管理',name:'user' ,requireAuth:true}
        },
        {
          path: '/basicset',
          component: resolve => require(['../components/index/page/basicset/basicset.vue'], resolve),
          meta: { title: '辅助资料',name:'basicset' ,requireAuth:true}
        },
        {
          path: '/socialMarketing',
          component: resolve => require(['../components/index/page/socialMarketing/socialMarketing.vue'], resolve),
          meta: { title: '社交营销',name:'socialMarketing' ,requireAuth:true}
        },
        {
          path: '/programme',
          component: resolve => require(['../components/index/page/programme/programme.vue'], resolve),
          meta: { title: '目标',name:'programme' ,requireAuth:true}
        },
        {
          path: '/programmeDetails',
          component: resolve => require(['../components/index/page/programme/programmeDetails.vue'], resolve),
          meta: { title: '目标详情',requireAuth:true}
        },
        {
          path: '/visitplan',
          component: resolve => require(['../components/index/page/work/visitplan.vue'], resolve),
          meta: { title: '外勤',name:'visitplan', requireAuth:true}
        },
        {
          path: '/visitplandetails',
          component: resolve => require(['../components/index/page/work/visitplandetails.vue'], resolve),
          meta: { title: '外勤详情' ,requireAuth:true}
        },
        {
          path: '/visitplanaddorupdate',
          component: resolve => require(['../components/index/page/AddAndUpdate/visitplanaddorupdate.vue'], resolve),
          meta: { title: '编辑外勤' ,requireAuth:true}
        },
        {
          path: '/missionplan',
          component: resolve => require(['../components/index/page/work/missionplan.vue'], resolve),
          meta: { title: '任务',name:'missionplan', requireAuth:true}
        },
        {
          path: '/missionplanaddorupdate',
          component: resolve => require(['../components/index/page/AddAndUpdate/missionplanaddorupdate.vue'], resolve),
          meta: { title: '编辑任务' ,requireAuth:true}
        },
        {
          path: '/smstemp',
          component: resolve => require(['../components/index/page/smstemp/smstemp.vue'], resolve),
          meta: { title: '短信模板',name:'smstemp' ,requireAuth:true}
        },
        {
          path: '/SMSradar',
          component: resolve => require(['../components/index/page/smstemp/SMSradar.vue'], resolve),
          meta: { title: '短信雷达',name:'SMSradar' ,requireAuth:true}
        },
        {
          path: '/analysisReport',
          component: resolve => require(['../components/index/page/analysisReport/analysisReport.vue'], resolve),
          meta: { title: '商业智能',name:'analysisReport' ,requireAuth:true}
        },
        {
          path: '/logs',
          component: resolve => require(['../components/index/page/log/logs.vue'], resolve),
          meta: { title: '日志',name:'logs' ,requireAuth:true}
        },
        {
          path: '/product',
          component: resolve => require(['../components/index/page/product/product.vue'], resolve),
          meta: { title: '产品',name:'product' ,requireAuth:true}
        },
        {
          path: '/productdetails',
          component: resolve => require(['../components/index/page/product/productdetails.vue'], resolve),
          meta: { title: '产品详情页',requireAuth:true}
        },
        {
          path: '/productadd',
          component: resolve => require(['../components/index/page/AddAndUpdate/productadd.vue'], resolve),
          meta: { title: '编辑产品',requireAuth:true}
        },
        {
          path: '/productupdate',
          component: resolve => require(['../components/index/page/AddAndUpdate/productupdate.vue'], resolve),
          meta: { title: '编辑产品',requireAuth:true}
        },
        {
          path: '/order',
          component: resolve => require(['../components/index/page/order/order.vue'], resolve),
          meta: { title: '销售订单',name:'order',requireAuth:true}
        },
        {
          path: '/orderadd',
          component: resolve => require(['../components/index/page/AddAndUpdate/orderadd.vue'], resolve),
          meta: { title: '新增订单',requireAuth:true}
        },
        {
          path: '/orderupdate',
          component: resolve => require(['../components/index/page/AddAndUpdate/orderupdate.vue'], resolve),
          meta: { title: '编辑订单',requireAuth:true}
        },
        {
          path: '/approvalProcess',
          component: resolve => require(['../components/index/page/approvalProcess/approvalProcess.vue'], resolve),
          meta: { title: '审核流程',name:'approvalProcess',requireAuth:true}
        },
        {
          path: '/approvalProcessaddorupdate',
          component: resolve => require(['../components/index/page/AddAndUpdate/approvalProcessaddorupdate.vue'], resolve),
          meta: { title: '编辑审核流程',requireAuth:true}
        },
        {
          path: '/workOrder',
          component: resolve => require(['../components/index/page/workOrder/workOrder.vue'], resolve),
          meta: { title: '工单',name:'workOrder',requireAuth:true}
        },
        {
          path: '/workOrderDetail',
          component: resolve => require(['../components/index/page/workOrder/workOrderDetail.vue'], resolve),
          meta: { title: '工单详情页',requireAuth:true}
        },
        {
          path: '/jobClassification',
          component: resolve => require(['../components/index/page/workOrder/jobClassification.vue'], resolve),
          meta: { title: '新增工单',name:'jobClassification',requireAuth:true}
        },
        {
          path: '/workOrderaddorupdate',
          component: resolve => require(['../components/index/page/AddAndUpdate/workOrderaddorupdate.vue'], resolve),
          meta: { title: '编辑工单',requireAuth:true}
        },
        {
          path: '/experienceBase',
          component: resolve => require(['../components/index/page/workOrder/experienceBase.vue'], resolve),
          meta: { title: '经验库',name:'experienceBase',requireAuth:true}
        },
        {
          path: '/name',
          component: resolve => require(['../components/index/page/product/name.vue'], resolve),
          meta: { title: '名字',requireAuth:true}
        },
      ]
    },
        
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(r => r.meta.requireAuth)) {
//     if (sessionStorage.getItem('token')) {
//       next();
//     }else {
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}
//       })
//     }
//   }else {
//     next();
//   }
// })
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if(isChunkLoadFailed){
      router.replace(targetPath);
  }
})
export default  router
