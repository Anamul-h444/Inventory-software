import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/style.css";
import { BrowserRouter } from "react-router-dom";
const App = lazy(() => import("./App.jsx"));
import { Toaster } from "react-hot-toast";
import Loader from "./utility/Loader";
import { Provider } from "react-redux";
import store from "../src/redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <App />
      </Provider>
      <Toaster
        toastOptions={{
          position: "top-right",
          style: {
            background: "#283046",
            color: "white",
          },
        }}
      />
    </Suspense>
  </BrowserRouter>
);
