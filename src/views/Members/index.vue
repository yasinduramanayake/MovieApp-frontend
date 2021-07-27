<template>
  <h1>{{ getFullName(name) }}</h1>
</template>
<script>
export default {
  data() {
    return {
      name: {
        first_name: "yasindu",
        last_name: "ramanayake"
      }
    };
  }
};
</script>
