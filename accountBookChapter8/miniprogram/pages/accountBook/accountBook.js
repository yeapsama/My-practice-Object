// pages/accountBook/accountBook.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [], //账本列表
        pageIndex: 0, //分页开始序号值
        pageSize: 2 //每页显示条数
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //加载账本前，需要给分页开始序号值初始化为0,账本数组为空重新赋值
        this.setData({
            pageIndex: 0,
            books: []
        });
        this.loadBook();
    },
    createBook: function () {
        //创建账本跳转
        wx.navigateTo({
          url: '../createBook/createBook',
        })
      },
      loadBook:function(){
          //分页加载账本
        var that = this;
        var pageIndex = this.data.pageIndex; //分页起始值序号
        var books = that.data.books; //原有已显示的账本
        wx.cloud.callFunction({ // 调用云函数  
          name: 'loadBook',
          data:{
            pageIndex: pageIndex,  //分页起始值序号
            pageSize: this.data.pageSize  //分页显示条数
          },
          success: res => {
            console.log('[云函数] [loadBook] 加载记账本: ', res);
            var result = res.result.data;
            var newPageIndex = pageIndex + result.length; //计算新的起始值
            that.setData({
              books: books.concat(result), //每次加载后，结果拼接在以前的结果里
              pageIndex: newPageIndex //分页起始值序号重新赋值
            });
          },
          fail: err => {
            console.error('[云函数] [loadBook] 加载记账本', err);
          }
        })
      },
      onPullDownRefresh: function () { //下拉刷新，加载账本
        console.log("下拉刷新加载账本");
        this.loadBook();
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