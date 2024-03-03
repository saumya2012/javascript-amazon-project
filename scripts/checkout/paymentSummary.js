import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary () {
  let productsPriceCents = 0;
  let shippingPriceCents = 0;
  let cartQuantity = calculateCartQuantity();
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productsPriceCents += Number(product.priceCents) * Number(cartItem.quantity);

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productsPriceCents + shippingPriceCents;
  const estimatedTaxCents = totalBeforeTaxCents * 0.1;
  const orderTotalCents = totalBeforeTaxCents + estimatedTaxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
    Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(productsPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(estimatedTaxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(orderTotalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
    Place your order
    </button>
  `;

  document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
}