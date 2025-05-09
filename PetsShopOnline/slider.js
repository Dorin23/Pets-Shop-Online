document.addEventListener("DOMContentLoaded", function() {
    window.toggleCart = function() {
        document.getElementById("cart-slider").classList.toggle("active");
    };
});

function toggleProductSlider() {
    const slider = document.getElementById("product-slider");
    slider.classList.toggle("active");
}