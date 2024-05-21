import request from './network'

// 获取视频
export const videoList = () => {
  return request({
    url: '/videoList/videoList.json',
    method: 'get'
  })
};

// 获取评论
export const commentList = () =>{
  return request({
    url: '/comment/commentList.json',
    method: 'get'
  })
}
