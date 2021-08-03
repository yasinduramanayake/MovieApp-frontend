<template>

  <div style="background-color:black">
    <Header />
    <!-- /Brand logo-->
    <br /><br /><br />

    <Slider />

    <br />
    <br />
    <br />

    <b-row>
      <b-col md="1" lg="4">
        <b-card img-height="200" img-width="200" title="Card title">
          <b-card-img
            :src="
              require('@/assets/images/MV5BYzE1YzViNzktZTU5Ny00ZjYzLWE0YjItZWNkNDU1MzFiOWNhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg')
            "
            width="10px"
          ></b-card-img>
          <b-card-text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </b-card-text>
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
        <b-card title="Card title">
          <b-card-img
            :src="
              require('@/assets/images/01-f9-dm-mainstage-mobile-banner-1080x793-pl-f01-013120-5e3867f0cf333-1.jpg')
            "
          ></b-card-img>
          <b-card-text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </b-card-text>
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
        <b-card title="Card title">
          <b-card-img
            :src="require('@/assets/images/The_Kissing_Booth_2_poster.jpg')"
          ></b-card-img>
          <b-card-text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </b-card-text>
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
        <b-card title="Card title">
          <b-card-img
            :src="require('@/assets/images/The_Kissing_Booth_2_poster.jpg')"
          ></b-card-img>
          <b-card-text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </b-card-text>
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

    <b-modal
      id="modal-info"
      ok-only
      ok-variant="info"
      ok-title="Accept"
      modal-class="modal-info"
      centered
      title="Info Modal"
    >
      <b-card-text>
        Biscuit chocolate cake gummies. Lollipop I love macaroon bear claw
        caramels. I love marshmallow tiramisu I love fruitcake I love gummi
        bears. Carrot cake topping liquorice. Pudding caramels liquorice sweet I
        love. Donut powder cupcake ice cream tootsie roll jelly.
      </b-card-text>
    </b-modal>

    <br />
    <br />
    <br />
    <br />
    <br />

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
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      loading: false,
    };
  },
  mounted: function() {
    this.startSlide();
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
@import "@core/scss/vue/libs/vue-select.scss";

img {
  height: 250px;
  width: 100%;
}
</style>
