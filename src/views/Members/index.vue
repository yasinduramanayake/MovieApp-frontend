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
        Add Member
      </b-button>
    </portal>

    <div v-if="shiftmode === 'Add'">
      <b-sidebar id="sidebar-right" bg-variant="white" shadow backdrop right>
        <CreateForm />
      </b-sidebar>
    </div>

    <Table />
  </div>
</template>

<script>
// import Units from '@/apis/modules/units'
// import Items from '@/apis/modules/items'
import { BSidebar, VBToggle, BButton } from "bootstrap-vue";
import CreateForm from "@/views/Members/components/create.vue";
import Table from "@/views/Members/components/table.vue";

export default {
  components: {
    CreateForm,
    BSidebar,
    Table,
    BButton,
  },

  data() {
    return {
      // Genaral data
      users: [],
      data1: "yasindu",
      shiftmode: "",
      items: [],
      dateFilter: null,
      perPage: 5,
      editabledata: {},
    };
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

<style></style>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
