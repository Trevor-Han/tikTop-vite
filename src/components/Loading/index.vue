
<template>
  <div class="Loading" :class="isFullScreen ? 'full':'normal'">
    <div class="circle blue" />
    <div class="circle red" />
  </div>
</template>

<script setup>

defineProps({
  isFullScreen: {
    type: Boolean,
    default: false
  }
})

</script>

<style scoped lang="scss">
@import "@/assets/css/variable";
@import "@/assets/css/mixin";
.Loading {

  &.normal {
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.full {
    z-index: 999;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    width: 22px;
  }

  .circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .blue {
    background: cadetblue;
    animation: anim-blue .4s ease-in-out 0s infinite alternate;
  }

  .red {
    background: rgb(252, 47, 86);
    animation: anim-red .4s ease-in-out 0s infinite alternate;
  }

  @keyframes anim-blue {
    from {
      transform: translate3d(0, 0, 0) scale(1);
    }
    to {
      transform: translate3d(10px, 0, 0) scale(1.2);
    }

  }
  @keyframes anim-red {
    from {
      transform: translate3d(0, 0, 0) scale(1);
    }
    to {
      transform: translate3d(-10px, 0, 0) scale(1.2);
    }
  }
}
</style>
