import { addToCart, cart, loadFromStorage, removeFromCart , updateDeliveryOption} from "../../data/cart.js";

const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

describe('test suite: addToCart', () => {
  beforeEach(() => {//16e use beforeEach
    spyOn(localStorage, 'setItem');
  })

  
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {//如果要getItem就會霸下面的data給他
      return JSON.stringify([{
        productId : productId1,
        quantity : 1,
        deliveryOptionId : '1'
      }]);
    });


    loadFromStorage();//getItem會拿到fakecall的資料
    /*
    export function loadFromStorage() {
      cart = JSON.parse(localStorage.getItem('cart')) || [{
      productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity : 2,
      deliveryOptionId : '1'
      }, {
        productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity : 1,
        deliveryOptionId : '2'
      }];
    }
    */
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');//quantity++ 
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',                                          
      JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }])
    );
    
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds an new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart(productId1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',                                          
      JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }])
    );
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(1);
  });

  /*
  function removeFromCart(productId) {
    const newcart = [];
    cart.forEach((cartItem) => {
      if(cartItem.productId !== productId) {
        newcart.push(cartItem);
      }
    });
    cart = newcart;
    savetostorage();
  }
  */
  it('remove a cart productId that is in the cart', () => {
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
    removeFromCart(productId1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId2);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',                                          
      JSON.stringify([{
        productId : productId2,
        quantity : 1,
        deliveryOptionId : '2'
      }])
    );
  });

  it('remove a cart productId that is not in the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId : productId1,
        quantity : 1,
        deliveryOptionId : '1'
      }]);
    });
    loadFromStorage();
    removeFromCart('123423424212141414314');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',                                          
      JSON.stringify([{
        productId : productId1,
        quantity : 1,
        deliveryOptionId : '1'
      }])
    );
  });
  it("test for the updateDeliveryOption function", () => {
    //mock localStorage.setItem in beforeEach
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId : productId1,
        quantity : 1,
        deliveryOptionId : '1'
      }]);
    });//mock localStorage.getItem
    loadFromStorage();
    updateDeliveryOption(productId1, '3');
    expect(cart[0].productId).toEqual(productId1);//checked the first item in the cart productId is corrected
    expect(cart[0].deliveryOptionId).toEqual('3');//checked the first item in the cart productoptionId is corrected
  });

  it("test for the updateDeliveryOption function edge case", () => {
    //mock localStorage.setItem in beforeEach
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId : productId1,
        quantity : 1,
        deliveryOptionId : '1'
      }]);
    });//mock localStorage.getItem
    loadFromStorage();
    updateDeliveryOption("234567890987654345678", '3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);//check edge case not been call
  });
});
