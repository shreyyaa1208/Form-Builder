import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./reduxStore"; // Import the store you just created

// We also recommend importing your global CSS file here
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* Wrap your App component with the Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
