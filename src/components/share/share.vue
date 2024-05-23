<template>
  <!--分享弹框-->
  <div class="share_box">
    <div class="share_tips">分享到</div>
    <ul class="share_ul">
      <li class="share_li pengyouquan_li">
        <van-icon
          name="music"
          color="#ff4d4d"
          class="pengyouquan"
        />
      </li>
      <li class="share_li">
        <van-icon
          name="wechat"
          color="#2ba245"
          class="weixin"
        />
      </li>
      <li
        class="share_li"
        @click="copyUrl"
      >
        <van-icon
          name="share"
          color="#999"
          class="lianjie"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { Toast } from 'vant'
function copyUrl() {
  const httpUrl = window.location.href
  const oInput = document.createElement('input')
  oInput.value = httpUrl
  document.body.appendChild(oInput)
  oInput.select() // 选择对象
  document.execCommand('Copy') // 执行浏览器复制命令
  oInput.className = 'oInput'
  oInput.style.display = 'none'
  Toast('链接复制成功')
}
</script>

<style scoped>
  /*分享样式*/
  .share_box {
    width: 100%;
    background: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: .5s;
  }

  .share_tips {
    text-align: center;
    font-size: 20px;
    line-height: 55px;
    color: #333;
  }

  .share_ul {
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    width: 100%;
    /*border-bottom: 1px solid #e8e8e8;*/
    padding: 30px 0;
  }

  .share_li {
    font-size: 35px;
    text-align: center;
  }

  .share_li i {
    font-size: 44px;
  }

  .share_cancel {
    padding: 10px;
    text-align: center;
    font-size: 18px;
    color: #999;
  }
</style>
