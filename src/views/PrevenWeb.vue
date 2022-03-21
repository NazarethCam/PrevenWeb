 <template>
  <div>
    <div>
      <v-app-bar app color="#A3E1E7"  class="navbar">
        <v-app-bar-nav-icon
        
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title class="navbar-titulo">PrevenWeb</v-toolbar-title>
        <v-spacer></v-spacer>
        <a class="navbar-link" href="#inicio">Inicio</a>
        <a class="navbar-link" href="#about">Nosotros</a>
        <a class="navbar-link" href="#contacto">Contáctanos</a>

        <router-link to="/login"
          ><a class="navbar-iniciarSesion"> Iniciar Sesión </a></router-link
        >
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" fixed temporary>
        <v-list nav dense class="navbar-list">
          <v-list-item-group active-class=" text--accent-4">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <a href="#inicio">Inicio</a>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <a href="#about">Nosotros</a>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-tooltip-text</v-icon>
              </v-list-item-icon>
              <a href="#contacto">Contáctanos</a>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>

    <div id="inicio" class="hero">
      <div class="textos-hero">
        <h1 class="h1-textos-hero">Bienvenido a PrevenWeb</h1>
        <p>Creamos el mejor sitio web para ti</p>
        <a href="#contacto">Contáctanos <v-icon>mdi-email</v-icon></a>
      </div>

      <div class="svg-hero" style="height: 100px; overflow: hidden">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style="height: 100%; width: 100%"
        >
          <path
            d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            style="stroke: none; fill: #fff"
          ></path>
        </svg>
      </div>
    </div>

    <v-container id="about" >
      <section  >
        <div class="about" align="center" justify="center">
          <h3 class=" title-about">Nosotros</h3>
        </div>
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="6" lg="6">
            <div
              class=""
              data-aos="zoom-out-down"
              align="center"
              justify="center"
            >
              <v-img
                lazy-src="../assets/img.jpg"
                max-height="250"
                max-width="500"
                src="../assets/img2.jpg"
                class="imagen-about"
              ></v-img>
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <p class="text-about">
              Desarrollamos y administramos páginas web dedicadas al mundo de los prevensionistas de riesgos.
            </p>
            <p class="text-about">
              Nuestro objetivo principal es garantizar, verificar y facilitar la documentación al prevencionista de riesgo  de modo que el
              trabajador cuente con su identificación al día de una forma más funcional.
            </p>
          </v-col>
        </v-row>
      </section>
    </v-container>
    <v-container fluid class=" color-carrusel">
      <h1 class="title-carousel">Nuestra Web</h1>

      <div class="carousel">
        <v-container>
          <carousel-3d
            :autoplay="true" :autoplay-timeout="2000" :display="3"
            :width="660"
            :height="330"
          >
            <slide :index="i" :key="i" v-for="(slide, i) in slides">
              <figure>
                <img :src="slide.src" />
                <figcaption>
                  <!-- <v-btn text color="white">{{ slide.text }}</v-btn> -->
                </figcaption>
              </figure>
            </slide>
          </carousel-3d>
        </v-container>
      </div>
    </v-container>
    <v-container class="" id="contacto">
      <div>
        <h1 class="title-contact" align="center" justify="center">Contacto</h1>
        <div class="row-contact">
          <div class="col-md-10 col-lg-12 mx-auto">
            <p class="text-contact" align="center" justify="center">
              ¿Tienes dudas o sugerencias? Déjanos un mensaje y nos
              contactaremos contigo.
            </p>
            <div class="container-form-contact">
              <v-form
                action="https://formspree.io/f/xyyowdvk"
                method="POST"
                name="simple-contact-form"
                accept-charset="utf-8"
              >
                <div class="container-formulario-contact">
                  <label class="label">Nombre</label>
                  <input
                  id="name"
                    class="input2"
                    type="name"
                    name="name"
                    placeholder="name"
                  />
                  <label class="label">Email</label>
                  <input
                  id="email"
                    class="input2"
                    type="email"
                    name="email"
                    placeholder="email"
                  />
                  <label class="label">Mensaje</label>
                  <textarea
                  id="message"
                    class="input2"
                    name="message"
                    placeholder="message"
                  ></textarea>
                  <div align="center">
                    <v-btn 
                  id="btn-enviar" type="submit"> Enviar </v-btn>
                  </div>
                </div>
              </v-form>
            </div>
          </div>
        </div>
      </div>
    </v-container>

     <div id="indicador">
      <div class="container mt-5">
        <h1 class="indicador-title">Indicador de Precio</h1>
        <div class="indicador-form-group">
          <label> <h3>Selecciona el Indicador de valores</h3></label>
          <select
            v-model="indicador"
            class="form-control form-control-lg"
            name="indicador"
          >
            <option
              class="indicador-form-control"
              v-for="ind in indicadoresEconomicos"
              v-bind:key="ind.codigo"
            >
              {{ ind.codigo }}
            </option>
          </select>
        </div>

        <div v-show="indicador != '' && !loading">
          <h4>Indicador : {{ datos.nombre }}</h4>
          <h5>Unidad de medida: {{ datos.unidad_medida }}</h5>
        </div>
        <table
          v-show="indicador != '' && !loading"
          class="container table mt-2"
        >
          <thead class="indicador-item-tabla">
            <tr>
              <th scope="col" class="indicador-item-th">Fecha</th>
              <th scope="col" class="indicador-item-th">Valor</th>
            </tr>
          </thead>
          <tbody v-if="datos.serie !== undefined">
            <tr v-for="d in datos.serie.slice(0, 10)" :key="d.fecha">
              <th scope="row-contact">{{ d.fecha | fecha }}</th>
              <td>{{ d.valor }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <v-footer class="footer" align="center" justify="center">
      <v-container>
        <p class="footer-p">PrevenWeb</p>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
import getIndicadores from "../api";
import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  data() {
    return {
      drawer: false,
     
      slides: [
        { src: require("../assets/foto-login.jpg") },
        { src: require("../assets/foto-admin.jpg") },
        { src: require("../assets/foto-card.jpg") },
      ],
      datos: [],
      indicadoresEconomicos: [
        { codigo: "" },
        { codigo: "uf" },
        { codigo: "dolar" },
        { codigo: "euro" },
        { codigo: "utm" },
      ],
      indicador: "",
      loading: false,
      indice: Date.now(),
    };
  },

  components: {
    Carousel3d,
    Slide,
  },

  methods: {
    refreshIndicadores() {
      const self = this;
      this.loading = true;
      this.datos = [];
      getIndicadores(this.indicador).then(function (indicadores) {
        self.loading = false;
        self.datos = indicadores;
      });
    },
  },
  mounted() {
    this.refreshIndicadores();
  },
  watch: {
    indicador() {
      this.refreshIndicadores();
    },
    datos() {},
  },
  filters: {
    fecha: function (value) {
      let f = new Date(value);
      let fecha = `${f.getDate()}/${f.getMonth() + 1}/${f.getFullYear()}`;
      return fecha;
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Karla", sans-serif;
 
}
.textos-hero a {
  display: inline-block;
  text-decoration: none;
  padding: 10px 12px;
  background: #ffcdd2;
  border-radius: 20px;
  color: #83755b !important;
  font-weight: bold;
}
.textos-hero {
  height: 500px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.textos-hero h1 {
  font-size: 60px;
  text-align: center;
}

.textos-hero p {
  font-size: 25px;
  margin-bottom: 20px;
}
.hero {
  background-image: linear-gradient(
      120deg,
      rgba(137, 166, 184, 0.699) 0%,
      rgba(33, 39, 48, 0.692) 100%
    ),
    url("../assets/img.jpg");
  width: 100%;
  height: 650px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
}
.svg-hero {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  
}

/* /INDICADOR/ */
#indicador {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  margin-top: 10px;
}
.indicador-indicador-item-tabla {
  background: #a3e1e7;
  padding: 10px 0;
}
.indicador-title {
  font-size: 40px;
  margin: 40px 0;
  color: #1e3745;
}
.indicador-item-th {
  padding: 12px;
}
indicador-form-control {
  border: 1px solid black;
}

.v-application .mt-5 {
  margin-bottom: 40px;
  margin-top: 0 !important;
}

/* /about/ */
.about{
margin-top: 70px;
margin-bottom: 40px;
}

.text-about {
  font: 1.2em sans-serif;
  margin-left: 20px;
  max-width: 600px;
}
.title-about {
  margin-top: 0;
  font-size: 40px;
 
  color: #1e3745;
}


.imagen-about{
  margin-bottom: 40px;
 animation: ease-in animat 3s;
}

@keyframes animat {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}
/* /carousel/ */
.carousel {
  margin-bottom: 40px;
}
.carousel-3d-container figure {
  margin: 0;
}

.carousel-3d-container figcaption {
  position: absolute;
  /* color: white; */
  bottom: 0;
  position: absolute;
  bottom: 0;
  padding: 15px;
  font-size: 12px;
  min-width: 100%;
  box-sizing: border-box;
  height: 400;
}

.color-carrusel {
  background: #b5a179;
}
.title-carousel {
  font-size: 40px;
  margin-bottom: 30px;
  margin-top: 30px;
  text-align: center;
  color: #1e3745;
}

/* /contact/ */
.contact {
  margin-bottom: 40px;
}
.title-contact {
  font-size: 40px;
  margin-top: 70px;
  margin-bottom: 30px;
  color: #1e3745;
}
.text-contact {
  font-size: 20px;
}

.input2 {
  border: 1px solid black;
  /* border-radius: 20px; */
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 30px;
}

.label {
  text-align: left;
  margin-left: 20px;
  padding-bottom: 23px;
}
.container-form-contact {
  margin: auto;
  width: 70%;
}
/* navbar */
.color2 {
  background: #6ab4fd;
 
}
a {
  text-decoration: none;
  color: black;
}
.navbar-titulo {
  font-family: "Carter One", cursive;
  color: #1e3745;
}
.v-sheet.v-footer:not(.v-sheet--outlined) {
  background-color: #a3e1e7;
  color: #1e3745;
}


a {
  color: black;
}
.navbar-link {
  margin-left: 20px;
  color: #83755b;
  font-weight: bold;
}

select {
  -webkit-appearance: button;
  border: 2px solid black;
  margin: 1rem;
  width: 80px;
}

.navbar-iniciarSesion {
  border-bottom: 4px solid #83755b;
  border-radius: 5px 5px 0;
  margin: 0 10px 0 20px;
  font-weight: bold;
  color: #1e3745;
}

.v-btn:not(.v-btn--round).v-size--default {
  background-color: #ffcdd2;
  border-radius: 10px;
  margin: 12px 0;
}

/* footer */

.footer-p {
  font-family: "Carter One", cursive;
  font-size: 20px;
  margin-bottom: 0;
}
@media (min-width: 700px) and (max-width: 2000px) {
  .v-toolbar__content .v-btn.v-btn--icon.v-size--default,
  .v- {
    display: none;
  }
}
@media (min-width: 1000px) and (max-width: 2000px) {
  /* .text-about {
     margin-left: 20px;
 max-width: 600px;
 
  
} */
}
@media (min-width: 0px) and (max-width: 700px) {
  .navbar-link {
    display: none;
  }
  .titulo,
  .textos-hero h1 {
    font-size: 30px;
    text-align: center;
  }

  .textos-hero p {
    font-size: 20px;
    text-align: center;
  }
  .color2 {
    margin-top: 100px;
  }
  .footer {
    text-align: center;
    padding: 20px;
  }
  .navbar-list {
    position: fixed;
    z-index: 5;
  }
  .text-about {
    margin-top: 30px;
    font: 1.2em;
     margin-left: 0;
  }
}



@media (min-width: 700px) and (max-width: 900px) {
  .container-formulario-contact {
    width: 700px;
    margin-top: 30px;
  }
  .text-about {
      margin-top: 30px;
    font: 1.2em;
     margin-left: 0;
  max-width: none;
  
}
  
  .container-form-contact {
    margin: auto;
    width: 90%;
  }
  
}
@media (min-width: 900px) and (max-width: 1100px) {
 
  .text-about {
      margin-top: 30px;
    font: 1.2em;
     margin-left: 0;
  }
  
}


</style>