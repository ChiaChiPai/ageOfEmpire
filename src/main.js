// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'; //第三方套件放在前面
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'Bootstrap';
import VeeValidate, { Validator } from 'vee-validate'   //匯入檔案
import TW from 'vee-validate/dist/locale/zh_TW'    //匯入語言包
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import App from './App'; //自己寫的放後面
import router from './router';
import './bus';
import currencyFilter from './filter/Currency';
import toDate from './filter/toDate';

Vue.use(VeeValidate)  //啟用API
Validator.localize('zh-TW', TW)  //啟用語言包
Vue.use(VueAxios, axios);
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

Vue.component('Loading',Loading); //因為 Loading 是元件，必須被啟用，這邊用的是全域啟用
//將元件載入，可以在 vue template 中運用該套件但資料、方法仍然與執行中的元件分離
/* eslint-disable no-new */
Vue.filter('currency',currencyFilter);
Vue.filter('toDate',toDate);

// validator 自訂手機號碼檢查
const cellphone = {
  validate: (value) => {
    const reg = /^09[0-9]{8}$/;
    return reg.test(value);
  },
};
Validator.extend('cellphone', cellphone);


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  //設定導航守衛，避免使用者在沒登入的狀態下，直接進入後台
  if(to.meta.requiresAuth){ 
    //在 to(指定要到的路徑下)，如果指定到的路徑下有設定 meta.requiresAuth，進入後端驗證
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
    //因為不是在 component 的資料夾下，不能使用 this.$http，改用 axios
      console.log(response.data);
      if(response.data.success){ //登入成功後，跳轉到原來要去的路徑
        next();
      }else{
        next({
          path: '/login', //登入沒成功，回到原來的登入頁面
        });
      }
    });
  }else{//如果沒有 meta.requiresAuth，直接到指定路徑
    next();
  }
})
