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
          <b-col cols="10">
            <b-form-group>
              <b-form-input
                type="search"
                v-model="location"
                placeholder="Search Location..."
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                v-on:input="search($event)"
                @reset="search($event)"
              />
            </b-form-group>
          </b-col>
          <b-col cols="2">
            <b-button
              @click="FetchTheaters(true, location)"
              variant="gradient-primary"
              >Search..</b-button
            >
          </b-col>
        </b-row>

        <!--/Content-->

        <br />

        <b-row>
          <b-col v-for="theater in theaters" :key="theater.id" md="1" lg="4">
            <b-card :title="theater.name">
              <b-card-img height="250px" :src="theater.image"></b-card-img>
              <br /><br />
              <b-row>
                <b-col>
                  <b> Located in {{ theater.venue }} </b>
                </b-col>
                <b-col>
                  <b-button
                    v-b-modal.modal-info
                    @click="showmodal(theater.description)"
                    variant="gradient-primary"
                    type="submit"
                  >
                    Details
                  </b-button>
                </b-col>
              </b-row>
              <br /><br />
              <b-row>
                <b-col cols="12">
                  <b> Show time 1</b> :
                  {{ momentFormat(theater.time1, "h:mm:ss a") }} <br />
                  <b>Show time 2</b> :
                  {{ momentFormat(theater.time2, "h:mm:ss a") }} <br />
                  <b> Show time 3</b> :
                  {{ momentFormat(theater.time3, "h:mm:ss a") }}<br /><br />
                  <b> Type</b> : {{ theater.type }} <br />

                  <validation-observer ref="bookForm" #default="{invalid}">
                    <b-form class="auth-register-form mt-2" @submit.prevent>
                      <b-row>
                        <b-col cols="12">
                          <b-form-group>
                            <!-- Add seats -->
                            <label>Seats</label>
                            <validation-provider
                              #default="{ errors }"
                              rules="required|between:1,20"
                              name="Number of Seats"
                            >
                              <b-form-input
                                v-model="form.seats"
                                v-on:input="condition()"
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
                            <label>Show time</label>
                            <validation-provider
                              #default="{ errors }"
                              rules="required"
                              name="time1"
                            >
                              <b-form-timepicker
                               v-on:input="condition()"
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
                        Add to my Bookings
                      </b-button>
                    </b-form>
                  </validation-observer>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>

        <div v-if="theaters.length === 0">
          <NoResultFound />
        </div>

        <b-modal
          id="modal-info"
          :hide-footer="true"
          modal-class="modal-info"
          centered
          title="Theater Info"
        >
          <b-card-text>
            {{ description }}
          </b-card-text>
        </b-modal>

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
  BFormTimepicker,
  BContainer,
  BCard,
  BCardImg,
  BRow,
  BModal,
  VBModal,
  BForm,
  BCol,
  BFormInput,
  BPagination,


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
import notification from "@/ApiConstance/toast";
import NoResultFound from "@/views/components/NoresultFoundImageUser.vue";

// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCardImg,
    BCard,
    BPagination,
    BContainer,
    BModal,
    Header,
    NoResultFound,
    BFormGroup,
    BCol,
    BFormTimepicker,
    ValidationProvider,
    ValidationObserver,
    BRow,
    BFormInput,
    Footer,
    BButton,
    BForm,
    BCardText,
  },
  data() {
    return {
      form: {
        full_name: localStorage.name,
        email: localStorage.email,
        movie_name: this.$route.params.name,
        movie_type: this.$route.params.type,
        theater_type: null,
        theater_name: null,
        price: null,
      },
      // pagination
      perPage: 2,
      currentPage: 1,
      total: "",

      baseprice: 200.0,
      theater_param: this.$route.params.theaters,
      theaters: [],

      description: "",
      location: "",

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
    "b-modal": VBModal,
  },
  async mounted() {
    await this.FetchTheaters();
  },
  methods: {
    search(e) {
      console.log(e);
      this.FetchTheaters(true, e);
      this.theaters = [];
    },
    paginate(e) {
      this.currentPage = e;
      this.FetchTheaters();
      this.theaters = [];
    },
    async FetchTheaters(reset = false, location = "") {
      if (reset) {
        this.currentPage = 1;
        this.theaters = [];
      }
      const res = await Theaterapi.index(
        this.theater_param,
        this.currentPage,
        this.perPage,
        location
      );
      if (this.currentPage === 1) {
        this.theaters = res.data.data.data;
      } else {
        this.theaters = this.theaters.concat(res.data.data.data);
      }
      // this.items = this.movies;

      this.total = res.data.data.total;
    },
    showmodal(description) {
      this.description = description;
    },
    async AddBooking(e, e1) {
      if (!localStorage.token) {
        notification.toast("Please Login Before", "error");
      } else {
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

        // this.$router.push(
        //   `/paydetails/${this.baseprice}/${this.form.movie_name}/${this.form.seats}/${this.form.price}`
        // );
        // /mybooking
        this.$router.push("/mybooking");

        setTimeout(() => {
          this.form = "";
        }, 30000);
      }
    },

    condition() {
      if (!localStorage.token) {
        notification.toast("Please Login Before", "error");
      }
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
