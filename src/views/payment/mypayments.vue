<template>
  <div style="background-color:#24262b">
    <Header />

    <div class="background2">
      <b-container>
        <!--/Search Bar-->

        <br />
        <br />
        <!--/Content-->
        <b-card style="padding-left:460px" title="Welcome to Your Payments">
          <b-card-text>
            This data only can see you...
          </b-card-text>
        </b-card>
        <br />
        <br />
        <b-row>
          <b-col cols="9">
            <b-form-group>
              <b-form-input
                v-model="selected"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-button variant="gradient-primary">Search date...</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col v-for="payment in payments" :key="payment.id" md="1" lg="4">
            <b-card
              :title="
                momentFormat(payment.created_at, 'MMMM Do YYYY, h:mm:ss a')
              "
            >
              <b-row>
                <b-col cols="12">
                  <b-card-text>
                    <b> Card Number</b> : {{ payment.cardnumber }} </b-card-text
                  ><br />

                  <b-card-text>
                    <b>Expire date</b> : {{ payment.expiredate }}</b-card-text
                  >
                  <br />

                  <b-card-text> <b> Cvv</b> : {{ payment.cvv }}</b-card-text
                  ><br />

                  <b-row>
                    <b-col cols="6">
                      <b-button variant="gradient-primary"
                        >Edit</b-button
                      ></b-col
                    >
                    <b-col cols="6">
                      <b-button
                        variant="gradient-primary"
                        @click="deletepayment(payment.id)"
                        >Delete</b-button
                      ></b-col
                    > </b-row
                  ><br />

                  <br /><br />
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
        <br />
        <br />
      </b-container>
    </div>

    <div>
      <Footer />
    </div>

    <!-- Left Text-->
  </div>
</template>

<script>
/* eslint-disable global-require */
import Header from "@/views/components/header.vue";
import Footer from "@/views/footer.vue";
import {
  BCardText,
  BButton,
  BFormGroup,
  BContainer,
  BCard,
  BRow,
  BCol,
  BFormInput,

  // BCard,

  // BCard,
} from "bootstrap-vue";

// import vSelect from "vue-select";
import PaymentApi from "@/Api/Modules/payment";

// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCard,

    BContainer,
    Header,
    BFormGroup,
    BCol,

    BRow,
    BFormInput,
    Footer,

    // BCard,

    // vSelect,
    // BCard,
    BCardText,
    BButton,
  },
  data() {
    return {
      payments: [],
      selected: "",
    };
  },

  async mounted() {
    await this.index();
  },
  methods: {
    async index() {
      const res = await PaymentApi.index("yasindurramanayake123@gmail.com");
      this.payments = res.data.data.data;
    },

    async deletepayment(id) {
      await this.$vs.loading({
        scale: 0.8,
      });
      await PaymentApi.delete(id)
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

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-select.scss";

.background2 {
  background-color: white;
}
.btn {
  padding-left: 50px;
  padding-right: 50px;
}
</style>
