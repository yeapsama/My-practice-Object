// pages/createAccount/createAccount.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        types: [
            {
              "id": "0",
              "icon": "/images/account/xj.jpg",
              "typeName": "现金"
            },
            {
              "id": "1",
              "icon": "/images/account/zfb.jpg",
              "typeName": "支付宝"
            },
            {
              "id": "2",
              "icon": "/images/account/wx.jpg",
              "typeName": "微信"
            }
          ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    formSubmit: function (e) {//创建账户
      //账户类型id
        var id = e.detail.value.id; 
        //账户名称
        var name = e.detail.value.name; 
        //账户余额
        var balance = e.detail.value.balance; 
        //账户备注
        var remark = e.detail.value.remark; 
        //账本类型对象
        var type = this.data.types[id]; 
        wx.cloud.callFunction({ // 调用云函数  
          name: 'saveAccount',
          data: {
            typeId: id,
            typeName: type.name,
            name: name,
            icon: type.icon,
            balance: balance,
            remark: remark
          },
          success: res => {
            console.log('[云函数] [saveAccount] 创建账户: ', res);
            var errMsg = res.result.errMsg;
            if (errMsg == "collection.add:ok") {
              wx.showToast({
                title: '创建成功',
                icon: 'success',
                duration: 1000,
                //成功后等待一秒返回首页
                success: function () {
                  setTimeout(()=>{
                    wx.navigateBack({
                      delta: 1
                    })
                  },1000)
                }
              })
            }
          },
          fail: err => {
            console.error('[云函数] [saveAccount] 创建账户', err);
          }
        })
      },
      radioChange:function(e){
        console.log(e.detail.value);
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