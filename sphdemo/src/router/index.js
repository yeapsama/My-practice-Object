import Vue from "vue";
import VueRouter from "vue-router"

import routes from "./routers"
Vue.use(VueRouter);

import store from "@/store"
//解决NavigationDuplicated问题
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}

let routertest = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return {y:0}
    }
})
//全局路由守卫
routertest.beforeEach(async (to,from,next)=>{
    // console.log(store);
    let name = store.state.user.userInfo.name;
    if(store.state.user.token){
        //如果登陆了再想去登陆页面则失效
        if(to.path == "/login"){
            next(false)   
        }else{
            //如果登陆了想去其他页面
            if(name){
                //如果有名字则放行
                next()
            }else{
                //如果没名字则派发请求获取名字
               await store.dispatch('getUserInfo').then(()=>{
                    next();
                },(error)=>{
                    //失败则说明token失效了，得清除token再让用户去登录
                    localStorage.removeItem('TOKEN');
                    next("/login")
                })
            }
        }
    }else{
        //未登录
        let toPath = to.path;
        //未登录不能去交易页、支付相关页面和个人中心
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            next('/login?goToWhere='+toPath)
        }else{
            next();
        }
    }
})
export default routertest