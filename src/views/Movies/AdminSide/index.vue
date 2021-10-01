<template>
  <div>
    <portal to="appbar_button">
      <b-button
        v-b-toggle.sidebar-right
        type="filled"
        @click="shift()"
        variant="success"
      >
        <feather-icon icon="PlusIcon" class="mr-50" />
        Add Movie
      </b-button>
    </portal>

    <!-- Side Bar -->
    <b-sidebar id="sidebar-right" bg-variant="white" shadow backdrop right>
      <Create />
    </b-sidebar>

    <!-- Table And edit-->

    <Table />
  </div>
</template>

<script>
// import Units from '@/apis/modules/units'
// import Items from '@/apis/modules/items'

import { BButton, BSidebar, VBToggle } from "bootstrap-vue";
import vSelect from "vue-select";
import Create from "@/views/Movies/Components/create.vue";
import Table from "@/views/Movies/Components/table.vue";

export default {
  components: {
    BButton,
    BSidebar,

    Create,
    Table,
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
