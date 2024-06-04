<template>
  <div class="profile-page">
    <div class="profile-header">
      <div class="profile-avatar">
        <van-image round fit="cover" src="" class="avatar" />
        <div class="name">
          <div class="nickname">{{ nickname }}</div>
          <div class="account">私密账号·抖音号:48879386642 </div>
        </div>
      </div>
    </div>

    <!-- 关注数、粉丝数、帖子数 -->
    <div class="stats">
      <div class="stat">
        <span class="stat-bold">{{ followers }}</span>
        <span class="stat-label">获赞</span>
      </div>
      <div class="stat">
        <span class="stat-bold">{{ followers }}</span>
        <span class="stat-label">关注</span>
      </div>
      <div class="stat">
        <span class="stat-bold">{{ followings }}</span>
        <span class="stat-label">粉丝</span>
      </div>
      <div class="stat">
        <span class="stat-bold">{{ posts }}</span>
        <span class="stat-label">帖子</span>
      </div>
    </div>

    <!-- 用户简介 -->
    <div class="profile-info">
      <p class="profile-info_header">点击添加介绍，让大家认识你...</p>
      <div class="intro">
        <span class="intro-item">27岁</span>
        <span class="intro-item">广东·佛山</span>
        <span class="intro-item">清华大学</span>
      </div>
    </div>

    <div class="profile-menu">
      <div class="menu-item">
        <van-icon name="shopping-cart-o" />
        <span class="text-value">抖音商城</span>
      </div>
      <div class="menu-item">
        <van-icon name="clock-o" />
        <span class="text-value">观看历史</span>
      </div>
      <div class="menu-item">
        <van-icon name="balance-pay" />
        <span class="text-value">我的钱包</span>
      </div>
      <div class="menu-item">
        <van-icon name="manager-o" />
        <span class="text-value">常访问的人</span>
      </div>
      <div class="menu-item">
        <van-icon name="coupon-o" />
        <span class="text-value">抖音课堂</span>
      </div>

    </div>

    <!-- 功能按钮 -->
    <div class="functional-buttons">
      <van-button class="button" plain type="text">作品</van-button>
      <van-button class="button" plain type="text">私信</van-button>
      <van-button class="button" plain type="text">推荐</van-button>
      <!-- 其他按钮... -->
    </div>
    <!-- 挑战信息（如果需要） -->
    <div class="challenge-info">
      <van-tag color="red" class="challenge-tag">傍晚的天空</van-tag>
      <van-tag class="challenge-tag">加入挑战</van-tag>
      <span class="challenge-count">5.3万人已加入挑战</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const nickname = ref('TTCV')
const followers = ref(149)
const followings = ref(6)
const posts = ref(27)

</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.profile-page {
  width: 100%;
  @include bg_color();
  font-size: 14px;
}

.profile-header {
  @include bg_theme();
  padding: 16px;
  box-sizing: border-box;
  position: relative;
  height: 260px;
}

.profile-avatar{
  position: absolute;
  bottom: 5%;
  display: flex;
  align-items: center;
  color: #ffffff;
}

.avatar {
  width: 100px;
  height: 100px;
  margin-right: 16px;
}

.nickname {
  font-size: 18px;
  font-weight: bold;
}
.account{
  font-size: 12px;
  color: #ddd;
}

.stats {
  display: flex;
  padding: 16px;
}
.stat-bold{
  font-weight: bold;
  margin-right: 3px;
  font-size: 14px;
  @include text_color();
}
.stat-label{
  font-size: 12px;
  @include text_color_second();
}

.stat {
  margin-right: 16px;
}

.profile-info {
  padding: 0 16px;
  .profile-info_header{
    font-size: 12px;
    @include text_color();
  }
}

.intro {
  .intro-item{
    font-size: 12px;
    margin-right: 8px;
    padding: 2px 3px;
    @include text_color();
    @include bg_second();
  }
}

.profile-menu{
  display: flex;
  justify-content: space-between;
  padding: 16px;
  .menu-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    .van-icon{
      @include text_color();
      font-size: 22px;
    }
    .text-value{
      @include text_icon();
      margin-top: 5px;
      font-size: 12px;
    }
  }
}

.functional-buttons {
  display: flex;
  margin-top: 8px;
}

.button {
  margin-right: 8px;
}

.challenge-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}

.challenge-tag {
  margin-right: 8px;
}

.challenge-count {
  font-size: 14px;
  color: #666;
}
</style>
