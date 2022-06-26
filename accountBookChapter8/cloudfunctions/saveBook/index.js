// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    //往accountBook集合里面添加新的记账本数据
    let result = await db.collection('accountBook').add({
        data: {
          typeId: event.typeId,
          typeName: event.typeName,
          name: event.name,
          icon: event.icon,
          createTime: new Date(),
          updateTime: new Date(),
          _openid: wxContext.OPENID
        }
      });
      return result;
}