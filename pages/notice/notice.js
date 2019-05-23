// pages/notice/notice.js
const config = require('../../utils/util.js')
  // / user / my_message
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getnoticeList()
  },
  getnoticeList(){
    config.ajax('POST', {
      token: wx.getStorageSync('user_token'),
    }, '/user/my_message', (res) => {
      this.setData({
        noticeList: res.data.data.map((item) => {
          item.user_message_createtime = config.timeForm(item.user_message_createtime).chatTime.year + '/' + config.timeForm(item.user_message_createtime).chatTime.month + '/' + config.timeForm(item.user_message_createtime).chatTime.day
          return item
        })
      })
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