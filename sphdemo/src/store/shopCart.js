import {reqGetShopCart,reqDeleteCartById,reqGetCheckedById} from "@/api"

const state = {
    carData:[],
};

const mutations = {
    GETSHOPCARTLIST(state,carData){
        state.carData = carData;
    }
};

const actions = {
    //获取购物车数据
   async getShopCartList({commit}){
        let result = await reqGetShopCart();
        // console.log(result);
        if(result.code == 200){
            commit('GETSHOPCARTLIST',result.data);
        }
    },

    //删除购物车某项数据
   async deleteCartListById({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code == 200){
            console.log("ok");
        }else{
            new Promise.reject(new Error('failer'))
        }
    },

    //修改购物车中的某一项是否勾选
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqGetCheckedById(skuId,isChecked);
        if(result.code == 200){
            console.log("ok");
        }else{
            new  Promise.reject(new Error('failer'))
        }
    },
    //删除选中购物车内容
    deleteAllCartItem({dispatch,getters}){
        let results = [];
        // console.log(getters.shopCarList.cartInfoList);
        getters.shopCarList.cartInfoList.forEach(item =>{
            if(item.isChecked == 1){
               let result = dispatch('deleteCartListById',item.skuId);
               //将执行的结果promise结果放进数组里
               results.push(result);
            }
        });
        //all遍历数组看是否全部成功，若成功则返回成功，否则返回失败
        return Promise.all(results)
    },
    //全选按钮功能
    changeAllIsChecked({dispatch,state},isChecked){
        let results = [];
        console.log(state);
        state.carData[0].cartInfoList.forEach(item =>{
           let result = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
           results.push(result)
        })
        return Promise.all(results)
    }
};

const getters = {
    // cartInfoList(state){
    //     return state.carData[0].cartInfoList||[];
    // }
    shopCarList (state) {
        return state.carData[0] || []
      }
    
};

export default {
    state,
    mutations,
    actions,
    getters
}
