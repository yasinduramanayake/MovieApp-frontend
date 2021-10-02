<template>
  <div>
    <b-modal id="modal-info" :hide-footer="true">
      <div>
        <b-card-title title-tag="h2" style="color:black" class="mb-2">
          <b-col cols="12">
            Edit Member
          </b-col>
        </b-card-title>
        <validation-observer ref="registerForm" #default="{invalid}">
          <b-form class="auth-register-form mt-2" @submit.prevent>
            <!-- username -->
            <b-col cols="12">
              <b-form-group label="Username" label-for="add-username">
                <validation-provider
                  #default="{ errors }"
                  name="Username"
                  vid="username"
                  rules="required"
                >
                  <b-form-input
                    id="add-username"
                    v-model="name"
                    name="add-username"
                    :state="errors.length > 0 ? false : null"
                    placeholder="johndoe"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- email -->

            <b-col cols="12">
              <b-form-group label="Email" label-for="add-email">
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="add-email"
                    v-model="email"
                    name="addr-email"
                    :state="errors.length > 0 ? false : null"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- role-->
            <b-col cols="12">
              <b-form-group label="Userrole" label-for="Add-userrole">
                <validation-provider
                  #default="{ errors }"
                  name="Userrole"
                  vid="userrole"
                  rules="required"
                >
                  <v-select
                    v-model="role"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="title"
                    :options="option"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Contact Number -->
            <b-col cols="12">
              <b-form-group>
                <label>Contact number</label>
                <validation-provider
                  #default="{ errors }"
                  rules="required|digits:10|integer"
                  name="Numeric"
                >
                  <b-form-input
                    v-model="mobile"
                    type="number"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Mobile Number"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Button -->
            <b-form-group>
              <b-form-input id="h-email" type="text" hidden />
            </b-form-group>

            <b-button
              variant="primary"
              block
              @click="Updateuser()"
              type="submit"
              :disabled="invalid"
            >
              Update
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
                  v-b-modal.modal-info
                  @click="info(row.item, row.index, $event.target)"
                  >Edit</b-dropdown-item
                >
                <b-dropdown-divider />
                <b-dropdown-item
                  @click="deleteuser(row.item, row.index, $event.target)"
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
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  BTable,
  BRow,
  BCol,
  BFormGroup,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  VBModal,
  BNav,
  BNavItemDropdown,
  BDropdownDivider,
  BDropdownItem,
  BForm,
  BCardTitle,
} from "bootstrap-vue";
import CreateForm from "@/views/Members/components/create.vue";
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
import user from "@/Api/Modules/user";
import vSelect from "vue-select";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import NoResultFound from "@/views/components/NoResultFoundimageAdmin.vue";
export default {
  components: {
    NoResultFound,
    vSelect,
    BForm,
    BCardTitle,
    BTable,
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
      // Genaral data
      users: [],
      data1: "yasindu",
      shiftmode: "",
      items: [],
      dateFilter: null,
      perPage: 5,
      editabledata: {},
      // form inputs
      role: { title: "Admin" },
      option: [{ title: "User" }, { title: "Admin" }],
      name: "",
      email: "",
      mobile: "",
      id: "",
      status: "",
      payload: {},
      // validations
      required,
      // eslint-disable-next-line
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
      // table data
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
        { key: "name", label: " Full Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "mobile", label: "Mobile", sortable: true },
        { key: "role", label: "Role", sortable: true },
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
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  watch: {
    $route(value) {
      if (value && value.name === "members") this.index();
    },
  },
  methods: {
    shift() {
      this.shiftmode = "Add";
    },
    //row info
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
      this.editabledata = item;
      this.shiftmode = "Edit";
      this.name = item.name;
      this.email = item.email;
      this.role.title = item.role;
      this.mobile = item.mobile;
      this.id = item.id;
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
    // fetch users
    // eslint-disable-next-line
    async index() {
      // eslint-disable-next-line
      let response = await user.index();
      this.users = response.data.data.data;
      this.items = this.users;
    },
    async Updateuser() {
      if (await this.$refs.registerForm.validate()) {
        await this.$vs.loading({
          scale: 0.8,
        });
        this.payload = {
          name: this.name,
          email: this.email,
          mobile: this.mobile,
          role: this.role.title,
        };
        await user
          .update(this.payload, this.id, this.role.title)
          .then(({ res }) => {
            this.$vs.loading.close();
          })
          .catch(({ res }) => {
            this.$vs.loading.close();
          });
      }
      setTimeout(() => {
        this.payload = "";
      }, 30000);
    },
    async deleteuser(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
      await this.$vs.loading({
        scale: 0.8,
      });
      await user
        .delete(item.id)
        .then(({ res }) => {
          this.$vs.loading.close();
        })
        .catch(({ res }) => {
          this.$vs.loading.close();
        });
    },
  },
};
</script>
