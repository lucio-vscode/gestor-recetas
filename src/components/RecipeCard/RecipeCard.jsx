import { Link } from "react-router-dom";
import useRecipeStore from "../../store/useRecipeStore";
import { translateCategory } from "../../utils/dictionaries";
import styles from "./RecipeCard.module.css";

function RecipeCard({ id, name, image, category, to, showFavorite = true }) {
  const isFavorite = useRecipeStore((s) =>
    s.favorites.some((r) => r.id === id),
  );
  const toggleFavorite = useRecipeStore((s) => s.toggleFavorite);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {image ? (
          <img src={image} alt={name} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>🍽️</div>
        )}
        {showFavorite && (
          <button
            className={styles.fav}
            onClick={() => toggleFavorite({ id, name, image, category })}
            aria-label={
              isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
            }
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.category}>{translateCategory(category)}</p>
        <Link to={to || `/receta/${id}`} className={styles.button}>
          Ver receta
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;
