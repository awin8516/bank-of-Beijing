<script setup>
import { ref } from "vue";

</script>

<template>
  <div class="header">
    <img class="logo-img" src="@/assets/images/logo.png" />
    <div class="slogan">真诚 所以依赖dsfs</div>
    <div class="btn-fullscreen"></div>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: $headerHeight;
  padding: 3vw;
  left: 0;
  top: 0;
  box-sizing: border-box;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  .slogan {
    font-size: 3vw;
    font-weight: bold;
    line-height: 1;
  }
  .btn-fullscreen {
    width: 7vw;
    height: 7vw;
    border-radius: 50%;
  }
}
</style>
