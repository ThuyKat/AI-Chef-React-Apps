export default async function getRecipeFromChefClaude(ingredientsArr) {
  try {
    // Ensure we have a valid array
    if (!Array.isArray(ingredientsArr) || ingredientsArr.length === 0) {
      throw new Error('Invalid or empty ingredients array');
    }

    // Clean the ingredients
    const cleanIngredients = ingredientsArr.map(i => String(i).trim()).filter(Boolean);
    console.log('Clean ingredients:', cleanIngredients);

    // Create request body
    const requestBody = {
      ingredients: cleanIngredients
    };

    // Make the request
    const response = await fetch("/.netlify/functions/get-recipe", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const responseText = await response.text();
    console.log('Response text:', responseText);

    if (!response.ok) {
      throw new Error(`Request failed: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    return data.recipe;

  } catch (error) {
    console.error('Error in getRecipeFromChefClaude:', error);
    throw error;
  }
}