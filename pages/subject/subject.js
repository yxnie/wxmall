// pages/subject/subject.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    total:null,
    data:[]
  },
  getData() {
    app.globalData.fly.get(`topic/listaction?page=${this.data.page}`).then(res => {
      // console.log(res.data)
      this.setData({
        data: this.data.data.concat(res.data.data),
        total: res.data.total
      })
    }).catch(err => {
      console.log(err)
    })
  },
  goDetail(e){
    wx.navigateTo({
      url: `/pages/topicDetail/topicDetail?id=${e.currentTarget.dataset.id}`,
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
    if(this.data.page<this.data.total){
      this.data.page++
      this.getData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})