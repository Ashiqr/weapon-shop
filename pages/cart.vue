<template>
<div>
    <Header />
    <h3>Cart Items</h3>
    <b-card-group deck v-for="group in items" :key="group.group">
        <b-card v-for="pack in group.items" :key="pack.Name" 
        bg-variant="light" :header=pack.Name class="text-center" border-variant="primary"
        :footer=convertPrice(pack.Price)
        footer-tag="footer"
        footer-border-variant="dark">
        <b-card-text>{{pack.Description}}</b-card-text>
        <b-button :href=makeUrl(pack.id) variant="info">Details</b-button>
        <b-button v-on:click="removeCart(pack.id)" variant="danger">Remove from cart</b-button>
        </b-card>
    </b-card-group>
</div>
</template>

<script>
export default {
data () {
    return {
      items: []
    };
  },
  created: function () {
      if (process.browser) {
          this.cartItems();
      }
  },
  methods: {
    cartItems () {
      const cartId = localStorage.getItem('cartId');
      this.$axios.$get(`/api/cart?id=${cartId}`)
        .then((response) => {
          if (response) {
            this.items = response;
          }
        })
        .catch((error) => { console.log(error) });
    },
    makeUrl (id) {
        return `/packageDetails?id=${id}`;
    },
    convertPrice(price) {
      return `${CalculatePrice(price, sessionStorage.getItem('rate'))} ${localStorage.getItem('currency')}`;
    },
    removeCart(packageId) {
      const data = {
        CartId: localStorage.getItem('cartId'),
        PackageId: packageId,
      };
      this.$axios.$delete('/api/cart',  { 'data': data })
          .then((response) => {
            if (response.Id) {
               localStorage.setItem('cartId', response.Id);
               document.location = '/cart';
            }
          })
          .catch((error) => { console.log(error) });
    }
  },
}
</script>

<style>
    div {
        margin: 5px;
    }
</style>
