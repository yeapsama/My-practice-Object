import {reqAddressInfo,reqOderInfo} from "@/api"
const state = {
    address:[],
    oderInfo:{}
};

const mutations = {
    //获取用户地址
    GETUSERADDRESS(state,address){
        state.address = address;
    },
    //获取交易商品信息
    GETODERINFO(state,info){
        state.oderInfo = info;
    }
};

const actions = {
    //获取用户地址
   async getUserAddress({commit}){
        let result = await reqAddressInfo();
        // console.log(result);
        if(result.code == 200){
            commit('GETUSERADDRESS',result.data)
        }
    },

    //获取交易页商品信息
   async getOderInfo({commit}){
      let result = await reqOderInfo();
      if(result.code == 200){
          commit('GETODERINFO',result.data);
      }
    }
};

const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}