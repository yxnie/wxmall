// pages/editAddress/editAddress.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:null
  },
  addAddress(){
    wx.removeStorageSync("address")
    wx.navigateTo({
      url: "/pages/addAddress/addAddress",
    })
  },
  getData(){
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`address/getListAction?openId=${this.data.openId}`).then(res => {
      console.log(res.data.data)
      this.setData({
        data: res.data.data
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  editAdd(e){
    wx.setStorageSync("address", e.currentTarget.dataset.item)
    wx.navigateTo({
      url: "/pages/addAddress/addAddress",
    })
  },
  delterOne(e){
    app.globalData.fly.get(`address/deleteAction?id=${e.currentTarget.dataset.id}`).then(res => {
      // console.log(res.data.data)
      this.data.data.splice(e.currentTarget.dataset.index,1)
      this.setData({
        data:this.data.data
      })
    }).catch(err => {
      console.log(err)
    })
  },
  editDefult(e){
    // console.log(e)
    this.data.data.map((item,index)=>{
      if (e.currentTarget.dataset.index === index){
        item.is_default = 1
      }else{
        item.is_default = 0
      }
    })
    this.setData({
      data:this.data.data
    })
    let a = e.currentTarget.dataset.item
    let obj={}
    obj.checked = true
    obj.address = a.address
    obj.detailadress = a.address_detail
    obj.userName = a.name
    obj.telNumber = a.mobile
    obj.addressId = a.id
    obj.openId = this.data.openId
    app.globalData.fly.post("address/saveAction", obj).then(res => {
      // console.log(res.data)
      wx.showToast({
        title: '修改成功',
        icon: 'success',
      })
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.openId = wx.getStorageSync("openId")
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
    this.getData()
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