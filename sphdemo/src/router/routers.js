/* 
//引入路由组件
import Login from "@/pages/Login"
import Search from "@/pages/Search"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"
import addCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySucess from '@/pages/PaySuccess'
import Center from "@/pages/Center"

//二级路由
import groupOrder from '@/pages/Center/groupOrder'
import myOrder from '@/pages/Center/myOrder'
*/

/*
路由懒加载：
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
 */

/*
用法举例：
// 将
// import UserDetails from './views/UserDetails'
// 替换成
const UserDetails = () => import('./views/UserDetails')

const router = createRouter({
  // ...
  routes: [{ path: '/users/:id', component: UserDetails }],
})
简化写法：
component:()=>import('./views/UserDetails'),
*/
export default [
    {
        path:"/center",
        component:()=>import('@/pages/Center'),
        meta:{isshow:true},
        //二级路由
        children:[
            {
                path:'grouporder',
                component:()=>import('@/pages/Center/groupOrder')
            },
            {
                path:'myorder',
                component:()=>import('@/pages/Center/myOrder'),
            },
            {
                // 重定向
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
            
    },
    {
        path:"/paysucess",
        component:()=>import('@/pages/PaySuccess'),
        meta:{isshow:true}
    },
    {
        path:"/pay",
        component:()=>import('@/pages/Pay'),
        meta:{isshow:true},
        beforeEnter: (to, from, next) => {
            if(from.path == '/trade'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path:"/trade",
        component:()=>import('@/pages/Trade'),
        meta:{isshow:true},
        //必须得是从购物车页面来才能到支付成功页面
        beforeEnter: (to, from, next) => {
            if(from.path == '/shopcart'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path:"/shopcart",
        component:()=>import('@/pages/ShopCart'),
        meta:{isshow:true}
    },
    {
        path:"/addcartsuccess",
        name:"addCartSuccess",
        component:()=>import('@/pages/AddCartSuccess'),
        meta:{isshow:true}
    },
    {
        path:"/detail/:id?",
        component:()=>import('@/pages/Detail'),
        meta:{isshow:true}
    },
    {
        path:"/home",
        component:()=>import('@/pages/Home'),
        meta:{isshow:true}
    },
    {
        path:"/login",
        component:()=>import('@/pages/Login'),
        meta:{isshow:false}
    },
    {
        name:"search",
        path:"/search/:keyword?",
        component:()=>import('@/pages/Search'),
        meta:{isshow:true}
    },
    {
        path:"/register",
        component:()=>import('@/pages/Register'),
        meta:{isshow:false}
    },
    //重定向
    {
        path:"*",
        redirect:"/home"
    },
]