<template>
  <div id="app">
    <div class="map-container">
      <MglMap
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        :center="center"
        :zoom="zoom"
      >
        <MglMarker
          v-for="(marker, index) in markers"
          :key="index"
          :coordinates="marker.data.coords"
        >
          <MglPopup>
            <p>{{ marker.data.text }}</p>
          </MglPopup>
        </MglMarker>
      </MglMap>
    </div>

    <div class="markers">
      <h3>Agregar marcador</h3>
      <div class="input-row">
        <input type="text" v-model="markerText" placeholder="Texto marcador" />
        <button class="button" @click="activateAddMarker" :class="{ disabled }">
          Agregar
        </button>
      </div>
      <small v-if="addingMarker"
        >Haz click donde quieres agregar el marcador</small
      >

      <div class="marker-list">
        <ul>
          <li v-for="(marker, index) in markers" :key="index">
            <p>{{ marker.data.text }}</p>

            <v-icon class="btneli" @click="deleteMarker(index, marker.id)">
              mdi-delete
            </v-icon>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { agregarUbicacion, borrarubicacion } from "@/firebase/firestore.js";
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";

export default {
  name: "App",
  components: { MglMap, MglMarker, MglPopup },
  data() {
    return {
      mapbox: null,
      accessToken:
        "pk.eyJ1IjoibWFyaWFwaSIsImEiOiJja3pxMXB4YTMyYjN3MnBueGxtenhpdHc0In0.aittUpaKyIh9JR8vTTnU7g",
      mapStyle: "mapbox://styles/mapbox/streets-v11",

      center: [-70.64827, -33.45694], // LongLat
      zoom: 5,

      addingMarker: false,
      markerText: "",
    };
  },

  computed: {
    disabled() {
      if (!this.markerText) {
        return true;
      }

      return false;
    },
    markers() {
      return this.$store.state.Ubicacion;
    },
  },

  methods: {
    // Esta función es para que aparezca el marcador de ubicación en el mapa
    activateAddMarker() {
      this.addingMarker = true;
    },
    // Una vez agregado el marcador en el mapa aparece el Alert
    marcadorprueba() {
      alert("macardor Agregado");
    },
    // Agrega el marcador al mapa
    addMarker(long, lat) {
      if (this.addingMarker) {
        const marcador = { coords: [long, lat], text: this.markerText };

        agregarUbicacion(marcador, this.marcadorprueba);
        this.$store.dispatch("getubicacion1");

        this.markerText = "";
        this.addingMarker = false;
      }
    },
    // Elimina el marcador del mapa
    deleteMarker(index, id) {
      this.markers.splice(index, 1);
      console.log(id);
      borrarubicacion(id);
    },
  },

  created() {
    this.mapbox = Mapbox;
    this.$store.dispatch("getubicacion1");
    this.mapbox.Map.prototype.on("click", (e) => {
      this.addMarker(e.lngLat.lng, e.lngLat.lat);
    });
  },
};
</script>

<style  scoped>
.map-container {
  width: 100%;
  height: 100vh;
}

.markers {
  position: absolute;
  background: #fff;
  width: 320px;
  z-index: 100;
  padding: 1rem;
  top: 3rem;
  right: 0.5rem;
}

.markers h3 {
  margin-bottom: 1rem;
}

.markers .input-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.markers input {
  padding: 0.25rem;
  border: 1px solid #2c3e50;
  border-right: none;
}

.markers .button {
  background: rgb(148, 11, 11);
  border: none;
  padding: 0.35rem 1rem;
  border-radius: 0 4px 4px 0;
  color: #fff;
  cursor: pointer;
}

.disabled {
  pointer-events: none;
}

.marker-list {
  margin-top: 2rem;
  padding: 1rem 0;
  border-top: 1px solid #2c3e50;
}

.marker-list ul {
  list-style: none;
}

.marker-list ul li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.marker-list ul li span {
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}

.btneli {
  color: rgb(148, 11, 11);
}
@media (min-width: 0px) and (max-width: 960px) {
  .markers[data-v-11848d02] {
    z-index: 1;
  }
  .markers {
    position: absolute;
    background: #fff;
    width: 245px;
    z-index: 100;
    right: 00.15rem;
    top: 3rem;
    font-size: 12px;
  }
}
</style>