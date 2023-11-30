import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantityItem, increaseItemQuantity } from "./CartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className=" flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantityItem(pizzaId))}
      >
        -
      </Button>
      <span className=" px-1 text-sm font-bold">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
