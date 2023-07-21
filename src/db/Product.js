const PRODUCTS_API = 'http://localhost:8080/api/products' || 'https://finalproject-backend-rwbk.onrender.com/api/products';

export const getProducts = async (params) => { 
    try {
        const queryString = Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        
        const productsQuery = `${PRODUCTS_API}?${queryString}`;
        const response = await fetch(productsQuery, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const productsData = await response.json();
        return productsData;
    } catch (error) {
        throw new Error(error)
    }
}

// export const getProducts = async (limit, page, category, stock, sort) => { 
//     try {
//         const params = {
//             limit: limit ? `limit=${limit}&` : '',
//             page: page ? `page=${page}&` : '',
//             category: category ? `category=${category}&` : '',
//             stock: stock ? `stock=${stock}&` : '',
//             sort: sort ? `sort=${sort}&` : '',
//         }

//         const productsQuery = `${PRODUCTS_API}?${params.category}${params.limit}${params.page}${params.stock}${params.sort}`;
//         const response = await fetch(productsQuery, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//         })
//         const productsData = await response.json(); // Store the response in a variable
//         console.log(productsData);
//         //const productsArray = productsData.payload;
//         //console.log(productsArray)
//         return productsData;
//     } catch (error) {
//         throw new Error(error)
//     }
// }

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
    // eslint-disable-next-line no-undef
    if (getProductById(producto.id)) {
        // eslint-disable-next-line no-undef
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