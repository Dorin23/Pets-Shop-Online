let slideIndex = 0;
const slides = document.querySelectorAll(".carousel-slide");
const container = document.querySelector(".carousel-container");

function showSlide(index){
    if(index >= slides.length){
        slideIndex = 0;
    }else if(index < 0){
        slideIndex = slides.length - 1;
    }else{
        slideIndex = index;
    }
    container.style.transform = `translateX(${-slideIndex * 100}%)`;
}

function nextSlide(){
    showSlide(slideIndex + 1);
}
function prevSlide(){
    showSlide(slideIndex - 1);
}
setInterval(nextSlide, 10000)

document.addEventListener("DOMContentLoaded", function () {
    window.toggleCart = function () {
        document.getElementById("cart-slider").classList.toggle("active");
    };
});

function toggleProductSlider() {
    const slider = document.getElementById("product-slider");
    slider.classList.toggle("active");
}