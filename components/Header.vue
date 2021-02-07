<template>
    <div class="header">
        <b-button href='/packageAdmin' variant="info">Admin</b-button>
        <a href="/front" class="title">Weapon Store</a>
        <div class="cart">
            <b-button href='/cart' variant="info">Cart</b-button>
            <span>{{count}} {{ count === 1 ?  'Item in Cart.' : 'Items in Cart.'}}</span>
            <span>Total: {{totalPrice}}</span>
        </div>
    </div>
</template>
<script>
export default {
data () {
    return {
      count: 0,
      totalPrice: 0
    };
  },
  created: function () {
      if (process.browser) {
          this.getCount();
          this.getCartInformation();
      }
  },
  methods: {
    getCount () {
      const cartId = localStorage.getItem('cartId');
      this.$axios.$get(`/api/cart/count?id=${cartId}`)
        .then((response) => {
          if (response) {
            this.count = response[0].count;
          }
        })
        .catch((error) => { console.log(error) });
    },
    getCartInformation () {
      const cartId = localStorage.getItem('cartId');
      this.$axios.$get(`/api/cart/Information?id=${cartId}`)
        .then((response) => {
          if (response) {
            this.totalPrice = response[0].TotalPrice;
          }
        })
        .catch((error) => { console.log(error) });
    },
  }
}
</script>

<style>
    .header {
        width: 100%;
        background-color: lightgrey;
    }
    .cart {
        position:absolute;
        right:0;
        top:0;
    }
    .title {
        position: fixed; 
        left: 47%;
        color: blue;
    }
</style>