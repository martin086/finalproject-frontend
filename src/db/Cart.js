const CART_API = 'http://localhost:8080/api/carts'
const HEADERS = { 'Content-Type': 'application/json' }


export async function getCart() {
    try {
        const cart = await fetch(`${CART_API}`, {
            method: 'GET',
            credentials: 'include',
            headers: HEADERS
        })
        if (cart.ok) {
        return cart.json()
        }
        return null
    } catch (error) {
        throw new Error(error)
    }
}

export async function emptyCart() {
    try {
        const cart = await fetch(`${CART_API}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: HEADERS
        })
        if (cart.ok) {
        return true
        }
        return false
    } catch (error) {
        throw new Error(error)
    }
}


export async function addProductToCart(productID) {
    try {
        const cart = await fetch(`${CART_API}/products/${productID}`, {
            method: 'POST',
            credentials: 'include',
            headers: HEADERS
        })

        if (cart.status === 201) {
        return true
        }
        return null
    } catch (error) {
        throw new Error(error)
    }
}


export async function updateAllCart(newCartContent) {
    try {
        const cart = await fetch(CART_API, {
            method: 'PUT',
            credentials: 'include',
            headers: HEADERS,
            body: JSON.stringify(newCartContent)
        })
        if (cart.status === 201) {
        return cart.payload
        }
        return null
    } catch (error) {
        throw new Error(error)
    }
}


export async function updateProdQtyCart(productID, newQty) {
    try {
        const cart = await fetch(`${CART_API}/products/${productID}`, {
            method: 'PUT',
            credentials: 'include',
            headers: HEADERS,
            body: JSON.stringify({ quantity: parseInt(newQty) })
        })
        if (cart.ok) {
        return cart.payload
        }
        return null
    } catch (error) {
        throw new Error(error)
    }
}

export async function removeProductCart(productID) {
    try {
        const cart = await fetch(`${CART_API}/products/${productID}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: HEADERS
        })
        if (cart.ok) {
        return cart.payload
        }
        return null
    } catch (error) {
        throw new Error(error)
    }
}

export async function createNewPurchase() {
    try {
        const response = await fetch(`${CART_API}/purchase`, {
            method: 'POST',
            credentials: 'include',
            headers: HEADERS
        })
        const ticket = await response.json()

        if (response.status === 201) {
        return ticket.invoice
        }
        if (response.status === 200) {
        return undefined
        }
        return null
    } catch (error) {
        throw new Error(error)
    }
}