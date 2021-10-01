<template
  ><div style="padding-top:10%;">
    <center>
      <b-card style="background-color:#00FF67"
        ><h2>Go to Your Email !</h2>
        <p><b>And paste verfication code to the reset password</b></p>
        <feather-icon icon="ThumbsUpIcon" />
        <feather-icon icon="ThumbsUpIcon" />
        <feather-icon icon="ThumbsUpIcon" />
      </b-card>
    </center>
  </div>
</template>
<script>
import { BCard } from "bootstrap-vue";
import FeatherIcon from "@/@core/components/feather-icon/FeatherIcon.vue";

export default {
  components: {
    BCard,
    FeatherIcon,
  },
};
</script>
