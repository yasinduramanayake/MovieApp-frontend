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
      <b-nav-item active>
        Movies
      </b-nav-item>
      <b-nav-item>Theaters</b-nav-item>
      <b-nav-item-dropdown
        id="my-nav-dropdown"
        text="Profile"
        toggle-class="nav-link-custom"
        right
      >
        <b-dropdown-item v-b-toggle.sidebar-right>Login</b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item>profile</b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item>Logout</b-dropdown-item>
      </b-nav-item-dropdown>
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
    <br /><br /><br />

    <b-row class="match-height">
      <b-col md="6" lg="4">
        <b-card
          :img-src="require('@/assets/images/The_Kissing_Booth_2_poster.jpg')"
          img-alt="Card image cap"
          img-top
          title="Card title"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </b-card-text>
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
          >
            Go Somewhere
          </b-button>
        </b-card>
      </b-col>
      <b-col md="6" lg="4">
        <b-card no-body>
          <b-card-body>
            <b-card-title>Card title</b-card-title>
            <b-card-sub-title>Support card subtitle</b-card-sub-title>
          </b-card-body>
          <b-img
            fluid
            :src="
              require('@/assets/images/MV5BYzE1YzViNzktZTU5Ny00ZjYzLWE0YjItZWNkNDU1MzFiOWNhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg')
            "
            alt="Card image cap"
          />
          <b-card-body>
            <b-card-text>Bear claw sesame snaps gummies chocolate.</b-card-text>
            <b-link class="card-link">
              Card link
            </b-link>
            <b-link class="card-link">
              Another link
            </b-link>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col md="6" lg="4">
        <b-card title="Card title" sub-title="Support card subtitle">
          <b-img
            fluid
            class="mb-2"
            :src="
              require('@/assets/images/01-f9-dm-mainstage-mobile-banner-1080x793-pl-f01-013120-5e3867f0cf333-1.jpg')
            "
          />
          <b-card-text>Bear claw sesame snaps gummies chocolate.</b-card-text>
          <b-link class="card-link">
            Card link
          </b-link>
          <b-link class="card-link">
            Another link
          </b-link>
        </b-card>
      </b-col>
    </b-row>

    <br /><br /><br />
    <div>
      <transition-group name="fade" tag="div">
        <div v-for="i in [currentIndex]" :key="i">
          <img :src="currentImg" />
        </div>
      </transition-group>
      <a class="prev" @click="prev" href="#">&#10094; Previous</a>
      <a class="next" @click="next" href="#">&#10095; Next</a>
    </div>

    <br /><br /><br />
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
  BNavItemDropdown,
  BNav,
  BNavItem,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BCardText,
  BDropdownDivider,
  BDropdownItem,
  BCardTitle,
  BForm,
  BButton,
  BContainer,
  BCol,
  BCard,
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
    BNavItemDropdown,
    BNav,
    BCard,
    BDropdownDivider,
    BDropdownItem,
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
      images: [
        "https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg",
      ],
      timer: null,
      currentIndex: 0,
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
  mounted: function() {
    this.startSlide();
  },
  computed: {
    currentImg: function() {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    },
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
    startSlide: function() {
      this.timer = setInterval(this.next, 4000);
    },

    next: function() {
      this.currentIndex += 1;
    },
    prev: function() {
      this.currentIndex -= 1;
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
.fade-enter-active,
.fade-leave-active {
  transition: all 0.9s ease;
  overflow: hidden;
  visibility: visible;
  position: absolute;
  width: 100%;
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  visibility: hidden;
  width: 100%;
  opacity: 0;
}

img {
  height: 600px;
  width: 100%;
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 40%;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 0 4px 4px 0;
  text-decoration: none;
  user-select: none;
}

.next {
  right: 0;
}

.prev {
  left: 0;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.9);
}
</style>
