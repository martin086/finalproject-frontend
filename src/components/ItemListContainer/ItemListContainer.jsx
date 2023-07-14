import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams, useLocation } from "react-router-dom";
import { getProducts } from "../../db/Product";
import queryString from 'query-string';
//import { consultarBDD } from "../../assets/funciones.js";
//import { cargarBDD, getProductos, getProducto, updateProducto, deleteProducto } from "../../assets/firebase";

//Consultar BDD
const ItemListContainer = () => {

    const [products, setProducts] = useState([]);
    //const {category} = useParams()
    const [params, setParams] = useState({});
    const [isLoading, setLoading] = useState(true);
    
    const location = useLocation();
    async function queryProducts() {
      const { limit, page, category, stock, sort } = params;
      const response = await getProducts(limit, page, category, stock, sort);
      if (response.status === 'success') {
          setTimeout(() => {
              setLoading(false);
              setProducts(response.payload);
          }, 1000);
      }
    }

    useEffect(() => {
      const queryParams = queryString.parse(location.search);
      setParams(queryParams);
    }, [location.search]);

    useEffect(() => {
      setLoading(true);
      queryProducts();
    }, [params]);
    
    return (
        

      <ItemList products={products} />
          // <div className="row cardProductos card-img-top">
          //     {products}
          // </div>
        

    );
}

export default ItemListContainer;
