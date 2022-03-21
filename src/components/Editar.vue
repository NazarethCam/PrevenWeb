<template>
  <div>
    <v-card outlined tile>
      <v-container>
        <h1 class="edit-title mb-5">
          Editar trabajador {{ filtrarTrabajador.data.nombre }}
          {{ filtrarTrabajador.data.apellido }}
        </h1>
        <v-container>
          <v-form @submit.prevent="editarTrabajador">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="filtrarTrabajador.data.nombre"
                  label="Nombre"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="filtrarTrabajador.data.apellido"
                  label="Apellido"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="filtrarTrabajador.data.rut"
                  label="RUT"
                  @change="formatRut"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="filtrarTrabajador.data.cargo"
                  label="Cargo"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="10" md="5">
                <v-file-input
                  @change="leeArchivo"
                  type="file"
                  :label="filtrarTrabajador.data.filesData.odi.nombre || 'odi'"
                  accept="application/pdf"
                  ref="inputFile"
                ></v-file-input>
              </v-col>
              <v-col cols="2" md="1">
                <v-icon
                  @click="
                    deleteFile(filtrarTrabajador.data.filesData.odi.id, 'odi')
                  "
                  >mdi-delete</v-icon
                >
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="3">
                <v-menu
                  ref="menu"
                  v-model="filtrarTrabajador.data.menu"
                  :close-on-content-click="false"
                  :return-value.sync="
                    filtrarTrabajador.data.filesData.odi.fecha
                  "
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filtrarTrabajador.data.filesData.odi.fecha"
                      label="Fecha de ODI"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="filtrarTrabajador.data.filesData.odi.fecha"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="filtrarTrabajador.data.menu = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="
                        $refs.menu.save(
                          filtrarTrabajador.data.filesData.odi.fecha
                        )
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6" md="3" lg="3">
                <v-menu
                  ref="menu1"
                  v-model="filtrarTrabajador.data.menu1"
                  :close-on-content-click="false"
                  :return-value.sync="
                    filtrarTrabajador.data.filesData.odi.vencimiento
                  "
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filtrarTrabajador.data.filesData.odi.vencimiento"
                      label="Fecha de Vencimiento"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="filtrarTrabajador.data.filesData.odi.vencimiento"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="filtrarTrabajador.data.menu1 = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="
                        $refs.menu1.save(
                          filtrarTrabajador.data.filesData.odi.vencimiento
                        )
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="10" md="5">
                <v-file-input
                  @change="leeArchivo1"
                  type="file"
                  accept="application/pdf"
                  ref="inputFile1"
                  :label="filtrarTrabajador.data.filesData.reg.nombre || 'reg'"
                ></v-file-input>
              </v-col>

              <v-col cols="2" md="1">
                <v-icon
                  @click="
                    deleteFile(filtrarTrabajador.data.filesData.reg.id, 'reg')
                  "
                  >mdi-delete</v-icon
                >
              </v-col>
              <v-col cols="12" sm="6" md="3" lg="3">
                <v-menu
                  ref="menu2"
                  v-model="filtrarTrabajador.data.menu2"
                  :close-on-content-click="false"
                  :return-value.sync="
                    filtrarTrabajador.data.filesData.reg.fecha
                  "
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filtrarTrabajador.data.filesData.reg.fecha"
                      label="Fecha de reglamento"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="filtrarTrabajador.data.filesData.reg.fecha"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="filtrarTrabajador.data.menu2 = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="
                        $refs.menu2.save(
                          filtrarTrabajador.data.filesData.reg.fecha
                        )
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6" md="3" lg="3">
                <v-menu
                  ref="menu3"
                  v-model="filtrarTrabajador.data.menu3"
                  :close-on-content-click="false"
                  :return-value.sync="
                    filtrarTrabajador.data.filesData.reg.vencimiento
                  "
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filtrarTrabajador.data.filesData.reg.vencimiento"
                      label="Fecha vencimiento "
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="filtrarTrabajador.data.filesData.reg.vencimiento"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="filtrarTrabajador.data.menu3 = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="
                        $refs.menu3.save(
                          filtrarTrabajador.data.filesData.reg.vencimiento
                        )
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="10" md="5">
                <v-file-input
                  @change="leeArchivo2"
                  type="file"
                  accept="application/pdf"
                  ref="inputFile2"
                  :label="
                    filtrarTrabajador.data.filesData.examen.nombre || 'examen'
                  "
                ></v-file-input>
              </v-col>
              <v-col cols="2" md="1">
                <v-icon
                  @click="
                    deleteFile(
                      filtrarTrabajador.data.filesData.examen.id,
                      'examen'
                    )
                  "
                  >mdi-delete</v-icon
                >
              </v-col>
              <v-col cols="12" sm="6" md="3" lg="3">
                <v-menu
                  ref="menu4"
                  v-model="filtrarTrabajador.data.menu4"
                  :close-on-content-click="false"
                  :return-value.sync="
                    filtrarTrabajador.data.filesData.examen.fecha
                  "
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filtrarTrabajador.data.filesData.examen.fecha"
                      label="Fecha realizo el Examen "
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="filtrarTrabajador.data.filesData.examen.fecha"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="filtrarTrabajador.data.menu4 = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="
                        $refs.menu4.save(
                          filtrarTrabajador.data.filesData.examen.fecha
                        )
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6" md="3" lg="3">
                <v-menu
                  ref="menu5"
                  v-model="filtrarTrabajador.data.menu5"
                  :close-on-content-click="false"
                  :return-value.sync="
                    filtrarTrabajador.data.filesData.examen.vencimiento
                  "
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="
                        filtrarTrabajador.data.filesData.examen.vencimiento
                      "
                      label="Fecha de Vencimiento "
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="
                      filtrarTrabajador.data.filesData.examen.vencimiento
                    "
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="filtrarTrabajador.data.menu5 = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="
                        $refs.menu5.save(
                          filtrarTrabajador.data.filesData.examen.vencimiento
                        )
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="10" md="5">
                <!-- al hacer  reset, como tenemos el leerArchivo en un change, agregamos if  por cada input para que asi pueda hacer reset -->
                <v-file-input
                  @change="leeArchivo4"
                  type="file"
                  accept="application/pdf"
                  ref="inputFile4"
                  :label="
                    filtrarTrabajador.data.filesData.contrato.nombre ||
                    'contrato'
                  "
                ></v-file-input>
              </v-col>
              <v-col cols="2" md="1">
                <v-icon
                  @click="
                    deleteFile(
                      filtrarTrabajador.data.filesData.contrato.id,
                      'contrato'
                    )
                  "
                  >mdi-delete</v-icon
                >
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="3" lg="3">
                <v-select
                  :items="items"
                  v-model="tipoContrato"
                  :label="filtrarTrabajador.data.filesData.contrato.tipo"
                ></v-select>
              </v-col>
              <v-col v-show="isActive" cols="12" sm="6" md="3" lg="3">
                <v-menu
                  ref="menu7"
                  v-model="filtrarTrabajador.data.menu7"
                  :close-on-content-click="false"
                  :return-value.sync="
                    filtrarTrabajador.data.filesData.contrato.fecha
                  "
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filtrarTrabajador.data.filesData.contrato.fecha"
                      label="* Fecha de vencimiento contrato"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="filtrarTrabajador.data.filesData.contrato.fecha"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="filtrarTrabajador.data.menu7 = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="
                        $refs.menu7.save(
                          filtrarTrabajador.data.filesData.contrato.fecha
                        )
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="10" md="5">
                <v-file-input
                  @change="leeArchivo3"
                  type="file"
                  ref="inputFile3"
                  :label="
                    filtrarTrabajador.data.filesData.foto.nombre || 'foto'
                  "
                  accept="image/jpg"
                  prepend-icon="mdi-camera"
                ></v-file-input>
              </v-col>
              <v-col cols="2" md="1">
                <v-icon
                  @click="
                    deleteFile(filtrarTrabajador.data.filesData.foto.id, 'foto')
                  "
                  >mdi-delete</v-icon
                >
              </v-col>
            </v-row>
            <v-btn type="submit" dark color="#71BA51"> GUARDAR </v-btn>
            <v-btn
              class="edit-btn-cancelar"
              color="#E74C3C"
              @click="$router.push(`/administrador`)"
            >
              Cancelar
            </v-btn>
          </v-form>
        </v-container>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { actualizarDato } from "@/firebase/firestore.js";
