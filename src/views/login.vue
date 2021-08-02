<template>
  <div style="background-color:black">
    <b-container>
      <b-row>
        <b-col class="nev" cols="11">
          <b-link>
            <vuexy-logo />
          </b-link>
        </b-col>

        <!-- Brand logo-->
        <b-col cols="1">
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            v-b-toggle.sidebar-right
            style="background-color: transparent;"
            variant="flat-primary"
          >
            <feather-icon icon="AlignJustifyIcon" size="25%" class="mr-50" />
          </b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-nav class="nev1">
      <b-nav-item>
        Home
      </b-nav-item>
      <b-nav-item> Movies</b-nav-item>
      <b-nav-item> Movies</b-nav-item>
    </b-nav>

    <!-- /Brand logo-->
    <b-sidebar
      id="sidebar-right"
      bg-variant="dark"
      text-variant="light"
      right
      backdrop
      shadow
    >
      <b-card-title title-tag="h2" style="color:white" class="mb-2">
        Sign in!
      </b-card-title>
      <validation-observer ref="loginValidation">
        <b-form class="auth-login-form mt-2" @submit.prevent>
          <!-- email -->
          <b-form-group>
            <label for="login-email" style="color:white">E-mail</label>
            <validation-provider
              #default="{ errors }"
              name="Email"
              rules="required|email"
            >
              <b-form-input
                id="login-email"
                v-model="userEmail"
                :state="errors.length > 0 ? false : null"
                name="login-email"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <!-- forgot password -->
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
              rules="required"
            >
              <b-input-group
                class="input-group-merge"
                :class="errors.length > 0 ? 'is-invalid' : null"
              >
                <b-form-input
                  id="login-password"
                  v-model="password"
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

          <!-- checkbox -->
          <!-- <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Remember Me
                </b-form-checkbox>
              </b-form-group> -->

          <!-- submit buttons -->
          <b-overlay :show="loading" :opacity="0.5" rounded="sm">
            <b-button
              type="submit"
              variant="primary"
              block
              :disabled="loading"
              @click="validationForm"
            >
              Sign in
            </b-button>
          </b-overlay>
        </b-form>
      </validation-observer>

      <b-card-text class="text-center mt-2 ">
        <span>Don't have and account? </span>
        <b-link :to="{ name: 'register' }">
          <span>&nbsp;Sign up</span>
        </b-link>
      </b-card-text>
    </b-sidebar>

    <br /><br /><br />
    <!-- Left Text-->
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BLink,
  BFormGroup,
  BNav,
  BNavItem,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BCardText,
  BCardTitle,
  BForm,
  BButton,
  BContainer,
  BCol,
  BRow,
  BOverlay,
  BSidebar,
  // BCard,
  VBToggle,
} from "bootstrap-vue";
// import vSelect from "vue-select";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import Ripple from "vue-ripple-directive";
import { mapActions } from "vuex";
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BNav,
    BNavItem,
    BContainer,
    BCol,
    BRow,
    // vSelect,
    // BCard,
    BSidebar,
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
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    "b-toggle": VBToggle,
    Ripple,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      selected: { title: "Colombo" },
      option: [{ title: "Panadura" }, { title: "Rathnapura" }],
      selected1: { title1: "sigma" },
      option1: [{ title1: "priska" }, { title1: "Rathna" }],
      status: "",
      password: "",
      userEmail: "",
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      loading: false,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
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
          password: this.password,
        };
        await this.login(this.payload).catch(({ response }) => {
          this.$vs.loading.close();
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
@import "@core/scss/vue/libs/vue-select.scss";

.nev {
  padding-top: 1%;
  padding-left: 2%;
}
.nev1 {
  padding-left: 10%;
  padding-top: 0%;
  padding-bottom: 0%;
}
.middle {
  padding-bottom: 32%;
  padding-left: 40%;
  padding-right: 40%;
}
.open {
  padding-left: 10%;
  padding-top: 2%;
}
.middle1 {
  padding-top: 0%;
  padding-bottom: 0%;
  padding-left: 40%;
  padding-right: 40%;
}
</style>
