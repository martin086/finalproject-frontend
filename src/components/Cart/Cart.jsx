import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { useContext } from "react";
import CartItem from "./CartItem";

const Cart = () => {
    const {darkMode} = useDarkModeContext()
    const {cart, clearCart, totalPrice, removeItemById} = useContext(CartContext)
    console.log(cart)
    return (
        <>
            {cart.length === 0 ?
            <>
                <h1 className={`mx-3 ${darkMode ? 'text-light' : 'text-dark'}`}>Carrito vacío</h1>
                <button className={`mx-3 btn mx-1 ${darkMode ? 'btn-secondary' : 'btn-warning'}`}><Link className="nav-link" to={"/products"}>Continuar comprando</Link></button>
            </>
            :
            <div className="container cartContainer">
                {cart &&
                    cart.map((item) => {
                        return <CartItem key={item._id} item={item} removeItemById={removeItemById} />
                    })
                }
                
                <div className={`border ${darkMode ? 'border-light' : 'border-dark'}`} style={{maxWidth: '25rem'}}>
                    <p className={`d-flex justify-content-center fw-bold m-1 ${darkMode ? 'text-light' : 'text-dark'}`}>Resumen de Compra: ${new Intl.NumberFormat('de-De').format(totalPrice)}</p>
                    <div className="container d-flex justify-content-center">
                    <button className="btn m-1 btn-danger" onClick={clearCart}><i className="me-2 fa-solid fa-cart-arrow-down"></i>Vaciar</button>
                    <button className={`btn m-1 ${darkMode ? 'btn-secondary' : 'btn-warning'}`}><i className="fa-solid fa-basket-shopping"></i><Link className="nav-link" to={"/"}>Agregar</Link></button>
                    <button className={`btn m-1 ${darkMode ? 'btn-primary' : 'btn-success'}`}><i className="fa-solid fa-money-bill"></i><Link className="nav-link" to={"/checkout"}>Checkout</Link></button>
                    </div>
                </div>    
            </div>
            }
        </>
    );
}

export default Cart;