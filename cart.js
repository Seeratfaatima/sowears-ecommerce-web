// cart.js
const cartItemsContainer = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal-val');
const totalElement = document.getElementById('total-val');
const checkoutBtn = document.getElementById('checkout-btn');

function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">Your bag is empty!</td></tr>';
        subtotalElement.innerText = 'PKR 0.00';
        totalElement.innerText = 'PKR 0.00';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => {
        const itemSubtotal = item.price * item.quantity;
        return `
            <tr>
                <td><a href="#" onclick="event.preventDefault(); removeFromCart(${item.id}, '${item.size}'); renderCart();"><i class="fa-regular fa-circle-xmark" style="color: #8b0404;"></i></a></td>
                <td><img src="${item.image}" alt=""></td>
                <td>${item.name} (${item.size})</td>
                <td>${item.originalPriceText}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, '${item.size}', this.value); renderCart();"></td>
                <td>PKR ${itemSubtotal.toLocaleString()}</td>
            </tr>
        `;
    }).join('');

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalString = 'PKR ' + subtotal.toLocaleString();

    subtotalElement.innerText = totalString;
    totalElement.innerText = totalString;
}

// Initial render
document.addEventListener('DOMContentLoaded', renderCart);

// Checkout handler
checkoutBtn.addEventListener('click', () => {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Your bag is empty!");
        return;
    }
    window.location.href = 'checkout.html';
});

// Coupon logic (re-implemented from old cart.js)
document.getElementById("applycode").onclick = function () {
    const coupon = document.getElementById("code").value;
    if (coupon.trim() !== "") {
        alert("Coupon '" + coupon + "' Applied! (Discount will be calculated at final checkout)");
    } else {
        alert("Please enter a valid coupon code.");
    }
}