<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="card-margen">
          <v-window>
            <v-row>
              <v-col cols="12" md="6" class="rounded-br-xl">
                <div style="text-align: center"></div>
              </v-col>
              <v-col cols="12" md="6">
                <v-card-text class="card-margen-top">
                  <h1 class="h1-text text-center">Iniciar Sesión</h1>
                  <div align="center" justify="center">
                    <v-col cols="12" sm="8">
                      <v-alert :value="alert" shaped text type="error">{{
                        msg
                      }}</v-alert>
                    </v-col>
                  </div>

                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="8">
                      <v-text-field
                        id="email"
                        rounded
                        text="email"
                        v-model="email"
                        label="Email"
                        prepend-icon="mdi-email"
                        outlined
                        dense
                        color="#3B7E87"
                        autocomplete="false"
                        class="mt-16"
                      />
                      <v-text-field
                        id="password"
                        rounded
                        v-model="password"
                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show3 ? 'text' : 'password'"
                        label="Contraseña"
                        prepend-icon="mdi-lock"
                        outlined
                        dense
                        color="#3B7E87"
                        autocomplete="false"
                        hint="At least 6 characters"
                        value=""
                        class="input-group--focused"
                        @keydown.enter="iniciarLogin"
                        @click:append="show3 = !show3"
                      />
                      <v-row>
                        <v-col class="mb-5">
                          <router-link id="forgotPassword" to="/forgotPassword">
                            ¿Se te olvidó tu contraseña?</router-link
                          >
                        </v-col>
                      </v-row>
                      <div class="container-botton text-center ms-3">
                        <v-btn
                          id="iniciarLogin"
                          color="#3B7E87"
                          dark
                          rounded
                          @click="iniciarLogin"
                          >INICIAR</v-btn
                        >
                        <router-link to="/"
                          ><a class="prevenweb"> PrevenWeb </a></router-link
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-col>
            </v-row>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { login } from "@/firebase/auth.js";

export default {
  data() {
    return {
      show3: false,
      alert: false,
      msg: "",
      email: "",
      password: "",
    };
  },
  methods: {
    //codigo de login
    loginIncorrecto(error) {
      console.log(error);
      switch (error) {
        case "auth/invalid-email":
          this.msg = "Ingrese email y/o contraseña";
          break;
        case "auth/wrong-password":
          this.msg = "La contraseña es incorrecta";
          break;
        case "auth/user-not-found":
          this.msg = "El email no registrado";
          break;
        case "auth/internal-error":
          this.msg = "Ingrese contraseña";
          break;
      }
      // El alert aparezca y desaparezca
      this.alert = true;
      setTimeout(() => {
        this.msg = "";
        this.alert = false;
      }, 3000);
    },

    guardarEmail(email) {
      // SetEmail que esta index.store en mutations
      this.$store.commit("setEmail", email);
    },

    // Aqui ponemos el codigo de login
    iniciarLogin() {
      login(this.email, this.password, this.loginIncorrecto, this.guardarEmail);
      this.email = "";
      this.password = "";
    },
  },
};
</script>
<style scoped>
v-container {
  width: 100%;
}

.v-application .rounded-br-xl[data-v-26084dc2] {
  border-bottom-right-radius: 300px !important;
  background: url("../assets/img-1.jpeg") no-repeat center center fixed !important;
  background-size: cover;
  background-position: center;
  height: 83vh;
}
.h1-text {
  margin-bottom: 1.2rem;
  color: #1e3745;
}
.v-application .mb-5 {
  text-align: center;
}

.v-application a {
  color: #3b7e87;
  text-decoration: none;
  font-size: medium;
}

.prevenweb {
  border-bottom: 4px solid #b86a54;
  border-radius: 5px 5px 0;
  margin: 0 10px 0 20px;
  font-weight: bold;
  font-weight: 30px !important;
  color: #1e3745 !important;
}
.container-botton {
  margin-bottom: 20px;
}
.card-margen-top {
  margin-top: 40px;
}
@media (min-width: 1264px) and (max-width: 1400px) {
  .v-application .rounded-br-xl[data-v-26084dc2] {
    border-bottom-right-radius: 300px !important;
    background: url("../assets/img-1.jpeg") no-repeat center center fixed !important;
    background-size: cover;
    background-position: center;

    height: 87vh;
  }
  .col-sm-10 {
    max-width: 980px;
  }
  .card-margen {
    margin-top: 30px;
  }
}
@media (min-width: 0px) and (max-width: 600px) {
  .v-application .rounded-br-xl[data-v-26084dc2] {
    border-bottom-right-radius: 300px !important;
    background: url("../assets/img-1.jpeg") no-repeat center center fixed !important;
    background-size: cover;
    height: 55vh;
  }
}
@media (min-width: 600px) and (max-width: 960px) {
  .v-application .rounded-br-xl[data-v-26084dc2] {
    border-bottom-right-radius: 500px !important;
    background: url("../assets/img-1.jpeg") no-repeat center center fixed !important;
    background-size: cover;
    height: 50vh;
  }
  .container-botton {
    margin-bottom: 30px;
  }
}

@media (min-width: 960px) and (max-width: 1264px) {
  .v-application .rounded-br-xl[data-v-01266098] {
    border-bottom-right-radius: 300px !important;
    background: url("../assets/img-1.jpeg") no-repeat center center fixed !important;
    background-size: cover;

    height: 70vh;
  }
}
@media (min-width: 1400px) and (max-width: 1990px) {
  .v-application .rounded-br-xl[data-v-26084dc2] {
    border-bottom-right-radius: 300px !important;
    background: url("../assets/img-1.jpeg") no-repeat center center fixed !important;
    background-size: cover;
    background-position: center;

    height: 54vh;
  }
  .col-sm-10 {
    max-width: 980px;
  }
  .card-margen {
    margin-top: 30px;
  }
}
</style>