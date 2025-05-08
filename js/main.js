// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Responsive Navigation Menu Toggle
    const navToggle = document.createElement('button');
    navToggle.classList.add('nav-toggle');
    navToggle.innerHTML = '☰';
    document.querySelector('header').appendChild(navToggle);

    const nav = document.querySelector('nav ul');
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('show');
    });

    // Initialize products on the products page
    if (document.querySelector('.product-grid')) {
        displayProducts();
    }

    // Initialize product details on the product detail page
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId && document.querySelector('.product-detail')) {
        displayProductDetails(productId);
        displayRelatedProducts(productId);
    }

    // Initialize featured products on the home page
    if (document.querySelector('.featured-products .product-grid')) {
        displayFeaturedProducts();
    }

    // Shopping Cart Functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function addToCart(productId, quantity = 1) {
        const product = getProductById(productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        saveCart();
        updateCartDisplay();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartDisplay();
    }

    function updateCartItemQuantity(productId, quantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                removeFromCart(productId);
            } else {
                saveCart();
                updateCartDisplay();
            }
        }
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartDisplay() {
        const cartItems = document.querySelector('.cart-items');
        if (!cartItems) return;

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            return;
        }

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `).join('');

        // Add event listeners for quantity controls and remove buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                const item = cart.find(item => item.id === productId);
                if (item) {
                    updateCartItemQuantity(productId, item.quantity - 1);
                }
            });
        });

        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                const item = cart.find(item => item.id === productId);
                if (item) {
                    updateCartItemQuantity(productId, item.quantity + 1);
                }
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                removeFromCart(productId);
            });
        });

        // Update summary
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    // Show notification function
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Add styles for the notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
        notification.style.color = 'white';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        notification.style.animation = 'slideIn 0.5s ease-out';

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    // Add to Cart button functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') || e.target.classList.contains('quick-add')) {
            const productId = parseInt(e.target.dataset.id);
            const product = getProductById(productId);
            if (product) {
                addToCart(productId);
                showNotification('Product added to cart!');
            }
        }
    });

    // Initialize cart display if on cart page
    if (document.querySelector('.cart-items')) {
        updateCartDisplay();
    }

    // Form Validation
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Initialize search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                const results = searchProducts(query);
                displayProducts(results);
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // Initialize category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            const category = categoryFilter.value;
            const filteredProducts = category ? 
                products.filter(p => p.category === category) : 
                products;
            displayProducts(filteredProducts);
        });
    }

    // Initialize sort functionality
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            let sortedProducts = [...products];
            
            switch(sortValue) {
                case 'price-low':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'name':
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
            }
            
            displayProducts(sortedProducts);
        });
    }

    // Handle checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;

            if (cart.length === 0) {
                showNotification('Your cart is empty!', 'error');
                return;
            }

            // Create order object
            const order = {
                customerInfo: {
                    name: name,
                    email: email,
                    phone: phone
                },
                items: cart,
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                date: new Date().toISOString()
            };

            // Save order to localStorage (in a real app, this would go to a server)
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));

            // Clear the cart
            cart = [];
            saveCart();
            updateCartDisplay();

            // Show success message
            showNotification('Order placed successfully! Thank you for your purchase.', 'success');

            // Reset the form
            checkoutForm.reset();

            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }

    // Confirm script is loaded
    console.log('Sports Shop JavaScript loaded!');
});

// Display featured products on the home page
function displayFeaturedProducts() {
    const featuredProducts = products.slice(0, 4); // Show first 4 products as featured
    const productGrid = document.querySelector('.featured-products .product-grid');
    if (productGrid) {
        productGrid.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
    }
}

// Display related products on the product detail page
function displayRelatedProducts(currentProductId) {
    const currentProduct = getProductById(currentProductId);
    if (!currentProduct) return;

    const relatedProducts = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    const productGrid = document.querySelector('.related-products .product-grid');
    if (productGrid) {
        productGrid.innerHTML = relatedProducts.map(product => createProductCard(product)).join('');
    }
}

// Make functions available globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartItemQuantity = updateCartItemQuantity;
window.updateCartDisplay = updateCartDisplay; 