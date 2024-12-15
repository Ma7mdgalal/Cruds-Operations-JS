// Select Elements
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.querySelector(".total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const create = document.querySelector(".btn-create");
const search = document.getElementById("search");
const searchCategory = document.getElementById("searchCategory");
const deleteAll = document.querySelector(".btn-delete-all");
const table = document.querySelector(".crud-table");
const tbody = document.querySelector(".crud-table tbody");
const update = document.querySelectorAll(".btn-update");
const deleteBtn = document.querySelectorAll(".btn-delete");
// function cmpuate total price
function getPrice() {
  // Parse input values and handle potential NaN cases
  const priceValue = parseFloat(price.value) || 0;
  const taxesValue = parseFloat(taxes.value) || 0;
  const adsValue = parseFloat(ads.value) || 0;
  const discountValue = parseFloat(discount.value) || 0;

  // Calculate total value
  const totalValue = priceValue + taxesValue + adsValue - discountValue;

  // Update the total display
  if (!isNaN(totalValue)) {
    total.innerHTML = `Total: ${totalValue.toFixed(2)}`;
    total.style.color = "green";
    total.style.fontWeight = "bold";
    total.style.border = "2px solid green";
  } else {
    total.innerHTML = "Total: 0.00"; // Display a default value if NaN
  }
}
