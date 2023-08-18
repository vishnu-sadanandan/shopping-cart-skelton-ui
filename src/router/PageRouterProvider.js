import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductDetails, Products, Orders, PageOutlet, Login, CheckoutPage, OpenCart } from "../components";

const routerConfig = createBrowserRouter([
    {
      path: '/',
      element: <PageOutlet />,
      children: [
        {
          index: true,
          element: <Products />,
        },
        {
          path: '/orders',
          element: <Orders />,
        },
        {
          path: '/checkout',
          element: <CheckoutPage />,
        },
        {
          path: '/cart',
          element: <OpenCart />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/:productId',
          element: <ProductDetails />,
        }
      ],
    },
]);

const PageRouterProvider = () => <RouterProvider router={routerConfig} />
export default PageRouterProvider;