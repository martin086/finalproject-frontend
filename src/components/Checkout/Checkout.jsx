import {useContext, useState, React} from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../../db/Product';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import OrderForm from './Form/OrderForm';
import { OrderConfirm } from './OrderConfirm';
import { UserContext } from '../../context/UserContext';


const Checkout = () => {
    const {totalPrice, cart, clearCart, purchaseCart} = useContext(CartContext);
    const {userData} = useContext(UserContext)
    const [orderData, setOrderData] = useState(null);
    const navigate = useNavigate();

    const consultarFormulario = async (cliente) => {
        
        try {
            const aux = [...cart]
        aux.forEach(prodCarrito => {
            getProductById(prodCarrito.id).then(prodBDD => {
                if(prodBDD.stock >= prodCarrito.cant) {
                    prodBDD.stock -= prodCarrito.cant
                    updateProduct(prodCarrito.id, prodBDD)
                } else {
                    toast.error(`El producto ${prodBDD.nombre} no tiene stock disponible.`)
                    clearCart() //removeItem(prodBDD.id)
                    navigate("/")
                }
            })
        })

        // Trigger the purchaseCart function.
        const order = await purchaseCart();
        console.log(order)
        console.log(cliente)
        // Store the order data in the state.
        setOrderData(order);
        // Navigate to the '/orderconfirm' route after a successful purchase
        navigate('/orderconfirm');
        toast.success(`¡Gracias por su compra! Su n° de orden es: ${order.id}`)
        } catch (error) {
            toast.error("Su orden no pudo ser generada.");
            console.error('Error during checkout:', error)
        }
    };
    

    return (
        <div className="container">
            {orderData ? (
                <OrderConfirm order={orderData} />
            ) : (
                <OrderForm sendOrder={consultarFormulario}/>
            )}
        </div>
    );
}

export default Checkout;