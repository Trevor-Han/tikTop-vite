<template>
  <div
    class="profile-page"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
  >
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

    <div class="edit-data">
      <div class="edit-item">
        <span class="edit-label">编辑资料</span>
        <span class="edit-value">80%</span>
      </div>
      <div class="edit-item">
        <span class="edit-label">添加朋友</span>
      </div>
    </div>

    <!-- 功能按钮 -->
    <div class="functional-buttons">
      <van-tabs v-model="active" sticky animated :color="vanColor" swipeable @change="changeVanTab">
        <van-tab v-for="item in tabs" :key="item.value" :title="item.label" :name="item.value">
          <template #title> {{ item.label }}
            <van-icon v-if="active === item.value" :name="item.icon" size="12" color="#999" />
          </template>
          <Loading />
          <div class="tabs-content">
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
            <div class="tabs-con-item">135</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useCounterStore_1 } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import Loading from '@/components/Loading/index.vue'

const counter = useCounterStore_1()
const { theme } = storeToRefs(counter)

const nickname = ref('TTCV')
const followers = ref(149)
const followings = ref(6)
const posts = ref(27)
const active = ref('works')
const vanColor = ref('#333')
const fixedLocationY = ref(0)
const startLocationY = ref(0)
const startTime = ref(0)
const isScroll = ref(false)

const tabs = ref([
  { label: '作品', value: 'works', icon: 'arrow-down' },
  { label: '私密', value: 'privacy', icon: 'lock' },
  { label: '推荐', value: 'recommend', icon: '' },
  { label: '收藏', value: 'collect', icon: 'star' },
  { label: '喜欢', value: 'like', icon: 'like' }
])
vanColor.value = theme.value === 'light' ? '#333' : '#ffe903'

watch(theme, val => {
  vanColor.value = val === 'light' ? '#333' : '#ffe903'
})

const changeVanTab = (val) => {
  active.value = val
}

const touchStart = (e) => {
  isScroll.value = true
  fixedLocationY.value = startLocationY.value = e.touches[0].pageY
  startTime.value = Date.now()
}
const touchMove = (e) => {
  if (!isScroll.value) return

  let pageY = (e.touches[0].pageY - startLocationY.value)
  // const moveDistance = e.touches[0].pageY - fixedLocationY.value
  const view = document.querySelector('.profile-header')
  const pageView = document.querySelector('.profile-page')
  const rect = view.getBoundingClientRect()
  pageY = (e.touches[0].pageY - startLocationY.value) > 0 ? pageY : 0

  if (rect.top > 48) {
    if (pageY !== 0) {
      pageView.style.height = '90vh'
      pageView.style.overflow = 'hidden'
    } else {
      pageView.style.height = 'auto'
      pageView.style.overflow = 'auto'
    }
    view.style.height = 260 + (pageY) + 'px'
    view.style.transition = 'all 0s'
  }
  fixedLocationY.value = e.touches[0].pageY
}
const touchEnd = (e) => {
  isScroll.value = false
  const view = document.querySelector('.profile-header')
  view.style.height = 260 + 'px'
  view.style.transition = 'all 0.5s'
}

</script>

<style scoped lang="scss">
@import "./style/style";
</style>
