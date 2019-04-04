// pages/ordel/ordel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:3,
    mask:true,
    tabindex: 0,
    tab_list: ['待接单', '待授课','待评价','已完成']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  up_ok(){
    wx.navigateTo({
      url: '/pages/ordel/sure_ordel/ordel_sure',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  dk(){
    this.setData({
      mask:true,
      type:4
    })
  },
  to_res() {
    wx.navigateTo({
      url: '/pages/ordel/ordel_res/ordel_res',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  select_tab(e) {
    this.setData({
      tabindex: e.currentTarget.dataset.index
    })

  },
  hidemask(){
    this.setData({
      mask:false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  wszl(){
    wx.navigateTo({
      url: '/pages/information/information',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
  onShareAppMessage: function () {

  }
})