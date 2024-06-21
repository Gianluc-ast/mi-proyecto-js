let carrito = [];

const agregarAlCarrito = (codigo) => {
    const producto = listaProductos.find(producto => producto.codigo === codigo);
    if (producto) {
        carrito.push(producto);
        guardarCarrito();
        mostrarCarrito();
    } else {
        mostrarMensajeError('Producto no encontrado');
    }
};

const guardarCarrito = () => {
    try {
        const carritoJson = JSON.stringify(carrito);
        localStorage.setItem('carrito', carritoJson);
    } catch (error) {
        mostrarMensajeError('Error al guardar el carrito');
    }
};

const mostrarCarrito = () => {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
    carrito.forEach(producto => {
        const productElement = document.createElement('div');
        productElement.textContent = `Producto en carrito: ${producto.nombre} - Precio: ${producto.precio}`;
        resultadoDiv.appendChild(productElement);
    });
};

document.getElementById('btnCarrito').addEventListener('click', mostrarCarrito);
