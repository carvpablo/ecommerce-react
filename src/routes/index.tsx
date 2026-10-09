import { createBrowserRouter } from "react-router";
import App from "../App.tsx";
import Home, { Loader as homeLoader } from "../pages/Home.tsx";
import About from "../components/About.tsx";
import Auth from "../pages/Auth.tsx";
import ProductDetails, {
  Loader as productLoader,
} from "../components/ProductDetails.tsx";

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
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
]);
