import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../store.ts";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme.tsx";
import { BrowserRouter as Router } from 'react-router-dom'; // Import the BrowserRouter

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router>
        <App />
        </Router>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
