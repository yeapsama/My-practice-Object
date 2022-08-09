import {request} from './requests.js'

// 获取搜索热榜列表
export const getSearchHotWord = () => request({url:'/search/hot/detail'})
// export function getSearchHotWord(){
//     return request({
//         url:'/search/hot/detail'
//     })
// }

//获取搜索结果最佳匹配
export const getGoodMatch = (keywords) => request({url:'/search/multimatch',params:{keywords}})

//获取搜索单曲
/*
limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
*/
export const getSearchSong = (keywords,offset,type=1,limit=50) => request({url:'/cloudsearch',params:{keywords,offset,type,limit}})