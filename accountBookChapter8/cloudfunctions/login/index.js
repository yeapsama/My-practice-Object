
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
  // ebv:"cloud1-4gvukrdi5a13b0e0"
})

exports.main = async (event, context) => {
  // 这里获取到的 openId、 appId 和 unionId 是可信的，注意 unionId 仅在满足 unionId 获取条件时返回
  //通过异步的方法获取信息，如果使用同步，则可能会undefined
  let { OPENID, APPID, UNIONID,ENV } = await cloud.getWXContext()
 
  return {
    OPENID,
    APPID,
    UNIONID,
    ENV
  }
}

