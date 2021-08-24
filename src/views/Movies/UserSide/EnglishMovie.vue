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
            <b-button
              @click="show('English', moviename)"
              variant="gradient-primary"
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
                <b-col offset-md="2">
                  <b-button
                    @click="routing(movie.name, movie.type, movie.theaters)"
                    variant="gradient-primary"
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                  >

                    ADD
                  </b-button>
                </b-col>
                <b-col offset-md="2">
                  <b-button
                    v-b-modal.modal-info
                    @click="showmodal(movie.description)"
                    variant="gradient-primary"
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    type="submit"
                  >
                            Details
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>

        <div v-if="movies.length === 0">
          <NoResultFound />
        </div>
        <b-modal
          id="modal-info"
          :hide-footer="true"
          modal-class="modal-info"
          centered
          title="Movie Info"
        >
          <b-card-text>
            {{ description }}
          </b-card-text>
        </b-modal>

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
import NoResultFound from "@/views/components/NoresultFoundImageUser.vue";

import {
  BButton,
  BFormInput,
  BPagination,
  VBModal,
  BContainer,
  BCol,
  BCard,
  BCardImg,
  BModal,
  BRow,
  BFormGroup,
} from "bootstrap-vue";
// import vSelect from "vue-select";
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCardImg,
    BModal,
    NoResultFound,
    BCard,
    BContainer,
    BFormGroup,
    BPagination,
    Header,
    BFormInput,
    BCol,
    BRow,
    Footer,
    BButton,
  },
  data() {
    return {
      movies: [],
      moviename: "",
      description: "",
      // pagination

      currentpage: "",
      total: "",
      per_page: "3",
    };
  },

  directives: {
    "b-modal": VBModal,
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
      if (reset) {
        this.currentpage = 1;
        this.movies = [];
      }
      const response = await Movieapi.index(
        "English",
        moviename,
        this.currentpage,
        this.per_page
      );
      if (this.currentpage == 1) {
        this.movies = response.data.data.data;
      } else {
        this.movies = this.movies.concat(response.data.data.data);
      }
      this.total = response.data.data.total;
    },
    showmodal(description) {
      this.description = description;
    },
    routing(route, route1, route2) {
      this.$router.push(`/theaterdetails/${route}/${route1}/${route2}`);
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
