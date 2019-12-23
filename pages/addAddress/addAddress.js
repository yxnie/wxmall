// pages/addAddress/addAddress.js
import area from "../../lib/area.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaShow: false,
    address: "",
    user: {
      checked: false,
      address: "",
      userName: "",
      telNumber: null,
      detailadress: "",
      openId: ""
    },
    lock: false
  },
  save() {
    app.globalData.fly.post("address/saveAction", this.data.user).then(res => {
      // console.log(res.data)
      if (this.data.lock) {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
        })
      } else {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  onChange(e) {
    this.data.user.checked = !this.data.user.checked
    this.setData({
      user: this.data.user
    })
  },
  areaConfirm(e) {
    console.log(e)
    this.data.user.address = `${e.detail.values[0].name} ${e.detail.values[1].name} ${e.detail.values[1].name}`
    this.setData({
      areaShow: false,
      user: this.data.user
    })
  },
  areaCancel() {
    this.setData({
      areaShow: false
    })
  },
  openArea() {
    this.setData({
      areaShow: true
    })
  },
  editInfo(e) {
    if (e.currentTarget.dataset.tag === "userName") {
      this.data.user.userName = e.detail.value
    }
    if (e.currentTarget.dataset.tag === "telNumber") {
      this.data.user.telNumber = e.detail.value
    }
    if (e.currentTarget.dataset.tag === "detailadress") {
      this.data.user.detailadress = e.detail.value
    }
    this.setData({
      user: this.data.user
    })
    console.log(this.data.user)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.user.openId = wx.getStorageSync("openId")
    this.setData({
      area,
    })
    if (wx.getStorageSync("address")) {
      let a = wx.getStorageSync("address")
      this.data.user.checked = a.is_default
      this.data.user.address = a.address
      this.data.user.detailadress = a.address_detail
      this.data.user.userName = a.name
      this.data.user.telNumber = a.mobile
      this.data.user.addressId = a.id
      this.data.lock = true
      this.setData({
        user: this.data.user
      })
    }
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