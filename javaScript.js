//Slider portada-ofertas
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider-header-image");
    const images = Array.from(slider.querySelectorAll("img"));
    const leftButton = slider.querySelector(".left");
    const rightButton = slider.querySelector(".right");
    let index = 0;

    function updateSlider() {
        images.forEach(img => img.style.display = "none");
        images[index].style.display = "block";
        img.style.transition = "opacity 0.5s ease-in-out";
    }

    function nextImage() {
        index = (index === images.length - 1) ? 0 : index + 1;
        updateSlider();
    }

    leftButton.addEventListener("click", function () {
        index = (index === 0) ? images.length - 1 : index - 1;
        updateSlider();
    });

    rightButton.addEventListener("click", function () {
        nextImage();
    });

    setInterval(nextImage, 5000);
    updateSlider();
});

//Slider marcas 
function initializeSlider() {
    if (window.matchMedia("(max-width: 500px)").matches) {
        const slider = document.querySelector('.slider-marcas');
        const images = document.querySelectorAll('.slider-marcas img');
        let index = 0;
        let startX = 0;
        let moveX = 0;

        function moveSlider() {
            index++;
            if (index >= images.length) {
                index = 0;
                slider.style.transition = "none";
                slider.style.transform = `translateX(0%)`;
                setTimeout(() => {
                    slider.style.transition = "transform 0.5s ease-in-out";
                });
            } else {
                slider.style.transform = `translateX(${-index * 100}%)`;
            }
        }

        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        slider.addEventListener('touchmove', (e) => {
            moveX = e.touches[0].clientX - startX;
        });

        slider.addEventListener('touchend', () => {
            if (moveX < -50) {
                moveSlider();
            }
        });

        setInterval(() => moveSlider(), 3000);
    }
}

if (window.matchMedia("(max-width: 500px)").matches) {
    initializeSlider();
}

window.addEventListener('resize', () => {
    if (window.matchMedia("(max-width: 500px)").matches) {
        initializeSlider();
    }
});

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

//Nuevos productos array 
const contenedorProductos = document.getElementById("nuevosProductos");
const searchInput = document.getElementById("searchInput");

