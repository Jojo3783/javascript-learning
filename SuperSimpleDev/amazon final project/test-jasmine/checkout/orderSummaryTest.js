import {renderOrderSummary} from "../../scripts/checkout/orderSummary.js";
import {cart, loadFromStorage} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../../../javascript-amazon-project/scripts/utils/money.js";
import {loadProductsFetch } from "../../data/products.js";
const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
describe('test suite renderOrderSummary', () => {
  beforeAll(async () => {
    await loadProductsFetch()
  });
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div> 
      <div class="js-checkout-number"></div> 
      `;
    console.log('Payment Summary Div:', document.querySelector('.js-payment-summary'));

    renderOrderSummary();

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
      productId : productId1,
      quantity : 2,
      deliveryOptionId : '1' 
    }, {
      productId : productId2,
      quantity : 1,
      deliveryOptionId : '2'
    }]);
    });
    loadFromStorage();
    renderOrderSummary();
  });


  
  it('display the cart', () => {
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
  });


  it('remove a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  it('display name properly', () => {
    const displayname1 = getProduct(productId1).name;
    expect(document.querySelector('.js-product-name').innerText).toEqual(displayname1);
  })

  it('display money properly', () => {
    const displaymoney1 =  formatCurrency(getProduct(productId1).priceCents);
    expect(document.querySelector('.js-product-price').innerText).toEqual(`$${displaymoney1}`);
  });

  it('test for updating the delivery option', () => {
    document.querySelector(`.js-delivery-option-${productId1}-${3}`).click();//get the 3rd delivery option for the 1st delivery option and click it
    const inputOption = document.querySelector(`.delivery-option-input-${productId1}-${3}`);//get the input idnside the 3rd delivery option
    expect(inputOption.checked).toEqual(true);
    expect(cart.length).toEqual(2);//check cart.length is correct
    expect(cart[0].productId).toEqual(productId1);//checked the first item in the cart productId is corrected
    expect(cart[0].deliveryOptionId).toEqual('3');//checked the first item in the cart productoptionId is corrected
    const shippingPriceElement = document.querySelector('.js-payment-summary-shipping');
    expect(shippingPriceElement.innerText).toEqual('$14.98');
    const totalPriceElement = document.querySelector('.js-payment-summary-total');
    expect(totalPriceElement.innerText).toEqual('63.50');
  });
  /*
   html +=
      `class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
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
  */


  afterEach(() => {//16f use afterEach
    document.querySelector('.js-test-container').innerHTML = "";
  })
});