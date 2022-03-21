<template>
  <div align="center" justify="center">
    <h1 class="search-title mt-16">Lista de Trabajadores</h1>

    <v-card class="my-12" width="500">
      <v-toolbar flat color="transparent">
        <v-text-field
          v-model="rut"
          @change="formatRut"
          @keydown.enter="buscar(rut)"
          label="Buscar trabajador por RUT"
        ></v-text-field>

        <v-btn icon @click="buscar(rut)">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["buscar", "setearData"],
  data() {
    return {
      rut: "",
    };
  },
  methods: {
    formatRut() {
      if (this.rut === "") {
        this.setearData();
      }
      const rut = this.rut;
      if (rut === "") {
        return "";
      }
      if (rut.length === 1 || (rut.length === 2 && rut.includes("-"))) {
        return rut.replace("-", "");
      }
      let rutLimpio = rut.replace(/^0+/, "");
      let rutFormatted = "";
      rutLimpio = rutLimpio.replace(/[-|.]/g, "");
      const dv = rutLimpio.charAt(rutLimpio.length - 1);
      rutLimpio = rutLimpio.substring(0, rutLimpio.length - 1);
      while (rutLimpio.length > 3) {
        rutFormatted = `.${rutLimpio.substr(
          rutLimpio.length - 3
        )}${rutFormatted}`;
        rutLimpio = rutLimpio.substring(0, rutLimpio.length - 3);
      }
      rutFormatted = `${rutLimpio}${rutFormatted}-${dv}`;
      // asignamos el rut formateado a la variable del rut;
      this.rut = rutFormatted;
    },
  },
};
</script>

<style scoped>
.search-title {
  font-family: "Dongle", sans-serif;
  font-size: 3rem;
}
</style>