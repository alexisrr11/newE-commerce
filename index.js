//Toggle Menu Sidebar
const toggleSidebar = document.querySelector(".open-side");
const hiddenSide = document.querySelectorAll(".sidebar__hide");

toggleSidebar.addEventListener("click", () => {
    hiddenSide.forEach(element => {
        element.classList.toggle("sidebar__hide");
    });
});

//Desplazamiento href 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

/*
// Función para filtrar productos en tiempo real
function filtrarProductos() {
    const textoBusqueda = searchInput.value.toLowerCase();
    const productosFiltrados = todosLosProductos.filter(producto =>
        producto.nombre.toLowerCase().includes(textoBusqueda)
    );

    productosArray(productosFiltrados);

    restaurarLikes();
}

// Evento para ejecutar la búsqueda mientras se escribe
searchInput.addEventListener("input", filtrarProductos);

// Renderizar todos los productos inicialmente
productosArray(todosLosProductos);

//Constantes principales e interación con el DOM
const hideText_btn = document.getElementById("hideText_btn");
const hideText = document.getElementById("hideText");
const toggleLikesModal_btn = document.getElementById("toggleLikesModal_btn");
const toggleLikesModal = document.getElementById("toggleLikesModal");
const cartContainer = document.getElementById("cartContainer");
const productsContainer = document.getElementById("productsContainer");
const totalPriceElement = document.getElementById("totalPrice");


let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
let likedProducts = JSON.parse(localStorage.getItem("liked")) || [];

cartProducts = cartProducts.map(product => ({
    ...product,
    quantity: product.quantity || 1
}));

//Apertura y cierre de los modals Carrito y Likes
function toggleModal(openButton, modal, closeButton) {
    openButton.addEventListener("click", () => modal.classList.toggle("show"));

    closeButton.addEventListener("click", () => {
        modal.classList.remove("show");
    });
}

toggleModal(hideText_btn, hideText, document.querySelector(".close-modal-cart"));
toggleModal(toggleLikesModal_btn, toggleLikesModal, document.querySelector(".close-modal-likes"));


//Se añade productos al carrito
function updateCartUI() {
    cartContainer.innerHTML = "";
    let totalPrice = 0;

    cartProducts.forEach((product, index) => {
        totalPrice += product.price * product.quantity;

        const productItem = document.createElement("div");
        productItem.classList.add("cart-product");
        productItem.innerHTML = `
                <span class="price">$${product.price}</span>
                <img src="${product.image}" alt="${product.name}" width="50">
                <p>${product.name}</p>
                
                <span class="quantity">${product.quantity}</span>
                <div>
                    <button class="decrease" data-index="${index}">-</button>
                    <button class="increase" data-index="${index}">+</button>
                </div>
                <button class="remove" data-index="${index}">Eliminar</button>
            `;
        cartContainer.appendChild(productItem);
    });

    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    localStorage.setItem("cart", JSON.stringify(cartProducts));

    document.querySelectorAll(".increase").forEach(btn => btn.addEventListener("click", increaseQuantity));
    document.querySelectorAll(".decrease").forEach(btn => btn.addEventListener("click", decreaseQuantity));
    document.querySelectorAll(".remove").forEach(btn => btn.addEventListener("click", removeProduct));
} */