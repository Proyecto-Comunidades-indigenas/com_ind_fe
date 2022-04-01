import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faHome,
    faBuilding,
    faImages,
    faAt
  } from "@fortawesome/free-solid-svg-icons";
  //import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import App from './App.vue'
import router from './router'

library.add(faHome, faBuilding, faImages, faAt, fab, fas);

createApp(App).use(router)
.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app')
