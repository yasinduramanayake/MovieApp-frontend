<template>
  <b-carousel id="carousel-interval" controls indicators :interval="2700">
    <b-carousel-slide :img-src="require('@/assets/images/banner06.jpg')" />
    <b-carousel-slide :img-src="require('@/assets/images/banner06.jpg')" />
    <b-carousel-slide :img-src="require('@/assets/images/banner06.jpg')" />
  </b-carousel>
</template>

<script>
import { BCarousel, BCarouselSlide } from "bootstrap-vue";

export default {
  components: {
    BCarousel,
    BCarouselSlide,
  },
};
</script>
