// Import necessary dependencies from React
import { useEffect } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import UpdateOrder from "./UpdateOrder";

// Order component displays details of a specific order
function Order() {
  // Retrieve the order data using useLoaderData hook
  const order = useLoaderData();

  // Use the fetcher hook from React Router for making additional data requests
  const fetcher = useFetcher();

  // Load additional data (menu) if it hasn't been loaded yet
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  // Destructure the properties of the order object
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  // Calculate the time remaining for delivery
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    // Container for order details
    <div className="space-y-8 px-4 py-6">
      {/* Header section with order number and status */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        {/* Display order status and priority if applicable */}
        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      {/* Delivery information section */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-stone-200 px-6 py-5">
        {/* Display time remaining for delivery or delivery confirmation message */}
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        {/* Display estimated delivery time */}
        <p className="text-xs text-stone-600 ">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      {/* List of ordered items */}
      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={
              fetcher.data !== undefined
                ? fetcher.data.find((el) => el.id === item.pizzaId).ingredients
                : null
            }
            isLoadingIngredients={fetcher.state === "loading"}
          />
        ))}
      </ul>

      {/* Order summary section */}
      <div className="space-y-23 bg-stone-200 px-6 py-5">
        {/* Display the price of pizzas in the order */}
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {/* Display the price of priority (if applicable) */}
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        {/* Display the total amount to pay on delivery */}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {/* Display the "Make Priority" button only if the order is not already a priority */}
      {!priority && <UpdateOrder order={order}></UpdateOrder>}
    </div>
  );
}

// Async function to load order data based on order ID
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

// Export the Order component as the default export
export default Order;
