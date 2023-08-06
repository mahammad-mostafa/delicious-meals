import List from './lists.js';
import Popup from './popup.js';

export default class {
  constructor(loaderElement, menuElement, listElement) {
    this.meals = 'https://themealdb.com/api/json/v1/1/';
    this.involvement = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
    this.appId = 'TsDEimEFOpq0pmfWUpLw';
    this.list = new List(menuElement, listElement);
    this.popup = new Popup(this);
    this.loader = loaderElement;
  }

  buildHeaders = (method, body) => ({ method, body: JSON.stringify(body), headers: { 'content-type': 'application/json' } });

  buildRequest = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (response.status > 299) {
      return [];
    }
    const result = await response.text();
    if (result.length > 0 && Object.keys(options).length === 0) {
      return JSON.parse(result);
    }
    return result;
  }

  sendRequest = async (action, promises, item = null) => {
    this.loader.classList.add('loader-visible');
    const responses = await Promise.all(promises);
    this.handleResponse(action, responses, item);
    this.loader.classList.remove('loader-visible');
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
        this.updateLikes(item);
        break;
      case 'updateLikes':
        this.list.updateLikes(item, responses[0]);
        break;
      case 'getComments':
        this.popup.renderPopup({ targetType: 'comments', itemDetails: responses[0], involvementList: responses[1] });
        break;
      case 'postComment':
        this.updateComments(item);
        break;
      case 'updateComments':
        this.popup.renderInvolvement({ targetType: 'comments', involvementList: responses[0] });
        break;
      case 'getReservations':
        this.popup.renderPopup({ targetType: 'reservations', itemDetails: responses[0], involvementList: responses[1] });
        break;
      case 'postReservation':
        this.updateReservations(item);
        break;
      case 'updateReservations':
        this.popup.renderInvolvement({ targetType: 'reservations', involvementList: responses[0] });
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

  updateLikes = (itemId) => {
    const promise = this.buildRequest(`${this.involvement}${this.appId}/likes`);
    this.sendRequest('updateLikes', [promise], itemId);
  }

  getComments = (itemId) => {
    const promise = this.buildRequest(`${this.involvement}${this.appId}/comments?item_id=${itemId}`);
    this.sendRequest('getComments', [this.promiseItem(itemId), promise]);
  }

  postComment = (submission) => {
    const parameters = {
      item_id: submission.itemId, username: submission.username, comment: submission.comment,
    };
    const promise = this.buildRequest(`${this.involvement}${this.appId}/comments`, this.buildHeaders('post', parameters));
    this.sendRequest('postComment', [promise], submission.itemId);
  }

  updateComments = (itemId) => {
    const promise = this.buildRequest(`${this.involvement}${this.appId}/comments?item_id=${itemId}`);
    this.sendRequest('updateComments', [promise]);
  }

  getReservations = (itemId) => {
    const promise = this.buildRequest(`${this.involvement}${this.appId}/reservations?item_id=${itemId}`);
    this.sendRequest('getReservations', [this.promiseItem(itemId), promise]);
  }

  postReservation = (submission) => {
    const parameters = {
      item_id: submission.itemId,
      username: submission.username,
      date_start: submission.dateStart,
      date_end: submission.dateEnd,
    };
    const promise = this.buildRequest(`${this.involvement}${this.appId}/reservations`, this.buildHeaders('post', parameters));
    this.sendRequest('postReservation', [promise], submission.itemId);
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
