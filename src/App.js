import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Search from "./pages/search/Search";
import Recipe from "./pages/recipe/Recipe";
import Navbar from "./components/Navbar";
import ThemeSelector from "./components/ThemeSelector";
import './App.css';
import { useTheme } from "./hooks/useTheme";

function App() {
  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
      <Router>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/create" element={ <Create />} />
          <Route path="/search" element={ <Search />} />
          <Route path="/recipes/:id" element={ <Recipe />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
