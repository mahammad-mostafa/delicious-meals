import Network from './modules/network.js';
import './index.css';

const menuElement = document.querySelector('#menu');
const listElement = document.querySelector('#list-block');

const network = new Network(menuElement, listElement);

const menuEvent = (event) => {
  event.preventDefault();
  const menuHash = event.target.hash;
  if (menuHash !== undefined && ['#seafood', '#pasta', '#vegan'].includes(menuHash)) {
    network.getList(menuHash.replace('#', ''));
  }
};

const listEvent = (event) => {
  const buttonType = event.target.dataset.type;
  if (buttonType !== undefined && ['likes', 'comments', 'reservations'].includes(buttonType)) {
    const itemId = event.target.parentNode.id.replace('item', '');
    if (buttonType === 'likes') {
      network.postLike(itemId);
    } else {
      network.openPopup(buttonType, itemId);
    }
  }
};

menuElement.addEventListener('click', menuEvent);
listElement.addEventListener('click', listEvent);
network.getList('seafood');