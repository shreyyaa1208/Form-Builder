import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

test("renders the main application layout", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const headerElement = screen.getByText(/Form Builder/i);
  expect(headerElement).toBeInTheDocument();

  const createLink = screen.getByText(/Create/i);
  expect(createLink).toBeInTheDocument();
});
