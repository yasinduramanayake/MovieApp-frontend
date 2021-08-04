<template>
  <div>
    <b-card
      class="profile-header mb-2"
      :img-src="require('@/assets/images/banner04.jpg')"
      img-top
      alt="cover photo"
      body-class="p-0"
    >
      <!-- profile picture -->
      <div class="position-relative">
        <div class="profile-img-container d-flex align-items-center">
          <div class="profile-img">
            <b-img
              :src="require('@/assets/images/avatars/4.png')"
              rounded
              fluid
              alt="profile photo"
            />
          </div>
          <!-- profile title -->
          <div class="profile-title ml-3">
            <h2 class="text-black">
              Yasindu Ramanayake
            </h2>
            <p class="text-black">
              FullsStack Developer
            </p>
          </div>

          <!--/ profile title -->
        </div>
      </div>
      <!--/ profile picture -->

      <!-- profile navbar -->
      <div class="profile-header-nav">
        <b-navbar toggleable="md" type="light">
          <!-- toggle button -->
          <b-navbar-toggle class="ml-auto" target="nav-text-collapse">
            <feather-icon icon="AlignJustifyIcon" size="21" />
          </b-navbar-toggle>
          <!--/ toggle button -->

          <!-- collapse -->
          <b-collapse id="nav-text-collapse" is-nav>
            <Post />
          </b-collapse>
          <!--/ collapse -->
        </b-navbar>
      </div>

      <!--/ profile navbar -->
    </b-card>
  </div>
</template>

<script>
import { BCard, BImg, BNavbar, BNavbarToggle, BCollapse } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import Post from "@/views/Members/UserSide/posts.vue";

export default {
  components: {
    BCard,
    Post,
    BNavbar,
    BNavbarToggle,
    BCollapse,
    BImg,
  },
  directives: {
    Ripple,
  },
};
</script>
