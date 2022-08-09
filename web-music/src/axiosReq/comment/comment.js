import {request} from '../requests'

// 获取所有资源热门评论(有的歌单会没有数据)
export const getHotComment = (type , id , offset) => request({url:'/comment/hot',params:{type,id,offset,limit:60, timestamp:Date.parse(new Date())}})

// 获取最新评论（封装了一下，传入资源类型，用作判断）
  export const getNewCommentList = (type , id , offset) => request({url: `/comment/${type}`,params:{id,offset,limit:60,timestamp:Date.parse(new Date())}})

// 获取评论的通用接口，但是返回的评论数据没有被回复的评论（上面的获取热门评论没有数据时使用这个接口）
/*
    type:类型，0歌曲，1mv，2歌单，3专辑，4电台，5视频，6动态
    pageNo：分页器第几页
    pageSize:分页器每页多少条数据
    sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
    cursor: 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
*/
export const getComment = (type , id , pageNo) => request({url:'/comment/new',params:{type,id,pageNo,sortType:2,pageSize:60,timestamp:Date.parse(new Date())}})

// 发送评论
/*
id:对应资源 id

content :要发送的内容

commentId :回复的评论 id (回复评论时必填)
*/
export const sendComment = (type , id , content) => request({url:'/comment',params:{t:1,type,id,content,timestamp:Date.parse(new Date())}})

// 回复评论
export const replyComment = (type , id , content , commentId) => request({url:'/comment',params:{t:2,type,id,content,commentId,timestamp:Date.parse(new Date())}})

// 给评论点赞
export const isLikeComment = (id , type , cid) => request({url:'/comment/like',params:{id,type,cid,t,timestamp:Date.parse(new Date())}})
