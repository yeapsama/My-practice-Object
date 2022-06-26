import {request} from '../requests'

// 获取轮播图接口
export const getBanner = () => request({url:"/banner"})

//获取每日推荐歌单
export const getRecCommendBy = () => request({url:'/recommend/resource',params:{timestamp: Date.parse(new Date())}})

//获取每日推荐歌单无登录版本
export const getCommendByNotLogin = (limit) => request({url:"/personalized",params:{limit,timestamp: Date.parse(new Date()),}})

//获取最新MV
export const getNewMV = () => request({url:'/personalized/mv'})

//获取最新音乐
export const getNewMusic = (limit) => request({url:'/personalized/newsong',params:{limit}})

//获取独家放送
export const getPrivateContent = () => request({url:'personalized/privatecontent'})