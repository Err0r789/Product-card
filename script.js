let cart = JSON.parse(localStorage.getItem('cart')) || {};

function updateItem(productName, operation, price, imageUrl) {
    let quantityElem = document.getElementById(`${productName}-quantity`);
    let product = cart[productName];

    
    if (operation === 'plus') {
        if (product) {
            product.quantity += 1;
        } else {
            cart[productName] = { name: productName, price, quantity: 1, image: imageUrl };
        }
    } else if (operation === 'minus' && product && product.quantity > 0) {
        product.quantity -= 1;
        if (product.quantity === 0) {
            delete cart[productName]; 
        }
    }

    
    quantityElem.innerText = product ? product.quantity : 0;
    updateCartCount();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productName, event) {
    const button = event.target;
    const price = button.getAttribute('data-price');
    const imageUrl = button.closest('.product-card').querySelector('img').src;
    updateItem(productName, 'plus', price, imageUrl);
}

function updateCartCount() {
    
    const totalCount = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalCount;
}

window.onload = function() {
    
    updateCartCount();
    document.querySelectorAll('.product-card').forEach(card => {
        const productName = card.querySelector('h3').innerText;
        const quantityElem = card.querySelector(`[id$='-quantity']`);
        quantityElem.innerText = cart[productName] ? cart[productName].quantity : 0;
    });
}
