// components/index/topicList/topicList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: () => []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail(e) {
      wx.navigateTo({
        url: `/pages/topicDetail/topicDetail?id=${e.currentTarget.dataset.id}`,
      })
    },
  }
})
