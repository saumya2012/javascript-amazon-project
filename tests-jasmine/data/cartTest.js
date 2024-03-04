import { addToCart, cart, loadFromStorage } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

describe('test suite: addToCart', () => {
  // Mocking the quantitySelector
  document.body.innerHTML = `
    <div class="quantity-selector-15b6fc6f-327a-4ec4-896f-486349e85a3d" value="2"></div>
  `;
  
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '1'
    }]);
    });
    loadFromStorage();
    const productId = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    const quantitySelector = document.querySelector(`.quantity-selector-${productId}`);
    addToCart(productId);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(Number(quantitySelector.value));
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    const productId = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    const quantitySelector = document.querySelector(`.quantity-selector-${productId}`);
    addToCart(productId);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(Number(quantitySelector.value));
  });
});
