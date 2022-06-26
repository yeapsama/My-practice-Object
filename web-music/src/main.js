import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

/**使用图片懒加载**/
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
	loading: require("./assets/imgs/loadImg.gif"),
	error: require("./assets/imgs/error.png"),
	attempt: 6,
	observer: true,
});

/**
 * 自定义全局过滤器
 */
//  格式化大于10000的数字
import formatNum from "./utils/formatNum";
Vue.use(formatNum);
// 格式化时长
import formatDuration from "./utils/formDuration";
Vue.use(formatDuration);
/**
 * 全局读取loacaStorage
 */
 import { setItem, getItem, removeItem } from "./utils/utils.js";
 Vue.prototype.setItem = setItem;
 Vue.prototype.getItem = getItem;
 Vue.prototype.removeItem = removeItem;


Vue.config.productionTip = false

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')
