<template>
  <div>
    <v-app-bar dense app class="white--text" color="#26323b" v-if="auth">
      <v-app-bar-nav-icon
        class="d-md-none .d-lg-flex d-lg-none .d-xl-flex white--text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="tituloNav1">PrevenWeb</v-toolbar-title>
      <v-spacer></v-spacer>

      <p class="pnavbar mt-3 mr-3">{{ userEmail }}</p>
      <v-icon id="nav-logout-btn" class="white--text" @click="logout"
        >mdi-export</v-icon
      >
    </v-app-bar>
    <v-navigation-drawer color="#26323b" v-model="drawer" fixed left temporary>
      <v-list dense>
        <v-list-item-group>
          <v-list-item :to="{ path: '/home' }">
            <v-list-item-title class="white--text">Inicio</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ path: '/formulario' }">
            <v-list-item-title class="white--text"
              >Formulario</v-list-item-title
            >
          </v-list-item>
          <v-list-item :to="{ path: '/administrador' }">
            <v-list-item-title class="white--text"
              >Administrador</v-list-item-title
            >
          </v-list-item>
          <v-list-item :to="{ path: '/ubicacion' }">
            <v-list-item-title class="white--text">Ubicación</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="text-center mesa">
          <p>Mesa de AYUDA</p>
          <span> email: contactoprevenweb@gmail.com</span>
          <p>cel: 993431658</p>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { obtenerDato } from "@/firebase/firestore.js";
import { logout } from "@/firebase/auth.js";
export default {
  data: () => ({
    drawer: false,
    auth: true,
  }),
  methods: {
    logout() {
      logout();
      //Aquí aparecer y desaparecer el email de navbar que esta index.store en mutations
      this.$store.commit("borrarEmail");
    },
    //Aquí aparecer y desaparecer el icono de navbar
    setAuthState() {
      if (window.Cypress || this.userEmail !== "") {
        this.auth = true;
        obtenerDato(this.userEmail, this.guardarRole);
      } else {
        this.auth = false;
      }
    },
    guardarRole(role) {
      this.$store.commit("prueba", role);
    },
  },
  //Aqui aparece el email en el navbar
  computed: {
    userEmail() {
      return this.$store.state.email;
    },
  },
  //Con el watch aparece y desaparece el icono de navbar
  watch: {
    userEmail() {
      this.setAuthState();
    },
  },
  //Con el mounted aparece y desaparece el icono de navbar
  mounted() {
    this.setAuthState();
  },
};
</script>

<style scoped>
.tituloNav1 {
  font-family: "Carter One", cursive;
}
.mesa {
  color: #fff;
  margin-bottom: 60px;
  font-size: 13px;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: rgb(255, 0, 0);
}
.v-list .v-list-item--active {
  color: rgb(255, 0, 0);
}
@media (min-width: 0px) and (max-width: 700px) {
  .pnavbar {
    display: none;
  }
}
</style>