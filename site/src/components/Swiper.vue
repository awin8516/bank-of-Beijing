<script setup>
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from 'swiper/vue'
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { ref, watch } from 'vue';
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

const props = defineProps({
  siteBanner: Array,
})

watch(
  () => props.siteBanner,
  (newVal, oldVal) => {    
    console.log('new', newVal)
    console.log('old', oldVal)
  }
)

</script>

<template>
  <swiper
          :slides-per-view="1"
          :navigation="{
            nextEl: '.swiper-button-next', //前进后退按钮
            prevEl: '.swiper-button-prev',
          }"
          :pagination="{ clickable: true }"
          :autoplay="{ disableOnInteraction: false }"
          loop 
          :scrollbar="{ draggable: true }"
          class="teacher_ul"
        >
          <swiper-slide
            class="teacher_li"
            v-for="(item, index) in props.siteBanner"
            :key="index"
          >
            <div class="teacher_pW">
              <img :src="item" alt="">
              </div>
          </swiper-slide>
        </swiper>
</template>

<style scoped lang="scss">
.header {
}
</style>
