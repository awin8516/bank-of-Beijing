<script setup>
import { ref, watch } from "vue";
import NavBar from "@/components/NavBar.vue";
import Swiper from "@/components/Swiper.vue";


const props = defineProps({
  siteId: String,
  siteBanner: Array,
  siteId2: Array,
})

console.log(props.siteId);
console.log(props.siteBanner);
console.log(props.siteId2);
// const count = ref(0);

watch(
  () => props.siteBanner,
  (newVal, oldVal) => {    
    console.log('new', newVal)
    console.log('old', oldVal)
  }
)

</script>

<template>
  <div class="body">
    <NavBar />
    <Swiper :siteBanner = "props.siteBanner" />
  </div>
</template>

<style scoped lang="scss">
.body {
  position: relative;
  z-index: 1;
  height: calc( 100vh - $headerHeight);
}
</style>
