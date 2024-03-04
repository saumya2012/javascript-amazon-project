import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: renderOrderSummary', () => {
  const productId1 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productId2 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    document.querySelector('.js-test-container').innerHTML = `
    <div class="checkout-header"></div>
    <div class="order-summary"></div>
    <div class="payment-summary"></div>
    `;
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  it('displays the cart', () => {
    expect(document.querySelectorAll('.cart-item-container').length) .toEqual(2);
    expect(document.querySelector(`.quantity-label-${productId1}`).innerText).toEqual('2');
    expect(document.querySelector(`.quantity-label-${productId2}`).innerText).toEqual('1');
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('removes a product', () => {
    document.querySelector(`.delete-quantity-link-${productId1}`).click();
    expect(document.querySelectorAll('.cart-item-container').length) .toEqual(1);
    expect(document.querySelector(`.cart-item-container-${productId1}`)).toEqual(null);
    expect(document.querySelector(`.cart-item-container-${productId2}`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    document.querySelector('.js-test-container').innerHTML = '';
  });
});