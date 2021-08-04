<template>
  <div style="background-color:black">
    <Header />
    <!-- /Brand logo-->
    <br /><br />

    <b-row>
      <b-col center>
        <b-card title="MOVIE BOOKING">
          <b-row>
            <b-col>
              <b-card>
                <b-card-img
                  :src="
                    require('@/assets/images/MV5BYzE1YzViNzktZTU5Ny00ZjYzLWE0YjItZWNkNDU1MzFiOWNhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg')
                  "
                  height="600px"
                >
                </b-card-img>
              </b-card>
            </b-col>
            <b-col md="1" lg="6">
              <b-card title="Booking Details">
                <validation-observer ref="simpleRules">
                  <b-form>
                    <b-row>
                      <!--Theater-->
                      <b-col cols="12">
                        <b-card-text>
                          Movie
                          <br />
                          The Kissing Booth 3
                          <br />
                          <br />
                          Theater
                          <br />
                          Savoy, Colombo 3.
                          <br /><br />
                        </b-card-text>
                      </b-col>
                      <!--  name -->
                      <b-col md="12">
                        <b-form-group>
                          <label>Full Name</label>
                          <validation-provider
                            #default="{ errors }"
                            rules="required"
                            name="Full Name"
                          >
                            <b-form-input
                              v-model="name"
                              :state="errors.length > 0 ? false : null"
                              placeholder="Full Name"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>

                      <!-- Must be a valid email -->
                      <b-col md="12">
                        <b-form-group>
                          <label>Email</label>
                          <validation-provider
                            #default="{ errors }"
                            name="Email"
                            rules="required|email"
                          >
                            <b-form-input
                              v-model="emailValue"
                              :state="errors.length > 0 ? false : null"
                              placeholder="Email"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>

                      <!--Number of Seats -->
                      <b-col cols="12">
                        <b-form-group>
                          <label>Seats</label>
                          <validation-provider
                            #default="{ errors }"
                            rules="required|between:1,20"
                            name="Number of Seats"
                          >
                            <b-form-input
                              v-model="numberRange"
                              :state="errors.length > 0 ? false : null"
                              placeholder="No of Seats"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>

                      <!--   <div class="demo-inline-spacing">

     <b-dropdown
    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      text="Primary"
      variant="outline-primary"
    >
      <b-dropdown-item>
        Option 1
      </b-dropdown-item>
      <b-dropdown-item>
        Option 2
      </b-dropdown-item>
      <b-dropdown-item>
        Option 3
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item>Separated link</b-dropdown-item>
    </b-dropdown>

        </div> -->

                      <!-- Show Time -->
                      <b-col cols="12">
                        <b-form-group
                          label="Show Time"
                          label-for="v-expirydate"
                        >
                          <b-form-input
                            id="v-expirydate"
                            type="time"
                            placeholder="time"
                          />
                        </b-form-group>
                      </b-col>

                      <!-- submit button -->
                      <b-col cols="12">
                        <b-button
                          variant="primary"
                          type="submit"
                          @click.prevent="validationForm"
                        >
                          ADD TO MY BOOKINGS
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-form>
                </validation-observer>
              </b-card>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <br />
    <br />

    <div>
      <Footer />
    </div>

    <!-- Left Text-->
  </div>
</template>

<script>
/* eslint-disable global-require */
import Slider from "@/views/components/slideshow/slideshow.vue";
import Header from "@/views/components/header.vue";
import Footer from "@/views/footer.vue";
import Ripple from "vue-ripple-directive";
import { ValidationProvider, ValidationObserver } from "vee-validate";
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
import { BDropdown, BDropdownItem, BDropdownDivider } from "bootstrap-vue";

import {
  BCardText,
  BButton,
  BModal,
  VBModal,
  BCard,
  BCardImg,
  BRow,
  BForm,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,

  // BCard,
  VBToggle,
} from "bootstrap-vue";
// import vSelect from "vue-select";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCardText,
    BButton,
    BModal,
    BCardImg,
    BRow,
    BForm,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    Header,
    Footer,
    BCard,
    BCardText,
    BButton,
    BDropdown,
    BDropdownDivider,
    BDropdownItem,
  },
  data() {
    return {
      name: "",
      passwordValue: "",
      passwordCon: "",
      emailValue: "",
      number: "",
      numberRange: "",
      numberRegx: "",
      URL: "",
      Alphabetic: "",
      digitValue: "",
      digitValue2: "",
      character: "",
      required,
      confirmed,
      password,
      email,
      min,
      integer,
      url,
      alpha,
      between,
      digits,
      length,
      alphaDash,
    };
  },
  directives: {
    "b-toggle": VBToggle,
    "b-modal": VBModal,
    Ripple,
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          // eslint-disable-next-line
          alert("form submitted!");
        }
      });
    },
  },
};
</script>
