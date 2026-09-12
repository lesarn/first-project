// ==========================================
// PRODUCT MANAGEMENT
// ==========================================

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const addProduct = document.getElementById("addProduct");
const tbody = document.querySelector("#productTable tbody");

let products = JSON.parse(localStorage.getItem("products")) || [];

displayProducts();

addProduct.addEventListener("click",