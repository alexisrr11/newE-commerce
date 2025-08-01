import {filtrarProductos} from './filtroBuscarProducto.js';
import { restaurarLikes } from './likesProductos.js';

const todosLosProductos = document.getElementById("nuevosProductos");
let productosAPI = []; 

try {
    fetch("../productosArray.json")
    .then(res => res.json())
    .then(data => {
        renderizarProdcutos (data);
        restaurarLikes();
        productosAPI = data;
    })
    searchInput.addEventListener("input", () => {
      filtrarProductos(productosAPI, searchInput);
      restaurarLikes();
    });
} catch (error) {
    console.error(error)
}

export function renderizarProdcutos (productos) {
    todosLosProductos.innerHTML = ""; 

    productos.forEach(producto => {
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "cards";
        nuevoProducto.innerHTML = `
            <div class="card">
                <img src="images/${producto.id}.png" alt="">
                <div class="name-price">
                    <h3> ${producto.nombre} </h3>
                    <h3><em>$${producto.precio}</em></h3>
                </div>
                <p>${producto.descripcion}</p>
                <div class="like-btn">
                    <a class="add-to-likes"><i class='bx bx-heart'></i></a>
                    <button class="add-to-cart">Agregar al carrito</button>
                </div>
            </div>
        `;
        todosLosProductos.appendChild(nuevoProducto);
    }
)}
