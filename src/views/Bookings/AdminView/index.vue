<template>
  <div>
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
} from "bootstrap-vue";
import Form from "@/views/Movies/Components/Form.vue";

export default {
  components: {
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
  },
  data() {
    return {
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
        {
          key: "movie_name",
          label: "Movie Name",
        },
        {
          key: "price",
          label: "Price",
        },
        { key: "theater_details", label: "Theater Name", sortable: true },
        { key: "full_name", label: "Full Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "noofseats", label: "No Of Seates", sortable: true },
        { key: "showtime", label: "Show Time", sortable: true },
        { key: "movietype", label: "Movie Type", sortable: true },
        { key: "theatertype", label: "Theater  Type", sortable: true },
      ],
      items: [
        {
          // eslint-disable-next-line global-require
          Image: require("@/assets/images/banner06.jpg"),
          movie_name: "Jumanji",
          price: "200.00",
          theater_details: "priska , kalutara",
          full_name: "pubudi gamage",
          email: "abc@gmail.com",
          noofseats: "2",
          showtime: "2.00 - 4.00",
          movietype: "18+",
          theatertype: "Balcony",
        },
        {
          // eslint-disable-next-line global-require
          Image: require("@/assets/images/banner03.jpg"),
          movie_name: "World War",
          price: "100.00",
          theater_details: "sigma , panadura",
          full_name: "pubudi Fernando",
          email: "abcd@gmail.com",
          noofseats: "4",
          showtime: "2.00 - 4.00",
          movietype: "kids",
          theatertype: "Balcony",
        },
        {
          // eslint-disable-next-line global-require
          Image: require("@/assets/images/banner04.jpg"),
          movie_name: "Workld War",
          price: "600.00",
          theater_details: "sigma , colombo",
          full_name: "pubudi Fernando",
          email: "abcd@gmail.com",
          noofseats: "4",
          showtime: "2.00 - 4.00",
          movietype: "18+",
          theatertype: "3d",
        },
        {
          // eslint-disable-next-line global-require
          Image: require("@/assets/images/banner05.jpg"),
          movie_name: "Tenet",
          price: "400.00",
          theater_details: "baska , Kadawatha",
          full_name: "Madura Fernando",
          email: "Madura@gmail.com",
          noofseats: "2",
          showtime: "4.00 - 6.00",
          movietype: "Adult",
          theatertype: "3d - Balcony",
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
