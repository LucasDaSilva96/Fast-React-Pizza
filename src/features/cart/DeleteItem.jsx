// Import necessary dependencies from React and React Redux

import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./CartSlice";

// DeleteItem component provides a button to delete a pizza item from the cart
function DeleteItem({ pizzaId }) {
  // Initialize the dispatch function from React Redux
  const dispatch = useDispatch();

  return (
    // Button component for deleting the item
    <Button
      type="small"
      onClick={() => {
        // Dispatch the deleteItem action with the pizzaId
        return dispatch(deleteItem(pizzaId));
      }}
    >
      Delete
    </Button>
  );
}

// Export the DeleteItem component as the default export
export default DeleteItem;
