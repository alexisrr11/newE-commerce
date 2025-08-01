const whatsappButton = document.getElementById("whatsappButton");

function sendToWhatsApp() {
    let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
    let message = "¡Hola! Quisiera comprar los siguientes productos:\n\n";
    let total = 0;

    cartProducts.forEach(product => {
        const productTotal = product.quantity * product.price;
        total += productTotal;
        message += `- ${product.quantity} x ${product.name} ($${product.price.toFixed(2)} c/u) = $${productTotal.toFixed(2)}\n`;
    });

    message += `\nTotal a pagar: $${total.toFixed(2)}`;
    const phoneNumber = "541137659081";
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
}

whatsappButton.addEventListener("click", sendToWhatsApp);