// pages/ordel/ordel_res/ordel_res.js
const config = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    default_src: 'http://yueke.dazhu-ltd.cn/public/uploads//default/user_default.png',
    dk_img: '',
    mask: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.order_id
    })
    this.get_init_data(options.order_id)
  },
  //获取订单信息
  get_init_data(id) {
    config.tajax('POST', {
      token: wx.getStorageSync('user_token'),
      order_id: id
    }, '/index/order_info', res => {
      console.log(res)
      let data = res.data.data
      data.startTime = config.timeForm(data.order_reservetime).chatTime.hour + ':' + config.timeForm(data.order_reservetime).chatTime.minute
      data.endTime = config.timeForm(data.order_reservetime + data.order_duration * 3600).chatTime.hour + ':' + config.timeForm(data.order_reservetime + data.order_duration * 3600).chatTime.minute
      data.order_reservetime = config.timeForm(data.order_reservetime).chatTime
      data.order_createtime = config.timeForm(data.order_createtime).btTime
      this.setData({
        info: data
      })
    })
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
  showmask(){
    this.setData({
      mask:true
    })
  },
  //取消订单
  cendel_ordel() {
    wx.showModal({
      title: '提示',
      content: '确认取消订单？',
      success: function (res) {
        if (res.confirm) {
          config.mytoast('订单已取消')
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  up_ok() {
    if (this.data.dk_img == '') {
      config.mytoast('请上传打卡信息!')
      return false
    }
    config.ajax('img', {
      token: wx.getStorageSync('user_token')
    }, '/user/upload_img', succes => {
      this.dk_success(succes)
    }, error => {
      console.log(error)
    }, complete => {
      console.log(complete)
    }, this.data.dk_img)
  },
  dk_success(data) {
    wx.getLocation({
      type: 'gcj02 ',
      altitude: false,
      success: (res) => {
        this.call_dk(this.data.info.order_id, res.longitude, res.latitude, data.data.path)
      },
      fail: (res) => {

      },
      complete: (res) => {

      },
    })
  },
  call_dk(id, longitude, latitude, img) {
    config.tajax('POST', {
      token: wx.getStorageSync('user_token'),
      order_id: id,
      longitude: longitude,
      latitude: latitude,
      clock_img: img
    }, '/index/clock_order', succes => {
      config.mytoast('打卡成功!')
      this.get_order_clock()
    })
  },
  //付款
  pay_ordel() {
    if (this.data.info.order_status == 2) {
      //立即接单
      config.tajax('POST', {
        token: wx.getStorageSync('user_token'),
        order_id: this.data.info.order_id
      }, '/index/receive_order', res => {
        this.get_init_data(this.data.info.order_id)
      })
    } else if (this.data.info.order_status == 4) {
      //打卡
      this.setData({
        mask: true,
      })

    }
  },
  to_teacher_res() {
    wx.navigateTo({
      url: '/pages/index/teacher_index/teacher_index',
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