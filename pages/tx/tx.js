// pages/bind_phone/bind_phone.js
const config = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tx_money: 0,
    tx_bankname:'',
    tx_bankcard: ''
  },
  get_money(e) {
    this.setData({
      tx_money: e.detail.value
    })
  },
  get_bankname(e) {
    this.setData({
      tx_bankname: e.detail.value
    })
  },
  get_bankcard(e){
    this.setData({
      tx_bankcard: e.detail.value
    })
  },
  right_tx(){
    if (this.data.tx_money<1){
      config.mytoast('提现金额不得小于1块钱')
      return false
    }
    if (this.data.tx_bankname =='') {
      config.tx_bankname('请输入提现银行')
      return false
    }
    if (this.data.tx_bankcard < 1) {
      config.mytoast('请输入提现银行卡号')
      return false
    }
    config.ajax('POST',{
      token:wx.getStorageSync('user_token'),
      money: this.data.tx_money,
      bankname: this.data.tx_bankname,
      bankcard: this.data.tx_bankcard
    },'/user/withdraw',res=>{
      config.mytoast('提现成功!')
    })
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
  return_go() {
    config.ajax('POST', {
      token: wx.getStorageSync('user_token'),
      phone: this.data.user_phone,
      code: this.data.user_code
    }, '/user/change_phone', res => {
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
  onShareAppMessage: function () { return config.shareData

  }
})