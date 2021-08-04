<template>
  <div>
    <b-card-title title-tag="h2" style="color:black" class="mb-2">
      <b-col cols="12">
        {{ data }}
      </b-col>
    </b-card-title>
    <validation-observer ref="registerForm" #default="{invalid}">
      <b-form class="auth-register-form mt-2" @submit.prevent="register">
        <b-col cols="12">
          <!-- Movie Name -->
          <b-form-group label="Movie Name" label-for="name">
            <validation-provider
              #default="{ errors }"
              name="name"
              vid="name"
              rules="required"
            >
              <b-form-input
                id="moviename"
                name="moviename"
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
              name="description"
              vid="description"
              rules="required"
            >
              <b-form-textarea
                id="textarea-rows"
                placeholder="Tall textarea"
                rows="8"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Theater -->
        <b-col cols="12">
          <b-form-group label="Theater">
            <validation-provider
              #default="{ errors }"
              name="theater"
              vid="thater"
              rules="required"
            >
              <v-select
                v-model="selected2"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                multiple
                label="title"
                :options="option1"
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
                v-model="selected"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="option"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Button -->
        <b-button variant="primary" block type="submit" :disabled="invalid">
          {{ databutton }}
        </b-button>
      </b-form>
    </validation-observer>
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import {
  BCol,
  BButton,
  BForm,
  BFormGroup,
  BCardTitle,
  BFormInput,
  BFormTextarea,
} from "bootstrap-vue";
import { data } from "vue-echarts";

export default {
  components: {
    vSelect,
    ValidationProvider,
    BFormTextarea,
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
      selected: { title: "Kids" },
      option: [
        { title: "Kids" },
        { title: "Teen" },
        { title: "Superhero" },
        { title: "Cartoon" },
        { title: "Adult" },
      ],
      option1: [
        { title: "Multiplex" },
        { title: "Independent and Second-Run" },
        { title: "IMAX" },
        { title: "Drive-In" },
        { title: "Ac , 3D" },
        { title: "Ac" },
        { title: "3D" },
      ],
      dir: "ltr",
      selected2: [{ title: "Multiplex" }, { title: "IMAX" }],
    };
  },
  props: { data: String, databutton: String },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
