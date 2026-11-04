import { useParams } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  return <h1>Detalle de la receta {id}</h1>;
}
export default RecipeDetail;
