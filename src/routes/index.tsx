import { createBrowserRouter } from "react-router";
import App from "../App.tsx";
import Home, { Loader as homeLoader } from "../pages/Home.tsx";
import About from "../components/About.tsx";

import ProductDetails, {
  Loader as productLoader,
} from "../components/ProductDetails.tsx";
import SigIn from "../components/auth/SignIn.tsx";
import LogIn from "../components/auth/LogIn.tsx";
import Cart from "../components/cart/Cart.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: "/about", element: <About /> },
      {
        path: "products/:id",
        element: <ProductDetails />,
        loader: productLoader,
      },
      {
        path: "/signin",
        element: <SigIn />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
