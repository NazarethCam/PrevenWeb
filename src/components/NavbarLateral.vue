<template>
  <v-navigation-drawer
    permanent
    expand-on-hover
    class="navbarlat blue-grey darken-4"
  >
    <v-list dense>
      <v-list-item :to="{ path: '/home' }">
        <v-icon class="white--text">mdi-home</v-icon>
        <v-list-item-title dense class="white--text ml-2"
          >Inicio</v-list-item-title
        >
      </v-list-item>
      <v-list-item :to="{ path: '/administrador' }" dense>
        <v-icon class="white--text">mdi-account-edit</v-icon>
        <v-list-item-title class="white--text ml-2"
          >Administrador</v-list-item-title
        >
      </v-list-item>
      <v-list-item id="form" :to="{ path: '/formulario' }">
        <v-icon class="white--text">mdi-file</v-icon>
        <v-list-item-title class="white--text ml-2"
          >Ficha de Ingreso</v-list-item-title
        >
      </v-list-item>
      <v-list-item :to="{ path: '/ubicacion' }">
        <v-icon class="white--text">mdi-map-marker</v-icon>
        <v-list-item-title class="white--text ml-2"
          >Ubicacion</v-list-item-title
        >
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="text-center mesa">
        <p>Mesa de AYUDA</p>
        <span> email: contactoprevenweb@gmail.com</span>
        <p>cel:+56 993431658</p>
      </div>
      >
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.navbarlat {
  position: fixed;
  margin-top: 41px;
  height: 100%;
  z-index: 5;
}
.mesa {
  color: #fff;
  padding-bottom: 60px;
  font-size: 13px;
  transition: opacity 0.2s ease;
  transition-delay: 0.25s;
}
.v-card > *:first-child:not(.v-btn):not(.v-chip):not(.v-avatar),
.v-card > .v-card__progress + *:not(.v-btn):not(.v-chip):not(.v-avatar) {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.navbarlat.v-navigation-drawer--is-mouseover .mesa {
  visibility: visible;

  opacity: 1;
}
.navbarlat .mesa {
  visibility: hidden;
  opacity: 0;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: rgb(255, 0, 0);
}
.v-list .v-list-item--active {
  color: rgb(255, 0, 0);
}

@media (min-width: 0px) and (max-width: 980px) {
  .navbarlat {
    display: none;
    position: fixed;
  }
}
</style>