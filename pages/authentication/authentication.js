// pages/authentication/authentication.js
const config=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mask:false,
    zm_id:'',
    fm_id:''
  },
  hide_mask(){
    this.setData({
      mask: !this.data.mask
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  zm(){
    config.chooseImage(res => {
      config.ajax('img', {
        token: wx.getStorageSync('user_token')
      }, '/user/upload_img', succes => {
        this.setData({
          zm_id: succes.data.path,
        })
      }, error => {
        console.log(error)
      }, complete => {
        console.log(complete)
      }, res.tempFilePaths[0])
    })
  },
  fm() {
    config.chooseImage(res => {
      config.ajax('img', {
        token: wx.getStorageSync('user_token')
      }, '/user/upload_img', succes => {
        this.setData({
          fm_id: succes.data.path,
        })
      }, error => {
        console.log(error)
      }, complete => {
        console.log(complete)
      }, res.tempFilePaths[0])
    })
  },
  next(){
    // if(this.data.zm_id==''){
    //   config.mytoast('请上传正面身份证')
    //   return false
    // }
    // if (this.data.fm_id == '') {
    //   config.mytoast('请上传反面身份证')
    //   return false
    // }
    let info = wx.getStorageSync('info')
    info['identity_zheng']=this.data.zm_id
    info['identity_fan'] = this.data.fm_id

    wx.setStorageSync('info', info)
    wx.navigateTo({
      url: '/pages/certificate/certificate',
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