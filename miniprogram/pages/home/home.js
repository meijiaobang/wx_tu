// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页码(第几页)
    pno:0,
    // 电影列表
    list:[]
  },
  jumpcomment:function(event){
    // 1.获取当前电影id
    var id=event.target.dataset.id;
    // 2.跳转comment组件
    // 关闭跳转：当前组件关闭（卸载）
    // wx.redirectTo({
    //   url: '/pages/comment/comment?id='+id,
    // })保留跳转
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  loadmore:function(){
    // 当前页数加一
    var pno=this.data.pno+1;
    this.setData({
      // 修改data页码
      pno:pno
    })
    var offset=(pno-1)*4
    // 功能：调用云函数完成数据加载
    // 1.调用云函数
    wx.cloud.callFunction({
      name:"movielist1905",//云函数名称
      data:{
        start:offset,//参数：起始行数
        // 几条记录
        count:4
      }
    })
    .then(res=>{
      // console.log(res.result)
      // 豆瓣发string-》云函数string
      // string转换为js对象
      var rows=JSON.parse(res.result);//云函数返回结果
      //  console.log(res.result);
      var lists=this.data.list.concat(rows.subjects)
      this.setData({
        list:lists,
      })
    })
    .catch(err=>{
      console.log(err)
    })
    // 2.获取云函数返回结果
    // 3.将返回结果保存data中
    // 4.显示电影列表
  },
  onLoad: function (options) {
     this.loadmore();
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
   console.log(123)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  // console.log(1)
  // 加载下一页数据
  this.loadmore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})