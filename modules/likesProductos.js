const todosLosProductos = document.getElementById("nuevosProductos");
const productsContainer = document.getElementById("productsContainer");
let likedProducts = JSON.parse(localStorage.getItem("liked")) || [];

//Crear nuevo producto likeado
function updateLikesUI() {
  productsContainer.innerHTML = "";

  likedProducts.forEach(product => {
    const productItem = document.createElement("div");
    productItem.classList.add("liked-product");
    productItem.innerHTML = `
      <p>${product.name}</p>
      <img src="${product.image}" alt="${product.name}" width="50">
      <div class="btns-likes">
        <button>Agregar al Carrito</button>
        <button>Eliminar</button>
      </div>
      
    `;
    productsContainer.appendChild(productItem);
  });

  localStorage.setItem("liked", JSON.stringify(likedProducts));
}

//funcion para agregar productos likeados al modal
function addToLikes(event) {
  const button = event.target.closest(".add-to-likes");
  if (!button) return;

  const card = button.closest(".card");
  const productName = card.querySelector("h3").textContent;
  const productImage = card.querySelector("img").src;
  const heartIcon = button.querySelector("i");

  const productIndex = likedProducts.findIndex(p => p.name === productName);

  if (productIndex === -1) {
    likedProducts.push({ name: productName, image: productImage });
    heartIcon.style.color = "red";
    alert(`❤️ ${productName} fue agregado a favoritos!`);
  } else {
    likedProducts.splice(productIndex, 1);
    heartIcon.style.color = "";
    alert(`💔 ${productName} fue eliminado de favoritos!`);
  }

  localStorage.setItem("liked", JSON.stringify(likedProducts));
  updateLikesUI();
}

//Agrega color al boton add-to-like
export function restaurarLikes() {
  document.querySelectorAll(".add-to-likes").forEach(button => {
    const productName = button.closest(".card").querySelector("h3").textContent;
    const heartIcon = button.querySelector("i");

    if (likedProducts.some(p => p.name === productName)) {
      heartIcon.style.color = "red";
    } else {
      heartIcon.style.color = "";
    }
  });
}

todosLosProductos.addEventListener("click", addToLikes);

document.addEventListener("DOMContentLoaded", () => {
  updateLikesUI();
  restaurarLikes();
});

//Arreglar bugartoo