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
          <b-button type="submit" variant="primary">Submit</b-button>
           <NuxtLink to="/package" class="button--green">New Package</NuxtLink>
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
      }
    }
  },
  created: function () {
    this.storage();
  },
  methods: {
    storage(){
       if (process.browser && localStorage.getItem('userId')) {
        document.location = '/package';
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
            document.location = '/package';
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
