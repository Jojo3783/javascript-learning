export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) ||[{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2,
    deliveryOptionId : '1'
  }, {
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1,
    deliveryOptionId : '2'
  }];
}

function savetostorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function updateCartQuantity() {//update 主畫面右上角或是checkout畫面上方的cart item的數量
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += parseInt(cartItem.quantity);
  });
  document.querySelector('.js-cart-quantity').innerText = totalQuantity;
  savetostorage();
}

export function addToCart(productId, quantity) {
    let matchingitem;
    cart.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingitem = cartItem;
      }
    });
    if(matchingitem) {
      matchingitem.quantity += quantity || 1;
    }
    else {
      cart.push({
      productId : productId,
      quantity : quantity || 1,
      deliveryOptionId: '1'
    });
    }
    savetostorage();
}

export function updateQuantity(productId, newQuantity) {
  let matchingitem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingitem = cartItem;
    }
  });

  if (matchingitem) {
    matchingitem.quantity = newQuantity; // 這裡是 = (覆蓋)
  }
  savetostorage();
}

export function removeFromCart(productId) {
  const newcart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) {
      newcart.push(cartItem);
    }
  });
  cart = newcart;
  savetostorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
   let matchingitem;
    cart.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingitem = cartItem;
      }
    });
    if(!matchingitem) {
      return;
    }//if produceId not in the cart return and do nothing
    matchingitem.deliveryOptionId = deliveryOptionId;
    savetostorage();
}
export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}
export async function loadCartFetch(fun) {//replace loadCart with loadCartFetch
  const response = await fetch('https://supersimplebackend.dev/cart');
  const responseText = await response.text();
  fun();
  console.log(responseText);
  return responseText;
}