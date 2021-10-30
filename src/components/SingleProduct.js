import React from 'react';
import { app } from '../fb';


export const SingleProduct = (props) => {

    const {imagen,nombre,descripcion,precio} =props;

    const handleClick=()=>{
        console.log(nombre)
    }


    const onDeleteLink=async()=>{
        if(window.confirm("estas seguro de liminar este producto?")){
            await app.collection("archivos").doc(nombre).delete();  //codigo para borrar el item,teniendo seleccionado el id
        }
    };


    return (
        <div className="productcard" onClick={handleClick}>
            <img className="productcardimg" src={imagen} alt={nombre} style={{width:"200px"}}/>
            <p className="productcardnombre">{nombre}</p>
            <p className="productcarddescripcion">{descripcion}</p>
            <p className="productcardprecio">S/.{precio}</p>
            <button className="productcardcomprar">Comprar</button>
            <button onClick={onDeleteLink}>eliminar</button>
        </div>
    )
}
