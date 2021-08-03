<template>
  <div>
    <portal to="appbar_button">
      <b-button v-b-toggle.sidebar-right type="filled" variant="success">
        <feather-icon icon="PlusIcon" class="mr-50" />
        Add Item
      </b-button>
    </portal>

    <b-sidebar
      id="sidebar-right"
      v-model="sidebarOpen"
      bg-variant="white"
      sidebar-class="sidebar-lg"
      shadow
      backdrop
      no-header
      right
      @hidden="
        formData = {};
        mode = 'add';
        $refs.formbuilder.clearValidation();
      "
    >
    </b-sidebar>
  </div>
</template>

<script>
// import Units from '@/apis/modules/units'
// import Items from '@/apis/modules/items'

import { BButton, BSidebar, VBToggle } from "bootstrap-vue";

export default {
  components: {
    BButton,
    BSidebar,
  },
  directives: {
    "b-toggle": VBToggle,
  },
};
</script>

<style></style>
