<template>
  <div>
    <b-modal id="modal-info" :hide-footer="true">
      <div>
        <b-card-title title-tag="h2" style="color:black" class="mb-2">
          <b-col cols="12">
            {{ makeUpperCase("Edit Movie") }}
          </b-col>
        </b-card-title>
        <validation-observer ref="movieForm" #default="{invalid}">
          <b-form
            class="auth-register-form mt-2"
            enctype="multipart/form-data"
            @submit.prevent
          >
            <b-col cols="12">
              <!-- Movie Name -->
              <b-form-group label="Movie Name" label-for="name">
                <validation-provider
                  #default="{ errors }"
                  name="name"
                  rules="required"
                >
                  <b-form-input
                    id="name"
                    name="name"
                    v-model="form.name"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Tenet"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <!-- Movie Type -->
              <b-form-group>
                <label>Select Movie Type</label>
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="text"
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
              <!-- Movie Description -->
              <b-form-group label="Movie Description" label-for="description">
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="description"
                >
                  <b-form-textarea
                    id="textarea-rows"
                    placeholder="Tall textarea"
                    v-model="form.description"
                    rows="8"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Theaters Array -->
            <b-col cols="12">
              <b-form-group>
                <label>Select Movie Type/s</label>
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="text"
                >
                  <b-form-select
                    v-model="form.theaters"
                    @change="onclickselect()"
                    multiple
                    class="mb-1"
                  >
                    <b-form-select-option
                      v-for="theater in theaters"
                      :key="theater.id"
                      :value="theater.name"
                      >{{
                        firstLetterUpperCase(theater.name)
                      }}</b-form-select-option
                    >
                  </b-form-select>
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

            <!-- Button -->

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
              v-model="movietype"
              @change="index(event)"
              @reset="index(event)"
              type="search"
              placeholder="Enter Movie Type(EX..English,Tamil).."
            />
            <b-input-group-append>
              <b-button>
                Search
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <!-- Table -->
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
          <template #cell(image)="data">
            <b-avatar :src="data.value" size="60px" />
          </template>

          <template #cell(theaters)="data">
            <div v-for="data in data.value" :key="data.id">
              {{ firstLetterUpperCase(data) }} <br />
            </div>
          </template>

          <template #cell(name)="data">
            {{ firstLetterUpperCase(data.value) }}
          </template>

          <template #cell(description)="data">
            {{ firstLetterUpperCase(data.value) }}
          </template>

          <template #cell(type)="data">
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
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
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
  VBModal,
  BFormTextarea,
  BFormSelectOption,
  BNav,
  BNavItemDropdown,
  BDropdownDivider,
  BDropdownItem,
  BCard,
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
import MovieApi from "@/Api/Modules/movie";
import TheaterApi from "@/Api/Modules/theater";

export default {
  components: {
    BFormTextarea,
    BFormFile,
    BCard,
    BFormSelectOption,
    vSelect,
    BForm,
    BCardTitle,
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

    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],

  data() {
    return {
      // form data
      selctedFile: "",
      mode: "",
      button: "",
      movietype: "",
      option: [
        { title: "Tamil" },
        { title: "English" },
        { title: "Hindi" },
        { title: "Korean" },
      ],
      theaters: [],
      dir: "ltr",
      form: { theaters: [] },
      type: { title: "Tenet" },
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
      timeout: "",
      id: "",
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      items: [],
      movies: [],
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },

      // colomns
      fields: [
        {
          key: "image",
          label: "Image",
        },
        { key: "name", label: "Name", sortable: true },
        { key: "description", label: "Description", sortable: true },
        { key: "type", label: "Type", sortable: true },
        { key: "theaters", label: "Theaters", sortable: true },
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
    this.totalRows = this.items.length;
    await this.Alltheaters();
  },

  methods: {
    onChange(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.form.image = e.target.result;
      };
    },
    //row info
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
      this.mode = "Edit Movie";
      this.button = "Update";
      this.form.name = item.name;
      this.type = item.type;
      this.form.description = item.description;
      this.id = item.id;
      this.form.image = item.image;
      this.form.theaters = item.theaters;
    },
    async Alltheaters() {
      const res = await TheaterApi.index("");
      this.theaters = res.data.data.data;
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

    search(event) {
      // clear timeout variable
      clearTimeout(this.timeout);

      var self = this;
      this.timeout = setTimeout(function() {
        // enter this block of code after 1 second
        // handle stuff, call search API etc.
        self.filters.search = event.target.value;
        self.list(false, true);
      }, 1000);
    },

    async index() {
      const res = await MovieApi.index(this.movietype);
      this.movies = res.data.data.data;
      this.items = this.movies;
    },
    async Updatetheater() {
      if (await this.$refs.movieForm.validate()) {
        await this.$vs.loading({
          scale: 0.8,
        });

        this.form.type = this.type.title || this.type;

        await MovieApi.update(this.form, this.id)
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
      }, 8000);
    },
    async Deletetheater(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
      await MovieApi.delete(item.id);
    },
  },
};
</script>
