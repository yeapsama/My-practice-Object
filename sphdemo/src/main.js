import Vue from 'vue'
import App from './App.vue'
//配置路由
import router from '@/router'
//配置仓库
import store from "./store"
//注册全局组件
import TypeNav from "@/components/TypeNav"
import Pagination from "@/components/Pagination"
//引入模拟数据
import "@/mock/mockServe"

import "swiper/css/swiper.css"

Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)

Vue.config.productionTip = false

// 将api内方法全部引入，这是pay页面不用vuex时的另一种方法
import * as API from "@/api"


//注册使用elementui
import {MessageBox} from "element-ui"
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert
// import {reqCategoryList} from "./api/index"
// reqCategoryList()

//引入图片懒加载的插件
import VueLazyload from 'vue-lazyload'
import logo from '@/assets/logo.png'
Vue.use(VueLazyload, {
  loading: logo,
})
//引入表单校验插件
import "@/plugins/validate";

new Vue({
  render: h => h(App),
  beforeMount() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store
}).$mount('#app')
