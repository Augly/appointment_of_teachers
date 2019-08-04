// pages/share/share.js
const config=require('../../utils/util.js')
const ctx = wx.createCanvasContext('myCanvas');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mask:false,
    codeImg:'',
    imglist: ['http://class.zzvlm.com/2017041969914926076563635@2x.png', 'http://img.zcool.cn/community/019b7e5bbe34c9a801213dea292f6e.png@2o.png', 'http://class.zzvlm.com/123551@2x.png','https://fapiao.gaodun.com/Public/cma/x_bg.png'],
    list: ['语文','化学化学','英语'],
    name:'仇益阳',
    tip:'活泼可爱',
    school:'北大',
    _class:'计算机'
  },
  //保存图片
  save_pic(){
    this.setData({
      mask:false
    })
  },
  showmask(){
    this.setData({
      mask: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_userInfo()
    this.get_code()
  },
  get_userInfo() {
    config.tajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/teacher_info', res => {
      this.setData({
        'imglist[1]': 'http://yueke.dazhu-ltd.cn/public/uploads/' + res.data.data.teacher_portrait,
        name: res.data.data.teacher_exigency_name,
        list: res.data.data.teacher_subjects.map((item)=>{
          return item.subjects_name
        }),
      })
    })
  },
  get_code(){
    config.ajax('POST', {
      token: wx.getStorageSync('user_token')
    }, '/user/user_qrcode', res => {
      console.log(res)
        this.setData({
          codeImg: 'http://yueke.dazhu-ltd.cn/public/uploads/' + res.data.data
        })
    })
  },
  show_mask(){
    wx.showLoading({
      title: '正在生成图片',
    })
    this.downImg(this.data.imglist)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that=this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systemInfo: res,
          rem: res.screenWidth / 750
        })
      }
    })
  },
  rem(int) {
    return int * this.data.rem
  },
  downImg (list) {
    var that = this
    let imglist = []
    let n = 0

    function up() {
      wx.downloadFile({
        url: list[n],
        success:(res)=>{
          if (res.statusCode == 200) {
            imglist.push(res.tempFilePath)
            n++
            if (n == list.length) {
              that.setData({
                newList: imglist,
              })

              that.Canvas(that)
            } else {
              up(n)
            }
          }
        }
      })
    }
    up()


  },
  /**
   * 创建画布内容
   */
  Canvas(that) {
    var that = this
    //绘制背景
    ctx.drawImage(that.data.newList[3], 0, 0, that.rem(592), that.rem(768));
    //绘制小程序二维码
    ctx.drawImage(that.data.codeImg, that.rem(160), that.rem(66), that.rem(272), that.rem(272));
    //绘制头像
    ctx.save()
    ctx.beginPath(); 
    ctx.arc(that.rem(96) / 2 + that.rem(34), that.rem(96) / 2 + that.rem(376), that.rem(96) / 2, 0, Math.PI * 2, false);
    ctx.clip()
    ctx.drawImage(that.data.newList[1], that.rem(34), that.rem(376), that.rem(96), that.rem(96))
    ctx.restore(); 
    //绘制用户名
    ctx.setFontSize(that.rem(34))
    ctx.setTextAlign('left')
    ctx.setFillStyle('#2C2C2C')
    ctx.fillText(that.data.name, that.rem(146), that.rem(417))
    //绘制用户标签
    // ctx.setFillStyle('#60EAF3')
    // ctx.fillRect(that.rem(160) + ctx.measureText(that.data.name).width, that.rem(417 - 30), that.rem(128), that.rem(40))
    // ctx.setFontSize(that.rem(24 ))
    // ctx.setTextAlign('left')
    // ctx.setFillStyle('#FFFFFF')
    // ctx.fillText(that.data.tip, that.rem(160 + 45) + ctx.measureText(that.data.name).width, that.rem(417), that.rem(128))
    //绘制学院信息
    ctx.setFontSize(that.rem(22))
    ctx.setTextAlign('left')
    ctx.setFillStyle('#999999')
    ctx.fillText(that.data.school + ' · ' + that.data._class, that.rem(146), that.rem(457))
    ctx.draw(true)
    //绘制线条
    ctx.setLineWidth(that.rem(2))
    ctx.moveTo(that.rem(34), that.rem(538))
    ctx.lineTo(that.rem(34) + that.rem(518), that.rem(538))
    ctx.setStrokeStyle('#60EAF3')
    ctx.stroke()
    //绘制优势学科
    ctx.drawImage(that.data.newList[2], that.rem(34), that.rem(568), that.rem(52), that.rem(48));
    ctx.setFontSize(that.rem(34))
    ctx.setTextAlign('left')
    ctx.setFillStyle('#2C2C2C')
    ctx.fillText('优势学科', that.rem(100), that.rem(568+38))
    ctx.draw(true)
    //绘制优势学科
    that.forlist(that.data.list, that, ctx)
    wx.hideLoading()
    that.setData({
      mask: true
    })
  },
  drawtitle(ctx, textmain, t, that){
    ctx.beginPath()
    ctx.setLineWidth(that.rem(1))
    ctx.setStrokeStyle('#60EAF3')
    ctx.strokeRect(that.rem(34) + that.rem(144+34)*t, that.rem(654), that.rem(144), that.rem(64))
    ctx.draw(true)
    ctx.setFontSize(that.rem(26))
    ctx.setTextAlign('center')
    ctx.setFillStyle('#2C2C2C')
    ctx.setTextBaseline('middle')
    ctx.fillText(textmain, that.rem(34 + 144/2) + that.rem(144 + 34) * t, that.rem(654+32), that.rem(144))
    ctx.draw(true)
  },
  forlist(list, that, ctx) {
    for (let t = 0; t < list.length; t++) {
      that.drawtitle(ctx, list[t], t, that)
    }
    ctx.draw(true)
    wx.hideLoading()
    that.setData({
      isShow: false
    })
  },
  save() {
    var that = this
    wx.showLoading({
      title: '正在保存...',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: that.rem(592),
        height: that.rem(768),
        canvasId: 'myCanvas',
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.hideLoading()
              wx.showToast({
                title: '保存成功!',
                icon: '',
                image: '',
                duration: 2000,
                mask: true,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            },
            fail(res) { },
            complete(res) { }
          })
        }
      })
    }, 1500)
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