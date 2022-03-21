import Vue from "vue";
import VueRouter from "vue-router";

import { observador } from "../firebase/auth";
import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () =>
    import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
   
  },

  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  
  {
    path: '/ForgotPassword',
    component: () => 
      import(/* webpackChunkName: "ForgotPassword" */ "../views/ForgotPassword.vue"),
  },

  {
    path: "/",
    name: "PrevenWeb",
    component: () =>
      import(/* webpackChunkName: "PrevenWeb" */ "../views/PrevenWeb.vue"),
  },
  
  {
    path: "/formulario",
    name: "Formulario",
    component: () =>
      import(/* webpackChunkName: "formulario" */ "../views/Formulario.vue"),
      beforeEnter: (to, from, next) => { 
        console.log(store.state.role)
        if (store.state.role== "admin"){
          next()
        }else {
          next("/") 

        }
      }
  },

  {
    path: "/administrador",
    name: "Administrador",
    component: () =>
      import(/* webpackChunkName: "formulario" */ "../views/Administrador.vue"),
      beforeEnter: (to, from, next) => { 
        console.log(store.state.role)
        if (store.state.role== "admin"){
          next()
        }else {
          next("/home") 

        }
      }
  },

  {
    path: "/administrador/:id",
    name: "editar",
    component: () =>
      import(/* webpackChunkName: "administrador editar" */ "../views/EditarTrabajador.vue"),
      props: true,
  },

  {
    path: "/ubicacion",
    name: "Ubicacion",
    component: () =>
      import(/* webpackChunkName: "formulario" */ "../views/Ubicacion.vue"),
  },

  {
    path: '*',
    component: () => import( '../views/NotFound.vue'), 
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
//esto nos permite ejecutar una funcion ante que se realice la redirecion que va tomar 2 parametro(to, from, next) 
router.beforeEach((to, from, next) => {
  observador(to, next);
  //el codidigo de observador de encuentra auth.js
 


});
export default router;