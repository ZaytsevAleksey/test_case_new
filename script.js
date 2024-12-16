document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const cartModal = document.getElementById('cartModal');
    const cartButton = document.getElementById('cartButton');
    const closeLoginModal = loginModal.querySelector('.close');
    const closeRegisterModal = registerModal.querySelector('.close');
    const closeCartModal = cartModal.querySelector('.close');
    const addToCartButtons = document.querySelectorAll('.addToCart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
      const cartCountElement = document.getElementById('cartCount');

    let cart = [];

   function updateCartCount(){
       cartCountElement.textContent = cart.length;
   }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <p>${item.name} - ${item.price} руб.</p>
                <button class="remove-from-cart" data-index="${index}">Удалить</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            totalPrice += item.price;
        });
        cartTotalElement.textContent = totalPrice;

        // Обработчики для кнопок удаления
        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemIndex = this.dataset.index;
                cart.splice(itemIndex, 1);
                updateCartDisplay();
                updateCartCount();
            });
        });

    }


    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(){
            const item = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price)
            };
            cart.push(item);
            updateCartDisplay();
            updateCartCount();
        });
    });

    // Открываем модальное окно логина
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = "block";
    });

    // Открываем модальное окно регистрации
    registerBtn.addEventListener('click', function() {
        registerModal.style.display = "block";
    });

    // Открываем модальное окно корзины
    cartButton.addEventListener('click', function(){
        cartModal.style.display = "block";
        updateCartDisplay();
    });

    // Закрываем модальное окно логина
    closeLoginModal.addEventListener('click', function() {
        loginModal.style.display = "none";
    });

    // Закрываем модальное окно регистрации
    closeRegisterModal.addEventListener('click', function() {
        registerModal.style.display = "none";
    });
    // Закрываем модальное окно корзины
    closeCartModal.addEventListener('click', function() {
        cartModal.style.display = "none";
    });
    // Закрываем модальные окна кликом вне окна
    window.addEventListener('click', function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
        if (event.target == registerModal) {
            registerModal.style.display = "none";
        }
        if(event.target == cartModal) {
            cartModal.style.display = "none";
        }
    });
    // Обработчик для кнопки оформления заказа
    checkoutBtn.addEventListener('click', function() {
        alert('Заказ оформлен!');
        cart = [];
        updateCartDisplay();
         updateCartCount();
        cartModal.style.display = 'none';
    })
});