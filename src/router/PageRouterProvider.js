import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductDetails, Products, PageOutlet, Login } from "../components";

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