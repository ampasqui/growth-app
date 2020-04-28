/* External Dependencies */
import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

/* Internal Dependencies */
import App from './App.vue';

/* Configuration */
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  render: h => h(App),
  template: '<App/>'
});
