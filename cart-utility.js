// Cart Utility for Sowears
const CART_STORAGE_KEY = 'sowears_cart';

function getCart() {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
}

async function addToCart(productId, quantity = 1, size = 'Medium') {
    let cart = getCart();

    // Check if product already exists with same size
    const existingIndex = cart.findIndex(item => item.id === productId && item.size === size);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += parseInt(quantity);
    } else {
        // Fetch product info to store basic details (optional, but good for quick display)
        try {
            const response = await fetch(`/api/products/${productId}`);
            const product = await response.json();
            cart.push({
                id: product.id,
                name: product.name,
                image: product.image,
                price: parseFloat(product.price.replace(/[^\d.-]/g, '').replace(',', '')),
                originalPriceText: product.price,
                quantity: parseInt(quantity),
                size: size
            });
        } catch (err) {
            console.error("Failed to add to cart:", err);
            return;
        }
    }

    saveCart(cart);
    alert("Added to bag!");
}

function removeFromCart(productId, size) {
    let cart = getCart();
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    saveCart(cart);
}

function updateQuantity(productId, size, quantity) {
    let cart = getCart();
    const index = cart.findIndex(item => item.id === productId && item.size === size);
    if (index > -1) {
        cart[index].quantity = parseInt(quantity);
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        saveCart(cart);
    }
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);

    // Update all elements with class 'cart-count' (if we add them to the UI)
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(el => {
        el.innerText = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
}

// Ensure count is correct on load
document.addEventListener('DOMContentLoaded', updateCartCount);
