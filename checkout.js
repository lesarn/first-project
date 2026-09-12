// Load cart from localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderItems = document.getElementById("order-items");
const orderTotal = document.getElementById("order-total");
const checkoutForm = document.getElementById("checkout-form");

let total = 0;

// Display cart items
if(cart.length === 0){

    orderItems.innerHTML = "<p>Your cart is empty.</p>";

}else{

    cart.forEach(item=>{

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        orderItems.innerHTML += `

        <div class="order-item">

            <span>${item.name} × ${item.quantity}</span>

            <span>Ksh ${itemTotal}</span>

        </div>

        `;

    });

}

orderTotal.textContent = total;

// Handle checkout
checkoutForm.addEventListener("submit", function(e){

    e.preventDefault();

    const customer = {

        name: document.querySelector('input[type="text"]').value,

        phone: document.querySelector('input[type="tel"]').value,

        email: document.querySelector('input[type="email"]').value,

        address: document.querySelector("textarea").value

    };

    localStorage.setItem(
        "customer",
        JSON.stringify(customer)
    );

    window.location.href = "mpesa.html";

});