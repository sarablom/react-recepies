import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";
import "./Recipe.css";

export default function Recipe() {
  //Looks at the URL and finds the id
  const { id } = useParams();
  const { mode } = useTheme();

  const { data: recipe, isPending, error } = useFetch(
    `http://localhost:3000/recipes/${id}`
  );

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
        <h2 className="page-title">{recipe.title}</h2>
        <p>Takes {recipe.cookingTime} to cook.</p>
        <ul>
        {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
        </ul>
        <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
}
