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
  elements.pageButtons.innerHTML = "";
};

export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  // Хайлтын үр дүнг хуудаслаж үзүүлэх
  // undefined
  // page = 2, start = 10, end = 20
  const start = (currentPage - 1) * resPerPage;
  const end = currentPage * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);

  // Хуудаслалтын товчлуурыг гаргаж ирэх
  const totalPages = Math.ceil(recipes.length / resPerPage);
  renderButtons(currentPage, totalPages);
};

// type ===> 'prev', 'next'
const createButton = (
  page,
  type,
  direction
) => `<button class="btn-inline results__btn--${type}" data-goto=${page}>
<span>Хуудас ${page}</span>
<svg class="search__icon">
  <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>
</button>`;

const renderButtons = (currentPage, totalPages) => {
  let buttonHtml;

  if (currentPage === 1 && totalPages > 1) {
    // 1-р хуудсан дээр байна, 2-р хуудас гэдэг товчийг гаргана
    buttonHtml = createButton(2, "next", "right");
  } else if (currentPage < totalPages) {
    // Өмнөх болон дараачийн хуудасруу шилжих товчийг үзүүл
    buttonHtml = createButton(currentPage - 1, "prev", "left");
    buttonHtml += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === totalPages) {
    // Хамгийн сүүлийн хуудас дээр байна. Өмнөх рүү шилжүүлэх товчийг л үзүүлнэ.
    buttonHtml = createButton(currentPage - 1, "prev", "left");
  }

  elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHtml);
};
