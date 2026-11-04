import { useParams, Link } from "react-router-dom";
import useRecipeStore from "../store/useRecipeStore";
import styles from "./RecipeDetail.module.css";

function MyRecipeDetail() {
  const { id } = useParams();
  const recipe = useRecipeStore((s) => s.myRecipes.find((r) => r.id === id));

  return (
    <section>
      <Link to="/favoritos" className={styles.back}>
        ← Volver a mis recetas
      </Link>

      {!recipe ? (
        <p>No se encontró la receta.</p>
      ) : (
        <article className={styles.container}>
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.name}
              className={styles.image}
            />
          )}

          <div className={styles.info}>
            <h1>{recipe.name}</h1>
            <p className={styles.tags}>
              <span>{recipe.category}</span>
            </p>
            <h2>Ingredientes</h2>
            <ul className={styles.ingredients}>
              {recipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.steps}>
            <h2>Preparación</h2>
            {recipe.steps.map((step, i) => (
              <p key={i}>{step}</p>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}

export default MyRecipeDetail;
