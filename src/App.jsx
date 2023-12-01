import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import { loader as orderLoader } from "./features/order/Order";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { action } from "./features/order/UpdateOrder";

// React.router ↓
const router = createBrowserRouter([
  {
    element: <AppLayout></AppLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
        loader: menuLoader,
        errorElement: <Error></Error>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/order/new",
        element: <CreateOrder></CreateOrder>,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order></Order>,
        loader: orderLoader,
        errorElement: <Error></Error>,
        action: action,
      },
    ],
  },
]);

function App() {
  // React.router ↓
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
