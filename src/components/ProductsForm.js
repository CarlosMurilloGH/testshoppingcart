import React,{useEffect, useState} from 'react';
import { app } from '../fb';

export const ProductsForm = () => {

  const [archivoUrl,setArchivoUrl]=useState(null);
  const [docus,setDocus]=useState([]);

  const archivoHandler = async (e) => {
    const archivo = e.target.files[0];
    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo);
    console.log("archivo cargado:", archivo.name);
    const enlaceUrl = await archivoPath.getDownloadURL();
    setArchivoUrl(enlaceUrl);
    console.log(enlaceUrl)

  };


  const submitHandler = async (e) => {
    e.preventDefault();
    const nombreProducto = e.target.nombre.value;
    const descripcionProducto=e.target.descripcion.value;
    const precioProducto=e.target.precio.value;
    if (!nombreProducto) {
      alert("coloca un nombre");
      return;
    }
    const coleccionRef = app.firestore().collection("archivos");
    const docu = await coleccionRef
      .doc(nombreProducto)
      .set({ 
        nombre: nombreProducto,
        url: archivoUrl,
        descripcion:descripcionProducto,
        precio:Number(precioProducto),
      
      });
    // console.log("archivo cargado:", nombreProducto, "url:", archivoUrl);
    window.location = "/";

  };

  useEffect(async()=>{
    const docuList=await app.firestore().collection("archivos").get();
    setDocus(docuList.docs.map((doc)=>doc.data() ));
  },[])

  
return(
  <form onSubmit={submitHandler} className="productform">
  <label className="uploadbutton">
  <input type="file" onChange={archivoHandler}/>
  </label>
  <input type="text" name="nombre" placeholder="nombre del producto" className="inputform"/>
  <input type="text" name="descripcion" placeholder="descripcion del producto"className="inputform"/>
  <input type="number" name="precio" placeholder="precio del producto" className="inputform"/>
  <button className="buttonform" >Subir producto</button>
</form>
);
}