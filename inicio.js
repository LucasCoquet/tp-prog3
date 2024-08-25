//ejercicio 2
const API_URL = "https://fakestoreapi.com/products";

//punto 1
const recuperarProducts = async () => {
    try {
        const datos = await fetch(API_URL);
        const productos = await datos.json();
        console.log("PRODUCTOS: ", productos);
    } catch (error) {
        console.log("Ocurrió un error", error);
    }
}

//punto2
const productsLimitados = async (product) => {
    try {
        const datos = await fetch(API_URL);
        const productos = await datos.json();
        
        const productosLimitados = [];
        let i = 0;
        while (i < product && i < productos.length) {
            productosLimitados.push(productos[i]);
            i++;
        }

        console.log(`MOSTRANDO LA CANTIDAD DE ${product} PRODUCTOS: `, productosLimitados);
    } catch (error) {
        console.log("Ocurrió un error", error);
    }
}

//punto3
const agregarProducto = async (nuevoProducto) => {
    try {
        const datos = await fetch('https://fakestoreapi.com/products', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(nuevoProducto) 
        });

        const productoAgregado = await datos.json(); 
        console.log("Producto agregado:", productoAgregado);
        return productoAgregado;
    } catch (error) {
        console.log("Ocurrió un error al agregar el producto:", error);  
    }
}

//punto 4
const retornarProductoId = async (productId) => {
    try {
        const datos = await fetch(API_URL);
        const productos = await datos.json();
        const producto = productos.find(p => p.id === productId);

        if (producto) {
            console.log(`Producto con el id: ${productId}`, producto);
        } else {
            console.log(`No se encontró el producto con el id: ${productId}`);
        }
    } catch (error) {
        console.log("Ocurrió un error", error);
    }
}

recuperarProducts();
productsLimitados(7);
const nuevoProducto = {
    title: 'Mens Winter Fleece Jacket',
    price: 65.99,
    description: 'High-quality fleece jacket, perfect for the cold winter months. Suitable for various activities like hiking, camping, or just casual daily wear. Designed with a comfortable fit and extra warmth, it’s an ideal gift for men during the holiday season.',
    category: "men's clothing",
    image: '',
    rating: { rate: 4.8, count: 320 }
};

agregarProducto(nuevoProducto);
retornarProductoId(7);


