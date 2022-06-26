const actions = {
    saveCurrentLyric({commit},LyricData){
        console.log(LyricData);
        commit("SAVECURRENTLYRIC",LyricData)
    }
}

const mutations = {
    //显示悬浮歌词
	showFloatLyric(state) {
		state.showFloatLyric = !state.showFloatLyric;
	},
    //当前播放歌曲歌词 用于浮动歌词显示
	SAVECURRENTLYRIC(state, LyricData) {
		state.currentLyric = LyricData;
	},
}

const getters = {
    showFloatLyric(state){
        return state.showFloatLyric
    },
    currentLyric(state){
        return state.currentLyric
    }
}

const state = {
    //是否显示悬浮歌词
    showFloatLyric:false,
    // 当前播放歌曲歌词
	currentLyric: [],
}

export default {
    actions,
    state,
    mutations,
    getters
}