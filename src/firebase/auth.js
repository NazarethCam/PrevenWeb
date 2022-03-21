import { initializeApp } from "firebase/app";
import firebaseConfig from "./config.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

initializeApp(firebaseConfig);

const auth = getAuth();

// Registrar usuario
const registrarUsuario = (email, password, callback) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);

      callback();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);

      callback(errorCode);

    });
};

// Login
const login = (email, password, callback, guardarEmail ) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      guardarEmail(user.email);
      // guardarEmailreg(user.usuario);

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);

      callback(errorCode);
    });
};
// Password reset email sent!
const forgotPassword = (email, callback) => {
  sendPasswordResetEmail(auth, email)
  .then((userCredential) => {

    const user = userCredential.user;
    console.log(user);
    
    callback();
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
};

// Logout
const logout = () => {
  signOut(auth)
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Observador
const observador = (to, next) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Aca entra cuando esta logeado
      if (to.path === "/login" || to.path === "/forgotPassword") {
        next("/home"); //redirige
      } else {
        next(); //Entra (en este caso al HOME)
      }
    } else {
      // Aca envía a login o sino a olvidó contraseña
      if ( to.path !== "*" &&to.path !== "/login" && to.path !== "/forgotPassword" && to.path !== "/" ) {
        next("/login");
      } else {
        next(); // En este caso entra al login
      }
    }
  });
};

export { registrarUsuario, login, forgotPassword, logout, observador };