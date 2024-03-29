//app.js
const config = require('./utils/util.js')
App({
  config: config,
  onLaunch: function () {
    console.log(wx.getStorageSync('user_token'))
  },
  globalData: {
    user_token: wx.getStorageSync('user_token') || '',
    userInfo: wx.getStorageSync('userInfo') || null,
    wx_code: null,
    wx_openid: wx.getStorageSync('user_openid') || null,
    inviter_id: wx.getStorageSync('inviter_id') || null
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.login({
      success: (res) => {
        if (res.code) {
          console.log(res.code)
          this.globalData.wx_code = res.code
        } else {
          console.log('登录失败！' + res.errMsg)
        }

      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})
