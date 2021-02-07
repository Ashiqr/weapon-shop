<template>
  <b-container fluid class="layout">
    <Header />
    <h3>Manage Packages</h3>

    <b-form-input id="input-1" v-model="Name" placeholder="Search Package Name" />

    <b-button variant="primary" v-on:click="search">Search</b-button>
    <b-button variant="success" href="/package">New Package</b-button>
    <div>
        <b-table striped hover :items="results">
            <template #cell(id)="data">
                <NuxtLink :to="'/package?id=' + data.value" >{{ data.value }}</NuxtLink>
            </template>
        </b-table>
    </div>
  </b-container>
</template>
<script>
export default {
  data () {
    return {
      Name: '',
      results: []
    }
  },
  methods: {
    search () {
      this.$axios.$get('/api/package/searchadmin?name=' + this.Name)
        .then((response) => {
          if (response) {
            this.results = response;
          }
        })
        .catch((error) => { console.log(error) });
    }
  }
}
</script>