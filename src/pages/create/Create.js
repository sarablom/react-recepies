import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const { postData, data } = useFetch("http://localhost:3000/recipes", "POST");
  const navigate = useNavigate();

  useEffect (() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({title, ingredients, method, cookingTime: cookingTime + " minutes" });
  }

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [prevIngredients, ing])
    }
    setNewIngredient("");
    //focuses the input field so the user doesn't have to click
    ingredientInput.current.focus();
  }

  return (
    <div className="create">
      <h2 className="page-title">Add a new recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
        <span>Recipe ingredients:</span>
        <div className="ingredients">
          <input 
            type="text" 
            onChange={(e) => setNewIngredient(e.target.value)}
            value={newIngredient}
            ref={ingredientInput}
          />
          <button className="btn" onClick={(e) => handleAdd(e)}>add</button>
        </div>
        </label>
        <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="button">Submit</button>
      </form>
    </div>
  );
}
