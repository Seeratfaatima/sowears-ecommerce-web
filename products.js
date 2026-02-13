async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        return await response.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

async function fetchProductById(id) {
    try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        return await response.json();
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

function renderProducts(containerId, productList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ""; // Clear existing content

    productList.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("box");
        productCard.onclick = () => {
            window.location.href = `product.html?id=${product.id}`;
        };

        const stars = Array(product.rating).fill('<i class="fas fa-star"></i>').join('');

        productCard.innerHTML = `
            <div class="box-content">
                <div class="box-image" style="background-image: url('${product.image}');"></div>
                <h5>${product.name}</h5>
                <div class="star">${stars}</div> 
                <h4>${product.price}</h4>
                <a href="#" onclick="event.preventDefault(); event.stopPropagation(); addToCart(${product.id}, 1);"><i class="fa-solid fa-cart-shopping cart"></i></a>    
            </div> 
        `;

        container.appendChild(productCard);
    });
}
