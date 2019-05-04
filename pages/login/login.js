// pages/login/login.js
const config = require('../../utils/util.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_phone: '',
    user_password: '',
    code_type: '验证码',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  get_userInfo() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/user_info', res => {
      wx.setStorageSync('userInfo', res.data.data)
    })
  },
  //获取用户信息
  getUserInfo(res) {
    console.log(res)
    this.setData({
      info: res.detail.userInfo
    })
    this.to_index()
  },
  //发送验证码
  send_code() {
    if (!/^1[345789]\d{9}$/.test(this.data.user_phone)) {
      config.mytoast('请输入正确的手机号!')
      return false
    }
    if (this.data.code_type == '验证码') {
      config.ajax('POST', {
        phone: this.data.user_phone
      }, '/login/send_message', res => {
        this.setData({
          code_type: 60,
        })
        let st = setInterval(() => {
          let n = this.data.code_type--
          if (n == 1) {
            this.setData({
              code_type: '验证码'
            })
            clearInterval(st)
          } else {
            n--
            this.setData({
              code_type: n
            })
          }
        }, 1000)
      })

    }
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
    switch (e.currentTarget.dataset.type) {
      case "user_phone":
        this.setData({
          user_phone: e.detail.value
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
  //进行登陆操作
  to_index() {
    if (!/^1[345789]\d{9}$/.test(this.data.user_phone)) {
      config.mytoast('请输入正确的手机号!')
      return false
    }
    if (this.data.user_password == '') {
      config.mytoast('请输入短信验证码!')
      return false
    }
    config.ajax('POST', {
      phone: this.data.user_phone,
      code: this.data.user_password,
      portrait: this.data.info.avatarUrl || '',
      nickname: this.data.info.nickName || '',
      sex: this.data.info.gender || 1,
      wx_code: app.globalData.wx_code,
      inviter_id: wx.getStorageSync('inviter_id') || ''
    }, '/login/user_login', res => {
      wx.setStorageSync('user_token', res.data.data.user_token)
      wx.setStorageSync('user_openid', res.data.data.user_openid)
      this.get_userInfo()
      wx.switchTab({
        url: '/pages/ordel/ordel',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    })
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