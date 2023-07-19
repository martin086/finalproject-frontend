import {Link} from "react-router-dom";
import { useDarkModeContext } from "../../context/DarkModeContext";
//Generamos la Card de Producto

const Item = ({prod}) => {
    const {darkMode} = useDarkModeContext();
    
    return (
        // <div className="card-group">
            <div className={`card cardProducto py-2 ${darkMode ? 'text-white bg-secondary' : 'border-light'}`}>
                <img src={prod.thumbnail} className="card-img-top" alt="..." />
                <div className={`card-body ${darkMode ? 'cardBodyDark' : 'cardBody'}`}>
                    <h5 className="card-title">{prod.title}</h5>
                    <p className="card-text">{prod.description}</p>
                    <p className="card-text">${new Intl.NumberFormat('de-DE').format(prod.price)}</p>
                    <button className="btn btn-dark"><Link className="nav-link" to={`/products/${prod._id}`}>Ver Producto</Link></button>
                </div>
            </div>
        //  </div>
    );
}

export default Item;
