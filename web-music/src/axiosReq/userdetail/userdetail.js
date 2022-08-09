import { request } from '../requests'
// 获取用户详情
export const getUserDetail = (uid) => request({url:'/user/detail',params:{uid, timestamp:Date.parse(new Date()),}})

// 获取用户歌单
/*
uid  : 用户id

limit : 返回数量 , 默认为 30

offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
*/
export const getUserSonglist = (uid) => request({url:'/user/playlist',params:{uid,timestamp:Date.parse(new Date()),limit:1000}})

// 获取用户关注列表
export const getUserFollows = (uid,offset) => request({ url:'/user/follows',params:{uid,offset,limit:48,timestamp:Date.parse(new Date())}})

// 关注用户
export const subUser = (t,id) => request({ url:'/follow',params:{t,id,timestamp:Date.parse(new Date())}})

