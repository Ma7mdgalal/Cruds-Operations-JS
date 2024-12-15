// Select Elements
const elements = {
  title: document.getElementById("title"),
  price: document.getElementById("price"),
  taxes: document.getElementById("taxes"),
  ads: document.getElementById("ads"),
  discount: document.getElementById("discount"),
  total: document.querySelector(".total"),
  count: document.getElementById("count"),
  category: document.getElementById("category"),
  create: document.querySelector(".btn-create"),
  search: document.getElementById("search"),
  searchCategory: document.getElementById("searchCategory"),
  deleteAll: document.querySelector(".btn-delete-all"),
  tbody: document.querySelector(".crud-table tbody"),
};

class ProductManager {
  constructor() {
    this.products = [];
    this.mood = "create";
    this.tempIndex = null;

    // Bind methods
    this.init = this.init.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.searchProducts = this.searchProducts.bind(this);

    // Initialize
    this.init();
  }

  init() {
    this.loadFromStorage();
    this.setupEventListeners();
    this.renderProducts();
  }

  setupEventListeners() {
    // Input event listeners for total calculation
    ["price", "taxes", "ads", "discount"].forEach((field) => {
      elements[field].addEventListener("input", this.calculateTotal);
    });

    // Create/Update button
    elements.create.addEventListener("click", this.createProduct);

    // Delete all button
    elements.deleteAll.addEventListener("click", this.deleteAll);

    // Search functionality
    elements.search.addEventListener("input", (e) => {
      this.searchProducts(e.target.value, "title");
    });

    elements.searchCategory.addEventListener("input", (e) => {
      this.searchProducts(e.target.value, "category");
    });
  }

  calculateTotal() {
    const values = {
      price: parseFloat(elements.price.value) || 0,
      taxes: parseFloat(elements.taxes.value) || 0,
      ads: parseFloat(elements.ads.value) || 0,
      discount: parseFloat(elements.discount.value) || 0,
    };

    const totalValue =
      values.price + values.taxes + values.ads - values.discount;

    elements.total.innerHTML = `Total: ${totalValue.toFixed(2)}`;
    elements.total.classList.toggle("success", totalValue > 0);
    elements.total.classList.toggle("fail", totalValue <= 0);

    return totalValue;
  }

  validateInputs() {
    const requiredFields = ["title", "price", "taxes", "ads", "category"];
    const invalidFields = requiredFields.filter(
      (field) => !elements[field].value.trim()
    );

    if (invalidFields.length > 0) {
      alert(`Please fill in the following fields: ${invalidFields.join(", ")}`);
      return false;
    }
    return true;
  }

  createProduct() {
    if (!this.validateInputs()) return;

    const productData = {
      title: elements.title.value,
      price: parseFloat(elements.price.value),
      taxes: parseFloat(elements.taxes.value),
      ads: parseFloat(elements.ads.value),
      discount: parseFloat(elements.discount.value) || 0,
      total: this.calculateTotal(),
      category: elements.category.value,
    };

    if (this.mood === "create") {
      const count = parseInt(elements.count.value) || 1;
      for (let i = 0; i < count; i++) {
        this.products.push({ ...productData });
      }
    } else {
      this.products[this.tempIndex] = productData;
      this.mood = "create";
      elements.create.innerHTML = "Create Product";
      elements.count.style.display = "block";
    }

    this.saveToStorage();
    this.clearInputs();
    this.renderProducts();
  }

  clearInputs() {
    ["title", "price", "taxes", "ads", "discount", "count", "category"].forEach(
      (field) => {
        elements[field].value = "";
      }
    );
    elements.total.innerHTML = "Total: 0.00";
    elements.total.classList.remove("success", "fail");
  }

  updateProduct(index) {
    const product = this.products[index];
    Object.keys(product).forEach((key) => {
      if (elements[key]) {
        elements[key].value = product[key];
      }
    });

    elements.total.innerHTML = `Total: ${product.total}`;
    elements.total.classList.add("success");
    elements.create.innerHTML = "Update Product";
    elements.count.style.display = "none";

    this.mood = "update";
    this.tempIndex = index;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  deleteProduct(index) {
    this.products.splice(index, 1);
    this.saveToStorage();
    this.renderProducts();
  }

  deleteAll() {
    if (confirm("Are you sure you want to delete all products?")) {
      this.products = [];
      localStorage.removeItem("products");
      this.renderProducts();
    }
  }

  searchProducts(searchValue, searchField) {
    if (!searchValue.trim()) {
      this.renderProducts();
      return;
    }

    const filteredProducts = this.products.filter((product) =>
      product[searchField]
        .toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
    this.renderProducts(filteredProducts);
  }

  renderProducts(productsToRender = this.products) {
    elements.deleteAll.style.display = productsToRender.length
      ? "block"
      : "none";
    elements.deleteAll.innerHTML = `Delete All (${this.products.length})`;

    if (productsToRender.length === 0) {
      elements.tbody.innerHTML = `<tr><td colspan="9" class="text-center">No products found.</td></tr>`;
      return;
    }

    elements.tbody.innerHTML = productsToRender
      .map(
        (product, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${this.escapeHtml(product.title)}</td>
        <td>${product.price.toFixed(2)}</td>
        <td>${product.taxes.toFixed(2)}</td>
        <td>${product.ads.toFixed(2)}</td>
        <td>${product.discount.toFixed(2)}</td>
        <td>${product.total.toFixed(2)}</td>
        <td>${this.escapeHtml(product.category)}</td>
        <td>
          <button class="btn btn-update" onclick="productManager.updateProduct(${index})">Update</button>
          <button class="btn btn-delete" onclick="productManager.deleteProduct(${index})">Delete</button>
        </td>
      </tr>
    `
      )
      .join("");
  }

  escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  saveToStorage() {
    localStorage.setItem("products", JSON.stringify(this.products));
  }

  loadFromStorage() {
    const stored = localStorage.getItem("products");
    this.products = stored ? JSON.parse(stored) : [];
  }
}

// Initialize the product manager
const productManager = new ProductManager();
