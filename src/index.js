import Network from './modules/network.js';
import './index.css';

const menuElement = document.querySelector('#menu');
const listElement = document.querySelector('#list-block');

const network = new Network(menuElement, listElement);

const menuEvent = (event) => {
  event.preventDefault();
  if (event.target.hash !== undefined && ['#seafood', '#pasta', '#vegan'].includes(event.target.hash)) {
    network.getList(event.target.hash.replace('#', ''));
  }
};

const listEvent = (event) => {
  if (event.target.id !== undefined && ['likes', 'comments', 'reservations'].includes(event.target.id)) {
    const itemId = event.target.parentNode.id.replace('item', '');
    if (event.target.id === 'likes') {
      network.postLike(itemId);
    } else {
      network.openPopup(event.target.id, itemId);
    }
  }
};

menuElement.addEventListener('click', menuEvent);
listElement.addEventListener('click', listEvent);
network.getList('seafood');