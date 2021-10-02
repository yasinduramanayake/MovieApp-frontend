<template>
  <div>
    <b-modal id="modal-info" :hide-footer="true">
      <div>
        <!--edit & create form -->
        <b-card-title title-tag="h2" style="color:black" class="mb-2">
          <b-col cols="12">
            {{ makeUpperCase("Edit Member") }}
          </b-col>
        </b-card-title>
        <validation-observer ref="theaterForm" #default="{invalid}">
          <b-form
            enctype="multipart/form-data"
            class="auth-register-form mt-2"
            @submit.prevent
          >
            <b-col cols="12">
              <!-- Theater Name -->
              <b-form-group label="Theater Name" label-for="name">
                <validation-provider
                  #default="{ errors }"
                  name="name"
                  vid="name"
                  rules="required"
                >
                  <b-form-input
                    id="name"
                    name="name"
                    v-model="form.name"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Priska"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <!-- Location -->
              <b-form-group label="Location">
                <validation-provider
                  #default="{ errors }"
                  name="venue"
                  vid="venue"
                  rules="required"
                >
                  <v-select
                    v-model="venue"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="title1"
                    :options="option1"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <!-- Show Time One -->
              <b-form-group>
                <label>Show time 1</label>
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="time1"
                >
                  <b-form-timepicker
                    locale="en"
                    required
                    :placeholder="momentFormat(form.time1, 'h:mm:ss a')"
                    v-model="form.time1"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <!-- Show Time 2 -->
              <b-form-group>
                <label>Show time 2</label>
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="time2"
                >
                  <div>
                    <b-form-timepicker
                      locale="en"
                      required
                      :placeholder="momentFormat(form.time2, 'h:mm:ss a')"
                      v-model="form.time2"
                    />
                    <div class="mt-2"></div>
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <!-- Show time 3-->
              <b-form-group>
                <label>Show time 3</label>
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="time3"
                >
                  <div>
                    <b-form-timepicker
                      locale="en"
                      required
                      :placeholder="momentFormat(form.time3, 'h:mm:ss a')"
                      v-model="form.time3"
                    />
                    <div class="mt-2"></div>
                  </div>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <!-- Theater Type -->
              <b-form-group>
                <label>Select Theater Type</label>
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="theater"
                >
                  <v-select
                    v-model="type"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="title"
                    :options="option"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <!-- Image -->
              <b-form-group label="Image">
                <validation-provider
                  #default="{ errors }"
                  name="image"
                  id="image"
                >
                  <b-form-file
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    no-drop
                    v-model="form.image"
                    @change="onChange"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <!-- Descrition -->
              <b-form-group label="Description">
                <validation-provider
                  #default="{ errors }"
                  name="description"
                  vid="description"
                  rules="required"
                >
                  <b-form-textarea
                    id="textarea-rows"
                    placeholder="This theater about..."
                    rows="5"
                    v-model="form.description"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- button -->

            <b-button
              variant="primary"
              @click="Updatetheater()"
              block
              type="submit"
              :disabled="invalid"
            >
              {{ makeUpperCase("Update") }}
            </b-button>
          </b-form>
        </validation-observer>
      </div>
    </b-modal>

    <b-row>
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
              v-model="theatername"
              v-on:input="search($event)"
              @reset="search($event)"
              id="filterInput"
              type="search"
              placeholder="Enter theater name you want.."
            />
            <b-input-group-append>
              <b-button @click="index('', theatername)">
                Search
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <!-- Table-->

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
        >
          <template #cell(image)="data">
            <b-avatar :src="data.value" size="60px" />
          </template>

          <template #cell(name)="data">
            {{ firstLetterUpperCase(data.value) }}
          </template>

          <template #cell(time1)="data">
            {{ momentFormat(data.value, "h:mm:ss a") }}
          </template>
          <template #cell(time2)="data">
            {{ momentFormat(data.value, "h:mm:ss a") }}
          </template>
          <template #cell(time3)="data">
            {{ momentFormat(data.value, "h:mm:ss a") }}
          </template>

          <template #cell(description)="data">
            {{ firstLetterUpperCase(data.value) }}
          </template>

          <template #cell(venue)="data">
            {{ firstLetterUpperCase(data.value) }}
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
                  v-b-modal.modal-info
                  @click="info(row.item, row.index, $event.target)"
                  >Edit</b-dropdown-item
                >
                <b-dropdown-divider />
                <b-dropdown-item
                  @click="Deletetheater(row.item, row.index, $event.target)"
                  >Delete</b-dropdown-item
                >
              </b-nav-item-dropdown>
            </b-nav>
          </template>
        </b-table>
      </b-col>

      <div class="img" v-if="items.length === 0">
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
import { ValidationProvider, ValidationObserver } from "vee-validate";
import NoResultFound from "@/views/components/NoResultFoundimageAdmin.vue";
import {
  BTable,
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  VBModal,
  BFormTextarea,
  BNav,
  BNavItemDropdown,
  BDropdownDivider,
  BDropdownItem,
  BFormTimepicker,
  BForm,
  BFormFile,
  BCardTitle,
} from "bootstrap-vue";
import {
  required,
  email,
  confirmed,
  url,
  between,
  alpha,
  integer,
  password,
  min,
  digits,
  alphaDash,
  length,
} from "@validations";
import vSelect from "vue-select";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import TheaterApi from "@/Api/Modules/theater";
import MovieApi from "@/Api/Modules/movie";
import notification from "@/ApiConstance/toast";

