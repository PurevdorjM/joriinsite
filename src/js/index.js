require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import List from "./model/list";
import * as listView from "./view/listView";
import {
  renderRecipe,
  clearRecipe,
  highLightSelectedRecipe,
} from "./view/recipeView";

/**
 * Web app төлөв
 * -Хайлтын query, үр дүн
 * -Тухайн үзүүлж байгаа код
 * -Лайкаслан жорууд
 * -Захиалж байгаа жорын найрлагууд
 */

const state = {};

/**
 * Хайлтын контроллер - MVC Model ==> Controller <== View
 *
 */

const controlSearch = async () => {
  //  1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна
  const query = searchView.getInput();
  if (query) {
    //  2) Шинээр хайлтын объектийг үүсгэж өгнө.
    state.search = new Search(query);

    //  3) Хайлт хийхэд зориулж дэлгэцийн UI бэлдэж өгнө.
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);

    //   4) Хайлтыг гүйцэтгэнэ
    await state.search.doSearch();
    //   5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    clearLoader();
    if (state.search.result === undefined) alert("Хайлтаар илэрцгүй....");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.pageButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

/**
 * Жорын контролллер
 */

const controlRecipe = async () => {
  // 1) URL -аас ID-г салгаж авна
  const id = window.location.hash.replace("#", "");

  // URL дээр ID байгаа эсэхийг шалгана.
  if (id) {
    // 2) Жорын моделийг үүсгэж өгнө.
    state.recipe = new Recipe(id);

    // 3) UI дэлгэцийг бэлтгэнэ.
    clearRecipe();
    renderLoader(elements.recipeDiv);
    highLightSelectedRecipe(id);

    // 4) Жороо татаж авна.
    await state.recipe.getRecipe();

    // 5) Жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно.
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    // 6) Жороо дэлгэцэнд гаргана.
    renderRecipe(state.recipe);
  }
};
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);

/**
 * Найрлаганы контролллер
 */

const controlList = () => {
  // Найрлаганы мопелийг үүсгэнэ.
  state.list = new List();
  // Өмнө нь байсан мэдээллүүдийг арилгах
  listView.clearItems();

  // Уг моделруу одоо харагдаж байгаа жорны бүх найрлагыг авч хийнэ.
  state.recipe.ingredients.forEach((n) => {
    // Тухайн найрлагыг моделруу хийнэ
    state.list.addItem(n);
    // Тухайн найрлагыг дэлгэцэнд гаргана
    listView.renderItem(n);
  });
};

elements.recipeDiv.addEventListener("click", (e) => {
  if (e.target.matches(".recipe__btn, .recipe__btn *")) {
    controlList();
  }
});
