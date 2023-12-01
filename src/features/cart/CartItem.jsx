// Import necessary dependencies
import { useSelector } from "react-redux";

// Import utility function for formatting currency
import { formatCurrency } from "../../utils/helpers";

// Import DeleteItem and UpdateItemQuantity components
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

// Import selector from CartSlice for accessing current quantity by ID
import { getCurrentQuantityById } from "./CartSlice";

// CartItem component
function CartItem({ item }) {
  // Destructure item object for easy access
  const { pizzaId, name, quantity, totalPrice } = item;

  // Select current quantity for the specific pizza ID from the Redux store
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  // Render individual cart item with quantity, name, total price, and action buttons
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between ">
      {/* Display quantity and pizza name */}
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      {/* Container for total price and action buttons */}
      <div className="flex items-center justify-between sm:gap-6">
        {/* Display total price with some styling */}
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        {/* UpdateItemQuantity component for adjusting quantity */}
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        ></UpdateItemQuantity>
        {/* DeleteItem component for removing the item from the cart */}
        <DeleteItem pizzaId={pizzaId}></DeleteItem>
      </div>
    </li>
  );
}

// Export the CartItem component
export default CartItem;
