<template>
  <div>
    <v-card outlined tile>
      <v-container>
        <h1 class="subtitle1 mt-16 text-center">Registro de trabajador</h1>

        <h3>* campo requerido</h3>
        <v-container>
          <!-- Dejamos el evento aca y no en el boton -->
          <v-form
            v-model="valid"
            @click="quitarColor"
            @submit.prevent="registrarTrabajador"
            loading-text="Loading... Please wait"
          >
            <v-row>
              <v-col cols="12" xs="12" sm="6" md="6">
                <v-text-field
                  id="nombre"
                  v-model="crear.nombre"
                  :rules="nombreRules"
                  :counter="20"
                  label="* Nombre"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  id="apellido"
                  v-model="crear.apellido"
                  :rules="apellidoRules"
                  :counter="30"
                  label="* Apellido"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" xs="12" sm="6" md="6">
                <v-text-field
                  id="rut"
                  v-model="crear.rut"
                  :rules="rutRules"
                  :counter="12"
                  label="* RUT"
                  @change="formatRut"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" xs="12" sm="6" md="6">
                <v-text-field
                  id="cargo"
                  v-model="crear.cargo"
                  :counter="22"
                  :rules="cargoRules"
                  label="* Cargo"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="6">
                <!-- hacer el reset, como esta en un change en leeArchivo, -->
                <v-file-input
                  id="odip"
                  @change="leeArchivo"
                  type="file"
                  label="* Obligación de Informar (ODI)"
                  accept="application/pdf"
                  :rules="rules"
                  ref="inputFile"
                ></v-file-input>
              </v-col>
              <v-col cols="12" xs="12" sm="6" md="6" lg="3">
                <v-menu
                  id="fecha1"
                  ref="menu"
                  v-model="crear.menu"
                  :close-on-content-click="false"
                  :return-value.sync="crear.filesData.odi.fecha"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="crear.filesData.odi.fecha"
                      label="* Fecha de ODI"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="dateRules"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="crear.filesData.odi.fecha"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="#1D2247" @click="crear.menu = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="#1D2247"
                      @click="$refs.menu.save(crear.filesData.odi.fecha)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" xs="12" sm="6" md="6" lg="3">
                <v-menu
                  id="fecha2"
                  ref="menu1"
                  v-model="crear.menu1"
                  :close-on-content-click="false"
                  :return-value.sync="crear.filesData.odi.vencimiento"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="crear.filesData.odi.vencimiento"
                      label="* Fecha vencimiento "
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="dateRules"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="crear.filesData.odi.vencimiento"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="crear.menu1 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu1.save(crear.filesData.odi.vencimiento)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" md="6">
                <v-file-input
                  id="reg1"
                  label="* Reglamento interno "
                  @change="leeArchivo1"
                  type="file"
                  accept="application/pdf"
                  :rules="rules2"
                  ref="inputFile1"
                ></v-file-input>
              </v-col>
              <v-col cols="12" xs="12" sm="6" md="6" lg="3">
                <v-menu
                  id="fecha3"
                  ref="menu2"
                  v-model="crear.menu2"
                  :close-on-content-click="false"
                  :return-value.sync="crear.filesData.reg.fecha"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="crear.filesData.reg.fecha"
                      label="* Fecha de reglamento"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="dateRules"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="crear.filesData.reg.fecha"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="crear.menu2 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu2.save(crear.filesData.reg.fecha)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" xs="12" sm="6" md="6" lg="3">
                <v-menu
                  ref="menu3"
                  v-model="crear.menu3"
                  :close-on-content-click="false"
                  :return-value.sync="crear.filesData.reg.vencimiento"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="crear.filesData.reg.vencimiento"
                      label="* Fecha vencimiento "
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="dateRules"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="crear.filesData.reg.vencimiento"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="crear.menu3 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu3.save(crear.filesData.reg.vencimiento)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" md="6">
                <v-file-input
                  label="Examen de altura "
                  @change="leeArchivo2"
                  type="file"
                  accept="application/pdf"
                  ref="inputFile2"
                ></v-file-input>
              </v-col>
              <v-col cols="12" xs="12" sm="6" md="6" lg="3">
                <v-menu
                  ref="menu4"
                  v-model="crear.menu4"
                  :close-on-content-click="false"
                  :return-value.sync="crear.filesData.examen.fecha"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="crear.filesData.examen.fecha"
                      label="Fecha de examen "
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="crear.filesData.examen.fecha"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="crear.menu4 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu4.save(crear.filesData.examen.fecha)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" xs="12" sm="6" md="6" lg="3">
                <v-menu
                  ref="menu5"
                  v-model="crear.menu5"
                  :close-on-content-click="false"
                  :return-value.sync="crear.filesData.examen.vencimiento"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="crear.filesData.examen.vencimiento"
                      label="Fecha vencimiento "
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="crear.filesData.examen.vencimiento"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="crear.menu5 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="
                        $refs.menu5.save(crear.filesData.examen.vencimiento)
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col xs="12" md="6">
                <!-- hacer el reset, como esta en un change en leeArchivo, -->
                <v-file-input
                  @change="leeArchivo4"
                  type="file"
                  label="* Contrato"
                  accept="application/pdf"
                  :rules="rules"
                  ref="inputFile4"
                ></v-file-input>
              </v-col>
              <v-col class="d-flex" cols="12" md="3" sm="3">
                <v-select
                  :items="items"
                  v-model="tipoContrato"
                  label="* Tipo de contrato"
                  :rules="rules6"
                ></v-select>
              </v-col>
              <v-col v-show="isActive" cols="12" lg="3">
                <v-menu
                  ref="menu7"
                  v-model="crear.menu7"
                  :close-on-content-click="false"
                  :return-value.sync="crear.filesData.contrato.fecha"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="crear.filesData.contrato.fecha"
                      label="* Fecha vencimiento"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="crear.filesData.contrato.fecha"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu7 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu7.save(crear.filesData.contrato.fecha)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" md="6">
                <v-file-input
                  @change="leeArchivo3"
                  type="file"
                  label="* foto de trabajador"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  ref="inputFile3"
                  :rules="rules7"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-btn
              class="btn-guardar"
              type="submit"
              color="#71BA51"
              :disabled="!valid"
              :class="{ disabled: loading }"
            >
              GUARDAR
            </v-btn>
            <v-btn color="#E74C3C" dark class="mr-4 ml-5" @click="reset">
              limpiar formulario
            </v-btn>
          </v-form>
        </v-container>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { agregarDatos } from "@/firebase/firestore.js";
