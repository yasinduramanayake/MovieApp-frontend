<template>
  <div style="padding-left:100px;padding-top:20px">
    <b-card
      class="profile-header mb-2"
      :img-src="
        require('@/assets/images/WhatsApp Image 2021-08-24 at 1.17.57 PM.jpeg')
      "
      img-top
      alt="cover photo"
      body-class="p-0"
    >
    </b-card>
  </div>
</template>
<script>
import { BCard } from "bootstrap-vue";

export default {
  components: {
    BCard,
  },
};
</script>
