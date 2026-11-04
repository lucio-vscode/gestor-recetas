import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import useRecipeStore from "../store/useRecipeStore";
import styles from "./Forms.module.css";

function AddRecipe() {
  const { values, handleChange, reset } = useForm({
    name: "",
    category: "Varios",
    image: "",
    ingredients: "",
    steps: "",
  });
  const [error, setError] = useState("");
  const addRecipe = useRecipeStore((s) => s.addRecipe);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !values.name.trim() ||
      !values.ingredients.trim() ||
      !values.steps.trim()
    ) {
      setError("Completá el nombre, los ingredientes y los pasos.");
      return;
    }

    addRecipe({
      name: values.name.trim(),
      category: values.category,
      image: values.image.trim(),
      ingredients: values.ingredients.split("\n").filter((l) => l.trim()),
      steps: values.steps.split("\n").filter((l) => l.trim()),
    });

    reset();
    setError("");
    navigate("/favoritos");
  }

  return (
    <section>
      <h1>Agregar receta</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name">Nombre de la receta *</label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name="category"
            value={values.category}
            onChange={handleChange}
          >
            <option>Desayuno</option>
            <option>Entrada</option>
            <option>Plato principal</option>
            <option>Postre</option>
            <option>Vegetariano</option>
            <option>Varios</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="image">Link de una imagen (opcional)</label>
          <input
            id="image"
            name="image"
            placeholder="https://..."
            value={values.image}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="ingredients">Ingredientes * (uno por línea)</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={values.ingredients}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="steps">Pasos * (uno por línea)</label>
          <textarea
            id="steps"
            name="steps"
            value={values.steps}
            onChange={handleChange}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button}>
          Guardar receta
        </button>
      </form>
    </section>
  );
}

export default AddRecipe;
