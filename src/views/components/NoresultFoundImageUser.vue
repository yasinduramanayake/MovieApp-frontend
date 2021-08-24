<template>
  <div style="padding-left:100px;padding-top:20px">
    <b-card
      class="profile-header mb-2"
      :img-src="
        require('@/assets/images/pub.png')
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
