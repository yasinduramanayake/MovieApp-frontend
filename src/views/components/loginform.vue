<template>
  <div>
    <b-card-title title-tag="h2" style="color:white" class="mb-2">
      <b-col cols="12">
        Sign in!
      </b-col>
    </b-card-title>
    <validation-observer ref="loginValidation">
      <b-form class="auth-login-form mt-2" @submit.prevent>
        <!-- email -->
        <b-col cols="12">
          <b-form-group>
            <label for="login-email" style="color:white">E-mail</label>
            <validation-provider
              #default="{ errors }"
              name="Email"
              rules="required|email"
            >
              <b-form-input
                id="login-email"
                placeholder="Email..."
                v-model="userEmail"
                :state="errors.length > 0 ? false : null"
                name="login-email"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group>
            <div class="d-flex justify-content-between">
              <label for="login-password" style="color:white">Password</label>
              <!-- <b-link :to="{name:'auth-forgot-password-v2'}">
                    <small>Forgot Password?</small>
                  </b-link> -->
            </div>
            <validation-provider
              #default="{ errors }"
              name="Password"
              rules="required|min:3"
            >
              <!-- must update lower case upper case validity   -->
              <b-input-group
                class="input-group-merge"
                :class="errors.length > 0 ? 'is-invalid' : null"
              >
                <b-form-input
                  id="login-password"
                  placeholder="Password..."
                  v-model="userpassword"
                  :state="errors.length > 0 ? false : null"
                  class="form-control-merge"
                  :type="passwordFieldType"
                  name="login-password"
                />
                <b-input-group-append is-text>
                  <feather-icon
                    class="cursor-pointer"
                    :icon="passwordToggleIcon"
                    @click="togglePasswordVisibility"
                  />
                </b-input-group-append>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- submit buttons -->
        <b-overlay :opacity="0.5" rounded="sm">
          <b-col cols="12">
            <b-button
              type="submit"
              variant="primary"
              block
              @click="validationForm"
            >
              Sign in
            </b-button>
          </b-col>
        </b-overlay>
      </b-form>
    </validation-observer>

    <b-card-text class="text-center mt-2 ">
      <span>Don't have and account? </span>
      <b-link :to="{ name: 'register' }">
        <span>&nbsp;Sign up</span>
      </b-link>
      <br />
      <b-link :to="{ name: 'forgetpassword' }">
        <span>&nbsp;Forget Passoword?</span>
      </b-link>
    </b-card-text>
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

import {
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BCardText,
  BCardTitle,
  BForm,
  BButton,
  BCol,
  BOverlay,

  // BCard,
} from "bootstrap-vue";
// import vSelect from "vue-select";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import { mapActions } from "vuex";
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  required,
  email,
  integer,
  password,
  min,
  alphaDash,
  length,
} from "@validations";
export default {
  components: {
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BCardText,
    BCardTitle,
    BForm,
    BButton,
    BOverlay,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: "",
      userpassword: "",
      userEmail: "",

      required,
      password,
      email,
      min,
      integer,
      length,
      alphaDash,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
  methods: {
    ...mapActions(["login"]),
    async validationForm() {
      if (await this.$refs.loginValidation.validate()) {
        await this.$vs.loading({
          scale: 0.8,
        });
        this.payload = {
          email: this.userEmail,
          password: this.userpassword,
        };
        await this.login(this.payload)
          .then(({ response }) => {
            this.$vs.loading.close();
          })
          .catch(({ response }) => {
            this.$vs.loading.close();
          });
      }

      setTimeout(() => {
        this.userEmail = " ";
        this.password = " ";
      }, 3000);
    },
  },
};
</script>