// Función para renderizar productos en el DOM
function productosArray(productos) {
    contenedorProductos.innerHTML = ""; 

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
        contenedorProductos.appendChild(nuevoProducto);
    });
}

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
document.addEventListener("DOMContentLoaded", function () { 
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
    }

    function sendToWhatsApp() {
        let message = "¡Hola! Quisiera comprar los siguientes productos:\n\n";
        let total = 0;
    
        cartProducts.forEach(product => {
            const productTotal = product.quantity * product.price;
            total += productTotal;
            message += `- ${product.quantity} x ${product.name} ($${product.price.toFixed(2)} c/u) = $${productTotal.toFixed(2)}\n`;
        });
    
        message += `\nTotal a pagar: $${total.toFixed(2)}`;
        const phoneNumber = "1137659081"; // Tu número de WhatsApp
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
        window.open(whatsappURL, "_blank");
    }
    
    whatsappButton.addEventListener("click", sendToWhatsApp);
    
    // Agregar el evento a todos los botones "add-to-likes"
    document.addEventListener("click", function(event) {
        if (event.target.closest(".add-to-likes")) {
            addToLikes(event);
        }
    });

    document.addEventListener("click", function(event) {
        if (event.target.closest(".add-to-cart")) {
            addToCart(event);
        }
    });

    function addToCart(event) {
        const button = event.target;
        const card = button.closest(".card");
        const productName = card.querySelector("h3").textContent;
        const productImage = card.querySelector("img").src;
        const productPrice = parseFloat(card.querySelector("em").textContent.replace("$", "")); // Extraer el precio
    
        let existingProduct = cartProducts.find(p => p.name === productName);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cartProducts.push({ name: productName, image: productImage, price: productPrice, quantity: 1 });
        }
    
        updateCartUI();
        alert(`✅ ${productName} fue agregado al carrito! 🛒`);
    }

    // Aplicar funcionalidad a los botones de carrito
    /*document.querySelectorAll(".add-to-cart").forEach(button =>
        button.addEventListener("click", addToCart)
    );*/

    // Cargar carrito desde localStorage al iniciar
    updateCartUI();

    function increaseQuantity(event) {
        const index = event.target.dataset.index;
        if (cartProducts[index]) {
            cartProducts[index].quantity++;
            updateCartUI();
        }
    }

    function decreaseQuantity(event) {
        const index = event.target.dataset.index;
        if (cartProducts[index] && cartProducts[index].quantity > 1) {
            cartProducts[index].quantity--;
            updateCartUI();
        }
    }

    function removeProduct(event) {
        const index = event.target.dataset.index;
        if (cartProducts[index]) {
            cartProducts.splice(index, 1);
            updateCartUI();
        }
    }

    /*document.querySelectorAll(".add-to-cart").forEach(button =>
        button.addEventListener("click", addToCart)
    );*/

    updateCartUI();

    //crear elemento del modal likes
    function updateLikesUI() { 
        productsContainer.innerHTML = "";
    
        likedProducts.forEach((product) => {
            const productItem = document.createElement("div");
            productItem.classList.add("liked-product");
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" width="50">
                <p>${product.name}</p>
            `;
            productsContainer.appendChild(productItem);
        });
    
        localStorage.setItem("liked", JSON.stringify(likedProducts));
    
    }
    
    function addToLikes(event) {
        const button = event.target.closest(".add-to-likes");
        if (!button) return;
    
        card = button.closest(".card");
        productName = card.querySelector("h3").textContent;
        productImage = card.querySelector("img").src;
        const heartIcon = button.querySelector(".bx-heart");
    
        // Buscar el índice del producto en la lista de favoritos
        const productIndex = likedProducts.findIndex(product => product.name === productName);
    
        if (productIndex === -1) {
            // Si no está en la lista, agregarlo
            likedProducts.push({ name: productName, image: productImage });
            heartIcon.style.color = "red"; // Cambiar color a rojo
            alert(`❤️ ${productName} fue agregado a favoritos!`);
        } else {
            // Si ya está en la lista, eliminarlo
            likedProducts.splice(productIndex, 1);
            heartIcon.style.color = ""; // Restaurar color original
            alert(`💔 ${productName} fue eliminado de favoritos!`);
        }
    
        // Guardar en localStorage
        localStorage.setItem("liked", JSON.stringify(likedProducts));
    
        updateLikesUI();
    }
    
    // Cargar favoritos desde localStorage y aplicar color rojo
    document.addEventListener("DOMContentLoaded", () => {
        likedProducts = JSON.parse(localStorage.getItem("liked")) || [];
    
        document.querySelectorAll(".add-to-likes").forEach(button => {
            const productName = button.closest(".card").querySelector("h3").textContent;
            const heartIcon = button.querySelector(".bx-heart");
    
            if (likedProducts.some(product => product.name === productName)) {
                heartIcon.style.color = "red"; // Aplicar color rojo si está en favoritos
            }
        });
    });

    //Guardar en localStorage tanto los productos en el modal, como el color rojo
    likedProducts = JSON.parse(localStorage.getItem("liked")) || [];

    updateLikesUI();

    // Restaurar los corazones en rojo si el producto está en la lista de likes
    document.querySelectorAll(".add-to-likes").forEach(button => {
        const productName = button.closest(".card").querySelector("h3").textContent;
        const heartIcon = button.querySelector(".bx-heart");

        if (likedProducts.some(product => product.name === productName)) {
            heartIcon.style.color = "red";
        }
    });

    /* document.querySelectorAll(".add-to-likes").forEach(button =>
        button.addEventListener("click", addToLikes)
    ); */

    updateLikesUI();


    // Funciones para modificar cantidad y eliminar
    function increaseQuantity(event) {
        const index = event.target.dataset.index;
        cartProducts[index].quantity++;
        updateCartUI();
    }

    function decreaseQuantity(event) {
        const index = event.target.dataset.index;
        if (cartProducts[index].quantity > 1) {
            cartProducts[index].quantity--;
            updateCartUI();
        }
    }

    function removeProduct(event) {
        const index = event.target.dataset.index;
        cartProducts.splice(index, 1);
        updateCartUI();
    }

});

//restaura el color rojo
function restaurarLikes() {
    const likedProducts = JSON.parse(localStorage.getItem("liked")) || [];

    document.querySelectorAll(".add-to-likes").forEach(button => {
        const productName = button.closest(".card").querySelector("h3").textContent;
        const heartIcon = button.querySelector(".bx-heart");

        if (likedProducts.some(product => product.name === productName)) {
            heartIcon.style.color = "red"; // Aplica el color rojo si está en favoritos
        } else {
            heartIcon.style.color = ""; // Restaura el color original
        }
    });
}


//  debugger 