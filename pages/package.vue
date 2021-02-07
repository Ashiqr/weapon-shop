<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-2" label="Name:" label-for="input-2">
            <b-form-input id="input-2" v-model="form.Name" placeholder="Enter Name"  required />
        </b-form-group>

        <b-form-group id="input-group-3" label="Description:" label-for="input-3">
            <b-form-input id="input-3" v-model="form.Description" placeholder="Enter Description" 
            required />
        </b-form-group>

        <b-form-group id="input-group-1" label="Products:" label-for="input-1">
            <b-form-select id="input-1" v-model="form.Products" :options="products" multiple :select-size="5" 
            required @change="onProductChange($event)" />
        </b-form-group>

        <b-form-group id="input-group-6" label="Price:">
            <span>{{totalPrice}}</span>
        </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
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
    onProductChange (e) {
        let sum = 0;
        this.form.Products.map(selectedProduct => {
            sum += this.products.find(p => p.value === selectedProduct).price;
        });
        this.totalPrice = sum;
    },
    onSubmit (event) {
      event.preventDefault();
      const data = {
        Name: this.form.Name,
        Description: this.form.Description,
        Price: this.totalPrice,
        Products: this.form.Products,
      };
      if (this.form.Id === null) {
        this.$axios.$post('/api/package', data)
          .then((response) => {
            if (response.Id) {
               document.location = '/package?id=' + response.Id;
            }
          })
          .catch((error) => { console.log(error) });
      }
      else {
        data.Id = this.form.Id;
        this.$axios.$patch('/api/package', data)
          .then((response) => {
            if (response.Id) {
              this.form.Id = response.Id;
            }
          })
          .catch((error) => { console.log(error) });
      }
    },
    back () {
        this.$router.go(-1);
    },
    onReset (event) {
      event.preventDefault();
      this.form.Name = '';
      this.form.Description = '';
      this.form.Price = 0;
      this.form.Products = [];
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
            this.onProductChange(null);
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
