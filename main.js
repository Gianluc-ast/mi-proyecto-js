let listaProductos = [];

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});

// Carga productos desde el localStorage o inicializa con datos de 'products.json'
const cargarProductos = async () => {
    const productosRecuperados = JSON.parse(localStorage.getItem('productos'));
    if (productosRecuperados) {
        listaProductos = productosRecuperados;
    } else {
        try {
            const response = await fetch('products.json');
            const productos = await response.json();
            listaProductos = productos;
            localStorage.setItem('productos', JSON.stringify(productos));
        } catch (error) {
            mostrarMensajeError('Error al cargar los productos');
        }
    }
};

// Añade un nuevo producto a la lista y guarda en localStorage
const productoNuevo = (codigo, nombre, precio) => {
    const producto = { codigo, nombre, precio };
    listaProductos.push(producto);
    guardarProductos();
    mostrarProductos();
};

// Guarda la lista de productos en el localStorage
const guardarProductos = () => {
    try {
        const productosJson = JSON.stringify(listaProductos);
        localStorage.setItem('productos', productosJson);
    } catch (error) {
        mostrarMensajeError('Error al guardar los productos');
    }
};

// Muestra todos los productos en el DOM
const mostrarProductos = () => {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
    listaProductos.forEach(producto => {
        const productElement = document.createElement('div');
        productElement.textContent = `Producto: ${producto.nombre} - Precio: ${producto.precio}`;
        resultadoDiv.appendChild(productElement);
    });
};

// Busca un producto por nombre o código y muestra en el DOM
const buscarProducto = (nombreOcodigo) => {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
    const productoEncontrado = listaProductos.find(producto => producto.nombre.toLowerCase() === nombreOcodigo.toLowerCase() || producto.codigo === nombreOcodigo);
    if (productoEncontrado) {
        const productElement = document.createElement('div');
        productElement.textContent = `El producto ${productoEncontrado.nombre} está en la lista.`;
        resultadoDiv.appendChild(productElement);
    } else {
        mostrarMensajeError('Producto no encontrado');
    }
};

// Muestra mensajes de error en el DOM
const mostrarMensajeError = (mensaje) => {
    const resultadoDiv = document.getElementById('resultado');
    const errorElement = document.createElement('div');
    errorElement.textContent = mensaje;
    resultadoDiv.appendChild(errorElement);
};

// Eventos para botones de la interfaz
document.getElementById('btnAnadir').addEventListener('click', () => {
    const codigo = document.getElementById('codigo').value;
    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value); // Asegurarse de convertir a número
    productoNuevo(codigo, nombre, precio);
    document.getElementById('codigo').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
});

document.getElementById('btnListar').addEventListener('click', mostrarProductos);

document.getElementById('btnBuscar').addEventListener('click', () => {
    const nombreOcodigo = document.getElementById('buscar').value;
    buscarProducto(nombreOcodigo);
    document.getElementById('buscar').value = '';
});