export default {
  components: {
    BFormTextarea,
    NoResultFound,
    BFormTimepicker,
    BFormFile,
    vSelect,
    BForm,
    BCardTitle,
    BTable,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BNav,
    BNavItemDropdown,
    BDropdownDivider,
    BDropdownItem,

    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],

  data() {
    return {
      // form data
      link: {},
      movies: [],
      selctedFile: "",
      mode: "",
      theatername: "",
      button: "",
      option: [
        { title: "Multiplex" },
        { title: "Independent and Second-Run" },
        { title: "IMAX" },
        { title: "Drive-In" },
        { title: "Ac , 3D" },
        { title: "Ac" },
        { title: "3D" },
      ],
      option1: [{ title1: "Colombo" }, { title1: "Waadduwa" }],
      dir: "ltr",
      form: { movies: [] },
      type: { title: "IMAX" },
      venue: { title1: "Colombo" },
      image: "",

      // validations

      required,
      email,
      confirmed,
      url,
      between,
      alpha,
      integer,
      password,
      min,
      digits,
      alphaDash,
      length,

      //  table data
      id: "",

      perPage: 2,
      currentPage: 1,
      total: "",

      sortBy: "",
      items: [],
      theaters: [],
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
          key: "image",
          label: "Image",
        },
        { key: "venue", label: "Venue", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "time1", label: "Show 1", sortable: true },
        { key: "time2", label: "Show 2", sortable: true },
        { key: "time3", label: "Show 3", sortable: true },
        { key: "type", label: "Type", sortable: true },
        { key: "description", label: "Description", sortable: true },

        { key: "action", label: "Action", sortable: true },
      ],
    };
  },
  directives: {
    "b-modal": VBModal,
  },

  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
  async created() {
    await this.index();
  },

  async mounted() {
    // Set the initial number of items

    await this.Allmovies();
  },

  methods: {
    // upload image
    onChange(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.form.image = e.target.result;
      };
    },
    // filter theaters
    search(e) {
      this.index(true, e);
      this.items = [];
    },
    // paginate
    paginate(e) {
      this.currentPage = e;
      this.index();
    },
    // retrive movies

    async Allmovies() {
      const res = await MovieApi.index();
      this.movies = res.data.data.data;
    },
    //row info
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
      this.form.name = item.name;
      this.form.time1 = item.time1;
      this.form.time2 = item.time2;
      this.form.time3 = item.time3;
      this.type = item.type;
      this.venue = item.venue;
      this.form.description = item.description;
      this.id = item.id;
      this.form.image = item.image;
      this.form.movies = item.movies;
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

    // update theater
    async Updatetheater() {
      if (await this.$refs.theaterForm.validate()) {
        await this.$vs.loading({
          scale: 0.8,
        });

        this.form.type = this.type.title || this.type;
        this.form.venue = this.venue.title1 || this.venue;

        await TheaterApi.update(this.form, this.id)
          .then(({ res }) => {
            this.$vs.loading.close();
          })
          .catch(({ res }) => {
            this.$vs.loading.close();
            console.log(this.type);
          });
      }

      setTimeout(() => {
        this.payload = "";
      }, 30000);
    },

    // delete theater

    async Deletetheater(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
      await TheaterApi.delete(item.id);
    },

    // retreive all theaters
    async index(reset = false, theatername = "") {
      if (reset) {
        this.currentPage = 1;
        this.items = [];
      }
      const res = await TheaterApi.index(
        theatername,
        this.currentPage,
        this.perPage
      );
      if (this.currentPage === 1) {
        this.items = res.data.data.data;
      } else {
        this.items = this.items.concat(res.data.data.data);
      }
      // this.items = this.movies;

      this.total = res.data.data.total;
    },

    // genarate report
    async genaratereport() {
      await TheaterApi.genaratePdf(this.link).catch((res) => {
        // eslint-disable-next-line
        notification.toast(
          // eslint-disable-next-line
          "See your" + "  " + this.link.text + "  " + "Folder",
          "success"
        );
      });
    },
  },
};
</script>
