const products = [
  { id: 1, name: "Cinder Block", price: 2.95 },
  { id: 2, name: "Brick", price: 2 },
  { id: 3, name: "Sand", price: 2.85 },
];

let cart = [];

function displayProducts() {
  const productContainer = document.getElementById("products");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    `;

    productContainer.appendChild(div);
  });
}

displayProducts();

function addToCart(id) {
  const product = products.find((p) => p.id === id);

  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  displayCart();
}

function displayCart() {
  const cartContainer = document.getElementById("cart");
  const totalElement = document.getElementById("total");

  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <h4>${item.name}</h4>
      <p>$${item.price} x ${item.quantity}</p>
      <button onclick="increaseQuantity(${item.id})">+</button>
      <button onclick="decreaseQuantity(${item.id})">-</button>
      <button onclick="removeItem(${item.id})">Remove</button>
    `;

    cartContainer.appendChild(div);
  });

  totalElement.textContent = "Total: $" + total;
}

function increaseQuantity(id) {
  const item = cart.find((item) => item.id === id);
  item.quantity += 1;

  saveCart();
  displayCart();
}

function decreaseQuantity(id) {
  const item = cart.find((item) => item.id === id);

  item.quantity -= 1;

  if (item.quantity === 0) {
    cart = cart.filter((item) => item.id !== id);
  }

  saveCart();
  displayCart();
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);

  saveCart();
  displayCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  displayCart();
}

loadCart();
