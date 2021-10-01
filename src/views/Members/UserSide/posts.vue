<template>
  <b-tabs
    content-class="mt-2"
  
    pills
    class="profile-tabs mt-1 mt-md-0"
    nav-class="mb-0"
  >
    <b-tab active title="My Mobile">
      <b-card-text>
       {{ mobile}}
      </b-card-text>
     
    </b-tab>
    <b-tab active title="My Email">
      <b-card-text>
      {{email}}
      </b-card-text>
     
    </b-tab>
    <br>
    <br><br>

   <b-button variant="primary" class="ml-auto"  v-b-modal.modal-info>
        <feather-icon icon="EditIcon" class="d-block d-md-none" />
        <span class="font-weight-bold d-none d-md-block">Edit Profile</span>
      </b-button>

       <b-modal id="modal-info" :hide-footer="true">
      <div>
        <b-card-title title-tag="h2" style="color:black" class="mb-2">
          <b-col cols="12">
            Edit Profile
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

    <!-- <template #tabs-end>
      <b-button variant="primary" class="ml-auto">
        <feather-icon icon="EditIcon" class="d-block d-md-none" />
        <span class="font-weight-bold d-none d-md-block">Edit</span>
      </b-button>
    </template> -->
  </b-tabs>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { BTabs, BTab, BCardText, BButton,  VBModal,  BSidebar,
  BTable,
  BCard,
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
 
  BNav,
  BNavItemDropdown,
  BDropdownDivider,
  BDropdownItem,
  BForm,
  BCardTitle, } from "bootstrap-vue";
  import user from "@/Api/Modules/user";
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

export default {
  components: {
    BCardText,
    BTabs,
    
    BTab,
      BSidebar,
  BTable,
  BCard,
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
  BForm,
  BCardTitle,
   ValidationProvider, ValidationObserver 
  },
  data(){
    return{
        email: '',
      mobile: '',
       name: '',
       id:'',

      //  validations
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
    }
  },
  directives: {
    "b-modal": VBModal,
  },
  mounted(){
      this.email= localStorage.current_email;
      this.mobile= localStorage.current_mobile;
       this.name= localStorage.current_name;
       this.id = localStorage.current_id;
  },
methods:{
    async Updateuser() {
      if (await this.$refs.registerForm.validate()) {
        await this.$vs.loading({
          scale: 0.8,
        });
        this.payload = {
          name: this.name,
          email: this.email,
          mobile: this.mobile,
          role: 'User',
        };
        await user
          .updateCurrentUser(this.payload, this.id)
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
}
  
};
</script>
