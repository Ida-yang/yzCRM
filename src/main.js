import Vue from 'vue';
import ElementUI from 'element-ui';
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import './assets/iconfont/iconfont.css';
import axios from 'axios'

import App from './App.vue';
import router from './router';
import vuex from 'vuex'
import store from './store/store';
import VueResource from 'vue-resource';

import base from './base';

Vue.use(base)

Vue.use(VueResource);
Vue.use(ElementUI);
Vue.prototype.$axios = axios;


// var lastTime = new Date().getTime();//最后操作时间 
// var currentTime = new Date().getTime();//当前时间
// var timeOut = 3 * 60 * 60 * 1000; //设置超时时间： 3小时

   
  // http response 拦截器
  // axios.interceptors.response.use(
  // response => {
  //   if(response.data && response.data.code && response.data.code == 1005) {
  //     // Message({
  //     //   message: response.data.message,
  //     //   type: 'error'
  //     // });
  //     Message.error(response.data.message);
  //     setTimeout(() => {
  //       router.push({ path: '/login' });
  //     }, 1000);
  //   }
  //   return response;
  // },
  // error => {
   
  //   if (error.response) {
  //     switch (error.response.status) {
  //       case 401:
  //       this.$store.commit('del_token');
  //         router.replace({
  //         path: '/login',
  //         query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
  //       })
  //   }
  // }
  // return Promise.reject(error.response.data)
  // });
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App),
  created(){
    if(localStorage.getItem('iscId')===null){
      localStorage.setItem('iscId','')
    }
    if(localStorage.getItem('ispId')===null){
      localStorage.setItem('ispId','')
    }
    if(localStorage.getItem('user')===null){
      localStorage.setItem('user','')
    }
    if(localStorage.getItem('deptid')===null){
      localStorage.setItem('deptid','')
    }
    if(localStorage.getItem('roleid')===null){
      localStorage.setItem('roleid','')
    }
    if(localStorage.getItem('insid')===null){
      localStorage.setItem('insid','')
    }
    this.$store.state.iscId = localStorage.getItem('iscId');//存放cId
    this.$store.state.ispId = localStorage.getItem('ispId');//存放pId
    this.$store.state.user = localStorage.getItem('user');//存放用户名
    this.$store.state.deptid = localStorage.getItem('deptid');//存放部门编号
    this.$store.state.roleid = localStorage.getItem('roleid');//存放角色编号
    this.$store.state.insid = localStorage.getItem('insid');//存放机构编号
    // if(this.$store.state.userData == null){
    //   this.$store.state.userData = JSON.parse(localStorage.getItem('userData'))
    // }
  },
  mounted() {
    this.loadHandler()
  },
  methods:{
    loadHandler(){
      // console.log(localStorage)
      if(!localStorage.ispId){
        this.$router.push('/login')
      }
    }
  }
});

router.beforeEach((to, from, next) => {
  // console.log(localStorage)
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    // console.log('需要登录');
    if(localStorage.ispId) { // 判断当前的ispId是否存在 ； 登录存入的ispId
      next();
    }else {
      next({
        path: '/login',
        // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }else {
    next();
  }
});