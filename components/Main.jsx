import { useState } from "react";
import Ingredient from "./Ingredient";
import getRecipeFromChefClaude from "../ai";
import ReactMarkdown from "react-markdown";

export default function Main() {
  const [recipe, setRecipe] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const ingredientList = ingredients.map((item) => (
    <Ingredient key={item} ingredient={item} />
  ));
  function addIngredient(formData) {
    const newIngredient = formData.get("new-ingredient");
    setIngredients((prevIngredient) => [...prevIngredient, newIngredient]);
    // console.log(Object.fromEntries(formData));
  }
  async function getRecipe() {
    const recipeMd = await getRecipeFromChefClaude(ingredients);
    setRecipe(recipeMd);
  }

  return (
    <main className="main-container">
      <form action={addIngredient} className="new-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          name="new-ingredient"
          aria-label="Add ingredient"
        />
        <button type="submit">+ Add ingredient</button>
      </form>

      <section>
        <h2>Ingredients on hand</h2>
       { ingredients.length>0 && <div className="ingredients-container" aria-live="polite">
          <ul>{ingredientList}</ul>
        </div>}
        <div class="get-recipe-container">
          <div>
            <h3>Ready for a recipe</h3>
            <p>Generate a recipe from your list of ingredients</p>
          </div>
          <button onClick={getRecipe}>Get a recipe</button>
        </div>
        {recipe && (
          <div class="recipe-container">
            <h2>Chef Claude recommends:</h2>
            <ReactMarkdown>{recipe}</ReactMarkdown>
          </div>
        )}
      </section>
    </main>
  );
}
