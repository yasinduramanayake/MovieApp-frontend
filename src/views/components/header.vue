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
        <li><a href="#home">Home</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#contact">Contact</a></li>
        <li>
          <div class="dropdown">
            <button class="dropbtn">Dropdown</button>
            <div class="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
        </li>
      </b-col>
    </b-row>
      <!--<ul>
        <ul>
          <li><a style="color:white" @click="pushmovie()">movie</a></li>
          <li v-if="!token" v-b-toggle.sidebar-right>
            <a style="color:white">Login</a>
          </li>
          <li v-if="token"><a href="#contact">Logout</a></li>
      </ul>
    -->
      <b-row>
          <li v-if="token">
          </li>

          <li v-if="token">
            <a style="color:white" @click="pushpayment()">My payments</a>
          </li>
          <li v-if="token">
            <a style="color:white" @click="pushbooking()">My bookings</a>
          </li>

          <li v-if="token">
            <a style="color:white" @click="logout()">logout</a>
          </li>
    </b-row>
    <b-sidebar
      id="sidebar-right"
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
import Dropdown from "vue-simple-search-dropdown";
import auth from "@/Api/Modules/auth";
import { clearToken } from "@/Api/index";
import { mapActions } from "vuex";
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
    Dropdown,
  },
  methods: {
    ...mapActions(["logout"]),
    async localLogout() {
      await this.logout();
      clearToken();
    },

    pushmovie() {
      this.$router.push("/movie");
    },
    pushprofile() {
      this.$router.push("/userprofile");
    },
    pushpayment() {
      this.$router.push("/mypaydetails");
    },
    pushbooking() {
      this.$router.push("/mybooking");
    },
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

.dropdown {
  float: left;
  overflow: hidden;
}

.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.navbar a:hover,
.dropdown:hover, 
.dropdown:hover,
 .dropbtn {
  background-color: #111;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
