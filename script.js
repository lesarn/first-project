const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector("#header");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    if(navLinks.classList.contains("active")){

        menuBtn.innerHTML='<i class="fas fa-times"></i>';

    }else{

        menuBtn.innerHTML='<i class="fas fa-bars"></i>';

    }

});

document.querySelectorAll(".nav-links a").forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

        menuBtn.innerHTML='<i class="fas fa-bars"></i>';

    });

});

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});
/* ===========================
   MENU FILTER
=========================== */

const tabButtons = document.querySelectorAll(".tab-btn");
const menuCards = document.querySelectorAll(".menu-card");

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove("active"));

        // Add active class to clicked button
        button.classList.add("active");

        const category = button.dataset.category;

        menuCards.forEach(card => {

            if(card.classList.contains(category)){

                card.style.display = "block";

            }else{

                card.style.display = "none";

            }

        });

    });

});
/* Show Coffee Products When Page Loads */

window.addEventListener("DOMContentLoaded", () => {

    menuCards.forEach(card => {

        if(card.classList.contains("coffee")){

            card.style.display = "block";

        }else{

            card.style.display = "none";

        }

    });

});
/* ===========================
   SEARCH MENU
=========================== */

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keyup", () => {

    const searchValue = searchInput.value.toLowerCase();

    menuCards.forEach(card => {

        const productName =
        card.querySelector("h3").textContent.toLowerCase();

        if(productName.includes(searchValue)){

            card.style.display = "block";

        }else{

            card.style.display = "none";

        }

    });

});
/* ==========================================
   SHOPPING CART
========================================== */

const cartIcon = document.querySelector(".cart-icon");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.getElementById("close-cart");

const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

const addCartButtons = document.querySelectorAll(".add-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Open cart
cartIcon.addEventListener("click", () => {
    cartPanel.classList.add("active");
});

// Close cart
closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("active");
});

// Add item to cart
// Add item to cart
addCartButtons.forEach(button => {

    button.addEventListener("click", (e) => {

        e.preventDefault();

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if(existingItem){

            existingItem.quantity++;

        }else{

            cart.push({

                name: name,
                price: price,
                quantity: 1

            });

        }

        updateCart();

    });

});

function updateCart(){

    cartItemsContainer.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";

        cartTotal.textContent = "0";

        cartCount.textContent = "0";

        return;

    }

    cart.forEach((item,index)=>{

        total += item.price * item.quantity;

        cartItemsContainer.innerHTML += `

        <div class="cart-item">

            <div>

                <h4>${item.name}</h4>

                <p>Ksh ${item.price}</p>

            </div>

            <div class="quantity">

                <button onclick="decreaseQuantity(${index})">-</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">+</button>

            </div>

            <button class="remove-btn" onclick="removeItem(${index})">

                <i class="fas fa-trash"></i>

            </button>

        </div>

        `;

    });

    cartTotal.textContent = total;

    cartCount.textContent = cart.reduce((sum,item)=>sum+item.quantity,0);
    localStorage.setItem("cart", JSON.stringify(cart));

}
function increaseQuantity(index){

    cart[index].quantity++;

    updateCart();

}

function decreaseQuantity(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    updateCart();

}

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}
window.addEventListener("load", () => {

    updateCart();

});
/* ==========================================
   TESTIMONIAL SLIDER
========================================== */

const testimonials = document.querySelectorAll(".testimonial");

let testimonialIndex = 0;

function showTestimonials(){

    if(testimonials.length === 0){
        return;
    }

    testimonials.forEach(item => {

        item.classList.remove("active");

    });

    testimonialIndex++;

    if(testimonialIndex >= testimonials.length){

        testimonialIndex = 0;

    }

    testimonials[testimonialIndex].classList.add("active");

}

if(testimonials.length > 0){

    setInterval(showTestimonials, 5000);

}
/* ==========================================
   GALLERY LIGHTBOX
========================================== */

const galleryImages =
document.querySelectorAll(".gallery-grid img");

const lightbox =
document.getElementById("lightbox");

const lightboxImg =
document.getElementById("lightbox-img");

const closeLightbox =
document.querySelector(".close-lightbox");

galleryImages.forEach(image=>{

    image.addEventListener("click",()=>{

        lightbox.style.display="flex";

        lightboxImg.src=image.src;

    });

});

closeLightbox.addEventListener("click",()=>{

    lightbox.style.display="none";

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.style.display="none";

    }

});
/* ==========================================
   CONTACT FORM
========================================== */

const contactForm = document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit", function(e){

e.preventDefault();

alert("✅ Thank you! Your message has been sent successfully.");

contactForm.reset();

});

}
/* ==========================================
   NEWSLETTER
========================================== */

const newsletterForm = document.getElementById("newsletterForm");

if(newsletterForm){

newsletterForm.addEventListener("submit", function(e){

e.preventDefault();

alert("🎉 Thank you for subscribing!");

newsletterForm.reset();

});

}
/* ==========================================
   SCROLL ANIMATION
========================================== */

const fadeSections = document.querySelectorAll(".fade-section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

fadeSections.forEach(section => {

    observer.observe(section);

});