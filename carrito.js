// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));

            addToCart(productId, productName, productPrice);
            updateCart();
        });
    });

    function addToCart(id, name, price) {
        for (let item of cart) {
            if (item.id === id) {
                item.quantity++;
                return;
            }
        }
        cart.push({ id, name, price, quantity: 1 });
    }

    function removeFromCart(id) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === id) {
                cart[i].quantity--;
                if (cart[i].quantity === 0) {
                    cart.splice(i, 1);
                }
                return;
            }
        }
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        for (let item of cart) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                <button onclick="removeItem('${item.id}')">Eliminar</button>
            `;
            cartItemsContainer.appendChild(listItem);
            total += item.price * item.quantity;
        }
        cartTotalElement.textContent = total.toFixed(2);
    }

    window.removeItem = function(id) {
        removeFromCart(id);
        updateCart();
    }
});