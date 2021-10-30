import React,{useState,useEffect} from 'react'
import { ProductsForm } from './ProductsForm';
import { app } from '../fb';
import { SingleProduct } from './SingleProduct';

export const Home = () => {

const [docus, setDocus] = useState([]);

useEffect(async () => {
    const docuList = await app.firestore().collection("archivos").get();
    setDocus(docuList.docs.map((doc) => doc.data()));
}, []);

    return (
        <div>
            <div>
                <ProductsForm />
            </div>
            <div className="productsgrid">
            {
                docus.map((doc)=>(
                
                    <SingleProduct  imagen={doc.url} nombre={doc.nombre} descripcion={doc.descripcion} precio={doc.precio} key={doc.nombre} />
                
                ))
            }
            </div>        
        </div>
    )
}
