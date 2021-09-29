<template>
  <div style="background-color:#24262b">
    <Header />

    <div class="background2">
      <b-container>
        <!--/Search Bar-->

        <br />
        <br />
        <!--/Content-->
        <b-card style="padding-left:460px" title="Welcome to Your Bookings">
        </b-card>
        <br />
        <br />

        <b-row>
          <b-col cols="10">
            <b-form-group>
              <b-form-input
                v-model="movie_name"
                type="search"
                v-on:input="search($event)"
                @reset="search($event)"
                placeholder="Search Movie...."
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              />
            </b-form-group>
          </b-col>
          <b-col cols="2">
            <b-button
              @click="index(true, movie_name)"
              variant="gradient-primary"
              >Search</b-button
            >
          </b-col>
        </b-row>

        <b-row>
          <b-col v-for="booking in bookings" :key="booking.id" md="1" lg="4">
            <b-card
              :title="
                momentFormat(booking.created_at, 'MMMM Do YYYY, h:mm:ss a')
              "
            >
              <b-row>
                <b-col cols="12">
                  <b-card-text>
                    <b> Movie</b> : {{ booking.movie_name }} </b-card-text
                  ><br />

                  <b-card-text>
                    <b>Theater</b> : {{ booking.theater_name }}</b-card-text
                  >
                  <br />

                  <b-card-text>
                    <b> Booked Seates</b> : {{ booking.seats }}</b-card-text
                  ><br />

                  <b-card-text>
                    <b> Movie Type</b> : {{ booking.movie_type }}</b-card-text
                  >
                  <br />
                  <b-card-text>
                    <b>Theater Type</b> :
                    {{ booking.theater_type }}</b-card-text
                  >
                  <br />
                  <b-card-text>
                    <b>Expended Price</b> :
                    {{ getPrice(booking.price) }}</b-card-text
                  >
                  <br />
                  <b-card-text>
                    <b>Selected Time</b> :
                    {{
                      momentFormat(booking.showtime, "h:mm:ss a")
                    }}</b-card-text>
                    <center>
                  <b-row>
                    <b-col cols="6">
                      <b-button
                        v-b-modal.modal-info
                        @click="
                          Onupdate(booking.seats, booking.showtime, booking.id)"
                        style="padding:15px 50px"
                        variant="gradient-primary"
                        >Edit</b-button
                      ></b-col
                    >
                      <b-button
                        style="padding:15px 50px"
                        variant="gradient-primary"
                        @click="deletebooking(booking.id)"
                        >Delete</b-button>
                  </b-row>
                    </center>
                  <br />
                  <center>
                  
                  <b-button
                    style="padding:15px 0px"
                    variant="gradient-primary"
                    block
                    @click="
                      checkout(
                        booking.movie_name,
                        booking.seats,
                        booking.price,
                        booking.showtime,
                        booking.theater_name)"
                    >Checkout to pay</b-button>
                 
                    </center>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>

        <div v-if="bookings.length === 0">
          <NoResultFound />
        </div>

        <b-pagination
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          v-on:input="paginate($event)"
          align="center"
          size="sm"
          class="my-0"
        />
        <br />
        <br />
      </b-container>
    </div>

    <div>
      <Footer />
    </div>

    <!-- booking update -->
    <b-modal id="modal-info" :hide-footer="true">
      <h4>{{ makeUpperCase("Edit Booking") }}</h4>

      <validation-observer ref="bookForm" #default="{invalid}">
        <b-form class="auth-register-form mt-2" @submit.prevent>
          <b-row>
            <b-col cols="12">
              <b-form-group>
                <!-- Update seats -->
                <label>Seats</label>
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
                <label>Show time </label>
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
          </b-row>

          <b-button
            @click="UpdateBooking()"
            :disabled="invalid"
            type="submit"
            block
            variant="gradient-primary"
          >
            Update
          </b-button>
        </b-form>
      </validation-observer>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable global-require */
import Header from "@/views/components/header.vue";
import Footer from "@/views/footer.vue";
import {
  BCardText,
  BButton,
  VBModal,
  BFormGroup,
  BContainer,
  BPagination,
  BCard,
  BCol,
  BFormTimepicker,
  BRow,
  BFormInput,

  // BCard,

  // BCard,
} from "bootstrap-vue";

// import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import BookingApi from "@/Api/Modules/booking";
import NoResultFound from "@/views/components/NoresultFoundImageUser.vue";

// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
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
export default {
  components: {
    BCard,
    BFormTimepicker,
    BPagination,
    BContainer,
    Header,
    BFormGroup,
    BCol,
    ValidationProvider,
    ValidationObserver,
    BRow,
    BFormInput,
    Footer,
    NoResultFound,
    // BCard,

    // vSelect,
    // BCard,
    BCardText,
    BButton,
  },
  data() {
    return {
      //  fetch data
      bookings: [],

      // form data
      form: {},
      id: "",
      movie_name: "",
      // pagination
      perPage: 3,
      currentPage: 1,
      total: "",
      //input validations
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
    "b-modal": VBModal,
  },
  async mounted() {
    await this.index();
  },

  methods: {
    async index(reset = false, movie = "") {
      if (reset) {
        this.currentPage = 1;
        this.bookings = [];
      }
      const res = await BookingApi.index(
        localStorage.name,
        "",
        movie,
        this.currentPage,
        this.perPage
      );
      if (this.currentPage == 1) {
        this.bookings = res.data.data.data;
      } else {
        this.bookings = this.bookings.concat(res.data.data.data);
      }
      // this.items = this.movies;

      this.total = res.data.data.total;
    },
    search(e) {
      this.index(true, e);
      this.bookings = [];
    },
    paginate(e) {
      this.currentPage = e;
      this.index();
      this.bookings = [];
    },
    Onupdate(data, data1, data3) {
      this.form.seats = data;
      this.form.showtime = data1;
      this.id = data3;
    },

    async UpdateBooking() {
      await this.$vs.loading({
        scale: 0.8,
      });

      this.form.price = 200.0 * this.form.seats;

      await BookingApi.update(this.form, this.id)
        .then(({ res }) => {
          this.$vs.loading.close();
        })
        .catch(({ res }) => {
          this.$vs.loading.close();
        });

      // this.$router.push(
      //   `/paydetails/${this.baseprice}/${this.form.movie_name}/${this.form.seats}/${this.form.price}`
      // );
      // /mybooking
      this.$router.push("/mybooking");

      setTimeout(() => {
        this.form = "";
      }, 30000);
    },

    async deletebooking(id) {
      await this.$vs.loading({
        scale: 0.8,
      });
      await BookingApi.delete(id)
        .then(({ res }) => {
          this.$vs.loading.close();
        })
        .catch(({ res }) => {
          this.$vs.loading.close();
        });
    },

    checkout(route, route2, route3, route4, route5) {
      this.$router.push(
        `/paydetails/${route}/${route2}/${route3}/${route4}/${route5}`
      );
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-select.scss";

.background2 {
  background-color: white;
}
.btn {
  padding-left: 50px;
  padding-right: 50px;
}
</style>
