// pages/goodsList/goodsList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,//1为新品，0为推荐
    order: true, //true为正序，false为逆序
    branch: 1, //1为综合,0为价格,2为分类
    data:[]
  },
  getData() {
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.type) {
      if (!this.data.branch) {
        if (this.data.order) {
          app.globalData.fly.get("goods/goodsList?isNew=1&order=asc").then(res => {
            // console.log(res.data)
            this.setData({
              data: res.data.data
            })
            wx.hideLoading()
          }).catch(err => {
            console.log(err)
            wx.hideLoading()
          })
        } else {
          app.globalData.fly.get("goods/goodsList?isNew=1&order=desc").then(res => {
            // console.log(res.data)
            this.setData({
              data: res.data.data
            })
            wx.hideLoading()
          }).catch(err => {
            console.log(err)
            wx.hideLoading()
          })
        }
      } else {
        app.globalData.fly.get("/goods/goodsList?isNew=1").then(res => {
          // console.log(res.data)
          this.setData({
            data: res.data.data
          })
          wx.hideLoading()
        }).catch(err => {
          console.log(err)
          wx.hideLoading()
        })
      }
    } else {
      if (!this.data.branch) {
        if (this.data.order) {
          app.globalData.fly.get("goods/goodsList?isHot=1&order=asc").then(res => {
            // console.log(res.data)
            this.setData({
              data: res.data.data
            })
            wx.hideLoading()
          }).catch(err => {
            console.log(err)
            wx.hideLoading()
          })
        } else {
          app.globalData.fly.get("goods/goodsList?isHot=1&order=desc").then(res => {
            // console.log(res.data)
            this.setData({
              data: res.data.data
            })
            wx.hideLoading()
          }).catch(err => {
            console.log(err)
            wx.hideLoading()
          })
        }
      } else {
        app.globalData.fly.get("/goods/goodsList?isHot=1").then(res => {
          // console.log(res.data)
          this.setData({
            data: res.data.data
          })
          wx.hideLoading()
        }).catch(err => {
          console.log(err)
          wx.hideLoading()
        })
      }
    }
  },
  checkBranch(e){
    this.setData({
      branch: e.currentTarget.dataset.item * 1
    })
    this.getData()
  },
  checkOrder(){
    this.setData({
      order:!this.data.order
    })
    this.getData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: options.type * 1
    })
    this.getData()
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