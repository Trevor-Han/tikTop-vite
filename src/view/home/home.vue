<template>
  <div class="container_box">
    <NavTop />
    <VideoSwipe />
    <VideoTab />
  </div>
</template>

<script setup>
import NavTop from '/src/components/navTop/novTop.vue'
import VideoSwipe from '/src/components/videoSwipe/videoSwipe.vue'
import VideoTab from '/src/components/videoBotton/videoBotton.vue'

</script>

<style scoped>
  .container_box {
    width: 100vw;
    height: 100vh;
    background: #000;
  }
  .back_i{
    position: fixed;
    top: 20px;
    left: 10px;
    width: 20px;
    z-index: 10;
  }

</style>
