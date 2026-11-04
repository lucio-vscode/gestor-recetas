import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import useRecipeStore from "../store/useRecipeStore";
import styles from "./Favorites.module.css";

function Favorites() {
  const favorites = useRecipeStore((s) => s.favorites);
  const myRecipes = useRecipeStore((s) => s.myRecipes);
  const removeRecipe = useRecipeStore((s) => s.removeRecipe);

  return (
    <section>
      <h1>Mis favoritos</h1>
      {favorites.length === 0 ? (
        <p>
          Todavía no guardaste ninguna receta. Tocá el 🤍 en cualquier tarjeta
          desde el <Link to="/">inicio</Link>.
        </p>
      ) : (
        <div className={styles.grid}>
          {favorites.map((r) => (
            <RecipeCard key={r.id} {...r} />
          ))}
        </div>
      )}

      <h2 className={styles.subtitle}>Mis recetas</h2>
      {myRecipes.length === 0 ? (
        <p>
          Todavía no agregaste recetas propias.{" "}
          <Link to="/agregar">Agregar una</Link>.
        </p>
      ) : (
        <div className={styles.grid}>
          {myRecipes.map((r) => (
            <div key={r.id}>
              <RecipeCard
                id={r.id}
                name={r.name}
                image={r.image}
                category={r.category}
                to={`/mi-receta/${r.id}`}
                showFavorite={false}
              />
              <button
                className={styles.delete}
                onClick={() => removeRecipe(r.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Favorites;
