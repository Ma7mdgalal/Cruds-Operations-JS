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
const update = document.getElementsByClassName(".btn-update");
const deleteBtn = document.querySelectorAll(".btn-delete");
const productsHtml = document.getElementsByTagName("tbody")[0];
// function cmpuate total price
let allProducts = [];
loadFromLocalStorage();
renderProducts(allProducts);

function getPrice() {
  // Parse input values and handle potential NaN cases
  const priceValue = parseFloat(price.value);
  const taxesValue = parseFloat(taxes.value);
  const adsValue = parseFloat(ads.value);
  const discountValue = parseFloat(discount.value) || 0;

  // Calculate total value
  const totalValue = priceValue + taxesValue + adsValue - discountValue;

  // Update the total display
  if (!isNaN(totalValue)) {
    total.innerHTML = `Total: ${totalValue.toFixed(2)}`;
    total.classList.remove("fail");
    total.classList.add("success");
  } else {
    total.innerHTML = "Total: 0.00"; // Display a default value if NaN
    total.classList.remove("success");
    total.classList.add("fail");
  }
}
function createProduct() {
  let titleValue = title.value;
  let totalValue = parseFloat(total.innerHTML.replace("Total: ", ""));
  let priceValue = parseFloat(price.value);
  let taxesValue = parseFloat(taxes.value);
  let adsValue = parseFloat(ads.value);
  let discountValue = parseFloat(discount.value) || 0;
  let categoryValue = category.value;
  let countValue = parseInt(count.value);

  if (
    titleValue === "" ||
    isNaN(totalValue) ||
    isNaN(priceValue) ||
    isNaN(taxesValue) ||
    isNaN(adsValue) ||
    isNaN(discountValue)
  ) {
    alert("Please enter valid values for all fields.");
    return;
  }
  for (let i = 0; i < countValue; i++) {
    allProducts.push({
      title: titleValue,
      price: priceValue,
      taxes: taxesValue,
      ads: adsValue,
      discount: discountValue,
      total: totalValue,
      category: categoryValue,
    });
  }
  saveToLocalStorage();
  renderProducts(allProducts);
  clearInputs();
}
// function to clear inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  total.innerHTML = "Total: 0.00";
  total.classList.remove("success", "fail");
  category.value = "";
}
function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(allProducts));
  renderProducts(allProducts);
}
function loadFromLocalStorage() {
  let data = JSON.parse(localStorage.getItem("products"));
  if (data) {
    allProducts = data;
  }
}
function renderProducts(products) {
  if (products.length === 0) {
    deleteAll.style.display = "none";
    productsHtml.innerHTML = `<tr style="text-align: center;"><td colspan="9">No products found.</td></tr>`;
  } else {
    productsHtml.innerHTML = "";
    products.forEach((product, index) => {
      productsHtml.innerHTML += ` <tr>
              <td>${index}</td>
              <td>${product.title}</td>
              <td>${product.price}</td>
              <td>${product.taxes}</td>
              <td>${product.ads}</td>
              <td>${product.discount}</td>
              <td>${product.total}</td>
              <td>${product.category}</td>
              <td>
                <button class="btn btn-update">Update</button>
                <button class="btn btn-delete">Delete</button>
              </td>
            </tr>`;
    });

    deleteAll.style.display = "block";
    deleteAll.innerHTML = `Delete All (${allProducts.length})`;
  }
}
deleteAll.addEventListener("click", () => {
  localStorage.clear();
  allProducts = [];
  renderProducts(allProducts);
});
// function to search
function searchProducts(searchValue, searchField) {
  searchValue = searchValue.toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product[searchField].toLowerCase().includes(searchValue)
  );
  renderProducts(filteredProducts);
}
