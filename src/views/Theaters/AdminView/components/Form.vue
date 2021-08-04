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
          <!-- Theater Name -->
          <b-form-group label="Theater Name" label-for="name">
            <validation-provider
              #default="{ errors }"
              name="name"
              vid="name"
              rules="required"
            >
              <b-form-input
                id="theayername"
                name="theatername"
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
              name="location"
              vid="location"
              rules="required"
            >
              <b-form-input
                id="location"
                name="location"
                :state="errors.length > 0 ? false : null"
                placeholder="Colombo"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <!-- Movie -->
          <b-form-group label="Movie">
            <validation-provider
              #default="{ errors }"
              name="Movie"
              vid="Movie"
              rules="required"
            >
              <v-select
                v-model="selected3"
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
          <!-- Show Time One -->
          <b-form-group>
            <label>Show time 1</label>
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="time1"
            >
              <div>
                <b-form-timepicker locale="en" />
                <div class="mt-2"></div>
              </div>
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
                <b-form-timepicker locale="en" />
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
                <b-form-timepicker locale="en" />
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
                v-model="selected"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="option"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

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
  BFormTimepicker,
  BForm,
  BFormGroup,
  BCardTitle,
  BFormInput,
} from "bootstrap-vue";
import { data } from "vue-echarts";

export default {
  components: {
    ValidationProvider,
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
      selected: { title: "IMAX" },
      option: [
        { title: "Multiplex" },
        { title: "Independent and Second-Run" },
        { title: "IMAX" },
        { title: "Drive-In" },
        { title: "Ac , 3D" },
        { title: "Ac" },
        { title: "3D" },
      ],
      option1: [
        { title: "Kids" },
        { title: "Teen" },
        { title: "Superhero" },
        { title: "Cartoon" },
        { title: "Adult" },
      ],
      dir: "ltr",
      selected3: [{ title: "Kids" }, { title: "Teen" }],
    };
  },
  props: { data: String, databutton: String },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
