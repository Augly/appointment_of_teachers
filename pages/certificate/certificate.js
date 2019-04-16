// pages/certificate/certificate.js
const config=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [[{ type: 1, value: 2 }], [{ type: 2, value: 3 }]],
    certificate:'',
    certificate_img:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获取证件名
  get_certificate(){
    this.setData({
      certificate: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  get_certificate_img(){
    config.chooseImage(res => {
      config.ajax('img', {
        token: wx.getStorageSync('user_token')
      }, '/user/upload_img', succes => {
        this.setData({
          certificate_img: succes.data.path,
        })
      }, error => {
        console.log(error)
      }, complete => {
        console.log(complete)
      }, res.tempFilePaths[0])
    })
  },
  next() {
    let info = wx.getStorageSync('info')
    info['token']=wx.getStorageSync('user_token')
    info['certificate'] = this.data.certificate
    info['certificate_img'] = this.data.certificate_img
    config.tajax('POST', info,'/check/commit_audit',res=>{
      wx.switchTab({
        url: '/pages/my/my',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
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