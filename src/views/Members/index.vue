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

    <b-sidebar id="sidebar-right" bg-variant="white" shadow backdrop right>
      <div v-if="shiftmode === 'Add'">
        <Form :data="modeobj.Addmode" :databutton="modeobj.Addbutton" />
      </div>

      <div v-if="shiftmode === 'Edit'">
        <Form :data="modeobj.Editmode" :databutton="modeobj.Updatebutton" />
      </div>
    </b-sidebar>

    <b-row>
      <b-col md="2" sm="4" class="my-1">
        <b-form-group class="mb-0">
          <label class="d-inline-block text-sm-left mr-50">Per page</label>
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            size="sm"
            :options="pageOptions"
            class="w-50"
          />
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            />
            <b-input-group-append>
              <b-button>
                Search
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col cols="12">
        <b-table
          striped
          hover
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="items"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
        >
          <template #cell(Image)="data">
            <b-avatar :src="data.value" size="60px" />
          </template>

          <template #cell(action)="row">
            <b-nav>
              <b-nav-item-dropdown
                id="my-nav-dropdown"
                text="Action"
                toggle-class="nav-link-custom"
                right
              >
                <b-dropdown-item
                  v-if="row.item.role === 'Admin'"
                  v-b-toggle.sidebar-right
                  @click="info(row.item, row.index, $event.target)"
                  >Edit</b-dropdown-item
                >
                <b-dropdown-divider />
                <b-dropdown-item>Delete</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-nav>
          </template>
        </b-table>
      </b-col>

      <b-col cols="12">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="center"
          size="sm"
          class="my-0"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import Units from '@/apis/modules/units'
// import Items from '@/apis/modules/items'

import {
  BSidebar,
  VBToggle,
  BTable,
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BNav,
  BNavItemDropdown,
  BDropdownDivider,
  BDropdownItem,
} from "bootstrap-vue";
import Form from "@/views/Members/components/Form.vue";

export default {
  components: {
    BSidebar,
    Form,
    BTable,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BNav,
    BNavItemDropdown,
    BDropdownDivider,
    BDropdownItem,
  },
  data() {
    return {
      data1: "yasindu",
      shiftmode: "",
      modeobj: {
        Addmode: "Add Member",
        Editmode: "Edit Member",
        Addbutton: "Add",
        Updatebutton: "Update",
      },
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      fields: [
        {
          key: "Image",
          label: "Image",
        },
        { key: "full_name", label: " Full Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "mobile", label: "Mobile", sortable: true },
        { key: "role", label: "Role", sortable: true },
        { key: "action", label: "Action", sortable: true },
      ],
      items: [
        {
          // eslint-disable-next-line global-require
          Image: require("@/assets/images/125191853_2699384830310844_5638529771115210821_n.jpg"),
          full_name: "Yasindu Ramanayake",
          email: "yasinduramanayake123@gmail.com",
          mobile: "0713531234",
          role: "Admin",
        },
        {
          // eslint-disable-next-line global-require
          Image: require("@/assets/images/Screenshot_2021-07-17-15-56-17-05.png"),
          full_name: "Madura Prasad",
          email: "maduraprasad@gmail.com",
          mobile: "0715671234",
          role: "Admin",
        },
        {
          // eslint-disable-next-line global-require
          Image: require("@/assets/images/133753918_429404674879921_6610452570295338387_n.jpg"),
          full_name: "Pubudi Fernando",
          email: "pubudi.fernando@gmail.com",
          mobile: "0713123890",
          role: "Admin",
        },
        {
          Image: require("@/assets/images/avatars/6.png"),
          full_name: "David Williom",
          email: "davidwilliom@gmail.com",
          mobile: "+3456898987",
          role: "User",
        },
        {
          // eslint-disable-next-line global-require
          Image: require("@/assets/images/avatars/1.png"),
          full_name: "Mariya Dupezo",
          email: "mariya.233@gmail.com",
          mobile: "+456787654",
          role: "User",
        },
        {
          // eslint-disable-next-line global-require
          Image: require("@/assets/images/avatars/3.png"),
          full_name: "Seleena De Soiza",
          email: "seleena34.7@gmail.com",
          mobile: "+6890987654",
          role: "User",
        },
      ],
    };
  },
  directives: {
    "b-toggle": VBToggle,
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    shift() {
      this.shiftmode = "Add";
    },
    open(row) {
      console.log(this.items[row].movie_name);
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
      this.shiftmode = "Edit";
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<style></style>
