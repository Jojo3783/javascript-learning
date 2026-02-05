//cart
/*
cart = JSON.parse(localStorage.getItem('cart')) ||[{
  productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity : 2,
  deliveryOptionId : '1'
}
*/
//removeFromCart:make a new cart without items be deleted
//updateCartQuantity:update cart quantity
//updateQuantity: update quantity in both homepage or checkout item

//products 
/*
{
  id: "id1",
  image: "images/products/umbrella.jpg",
  name: "umbrella",
  rating: {
    stars: 0.0,
    count: 0
  },
  priceCents: 30,
  keywords: [
    "cheap"
  ]}
*/

//deliveryOptions
/*
deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];
*/
import {cart, removeFromCart, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {deliveryOptions, getDeliveryOption} from '../../data/delivery.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';
import {calculateDeliveryDate} from '../../data/deliveryOptions.js';
export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    if (!matchingProduct) {
      return;
    }
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += 
    `<div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name js-product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price js-product-price">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input">
            <span class="save-quantity-link link-primary js-save-quantity-link">
            </span>   
            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>`;
  });

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0
        ? "FREE Shipping"
        : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      
      html +=
      `<div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}"> 
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}
          </div>
        </div>
      </div>`;
    });
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderPaymentSummary();
      renderOrderSummary(); 
      renderCheckoutHeader();
    });
  });

  document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;//save
      const container = document.querySelector(`.js-cart-item-container-${productId}`);//save
      container.classList.add('is-editing-quantity');//save
      const saveLink = container.querySelector('.js-save-quantity-link');
      saveLink.innerText = 'Save';
      saveLink.dataset.productId = productId;//save
      renderCheckoutHeader();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      const quantityInput = container.querySelector('.quantity-input');
      const newQuantity = Number(quantityInput.value);
      if (newQuantity < 0 || newQuantity >= 1000 || !newQuantity) {
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }
      updateQuantity(productId, newQuantity);
      renderCheckoutHeader();
      renderPaymentSummary();
      const quantityLabel = container.querySelector('.quantity-label');
      quantityLabel.innerHTML = newQuantity;
      container.classList.remove('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset; 
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(); 
      renderPaymentSummary();
    });
  });
}