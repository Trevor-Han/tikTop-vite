
<template>
  <div class="menu-view">
    me-menu
  </div>
</template>
<script setup>

</script>

<style scoped lang="scss">
@import "@/assets/css/variable";
@import "@/assets/css/mixin";
.menu-view{
  position: fixed;
  right: calc(200% / -3);
  top: 0;
  @include bg_color();
  width: calc(200% / 3);
  height: 100vh;
  z-index: 99;
}
</style>
