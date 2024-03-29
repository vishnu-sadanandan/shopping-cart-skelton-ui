import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./store/redux-store"
import { Provider } from 'react-redux';
import { AuthContextProvider } from './store/auth-context';
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <Provider store={store}>
      <NextUIProvider>
          <App />
      </NextUIProvider>
    </Provider>
  </AuthContextProvider>
  // </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
