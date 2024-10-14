import Header from "./components/Header.jsx";
import "./App.css";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

function App() {
  return (
    <ThemeProvider>
    <Header />
    <Outlet /> 
    </ThemeProvider>
  );
}

export default App;
