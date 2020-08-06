import { createApp } from 'vue';
import App from './app.vue';

const app = createApp(App);

window.vw = app.mount('#root');
