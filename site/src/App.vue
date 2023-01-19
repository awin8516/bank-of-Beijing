<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import BodyContent from "./components/BodyContent.vue";

import {API} from '@/api/api.ts'


let siteId = fn.getQueryString("siteId");
let siteId2 = ["aaa","bbb","ccc"];

let siteBanner = ref([]);

const getSiteInfo = async () => {
  const Params = {
    id: siteId,
  }
  const res = await API.getSiteInfo(Params)
  document.body.classList.add("theme-ui-" + res.result.siteTheme)
  siteBanner.value = res.result.siteBanner;
  // let siteBanner = ref(res.result.siteBanner);
  // console.log(siteBanner)
}

getSiteInfo();
</script>

<template>
  <Header />
  <BodyContent :siteBanner = "siteBanner" :siteId = "siteId" :siteId2 = "siteId2" />
</template>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  color: #666;
  font-family: $myFont;
  line-height: $myLineHeight;
  font-size: $myFontSize;
  background-size: cover;
  overflow: hidden;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  // display: none;
}

* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  outline: none;
}
img {
  max-width: 100%;
}
@import "@/assets/scss/theme.scss";
</style>
