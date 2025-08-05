const cartContainer = document.getElementById("cartContainer");
const totalPriceElement = document.getElementById("totalPrice");
let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];}

// Forzar que sea un array
if (!Array.isArray(cartProducts)) {
  cartProducts = [];
}

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

updateCartUI();
