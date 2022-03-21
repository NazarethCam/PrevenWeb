<template>
  <v-row no-gutters>
  <v-col  cols="12" sm="12" md="2" lg="2" >
      <Navbarlateral />
    </v-col>
    <v-col cols="12" md="10" lg="10">
      <v-container>
        <Buscador :buscar="buscar" :setearData="setearData" />
      </v-container>
      <v-container v-if="show">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="4"
            v-for="(dataTrabajador, index) in listadoTrabajadores"
            :key="index"
          >
            <Card :workerRecord="dataTrabajador" />
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import Card from "../components/Card";
import Navbarlateral from "../components/NavbarLateral";
import Buscador from "../components/Buscador";
import { getImage } from "@/firebase/firestorage.js";

export default {
  data() {
    return {
      listadoTrabajadores: null,
      show: false,
    };
  },
  components: {
    Buscador,
    Navbarlateral,
    Card,
  },
  methods: {
    // Aqui en setearData usamos el forEach para recorrer el objeto (esperando a que llame a la funcion image) la variable e contiene a cada uno de los trabajadores y cuando dentro del objeto ponemos el evento le estamos diciendo que es una copia del e más la variable workerImage.
    setearData() {
      this.listadoTrabajadores = [];
      this.$store.state.RegistroTrabajador.forEach(async (e) => {
        let image = "";
        image = await getImage(e.data.filesData.foto.id);
        this.listadoTrabajadores.push({
          ...e,
          workerImage: image,
        });
      });
      this.show = true;
    },
    buscar(rut) {
      const listadoTrabajadoresFiltrado = this.listadoTrabajadores.filter(
        (trabajador) => trabajador.data.rut === rut
      );
      this.listadoTrabajadores = listadoTrabajadoresFiltrado;
      if (listadoTrabajadoresFiltrado.length === 0) {
        alert("Rut no encontrado");
      }
    },
  },
  created() {
    this.$store.dispatch("getData");
  },
  mounted() {
    this.setearData();
  },
  computed: {
    registroTrabajador() {
      return this.$store.state.RegistroTrabajador;
    },
    userEmail() {
      return this.$store.state.email;
    },
  },
};
</script>

<style scoped>
@media (min-width: 1264px) and (min-width: 960px) {
  .col-lg-2 {
    flex: 0 0 10%;
  }
}
</style>