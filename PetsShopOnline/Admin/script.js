// === script.js ===

// Functie pentru afisarea erorilor AJAX
function errorHandler(jqXHR, textStatus, errorThrown) {
    console.error("AJAX error: ", textStatus, 'Details: ', errorThrown, 'Response: ', jqXHR.responseText);
    alert("Request failed: " + textStatus + ", " + errorThrown + ", " + jqXHR.responseText);
}

// Functie generica pentru trimiterea de request-uri
function sendRequest(type, resource, data, successHandler, errorHandler) {
    const baseUrl = "http://localhost:8080";
    const url = `${baseUrl}/${resource}`;

    $.ajax({
        type: type,
        url: url,
        contentType: "application/json",
        data: type === "GET" || type === "DELETE" ? null : JSON.stringify(data),
        dataType: "json",
        success: successHandler,
        error: errorHandler
    });
}

// Adaugare produs
function addProductt() {
    const productData = {
        name: $('#productName').val().trim(),
        description: $('#productDescription').val().trim(),
        price: parseFloat($('#productPrice').val()),
        quantity: parseInt($('#productQuantity').val()),
        category: { id: parseInt($('#productCategoryId').val()) },
        imageUrl: $('#productImage').val().trim()
    };

    if (!productData.name || isNaN(productData.price) || isNaN(productData.quantity)) {
        alert("Completează toate câmpurile corect.");
        return;
    }

    sendRequest("POST", "products", productData, function (data) {
        alert("Produs adăugat: " + JSON.stringify(data));
        showAllProducts();
    }, errorHandler);
}

// Actualizare produs
function renameProduct() {
    const updatedProduct = {
        id: $('#productIdToUpdate').val().trim(),
        name: $('#newProductName').val().trim(),
        description: $('#newProductDescription').val().trim(),
        price: parseFloat($('#newProductPrice').val()),
        quantity: parseInt($('#newProductQuantity').val()),
        category: { id: parseInt($('#newProductCategoryId').val()) },
        imageUrl: $('#newProductImage').val().trim()
    };

    sendRequest("PUT", "products", updatedProduct, function (data) {
        alert("Produs actualizat: " + JSON.stringify(data));
        showAllProducts();
    }, errorHandler);
}

// Stergere produs
function deleteProduct() {
    const productId = $('#productIdToDelete').val().trim();
    if (!productId) {
        alert("Introdu un ID valid pentru ștergere.");
        return;
    }

    sendRequest("DELETE", `products/${productId}`, null, function () {
        alert("Produs șters cu succes.");
        showAllProducts();
    }, errorHandler);
}

// Afisare produse existente
function showAllProducts() {
    sendRequest("GET", "products", null, function (data) {
        const list = $('#productList');
        list.empty();

        if (data.length === 0) {
            list.append('<li>Nu există produse.</li>');
            return;
        }

        data.forEach(product => {
            list.append(`<li>ID: ${product.id}, Nume: ${product.name}, Preț: ${product.price} lei</li>`);
        });
    }, errorHandler);
}

// Initializare butoane
$(document).ready(function () {
    $('#addProductButton').on('click', addProductt);
    $('#renameProductButton').on('click', renameProduct);
    $('#deleteProductButton').on('click', deleteProduct);
    $('#showAllProductsButton').on('click', showAllProducts);
});