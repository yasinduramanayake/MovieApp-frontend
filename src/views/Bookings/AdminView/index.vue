<template>
  <div>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="date"
              v-on:input="search($event)"
              @reset="search($event)"
              id="filterInput"
              type="search"
              placeholder="Enter Date you want(ex.22,23).. "
            />
            <b-input-group-append>
              <b-button @click="index('', date)">
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
          <template #cell(price)="data">
            {{ getPrice(data.value) }}
          </template>

          <template #cell(showtime)="data">
            {{ momentFormat(data.value, "h:mm:ss a") }}
          </template>

          <template #cell(created_at)="data">
            {{ momentFormat(data.value, "MMMM Do YYYY, h:mm:ss a") }}
          </template>
        </b-table>
      </b-col>

      <div v-if="items.length === 0">
        <NoResultFound />
      </div>
      <b-col cols="12">
        <b-pagination
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          v-on:input="paginate($event)"
          align="center"
          size="sm"
          class="my-0"
        />
      </b-col>
    </b-row>
    <br />
    <div style="padding-left:20%">
      <b-row>
        <b-col>
          <b-form-input
            v-model="link.text"
            id="text"
            placeholder="Enter file path..(path must include at least '\') "
          ></b-form-input>
        </b-col>
        <b-col>
          <b-button variant="primary" @click="genaratereport()"
            >Genarate Report</b-button
          >
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// import Units from '@/apis/modules/units'
// import Items from '@/apis/modules/items'
import {
  VBToggle,
  BTable,
  BRow,
  BCol,
  BFormGroup,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
} from "bootstrap-vue";
import notification from "@/ApiConstance/toast";
import BookingApi from "@/Api/Modules/booking";
import NoResultFound from "@/views/components/NoResultFoundimageAdmin.vue";
export default {
  components: {
    BTable,
    BRow,
    BCol,
    BFormGroup,
    NoResultFound,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
  },
  data() {
    return {
      // table data
      link: {},
      bookings: [],
      items: [],
      date: "",
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
      // pagination
      perPage: 2,
      currentPage: 1,
      total: "",
      // table feilds
      fields: [
        {
          key: "movie_name",
          label: "Movie Name",
        },
        {
          key: "price",
          label: "Amount",
        },
        { key: "created_at", label: "Booked Date", sortable: true },
        { key: "movie_name", label: "Movie Name", sortable: true },
        { key: "theater_name", label: "Theater Name", sortable: true },
        { key: "full_name", label: "Full Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "seats", label: "No Of Seates", sortable: true },
        { key: "showtime", label: "Show Time", sortable: true },
        { key: "movie_type", label: "Movie Type", sortable: true },
        { key: "theater_type", label: "Theater  Type", sortable: true },
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
  async mounted() {
    // Set the initial number of items
    await this.index();
  },
  methods: {
    shift() {
      this.shiftmode = "Add";
    },
    open(row) {
      console.log(this.items[row].movie_name);
    },
    // get table items
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
    // search
    search(e) {
      this.index(true, e);
      this.items = [];
    },
    // paginate
    paginate(e) {
      this.currentPage = e;
      this.index();
    },
    // comment for testing git hub
    // fetch All data
    async index(reset = false, data = "") {
      await this.$vs.loading({
        scale: 0.8,
      });
      if (reset) {
        this.currentPage = 1;
        this.items = [];
      }
      const res = await BookingApi.index(
        "",
        data,
        "",
        this.currentPage,
        this.perPage
      );
      this.$vs.loading.close();
      if (this.currentPage === 1) {
        this.items = res.data.data.data;
      } else {
        this.items = this.items.concat(res.data.data.data);
      }

      this.total = res.data.data.total;
    },

    // genarate report
    async genaratereport() {
      await this.$vs.loading({
        scale: 0.8,
      });
      await BookingApi.genaratePdf(this.link)
        .then(({ res }) => {
          this.$vs.loading.close();
        })
        .catch((res) => {
          // eslint-disable-next-line
          notification.toast(
            // eslint-disable-next-line
            "See your" + "  " + this.link.text + "  " + "Folder",
            "success"
          );
          this.$vs.loading.close();
        });
    },
  },
};
</script>

<style></style>
