import vue from "vue"
import vuex from "vuex"

//播放歌曲仓库
import playSong from './playSong'
//登录仓库
import login from './login'

//悬浮歌词
import floatLyric from './floatLyric'

vue.use(vuex);

export default new vuex.Store({
    modules:{
        playSong,
        login,
        floatLyric
    }
})