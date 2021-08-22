<template>
  <div>
    <!--  create form -->
    <b-card-title title-tag="h2" style="color:black" class="mb-2">
      <b-col cols="12">
        {{ makeUpperCase("Add Theater") }}
      </b-col>
    </b-card-title>
    <validation-observer ref="theaterForm" #default="{invalid}">
      <b-form
        enctype="multipart/form-data"
        class="auth-register-form mt-2"
        @submit.prevent
      >
        <b-col cols="12">
          <!-- Theater Name -->
          <b-form-group label="Theater Name" label-for="name">
            <validation-provider
              #default="{ errors }"
              name="name"
              vid="name"
              rules="required"
            >
              <b-form-input
                id="name"
                name="name"
                v-model="form.name"
                :state="errors.length > 0 ? false : null"
                placeholder="Priska"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <!-- Location -->
          <b-form-group label="Location">
            <validation-provider
              #default="{ errors }"
              name="venue"
              vid="venue"
              rules="required"
            >
              <v-select
                v-model="venue"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title1"
                :options="option1"
              />

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <!-- Show Time One -->
          <b-form-group>
            <label>Show time 1</label>
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="time1"
            >
              <b-form-timepicker locale="en" required v-model="form.time1" />

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <!-- Show Time 2 -->
          <b-form-group>
            <label>Show time 2</label>
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="time2"
            >
              <div>
                <b-form-timepicker locale="en" required v-model="form.time2" />
                <div class="mt-2"></div>
              </div>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <!-- Show time 3-->
          <b-form-group>
            <label>Show time 3</label>
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="time3"
            >
              <div>
                <b-form-timepicker locale="en" required v-model="form.time3" />
                <div class="mt-2"></div>
              </div>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <!-- Theater Type -->
          <b-form-group>
            <label>Select Theater Type</label>
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="theater"
            >
              <v-select
                v-model="type"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="option"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <!-- Image -->
          <b-form-group label="Image">
            <validation-provider #default="{ errors }" name="image" id="image">
              <b-form-file
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                no-drop
                v-model="image"
                @change="onChange"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <!-- Descrition -->
          <b-form-group label="Description">
            <validation-provider
              #default="{ errors }"
              name="description"
              vid="description"
              rules="required"
            >
              <b-form-textarea
                id="textarea-rows"
                placeholder="This theater about..."
                rows="5"
                v-model="form.description"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- button -->
        <b-button
          variant="primary"
          block
          @click="Addtheater()"
          type="submit"
          :disabled="invalid"
        >
          {{ makeUpperCase("Create") }}
        </b-button>
      </b-form>
    </validation-observer>
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import TheaterApi from "@/Api/Modules/theater";
import MovieApi from "@/Api/Modules/movie";
import {
  BCol,
  BButton,
  BFormTimepicker,
  BForm,
  BFormSelect,
  BFormSelectOption,
  BFormGroup,
  BCardTitle,
  BFormTextarea,
  BFormFile,
  BFormInput,
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

export default {
  components: {
    ValidationProvider,
    BFormSelect,
    BFormSelectOption,
    BFormTextarea,
    BFormFile,
    BFormTimepicker,
    vSelect,
    ValidationObserver,
    BCardTitle,
    BButton,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
  },
  data() {
    return {
      // form data
      selctedFile: "",
      mode: "",
      button: "",
      movies: [],
      option: [
        { title: "Multiplex" },
        { title: "Independent and Second-Run" },
        { title: "IMAX" },
        { title: "Drive-In" },
        { title: "Ac , 3D" },
        { title: "Ac" },
        { title: "3D" },
      ],
      option1: [{ title1: "Colombo" }, { title1: "Waadduwa" }],
      dir: "ltr",
      form: { movies: [] },
      type: { title: "IMAX" },
      venue: { title1: "Colombo" },
      image: "",
      dir: "ltr",

      //   validations
      selected3: [{ title: "Kids" }, { title: "Teen" }],
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
  async mounted() {
    await this.Allmovies();
  },
  methods: {
    onChange(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.form.image = e.target.result;
      };
    },

    async Allmovies() {
      const res = await MovieApi.index();
      this.movies = res.data.data.data;
    },

    // Add theater
    async Addtheater() {
      if (await this.$refs.theaterForm.validate()) {
        await this.$vs.loading({
          scale: 0.8,
        });

        this.form.type = this.type.title;
        this.form.venue = this.venue.title1;
        await TheaterApi.store(this.form)
          .then(({ res }) => {
            this.$vs.loading.close();
          })
          .catch(({ res }) => {
            this.$vs.loading.close();
          });
      }

      setTimeout(() => {
        this.payload = "";
      }, 8000);
    },
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
