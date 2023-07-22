import { useDarkModeContext } from "../../context/DarkModeContext";

const CartItem = ({ item, removeItemById }) => {
    const {darkMode} = useDarkModeContext()

    return (
        <div className="card mb-3" key={item._id} item={item}  style={{maxWidth: '26rem'}}>
            <div className="row g-0 justify-content-center">
                <div className="col-md-4">
                    <img src={item.thumbnail} alt="Producto" className="img-fluid rounded-start my-3" />
                </div>
            </div>
            <div className="col-md">
                <div className={`card-body ${darkMode ? 'cardBodyDark' : 'cardBody' }`}>
                    <h5 className="card-title">{`${item.title} ${item.description}`}</h5>
                    <p className="card-text">Cantidad: {item.quantity}</p>
                    <p className="card-text">Precio Unitario: ${new Intl.NumberFormat('de-De').format(item.price)}</p>
                    <p className="card-text">Valor Total: ${new Intl.NumberFormat('de-De').format(item.price * item.quantity)}</p>
                </div>
                <button className="btn btn-danger m-2" onClick={() => removeItemById(item._id)}>Eliminar Producto</button>
            </div>
        </div>
    );
};

export default CartItem;

/*
<div className="container cartContainer">
                {
                    cart.map(item => 
                        <div className="card mb-3" key={item._id} item={item}  style={{maxWidth: '26rem'}}>
                            <div className="row g-0 justify-content-center">
                                <div className="col-md-4">
                                    <img src={item.thumbnail} alt="Producto" className="img-fluid rounded-start my-3" />
                                </div>
                            </div>
                            <div className="col-md">
                                <div className={`card-body ${darkMode ? 'cardBodyDark' : 'cardBody' }`}>
                                    <h5 className="card-title">{`${item.title} ${item.description}`}</h5>
                                    <p className="card-text">Cantidad: {item.quantity}</p>
                                    <p className="card-text">Precio Unitario: ${new Intl.NumberFormat('de-De').format(item.price)}</p>
                                    <p className="card-text">Valor Total: ${new Intl.NumberFormat('de-De').format(item.price * item.quantity)}</p>
                                </div>
                                <button className="btn btn-danger m-2" onClick={() => removeItemById(item._id)}>Eliminar Producto</button>
                            </div>
                        </div>    
                    )
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
*/