import { request } from "../requests";

// 获取歌单详情
export const getSongListDetail = (id) => request({ url: "/playlist/detail",params:{id , timestamp:Date.parse(new Date())}})

// 获取每首歌的详细信息
//音乐id(支持多个id, 用 , 隔开)
export const getEverySongDetail = (ids) => request({url: "/song/detail",params:{ids}})

// 获取歌单的收藏者
export const getSongListSubscribers = (id , offset) => request({url: "/playlist/subscribers",params:{id,offset,limit:48}})

// 收藏/取消收藏歌单
export const subSongList = (t , id) => request({url: "/playlist/subscribe", params:{t,id, timestamp:Date.parse(new Date())}})