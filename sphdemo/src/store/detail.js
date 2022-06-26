
import { reqGetGoodsInfo, reqUpdateShopCart} from "@/api";
import { getUUID } from "@/utils/uuid_tonken";
const state = {
    goodInfo:{},
    uuid_tonken:getUUID()
};

const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }
};

const actions = {
    //获取商品信息的action
   async getGoodInfo({commit},info){
        let result = await reqGetGoodsInfo(info);
        if(result.code == 200){
            commit('GETGOODINFO',result.data);
        }
    },
   async getShopCart({commit},{skuId,skuNum}){
        let result = await reqUpdateShopCart(skuId,skuNum);
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error("failer"))
        }
    }
};

const getters = {
    //路径导航简化的数据
    categoryView(state){
        return state.goodInfo.categoryView||{};
    },
    //简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },  
    //简化售卖属性的数据
    spuSaleAttriList(state){
        return state.goodInfo.spuSaleAttrList||[];
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}