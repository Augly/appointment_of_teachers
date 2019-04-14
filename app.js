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
  }
})