// pages/cart/cart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    num: 0,
    allPrice: 0,
    allChecked: false,
    openId: "",
    data: []
  },
  getData() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`cart/cartList?openId=${this.data.openId}`).then(res => {
      // console.log(res.data.data)
      res.data.data.map(item => {
        item.checked = false
      })
      this.setData({
        data: res.data.data
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  checkAll() {
    this.data.allPrice = 0
    this.data.allChecked = !this.data.allChecked
    this.data.num = 0
    if (this.data.allChecked) {
      this.data.data.map(item => {
        item.checked = true
        this.data.allPrice = this.data.allPrice + item.number * item.retail_price
      })
      this.data.num = this.data.data.length
    } else {
      this.data.data.map(item => {
        item.checked = false
      })
    }
    this.setData({
      data: this.data.data,
      allChecked: this.data.allChecked,
      num: this.data.num,
      allPrice: this.data.allPrice
    })
  },
  checkOne(e) {
    this.data.allPrice=0
    this.data.data[e.currentTarget.dataset.index].checked = !this.data.data[e.currentTarget.dataset.index].checked
    this.data.num = 0
    this.data.data.map(item => {
      if (item.checked) {
        this.data.num++
        this.data.allPrice = this.data.allPrice+item.number * item.retail_price
      }
    })
    if (this.data.num === this.data.data.length) {
      this.data.allChecked = true
    } else {
      this.data.allChecked = false
    }
    this.setData({
      num: this.data.num,
      allChecked: this.data.allChecked,
      data: this.data.data,
      allPrice: this.data.allPrice
    })
  },
  delterOne(e){
    app.globalData.fly.get(`cart/deleteAction?id=${e.currentTarget.dataset.id}`).then(res => {
      this.data.data.splice(e.currentTarget.dataset.index,1)
      this.setData({
        data: this.data.data
      })
    }).catch(err => {
      console.log(err)
    })
  },
  goPay(){
    let arr=[]
    this.data.data.map(item=>{
      if (item.checked){
        arr.push(item)
      }
    })
    if (arr.length===0){
      wx.showToast({
        title: `请选择商品`,
        icon: 'none'
      })
    }else{
      wx.setStorageSync("order", arr)
      wx.navigateTo({
        url: `/pages/pay/pay?total=${this.data.allPrice}`,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.openId = wx.getStorageSync("openId")
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