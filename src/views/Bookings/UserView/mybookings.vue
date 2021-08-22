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
          <b-col cols="9">
            <b-form-group>
              <b-form-input
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-button variant="gradient-primary">Search Movie...</b-button>
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
                    <b>Selected Time</b> : {{ booking.showtime }}</b-card-text
                  ><b-row>
                    <b-col cols="6">
                      <b-button variant="gradient-primary"
                        >Edit</b-button
                      ></b-col
                    >
                    <b-col cols="6">
                      <b-button
                        variant="gradient-primary"
                        @click="deletebooking(booking.id)"
                        >Delete</b-button
                      ></b-col
                    >
                  </b-row>
                  <br />
                  <b-button
                    style="width:340px"
                    variant="gradient-primary"
                    block
                    @click=""
                    >Checkout to pay</b-button
                  >
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
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
  BContainer,
  BCard,
  BRow,
  BCol,
  BFormInput,

  // BCard,

  // BCard,
} from "bootstrap-vue";

// import vSelect from "vue-select";

import BookingApi from "@/Api/Modules/booking";

// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCard,

    BContainer,
    Header,
    BFormGroup,
    BCol,

    BRow,
    BFormInput,
    Footer,

    // BCard,

    // vSelect,
    // BCard,
    BCardText,
    BButton,
  },
  data() {
    return {
      bookings: [],
    };
  },

  async mounted() {
    await this.index();
  },
  methods: {
    async index() {
      const res = await BookingApi.index(localStorage.name);
      this.bookings = res.data.data.data;
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

    cyheckout(route, route2, route3) {
      this.$router.push(`/`);
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
