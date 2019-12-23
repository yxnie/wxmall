  // pages/mine/mine.js
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      list: [{
          name: "我的订单",
          icon: "balance-list-o",
          path: "/pages/myOrder/myOrder"
        },
        {
          name: "优惠劵",
          icon: "medel-o",
          path: "/pages/myOrder/myOrder"
        },
        {
          name: "礼品卡",
          icon: "bill-o",
          path: "/pages/myOrder/myOrder"
        },
        {
          name: "我的收藏",
          icon: "like-o",
          path: "/pages/myOrder/myOrder"
        },
        {
          name: "我的足迹",
          icon: "eye-o",
          path: "/pages/myOrder/myOrder"
        },
        {
          name: "会员福利",
          icon: "vip-card-o",
          path: "/pages/myOrder/myOrder"
        },
        {
          name: "地址管理",
          icon: "location-o",
          path: "/pages/editAddress/editAddress"
        },
        {
          name: "账号安全",
          icon: "chat-o",
          path: "/pages/myOrder/myOrder"
        },
        {
          name: "联系客服",
          icon: "phone-circle-o",
          path: "/pages/myOrder/myOrder"
        },
        {
          name: "帮助中心",
          icon: "question-o",
          path: "/pages/myOrder/myOrder"
        },
        {
          name: "意见反馈",
          icon: "notes-o",
          path: "/pages/suggest/suggest"
        },
      ],
      user: {},
      lock: true
    },
    onGotUserInfo(e) {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            console.log(e.detail.userInfo)
            this.setData({
              user: e.detail.userInfo,
              lock: false
            })
            wx.setStorageSync('user', e.detail.userInfo)
          } else {
            wx.showModal({
              title: '特别提醒',
              content: '您已拒绝授权登录，可能无法正常使用该程序，请再次点击登陆',
              showCancel: false,
              success(res) {
                if (res.confirm) {}
              }
            })
          }
        },
      })
    },
    goPath(e){
      wx.navigateTo({
        url: e.currentTarget.dataset.path,
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      if (wx.getStorageSync("user")) {
        this.setData({
          lock: false,
          user: wx.getStorageSync("user")
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