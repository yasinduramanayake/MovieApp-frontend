<template>
  <div style="background-color:black">
    <Header />
    <!-- /Brand logo-->
    <br /><br /><br />
    <br />
    <br />
    <br />

    <b-row>
      <b-col center>
        <b-card title="Add Payment">
          <b-row>
            <b-col md="1" lg="6">
              <b-card img-height="200" img-width="200" title="Payment Details">
                <validation-observer ref="simpleRules">
                  <b-form>
                    <b-row>
                      <!--Cardholder's name:-->
                      <b-col cols="12">
                        <b-form-group>
                          <label>Cardholder's name:</label>
                          <validation-provider
                            #default="{ errors }"
                            rules="required"
                            name="Cardholder's name:"
                          >
                            <b-form-input
                              v-model="name"
                              :state="errors.length > 0 ? false : null"
                              placeholder="Cardholder's name:"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>

                      <!--Card Number-->
                      <b-col cols="12">
                        <b-form-group>
                          <label>Card Number</label>
                          <validation-provider
                            #default="{ errors }"
                            rules="required|integer|digits:16 "
                            name="Number"
                          >
                            <b-form-input
                              v-model="number"
                              :state="errors.length > 0 ? false : null"
                              placeholder="Enter Number Only"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>

                      <!-- Expiry date -->
                      <b-col cols="12">
                        <b-form-group
                          label="Expiry date "
                          label-for="v-expirydate"
                        >
                          <b-form-input
                            id="v-expirydate"
                            type="month"
                            placeholder="MM/YYYY"
                          />
                        </b-form-group>
                      </b-col>

                      <!-- Cvv -->
                      <b-col cols="12">
                        <b-form-group>
                          <label>Cvv</label>
                          <validation-provider
                            #default="{ errors }"
                            rules="required|digits:3"
                            name="Numeric"
                          >
                            <b-form-input
                              v-model="digitValue2"
                              :state="errors.length > 0 ? false : null"
                              placeholder="cvv"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>

                      <!-- checkbox -->
                      <b-col cols="12">
                        <b-form-group>
                          <b-form-checkbox
                            id="checkbox"
                            name="checkbox"
                            value="savethis"
                          >
                            Save this card
                          </b-form-checkbox>
                        </b-form-group>
                      </b-col>

                      <!-- submit button -->
                      <b-col cols="12">
                        <b-button
                          variant="primary"
                          type="submit"
                          @click.prevent="validationForm"
                        >
                          Submit
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-form>
                </validation-observer>
              </b-card>
            </b-col>
            <b-col md="1" lg="6">
              <b-card title="Booking Summary">
                <b-col md="1" lg="6">
                  <b-card>
                    <b-card-img
                      :src="
                        require('@/assets/images/MV5BYzE1YzViNzktZTU5Ny00ZjYzLWE0YjItZWNkNDU1MzFiOWNhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg')
                      "
                      width="3px"
                    ></b-card-img>
                    <b-card-text>
                      Rs.600.00
                      <br />
                      The Kissing Booth3
                      <br />
                      Tickets Quntity: 2
                      <br />
                      ------------------------------------------------
                      <br />
                      <div class="row lower">
                        <div class="col text-left">Subtotal</div>
                        <div class="col text-right">Rs. 1200.00</div>
                      </div>
                      <div class="row lower">
                        <div class="col text-left">Booking</div>
                        <div class="col text-right">Free</div>
                      </div>
                      <div class="row lower">
                        <div class="col text-left"><b>Total to pay</b></div>
                        <div class="col text-right"><b>Rs. 1200.00</b></div>
                      </div>
                      <div class="row lower">
                        <div class="col text-left">
                          <a href="#"><u>Add promo code</u></a>
                        </div>
                      </div>
                    </b-card-text>
                    <b-button
                      variant="primary"
                      type="submit"
                      @click.prevent="validationForm"
                    >
                      Proceed
                    </b-button>
                  </b-card>
                </b-col>
              </b-card>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <br />
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
import {
  BCardText,
  BButton,
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
import Ripple from "vue-ripple-directive";
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
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
