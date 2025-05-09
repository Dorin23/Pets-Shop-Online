let cart = JSON.parse(localStorage.getItem("cart-slider")) || [];
updateCartUI(); // 👈 Afișează produsele salvate

document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/products/category/2") // ← modifică categoria dacă e cazul
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("products-container");
            container.innerHTML = "";

            data.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product-card");

                const productImage = document.createElement("img");
                productImage.src = `http://localhost:8080${product.imageUrl}`;
                productImage.alt = product.name;
                productImage.onerror = function () {
                    this.src = "https://via.placeholder.com/150";
                };

                const nameEl = document.createElement("h3");
                nameEl.textContent = product.name;

                const descEl = document.createElement("p");
                descEl.textContent = product.description;

                const priceEl = document.createElement("p");
                priceEl.className = "price";
                priceEl.textContent = `${product.price} lei`;

                const addButton = document.createElement("button");
                addButton.textContent = "Adaugă în coș";

                addButton.addEventListener("click", function () {
                    addToCart(product.id, product.name, product.price);
                });

                productElement.appendChild(productImage);
                productElement.appendChild(nameEl);
                productElement.appendChild(descEl);
                productElement.appendChild(priceEl);
                productElement.appendChild(addButton);

                container.appendChild(productElement);
            });
        })
        .catch(error => console.error("Eroare la preluarea produselor:", error));
});

function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            productId,
            productName,
            productPrice,
            quantity: 1
        });
    }
    localStorage.setItem("cart-slider", JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");

    cartItemsContainer.innerHTML = "";

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Coșul tău de cumpărături este gol.</p>";
        return;
    }

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `
            <p><strong>${item.productName}</strong> x${item.quantity} - ${(item.productPrice * item.quantity).toFixed(2)} lei</p>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    const orderButton = document.createElement("button");
    orderButton.textContent = "Plasează comanda";
    orderButton.onclick = submitOrder;
    cartItemsContainer.appendChild(orderButton);

    const clearCartButton = document.createElement("button");
    clearCartButton.textContent = "Golește coșul";
    clearCartButton.style.marginLeft = "50px";
    clearCartButton.onclick = function () {
        if (confirm("Ești sigur că vrei să golești coșul?")) {
            cart = [];
            localStorage.removeItem("cart-slider");
            updateCartUI();
        }
    };
    cartItemsContainer.appendChild(clearCartButton);
}

function submitOrder() {
    const userId = 1;

    const orderItems = cart.map(item => ({
        product: { id: item.productId },
        quantity: item.quantity
    }));

    const order = {
        user: { id: userId },
        orderItemList: orderItems,
        status: "PLACED",
        orderDate: new Date()
    };

    fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
        .then(response => {
            if (!response.ok) throw new Error("Eroare la plasarea comenzii.");
            return response.json();
        })
        .then(data => {
            alert("Comanda a fost plasată cu succes!");
            cart = [];
            localStorage.removeItem("cart-slider");
            updateCartUI();
        })
        .catch(error => {
            console.error("Eroare:", error);
            alert("A apărut o eroare. Încearcă din nou.");
        });
}

window.addToCart = addToCart;

// Dacă nu ai deja:
document.addEventListener("DOMContentLoaded", function () {
    window.toggleCart = function () {
        document.getElementById("cart-slider").classList.toggle("active");
    };
});
