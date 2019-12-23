// pages/location/location.js
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:"",
    longitude:"",
    value:"",
    markers:[]
  },
  checkLocation(e){
    console.log(e)
  },
  searchLocation(e){
    var _this = this;
    console.log(e)
    if (!(e.detail.value.trim())){
      // 调用接口
      qqmapsdk.search({
        keyword: e.detail.value,  //搜索关键词
        location: `${this.data.latitude},${this.data.longitude}`,  //设置周边搜索中心点
        success: function (res) { //搜索成功后的回调
          var mks = []
          for (var i = 0; i < res.data.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: "/resources/my_marker.png", //图标路径
              width: 20,
              height: 20
            })
          }
          _this.setData({ //设置markers属性，将搜索结果显示在地图中
            markers: mks
          })
          console.log(_this.data.markers)
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.chooseLocation({
    //   success:(res)=>{
    //     // console.log(res)
    //     wx.setStorageSync("location", res.name)
    //     wx.switchTab({
    //       url: '/pages/index/index',
    //     })
    //   },
    //   fail:(err)=>{
    //     wx.switchTab({
    //       url: '/pages/index/index',
    //     })
    //   }
    // })

    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'PNRBZ-KWFKW-RYWRF-RKKQN-5UORS-44BNV'
    });
    let location=wx.getStorageSync("location")
    this.setData({
      latitude: wx.getStorageSync("location").result.location.lat,
      longitude: wx.getStorageSync("location").result.location.lng,
      markers: wx.getStorageSync("location")
    })
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