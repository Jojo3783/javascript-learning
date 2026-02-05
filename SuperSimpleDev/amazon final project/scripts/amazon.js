import { addToCart, updateCartQuantity } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
loadProducts(renderProductsGrid);
function renderProductsGrid() {
  updateCartQuantity();// count how many items in cart
  let productHTML = '';
  const url = new URLSearchParams(location.search)
  const search = (url.get('search') || '').toLowerCase();
  let filteredProducts = products;
  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase());
    });
  }
  filteredProducts.forEach((product) => {// generate every items HTML
    
    productHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        
        ${product.extraInfoHTML()}
        ${product.extraApplianceInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>
        
        <button class="add-to-cart-button button-primary js-add-to-cart-button"
          data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>`;
  });
    document.querySelector('.js-search-button').addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });
  document.querySelector('.js-products-grid').innerHTML = productHTML;
  const addedMessageTimeouts = {};
  document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;//得到button裡面的ID(該produce的ID)
      const quantity = parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value);//得到selector的value
      addToCart(productId, quantity);//push this product to the cart or update quantity
      updateCartQuantity();
      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
      addedMessage.classList.add('show-added-to-cart');//show added
      /*
      .added-to-cart {
        opacity: 0;
      }
      .show-added-to-cart {
        opacity: 1;
      }
      */
      // 檢查這個商品之前是否有正在跑的計時器，有的話清除它
      const previousTimeoutId = addedMessageTimeouts[productId];
      if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('show-added-to-cart');//hide added
      }, 2000);

      addedMessageTimeouts[productId] = timeoutId;
    });
  });
}