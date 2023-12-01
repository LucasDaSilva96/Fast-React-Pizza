// Import necessary dependencies and components
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";

// Import actions and selectors from CartSlice
import { clearCart, getCart } from "./CartSlice";

// Import EmptyCart component
import EmptyCart from "./EmptyCart";

// Cart component
function Cart() {
  // Select cart and username from the Redux store
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.username);

  // Initialize dispatch function
  const dispatch = useDispatch();

  // If the cart is empty, render the EmptyCart component
  if (cart.length === 0) {
    return <EmptyCart></EmptyCart>;
  }

  // Render the cart with items, username, and action buttons
  return (
    <div className="px-4 py-3 ">
      {/* LinkButton to navigate back to the menu */}
      <LinkButton to={"/menu"}> &larr; Back to menu</LinkButton>

      {/* Heading with username */}
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      {/* List of CartItem components displaying each item in the cart */}
      <ul className="divided-stone-200 mt-3 divide-y border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId}></CartItem>
        ))}
      </ul>

      {/* Container for action buttons */}
      <div className="mt-6 space-x-2">
        {/* Button to proceed to the order page */}
        <Button type="primary" to={"/order/new"}>
          Order pizzas
        </Button>

        {/* Button to clear the entire cart */}
        <Button
          type="secondary"
          onClick={() => {
            return dispatch(clearCart());
          }}
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}

// Export the Cart component
export default Cart;
