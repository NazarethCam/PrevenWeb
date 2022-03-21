import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage"
import firebaseConfig from "./config.js";
initializeApp(firebaseConfig);

const storage = getStorage();


const uploadFile  = (file, name, callback)=> {

    const fileRef = ref(storage, name)
    console.log(fileRef)
    uploadBytes(fileRef, file)
        .then((snapshot)=> {
            console.log('File uploaded', snapshot )
            callback()
        })
        .catch((error)=> {
            console.log(error)
        })
}

const listFiles = (setList)=> {

    const listRef = ref(storage, '')
    listAll(listRef)
        .then((res)=> {
            let files = []
            res.items.forEach((item)=> {
                files.push(item._location.path)
            })

            setList(files)
        })
        .catch((error)=> {
            console.log(error)
        })
}

const downloadFile = (name, download)=> {

    const pathRef = ref(storage, name)
    getDownloadURL(pathRef)
        .then((url)=> {
            console.log(url)

            download(name, url)
        })
        .catch((error)=> {
            console.log(error)
        })

}   
// Esta funcion toma la ID de la imagen y busca su URL. Usa async/await para que dentro del componente pueda actualizarse
const getImage = async(name)=> {
    const pathRef = ref(storage, name)
    let url = await getDownloadURL(pathRef)
    return url
}
const borraDoc = (id)=> {

// Crear una referencia al archivo a eliminar
const desertRef = ref(storage, id );

// Borrar el archivo
deleteObject(desertRef).then(() => {
    console. log ("doc eliminado")
    // alert("doc eliminado")
  // Archivo eliminado con exito
}).catch((error) => {
    console.log(error)
 // ¡Uh-oh, ocurrió un error!
});
}
export { uploadFile, listFiles, downloadFile, getImage, borraDoc }



