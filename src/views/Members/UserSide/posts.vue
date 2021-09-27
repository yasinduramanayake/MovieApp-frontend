<template>
  <b-tabs
    content-class="mt-2"
    justified
    pills
    class="profile-tabs mt-1 mt-md-0"
    nav-class="mb-0"
  >
    <b-tab title="Who Are You">
      <b-card-text>
        Biscuit powder jelly beans. Lollipop candy canes croissant icing
        chocolate cake. Cake fruitcake powder pudding pastry.Danish fruitcake
        bonbon bear claw gummi bears apple pie. Chocolate sweet topping
        fruitcake cake.
      </b-card-text>
      <b-card-text>
        Dragée jelly-o pie halvah pudding bear claw. Carrot cake pie toffee
        pastry candy canes. Ice cream tiramisu chocolate bar apple pie jujubes
        croissant toffee. Sweet roll chocolate bar pastry macaroon jelly-o.
        Jujubes pudding lemon drops dessert cake. Pudding cupcake chupa chups
        brownie.
      </b-card-text>
    </b-tab>
    <b-tab active title="Favourits Movies">
      <b-card-text>
        Chocolate cake icing tiramisu liquorice toffee donut sweet roll cake.
        Cupcake dessert icing dragée dessert. Liquorice jujubes cake tart pie
        donut. Cotton candy candy canes lollipop liquorice chocolate marzipan
        muffin pie liquorice.
      </b-card-text>
      <b-card-text>
        Sesame snaps chupa chups jelly-o candy croissant pastry. Lollipop
        pudding biscuit. Sweet roll candy canes tootsie roll halvah jujubes
        gummi bears toffee cheesecake. Topping macaroon marshmallow caramels.
        Pastry caramels pastry.
      </b-card-text>
    </b-tab>
    <b-tab title="Why you here">
      <b-card-text>
        Tootsie roll oat cake I love bear claw I love caramels caramels halvah
        chocolate bar. Cotton candy gummi bears pudding pie apple pie cookie.
        Cheesecake jujubes lemon drops danish dessert I love caramels powder.
      </b-card-text>
      <b-card-text>
        Chocolate cake icing tiramisu liquorice toffee donut sweet roll cake.
        Cupcake dessert icing dragée dessert. Liquorice jujubes cake tart pie
        donut. Cotton candy candy canes lollipop liquorice chocolate marzipan
        muffin pie liquorice.
      </b-card-text>
    </b-tab>
    <template #tabs-end>
      <b-button variant="primary" class="ml-auto">
        <feather-icon icon="EditIcon" class="d-block d-md-none" />
        <span class="font-weight-bold d-none d-md-block">Edit</span>
      </b-button>
    </template>
  </b-tabs>
</template>

<script>
import { BTabs, BTab, BCardText, BButton } from "bootstrap-vue";

export default {
  components: {
    BCardText,
    BTabs,
    BButton,
    BTab,
  },
};
</script>
