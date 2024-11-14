document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const productList = document.getElementById("product-list");
    const products = productList.getElementsByClassName("product");

    searchInput.addEventListener("input", function() {
        const filter = searchInput.value.toLowerCase();

        Array.from(products).forEach(function(product) {
            const productName = product.querySelector("h3").innerText.toLowerCase();
            const productDescription = product.querySelector("p").innerText.toLowerCase();
            if (productName.includes(filter) || productDescription.includes(filter)) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }
        });
    });

    // Carousel scroll function
    function scrollCarousel(direction) {
        const container = document.querySelector('.section-list');
        const scrollAmount = container.clientWidth * 0.8; // Adjust the scroll amount as needed
        container.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }
});

// Search functionality for section-3 images
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('.section-3-img');

    items.forEach(item => {
        const altText = item.querySelector('img').getAttribute('alt').toLowerCase();
        if (altText.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});
