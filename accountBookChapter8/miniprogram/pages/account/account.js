// pages/account/account.js
var app = getApp();
// 初始化云开发
wx.cloud.init({
  env: 'cloud1-4gvukrdi5a13b0e0'
});
//初始化数据库
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid: null,
        accounts:[],
        // 我的账户数
        count:0,
        // 总资产
        total:0,
        // 负债资产
        deTotal:0
    },
    add: function() {
      //添加账户跳转
        wx.navigateTo({
          url: '../createAccount/createAccount',
        })
      },
      seeDetail: function(e) {
        //查看账户明细跳转，传递账户id、余额参数
        var id = e.target.dataset.id;
        var balance = e.target.dataset.balance;
        wx.navigateTo({
          url: '../accountDetail/accountDetail?id='+id+'&balance='+balance,
        })
      },
      loadAccount: function(openid) {
        //根据openid来加载账户信息
        var that = this;
        //向account中添加集合
        db.collection('account').where({
          _openid: openid // 填入当前用户 openid
        //   orderBy根据创建时间、降序来排序
        // get方法：获取相应集合里面的一条或者多条信息
        }).orderBy('createTime', 'desc').get().then(res => {
          console.log("获取账户信息="+res);
          var accounts = res.data;
          var total = 0;
          var deTotal = 0;
          for(var i=0;i<accounts.length;i++){
            //   计算总余额
            total += parseFloat(accounts[i].balance);
            //计算负债金额
            if(accounts[i].balance<=0){
              deTotal += parseFloat(accounts[i].balance);
            } 
          };
          that.setData({
            accounts: accounts,
            count: accounts.length,
            total:total,
            deTotal:deTotal
          });
        });
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 获取openid
        this.getOpenid();
    },
    getOpenid: function() { 
        //获取openid
        var that = this;
        // 调用云函数
        wx.cloud.callFunction({
          name: 'login',
          data: {},
          success: res => {
            console.log('[云函数] [login] user openid: ', res.result.openid)
            const openid = res.result.openid
            this.setData({
              "openid": openid
            });
            that.loadAccount(openid);
          },
          fail: err => {
            console.error('[云函数] [login] 调用失败', err)
          }
        })
      },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})