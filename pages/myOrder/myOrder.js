// pages/myOrder/myOrder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:"",
    data:null
  },
  getData(){
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`collect/listAction?openId=${this.data.openId}`).then(res => {
      console.log(res.data)
      this.setData({
        data: res.data.collectGoodsList
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  goDetail(e) {
    wx.navigateTo({
      url: `/pages/goodsDetail/goodsDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.openId = wx.getStorageSync("openId")
    this.getData()
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