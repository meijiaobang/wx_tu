// 云函数入口函数
const cloud = require('wx-server-sdk')
cloud.init()
// 引入ajax库
const rp = require("request-promise")
// 云函数入口函数
exports.main = async (event, context) => {
  // 创建url
  var url = `http://api.douban.com/v2/movie/subject/`;
  url += `${event.id} `;
  url += `?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  // 使用request-promise发送请求
  return rp(url).then(res => {
    // console.log(res)
    return res;
  })
    .catch(err => {
      console.log(err)
    })
}