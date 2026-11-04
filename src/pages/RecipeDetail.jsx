import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useTranslate from "../hooks/useTranslate";
import Loader from "../components/Loader/Loader";
import { translateCategory, translateArea } from "../utils/dictionaries";
import styles from "./RecipeDetail.module.css";

function RecipeDetail() {
  const { id } = useParams();
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data, loading, error } = useFetch(url);

  const meal = data?.meals?.[0];

  const ingredientLines = [];
  if (meal) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredientLines.push(
          `${measure ? measure.trim() : ""} ${ingredient.trim()}`.trim(),
        );
      }
    }
  }

  const ingredientsText = ingredientLines.join("\n");
  const instructionsText = meal
    ? meal.strInstructions
        .split(/\r?\n/)
        .filter((line) => line.trim())
        .join("\n")
    : "";

  const { translated: ingredientsEs, translating: t1 } =
    useTranslate(ingredientsText);
  const { translated: instructionsEs, translating: t2 } =
    useTranslate(instructionsText);

  const ingredients = ingredientsEs ? ingredientsEs.split("\n") : [];
  const steps = instructionsEs ? instructionsEs.split("\n") : [];

  return (
    <section>
      <Link to="/" className={styles.back}>
        ← Volver a las recetas
      </Link>

      {loading && <Loader />}
      {error && <p className={styles.error}>Ocurrió un error: {error}</p>}
      {!loading && !error && !meal && <p>No se encontró la receta.</p>}

      {meal && (
        <article className={styles.container}>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className={styles.image}
          />

          <div className={styles.info}>
            <h1>{meal.strMeal}</h1>
            <p className={styles.tags}>
              <span>{translateCategory(meal.strCategory)}</span>
              <span>{translateArea(meal.strArea)}</span>
            </p>

            <h2>Ingredientes</h2>
            {t1 && <p>Traduciendo al español...</p>}
            <ul className={styles.ingredients}>
              {ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.steps}>
            <h2>Preparación</h2>
            {t2 && <p>Traduciendo al español...</p>}
            {steps.map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}

export default RecipeDetail;
