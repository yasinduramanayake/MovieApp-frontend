<template>
  <div>
    <b-card
      
    >
      <!-- profile picture -->
      <div class="position-relative">
        <div class="profile-img-container d-flex align-items-center">
          <div class="profile-img">
            <b-img
              :src="require('@/assets/images/profile-photo-vector-placeholder-pic-260nw-535853263.jpg')"
              rounded
              fluid
              alt="profile photo"
            />
          </div>
          <!-- profile title -->
          <div class="profile-title ml-3">
            <h2 class="text-black">
              {{ firstLetterUpperCase(name)}}
            </h2>
           
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
  data() {
    return {
      name: localStorage.current_name,
    
    };
  },
  directives: {
    Ripple,
  },
};
</script>
