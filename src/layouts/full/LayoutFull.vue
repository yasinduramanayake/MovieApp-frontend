<template>
  <layout-full>
    <router-view />
  </layout-full>
</template>

<script>
import LayoutFull from "@core/layouts/layout-full/LayoutFull.vue";

export default {
  components: {
    LayoutFull,
  },

  data() {
    return {
      data: localStorage.role,
    };
  },
};
</script>
