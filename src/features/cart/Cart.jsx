import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./CartSlice";
import EmptyCart from "./EmptyCart";


function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return <EmptyCart></EmptyCart>;
  }

  return (
    <div className="px-4 py-3 ">
      <LinkButton to={"/menu"}> &larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="divided-stone-200 mt-3 divide-y border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId}></CartItem>
        ))}
        
      </ul>

      <div className="mt-6 space-x-2">
        <Button type="primary" to={"/order/new"}>
          Order pizzas
        </Button>

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

export default Cart;
