<template>
  <div style="background-color:#24262b">
    <Header />
    <!-- /Brand logo-->
    <br /><br /><br />
    <br />
    <br />
    <br />
    <div style="background-color:#24262b">
      <b-card style="padding-left:450px;padding-right:10px">
        <b-row>
          <b-card title="Booking Summary">
            <b-card style="padding-left:1px;padding-right:10px">
              <b-card-text>
                Ticket Price : {{ getPrice("200") }}
                <br />
                Movie : {{ movie_name }}
                <br />
                Theater : {{ theater_name }}
                <br />
                Selected Time : {{ momentFormat(showtime, "h:mm:ss a") }}
                <br />
                Tickets Quntity : {{ seats }}
                <br />
                ------------------------------------------------
                <br />
                <div class="row lower">
                  <div class="col text-left">Subtotal</div>
                  <div class="col text-right">{{ getPrice(total) }}</div>
                </div>
                <div class="row lower">
                  <div class="col text-left">Booking</div>
                  <div class="col text-right">Free</div>
                </div>
                <div class="row lower">
                  <div class="col text-left"><b>Total to pay</b></div>
                  <div class="col text-right">
                    <b>{{ getPrice(total) }}</b>
                  </div>
                </div>
                <div class="row lower">
                  <div class="col text-left">
                    <a href="#"><u>Add promo code</u></a>
                  </div>
                </div>
              </b-card-text>
              <b-button variant="primary" type="submit" v-b-modal.modal-info>
                Proceed
              </b-button>
            </b-card>
          </b-card>
        </b-row>
      </b-card>
    </div>
    <b-modal id="modal-info" :hide-footer="true">
      <div>
        <!--edit & create form -->
        <b-card-title title-tag="h2" style="color:black" class="mb-2">
          <b-col cols="12">
            <b>{{ makeUpperCase("Add Payment") }}</b>
          </b-col>
        </b-card-title>

        <validation-observer ref="paymentForm">
          <b-form
            class="auth-register-form mt-2"
            enctype="multipart/form-data"
            @submit.prevent
          >
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
                    v-model="form.name"
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
                    v-model="form.cardnumber"
                    type="number"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Card Number"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Expiry date -->
            <b-col cols="12">
              <b-form-group label="Expiry date " label-for="v-expirydate">
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Numeric"
                >
                  <b-form-input
                    id="v-expirydate"
                    type="month"
                    v-model="form.expiredate"
                    placeholder="MM/YYYY"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
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
                    v-model="form.cvv"
                    type="number"
                    :state="errors.length > 0 ? false : null"
                    placeholder="cvv"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- submit button -->
            <b-col cols="12">
              <b-button variant="primary" type="submit" @click="AddPayment()">
                Pay Now
              </b-button>
            </b-col>
          </b-form>
        </validation-observer>
      </div>
    </b-modal>

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
  BCardTitle,
  BButton,
  BCard,
  BRow,
  BForm,
  BCol,
  BFormGroup,
  BFormInput,
  VBModal,

  // BCard,
  VBToggle,
} from "bootstrap-vue";
// import vSelect from "vue-select";
import PaymentApi from "@/Api/Modules/payment";
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BRow,
    BForm,
    BCol,
    BFormGroup,
    BFormInput,
    BCardTitle,
    Header,
    Footer,
    BCard,
    BCardText,
    BButton,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      // form data
      form: {},

      movie_name: this.$route.params.movie_name,
      seats: this.$route.params.seats,
      total: this.$route.params.total,
      theater_name: this.$route.params.theater_name,
      showtime: this.$route.params.time,
      // validations
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
    "b-modal": VBModal,
  },
  methods: {
    async AddPayment() {
      if (await this.$refs.paymentForm.validate()) {
        await this.$vs.loading({
          scale: 0.8,
        });
        this.form.email = localStorage.email;
        await PaymentApi.store(this.form)
          .then(({ res }) => {
            this.$vs.loading.close();
          })
          .catch(({ res }) => {
            this.$vs.loading.close();
          });
      }

      setTimeout(() => {
        this.form = "";
      }, 30000);
    },
  },
};
</script>
