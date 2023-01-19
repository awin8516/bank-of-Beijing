import { createApp } from 'vue'
// import './assets/scss/global.scss'
import App from './App.vue'
import fn from './assets/js/fn'
window.fn = fn;
createApp(App).mount('#app');
