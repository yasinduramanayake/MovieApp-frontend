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
            <b-button variant="primary">Search movie.....</b-button>
          </b-col>
        </b-row>
        <br />
        <br />
        <!--/Content-->
        <b-row>
          <b-col v-for="movie in movies" :key="movie.id" md="1" lg="4">
            <b-card :title="firstLetterUpperCase(movie.name)">
              <b-card-img :src="movie.image"></b-card-img>
              <br />
              <br />
              <b-row>
                <b-col cols="12" offset-md="3">
                  <b-button
                    @click="
                      routing(
                        movie.name,
                        movie.type,
                        movie.description,
                        movie.theaters
                      )
                    "
                    variant="primary"
                    type="submit"
                  >
                    Add to my bookings
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
import Movieapi from "@/Api/Modules/movie";
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
  BFormGroup,
  // BCard,
} from "bootstrap-vue";
// import vSelect from "vue-select";
import vSelect from "vue-select";
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCardImg,
    BCard,

    BContainer,
    BFormGroup,
    vSelect,
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
  data() {
    return {
      selected: { title: "Fast And Furious" },
      option: [{ title: "Tenet" }, { title: "Jumanji" }, { title: "Thor" }],
      movies: [],
    };
  },
  async mounted() {
    await this.show();
  },
  directives: {
    "b-modal": VBModal,
  },
  methods: {
    async show() {
      const response = await Movieapi.index("English");
      this.movies = response.data.data.data;
      console.log(this.movies);
    },
    routing(route, route1, route2, route3) {
      this.$router.push(
        `/theaterdetails/${route}/${route1}/${route2}/${route3}`
      );
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

.background2 {
  background-color: white;
}
.btn {
  padding-left: 20px;
  padding-right: 50px;
}
</style>
