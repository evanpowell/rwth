import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faYoutube, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faCaretRight, faPlay, faPause, faStop, faVolumeUp, faVolumeDown, faVolumeOff } from '@fortawesome/free-solid-svg-icons';

library.add(faYoutube, faInstagram, faFacebook, faCaretRight, faPlay, faPause, faStop, faVolumeUp, faVolumeDown, faVolumeOff);
Vue.component('font-awesome-icon', FontAwesomeIcon);