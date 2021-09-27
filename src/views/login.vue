<template>
  <div style="background-color:#24262b">
    <Header />
    <!-- /Brand logo-->
    <br />
    <br />

    <Slider />

    <div class="background2">
      <b-container>
        <br />
        <br />

        <b-container>
          <b-row>
            <b-col md="1" lg="4">
              <b-card title="The Kissing Booth">
                <b-card-img
                  :src="
                    require('@/assets/images/MV5BYzE1YzViNzktZTU5Ny00ZjYzLWE0YjItZWNkNDU1MzFiOWNhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg')
                  "
                  width="10px"
                ></b-card-img>
                <br />
                <br />
                <b-button
                  v-ripple.400="'rgba(0, 207, 232, 0.15)'"
                  v-b-modal.modal-info
                  variant="outline-info"
                >
                  Info
                </b-button>
              </b-card>
            </b-col>
            <b-col md="6" lg="4">
              <b-card title="F9">
                <b-card-img
                  :src="
                    require('@/assets/images/01-f9-dm-mainstage-mobile-banner-1080x793-pl-f01-013120-5e3867f0cf333-1.jpg')
                  "
                ></b-card-img>
                <br />
                <br />
                <b-button
                  v-ripple.400="'rgba(0, 207, 232, 0.15)'"
                  v-b-modal.modal-info
                  variant="outline-info"
                >
                  Info
                </b-button>
                <br />
                <br />
              </b-card>
            </b-col>

            <b-col md="6" lg="4">
              <b-card title="The Kissing Booth 2">
                <b-card-img
                  :src="
                    require('@/assets/images/The_Kissing_Booth_2_poster.jpg')
                  "
                ></b-card-img>
                <br />
                <br />
                <b-button
                  v-ripple.400="'rgba(0, 207, 232, 0.15)'"
                  v-b-modal.modal-info
                  variant="outline-info"
                >
                  Info
                </b-button>
              </b-card>
            </b-col>
          </b-row>
        </b-container>

        <br />
        <br />
      </b-container>
    </div>
    <b-modal
      id="modal-info"
      ok-only
      hide-footer
      ok-variant="info"
      ok-title="Accept"
      modal-class="modal-info"
      centered
      title="Details"
    >
      <b-card-text>
        This is a Most awaiting movie..
      </b-card-text>
    </b-modal>
    <div>
      <Footer />
    </div>

    <!-- Left Text-->
  </div>
</template>

<script>
/* eslint-disable global-require */
import Slider from "@/views/components/slideshow/slideshow.vue";
import Header from "@/views/components/header.vue";
import Footer from "@/views/footer.vue";
import {
  BCardText,
  BButton,
  BModal,
  VBModal,
  BContainer,
  BCol,
  BCard,
  BCardImg,
  BRow,

  // BCard,
  VBToggle,
} from "bootstrap-vue";
// import vSelect from "vue-select";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import Ripple from "vue-ripple-directive";
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    Slider,
    BCardImg,
    BCard,
    BContainer,
    Header,
    BCol,
    BModal,
    BRow,
    Footer,
    // vSelect,
    // BCard,
    BCardText,

    BButton,
  },
  directives: {
    "b-toggle": VBToggle,
    "b-modal": VBModal,
    Ripple,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      selected: { title: "Colombo" },
      option: [{ title: "Panadura" }, { title: "Rathnapura" }],
      selected1: { title1: "sigma" },
      option1: [{ title1: "priska" }, { title1: "Rathna" }],
      status: "",
      password: "",
      userEmail: "",
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
@import "@core/scss/vue/libs/vue-select.scss";

img {
  height: 250px;
}

.background2 {
  background-color: white;
}
</style>
