<template>
  <van-swipe
    class="van_swipe"
    :show-indicators="false"
    vertical
    :loop="false"
    @change="change"
    @touchstart="touchstart"
    @touchend="touchend"
  >
    <van-swipe-item
      v-for="(item,index) in state.videoList"
      :key="item.author_id"
      class="product_swiper"
    >
      <div class="video_container">
        <!--视频流
            webkit-playsinline ios 小窗播放，使视频不脱离文本流，安卓则无效
            微信内置x5内核，
            x5-video-player-type="h5-page" 启用H5播放器,是wechat安卓版特性，添加此属性，微信浏览器会自动将视频置为全屏
            x5-video-player-fullscreen="true" 全屏设置，设置为 true 是防止横屏
            x5-video-orientation 控制横竖屏 landscape 横屏，portrain竖屏； 默认portrain
            poster：封面
            src：播放地址
            :src="item.url"
            -->
        <video
          ref="player"
          loop
          class="video_box"
          playsinline
          preload="auto"
          :src="item.src"
          webkit-playsinline="true"
          x5-video-player-type="h5-page"
          x5-video-player-fullscreen="true"
          @ended="onPlayerEnded"
          @click="pauseVideo"
        />
        <!-- 封面 -->
        <!--<img  class="background-play" :src="item.cover"/>-->
        <!--暂停播放-->
        <img
          v-if="state.playOrPause"
          src="../../assets/pausePlay.png"
          class="icon_play"
          alt="playOrPause"
          @click="playVideo"
        >
      </div>
      <!-- 右侧头像、点赞、评论、分享功能 -->
      <div class="tools_right">
        <!-- 关注该作者 -->
        <div class="tools_r_li">
          <img
            :src="item.tag_image"
            class="tag_image"
            alt=""
          >
          <van-icon
            v-show="!item.tagFollow"
            name="plus"
            class="tag_add"
            @click="checkSubscribe(item,index)"
          />
          <van-icon
            v-show="item.tagFollow"
            name="success"
            class="tag_dui"
            :class="item.tagFollow?'tag_dui_active':''"
            @click="checkSubscribe(item,index)"
          />
        </div>
        <!--  改变收藏状态 -->
        <div
          class="tools_r_li"
          @click="changeFabulous(item,index)"
        >
          <van-icon
            name="like"
            class="icon_right"
            :class="item.fabulous?'fabulous_active':''"
          />
          <div class="tools_r_num">52.1w</div>
        </div>
        <!-- 弹出评论窗口 -->
        <div
          class="tools_r_li"
          @click="changeComment"
        >
          <van-icon
            name="chat"
            class="icon_right icon_right_change"
          />
          <div class="tools_r_num">12.5w</div>
        </div>
        <!-- 展示分享弹窗 -->
        <div
          class="tools_r_li"
          @click="changeShare"
        >
          <van-icon
            name="share"
            class="icon_right"
          />
          <div class="tools_r_num">22.2w</div>
        </div>
        <div
          class="tools_r_li music-around"
          :class="state.flag === true ? 'around':'stay'"
        >
          <img
            src="/src/assets/music.jpg"
            alt=""
            class="music_img"
          >
        </div>
      </div>
      <!-- 底部作品描述 -->
      <div class="production_box">
        <div class="production_name">
          @{{ item.author }}
        </div>
        <div class="production_des">
          {{ item.title }}
        </div>
        <div class="production_music">
          <p :class="state.flag === true ? 'production_music_around':''">{{ item.music }}</p>
        </div>
      </div>
    </van-swipe-item>
  </van-swipe>
  <div class="swipe-bottom">
    <div
      class="border-progress"
      :style="'width:'+ state.videoProcess+'%'"
    />
  </div>

  <van-popup
    v-model:show="state.commentPop"
    class="comment_container"
    closeable
    :overlay="true"
    position="bottom"
  >
    <videoComment :comment-pop="state.commentPop" />
  </van-popup>
  <van-popup
    v-model:show="state.sharePop"
    class="comment_container"
    closeable
    :overlay="true"
    position="bottom"
  >
    <videoShare />
  </van-popup>
</template>

<script setup>
import { onMounted } from 'vue'
import { videoList } from '@/api/api'
import { videoSwipe } from './videoSwipe'
import VideoComment from '/src/components/videoComment/videoComment.vue'
import VideoShare from '/src/components/share/share.vue'

