<template>
  <div>
    <b-card-title title-tag="h2" style="color:black" class="mb-2">
      <b-col cols="12">
        {{ makeUpperCase("Add Movie") }}
      </b-col>
    </b-card-title>
    <validation-observer ref="movieForm" #default="{invalid}">
      <b-form
        class="auth-register-form mt-2"
        enctype="multipart/form-data"
        @submit.prevent
      >
        <b-col cols="12">
          <!-- Movie Name -->
          <b-form-group label="Movie Name" label-for="name">
            <validation-provider
              #default="{ errors }"
              name="name"
              rules="required"
            >
              <b-form-input
                id="name"
                name="name"
                v-model="form.name"
                :state="errors.length > 0 ? false : null"
                placeholder="Tenet"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <!-- Movie Description -->
          <b-form-group label="Movie Description" label-for="description">
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="description"
            >
              <b-form-textarea
                id="textarea-rows"
                placeholder="Tall textarea"
                v-model="form.description"
                rows="8"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Theaters Array -->
        <b-col cols="12">
          <b-form-group>
            <label>Select Theater/s</label>
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="text"
            >
              <b-form-select v-model="form.theaters" multiple class="mb-1">
                <b-form-select-option
                  v-for="theater in theaters"
                  :key="theater.id"
                  :value="theater.name"
                  >{{
                    firstLetterUpperCase(theater.name)
                  }}</b-form-select-option
                >
              </b-form-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Image -->
        <b-col cols="12">
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
          <!-- Movie Type -->
          <b-form-group>
            <label>Select Movie Type</label>
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="text"
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

        <!-- Button -->
        <b-button
          variant="primary"
          block
          @click="AddMovie()"
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
import {
  BCol,
  BButton,
  BFormSelect,
  BFormSelectOption,
  BFormFile,
  BForm,
  BFormGroup,
  BCardTitle,
  BFormInput,
  BFormTextarea,
} from "bootstrap-vue";
import {
  required,
  email,
  integer,
  password,
  min,
  alphaDash,
  length,
} from "@validations";
import MovieApi from "@/Api/Modules/movie";
export default {
  components: {
    vSelect,
    ValidationProvider,
    BFormSelectOption,
    BFormFile,
    BFormTextarea,
    ValidationObserver,
    BFormSelect,
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
      option: [
        { title: "Tamil" },
        { title: "English" },
        { title: "Hindi" },
        { title: "Korean" },
      ],
      theaters: [],

      dir: "ltr",
      form: { theaters: [] },
      type: { title: "Type" },
      image: "",

      required,
      email,
      integer,
      password,
      min,
      alphaDash,
      length,
    };
  },
  async mounted() {
    await this.Alltheaters();
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
    async Alltheaters() {
      const res = await TheaterApi.index("");
      this.theaters = res.data.data.data;
    },

    async AddMovie() {
      if (await this.$refs.movieForm.validate()) {
        await this.$vs.loading({
          scale: 0.8,
        });

        this.form.type = this.type.title;
        await MovieApi.store(this.form)
          .then(({ res }) => {
            this.$vs.loading.close();
          })
          .catch(({ res }) => {
            this.$vs.loading.close();
          });
      }

      setTimeout(() => {
        this.payload = "";
      }, 30000);
    },
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
