<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
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
  position: fixed;
  z-index: 300;
  width: 100%;
  height: 15vw;
  padding: 3vw;
  left: 0;
  top: 0;
  box-sizing: border-box;
  text-align: left;
  background-color: #fff;
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
    color: $myColor;
    line-height: 1;
    margin-left: 0vw;
  }
  .btn-fullscreen {
    width: 7vw;
    height: 7vw;
    background: url(../assets/images/common/icon-fullscreen-w2.png) $myColor no-repeat
      center / 90% auto;
    box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    border: 5px #fff solid;    
  }
}
</style>