import { uploadFile, borraDoc } from "@/firebase/firestorage.js";
export default {
  data() {
    return {
      prop: "value",
      isActive: false,
      items: ["Indefinido", "Por Obra", "Por Fecha "],
      tipoContrato: "",
      loading: false,
      menu: false,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      menu7: false,

      data: {
        nombre: "",
        apellido: "",
        rut: "",
        cargo: "",
        download: "",
        download2: "",
        download3: "",
        download4: "",
        file: "",
        filesData: {
          odi: { nombre: "", id: "", fecha: "", vencimiento: "" },
          reg: { nombre: "", id: "", fecha: "", vencimiento: "" },
          examen: { nombre: "", id: "", fecha: "", vencimiento: "" },
          foto: { nombre: "", id: "" },
          contrato: { nombre: "", id: "", tipo: "", fecha: "" },
        },

        menu: null,
        menu1: null,
        menu2: null,
        menu3: null,
        menu4: null,
        menu5: null,
        menu7: null,
      },
      files: {
        foto: null,
        odi: null,
        reg: null,
        examen: null,
        contrato: null,
        tipoContrato: null,
      },
    };
  },
  methods: {
    formatRut() {
      if (this.filtrarTrabajador.data.rut === "") {
        // this.setearData();
      }
      const rut = this.filtrarTrabajador.data.rut;
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
      // asignando el rut formateado a la variable del rut;
      this.filtrarTrabajador.download2data.rut = rutFormatted;
    },

    deleteFile(id, campo) {
      borraDoc(id);

      // borraEnStorage(id)
      if (campo === "foto") {
        this.filtrarTrabajador.data.filesData.foto.id = "";
        this.filtrarTrabajador.data.filesData.foto.nombre = "";
      }
      if (campo === "odi") {
        this.filtrarTrabajador.data.filesData.odi.id = "";
        this.filtrarTrabajador.data.filesData.odi.nombre = "";
      }
      if (campo === "reg") {
        this.filtrarTrabajador.data.filesData.reg.id = "";
        this.filtrarTrabajador.data.filesData.reg.nombre = "";
      }
      if (campo === "examen") {
        this.filtrarTrabajador.data.filesData.examen.id = "";
        this.filtrarTrabajador.data.filesData.examen.nombre = "";
      }
      if (campo === "contrato") {
        this.filtrarTrabajador.data.filesData.contrato.id = "";
        this.filtrarTrabajador.data.filesData.contrato.nombre = "";
      }
      actualizarDato(this.traerId, this.filtrarTrabajador.data);
    },

    leeArchivo(e) {
      let timestamp = Date.now();
      let id = `${e.name}_${timestamp}`;
      // filesData guarda la informacion que ingresará a Firestore
      this.filtrarTrabajador.data.filesData.odi.nombre = e.name;
      this.filtrarTrabajador.data.filesData.odi.id = id;

      // files guarda el archivo como tal para enviarlo a storage
      this.files.odi = e;
    },
    leeArchivo1(e) {
      let timestamp = Date.now();
      let id = `${e.name}_${timestamp}`;
      this.filtrarTrabajador.data.filesData.reg.nombre = e.name;
      this.filtrarTrabajador.data.filesData.reg.id = id;

      this.files.reg = e;
    },
    leeArchivo2(e) {
      let timestamp = Date.now();
      let id = `${e.name}_${timestamp}`;
      this.filtrarTrabajador.data.filesData.examen.nombre = e.name;
      this.filtrarTrabajador.data.filesData.examen.id = id;

      this.files.examen = e;
    },
    leeArchivo3(e) {
      let timestamp = Date.now();
      let id = `${e.name}_${timestamp}`;
      this.filtrarTrabajador.data.filesData.foto.nombre = e.name;
      this.filtrarTrabajador.data.filesData.foto.id = id;
      this.files.foto = e;
    },
    leeArchivo4(e) {
      let timestamp = Date.now();
      let id = `${e.name}_${timestamp}`;
      this.filtrarTrabajador.data.filesData.contrato.nombre = e.name;
      this.filtrarTrabajador.data.filesData.contrato.id = id;
      this.files.foto = e;
    },
    archivoCargado() {
      this.loading = false;
      alert("Archivo guardado!");
      this.data.nombre = "";
      this.data.file = null;
    },
    subir() {
      if (this.files.odi) {
        // La funcion subir manda el archivo desde file, su id desde fileData y el callback
        uploadFile(
          this.files.odi,
          this.filtrarTrabajador.data.filesData.odi.id,
          this.archivoCargado
        );
      }
      if (this.files.reg) {
        uploadFile(
          this.files.reg,
          this.filtrarTrabajador.data.filesData.reg.id,
          this.archivoCargado
        );
      }
      if (this.files.examen) {
        uploadFile(
          this.files.examen,
          this.filtrarTrabajador.data.filesData.examen.id,
          this.archivoCargado
        );
      }
      if (this.files.foto) {
        uploadFile(
          this.files.foto,
          this.filtrarTrabajador.data.filesData.foto.id,
          this.archivoCargado
        );
      }
      if (this.files.contrato) {
        uploadFile(
          this.files.contrato,
          this.filtrarTrabajador.data.filesData.contrato.id,
          this.archivoCargado
        );
      }
    },

    ActualizarTrabajador() {
      let data = {
        index: this.id,
        Registro: {
          nombre: this.nombre,
          apellido: this.apellido,
          rut: this.rut,
          cargo: this.cargo,
          tipoContrato: this.tipoContrato,
        },
      };

      this.$store.commit("ActualizarTrabajador", data);
      alert("Dato actualizado");
    },
    editarTrabajador() {
      if (this.tipoContrato === "Indefinido") {
        this.filtrarTrabajador.data.filesData.contrato.fecha = "";
      }

      this.filtrarTrabajador.data.filesData.contrato.tipo = this.tipoContrato;
      actualizarDato(this.traerId, this.filtrarTrabajador.data);
      this.subir(), this.$router.push("/administrador");
    },
  },
  watch: {
    tipoContrato() {
      if (this.tipoContrato === "Indefinido") {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    },
  },
  computed: {
    traerId() {
      return this.$route.params.id;
    },
    filtrarTrabajador() {
      return this.$store.getters.filterTrabajador(this.traerId);
    },
  },
  mounted() {
    this.filtrarTrabajador;
  },
};
</script>

<style scoped>
.edit-title {
  margin-top: 100px;
  font-family: "Dongle", sans-serif;
  font-size: 3rem;
  text-align: center;
}
.theme--light.v-sheet--outlined {
  border: none;
}
.disabled {
  pointer-events: none;
}

.edit-btn-cancelar {
  margin-left: 15px;
  color: white;
}
@media (min-width: 0px) and (max-width: 700px) {
  .edit-title {
    padding: 30px;
  }
}
</style>