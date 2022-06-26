import { request } from "../requests";

// 获取歌曲URL
// function getSongUrl(id){
//     return request({
//         url:'/song/url',
//         params:{
//             id
//         }
//     })
// }
// 获取歌曲URL
export const getSongUrl = id => request({url:'/song/url',params:{id}})

//检查歌曲是否可用
export const checkSong = id => request({url:'/check/music',params:{id}})

// 获取每首歌的详细信息     支持多个id, 用 , 隔开
export const getEverySongDetail = ids => request({url:'/song/detail',params:{ids}})

//喜欢当前音乐
export const likeNowSong = (id,like) => request({url:'/like',params:{id,like,timestamp:Date.parse(new Date())}})

//获取用户喜欢的歌曲列表
export const getLikeSongList = uid => request({url:'/likelist',params:{uid,timestamp:Date.parse(new Date())}})

//获取歌词
export const getNowLyric = id => request({url:'/lyric',params:{id}})


