/* ==========================================
   LOAD CART TOTAL
========================================== */

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const amount = document.getElementById("amount");
const paymentForm = document.getElementById("payment-form");
const status = document.getElementById("status");

let total = 0;

cart.forEach(item => {

    total += item.price * item.quantity;

});

amount.textContent = total;
paymentForm.addEventListener("submit", function(e){

    e.preventDefault();

    const phone = document.getElementById("phone").value.trim();

    // Accepts 07XXXXXXXX or 01XXXXXXXX
    const phonePattern = /^(07|01)\d{8}$/;

    if(!phonePattern.test(phone)){

        status.innerHTML = "❌ Please enter a valid Kenyan phone number.";

        status.style.color = "red";

        return;

    }

    simulatePayment();

});
function simulatePayment(){

    const loader = document.getElementById("loader");
    const statusText = document.getElementById("status-text");
    const receipt = document.getElementById("receipt");

    loader.style.display = "block";

    statusText.innerHTML = "Sending STK Push...";

    setTimeout(()=>{

        statusText.innerHTML="Waiting for customer confirmation...";

    },2000);

    setTimeout(()=>{

        loader.style.display="none";

        statusText.innerHTML="";

        receipt.style.display="block";

        document.getElementById("receipt-phone").textContent =
        document.getElementById("phone").value;

        document.getElementById("receipt-amount").textContent =
        total;

        document.getElementById("receipt-date").textContent =
        new Date().toLocaleString();

        document.getElementById("receipt-no").textContent =
        generateReceiptNumber();

    },5000);

}
function generateReceiptNumber(){

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let receipt = "";

    for(let i=0;i<10;i++){

        receipt += chars.charAt(
            Math.floor(Math.random()*chars.length)
        );

    }

    return receipt;

}
document.addEventListener("click",function(e){

    if(e.target.id==="continue-btn"){

        localStorage.removeItem("cart");

        window.location.href="confirmation.html";

    }

});