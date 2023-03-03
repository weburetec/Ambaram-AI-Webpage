import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./Redux/store";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
      <ToastContainer
        theme="colored"
        autoClose={3000}
        limit={2}
        transition={Zoom}
        hideProgressBar={true}
        position="top-right"
      />
    </CookiesProvider>
  </Provider>
);
