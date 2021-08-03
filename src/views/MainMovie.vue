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
        <b-row>
        <!--/Search Bar-->
          <b-container>
            <b-row>
              <b-col cols="11">
                <b-form-input list="my-list-id" size="lg"></b-form-input>
              </b-col>
              <b-col cols="1">
                <b-button variant="dark" size="lg">Search</b-button>
              </b-col>
            </b-row>
          </b-container>
        </b-row>
        <br />
        <br />
        <!--/Content-->
        <b-row>
          <div id="app">
            <horizontal-scroll>
              <b-row>
                <b-col md="1" lg="4">
                  <b-card title="Card title">
                    <b-card-img
                      :src="
                        require('@/assets/images/The_Kissing_Booth_2_poster.jpg')
                      "
                    ></b-card-img>
                    <b-card-text>
                      Some quick example text to build on the card title and.
                    </b-card-text>
                    <b-button
                      v-ripple.400="'rgba(0, 207, 232, 0.15)'"
                      v-b-modal.modal-info
                      variant="outline-info"
                    >
                      View Details
                    </b-button>
                  </b-card>
                </b-col>

                <b-col md="1" lg="4">
                  <b-card title="Card title">
                    <b-card-img
                    
                      :src="
                        require('@/assets/images/The_Kissing_Booth_2_poster.jpg')
                      "
                    ></b-card-img>
                    <b-card-text>
                      Some quick example text to build on the card title and
                    </b-card-text>
                    <b-button
                      v-ripple.400="'rgba(0, 207, 232, 0.15)'"
                      v-b-modal.modal-info
                      variant="outline-info"
                    >
                      View Details
                    </b-button>
                  </b-card>
                </b-col>
                <b-col md="1" lg="4">
                  <b-card title="Card title">
                    <b-card-img
                    
                      :src="
                        require('@/assets/images/The_Kissing_Booth_2_poster.jpg')
                      "
                    ></b-card-img>
                    <b-card-text>
                      Some quick example text to build on the card title and
                    </b-card-text>
                    <b-button
                      v-ripple.400="'rgba(0, 207, 232, 0.15)'"
                      v-b-modal.modal-info
                      variant="outline-info"
                    >
                      View Details
                    </b-button>
                  </b-card>
                </b-col>
                <b-col md="1" lg="4">
                  <b-card title="Card title">
                    <b-card-img
                      :src="
                        require('@/assets/images/The_Kissing_Booth_2_poster.jpg')
                      "
                    ></b-card-img>
                    <b-card-text>
                      Some quick example text to build on the card title and
                    </b-card-text>
                    <b-button
                      v-ripple.400="'rgba(0, 207, 232, 0.15)'"
                      v-b-modal.modal-info
                      variant="outline-info"
                    >
                      View Details
                    </b-button>
                  </b-card>
                </b-col>
              </b-row>
            </horizontal-scroll>
          </div>

          
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
import HorizontalScroll from "vue-horizontal-scroll";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    HorizontalScroll,
    BCardImg,
    BCard,
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
  directives: {
    "b-toggle": VBToggle,
    "b-modal": VBModal,
    Ripple,
    Dropdown,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
     
    };
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

.background2 {
  background-color: white;
}
</style>
