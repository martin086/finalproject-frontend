import ItemCount from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { CartContext } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ItemDetail = ({item}) => {
    const {darkMode} = useDarkModeContext()
    const {addToCart} = useContext(CartContext)

    const newItem = Object.values(item)
    const onAdd = (contador) => {
        addToCart(newItem[1], contador)
    }
    console.log(newItem)

    return (
        <div className="row g-0">
            <div className="col-md-4 imgBody">
                <img src={item.payload.thumbnail} alt="" className="img-fluid rounded-start"/>
            </div>
            <div className="col-md-8">
                <div className={`card-body ${darkMode ? 'cardBodyDark' : 'cardBody' }`}>
                    <h5 className="card-title">{item.payload.title}</h5>
                    <p className="card-text">Tipo: {item.payload.description} </p>
                    <p className="card-text">Precio: $ {new Intl.NumberFormat('de-DE').format(item.payload.price)} </p>
                    <p className="card-text">Stock: {item.payload.stock} </p>
                    <ItemCount inicial = {1} stock={item.payload.stock} onAdd={onAdd}/><br/>
                    <button className={`btn mt-2 btn-warning`}>
                    <Link className="nav-link" to={"/products"}><FontAwesomeIcon icon={faArrowLeft} /> Volver</Link>
                    </button>
                    <button className={`btn mt-2 ${darkMode ? 'btn-primary' : 'btn-secondary'}`}>
                        <Link className="nav-link" to={"/cart"}>Ir al Carrito</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;
