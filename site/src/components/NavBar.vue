<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div class="nav">
    <ul>
      <li>
        <div>
          <h2>消费者保护专栏</h2>
          <h3>Consumer</h3>
        </div>
      </li>
      <li>
        <div>
          <h2>消费者保护专栏</h2>
          <h3>Consumer</h3>
        </div>
      </li>
      <li>
        <div>
          <h2>消费者保护专栏</h2>
          <h3>Consumer</h3>
        </div>
      </li>
      <li>
        <div>
          <h2>消费者保护专栏</h2>
          <h3>Consumer</h3>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.nav {
  position: absolute;
  z-index: 300;
  width: 100%;
  left: 0;
  top: 0;
  box-sizing: border-box;
  padding: 3vw;
  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  li {
    position: relative;
    width: 100%;
    max-width: 15vw;
    opacity: 1;
    border-radius: 50%;
    white-space: nowrap;
    text-align: center;
    &:after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      padding-bottom: 100%;
      vertical-align: middle;
    }
    & > div {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    h2 {
      font-size: 1.6em;
    }
    h3 {
      display: block;
      font-style: normal;
      font-weight: 100;
    }
  }
}
</style>
