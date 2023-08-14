import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductDetails, Products, Orders, PageOutlet, Login } from "../components";

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