require("@babel/polyfill");
import Search from "./model/Search";
import { elements } from "./view/base";
import * as searchView from "./view/searchView";

/**
 * Web app төлөв
 * -Хайлтын query, үр дүн
 * -Тухайн үзүүлж байгаа код
 * -Лайкаслан жорууд
 * -Захиалж байгаа жорын найрлагууд
 */

const state = {};
const controlSearch = async () => {
  //  1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна
  const query = searchView.getInput();
  if (query) {
    //  2) Шинээр хайлтын объектийг үүсгэж өгнө.
    state.search = new Search(query);

    //  3) Хайлт хийхэд зориулж дэлгэцийн UI бэлдэж өгнө.
    searchView.clearSearchQuery();
    searchView.clearSearchResult();

    //   4) Хайлтыг гүйцэтгэнэ
    await state.search.doSearch();
    //   5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    if (state.search.result === undefined) alert("Хайлтаар илэрцгүй....");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
