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
              id="filterInput"
              v-model="moviename"
              v-on:input="search($event)"
              @reset="search($event)"
              type="search"
              placeholder="Enter Movie Name you want.."
            />
            <b-input-group-append>
              <b-button @click="index('', moviename)">
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
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import NoResultFound from "@/views/components/NoResultFoundimage.vue";

import {
  BTable,
  BAvatar,
  BRow,
  BEmbed,
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
    NoResultFound,
    BFormFile,
    BCard,
    BFormSelectOption,
    vSelect,
    BForm,
    BCardTitle,
    BEmbed,
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
      moviename: "",
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
      id: "",
      perPage: 4,
      currentPage: 1,
      total: "",

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
    // rows() {
    //   return this.items.length;
    // },
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
    // paginationevent(e) {
    //   this.pagination.total = this.pagination.total - this.pagination.per_page;
    // },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    search(e) {
      this.index(true, e);
      this.items = [];
    },

    paginate(e) {
      this.currentPage = e;
      this.index();
    },
    async index(reset = false, moviename = "") {
      if (reset) {
        this.currentPage = 1;
        this.items = [];
      }
      const res = await MovieApi.index(
        "",
        moviename,
        this.currentPage,
        this.perPage
      );
      if (this.currentPage == 1) {
        this.items = res.data.data.data;
      } else {
        this.items = this.items.concat(res.data.data.data);
      }
      // this.items = this.movies;

      this.total = res.data.data.total;
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
<style scoped></style>
