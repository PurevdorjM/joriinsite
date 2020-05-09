require("@babel/polyfill");
import Search from "./model/Search";

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
  const query = "pizza";
  if (query) {
    //  2) Шинээр хайлтын объектийг үүсгэж өгнө.
    state.search = new Search(query);

    //  3) Хайлт хийхэд зориулж дэлгэцийн UI бэлдэж өгнө.

    //   4) Хайлтыг гүйцэтгэнэ
    await state.search.doSearch();
    //   5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    console.log(state.search.result);
  }
};

document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
