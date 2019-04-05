// pages/my/my.js
const config=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  to_wallet() {
    wx.navigateTo({
      url: '/pages/wallet/wallet',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  to_share(){
    wx.navigateTo({
      url: '/pages/share/share',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
  call(){
    config.mytoast('打电话')
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