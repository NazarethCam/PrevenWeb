import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase/config.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  query,
  getDocs,
  where,
  
  deleteDoc
} from "firebase/firestore";

initializeApp(firebaseConfig);

const db = getFirestore();

const col = "RegistroTrabajador";
const col2 = "users";
const col1 = "Ubicacion";

// Agregar datos
const agregarDatos = async (data, callback) => {
  try {
    const docRef = await addDoc(collection(db, col ), data);
    console.log("Document written with ID: ", docRef.id);
    callback();
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Error adding document");
  }
};
const agregarUbicacion = async (data, callback) => {
  try {
    const docRef = await addDoc(collection(db,  col1 ), data);
    console.log("Document written with ID: ", docRef.id);
    callback();
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Error adding document");
  }
};

// listar datos o Leer datos en este punto se modifico para recibir la informacion firabase  se agrego un callback
const listarDatos = async (callback) => {
  const q = query(collection(db, col));
  try {
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    callback(data);
  } catch (e) {
    console.log("Error", e);
  }
};


const listarUbicacion = async (callback) => {
  const q = query(collection(db, col1));
  try {
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    callback(data);
  } catch (e) {
    console.log(e);
  }
};
// Ordenar
const obtenerDato = async (param, guardarRole) => {
  const q = query(collection(db, col2), where("email", "==", param));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      guardarRole(doc.data().role)
    });
  } catch (e) {
    console.log(e);
  }
};

// Actualizar datos
const actualizarDato = async (id,data) => {
  try {
    await setDoc(doc(db, col, id), data);

  } catch (e) {
    alert("Error agregando documento");
  }
};

// Borrar datos
const borrarDato = async (id) => {
  try {
    await deleteDoc(doc(db, col, id));
    alert("Trabajador borrado");
  } catch (e) {
    console.log(e);
  }
};

//Borrar ubicacion
const borrarubicacion = async (id) => {
  try {
    await deleteDoc(doc(db, col1, id));

  } catch (e) {
    console.log(e);
  }
};

export { agregarDatos, listarDatos, obtenerDato, actualizarDato, borrarDato, agregarUbicacion, listarUbicacion, borrarubicacion };