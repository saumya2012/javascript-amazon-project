import { addToCart, cart, loadFromStorage } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

describe('test suite: addToCart', () => {
  beforeEach(() => {
    document.querySelector('.js-test-container').innerHTML = `
    <div class="quantity-selector-a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d" value="2"></div>
  `;
  });
  it('adds an existing product to the cart', () => {
    
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d',
        quantity: 1,
        deliveryOptionId: '1'
    }]);
    });
    loadFromStorage();
    const productId = 'a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d';
    const quantitySelector = document.querySelector(`.quantity-selector-${productId}`);
    addToCart(productId);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(Number(quantitySelector.value));
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    const productId = 'a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d';
    const quantitySelector = document.querySelector(`.quantity-selector-${productId}`);
    addToCart(productId);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(Number(quantitySelector.value));
    document.querySelector('.js-test-container').innerHTML = '';
  });
});
