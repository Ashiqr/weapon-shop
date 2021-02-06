<template>
  <div>
    <b-form>
        <b-form-group id="input-group-2" label="Name:" label-for="input-2">
            <b-form-input id="input-2" v-model="form.Name" placeholder="Enter Name"  disabled />
        </b-form-group>

        <b-form-group id="input-group-3" label="Description:" label-for="input-3">
            <b-form-input id="input-3" v-model="form.Description" placeholder="Enter Description" 
            disabled />
        </b-form-group>

        <b-form-group id="input-group-1" label="Products:" label-for="input-1">
            <b-form-select id="input-1" v-model="form.Products" :options="products" multiple :select-size="5" 
            disabled/>
        </b-form-group>

        <b-form-group id="input-group-6" label="Price:">
            <span>{{totalPrice}}</span>
        </b-form-group>

      <b-button type="button" variant="primary" v-on:click="back()">Back</b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        Name: '',
        Description: '',
        Price: 0,
        Products: [],
        Id: null
      },
      products: [],
      totalPrice: 0
    };
  },
  created: function () {
    this.fetchProducts();
  },
  methods: {
    back () {
        this.$router.go(-1);
    },
    sumPrice () {
        let sum = 0;
        this.form.Products.map(selectedProduct => {
            sum += this.products.find(p => p.value === selectedProduct).price;
        });
        this.totalPrice = sum;
    },
    fetchPackage (id) {
      this.$axios.$get('/api/package/full?id=' + id)
        .then((response) => {
          if (response.id) {
            this.form.Name = response.Name;
            this.form.Description = response.Description;
            this.form.Price = response.Price;
            this.form.Id = response.id;
            response.Products.map(p => {
                this.form.Products.push(p.ProductId);
            });
            this.sumPrice();
          }
        })
        .catch((error) => { console.log(error) });
    },
    fetchProducts() {
        this.$axios.$get('/api/package/allproducts')
        .then((response) => {
            response.map(p => {
                this.products.push({ value: p.id, text: p.name, price: p.usdPrice })
            });
            if (this.$route.query.id) {
              this.fetchPackage(this.$route.query.id);
            }
        })
        .catch((error) => { console.log(error) });
    }
  }
};
</script>
<style>
    div {
        margin: 5px;
    }
</style>
