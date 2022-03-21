import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { listarDatos, listarUbicacion } from "../firebase/firestore.js";

Vue.use(Vuex)


const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    //este registrotrabajador tambien se encuentra firestore const col = "RegistroTrabajador" CRUD;
    RegistroTrabajador: [],
   Ubicacion :[],
    email:"",
    role:"",
    loading: true,
  },
  getters:{
    filterTrabajador: (state) => (id) => {
      return state.RegistroTrabajador.filter((Registro)=>Registro.id === id)[0]
    },
    
  },
  mutations: {
//esto es para guardar el registroTrabajador CRUD
    getRegistroTrabajador(state, data) {
      state.RegistroTrabajador = data;
    },
    getUbicacion(state, data) {
      state.Ubicacion = data;
    },
    //esto es para guardar el email  que se encuentra en el login y se vea en navbar
    setEmail(state, data){
      state.email = data;

    },
    //Este codigo sirve para desaparecer  components navbar
    borrarEmail(state) {
      state.email = "";
    },
    prueba(state, data){
    state.role = data;
    },
    ActualizarTrabajador(state, data) {
      state.RegistroTrabajador[data.index] = data.Registro;
    }
  },
  actions: {
    //aqui se traer registro de trabajador firebase CRUD
    getData(context) {

      let guardarData = ( data ) => {
        context.commit("getRegistroTrabajador", data);
        
      }
      listarDatos(guardarData);
    },
    getubicacion1(context){

      let guardarUbicacion = ( data ) => {
        context.commit("getUbicacion", data);
        
      }
      listarUbicacion(guardarUbicacion);
    }
  },
   //aqui se traer registro de trabajador firebase CRUD
   
    
})
export default store;