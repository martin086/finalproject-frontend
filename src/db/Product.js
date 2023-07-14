const PRODUCTS_API = 'http://localhost:8080/api/products';


export const getProducts = async (limit, page, category, stock, sort) => { //Verificados en la funcion principal
    try {
        const params = {
            limit: limit ? `limit=${limit}&` : '10',
            page: page ? `page=${page}&` : '1',
            category: category ? `category=${category}&` : '',
            stock: stock ? `stock=${stock}&` : '',
            sort: sort ? `sort=${sort}&` : '',
        }

        const productsQuery = `${PRODUCTS_API}?${params.category}${params.limit}${params.page}${params.stock}${params.sort}`;
        const response = await fetch(productsQuery);
        return await response.json()
    } catch (error) {
        throw new Error(error)
    }
}

export const getProductById = async (id) => {
    try {
        const productsQuery = `${PRODUCTS_API}/${id}`
        const response = await fetch(productsQuery)
        if (response.ok) {
            return await response.json()
        }
        return null
    } catch (error) {
        throw new Error(error)
    }
}


export const createProduct = async (producto) => {
    //Verificacion si existe el producto
    if (getProductById(producto.id)) {
        
    } else {
        const response = await fetch(`${PRODUCTS_API}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                //"Authorization": "bearer TOKEN" CONTROLES DE RUTAS(usuarios logueados)
            },
            body: JSON.stringify(producto)//
        })
        const message = await response.json()
        return message
    }
}

export const updateProduct = async (producto) => {
    //Verificacion si existe el producto
    if (getProductById(producto.id)) {
        const response = await fetch(`${PRODUCTS_API}/${producto.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
                //"Authorization": "bearer TOKEN" CONTROLES DE RUTAS(usuarios logueados)
            },
            body: JSON.stringify(producto)//
        })
        const message = await response.json()
        return message
    } else {
        //Error

    }
}

export const deleteProduct = async (id) => {
    //Verificacion si existe el producto
    if (getProductById(producto.id)) {
        const response = await fetch(`${PRODUCTS_API}/${producto.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
                //"Authorization": "bearer TOKEN" CONTROLES DE RUTAS(usuarios logueados)
            },
            body: ""
        })
        const message = await response.json()
        return message
    } else {
        //Error

    }
}