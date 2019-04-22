// pages/my/my_details/my_details.js
const config = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ex_name:'',
    ex_phone:'',
    userInfo: null,
    sex_index: 0,
    age_index: 0,
    age_list: [],
    sex_list: [{
      label: '男',
      value: 1
    }, {
      label: '女',
      value: 2
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_userInfo()
    var s = []
    for (let n = 0; n < 100; n++) {
      s.push({
        label: n + '岁',
        value: n
      })
    }
    this.setData({
      age_list: s
    })
  },
  out() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/login_out', res => {
      wx.clearStorage()
      wx.navigateTo({
        url: '/pages/login/login',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    })
  },
  //选择性别
  bindchange(e) {
    console.log(e)
    this.setData({
      sex_index: e.detail.value
    })
  },
  //选择年龄
  bindageChange(e) {
    console.log(e)
    this.setData({
      age_index: e.detail.value
    })
  },
  //获取个人信息
  get_userInfo() {
    config.tajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/teacher_info', res => {
      wx.setStorageSync('userInfo', res.data.data)
      this.setData({
        userInfo: res.data.data,
        sex_index: res.data.data.teacher_sex-1,
        age_index: res.data.data.teacher_age
      })
    })
  },
  user_val() {
    config.chooseImage(res => {
      config.ajax('img', {
        token: wx.getStorageSync('user_token')
      }, '/user/upload_img', succes => {
        var userInfo = this.data.userInfo
        userInfo.user_portrait = succes.data.path
        this.setData({
          userInfo: userInfo
        })
      }, error => {
        console.log(error)
      }, complete => {
        console.log(complete)
      }, res.tempFilePaths[0])
    })
  },
  userName(e) {
    var userInfo = this.data.userInfo
    userInfo.user_nickname = e.detail.value
    this.setData({
      userInfo: userInfo
    })
  },
  get_ex_name(e) {
    var userInfo = this.data.userInfo
    userInfo.teacher_exigency_name = e.detail.value
    this.setData({
      userInfo: userInfo
    })
  },
  get_ex_phone(e) {
    var userInfo = this.data.userInfo
    userInfo.teacher_exigency_phone = e.detail.value
    this.setData({
      userInfo: userInfo
    })
  },
  bindadder(e) {
    var userInfo = this.data.userInfo
    userInfo.user_address = e.detail.value
    this.setData({
      userInfo: userInfo
    })
  },
  //保存个人信息
  save() {
    config.tajax('POST', {
      realname: this.data.userInfo.teacher_realname,
      sex: this.data.sex_list[this.data.sex_index].value,
      age: this.data.age_list[this.data.age_index].value,
      // address: this.data.userInfo.user_address,
      portrait: this.data.userInfo.teacher_portrait,
      token: wx.getStorageSync('user_token'),
      exigency_name: this.data.userInfo.teacher_exigency_name,
      exigency_phone: this.data.userInfo.teacher_exigency_phone,
    }, '/user/teacher_info_update', res => {
      this.get_userInfo()
      config.mytoast('修改成功!即将返回', res => {
        setTimeout((res) => {
          wx.navigateBack(-1)
        }, 1000)
      })
    })
  },
  bind_phone() {
    wx.navigateTo({
      url: '/pages/bind_phone/bind_phone',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  rz(){
wx.navigateTo({
  url: '/pages/information/information',
  success: function(res) {},
  fail: function(res) {},
  complete: function(res) {},
})
  },
  to_adder() {
    wx.navigateTo({
      url: '/pages/my/my_adder/my_adder',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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