// pages/ordel/ordel.js
const config = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 4,
    mask: true,
    list: [],
    page:1,
    tabindex: 0,
    dk_img: '',
    dk_id: '',
    tab_list: ['待接单', '待授课', '待评价', '已完成']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //驳回订单
  reject_order(e) {
    config.tajax('POST', {
      token: wx.getStorageSync('user_token'),
      order_id: e.currentTarget.dataset.id
    }, '/index/reject_order', res => {
      this.get_order_receiving()
    })
  },
  //立即接单
  receive_order(e) {
    config.tajax('POST', {
      token: wx.getStorageSync('user_token'),
      order_id: e.currentTarget.dataset.id
    }, '/index/receive_order', res => {
      this.get_order_receiving()
    })
  },
  //待接单
  get_order_receiving() {
    config.tajax('POST', {
      token: wx.getStorageSync('user_token'),
      page: this.data.page
    }, '/index/order_receiving', res => {
      this.setData({
        list: res.data.data
      })
    })
  },
  //待授课
  get_order_clock() {
    config.tajax('POST', {
      token: wx.getStorageSync('user_token'),
      page: this.data.page
    }, '/index/order_clock', res => {
      this.setData({
        list: res.data.data
      })
    })
  },
  //待评价
  get_order_estimate() {
    config.tajax('POST', {
      token: wx.getStorageSync('user_token'),
      page: this.data.page
    }, '/index/order_estimate', res => {
      this.setData({
        list: res.data.data
      })
    })
  },
  //已完成
  get_order_accomplish() {
    config.tajax('POST', {
      token: wx.getStorageSync('user_token'),
      page: this.data.page
    }, '/index/order_accomplish', res => {
      this.setData({
        list: res.data.data
      })
    })
  },

  //隐藏此单
  hide_ordel() {
    config.mytoast('隐藏此单')
  },
  //取消此单
  cendel_ordel() {
    config.mytoast('取消此单')
  },
  //立即接单
  sure_ordel() {
    config.mytoast('立即接单')
  },
  //
  up_ok() {
    if (this.data.dk_img==''){
      config.mytoast('请上传打卡信息!')
      return false
    }
    config.ajax('img', {
      token: wx.getStorageSync('user_token')
    }, '/user/upload_img', succes => {
      this.dk_success()
    }, error => {
      console.log(error)
    }, complete => {
      console.log(complete)
    }, this.data.dk_img)
    // wx.navigateTo({
    //   url: '/pages/ordel/sure_ordel/ordel_sure',
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  },
  call_dk(id, longitude, latitude) {
    config.tajax('POST', {
      token: wx.getStorageSync('user_token'),
      order_id: id,
      longitude: longitude,
      latitude: latitude
    }, '/index/clock_order', succes => {
      config.mytoast('打卡成功!')
    })
  },
  dk_success() {
    wx.getLocation({
      type: 'gcj02 ',
      altitude: false,
      success: (res) => {
        this.call_dk(this.data.dk_id, res.longitude, res.latitude)
      },
      fail: (res) => {

      },
      complete: (res) => {

      },
    })
    // config.ajax('img', {
    //   token: wx.getStorageSync('user_token')
    // }, '/user/upload_img', succes => {

    // }, error => {
    //   console.log(error)
    // }, complete => {
    //   console.log(complete)
    // }, this.data.dk_img)
  },
  dk(e) {
    this.setData({
      dk_id: e.currentTarget.dataset.id,
      mask: true,
      type: 4
    })
  },
  up_val() {
    config.chooseImage(res => {
      this.setData({
        dk_img: res.tempFilePaths[0]
      })
      // config.ajax('img', {
      //   token: wx.getStorageSync('user_token')
      // }, '/user/upload_img', succes => {
      //   var userInfo = this.data.userInfo
      //   userInfo.user_portrait = succes.data.path
      //   this.setData({
      //     userInfo: userInfo,
      //     sex_index: res.data.data.user_sex - 1,
      //     age_index: res.data.data.user_age
      //   })
      // }, error => {
      //   console.log(error)
      // }, complete => {
      //   console.log(complete)
      // }, res.tempFilePaths[0])
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
    if (this.data.tabindex == 0) {
      this.get_order_receiving()
    } else if (this.data.tabindex == 1) {
      this.get_order_clock()
    } else if (this.data.tabindex == 2) {
      this.get_order_estimate()
    } else {
      this.get_order_accomplish()
    }
  },
  hidemask() {
    this.setData({
      mask: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  wszl() {
    wx.navigateTo({
      url: '/pages/information/information',
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
  onShareAppMessage: function () {

  }
})