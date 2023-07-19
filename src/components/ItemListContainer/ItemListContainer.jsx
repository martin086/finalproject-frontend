import { useState, useEffect, useContext } from "react";
import ItemList from "../ItemList/ItemList";
import { logout } from "../../db/Session";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts } from "../../db/Product";
import { UserContext } from "../../context/UserContext";

//import { consultarBDD } from "../../assets/funciones.js";
//import { cargarBDD, getProductos, getProducto, updateProducto, deleteProducto } from "../../assets/firebase";

//Consultar BDD

const ItemListContainer = () => {

  const [productos, setProductos] = useState([]);
  const { category } = useParams();
  const { userData, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState(null);
  
    const fetchProducts = async (page) => {
      try {
        const productsData = await getProducts()
        
          if(productsData) {
            if(category) {
              const productsList = productsData
                .filter((prod) => prod.stock > 0)
                .filter((prod) => prod.idCategoria === parseInt(category))
                .sort((p1, p2) => p1.idCategoria - p2.idCategoria);
            setProductos(productsList);
            } else {
              const productsList = productsData
              .filter((prod) => prod.stock > 0);
              setProductos(productsList);
            }
          } else {
            console.error("No products data found.");
          }
      } catch (error) {
          console.error("Error fetching products:", error);
      }
    };

    useEffect(() => {
      fetchProducts(); // Fetch initial page (page 1) when the component mounts
    }, [category]);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setUser((newUserData) => newUserData ? { ...newUserData, cart_id: null } : null); // Clear the userData in the UserContext
      navigate('/login'); // Redirect to '/login' after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!userData) {
    navigate('/login')
    return null;
  }
  console.log(userData);
  
  return (
      
    <>
      <div>
        <p>Bienvenido {userData.user.first_name}, tu rol es: {userData.user.role}.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="row cardProductos card-img-top">
      <ItemList productsList={productos} />
      </div>
      <div>
        {pagination && (
          <div>
            {pagination.hasPrevPage && (
              <button onClick={() => fetchProducts(pagination.prevPage)}>
                Previous
              </button>
            )}
            {pagination.hasNextPage && (
              <button onClick={() => fetchProducts(pagination.nextPage)}>
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ItemListContainer;
