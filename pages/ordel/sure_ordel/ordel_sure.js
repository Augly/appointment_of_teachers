// pages/ordel/sure_ordel/ordel_sure.js
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  to_bargain() {
    wx.showModal({
      title: '提示',
      content: '这是转发给好友',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    // wx.navigateTo({
    //   url: '/pages/ordel/bargain/bargain',
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  },
  look_res() {
    wx.navigateTo({
      url: '/pages/ordel/ordel_res/ordel_res',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  return_index() {
    wx.switchTab({
      url: '/pages/ordel/ordel',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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
  onShareAppMessage: function () { return config.shareData

  }
})