const Fly = require("./lib/fly/wx.js")
const fly = new Fly()
fly.config.baseURL = "http://118.25.222.68:5757/heyushuo"
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var userInfo = {
      openId:"JasKAScADESACcnIAnInbbwASCqyxnie"
    };
    let openId = userInfo.openId;
    wx.setStorageSync("openId", openId)
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  globalData: {
    fly
  }
})
