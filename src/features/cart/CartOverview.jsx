// Import necessary dependencies
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Import selectors from CartSlice for accessing cart state
import { getTotalCartPrice, getTotalCartQuantity } from "./CartSlice";

// Import utility function for formatting currency
import { formatCurrency } from "../../utils/helpers";

// CartOverview component
function CartOverview() {
  // Select total cart quantity and price from the Redux store
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  // If the cart is empty, return null to render nothing
  if (!totalCartQuantity) return null;

  // Render the cart overview component
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 uppercase text-stone-200">
      {/* Display total quantity and price with some styling */}
      <p className="space-x-4 text-sm font-semibold text-stone-300 sm:space-x-6 md:text-base">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      {/* Link to the cart page for further actions */}
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

// Export the CartOverview component
export default CartOverview;
