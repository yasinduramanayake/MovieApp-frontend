<template>
  <div>
    <b-card-title title-tag="h2" style="color:black" class="mb-2">
      <b-col cols="12">
        Add Member
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
        <!-- password -->

        <b-col cols="12">
          <b-form-group label-for="add-password" label="Password">
            <validation-provider
              #default="{ errors }"
              name="Password"
              vid="password"
              rules="required|password|min:6"
            >
              <b-input-group
                class="input-group-merge"
                :class="errors.length > 0 ? 'is-invalid' : null"
              >
                <b-form-input
                  id="add-password"
                  v-model="password"
                  class="form-control-merge"
                  :type="passwordFieldType"
                  :state="errors.length > 0 ? false : null"
                  name="add-password"
                  placeholder="············"
                />
                <b-input-group-append is-text>
                  <feather-icon
                    :icon="passwordToggleIcon"
                    class="cursor-pointer"
                    @click="togglePasswordVisibility"
                  />
                </b-input-group-append>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <!-- password Confirmation -->
        <b-col cols="12">
          <b-form-group>
            <label>Confirm password</label>
            <validation-provider
              #default="{ errors }"
              rules="required|confirmed:password"
              name="Confirm Password"
            >
              <b-form-input
                v-model="password_confirmation"
                type="password"
                :state="errors.length > 0 ? false : null"
                placeholder="Repeat Password"
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

        <b-button
          variant="primary"
          @click="Adduser()"
          block
          type="submit"
          :disabled="invalid"
        >
          Create
        </b-button>
      </b-form>
    </validation-observer>
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  BCol,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
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
import user from "@/Api/Modules/user";
import vSelect from "vue-select";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";

export default {
  components: {
    BCol,
    BButton,
    BForm,
    vSelect,
    BCardTitle,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      role: { title: "Admin" },
      option: [{ title: "User" }, { title: "Admin" }],
      name: "",
      email: "",
      mobile: "",
      password: "",
      password_confirmation: "",
      status: "",
      payload: {},

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
    };
  },

  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },

  methods: {
    async Adduser() {
      if (await this.$refs.registerForm.validate()) {
        await this.$vs.loading({
          scale: 0.8,
        });
        this.payload = {
          name: this.name,
          email: this.email,
          mobile: this.mobile,
          role: this.role.title,
          password: this.password,
          password_confirmation: this.password_confirmation,
        };
        await user
          .store(this.payload, this.role)
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
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
