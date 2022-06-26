import {reqGetYzmCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLoginOut} from '@/api'

const state = {
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
};

const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    //用户登录
    USERLOGIN(state,token){
        state.token = token;
    },
    //获取用户信息
    GETUSERINFO(state,user){
        state.userInfo = user;
    },
    //退出登录
    CLEARUSERINFO(state){
        state.token = '',
        state.userInfo = '',
        localStorage.removeItem('TOKEN')
    }
};

const actions = {
    //获取验证码的action
   async getCode({commit},phone){
       let result =await reqGetYzmCode(phone);
        if(result.code == 200){
            commit('GETCODE',result.data);
            return 'ok'
        }else{
            return Promise.reject('failer')
        }
    },

    //完成注册
   async userRegister1(user){
       let result = await reqUserRegister(user);
       console.log(result);
       if(result.code == 200){
        return 'ok'
    }else{
        return Promise.reject(new Error('failer'))
    }
    },

    //用户登录
   async userLogin({commit},data){
       let result = await reqUserLogin(data)
       if(result.code == 200){
           commit('USERLOGIN',result.data.token);
           localStorage.setItem('TOKEN',result.data.token);
           return 'ok'
       }else{
           return Promise.reject(new Error('failer'))
       }
    },

    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        // console.log(result);
        if(result.code == 200){
            commit('GETUSERINFO',result.data)
            return "ok"
        }else{
            return Promise.reject(new Error('failer'))
        }
    },
    //退出登录
    async userLoginOut({commit}){
        let result = await reqLoginOut();
        if(result.code == 200){
            commit('CLEARUSERINFO')
            return "ok"
        }else{
            return Promise.reject(new Error('failer'))
        }
    }
};

const getters = {
    getUserInfo(state){
        return state.userInfo.name
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}