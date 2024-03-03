export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

export function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart (productId, addedMessageTimeoutId) {
  const quantitySelector = document.querySelector(`.quantity-selector-${productId}`);
  const quantity = Number(quantitySelector.value);
  const addedMessage = document.querySelector(`.added-to-cart-${productId}`);
  addedMessage.classList.add('is-visible');
  if (addedMessageTimeoutId) {
    clearTimeout(addedMessageTimeoutId);
  }
  
  const timeoutId = setTimeout(() => {
    addedMessage.classList.remove('is-visible');
  }, 2000);

  addedMessageTimeoutId = timeoutId;

  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart (productId) {
  let updatedCart = [];
  cart.forEach ((cartItem) => {
    if (cartItem.productId !== productId) {
      updatedCart.push(cartItem);
    }
  });
  cart = updatedCart;

  saveToStorage();
}

export function calculateCartQuantity () {
  let cartQuantity = 0
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity (productId, updatedQuantity) {
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      cartItem.quantity = updatedQuantity;
    }
  });
  saveToStorage();
}