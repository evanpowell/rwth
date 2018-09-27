import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faYoutube, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

library.add(faYoutube, faInstagram, faFacebook);
Vue.component('font-awesome-icon', FontAwesomeIcon);