import vue from "vue"
import vuex from "vuex"

import home from "./home"
import search from "./search"
import detail from "./detail"
import shopCart from "./shopCart"
import user from "./user"
import Trade from "./trade"
vue.use(vuex);



export default new vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopCart,
        user,
        Trade
    }
})