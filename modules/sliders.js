//Slider portada-ofertas
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider-header-image");
    const images = Array.from(slider.querySelectorAll("img"));
    const leftButton = slider.querySelector(".left");
    const rightButton = slider.querySelector(".right");
    let index = 0;

    function updateSlider() {
        images.forEach((img) => {
            img.style.display = "none";
            img.style.transition = "opacity 0.5s ease-in-out";
        });
        images[index].style.display = "block";
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