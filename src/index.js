import Network from './modules/network.js';
import './index.css';

const menuElement = document.querySelector('#menu');
const listElement = document.querySelector('#list-block');

const network = new Network(menuElement, listElement);

const menuEvent = (event) => {
  event.preventDefault();
<<<<<<< HEAD
  if (event.target.hash !== undefined && ['#seafood', '#pasta', '#vegan'].includes(event.target.hash)) {
    network.getList(event.target.hash.replace('#', ''));
=======
  const menuHash = event.target.hash;
  if (menuHash !== undefined && ['#seafood', '#pasta', '#vegan'].includes(menuHash)) {
    network.getList(menuHash.replace('#', ''));
>>>>>>> development
  }
};

const listEvent = (event) => {
<<<<<<< HEAD
  if (event.target.id !== undefined && ['likes', 'comments', 'reservations'].includes(event.target.id)) {
    const itemId = event.target.parentNode.id.replace('item', '');
    if (event.target.id === 'likes') {
      network.postLike(itemId);
    } else {
      network.openPopup(event.target.id, itemId);
=======
  const buttonType = event.target.dataset.type;
  if (buttonType !== undefined && ['likes', 'comments', 'reservations'].includes(buttonType)) {
    const itemId = event.target.parentNode.id.replace('item', '');
    if (buttonType === 'likes') {
      network.postLike(itemId);
    } else {
      network.openPopup(buttonType, itemId);
>>>>>>> development
    }
  }
};

menuElement.addEventListener('click', menuEvent);
listElement.addEventListener('click', listEvent);
network.getList('seafood');