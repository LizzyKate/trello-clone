<template lang="">
    <v-row align="center" class="__container" justify="center">
    <v-col cols="12" sm="8" md="4" align="center">
      <v-card class="elevation-4 text-left" >
        <v-card-title class="fancy-title align-center justify-center">Jello</v-card-title><v-card-text>
          <v-form>
            <v-text-field
              label="Login"
              name="login"
              prepend-icon="mdi-account"
              type="text"
              v-model="auth.email"
            ></v-text-field>

            <v-text-field
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="auth.password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="text-center">
          <v-btn
            class="login-button"
            depressed
            @click="login"
            large
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-snackbar
        :timeout="4000"
        v-model="snackbar"
        absolute
        bottom
        center
      >
        {{ snackbarText }}
      </v-snackbar>
    </v-col>
  </v-row>

</template>
<script>
export default {
    data(){
        return {
            auth: {
                email: '',
                password: ''
            },
            snackbar: false,
            snackbarText: 'No error message'
        }
    },
    methods:{
        login(){
            this.$fire.auth.signInWithEmailAndPassword(this.auth.email, this.auth.password)
            .then(() => {
                this.snackbar = true;
                this.snackbarText = 'Login successful';
                this.$router.push('/');
            })
            .catch(error => {
                this.snackbar = true;
                this.snackbarText = error.message;
            });
        }
    }
}
</script>
<style scoped>
.__container{
    height: 100vh;
    align-items: center;
    justify-content: center;
}
</style>