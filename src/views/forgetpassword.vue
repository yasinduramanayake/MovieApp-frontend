<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Forgot Password v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <!-- logo -->
          <vuexy-logo />

          <h2 class="brand-text text-primary ml-1">
            YMP
          </h2>
        </b-link>

        <b-card-title class="mb-1">
          Forgot Password? 🔒
        </b-card-title>
        <b-card-text class="mb-2">
          Enter your email and we'll send you instructions to reset your
          password
        </b-card-text>

        <!-- form -->
        <validation-observer>
          <b-form class="auth-forgot-password-form mt-2">
            <!-- email -->
            <b-form-group label="Email" label-for="forgot-password-email">
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  id="forgot-password-email"
                  v-model="form.email"
                  :state="errors.length > 0 ? false : null"
                  name="forgot-password-email"
                  placeholder="john@example.com"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <b-button variant="primary" @click="resetpassword()" block>
              Send reset link
            </b-button>
          </b-form>
        </validation-observer>
      </b-card>

      <!-- /Forgot Password v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BCard,
  BLink,
  BCardText,
  BCardTitle,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
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
import AuthApi from "@/Api/Modules/auth";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    VuexyLogo,
    BCard,
    BLink,
    BCardText,
    BCardTitle,
    BFormGroup,
    BFormInput,
    BButton,
    BForm,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      form: {},
      // validation
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
  methods: {
    async resetpassword() {
      await this.$vs.loading({
        scale: 0.8,
      });
      await AuthApi.reset(this.form)
        .then((res) => {
          this.$vs.loading.close();
          this.success();
        })
        .catch((res) => {
          this.$vs.loading.close();
        });
    },

    success() {
      this.$swal({
        title: "Email Has Sent!",
        text: "Go to Your Gmail Inbox And Copy Verification Code",
        icon: "success",
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
