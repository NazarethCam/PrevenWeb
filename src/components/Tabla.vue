<template>
  <v-container>
    <v-row class="mt-5">
      <v-col cols="12">
        <h1 class="subtitle text-center mt-10 mb-5">
          Administrador de datos del trabajador
        </h1>
        <v-card class="px-4 py-4" elevation="0">
          <v-data-table
            :headers="headers"
            :items="RegistroTrabajador"
            sort-by="nombre"
            :items-per-page="20"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5 center py-5"
                    >¿Quiere eliminar este curso?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer class="my-5"></v-spacer>
                    <v-btn color="#6C1827" dark class="dl" @click="closeDelete">
                      Cancelar
                    </v-btn>
                    <v-btn
                      color="#6C1827"
                      dark
                      class="dl"
                      @click="deleteItemConfirm"
                    >
                      Confirmar</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="$router.push(`/administrador/${item.id}`)"
              >
                mdi-pencil
              </v-icon>
              <v-icon small @click="eliminar(item)"> mdi-delete </v-icon>
            </template>

            <!-- En esta sección le pusimos un boton que pasa el ID del archivo al método para que asi pueda descargarlo -->
            <template v-slot:[`item.data.download`]="{ item }">
              <v-icon
                v-if="item.data.filesData.odi.id"
                @click="descargarODI(item.data.filesData.odi.id)"
                >mdi-file-pdf-box</v-icon
              >
            </template>
            <template v-slot:[`item.data.download2`]="{ item }">
              <v-icon
                v-if="item.data.filesData.reg.id"
                @click="descargarReg(item.data.filesData.reg.id)"
                >mdi-file-pdf-box</v-icon
              >
            </template>
            <template v-slot:[`item.data.download3`]="{ item }">
              <v-icon
                v-if="item.data.filesData.examen.id"
                @click="descargarExamen(item.data.filesData.examen.id)"
                >mdi-file-pdf-box</v-icon
              >
            </template>
            <template v-slot:[`item.data.download4`]="{ item }">
              <v-icon
                v-if="item.data.filesData.contrato.id"
                @click="descargarContrato(item.data.filesData.contrato.id)"
                >mdi-file-pdf-box</v-icon
              >
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getImage, borraDoc } from "@/firebase/firestorage.js";
import { borrarDato } from "@/firebase/firestore.js";
export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      getpdf: "",

      filesData: {
        odi: { nombre: "", id: "", fecha: "", vencimiento: "" },
        reg: { nombre: "", id: "", fecha: "", vencimiento: "" },
        examen: { nombre: "", id: "", fecha: "", vencimiento: "" },
        foto: { nombre: "", id: "" },
      },
      // Acá van los titulos correspondientes en la tabla
      headers: [
        { text: "Nombre", align: "start", value: "data.nombre" },
        { text: "Apellido", value: "data.apellido" },
        { text: "Rut", value: "data.rut" },
        { text: "Cargo", value: "data.cargo" },

        { text: "Descargar ODI", value: "data.download" },
        { text: "Fecha Inicio ODI", value: "data.filesData.odi.fecha" },
        {
          text: "Fecha Vencimento ODI",
          value: "data.filesData.odi.vencimiento",
        },
        { text: "Descargar Reglamento", value: "data.download2" },
        { text: "Fecha Inicio Reglamento", value: "data.filesData.reg.fecha" },
        {
          text: "Fecha Vencimento Reglamento",
          value: "data.filesData.reg.vencimiento",
        },
        { text: "Descargar examen", value: "data.download3" },

        { text: "Fecha Inicio Examen", value: "data.filesData.examen.fecha" },
        {
          text: "Fecha Vencimento Examen",
          value: "data.filesData.examen.vencimiento",
        },
        { text: "Descarga de contrato", value: "data.download4" },
        { text: "Tipo de Contrato", value: "data.filesData.contrato.tipo" },
        { text: "Fecha de Contrato", value: "data.filesData.contrato.fecha" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      editedIndex: -1,
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Agregando trabajador" : "Edit Item";
    },
    RegistroTrabajador() {
      let registro = this.$store.state.RegistroTrabajador;
      console.log(registro);
      return registro;
    },

    getLoading() {
      return this.$store.state.loading;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    // Esta funcion descarga el archivo odi
    async descargarODI(id) {
      let url = await getImage(id);

      let a = document.createElement("a");
      a.target = "_blank";
      a.href = url;

      a.click();
    },
    // Esta funcion descarga el archivo del reglamento
    async descargarReg(id) {
      let url = await getImage(id);

      let a = document.createElement("a");
      a.target = "_blank";
      a.href = url;

      a.click();
    },
    // Esta funcion descarga el archivo de examen de altura
    async descargarExamen(id) {
      let url = await getImage(id);

      let a = document.createElement("a");
      a.target = "_blank";
      a.href = url;

      a.click();
    },
    // Esta funcion descarga el archivo del contrato
    async descargarContrato(id) {
      let url = await getImage(id);

      let a = document.createElement("a");
      a.target = "_blank";
      a.href = url;

      a.click();
    },
    // Esta funcion descarga el archivo de la imagen (foto)
    async getmostrarpdf(name) {
      let webpdf = await getImage(name);
      this.getpdf = webpdf;
    },

    // Acá elimina todo los datos del trabajador

    eliminarTrabajador(id) {
      this.$store.dispatch("eliminarTrabajador", id);
    },

    eliminar(item) {
      this.editedIndex = this.RegistroTrabajador.indexOf(item);
      this.crear = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.RegistroTrabajador.splice(this.editedIndex, 1);
      borrarDato(this.crear.id, this.eliminarTrabajador);

      let files = [
        this.crear.data.filesData.contrato.id,
        this.crear.data.filesData.reg.id,
        this.crear.data.filesData.examen.id,
        this.crear.data.filesData.foto.id,
        this.crear.data.filesData.odi.id,
      ];

      files.forEach((file) => {
        if (file !== "") {
          borraDoc(file, this.eliminarTrabajador);
        }
      });
      this.$store.dispatch("getData");
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.crear = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>

<style scoped>
.subtitle {
  font-family: "Dongle", sans-serif;
  font-size: 3rem;
}
.mdi-file-pdf-box::before {
  font-size: 30px;
  color: #710301;
}
.v-card > *:first-child:not(.v-btn):not(.v-chip):not(.v-avatar),
.v-card > .v-card__progress + *:not(.v-btn):not(.v-chip):not(.v-avatar) {
  font-family: "Dongle", sans-serif !important;
  justify-content: center;
  font-size: 30px !important;
}
.mdi-pencil::before,
.mdi-delete::before {
  font-size: 20px;
}
</style>