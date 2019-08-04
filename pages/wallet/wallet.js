// pages/wallet/wallet.js
const config=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_balance:0
  },
  //提现
  tx(){
    if (this.data.user_balance<1){
      config.mytoast('账户余额不足以提现')
    }else{
      wx.navigateTo({
        url: '/pages/tx/tx',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获取我的钱包
  get_balance() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/my_balance', res => {
      this.setData({
        user_balance: res.data.data.user_balance
      })
    })
  },
  to_detail(){
    wx.navigateTo({
      url: '/pages/income/income',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
    this.get_balance()
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
  onShareAppMessage: function () { return config.shareData

  }
})