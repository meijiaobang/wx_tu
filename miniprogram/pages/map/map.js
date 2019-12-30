// pages/map/map.js
Page({

  /**
  * 页面的初始数据
  */
  data: {
    polyline: [
      {
        points: [//坐标点
          { longitude: 114.403939, latidude: 30.511721 },
          { longitude: 114.214097, latidude: 30.563836 }
        ],
        color: "#fc0",
        width: 10
      }
    ],
    //地图上显示控件：图片
    controls: [
      {
        id: 0,//控件id数值
        iconPath: "/images/04.png",
        position: {
          left: 60,
          top: 200,
          width: 15,
          height: 15
        }
      }
    ]
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {

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