<template>
  <div>
    <transition-group name="fade" tag="div">
      <div v-for="i in [currentIndex]" :key="i">
        <img :src="currentImg" />
      </div>
    </transition-group>
    <a class="prev" @click="prev" href="#">&#10094; Previous</a>
    <a class="next" @click="next" href="#">&#10095; Next</a>
  </div>
</template>
<script>
export default {
  name: "Slider",
  data() {
    return {
      images: [
        require("@/assets/images/01-f9-dm-mainstage-mobile-banner-1080x793-pl-f01-013120-5e3867f0cf333-1.jpg"),
        require("@/assets/images/The_Kissing_Booth_2_poster.jpg"),
        require("@/assets/images/The_Kissing_Booth_2_poster.jpg"),
        "https://cdn.pixabay.com/photo/2016/12/04/19/30/berlin-cathedral-1882397_1280.jpg",
      ],
      timer: null,
      currentIndex: 0,
    };
  },

  mounted: function() {
    this.startSlide();
  },

  methods: {
    startSlide: function() {
      this.timer = setInterval(this.next, 4000);
    },

    next: function() {
      this.currentIndex += 1;
    },
    prev: function() {
      this.currentIndex -= 1;
    },
  },

  computed: {
    currentImg: function() {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    },
  },
};
</script>
<style scoped>
.fade-leave-active {
  transition: opacity 0.5s;
  overflow: hidden;
  visibility: visible;
  position: absolute;
  width: 100%;
}
.fade-leave-to {
  visibility: hidden;
  width: 100%;
  opacity: 0;
}

img {
  height: 400px;
  width: 100%;
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 40%;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 0 4px 4px 0;
  text-decoration: none;
  user-select: none;
}

.next {
  right: 0;
}

.prev {
  left: 0;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.9);
}
</style>
