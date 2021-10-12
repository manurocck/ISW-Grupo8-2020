
window.onload = function () {
        // Variables
    const baseDeDatos = [
        {id: 1,nombre: 'Patata',precio: 1,imagen: 'imagenes/patatas.jpg'},
        {id: 2,nombre: 'Cebolla',precio: 1.2, imagen: 'imagenes/cebolla.jpg'},
        {id: 3,nombre: 'Calabacin',precio: 2.1,imagen: 'imagenes/calabacin.jpg'},
        {id: 4,nombre: 'Fresas',precio: 0.6,imagen: 'imagenes/fresas.jpg'},
        {id: 5,nombre: 'Zapallo',precio: 5.5,imagen: 'imagenes/zapallo.jpg'},
        {id: 6,nombre: 'Bananas',precio: 2.0,imagen: 'imagenes/bananas.jpg'}
        ];

    let carrito = [];
    let total = 0;
    const DOMitems       = document.querySelector('#items');
    const DOMcarrito     = document.querySelector('#carrito');
    const DOMtotal       = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');

    // Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = info.precio + '$';
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.setAttribute('background-color', '#987d7c');
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }
    // Evento para añadir un producto al carrito de la compra
    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
                // Calculo el total
                calcularTotal();
    // Actualizamos el carrito 
        renderizarCarrito();
    }
    //Dibuja todos los productos guardados en el carrito
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {return itemBaseDatos.id === parseInt(item);});              // ¿Coincide las id? Solo puede existir un caso
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {return itemId === item ? total += 1 : total;}, 0); // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}$`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            miBoton.setAttribute('id', "btn-peligro");
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
    }
    //Evento para borrar un elemento del carrito
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {return carritoId !== id;});
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos de nuevo el precio
        calcularTotal();
    }
    //Calcula el precio total teniendo en cuenta los productos repetidos
    function calcularTotal() {
        // Limpiamos precio anterior
        total = 0;
        // Recorremos el array del carrito
        carrito.forEach((item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {return itemBaseDatos.id === parseInt(item);});
            total = total + miItem[0].precio;
        });
        // Renderizamos el precio en el HTML
        DOMtotal.textContent = total.toFixed(2);
    }
    //Varia el carrito y vuelve a dibujarlo
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        calcularTotal();
    }
    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    // Inicio
    renderizarProductos();
}