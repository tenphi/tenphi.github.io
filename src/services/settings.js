import store from 'store2';

const cache = store.namespace('settings');

export const DEFAULT_SETTINGS = {
  hue: 170,
}

export default {
  get(name) {
    return cache.get(name) || DEFAULT_SETTINGS[name];
  },
  set(name, value) {
    cache.set(name, value);
  },
};
