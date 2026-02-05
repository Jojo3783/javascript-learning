import {cart} from '../../data/cart.js';
//save data
//
//make interactive
export function renderCheckoutHeader() {
  let totalQuantity = 0;
    cart.forEach((cartItem) => {
      totalQuantity += parseInt(cartItem.quantity);
    });
    const checkoutHTML = 
    `${totalQuantity} items`;
    document.querySelector('.js-checkout-number').innerHTML = checkoutHTML;
}