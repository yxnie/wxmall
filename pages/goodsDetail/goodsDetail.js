// pages/goodsDetail/goodsDetail.js
const app = getApp()
var WxParse = require('../../lib/wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    indicatorDots: true, //导航点
    autoplay: true,
    circular: true, //衔接滑动
    interval: 5000,
    duration: 1000,
    list: [{
        title: "30天无忧退货",
        img: '../../images/circle.png'
      },
      {
        title: "48小时快速退款",
        img: '../../images/circle.png'
      },
      {
        title: "满88元免邮费",
        img: '../../images/circle.png'
      },
    ],
    show: false,
    num: 1,
    collected: false,
    id: null,
    openId:"",
    cartNum:null
  },
  getData(id, openId) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`goods/detailaction?id=${id}&openId=${openId}`).then(res => {
      console.log(res.data)
      this.setData({
        data: res.data,
        collected: res.data.collected
      })
      if (this.data.data.info.goods_desc){
        WxParse.wxParse('artical', 'html', this.data.data.info.goods_desc, this, 0);
      }
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  getCart(){
    app.globalData.fly.get(`cart/cartList?openId=${this.data.openId}`).then(res => {
      console.log(res.data.data)
      res.data.data.map(item=>{
        this.data.cartNum = this.data.cartNum + item.number
      })
      this.setData({
        data : res.data.data,
        cartNum : this.data.cartNum
      })
    }).catch(err => {
      console.log(err)
    })
  },
  checkNum() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onChange(event) {
    console.log(event.detail);
    this.setData({
      num: event.detail
    })
  },
  collect() {
    this.setData({
      collected: !this.data.collected
    })
    let arr = {}
    arr.goodsId = this.data.id
    arr.openId = wx.getStorageSync("openId")
    app.globalData.fly.post("collect/addcollect", arr).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  },
  addCart() {
    let arr = {}
    arr.goodsId = this.data.id
    arr.openId = wx.getStorageSync("openId")
    arr.number = this.data.num
    this.data.cartNum = this.data.cartNum+1
    this.setData({
      cartNum: this.data.cartNum
    })
    app.globalData.fly.post("cart/addCart", arr).then(res => {
      // console.log(res.data)
      wx.showToast({
        title: '成功',
        icon: 'success'
      })
    }).catch(err => {
      console.log(err)
    })
  },
  goCart() {
    wx.switchTab({
      url: "/pages/cart/cart",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    this.setData({
      id: options.id,
      openId: wx.getStorageSync("openId")
    })
    this.getData(options.id, wx.getStorageSync("openId"))
    this.getCart()
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