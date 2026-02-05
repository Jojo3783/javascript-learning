class Cart {
  cartItems;//public property
  #localStorageKey;//private property
  
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }
  
  #loadFromStorage() { // shortcut
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) ||[{//this is outer object
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2,
    deliveryOptionId : '1'
    }, {
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1,
    deliveryOptionId : '2'
    }];
  };//method
  savetostorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  };
  addToCart(productId, quantity) {
    let matchingitem;
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingitem = cartItem;
      }
    })
    if(matchingitem) {
      matchingitem.quantity += quantity || 1;
    }
    else {
      this.cartItems.push({
      productId : productId,
      quantity : quantity || 1,
      deliveryOptionId: '1'
    })
    }
    this.savetostorage();
  };
  removeFromCart(productId) {
    const newcart = [];
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId) {
        newcart.push(cartItem);
      }
    });
    this.cartItems = newcart;
    this.savetostorage();
  };
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingitem;
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingitem = cartItem;
      }
    });
    if(!matchingitem) {
      return;
    }//if produceId not in the cart return and do nothing
    matchingitem.deliveryOptionId = deliveryOptionId;
    this.savetostorage();
  };
  updateCartQuantity() {//update 主畫面右上角或是checkout畫面上方的cart item的數量
    let totalQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      totalQuantity += parseInt(cartItem.quantity);
    });
    document.querySelector('.js-cart-quantity').innerText = totalQuantity;
    this.savetostorage();
  };
  updateQuantity(productId, newQuantity) {
    let matchingitem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingitem = cartItem;
      }
    });

    if (matchingitem) {
      matchingitem.quantity = newQuantity; // 這裡是 = (覆蓋)
    }
    this.savetostorage();
  };
  removeFromCart(productId) {
    const newcart = [];
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId) {
        newcart.push(cartItem);
      }
    });
    this.cartItems = newcart;
    this.savetostorage();
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');
console.log(cart);
console.log(businessCart);  

