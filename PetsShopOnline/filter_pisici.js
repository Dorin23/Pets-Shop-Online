document.addEventListener("DOMContentLoaded", function() {
    let allProducts = [];

    // Preluare produse din backend
    fetch("http://localhost:8080/products/category/2")
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            console.log("Produse primite din backend:", allProducts);
            displayProducts(allProducts);
        })
        .catch(error => console.error("Eroare la preluarea produselor:", error));

    // Adăugare eveniment click pe categoriile din bara de filtrare
    document.querySelectorAll(".category-item").forEach(item => {
        item.addEventListener("click", function(event) {
            event.preventDefault(); // Oprește navigarea către un alt URL

            const selectedCategory = this.getAttribute("data-category").trim().toLowerCase();
            console.log("Categorie selectată:", selectedCategory);

            // Filtrare produse după categoria selectată
            const filteredProducts = allProducts.filter(product => 
                product.description.toLowerCase().includes(selectedCategory) ||
                product.name.toLowerCase().includes(selectedCategory)
            );

            console.log("Produse filtrate:", filteredProducts);

            // Afișare produse filtrate
            displayProducts(filteredProducts);
        });
    });

    // Funcția de afișare a produselor
    function displayProducts(products) {
        const container = document.getElementById("products-container");
        container.innerHTML = ""; // Golește containerul

        if (products.length === 0) {
            container.innerHTML = "<p>Nu există produse în această categorie.</p>";
            return;
        }

        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product-card");

            productElement.innerHTML = `
                <img src="http://localhost:8080${product.imageUrl}" alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/150'">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">${product.price} lei</p>
                <button onclick='addToCart(${product.id}, ${JSON.stringify(product.name)}, ${product.price})'>Adaugă în coș</button>
            `;

            container.appendChild(productElement);
        });
    }

    //Bara de cautare
    document.getElementById("search-button").addEventListener("click", function () {
        const query = document.getElementById("search-input").value.trim().toLowerCase();

        const filtered = allProducts.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );

        displayProducts(filtered);
    });
    document.getElementById("search-input").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            document.getElementById("search-button").click();
        }
    });
});
