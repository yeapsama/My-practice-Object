import { reqGetSearchList } from "@/api"

const state = {
    searchListData:{}
}
const actions = {
   async GetSearchData({commit},prams = {}){
       let d = await reqGetSearchList(prams);
        if(d.code == 200){
            commit("GETSEARCHDATA",d.data)
        }
    }
}
const mutations = {
    GETSEARCHDATA(state,searchData){
        state.searchListData = searchData;
    }
}
const getters = {
    attrsList(state){
       return state.searchListData.attrsList||{};
    },
    goodsList(state){
        return state.searchListData.goodsList||{};
    },
    trademarkList(state){
        return state.searchListData.trademarkList||{};
    },
}
export default {
    // namespaced:true,
    state,
    mutations,
    actions,
    getters
}