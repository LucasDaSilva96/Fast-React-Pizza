import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../Store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
import React from "react";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";

  const formErrors = useActionData();
  const dispatch = useDispatch();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart></EmptyCart>;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      <Form method="POST" action="/order/new">
        <div className="mb-5 flex  flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input grow "
          />
        </div>

        <div className="mb-5 flex flex-col  gap-2  sm:flex-row sm:items-center">
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

        <div className="relative mb-5 flex  flex-col  gap-2 sm:flex-row sm:items-center">
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
              <span className=" absolute right-[3px] top-0 z-10 sm:top-[3px] md:top-0">
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

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-5 w-5 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-1"
          />
          <label className=" font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

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

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please enter a valid phone number";

  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
