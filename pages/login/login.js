// pages/login/login.js
const config = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: '',
    user_password: ''
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
  //获取用户名和密码
  get_user(e) {
    console.log(e)
    switch (e.currentTarget.dataset.type) {
      case "user_name":
        this.setData({
          user_name: e.detail.value
        })
        break;
      case 'user_password':
        this.setData({
          user_password: e.detail.value
        })
        break;
      default:

    }
  },
  to_index() {
    if (this.data.user_name != '' && this.data.user_password != '') {
      wx.switchTab({
        url: '/pages/ordel/ordel',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      config.mytoast('请输入用户名和秘密')
    }
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