<template>
  <v-app>
    <v-main>
      <nav-vue/>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import NavVue from '~/components/Nav.vue';

export default {
  components:{
    NavVue
  }
}
</script>


