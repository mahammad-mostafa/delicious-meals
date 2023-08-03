import List from './lists.js';
import Popup from './popup.js';

export default class {
  constructor(menuElement, listElement) {
    this.meals = 'https://themealdb.com/api/json/v1/1/';
    this.involvement = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
    this.appId = '7f1BuLlilpO9a0A6DJ97';
    this.list = new List(menuElement, listElement);
    this.popup = new Popup();
  }

  buildHeaders = (method, body) => ({ method, body: JSON.stringify(body), headers: { 'content-type': 'application/json' } });

  buildRequest = async (url, options = {}) => {
    const response = await fetch(url, options);
    const result = await response.text();
    if (result.length > 0 && Object.keys(options).length === 0) {
      return JSON.parse(result);
    }
    return result;
  }

  sendRequest = async (action, promises, item = null) => {
    const responses = await Promise.all(promises);
    this.handleResponse(action, responses, item);
  }

  handleResponse = (action, responses, item) => {
    switch (action) {
      case 'getList':
        this.list.displayList(
          {
            category: item, listItems: responses[0].meals, totalLikes: responses[1],
          },
        );
        break;
      case 'postLike':
        this.list.updateLikes(item);
        break;
      case 'getComments':
        this.popup.renderPopup({ popupType: 'comments', itemDetails: responses[0], involvementList: responses[1] });
        break;
      case 'postComment':
        this.updateComments(item);
        break;
      case 'updateComments':
        this.popup.renderInvolvement({ popupType: 'comments', involvementList: responses[0] });
        break;
      case 'getReservations':
        this.popup.renderPopup({ popupType: 'reservations', itemDetails: responses[0], involvementList: responses[1] });
        break;
      case 'postReservation':
        this.updateReservations(item);
        break;
      case 'updateReservation':
        this.popup.renderInvolvement({ popupType: 'reservations', involvementList: responses[0] });
        break;
      default:
    }
  }

  promiseItem = (itemId) => this.buildRequest(`${this.meals}lookup.php?i=${itemId}`)

  getList = (category) => {
    const promises = [];
    promises.push(this.buildRequest(`${this.meals}filter.php?c=${category}`));
    promises.push(this.buildRequest(`${this.involvement}${this.appId}/likes`));
    this.sendRequest('getList', promises, category);
  }

  postLike = (itemId) => {
    const promise = this.buildRequest(`${this.involvement}${this.appId}/likes`, this.buildHeaders('post', { item_id: itemId }));
    this.sendRequest('postLike', [promise], itemId);
  }

  getComments = (itemId) => {
    const promise = this.buildRequest(`${this.involvement}${this.appId}/comments?item_id=${itemId}`);
    this.sendRequest('getComments', [this.promiseItem(itemId), promise]);
  }

  postComment = ({ itemId, username, comment }) => {
    const promise = this.buildRequest(`${this.involvement}${this.appId}/comments`, this.buildHeaders('post', { item_id: itemId, username, comment }));
    this.sendRequest('postComment', [promise], itemId);
  }

  updateComments = (itemId) => {
    const promise = this.buildRequest(`${this.involvement}${this.appId}/comments?item_id=${itemId}`);
    this.sendRequest('updateComments', [promise]);
  }

  getReservations = (itemId) => {
    const promise = this.buildRequest(`${this.involvement}${this.appId}/reservations?item_id=${itemId}`);
    this.sendRequest('getReservations', [this.promiseItem(itemId), promise]);
  }

  postReservation = ({ itemId, username, comment }) => {
    const promise = this.buildRequest(`${this.involvement}${this.appId}/reservations`, this.buildHeaders('post', { item_id: itemId, username, comment }));
    this.sendRequest('postReservation', [promise], itemId);
  }

  updateReservations = (itemId) => {
    const promise = this.buildRequest(`${this.involvement}${this.appId}/reservations?item_id=${itemId}`);
    this.sendRequest('updateReservations', [promise], itemId);
  }

  openPopup = (popupType, itemId) => {
    if (popupType === 'comments') {
      this.getComments(itemId);
    } else if (popupType === 'reservations') {
      this.getReservations(itemId);
    }
  }
}