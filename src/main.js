// import { routing } from './numl/index';
import './numl';
import { createApp } from 'vue';
import App from './app.vue';
// import { router } from './router';

// routing.setRouter((url, openNewTab) => {
//   // skip outside links and links that open in new tabs
//   if (openNewTab || url.startsWith('https://') || url.includes('//') || url.startsWith('mailto:') || url.includes('/api/')) {
//     return true;
//   }
//
//   router.push(url);
//
//   return false;
// });

const app = createApp(App);

// app.use(router);

window.vw = app.mount('#root');
