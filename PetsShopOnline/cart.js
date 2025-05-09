let cart = [];

function addToCart(productId, productName, productPrice){
    console.log("ADĂUGAT ÎN COȘ:", productId, productName, productPrice);
    const existingItem = cart.find(item => item.productId === productId);
    if(existingItem){
        existingItem.quantity++;
    }else{
        cart.push({
            productId,
            productName,
            productPrice,
            quantity: 1
        });
    }
    updateCartUI();
}
// Actualizează conținutul coșului în slider
function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");

    cartItemsContainer.innerHTML = "";
    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Coșul tău de cumpărături este gol.</p>";
        return;
    }

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `
            <p><strong>${item.productName}</strong> x${item.quantity} - ${item.productPrice * item.quantity} lei</p>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    const orderButton = document.createElement("button");
    orderButton.textContent = "Plasează comanda";
    orderButton.onclick = submitOrder;
    cartItemsContainer.appendChild(orderButton);
}
function submitOrder() {
    const userId = 1; // ID-ul utilizatorului logat – poate fi preluat și din login mai târziu

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
        updateCartUI();
    })
    .catch(error => {
        console.error("Eroare:", error);
        alert("A apărut o eroare. Încearcă din nou.");
    });
}
window.addToCart = addToCart;
