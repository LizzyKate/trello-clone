<template>
  <v-app>
    <v-content>
      <nav-vue/>
      <nuxt />
    </v-content>
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


