// Import necessary dependencies from React and Redux
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/CartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

// MenuItem component represents an individual pizza item in the menu
function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  // Extract necessary information from the pizza object
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  // Handler function to add the pizza to the cart
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    // Dispatch the addItem action to add the item to the cart
    dispatch(addItem(newItem));
  }

  // Select the current quantity of the pizza in the cart
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  // Check if the pizza is already in the cart
  const isInCart = currentQuantity > 0;

  return (
    // Container for the individual pizza item
    <li className="flex gap-4 py-2">
      {/* Pizza image */}
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : " "} `}
      />
      <div className="flex grow flex-col pt-0.5">
        {/* Pizza name */}
        <p className="font-medium">{name}</p>
        {/* Ingredients list */}
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {/* Display the price or sold out message */}
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {/* Actions for items already in the cart */}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              {/* Update quantity button */}
              <UpdateItemQuantity
                currentQuantity={currentQuantity}
                pizzaId={id}
              ></UpdateItemQuantity>
              {/* Delete item button */}
              <DeleteItem pizzaId={id}></DeleteItem>
            </div>
          )}

          {/* Add to cart button for items not in the cart */}
          {!soldOut && !isInCart && (
            <div>
              <Button type="small" onClick={handleAddToCart}>
                Add to cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

// Export the MenuItem component as the default export
export default MenuItem;
