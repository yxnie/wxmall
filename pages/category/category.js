// pages/category/category.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    id: null,
    data: null,
    info: null
  },
  getData() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`category/categoryNav?id=${this.data.id}`).then(res => {
      // console.log(res.data)
      this.setData({
        list: res.data.navData,
        info: res.data.currentNav,
      })
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  getcon(){
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`goods/goodsList?categoryId=${this.data.id}`).then(res => {
      // console.log(res.data)
      this.setData({
        data: res.data.data,
      })
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  checkType(e) {
    this.setData({
      id: e.currentTarget.dataset.id
    })
    this.data.list.map(item => {
      if (item.id === this.data.id) {
        this.setData({
          info: item
        })
      }
    })
    this.getcon()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id * 1
    })
    this.getData(),
    this.getcon()
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