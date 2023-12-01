// Import necessary dependencies from React
import React, { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../Store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// Regular expression to validate phone numbers
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// CreateOrder component handles the order creation process
function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [withPriority, setWithPriority] = useState(false);

  // Retrieve cart data from the Redux store
  const cart = useSelector(getCart);

  // Retrieve user information from the Redux store
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";

  // Retrieve form errors using the useActionData hook
  const formErrors = useActionData();

  // Dispatch function from Redux to trigger actions
  const dispatch = useDispatch();

  // Calculate total cart price and priority price
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  // Display an empty cart message if the cart is empty
  if (!cart.length) return <EmptyCart></EmptyCart>;

  return (
    // Container for the order creation form
    <div className="px-4 py-6">
      {/* Heading for the order creation section */}
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      {/* Order creation form */}
      <Form method="POST" action="/order/new">
        {/* First Name input field */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input grow"
          />
        </div>

        {/* Phone Number input field */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-1 text-center text-xs text-red-500">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Address input field */}
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
              className="input w-full"
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-1 text-center text-xs text-red-500">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <React.Fragment>
              <span className="absolute right-[3px] top-0 z-10 sm:top-[3px] md:top-0">
                {/* Button to fetch user's geolocation */}
                <Button
                  disabled={isLoadingAddress}
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get position
                </Button>
              </span>
            </React.Fragment>
          )}
        </div>

        {/* Checkbox for priority order */}
        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-5 w-5 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-1"
          />
          <label className="font-medium" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        {/* Hidden input fields for position and cart data */}
        <div>
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `Lat: ${position.latitude}, Long: ${position.longitude}`
                : ""
            }
          ></input>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>

          {/* Submit button for placing the order */}
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order"
              : ` Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// Async function to handle the order creation action
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Create an order object with the form data
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  // Validate phone number
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please enter a valid phone number";

  // Return errors if there are any, otherwise, create the order
  if (Object.keys(errors).length > 0) return errors;

  // Call the createOrder function from the API to create the order
  const newOrder = await createOrder(order);

  // Clear the cart in the Redux store
  store.dispatch(clearCart());

  // Redirect to the order details page
  return redirect(`/order/${newOrder.id}`);
}

// Export the CreateOrder component as the default export
export default CreateOrder;
