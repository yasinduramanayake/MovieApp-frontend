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

    <b-row>
      <b-col cols="1"> </b-col>
      <b-col cols="11">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#news">Movies</a></li>
          <li v-if="!token" v-b-toggle.sidebar-right>
            <a href="#contact">Login</a>
          </li>
          <li v-if="token"><a href="#contact">Profile</a></li>
          <li v-if="token"><a href="#contact">Logout</a></li>
        </ul>
      </b-col>
    </b-row>
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
    BSidebar,
    BButton,

    login,
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
.header1 {
  height: 5%;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 10;
  overflow: hidden;
  background-color: #24262b;
}
li {
  float: left;
}
li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 22px;
  text-decoration: cornsilk;
  font-size: 15px;
}
li a:hover:not(.active) {
  background-color: #111;
}
.active {
  background-color: #04aa6d;
}
</style>
