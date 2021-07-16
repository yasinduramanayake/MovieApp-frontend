<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          {{ userData.fullName || userData.username }}
        </p>
        <span class="user-status">{{ userData.role }}</span>
      </div>
      <b-avatar
        size="40"
        :src="userData.avatar"
        variant="light-primary"
        badge
        class="badge-minimal"
        badge-variant="success"
      >
        <feather-icon v-if="!userData.fullName" icon="UserIcon" size="22" />
      </b-avatar>
    </template>

    <b-dropdown-item
      :to="{ name: 'pages-profile' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon size="16" icon="UserIcon" class="mr-50" />
      <span>Profile</span>
    </b-dropdown-item>
    <b-dropdown-divider />
    <b-dropdown-item @click="logout()" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
      <span>Logout</span>
    </b-dropdown-item></b-nav-item-dropdown
  >
</template>

<script>
import {
  BNavItemDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar
} from "bootstrap-vue";
import { avatarText } from "@core/utils/filter";
import authApi from "@/Api/Modules/auth";

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar
  },
  data() {
    return {
      userData: "",
      avatarText
    };
  },
  async mounted() {
    await this.profile();
  },
  methods: {
    async profile() {
      const res = await authApi.profile();
      this.userData = res.data.data;
      console.log(this.userData);
    },
    logout() {
      authApi.logout();
      this.$router.push("/login");
    }
  }
};
</script>
