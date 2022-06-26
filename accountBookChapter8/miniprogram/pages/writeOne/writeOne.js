// pages/writeOne/writeOne.js

//引入工具类模块dateTimePicker
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dateTimeArray: null,//日期二维数组
        dateTime: null, //当前日期
        startYear: 2010, //开始年份
        endYear: 2050,  //结束年份
        accountId:null, //账户id
        tradeDate:null, //交易日期
        totalBalance:0 //总金额
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var accountId = options.accountId;
        console.log(accountId);
        this.setData({
          accountId:accountId
        });
        this.initDate();//初始化日期
        this.loadAccount(accountId);//加载账户信息
    },
    initDate:function(){//初始化日期
        // 获取完整的年月日 时分秒，以及默认显示的数组
        //这里调用dateTimePicker没有传入第三个参数data，所以默认调用getNewDateArry
        var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);

        //初始化当天交易日期dateTime = [year, mont, date, hour, minu, seco]
        // 年-月-日 时：分
        var tradeDate = obj.dateTimeArray[0][obj.dateTime[0]] + "-" 
                      + obj.dateTimeArray[1][obj.dateTime[1]] + "-" 
                      + obj.dateTimeArray[2][obj.dateTime[2]] + " " 
                      + obj.dateTimeArray[3][obj.dateTime[3]] + ":" 
                      + obj.dateTimeArray[4][obj.dateTime[4]];
        this.setData({
          dateTimeArray: obj.dateTimeArray,
          dateTime: obj.dateTime,
          tradeDate: tradeDate
        });
      },
      changeDateTime(e) {
        //选择交易日期时重新设值
        var dateTimeArray = this.data.dateTimeArray;
        var dateTime = e.detail.value;
        //交易日期
        var tradeDate = dateTimeArray[0][dateTime[0]] + "-" 
                      + dateTimeArray[1][dateTime[1]] + "-" 
                      + dateTimeArray[2][dateTime[2]] + " " 
                      + dateTimeArray[3][dateTime[3]] + ":" 
                      + dateTimeArray[4][dateTime[4]];
        console.log(tradeDate);
        this.setData({ 
          dateTime: e.detail.value,
          tradeDate:tradeDate 
        });
      },
      formSubmit: function (e) {
        //记录交易明细
        var that = this;
        var type = e.detail.value.type; //交易类型
        var balance = e.detail.value.balance; //交易金额
        var remark = e.detail.value.remark; //备注
    
        //计算操作后余额
        var totalBalance = parseFloat(that.data.totalBalance);
        if (type == 0) {
          totalBalance = totalBalance + parseFloat(balance);
        } else {
          totalBalance = totalBalance - parseFloat(balance);
        }
    
        wx.cloud.callFunction({
          name: 'saveAccountDetail',
          data: {
            type: type,
            balance: balance,
            remark: remark,
            accountId: that.data.accountId,
            tradeDate: that.data.tradeDate,
            totalBalance: totalBalance
          },
          success: res => {
            console.log('[云函数] [saveAccountDetail] 记录交易明细: ', res);
            var errMsg = res.result.errMsg;
            // 如果调用成功后则更新账户明细中的总余额
            if (errMsg == "collection.add:ok") {
              that.updateAccount(that.data.accountId,totalBalance);
            }
          },
          fail: err => {
            console.error('[云函数] [saveAccountDetail] 记录交易明细', err);
          }
        })
      },
      loadAccount:function(accountId){
        //根据账户id加载账户信息
        var that = this;
        wx.cloud.callFunction({
          name: 'loadAccount',
          data: {
            accountId: accountId
          },
          success: res => {
            console.log('[云函数] [loadAccount] 加载账户信息: ', res);
            var obj = res.result.data[0];
            that.setData({
              totalBalance:obj.balance
            });
          },
          fail: err => {
            console.error('[云函数] [loadAccount] 加载账户信息', err);
          }
        })
      },
      updateAccount: function (accountId, totalBalance){
        //更新账号余额
        wx.cloud.callFunction({
          name: 'updateAccount',
          data: {
            accountId: accountId,
            totalBalance: totalBalance
          },
          success: res => {
            console.log('[云函数] [updateAccount] 更新账号余额: ', res);
            var errMsg = res.result.errMsg;
            if (errMsg == "document.update:ok") {
              wx.showToast({
                title: '创建成功',
                icon: 'success',
                duration: 1000,
                success: function () {
                  //1s后返回上一页面
                  setTimeout(()=>{
                    wx.navigateBack({
                      delta: 2
                    });
                  },1000)
                }
              })
            }
          },
          fail: err => {
            console.error('[云函数] [updateAccount] 更新账号余额', err);
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