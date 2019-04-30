// pages/my/my.js
const config = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    default_src: 'http://yueke.dazhu-ltd.cn/public/uploads/default/user_default.png',
    userInfo: null,
    ordel_count: 0,
    user_balance: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  get_status() {
    config.tajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/check/audit_status', res => {
      // console.log(res)
      if (res.data.data.teacher_audit_status == -1){
        wx.switchTab({
          url: '/pages/ordel/ordel',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }
      // if (res.data.data.teacher_audit_status == 2) {
      //   if (this.data.tabindex == 0) {
      //     this.get_order_receiving()
      //   } else if (this.data.tabindex == 1) {

      //     this.get_order_clock()
      //   } else if (this.data.tabindex == 2) {

      //     this.get_order_estimate()
      //   } else {

      //     this.get_order_accomplish()
      //   }
      // } else {
      //   this.setData({
      //     mask: true,
      //     type: res.data.data.teacher_audit_status
      //   })
      // }
    })
  },
  //获取个人信息
  get_userInfo() {
    config.tajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/teacher_info', res => {
      this.setData({
        userInfo: res.data.data
      })
    })
  },
  //获取订单数量
  get_ordel_count() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/my_order_count', res => {
      this.setData({
        ordel_count: res.data.data.order_count
      })
    })
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
  to_wallet() {
    wx.navigateTo({
      url: '/pages/wallet/wallet',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  to_share() {
    wx.navigateTo({
      url: '/pages/share/share',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  to_feed_back() {
    wx.navigateTo({
      url: '/pages/feed_back/feed_back',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  to_my_details() {
    wx.navigateTo({
      url: '/pages/my/my_details/my_details',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  to_about_us() {
    wx.navigateTo({
      url: '/pages/my/about_us/about_us',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  to_ordel() {
    wx.switchTab({
      url: '/pages/ordel/ordel',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
    this.get_status()
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    this.get_userInfo()
    this.get_balance()
    this.get_ordel_count()
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
  call() {
    config.ajax('POST', {

    }, '/index/service_phone', res => {
      wx.makePhoneCall({
        phoneNumber: res.data.data.url,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    })
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