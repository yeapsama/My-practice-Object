// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    //分页起始值序号
    let pageIndex = event.pageIndex;
    //分页显示条数
    let pageSize = event.pageSize;
    let result = await db.collection('accountBook').where({
      _openid: wxContext.OPENID // 填入当前用户 openid
      //跳过pageIndex,查询pageSize行,根据创建时间的降序进行排序，get()获得一条或多条数据
    }).skip(pageIndex).limit(pageSize).orderBy('createTime', 'desc').get();
    return result;
}