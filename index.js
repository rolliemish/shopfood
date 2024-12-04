const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

// Seleccionamos el contenedor donde se mostrarán los mensajes emergentes
const popupContainer = document.querySelector('.popup-container'); // Asegúrate de tener este contenedor en tu HTML

// Función para mostrar el mensaje emergente
const showPopup = () => {
    // Crear el nuevo popup
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // Crear el símbolo de check
    const checkSymbol = document.createElement('span');
    checkSymbol.id = 'check-symbol';
    checkSymbol.innerHTML = '✓'; // Símbolo de check

    // Crear el mensaje de texto
    const message = document.createElement('span');
    message.textContent = 'Añadido al carrito';

    // Añadir el símbolo y el mensaje al popup
    popup.appendChild(checkSymbol);
    popup.appendChild(message);

    // Añadir el popup al contenedor
    popupContainer.appendChild(popup);

    // Hacer que el popup aparezca con animación
    setTimeout(() => {
        popup.style.display = 'flex';
        popup.style.opacity = 1;
        popup.style.transform = 'translateY(0)';
    }, 10); // Retraso para que la animación ocurra correctamente

    // Desaparecer el popup después de 3 segundos
    setTimeout(() => {
        popup.style.opacity = 0;
        popup.style.transform = 'translateY(-10px)';

        // Eliminar el popup después de que desaparezca
        setTimeout(() => {
            popup.remove();
        }, 300); // Eliminar después de 0.3s para permitir la animación
    }, 3000); // El popup desaparece después de 3 segundos
};

// Mostrar u ocultar el carrito
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// =========================
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglo de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

// Evento para añadir productos al carrito
productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        const exists = allProducts.some(product => product.title === infoProduct.title);

        if (exists) {
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        showHTML();

        // Mostrar el popup con el mensaje
        showPopup(); // Mostrar el mensaje emergente

    }
});

// Evento para eliminar productos del carrito
rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(product => product.title !== title);

        console.log(allProducts);

        showHTML();
    }
});

// Función para mostrar los productos en el carrito
const showHTML = () => {
    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    // Limpiar HTML
    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        rowProduct.append(containerProduct);

        total = total + parseInt(product.quantity * product.price.slice(1));
        totalOfProducts = totalOfProducts + product.quantity;
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
};