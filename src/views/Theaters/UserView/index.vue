<template>
  <div style="background-color:#24262b">
    <Header />
    <!-- /Brand logo-->
    <br />
    <br />
    <div class="background2">
      <b-container>
        <br />
        <br />
        <!--/Search Bar-->
        <b-row>
          <b-col cols="9">
            <b-form-group>
              <v-select
                v-model="selected"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="option"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-button variant="dark">Search location.....</b-button>
          </b-col>
        </b-row>
        <br />
        <br />
        <br />
        <br />
        <!--/Content-->
        <b-card
          class="profile-header mb-2"
          :img-src="require('@/assets/images/banner04.jpg')"
          img-top
          alt="cover photo"
          body-class="p-0"
        ></b-card>
        <br />
        <br />
        <b-row>
          <b-col md="1" lg="4" v-for="theater in theaters" :key="theater.name">
            <b-card :title="'theater' + ' ' + theater">
              <b-card-img
                height="250px"
                :src="
                  require('@/assets/images/cinema-movie-theatre-red-seats-rows-black-background-horizontal-banner-copy-space-194858282.jpg')
                "
              ></b-card-img>
              <b-card-text> </b-card-text>
              <b-row>
                <b-col cols="12">
                  <b> Show time 1</b> : 8.00 A.M - 10.00 A.M <br />
                  <b>Show time 2</b> : 2.00 P.M - 4.00 P.M <br />
                  <b> Show time 3</b> : 7.00 P.M - 10.00 P.M <br /><br />
                  <b> Type</b> : A/C , 3D <br /><br />
                  <b-button variant="gradient-primary">
                    Book Now!
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
        <br />
        <br />
      </b-container>
    </div>
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
    <div>
      <Footer />
    </div>

    <!-- Left Text-->
  </div>
</template>

<script>
/* eslint-disable global-require */
import Header from "@/views/components/header.vue";
import Footer from "@/views/footer.vue";
import {
  BCardText,
  BButton,
  BModal,
  VBModal,
  BContainer,
  BFormInput,
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
import Dropdown from "vue-simple-search-dropdown";
import vSelect from "vue-select";
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCardImg,
    BCard,
    vSelect,
    BContainer,
    Header,
    BCol,
    BModal,
    BRow,
    BFormInput,
    Footer,
    // vSelect,
    // BCard,
    BCardText,
    BButton,
  },
  data() {
    return {
      theaters: [1, 2, 3, 4, 5, 6],
      selected: { title: "Colombo" },
      option: [
        { title: "Colombo" },
        { title: "Rathnapura" },
        { title: "Panadura" },
        { title: "Kaluthara" },
      ],
    };
  },
  directives: {
    "b-toggle": VBToggle,
    "b-modal": VBModal,
    Ripple,
    Dropdown,
  },
  mixins: [togglePasswordVisibility],
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-select.scss";
img {
  height: 250px;
  width: 100%;
}

.background2 {
  background-color: white;
}
.btn {
  padding-left: 50px;
  padding-right: 50px;
}
</style>
