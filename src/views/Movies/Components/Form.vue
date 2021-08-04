<template>
  <div>
    <b-card-title title-tag="h2" style="color:black" class="mb-2">
      <b-col cols="12">
        {{ data }}
      </b-col>
    </b-card-title>
    <validation-observer ref="registerForm" #default="{invalid}">
      <b-form class="auth-register-form mt-2" @submit.prevent="register">
        <!-- username -->
        <b-col cols="12">
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
        <!-- password -->
        <b-col cols="12">
          <b-form-group label="Theater">
            <validation-provider
              #default="{ errors }"
              name="theater"
              vid="thater"
              rules="theater"
            >
              <b-input-group
                class="input-group-merge"
                :class="errors.length > 0 ? 'is-invalid' : null"
              >
                <b-form-input
                  id="theater"
                  class="form-control-merge"
                  :state="errors.length > 0 ? false : null"
                  name="theater"
                  placeholder="Priska"
                />
                <b-input-group-append is-text>
                  <feather-icon class="cursor-pointer" />
                </b-input-group-append>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group>
            <label>Show time 1</label>
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="Numeric"
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
          <b-form-group>
            <label>Show time 2</label>
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="Numeric"
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
          <b-form-group>
            <label>Show time 3</label>
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="Numeric"
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
          <b-form-group>
            <label>Price</label>
            <validation-provider
              #default="{ errors }"
              rules="required|integer|double"
              name="Number"
            >
              <b-form-input
                :state="errors.length > 0 ? false : null"
                placeholder="200.00"
                type="number"
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
import {
  BCol,
  BButton,
  BFormTimepicker,
  BForm,
  BFormGroup,
  BCardTitle,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
} from "bootstrap-vue";
import { data } from "vue-echarts";

export default {
  components: {
    ValidationProvider,
    BFormTimepicker,
    ValidationObserver,
    BCardTitle,
    BButton,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
  },
  props: { data: String, databutton: String },
};
</script>
