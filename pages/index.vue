<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        weapon-shop
      </h1>
       <div>
        <b-form @submit="onSubmit">
          <b-form-group id="input-1" label="Username:" label-for="input-1">
            <b-form-input id="input-1" v-model="form.Username" placeholder="Enter Username" required />
          </b-form-group>
          <b-form-group id="input-group-2" label="Currency:" label-for="input-2">
            <b-form-select id="input-2" v-model="form.Currency" :options="Currencies" 
            required  />
          </b-form-group>
          <b-button type="submit" variant="primary">Login</b-button>
           <!-- <NuxtLink to="/package" class="button--green">New Package</NuxtLink> -->
        </b-form>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        Username: '',
        Currency: 'USD'
      },
      Currencies: [
        'AUD','BGN','BRL','CAD','CHF','CNY','CZK','DKK','EUR','GBP','HKD',
        'HRK','HUF','IDR','ILS','INR','ISK','JPY','KRW','MYR','MXN','NOK',
        'NZD','PHP','PLN','RON','RUB','SEK','SGD','THB','TRY','USD','ZAR',]
    }
  },
  created: function () {
    this.storage();
  },
  methods: {
    storage(){
       if (process.browser && localStorage.getItem('userId')) {
        document.location = '/front';
      }
    },
    onSubmit (event) {
      event.preventDefault();
      const data = {
        Username: this.form.Username,
        Currency: this.form.Currency
      };
      this.$axios.$post('/api/user', data)
        .then((response) => {
          if (response.Id) {
            localStorage.setItem('userId', response.Id);
            localStorage.setItem('currency', this.form.Currency);
            localStorage.setItem('cartId', 0);
            document.location = '/front';
          }
        })
        .catch((error) => { console.log(error) });
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
