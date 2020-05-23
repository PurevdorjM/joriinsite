import uniqid from "uniqid";

export default class list {
  constructor() {
    this.items = [];
  }

  deleteItem(id) {
    // id гэдэг ID-тэй орцын индексийг массиваас хайж олно.
    const index = this.items.findIndex((e) => e.id === id);
    // Уг индекс дээрх элементийг массиваас устгана.
    this.items.splice(index, 1);
  }

  addItem(item) {
    let newItem = {
      id: uniqid(),
      item,
    };
    this.items.push(newItem);

    return newItem;
  }
}
