import {request} from './requests.js'

// 获取搜索热榜列表
export const getSearchHotWord = () => request({url:'/search/hot/detail'})
// export function getSearchHotWord(){
//     return request({
//         url:'/search/hot/detail'
//     })
// }

