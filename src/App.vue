<template>
  <van-config-provider :theme-vars-light="themeVarsLight" :theme-vars-dark="themeVarsDark" :theme="theme">
    <van-switch v-model="checked" @change="themeChange" />

    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>

    <van-tabbar v-model="active" route @change="onChange">
      <van-tabbar-item name="home" replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item name="friend" to="/friend">朋友</van-tabbar-item>
      <van-tabbar-item name="add">
        <template>
          <img
            src="http://oss.jishiyoo.com/images/file-1575427746903.png"
            alt=""
          >
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="news" to="/news">消息</van-tabbar-item>
      <van-tabbar-item name="my" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </van-config-provider>
</template>

<script setup>
import { ref, reactive } from 'vue'

const active = ref(0)
const checked = ref(false)
const theme = ref('light')
const themeVarsLight = reactive({
  tabbarBackground: '#333',
  tabbarItemActiveBackground: 'transparent',
  tabbarItemFontSize: '14px',
  tabbarItemTextColor: '#aaa',
  tabbarItemActiveColor: '#fff'
})

const themeVarsDark = {
  tabbarItemFontSize: '14px',
  tabbarItemActiveColor: '#fff',
  tabbarItemTextColor: '#aaa'
}

// const activeColor = ref('#fff')
// const inactiveColor = ref('#aaa')

function onChange(name) {
  if (name === 'my') {
    themeVarsLight['tabbarBackground'] = '#fff'
    themeVarsLight['tabbarItemTextColor'] = '#666'
    themeVarsLight['tabbarItemActiveColor'] = '#000'
  } else {
    themeVarsLight['tabbarBackground'] = '#333'
    themeVarsLight['tabbarItemTextColor'] = '#aaa'
    themeVarsLight['tabbarItemActiveColor'] = '#fff'
  }
}

function themeChange(item) {
  theme.value = item ? 'dark' : 'light'
  document.documentElement.dataset.theme = item ? 'dark' : 'light'
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.van-tabbar-item--active{
  font-weight: bold;
}
p{
  margin-top: 0;
  margin-bottom: 8px;
}

</style>
