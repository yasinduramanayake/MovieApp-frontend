<template>
  <h1>{{ getFullName(name) }}</h1>
</template>
<script>
export default {
  data() {
    return {
      name: {
        first_name: "RM",
        last_name: "Prasad"
      }
    };
  }
};
</script>
