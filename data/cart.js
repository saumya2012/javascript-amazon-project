export let cart = [];

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
      quantity
    });
  }
}