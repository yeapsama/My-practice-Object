// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    let accountId = event.accountId;
    let result = await db.collection('accountDetail').where({
        accountId:accountId
    }).orderBy('createTime','desc').get();
    return result;
}