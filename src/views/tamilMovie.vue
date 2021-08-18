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
            <b-button variant="dark">Search movie.....</b-button>
          </b-col>
        </b-row>
        <br />
        <br />
        <!--/Content-->
        <b-row>
          <b-col md="1" lg="4">
            <b-card title="MOVIE 001">
              <b-card-img
                height="250px"
                :src="require('@/assets/images/tamil1.jpg')"
              ></b-card-img>
              <b-card-text>
                Some quick example text to build on the card title and.
              </b-card-text>
              <b-row>
                <b-col cols="6">
                  <b-button class="btn" variant="gradient-primary">
                    View Details
                  </b-button>
                </b-col>

                <b-col cols="6">
                  <b-button variant="gradient-primary">
                    Buy Tickets
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>

          <b-col md="1" lg="4">
            <b-card title="MOVIE 002">
              <b-card-img
                :src="require('@/assets/images/tamil2.jpg')"
              ></b-card-img>
              <b-card-text>
                Some quick example text to build on the card title and
              </b-card-text>
              <b-row>
                <b-col cols="6">
                  <b-button class="btn" variant="gradient-primary">
                    View Details
                  </b-button>
                </b-col>

                <b-col cols="6">
                  <b-button variant="gradient-primary">
                    Buy Tickets
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col md="1" lg="4">
            <b-card title="MOVIE 003">
              <b-card-img
                :src="require('@/assets/images/tamil3.jpg')"
              ></b-card-img>
              <b-card-text>
                Some quick example text to build on the card title and
              </b-card-text>
              <b-row>
                <b-col cols="6">
                  <b-button class="btn" variant="gradient-primary">
                    View Details
                  </b-button>
                </b-col>

                <b-col cols="6">
                  <b-button variant="gradient-primary">
                    Buy Tickets
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col md="1" lg="4">
            <b-card title="MOVIE 004">
              <b-card-img
                :src="require('@/assets/images/tamil4.jpg')"
              ></b-card-img>
              <b-card-text>
                Some quick example text to build on the card title and
              </b-card-text>
              <b-row>
                <b-col cols="6">
                  <b-button class="btn" variant="gradient-primary">
                    View Details
                  </b-button>
                </b-col>

                <b-col cols="6">
                  <b-button variant="gradient-primary">
                    Buy Tickets
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col md="1" lg="4">
            <b-card title="MOVIE 005">
              <b-card-img
                :src="require('@/assets/images/tamil5.jpg')"
              ></b-card-img>
              <b-card-text>
                Some quick example text to build on the card title and
              </b-card-text>
              <b-row>
                <b-col cols="6">
                  <b-button class="btn" variant="gradient-primary">
                    View Details
                  </b-button>
                </b-col>

                <b-col cols="6">
                  <b-button variant="gradient-primary">
                    Buy Tickets
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col md="1" lg="4">
            <b-card title="MOVIE 006">
              <b-card-img
                :src="require('@/assets/images/tamil6.jpg')"
              ></b-card-img>
              <b-card-text>
                Some quick example text to build on the card title and
              </b-card-text>
              <b-row>
                <b-col cols="6">
                  <b-button class="btn" variant="gradient-primary">
                    View Details
                  </b-button>
                </b-col>

                <b-col cols="6">
                  <b-button variant="gradient-primary">
                    Buy Tickets
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
import vSelect from "vue-select";
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
  BFormInput,
  // BCard,
  VBToggle,
} from "bootstrap-vue";
// import vSelect from "vue-select";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import Ripple from "vue-ripple-directive";
import Dropdown from "vue-simple-search-dropdown";
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCardImg,
    BFormInput,
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
  directives: {
    "b-toggle": VBToggle,
    "b-modal": VBModal,
    Ripple,
    Dropdown,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      selected: { title: "Master" },
      option: [{ title: "Palavi" }, { title: "Mathura" }, { title: "Billa" }],
    };
  },
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
  padding-left: 20px;
  padding-right: 50px;
}
</style>
