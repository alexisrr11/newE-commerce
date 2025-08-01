//Apertura y cierre de los modals Carrito y Likes
const toggleLikesModal_btn = document.getElementById("toggleLikesModal_btn");
const toggleLikesModal = document.getElementById("toggleLikesModal");

function toggleModal(openButton, modal, closeButton) {
    openButton.addEventListener("click", () => modal.classList.toggle("show"));

    closeButton.addEventListener("click", () => {
        modal.classList.remove("show");
    });
}

toggleModal(hideText_btn, hideText, document.querySelector(".close-modal-cart"));
toggleModal(toggleLikesModal_btn, toggleLikesModal, document.querySelector(".close-modal-likes"));