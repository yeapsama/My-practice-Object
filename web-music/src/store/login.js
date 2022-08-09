const actions = {
    /* 更新登录状态 */
	updateLogin({ commit }, payload) {
		commit("UPDATELOGIN", payload);
	},
    /* 保存用户信息 */
	saveUserInfo({ commit }, payload) {
		commit("SAVEUSERINFO", payload);
	},
    /* 保存用户歌单 */
	saveUserSongList({ commit }, payload) {
		commit("SAVEUSERSONGLIST", payload);
	},
    // 用户喜欢的音乐id列表
	saveLikeSongIds({ commit }, payload) {
		commit("SAVELIKESONGIDS", payload);
	},
    /* 保存用户关注列表 */
	saveUserFollowsList({ commit }, payload) {
		commit("SAVEUSERFOLLOWSLIST", payload);
	},
}

const mutations = {
    UPDATELOGIN(state,payload){
        state.isLogin = payload
    },
    SAVEUSERINFO(state,payload){
        state.userInfo = payload
    },
    SAVEUSERSONGLIST(state,payload){
        state.userSongList = payload
    },
    SAVELIKESONGIDS(state,payload){
        state.likeSongIds = payload
    },
    SAVEUSERFOLLOWSLIST(state,payload){
        state.userFollowsList = payload
    }
}
const getters = {
    isLogin(state){
        return state.isLogin
    },
    userInfo(state){
        return state.userInfo
    },
    userSongList(state){
        return state.userSongList
    },
    userFollowsList(state){
        return state.userFollowsList
    },
    likeSongIds(state){
        return state.likeSongIds
    }
}

const state = {
    // 是否登录
	isLogin: localStorage.getItem("isLogin") ? JSON.parse(localStorage.getItem("isLogin")) : false,
    // 用户信息 如果缓存中有就取出来，没有则为空
	userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    // 用户私人歌单
	userSongList: localStorage.getItem("userSongList") ? JSON.parse(localStorage.getItem("userSongList")) : [],
	// 用户喜欢的音乐id列表
	likeSongIds: localStorage.getItem("likeSongIds") ? JSON.parse(localStorage.getItem("likeSongIds")) : [],
    // 用户的关注列表
	userFollowsList: [],
}

export default {
    namespaced:true,
    actions,
    mutations,
    getters,
    state
}