import { uploadFile, downloadFile } from "@/firebase/firestorage.js";
export default {
  data() {
    return {
      isActive: false,
      items: ["Indefinido", "Por Obra", "Por Fecha "],
      tipoContrato: "",

      // Firestore no acepta el tipo de dato arhivo, por eso separamos en dos partes: uno que toma el archivo binario a subir y el objeto que guardara la información del trabajador y el nombre, id y fecha de sus archivos
      files: {
        odi: null,
        reg: null,
        examen: null,
        foto: null,
        contrato: null,
        tipocontrato: null,
      },

      crear: {
        nombre: "",
        apellido: "",
        rut: "",
        cargo: "",
        contrato: "",

        file: "",
        filesData: {
          odi: { nombre: "", id: "", fecha: "", vencimiento: "" },
          reg: { nombre: "", id: "", fecha: "", vencimiento: "" },
          examen: { nombre: "", id: "", fecha: "", vencimiento: "" },
          foto: { nombre: "", id: "" },
          contrato: { nombre: "", id: "", tipo: "", fecha: "" },
        },
        loading: false,
        menu: null,
        menu1: null,
        menu2: null,
        menu3: null,
        menu4: null,
        menu5: null,
        menu7: null,
      },

      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      menu6: false,
      menu7: false,
      loading: false,
      clear: false,
      valid: false,
      // El nombreRules lo ocupamos para que los campos sean requeridos //
      nombreRules: [
        (v) => {
          if (!this.clear) {
            return !!v || "nombre es requerido";
          } else {
            return true;
          }
        },
        (v) => {
          if (!this.clear) {
            return (
              (v && v.length <= 20) || "Name must be less than 20 characters"
            );
          } else {
            return true;
          }
        },
      ],
      // El apellidoRules lo ocupamos para que los campos sean requeridos //
      apellidoRules: [
        (v) => {
          if (!this.clear) {
            return !!v || "Apellido es requerido";
          } else {
            return true;
          }
        },
        (v) => {
          if (!this.clear) {
            return (
              (v && v.length <= 30) ||
              "Apellido must be less than 30 characters"
            );
          } else {
            return true;
          }
        },
      ],
      // el rutRules lo ocupamos para que los campos sean requeridos //
      rutRules: [
        (v) => {
          if (!this.clear) {
            return !!v || "RUT es requerido";
          } else {
            return true;
          }
        },
        (v) => {
          if (!this.clear) {
            return (
              (v && v.length <= 12) || "RUT must be less than 12 characters"
            );
          }
        },
      ],
      // el cargoRules lo ocupamos para que los campos sean requeridos //
      cargoRules: [
        (v) => {
          if (!this.clear) {
            return !!v || "Cargo es requerido";
          } else {
            return true;
          }
        },
        (v) => {
          if (!this.clear) {
            return (
              (v && v.length <= 22) || "Cargo must be less than 22 characters"
            );
          } else {
            return true;
          }
        },
      ],
      // el rules7 lo ocupamos para que los campos sean requeridos en la fotos del trabajador //
      rules7: [(v) => !!v || " cargo es requerido"],
      // el rutRules lo ocupamos para que los campos sean requeridos en tipo de contrato //
      rules6: [(v) => !!v || " cargo es requerido"],
      // el rutRules lo ocupamos para que los campos sean requeridos en todos los calendarios //
      dateRules: [
        (value) => {
          if (!this.clear) {
            return !!value || "required";
          } else {
            return true;
          }
        },
        (dateStr) => {
          if (!this.clear) {
            const regex = /^\d{4}-\d{2}-\d{2}$/;

            if (dateStr.match(regex) === null) {
              return false;
            }

            const date = new Date(dateStr);

            const timestamp = date.getTime();

            if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
              return false;
            }
            return date.toISOString().startsWith(dateStr);
          } else {
            return true;
          }
        },
      ],
      // el rules lo ocupamos para que los campos sean requeridos para el archivo de contrato //
      rules: [
        (v) => !!v || "File is required",
        (v) => (v && v.size > 0) || "File is required",
      ],
      // el rules2 lo ocupamos para que los campos sean requeridos en reglamento interno//
      rules2: [
        (v) => !!v || "File is required",
        (v) => (v && v.size > 0) || "File is required",
      ],
    };
  },
  watch: {
    // Aca es donde muestra si el contrato es indefinido no se muestre el calendario y si es por obra o por fecha se muestre el calendario
    tipoContrato() {
      if (this.tipoContrato === "Indefinido") {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    },
  },
  methods: {
    // Da formato al número del rut para que si el usuario no pone el punto ni el guión se haga por si sólo.
    formatRut() {
      if (this.crear.rut === "") {
        this.setearData();
      }
      const rut = this.crear.rut;
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
      this.crear.rut = rutFormatted;
    },
    // Esta función es para que una vez ya guardado el trabajador haga un reset y vuelva a su punto inicial
    crearFormularioCallback() {
      this.$swal(
        `El trabajador ${this.crear.nombre}`,
        "¡Se ha creado exitosamente!",
        "success"
      );
      this.clear = true;
      this.crear.nombre = "";
      this.crear.apellido = "";
      this.crear.cargo = "";
      this.crear.rut = "";
      this.crear.filesData.odi.fecha = "";
      this.crear.filesData.odi.vencimiento = "";
      this.crear.filesData.reg.fecha = "";
      this.crear.filesData.reg.vencimiento = "";
      this.crear.filesData.examen.fecha = "";
      this.crear.filesData.examen.vencimiento = "";
      this.crear.filesData.contrato.fecha = "";
      this.$refs.inputFile.reset();
      this.$refs.inputFile1.reset();
      this.$refs.inputFile2.reset();
      this.$refs.inputFile3.reset();
      this.$refs.inputFile4.reset();

      setTimeout(() => {
        this.clear = false;
      }, 500);
    },
    getLoading() {
      return this.$store.state.loading;
    },
    // En esta función se guarda el tipo de contrato que el usuario escoja puede ser indefinido, por obra o fecha.
    crearFomulario() {
      this.crear.filesData.contrato.tipo = this.tipoContrato;

      agregarDatos(this.crear, this.crearFormularioCallback);
    },
    leeArchivo(e) {
      // al hacer  reset, como tenemos el leerArchivo en un change, agregamos if  por cada input para que asi pueda hacer reset
      if (!e) return;
      console.log(e);
      let timestamp = Date.now();
      let id = `${e.name}_${timestamp}`;

      // filesData guarda la informacion que ingresará a Firestore
      this.crear.filesData.odi.nombre = e.name;
      this.crear.filesData.odi.id = id;

      // files guarda el archivo como tal para enviarlo a storage
      this.files.odi = e;
    },
    leeArchivo1(e) {
      // al hacer  reset, como tenemos el leerArchivo en un change, agregamos if  por cada input para que asi pueda hacer reset
      if (!e) return;
      console.log(e);
      let timestamp = Date.now();
      let id = `${e.name}_${timestamp}`;

      this.crear.filesData.reg.nombre = e.name;
      this.crear.filesData.reg.id = id;

      this.files.reg = e;
    },
    leeArchivo2(e) {
      // al hacer  reset, como tenemos el leerArchivo en un change, agregamos if  por cada input para que asi pueda hacer reset
      if (!e) return;
      console.log(e);
      let timestamp = Date.now();
      let id = `${e.name}_${timestamp}`;

      this.crear.filesData.examen.nombre = e.name;
      this.crear.filesData.examen.id = id;

      this.files.examen = e;
    },
    leeArchivo3(e) {
      // al hacer  reset, como tenemos el leerArchivo en un change, agregamos if  por cada input para que asi pueda hacer reset
      if (!e) return;
      console.log(e);
      let timestamp = Date.now();
      let id = `${e.name}_${timestamp}`;
      this.crear.filesData.foto.nombre = e.name;
      this.crear.filesData.foto.id = id;

      this.files.foto = e;
    },
    leeArchivo4(e) {
      // al hacer  reset, como tenemos el leerArchivo en un change, agregamos if  por cada input para que asi pueda hacer reset
      if (!e) return;
      console.log(e);
      let timestamp = Date.now();
      let id = `${e.name}_${timestamp}`;
      this.crear.filesData.contrato.nombre = e.name;
      this.crear.filesData.contrato.id = id;

      this.files.contrato = e;
    },
    archivoCargado() {
      this.loading = false;
      this.crear.nombre = "";
      this.crear.file = null;
    },
    subir() {
      // La funcion subir manda el archivo desde file, su id desde fileData y el callback
      if (this.files.odi) {
        uploadFile(
          this.files.odi,
          this.crear.filesData.odi.id,
          this.archivoCargado
        );
      }
      if (this.files.reg) {
        uploadFile(
          this.files.reg,
          this.crear.filesData.reg.id,
          this.archivoCargado
        );
      }
      if (this.files.examen) {
        uploadFile(
          this.files.examen,
          this.crear.filesData.examen.id,
          this.archivoCargado
        );
      }
      if (this.files.foto) {
        uploadFile(
          this.files.foto,
          this.crear.filesData.foto.id,
          this.archivoCargado
        );
      }
      if (this.files.contrato) {
        uploadFile(
          this.files.contrato,
          this.crear.filesData.contrato.id,
          this.archivoCargado
        );
      }
    },
    setList(list) {
      this.crear.files = list;
    },
    //Con esta función se descarga el pdf al darle click al boton en otra pestaña
    downloadFromUrl(name, url) {
      let link = document.createElement("a");
      link.href = url;
      link.download = name;
      link.target = "_blank";
      link.click();
      document.removeChild(link);
    },

    download(name) {
      downloadFile(name, this.downloadFromUrl);
    },
    // registrarTrabajador tiene dos funciones sube el documento al storage y al firestore
    registrarTrabajador() {
      this.crearFomulario();
      this.subir();
    },
    // Esta función es para resetear todo el contenido del formulario cuando se hace click en el boton limpiar formulario
    reset() {
      this.clear = true;
      this.crear.nombre = "";
      this.crear.apellido = "";
      this.crear.cargo = "";
      this.crear.rut = "";
      this.crear.filesData.odi.fecha = "";
      this.crear.filesData.odi.vencimiento = "";
      this.crear.filesData.reg.fecha = "";
      this.crear.filesData.reg.vencimiento = "";
      this.crear.filesData.examen.fecha = "";
      this.crear.filesData.examen.vencimiento = "";
      this.crear.filesData.contrato.fecha = "";
      this.$refs.inputFile.reset();
      this.$refs.inputFile1.reset();
      this.$refs.inputFile2.reset();
      this.$refs.inputFile3.reset();
      this.$refs.inputFile4.reset();

      setTimeout(() => {
        this.clear = false;
      }, 500);
    },
  },
};
</script>

<style scoped>
.subtitle1 {
  font-family: "Dongle", sans-serif;
  font-size: 3rem;
}
.theme--light.v-sheet--outlined {
  border: none;
}
.disabled {
  pointer-events: none;
}

.btn-guardar {
  color: white;
}

@media (min-width: 0px) and (max-width: 700px) {
  .btn-guardar {
    font-size: 10px;
  }
}
</style>