// 云函数入口文件
const cloud = require('wx-server-sdk')
const rq = require("request-promise")
cloud.init()

exports.main = async (event, context) => {
  var url = `http://api.douban.com/v2/movie/subject/`;
  url += `${event.id}`;
  url += `?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  return rq(url).then(res => {
    return res;
  }).catch(err => {
    console.log(err);
  })
}

