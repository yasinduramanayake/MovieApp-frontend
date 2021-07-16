import Vue from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
Vue.use(VueToast);

export default {
  toast: function toast(message, type) {
    Vue.$toast.open({
      message,
      type
    });
  }
};
