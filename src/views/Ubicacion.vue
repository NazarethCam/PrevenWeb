<template>
  <v-row no-gutters>
    <v-col cols="12" sm="12">
      <Navbarlateral />
    </v-col> 
    <v-col cols="12">
      <MapBox />
    </v-col>
  </v-row>
</template>

<script>

import MapBox from "../components/MapBox";
import Navbarlateral from "../components/NavbarLateral";
export default {
  data() {
    return {};
  },
  components: {
    MapBox,
    Navbarlateral,
  },
};
</script>

<style scoped>
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f4f4f4;
}
main {
  display: flex;
  width: calc(100vw - 30px);
  height: calc(100vh - 35px);
}
.side-panel {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-right: 8px;
  overflow: hidden;
}
.right-panel {
  overflow: hidden;
  display: flex;
  flex-grow: 1;
  position: relative;
}
@media (min-width: 1264px) and (min-width: 960px) {
  .col-lg-2 {
    flex: 0 0 10%;
  }
}
</style>


