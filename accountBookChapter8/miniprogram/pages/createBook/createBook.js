// pages/createBook/createBook.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        types: [
            {
              "id":"0",
              "icon": "/images/book/rc.jpg",
              "typeName": "日常"
            },
            {
              "id": "1",
              "icon": "/images/book/sy.jpg",
              "typeName": "生意"
            },
            {
              "id": "2",
              "icon": "/images/book/jt.jpg",
              "typeName": "家庭"
            },
            {
              "id": "3",
              "icon": "/images/book/lx.jpg",
              "typeName": "旅行"
            },
            {
              "id": "4",
              "icon": "/images/book/zx.jpg",
              "typeName": "装修"
            },
            {
              "id": "5",
              "icon": "/images/book/jh.jpg",
              "typeName": "结婚"
            },
            {
              "id": "6",
              "icon": "/images/book/xy.jpg",
              "typeName": "校园"
            },
            {
              "id": "7",
              "icon": "/images/book/bf.jpg",
              "typeName": "班费"
            }
          ]
    },
    formSubmit:function(e){
      //创建账本
        var id = e.detail.value.id; //账本类型id
        var name = e.detail.value.name; //账本名称
        var type = this.data.types[id]; //账本类型对象
        wx.cloud.callFunction({ 
          name: 'saveBook',
          data:{
            typeId: id, 
            typeName: type.typeName,
            name: name,
            icon: type.icon
          },
          success: res => {
            console.log('[云函数] [saveBook] 创建记账本: ', res);
            var errMsg = res.result.errMsg;
            if (errMsg == "collection.add:ok"){
              wx.showToast({
                title: '创建成功',
                icon: 'success',
                duration: 1000,
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
            console.error('[云函数] [saveBook] 创建记账本', err);
          }
        })
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