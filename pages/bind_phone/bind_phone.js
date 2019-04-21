// pages/bind_phone/bind_phone.js
const config=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code_type:'验证码',
    user_phone:'',
    user_code:''
  },
  getphone(e){
    this.setData({
      user_phone:e.detail.value
    })
  },
  get_code(e){
    this.setData({
      user_code: e.detail.value
    })
  },
  //发送验证码
  send_code() {
    if (!/^1[34578]\d{9}$/.test(this.data.user_phone)) {
      config.mytoast('请输入正确的手机号!')
      return false
    }
    if (this.data.code_type == '验证码') {
      config.ajax('POST', {
        token:wx.getStorageSync('user_token'),
        phone: this.data.user_phone
      }, '/user/change_phone_smscode', res => {
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
  return_go(){
    config.ajax('POST',{
      token:wx.getStorageSync('user_token'),
      phone:this.data.user_phone,
      code:this.data.user_code
    },'/user/change_phone',res=>{
      wx.navigateBack({
        delta: 1,
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