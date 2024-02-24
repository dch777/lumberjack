import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import Root from "./components/root.tsx";

function App() {
  return (
    <NextUIProvider>
      <Root />
    </NextUIProvider>
  );
}

export default App;
