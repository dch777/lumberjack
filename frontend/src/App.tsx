import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import Root from "./components/Root.tsx";

function App() {
  return (
    <NextUIProvider>
      <Root />
    </NextUIProvider>
  );
}

export default App;
