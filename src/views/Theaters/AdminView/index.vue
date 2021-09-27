<template>
  <div>
    <portal to="appbar_button">
      <b-button
        v-b-toggle.sidebar-right
        type="filled"
        @click="shift()"
        variant="primary"
      >
        <feather-icon icon="PlusIcon" class="mr-50" />
        Add Theater
      </b-button>
    </portal>

    <!-- Side Bar-->
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
import Create from "@/views/Theaters/AdminView/components/create.vue";
import Table from "@/views/Theaters/AdminView/components/table.vue";

export default {
  components: {
    BButton,
    BSidebar,
    Create,
    Table,
  },

  directives: {
    "b-toggle": VBToggle,
  },

  methods: {
    shift() {
      this.shiftmode = "Add";
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
