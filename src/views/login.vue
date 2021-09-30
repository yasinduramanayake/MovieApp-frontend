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
                  v-b-modal.modal-info1
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
                  v-b-modal.modal-info2
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
                  v-b-modal.modal-info3
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
      id="modal-info1"
      ok-only
      hide-footer
      ok-variant="info"
      ok-title="Accept"
      modal-class="modal-info"
      centered
      title="Details"
    >
      <b-card-text>
        The Kissing Booth is a 2018 American teen romantic comedy film written
        and directed by Vince Marcello, based on the 2012 novel of the same name
        by Beth Reekles. It stars Joey King, Jacob Elordi, and Joel Courtney.
      </b-card-text>
    </b-modal>

    <b-modal
      id="modal-info2"
      ok-only
      hide-footer
      ok-variant="info"
      ok-title="Accept"
      modal-class="modal-info"
      centered
      title="Details"
    >
      <b-card-text>
        F9 (also known as F9: The Fast Saga and internationally as Fast &
        Furious 9) is a 2021 American action film directed by Justin Lin from a
        screenplay by Daniel Casey and Lin.
        <br /><br />
        ... In F9, Dominic Toretto and the team come together to stop a
        world-shattering plot headed by Toretto's brother, Jakob. Starring: Vin
        Diesel; Michelle Rodriguez; Tyrese ... <br /><br />
        Production companies: Original Film; One Race ... Produced by: Neal H.
        Moritz; Vin Diesel; Justin ... Release date: May 19, 2021
        (International);
      </b-card-text>
    </b-modal>

    <b-modal
      id="modal-info3"
      ok-only
      hide-footer
      ok-variant="info"
      ok-title="Accept"
      modal-class="modal-info"
      centered
      title="Details"
    >
      <b-card-text>
        The Kissing Booth 2 is a 2020 American teen romantic comedy film
        directed by Vince Marcello, from a screenplay by Marcello and Jay
        Arnold. The film is a direct sequel to the 2018 film The Kissing Booth,
        and is the second installment in the Kissing Booth trilogy. Based on The
        Kissing Booth books by Beth Reekles, the film stars Joey King, Joel
        Courtney and Jacob Elordi.
        <br /><br />
        The film was released on July 24, 2020, by Netflix. Like its
        predecessor, the film received generally negative reviews from critics.
        A third installment was released on August 11, 2021.
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
