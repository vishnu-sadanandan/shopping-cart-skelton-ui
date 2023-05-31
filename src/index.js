import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./store/redux-store"
import { Provider } from 'react-redux';
import { AuthContextProvider } from './store/auth-context';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from "./components/Products/ProductDetails";

const routerConfig = createBrowserRouter(
  [{
    path: "/", element: <App />,
    children: [{
      path: "/:productId", element: <ProductDetails />
    }]
  }]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <Provider store={store}>
      <RouterProvider router={routerConfig} />
    </Provider>
  </AuthContextProvider>
  // </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
