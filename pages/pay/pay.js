// pages/pay/pay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: [],
    totle: 0,
    openId: "",
    data: null
  },
  getData() {
    app.globalData.fly.get(`address/getListAction?openId=${this.data.openId}`).then(res => {
      console.log(res.data.data)
      if (res.data.data) {
        res.data.data.map(item => {
          if (item.is_default) {
            this.data.data = item
          }
        })
        if (!this.data.data) {
          this.data.data = res.data.data[0]
        }
        this.setData({
          data:this.data.data
        })
      }
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  goEditAdd(){
    wx.navigateTo({
      url: "/pages/editAddress/editAddress",
    })
  },
  pay(){
    wx.showToast({
      title: `购买成功，共${this.data.totle}元`,
      icon: 'none'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.openId = wx.getStorageSync("openId")
    this.setData({
      order: wx.getStorageSync("order"),
      totle: options.total
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})