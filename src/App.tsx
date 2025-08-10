import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./store"; // The Redux store you created

import Layout from "./components/Layout";
import CreateForm from "./pages/CreateForm";
import PreviewForm from "./pages/PreviewForm";
import MyForms from "./pages/MyForms";

// Define your MUI theme here for a consistent look and feel
const theme = createTheme({
  palette: {
    primary: {
      main: "#5a4fcf",
    },
    secondary: {
      main: "#ff6f00",
    },
    error: {
      main: "#d32f2f",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

function App() {
  return (
    // The Provider makes the Redux store available to all components
    <Provider store={store}>
      {/* The ThemeProvider applies your custom MUI theme */}
      <ThemeProvider theme={theme}>
        {/* The Router handles navigation between your app's pages */}
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* This is the default page, which will be the form builder */}
              <Route index element={<CreateForm />} />
              {/* This route is for interacting with a form */}
              <Route path="preview" element={<PreviewForm />} />
              {/* This route is for viewing saved forms */}
              <Route path="myforms" element={<MyForms />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
