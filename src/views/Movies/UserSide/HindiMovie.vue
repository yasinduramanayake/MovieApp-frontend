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
                v-model="moviename"
                type="search"
                v-on:input="search($event)"
                @reset="search($event)"
                placeholder="Search Movie...."
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              />
            </b-form-group>
          </b-col>
          <b-col cols="2">
            <b-button @click="show('Tamil', moviename)" variant="primary"
              >Search</b-button
            >
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
                <b-col cols="6">
                  <b-button
                    @click="routing(movie.name, movie.type, movie.theaters)"
                    variant="gradient-primary"
                  >
                    Buy Tickets
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
        <div v-if="movies.length === 0">
          <NoResultFound />
        </div>
        <b-pagination
          v-model="currentpage"
          :total-rows="total"
          :per-page="per_page"
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
import Movieapi from "@/Api/Modules/movie";
import {
  BButton,
  BFormInput,
  BPagination,
  BContainer,
  BCol,
  BCard,
  BCardImg,
  BRow,
  BFormGroup,
  // BCard,
} from "bootstrap-vue";
import NoResultFound from "@/views/components/NoresultFoundImageUser.vue";
// import vSelect from "vue-select";
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
export default {
  components: {
    BCardImg,
    BCard,
    BPagination,
    BContainer,
    BFormGroup,
    Header,
    BFormInput,
    BCol,
    NoResultFound,
    BRow,
    Footer,
    // vSelect,
    BButton,
  },
  data() {
    return {
      movies: [],
      moviename: "",
      // pagination
      currentpage: "",
      total: "",
      per_page: "3",
    };
  },

  async mounted() {
    await this.show();
  },
  methods: {
    paginate(e) {
      this.currentpage = e;
      this.show();
      this.movies = [];
    },
    search(e) {
      this.show(true, e);
      this.movies = [];
    },
    async show(reset = false, moviename = "") {
      await this.$vs.loading({
        scale: 0.8,
      });
      if (reset) {
        this.currentpage = 1;
        this.movies = [];
      }
      const response = await Movieapi.index(
        "Hindi",
        moviename,
        this.currentpage,
        this.per_page
      );
      this.$vs.loading.close();
      if (this.currentpage === 1) {
        this.movies = response.data.data.data;
      } else {
        this.movies = this.movies.concat(response.data.data.data);
      }
      this.total = response.data.data.total;
    },
    routing(route, route1, route2, route3) {
      this.$router.push(`/theaterdetails/${route}/${route1}/${route2}`);
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
@import "@core/scss/vue/libs/vue-select.scss";

.background2 {
  background-color: white;
}
.btn {
  padding-left: 20px;
  padding-right: 50px;
}
</style>
