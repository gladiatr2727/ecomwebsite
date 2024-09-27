// Sample product data
const products = [
    {
        id: 1,
        name: "Laptop",
        price: 999.99,
/*        image: "https://via.placeholder.com/200", */
        image: "https://cdn.mos.cms.futurecdn.net/wK6nd5RNWaeRsyPTvY3bYL-970-80.jpg.webp",
        popularity: 4
    },
    {
        id: 2,
        name: "Smartphone",
        price: 699.99,
        image: "https://via.placeholder.com/200",
        popularity: 5
    },
    {
        id: 3,
        name: "Headphones",
        price: 199.99,
        image: "https://via.placeholder.com/200",
        popularity: 3
    }
];

// Cart
let cart = [];

// Function to display products
function displayProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';  // Clear existing products

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Function to add products to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCartCount();
    displayCart();
}

// Function to update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

// Function to display cart items
function displayCart() {
    const cartSection = document.getElementById('cart-section');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartSection.style.display = 'block';
    cartItems.innerHTML = '';
    cartTotal.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        cartItems.innerHTML += `
            <div>
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        totalPrice += item.price * item.quantity;
    });

    cartTotal.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
}

// Function to remove items from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCart();
}

// Function to sort products
function sortProducts() {
    const sortBy = document.getElementById('sort-products').value;
    if (sortBy === 'price-asc') {
        products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
        products.sort((a, b) => b.popularity - a.popularity);
    }
    displayProducts();
}

// Function to filter products by search
function filterProducts() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name
