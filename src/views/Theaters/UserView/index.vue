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
        <b-card title="About Movie">
          <b-card-text>
            {{ this.description }}
          </b-card-text>
        </b-card>
        <br />
        <br />
        <b-row>
          <b-col v-for="theater in theaters" :key="theater.id" md="1" lg="4">
            <b-card :title="theater.name">
              <b-card-img height="250px" :src="theater.image"></b-card-img>
              <b-card-text> </b-card-text>
              <b-row>
                <b-col cols="12">
                  <b> Show time 1</b> : {{ theater.time1 }} A.M <br />
                  <b>Show time 2</b> : {{ theater.time2 }} P.M <br />
                  <b> Show time 3</b> : {{ theater.time3 }} P.M <br /><br />
                  <b> Type</b> : {{ theater.type }} <br /><br />

                  <validation-observer ref="bookForm" #default="{invalid}">
                    <b-form class="auth-register-form mt-2" @submit.prevent>
                      <b-row>
                        <b-col cols="12">
                          <b-form-group>
                            <label>Add Seats</label>
                            <validation-provider
                              #default="{ errors }"
                              rules="required|between:1,20"
                              name="Number of Seats"
                            >
                              <b-form-input
                                v-model="form.seats"
                                type="number"
                                :state="errors.length > 0 ? false : null"
                                placeholder="No of Seats"
                              />
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </b-form-group>
                        </b-col>

                        <b-col cols="12">
                          <!-- Show Time  -->
                          <b-form-group>
                            <label>Select Show time </label>
                            <validation-provider
                              #default="{ errors }"
                              rules="required"
                              name="time1"
                            >
                              <b-form-timepicker
                                locale="en"
                                required
                                v-model="form.showtime"
                              />

                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </b-form-group>
                        </b-col>

                        <input type="text" hidden v-model="form.theater_type" />
                        <input type="text" hidden v-model="form.theater_name" />
                      </b-row>

                      <b-button
                        @click="AddBooking(theater.type, theater.name)"
                        :disabled="invalid"
                        type="submit"
                        block
                        variant="gradient-primary"
                      >
                        Book Now!
                      </b-button>
                    </b-form>
                  </validation-observer>
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
  BFormGroup,
  BModal,
  VBModal,
  BFormTimepicker,
  BContainer,
  BCard,
  BCardImg,
  BRow,
  BForm,
  BCol,
  BFormInput,

  // BCard,

  // BCard,
  VBToggle,
} from "bootstrap-vue";
import {
  required,
  email,
  confirmed,
  url,
  between,
  alpha,
  integer,
  password,
  min,
  digits,
  alphaDash,
  length,
} from "@validations";
// import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";
import Theaterapi from "@/Api/Modules/theater";
import BookingApi from "@/Api/Modules/booking";
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCardImg,
    BCard,
    vSelect,
    BContainer,
    Header,
    BFormGroup,
    BCol,
    BFormTimepicker,
    ValidationProvider,
    ValidationObserver,
    BModal,
    BRow,
    BFormInput,
    Footer,
    BCardText,
    BButton,
    VBModal,

    BForm,

    // BCard,
    VBToggle,
    // vSelect,
    // BCard,
    BCardText,
    BButton,
  },
  data() {
    return {
      form: {
        full_name: "Yasindu Ramanayake",
        email: "Yasindu Ramanayake123@gmail.com",
        movie_name: this.$route.params.name,
        movie_type: this.$route.params.type,
        theater_type: null,
        theater_name: null,
        price: null,
      },
      baseprice: 200.0,
      theater_param: this.$route.params.theaters,
      theaters: [],

      description: this.$route.params.description,
      selected: { title: "Colombo" },
      option: [
        { title: "Colombo" },
        { title: "Rathnapura" },
        { title: "Panadura" },
        { title: "Kaluthara" },
      ],

      // validations
      required,
      email,
      confirmed,
      url,
      between,
      alpha,
      integer,
      password,
      min,
      digits,
      alphaDash,
      length,
    };
  },
  directives: {
    "b-toggle": VBToggle,
    "b-modal": VBModal,
  },
  async mounted() {
    await this.FetchTheaters();
  },
  methods: {
    async FetchTheaters() {
      const res = await Theaterapi.index(this.theater_param);
      this.theaters = res.data.data.data;
    },

    async AddBooking(e, e1) {
      await this.$vs.loading({
        scale: 0.8,
      });

      this.form.theater_type = e;
      this.form.theater_name = e1;
      this.form.price = this.baseprice * this.form.seats;

      await BookingApi.store(this.form)
        .then(({ res }) => {
          this.$vs.loading.close();
        })
        .catch(({ res }) => {
          this.$vs.loading.close();
        });

      this.$router.push(
        `/paydetails/${this.baseprice}/${this.form.movie_name}/${this.form.seats}/${this.form.price}`
      );

      setTimeout(() => {
        this.form = "";
      }, 8000);
    },
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
  padding-left: 50px;
  padding-right: 50px;
}
</style>
