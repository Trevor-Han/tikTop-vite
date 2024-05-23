<template>
  <div class="container_bottom">
    <div
      class="bottom_tab"
      :class="tabIndex === 0?'tab_active':''"
      @click="changeTab(0)"
    >
      <span class="bottom_tab_span ">首页</span>
    </div>
    <div
      class="bottom_tab"
      :class="tabIndex === 1?'tab_active':''"
      @click="changeTab(1)"
    >
      <span class="bottom_tab_span ">朋友</span>
    </div>
    <div
      class="bottom_tab"
      :class="tabIndex === 2?'tab_active':''"
      @click="changeTab(2)"
    >
      <img
        src="http://oss.jishiyoo.com/images/file-1575427746903.png"
        alt=""
        class="bottom_tab_icon"
      >
    </div>
    <div
      class="bottom_tab"
      :class="tabIndex === 3?'tab_active':''"
      @click="changeTab(3)"
    >
      <span class="bottom_tab_span">消息</span>
    </div>
    <div
      class="bottom_tab"
      :class="tabIndex === 4?'tab_active':''"
      @click="changeTab(4)"
    >
      <span class="bottom_tab_span">我的</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  videoProcess: Number
})
const tabIndex = ref(0)
function changeTab(index) {
  tabIndex.value = index
}
</script>

<style scoped>
  .container_bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.85);
    height: 48px;
    display: flex;
    justify-content: space-around;
  }
  .bottom_tab {
    text-align: center;
    color: #c9c9c9;
    padding: 10px 0;
  }

  .bottom_tab_icon {
    width: 44px;
  }

  .bottom_tab_span {
    line-height: 28px;
    border-bottom: 2px solid transparent;
    font-weight: 600;
    font-size: 16px;
    display: inline-block;
    padding: 0 4px;
    transition: .5s all;
  }

  .tab_active .bottom_tab_span {
    border-bottom: 2px solid #fff;
    color: #fff;
  }

</style>
