// Import the formatCurrency function from the utils/helpers module
import { formatCurrency } from "../../utils/helpers";

// OrderItem component displays details of an item in the order
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  // Destructure the properties of the item object
  const { quantity, name, totalPrice } = item;

  return (
    // List item container for each order item
    <li className="space-y-1 py-3">
      {/* Details of the order item (quantity, name, and total price) */}
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          {/* Display quantity, name, and price of the item */}
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>

      {/* Display ingredients information */}
      <p className="text-sm capitalize italic text-stone-500">
        {/* Display loading message if ingredients are still loading */}
        {isLoadingIngredients
          ? "Loading.."
          : // Display ingredients if available, otherwise, an empty string
            ingredients !== null
            ? ingredients.join(",")
            : ""}
      </p>
    </li>
  );
}

// Export the OrderItem component as the default export
export default OrderItem;
