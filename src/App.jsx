import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home.jsx";
import Cart from "./features/cart/Cart.jsx";
import Order, { loader as OrderLoader } from "./features/order/Order.jsx";
import Menu, { loader as menuLoader } from "./features/menu/Menu.jsx";
import CreateOrder, {
  action as OrderAction,
} from "./features/order/CreateOrder.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import Error from "./ui/Error.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order/:orderId", element: <Order />, loader: OrderLoader },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/order/new", element: <CreateOrder />, action: OrderAction },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
