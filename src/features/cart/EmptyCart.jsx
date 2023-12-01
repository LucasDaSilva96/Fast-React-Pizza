import LinkButton from "../../ui/LinkButton";

// EmptyCart component is displayed when the user's cart is empty
function EmptyCart() {
  return (
    // Container for the empty cart message and link button
    <div className="px-4 py-3">
      {/* Link button to navigate back to the menu */}
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      {/* Message indicating that the cart is empty */}
      <p className="mt-7 font-semibold">
        Your cart is still empty. Start adding some pizzas 🍕
      </p>
    </div>
  );
}

// Export the EmptyCart component as the default export
export default EmptyCart;
