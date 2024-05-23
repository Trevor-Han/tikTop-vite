import { reactive } from 'vue'

let videoProcessInterval
export const videoSwipe = function() {
  const state = reactive({
    current: 0, // 当前视频
    playOrPause: true, // 播放开关
    pageStartY: null, // 滑动开始位置
    pageEndY: null, // 滑动结束位置
    videoList: [],
    video: [],
    flag: false, // music标志
    videoProcess: 0, // 视频播放进度
    sharePop: false, // 分享弹窗
    commentPop: false // 留言弹窗
  })
  // swipe发生变化时
  function change(e) {
    state.current = e
    state.playOrPause = false
    state.videoProcess = 0
    state.flag = true

    clearInterval(videoProcessInterval)
    const video = document.querySelectorAll('video')
    setTimeout(() => {
      if (state.pageStartY > state.pageEndY) {
        video[e].play()
        video[e - 1].pause()
        video[e - 1].currentTime = 0
        videoProcessInterval = setInterval(() => {
          changeProcess()
        }, 100)
      } else {
        video[e].play()
        video[e + 1].pause()
        video[e + 1].currentTime = 0
        videoProcessInterval = setInterval(() => {
          changeProcess()
        }, 100)
      }
    }, 100)
  }
  function touchstart(res) {
    state.pageStartY = res.changedTouches[0].pageY
  }
  function touchend(res) {
    state.pageEndY = res.changedTouches[0].pageY
  }
  // 点击播放按钮
  function playVideo() {
    state.playOrPause = false
    state.flag = true
    const video = document.querySelectorAll('video')[state.current]
    video.play()
    videoProcessInterval = setInterval(() => {
      changeProcess()
    }, 100)
  }
  // 点击暂停播放
  function pauseVideo() {
    state.playOrPause = true
    state.flag = false
    const video = document.querySelectorAll('video')[state.current]
    video.pause()
  }
  // 记录播放进度
  function changeProcess() {
    const video = document.querySelectorAll('video')[state.current]
    const currentTime = video.currentTime.toFixed(1)
    const duration = video.duration.toFixed(1)
    state.videoProcess = parseInt((currentTime / duration).toFixed(2) * 100)
  }
  // 结束播放
  function onPlayerEnded() {
    state.videoProcess = 0
    state.flag = false
    clearInterval(videoProcessInterval)
  }
  // 关注该作者
  function checkSubscribe(item) {
    state.videoList.map(v => {
      v.author_id === item.author_id ? v.tagFollow = true : ''
    })
  }
  // 改变收藏状态
  function changeFabulous(item, index) {
    state.videoList[index].fabulous = !state.videoList[index].fabulous
  }
  // 展示分享弹窗
  function changeShare() {
    state.sharePop = true
  }
  // 弹出评论窗口
  function changeComment() {
    state.commentPop = true
  }
  return {
    state, change, playVideo, touchstart, touchend, onPlayerEnded,
    changeFabulous, changeShare, changeComment, checkSubscribe, pauseVideo
  }
}
