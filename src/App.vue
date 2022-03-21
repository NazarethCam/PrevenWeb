<template>
  <v-app>
    <div class="loader" :class="{ show: $root.loading }">
      <img src="./assets/loading.gif" alt="spinner" />
    </div>
    <main>
      <Navbar />
      <transition name="vista">
        <router-view />
      </transition>
    </main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    Navbar,
  },
};
</script>

<style>
* {
  font-family: "Open Sans", sans-serif;
}
.loader {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  background: #fff;
  transition: all 0.3s;
  visibility: hidden;
  opacity: 0;
  z-index: 1;
}

.loader.show {
  opacity: 1;
  visibility: visible;
}

.vista-enter-active,
.vista-leave-active {
  transition: opacity 0.1s;
}
.vista-enter,
.vista-leave-to {
  opacity: 0;
}
</style>