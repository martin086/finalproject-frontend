import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

export const OrderConfirm = ({ orderData }) => {
    const { clearCart } = useContext(CartContext);
    return (
        <>
            <h1>La compra se ha generado correctamente!</h1>
            <h2>
                ID Compra: <b>{orderData.invoice_number}</b>
            </h2>
            <p>
                Monto: <b>$ {orderData.total_amount}</b>
            </p>
            <p>Comprador: {orderData.purchaser}</p>
            <p>Fecha y hora de la transacción: {orderData.purchase_time}</p>
            <Link to={'/'}>
                <Button onClick={() => clearCart} variant="outline-primary">
                    Volver a Home
                </Button>
            </Link>
        </>
    );
};