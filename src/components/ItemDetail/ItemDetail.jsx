import ItemCount from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { CartContext } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ItemDetail = ({item}) => {
    const {darkMode} = useDarkModeContext()
    const {addItem} = useContext(CartContext)
    const onAdd = (contador) => {
        addItem(item, contador)
    }
    console.log(item)

    return (
        <div className="row g-0">
            <div className="col-md-4 imgBody">
                <img src={item.imagen} alt="" className="img-fluid rounded-start"/>
            </div>
            <div className="col-md-8">
                <div className={`card-body ${darkMode ? 'cardBodyDark' : 'cardBody' }`}>
                    <h5 className="card-title">{item.nombre}</h5>
                    <p className="card-text">Tipo: {item.tipo} </p>
                    <p className="card-text">Precio: $ {new Intl.NumberFormat('de-DE').format(item.precio)} </p>
                    <p className="card-text">Stock: {item.stock} </p>
                    <ItemCount inicial = {1} stock={item.stock} onAdd={onAdd}/><br/>
                    <button className={`btn mt-2 ${darkMode ? 'btn-primary' : 'btn-secondary'}`}>
                        <Link className="nav-link" to={"/cart"}>Ir al Carrito</Link>
                    </button>
                    <button className={`btn mt-2 btn-warning`}>
                    <Link className="nav-link" to={"/products"}><FontAwesomeIcon icon={faArrowLeft} />Go Back</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;
