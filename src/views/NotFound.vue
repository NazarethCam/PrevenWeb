<template>
  <div>
    <h1 class="title">PrevenWeb no encuentra esa página</h1>

    <v-btn elevation="2" color="#F3D06A" class="mr-4 mt-5"  @click="goHome">
      Volver al Home <v-icon class="ml-1">mdi-undo-variant</v-icon>
    </v-btn>

     <img src="../assets/404error.png" class="img-404" alt="404 Error" />

  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>


<style scoped>

div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.img-404 {
  height: 400px;
  object-fit: cover;
}

.title {
  font-family: "Carter One", cursive !important;
  font-size: 40px !important;
  margin: 7rem 0 2rem;
  height: 100%;
  line-height: 47px;
  padding: 0 2%;
  width: 100%;
  max-width: 705px;
  box-sizing: border-box;
  text-align: center;
}

.v-btn:not(.v-btn--round).v-size--default {
font-family: "Karla", sans-serif;
font-weight: bold;
}

</style>