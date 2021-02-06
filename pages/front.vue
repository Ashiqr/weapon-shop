<template>
<div>
    <b-card-group deck v-for="group in packages" :key="group.group">
        <b-card v-for="pack in group.items" :key="pack.Name" 
        bg-variant="light" :header=pack.Name class="text-center" border-variant="primary"
        :footer=pack.Price
        footer-tag="footer"
        footer-border-variant="dark">
        <b-card-text>{{pack.Description}}</b-card-text>
         <b-button :href=makeUrl(pack.id) variant="primary">Details</b-button>
        </b-card>
    </b-card-group>
</div>
</template>

<script>
export default {
data () {
    return {
      packages: []
    };
  },
  created: function () {
    this.search();
  },
  methods: {
    search () {
      this.$axios.$get('/api/package/search')
        .then((response) => {
          if (response) {
            this.packages = response;
          }
        })
        .catch((error) => { console.log(error) });
    },
    makeUrl (id) {
        return `/packageDetails?id=${id}`;
    }
  },
}
</script>

<style>
    div {
        margin: 5px;
    }
</style>