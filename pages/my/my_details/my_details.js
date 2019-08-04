// pages/my/my_details/my_details.js
const config = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday: '',
    ex_name: '',
    ex_phone: '',
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
    }],
    class_list: [],
    grade_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClass_list()
    this.getGrade_lsit()
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
  //年级列表
  getGrade_lsit() {
    config.ajax('POST', {}, '/index/grade_list', res => {
      console.log(res.data.data)
      this.setData({
        grade_list: res.data.data.map((item) => {
          item.check = false
          return item
        })
      })
    })
  },
  //选择教学年级
  select_item(e) {
    let arr = this.data.grade_list
    arr[e.currentTarget.dataset.index].check = !arr[e.currentTarget.dataset.index].check
    this.setData({
      grade_list: arr
    })
  },
  //选择教学科目
  select_class(e) {
    let arr = this.data.class_list
    arr[e.currentTarget.dataset.index].check = !arr[e.currentTarget.dataset.index].check
    this.setData({
      class_list: arr
    })
  },
  //科目列表
  getClass_list() {
    config.ajax('POST', {}, '/index/subjects_list', res => {
      this.setData({
        class_list: res.data.data.map((item) => {
          item.check = false
          return item
        })
      })
    })
  },
  out() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/login_out', res => {
      wx.clearStorage()
      wx.reLaunch({
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
  //选择生日
  bindageChange(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  //获取个人信息
  get_userInfo() {
    config.tajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/teacher_info', res => {
      wx.setStorageSync('userInfo', res.data.data)
      let arr = this.data.grade_list
      let newArr = this.data.class_list
      for (let s = 0; s < arr.length; s++) {
        for (let t = 0; t < res.data.data.teacher_grade.length; t++) {
          if (arr[s].grade_id == res.data.data.teacher_grade[t].grade_id) {
            arr[s].check = true
          }
        }
      }
      for (let s = 0; s < newArr.length; s++) {
        for (let t = 0; t < res.data.data.teacher_subjects.length; t++) {
          if (newArr[s].subjects_id == res.data.data.teacher_subjects[t].subjects_id) {
            newArr[s].check = true
          }
        }
      }
      this.setData({
        grade_list: arr,
        class_list: newArr,
        birthday: res.data.data.teacher_birthday,
        userInfo: res.data.data,
        sex_index: res.data.data.teacher_sex - 1,
        // age_index: res.data.data.teacher_age
      })
    })
  },
  user_val() {
    config.chooseImage(res => {
      config.ajax('img', {
        token: wx.getStorageSync('user_token')
      }, '/user/upload_img', succes => {
        console.log(succes.data.path)
        var userInfo = this.data.userInfo
        userInfo.teacher_portrait = succes.data.path
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
    userInfo.teacher_realname = e.detail.value
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
    let arr = []
    for (let s = 0; s < this.data.class_list.length; s++) {
      if (this.data.class_list[s].check) {
        arr.push(this.data.class_list[s].subjects_id)
      }
    }
    let newArr = []
    for (let s = 0; s < this.data.grade_list.length; s++) {
      if (this.data.grade_list[s].check) {
        newArr.push(this.data.grade_list[s].grade_id)
      }
    }
    if (arr.length == 0) {
      config.mytoast('请至少选择一个教学科目')
      return false
    }
    if (newArr.length == 0) {
      config.mytoast('请至少选择一个教学年级')
      return false
    }
    config.tajax('POST', {
      realname: this.data.userInfo.teacher_realname,
      sex: this.data.sex_list[this.data.sex_index].value,
      birthday: this.data.birthday,
      subjects: JSON.stringify(arr),
      grade: JSON.stringify(newArr),
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
  rz() {
    wx.navigateTo({
      url: '/pages/information/information',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
  onShareAppMessage: function () { return config.shareData

  }
})