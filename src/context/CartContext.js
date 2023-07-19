import { createContext, useState, useEffect } from 'react';
import { getCart, emptyCart, addProductToCart, updateProdQtyCart, removeProductCart, createNewPurchase } from '../db/Cart';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        setTotalItems(cart.reduce((previous, current) => previous + current.quantity, 0));
        setTotalPrice(cart.reduce((previous, current) => previous + current.quantity * current.price, 0));
    }, [cart]);

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        fetchCart();
    }, [ticket]);

    async function fetchCart() {
        try {
            const fetchedCart = await getCart();

            if (Array.isArray(fetchedCart.cart)) {
                const newCart = [];

                for (const product of fetchedCart.cart.products) {
                    const newObject = {
                        ...product.productId,
                        quantity: product.quantity,
                    };
                    newCart.push(newObject);
                }

                setCart(newCart);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }

    async function addToCart(item, qty) {
        if (isInCart(item._id)) {
            // * Local management
            let index = cart.findIndex((elem) => elem._id === item._id);
            let product = cart[index];
            product.quantity += qty;
            const newCart = [...cart];
            // Elimina el elemento con qty anterior e inserta qty actualizada
            newCart.splice(index, 1, product);
            setCart([...newCart]);

            // * Remote management
            try {
                await updateProdQtyCart(item._id, product.quantity);
            } catch (error) {
                console.error('Error adding to the cart: ', error);
            }
        } else {
            // * Local management
            setCart([...cart, { ...item, quantity: qty }]);
            // * Remote management
            try {
                await addProductToCart(item._id);
                if (qty > 1) {
                    await updateProdQtyCart(item._id, qty);
                }
            } catch (error) {
                console.error('Error adding to the cart: ', error);
            }
        }
    }

    async function removeItemById(id) {
        // Elimina el producto y el total de sus unidades
        const newCart = [...cart];
        let index = newCart.findIndex((elem) => elem._id === id);
        newCart.splice(index, 1);
        setCart([...newCart]);

        try {
            await removeProductCart(id);
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    }

    async function clearCart() {
        setCart([]);

        try {
            await emptyCart();
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }

    const isInCart = (productID) => {
        return cart.some((item) => item._id === productID);
    };

    async function purchaseCart() {
        try {
            const purchaseResult = await createNewPurchase();
            if (purchaseResult) {
                setTicket(purchaseResult);
            }
        } catch (error) {
            console.error('Error on purchase process:', error);
        }
    }

    return (
        <CartContext.Provider value={{
                cart,
                fetchCart,
                setCart,
                addToCart,
                removeItemById,
                clearCart,
                totalPrice,
                setTotalPrice,
                totalItems,
                ticket,
                purchaseCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};