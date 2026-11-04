import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";
import AddRecipe from "./pages/AddRecipe";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/receta/:id" element={<RecipeDetail />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/agregar" element={<AddRecipe />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
