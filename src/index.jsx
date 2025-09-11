import ReactDOM from "react-dom/client";
import "./style.css";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Productlayout from "./component/Productlayout/Productlayout";
import Home from "./Pages/Home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./component/Error/Error";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Contact from "./component/Contact/Contact";
import Cart from "./component/Cart/Cart";
import CartProvider from "./Store/cartStore";

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  return (
    <>
      <CartProvider value = {{name: "Sam"}} > 
        <Header />
        <Outlet />
        <Footer />
      </CartProvider>
    </> 
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product",
        element: <Productlayout />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/Cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
