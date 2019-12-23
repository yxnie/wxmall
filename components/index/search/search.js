// components/index/search/search.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    data: {},
    openId: {},
    inputValue: "",
    searchResult: []
  },
  ready() {
    this.data.openId = wx.getStorageSync("openId")
    this.getData()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getData() {
      app.globalData.fly.get(`search/indexaction?openId=${this.data.openId}`).then(res => {
        console.log(res.data)
        this.setData({
          data: res.data
        })
      }).catch(err => {
        console.log(err)
      })
    },
    goSearch(e) {
      this.setData({
        inputValue: e.detail,
        value: e.detail.trim()
      })
      app.globalData.fly.get(`search/helperaction?keyword=${e.detail}`).then(res => {
        // console.log(res.data)
        this.setData({
          searchResult: res.data.keywords
        })
      }).catch(err => {
        console.log(err)
      })
    },
    goInput(e) {
      this.setData({
        inputValue: e.currentTarget.dataset.item,
        value: e.currentTarget.dataset.item.trim()
      })
      app.globalData.fly.get(`search/helperaction?keyword=${e.currentTarget.dataset.item}`).then(res => {
        // console.log(res.data)
        this.setData({
          searchResult: res.data.keywords
        })
      }).catch(err => {
        console.log(err)
      })
    },
    goBack() {
      this.triggerEvent('editSearchLock', false)
    },
    deleterAll() {
      wx.showModal({
        content: '确认删除搜索历史吗？',
        success: (res) => {
          if (res.confirm) {
            let obj = {}
            obj.openId = this.data.openId
            app.globalData.fly.post("search/clearhistoryAction", obj).then(res => {
              console.log(res.data)
              this.data.data.historyData = []
              this.setData({
                data: this.data.data
              })
            }).catch(err => {
              console.log(err)
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    goDetail(e) {
      let obj = {}
      obj.keyword = e.currentTarget.dataset.name
      obj.openId = wx.getStorageSync("openId")
      app.globalData.fly.post("search/addhistoryaction", obj).then(res => {
        console.log(res.data)
        wx.navigateTo({
          url: `/pages/goodsDetail/goodsDetail?id=${e.currentTarget.dataset.id}`,
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
})