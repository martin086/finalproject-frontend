import { useState, useEffect, useContext } from "react";
import ItemList from "../ItemList/ItemList";
import { logout } from "../../db/Session";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getProducts } from "../../db/Product";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import queryString from 'query-string';


const ItemListContainer = () => {

  const [productos, setProductos] = useState([]);
  const { userData, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [params, setParams] = useState({});
  const [pagination, setPagination] = useState(null);
  
  const location = useLocation();

    const fetchProducts = async () => {
      try {
        const { page, limit, category, stock, sort } = params;
        const response = await getProducts({...params})

        if(response.status === 'success') {
            const productsList = response
            console.log(productsList)
            setProductos(response.payload);
            setPagination({
              page: response.page,
              totalPages: response.totalPages,
              prevLink: response.prevLink,
              nextLink: response.nextLink
            });
            setUser(userData.user)
          
        } else {
            console.error("No products data found.");
        }
      } catch (error) {
          console.error("Error fetching products:", error);
      }
    };

    useEffect(() => {
      const queryParams = queryString.parse(location.search);
      setParams(queryParams);
    }, [location.search, userData]);

    useEffect(() => {
      fetchProducts();
    }, [params]);

      // Function to handle pagination navigation
    const handlePaginationClick = (page) => {
      let navPage = page.slice(4);
      console.log(navPage)
      navigate(`${navPage}`);
    };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const logoutSession = await logout();
      if(logoutSession) {
        navigate('/login'); // Redirect to '/login' after logout
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!userData) {
    navigate('/login')
    return;
  }
  console.log(userData);
  
  return (
      
    <>
      <div className="fluid-container">
        <span>
          Bienvenido {userData.first_name}, tu rol es: {userData.role}.
        </span>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="row cardProductos card-img-top itemListContainer">
      <ItemList productsList={productos} />
      </div>
      {pagination && (
          <div className="pagination-container">
              <div className="row">
                  <div className="col">
                      {pagination.prevLink && (
                          <button onClick={() => handlePaginationClick(pagination.prevLink)} className="btn btn-primary">
                              Previous Page
                          </button>
                      )}
                  </div>
                  <div className="col text-right">
                      {pagination.nextLink && (
                          <button onClick={() => handlePaginationClick(pagination.nextLink)} className="btn btn-primary">
                              Next Page
                          </button>
                      )}
                  </div>
              </div>
              <p>Page {pagination.page} of {pagination.totalPages}</p>
          </div>
      )}
    </>
  );
}

export default ItemListContainer;
