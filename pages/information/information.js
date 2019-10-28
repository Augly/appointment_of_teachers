// pages/information/information.js
const config = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday:'',
    class_list: [],
    portrait: '',
    grade_index: 0,
    grade_list: [],
    fg_index: 0,
    name: '',
    school: '',
    major: '',
    sex_index: 0,
    age_index: 0,
    age_list: [],
    fg_list: [{
      label: '幽默风趣',
      value: 0
    }, {
      label: '形象生动',
      value: 1
    }, {
      label: '活泼轻松',
      value: 2
    },],
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
    var s = []
    for (let n = 0; n < 100; n++) {
      s.push({
        label: n + '岁',
        value: n
      })
    }
    let year = new Date().getFullYear();
    let mouth = new Date().getMonth() + 1;
    mouth = mouth > 9 ? mouth : '0' + mouth
    let day = new Date().getDate();
    day = day > 9 ? day : '0' + day
    this.setData({
      age_list: s,
      birthday: year + '-' + mouth + '-' + day
    })
    this.getClass_list()
    this.getGrade_lsit()
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
  //选择器函数
  bindPickerChange(e) {
    switch (e.currentTarget.dataset.type) {
      case "grade":
        this.setData({
          grade_index: e.detail.value
        })
        break;
      case "class":
        this.setData({
          class_index: e.detail.value
        })
        break;
      case "level":
        this.setData({
          level_index: e.detail.value
        })
        break;
      default:

    }
  },
  //上传图片
  user_val() {
    config.chooseImage(res => {
      config.ajax('img', {
        token: wx.getStorageSync('user_token')
      }, '/user/upload_img', succes => {
        this.setData({
          portrait: succes.data.path,
        })
      }, error => {
        console.log(error)
      }, complete => {
        console.log(complete)
      }, res.tempFilePaths[0])
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
  //选择性别
  bindchange(e) {
    console.log(e)
    this.setData({
      sex_index: e.detail.value
    })
  },
  //选择年龄
  bindageChange(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  //性别
  get_userName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //院校
  get_school(e) {
    this.setData({
      school: e.detail.value
    })
  },
  //专业
  get_major(e) {
    this.setData({
      major: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  next() {
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
    // if (this.data.portrait==''){
    //   config.mytoast('请上传头像!')
    //   return false
    // }
    if (this.data.school == '') {
      config.mytoast('请填写毕业院校!')
      return false
    }
    if (this.data.major == '') {
      config.mytoast('请填写专业!')
      return false
    }
    if (arr.length == 0) {
      config.mytoast('请至少选择一个教学科目')
      return false
    }
    if (newArr.length == 0) {
      config.mytoast('请至少选择一个教学年级')
      return false
    }
    wx.setStorageSync('info', {
      portrait: this.data.portrait,
      realname: this.data.name,
      sex: this.data.sex_list[this.data.sex_index].value,
      birthday: this.data.birthday,
      grade: newArr,
      academy: this.data.school,
      major: this.data.major,
      subjects: arr
    })
    wx.navigateTo({
      url: '/pages/authentication/authentication',
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