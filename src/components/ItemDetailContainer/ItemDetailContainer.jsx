import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import { getProductById } from "../../db/Product";
import { useDarkModeContext } from "../../context/DarkModeContext";


const ItemDetailContainer = () => {
    const [producto, setProducto] = useState();
    const {id} = useParams()
    const {darkMode} = useDarkModeContext()
    useEffect(() => {
        getProductById(id)
        .then(prod => setProducto(prod))
        .catch(error => {
            console.error("Error fetching product:", error);
            setProducto(null);
        });
    }, [id]);

    console.log(producto)

    return (
        <div className={`card mb-3 container itemDetail ${darkMode ? 'text-white bg-secondary' : 'border-light' }`}>
            {producto ? <ItemDetail item={producto} /> : <p>Product not found or error occurred.</p>}
        </div>
    );
}

export default ItemDetailContainer;