const {
  state, change, playVideo, touchstart, touchend, onPlayerEnded,
  changeFabulous, changeShare, changeComment, checkSubscribe, pauseVideo
} = videoSwipe()
onMounted(() => {
  videoList().then(item => {
    state.videoList = item.data.video
  })
})

</script>

<style scoped>
  .van_swipe {
    width: 100vw;
    height: 100vh;
    max-width: 550px;
    margin: 0 auto;
    position: relative;
  }
  .product_swiper {
    width: 100vw;
    height: 100vh;
  }
  .video_box {
    object-fit: fill !important;
    z-index: 999;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
  }

  .background-play{
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
  }
  .icon_play {
    position: absolute;
    top: 44%;
    right: 0;
    left: 0;
    bottom: auto;
    margin: auto;
    z-index: 999;
    height: 60px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
  }
  /*************************************/

  /***********头像， 点赞，转发 *************/
  .tag_image {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    box-sizing: border-box;
    border-radius: 50%;
    margin-bottom: 20px;
    position: relative;
    box-shadow: 0 0 10px #9d9d9d;
  }
  .tag_add {
    font-weight: bold;
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
    border-radius: 67px;
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    margin: 0 auto;
    z-index: 1;
    font-size: 18px;
    color: #fff;
    background: #f44;
  }
  .tag_dui {
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
    border-radius: 67px;
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin: 0 auto;
    z-index: 1;
    font-size: 18px;
    font-weight: bold;
    color: #f44;
    background: #fff;
  }
  .tag_dui_active {
    opacity: 0;
    animation: showFollow 1.4s ease-in-out 0s;
  }
  .tag_add_num {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .tools_right {
    z-index: 1001;
    position: absolute;
    right: 16px;
    bottom: 60px
  }
  .tools_r_li {
    margin-bottom: 20px;
    color: #fff;
    font-size: 14px;
    position: relative;
    text-align: center;
  }
  .tools_r_li:last-child {
    margin-bottom: 0;
  }
  .icon_right {
    margin-bottom: 5px;
    font-size: 40px;
    display: block;
    text-shadow: 0 0 10px #9d9d9d;
    /*transition: .5s;*/
  }
  .fabulous_active {
    color: #f44;
    animation: showHeart .5s ease-in-out 0s;
  }
  .production_box {
    z-index: 1001;
    position: absolute;
    /* right: 16px; */
    bottom: 0;
    text-align: left;
    padding: 0 15px 70px 15px;
    color: #fff;
    width: 100%;
    left: 0;
    box-sizing: border-box;
    /*background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));*/
    /*!* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));*/
    /*!* Opera 11.1 - 12.0 *!*/
    /*background: -moz-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));*/
    /*!* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));*/
    /*!* 标准的语法 *!*/
  }
  .production_name {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .production_des {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 13px;
    width: 90%;
  }
  .production_music {
    overflow: hidden;
    margin-top: 10px;
    font-size: 13px;
    width: 80%;
  }
  .production_music p{
    margin: 0;
    width: 100%;
    font-size: 12px;
  }
  .production_music_around{
    animation: slide 5s linear 1s infinite;
    letter-spacing: 1px;
  }
  .music-around{
    width: 40px;
    height: 40px;
    margin-top: 40px;
  }
  .around .music_img{
    width: 100%;
    border-radius: 50%;
    animation: rotate 1s linear 1s infinite;
  }
  .stay .music_img{
    width: 100%;
    border-radius: 50%;

  }
  /* 定义旋转动画 */
  @keyframes rotate{
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  @keyframes showFollow {
    0% {
      opacity: 1;
      color: #fff;
      background: #F44;
      transform: rotate(-180deg) scale(1);
    }
    35% {
      opacity: 1;
      color: #f44;
      background: #fff;
      transform: rotate(0deg) scale(1.2);
    }
    80% {
      opacity: 1;
      color: #f44;
      transform: scale(1.2);
    }
    100% {
      opacity: 1;
      display: none;
      color: #f44;
      transform: scale(0);
    }
  }
  /* 定义音乐滑动动画 */
  @keyframes slide{
    0%{
      transform: translate3d(80%,0,0);
    }
    100%{
      transform: translate3d(-100%,0,0);
    }
  }
  /*************************************/

  /*************底部播放进度条*********/
  .swipe-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    max-width: 550px;
  }
  .border-progress {
    width: 0;
    height: 2px;
    background: #e2e2e2;
    position: absolute;
    z-index: 999;
    top: 0;
    transition: .1s all;
  }
  /*************************************/

</style>
