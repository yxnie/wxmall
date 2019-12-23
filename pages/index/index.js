//index.js
//获取应用实例
const app = getApp()
import QQMapWX from "../../lib/qqmap-wx-jssdk.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchLock: false, //搜索组件开关
    data: {},
    location:""
  },
  getData() {
    app.globalData.fly.get("index/index").then(res => {
      console.log(res.data)
      this.setData({
        data: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  },
  openSearch() {
    this.setData({
      searchLock: true
    })
  },
  editSearchLock() {
    this.setData({
      searchLock: false
    })
  },
  goGoodsList(e) {
    wx.navigateTo({
      url: `/pages/goodsList/goodsList?type=${e.currentTarget.dataset.item * 1}`,
    })
  },
  getLocation() {
    wx.getLocation({
      success: (res) => {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        let qqmapsdk = new QQMapWX({
          key: 'DPEBZ-SXF6X-IDK45-7O6JH-LJZZE-KIB42'//此处使用你自己申请的key  
        });
        // 腾讯地图调用接口  
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: (res)=> {
            console.log(res)
            this.setData({
              location: res.result.address_component.street_number
            })
            wx.setStorageSync("location", res)
          },
        });
      },
      fail: (err) => {
        this.showModal()
      }
    })
  },
  showModal(){
    wx.showModal({
      title: '特别提醒',
      content: '若不授权，则无法正常使用该程序',
      success: (res) => {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              this.getLocation()
            },
            fail: (err) => {
              this.showModal()
            }
          })
        } else {
          this.showModal()
        }
      }
    })
  },
  goLocation(){
    wx.navigateTo({
      url: '/pages/location/location',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    if (wx.getStorageSync("location")){
      // this.setData({
      //   location: wx.getStorageSync("location")
      // })
      this.setData({
        location: wx.getStorageSync("location").result.address_component.street_number
      })
    }else {
      this.getLocation()
    }
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
