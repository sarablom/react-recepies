import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Search from "./pages/search/Search";
import Recipe from "./pages/recipe/Recipe";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/create" element={ <Create />} />
          <Route path="/search" element={ <Search />} />
          <Route path="/recepies/:id" element={ <Recipe />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
