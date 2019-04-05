// pages/feed_back/feed_back.js
const config = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: 'http://class.zzvlm.com/img3418@2x.png',
    cursor: 0,
    value: ''
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
  //上传图片
  up_img() {
    config.chooseImage((res) => {
      this.setData({
        imgurl: res.tempFilePaths
      })
    })
  },
  //获取文字
  get_text(e) {
    this.setData({
      cursor: e.detail.cursor,
      value: e.detail.value
    })
  },
  sure() {
    config.mytoast('提交成功!')
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