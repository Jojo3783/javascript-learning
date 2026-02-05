import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
//import "../data/cart-class.js";//run every code in file
import "../data/car.js";
import {  loadProductsFetch } from "../data/products.js";
import { loadCartFetch, loadCart } from "../data/cart.js";
//import '../data/backend-practice.js';
/*
async function loadPage() {//make function return promise
  try {
    //throw 'error1';
    await loadProductsFetch();
    const value = await new Promise((resolve, reject) => {
      //throw 'error2';
      loadCartFetch(() => {//replace loadCart with loadCartFetch
        //reject('error3');
        resolve();  
      });
    });
  } catch (error) {
    console.log('error')
  }
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}
loadPage();
*/

await Promise.all([
  loadProductsFetch(), 
  loadCartFetch(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  })
])
/*

new Promise((resolve) => {//run function immediately
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
});

*/
/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
});
*/
