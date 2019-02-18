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

// import echarts from 'echarts'

import base from './base';

import VueAreaLinkage from 'vue-area-linkage';


Vue.use(base)

Vue.use(VueAreaLinkage)

Vue.use(VueResource);
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

// Vue.prototype.$echarts = echarts 

var lastTime = new Date().getTime();//最后操作时间 
var currentTime = new Date().getTime();//当前时间
var timeOut = 3 * 60 * 60 * 1000; //设置超时时间： 3小时

   
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
    this.$store.state.iscId = localStorage.getItem('iscId');
    this.$store.state.ispId = localStorage.getItem('ispId');
    this.$store.state.user = localStorage.getItem('user');
    this.$store.state.deptid = localStorage.getItem('deptid');
    this.$store.state.roleid = localStorage.getItem('roleid');
    this.$store.state.insid = localStorage.getItem('insid');
    // if(this.$store.state.userData == null){
    //   this.$store.state.userData = JSON.parse(localStorage.getItem('userData'))
    // }
  }
});