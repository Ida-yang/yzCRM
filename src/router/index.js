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
          meta: { title: '欢迎页面' ,requireAuth:true}
        },
        {
          path: '/welcome',
          component: resolve => require(['../components/index/page/welcome.vue'], resolve),
          meta: { title: '欢迎页面' ,requireAuth:true}
        },
        {
          path: '/customerSearch',
          component: resolve => require(['../components/index/page/customerSearch/customerSearch.vue'], resolve),
          meta: { title: '搜索客户',name:'customerSearch' ,requireAuth:true}
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
          meta: { title: '合同详情',name:'agreementDetails' ,requireAuth:true}
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
          path: '/suibian',
          component: resolve => require(['../components/index/page/organization/name.vue'], resolve),
          meta: { title: '随便',name:'suibian' ,requireAuth:true}
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
          meta: { title: '方案/目标',name:'programme' ,requireAuth:true}
        },
        {
          path: '/programmeDetails',
          component: resolve => require(['../components/index/page/programme/programmeDetails.vue'], resolve),
          meta: { title: '方案/目标详情',requireAuth:true}
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
export default  router
