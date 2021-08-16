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
          <b-form-group label="Username" label-for="register-username">
            <validation-provider
              #default="{ errors }"
              name="Username"
              vid="username"
              rules="required"
            >
              <b-form-input
                id="register-username"
                v-model="username"
                name="register-username"
                :state="errors.length > 0 ? false : null"
                placeholder="johndoe"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <!-- email -->

        <b-col cols="12">
          <b-form-group label="Email" label-for="register-email">
            <validation-provider
              #default="{ errors }"
              name="Email"
              vid="email"
              rules="required|email"
            >
              <b-form-input
                id="register-email"
                v-model="userEmail"
                name="register-email"
                :state="errors.length > 0 ? false : null"
                placeholder="john@example.com"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <!-- password -->

        <b-col cols="12">
          <b-form-group
            label-for="register-password"
            label="Password"
            v-if="databutton === 'Add' && data === 'Add Member'"
          >
            <validation-provider
              #default="{ errors }"
              name="Password"
              vid="password"
              rules="required"
            >
              <b-input-group
                class="input-group-merge"
                :class="errors.length > 0 ? 'is-invalid' : null"
              >
                <b-form-input
                  id="register-password"
                  v-model="password"
                  class="form-control-merge"
                  :type="passwordFieldType"
                  :state="errors.length > 0 ? false : null"
                  name="register-password"
                  placeholder="············"
                />
                <b-input-group-append is-text>
                  <feather-icon
                    :icon="passwordToggleIcon"
                    class="cursor-pointer"
                    @click="togglePasswordVisibility"
                  />
                </b-input-group-append>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <!-- password Confirmation -->
        <b-col cols="12">
          <b-form-group v-if="databutton === 'Add' && data === 'Add Member'">
            <label>Confirm password</label>
            <validation-provider
              #default="{ errors }"
              rules="required|confirmed:password"
              name="Confirm Password"
            >
              <b-form-input
                v-model="passwordCon"
                type="password"
                :state="errors.length > 0 ? false : null"
                placeholder="Repeat Password"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Contact Number -->
        <b-col cols="12">
          <b-form-group>
            <label>Contact number</label>
            <validation-provider
              #default="{ errors }"
              rules="required|digits:10"
              name="Numeric"
            >
              <b-form-input
                v-model="digitValue2"
                type="number"
                :state="errors.length > 0 ? false : null"
                placeholder="Enter Exactyly 10 digit"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Button -->
        <b-form-group>
          <b-form-input id="h-email" type="text" hidden />
        </b-form-group>

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
  BForm,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BCardTitle,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";

export default {
  components: {
    BCol,
    BButton,
    BForm,
    BCardTitle,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: "",
      username: "",
      userEmail: "",
      password: "",
      required,
      email,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
  props: { data: String, databutton: String },
};
</script>
