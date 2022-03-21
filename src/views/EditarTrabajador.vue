<template>
  <v-row no-gutters>
       <v-col  cols="12" sm="12" md="2" lg="2" >
      <Navbarlateral />
    </v-col>
     <v-col cols="12" md="10" lg="10">
      <Editar />
    </v-col>
  </v-row>
</template>

<script>
import Editar from "../components/Editar";
import Navbarlateral from "../components/NavbarLateral";
export default {
  data() {
    return {};
  },
  components: {
    Editar,
    Navbarlateral,
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