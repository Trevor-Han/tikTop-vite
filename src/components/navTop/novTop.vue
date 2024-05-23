<template>
  <div class="nav-top">
    <van-icon
      name="tv-o"
      class="nav-left"
    />
    <div class="nav-center">
      <div
        v-for="(item,index) in navData.tabList"
        :key="index"
        :class="navData.current === index ? 'current':''"
        @click="navItemClick(index)"
      >{{ item.title }}</div>
    </div>
    <van-icon
      name="search"
      class="nav-right"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const navData = reactive({
  tabList: [
    { title: '同城' },
    { title: '关注' },
    { title: '推荐' }
  ],
  current: 2
})
function navItemClick(index) {
  navData.current = index
}

</script>

<style scoped>
.nav-top{
  position: fixed;
  width:100%;
  height:50px;
  top:25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  line-height: 50px;
  z-index: 999999;
  color:#fff;
  font-family: SimHei;
}
  .nav-left{
    width: 50px;
    font-size: 25px;
  }
  .nav-center{
    width: 50%;
    display: flex;
    justify-content: space-around;
    font-size: 20px;
  }
  .nav-right{
    width: 50px;
    font-size: 25px;
  }
.current{
  color:#787878
}
</style>
