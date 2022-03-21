<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="350">
        <v-col ref="card">
          <v-app-bar flat color="rgba(0, 0, 0, 0)">
            <v-spacer></v-spacer>
          </v-app-bar>
          <v-card-title class="white--text">
            <v-avatar size="120">
              <!-- informacion de la image-->
              <img alt="user" :src="this.workerRecord.workerImage" />
            </v-avatar>
            <p class="ml-3">{{ workerRecord.data.nombre }}</p>
          </v-card-title>
        </v-col>
        <v-card-text>
          <v-card-text class="text--primary">
            <div class="text--bold">Trabajador: Activo</div>
          </v-card-text>
          <v-card-actions>
            <v-row align="center" justify="end">
              <v-btn icon @click="dialog = true">
                <v-icon class="mr-2"> mdi-folder </v-icon>
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-row>

    <!-- Dialog -->
    <!-- Acá hicimos un v-model para poder que la card se muestre un poco más grande y se puedan observar todos los datos de cada trabajador -->
    <v-dialog width="500" height="300" v-model="dialog" persistent>
      <v-card>
        <img
          alt="user"
          :src="this.workerRecord.workerImage"
          class="imagen-card"
        />
        <v-card-title
          >{{ workerRecord.data.nombre }}
          {{ workerRecord.data.apellido }}</v-card-title
        >
        <div class="ml-8 mb-2">Rut:{{ workerRecord.data.rut }}</div>
        <div class="ml-8 mb-2">Cargo: {{ workerRecord.data.cargo }}</div>
        <div class="ml-8 mb-2">
          Odi inicio:{{ workerRecord.data.filesData.odi.fecha }} expira:
          {{ workerRecord.data.filesData.odi.vencimiento }}
        </div>
        <div class="ml-8 mb-2">
          Reglamento Interno:
          {{ workerRecord.data.filesData.reg.fecha }} expira:
          {{ workerRecord.data.filesData.odi.vencimiento }}
        </div>
        <div class="ml-8 mb-2">
          Examen de Altura:
          {{ workerRecord.data.filesData.examen.fecha }} expira:
          {{ workerRecord.data.filesData.examen.vencimiento }}
        </div>
        <div class="ml-8 mb-2">
          Contrato: {{ workerRecord.data.filesData.contrato.tipo }}
          {{ workerRecord.data.filesData.contrato.fecha }}
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="my-2">
            <v-btn color="error" small @click="dialog = false">Cerrar</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ["workerRecord"],
  data: () => ({
    show: false,
    dialog: false,
    workerImage: "",
    colors: ["primary", "secundary", "terciary"],
  }),
  mounted() {
    let card = this.$refs.card;
    let cargo = this.workerRecord.data.cargo;
    if (cargo.toLowerCase() === "pulidor") {
      card.classList.add("primary");
    } else if (cargo.toLowerCase() === "soldador") {
      card.classList.add("secundary");
    } else {
      card.classList.add("terciary");
    }
  },
};
</script>

<style scoped>
.v-card {
  margin: auto;
}

.v-card__title {
  padding: 0;
}

.imagen-card {
  width: 500px;
  height: 300px;
}
.v-application .cyan {
  padding: 0 0 0.3rem 0.3;
}
img {
  object-fit: cover;
}

.v-toolbar__content,
.v-toolbar__extension {
  max-width: 500px;
}

.v-dialog > .v-card > .v-card__title {
  padding: 10px 24px;
  font-weight: bold;
  justify-content: center;
}

.v-btn:not(.v-btn--round).v-size--small {
  padding: 10px 15px;
  margin: 0 15px 10px;
}
.v-application .my-2 {
  display: flex;
  justify-content: flex-end;
}
.v-card > *:first-child:not(.v-btn):not(.v-chip):not(.v-avatar),
.v-card > .v-card__progress + *:not(.v-btn):not(.v-chip):not(.v-avatar) {
  object-fit: cover;
}
.primary {
  background-color: #6bb18c !important;
}
.secundary {
  background-color: #dd6f47;
}
.terciary {
  background-color: #f0a703;
}

@media (min-width: 0px) and (max-width: 700px) {
  .imagen-card {
    width: 325px;
  }
}
</style>