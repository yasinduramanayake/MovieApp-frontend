<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Register v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <vuexy-logo />
          <h2 class="brand-text text-primary ml-1">
            Vuexy
          </h2>
        </b-link>

        <b-card-title class="mb-1">
          Adventure starts here 🚀
        </b-card-title>
        <b-card-text class="mb-2">
          Make your app management easy and fun!
        </b-card-text>

        <!-- form -->
        <validation-observer ref="registerForm" #default="{invalid}">
          <b-form class="auth-register-form mt-2" @submit.prevent>
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
                    v-model="form.name"
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
                    v-model="form.email"
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
              <b-form-group label-for="register-password" label="Password">
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required|password|min:6"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="form.password"
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
              <b-form-group>
                <label>Confirm password</label>
                <validation-provider
                  #default="{ errors }"
                  rules="required|confirmed:password"
                  name="Confirm Password"
                >
                  <b-form-input
                    v-model="form.password_confirmation"
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
                  rules="required|digits:10|integer"
                  name="Numeric"
                >
                  <b-form-input
                    v-model="form.mobile"
                    type="number"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Mobile Number"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Button -->
            <b-form-group>
              <b-form-input id="h-email" type="text" hidden />
            </b-form-group>

            <b-button
              variant="primary"
              block
              type="submit"
              @click="register()"
              :disabled="invalid"
            >
              Sign up
            </b-button>
          </b-form>
        </validation-observer>
        <b-card-text class="text-center mt-2">
          <span>Already have an account? </span>
          <b-link :to="{ name: 'login' }">
            <span>Sign in instead</span>
          </b-link>
        </b-card-text>
      </b-card>
      <!-- /Register v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  BCard,
  BLink,
  BCardTitle,
  BCardText,
  BForm,
  BButton,
  BFormInput,
  BFormGroup,
  BInputGroup,
  BInputGroupAppend,
} from "bootstrap-vue";
import VuexyLogo from "@core/layouts/components/Logo.vue";
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
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import Auth from "@/Api/Modules/auth";
export default {
  name: "Register",
  components: {
    VuexyLogo,
    // BSV
    BCard,
    BLink,
    BCardTitle,
    BCardText,
    BForm,
    BButton,
    BFormInput,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
  
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      form: {
        role: "User",
      },

      // validation rules
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
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
  methods: {
    async register() {
      if (await this.$refs.registerForm.validate()) {
        await this.$vs.loading({
          scale: 0.8,
        });

        await Auth.register(this.form)
          .then(({ res }) => {
            this.$vs.loading.close();
          })
          .catch(({ res }) => {
            this.$vs.loading.close();
          });
      }
      setTimeout(() => {
        this.form = "";
      }, 30000);
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
