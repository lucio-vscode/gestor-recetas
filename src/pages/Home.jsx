import { lookupTerm } from "../utils/searchTerms";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader/Loader";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { translateText } from "../utils/translate";
import styles from "./Home.module.css";

function Home() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [shownTerm, setShownTerm] = useState("pollo");
  const [searching, setSearching] = useState(false);

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  const { data, loading, error } = useFetch(url);

  async function handleSubmit(e) {
    e.preventDefault();
    const term = search.trim();
    if (!term) return;

    setSearching(true);

    let englishTerm = lookupTerm(term);

    if (!englishTerm) {
      try {
        const translated = await translateText(term, "es", "en");
        englishTerm = translated.replace(/[^a-zA-Z\s]/g, "").trim() || term;
      } catch {
        englishTerm = term;
      }
    }

    setQuery(englishTerm);
    setShownTerm(term);
    setSearching(false);
  }

  const meals = data?.meals;

  return (
    <section>
      <h1>Buscá tu próxima receta</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Ej: pollo, pasta, torta, arroz..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={searching}>
          {searching ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {loading && <Loader />}
      {error && <p className={styles.error}>Ocurrió un error: {error}</p>}
      {!loading && !error && !meals && (
        <p>
          No se encontraron recetas para "{shownTerm}". Probá con una sola
          palabra, por ejemplo: pollo, carne, pescado, pasta.
        </p>
      )}

      <div className={styles.grid}>
        {meals?.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            id={meal.idMeal}
            name={meal.strMeal}
            image={meal.strMealThumb}
            category={meal.strCategory}
          />
        ))}
      </div>
    </section>
  );
}

export default Home;
