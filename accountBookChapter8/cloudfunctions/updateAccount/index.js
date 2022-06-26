// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    let accountId = event.accountId;
    let totalBalance = event.totalBalance;
    let result = await db.collection('account').doc(accountId).update({
      data: {
        balance: totalBalance,
        updateTime: new Date()
      }
    });
    return result;
}