// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios';
Vue.prototype.$axios = axios;
// Vue.prototype.qs = qs;

import VueSession from 'vue-session'
Vue.use(VueSession)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

axios.interceptors.request.use(
  config => {
  // 判断是否存在token，如果存在的话，则每个http header都加上token
    let token = sessionStorage.getItem('Authorization')
    debugger
    if (!config.headers.hasOwnProperty('Authorization') && token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

 
  axios.interceptors.response.use(
    response => {
      if (response.status === 200) {
        debugger
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    },
    // 服务器状态码不是200的情况
    error => {
      if (error.response.status) {
        switch (error.response.status) {
          case 401:
            router.replace({
              path: '/login',
              query: { redirect: router.currentRoute.fullPath }
            })
            break
          case 403:
            this.$message.error('登录过期，请重新登录')
            sessionStorage.removeItem('token')
            setTimeout(() => {
              router.replace({
                path: '/login',
                query: {
                  redirect: router.currentRoute.fullPath
                }
              })
            }, 1000)
            break
          case 404:
            this.$message.error('网络请求不存在')
            break
          // 其他错误，直接抛出错误提示
          default:
            this.$message.error(error.response.data.message)
        }
        return Promise.reject(error.response)
      }
    }
  )