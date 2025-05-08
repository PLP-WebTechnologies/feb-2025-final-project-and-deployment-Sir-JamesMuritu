// Product Database
const products = [
    // Sports Equipment
    {
        id: 1,
        name: "Professional Basketball",
        price: 29.99,
        description: "Official size and weight basketball with superior grip and durability.",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500",
        category: "Basketball"
    },
    {
        id: 2,
        name: "Professional Soccer Ball",
        price: 24.99,
        description: "Competition grade soccer ball with water-resistant coating.",
        image: "https://images.unsplash.com/photo-1614632537423-5e1b642fe8bc?w=500",
        category: "Soccer"
    },
    {
        id: 3,
        name: "Premium Running Shoes",
        price: 89.99,
        description: "Lightweight running shoes with advanced cushioning technology.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        category: "Footwear"
    },
    {
        id: 4,
        name: "Professional Dumbbell Set",
        price: 149.99,
        description: "Adjustable dumbbell set with storage rack, perfect for home workouts.",
        image: "https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?w=500",
        category: "Fitness"
    },
    {
        id: 5,
        name: "Tennis Racket & Balls Set",
        price: 159.99,
        description: "Professional grade tennis racket with perfect balance and control.",
        image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c9?w=500",
        category: "Tennis"
    },
    {
        id: 6,
        name: "Premium Yoga Mat",
        price: 34.99,
        description: "Extra thick yoga mat with non-slip surface and carrying strap.",
        image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500",
        category: "Yoga"
    },
    {
        id: 7,
        name: "Mountain Bike",
        price: 599.99,
        description: "Professional mountain bike with 21-speed gear system.",
        image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=500",
        category: "Cycling"
    },
    {
        id: 8,
        name: "Boxing Gloves",
        price: 49.99,
        description: "Professional boxing gloves with wrist support.",
        image: "https://images.unsplash.com/photo-1583473848882-519e04125720?w=500",
        category: "Boxing"
    },
    {
        id: 9,
        name: "Golf Club Set",
        price: 299.99,
        description: "Complete golf club set with bag and accessories.",
        image: "https://images.unsplash.com/photo-1535131749006-b7d58b247085?w=500",
        category: "Golf"
    },
    {
        id: 10,
        name: "Swimming Goggles",
        price: 19.99,
        description: "Anti-fog swimming goggles with UV protection.",
        image: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=500",
        category: "Swimming"
    },
    // Sports Apparel
    {
        id: 11,
        name: "Sports Backpack",
        price: 39.99,
        description: "Durable sports backpack with multiple compartments.",
        image: "https://images.unsplash.com/photo-1622560480605-d83c86b674d5?w=500",
        category: "Accessories"
    },
    {
        id: 12,
        name: "Women's Athletic Set",
        price: 59.99,
        description: "Comfortable and stylish women's athletic wear set.",
        image: "https://images.unsplash.com/photo-1536922246289-88c42f957773?w=500",
        category: "Women's Apparel"
    },
    {
        id: 13,
        name: "Men's Athletic Set",
        price: 69.99,
        description: "Premium men's athletic wear set for maximum comfort.",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500",
        category: "Men's Apparel"
    },
    {
        id: 14,
        name: "Sports Headband",
        price: 9.99,
        description: "Moisture-wicking sports headband.",
        image: "https://images.unsplash.com/photo-1618453292459-53424b66bb6a?w=500",
        category: "Accessories"
    },
    {
        id: 15,
        name: "Compression Socks",
        price: 14.99,
        description: "Athletic compression socks for enhanced performance.",
        image: "https://images.unsplash.com/photo-1563903010-c5324e4aa6af?w=500",
        category: "Accessories"
    },
    {
        id: 16,
        name: "Sports Water Bottle",
        price: 12.99,
        description: "Insulated sports water bottle with carrying strap.",
        image: "https://images.unsplash.com/photo-1550505095-81378a674395?w=500",
        category: "Accessories"
    },
    {
        id: 17,
        name: "Sports Sunglasses",
        price: 29.99,
        description: "UV protection sports sunglasses with polarized lenses.",
        image: "https://images.unsplash.com/photo-1577425179889-5a6bfd013038?w=500",
        category: "Accessories"
    },
    {
        id: 18,
        name: "Fitness Tracker",
        price: 79.99,
        description: "Advanced fitness tracker with heart rate monitor.",
        image: "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=500",
        category: "Electronics"
    },
    {
        id: 19,
        name: "Sports Jersey",
        price: 49.99,
        description: "Professional sports jersey with moisture-wicking fabric.",
        image: "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=500",
        category: "Apparel"
    },
    {
        id: 20,
        name: "Hiking Boots",
        price: 129.99,
        description: "Waterproof hiking boots with ankle support.",
        image: "https://images.unsplash.com/photo-1606588260160-0c181bb6da66?w=500",
        category: "Footwear"
    }
];

// Function to search products
function searchProducts(query) {
    query = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
}

// Function to generate HTML for a single product card
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p class="description">${product.description}</p>
            <div class="product-actions">
                <a href="product-detail.html?id=${product.id}" class="view-details">View Details</a>
                <button class="quick-add" data-id="${product.id}">Quick Add</button>
            </div>
        </div>
    `;
}

// Function to display products on the products page
function displayProducts(productsToShow = products) {
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        productGrid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    }
}

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Function to display product details
function displayProductDetails(productId) {
    const product = getProductById(productId);
    if (product) {
        document.querySelector('.product-detail h2').textContent = product.name;
        document.querySelector('.product-image').innerHTML = `
            <img src="${product.image}" alt="${product.name}">
        `;
        document.querySelector('.product-info').innerHTML = `
            <p class="price">Price: $${product.price.toFixed(2)}</p>
            <p class="description">Description: ${product.description}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
    }
}

// Export for use in other files
window.products = products;
window.displayProducts = displayProducts;
window.displayProductDetails = displayProductDetails;
window.getProductById = getProductById;
window.searchProducts = searchProducts; 