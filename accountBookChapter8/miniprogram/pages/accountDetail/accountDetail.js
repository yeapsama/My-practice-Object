// pages/accountDetail/accountDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        balance:0, //账户总余额
        id:null, //账户id 
        accountDetails:[] //账户明细列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
        var id = e.id; //账户id
        var balance = e.balance; //账户金额
        this.setData({
          balance:balance,
          id:id
        });
        this.loadAccountDetail(id);
    },
    writeOne:function(){//记一笔跳转路径，传递账户id参数
        var that = this;
        wx.navigateTo({
          url: '../writeOne/writeOne?accountId='+that.data.id,
        })
      },
      loadAccountDetail: function (accountId) {//加载交易明细
        var that = this;
        wx.cloud.callFunction({ // 调用云函数  去数据库查询accountDetail集合中相应accountId的内容
          name: 'loadAccountDetail',
          data: {
            accountId: accountId  //账户id
          },
          success: res => {
            console.log('[云函数] [loadAccountDetail] 加载交易明细: ', res);
            var result = res.result.data;
            that.setData({
              accountDetails: result
            });
          },
          fail: err => {
            console.error('[云函数] [loadAccountDetail] 加载交易明细', err);
          }
        })
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