<template>
  <div>
    <b-container>
      <b-row>
        <b-col class="nev" cols="11">
          <b-link>
            <vuexy-logo />
          </b-link>
        </b-col>

        <b-col v-if="!token" cols="1">
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
      <b-nav-item active>Movies</b-nav-item>
      <b-nav-item v-if="token">My bookings</b-nav-item>
      <b-nav-item v-if="!token" v-b-toggle.sidebar-right>Login</b-nav-item>
      <b-nav-item v-if="token">Profile</b-nav-item>
      <b-nav-item v-if="token">Logout</b-nav-item>
    </b-nav>

    <b-sidebar
      id="sidebar-right"
      bg-variant="dark"
      text-variant="light"
      right
      backdrop
      shadow
    >
      <login />
    </b-sidebar>
  </div>
</template>
<script>
/* eslint-disable global-require */
import VuexyLogo from "@core/layouts/components/Logo.vue";
import login from "@/views/components/loginform.vue";
import Ripple from "vue-ripple-directive";
import {
  BLink,
  BNav,
  BNavItem,
  BContainer,
  BCol,
  BRow,
  BButton,
  BSidebar,
  VBToggle,
  // BCard,
} from "bootstrap-vue";
export default {
  name: "Header",
  components: {
    BNav,
    BSidebar,
    BButton,

    login,

    BNavItem,
    BContainer,
    BCol,
    BRow,
    // vSelect,
    // BCard,

    BLink,

    VuexyLogo,
  },
  data() {
    return {
      token: localStorage.token,
    };
  },
  directives: {
    "b-toggle": VBToggle,
    Ripple,
  },
};
</script>
<style scoped>
.nev {
  padding-top: 1%;
  padding-left: 2%;
}
.nev1 {
  padding-left: 10%;
  padding-top: 0%;
  padding-bottom: 0%;
  font-size: 1.2rem;
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
