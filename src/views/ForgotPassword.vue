<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="card-margen-top">
          <v-window>
            <v-row>
              <v-col cols="12" md="6">
                <v-card-text class="mt-16">
                  <h1 class="text-center mb-12 textSubtitle">
                    ¿Olvidó su contraseña?
                  </h1>
                  <p class="text-center textSubtitle">Recupera tu cuenta aquí</p>
                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="8">
                      <v-text-field
                      id="email1"
                        rounded
                        v-model="email"
                        label="Email"
                        prepend-icon="mdi-email"
                        outlined
                        dense
                        color="#3B7E87"
                        autocomplete="false"
                        class="mt-14"
                      />
                      <div class="text-center">
                        <v-btn
                        id="btn-password"
                          elevation="2"
                          color="#3B7E87"
                          class="mt-5 mb-8"
                          rounded
                          dark
                          @click="reset"
                        >
                          Recuperar
                        </v-btn>
                      </div>
                      <v-row>
                        <v-col class="mb-5">
                          <router-link id="volver" to="/login">
                            Volver al login</router-link
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-col>
              <v-col cols="12" md="6" class="rounded-br-xl">
                <div style="text-align: center; padding: 180px 0"></div>
              </v-col>
            </v-row>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { forgotPassword } from "../firebase/auth";

export default {
  data() {
    return {
      show1: false,
      email: "",
      msg: "",
      error: null,
      emailSending: false,
      show3: false,
      alert: false,
    };
  },

  methods: {
    restablecerContraseña() {
      forgotPassword(this.email)
        .sendPasswordResetEmail(this.email)
        .then(() => {
          console.log(this.email);
        });
    },
    reset() {
      forgotPassword(this.email);
      this.email = "";
      alert("Revisa tu correo para restablecer contraseña");
    },
  },
};
</script>


<style scoped>
v-container {
  width: 100%;
 
}


.h1-text {
  margin-bottom: 1.2rem;
}

img {
  margin-top: 2rem;
}

.v-application .mb-5 {
  text-align: center;
}

.v-application a {
  color: #3B7E87;
  text-decoration: none;
  font-size: medium;
  }  
  
.v-application p {
  font-size: 1.2rem;
}
.textSubtitle {
    color: #1e3745; 
  }
  @media (min-width: 1400px) and (max-width: 1990px) {
  .v-application .rounded-br-xl[data-v-01266098]{
  border-bottom-left-radius: 300px ;
  background: url("../assets/img.jpeg") no-repeat center center fixed !important;
  background-size: cover;
  height: 59vh;
 
}

.col-sm-10 {
  max-width: 980px ;
}
.card-margen-top{
  margin-top: 40px;
}
}
 @media (min-width: 1264px) and (max-width: 1400px) {
  .v-application .rounded-br-xl[data-v-01266098]{
  border-bottom-left-radius: 300px ;
  background: url("../assets/img.jpeg") no-repeat center center fixed !important;
  background-size: cover;
  height: 87vh;
 
}

.col-sm-10 {
  max-width: 980px ;
}
.card-margen-top{
  margin-top: 40px;
}
}
@media (min-width: 960px) and (max-width: 1264px) {
  .v-application .rounded-br-xl[data-v-01266098]{
  border-top-left-radius: 500px ;
  background: url("../assets/img.jpeg") no-repeat top center fixed !important;
  background-size: cover;

  height: 80vh;
 
}.card-margen-top{
  margin-top: 40px;
}}

@media (min-width: 0px) and (max-width: 700px) {
  .v-application .rounded-br-xl[data-v-01266098]{
  border-top-right-radius: 300px !important;
  background: url("../assets/img.jpeg") no-repeat center center fixed  !important;
 background-size: cover;
  height: 50vh;
 
}

}
@media (min-width: 600px) and (max-width: 960px) {
.v-application .rounded-br-xl[data-v-01266098]{
  border-top-right-radius: 500px !important;
  background: url("../assets/img.jpeg") no-repeat center center fixed !important;
  background-size: cover;
  
  height: 70vh;
 
}
.card-margen-top{
  margin-top: 40px;
}
}

@media (min-width: 1400px) and (max-width: 1990px) {
 v-application .rounded-br-xl[data-v-01266098]{
  border-bottom-left-radius: 300px ;
  background: url("../assets/img.jpeg") no-repeat center center fixed !important;
  background-size: cover;
  height: 59vh;
 
 
}
.col-sm-10 {
  max-width: 980px;

}
.card-margen{
margin-top:30px;
}
  }
</style>