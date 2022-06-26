import {reqCategoryList,reqGetBannerList,reqGetFloorList} from "@/api"

const state = {
    categoryListData:[],
    bannerListData:[],
    floorListData:[],
}
const actions = {
   async categroyList({commit}){
      let result = await reqCategoryList();
      if(result.code == 200){
          let r2 = result.data.splice(0,16);
        commit("CATEGORYLIST",r2)
      }
    },

   async getBannerList({commit}){
      let x = await reqGetBannerList();
      if(x.code == 200){
          commit("GETBANNERLIST",x.data)
      }
    },
    async getFloorList({commit}){
       let f = await reqGetFloorList();
       if(f.code == 200){
           commit("GETFLOORLIST",f.data)
       }
    }
}
const mutations = {
    CATEGORYLIST(state,categorylist){
        state.categoryListData = categorylist
    },
    GETBANNERLIST(state,bannerData){
        state.bannerListData = bannerData;
    },
    GETFLOORLIST(state,floorData){
        state.floorListData = floorData;
    }
}
const getters = {

}

export default {
    // namespaced:true,
    state,
    actions,
    mutations,
    getters
}