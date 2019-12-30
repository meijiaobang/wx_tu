// miniprogram/pages/mymovie/mymovie.js
// 创建数据库对象
const db=wx.cloud.database({
   
  });
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前用户喜欢电影名称
     moviename:"",
    //  喜欢原因
    content:"",
    // 保存选中图片列表
    images:[],
    // 保存上传文件fileID
    fileIds:[],
  },
  submit:function(){
    // 提交：
    // 功能一：将选中的图片上传到云存储中
    // 功能二：将用户的信息fileid添加云数据库
    // 1.显示数据加载提示框
    wx.showLoading({
      title: '数据加载中',
    });
    // 2.创建数组保存promise对象
    var rows=[];
    // 3.创建循环遍历选中图片列表
    for(var i=0;i<this.data.images.length;i++){
      // 4.创建promise对象完成上传
      rows.push(new Promise((resolve,reject)=>{
        // 5.获得当前文件名
            var item=this.data.images[i];
        // 6.获取后缀名称。jpg
            var suffix=/\.\w+$/.exec(item);
        // 7.创建新文件名时间+随机数+后缀
            var newFile=new Date().getTime();
            newFile += Math.floor(Math.random() * 9999);
            newFile+=suffix;
        // 8.上传图片
        wx.cloud.uploadFile({
          cloudPath: newFile, //新文件名
          filePath: item, //原文件名
          success: (res => {
            // 2.在添加属性 fileIds:[]  上传文件id
            // 6.5在data属性添加数组 fileIds 文件 id
            var fid = res.fileID;
            // 6.6 上传成功将fileID保存
            this.data.fileIds.push(fid);
            // 6.7上传成功后执行解析
            resolve();
          })
        })
        // 9.上传成功将fileId保存
      }));//primise end
    }//end for
    // 功能二：等待所有promise对象执行完毕
    // 11.获取用户留言
    Promise.all(rows).then(res=>{
      var msg = this.data.content;
      // 12.当前电影名称
      var name = this.data.moviename;
      // 13.获取上传图片filesIds
      var fileId = this.data.fileIds;
      // 14.创建数据库对象
      // 15.云数据库控制台创建集合：mymovied
      // 16.向mymovied集合中添加一条记录
      db.collection("mymovied")
        .add({
          data: {
            msg: msg,
            name: name,
            fileId: fileId,
          }
        })
        // 17.添加成功
        .then(res => {
          console.log(res),
            // 18.隐藏加载提示框
            wx.hideLoading();
          // 19.显示短消息提示框  提交成功
          wx.showToast({
            title: '提交成功!',
          })
        })
    })//promise.all  end
      
  },
  jumpDetail:function(){
    // 跳转电影详情列表
    wx.navigateTo({
      url: 'pages/movieDetail/movieDetail',
    })
  },
  upload:function(){
    // 功能：
    // 1.选择多张图片
    // 2.将图片显示在imagelist区域
      // 1.在data中太添加属性images
      // 2.显示数据加载提示框
      wx.showLoading({
        title: '图片上传中....',
      })
      wx.chooseImage({
        // 3.选择 多张图片
        count:9,
        // 4.图片来源
        sizeType: ["original", "compressed"],
        // 5.图片类型
        sourceType: ['album', 'camera'],
        // 6.选择成功
        success:(res)=>{
          var list=res.tempFilePaths;
          // 7.将选中图片保存images
          this.setData({
            images:list,
          })
          // 8.隐藏加载提示框
          wx.hideLoading();
        },
      })
      
      
     
  },
  onChangeContent:function(event){
    // 当用户输入内容时出发事件
    this.setData({
      content: event.detail
    })
  },
  onChangeMname:function(event){
    // 修改电影名称
    this.setData({
      moviename:event.detail
    })
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