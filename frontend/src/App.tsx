import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import Root from "./components/root.tsx";
import React from "react";

function App() {
  return (
    <NextUIProvider>
      <React.Fragment>
        <Root />
      </React.Fragment>
    </NextUIProvider>
  );
}

export default App;
