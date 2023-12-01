// Import necessary dependencies from React and React Redux
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantityItem, increaseItemQuantity } from "./CartSlice";

// UpdateItemQuantity component allows users to increase or decrease the quantity of a pizza item in the cart
function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  // Initialize the dispatch function from React Redux
  const dispatch = useDispatch();

  return (
    // Container for the quantity update buttons
    <div className="flex items-center gap-1 md:gap-3">
      {/* Button to decrease the quantity */}
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantityItem(pizzaId))}
      >
        -
      </Button>
      {/* Display the current quantity */}
      <span className="px-1 text-sm font-bold">{currentQuantity}</span>
      {/* Button to increase the quantity */}
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

// Export the UpdateItemQuantity component as the default export
export default UpdateItemQuantity;
