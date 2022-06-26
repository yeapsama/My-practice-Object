//播放歌曲仓库

const actions = {
    //保存歌曲url
    saveSongUrl({commit},songData){
        commit('SAVESONGURL',songData)
    },
    //保存当前歌曲的详情信息
    saveSongDetail({commit},songData){
        commit('SAVESONGDETAIL',songData)
    },
    //添加单曲到当前播放列表
	addPlayinglist({ commit }, payload) {
		commit("ADDPLAYINGLIST", payload);
	},
    //改变播放状态，true为播放，false为暂停
    changePlayState({commit},isplay){
        commit("CHANGEPLAYSTATE",isplay)
    },
    
    saveCurrentSeconds({commit},cur){
        commit("SAVECURRENTSECONDS",cur)
    },

    //是否打开歌词展示页
    showSongDetail({commit},flag){
        commit("SHOWSONGDETAIL",flag)
    },
    //删除某一首播放列表的歌曲
    deleteSong({commit},item){
        commit("DELETESONG",item)
    },
    //删除全部播放列表的歌曲
    deleteAll({commit},item){
        commit("DELETEALL",item)
    },
    // 删除历史记录单曲
	deleteHistory({ commit }, payload) {
		commit("DELETEHISTORY", payload);
	},
    // 清空历史记录
	deleteAllHistory({ commit }) {
		commit("DETELEALLHISTORY");
	},
    
}

const mutations = {
    //保存歌曲url
    SAVESONGURL(state,songData){
        state.songUrl = songData
    },
    //保存当前播放歌曲详情,并且添加当前播放歌曲到播放历史记录
    SAVESONGDETAIL(state,songData){
        //更新当前歌曲信息
        state.nowSongDetail = songData
        //把当前歌曲信息保存到本地
        localStorage.setItem("nowSongDetail", JSON.stringify(state.nowSongDetail))
        //添加当前播放歌曲到播放历史记录
        let flag = state.historyPlay.some(item =>{
            return item.id == songData.id
        })
        //当历史记录没有该歌曲时候才添加
        if(!flag){
            state.historyPlay.unshift(songData)
            localStorage.setItem('historyPlay',JSON.stringify(state.historyPlay))
        }
    },
    //添加单曲到当前播放列表
    ADDPLAYINGLIST(state,songData){
        // 列表查找相同的歌曲
		let flag = state.playingList.some(item => {
			return item.id == songData.id;
		});
		//如果列表不存在相同的歌曲 再添加到播放列表
		if (!flag) {
			state.playingList.unshift(songData);
			localStorage.setItem("playingList", JSON.stringify(state.playingList));
		}
    },
    CHANGEPLAYSTATE(state,isplay){
        state.isPlaying = isplay
    },
    // 保存当前歌曲播放的实时秒数
	SAVECURRENTSECONDS(state, payload) {
		state.currentSecond = payload;
		localStorage.setItem("currentSecond", JSON.stringify(state.currentSecond));
	},
    //是否打开歌词展示页
    SHOWSONGDETAIL(state,flag){
    state.isShowSongDetail = flag
    },
    // 更新当前下载的音乐信息
	updateDownloadMusicInfo(state, payload) {
		state.downloadMusicInfo = payload;
	},
    //删除播放列表的单曲
    DELETESONG(state,songid){
        let index = state.playingList.findIndex(item=>{
            return songid == item.id
        })
        state.playingList.splice(index,1)
        localStorage.setItem("playingList",JSON.stringify(state.playingList))
    },
    //删除所有播放歌曲
    DELETEALL(state){
        state.playingList = []
        state.songUrl = ""
        state.nowSongDetail = {}
        state.isPlaying = false
        localStorage.removeItem("playingList")
        localStorage.removeItem("nowSongDetail")
        localStorage.removeItem("currentRow")
    },
    //删除历史记录单曲
    DELETEHISTORY(state,song){
        let index = state.historyPlay.findIndex(item =>{
            return song == item.id
        })
        state.historyPlay.splice(index,1)
        localStorage.setItem("historyPlay", JSON.stringify(state.historyPlay))
    },
    //删除历史记录
    DETELEALLHISTORY(state){
        state.historyPlay = []
        localStorage.setItem("historyPlay", JSON.stringify(state.historyPlay))
    },
    
}

const getters = {
    isPlaying(state){
        return state.isPlaying
    },
    songUrl(state){
        return state.songUrl
    },
    nowSongDetail(state){
        return state.nowSongDetail
    },
    playingList(state){
        return state.playingList
    },
    isShowSongDetail(state){
        return state.isShowSongDetail
    },
    currentSecond(state){
        return state.currentSecond
    },
    historyPlay(state){
        return state.historyPlay
    },
    
}

const state = {
    // 音乐播放状态
	isPlaying: false,
    //当前歌曲url
	songUrl: "",
    // 是否显示当前歌曲详情页
	isShowSongDetail: false,
    //当前下载列表
    downloadMusicInfo:{},
    // 当前歌曲详情
	nowSongDetail: localStorage.getItem("nowSongDetail") ? JSON.parse(localStorage.getItem("nowSongDetail")) : {},
    // 历史播放列表
	historyPlay: localStorage.getItem("historyPlay") ? JSON.parse(localStorage.getItem("historyPlay")) : [],
    //正在播放列表
	playingList: localStorage.getItem("playingList") ? JSON.parse(localStorage.getItem("playingList")) : [],
    // 当前歌曲播放的实时秒数
	currentSecond: localStorage.getItem("currentSecond") ? JSON.parse(localStorage.getItem("currentSecond")) : 0,
}

export default {
    state,
    actions,
    mutations,
    getters
}