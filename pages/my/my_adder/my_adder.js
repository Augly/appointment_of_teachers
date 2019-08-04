const config=require('../../../utils/util.js')
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'CRYBZ-QLP6D-JSX4T-PRAJD-EATR6-I4BAK'
    });
  },
  get_list(){
    config.tajax('POST',{
      token:wx.getStorageSync('user_token'),
      page:this.data.page
    },'/user/address_list',res=>{
      console.log(res)
      this.setData({
        list:res.data.data
      })
    })
  },
  del(e){
    var _arr = this.data.list
    config.tajax('POST', {
      token: wx.getStorageSync('user_token'),
      teacher_address_id: _arr[e.currentTarget.dataset.index].teacher_address_id,
    }, '/user/address_del', res => {
      this.get_list()
    })
  },
  change(e){
    var _arr=this.data.list
    _arr[e.currentTarget.dataset.index].teacher_address_ispresent = _arr[e.currentTarget.dataset.index].teacher_address_ispresent==2?1:2
    _arr[e.currentTarget.dataset.index].token=wx.getStorageSync('user_token')
    _arr[e.currentTarget.dataset.index].name = wx.getStorageSync('user_token')

    config.tajax('POST', {
      token: wx.getStorageSync('user_token'),
      name: _arr[e.currentTarget.dataset.index].teacher_address_name,
      teacher_address_id: _arr[e.currentTarget.dataset.index].teacher_address_id,
      longitude: _arr[e.currentTarget.dataset.index].teacher_address_longitude,
      latitude: _arr[e.currentTarget.dataset.index].teacher_address_latitude,
      ispresent: _arr[e.currentTarget.dataset.index].teacher_address_ispresent
    }, '/user/address_editok', res => {
      this.setData({
        list: _arr
      })
    })
    
  },
  //选择位置并下单
  moveToLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            console.log(addressRes)
            var address = addressRes.result.address + addressRes.result.formatted_addresses.recommend;
            config.tajax('POST', {
              token: wx.getStorageSync('user_token'),
              latitude: res.latitude,
              longitude: res.longitude,
              name: address,
              ispresent:1,
            }, '/user/address_insert', res => {
              that.get_list()
            })
          }
        });
      },
      fail: function (err) {
        // config.mytoast('下单失败!您未确认地址!')
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.get_list()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.get_list()
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