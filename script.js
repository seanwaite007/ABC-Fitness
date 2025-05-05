// Subscribe functionality
function handleSubscribe() {
    const emailInput = document.querySelector('.newsletter-form input[type="email"]');
    const validationMessage = emailInput.parentElement.parentElement.querySelector('.validation-message');
    
    if (!emailInput.value) {
        validationMessage.textContent = "Please fill out this field.";
        validationMessage.classList.add('show');
        return;
    }
    
    validationMessage.classList.remove('show');
    alert("Thank you for subscribing to our newsletter!");
    emailInput.value = ''; // Clear the input after successful subscription
}

// Handle input changes to remove validation message when user starts typing
function handleEmailInput() {
    const validationMessage = this.parentElement.parentElement.querySelector('.validation-message');
    if (this.value) {
        validationMessage.classList.remove('show');
    }
}

// --- CART FUNCTIONS USING sessionStorage ---
function getCartItems() {
    return JSON.parse(sessionStorage.getItem('cart')) || [];
}

function setCartItems(cart) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(item) {
    let cart = getCartItems();
    cart.push(item);
    setCartItems(cart);
    alert('Item added to the cart');
    updateCartModal();
}

function clearCart() {
    if (getCartItems().length === 0) {
        alert('No items to clear');
    } else {
        sessionStorage.removeItem('cart');
        alert('Cart cleared');
        updateCartModal();
    }
}

function processOrder() {
    if (getCartItems().length === 0) {
        alert('Cart is empty');
    } else {
        alert('Thank you for your order');
        sessionStorage.removeItem('cart');
        updateCartModal();
    }
}

function updateCartModal() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cart = getCartItems();

    // Clear previous content
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

// --- FEEDBACK FORM USING localStorage ---
function saveFeedbackToLocalStorage(feedback) {
    // Store feedback with the user's name as the key
    localStorage.setItem(feedback.name, JSON.stringify(feedback));
}

function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const feedback = document.getElementById('feedback')?.value || '';
    const feedbackObj = { name, email, phone, feedback };

    // Store in localStorage (all feedbacks)
    saveFeedbackToLocalStorage(feedbackObj);

    // Store in sessionStorage (current session's latest feedback)
    sessionStorage.setItem('currentFeedback', JSON.stringify(feedbackObj));

    alert('Thank you for your message');
    clearForm();
    return false;
}

function clearForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.value = '';
    });
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Subscribe button event listener
    const subscribeButton = document.querySelector('.subscribe-button');
    const emailInput = document.querySelector('.newsletter-form input[type="email"]');
    
    if (subscribeButton) {
        subscribeButton.addEventListener('click', handleSubscribe);
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', handleEmailInput);
    }

    // Add to cart buttons event listeners
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = {
                title: button.parentElement.querySelector('h3')?.textContent || '',
                description: button.parentElement.querySelector('p')?.textContent || '',
                image: button.parentElement.parentElement.querySelector('img')?.src || ''
            };
            addToCart(item);
        });
    });

    // Cart action buttons event listeners
    const clearCartButton = document.querySelector('.clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    const processOrderButton = document.querySelector('.process-order');
    if (processOrderButton) {
        processOrderButton.addEventListener('click', processOrder);
    }

    const viewCartButton = document.querySelector('.view-cart');
    if (viewCartButton) {
        viewCartButton.addEventListener('click', function() {
            updateCartModal();
            document.querySelector('.cart-modal')?.classList.add('show');
        });
    }

    const closeCartButton = document.querySelector('.close-cart');
    if (closeCartButton) {
        closeCartButton.addEventListener('click', function() {
            document.querySelector('.cart-modal')?.classList.remove('show');
        });
    }

    // Close cart modal when clicking outside
    const cartModal = document.querySelector('.cart-modal');
    if (cartModal) {
        cartModal.addEventListener('click', function(event) {
            if (event.target === this) {
                closeCart();
            }
        });
    }

    // Contact form event listeners
    const contactForm = document.querySelector('.contact-form');
    const clearButton = document.querySelector('.clear-form-button');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    if (clearButton) {
        clearButton.addEventListener('click', clearForm);
    }
}); 