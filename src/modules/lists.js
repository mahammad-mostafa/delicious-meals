import Counter from './items.js';

export default class {
  constructor(menu, list) {
    this.menu = menu;
    this.list = list;
    this.categories = ['seafood', 'pasta', 'vegan'];
    this.buildMenu();
  }

  buildMenu = () => {
    const fragment = new DocumentFragment();
    this.categories.forEach((category) => {
      const element = document.createElement('a');
      element.href = `#${category}`;
      element.textContent = category;
      fragment.appendChild(element);
    });
    this.menu.appendChild(fragment);
  }

  displayList = ({ category, listItems, totalLikes }) => {
    this.likes = totalLikes;
    const fragment = new DocumentFragment();
    listItems.forEach((item) => {
      const element = document.createElement('li');
      element.id = `item${item.idMeal}`;
      let html = `<img class="list-image" src="${item.strMealThumb}" alt="${item.strMeal}" />`;
      html += `<h2 class="list-title">${item.strMeal}</h2>`;
      html += `<span class="list-likes">${this.countLikes(item.idMeal)}<span class="icon-likes"></span></span>`;
      html += '<button class="list-buttons icon-like" data-type="likes" type="button"></button>';
      html += '<button class="list-buttons icon-comment" data-type="comments" type="button"></button>';
      html += '<button class="list-buttons icon-reservation" data-type="reservations" type="button"></button>';
      element.innerHTML = html;
      fragment.appendChild(element);
    });
    this.list.innerHTML = '';
    this.list.appendChild(fragment);
    this.displayCounter(category, Counter(this.list));
  }

  displayCounter = (selected, count) => {
    this.categories.forEach((category, index) => {
      if (this.menu.children[index].hash === `#${selected}`) {
        this.menu.children[index].textContent = `${category} (${count})`;
      } else {
        this.menu.children[index].textContent = `${category}`;
      }
    });
  }

  countLikes = (itemId) => {
    if (this.likes.length === 0) {
      return 0;
    }
    const total = this.likes.find((like) => like.item_id === itemId);
    if (total === undefined) {
      return 0;
    }
    return total.likes;
  }

  updateLikes = (itemId, totalLikes) => {
    this.likes = totalLikes;
    document.querySelector(`#item${itemId} span`).innerHTML = `${this.countLikes(itemId)}<span class="icon-likes"></span>`;
  }
}
