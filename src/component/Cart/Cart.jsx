import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";

const Cart = () => {
  // get cart state and actions from context
  const { cart, clearCart, removeItem, updateCart } = useCart();

  // helper to change quantity (+1 / -1). prevents zero or negative quantity.
  const handleUpdate = (itemsID, currStock, changes) => {
    const newQuantity = currStock + changes;
    if (newQuantity > 0) {
      updateCart(itemsID, newQuantity);
    }
  };

  // fixed tax and delivery values (applied once per order)
  const taxPrice = 20;
  const deliveryCharge = 40;

  // calculate per-item numbers (original price and discount amount)
  // NOTE: this no longer adds tax/delivery per item — those are applied at cart level.
  const calItemstotal = (items) => {
    const originalPrice = items.price * items.quantity;
    const discountPrice = (originalPrice * (items.discountPercentage || 0)) / 100;

    const Total = originalPrice - discountPrice; // per-item total before tax/delivery

    return {
      original_Price: originalPrice,
      discount_Price: discountPrice,
      Total: Total,
    };
  };

  // calculate grand total for the entire cart
  // This sums per-item totals, then adds taxPrice and deliveryCharge only once.
  const calCartTotal = () => {
    let cartTotal = 0;
    for (const items of cart) {
      const itemTotal = calItemstotal(items);
      cartTotal += itemTotal.Total;
    }

    // apply tax and delivery only once per order
    cartTotal += taxPrice + deliveryCharge;

    return cartTotal;
  };

  // If cart is empty, show a simple message
  if (cart.length === 0) {
    return (
      <section className="bg-white py-16 text-center dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Oops, there&apos;s no item in the cart 😢
        </h2>
        <Link
          to="/product"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  // Otherwise show the normal cart view
  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="w-[90%] mx-auto grid grid-cols-1">
          <div className="flex items-center justify-end">
            <button
              className="bg-blue-900 text-white px-2 py-2 rounded-md"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            {/* LEFT: list of cart items */}
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cart.map((data) => {
                  // each cart item should have a stable key
                  return (
                    <div
                      key={data.id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                          <img
                            className="h-20 w-20 dark:hidden"
                            src={data.thumbnail}
                            alt={data.title}
                          />
                          <img
                            className="hidden h-20 w-20 dark:block"
                            src={data.thumbnail}
                            alt={data.title}
                          />
                        </a>

                        <label htmlFor="counter-input" className="sr-only">
                          Choose quantity:
                        </label>

                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            {/* decrement */}
                            <button
                              onClick={() =>
                                handleUpdate(data.id, data.quantity, -1)
                              }
                              type="button"
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <svg
                                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>

                            {/* quantity */}
                            <p className="px-2">{data.quantity}</p>

                            {/* increment */}
                            <button
                              onClick={() =>
                                handleUpdate(data.id, data.quantity, +1)
                              }
                              type="button"
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <svg
                                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>

                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">
                              &#8377;{data.price}
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href="#"
                            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                          >
                            {data.title}
                          </a>

                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => removeItem(data.id)}
                              type="button"
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Order summary (render once, not inside cart.map) */}
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>

                {/* compute aggregated numbers for the whole cart */}
                {(() => {
                  // totals for original and discount across items
                  let totalOriginal = 0;
                  let totalDiscount = 0;

                  for (const item of cart) {
                    const originalPrice = item.price * item.quantity;
                    const discountAmount =
                      (originalPrice * (item.discountPercentage || 0)) / 100;

                    totalOriginal += originalPrice;
                    totalDiscount += discountAmount;
                  }

                  // grand total uses existing helper (which now adds tax/delivery once)
                  const grandTotal = calCartTotal();

                  return (
                    <>
                      {/* Original price */}
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Original price
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          &#8377;{totalOriginal.toFixed(2)}
                        </dd>
                      </dl>

                      {/* Savings */}
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Savings
                        </dt>
                        <dd className="text-base font-medium text-green-600">
                          -&#8377;{totalDiscount.toFixed(2)}
                        </dd>
                      </dl>

                      {/* GST (applied once per order) */}
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          GST
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          &#8377;{taxPrice.toFixed(2)}
                        </dd>
                      </dl>

                      {/* Delivery (applied once per order) */}
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Delivery charge
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          &#8377;{deliveryCharge.toFixed(2)}
                        </dd>
                      </dl>

                      {/* Divider + Grand total */}
                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">
                          Total
                        </dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                          &#8377;{grandTotal.toFixed(2)}
                        </dd>
                      </dl>
                    </>
                  );
                })()}

                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Proceed to Checkout
                </a>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <Link
                    to="/product"
                    title=""
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            {/* end order summary */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;

