import { elements } from "./base";

// image_url: "http://forkify-api.herokuapp.com/images/avocadopizzawithcilantrosauce4bf5.jpg"
// publisher: "Two Peas and Their Pod"
// publisher_url: "http://www.twopeasandtheirpod.com"
// recipe_id: "54388"
// social_rank: 99.99999665701256
// source_url: "http://www.twopeasandtheirpod.com/avocado-pita-pizza-with-cilantro-sauce/"
// title: "Avocado Pita Pizza with Cilantr

// private function
const renderRecipe = (recipe) => {
  console.log(recipe);
  const markup = `<li>
  <a class="results__link" href="#${recipe.recipe_id}">
      <figure class="results__fig">
          <img src="${recipe.image_url}" alt="Test">
      </figure>
      <div class="results__data">
          <h4 class="results__name">${recipe.title}</h4>
          <p class="results__author">${recipe.publisher}</p>
      </div>
  </a>
</li>`;

  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const clearSearchQuery = () => {
  elements.searchInput.value = "";
};

export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
};

export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes) => {
  // undefined
  recipes.forEach(renderRecipe);
};
