<template>
<div>
  <Header />
  <h3>Packages for Sale</h3>
  <b-form-input id="input-1" v-model="Name" placeholder="Search Package Name" />
  <b-button variant="primary" v-on:click="search">Search</b-button>
  <b-card-group deck v-for="group in packages" :key="group.group">
    <b-card v-for="pack in group.items" :key="pack.Name" 
    bg-variant="light" :header=pack.Name class="text-center" border-variant="primary"
    :footer=convertPrice(pack.Price)
    footer-tag="footer"
    footer-border-variant="dark">
    <b-card-text>{{pack.Description}}</b-card-text>
    <b-button :href=makeUrl(pack.id) variant="info">Details</b-button>
    <b-button v-on:click="addCart(pack.id)" variant="success">Add to cart</b-button>
    </b-card>
  </b-card-group>
</div>
</template>

<script>
export default {
  data () {
    return {
      packages: [],
      Name: '',
    };
  },
  created: function () {
    this.search();
  },
  methods: {
    search () {
      this.$axios.$get(`/api/package/search?name=${this.Name}`)
        .then((response) => {
          if (response) {
            this.packages = response;
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
    addCart(packageId) {
      const data = {
        CartId: localStorage.getItem('cartId'),
        PackageId: packageId,
        UserId: localStorage.getItem('userId'),
        TotalPrice: 0,
        Discount: 0
      };
      this.$axios.$post('/api/cart', data)
          .then((response) => {
            if (response.Id) {
              localStorage.setItem('cartId', response.Id);
              this.$bvToast.toast('Item Added to cart', {
                title: 'Added',
                variant: 'success',
                solid: true
              })
              document.location = '/front';
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